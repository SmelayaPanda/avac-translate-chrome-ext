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

function translateThis(level, langFrom, langTo) {
    if (0 !== document.getElementsByClassName("wordAvac").length) {
        applyLevel(level);
        // removeElementsByClass("wordAvac");
    } else {
        let p = document.getElementsByTagName("p");
        for (let i = 0; i < p.length; i++) {
            p[i].innerHTML = p[i].textContent.replace(/(\w+)/gi, `<span class="AVAC">$1</span>`);
        }
        let allWords = document.getElementsByClassName('AVAC');

        let word;
        let rank;
        for (w of allWords) {
            word = w.innerText.trim().toLocaleLowerCase();
            rank = eng_rus_1.indexOf(word);
            if (-1 !== rank) {
                addSpeakerOnClick(w);
                w.innerHTML += `<span style="display: none;" class="wordAvac ___${eng_rus_1.indexOf(word)}"> [${eng_rus_2[eng_rus_1.indexOf(word)]}]</span>`;
            }
        }
        applyLevel(level);
    }
}

function applyLevel(level) {
    for (let w of document.querySelectorAll('[class*=___]')) {
        w.style.display = 'inline';
    }
    let maxRank = level ** 2.3;
    for (let i = 0; i < maxRank; i++) {
        for (w of document.getElementsByClassName('___' + i)) {
            w.style.display = 'none';
        }
    }
}



