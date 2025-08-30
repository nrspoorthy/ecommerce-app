import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false); 
  const navigate = useNavigate();

   const categories = [
    { slug: "all", name: "All" },
    { slug: "beauty", name: "Beauty" },
    { slug: "fragrances", name: "Fragrances" },
    { slug: "furniture", name: "Furniture" },
    { slug: "groceries", name: "Groceries" },
    { slug: "home-decoration", name: "Home Decoration" },
    { slug: "kitchen-accessories", name: "Kitchen Accessories" },
    { slug: "laptops", name: "Laptops" },
    { slug: "mens-shirts", name: "Mens Shirts" },
    { slug: "mens-shoes", name: "Mens Shoes" },
    { slug: "mens-watches", name: "Mens Watches" },
    { slug: "mobile-accessories", name: "Mobile Accessories" },

  ];

  const handleCategoryClick = (category) => {  
    setOpenDropdown(false); 
    if (category.slug === "all") {
      navigate("/products");
    } else {
      navigate(`/category/${category.slug}`);
    }
  };

  
    const handleLogout = () => {
      navigate("/login")
    }

  const handleSearchInput = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      e.preventDefault();
       navigate(`/products?search=${encodeURIComponent(searchInput)}`);
      setSearchInput("");
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">MyShop</div>

      <div className="navbar-right">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearchInput}
          value={searchInput}
        />

        
        <div className="dropdown">
          <button 
            className="nav-btn" 
            onClick={() => setOpenDropdown(!openDropdown)}
          >
            Categories 
          </button>
          {openDropdown && (
            <div className="dropdown-menu">
              {categories.map((category, idx) => (
                <button
                  key={idx}
                  className="dropdown-item"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="nav-btn" onClick={handleLogout}>Logout</button>
        <button className="nav-btn">Cart </button>
      </div>
    </nav>
  );
}
