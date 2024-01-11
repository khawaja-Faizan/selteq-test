import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const CreateTask = ({ setTasks }) => {
  const [task, setTask] = useState({
    id: uuidv4(),
    name: "",
  });

  // Funtion to add a new task to the list
  const successfullyCreated = () => {
    setTasks((prev) => {
      let list = prev ? [...prev, task] : [task];
      localStorage.setItem("list", JSON.stringify(list)); // Update the storage with new list
      return list;
    });
    toast.success("A new task has been created");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for task name
    if (task.name.length < 3)
      toast.error("A task must have more than 3 characters", {
        position: "top-right",
      });
    else {
      successfullyCreated();
    }

    setTask({
      id: uuidv4(),
      name: "",
    });
  };

  return (
    <form className="create-task" onSubmit={handleSubmit}>
      <input
        type="text"
        className="create-task__input"
        value={task.name}
        onChange={(e) => setTask({ ...task, name: e.target.value })}
      />
      <button className="create-task__btn"> Create </button>
    </form>
  );
};

export default CreateTask;
