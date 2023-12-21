import { createContext, useCallback, useEffect, useState } from "react"
import { BASE_URL, postRequest } from "../api/index.js"

// 創造一個能夠在應用程式共享狀態的方法再經由
// <AuthContextProvider>
//  <App />
// </AuthContextProvider>
//讓App能夠儲存到資料

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [signupError, setsignupError] = useState(null)
  const [isSignupLoading, setisSignupLoading] = useState(false)
  const [signupInfo, setsignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [signinError, setsigninError] = useState(null)
  const [isSigninLoading, setisSigninLoading] = useState(false)
  const [signinInfo, setsigninInfo] = useState({
    email: "",
    password: ""
  })

  useEffect(() => {
    const user = localStorage.getItem("User")

    setUser(JSON.parse(user))
  }, [])

  const updateSignupInfo = useCallback((info) => {
    setsignupInfo(info)
  }, [])

  //signup
  const signupUser = useCallback(async (e) => {
    e.preventDefault()

    setisSignupLoading(true)
    setsignupError(null)

    const response = await postRequest(`${BASE_URL}/users/signup`, JSON.stringify(signupInfo))

    setisSignupLoading(false)

    if (response.error) {
      return setsignupError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [signupInfo])

  const updateSigninInfo = useCallback((info) => {
    setsigninInfo(info)
  }, [])

  //signin
  const signinUser = useCallback(async (e) => {
    e.preventDefault()

    setisSigninLoading(true)
    setsigninError(null)
    const response = await postRequest(`${BASE_URL}/users/signin`, JSON.stringify(signinInfo))
    console.log(response)
    setisSigninLoading(false)

    if (response.error) {
      return setsigninError(response)
    }

    localStorage.setItem("User", JSON.stringify(response))
    setUser(response)
  }, [signinInfo])

  //loguot
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User")
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signupInfo,
      updateSignupInfo,
      signupUser,
      signupError,
      isSignupLoading,
      logoutUser,
      signinUser,
      signinInfo,
      updateSigninInfo,
      signinError,
      isSigninLoading
    }}
    >
      {children}
    </AuthContext.Provider >
  )
}