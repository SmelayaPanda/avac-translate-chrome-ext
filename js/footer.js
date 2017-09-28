/** --------------------------------------------------------------------------
 * Create DOM element - closeFooter and inject on page
 **/
function createCloseFooterAvac() {
    let closeFooter = document.createElement('footer');
    closeFooter.id = 'closeFooterAvac';
    closeFooter.innerHTML = "";
    closeFooter.style.opacity = '0';
    fadeInElement(closeFooter, 0);
    document.body.appendChild(closeFooter);

    let footerAvac = document.getElementById("footerAvac");
    let closeFooterAvac = document.getElementById('closeFooterAvac');
    closeFooterAvac.onclick = function () {
        if (footerAvac.style.opacity === '0') {
            fadeInElement(footerAvac, 0);
            closeFooterAvac.style.borderTop = 'solid white 1px';
            document.body.style.marginBottom = '10em';
        }
        else {

            fadeOutElement(footerAvac, 0);
            closeFooterAvac.style.borderTop = 'solid gray 1px';
            document.body.style.marginBottom = '2.5em'
        }
    };
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
    <div id="emptyBlockAvac">
    </div>
    <div id="translatedWordAvac">
        <button id="playWordBtnAvac" type="button">
            <strong id="playWordAvac">Your word is here!</strong></button>
    </div>
    <div id="synonymsAvac"><span style="color: grey"> Synonyms </span>
        <li class="synonymsAvac" id="avacSynonyms_1">yes one</li>
        <li class="synonymsAvac" id="avacSynonyms_2">may be two</li>
        <li class="synonymsAvac" id="avacSynonyms_3">and three</li>
    </div>
    <div id="sentenceExampleAvac">
        Fool sentence with max priority! And bla and np bla, just relax, sentence is to large, and and and it'not all,
        for test, stop, yes
        Oh no, more more, words casha =) and hello world example
    </div>
</div>`;
    createSideNavAvac();
    footer.style.opacity = '0';
    fadeInElement(footer, 0);
    document.body.style.marginBottom = '10em';
    document.body.appendChild(footer);

    document.getElementById('sentenceExampleAvac').onclick = function () {
        speakWord(document.getElementById('sentenceExampleAvac').innerText, 'en-GB', 0.8, 0.8, 1, 'native');
    };

    let synonyms = document.getElementsByClassName('synonymsAvac');
    for (let s in synonyms) {
        synonyms[s].onclick = function () {
            speakWord(synonyms[s].innerText, 'en-GB', 0.8, 0.8, 1, 'native');
        }
    }
}

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
 * Creation button for close/open all footers
 **/
function createSideNavAvac() {
    let sideNav = document.createElement('div');
    let sideNavBtn = document.createElement('button');
    sideNav.id = 'sideNavAvac';
    sideNavBtn.id = 'sideNavBtnAvac';
    sideNavBtn.innerText = 'Avac';
    sideNav.appendChild(sideNavBtn);
    document.body.appendChild(sideNav);
}


