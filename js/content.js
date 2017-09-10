/** --------------
 * Listen popup.js
 */
// if user choice Onload-mode
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


// if user click button "do it!"
chrome.runtime.onMessage.addListener(
        msgObj =>
        {
            let params = JSON.parse( msgObj );
            avacPost( params.level, params.langFrom, params.langTo );
        } );
/** ------------------------------------------------------------------ */
function avacPost( level, langFrom, langTo )
{
    let iFrame;
    let goto;
    if( document.getElementById( "avacSourcePage" ) )
    {
        iFrame = document.getElementById( "avacSourcePage" );
        if( iFrame.contentWindow.location.href )
        {
            goto = iFrame.contentWindow.location.href;
        }
    }
    else
    {
        goto = window.location.href;
        createMainFrame( goto )
    }

    const url = "https://panda.jelastic.regruhosting.ru/avac/";
    const req = new XMLHttpRequest();
    const params =
            "goto=" + goto + "&" +
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
    let avacPageFrame = document.getElementById( 'avacSourcePage' ).contentWindow.document;

    let hrefs = avacPageFrame.getElementsByTagName( "a" );
    for( let i = 0; i < hrefs.length; i++ )
    {
        hrefs.item( i ).setAttribute( 'target', 'avacSourcePage' );
    }

    console.log( "Start translating ... " );
    if( document.getElementsByClassName( "avacWord" ) )
    {
        removeElementsByClass( avacPageFrame, "avacWord" )
    }
    let words;
    let text;
    let paragraphs = avacPageFrame.getElementsByTagName( "p" );
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
        classWords = avacPageFrame.getElementsByClassName( "___" + key );
        for( let cw in classWords )
        {
            classWords[cw].innerHTML = `${classWords[cw].innerText}<span class='avacWord' style="color: green"> [&nbsp${myDictionary[key]}&nbsp] </span> `;
        }
    }
    console.log( "Complete!" );
}

/** ------------------------------------------------------------------ */
function removeElementsByClass( avacSourcePage, className )
{
    let elements = avacSourcePage.getElementsByClassName( className );
    while( elements.length > 0 )
    {
        elements[0].parentNode.removeChild( elements[0] );
    }
}
/** ------------------------------------------------------------------ */
function createMainFrame( src )
{
    document.open( 'text/html' );
    let navBarUrl = chrome.extension.getURL( "html/navigation.html" );
    document.write(
            `<!DOCTYPE HTML>
                <html>
                    <head>
                        <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
                        <title>Avac</title>
                    </head>
                    <body>
                        <iframe name="avacSourcePage" id="avacSourcePage" src="${src}"></iframe>
                        <iframe name="avacNavBar" id="avacNavBar" src="${navBarUrl}"></iframe>
                    </body>
                </html>` );
    document.close();
}
















