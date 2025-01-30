import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, GripVertical, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  id: string;
  title: string;
  count: number;
  completed?: boolean;
  onDelete: (id: string) => void;
  onUpdate: (id: string, count: number, completed?: boolean) => void;
}

export const TaskCard = ({ 
  id, 
  title, 
  count, 
  completed = false,
  onDelete, 
  onUpdate 
}: TaskCardProps) => {
  const [currentCount, setCurrentCount] = useState(count);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  useEffect(() => {
    onUpdate(id, currentCount, isCompleted);
  }, [currentCount, isCompleted, id, onUpdate]);

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

  const toggleComplete = () => {
    setIsCompleted(!isCompleted);
    toast.success(isCompleted ? "Task unmarked" : "Task completed!");
  };

  const handleDelete = () => {
    onDelete(id);
    toast.error("Task deleted");
  };

  const gradients = [
    "from-[#fdfcfb] to-[#e2d1c3]",
    "from-[#ee9ca7] to-[#ffdde1]",
    "from-[#accbee] to-[#e7f0fd]",
    "from-[#d299c2] to-[#fef9d7]",
    "from-[#e6b980] to-[#eacda3]",
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Card 
      ref={setNodeRef} 
      style={style}
      className={`bg-gradient-to-br ${randomGradient} dark:from-white/10 dark:to-white/5 backdrop-blur-xl p-6 mb-4 relative group cursor-move border-white/20 shadow-lg transition-all duration-300 ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </div>
          <h3 className={`text-xl font-semibold ${isCompleted ? 'line-through' : ''}`}>{title}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${isCompleted ? 'text-green-500' : 'text-gray-400'}`}
            onClick={toggleComplete}
          >
            <CheckCircle2 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
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