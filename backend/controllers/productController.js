const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const search = req.query.search || ""; 
    let query = {};

    if (search) {
  query = {
    $or: [
          { title: { $regex: search, $options: "i" } },      
          { description: { $regex: search, $options: "i" } },  
          { brand: { $regex: search, $options: "i" } },        
          { category: { $regex: search, $options: "i" } },  
    ],
  };
  console.log("Search query:", query);

}

    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getProductById =  async (req ,res)=>{
    try{
         const products = await Product.findById(req.params.id);
         if(products){
                res.json(products);
         }else{
                res.status(404).json({ message: "Product not found" });
         }
        
    }
    catch(error){
        res.status(500).json({ message: "Server Error" });
    }
}

const getProductsByCategory  = async(req,res) => {
  try{
    const keyword = req.params.category;
     const products = await Product.find({
      category: { $regex: keyword, $options: "i" }
    });
    if(products.length>0){
          res.json(products)
    }else{
      return res.status(404).json({message:"No Products Found in this Category "})
    }
  }
  catch(error){
    console.log(error)
    res.status(500).json({message:"Server Error"})
  }
}

const addProduct = async (req, res) => {
  try {
    const { title, description, price, brand, category, stock, image } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "Title and Price are required" });
    }

    const product = new Product({
      title,
      description,
      price,
      brand,
      category,
      stock,
      image
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAllProducts = async (req, res) => {
  try {
    await Product.deleteMany({});   
    res.json({ message: "All products deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


const addProductsBulk = async (req, res) => {
    try {
        const products = req.body; 

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Provide an array of products" });
        }

        const savedProducts = await Product.insertMany(products);
        res.status(201).json(savedProducts);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};



module.exports = { getProducts, getProductById, getProductsByCategory, addProduct, deleteAllProducts, addProductsBulk }