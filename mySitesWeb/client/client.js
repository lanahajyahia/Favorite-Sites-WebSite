if (window.location.href == 'http://127.0.0.1:5500/mySitesWeb/client/index.html')
    loadSites()

function loadSites() {
    getSites().then(data => {
            createNavigationBar(data)
        })
        .catch(err => console.log(err))
}

function createNavigationBar(sitesArr) {
    var myTopNav = document.getElementById("myTopNav");
    for (let i = 0; i < sitesArr.length; i++) {


        let site = sitesArr[i];
        let siteName = site.cityName;

        console.log("siteName " + siteName);
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", site._id);
        var btn = document.createElement("input");
        //Assign different attributes to the element. 
        btn.setAttribute("type", "button");
        btn.setAttribute("value", siteName);
        btn.setAttribute("name", siteName);
        // btn.setAttribute("id", site._id);
        btn.onclick = function() { getClickedSite(site._id) };

        var xBtn = document.createElement("input");
        //Assign different attributes to the element. 
        xBtn.setAttribute("type", "button");
        xBtn.setAttribute("value", 'x');
        xBtn.setAttribute("name", 'x');
        xBtn.setAttribute("class", "removeSite");
        xBtn.style.display = 'none';
        xBtn.onclick = function() { deleteClickedSite(site._id) };

        containerDiv.appendChild(xBtn);
        containerDiv.appendChild(btn);

        myTopNav.appendChild(containerDiv);
    }
}

async function getClickedSite(siteId) {
    getOneSite(siteId).then(data => {
            // response.json({ message: 'Request received!', data })
            console.log(data)
        })
        .catch(err => console.log(err));
}

async function deleteClickedSite(siteId) {
    deleteSite(siteId);
    document.getElementById(siteId).remove();
}

function showXBtn() {
    $('.removeSite').toggle();
    // document.getElementsByClassName('removeSite').style.display = 'block';
}