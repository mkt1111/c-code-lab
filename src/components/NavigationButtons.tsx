import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ChevronLeft, ChevronRight } from "lucide-react";
import { Lesson } from "@/data/lessons";

interface NavigationButtonsProps {
  prev?: Lesson;
  next?: Lesson;
  showHome?: boolean;
}

export const NavigationButtons = ({ prev, next, showHome = true }: NavigationButtonsProps) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-t border-border mt-8">
      <div className="flex items-center gap-2">
        {showHome && (
          <Link to="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
        )}
        
        {prev && (
          <Link to={`/lesson/${prev.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Button>
          </Link>
        )}
      </div>
      
      {next && (
        <Link to={`/lesson/${next.id}`}>
          <Button variant="default" size="sm" className="gap-2">
            <span className="hidden sm:inline">{next.title}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      )}
    </div>
  );
};
