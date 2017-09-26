function createCloseFooterAvac() {
    let closeFooter = document.createElement('footer');
    closeFooter.id = 'closeFooterAvac';
    closeFooter.innerHTML = "";
    document.body.appendChild(closeFooter);

    let footerAvac = document.getElementById("footerAvac");
    let closeFooterAvac = document.getElementById('closeFooterAvac');
    document.getElementById('closeFooterAvac').onclick = function () {
        if (footerAvac.style.display === 'none') {
            fadeInElement(footerAvac, closeFooterAvac);
        }
        else {
            fadeOutElement(footerAvac, closeFooterAvac);
        }
    };
    document.body.style.marginBottom = '134px';
}
/** ------------------------------------------------------------------ */
function createFooterAvac() {
    let footer = document.createElement('footer');
    footer.id = 'footerAvac';
    footer.innerHTML =
        `<div>
            <div id="translatedWordAvac">
                <audio id="audioAvac"
                <source src="http://s3.amazonaws.com/audio.vocabulary.com/1.0/us/0/1UXRDYLWQWCBT.mp3"
                        type='audio/mp3'>
                Your user agent does not support the HTML5 Audio element.
                </audio>
                <button id="playWordBtnAvac" type="button" onclick="audioAvac.play()">
                    <strong id="playWordAvac">Yours word is here!</strong></button>
            </div>
            <div id="synonymsAvac"> Synonyms
                <li id="avacSynonyms_1">example one</li>
                <li id="avacSynonyms_2">example two</li>
                <li id="avacSynonyms_3">example three</li>
            </div>
            <div id="sentenceExampleAvac">
                Fool sentence with max priority!
            </div>
        </div>`;
    document.body.appendChild(footer);
}
/** --------------------------------------------------------------------------
 * Fade in and Out for content footer
 * @param footer
 * @param closeFooter
 **/
function fadeOutElement(footer, closeFooter) {
    footer.classList.add('hide');
    setTimeout(function () {
        closeFooter.style.borderTop = 'solid gray 1px';
        footer.style.display = 'none';
    }, 300);
}

function fadeInElement(footer, closeFooter) {
    footer.style.display = 'block';
    setTimeout(function () {
        closeFooter.style.borderTop = 'solid white 1px';
        footer.classList.remove('hide');
    }, 200);
}

/** --------------------------------------------------------------------------
 * Get Audio src from server for sound button
 * @param langFrom
 * @param word
 **/
function getAvacAudio(langFrom, word) {
    const params = "langFrom=" + langFrom + "&" + "word=" + word;
    const url = "https://panda.jelastic.regruhosting.ru/avac/";
    const req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        let audioLink;
        if (this.readyState === 4 && this.status === 200) {
            audioLink = this.responseText;
            console.log( audioLink );
            if (document.readyState === 'complete') {
                let srcAudio = document.getElementById('audioAvac');
                srcAudio.src = audioLink;
            }
        }
    };
    req.send(params);
}
