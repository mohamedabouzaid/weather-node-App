const request = require("postman-request");
const geocoding = (address,callback) => {
 
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI( address)    +
      ".json?access_token=pk.eyJ1IjoiYWJvdXphaWQxIiwiYSI6ImNremxueDRuaTE3YmcybmxsZnVzNnR0b2EifQ.imSdT_lql9jCx6oZQ9FDUQ&limit=1";
     
    request({ url, json: true }, (error, res) => {
      if (error) {
        callback("Unable to connect to location services!");
      } else if (res.body.features.length === 0) {
        callback("Unable to find location. Try another search.");
      } else {
        const latitude = res.body.features[0].center[1];
        const longitude = res.body.features[0].center[0];
        const place=res.body.features[0].place_name;
        callback(undefined,{latitude, longitude,place});
      }
    });
  };

  module.exports= geocoding