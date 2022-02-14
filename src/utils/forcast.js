const request = require("postman-request");
const forecast = (latitude, longitude,callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=cfaf0c2804129a32e2de34bad2aee021&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";
    request({ url, json: true }, (error, {body}) => {
        if (error) {
          callback("Unable to connect to location services!");
        } 
        else if(body.error){
            callback("Unable to find location. Try another search");
        }
        else {
           
            callback(undefined,body.current.weather_descriptions[0]+'.It is cruelty '+ body.current.temperature+' degree out . There is a '+ body.current.feelslike+' % chance of rain')
        }


})
}
module.exports = forecast;
