/** --------------
 * Listen popup.js
 */

chrome.storage.sync.get( 'onLoadCheckBox', function ( obj )
{
    if( obj.onLoadCheckBox )
    {
        let level;
        let langFrom;
        let langTo;

        chrome.storage.sync.get( 'rangeInput', function ( obj )
        {
            level = obj.rangeInput;
            chrome.storage.sync.get( 'langFrom', function ( obj )
            {
                langFrom = obj.langFrom;
                chrome.storage.sync.get( 'langTo', function ( obj )
                {
                    langTo = obj.langTo;
                    avacPost( level, langFrom, langTo );
                } );
            } );
        } );
    }
} );

chrome.runtime.onMessage.addListener(
        msgObj =>
        {
            let params = JSON.parse( msgObj );
            avacPost( params.level, params.langFrom, params.langTo );
        } );
/** ------------------------------------------------------------------ */
function avacPost( level, langFrom, langTo )
{
    const url = "https://panda.jelastic.regruhosting.ru/avac/";
    const req = new XMLHttpRequest();
    const params =
            "goto=" + encodeURIComponent( document.URL ) + "&" +
            "level=" + level + "&" +
            "langFrom=" + langFrom + "&" +
            "langTo=" + langTo;

    console.log( params );
    req.open( "POST", url, true );
    req.setRequestHeader( "Content-type", "application/x-www-form-urlencoded" );

    req.onreadystatechange = function ()
    {
        let myDictionary;
        if( this.readyState === 4 && this.status === 200 )
        {
            myDictionary = JSON.parse( this.responseText );
            console.log( " Dictionary size = " + myDictionary.size );
            if( document.readyState === 'complete' )
            {
                translateText( myDictionary );
            }
        }
    };
    req.send( params );
}
/** ------------------------------------------------------------------ */
function translateText( myDictionary )
{
    console.log( "Start translating ... " );
    if( document.getElementsByClassName( "avacWord" ) )
    {
        removeElementsByClass( "avacWord" )
    }
    let words;
    let text;
    let paragraphs = document.getElementsByTagName( "p" );
    for( let i = 0; i < paragraphs.length; i++ )
    {
        text = paragraphs[i].textContent;

        text = text
                .replace( text.charAt( 0 ), ' ' + text.charAt( 0 ) ) // Begin of the paragraph
                .replace( text.charAt( text.length - 1 ), text.charAt( text.length - 1 ) + ' ' )
                .replace( /\./g, ' .' )
                .replace( /,/g, ' ,' )
                .replace( /:/g, ' :' )
                .replace( /;/g, ' ;' )
                .replace( /!/g, ' !' )
                .replace( /\?/g, ' ?' )
                .replace( /\(/g, ' ;' )
                .replace( /\)/g, ' ;' )
                .replace( /\s+/g, '  ' );

        words = text
                .replace( /[.,!;:\?()]/g, " " )
                .replace( /\s+/g, ' ' )
                .split( ' ' );

        for( let w in words )
        {
            text = text.replace( ' ' + words[w] + ' ', `<span class="___${words[w].toLowerCase()}"> ${words[w]} </span>` );
        }
        paragraphs[i].innerHTML = text;
    }

    let classWords;
    for( let key in myDictionary )
    {
        classWords = document.getElementsByClassName( "___" + key );
        for( cw in classWords )
        {
            classWords[cw].innerHTML = `${classWords[cw].innerText}<span class='avacWord'> [&nbsp${myDictionary[key]}&nbsp] </span> `;
        }
    }
    console.log( "Complete!" );
}
/** ------------------------------------------------------------------ */
function removeElementsByClass( className )
{
    let elements = document.getElementsByClassName( className );
    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}
/** ------------------------------------------------------------------ */


window.onload = function ()
{
    document.body.innerHTML =
            `<main id="avacMain">
                 <div class="avacInnerTube">
                    ${document.body.innerHTML}
                </div>
            </main>
            <nav id="avacNavigationBar">
                <div class="avacInnerTube">
                    <h1 id="navBarHeader">Hello</h1>
                    <p>This word means ...</p>
                    <hr>
                    <h3>Synonyms:</h3>
                    <p> greeating </p>
                    <p> ...... </p>
                </div>
            </nav>`
    ;

    let navBarHeader = document.getElementById('navBarHeader');
    navBarHeader.innerText = "Hellooooo";
};
/** ------------------------------------------------------------------ */
 // ?
function saveScrollPositions(theForm) {
    if(theForm) {
        var scrolly = typeof window.pageYOffset != 'undefined' ? window.pageYOffset
                : document.documentElement.scrollTop;
        var scrollx = typeof window.pageXOffset != 'undefined' ? window.pageXOffset
                : document.documentElement.scrollLeft;
        theForm.scrollx.value = scrollx;
        theForm.scrolly.value = scrolly;
    }
}


















