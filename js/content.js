/** --------------
 * Listen popup.js
 */
window.onload = function ()
{
    chrome.storage.sync.get( 'onLoadCheckBox', function ( obj )
    {
        console.log(obj);
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
};
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
        if( this.readyState === 4 && this.status === 200 )
        {
            myDictionary = JSON.parse( this.responseText );
            console.log( myDictionary );
            translateText.call( this );
        }
    };
    req.send( params );
}
/** ------------------------------------------------------------------ */
function translateText()
{
    console.log( "Start translating ... " );
    if( document.getElementsByClassName( "avacWord" ) )
    {
        removeElementsByClass( "avacWord" )
    }
    let paragraphs = document.getElementsByTagName( "p" );
    for( let i = 0; i < paragraphs.length; i++ )
    {
        let text = paragraphs[i].textContent;
        let words = text
                .replace( /[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " " )
                .replace( /\s+/g, " " )
                .split( " " );

        for( let w in words )
        {
            text = text
                    .replace( /\./g, ' .' )
                    .replace( /\?/g, ' ?' )
                    .replace( /,/g, ' ,' )
                    .replace( /!/g, ' !' )
                    .replace( /:/g, ' :' )
                    .replace( /;/g, ' ;' )
                    .replace( text.charAt( 0 ), " " + text.charAt( 0 ) ) // Begin of the paragraph
                    .replace( text.charAt( text.length - 1 ), text.charAt( text.length - 1 ) + " " ) // End of the paragraph
                    .replace( /\s+/g, '  ' )
                    .replace( ' ' + words[w] + ' ', `<span class="${words[w].toLowerCase()}"> ${words[w]} </span>` )
            ;
        }
        paragraphs[i].innerHTML = text;
    }

    let classWords;
    for( let key in myDictionary )
    {
        classWords = document.getElementsByClassName( key );
        for( cw in classWords )
        {
            classWords[cw].innerHTML = `${classWords[cw].innerText}<span class='avacWord'> [&nbsp${myDictionary[key]}&nbsp] </span>`;
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





















