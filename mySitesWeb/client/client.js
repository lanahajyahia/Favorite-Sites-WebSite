window.onload = () => {
    if (window.location.href == 'http://127.0.0.1:5500/mySitesWeb/client/index.html')
        loadSites()
}

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

        // create div buttons container
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", site._id);

        // create buttons
        createRemoveSiteBtn(site, containerDiv);
        createSiteBtn(site, siteName, containerDiv);

        myTopNav.appendChild(containerDiv);
    }
    setDataIFrame(sitesArr[0]);

}

function createRemoveSiteBtn(site, containerDiv) {
    var xBtn = document.createElement("input");
    xBtn.setAttribute("type", "button");
    xBtn.setAttribute("value", 'x');
    xBtn.setAttribute("name", 'x');
    xBtn.setAttribute("class", "removeSite");
    xBtn.style.display = 'none';
    xBtn.onclick = function() { deleteClickedSite(site._id) };

    containerDiv.appendChild(xBtn);

}

function createSiteBtn(site, siteName, containerDiv) {
    var btn = document.createElement("input");
    //Assign different attributes to the element. 
    btn.setAttribute("type", "button");
    btn.setAttribute("value", siteName);
    btn.setAttribute("name", siteName);
    btn.onclick = function() { getClickedSite(site._id) };

    containerDiv.appendChild(btn);

}

function getClickedSite(siteId) {
    getOneSite(siteId).then(data => {
            setDataIFrame(data);
        })
        .catch(err => console.log(err));
}

function setDataIFrame(data) {
    setSiteCityName(data.cityName);
    setSiteName(data.siteName);
    setSiteArticle(data.desc);
    setSiteImages(data.images);

}

function setSiteCityName(siteCityName) {}

function setSiteImages(siteImages) {
    let iframe = document.getElementById('siteIframe');
    iframe.contentWindow.document.getElementById('imagesSite').innerHTML = '';
    for (let i = 0; i < siteImages.length; i++) {
        console.log(siteImages[i]);
        let img = document.createElement('img');
        img.src = siteImages[i];
        let w = 100 / siteImages.length;
        img.style.width = w + "%";
        img.style.height = "300px";
        img.style.padding = "1em";

        iframe.contentWindow.document.getElementById('imagesSite').appendChild(img);
    }
}

function setSiteName(siteName) {
    let iframe = document.getElementById('siteIframe');
    let element = iframe.contentWindow.document.getElementById("headerSite");
    element.innerHTML = siteName;
}

function setSiteArticle(siteDesc) {
    let iframe = document.getElementById('siteIframe');
    let element = iframe.contentWindow.document.getElementById("articleSite");
    element.innerHTML = siteDesc;
}

function deleteClickedSite(siteId) {
    deleteSite(siteId);
    document.getElementById(siteId).remove();

    // get id of current first child
    let id =
        document.getElementById("myTopNav").firstChild.id;
    // get id and reload iframe of first child
    getClickedSite(id);

}

function showXBtn() {
    $('.removeSite').toggle();
}