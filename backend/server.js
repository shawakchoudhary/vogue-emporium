const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");
const { connect } = require("http2");

//handling uncaught Exception(console.log(youtube) will give this error)
process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting Down th Server due to uncaught Exception");
     process.exit(1);
});

//config
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({ path: "backend/config/config.env" });
}

//connecting to database
connectDatabase();
cloudinary.config({
     cloud_name: process.env.CLOUDINARY_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_SECRET_KEY,
     

});

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on https://localhost:${process.env.PORT}`)
});


// Unhandled Promise Rejection(when the request for the database server is made is invalied).Server Also does not crash properly
//So to Close Server Properly

process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message} `);
    console.log(`Shutting Down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});

