import './App.css';
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "./store/TaskStore";
import { Tasks } from './components/Tasks';

const App: React.FC = observer(() => {
  useEffect(() => {
    taskStore.setTasks([
      {
        id: "1",
        title: "Task 1",
        completed: false,
        subTasks: [
          {
            id: "1-1",
            title: "Subtask 1.1",
            completed: false,
            subTasks: [],
          },
          {
            id: "1-2",
            title: "Subtask 1.2",
            completed: false,
            subTasks: [
              {
                id: "1-2-1",
                title: "Subtask 1.2.1",
                completed: false,
                subTasks: [],
              },
              {
                id: "1-2-2",
                title: "Subtask 1.2.2",
                completed: false,
                subTasks: [],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        title: "Task 2",
        completed: false,
        subTasks: [{
          id: "2-1",
          title: "Subtask 2.1",
          completed: false,
          subTasks: [],
        },
        {
          id: "2-2",
          title: "Subtask 2.2",
          completed: false,
          subTasks: [],
        }],
      },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Tasks</h1>
      <Tasks tasks={taskStore.tasks} />
    </div>
  );
});

export default App
