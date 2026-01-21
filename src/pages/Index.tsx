import { Header } from "@/components/Header";
import { CategorySection } from "@/components/CategorySection";
import { LessonSidebar } from "@/components/LessonSidebar";
import { categories } from "@/data/lessons";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileQuestion, Sparkles, Menu } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <LessonSidebar />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Header />
        
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border lg:hidden">
          <SidebarTrigger>
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
          <span className="text-sm text-muted-foreground">Lessons</span>
        </div>
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-8">
            {/* Hero Section */}
            <section className="text-center py-12 mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Master C# Programming Concepts</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="text-gradient">C# Programming</span>
                <br />
                <span className="text-foreground">Concepts Lab</span>
              </h1>
              
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Learn OOP principles, data structures, keywords, and optimization techniques
                with interactive lessons and code examples.
              </p>
              
              <Link to="/quiz">
                <Button size="lg" className="gap-2 glow-primary">
                  <FileQuestion className="w-5 h-5" />
                  Test Your Knowledge
                </Button>
              </Link>
            </section>

            {/* Categories */}
            <div className="space-y-16">
              {categories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </div>
        </main>
        
        <footer className="border-t border-border py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
            <p>C# Programming Concepts Lab • Learn, Practice, Master</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;