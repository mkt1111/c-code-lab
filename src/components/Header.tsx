import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code2, BookOpen, FileQuestion } from "lucide-react";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <Code2 className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold text-foreground group-hover:text-primary transition-colors">
              C# Lab
            </h1>
            <p className="text-xs text-muted-foreground">Programming Concepts</p>
          </div>
        </Link>
        
        <nav className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Lessons</span>
            </Button>
          </Link>
          <Link to="/quiz">
            <Button variant="default" size="sm" className="gap-2">
              <FileQuestion className="w-4 h-4" />
              <span className="hidden sm:inline">Take Quiz</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
