import React from 'react';


function Bar(props) {
	return (
		<input type="search" name="search" id="search" placeholder="search" onChange={(e)=>props.setQuery(e.target.value)} />
	);
}
function SearchBar(props) {
	return(
		<div className="containers searchBarCont">
			<Bar setQuery={props.setQuery} />	
		</div>
	);
}

export {SearchBar};