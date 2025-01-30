import { TaskList } from "@/components/TaskList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Stats {
  totalTasks: number;
  completedTasks: number;
  totalCounts: number;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  progress: number;
}

const calculateLevel = (completedTasks: number, totalCounts: number): Stats['level'] => {
  // Updated thresholds for level progression
  if (completedTasks >= 5) return 'Expert';
  if (completedTasks >= 3) return 'Intermediate';
  return 'Beginner';
};

const calculateProgress = (level: Stats['level'], completedTasks: number): number => {
  switch (level) {
    case 'Beginner':
      return Math.min((completedTasks / 3) * 100, 100);
    case 'Intermediate':
      return Math.min(((completedTasks - 3) / 2) * 100, 100);
    case 'Expert':
      return 100;
    default:
      return 0;
  }
};

const Index = () => {
  const [stats, setStats] = useState<Stats>({
    totalTasks: 0,
    completedTasks: 0,
    totalCounts: 0,
    level: 'Beginner',
    progress: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const completed = tasks.filter((t: any) => t.completed).length;
      const total = tasks.length;
      const counts = tasks.reduce((acc: number, t: any) => acc + t.count, 0);
      const level = calculateLevel(completed, counts);
      const progress = calculateProgress(level, completed);
      
      setStats({
        totalTasks: total,
        completedTasks: completed,
        totalCounts: counts,
        level,
        progress
      });
    };

    // Initial update
    updateStats();

    // Listen for storage changes
    window.addEventListener('storage', updateStats);
    const interval = setInterval(updateStats, 1000); // Poll for changes

    return () => {
      window.removeEventListener('storage', updateStats);
      clearInterval(interval);
    };
  }, []);

  const getLevelColor = (level: Stats['level']) => {
    switch (level) {
      case 'Expert':
        return 'bg-purple-500 hover:bg-purple-600';
      case 'Intermediate':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-green-500 hover:bg-green-600';
    }
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
            <Badge 
              className={`${getLevelColor(stats.level)} text-white`}
            >
              {stats.level}
            </Badge>
            <Badge variant="outline">
              {stats.totalTasks} Tasks Created
            </Badge>
            <Badge variant="secondary">
              {stats.completedTasks} Tasks Completed
            </Badge>
            <Badge variant="secondary">
              {stats.totalCounts} Total Counts
            </Badge>
          </div>
          <div className="max-w-md mx-auto mt-6">
            <Progress value={stats.progress} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Level Progress: {Math.round(stats.progress)}%
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