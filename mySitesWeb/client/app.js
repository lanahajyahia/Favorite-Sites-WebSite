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