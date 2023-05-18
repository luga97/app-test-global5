import {StackScreenProps, createStackNavigator} from "@react-navigation/stack"
import {CreateClientForm} from "../screens/CreateClient/CreateClientForm"

export type CreateClientStackParamList = {
  CreateClientForm: undefined
}
export type CreateClientStackScreenProps<
  screen extends keyof CreateClientStackParamList
> = StackScreenProps<CreateClientStackParamList, screen>

export function CreateClientStack() {
  const Stack = createStackNavigator<CreateClientStackParamList>()
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
