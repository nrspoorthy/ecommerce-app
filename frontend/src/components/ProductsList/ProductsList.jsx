import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ProductsList.css";
import Navbar from "../Navbar/Navbar";
import { useCart } from "../context/CartContext";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;

  const { category } = useParams(); 
  const { addToCart } = useCart();
  const location = useLocation();

  
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("search") || "";

  useEffect(() => {
    const fetchProductsList = async () => {
      try {
        let response;

        if (category) {
          response = await fetch(
            `http://localhost:3000/api/products/category/${category}`
          );
        } else {
          response = await fetch(`http://localhost:3000/api/products`);
        }

        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setProducts(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Could not fetch the data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsList();
  }, [category]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(keyword.toLowerCase()) ||
      product.description.toLowerCase().includes(keyword.toLowerCase())
  );

  
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <Navbar />
      <div className="products-list-container">
        {category && (
            <h1 className="products-list-title">{category}</h1>
          )}

          {!category && !keyword && (
            <h1 className="products-list-title">All Products</h1>
        )}

        <div className="products-grid">
          {currentProducts.length === 0 ? (
            <p>No products found</p>
          ) : (
            currentProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />
                <h2 className="product-title">{product.title}</h2>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>

        
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next 
            </button>
          </div>
        )}
      </div>
    </>
  );
}
