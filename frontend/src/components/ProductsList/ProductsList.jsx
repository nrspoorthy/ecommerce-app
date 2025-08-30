import React, { useEffect, useState } from 'react'
import { useParams, useLocation  } from 'react-router-dom'
import './ProductsList.css'
import Navbar from '../Navbar/Navbar'

export default function ProductsList() {
    const [products,setproducts] = useState([])
    const {category,keyword} = useParams()
    // const location = useLocation()


    // // const query = new URLSearchParams(location.search)
    // // const search = query.get("search")
    useEffect(()=> {
        const fetchProductsList = async() => {
            let response;
            try{
                if(category){
                    response = await fetch(`http://localhost:3000/api/products/category/${category}`)
                }else if(search){
                    response = await fetch(`http://localhost:5000/api/products?search=${encodeURIComponent(keyword)}`)
                }else{
                    response = await fetch(`http://localhost:3000/api/products`)
                }
                const data =await response.json()
                setproducts(data)
            }
            catch(error){
                console.log(error,"Couldnot fetch the data")
            }
        }
        fetchProductsList()
    },[category,keyword])


  return (
    <>
    <Navbar/>
    <div className="products-list-container">
  <h1 className="products-list-title">{category}</h1>
  <div className="products-grid">
    {products.map((product) => (
      <div className="product-card" key={product._id}>
        <img src={product.thumbnail} alt={product.title} className="product-image" />
        <h2 className="product-title">{product.title}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">₹{product.price}</p>
        <button className="add-to-cart-btn">Add to Cart</button>
      </div>
    ))}
  </div>
</div>


  </>
  )
}
