import { TaskList } from "@/components/TaskList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Task Tally
          </h1>
          <p className="text-gray-600 mt-2">
            Track your tasks with style
          </p>
        </header>
        
        <TaskList />
      </div>
    </div>
  );
};

export default Index;