import React from 'react';


const productsData = [
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: true},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: true},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: true},
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: true},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: true},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: false},
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: true},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: true},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: true},
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: true},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: true},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: false},
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: false},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: false},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: false},
	{name: "product1", medium_price:30, small_price:20, large_price: 40, in_stock: true},
	{name: "product2", medium_price:50, small_price:40, large_price: 60, in_stock: false},
	{name: "product3", medium_price:60, small_price:50, large_price: 70, in_stock: true},
];
function ProductCard(props) {
	return (
		<div className="productCard">
			<section className="productImg">
				<img src={require("../assets/momo.jpg")} alt="momo" />
			</section>
			<section className="productInfo">
				<h3>{props.name}</h3>
				<span>Small</span>
				<span className="price">{props.small}₹</span>
				<span>Medium</span>
				<span className="price">{props.medium}₹</span>
				<span>Large</span>
				<span className="price">{props.large}₹</span>
			</section>
		</div>
	);
}
function Products(props) {
	return(
		<div className="containers productCont">
			{
				productsData.map((z, i) => {
					if(z.name.match(new RegExp(props.searchQuery, "i")) && z.in_stock) {
						return <ProductCard key={i} name={z.name} small={z.small_price} medium={z.medium_price} large={z.large_price} />
					}
				})
			}
		</div>
	);
}

export {Products};