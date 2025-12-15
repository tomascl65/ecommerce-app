import angular from '@angular-eslint/eslint-plugin';
import angularParser from '@angular-eslint/template-parser';
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default [
  // Base JavaScript configuration
  js.configs.recommended,

  // TypeScript files configuration
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // DOM globals
        console: 'readonly',
        HTMLElement: 'readonly',
        ErrorEvent: 'readonly',
        window: 'readonly',
        document: 'readonly',
        setTimeout: 'readonly',
        localStorage: 'readonly',
        StorageEvent: 'readonly',
        // Testing globals (Jasmine)
        describe: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        it: 'readonly',
        fit: 'readonly',
        xit: 'readonly',
        expect: 'readonly',
        spyOn: 'readonly',
        jasmine: 'readonly',
        // Angular testing
        TestBed: 'readonly',
        // Utility globals
        alert: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier,
    },
    rules: {
      // DESHABILITAR TODAS las reglas problemáticas
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prefer-const': 'off',
      '@typescript-eslint/prefer-const': 'off',

      // Otras reglas útiles
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-var-requires': 'error',

      // General JavaScript/TypeScript rules
      'no-console': 'off',
      'no-debugger': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',

      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },

  // HTML files configuration
  {
    files: ['src/**/*.html'],
    languageOptions: {
      parser: angularParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
    plugins: {
      '@angular-eslint': angular,
      prettier,
    },
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      // Deshabilitar todas las reglas de Angular ESLint
      'no-unused-vars': 'off',
      '@angular-eslint/no-unused-vars': 'off',
    },
  },

  // Test files configuration
  {
    files: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },

  // Main entry files configuration
  {
    files: ['src/main.ts', 'src/polyfills.ts'],
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
    },
  },

  // Configuration files (CommonJS)
  {
    files: ['*.config.js', '*.config.mjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'no-undef': 'off', // Allow CommonJS globals
    },
  },
];
