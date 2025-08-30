const mongoose = require("mongoose")
const dotenv = require("dotenv")
const productsData = require("./data/products.json")
const Product = require("./models/Product");
dotenv.config()

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
})

const importData = async() => {
    try{
        await Product.deleteMany(); // clear old data
        await Product.insertMany(productsData.products); // insert new data
        console.log("Data Imported Successfully ");
        process.exit();
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }
}

importData();