const router = require("express").Router();
const Places = require("../models/Place.model")

router.get("/", (req, res) => {

    Places
        .find()
        .then((places) => {
            res.render("places/list", {places})
        })
        .catch((err) => console.log(err))

})

router.get("/bookstores", (req, res) => {

    Places
        .find({type: "bookstore"})
        .then((places) => {
            res.render("places/list", {places})
        })
        .catch((err) => console.log(err))

})

router.get("/coffee-shops", (req, res) => {

    Places
        .find({type: "coffee shop"})
        .then((places) => {
            res.render("places/list", {places})
        })
        .catch((err) => console.log(err))

})

router.get("/create", (req, res) => {
  res.render("places/create")
})

router.post("/create", (req, res) => {
    const { name, type, lat, lng} = req.body

    const location = {
        type: "Point",
        coordinates: [lat, lng] 
    }

    Places
        .create({name, type, location})
        .then(() => res.redirect("/places"))
        .catch((err) => console.log(err))
})

router.get("/edit/:id", (req, res) => {

    const { id } = req.params
    
    Places
    .findById(id)
    .then((place) => {
        
            let isCoffeeShop = false
            place.type === "coffee shop" ? isCoffeeShop = true : false
            res.render("places/edit", { place , isCoffeeShop})
        })
        .catch((err) => console.log(err))

})

router.post("/edit/:id", (req, res) => {

    const { id } = req.params
    const { name, type, lat, lng } = req.body

    const location = {
        type: "Point",
        coordinates: [lat, lng]
    }

    Places
        .findByIdAndUpdate(id, { name, type, location })
        .then( () => res.redirect("/places"))
        .catch((err) => console.log(err))

})

router.get("/delete/:id", (req, res) => {

    const { id } = req.params

    Places
        .findByIdAndDelete( id )
        .then(() => res.redirect("/places"))
        .catch((err) => console.log(err))   
  })

router.get("/map", (req, res) => {
    res.render("places/maps")
})

module.exports = router;
