import { useState } from "react";
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
  count: initialCount, 
  completed: initialCompleted = false,
  onDelete, 
  onUpdate 
}: TaskCardProps) => {
  const [currentCount, setCurrentCount] = useState(initialCount);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);

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

  const increment = () => {
    const newCount = currentCount + 1;
    setCurrentCount(newCount);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
    onUpdate(id, newCount, isCompleted);
    toast.success("Count increased!");
  };

  const decrement = () => {
    if (currentCount > 0) {
      const newCount = currentCount - 1;
      setCurrentCount(newCount);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
      onUpdate(id, newCount, isCompleted);
      toast.info("Count decreased");
    }
  };

  const toggleComplete = () => {
    const newCompleted = !isCompleted;
    setIsCompleted(newCompleted);
    onUpdate(id, currentCount, newCompleted);
    toast.success(newCompleted ? "Task completed!" : "Task unmarked");
  };

  const handleDelete = () => {
    onDelete(id);
    toast.error("Task deleted");
  };

  const gradients = [
    "from-[#fdfcfb] to-[#e2d1c3] dark:from-[#2d1f3f] dark:to-[#1a1625]",
    "from-[#ee9ca7] to-[#ffdde1] dark:from-[#2d1f3f] dark:to-[#2a1f3d]",
    "from-[#accbee] to-[#e7f0fd] dark:from-[#1f2937] dark:to-[#111827]",
    "from-[#d299c2] to-[#fef9d7] dark:from-[#312e81] dark:to-[#1e1b4b]",
    "from-[#e6b980] to-[#eacda3] dark:from-[#374151] dark:to-[#111827]",
  ];

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <Card 
      ref={setNodeRef} 
      style={style}
      className={`bg-gradient-to-br ${randomGradient} backdrop-blur-xl p-6 mb-4 relative group cursor-move border-white/20 shadow-lg transition-all duration-300 ${isCompleted ? 'opacity-75' : ''}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
          </div>
          <h3 className={`text-xl font-semibold ${isCompleted ? 'line-through' : ''}`}>{title}</h3>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`${isCompleted ? 'text-green-500 dark:text-green-400' : 'text-gray-400 dark:text-gray-500'}`}
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