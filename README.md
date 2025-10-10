# Car-Rental

A modern car rental mobile application built with React Native and Expo.

## Prerequisites

Before running the app, make sure you have the following installed:

- **Node.js** (version 18.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Expo CLI** - Install globally with: `npm install -g @expo/cli`

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Car-Rental
   ```

2. **Navigate to the mobile directory**

   ```bash
   cd mobile
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## Running the App

### Method 1: Using Expo Go App (Recommended for beginners)

#### Step 1: Install Expo Go

- **Android**: Download from [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: Download from [App Store](https://apps.apple.com/app/expo-go/id982107779)

#### Step 2: Start the Development Server

```bash
npx expo start
```

#### Step 3: Connect to Your App

1. The terminal will display a QR code and development server URL
2. Open Expo Go on your mobile device
3. Scan the QR code or enter the URL manually
4. Your app will load automatically

### Method 2: Using Android Emulator

1. **Set up Android Emulator**

   - Open Android Studio
   - Go to "AVD Manager"
   - Create a new virtual device or use existing one
   - Start the emulator

2. **Run the app**
   ```bash
   npm run android
   # or
   expo start --android
   ```

## Available Scripts

```bash
# Start Expo development server
npx expo start

# Start on Android (emulator or connected device)
npm run android

# Start on iOS (requires macOS and Xcode)
npm run ios

# Start on web browser
npm run web
```

**Happy coding! 🚗✨**
