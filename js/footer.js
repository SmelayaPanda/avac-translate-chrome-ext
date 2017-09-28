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
        }
        else {
            fadeOutElement(footerAvac, 0);
            closeFooterAvac.style.borderTop = 'solid gray 1px';
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
    <div id="emptyBlockAvac">
    </div>
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
    createSideNavAvac();

    footer.style.opacity = '0';
    fadeInElement(footer, 0);
    document.body.appendChild(footer);
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


