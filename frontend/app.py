import requests
import streamlit as st


API_URL = "http://localhost:5000/api"


st.set_page_config(
    page_title="AI Study Planner",
    page_icon=":books:",
)

st.title("AI Study Planner")
st.write("Plan subjects, add tasks, and track study progress.")


def get_subjects():
    response = requests.get(f"{API_URL}/subjects", timeout=5)
    response.raise_for_status()
    return response.json()


def create_subject(name):
    response = requests.post(
        f"{API_URL}/subjects",
        json={"name": name},
        timeout=5,
    )
    response.raise_for_status()
    return response.json()


def create_task(subject_id, title):
    response = requests.post(
        f"{API_URL}/subjects/{subject_id}/tasks",
        json={"title": title},
        timeout=5,
    )
    response.raise_for_status()
    return response.json()


def update_task(subject_id, task_id, completed):
    response = requests.patch(
        f"{API_URL}/subjects/{subject_id}/tasks/{task_id}",
        json={"completed": completed},
        timeout=5,
    )
    response.raise_for_status()
    return response.json()


def delete_task(subject_id, task_id):
    response = requests.delete(
        f"{API_URL}/subjects/{subject_id}/tasks/{task_id}",
        timeout=5,
    )
    response.raise_for_status()
    return response.json()


def calculate_stats(subjects):
    total_subjects = len(subjects)
    total_tasks = 0
    completed_tasks = 0

    for subject in subjects:
        tasks = subject["tasks"]
        total_tasks += len(tasks)
        completed_tasks += sum(1 for task in tasks if task["completed"])

    remaining_tasks = total_tasks - completed_tasks

    return total_subjects, total_tasks, completed_tasks, remaining_tasks


def show_dashboard(subjects):
    total_subjects, total_tasks, completed_tasks, remaining_tasks = calculate_stats(subjects)
    progress = completed_tasks / total_tasks if total_tasks > 0 else 0

    subject_metric, task_metric, completed_metric, remaining_metric = st.columns(4)
    subject_metric.metric("Subjects", total_subjects)
    task_metric.metric("Tasks", total_tasks)
    completed_metric.metric("Completed", completed_tasks)
    remaining_metric.metric("Remaining", remaining_tasks)

    st.progress(progress)
    st.caption(f"{progress:.0%} of tasks completed")


def show_subject_form():
    with st.form("create_subject_form"):
        subject_name = st.text_input("Subject name")
        submitted = st.form_submit_button("Add subject")

        if submitted:
            if subject_name.strip() == "":
                st.warning("Please enter a subject name.")
            else:
                try:
                    create_subject(subject_name)
                    st.success("Subject added.")
                    st.rerun()
                except requests.exceptions.RequestException:
                    st.error("Could not create the subject. Make sure the backend is running.")


def show_task_form(subjects):
    if not subjects:
        return

    subject_options = {subject["name"]: subject["id"] for subject in subjects}

    with st.form("create_task_form"):
        selected_subject_name = st.selectbox("Subject", subject_options.keys())
        task_title = st.text_input("Task title")
        task_submitted = st.form_submit_button("Add task")

        if task_submitted:
            if task_title.strip() == "":
                st.warning("Please enter a task title.")
            else:
                try:
                    selected_subject_id = subject_options[selected_subject_name]
                    create_task(selected_subject_id, task_title)
                    st.success("Task added.")
                    st.rerun()
                except requests.exceptions.RequestException:
                    st.error("Could not create the task. Make sure the backend is running.")


def show_subjects(subjects):
    if not subjects:
        st.info("No subjects yet.")
        return

    for subject in subjects:
        st.subheader(subject["name"])

        tasks = subject["tasks"]

        if not tasks:
            st.write("No tasks for this subject yet.")

        for task in tasks:
            checkbox_key = f"task_{subject['id']}_{task['id']}"
            delete_key = f"delete_{subject['id']}_{task['id']}"
            task_column, delete_column = st.columns([4, 1])

            with task_column:
                completed = st.checkbox(
                    task["title"],
                    value=task["completed"],
                    key=checkbox_key,
                )

                if completed != task["completed"]:
                    try:
                        update_task(subject["id"], task["id"], completed)
                        st.rerun()
                    except requests.exceptions.RequestException:
                        st.error("Could not update the task. Make sure the backend is running.")

            with delete_column:
                if st.button("Delete", key=delete_key):
                    try:
                        delete_task(subject["id"], task["id"])
                        st.rerun()
                    except requests.exceptions.RequestException:
                        st.error("Could not delete the task. Make sure the backend is running.")


show_subject_form()

try:
    subjects = get_subjects()
    show_dashboard(subjects)
    show_task_form(subjects)
    show_subjects(subjects)
except requests.exceptions.RequestException:
    st.error("Could not connect to the backend. Make sure the Node.js server is running.")
