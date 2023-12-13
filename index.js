const express=require("express");
const app=express();
const path=require('path');
//creating models in product.js and require it in here
const Product=require('./models/product')
//to use put request
const methodOverride=require('method-override')
app.use(methodOverride('_method'))

//Mongo connection
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(()=>{
    console.log("Mongo Connection Open!!");
}).catch(err=>{
    console.log("OHH no Mongo connection error");
    console.log(err);

})

app.set('views',path.join(__dirname,'views'));
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:true}))//to use post request

//To show the previous category option  during edit the product
const categories=['fruit','vegetable','dairy','mashroom'];


//CURD
//Route 1 to view all products using product.find()
app.get('/products',async(req,res)=>{
   //to show the all products related to same category
   const {category}=req.query;
   if(category){
    const products=await Product.find({category})
    res.render('products/index',{products,category})

   }else{
    const products=await Product.find({})
    res.render('products/index',{products,category:"All"})//rednring index.ejs(html file) on localhost  and passing all the products on index.ejs

   }

    
    // console.log(products);
    // res.send("All Products will be here")
    
})

//Route 2 to create a new product it is use to redner thr form from new.ejs
app.get('/products/new',(req,res)=>{
    res.render('products/new',{categories})
})
//Route 3 is use to create and submit the form data of  new.ejs form through route 2
app.post('/products',async(req,res)=>{
    // console.log(req.body);
    const newProduct=new Product(req.body);
    await newProduct.save()
    res.redirect(`/products/${newProduct._id}`)

})

//Route 4 to view more details about particular product using findBYId()
app.get('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product = await Product.findById(id)
    // console.log(product);
    // res.send("Details page!")
    res.render('products/show',{product})
})

//Route 5 to update all values of  the product
app.get('/products/:id/edit',async(req,res)=>{
    const {id}=req.params;
    const product = await Product.findById(id)
    res.render('products/edit',{product,categories})
})
//update only single value of product
//as we know we cannot use the put request directly so we need to install method override in node index.js
app.put('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const product=await Product.findByIdAndUpdate(id,req.body,{runvalidators:true,new:true})
    res.redirect(`/products/${product._id}`)

})


//Route 6 delete
app.delete('/products/:id',async(req,res)=>{
    const {id}=req.params;
    const deleteProduct=await Product.findByIdAndDelete(id)
    res.redirect('/products');

})






app.listen(3000,()=>{
    console.log("App is listning on port 3000!");
})