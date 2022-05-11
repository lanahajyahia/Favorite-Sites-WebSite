function getNavigationBar(citiesArr) {
    var myTopNav = document.getElementById("myTopNav");
    for (let i = 0; i < citiesArr.length; i++) {
        let city = citiesArr[i].cityName;
        console.log(citiesArr[i].cityName);

        let a = document.createElement('a');
        var linkText = document.createTextNode(city);
        a.appendChild(linkText);
        a.id = "" + citiesArr[i]._id;
        a.title = "" + city;
        // a.onclick = console.log(a.id);
        a.href = 'site.html';
        myTopNav.appendChild(a);
    }
}