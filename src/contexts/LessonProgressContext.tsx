import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";

const STORAGE_KEY = "csharp-lab-progress";

interface ProgressData {
  completedLessons: string[];
}

interface LessonProgressContextType {
  completedLessons: Set<string>;
  markCompleted: (lessonId: string) => void;
  isCompleted: (lessonId: string) => boolean;
  getProgress: (totalLessons: number) => { completed: number; total: number; percentage: number };
  resetProgress: () => void;
}

const LessonProgressContext = createContext<LessonProgressContextType | undefined>(undefined);

export const LessonProgressProvider = ({ children }: { children: ReactNode }) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: ProgressData = JSON.parse(stored);
        return new Set(data.completedLessons);
      }
    } catch (e) {
      console.error("Failed to load progress:", e);
    }
    return new Set();
  });

  useEffect(() => {
    try {
      const data: ProgressData = {
        completedLessons: Array.from(completedLessons)
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save progress:", e);
    }
  }, [completedLessons]);

  const markCompleted = useCallback((lessonId: string) => {
    setCompletedLessons(prev => {
      const next = new Set(prev);
      next.add(lessonId);
      return next;
    });
  }, []);

  const isCompleted = useCallback((lessonId: string) => {
    return completedLessons.has(lessonId);
  }, [completedLessons]);

  const getProgress = useCallback((totalLessons: number) => {
    return {
      completed: completedLessons.size,
      total: totalLessons,
      percentage: totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0
    };
  }, [completedLessons]);

  const resetProgress = useCallback(() => {
    setCompletedLessons(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <LessonProgressContext.Provider value={{ completedLessons, markCompleted, isCompleted, getProgress, resetProgress }}>
      {children}
    </LessonProgressContext.Provider>
  );
};

export const useLessonProgress = () => {
  const context = useContext(LessonProgressContext);
  if (!context) {
    throw new Error("useLessonProgress must be used within a LessonProgressProvider");
  }
  return context;
};