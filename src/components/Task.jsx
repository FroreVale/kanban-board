import classNames from "classnames";
import "./Task.css";
import { useStore } from "../store";
import { FiTrash2 } from "react-icons/fi";

// eslint-disable-next-line react/prop-types
export default function Task({ title }) {

  const task = useStore((store) => store.tasks.find(task => task.title === title))
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore(store => store.deleteTask)

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}> 
      <div>{task.title}</div>
      <div className="bottomWrapper">
        <div className="trashIcon"><FiTrash2 onClick={() => deleteTask(task.title)} /></div>
        <div className={classNames("status", task.state)}>{task.state}</div>
      </div>
    </div>
  );
}

