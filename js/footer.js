/** --------------------------------------------------------------------------
 * Create DOM element - closeFooter and inject on page
 **/
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
    document.body.style.marginBottom = '10em';
    closeFooter.style.height = '2.5em'
}
/** --------------------------------------------------------------------------
 * Create DOM element - footer and inject on page
 **/
function createFooterAvac() {
    let footer = document.createElement('footer');
    footer.id = 'footerAvac';
    footer.innerHTML =
        `<div>
            <div id="translatedWordAvac">
                <button id="playWordBtnAvac" type="button" onclick="audioAvac.play()">
                    <strong id="playWordAvac">Your word is here!</strong></button>
            </div>
            <div id="synonymsAvac"> Synonyms
                <li id="avacSynonyms_1">example one</li>
                <li id="avacSynonyms_2">example two</li>
                <li id="avacSynonyms_3">example three</li>
            </div>
            <div id="sentenceExampleAvac">
                Fool sentence with max priority! And bla and np bla, just relax, sentence is to large, and and and it'not all,
                for test, stop, yes
                Oh no, more more, words casha =) and hello world example
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


