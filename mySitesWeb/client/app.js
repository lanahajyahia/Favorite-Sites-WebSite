const axios = require('axios');
const promise = require('promise');

// get sites
window.getSites = function getSites() {
        // create a promise for the axios request
        let url = 'http://localhost:3000/sites';
        const promise = axios.get(url)
            // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response.data)
        return dataPromise;
    }
    // now we can use that data from the outside!

window.getOneSite = async function getOneSite(siteId) {
    // Optionally the request above could also be done as

    let url = 'http://localhost:3000/sites/' + siteId;
    const promise = axios.get(url)
        // using .then, create a new promise which extracts the data
    const dataPromise = promise.then((response) => response.data)
    return dataPromise

}

window.deleteSite = async function deleteSite(siteId) {
    // Optionally the request above could also be done as
    console.log("deleteSite siteId " + siteId);
    let url = 'http://localhost:3000/sites/' + siteId;
    axios.delete(url, {})
        .then(function(response) {
            console.log("deleteSite response ");
            console.log(response);

        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

window.createSite = async function createSite(data) {
    axios.post('http://localhost:3000/sites', {
            cityName: data.cityName,
            siteName: data.siteName,
            desc: data.desc,
            images: data.images
        })
        .then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
}