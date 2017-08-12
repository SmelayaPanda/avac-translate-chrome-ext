window.onload = function () {
    var http = new XMLHttpRequest();
    var url = "http://localhost:8080/avac";
    var text = document.body.textContent;
    var params = "text=" + text;
    http.open("GET", url);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText);
        }
    };
    http.send();
};
