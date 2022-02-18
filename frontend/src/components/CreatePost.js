import React, {useRef, useState} from 'react';
import styled from 'styled-components'
import Axios from 'axios'
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

function CreatePost() {

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/create-post', 
    {
      title: title, 
      content: content,
    }).then(navigate('/'))
  }

  return (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <h3>Write a Blog</h3>
            <Title>
              <input type="text" onChange={(event) => {setTitle(event.target.value)}} placeholder="  Enter Title" />
            </Title>
            <Content>
              <textarea type="text" onChange={(event) => {setContent(event.target.value)}} placeholder=" Content of the Post here"></textarea>
            </Content>
            <button type="submit">
              Submit
            </button>
          </form>
        </FormContainer>
  );
}

export default CreatePost;

const FormContainer = styled.div`
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; 
    display: flex;
    border-radius: 5px;
    flex-direction: column;
    margin: 50px auto;
    width: 250px;
    height: 250px;
    padding: 0px 20px 10px 20px;
    justify-content: center;
    align-items: center;
    /* border: 1px solid grey; */

    
    form{
      width: 250px;
    /* border: 1px solid grey; */
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 0 15px 0;
      /* border: 1px solid black; */
      button{
          background: none;
          padding: 3px;
          margin: 5px 0 0 0;
          border: none;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-weight: bold;
          font-size: 16px;

          :hover{
            color: grey;
          }
      }
    }

`
const Title = styled.div`
  width: 100%;
  
  /* border: 1px solid grey; */


input{
    width: 100%;
    outline: none;
    margin: 10px 0;
    padding: 5px 0;
    border: 1px solid lightgrey;
    /* padding: 5px;         */
}
`
const Content = styled.div`
  width: 100%;
  height: 120px;

    textarea{
        width: 100%;
        /* padding: 5px 0 0 5px; */
        height: 120px;
        margin: 0;
        overflow: hidden;
        outline: none;
        outline: none;
        border: 1px solid lightgrey;
    }
`

