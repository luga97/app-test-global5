import {
  Text,
  View,
  Image,
  Icon,
  Input,
  FormControl,
  Button,
  Pressable,
  KeyboardAvoidingView,
  useToast,
} from "native-base"
import {Entypo} from "@expo/vector-icons"
import {CreateClientStackScreenProps} from "../../navigation/CreateClientStack"
import * as ImagePicker from "expo-image-picker"
import {useState} from "react"
import {useKeyboardVisible} from "../../common/hooks"
import {Controller, useForm} from "react-hook-form"
import {useMutation} from "react-query"
import axios from "axios"
import {baseUrl} from "../../common/constants"
import {base64ToBlob, blobToBase64} from "base64-blob"

type FormData = {
  name: string
  cpf: string
}
export function CreateClientForm({
  navigation,
}: CreateClientStackScreenProps<"CreateClientForm">) {
  const [currentImage, setCurrentImage] = useState<string>()
  const toast = useToast()
  const isKeyboardVisible = useKeyboardVisible()
  //mutation to send data to the server
  const mutation = useMutation(async (data: FormData & {image: string}) => {
    //const imageBlob = await base64ToBlob(data.imageBase64)
    //console.log("image blob", imageBlob)
    const form = new FormData()
    form.append("name", data.name)
    form.append("cpf", data.cpf)
    form.append("image", data.image)
    console.log("form", form)
    try {
      const result = await axios.post(baseUrl + "/api/clients", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      //console.log("llama")
      console.log("result", result)
    } catch (error) {
      console.log("errooooor")
      //console.log("error", error.response.data)
    } finally {
      console.log("finally")
    }
  })
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({})
  const onSubmit = (data: FormData) => {
    console.log(data)
    if (!currentImage) {
      toast.show({
        backgroundColor: "red.500",
        placement: "top",
        marginTop: 16,
        size: "xl",
        description: "A imagem e requerida",
      })
    } else {
      mutation.mutate({...data, image: currentImage})
    }
  }

  const takePicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    })

    if (!result.canceled && result.assets[0].base64) {
      console.log(result.assets[0].uri)
      setCurrentImage(result.assets[0].base64)
    }
  }

  const selectPicture = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 1,
    })

    if (!result.canceled && result.assets[0].base64) {
      console.log(result.assets[0].uri)
      setCurrentImage(result.assets[0].base64)
    }
  }

  return (
    <View h={"full"} alignItems={"center"} justifyContent={"space-around"} mx={5}>
      {!isKeyboardVisible && (
        <View w={400} height={"2/3"} alignItems={"center"} justifyContent={"center"}>
          {currentImage ? (
            <Image
              src={`data:image/png;base64,${currentImage}`}
              alt="client picture"
              width={400}
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
              mx={6}
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
              mx={6}
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
      )}

      <View justifyContent={"center"} w={"full"} h={"1/3"}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <FormControl isInvalid={Boolean(errors.name)}>
              <FormControl.Label>Nome</FormControl.Label>
              <Input onBlur={onBlur} onChangeText={onChange} value={value} />
              <FormControl.ErrorMessage>O nome e requerido</FormControl.ErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          name="cpf"
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <FormControl isInvalid={Boolean(errors.cpf)}>
              <FormControl.Label>CPF</FormControl.Label>
              <Input
                keyboardType="numeric"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
              <FormControl.ErrorMessage>O CPF e requerido</FormControl.ErrorMessage>
            </FormControl>
          )}
        />
        <Button
          onPress={handleSubmit(onSubmit)}
          w={"full"}
          my={5}
          bgColor={"primary.500"}
          rounded={"lg"}
          _text={{
            color: "white",
            fontSize: 20,
          }}
        >
          Cadastrar
        </Button>
      </View>
    </View>
  )
}
