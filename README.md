# UrlShortenerLaravel

<p>Url shortener helps to reduce the length of a long url to a shorter one. </p>

<p>On this application, urls are being encrypted for security purposes, probably for safety</p>


## About URL Shortener

This is a node js app built by Awotoro Ebenezer Oladimeji to help reduce long urls to a shorter one.
## How to install
- Download git repository content or pull from the git repository.
- Run npm install or npm i to install all packages required for the application.
> npm install or npm i
- Start your application using npm run start.
> npm run start
- Application runs on port 5000 visit http://localhost:5000/api/url_shortner

## Endpoints available
- Visit http://localhost:5000/api/url_shortner to get the list of url.
- Make a post request http://localhost:5000/api/url_shortner to create or generate a short code urls.
> data required for the post endpoint 
```json
{
    "longUrl": "http://www.facebook.com?ssjjsslkdlksdsdsdsdsd.ddsdsdsdsdsdnkkdns$cdjdjddj"
}
```
- View page using endpoint http://localhost:5000/api/:code which redirects user to real page.

