import { useLocation, Link } from "react-router-dom";
import { CheckCircle2, Circle, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { categories, getAllLessons } from "@/data/lessons";
import { useLessonProgress } from "@/hooks/useLessonProgress";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const LessonSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { isCompleted, getProgress } = useLessonProgress();
  const allLessons = getAllLessons();
  const progress = getProgress(allLessons.length);

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    // Start with all categories expanded
    return new Set(categories.map(c => c.id));
  });

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const isActive = (lessonId: string) => currentPath === `/lesson/${lessonId}`;

  return (
    <Sidebar className={cn("border-r border-border bg-sidebar", collapsed ? "w-14" : "w-64")}>
      <SidebarContent className="py-4">
        {/* Progress */}
        {!collapsed && (
          <div className="px-4 mb-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{progress.completed} / {progress.total}</span>
            </div>
            <Progress value={progress.percentage} className="h-2" />
          </div>
        )}

        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          const categoryCompleted = category.lessons.filter(l => isCompleted(l.id)).length;
          const categoryTotal = category.lessons.length;
          
          return (
            <SidebarGroup key={category.id}>
              <SidebarGroupLabel 
                className="cursor-pointer hover:bg-muted/50 rounded-md mx-2 px-2 py-1.5"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    {!collapsed && (
                      <span className="text-sm font-medium">{category.title}</span>
                    )}
                  </div>
                  {!collapsed && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {categoryCompleted}/{categoryTotal}
                      </span>
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  )}
                </div>
              </SidebarGroupLabel>

              {isExpanded && !collapsed && (
                <SidebarGroupContent className="mt-1">
                  <SidebarMenu>
                    {category.lessons.map((lesson) => {
                      const completed = isCompleted(lesson.id);
                      const active = isActive(lesson.id);
                      
                      return (
                        <SidebarMenuItem key={lesson.id}>
                          <SidebarMenuButton asChild>
                            <Link
                              to={`/lesson/${lesson.id}`}
                              className={cn(
                                "flex items-center gap-2 px-4 py-2 text-sm rounded-md mx-2 transition-colors",
                                active && "bg-primary/10 text-primary font-medium",
                                !active && "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              )}
                            >
                              {completed ? (
                                <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                              ) : (
                                <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                              )}
                              <span className="truncate">{lesson.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              )}
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
};
