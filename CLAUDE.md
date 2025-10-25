# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Film Friend is a Capacitor-based mobile application (iOS/Android) built with React, TypeScript, and Vite. It's a tool for film photographers to track their cameras, film rolls, and frames.

## Core Technologies

- **Framework**: React 19 with TypeScript
- **State Management**: Redux Toolkit with typed hooks
- **UI Library**: Material-UI (MUI) v7 with Emotion for styling
- **Forms**: React Hook Form with Zod validation
- **Routing**: React Router v7
- **Mobile Platform**: Capacitor 7 (iOS & Android)
- **Build Tool**: Vite with legacy plugin
- **Testing**: Vitest with React Testing Library

## Development Commands

```bash
# Start development server (accessible on local network)
npm run dev

# Build for production (runs TypeScript check first)
npm run build

# Run tests
npm test

# Lint (TypeScript check + Prettier check + ESLint)
npm run lint

# Format code
npm run format

# Preview production build
npm run preview
```

### Capacitor Commands

```bash
# Sync web assets to native projects
npx cap sync

# Open in Xcode (iOS)
npx cap open ios

# Open in Android Studio
npx cap open android

# Run on iOS
npx cap run ios

# Run on Android
npx cap run android
```

## Architecture

### State Management

The app uses Redux Toolkit with three slices:

1. **`cameraSlice`** (`src/store/cameraSlice.ts`): Manages cameras and film rolls
   - Actions: `addCamera`, `addRoll`
   - Stores camera metadata (shutter speeds, light meter, film format) and nested roll data

2. **`activeSlice`** (`src/store/activeSlice.ts`): Tracks currently active camera and roll
   - Actions: `setActiveCamera`, `setActiveRoll`
   - Used for navigation and context

3. **`appSlice`** (`src/store/appSlice.ts`): Global app settings
   - Actions: `setDarkMode`

**Selectors** are located in `src/selectors/` and use `createAppSelector` from the store for type safety. Examples:
- `selectActiveCamera`: Finds the active camera by joining active.cameraId with camera.cameras
- `selectActiveRoll`: Finds the active roll within the active camera
- `selectAtLeastOneCameraExists`: Boolean check for onboarding flow

### Data Model

Core types are defined in `src/types.ts`:

- **Camera**: Contains name, film format, shutter speeds, light meter info, and an array of rolls
- **Roll**: Film roll with ISO, frame count, load date, and an array of frames
- **RollFrame**: Individual frame data (aperture, shutter speed, date, location, notes)

ID types are branded strings:
- `CameraId`: `camera_${string}`
- `RollId`: `roll_${string}`

### Routing Structure

Routes are defined in `src/router.tsx`:

- `/` - Home page (shows onboarding or active camera/roll)
- `/flash` - Flash calculator page
- `/camera` - Camera list page
- `/camera/select` - Camera selection page
- `/camera/new` - Create new camera
- `/camera/:cameraId` - Camera detail page
- `/camera/:cameraId/roll/new` - Create new roll for camera
- `/camera/:cameraId/roll/:rollId` - Roll detail page
- `/settings` - App settings

All pages are wrapped in `PageWrapper` component which handles navigation.

### Component Patterns

- **Form Components**: Custom form inputs in `src/components/` (TextInput, NumberInput, BooleanInput, NumericInput) are designed to work with React Hook Form
- **Typed Hooks**: Use `useAppSelector` and `useAppDispatch` from `src/hooks/redux.ts` instead of raw Redux hooks for type safety
- **Navigation**: Use `RouterLink` component (wrapper around react-router-dom Link) for internal navigation
- **Page Structure**: Pages render different screens conditionally based on state (see HomePage.tsx for pattern)

### Forms and Validation

- Forms use React Hook Form with Zod validation via `@hookform/resolvers/zod`
- Custom hook `useZodForm` in `src/hooks/zod.ts` combines React Hook Form with Zod resolver
- Form components follow controlled component pattern with Material-UI

## Code Style

The project has strict ESLint configuration:

- **Import Order**: Alphabetically sorted, no blank lines between import groups
- **Sort Imports**: Members within imports are sorted
- **Padding**: Blank line required after block-like statements
- **Type Safety**: TypeScript strict mode with recommended type-checked rules
- **Semicolons**: Required
- **Unused Vars**: Prefix with `_` to ignore
- **React**: No need to import React in JSX files (React 17+ transform)
- **Formatting**: Prettier is used for code formatting

Run `npm run lint` before committing to catch issues.

## Testing

Tests use Vitest with jsdom environment. Setup file is at `src/setupTests.ts`. Run tests with `npm test`.

## Mobile-Specific Considerations

- The app uses Capacitor plugins for native functionality (Camera, Haptics, Keyboard, Preferences, Status Bar)
- Keyboard resize mode is set to "body" in capacitor.config.ts
- iOS scheme: FilmFriendApp
- Android scheme: https
- Web assets build to `dist/` directory

## Important Notes

- The app stores all data in Redux state (no backend currently)
- Film formats supported: 35mm, 120, polaroid
- ISO values are predefined in types.ts (25-6400)
- Cameras can be hidden/archived via the `visible` property (same for rolls)
- The app is designed for offline-first usage
