const express = require("express");
const router = express();
const session = require("express-session");

const getAuth = require("../APIfunctions/getAuth");
const getPets = require("../APIfunctions/getPets");
const fakeArray = require("../js/details");

router.get("/petDetails", (req, res) => {
  getOAuth((data) => {
    getAllPets(data.token, data.tokenType, (response) => {
      const petsArray = response.animals.map((animal) => {
        const photoObject = animal.primary_photo_cropped;
        const image = photoObject ? photoObject.medium : "sorry";
        //       // console.log(image);
        const placeHolderUrl =
          animal.type === "Dog"
            ? "https://i.pinimg.com/originals/aa/91/2d/aa912de6d6fe70b5ccd0c8b9fc7a4f26.jpg"
            : "https://www.pngkit.com/png/detail/159-1598700_kitty-clipart-anime-cat-cute-cat-clip-art.png";
        return {
          ...animal,
          primary_photo_cropped: photoObject
            ? photoObject
            : {
                medium: placeHolderUrl,
              },
        };
      });
      // getOAuth((data) => {

      // });
      let petInfo = { pets: petsArray };
      res.render("petDetails", petInfo);
    });
  });
});

// let fakeArray = {
//   animals: [
//     {
//       id: 48070161,
//       organization_id: "TX2453",
//       url:
//         "https://www.petfinder.com/dog/ace-48070161/tx/orange/be-intentional-tx2453/?referrer_id=b51cdda1-bdbb-4caf-9ac0-072e6923c364",
//       type: "Dog",
//       species: "Dog",
//       breeds: [Object],
//       colors: [Object],
//       age: "Adult",
//       gender: "Male",
//       size: "Large",
//       coat: "Medium",
//       attributes: [Object],
//       environment: [Object],
//       tags: [Array],
//       name: "Ace",
//       description:
//         "Ace is a character!  He has been through obedience training and is very well mannered.  He is Heartworm positive but...",
//       photos: [Array],
//       primary_photo_cropped: [Object],
//       videos: [],
//       status: "adoptable",
//       status_changed_at: "2020-05-27T14:59:42+0000",
//       published_at: "2020-05-27T14:59:42+0000",
//       distance: 98.4881,
//       contact: [Object],
//       _links: [Object],
//     },
//     {
//       id: 48070127,
//       organization_id: "TX920",
//       url:
//         "https://www.petfinder.com/dog/clover-48070127/tx/spring/great-pyrenees-rescue-society-tx920/?referrer_id=b51cdda1-bdbb-4caf-9ac0-072e6923c364",
//       type: "Dog",
//       species: "Dog",
//       breeds: [Object],
//       colors: [Object],
//       age: "Adult",
//       gender: "Female",
//       size: "Large",
//       coat: null,
//       attributes: [Object],
//       environment: [Object],
//       tags: [],
//       name: "Clover",
//       description:
//         "Please fill out our short application - the link is below.\n" +
//         "Meet Clover. This doll just arrived at rescue from...",
//       photos: [Array],
//       primary_photo_cropped: [Object],
//       videos: [],
//       status: "adoptable",
//       status_changed_at: "2020-05-27T14:49:34+0000",
//       published_at: "2020-05-27T14:49:34+0000",
//       distance: 20.5675,
//       contact: [Object],
//       _links: [Object],
//     },
//     {
//       id: 48070063,
//       organization_id: "TX424",
//       url:
//         "https://www.petfinder.com/cat/a554681-48070063/tx/houston/harris-county-pets-tx424/?referrer_id=b51cdda1-bdbb-4caf-9ac0-072e6923c364",
//       type: "Cat",
//       species: "Cat",
//       breeds: [Object],
//       colors: [Object],
//       age: "Baby",
//       gender: "Male",
//       size: "Small",
//       coat: null,
//       attributes: [Object],
//       environment: [Object],
//       tags: [],
//       name: "A554681",
//       description: null,
//       photos: [Array],
//       primary_photo_cropped: [Object],
//       videos: [],
//       status: "adoptable",
//       status_changed_at: "2020-05-27T14:45:21+0000",
//       published_at: "2020-05-27T14:45:21+0000",
//       distance: 6.6785,
//       contact: [Object],
//       _links: [Object],
//     },
//   ],
// };

// console.log(fakeArray);

// app.get("/pet-details", (req, res) => {
//   let animal = fakeArray.animals[0];
//   res.render("/pet-details", { animal: animal });
// });
module.exports = router;
