import React, { Fragment, useEffect, useState } from 'react';
import "./products.css";
import Navbar from '../Navbar/Navbar';


export default function Products() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const token = localStorage.getItem("token");
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.log(error, "couldn't fetch the data");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [token]);

  useEffect(() => { setCurrentPage(1); }, [products]);

  if (loading) return <h1>Loading..</h1>;
  if (!products.length) return <h2 style={{textAlign:'center'}}>No products found</h2>;

  const totalPages = Math.ceil(products.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const currentProducts = products.slice(start, start + PAGE_SIZE);

  return (
    <Fragment>
      <Navbar/>
   
      <div className="products-container">
        <h1 className="products-title">Products</h1>

        <div className="products-grid">
          {currentProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <img 
                src={product.thumbnail || (product.images && product.images[0])} 
                alt={product.title} 
                className="product-img"
              />
              <h3 className="product-name">{product.title}</h3>
              <p className="product-desc">{product.description}</p>
              <p className="product-price">₹{product.price}</p>
              <button className='add-tocart'>Add to Cart</button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`page-num ${num === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <button
            className="page-btn"
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </Fragment>
  );
}
