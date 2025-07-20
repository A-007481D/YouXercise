import React from 'react';
import { CheckCircle, XCircle, Clock, AlertCircle, Play } from 'lucide-react';

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  passed?: boolean;
  error?: string;
  executionTime?: number;
}

interface TestResultsProps {
  testCases: TestCase[];
  isRunning: boolean;
  onRunTests: () => void;
}

export const TestResults: React.FC<TestResultsProps> = ({ 
  testCases, 
  isRunning, 
  onRunTests 
}) => {
  const passedTests = testCases.filter(test => test.passed).length;
  const totalTests = testCases.length;
  const allPassed = passedTests === totalTests && totalTests > 0;

  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Test Results</h3>
        <button
          onClick={onRunTests}
          disabled={isRunning}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            isRunning
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'btn-primary'
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

      {totalTests > 0 && (
        <div className="flex items-center space-x-4">
          <div className={`text-sm font-medium ${
            allPassed ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {passedTests}/{totalTests} tests passed
          </div>
          <div className="flex-1 progress-bar">
            <div 
              className={`progress-fill ${
                allPassed ? 'from-green-500 to-emerald-500' : 'from-yellow-500 to-orange-500'
              }`}
              style={{ width: `${(passedTests / totalTests) * 100}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {testCases.map((testCase) => (
          <div
            key={testCase.id}
            className={`p-4 rounded-lg border transition-all duration-200 ${
              testCase.passed === undefined
                ? 'bg-gray-800 border-gray-600'
                : testCase.passed
                ? 'bg-green-900/30 border-green-600'
                : 'bg-red-900/30 border-red-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {testCase.passed === undefined ? (
                  <Clock className="h-4 w-4 text-gray-400" />
                ) : testCase.passed ? (
                  <CheckCircle className="h-4 w-4 text-green-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-red-400" />
                )}
                <span className="font-medium text-white">{testCase.name}</span>
              </div>
              {testCase.executionTime && (
                <span className="text-xs text-gray-400">
                  {testCase.executionTime}ms
                </span>
              )}
            </div>

            {testCase.input && (
              <div className="mb-2">
                <div className="text-xs text-gray-400 mb-1">Input:</div>
                <div className="bg-gray-900 p-2 rounded text-sm font-mono text-gray-300">
                  {testCase.input}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <div className="text-xs text-gray-400 mb-1">Expected Output:</div>
                <div className="bg-gray-900 p-2 rounded text-sm font-mono text-gray-300 min-h-[2rem]">
                  {testCase.expectedOutput}
                </div>
              </div>
              
              {testCase.actualOutput !== undefined && (
                <div>
                  <div className="text-xs text-gray-400 mb-1">Actual Output:</div>
                  <div className={`p-2 rounded text-sm font-mono min-h-[2rem] ${
                    testCase.passed 
                      ? 'bg-green-900/20 text-green-300' 
                      : 'bg-red-900/20 text-red-300'
                  }`}>
                    {testCase.actualOutput}
                  </div>
                </div>
              )}
            </div>

            {testCase.error && (
              <div className="mt-3">
                <div className="flex items-center space-x-2 text-red-400 mb-1">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-xs font-medium">Error:</span>
                </div>
                <div className="bg-red-900/20 p-2 rounded text-sm font-mono text-red-300">
                  {testCase.error}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {testCases.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No test results yet. Click "Run Tests" to execute your code.</p>
        </div>
      )}
    </div>
  );
};