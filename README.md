# Mobile App Readme

This is a mobile app created using Expo and React Native as a Tech recruting test.

## Getting Started

To run the app on your local machine, follow these steps:

1. Make sure you have Expo CLI installed globally: `npm install -g expo-cli`.
2. Clone this repository: `git clone <repository_url>`.
3. Navigate to the project directory: `cd <project_directory>`.
4. Install the dependencies: `npm install`.
5. Start the development server: `expo start`.

## Configuration

To configure the app to use the server, you need to modify the `baseUrl` variable in the `./src/common/constants.ts` file. Update the value of `baseUrl` to the appropriate server URL.

```typescript
// ./src/common/constants.ts
export const baseUrl = "http://your_server_url"
```

Replace `'http://your_server_url'` with the actual URL of your server.

## Running the App

After configuring the server URL, you can run the app on an emulator, a connected device, or through the Expo client app.

1. Choose one of the following options:
   - To run the app on an Android emulator, press `a` in the terminal running the development server.
   - To run the app on an iOS simulator, press `i` in the terminal running the development server.
   - To run the app on a physical device, scan the QR code displayed in the terminal using the Expo client app.
2. The app will be compiled and launched on the selected platform.
