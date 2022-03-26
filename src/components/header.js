import React from 'react';
import { Link } from "react-router-dom";

const navs = [
	{name:"home", path:"/"},
	{name:"my order", path:"/order"},
	{name:"contact", path:"/contact"},/*
	{name:"feedback", path:"/feedback"}*/
];
function Right(props) {
	return (
		<Link to={props.path}>
			{props.name}
		</Link>
	);
}
function Nav(props) {
	return(
		<>
		<header className="containers">
			<Link to="/">
				Canteen
			</Link>
			<nav>
				{
					navs.map(z => <Right key={z.name} name={z.name} path={z.path} />)
				}
			</nav>
		</header>
    	<br />
    	<br />
    	</>
	);
}

export {Nav};