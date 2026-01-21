import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getRandomQuestions, shuffleAnswers, QuizQuestion } from "@/data/quizQuestions";
import { CheckCircle2, XCircle, RotateCcw, Trophy, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const QUESTIONS_PER_QUIZ = 15;

interface QuizState {
  questions: QuizQuestion[];
  shuffledAnswers: string[][];
  currentIndex: number;
  answers: (string | null)[];
  isComplete: boolean;
}

const QuizPage = () => {
  const [quiz, setQuiz] = useState<QuizState>(() => initQuiz());

  function initQuiz(): QuizState {
    const questions = getRandomQuestions(QUESTIONS_PER_QUIZ);
    return {
      questions,
      shuffledAnswers: questions.map(q => shuffleAnswers(q)),
      currentIndex: 0,
      answers: new Array(QUESTIONS_PER_QUIZ).fill(null),
      isComplete: false
    };
  }

  const handleAnswer = (answer: string) => {
    if (quiz.answers[quiz.currentIndex] !== null) return;
    
    const newAnswers = [...quiz.answers];
    newAnswers[quiz.currentIndex] = answer;
    
    setQuiz(prev => ({
      ...prev,
      answers: newAnswers
    }));
  };

  const handleNext = () => {
    if (quiz.currentIndex < quiz.questions.length - 1) {
      setQuiz(prev => ({ ...prev, currentIndex: prev.currentIndex + 1 }));
    } else {
      setQuiz(prev => ({ ...prev, isComplete: true }));
    }
  };

  const handleRestart = () => {
    setQuiz(initQuiz());
  };

  const score = useMemo(() => {
    return quiz.answers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index]?.correctAnswer ? acc + 1 : acc;
    }, 0);
  }, [quiz.answers, quiz.questions]);

  const currentQuestion = quiz.questions[quiz.currentIndex];
  const currentAnswers = quiz.shuffledAnswers[quiz.currentIndex];
  const selectedAnswer = quiz.answers[quiz.currentIndex];
  const progress = ((quiz.currentIndex + 1) / quiz.questions.length) * 100;

  if (quiz.isComplete) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8 max-w-3xl">
          <Card className="bg-card border-border animate-fade-in">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Trophy className={cn(
                  "w-10 h-10",
                  percentage >= 80 ? "text-warning" : percentage >= 60 ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-primary">{percentage}%</div>
              <p className="text-xl text-muted-foreground">
                You scored {score} out of {quiz.questions.length}
              </p>
              
              <div className="flex justify-center gap-4">
                <Button onClick={handleRestart} variant="default" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Link to="/">
                  <Button variant="outline">Back to Lessons</Button>
                </Link>
              </div>

              {/* Results breakdown */}
              <div className="mt-8 space-y-4 text-left">
                <h3 className="text-lg font-semibold">Review Answers</h3>
                {quiz.questions.map((q, index) => {
                  const userAnswer = quiz.answers[index];
                  const isCorrect = userAnswer === q.correctAnswer;
                  return (
                    <Card key={q.id} className={cn(
                      "border",
                      isCorrect ? "border-success/50 bg-success/5" : "border-destructive/50 bg-destructive/5"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <p className="font-medium text-foreground">{q.question}</p>
                        </div>
                        {!isCorrect && (
                          <p className="text-sm text-muted-foreground ml-7">
                            Correct: <span className="text-success">{q.correctAnswer}</span>
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground ml-7 mt-1">{q.explanation}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-6 animate-fade-in">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Question {quiz.currentIndex + 1} of {quiz.questions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="bg-card border-border animate-fade-in">
          <CardHeader>
            <Badge variant="secondary" className="w-fit mb-2">
              <Target className="w-3 h-3 mr-1" />
              {currentQuestion.category}
            </Badge>
            <CardTitle className="text-xl leading-relaxed">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentAnswers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrect = answer === currentQuestion.correctAnswer;
              const showResult = selectedAnswer !== null;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  disabled={selectedAnswer !== null}
                  className={cn(
                    "w-full p-4 rounded-lg border text-left transition-all",
                    "hover:border-primary/50 hover:bg-muted/50",
                    "disabled:cursor-default",
                    !showResult && "border-border bg-muted/20",
                    showResult && isCorrect && "border-success bg-success/10",
                    showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10",
                    showResult && !isSelected && !isCorrect && "opacity-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                      !showResult && "border-muted-foreground",
                      showResult && isCorrect && "border-success bg-success",
                      showResult && isSelected && !isCorrect && "border-destructive bg-destructive"
                    )}>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-success-foreground" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-destructive-foreground" />}
                    </div>
                    <span className={cn(
                      "text-foreground",
                      showResult && isCorrect && "font-medium"
                    )}>
                      {answer}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Explanation */}
            {selectedAnswer && (
              <div className="mt-4 p-4 rounded-lg bg-muted border border-border animate-fade-in">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Explanation:</strong> {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Next Button */}
            {selectedAnswer && (
              <Button onClick={handleNext} className="w-full mt-4">
                {quiz.currentIndex < quiz.questions.length - 1 ? "Next Question" : "See Results"}
              </Button>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default QuizPage;
