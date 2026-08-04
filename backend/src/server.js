const express = require("express");  //import express
const app = express();  // creating a express application
const port=3000;
app.listen(port,()=>{
  console.log(`CoTask server is running on port ${port}`)
});// starts the Express server and makes it listen for incoming HTTP requests on the specified port.
