import requests
import streamlit as st


API_URL = "http://localhost:5000/api"


st.set_page_config(
    page_title="AI Study Planner",
    page_icon="📚",
)

st.title("AI Study Planner")
st.write("View your subjects and tasks from the Node.js backend.")


def get_subjects():
    response = requests.get(f"{API_URL}/subjects", timeout=5)
    response.raise_for_status()
    return response.json()


try:
    subjects = get_subjects()

    if not subjects:
        st.info("No subjects yet.")

    for subject in subjects:
        st.subheader(subject["name"])

        tasks = subject["tasks"]

        if not tasks:
            st.write("No tasks for this subject yet.")

        for task in tasks:
            status = "Done" if task["completed"] else "Not done"
            st.write(f"- {task['title']} ({status})")

except requests.exceptions.RequestException:
    st.error("Could not connect to the backend. Make sure the Node.js server is running.")
