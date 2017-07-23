import express from 'express';
import yelp from 'yelp-fusion';

const router = express.Router();


function searchBars(location) {
  var clientId = process.env.YELP_ID;
  var clientSecret = process.env.YELP_SECRET;

  var promise = new Promise(function (resolve, reject) {
    yelp.accessToken(clientId, clientSecret).then(function (response) {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term: 'Bar',
        location: location
      }).then (function (response) {
        resolve(response.jsonBody);
      })
    }).catch(function (err) {
      reject(err);
    })
  });

  return promise;

}

router.route('/')
  //Get a list of bars in an area /api/yelp
  .get(function (req, res) {

    var location = req.query.location;
    console.log(location);

    searchBars(location).then (function (data) {
      res.json(data);
    }).catch (function (err) {
      res.json(err);
    })

  })

export default router;
