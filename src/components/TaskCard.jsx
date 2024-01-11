import React, { useState } from "react";
import { toast } from "react-toastify";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TaskCard = ({ task, tasks, setTasks }) => {
  const [edit, setEdit] = useState(false);
  const [editTask, setEditTask] = useState({
    id: "",
    name: "",
  });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  // Delete a task from the list
  const handleRemove = (e, id) => {
    e.preventDefault();
    const newTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("list", JSON.stringify(newTasks));
    setTasks(newTasks);
    toast.success("Task has been removed successfully");
  };

  // Update the task after it has been edited
  const updateTask = () => {
    if (editTask?.name?.length >= 3) {
      const newTasks = tasks.map((task) => {
        if (task.id === editTask.id) {
          return { ...task, name: editTask.name };
        }
        return task;
      });

      localStorage.setItem("list", JSON.stringify(newTasks));
      setTasks(newTasks);
      setEdit(false);
      setEditTask({
        id: "",
        name: "",
      });
      toast.success("Task has been edited successfully");
    } else {
      toast.error("A task must have more than 3 characters");
    }
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-card `}
    >
      {/* If the edit state is false show task name else show a form to update task name */}
      {!edit ? (
        <p>{task.name}</p>
      ) : (
        <div className="edit-task">
          <input
            type="text"
            value={editTask.name}
            onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
          />
          <button onClick={() => updateTask()} k>
            <i className="fa-solid fa-check fa-lg" />
          </button>
          <button
            onClick={() => {
              setEdit(false);
              setEditTask({
                id: "",
                name: "",
              });
            }}
          >
            <i className="fa-solid fa-xmark fa-lg" />
          </button>
        </div>
      )}
      <div className="action-btn">
        <button
          onClick={() => {
            setEdit(true);
            setEditTask({ ...task });
          }}
          k
        >
          <i className="fa-solid fa-pen-to-square" />
        </button>
        <button onClick={(e) => handleRemove(e, task.id)}>
          <i className="fa fa-trash" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
