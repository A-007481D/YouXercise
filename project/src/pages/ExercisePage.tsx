import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Play, 
  Save, 
  RotateCcw, 
  CheckCircle, 
  Trophy,
  BookOpen,
  Target,
  Clock
} from 'lucide-react';
import { CodeEditor } from '../components/CodeEditor';
import { TestResults, TestCase } from '../components/TestResults';
import { exercises } from '../data/exercises';
import { useWasm } from '../contexts/WasmContext';
import { useProgress } from '../contexts/ProgressContext';
import { runTests } from '../utils/testRunner';

export const ExercisePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { compileAndRun } = useWasm();
  const { progress, completeExercise, saveCode } = useProgress();

  const exercise = exercises.find(ex => ex.id === id);
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState<TestCase[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (exercise) {
      // Load saved code or use starter code
      const savedCode = progress.savedCode[exercise.id];
      setCode(savedCode || exercise.starterCode);
      
      // Initialize test cases
      setTestResults(exercise.testCases.map(tc => ({
        id: tc.id,
        name: tc.name,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
      })));
    }
  }, [exercise, progress.savedCode]);

  if (!exercise) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Exercise Not Found</h1>
          <Link to="/exercises" className="btn-primary">
            Back to Exercises
          </Link>
        </div>
      </div>
    );
  }

  const handleRunTests = async () => {
    setIsRunning(true);
    try {
      const results = await runTests(code, exercise.testCases, compileAndRun);
      setTestResults(results);
      
      // Check if all tests passed
      const allPassed = results.every(result => result.passed);
      const score = Math.round((results.filter(r => r.passed).length / results.length) * 100);
      
      if (allPassed) {
        completeExercise(exercise.id, score);
      }
      
      // Save code and results
      saveCode(exercise.id, code, results);
    } catch (error) {
      console.error('Error running tests:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveCode = () => {
    saveCode(exercise.id, code);
    setLastSaved(new Date());
  };

  const handleResetCode = () => {
    if (confirm('Are you sure you want to reset your code? This will restore the starter code.')) {
      setCode(exercise.starterCode);
    }
  };

  const isCompleted = progress.completed.includes(exercise.id);
  const score = progress.scores[exercise.id] || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 animate-fadeIn">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/exercises')}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">{exercise.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                exercise.difficulty === 'beginner' ? 'bg-green-900/30 text-green-400' :
                exercise.difficulty === 'intermediate' ? 'bg-yellow-900/30 text-yellow-400' :
                'bg-red-900/30 text-red-400'
              }`}>
                {exercise.difficulty}
              </span>
              <span className="text-gray-400 text-sm">{exercise.category}</span>
              {isCompleted && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-medium">Completed ({score}%)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleSaveCode}
            className="btn-secondary flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button
            onClick={handleResetCode}
            className="btn-secondary flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Exercise Description */}
        <div className="space-y-6 animate-fadeIn">
          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Description</h2>
            </div>
            <p className="text-gray-300 leading-relaxed">{exercise.description}</p>
          </div>

          <div className="card p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Target className="h-5 w-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Requirements</h2>
            </div>
            <ul className="space-y-2">
              {exercise.requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2 text-gray-300">
                  <span className="text-green-400 mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {lastSaved && (
            <div className="text-sm text-gray-400 text-center">
              <Clock className="h-4 w-4 inline mr-1" />
              Last saved: {lastSaved.toLocaleTimeString()}
            </div>
          )}
        </div>

        {/* Right Panel - Code Editor and Results */}
        <div className="space-y-6 animate-fadeIn">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">Code Editor</h2>
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  isRunning
                    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                    : 'btn-success'
                }`}
              >
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Run Tests</span>
                  </>
                )}
              </button>
            </div>
            <CodeEditor
              value={code}
              onChange={setCode}
              height="400px"
            />
          </div>

          <TestResults
            testCases={testResults}
            isRunning={isRunning}
            onRunTests={handleRunTests}
          />
        </div>
      </div>
    </div>
  );
};