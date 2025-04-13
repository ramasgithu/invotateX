// require('dotenv').config(); // at the top if not already there
 // correct path
 const express=require("express");
const app=express();
const mongoose=require("mongoose");
// const Listing=require("./models/listings.js");
const User=require("./models/login.js");
const Student=require("./models/attendance.js");
const path=require("path");
// const openaiRoutes = require('./hackproject/routes/api/openai.js');
// const methodOverride=require("method-override"); 
// const ejsMate=require("ejs-mate");
// const wrapAsync=require("./utils/wrapAsync.js");   
// const ExpressError=require("./utils/ExpressError.js");
// const {listingSchema}=require("./schema.js");
// const Review=require("./models/reviews.js"); 


const MONGO_URL="mongodb://127.0.0.1:27017/LLMUSER";

main().then(()=>console.log("connected to DB")).catch((err)=>console.log(err));

async function main(){
    await mongoose.connect(MONGO_URL);
};
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
// app.use(methodOverride("_method"));
// app.engine("ejs",ejsMate);
// app.use(express.static(path.join(__dirname,"public")));

// app.get("/",(req,res)=>{
//     res.send("Hi I am groot.Oh! sorry I am root");
// });

// const validateListing=(req,res,next)=>{
//     let{error}=listingSchema.validate(req.body);
//     if(error){
//         let errMsg=error.details.map((el)=>el.message).join(",");
//         throw new ExpressError(404,errMsg);
//     }
//     else{
//         next();
//     }
// };

// //Index Route
// app.get("/listings",wrapAsync(async(req,res)=>{
//    const allListings= await Listing.find({});
// //    console.log(allListings);
//    res.render("listings/index.ejs",{allListings});
// }));

// //New Route
// app.get("/listings/new",(req,res)=>{
//     res.render("listings/new.ejs");
// });

// //Show Route
// app.get("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/show.ejs",{listing});
// }));

// //create Route
// app.post("/listings",validateListing,wrapAsync(async(req,res,next)=>{
//     // let {title,description,image,price,location,country}=req.body; or you can write in another form as 
//     const newListing=new Listing(req.body.listing);
//    await newListing.save();
//    res.redirect("/listings");
// }));

// //Edit Route
// app.get("/listings/:id/edit",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     const listing=await Listing.findById(id);
//     res.render("listings/edit.ejs",{listing});
// }));

// //Update Route
// app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     await Listing.findByIdAndUpdate(id,{...req.body.listing});
//     res.redirect(/listings/${id});
// }));

// //Delete Route
// app.delete("/listings/:id",wrapAsync(async(req,res)=>{
//     let {id}=req.params;
//     let deletedListing=await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));

// //Reviews
// //Post Route

// app.post("listings/:id/reviews",async(req,res)=>{

// })

// // app.get("/testListing",async(req,res)=>{
// //     let sampleListing=new Listing({
// //         title:"My beach villa",
// //         description:"enjoy the view",
// //         price:2344,
// //         location:"Alaphuzza,Goa",
// //         country:"India",
// //     });
// //     await sampleListing.save();
// //     console.log("sample was saved");
// //     res.send("succesful testing");
// // });

// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not found!"));
// });

// app.use((err,req,res,next)=>{
//     const{statusCode=500,message="Something went wrong!"}=err;
//     // res.status(statusCode).send(message);
//     res.status(statusCode).render("error.ejs",{message});
// });

// app.use('/api/openai', openaiRoutes);

//homepage
app.get("/dashboard",(req,res)=>{
    res.redirect("HOMEPAGE.ejs");
});

//attendance page
app.get("/:username/attedance",(req,res)=>{
    const username = req.params.username;
    res.render("attedence.ejs",{username});
});
//code playground
app.get("/:username/codeplaygrounds",(req,res)=>{
    res.render("code playground.ejs");
});

//contests page
app.get("/:username/contests",(req,res)=>{
    res.render("contests.ejs");
});

//codingroom page
app.get("/:username/coderooms",(req,res)=>{
    res.render("coodingroom.ejs");
});

//courses page
app.get("/:username/courses",(req,res)=>{
    res.render("courses.ejs");
});

//grades page
app.get("/:username/grades",(req,res)=>{
    res.render("grades.ejs");
});

//learning page
app.get("/:username/learningpath",(req,res)=>{
    res.render("lerningpath.ejs");
});

//problemsets page
app.get("/:username/problemssets",(req,res)=>{
    res.render("problemssets.ejs");
});

//login page
app.get("/login",(req,res)=>{
    res.render("login.ejs");
});

//jobs page
app.get("/:username/jobmatch",(req,res)=>{
    res.render("jobmatch.ejs");
});

//calender page
app.get("/:username/calender",(req,res)=>{
    res.render("calender.ejs");
});

//resume page
app.get("/:username/resumebuilder",(req,res)=>{
    res.render("resumebuilder.ejs");
});

//portfolio page
app.get("/:username/portfolio",(req,res)=>{
    res.render("portfolio.ejs");
});


//validation of login page
app.post("/dashboard/validate",async(req,res)=>{
    const{username,password}=req.body;
    try{
        const userData= await User.findOne({username:username});
        if(userData.username===username && userData.password===password){
            res.render("HOMEPAGE.ejs",{userData});
        }
        else{
            res.render("login.ejs");
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//signup page
app.get("/register",(req,res)=>{
    res.render("signup.ejs");
});

app.post("/register/newuser",async(req,res)=>{
    const {username,password}=req.body;
    try{
        const newUser= new User({username,password});
        await newUser.save();
        res.render("login.ejs");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});

//assignment page
app.get("/:username/assignments",(req,res)=>{
    res.render("assignments.ejs");
});



app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});