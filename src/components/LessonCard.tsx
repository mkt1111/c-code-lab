import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Lesson } from "@/data/lessons";
import { cn } from "@/lib/utils";

interface LessonCardProps {
  lesson: Lesson;
  className?: string;
  style?: React.CSSProperties;
}

export const LessonCard = ({ lesson, className, style }: LessonCardProps) => {
  return (
    <Link to={`/lesson/${lesson.id}`} style={style}>
      <Card className={cn(
        "h-full bg-card border-border card-hover group cursor-pointer",
        className
      )}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {lesson.title}
          </CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            {lesson.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
