import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "csharp-lab-progress";

interface ProgressData {
  completedLessons: string[];
}

export const useLessonProgress = () => {
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

  return {
    completedLessons,
    markCompleted,
    isCompleted,
    getProgress,
    resetProgress
  };
};
