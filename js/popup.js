window.onload = function () {

// -------------------------------------------------------------------------


    var btn_1 = document.getElementById("btn_1");

    btn_1.addEventListener('click', function () {

        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;


        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_1" + " " + selected_1 + " " + selected_2);
            });
        });

    });
// -------------------------------------------------------------------------

    var btn_2 = document.getElementById("btn_2");

    btn_2.addEventListener('click', function () {


        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_2" + " " + selected_1 + " " + selected_2);
            });
        });

    });
// -------------------------------------------------------------------------

    var btn_3 = document.getElementById("btn_3");

    btn_3.addEventListener('click', function () {


        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_3" + " " + selected_1 + " " + selected_2);
            });
        });

    });
// -------------------------------------------------------------------------

    var btn_4 = document.getElementById("btn_4");

    btn_4.addEventListener('click', function () {


        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_4" + " " + selected_1 + " " + selected_2);
            });
        });

    });
// -------------------------------------------------------------------------

    var btn_5 = document.getElementById("btn_5");

    btn_5.addEventListener('click', function () {


        let select_1 = document.getElementById('langFrom');
        let selected_1 = select_1.options[select_1.selectedIndex].value;

        let select_2 = document.getElementById('langTo');
        let selected_2 = select_2.options[select_2.selectedIndex].value;

        chrome.tabs.query({}, tabs => {
            tabs.forEach(tab => {
                chrome.tabs.sendMessage(tab.id, "btn_5" + " " + selected_1 + " " + selected_2);
            });
        });

    });


};
