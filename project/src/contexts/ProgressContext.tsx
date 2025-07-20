import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserProgress, updateProgress, saveSubmission, getSubmission } from '../utils/supabase';
import { useAuth } from './AuthContext';

interface Progress {
  completed: string[];
  savedCode: Record<string, string>;
  scores: Record<string, number>;
  timestamps: Record<string, string>;
}

interface ProgressContextType {
  progress: Progress;
  completeExercise: (exerciseId: string, score?: number) => void;
  saveCode: (exerciseId: string, code: string, results?: any) => void;
  exportProgress: () => any;
  importProgress: (data: any) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<Progress>({
    completed: [],
    savedCode: {},
    scores: {},
    timestamps: {}
  });
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      loadProgressFromSupabase();
    } else {
      // Load from localStorage as fallback
      const storedProgress = localStorage.getItem('cortex-progress');
      if (storedProgress) {
        try {
          const parsed = JSON.parse(storedProgress);
          setProgress(parsed);
        } catch (error) {
          console.error('Failed to parse stored progress:', error);
        }
      }
    }
  }, [user]);

  const loadProgressFromSupabase = async () => {
    try {
      const { data, error } = await getUserProgress();
      if (error) throw error;

      const newProgress: Progress = {
        completed: data?.filter(p => p.completed).map(p => p.exercise_id) || [],
        savedCode: {},
        scores: data?.reduce((acc, p) => ({ ...acc, [p.exercise_id]: p.score }), {}) || {},
        timestamps: data?.reduce((acc, p) => ({ ...acc, [p.exercise_id]: p.completed_at }), {}) || {}
      };

      // Load saved code for each exercise
      for (const item of data || []) {
        const { data: submission } = await getSubmission(item.exercise_id);
        if (submission) {
          newProgress.savedCode[item.exercise_id] = submission.code;
        }
      }

      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to load progress from Supabase:', error);
    }
  };

  const saveProgress = (newProgress: Progress) => {
    setProgress(newProgress);
    localStorage.setItem('cortex-progress', JSON.stringify(newProgress));
  };

  const completeExercise = async (exerciseId: string, score: number = 100) => {
    const newProgress = {
      ...progress,
      completed: progress.completed.includes(exerciseId) 
        ? progress.completed 
        : [...progress.completed, exerciseId],
      scores: {
        ...progress.scores,
        [exerciseId]: score
      },
      timestamps: {
        ...progress.timestamps,
        [exerciseId]: new Date().toISOString()
      }
    };
    saveProgress(newProgress);

    // Save to Supabase if user is logged in
    if (user) {
      try {
        await updateProgress(exerciseId, true, score);
      } catch (error) {
        console.error('Failed to save progress to Supabase:', error);
      }
    }
  };

  const saveCode = async (exerciseId: string, code: string, results?: any) => {
    const newProgress = {
      ...progress,
      savedCode: {
        ...progress.savedCode,
        [exerciseId]: code
      }
    };
    saveProgress(newProgress);

    // Save to Supabase if user is logged in
    if (user) {
      try {
        await saveSubmission(exerciseId, code, results || null);
      } catch (error) {
        console.error('Failed to save code to Supabase:', error);
      }
    }
  };

  const exportProgress = () => {
    return {
      version: '1.0',
      exportDate: new Date().toISOString(),
      progress: progress
    };
  };

  const importProgress = (data: any) => {
    if (data.version === '1.0' && data.progress) {
      saveProgress(data.progress);
    } else {
      throw new Error('Invalid progress data format');
    }
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      completeExercise,
      saveCode,
      exportProgress,
      importProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};