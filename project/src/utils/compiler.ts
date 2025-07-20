// WebAssembly C Compiler Interface
// This simulates a C compiler that runs in the browser

export interface CompilationResult {
  success: boolean;
  output?: string;
  error?: string;
  warnings?: string[];
}

export interface ExecutionResult {
  output: string;
  error?: string;
  exitCode: number;
  executionTime: number;
}

class WasmCompiler {
  private isInitialized = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    // Simulate WebAssembly compiler initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.isInitialized = true;
    console.log('WebAssembly C compiler initialized');
  }

  async compile(sourceCode: string): Promise<CompilationResult> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    // Simulate compilation process
    await new Promise(resolve => setTimeout(resolve, 200));

    // Basic syntax checking (simplified)
    const errors = this.checkSyntax(sourceCode);
    
    if (errors.length > 0) {
      return {
        success: false,
        error: errors.join('\n')
      };
    }

    return {
      success: true,
      warnings: this.checkWarnings(sourceCode)
    };
  }

  async execute(sourceCode: string, input: string = ''): Promise<ExecutionResult> {
    const startTime = Date.now();
    
    try {
      // Compile first
      const compilationResult = await this.compile(sourceCode);
      
      if (!compilationResult.success) {
        return {
          output: '',
          error: compilationResult.error,
          exitCode: 1,
          executionTime: Date.now() - startTime
        };
      }

      // Simulate code execution
      const output = await this.simulateExecution(sourceCode, input);
      
      return {
        output,
        exitCode: 0,
        executionTime: Date.now() - startTime
      };
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Runtime error',
        exitCode: 1,
        executionTime: Date.now() - startTime
      };
    }
  }

  private checkSyntax(code: string): string[] {
    const errors: string[] = [];
    
    // Check for basic C syntax requirements
    if (!code.includes('#include')) {
      errors.push('Missing #include directive');
    }
    
    if (!code.includes('int main')) {
      errors.push('Missing main function');
    }
    
    // Check for balanced braces
    const openBraces = (code.match(/{/g) || []).length;
    const closeBraces = (code.match(/}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      errors.push('Unbalanced braces');
    }
    
    // Check for balanced parentheses
    const openParens = (code.match(/\(/g) || []).length;
    const closeParens = (code.match(/\)/g) || []).length;
    
    if (openParens !== closeParens) {
      errors.push('Unbalanced parentheses');
    }
    
    return errors;
  }

  private checkWarnings(code: string): string[] {
    const warnings: string[] = [];
    
    if (!code.includes('return 0')) {
      warnings.push('Main function should return 0');
    }
    
    return warnings;
  }

  private async simulateExecution(code: string, input: string): Promise<string> {
    // This is a simplified simulation of C code execution
    // In a real implementation, this would use WebAssembly
    
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Simulate different program behaviors based on code content
    if (code.includes('printf("Hello, World!")')) {
      return 'Hello, World!';
    }
    
    if (code.includes('scanf') && code.includes('printf')) {
      // Simulate input/output programs
      const lines = input.split('\n').filter(line => line.trim());
      
      if (code.includes('you are') && lines.length >= 2) {
        const name = lines[0];
        const age = lines[1];
        return `Hello ${name}, you are ${age} years old!`;
      }
      
      if (code.includes('calculator') || code.includes('operator')) {
        const parts = input.split(' ');
        if (parts.length >= 3) {
          const num1 = parseFloat(parts[0]);
          const operator = parts[1];
          const num2 = parseFloat(parts[2]);
          
          if (operator === '/' && num2 === 0) {
            return 'Error: Division by zero!';
          }
          
          let result = 0;
          switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
          }
          return `Result: ${result.toFixed(2)}`;
        }
      }
      
      if (code.includes('even') || code.includes('odd')) {
        const num = parseInt(input);
        return `${num} is ${num % 2 === 0 ? 'even' : 'odd'}`;
      }
      
      if (code.includes('factorial')) {
        const n = parseInt(input);
        let factorial = 1;
        for (let i = 1; i <= n; i++) {
          factorial *= i;
        }
        return `Factorial of ${n} is ${factorial}`;
      }
      
      if (code.includes('fibonacci')) {
        const n = parseInt(input);
        const fib = [0, 1];
        for (let i = 2; i < n; i++) {
          fib[i] = fib[i-1] + fib[i-2];
        }
        return `Fibonacci sequence: ${fib.slice(0, n).join(' ')}`;
      }
      
      if (code.includes('prime')) {
        const num = parseInt(input);
        const isPrime = num > 1 && Array.from({length: Math.sqrt(num)}, (_, i) => i + 2)
          .every(i => num % i !== 0);
        return `${num} is ${isPrime ? 'prime' : 'not prime'}`;
      }
      
      if (code.includes('sum') && code.includes('average')) {
        const lines = input.split('\n');
        const n = parseInt(lines[0]);
        const numbers = lines[1].split(' ').map(Number);
        const sum = numbers.reduce((a, b) => a + b, 0);
        const average = sum / n;
        return `Sum: ${sum}\nAverage: ${average.toFixed(2)}`;
      }
      
      if (code.includes('reverse')) {
        return `Reversed: ${input.split('').reverse().join('')}`;
      }
      
      if (code.includes('grade')) {
        const score = parseInt(input);
        let grade = 'F';
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        return `Score: ${score}, Grade: ${grade}`;
      }
    }
    
    // Default output for unrecognized programs
    return 'Program executed successfully';
  }
}

export const wasmCompiler = new WasmCompiler();