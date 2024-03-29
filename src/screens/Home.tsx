import {
  View,
  Text,
  Icon,
  Fab,
  Image,
  useDisclose,
  Modal,
  FormControl,
  Input,
  Button,
  Spinner,
  Center,
} from "native-base"
import {FlatList} from "react-native-gesture-handler"
import {Feather, AntDesign} from "@expo/vector-icons"
import {useQuery} from "react-query"
import axios from "axios"
import {Actionsheet} from "native-base"
import {useState} from "react"
import {Pressable} from "react-native"
import {ScreenStackProps} from "react-native-screens"
import {RootStackScreenProps} from "../navigation/RootStack"
import {baseUrl} from "../common/constants"
import {Ionicons} from "@expo/vector-icons"

type Client = {
  name: string
  cpf: string
  imageUrl: string
}

export const Home = ({navigation}: RootStackScreenProps<"Home">) => {
  const [currentClient, setCurrentClient] = useState<Client | null>(null)
  const {isOpen, onOpen, onClose} = useDisclose()
  const {data, isLoading, isError, refetch} = useQuery<Client[]>("clients", async () => {
    const result = await axios.get(baseUrl + "/api/clients")
    return result.data
  })

  function openClientDetail(client: Client) {
    setCurrentClient(client)
    onOpen()
  }
  if (isError) {
    return (
      <>
        <Center flex={1}>
          <Text fontSize={20}>Erro ao carregar os dados</Text>
          <Button
            onPress={() => refetch()}
            mt={4}
            rightIcon={<Icon as={Ionicons} name="reload" />}
          >
            Tentar novamente
          </Button>
        </Center>
      </>
    )
  }

  return (
    <View flex={1} my={4} position={"relative"}>
      {isLoading ? (
        <Spinner flex={1} size={64} />
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem item={item} modalTrigger={openClientDetail} />
          )}
        ></FlatList>
      )}
      <Fab
        position="absolute"
        bgColor={"primary.500"}
        renderInPortal={false}
        onPress={() => {
          console.log("navegar")
          navigation.navigate("CreateClient")
        }}
        icon={<Icon color="white" as={<AntDesign name="plus" />} size={8} />}
      ></Fab>

      {currentClient && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <Modal.Content>
            <Modal.Header
              _text={{
                textAlign: "center",
              }}
            >
              Detalhe do cadastro
            </Modal.Header>
            <Modal.Body>
              <View alignItems={"center"} fontSize={24}>
                <Image
                  alt="client image"
                  size={64}
                  resizeMode={"contain"}
                  source={{uri: baseUrl + currentClient?.imageUrl}}
                ></Image>
                <Text fontWeight={"medium"} my={1} fontSize={20}>
                  {currentClient?.name}
                </Text>
                <Text fontSize={16} color={"gray.500"}>
                  CPF: {currentClient?.cpf}
                </Text>
              </View>
              {/* close button */}
              <Button
                onPress={onClose}
                mt={5}
                mx={3}
                bgColor={"primary.500"}
                _text={{
                  color: "white",
                }}
              >
                Fechar
              </Button>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      )}
    </View>
  )
}

const ListItem = ({
  item,
  modalTrigger,
}: {
  item: Client
  modalTrigger: (client: Client) => void
}) => {
  console.log("render", item)
  return (
    <Pressable onPress={() => modalTrigger(item)}>
      <View
        bgColor={"#fff"}
        rounded={"xl"}
        mb={5}
        p={4}
        mx={3}
        shadow={"1"}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <View>
          <Text fontWeight={"medium"}>{item.name}</Text>
          <Text color={"gray.400"}>CPF: {item.cpf}</Text>
        </View>
        <Icon as={Feather} name="eye" size={6} color={"primary.500"}></Icon>
      </View>
    </Pressable>
  )
}
