import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from "expo-status-bar"
import {NativeBaseProvider, Image, Box, extendTheme} from "native-base"
import {StyleSheet, Text, View} from "react-native"
import {StackScreenProps, createStackNavigator} from "@react-navigation/stack"
import {Home} from "./src/screens/Home"
import "react-native-gesture-handler"
import {QueryClient, QueryClientProvider} from "react-query"
import {CreateClientStack} from "./src/navigation/CreateClientStack"
import {RootStack} from "./src/navigation/RootStack"

export default function App() {
  const queryClient = new QueryClient()

  const theme = extendTheme({
    colors: {
      primary: {
        DEFAULT: "#3BC0B9",
        50: "#C5EDEB",
        100: "#B6E8E6",
        200: "#97DFDB",
        300: "#77D5D0",
        400: "#58CCC6",
        500: "#3BC0B9",
        600: "#2E9590",
        700: "#216A66",
        800: "#133F3D",
        900: "#061414",
        950: "#000000",
      },
    },
  })
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
