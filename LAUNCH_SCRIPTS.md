# Launch Scripts Documentation

This document describes the various launch scripts and configurations available for running the FormularJs application with different environment variable files.

## Environment Files

The project uses different environment files for different deployment scenarios:

- `.env.development` - Local development environment
- `.env.integration` - Integration/staging environment
- `.env.production` - Production environment
- `.env` - Base environment file (fallback)

Each environment file contains specific configuration for:

- `VITE_ENVIRONMENT` - Current environment name
- `VITE_FRONT` - Frontend URL
- `VITE_BACKEND` - Backend API URL
- `VITE_MAIL_ENDPOINT` - Mail service endpoint
- `VITE_CAPTCHA_ENDPOINT` - Captcha service endpoint
- Other environment-specific variables

## NPM Scripts

### Development Server Scripts

```bash
npm run start:dev         # Start with development environment
npm run start:integration # Start with integration environment
npm run start:production  # Start with production environment
npm start                 # Default to development environment
```

### Build Scripts

```bash
npm run build:dev         # Build for development
npm run build:integration # Build for integration
npm run build:production  # Build for production
npm run build            # Default TypeScript build
```

### Preview/Serve Scripts

```bash
npm run serve:dev         # Serve built app with dev env
npm run serve:integration # Serve built app with integration env
npm run serve:production  # Serve built app with production env
npm run serve            # Default serve (no env vars)
```

## VS Code Launch Configurations

The `.vscode/launch.json` file contains several launch configurations:

### Server Launch Configurations

- **Launch Development Server** - Starts dev server with development environment
- **Launch Integration Server** - Starts dev server with integration environment
- **Launch Production Server** - Starts dev server with production environment

### Chrome Debug Configurations

- **Debug Chrome - Development** - Launches Chrome and attaches debugger for development
- **Debug Chrome - Integration** - Launches Chrome and attaches debugger for integration

### Build Configurations

- **Build Development** - Builds the app for development environment
- **Build Integration** - Builds the app for integration environment
- **Build Production** - Builds the app for production environment

### Preview Configurations

- **Serve Preview - Development** - Serves built app with development environment
- **Serve Preview - Integration** - Serves built app with integration environment
- **Serve Preview - Production** - Serves built app with production environment

### Debug Configurations

- **Debug Current File** - Debugs the currently open TypeScript file

## PowerShell Scripts

Located in the `scripts/` directory:

### `start-dev.ps1`

Starts the development server with development environment variables.

```powershell
.\scripts\start-dev.ps1
```

### `start-integration.ps1`

Starts the development server with integration environment variables.

```powershell
.\scripts\start-integration.ps1
```

### `start-production.ps1`

Starts the development server with production environment variables.

```powershell
.\scripts\start-production.ps1
```

### `build.ps1`

Builds the application for a specified environment.

```powershell
.\scripts\build.ps1 -Environment dev
.\scripts\build.ps1 -Environment integration
.\scripts\build.ps1 -Environment production
```

### `serve.ps1`

Serves the built application with specified environment variables.

```powershell
.\scripts\serve.ps1 -Environment dev
.\scripts\serve.ps1 -Environment integration
.\scripts\serve.ps1 -Environment production
```

## Batch Scripts

For users who prefer CMD, equivalent `.bat` files are available:

- `start-dev.bat` - Start development server with development environment
- `start-integration.bat` - Start development server with integration environment
- `start-production.bat` - Start development server with production environment

## VS Code Tasks

The `.vscode/tasks.json` file includes tasks that can be run via Command Palette (`Ctrl+Shift+P` → "Tasks: Run Task"):

- **npm: start:dev** - Start development server with development environment
- **npm: start:integration** - Start development server with integration environment
- **npm: start:production** - Start development server with production environment
- **npm: build:dev** - Build for development environment
- **npm: build:integration** - Build for integration environment
- **npm: build:production** - Build for production environment (default build task)

## Usage Examples

### VS Code

1. Open the Run and Debug view (`Ctrl+Shift+D`)
2. Select a launch configuration from the dropdown
3. Press F5 or click the play button

### Command Line

```bash
# Using npm scripts
npm run start:dev
npm run build:production
npm run serve:integration

# Using PowerShell scripts
.\scripts\start-dev.ps1
.\scripts\build.ps1 -Environment production
.\scripts\serve.ps1 -Environment integration

# Using batch scripts
.\scripts\start-dev.bat
.\scripts\start-integration.bat
.\scripts\start-production.bat
```

### VS Code Command Palette

1. Press `Ctrl+Shift+P`
2. Type "Tasks: Run Task"
3. Select the desired task from the list

## Environment Variable Loading

All scripts use `env-cmd` to load environment variables from the respective `.env` files:

```bash
env-cmd -f ./.env.development --use-shell vite
```

This ensures that:

- Environment variables are loaded before starting the Vite server
- The correct environment configuration is used
- Variables are available to both the build process and the running application

## Troubleshooting

### Common Issues

1. **env-cmd not found**: Install it with `npm install env-cmd --save-dev`
2. **Environment file not found**: Ensure the `.env.*` files exist in the project root
3. **Port already in use**: The development server runs on port 3000 by default
4. **PowerShell execution policy**: You may need to run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Debugging

Use the Chrome debug configurations to debug your application:

1. Set breakpoints in your TypeScript/React code
2. Launch a debug configuration from VS Code
3. Chrome will open with the debugger attached
4. Breakpoints will be hit automatically

## Dependencies

The launch scripts depend on:

- `env-cmd` - For loading environment variables
- `vite` - Development server and build tool
- `typescript` - TypeScript compiler
- `react` - React framework

Make sure all dependencies are installed with `npm install`.
