const axios = require('axios');
const https = require('https');
const jwt = require('jsonwebtoken');
const fs = require('fs');

var ClientId = "D8r0UPM~f_XAqS21hNG5wOJAk1ivtQkA7rDLqYVu";
var ClientSecret = "wbnntAVtxAoFzxzRrcHP4g~ZlAq2zxtrfZAQOM0LqK1Ku_bGbh0dW6~T8uyE21tXLfW_i4WJlhq0Zj1eiM1gz_qW0QX4cDNksMNk";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

var token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJrYXJ0b2ZmZWwiLCJzdWIiOiI1ZDhjNzk0YmIxNWNhMDZjYmZiMWFmMzYiLCJzY29wZSI6W10sImNsaWVudElkIjoiRDhyMFVQTX5mX1hBcVMyMWhORzV3T0pBazFpdnRRa0E3ckRMcVlWdSIsImlhdCI6MTU3MDM1ODc4OCwiZXhwIjoxNTcwMzU4OTY4LCJpc3MiOiJodHRwczovLzUxLjE0NC4xNzguMTIxIn0.Edsc4-DqXqS1YHliuEjcpo9nyTsJHh2QkI8RH5t7cY7MxoeFDXeHtEV-ALOtuRjWvXp_osMDI85SkWe7diwbHW9luQSLVRwzJnORyHBdLtSUf5zojTsZEcZ2IEUZsPRXPfeTvvIwx-0FbWgHq5tw2TUZDcNS_Te4IjpmGw0nTthGYBPBjqinNW9sCdSFrJEY3-d7XWfYO9Xy6n9lNpGLBMbBy0pvIdsLb-qqP37zgaMOApuQYq8Yfl1l8VUQvmrlqhpaoarc3-lwqBih38PPhHePsWvXBYEMWuG_Vqv5FxhNvPG5zrHcj6TGse2CI_XgZWT-RRVQ6NHtXJjZ5eS8tg";

// console.log(Buffer.from(ClientId + ":" + ClientSecret).toString('base64'));
module.exports = function() {

    async function test() {
        try {
            
            const publicKeyUrl = 'https://51.144.178.121:1337/.well-known/publickey.pem';
            const certificateUrl = 'https://51.144.178.121:1337/.well-known/certificate.pem';


            const res = await axios.post(
                'https://51.144.178.121:1337/oauth2/token',
                { "grant_type": 'client_credentials', "audience": 'kartoffel' },
                { headers: 
                    { 
                        Authorization: "Basic " + Buffer.from(ClientId + ":" + ClientSecret).toString('base64'),
                        'Content-Type': 'application/json'
                    }
                },
            );    
            console.log(res.data);
            token = res.data.access_token;
            // validation();
            // test2();
        } catch(err) {
            console.log('Error: ');
            console.log(err);
        }
    }

    async function test2() {
        console.log("test2");
        try {
            const res = await axios.post(
                'https://51.144.178.121:1337/oauth2/token',
                { "grant_type": 'client_credentials', "audience": 'kartoffel' },
                { headers: 
                    { 
                        Authorization: token,
                        'Content-Type': 'application/json'
                    }
                },
            );    
            console.log("Access: ");
            console.log(res.data);
            // token = res.data.access_token;
            // validation();
        } catch(err) {
            console.log('Error: ');
            console.log(err);
        }
    }

    function validation() {
        try {
            var cert = fs.readFileSync('./publickey.pem');  // get public key
            var decoded = jwt.verify(token, cert);
            // console.log(decoded);
            // test2();
        } catch (error) {
            // console.log(error);
            if(error.name === "TokenExpiredError") {
                test();
            }
        }
    }

    // validation();
    // test();

    validation();
    setInterval(() => {
        validation();
    }, 60000);

}

