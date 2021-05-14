require('dotenv').config()
const _get = require('lodash.get')
const axios = require('axios')

exports.checkSlots = (date) => {
    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${process.env.PINCODE}&date=${date}`,{
        headers : { 'User-Agent' : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"}
    }).then(function (slots) {
        const centers = _get(slots,'data.centers',[]);
        let availableOptions = []
        centers.forEach(center => {
            const option = _get(center,'sessions',[]).filter( session =>session.min_age_limit <= process.env.AGE &&  session.available_capacity > 0)
           if(option.length){
               availableOptions.push(option)
           }
        });
    })
    .catch(function (error) {
        console.log(error);
    });
}