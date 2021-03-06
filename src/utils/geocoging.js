const request = require("postman-request");
const geocoding = (address,callback) => {
 
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI( address)    +
      ".json?access_token=pk.eyJ1IjoiYWJvdXphaWQxIiwiYSI6ImNremxueDRuaTE3YmcybmxsZnVzNnR0b2EifQ.imSdT_lql9jCx6oZQ9FDUQ&limit=1";
   
    request({ url, json: true }, (error, {body}={}) => {
      if (error) {
        callback("Unable to connect to location services!");
      } else if (body.features.length === 0) {
        callback("Unable to find location. Try another search.");
      } else {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const place=body.features[0].place_name;
        callback(undefined,{latitude, longitude,place});
      }
    });
  };

  module.exports= geocoding