// -------------------------------------------------------------------------
const url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
    keyAPI = "trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";
// -------------------------------------------------------------------------
// Listen popup.js
window.onload = function () {
    chrome.runtime.onMessage.addListener(msgObj => {

        var parts = msgObj.split(" ");
        if (parts[0] === "btn_1") {
            avacPost("24000", parts[1], parts[2]);
        }
        if (parts[0] === "btn_2") {
            avacPost("6700", parts[1], parts[2]);
        }
        if (parts[0] === "btn_3") {
            avacPost("1800", parts[1], parts[2]);
        }
        if (parts[0] === "btn_4") {
            avacPost("700", parts[1], parts[2]);
        }
        if (parts[0] === "btn_5") {
            avacPost("67", parts[1], parts[2]);
        }
    });
};

// -------------------------------------------------------------------------
function avacPost(level, langFrom, langTo) {

    const url = "http://localhost:8080/avac";
    const req = new XMLHttpRequest();
    const params =
        "goto=" + document.URL + "&" +
        "level=" + level + "&" +
        "langFrom=" + langFrom + "&" +
        "langTo=" + langTo;

    console.log(params);
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            myDictionary = JSON.parse(this.responseText);
            translateText.call(this);
        }
    };
    req.send(params);
};

// -------------------------------------------------------------------------
function translateText() {
    console.log("Start");

    let paragraphs = document.getElementsByTagName("p");

    for (let i = 0; i < paragraphs.length; i++) {
        let text = paragraphs[i].textContent;

        for (let key in myDictionary) {
            if (myDictionary.hasOwnProperty(key)) {
                text = text.replace(" " + key + " ",
                    ` ${key} [ <span style="color: green">
                                  <i>${myDictionary[key]}</i>
                              </span>
                             ] `);
            }
        }

        paragraphs[i].innerHTML = text;
    }
    console.log("Complete");
}
// -------------------------------------------------------------------------
function yandexTranslate() {

    let xhr = new XMLHttpRequest(),
        //textAPI = document.querySelector('#source').value,
        textAPI = "Hello",
        //langAPI = document.querySelector('#lang').value;
        langAPI = "ru";

    data = "key=" + keyAPI + "&text=" + textAPI + "&lang=" + langAPI;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(data);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            let res = this.responseText;
            let json = JSON.parse(res);
            if (json.code === 200) {

                return json.text[0];
                //document.querySelector('#output').innerHTML = json.text[0];
            }
            else {

                console.log("Error code:" + json.code);
                //document.querySelector('#output').innerHTML = "Error Code: " + json.code;
            }
        }
    }
}
// -------------------------------------------------------------------------
