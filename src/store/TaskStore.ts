import { makeAutoObservable } from "mobx";

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    subTasks: Task[];
}

class TaskStore {
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }
    toggleTask(id: string, completed: boolean) {
        const toggleRecursive = (task: Task, state: boolean) => {
            task.completed = state;
            task.subTasks.forEach((subTask) => toggleRecursive(subTask, state));
        };

        const updateParentCompletion = (tasks: Task[]) => {
            tasks.forEach((task) => {
                if (task.subTasks.length > 0) {
                    task.completed = task.subTasks.every((subTask) => subTask.completed);
                    updateParentCompletion(task.subTasks);
                }
            });
        };

        const findAndToggle = (tasks: Task[]) => {
            for (const task of tasks) {
                if (task.id === id) {
                    toggleRecursive(task, completed);
                    break;
                } else {
                    findAndToggle(task.subTasks);
                }
            }
        };

        findAndToggle(this.tasks);
        updateParentCompletion(this.tasks);
    }

    setTasks(tasks: Task[]) {
        this.tasks = tasks;
    }
}

export const taskStore = new TaskStore();