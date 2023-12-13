//creating models and require it in here
const Product=require('./models/product')

//Mongo connection
const mongoose =require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/farmStand').then(()=>{
    console.log("Mongo Connection Open!!");
}).catch(err=>{
    console.log("OHH no Mongo connection error");
    console.log(err);

})

//make Product one at a time******************
// const p =new Product({
//     name:"Ruby grapefruit",
//     price:1.99,
//     category:'fruit'

// })
// p.save().then(p=>{
//     console.log(p);
// }).catch(e=>{
//     console.log(e);
// })


//Other method :Use insertMany method  to create many  Product 
const seedProducts=[
    {
        name:"Fairy Eggplant",
        price:1.00,
        category:"vegetable"
    },
    {
        name:"Organig Melon",
        price:2.00,
        category:"vegetable"
    },
    {
        name:"Carrot",
        price:2.80,
        category:"vegetable"
    },
    {
        name:"Mango",
        price:1.80,
        category:"fruit"
    },
    {
        name:"Milk",
        price:1.20,
        category:"dairy"
    },


]
Product.insertMany(seedProducts).then(res=>{
    console.log(res);
}).catch(e=>{
    console.log(e);
})