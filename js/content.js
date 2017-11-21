/** -----------------------------------------------------------------------------------
 * Listen popup.js
 */
window.onload = function () {
    chrome.storage.sync.get('onLoadCheckBox', function (obj) {
        if (obj.onLoadCheckBox) {
            let level;
            let langFrom;
            let langTo;
            chrome.storage.sync.get('rangeInput', function (obj) {
                obj.rangeInput ? level = obj.rangeInput : level = 0;
                chrome.storage.sync.get('langFrom', function (obj) {
                    obj.langFrom ? langFrom = obj.langFrom : 'eng';
                    chrome.storage.sync.get('langTo', function (obj) {
                        obj.langTo ? langTo = obj.langTo : 'eng';
                        translateThis(level, langFrom, langTo);
                    });
                });
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        msgObj => {
            let params = JSON.parse(msgObj);
            translateThis(params.level, params.langFrom, params.langTo);
        });
};

/** -----------------------------------------------------------------------------------
 * Ask AvacServlet.java translated word for current page
 * @param level
 * @param langFrom
 * @param langTo
 **/
function translateThis(level, langFrom, langTo) {
    if (document.getElementsByClassName("wordAvac")) {
        removeElementsByClass("wordAvac")
    }
    let p = document.getElementsByTagName("p");
    for (let i = 0; i < p.length; i++) {
        p[i].innerHTML = p[i].textContent.replace(/(\w+)/gi, `<span class="AVAC">$1</span>`);
    }
    let allWords = document.getElementsByClassName('AVAC');

    let word;
    let rank;
    for (w of allWords) {
        word = w.innerText.trim().toLocaleLowerCase();
        rank = en_arr.indexOf(word);
        if (-1 !== rank && level ** 2.3 < rank ) {
            addSpeakerOnClick(w);
            w.innerHTML += '<span class="wordAvac"> [' + ru_arr[en_arr.indexOf(word)] + ']</span>';
        }
    }
}




