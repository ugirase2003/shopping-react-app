// **************NOTE THIS FILE CONATINS ALL THE DATA SCHEMA AND APIS IN SINGLE FILE *************


require('dotenv').config();
const cookieParser=require('cookie-parser')
server=require("express")();
cors=require("cors");
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
server.use(cors());
server.use(cookieParser())
const jwt=require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const auth = require('./middleware/auth');
const bcryptjs=require("bcryptjs")

server.listen(process.env.PORT || 8080,()=>{
    console.log("Server is started");
})




main();
async function main(){
    await mongoose.connect(process.env.DB,{
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }).then(()=>{console.log("Connected with Db")}).catch((e)=>{console.log("Error ",e)});
}





server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://funny-lolly-116ba7.netlify.app');
    res.header(
      'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER'
    );
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
    next();
  });

  server.use(bodyParser.json())


//   ************ ALL THE SCHEMA ARE  HERE NOT IN ANOTHER FILE
  
//user data schema how user info will gonna means  data blueprint for  each user in db
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },


});
const User=mongoose.model('user',userSchema);  


const Product_Spec=new mongoose.Schema({
    sleeves:String,
    neck:String,
    type:String,
    length:String
})
const Product_Detail=new mongoose.Schema({
    desc:String,
    material:String,
    spec:{
        type:Product_Spec,
        default:null
    }
})



const ItemSchema=new mongoose.Schema({
    brand:String,
    title:String,
    o_price:String,
    off_price:String,   
    category:String,
    subCat:String,
    img:Array,
    product_detail:{
        type:Product_Detail,
        default:null
        }

})


const Item=mongoose.model('item',ItemSchema);



//User_Cart is structure or bleprint of document which will gonna save "user_cart_item" collection
const Cart_Item_Schema=new mongoose.Schema({
    cart_list:Array
})
// model fun has 2 parameters 1st one is collection name in whcih u will save various document of type 2nd paramterts 
//so here user_cart_item will store doc of type Cart_Item_Schema
const User_Cart=mongoose.model('user_cart_item',Cart_Item_Schema);``





// ***********END DATA SCHEMA*******************

// this is for adding item to your shop --->for admin side
server.post('/set',async (req,res)=>{

    console.log(req.body);
    let item=new Item(req.body);
    await item.save();
    res.send("Saved")

})

//*************** user register api
server.post('/register',async (req,res)=>{
  
    if(await User.findOne({email:req.body.email})==null)
{
    const encryptedPass=await bcryptjs.hash(req.body.password,8);
    let user=new User({...req.body,password:encryptedPass});
    await user.save();
    res.status(201).send("Registered Successfully");
}
else{
    res.status(409).send('User Already Exist')
}

 })
//  *************END***************



 //***********login api********
server.post('/login',async(req,res)=>{
  const user=  await User.findOne({email:req.body.email}).catch((err)=>{
        console.log(err)
     res.send("Couldn't process your request");
    })

        if(user!=null)
        {
         let isPassMatch=await bcryptjs.compare(req.body.password,user.password);

         if(isPassMatch){
              
            //get no of items of that user
            let cartSize=0;
            let user_cart= await User_Cart.findById({_id:user._id})    
            if(user_cart!=null)
            cartSize=user_cart.cart_list.length;

            //generate token
             const token=jwt.sign(
                {id:user._id.toString()},
                process.env.SECRET_KEY,
                {
                    expiresIn:"8h"
                }
                );

            console.log("Password macthed")
            user.password=undefined;    
         res.cookie('jwt',token,{
             expires:new Date(Date.now()+3*24*60*60*1000),
             httpOnly:true
         })
    
        console.log(user)
         res.status(200).json({token:token,size:cartSize,...user._doc})}
 
         else 
         res.status(401).send("Wrong Password")
 
        }
        else
        res.status(404).send("User not found")
}) 
// *****END***********


//************ get api for all items
server.get('/allitems',async (req,res)=>{
    try{
    const items=await Item.find({});
    // res.cookie('key','val')
    

    let loggedIn=true;    
    if(loggedIn){
        let user_cart= await User_Cart.findById({_id:'6459be4a8e7cd95e053a05ca'}).catch(()=>{
            console.log('error')
        })
        if(user_cart!=null)
        res.status(201).send({items,size:user_cart.cart_list.length})
        else
        
    res.status(201).send({items})
    } 
    else
    
    res.status(201).send({items})   
    

}
catch(err){
console.log("Error while fecthing",err)
res.status(404).send("Error")
}
   
})



server.get('/categorywise/:category/:subCat',async(req,res)=>{
    // console.log(req.params.category);
 
    try{
    const categroy_wise_items=await Item.find({category:req.params.category,subCat:req.params.subCat});

    res.status(201).send(categroy_wise_items);}
    catch(err){
        res.status(404).send("Error");
    }
})



server.get('/productView/:productid',async(req,res)=>{
    try{
        const prodcut=await Item.findById({_id:req.params.productid});
        console.log(prodcut);
        res.status(201).send(prodcut);
    }
    catch(err){
        res.status(404).send("Error ")
    }
})




// add product to user cart i.e cart)list field
server.post('/insert/:user_id',async(req,res)=>{
    try{
   let user_cart= await User_Cart.findById({_id:req.params.user_id})
   
   //if there is no document with passed id then create document and insert slected item in its cart_list field
        if(user_cart==null)
    {
       
        const new_cart=new User_Cart({_id:new ObjectId(req.params.user_id),cart_list:[req.body]});
        await new_cart.save();  
        console.log("Item Saved cause it wasnt exist",new_cart.cart_list.length)
        let size=new_cart.cart_list.length;
        res.status(201).send({size})
    }

    else{
    console.log("In else",user_cart.cart_list)    
    let item=req.body;


    const item_exist=user_cart.cart_list.some((item)=>{
        console.log("req id",req.body._id,"item id",item._id)
        if(req.body._id==item._id)
        {
            return true
        }
        else
        {
            return false
        }
    })


     console.log("Item EXist",item_exist)


    if(!item_exist)
    {
        //item_exist false then insert new element in cartlist 
         await user_cart.updateOne({$push:{cart_list:item}})
         let size=user_cart.cart_list.length+1
         console.log("new item",size)
         res.status(201).send({size})
    }
    else
    {
        //update quantity in that specific item 
        //as i coudnt update single object of array field so we are dierctly iterating through array and updating that whole array

       const new_updated_cart=user_cart.cart_list.map((item)=>{
          console.log("in map")
            if(req.body._id==item._id){
                console.log("item_cart",{...item,quan:item.quan+1})
                return {...item,quan:item.quan+1}
            }
            else 
                return item
       })
       console.log(new_updated_cart)
       //updating new array now
      await  user_cart.updateOne({cart_list:new_updated_cart})
      let size=new_updated_cart.length
      console.log("size",size)
      res.status(201).send({size})
    }
  
    }
    

    }catch(err){


    res.status(400).send("error obj")
            }})



   
   //delete cart item from cart list array of user
   server.delete('/delete/:item_id/:user_id',async(req,res)=>{

    
    try{
        let user_cart= await User_Cart.findById({_id:req.params.user_id});

        let new_cart=user_cart.cart_list.filter((item)=>{
            if(item._id!=req.params.item_id)
            return item
        })
        await user_cart.updateOne({cart_list:new_cart})
        console.log(new_cart)



       res.status(200).send("Cart Has been Updated")
    }
    catch(err){
        console.log('Error Occured',err)}
   })


   //******get all cart items */

   server.get('/user/cart/allItems/:user_id',async(req,res)=>{

    try{
    let user_cart= await User_Cart.findById({_id:req.params.user_id});
    if(user_cart!=null && user_cart.cart_list!=null)
     res.status(200).send(user_cart.cart_list)
    else 
    res.status(204).send("There is no item in Cart")
    }
    catch(err){
        res.status(400).send("ERROR"+err)
    }
   })

   
   server.get('/getUserData/:userId',async(req,res)=>{
       const user=await User.findById({_id:req.params.userId}).catch((err)=>{
        res.status(404).send('error while user fetch',err)
       }) ;
  
       let cart_size=0;
       const cart_user=await User_Cart.findById({_id:req.params.userId}).catch(()=>{
        res.status(404).send(err+'  error while cartsize fetching')
       })
       if(cart_user!=null)
         cart_size=cart_user.cart_list.length;

       res.status(201).json({size:cart_size,...user._doc})

   })



//    update user info
server.patch('/update/userinfo/:userId',async(req,res)=>{
    const user= await User.findById({_id:req.params.userId}).catch((err)=>{
        res.status(500).send(err);
    })
    console.log(req.body)
    user!=null?(async()=>{
        let isPassMatch=await bcryptjs.compare(req.body.password,user.password);
        if(isPassMatch){
            if('npass' in req.body)
                {
                    const encryptedPass=await bcryptjs.hash(req.body.npass,8);
                    console.log(encryptedPass)
                    req.body={...req.body,password:encryptedPass};
                    console.log(req.body)
                    delete req.body._id;
                    await User.updateOne({_id:req.params.userId},{$set:{...req.body}});
                    res.status(200).send('Operation Update Done')
                }
            else{    
            delete req.body.password ;   
            delete req.body._id;
            await User.updateOne({_id:req.params.userId},{$set:{...req.body}});
            res.status(200).send('Operation Update Done')
        }
        }
        else 
        res.status(401).send('Password not matched')
    })():res.status(404).send('User Not Found')

})



// get catgeorywise data
server.get('/categorywise/:category',async(req,res)=>{
 
    try{
    const categroy_wise_items=await Item.find({category:req.params.category});

    res.status(200).send(categroy_wise_items);}
    catch(err){
        res.status(404).send("Error");
    }
})
