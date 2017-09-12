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
    createAvacFooter();
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
            text = text.replace( ' ' + words[w] + ' ', `<span class="avacMainWord ___${words[w].toLowerCase()}"> ${words[w]} </span> ` );
        }
        paragraphs[i].innerHTML = text;
    }

    let classWords;
    for( let key in myDictionary )
    {
        classWords = document.getElementsByClassName( "___" + key );
        for( cw in classWords )
        {
            classWords[cw].innerHTML = `${classWords[cw].innerText} <span class='avacWord'>[&nbsp${myDictionary[key]}&nbsp]</span>`;
        }
    }

    let avacWords = document.querySelectorAll( '[class*=___]' );
    for( let av in avacWords )
    {
        avacWords[av].onclick = function ()
        {
            document.getElementById( 'translatedAvacWord' ).innerText = avacWords[av].textContent.substring( 0, avacWords[av].textContent.indexOf( '[' ) - 2 ).trim().toUpperCase();
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
function createAvacFooter()
{
    let footer = document.createElement( 'footer' );
    footer.id = 'avacFooter';

    footer.innerHTML =
            `<div id="avacFooterContent">
                <div id="translatedAvacWord"> 
                    Welcome!
                </div>
            </div>`;
    document.body.appendChild( footer );
    document.body.style.marginBottom = '100px';

}
/** ------------------------------------------------------------------ */


