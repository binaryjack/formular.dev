# Debugging Setup Guide

## 🚀 Quick Start

Your monorepo is now configured for full-stack debugging! Here's how to get started:

### From Root Directory

1. **Start Development with Auto-Rebuild**:
   ```bash
   pnpm run dev
   ```
   This runs both the lib in watch mode and the React dev server.

2. **Individual Commands**:
   ```bash
   # Start React app only (dev environment)
   pnpm run start:dev
   
   # Build lib only
   pnpm run build:lib
   
   # Run tests
   pnpm run test
   ```

## 🔍 Debugging Configurations

Open the **Run and Debug** panel in VS Code (Ctrl+Shift+D) and you'll see these options:

### 🎯 Full Stack Debugging (Recommended)
- **🚀🔍 Full Stack Debug (Dev)**: Starts both the React server and Chrome debugger
- **🚀🔍 Full Stack Debug (Integration)**: Same for integration environment

### 🖥️ Server Only
- **🚀 Launch React App (Dev/Integration/Production)**: Start the development server only

### 🌐 Browser Debugging
- **🔍 Debug Chrome: React + Lib (Dev/Integration)**: Debug in Chrome with breakpoints in both React code and your lib

### 🧪 Test Debugging
- **🧪 Debug: Lib Tests**: Debug Jest tests in your lib
- **🧪 Debug: React Tests**: Debug Jest tests in your React components

## 📋 How to Debug

### 1. Set Breakpoints
- **In your React components**: Set breakpoints in any `.tsx` or `.ts` file in `packages/vendors/react/formular.components/src/`
- **In your lib**: Set breakpoints in any `.ts` file in `packages/lib/src/`

### 2. Start Debugging
1. Choose **🚀🔍 Full Stack Debug (Dev)** from the debug dropdown
2. Press F5 or click the play button
3. Wait for both the server to start and Chrome to open
4. Your breakpoints will be hit when the code executes

### 3. Debug Features
- **Step through code**: Use F10 (step over), F11 (step into), Shift+F11 (step out)
- **Inspect variables**: Hover over variables or check the Variables panel
- **Call stack**: See the execution path in the Call Stack panel
- **Console**: Use the Debug Console to evaluate expressions

## 🔧 VS Code Tasks

Use Ctrl+Shift+P → "Tasks: Run Task" to access:
- **🏗️ Build Lib for Development**: Build the lib once
- **👀 Watch Lib**: Build the lib in watch mode (rebuilds on changes)
- **🚀 Start React Dev Server**: Start just the React server
- **🚀👀 Start Development with Lib Watch**: Start both lib watch and React server
- **🧹 Clean All**: Remove all dist folders
- **📦 Install Dependencies**: Run pnpm install

## 📁 Project Structure

```
root/
├── packages/
│   ├── lib/                          # Your core library
│   │   ├── src/                      # ✅ Set breakpoints here
│   │   └── dist/                     # Built library (with source maps)
│   └── vendors/react/formular.components/  # Your React app
│       ├── src/                      # ✅ Set breakpoints here
│       └── dist/                     # Built React app
└── .vscode/                          # VS Code configuration
    ├── launch.json                   # Debug configurations
    ├── tasks.json                    # Build tasks
    └── settings.json                 # Editor settings
```

## 💡 Tips

1. **Source Maps**: Both projects now generate source maps for proper debugging
2. **Monorepo Support**: The React app will automatically use the latest version of your lib during development
3. **Hot Reload**: Changes in your lib will trigger a rebuild, and changes in React will hot-reload the browser
4. **Breakpoint Management**: You can set breakpoints in both projects simultaneously
5. **Test Debugging**: Use the test debug configurations to debug your Jest tests with breakpoints

## 🚨 Troubleshooting

- **Breakpoints not hitting**: Make sure source maps are enabled and the project is built
- **Can't find lib code**: Check that the lib is built (`pnpm run build:lib`) before starting the React app
- **Port conflicts**: The React app runs on port 3000 by default
- **TypeScript errors**: Run `pnpm install` to ensure all dependencies are installed

Happy debugging! 🎉
