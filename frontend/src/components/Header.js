import React, { useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

function Header({ childToParent }) {
	const [search, setSearch] = useState("");
	const location = useLocation();
	const { pathname } = location;
	const navigate = useNavigate()
	const splitLocation = pathname.split("/");
	const cookies = new Cookies()
	return (
		<Container>
			<NavBar>
				<Logo>
					<img src="images/finsense.png" alt="Logo" />
				</Logo>
				{location.pathname === "/" && (
					<Search>
						<SearchOutlinedIcon id="search-icon" />
						<input
							type="text"
							onChange={(event) => childToParent(event.target.value)}
							placeholder="Search Here ..."
						/>
					</Search>
				)}
				<Links>
					<ul>
						<Link
							className={splitLocation[1] === "" ? "active" : "link"}
							to="/"
						>
							Home
						</Link>
						<Link
							className={splitLocation[1] === "create-post" ? "active" : "link"}
							to="/create-post"
						>
							Create
						</Link>
						{!(location.pathname === '/login') &&
						<Link
						className={splitLocation[1] === "logout" ? "active" : "link"}
								to="/" onClick={() =>
								{
									cookies.set( 'token', '', { path: '/', expires: ( new Date( Date.now() - 2) ) } )
									navigate("/")
								}}
						>
							logout
						</Link>
						}
					</ul>
				</Links>
			</NavBar>
		</Container>
	);
}

export default Header;

const Container = styled.div`
	margin: 0;
	padding: 0;
	box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const NavBar = styled.div`
	display: flex;
	padding: 10px 0;
	align-items: center;
`;
const Logo = styled.div`
	margin: 0 0 0 50px;
	width: 17%;
	/* border: 1px solid grey; */

	img {
		/* width: 200px; */
		width: 100%;
		margin: 0;
		padding: 0;

		:hover {
			cursor: pointer;
		}
	}
`;
const Search = styled.div`
	box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
		rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
	width: 35%;
	margin: 0 0 0 5%;
	padding: 7px;
	display: flex;
	justify-content: space-between;
	border-radius: 10px;

	#search-icon {
		cursor: pointer;
	}

	input {
		width: 100%;
		outline: none;
		border: none;
		margin: 0 0 0 5px;
		background-color: transparent;
	}
`;
const SearchText = styled.div``;
const Links = styled.div`
	width: 25%;
	border-radius: 5px;
	margin: 0 5% 0 auto;

	ul {
		padding: 5px;
		height: 100%;
		display: flex;
		justify-content: space-around;
		list-style: none;

		.link {
			text-decoration: none;
			color: black;
			font-size: 18px;

			:hover {
				color: red;
			}
		}
		.active {
			text-decoration: none;
			color: black;
			font-size: 18px;
			border-bottom: 1px solid red;
		}
	}
`;
