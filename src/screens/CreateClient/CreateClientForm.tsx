import {View, Pressable, KeyboardAvoidingView, useToast} from "native-base"
import {CreateClientStackScreenProps} from "../../navigation/CreateClientStack"
import {useEffect, useState} from "react"
import {useKeyboardVisible} from "../../common/hooks"
import {ImageForm} from "./components/ImageForm"
import {ClientDataForm} from "./components/ClientDataForm"

export function CreateClientForm({
  navigation,
}: CreateClientStackScreenProps<"CreateClientForm">) {
  const [imageBase64, setImageBase64] = useState<string>()
  const isKeyboardVisible = useKeyboardVisible()

  useEffect(() => {
    console.log("imagen actualizada")
  }, [imageBase64])
  //mutation to send data to the server

  return (
    <View h={"full"} alignItems={"center"} justifyContent={"space-around"} mx={5}>
      <View w={"full"} height={"2/3"}>
        {!isKeyboardVisible && (
          <ImageForm imageBase64={imageBase64} setImageBase64={setImageBase64} />
        )}
      </View>

      <View w={"full"} h={"1/3"}>
        <ClientDataForm imageBase64={imageBase64} />
      </View>
    </View>
  )
}
