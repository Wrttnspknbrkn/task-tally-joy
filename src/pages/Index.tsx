import { TaskList } from "@/components/TaskList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const Index = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    totalCounts: 0,
    level: 'Beginner'
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const completed = tasks.filter((t: any) => t.completed).length;
    const total = tasks.length;
    const counts = tasks.reduce((acc: number, t: any) => acc + t.count, 0);
    
    // Calculate level based on completed tasks and counts
    let level = 'Beginner';
    if (completed >= 10 && counts >= 50) level = 'Expert';
    else if (completed >= 5 && counts >= 25) level = 'Intermediate';
    
    setStats({
      totalTasks: total,
      completedTasks: completed,
      totalCounts: counts,
      level
    });
  }, []);

  const getProgressValue = () => {
    if (stats.level === 'Beginner') {
      return (stats.completedTasks / 5) * 100;
    } else if (stats.level === 'Intermediate') {
      return (stats.completedTasks / 10) * 100;
    }
    return 100;
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img
              src="/logo.svg"
              alt="Task Tally Logo"
              className="h-16 w-16 animate-bounce"
            />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Task Tally
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your tasks with style
          </p>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant="secondary">{stats.level}</Badge>
            <Badge variant="outline">{stats.totalTasks} Tasks Created</Badge>
            <Badge variant="default">{stats.completedTasks} Tasks Completed</Badge>
          </div>
          <div className="max-w-md mx-auto mt-6">
            <Progress value={getProgressValue()} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Level Progress: {Math.round(getProgressValue())}%
              {stats.level !== 'Expert' && (
                <span className="ml-2">
                  ({stats.level === 'Beginner' ? '5' : '10'} tasks to next level)
                </span>
              )}
            </p>
          </div>
        </header>
        
        <TaskList />
      </div>
    </div>
  );
};

export default Index;