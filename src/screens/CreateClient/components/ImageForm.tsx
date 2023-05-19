import {Text, View, Image, Icon, Button} from "native-base"
import {Entypo} from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import {Buffer} from "buffer"

export function ImageForm({
  imageBase64,
  setImageBase64,
}: {
  imageBase64: string | undefined
  setImageBase64: (imageBase64: string) => void
}) {
  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })

    if (!result.canceled && result.assets[0].base64) {
      console.log(result.assets[0].uri)
      setImageBase64(result.assets[0].base64)
    }
  }

  const selectPicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
    })

    if (!result.canceled && result.assets[0].base64) {
      console.log(result.assets[0].uri)
      console.log(
        "File size: " + Buffer.from(result.assets[0].base64, "base64").length / 1e6 + "MB"
      )
      setImageBase64(result.assets[0].base64)
    }
  }

  return (
    <View>
      {imageBase64 ? (
        <Image
          src={`data:image/png;base64,${imageBase64}`}
          alt="client picture"
          width={500}
          height={"2/3"}
          resizeMode="contain"
          bg={"#2F2F2F"}
        />
      ) : (
        <View justifyContent={"center"} alignItems={"center"} height={"2/3"}>
          <Icon as={Entypo} name="image" size={64} />
          <Text fontSize={20} fontWeight={"medium"} color={"gray.500"}>
            Sem foto
          </Text>
        </View>
      )}
      <View width={"full"} height={"1/3"}>
        <Button
          onPress={selectPicture}
          mt={5}
          bgColor={"transparent"}
          borderColor={"primary.500"}
          borderWidth={1}
          rounded={"lg"}
          _text={{
            fontSize: 16,
            color: "primary.500",
          }}
          endIcon={<Icon as={Entypo} name="folder" size={4} color={"primary.500"} />}
        >
          Seleccione uma foto
        </Button>
        <Button
          onPress={takePicture}
          mt={5}
          bgColor={"transparent"}
          borderColor={"primary.500"}
          borderWidth={1}
          rounded={"lg"}
          _text={{
            fontSize: 16,
            color: "primary.500",
          }}
          endIcon={<Icon as={Entypo} name="camera" size={4} color={"primary.500"} />}
        >
          abrir camara
        </Button>
      </View>
    </View>
  )
}
