import { TaskList } from "@/components/TaskList";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Index = () => {
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
            <Badge variant="secondary">Beginner</Badge>
            <Badge variant="outline">5 Tasks Created</Badge>
            <Badge variant="default">3 Tasks Completed</Badge>
          </div>
          <div className="max-w-md mx-auto mt-6">
            <Progress value={33} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2">
              Level Progress: 33%
            </p>
          </div>
        </header>
        
        <TaskList />
      </div>
    </div>
  );
};

export default Index;