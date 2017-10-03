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
                        avacPost(level, langFrom, langTo);
                    });
                });
            });
        }
    });

    chrome.runtime.onMessage.addListener(
        msgObj => {
            let params = JSON.parse(msgObj);
            avacPost(params.level, params.langFrom, params.langTo);
        });
};

/** -----------------------------------------------------------------------------------
 * Ask AvacServlet.java translated word for current page
 * @param level
 * @param langFrom
 * @param langTo
 **/
function avacPost(level, langFrom, langTo) {

    optionDiv();
    createFullFooter();


    document.body.style.marginBottom = '144px';
    const url = "https://panda.jelastic.regruhosting.ru/avac/";
    const req = new XMLHttpRequest();
    const params =
        "goto=" + encodeURIComponent(document.URL) + "&" +
        "level=" + level + "&" +
        "langFrom=" + langFrom + "&" +
        "langTo=" + langTo;
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        let myDictionary;
        if (this.readyState === 4 && this.status === 200) {
            myDictionary = JSON.parse(this.responseText);
            if (document.readyState === 'complete') {
                translateText(level, langFrom, langTo, myDictionary);
            }
        }
    };
    req.send(params);
}

/** -----------------------------------------------------------------------------------
 * Translate text
 * @param level
 * @param langFrom
 * @param langTo
 * @param myDictionary
 **/
function translateText(level, langFrom, langTo, myDictionary) {
    if (document.getElementsByClassName("wordAvac")) {
        removeElementsByClass("wordAvac")
    }
    let words;
    let text;
    let paragraphs = document.getElementsByTagName("p");
    for (let i = 0; i < paragraphs.length; i++) {
        text = paragraphs[i].textContent;
        text = text
            .replace(text.charAt(0), ' ' + text.charAt(0)) // Begin of the paragraph
            .replace(text.charAt(text.length - 1), text.charAt(text.length - 1) + ' ')
            .replace(/\./g, ' .')
            .replace(/,/g, ' ,')
            .replace(/:/g, ' :')
            .replace(/;/g, ' ;')
            .replace(/!/g, ' !')
            .replace(/\?/g, ' ?')
            .replace(/\(/g, ' (')
            .replace(/\)/g, ' )')
            .replace(/\s+/g, '  ');

        words = text
            .replace(/[.,!;:?()]/g, " ")
            .replace(/\s+/g, ' ')
            .split(' ');

        for (let w in words) {
            text = text.replace(' ' + words[w] + ' ',
                `<span class="mainWordAvac ___${words[w].toLowerCase()}"> ${words[w]}</span> `);
        }
        paragraphs[i].innerHTML = text + "\n";
    }
    let avacWords = document.querySelectorAll('[class*=___]');

    writeTranslatedWordsOnPage(myDictionary);
    replaceSpeakBtnContent(avacWords);
    fillUpCloseFooterContent(langFrom, langTo, level, Object.keys(myDictionary).length);
}

/** -----------------------------------------------------------------------------------
 * Write translated words near of the target words
 * @param myDictionary
 **/
function writeTranslatedWordsOnPage(myDictionary) {
    let classWords;
    for (let key in myDictionary) {
        classWords = document.getElementsByClassName("___" + key);
        for (let cw in classWords) {
            classWords[cw].innerHTML =
                `${classWords[cw].innerText} <span class='wordAvac'>[&nbsp${myDictionary[key]}&nbsp]</span>`;
        }
    }
}

/** -----------------------------------------------------------------------------------
 * Fill up text content of the close footer
 * @param langFrom
 * @param langTo
 * @param level
 * @param dictLength
 **/
function fillUpCloseFooterContent(langFrom, langTo, level, dictLength) {
    let text =
        langFrom.toUpperCase() + " to " +
        langTo.toUpperCase() +
        "   Level: " + level +
        " . Translated words: " + dictLength;
    let i = 0;
    let speed = 40;
    document.getElementById("close_div").innerHTML = "";

    function typeWriter() {
        if (i < text.length) {
            document.getElementById("close_div").innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
}

/** -----------------------------------------------------------------------------------
 * Change text in play sound button
 * @param avacWords - all words with class avacWord
 **/
function replaceSpeakBtnContent(avacWords) {

    let playWordBtn = document.getElementById('speak_word_button');
    let playWordBtnContent = document.getElementById('speak_word_button');
    for (let av in avacWords) {
        avacWords[av].onclick = function () {
            playWordBtnContent.innerText =
                avacWords[av].textContent
                    .substring(0, avacWords[av].textContent.indexOf('[') - 1).toLowerCase().trim();

            let word = playWordBtnContent.innerText;
            speakWord(word, 'en-GB', 0.8, 0.8, 1, 'native');

            playWordBtn.onclick = function () {
                speakWord(word, 'en-GB', 0.8, 0.8, 1, 'native');
            }
        }
    }
}

