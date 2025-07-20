import React from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface VirtualKeyboardProps {
  onInsert: (text: string) => void;
  isVisible: boolean;
}

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onInsert, isVisible }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  if (!isMobile || !isVisible) return null;

  const symbols = [
    { text: '{', label: '{' },
    { text: '}', label: '}' },
    { text: '(', label: '(' },
    { text: ')', label: ')' },
    { text: '[', label: '[' },
    { text: ']', label: ']' },
    { text: ';', label: ';' },
    { text: '=', label: '=' },
    { text: '<', label: '<' },
    { text: '>', label: '>' },
    { text: '+', label: '+' },
    { text: '-', label: '-' },
    { text: '*', label: '*' },
    { text: '/', label: '/' },
    { text: '%', label: '%' },
    { text: '&', label: '&' },
    { text: '|', label: '|' },
    { text: '!', label: '!' },
    { text: '"', label: '"' },
    { text: "'", label: "'" },
  ];

  const keywords = [
    { text: 'int ', label: 'int' },
    { text: 'char ', label: 'char' },
    { text: 'float ', label: 'float' },
    { text: 'double ', label: 'double' },
    { text: 'void ', label: 'void' },
    { text: 'if (', label: 'if' },
    { text: 'else ', label: 'else' },
    { text: 'for (', label: 'for' },
    { text: 'while (', label: 'while' },
    { text: 'return ', label: 'return' },
    { text: 'printf("', label: 'printf' },
    { text: 'scanf("', label: 'scanf' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-600 p-4 z-50 animate-slideIn">
      <div className="max-w-full overflow-x-auto">
        {/* Symbols Row */}
        <div className="mb-3">
          <div className="text-xs text-gray-400 mb-2 font-medium">Symbols</div>
          <div className="flex space-x-2 pb-2">
            {symbols.map((symbol, index) => (
              <button
                key={index}
                onClick={() => onInsert(symbol.text)}
                className="flex-shrink-0 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-mono text-sm transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {symbol.label}
              </button>
            ))}
          </div>
        </div>

        {/* Keywords Row */}
        <div>
          <div className="text-xs text-gray-400 mb-2 font-medium">Keywords</div>
          <div className="flex space-x-2 pb-2">
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => onInsert(keyword.text)}
                className="flex-shrink-0 bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                {keyword.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};