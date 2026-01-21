import { Category } from "@/data/lessons";
import { LessonCard } from "./LessonCard";

interface CategorySectionProps {
  category: Category;
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  return (
    <section className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">{category.icon}</span>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
          <p className="text-muted-foreground text-sm">{category.description}</p>
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {category.lessons.map((lesson, index) => (
          <LessonCard 
            key={lesson.id} 
            lesson={lesson}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
          />
        ))}
      </div>
    </section>
  );
};
