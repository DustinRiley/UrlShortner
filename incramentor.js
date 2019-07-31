const Counter = require('./model/counter');


function getCounter(){
    return new Promise((resolve, reject)=>{

   
        Counter.find({}, (err, count) => {
            if (err) {
                console.log(err);
            //  res.status(500).json({error : "Oops!"});
                return;
            }
            //Everything good
            console.log(count[0].counterId);
            resolve(count[0].counterId);
        
        });
    });

}

function incramentCounter(count){
    let length = count.length-1;
    let currCharCode = count.charCodeAt(length);
}

function saveCounter(){

}

async function incrament(){
    let count = await getCounter();
    count = incramentCounter(count);
}

module.exports = incrament;