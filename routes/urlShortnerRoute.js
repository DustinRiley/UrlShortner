var express = require('express');
const UrlShort = require('../model/url-data');
var router = express.Router();
var validator = require('validator');
const generate = require('nanoid/generate')
const legalChars ='ABCDEFGHIJKLMONPQRSTUVWYXZabcdefghijklmnopqrstuvwyxz0123456789'

/*RENDER INDEX*/
router.get('/', (req,res)=>{
    res.render('index',{title:'short me'});
});

/*ADD NEW URL*/
router.post('/short', (req, res) => {
   console.log('body of request is: '+req.body);
    if (!req.body.url) {
        return res.status(400).json({msg : "Invalid url"});
    }

    let url = validateUrl(req.body.url);
    
    //if url is valid save to DB and respond
    if(url){
        let short = new UrlShort({
            url:  url,
            _id:  generate(legalChars, 5)
        })
    
        short.save(short, (err)=> {
            if (err) {
                console.log(err);
                res.status(500).json({error : "Oops!"});
                return;
            }
            res.json({
                    status : 'Success',
                    shorturl: req.get('host')+"/"+short._id,
                    sanitizedURL: short.url
                });        
        });   
    } 
    //if url is not valid respond with error
    else{
        res.json({
            status : 'Error',
            msg    : 'Invalid URL'
        });      
    }
});

/*GET URL FROM SHORT ID */
router.get('/:id',async (req, res)=>{
    let url= await getUrl(req);
    res.writeHead(301, {Location: url});
    res.end();
    
    
});

/**
 * Get a url asynchronously from request
 * 
 * @param {Request} req a get request
 * 
 * @returns {Promise.<string>} a url path
 */
async function getUrl(req){
    return new Promise((resolve, reject)=>{

        UrlShort.findOne({_id: req.params.id}, (err, doc)=>{
            console.log('doc is '+doc);
            if(doc){
               resolve(doc.url)
            }
            else{
                resolve('/');
            }
      });
    });
}

/**
 * Insures a valid URL
 * 
 * @param {string} url 
 * 
 * @returns {<string, boolean>} if url is valid return string else return false 
 */
function validateUrl(url){
    //if is not a valid url return false
    if(!validator.isURL(url)){
        return false;
    }
    //if its valid but does not contain trailling http
    //add http:// 
    else if(url.substring(0,4)!='http'){
        return 'http://'+url;
    }
    //passed both conditions must be valid
    //and contain trailling http
    else{
        return url;
    }
    
}



module.exports = router;