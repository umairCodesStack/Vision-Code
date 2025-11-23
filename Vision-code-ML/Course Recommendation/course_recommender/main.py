from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import JSONResponse
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import io

app = FastAPI(title="Student Course Recommender", version="1.0")


# Load Pseudo Data

courses = pd.read_csv("courses.csv")
interactions = pd.read_csv("interactions.csv")

# Create combined text features
courses["content"] = courses["tags"] + " " + courses["description"]

# TF-IDF Model
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(courses["content"])

# Cosine similarity between courses
cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)


#Recommendation Logic

def recommend_courses(student_id: str, top_n: int = 3):
    if student_id not in interactions["student_id"].unique():
        return {"error": "Student not found in dataset."}

    liked = interactions[
        (interactions["student_id"] == student_id) & (interactions["rating"] >= 4)
    ]["course_id"]

    if liked.empty:
        return {"error": "No high-rated courses found for this student."}

    liked_indices = [courses.index[courses["course_id"] == cid][0] for cid in liked]
    sim_scores = cosine_sim[liked_indices].mean(axis=0)

    # Exclude already liked
    for idx in liked_indices:
        sim_scores[idx] = 0

    top_indices = sim_scores.argsort()[-top_n:][::-1]
    recs = courses.iloc[top_indices][["course_id", "course_title", "difficulty", "tags"]]
    return recs.to_dict(orient="records")

# API Endpoints

@app.get("/")
def home():
    return {"message": "Course Recommendation API is running."}


@app.get("/recommend/{student_id}")
def recommend(student_id: str):
    results = recommend_courses(student_id)
    return JSONResponse(content=results)


@app.post("/upload")
async def upload_data(
    courses_file: UploadFile = File(...),
    interactions_file: UploadFile = File(...),
):
    """
    Upload new datasets (CSV) to retrain the recommender
    """
    global courses, interactions, tfidf, cosine_sim

    courses = pd.read_csv(io.BytesIO(await courses_file.read()))
    interactions = pd.read_csv(io.BytesIO(await interactions_file.read()))

    courses["content"] = courses["tags"] + " " + courses["description"]

    tfidf = TfidfVectorizer(stop_words="english")
    tfidf_matrix = tfidf.fit_transform(courses["content"])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    return {"status": "Datasets uploaded and model retrained successfully."}
