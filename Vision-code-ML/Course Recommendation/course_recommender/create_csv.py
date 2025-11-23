import pandas as pd

# ---------- COURSES DATA ----------
courses = pd.DataFrame({
    'course_id': ['C001', 'C002', 'C003', 'C004', 'C005', 'C006', 'C007', 'C008'],
    'course_title': [
        'Python for Beginners', 'Web Development with React', 'Data Science Essentials',
        'Machine Learning with Python', 'Android App Development',
        'Deep Learning Masterclass', 'Cloud Computing Fundamentals', 'Web Design for Beginners'
    ],
    'difficulty': ['Beginner', 'Intermediate', 'Intermediate', 'Advanced', 'Intermediate', 'Advanced', 'Intermediate', 'Beginner'],
    'tags': [
        'python, programming, basics',
        'react, web dev, frontend',
        'data science, pandas, numpy',
        'ml, python, scikit-learn',
        'java, android, mobile',
        'ai, deep learning, neural networks',
        'cloud, aws, deployment',
        'html, css, web design'
    ],
    'description': [
        'Introductory Python course covering syntax, loops, and functions.',
        'Build dynamic web apps using React.js framework.',
        'Learn data cleaning, analysis, and visualization.',
        'Covers regression, classification, and ML pipelines.',
        'Build native Android apps with Java.',
        'Advanced neural network concepts with TensorFlow.',
        'Learn cloud concepts, AWS setup, and deployment.',
        'Learn front-end design with HTML and CSS.'
    ]
})

# ---------- INTERACTIONS DATA ----------
interactions = pd.DataFrame({
    'student_id': ['S001','S001','S002','S002','S002','S003','S003','S004','S004','S005','S005'],
    'course_id': ['C001','C008','C003','C004','C006','C004','C006','C005','C001','C001','C004'],
    'rating': [5,4,5,4,2,5,4,5,3,4,5]
})

# ---------- SAVE AS CSV ----------
courses.to_csv('courses.csv', index=False)
interactions.to_csv('interactions.csv', index=False)

print("✅ CSV files created successfully!")
