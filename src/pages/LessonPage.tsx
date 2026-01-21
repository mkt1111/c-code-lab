import { useParams, Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CodeBlock } from "@/components/CodeBlock";
import { NavigationButtons } from "@/components/NavigationButtons";
import { getLessonById, getAdjacentLessons, getCategoryByLessonId } from "@/data/lessons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Lightbulb, AlertTriangle, Target } from "lucide-react";

const LessonPage = () => {
  const { id } = useParams<{ id: string }>();
  const lesson = id ? getLessonById(id) : undefined;
  const category = id ? getCategoryByLessonId(id) : undefined;
  const { prev, next } = id ? getAdjacentLessons(id) : { prev: undefined, next: undefined };

  if (!lesson) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="animate-fade-in">
          {/* Header */}
          <div className="mb-8">
            <Badge variant="secondary" className="mb-4">
              {category?.icon} {lesson.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {lesson.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {lesson.description}
            </p>
          </div>

          {/* Definition */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-5 h-5 text-primary" />
                Definition
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">
                {lesson.content.definition}
              </p>
            </CardContent>
          </Card>

          {/* Syntax Example */}
          {lesson.content.syntax && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">Syntax Example</h2>
              <CodeBlock code={lesson.content.syntax} />
            </div>
          )}

          {/* Use Cases */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Lightbulb className="w-5 h-5 text-warning" />
                When to Use
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.content.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Good vs Bad Examples */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {lesson.content.goodExample && (
              <div>
                <h3 className="text-lg font-semibold text-success mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Good Practice
                </h3>
                <CodeBlock 
                  code={lesson.content.goodExample.code} 
                  variant="good"
                  title="✓ Recommended"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  {lesson.content.goodExample.explanation}
                </p>
              </div>
            )}
            
            {lesson.content.badExample && (
              <div>
                <h3 className="text-lg font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5" />
                  Anti-Pattern
                </h3>
                <CodeBlock 
                  code={lesson.content.badExample.code} 
                  variant="bad"
                  title="✗ Avoid"
                />
                <p className="mt-3 text-sm text-muted-foreground">
                  {lesson.content.badExample.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Pitfalls */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                Common Pitfalls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.content.pitfalls.map((pitfall, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <XCircle className="w-4 h-4 text-destructive mt-1 flex-shrink-0" />
                    <span>{pitfall}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="mb-8 bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle2 className="w-5 h-5 text-success" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.content.bestPractices.map((practice, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <NavigationButtons prev={prev} next={next} />
        </article>
      </main>
    </div>
  );
};

export default LessonPage;
