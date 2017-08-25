window.onload = function ()
{

    let outputLvl = document.getElementById( "rangeValue" );
    let avacLevel = document.getElementById( "avacLevel" );

    avacLevel.addEventListener( 'input', function ()
    {
        if( this.value < 20 && outputLvl.innerHTML !== "BEGINNER" )
        {
            fadeinText( outputLvl, "BEGINNER" );
        }
        else if( this.value >= 20 && this.value < 40 && outputLvl.innerHTML !== "PRE INTERMEDIATE" )
        {
            fadeinText( outputLvl, "PRE INTERMEDIATE" );
        }
        else if( this.value >= 40 && this.value < 60 && outputLvl.innerHTML !== "INTERMEDIATE" )
        {
            fadeinText( outputLvl, "INTERMEDIATE" );
        }
        else if( this.value >= 60 && this.value < 80 && outputLvl.innerHTML !== "UPPER INTERMEDIATE")
        {
            fadeinText( outputLvl, "UPPER INTERMEDIATE" );
        }
        else if( this.value >= 80 && outputLvl.innerHTML !== "ADVANCED" )
        {
            fadeinText( outputLvl, "ADVANCED" );
        }
        else
        {

        }
    } );

    let btn_1 = document.getElementById( "translate_btn" );
    btn_1.addEventListener( 'click', function ()
    {

        let select_1 = document.getElementById( 'langFrom' );
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById( 'langTo' );
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        let lvl = document.getElementById( "avacLevel" ).value;
        // Send message to content.js
        chrome.tabs.query( {}, tabs =>
        {
            tabs.forEach( tab =>
                          {
                              chrome.tabs.sendMessage( tab.id,
                                                       "translate_btn" + " " +
                                                       lvl + " " +
                                                       selected_1 + " " +
                                                       selected_2 + " " );
                          } );
        } );
    } );


    // Do it button
    let loading = function ( e )
    {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add( 'loading' );
        e.target.setAttribute( 'disabled', 'disabled' );
        setTimeout( function ()
                    {
                        e.target.classList.remove( 'loading' );
                        e.target.removeAttribute( 'disabled' );
                    }, 1500 );
    };

    let btns = document.querySelectorAll( 'button' );
    for( let i = btns.length - 1; i >= 0; i-- )
    {
        btns[i].addEventListener( 'click', loading );
    }
// Lang buttons


};

function fadeinText( element, newValue )
{
    element.classList.add( 'hide' );
    setTimeout( function ()
                {
                    element.innerHTML = newValue;
                }, 200 );
    setTimeout( function ()
                {
                    element.classList.remove( 'hide' );
                }, 500 );
}
