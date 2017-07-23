import express from 'express';
import yelp from 'yelp-fusion';

const router = express.Router();

var clientId = process.env.YELP_ID;
var clientSecret = process.env.YELP_SECRET;



router.route('/')
  //Get a list of bars in an area /api/yelp
  .get(function (req, res) {
    console.log(yelp);

    yelp.accessToken(clientId, clientSecret).then(function (response) {
      const client = yelp.client(response.jsonBody.access_token);

      client.search({
        term: 'Bar',
        location: 'St. Louis, mo'
      }).then (function (response) {
        res.json(response.jsonBody);
      })
    }).catch(function (err) {
      res.json(err);
    })
    
  })

export default router;
