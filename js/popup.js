window.onload = function () {
    /** ------------
     * HTML elements
     */
    let langFromBox = document.getElementById('langFrom');
    let langToBox = document.getElementById('langTo');
    let rangeInput = document.getElementById('avacLevel');
    let displayedLevel = document.getElementById("rangeValue");
    let translate_btn = document.getElementById("translate_btn");
    let onLoadCheckBox = document.getElementById("safeTranslateMode");

    /** ---------------------------
     * Setting Chrome storage value
     */
    langFromBox.onchange = function () {
        chrome.storage.sync.set({'langFrom': langFromBox.value});
    };
    langToBox.onchange = function () {
        chrome.storage.sync.set({'langTo': langToBox.value});
    };
    rangeInput.onchange = function () {
        chrome.storage.sync.set({'rangeInput': rangeInput.value});
        chrome.storage.sync.set({'displayedLevel': displayedLevel.innerText});
    };
    onLoadCheckBox.onchange = function () {
        if (onLoadCheckBox.checked) {
            chrome.storage.sync.set({'onLoadCheckBox': true});
        }
        else {
            chrome.storage.sync.set({'onLoadCheckBox': false});
        }
    };
    /** ---------------------------
     * Getting Chrome storage value
     */
    chrome.storage.sync.get('langFrom', function (obj) {
        langFromBox.value = obj.langFrom ? obj.langFrom : 'eng';
    });
    chrome.storage.sync.get('langTo', function (obj) {
        langToBox.value = obj.langTo ? obj.langTo : 'eng';
    });
    chrome.storage.sync.get('rangeInput', function (obj) {
        rangeInput.value = obj.rangeInput ? obj.rangeInput : 0;
    });
    chrome.storage.sync.get('displayedLevel', function (obj) {
        displayedLevel.innerText = obj.displayedLevel ? obj.displayedLevel : 'WELCOME TO AVAC! ';
    });
    chrome.storage.sync.get('onLoadCheckBox', function (obj) {
        if (obj.onLoadCheckBox) {
            onLoadCheckBox.checked = true;
        }
    });
    /** ---------------------------------------------------- */
    rangeInput.addEventListener('input', function () {
        if (this.value < 20 && displayedLevel.innerHTML !== "Beginner") {
            fadeTextReplace(displayedLevel, "Beginner");
        }
        else if (this.value >= 20 && this.value < 40 && displayedLevel.innerHTML !== "Pre intermediate") {
            fadeTextReplace(displayedLevel, "Pre intermediate");
        }
        else if (this.value >= 40 && this.value < 60 && displayedLevel.innerHTML !== "Intermediate") {
            fadeTextReplace(displayedLevel, "Intermediate");
        }
        else if (this.value >= 60 && this.value < 80 && displayedLevel.innerHTML !== "Upper intermediate") {
            fadeTextReplace(displayedLevel, "Upper intermediate");
        }
        else if (this.value >= 80 && displayedLevel.innerHTML !== "Advanced") {
            fadeTextReplace(displayedLevel, "Advanced");
        }

    });
    /** ---------------------------
     * Sending message to content.js
     */
    rangeInput.addEventListener('input', function () {
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
        }, function (tabs) {
            // and use that tab to fill in out title and url
            let obj = {};
            obj.level = rangeInput.value;
            obj.langFrom = langFromBox.value;
            obj.langTo = langToBox.value;
            chrome.tabs.sendMessage(tabs[0].id, JSON.stringify(obj));
        });
    });
};
