import React from 'react';

function Pay(props) {
	return(
		<>
		<div className="qrcode">
			<img src={require("../assets/pay.jpeg")} alt="pay qr code" />
		</div>
    	</>
	);
}

export {Pay};