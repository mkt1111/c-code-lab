import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Trophy } from "lucide-react";
import { LessonQuizQuestion, lessonQuizzes } from "@/data/lessonQuizzes";
import { cn } from "@/lib/utils";

interface LessonQuizProps {
  lessonId: string;
  onComplete: () => void;
}

export const LessonQuiz = ({ lessonId, onComplete }: LessonQuizProps) => {
  const questions = lessonQuizzes[lessonId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = questions[currentIndex];

  const shuffledAnswers = useMemo(() => {
    if (!currentQuestion) return [];
    const wrong = currentQuestion.wrongAnswers.map(w => ({ text: w.answer, explanation: w.explanation, isCorrect: false }));
    const all = [
      { text: currentQuestion.correctAnswer, explanation: "", isCorrect: true },
      ...wrong
    ];
    return all.sort(() => Math.random() - 0.5);
  }, [currentQuestion, currentIndex]);

  if (questions.length === 0) {
    return null;
  }

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    // Allow changing answer - track if previously correct to adjust count
    const wasCorrect = selectedAnswer !== null && shuffledAnswers.find(a => a.text === selectedAnswer)?.isCorrect;
    
    if (wasCorrect && !isCorrect) {
      setCorrectCount(prev => prev - 1);
    } else if (!wasCorrect && isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setIsComplete(true);
      if (correctCount === questions.length || (correctCount >= questions.length / 2)) {
        onComplete();
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setCorrectCount(0);
    setIsComplete(false);
  };

  const getExplanation = (answer: string) => {
    const found = shuffledAnswers.find(a => a.text === answer);
    return found?.explanation || "";
  };

  if (isComplete) {
    const passed = correctCount >= questions.length / 2;
    return (
      <Card className="bg-card border-border animate-fade-in">
        <CardHeader className="text-center">
          <div className={cn(
            "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4",
            passed ? "bg-success/20" : "bg-destructive/20"
          )}>
            <Trophy className={cn("w-8 h-8", passed ? "text-success" : "text-destructive")} />
          </div>
          <CardTitle>
            {passed ? "Lesson Completed!" : "Keep Practicing!"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-2xl font-bold text-primary">
            {correctCount} / {questions.length} correct
          </p>
          <p className="text-muted-foreground">
            {passed 
              ? "Great job! This lesson is now marked as complete."
              : "Review the lesson and try again to mark it as complete."}
          </p>
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <HelpCircle className="w-5 h-5 text-primary" />
            Quick Quiz
          </CardTitle>
          <Badge variant="secondary">
            {currentIndex + 1} / {questions.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground font-medium">{currentQuestion.question}</p>
        
        <div className="space-y-2">
          {shuffledAnswers.map((answer, index) => {
            const isSelected = selectedAnswer === answer.text;
            const showResult = selectedAnswer !== null;
            const isCorrectAnswer = answer.isCorrect;
            
            return (
              <div key={index}>
                <button
                  onClick={() => handleAnswer(answer.text, answer.isCorrect)}
                  disabled={false}
                  className={cn(
                    "w-full p-3 rounded-lg border text-left text-sm transition-all",
                    "hover:border-primary/50 disabled:cursor-default",
                    !showResult && "border-border bg-muted/20",
                    showResult && isCorrectAnswer && "border-success bg-success/10",
                    showResult && isSelected && !isCorrectAnswer && "border-destructive bg-destructive/10",
                    showResult && !isSelected && !isCorrectAnswer && "opacity-50"
                  )}
                >
                  <div className="flex items-start gap-2">
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                      !showResult && "border-muted-foreground",
                      showResult && isCorrectAnswer && "border-success bg-success",
                      showResult && isSelected && !isCorrectAnswer && "border-destructive bg-destructive"
                    )}>
                      {showResult && isCorrectAnswer && <CheckCircle2 className="w-3 h-3 text-success-foreground" />}
                      {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-3 h-3 text-destructive-foreground" />}
                    </div>
                    <span className={cn(
                      "text-foreground",
                      showResult && isCorrectAnswer && "font-medium"
                    )}>
                      {answer.text}
                    </span>
                  </div>
                </button>
                
                {/* Show explanation for wrong answer when selected */}
                {showResult && isSelected && !isCorrectAnswer && answer.explanation && (
                  <div className="mt-2 ml-7 p-3 rounded-lg bg-destructive/5 border border-destructive/20 animate-fade-in">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-destructive">Why this is wrong:</strong> {answer.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {selectedAnswer && (
          <Button onClick={handleNext} className="w-full mt-4">
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
