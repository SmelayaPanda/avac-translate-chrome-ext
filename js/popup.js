window.onload = function () {

    let btn_1 = document.getElementById("translate_btn");
    btn_1.addEventListener('click', function () {

        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        let lvl = document.getElementById("AvacLevel").value;
        // Send message to content.js
        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id,
                    "translate_btn" + " " +
                    lvl + " " +
                    selected_1 + " " +
                    selected_2 + " ");
            });
        });
    });



    var loading = function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.classList.add('loading');
        e.target.setAttribute('disabled','disabled');
        setTimeout(function(){
            e.target.classList.remove('loading');
            e.target.removeAttribute('disabled');
        },1500);
    };

    var btns = document.querySelectorAll('button');
    for (var i=btns.length-1;i>=0;i--) {
        btns[i].addEventListener('click',loading);
    }
// Lang buttons


};
