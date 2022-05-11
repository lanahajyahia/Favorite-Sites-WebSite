const axios = require('axios');

var selectedSiteJson;
if (window.location.href == 'http://127.0.0.1:5500/mySitesWeb/client/index.html')
    getSites();
async function getSites() {

    axios.get('http://localhost:3000/sites', {
            // console.log("hi");
        })
        .then(function(response) {
            getNavigationBar(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}


async function getOneSite(siteId) {

    axios.get('http://localhost:3000/sites', {
            params: { _id: siteId }

        })
        .then(function(response) {
            console.log("from here", response);
            console.log("hi");
            // getNavigationBar(response.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}
// getOneSite("6268566a12e14e1e97741581")

function getClickedSite(siteId) {
    // alert(siteId)
    getOneSite(siteId)
        // getOneSite("6268566a12e14e1e97741581")

}

function getNavigationBar(citiesArr) {
    var myTopNav = document.getElementById("myTopNav");
    for (let i = 0; i < citiesArr.length; i++) {
        let city = citiesArr[i].cityName;
        console.log(citiesArr[i].cityName);
        var element = document.createElement("input");
        //Assign different attributes to the element. 
        element.setAttribute("type", "button");
        element.setAttribute("value", city);
        element.setAttribute("name", city);
        element.onclick = function() { getClickedSite(this.id) };

        myTopNav.appendChild(element);

        // let a = document.createElement('a');
        // var linkText = document.createTextNode(city);
        // a.appendChild(linkText);
        // a.id = "" + citiesArr[i]._id;
        // a.title = "" + city;
        // a.onclick = function() { getClickedSite(this.id) };
        // a.href = 'site.html';
        // myTopNav.appendChild(a);
    }
}