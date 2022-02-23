import { useState } from "react"
import styled from "styled-components"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

import Header from "./components/Header"
import CreatePost from "./components/CreatePost"
import ReadPost from "./components/ReadPost"
import Login from "./components/Login"
import Register from "./components/Register"
import Cookies from "universal-cookie"

function App() {
  const [data, setData] = useState("")

  const childToParent = (childData) => {
    setData(childData)
    console.log("data from app js  " + childData)
  }

//   const tokenCookie = (token) => {
//     const cookies = new Cookies()
//     console.log(token)
//     cookies.set("cookie", token, { path: "/" })
//   }

  const loginToApp = (token) => {
    const cookies = new Cookies()
    console.log(token)
    cookies.set("token", token, { path: "/" })
    // cookies.set("cookie", "kassam", { path: "/" })
  }

  return (
    <BrowserRouter>
      <Container>
        <Header childToParent={childToParent} />

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login loginToApp={loginToApp} />} />
          <Route
            path="/"
            element={<ReadPost data={data}  />}
          />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </Container>
    </BrowserRouter>
  )
}

export default App

const Container = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
`
