// Global type declarations for browser APIs
declare global {
  // For server-side compatibility
  var localStorage:
    | {
        getItem(key: string): string | null;
        setItem(key: string, value: string): void;
        removeItem(key: string): void;
        clear(): void;
      }
    | undefined;
  // For setTimeout compatibility
  function setTimeout(callback: () => void, delay?: number): number;
  function setTimeout<T extends object>(
    callback: (this: T) => void,
    delay?: number,
    ...args: unknown[]
  ): number;
}

export {};
