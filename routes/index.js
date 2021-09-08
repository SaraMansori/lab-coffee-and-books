module.exports = app => {
  
  // Base routes
  app.use("/", require("./base.routes"));
  
  // Places routes
  app.use("/places", require("./places.routes")); 

  //Maps
  app.use('/api', require('./api.routes'))

}

