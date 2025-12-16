import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "Vision-Code",
  email: "info@vision-code.dev",
  password: "vision-code",
};

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, error: null };

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "signup":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        name: action.payload.firstName + " " + action.payload.lastName,
      };
    case "error":
      return {
        ...state,
        isAuthenticated: false,
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
      dispatch({ type: "error", payload: error });
      throw error;
    }
  }
  async function signupApi(firstName, lastName, email, password) {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      console.log("Signup successful");
      return res;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  }
  async function login(email, password) {
    const token = await loginApi(email, password);
    console.log(token);
    if (token) {
      localStorage.setItem("access_token", token.access);
      localStorage.setItem("refresh_token", token.refresh);
      dispatch({
        type: "login",
        payload: { email, password },
      });
    } else {
      dispatch({ type: "error", payload: "Invalid Credentials" });
    }
  }
  async function signup(firstName, lastName, email, password) {
    const res = await signupApi(firstName, lastName, email, password);
    console.log(res);
    if (res.ok) {
      dispatch({
        type: "signup",
        payload: { email, password, firstName, lastName },
      });
    } else {
      dispatch({ type: "error", error: "Signup Failed" });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated, error, dispatch, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Context was used out of the Auth Provider");
  }
  return context;
}

export { AuthProvider, useAuth };
