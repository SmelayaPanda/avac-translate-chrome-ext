window.onload = function () {
    var http = new XMLHttpRequest();
    var url = "Translator";
    var text = document.body.textContent;
    var params = "text=" + text;
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.onreadystatechange = function () {
        if (http.readyState === 4 && http.status === 200) {
            alert(http.responseText);
        }
    };
    http.send(params);
};
