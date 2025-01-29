import { useState, useEffect } from "react";
import { Plus, Minus, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
    <Card 
      ref={setNodeRef} 
      style={style}
      className="gradient-card p-6 mb-4 relative group cursor-move"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
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