import { createContext, useContext, useReducer } from "react";

// const FAKE_USER = {
//   name: "Vision-Code",
//   email: "info@vision-code.dev",
//   password: "vision-code",
// };

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    case "signup":
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  async function loginApi(email, password) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("Login successful:", data);
      return data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async function signupApi(
    firstName,
    lastName,
    email,
    password,
    role = "student"
  ) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          role: role,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      const data = await res.json();
      console.log("Signup successful:", data);
      return data;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }

  async function login(email, password) {
    try {
      const token = await loginApi(email, password);
      console.log(token);

      if (token && token.access) {
        localStorage.setItem("access_token", token.access);
        localStorage.setItem("refresh_token", token.refresh);

        dispatch({
          type: "login",
          payload: { email, name: token.user?.name || "User" },
        });
      } else {
        dispatch({ type: "error", payload: "Invalid Credentials" });
      }
    } catch (error) {
      dispatch({ type: "error", payload: error.message || "Login failed" });
      throw error;
    }
  }

  async function signup(
    firstName,
    lastName,
    email,
    password,
    role = "student"
  ) {
    try {
      const res = await signupApi(firstName, lastName, email, password, role);

      if (res) {
        dispatch({
          type: "signup",
          payload: { email, name: `${firstName} ${lastName}` },
        });

        // Optionally auto-login after signup
        // await login(email, password);
      }
    } catch (error) {
      dispatch({ type: "error", payload: error.message || "Signup failed" });
      throw error;
    }
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, signup, user, isAuthenticated, error, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
