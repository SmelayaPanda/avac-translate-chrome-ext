//Файл popup.js связан с фоновым скриптом background.js,
//т.к. данные, занесенные в локальное хранилище на background.js, видны и на popup.js.

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://losttime.su/?tmpl=login&token=" + localStorage['lostlogin'], true); // тут происходит ГЕТ запрос на указанную страницу
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) // если всё прошло хорошо, выполняем, что в скобках
    {
        var dictionary = document.getElementById('dictionary');
        dictionary.innerHTML = xhr.responseText; // добавляем в блок с id=dictionary  полученный код
    }
}
xhr.send();