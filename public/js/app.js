
const weatherForm = document.querySelector('form')
const search=document.querySelector('input')
const paragraphLocation=document.getElementById('location')
const paragraphForecast=document.getElementById('forecast')
  weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
  
   if(location){
    fetch('http://localhost:3000/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
           
          if (data.error) {
              paragraph.innerHTML=data.error
              } else {
                   
                  paragraphLocation.innerHTML=data.place
                  paragraphForecast.textContent=data.forecast
             
              }
        })
      })
   }


})