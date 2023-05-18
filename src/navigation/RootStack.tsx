import {StackScreenProps, createStackNavigator} from "@react-navigation/stack"
import {NativeBaseProvider, Image, Box, extendTheme} from "native-base"
import {Home} from "../screens/Home"
import {CreateClientStack} from "./CreateClientStack"

export type RootStackParamList = {
  Home: undefined
  CreateClient: undefined
}
export type RootStackScreenProps<screen extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, screen>

export function RootStack() {
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: () => (
          <Image
            width={200}
            resizeMode="contain"
            alt="logo"
            source={require("../../assets/logo.png")}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CreateClient"
        component={CreateClientStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}
