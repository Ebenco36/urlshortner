const validUrl = require('valid-url')
const shortid = require('shortid')
const URL = require('../models/urlshortner')
const cipher = require('../../cipher')


exports.url_shortner = async(req, res, next) => {
    const {longUrl} = req.body
    const baseUrl = req.get('host') 
    // if valid, we create the url code
    const shortCode = shortid.generate()
    const UrlEncrpyt = cipher.encrypt(longUrl)
    
    if (validUrl.isUri(longUrl)) {
        try {
            /* The findOne() provides a match to only the subset of the documents 
            in the collection that match the query. In this case, before creating the short URL,
            we check if the long URL was in the DB ,else we create it.
            */
            let url = await URL.findOne({
                UrlEncrpyt
            })
            // url exist and return the respose
            if (url) {
                let data = {
                    "id" : url._id,
                    "long_url" : cipher.decrypt(url.UrlEncrpyt),
                    "short_code" : url.shortCode,
                    "shortUrl" : baseUrl + '/' + url.shortCode,
                    "created_at" : url.date
                }
                return res.status(201).json({message:"created already", data: data})
            } else {
                // join the generated short code the the base url
                const shortUrl = baseUrl + '/' + shortCode

                // invoking the Url model and saving to the DB
                url = new URL({longUrl,UrlEncrpyt,date: new Date()})  
                await url.save()
                let data = {
                    "id" : url._id,
                    "long_url" : cipher.decrypt(url.UrlEncrpyt),
                    "short_code" : url.shortCode,
                    "shortUrl" : baseUrl + '/' + url.shortCode,
                    "created_at" : url.date
                }
                return res.status(201).json({message:"created successfully", data: data})
            }
        }
        // exception handler
        catch (err) {
            return res.status(500).json({message:"Error", err: err})
        }
    } else {
        return res.status(400).json({message:"Invalid url"})
    }
    
}



exports.get_urls = async(req, res, next) => {
    URL.find({}, function(err, result){
        if(result.length > 0){
            const response = {
                count:result.length,
                data: result
            };
            return res.status(201).json({message:"Data fetch successfully", data: response})
        }
        else{
            return res.status(201).json({message:"None on the list for now"})
        }
    }).catch(err => {
        return res.status(500).json({message:"Error has occurred", err: err})
    });
}



exports.handleRedirection = async(req, res, next) => {
    try {
        // find a document match to the code in req.params.code
        const url = await URL.findOne({
            shortCode: req.params.code
        })
        if (url) {
            // when valid we perform a redirect
            return res.redirect(cipher.decrypt(url.UrlEncrpyt))
        } else {
            // else return a not found 404 status
            return res.redirect('/url_shortner')
        }

    }
    // exception handler
    catch (err) {
        console.error(err)
        return res.redirect('/url_shortner')
    }
}