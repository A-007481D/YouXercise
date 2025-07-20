import React, { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import { VirtualKeyboard } from './VirtualKeyboard';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  height?: string;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'c',
  height = '400px',
  readOnly = false
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isEditorFocused, setIsEditorFocused] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (editorRef.current) {
      // Configure Monaco Editor
      monaco.editor.defineTheme('cortex-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [
          { token: 'comment', foreground: '6A9955' },
          { token: 'keyword', foreground: '569CD6' },
          { token: 'string', foreground: 'CE9178' },
          { token: 'number', foreground: 'B5CEA8' },
          { token: 'type', foreground: '4EC9B0' },
        ],
        colors: {
          'editor.background': '#0f172a',
          'editor.foreground': '#e2e8f0',
          'editorLineNumber.foreground': '#64748b',
          'editor.selectionBackground': '#334155',
          'editor.lineHighlightBackground': '#1e293b',
        }
      });

      const editor = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme: 'cortex-dark',
        fontSize: isMobile ? 14 : 16,
        fontFamily: 'JetBrains Mono, Fira Code, Consolas, monospace',
        lineNumbers: 'on',
        minimap: { enabled: !isMobile },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: isMobile ? 'on' : 'off',
        readOnly,
        tabSize: 2,
        insertSpaces: true,
        renderWhitespace: 'selection',
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true,
        },
        suggest: {
          showKeywords: true,
          showSnippets: true,
        },
        quickSuggestions: {
          other: true,
          comments: false,
          strings: false,
        },
      });

      monacoRef.current = editor;

      // Handle value changes
      editor.onDidChangeModelContent(() => {
        const newValue = editor.getValue();
        onChange(newValue);
      });

      // Handle focus events for virtual keyboard
      editor.onDidFocusEditorText(() => {
        setIsEditorFocused(true);
      });

      editor.onDidBlurEditorText(() => {
        setIsEditorFocused(false);
      });

      return () => {
        editor.dispose();
      };
    }
  }, [language, readOnly, isMobile]);

  // Update editor value when prop changes
  useEffect(() => {
    if (monacoRef.current && monacoRef.current.getValue() !== value) {
      monacoRef.current.setValue(value);
    }
  }, [value]);

  const handleVirtualKeyboardInsert = (text: string) => {
    if (monacoRef.current) {
      const editor = monacoRef.current;
      const position = editor.getPosition();
      
      if (position) {
        editor.executeEdits('virtual-keyboard', [{
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
          text: text,
        }]);
        
        // Move cursor to end of inserted text
        const newPosition = new monaco.Position(position.lineNumber, position.column + text.length);
        editor.setPosition(newPosition);
        editor.focus();
      }
    }
  };

  return (
    <div className="relative">
      <div 
        ref={editorRef} 
        style={{ height }}
        className="border border-gray-600 rounded-lg overflow-hidden"
      />
      <VirtualKeyboard 
        onInsert={handleVirtualKeyboardInsert}
        isVisible={isEditorFocused}
      />
    </div>
  );
};