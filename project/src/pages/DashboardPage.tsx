import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Clock, Code2, TrendingUp, Download, Upload } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { progress, exportProgress, importProgress } = useProgress();

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cortex-progress-${user?.email}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target?.result as string);
          importProgress(data);
        } catch (error) {
          alert('Invalid progress file format');
        }
      };
      reader.readAsText(file);
    }
  };

  const totalExercises = 50; // This would come from exercise data
  const completedExercises = progress.completed.length;
  const completionRate = (completedExercises / totalExercises) * 100;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.email}!
        </h1>
        <p className="text-gray-400">
          Continue your C programming journey
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-white">{completedExercises}</p>
            </div>
            <Trophy className="h-8 w-8 text-yellow-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Total Exercises</p>
              <p className="text-2xl font-bold text-white">{totalExercises}</p>
            </div>
            <BookOpen className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Completion Rate</p>
              <p className="text-2xl font-bold text-white">{completionRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Last Active</p>
              <p className="text-2xl font-bold text-white">Today</p>
            </div>
            <Clock className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Progress Overview</h2>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mt-2">
          {completedExercises} of {totalExercises} exercises completed
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Link
              to="/exercises"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <Code2 className="h-5 w-5 text-blue-400" />
              <span className="text-white">Browse Exercises</span>
            </Link>
            <Link
              to="/exercises"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              <BookOpen className="h-5 w-5 text-green-400" />
              <span className="text-white">Continue Learning</span>
            </Link>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Data Management</h3>
          <div className="space-y-3">
            <button
              onClick={handleExport}
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors w-full"
            >
              <Download className="h-5 w-5 text-blue-400" />
              <span className="text-white">Export Progress</span>
            </button>
            <label className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors cursor-pointer">
              <Upload className="h-5 w-5 text-green-400" />
              <span className="text-white">Import Progress</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};