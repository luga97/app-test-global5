import {
  StackNavigationProp,
  StackScreenProps,
  createStackNavigator,
} from "@react-navigation/stack"
import {CreateClientForm} from "../screens/CreateClient/CreateClientForm"

type ParamList = {
  CreateClientForm: undefined
}
export type CreateClientStackScreenProps<screen extends keyof ParamList> =
  StackScreenProps<ParamList, screen>

export type CreateClientStackNavigationProps<screen extends keyof ParamList> =
  StackNavigationProp<ParamList, screen>

export function CreateClientStack() {
  const Stack = createStackNavigator<ParamList>()
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTitle: "Criar cadastro",
      }}
    >
      <Stack.Screen name="CreateClientForm" component={CreateClientForm} />
    </Stack.Navigator>
  )
}
