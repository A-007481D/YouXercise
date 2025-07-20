import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xelxopajhzzjuowptfdu.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbHhvcGFqaHp6anVvd3B0ZmR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NjM4MDgsImV4cCI6MjA2ODQzOTgwOH0.MFLqt4WwIxYc5T8oj2Vb2d6ViGRY8qgJc6bgxgPDIog';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get current user ID
export const getCurrentUserId = () => {
  const user = supabase.auth.getUser();
  return user;
};

// User Progress Functions
export const getUserProgress = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', user.id);
};

export const updateProgress = async (exerciseId: string, completed: boolean, score: number = 0) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      exercise_id: exerciseId,
      completed,
      score,
      completed_at: completed ? new Date().toISOString() : null
    });
};

// Submission Functions
export const saveSubmission = async (exerciseId: string, code: string, results: any = null) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return await supabase
    .from('submissions')
    .upsert({
      user_id: user.id,
      exercise_id: exerciseId,
      code,
      results
    });
};

export const getSubmission = async (exerciseId: string) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  return await supabase
    .from('submissions')
    .select('*')
    .eq('user_id', user.id)
    .eq('exercise_id', exerciseId)
    .single();
};