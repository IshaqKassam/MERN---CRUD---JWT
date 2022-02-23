import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'universal-cookie'
// import { response } from "../../../backend/app"

const Login = ({loginToApp}) => {
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const emailRef = useRef()
	const passwordRef = useRef()

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}
	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const login = (e) => {
		e.preventDefault()
		axios
			.post(
				"http://localhost:3001/auth/login",
				{
					email,
					password,
				},
				{ credentials: "include" }
			)
			.then((response) => {
				response.status === 201 && navigate("/")
				console.log("token for login is: ", response.data.token)
				loginToApp(response.data.token)
				localStorage.setItem("token", response.data.token)
			})
			.catch((error) => {
                console.log(error)
                console.log(error.response.data)
                alert(error.response.data)

            })
	}

	return (
		<Container>
			<form onSubmit={login}>
				<h3>Login Here</h3>
				<input
					type="email"
					ref={emailRef}
					onChange={handleEmail}
					placeholder="Email here"
					defaultValue={email}
				></input>
				<input
					type="password"
					ref={passwordRef}
					onChange={handlePassword}
					placeholder="Password here"
					defaultValue={password}
				></input>
				<button type="submit">Login</button>
				<Link to="/register">Sign Up Here</Link>
			</form>
		</Container>
	)
}

export default Login

const Container = styled.div`
	/* border: 1px solid black; */
	width: 40%;
	height: 80vh;
	margin: auto;
	display: flex;

	form {
		/* border: 1px solid black; */
		margin: auto;
		/* padding: 20px; */
		/* width: 100%; */
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		/* border: 1px solid black; */
		display: flex;
		flex-direction: column;
		/* justify-content: center; */
		align-items: center;
		padding: 40px;
		width: 50%;
		height: 50%;

		h3 {
			margin: 0 0 10px 0;
			border-bottom: 1px solid black;
			padding: 3px 20%;
		}

		input {
			outline: none;
			border: 1px solid lightgrey;
			padding: 15px;
			margin: 10px 0;
			width: 100%;
		}

		button {
			background: none;
			padding: 5px 15px;
			border-radius: 5px;
			margin: 20px 0 0 0;

			:hover {
				background-color: lightgrey;
				cursor: pointer;
			}
		}
	}
`
