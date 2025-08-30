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
module.exports = { getProducts, getProductById, getProductsByCategory }