import React, { createContext, useContext, useState, useEffect } from 'react';
import { wasmCompiler } from '../utils/compiler';

interface WasmContextType {
  isReady: boolean;
  compileAndRun: (code: string, input?: string) => Promise<{ output: string; error?: string }>;
  isLoading: boolean;
}

const WasmContext = createContext<WasmContextType | undefined>(undefined);

export const useWasm = () => {
  const context = useContext(WasmContext);
  if (!context) {
    throw new Error('useWasm must be used within a WasmProvider');
  }
  return context;
};

export const WasmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeWasm = async () => {
      try {
        await wasmCompiler.initialize();
        setIsReady(true);
      } catch (error) {
        console.error('Failed to initialize WebAssembly compiler:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeWasm();
  }, []);

  const compileAndRun = async (code: string, input: string = ''): Promise<{ output: string; error?: string }> => {
    if (!isReady) {
      throw new Error('WebAssembly compiler not ready');
    }

    try {
      const result = await wasmCompiler.execute(code, input);
      
      if (result.error) {
        return { output: '', error: result.error };
      }
      
      return { output: result.output };
    } catch (error) {
      return { 
        output: '', 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  };

  return (
    <WasmContext.Provider value={{ isReady, compileAndRun, isLoading }}>
      {children}
    </WasmContext.Provider>
  );
};