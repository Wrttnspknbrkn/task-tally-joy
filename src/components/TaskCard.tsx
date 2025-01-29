import { useState, useEffect } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface TaskCardProps {
  id: string;
  title: string;
  count: number;
  onDelete: (id: string) => void;
  onUpdate: (id: string, count: number) => void;
}

export const TaskCard = ({ id, title, count, onDelete, onUpdate }: TaskCardProps) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    onUpdate(id, currentCount);
  }, [currentCount, id, onUpdate]);

  const increment = () => {
    setCurrentCount(prev => prev + 1);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    toast.success("Count increased!");
  };

  const decrement = () => {
    if (currentCount > 0) {
      setCurrentCount(prev => prev - 1);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      toast.info("Count decreased");
    }
  };

  const handleDelete = () => {
    onDelete(id);
    toast.error("Task deleted");
  };

  return (
    <Card className="gradient-card p-6 mb-4 relative group">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{title}</h3>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button variant="outline" size="icon" onClick={decrement}>
          <Minus className="h-4 w-4" />
        </Button>
        
        <span 
          className={`text-3xl font-bold counter-animation ${
            isAnimating ? 'scale-110' : 'scale-100'
          }`}
        >
          {currentCount}
        </span>
        
        <Button variant="outline" size="icon" onClick={increment}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};