import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Axios from "axios"
import { useNavigate } from "react-router-dom"
// import Cookies from "js-cookie"
import Cookies from "universal-cookie"

function ReadPost( { data }) {
  const [posts, setPosts] = useState([])
  const [selectEdit, setSelectEdit] = useState("false")
  const [selectedId, setSelectedId] = useState("")
  console.log(data)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")

  const navigate = useNavigate()
  const cookie = new Cookies()
  const token = (cookie.get("token")) || ""
  
  
  // const token = localStorage.getItem("token") || ""
  // const token = localStorage.getItem("token") || ""
  //   console.log("token from localstorage is ", token)
  useEffect(() => {
    // tokenCookie(cookie)
    data
      ? Axios.get(
          `${process.env.REACT_APP_SERVER_URL}/post/read`,
          {
            params: {
              searchTitle: data,
            },
          },
          {
            headers: { Authorization: "Bearer " + token },
          }
        )
          .then((response) => {
            console.log("response got from the server is", response)
            setPosts(response.data)
          })
          .catch((error) => {
            console.log(error.message)
          })
      : Axios.get(`${process.env.REACT_APP_SERVER_URL}/post/read`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            setPosts(response.data)
            // console.log(response)
          })
          .catch((error) => {
            console.log("error from read posts", error.response.data)
            navigate("/login")
          })

    // console.log("Cookie from server:", cookie)
  }, [])

  const deleteBlog = (id) => (event) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setSelectedId(id)
      Axios.delete(`http://localhost:3001/delete/${id}`)
    }
  }
  const editBlog = (id) => (event) => {
    console.log("edit button clicked")
    setSelectEdit("true")
    setSelectedId(id)
  }
  const cancel = (id) => (event) => {
    setSelectEdit("false")
    setSelectedId(id)
  }

  const update = (val) => {
    Axios.put("http://localhost:3001/update-post", {
      id: val._id,
      newTitle: newTitle ? newTitle : val.title,
      newContent: newContent ? newContent : val.content,
    }).then(setSelectEdit("false"))
  }
  // console.log( "data from read post" + data)
  return posts ? (
    <Container className="container">
      {data
        ? posts
            .filter((filteredBlog) =>
              filteredBlog.title.toLowerCase().includes(data)
            )
            .slice(0)
            .reverse()
            .map((val, key) => {
              return (
                <Post key={key}>
                  <Title>
                    {selectEdit === "false" || selectedId !== val._id ? (
                      <p>{val.title}</p>
                    ) : (
                      <input
                        type="text"
                        onChange={(event) => {
                          setNewTitle(event.target.value)
                        }}
                        defaultValue={val.title}
                      ></input>
                    )}
                  </Title>

                  <Content>
                    {selectEdit === "false" || selectedId !== val._id ? (
                      <p>{val.content}</p>
                    ) : (
                      <textarea
                        type="text"
                        onChange={(event) => {
                          setNewContent(event.target.value)
                        }}
                      >
                        {val.content}
                      </textarea>
                    )}
                  </Content>

                  <Change>
                    {selectEdit === "true" && selectedId === val._id ? (
                      <p id="cancel" onClick={cancel(val._id)}>
                        Cancel
                      </p>
                    ) : (
                      <p onClick={editBlog(val._id)}>Edit</p>
                    )}
                    <p id="delete" onClick={deleteBlog(val._id)}>
                      Delete
                    </p>

                    {selectEdit === "true" && selectedId === val._id && (
                      <p id="update" type="submit" onClick={() => update(val)}>
                        Update
                      </p>
                    )}
                  </Change>
                </Post>
              )
            })
        : posts
            .slice(0)
            .reverse()
            .map((val, key) => {
              return (
                <Post key={key}>
                  <Title>
                    {selectEdit === "false" || selectedId !== val._id ? (
                      <p>{val.title}</p>
                    ) : (
                      <input
                        type="text"
                        onChange={(event) => {
                          setNewTitle(event.target.value)
                        }}
                        defaultValue={val.title}
                      ></input>
                    )}
                  </Title>

                  <Content>
                    {selectEdit === "false" || selectedId !== val._id ? (
                      <p>{val.content}</p>
                    ) : (
                      <textarea
                        type="text"
                        onChange={(event) => {
                          setNewContent(event.target.value)
                        }}
                      >
                        {val.content}
                      </textarea>
                    )}
                  </Content>

                  <Change>
                    {selectEdit === "true" && selectedId === val._id ? (
                      <p id="cancel" onClick={cancel(val._id)}>
                        Cancel
                      </p>
                    ) : (
                      <p onClick={editBlog(val._id)}>Edit</p>
                    )}
                    <p id="delete" onClick={deleteBlog(val._id)}>
                      Delete
                    </p>

                    {selectEdit === "true" && selectedId === val._id && (
                      <p id="update" type="submit" onClick={() => update(val)}>
                        Update
                      </p>
                    )}
                  </Change>
                </Post>
              )
            })}
    </Container>
  ) : (
    <p>Dont have any posts</p>
  )
}

export default ReadPost

const Container = styled.div`
  margin: 0 0 0 30px;
  display: flex;
  height: 90vh;
  flex-wrap: wrap;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`
const Post = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  display: flex;
  border-radius: 5px;
  flex-direction: column;
  margin: 40px 20px 20px 20px;
  width: 250px;
  height: 250px;
  padding: 0px 20px 10px 20px;
  justify-content: center;
  align-items: center;

  button {
    background: none;
    padding: 3px;
    margin: 5px 0 0 0;
    border: none;
    display: flex;
    align-items: center;
  }
`
// const Heading = styled.div`
// 	display: flex;
// 	width: 100%;
// `
const Change = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
  height: 40px;
  margin: 10px 0 0 0;
  width: 100%;
  border-top: 1px solid grey;

  p {
    margin-right: 10px;
    :hover {
      cursor: pointer;
      color: grey;
    }
  }

  #delete {
    color: red;

    :hover {
      color: #ff8080;
    }
  }

  #cancel {
    font-weight: bold;
  }

  #update {
    font-weight: bold;
  }
`
const Title = styled.div`
  width: 100%;

  p {
    display: flex;
    padding: 5px;
    font-size: 20px;
    align-items: center;
    font-weight: bold;
  }

  input {
    width: 98%;
    margin-bottom: 5px;
    outline: none;
    border: 1px solid lightgrey;
    padding: 0 5px;
  }
`
const Content = styled.div`
  width: 100%;
  height: 120px;

  p {
    width: 100%;
    padding: 5px 0 0 5px;
    height: 120px;
    margin: 0;
    overflow: hidden;
    outline: none;
    outline: none;
  }

  textarea {
    width: 100%;
    padding: 5px 0 0 5px;
    height: 120px;
    margin: 0;
    overflow: hidden;
    outline: none;
    outline: none;
    border: 1px solid lightgrey;
  }
`
