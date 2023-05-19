import {useToast} from "native-base"
import {useEffect, useState} from "react"
import {Keyboard} from "react-native"
export function useKeyboardVisible() {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  return isKeyboardVisible
}

export function useCustomToast() {
  const toast = useToast()

  return function showCustomToast({
    description,
    type,
  }: {
    description: string
    type?: "success" | "error"
  }) {
    let bgColor = "blue.500"
    if (type === "success") {
      bgColor = "green.500"
    } else if (type === "error") {
      bgColor = "red.500"
    }
    toast.show({
      backgroundColor: bgColor,
      placement: "top",
      marginTop: 16,
      size: "xl",
      description: description,
    })
  }
}
