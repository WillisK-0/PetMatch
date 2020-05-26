// let data = {};

// let expires = new Date().getTime() + data.expires_in * 1000;

// let getPets = function (callback) {
//   return (
//     fetch("https://api.petfinder.com/v2/animals?location=Houston, TX", {
//       headers: {
//         Authorization: tokenType + " " + token,
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//       .then(function (resp) {
//         return resp.json();
//       })
//       //printing all pets info to console
//       .then(function (data) {
//         callback(data);
//       })
//       .catch(function (err) {
//         console.log("something went wrong", err);
//       })
//   );
// };

// //-------------------------

// //validate token and fetch pets
// let makeCall = function (callback) {
//   if (!expires || expires - new Date().getTime() < 1) {
//     console.log("new call");
//     getOAuth().then(function () {
//       getPets((data) => {
//         callback(data.animals);
//       });
//     });
//     return;
//   }
//   //otherwise, get pets
//   console.log("from cache");
//   getPets();
// };
makeCall = function () {
  console.log("exportedFunction");
};
module.exports = makeCall;
