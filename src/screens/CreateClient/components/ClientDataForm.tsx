import {View, Input, FormControl, Button} from "native-base"
import {Controller, useForm} from "react-hook-form"
import {useMutation, useQueryClient} from "react-query"
import axios from "axios"
import {useNavigation} from "@react-navigation/native"
import {useCustomToast} from "../../../common/hooks"
import {CreateClientStackNavigationProps} from "../../../navigation/CreateClientStack"
import {baseUrl} from "../../../common/constants"
export type FormData = {
  name: string
  cpf: string
}
export function ClientDataForm({imageBase64}: {imageBase64?: string}) {
  const queryClient = useQueryClient()
  const navigation = useNavigation<CreateClientStackNavigationProps<"CreateClientForm">>()
  const showCustomToast = useCustomToast()
  const mutation = useMutation(
    async (data: FormData & {image: string}) => {
      const form = new FormData()
      form.append("name", data.name)
      form.append("cpf", data.cpf)
      form.append("image", data.image)
      //console.log("form", form)
      try {
        const result = await axios.post(baseUrl + "/api/clients", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        //console.log("llama")
        //console.log("result", result)
      } catch (error: any) {
        console.log("error", error.response.data)
      }
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries("clients")
        showCustomToast({
          description: "Cliente criado com sucesso",
          type: "success",
        })
        navigation.goBack()
      },
      onError: (error: any) => {
        console.log("error", error)
        showCustomToast({
          description: "Erro ao criar cliente",
          type: "error",
        })
      },
    }
  )
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({})
  const onSubmit = (data: FormData) => {
    console.log(data)
    if (!imageBase64) {
      showCustomToast({
        description: "A imagem e requerida",
        type: "error",
      })
    } else {
      mutation.mutate({...data, image: imageBase64})
    }
  }

  return (
    <View justifyContent={"center"} w={"full"}>
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
  )
}
