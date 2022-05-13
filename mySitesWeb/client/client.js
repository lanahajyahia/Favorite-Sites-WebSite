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
    document.getElementById("myTopNav").innerHTML = '';
    for (let i = 0; i < sitesArr.length; i++) {
        let site = sitesArr[i];
        let siteName = site.cityName;

        // create div buttons container
        var containerDiv = document.createElement("div");
        containerDiv.setAttribute("id", site._id);

        // create buttons
        createRemoveSiteBtn(site, containerDiv);
        createSiteBtn(site, siteName, containerDiv, i);

        myTopNav.appendChild(containerDiv);
    }
    setDataIFrame(sitesArr[0]);

}

function createRemoveSiteBtn(site, containerDiv) {
    var xBtn = document.createElement("input");
    xBtn.setAttribute("type", "button");
    xBtn.setAttribute("value", 'x');
    xBtn.setAttribute("name", 'x');
    xBtn.setAttribute("title", 'remove site');
    xBtn.classList.add("removeSite"); // "fa", "fa-remove")
    // xBtn.setAttribute("class", "removeSite");
    xBtn.style.display = 'none';
    xBtn.onclick = function() { deleteClickedSite(site._id) };

    containerDiv.appendChild(xBtn);

}

function createSiteBtn(site, siteName, containerDiv, index) {
    var btn = document.createElement("input");
    //Assign different attributes to the element. 
    btn.setAttribute("type", "button");
    btn.setAttribute("value", siteName);
    btn.setAttribute("name", siteName);
    if (index == 0) {
        btn.classList.add("siteNameButton", "selected");
    } else {
        btn.classList.add("siteNameButton");
    }
    btn.onclick = function() {
        let element = document.querySelector('.selected');
        if (element) {
            element.classList.toggle("selected");
        }
        btn.classList.toggle("selected");
        getClickedSite(site._id);
    };

    containerDiv.appendChild(btn);

}

function getClickedSite(siteId) {
    getOneSite(siteId).then(data => {
            setDataIFrame(data);
        })
        .catch(err => console.log(err));
}

function setDataIFrame(data) {
    if (data) {
        setSiteCityName(data.cityName);
        setSiteName(data.siteName);
        setSiteArticle(data.desc);
        setSiteImages(data.images);
    } else {
        setSiteCityName('');
        setSiteName(
            "YOU DON'T HAVE ANY SITES<br> click the Add site button"
        );
        setSiteArticle('');
        setSiteImages([]);
    }


}

function setSiteCityName(siteCityName) {}

function setSiteImages(siteImages) {
    let iframe = document.getElementById('siteIframe');
    iframe.contentWindow.document.getElementById('imagesSite').innerHTML = '';
    for (let i = 0; i < siteImages.length; i++) {
        console.log(siteImages[i]);
        let img = document.createElement('img');
        img.src = siteImages[i];
        // let w = 100 / siteImages.length;
        // img.style.width = w + "%";
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
    let firstChild = document.getElementById("myTopNav").firstChild;
    if (firstChild) {
        let id = firstChild.id;
        firstChild.children[1].classList.add("selected")
            // get id and reload iframe of first child""
        getClickedSite(id);
    } else {
        setDataIFrame('');
    }


}

function showXBtn() {
    $('.removeSite').toggle();
}

/* new site */
function saveNewSite() {
    let reqFlag = false;
    let imagesArr = [];
    let images = document.getElementsByName("image")[0].files;

    for (let i = 0; i < images.length; i++) {
        imagesArr.push(images[i].name);
    }
    let siteName = document.getElementsByName("siteName")[0].value;
    let citySiteName = document.getElementsByName("citySiteName")[0].value;
    let siteDesc = document.getElementsByName("siteDesc")[0].value;

    if (!siteName) {
        $('#siteNameReq').css('display', 'block')
        reqFlag = true;
    }
    if (!citySiteName) {
        $('#citySiteNameReq').css('display', 'block')
        reqFlag = true;

    }
    if (!siteDesc) {
        $('#siteDescReq').css('display', 'block')
        reqFlag = true;

    }
    if (!reqFlag) {
        document.getElementById('addSite').style.display = 'none';
        var siteJson = {
            "cityName": citySiteName,
            "siteName": siteName,
            "desc": siteDesc,
            "images": imagesArr
        };
        createSite(siteJson);
        window.location.reload();
    }
    // loadSites();
    console.log(siteName);
    console.log(citySiteName);
    console.log(siteDesc);
    console.log(imagesArr);


}