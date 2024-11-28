import { observer } from "mobx-react-lite";
import { taskStore, Task } from "../store/TaskStore";

interface TasksProps {
  tasks: Task[];
  className?: string;
}

export const Tasks: React.FC<TasksProps> = observer(({ tasks, className = "" }) => {
  const handleToggle = (id: string, completed: boolean) => {
    taskStore.toggleTask(id, completed);
  };

  return (
    <ul className={`list-none ${className}`}>
      {tasks.map((task) => (
        <li key={task.id} className="ml-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleToggle(task.id, e.target.checked)}
              className="mr-2"
            />
            {task.title}
          </div>
          {task.subTasks.length > 0 && (
            <Tasks tasks={task.subTasks} className="ml-4" />
          )}
        </li>
      ))}
    </ul>
  );
});
