const axios = require('axios');
const promise = require('promise');

// get sites
window.getSites = function getSites() {
        // create a promise for the axios request
        let url
        const promise = axios.get('http://localhost:3000/sites')

        // using .then, create a new promise which extracts the data
        const dataPromise = promise.then((response) => response.data)

        // return it
        return dataPromise
    }
    // now we can use that data from the outside!

// window.getSites = async function getSites() {

//     axios.get('http://localhost:3000/sites', {})
//         .then(function(response) {
//             return response.data;
//         })
//         .catch(function(error) {
//             console.log(error);
//         })
//         .then(function() {
//             // always executed

//         });
// }


window.getOneSite = async function getOneSite(siteId) {
    // Optionally the request above could also be done as
    console.log("getOneSite siteId " + siteId);
    let url = 'http://localhost:3000/sites/' + siteId;
    axios.get(url, {})
        .then(function(response) {
            console.log("getOneSite response ");
            console.log(response);


        })
        .catch(function(error) {
            console.log(error);
        })
        .then(function() {
            // always executed
        });
}

window.deleteSite = function deleteSite(siteId) {
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
    // getOneSite("6268566a12e14e1e97741581")

// async function getClickedSite(siteId) {
//     getOneSite(siteId);
// }

// async function deleteClickedSite(siteId) {
//     deleteSite(siteId);
//     document.getElementById(siteId).remove();
//     // getSites();
// }