import classNames from "classnames";
import { useStore } from "../store";
import "./Column.css";
import Task from "./Task";
import { useMemo, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const tasks = useStore((store) => store.tasks);
  const filteredTasks = useMemo(
    () => tasks.filter((task) => task.state === state),
    [tasks, state]
  );
  const addTask = useStore((store) => store.addTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);

  return (
    <div 
      className={classNames("column", {drop: drop})} 
      onDragOver={(e) => {
        setDrop(true);
        e.preventDefault()
      }} 
      onDragLeave={(e) => {
        setDrop(false);
        e.preventDefault();
      }}
      onDrop={() => {
        setDrop(false);
        setDraggedTask(null);
        moveTask(draggedTask, state)
      }}
    >
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {filteredTasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
      {open && (
        <div className="Modal">
          <div className="modalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button
              onClick={() => {
                addTask(text, state);
                setText("");
                setOpen(false);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
