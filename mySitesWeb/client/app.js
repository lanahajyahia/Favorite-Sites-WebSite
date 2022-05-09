const axios = require('axios');
console.log("hjv");

// fetch('http://localhost:3000/sites')
//     .then(res => res.json())
//     .then(data => console.log(data))

getSites();
async function getSites() {

    axios.get('http://localhost:3000/sites', {
            // console.log("hi");
        })
        .then(function(response) {
            createNavigationBar(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

function createNavigationBar(citiesArr) {
    var myTopnav = document.getElementById("myTopnav");
    for (let i = 0; i < citiesArr.length; i++) {
        let city = citiesArr[i].cityName;
        console.log(citiesArr[i].cityName);

        let a = document.createElement('a');
        var linkText = document.createTextNode(city);
        a.appendChild(linkText);
        a.title = "" + city;
        a.href = city + '.html';
        myTopnav.appendChild(a);
    }
}