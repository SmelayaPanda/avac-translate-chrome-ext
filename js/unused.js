/**
 * Created by panda on 03.09.2017.
 */

// Not used now
const url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
    keyAPI = "trnsl.1.1.20130922T110455Z.4a9208e68c61a760.f819c1db302ba637c2bea1befa4db9f784e9fbb8";

function yandexTranslate() {

    let xhr = new XMLHttpRequest(),
        //textAPI = document.querySelector('#source').value,
        textAPI = "Hello",
        //langAPI = document.querySelector('#lang').value;
        langAPI = "ru";

    //noinspection JSUndeclaredVariable
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
