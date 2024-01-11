import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import CreateTask from "../components/CreateTask";
import TaskCard from "../components/TaskCard";

const Todo = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("list"))); // getting data from local storage after reload
  }, []);

  // Function to enable the buttons in our card
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px
    },
  });
  const sensors = useSensors(mouseSensor);

  // Function to handle the drag event
  const handleDragEnd = (e) => {
    const { active, over } = e;
    let newArr = [];
    // Check if the value has actually moved
    if (active && over) {
      if (active?.id !== over?.id) {
        setTasks((items) => {
          // Find the indexes of the value being moved and value being replaced
          const activeIndex = items.findIndex((item) => item.id === active.id);
          const overIndex = items.findIndex((item) => item.id === over.id);
          newArr = arrayMove(items, activeIndex, overIndex); // arranging the updated array with this built-in function
          localStorage.setItem("list", JSON.stringify(newArr)); // Storing the values in case of reload
          return newArr;
        });
        toast("Task moved succesfully");
      }
    }
  };

  return (
    <div className="todo-app">
      <CreateTask setTasks={setTasks} />

      <div className="list-type">
        <header className="list-header__todos">
          <h4>
            to-do <span>{tasks ? tasks.length : 0}</span>
          </h4>
        </header>
        {tasks ? (
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}
          >
            <SortableContext
              items={tasks}
              strategy={verticalListSortingStrategy}
            >
              {tasks.map((task) => (
                <TaskCard task={task} tasks={tasks} setTasks={setTasks} />
              ))}
            </SortableContext>
          </DndContext>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Todo;
