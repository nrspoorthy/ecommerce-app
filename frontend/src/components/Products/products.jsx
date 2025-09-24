import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart(); 

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("http://localhost:3000/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Products</h2>
      
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              {product.title} - ₹{product.price}
              
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      
    </div>
  );
}
