// import 'regenerator-runtime/runtime';
// import axios from 'axios';

// define(['axios'], function($) {
// return function() {};


const axios = require('axios');
getSites();
async function getSites() {

    axios.get('http://localhost:3000/sites', {
            // console.log("hi");
        })
        .then(function(response) {
            let city = response.data[0].cityName;
            console.log(response.data[0].cityName);
            // $("#myTopnav").append('<a href="' + city + '.html">' + city + '</a>')
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}
// import fetch from "node-fetch";

// fetch('http://localhost:3000/sites', {
//         method: 'GET', // or 'PUT'
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log('Success:', data);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });