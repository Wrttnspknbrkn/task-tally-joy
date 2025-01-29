import { useState, useEffect } from "react";
import { TaskCard } from "./TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  count: number;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        count: 0,
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      toast.success("New task added!");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTask = (id: string, count: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, count } : task
    ));
  };

  const exportTasks = () => {
    const csv = tasks.map(task => `${task.title},${task.count}`).join('\n');
    const blob = new Blob([`Title,Count\n${csv}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'task-tally-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Tasks exported successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex gap-2 mb-8">
        <Input
          placeholder="Enter task title..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          className="flex-grow"
        />
        <Button onClick={addTask}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        ))}
      </div>

      {tasks.length > 0 && (
        <Button
          variant="outline"
          className="mt-8"
          onClick={exportTasks}
        >
          Export Tasks
        </Button>
      )}
    </div>
  );
};