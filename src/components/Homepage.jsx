/**========================================================================
 *                           Bài làm của Tô Quang Anh
 *========================================================================**/

import React from "react";
import "./Style.css";

export default function Homepage() {
  /**------------------------------------------------------------------------
   *                           SECTION DECLARATION
   *------------------------------------------------------------------------**/

  /**--------------------------------------------
   *               STATE DECLARATION
   *---------------------------------------------**/

  const [typeInput, setTypeInput] = React.useState("");
  const [tasks, setTasks] = React.useState([]);

  /**--------------------------------------------
   *               FUNCTION DECLARATION
   *---------------------------------------------**/

  const handleInput = (e) => {
    setTypeInput(e.target.value);
  };
  const handleSubmit = () => {
    //validation
    if (typeInput === "") {
      alert("Please enter a task");
      return;
    } else if (tasks.find((task) => task.task === typeInput)) {
      alert("Task is exist!");
      setTypeInput("");
      return;
    }
    //add task
    let newTasks = [
      ...tasks,
      { task: typeInput, completed: false, id: Math.random() },
    ];
    setTasks(newTasks);
    setTypeInput("");
  };
  const checkTask = (e, id) => {
    let newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.completed = e.target.checked;
      }
      return task;
    });
    setTasks(newTasks);
    console.log(tasks);
  };
  const deleteTask = (id) => {
    let newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };
  const deleteAll = () => {
    setTasks([]);
  };

  /**--------------------------------------------
   *               RENDER FUNCTION
   *---------------------------------------------**/

  const renderList = (type) => {
    return tasks.map((task) => {
      if (
        type === "all" ||
        (type === "inprogress" && !task.completed) ||
        (type === "done" && task.completed)
      ) {
        return (
          <div
            key={task.id}
            className="TaskTag">
            <div className="TaskTag_name">
              <input
                type="checkbox"
                onChange={(e) => {
                  checkTask(e, task.id);
                }}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "grey" : "black",
                }}>
                {task.task}
              </span>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteTask(task.id);
              }}>
              delete
            </button>
          </div>
        );
      }
    });
  };

  /*---------------------------- END OF SECTION ----------------------------*/

  return (
    <div>
      <div className="taskBox">
        <h1>#Todo</h1>
        <div className="taskBox_input">
          <input
            type="text"
            placeholder="Add a task"
            onChange={handleInput}
            value={typeInput}
          />
          <button
            className="submitButton btn btn-primary"
            onClick={handleSubmit}>
            Add
          </button>
        </div>

        <div className="container">
          <ul
            className="nav nav-pills mb-3"
            id="pills-tab"
            role="tablist">
            <li
              className="nav-item"
              role="presentation">
              <button
                className="nav-link active"
                id="pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-home"
                type="button"
                role="tab"
                aria-controls="pills-home"
                aria-selected="true">
                All
              </button>
            </li>
            <li
              className="nav-item"
              role="presentation">
              <button
                className="nav-link"
                id="pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-profile"
                type="button"
                role="tab"
                aria-controls="pills-profile"
                aria-selected="false">
                Active
              </button>
            </li>
            <li
              className="nav-item"
              role="presentation">
              <button
                className="nav-link"
                id="pills-contact-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-contact"
                type="button"
                role="tab"
                aria-controls="pills-contact"
                aria-selected="false">
                Completed
              </button>
            </li>
          </ul>
          <div
            className="tab-content"
            id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="pills-home"
              role="tabpanel"
              aria-labelledby="pills-home-tab">
              {renderList("all")}
            </div>
            <div
              className="tab-pane fade"
              id="pills-profile"
              role="tabpanel"
              aria-labelledby="pills-profile-tab">
              {renderList("inprogress")}
            </div>
            <div
              className="tab-pane fade"
              id="pills-contact"
              role="tabpanel"
              aria-labelledby="pills-contact-tab">
              {renderList("done")}
            </div>
          </div>
        </div>

        <button
          onClick={deleteAll}
          className="btn btn-danger">
          delete All
        </button>
      </div>
    </div>
  );
}
