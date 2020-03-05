const router = require("express").Router();
let Donor = require("../models/Donor.model");

//when in route dir, find all Donors and return them as a json object
router.route("/").get((req, res) => {
  Donor.find()
    .then(Donors => res.json(Donors))
    .catch(err => res.status(400).json("Error: " + err));
});

//post request to add data for user, create the json object and save it 
router.route("/add").post((req, res) => {
  const name_of_restaurant = req.body.name_of_restaurant;
  const location = req.body.location;
  const address = req.body.address;
  const food_available_start_time = req.body.food_available_start_time;
  const food_available_end_time = req.body.food_available_end_time;
  const food_available = req.body.food_available;
  const potential_allergies = req.body.potential_allergies;

  const newDonor = new Donor({
    name_of_restaurant,
    location,
    address,
    food_available_start_time,
    food_available_end_time,
    food_available,
    potential_allergies,
  });

  newDonor
    .save()
    .then(() => res.json("Donor added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

// //:id is getting the object id from url
// router.route('/:id').get((req,res) => {
//     Donor.findById(req.params.id)
//     .then(Donor => res.json(Donor))
//     .catch(err => res.status(400).json("Error: " + err))
// })

// router.route('/:id').delete((req,res) => {
//     Donor.findByIdAndDelete(req.params.id)
//     .then(() => res.json("Donor deleted"))
//     .catch(err => res.status(400).json("Error: " + err))
// })

// router.route('/update/:id').post((req,res) => {
//     Donor.findById(req.params.id)
//     .then(Donor => {
//         Donor.username = req.body.username;
//         Donor.description = req.body.description;
//         Donor.duration = Number(req.body.duration);
//         Donor.date = Date.parse(req.body.date);

//         Donor.save()
//         .then(() => res.json("Donor updated"))
//         .catch(err => res.status(400).json("Error: " + err))
//     })
//     .catch(err => res.status(400).json("error: " + err))
// })

module.exports = router;
