import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Star,
  Code2,
  Trophy,
  Target,
  Zap
} from 'lucide-react';
import { exercises } from '../data/exercises';
import { useProgress } from '../contexts/ProgressContext';

export const ExerciseListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { progress } = useProgress();

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = [...new Set(exercises.map(ex => ex.category))];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-900/30';
      case 'intermediate': return 'text-yellow-400 bg-yellow-900/30';
      case 'advanced': return 'text-red-400 bg-red-900/30';
      default: return 'text-gray-400 bg-gray-900/30';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return <Target className="h-4 w-4" />;
      case 'intermediate': return <Zap className="h-4 w-4" />;
      case 'advanced': return <Trophy className="h-4 w-4" />;
      default: return <Code2 className="h-4 w-4" />;
    }
  };

  const isCompleted = (exerciseId: string) => progress.completed.includes(exerciseId);
  const getScore = (exerciseId: string) => progress.scores[exerciseId] || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center animate-fadeIn">
        <h1 className="text-4xl font-bold text-white mb-4">
          C Programming Exercises
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Master C programming through hands-on exercises. From basics to advanced concepts.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn">
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {exercises.length}
          </div>
          <div className="text-gray-400">Total Exercises</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {progress.completed.length}
          </div>
          <div className="text-gray-400">Completed</div>
        </div>
        <div className="card p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {Math.round((progress.completed.length / exercises.length) * 100)}%
          </div>
          <div className="text-gray-400">Progress</div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6 space-y-4 animate-fadeIn">
        <div className="flex items-center space-x-2 text-white mb-4">
          <Filter className="h-5 w-5" />
          <span className="font-medium">Filters</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-primary pl-10"
            />
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="input-primary"
          >
            <option value="all">All Difficulties</option>
            {difficulties.map(difficulty => (
              <option key={difficulty} value={difficulty}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-primary"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise, index) => {
          const completed = isCompleted(exercise.id);
          const score = getScore(exercise.id);
          
          return (
            <Link
              key={exercise.id}
              to={`/exercise/${exercise.id}`}
              className="card-hover p-6 group animate-fadeIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {completed ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <Clock className="h-6 w-6 text-gray-400" />
                  )}
                  <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getDifficultyColor(exercise.difficulty)}`}>
                    {getDifficultyIcon(exercise.difficulty)}
                    <span>{exercise.difficulty}</span>
                  </div>
                </div>
                {completed && score > 0 && (
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{score}%</span>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
                {exercise.title}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {exercise.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded">
                  {exercise.category}
                </span>
                <span className="text-xs text-gray-400">
                  {exercise.testCases.length} tests
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12 animate-fadeIn">
          <Code2 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-400 mb-2">No exercises found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};