export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
}

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  requirements: string[];
  starterCode: string;
  testCases: TestCase[];
}

export const exercises: Exercise[] = [
  {
    id: 'hello-world',
    title: 'Hello World',
    description: 'Write a program that prints "Hello, World!" to the console. This is the traditional first program in any programming language.',
    difficulty: 'beginner',
    category: 'basics',
    requirements: [
      'Print exactly "Hello, World!" to stdout',
      'Use the printf function',
      'Include necessary headers'
    ],
    starterCode: `#include <stdio.h>

int main() {
    // Write your code here
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Basic Output',
        input: '',
        expectedOutput: 'Hello, World!'
      }
    ]
  },
  {
    id: 'variables-and-input',
    title: 'Variables and Input',
    description: 'Create a program that asks for the user\'s name and age, then prints a personalized greeting.',
    difficulty: 'beginner',
    category: 'basics',
    requirements: [
      'Read a string (name) and integer (age) from user input',
      'Print a greeting in the format: "Hello [name], you are [age] years old!"',
      'Handle input properly with scanf'
    ],
    starterCode: `#include <stdio.h>

int main() {
    // Declare variables for name and age
    
    // Read input from user
    
    // Print the greeting
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Basic Greeting',
        input: 'Alice\n25',
        expectedOutput: 'Hello Alice, you are 25 years old!'
      },
      {
        id: 'test2',
        name: 'Different Input',
        input: 'Bob\n30',
        expectedOutput: 'Hello Bob, you are 30 years old!'
      }
    ]
  },
  {
    id: 'simple-calculator',
    title: 'Simple Calculator',
    description: 'Build a calculator that performs basic arithmetic operations (addition, subtraction, multiplication, division) on two numbers.',
    difficulty: 'beginner',
    category: 'basics',
    requirements: [
      'Read two numbers and an operator (+, -, *, /) from input',
      'Perform the calculation and print the result',
      'Handle division by zero with an error message'
    ],
    starterCode: `#include <stdio.h>

int main() {
    double num1, num2, result;
    char operator;
    
    // Read input: number operator number
    printf("Enter calculation (e.g., 5 + 3): ");
    scanf("%lf %c %lf", &num1, &operator, &num2);
    
    // Perform calculation based on operator
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Addition',
        input: '5 + 3',
        expectedOutput: 'Result: 8.00'
      },
      {
        id: 'test2',
        name: 'Division',
        input: '10 / 2',
        expectedOutput: 'Result: 5.00'
      },
      {
        id: 'test3',
        name: 'Division by Zero',
        input: '5 / 0',
        expectedOutput: 'Error: Division by zero!'
      }
    ]
  },
  {
    id: 'even-odd-checker',
    title: 'Even or Odd Checker',
    description: 'Write a program that determines whether a given number is even or odd.',
    difficulty: 'beginner',
    category: 'control-flow',
    requirements: [
      'Read an integer from user input',
      'Determine if the number is even or odd',
      'Print the result in the format: "[number] is even" or "[number] is odd"'
    ],
    starterCode: `#include <stdio.h>

int main() {
    int number;
    
    printf("Enter a number: ");
    scanf("%d", &number);
    
    // Check if number is even or odd
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Even Number',
        input: '4',
        expectedOutput: '4 is even'
      },
      {
        id: 'test2',
        name: 'Odd Number',
        input: '7',
        expectedOutput: '7 is odd'
      },
      {
        id: 'test3',
        name: 'Zero',
        input: '0',
        expectedOutput: '0 is even'
      }
    ]
  },
  {
    id: 'factorial-calculator',
    title: 'Factorial Calculator',
    description: 'Calculate the factorial of a given number using loops. Factorial of n (n!) is the product of all positive integers less than or equal to n.',
    difficulty: 'intermediate',
    category: 'loops',
    requirements: [
      'Read a non-negative integer from input',
      'Calculate its factorial using a loop',
      'Handle the special case where 0! = 1',
      'Print the result in the format: "Factorial of [n] is [result]"'
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n;
    long long factorial = 1;
    
    printf("Enter a number: ");
    scanf("%d", &n);
    
    // Calculate factorial using a loop
    
    printf("Factorial of %d is %lld\\n", n, factorial);
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Factorial of 5',
        input: '5',
        expectedOutput: 'Factorial of 5 is 120'
      },
      {
        id: 'test2',
        name: 'Factorial of 0',
        input: '0',
        expectedOutput: 'Factorial of 0 is 1'
      },
      {
        id: 'test3',
        name: 'Factorial of 7',
        input: '7',
        expectedOutput: 'Factorial of 7 is 5040'
      }
    ]
  },
  {
    id: 'fibonacci-sequence',
    title: 'Fibonacci Sequence',
    description: 'Generate the first n numbers in the Fibonacci sequence, where each number is the sum of the two preceding ones.',
    difficulty: 'intermediate',
    category: 'loops',
    requirements: [
      'Read the number of terms (n) from input',
      'Generate and print the first n Fibonacci numbers',
      'Handle edge cases (n = 0, n = 1)',
      'Print numbers separated by spaces'
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, first = 0, second = 1, next;
    
    printf("Enter number of terms: ");
    scanf("%d", &n);
    
    printf("Fibonacci sequence: ");
    
    // Generate Fibonacci sequence
    
    printf("\\n");
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'First 5 terms',
        input: '5',
        expectedOutput: 'Fibonacci sequence: 0 1 1 2 3'
      },
      {
        id: 'test2',
        name: 'First 8 terms',
        input: '8',
        expectedOutput: 'Fibonacci sequence: 0 1 1 2 3 5 8 13'
      },
      {
        id: 'test3',
        name: 'Single term',
        input: '1',
        expectedOutput: 'Fibonacci sequence: 0'
      }
    ]
  },
  {
    id: 'prime-checker',
    title: 'Prime Number Checker',
    description: 'Determine whether a given number is prime. A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
    difficulty: 'intermediate',
    category: 'algorithms',
    requirements: [
      'Read an integer from input',
      'Check if the number is prime',
      'Print "[number] is prime" or "[number] is not prime"',
      'Handle edge cases (numbers ≤ 1)'
    ],
    starterCode: `#include <stdio.h>
#include <math.h>

int main() {
    int n, isPrime = 1;
    
    printf("Enter a number: ");
    scanf("%d", &n);
    
    // Check if number is prime
    
    if (isPrime && n > 1) {
        printf("%d is prime\\n", n);
    } else {
        printf("%d is not prime\\n", n);
    }
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Prime Number',
        input: '17',
        expectedOutput: '17 is prime'
      },
      {
        id: 'test2',
        name: 'Composite Number',
        input: '15',
        expectedOutput: '15 is not prime'
      },
      {
        id: 'test3',
        name: 'Edge Case',
        input: '1',
        expectedOutput: '1 is not prime'
      }
    ]
  },
  {
    id: 'array-sum',
    title: 'Array Sum and Average',
    description: 'Read an array of integers and calculate both the sum and average of all elements.',
    difficulty: 'intermediate',
    category: 'arrays',
    requirements: [
      'Read the size of the array (n) and then n integers',
      'Calculate the sum of all elements',
      'Calculate and display the average (as a decimal)',
      'Print results in the specified format'
    ],
    starterCode: `#include <stdio.h>

int main() {
    int n, sum = 0;
    
    printf("Enter array size: ");
    scanf("%d", &n);
    
    int arr[n];
    
    printf("Enter %d numbers: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }
    
    // Calculate sum and average
    
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Basic Array',
        input: '5\n1 2 3 4 5',
        expectedOutput: 'Sum: 15\nAverage: 3.00'
      },
      {
        id: 'test2',
        name: 'Different Values',
        input: '4\n10 20 30 40',
        expectedOutput: 'Sum: 100\nAverage: 25.00'
      }
    ]
  },
  {
    id: 'string-reverser',
    title: 'String Reverser',
    description: 'Write a program that reads a string and prints it in reverse order.',
    difficulty: 'intermediate',
    category: 'strings',
    requirements: [
      'Read a string from input (up to 100 characters)',
      'Reverse the string without using built-in reverse functions',
      'Print the reversed string',
      'Handle strings with spaces'
    ],
    starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    char str[101];
    
    printf("Enter a string: ");
    fgets(str, sizeof(str), stdin);
    
    // Remove newline character if present
    str[strcspn(str, "\\n")] = 0;
    
    // Reverse the string
    
    printf("Reversed: %s\\n", str);
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'Simple Word',
        input: 'hello',
        expectedOutput: 'Reversed: olleh'
      },
      {
        id: 'test2',
        name: 'Sentence with Spaces',
        input: 'hello world',
        expectedOutput: 'Reversed: dlrow olleh'
      },
      {
        id: 'test3',
        name: 'Single Character',
        input: 'a',
        expectedOutput: 'Reversed: a'
      }
    ]
  },
  {
    id: 'grade-calculator',
    title: 'Grade Calculator',
    description: 'Create a program that calculates letter grades based on numerical scores using conditional statements.',
    difficulty: 'beginner',
    category: 'control-flow',
    requirements: [
      'Read a numerical score (0-100) from input',
      'Convert to letter grade: A (90-100), B (80-89), C (70-79), D (60-69), F (0-59)',
      'Print the result in format: "Score: [score], Grade: [letter]"',
      'Handle invalid scores (outside 0-100 range)'
    ],
    starterCode: `#include <stdio.h>

int main() {
    int score;
    char grade;
    
    printf("Enter score (0-100): ");
    scanf("%d", &score);
    
    // Determine letter grade
    
    printf("Score: %d, Grade: %c\\n", score, grade);
    return 0;
}`,
    testCases: [
      {
        id: 'test1',
        name: 'A Grade',
        input: '95',
        expectedOutput: 'Score: 95, Grade: A'
      },
      {
        id: 'test2',
        name: 'C Grade',
        input: '75',
        expectedOutput: 'Score: 75, Grade: C'
      },
      {
        id: 'test3',
        name: 'F Grade',
        input: '45',
        expectedOutput: 'Score: 45, Grade: F'
      }
    ]
  }
];