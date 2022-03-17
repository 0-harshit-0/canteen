import React from 'react';

const navs = ["home", "my order", "contact", "feedback"];
function Right(props) {
	return (
		<a href={props.name} alt={props.name}>
			{props.name}
		</a>
	);
}
function Nav(props) {
	return(
		<header className="containers">
			<a href="/">
				Canteen
			</a>
			<nav>
				{
					navs.map(z => <Right key={z} name={z} />)
				}
			</nav>
		</header>
	);
}

export {Nav};