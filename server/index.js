const express = require('express')
const dotenv = require('dotenv');
const request = require('request');

const port = 5000

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET

var access_token = null

var app = express();

var generateRandomString = function(length){
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text;
}

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/auth/login', (req,res) => {
    var scope = "streaming \
               user-read-email \
               user-read-private \
               user-read-recently-played \
               playlist-read-private";

    var state = generateRandomString(16);

    var auth_query_params = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: "http://localhost:5000/auth/callback",
        state:state
    })

    console.log('redirecting')

    res.redirect('https://accounts.spotify.com/authorize?' + auth_query_params.toString());
});

app.get('/auth/callback', (req, res) => {
    console.log("callback")
    var code = req.query.code;

    var authOptions = {
        url:'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: "http://localhost:5000/auth/callback",
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body){
        if(!error && response.statusCode === 200){
            access_token = body.access_token;
            res.redirect('http://localhost:3000')
        }
    });
});

app.get('/auth/token', (req, res) => {
    console.log('fetch token')
    res.json({access_token: access_token})
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})