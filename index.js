const vaccination = require('./services/vaccination');
const moment = require('moment');
const cronJob = require('node-cron')

const getDates = () =>{
    let today = moment();
    let dates = []
    for(let i = 0 ; i < 6 ; i ++ ){
        let dateString = today.format('DD-MM-YYYY')
        dates.push(dateString);
        today.add(1, 'day');
    }
    return dates;
}

(()=>{
    try {
        cronJob.schedule('* * * * *',()=>{
            getDates().forEach((date)=>{
                vaccination.checkSlots(date)
            })
        })
    } catch (e) {
        console.log(e);
    }
    
})()