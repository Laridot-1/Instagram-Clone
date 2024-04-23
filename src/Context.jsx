import React, { createContext, useContext } from "react"

import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyASyNBURXQZeK-1yKRCx5FTiHk-5hWP08A",
  authDomain: "instagram-b9f89.firebaseapp.com",
  projectId: "instagram-b9f89",
  storageBucket: "instagram-b9f89.appspot.com",
  messagingSenderId: "94852153753",
  appId: "1:94852153753:web:585bcaebbc013f5e255308",
}

const app = initializeApp(firebaseConfig)

const AppContext = createContext()

const useGlobalContext = () => useContext(AppContext)

const Context = ({ children }) => {
  class Auth {
    static signin() {}
    static signup() {}
    static signout() {}
    static resetPassword() {}
  }

  const obj = { Auth }

  return <AppContext.Provider value={obj}>{children}</AppContext.Provider>
}

export { useGlobalContext, Context }
