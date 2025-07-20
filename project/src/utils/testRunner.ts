import { TestCase } from '../components/TestResults';

export interface ExerciseTestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
}

export const runTests = async (
  code: string,
  testCases: ExerciseTestCase[],
  compileAndRun: (code: string, input: string) => Promise<{ output: string; error?: string }>
): Promise<TestCase[]> => {
  const results: TestCase[] = [];

  for (const testCase of testCases) {
    const startTime = Date.now();
    
    try {
      const result = await compileAndRun(code, testCase.input);
      const executionTime = Date.now() - startTime;
      
      if (result.error) {
        results.push({
          ...testCase,
          actualOutput: '',
          passed: false,
          error: result.error,
          executionTime
        });
      } else {
        const actualOutput = result.output.trim();
        const expectedOutput = testCase.expectedOutput.trim();
        const passed = actualOutput === expectedOutput;
        
        results.push({
          ...testCase,
          actualOutput,
          passed,
          executionTime
        });
      }
    } catch (error) {
      const executionTime = Date.now() - startTime;
      results.push({
        ...testCase,
        actualOutput: '',
        passed: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        executionTime
      });
    }
  }

  return results;
};