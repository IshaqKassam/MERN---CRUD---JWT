import { useState } from "react";
import styled from "styled-components";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import ReadPost from "./components/ReadPost";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
	const [data, setData] = useState("");

	const childToParent = (childData) => {
		setData(childData);
		console.log("data from app js  " + childData);
	};

	return (
		<BrowserRouter>
			<Container>
				<Header childToParent={childToParent} />

				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<ReadPost data={data} />} />
					<Route path="/create-post" element={<CreatePost />} />
				</Routes>
			</Container>
		</BrowserRouter>
	);
}

export default App;

const Container = styled.div`
	::-webkit-scrollbar {
		display: none;
	}
`;
