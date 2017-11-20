$('#myTabs a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$('#numbers-tab').addClass('active');
$('.tab-pane:first-child').addClass('active');

// sets language for text
var language = 'Polish';

if (window.location.href.indexOf("norwegian") > -1) {
  $('.flag').attr('src', '/images/norway.png');
  language = 'Norwegian';
}




$(function () {
  var hash = window.location.hash;
  hash && $('ul.nav a[href="' + hash + '"]').tab('show');

  $('.nav-tabs a').click(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop() || $('html').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});

// sets language for api
var langAPI;

function langSwitch() {
  if (document.querySelector('#switch').getAttribute("attr") == 'Polish') {
    langAPI = 'pl';
  }
  else {
    langAPI = 'no';
  }
}
langSwitch();

// switches language
document.querySelector('#switch').addEventListener('click', function () {
  if (langAPI !== 'en') {
    langAPI = 'en';

    document.getElementById('sw1-p').innerHTML = language;
    document.getElementById('sw2-p').innerHTML = 'English';
    document.querySelector('#source').value = '';
    document.querySelector('#output').innerHTML = '';
    document.querySelector('#source').placeholder = 'Type ' + language + ' here';
    document.querySelector('#output').placeholder = 'Type English here';

  }
  else {
    langAPI = document.querySelector('#switch').getAttribute("attr");
    langSwitch();
    document.getElementById('sw1-p').innerHTML = 'English';
    document.getElementById('sw2-p').innerHTML = language;
    document.querySelector('#source').value = '';
    document.querySelector('#output').innerHTML = '';
    document.querySelector('#source').placeholder = 'Type English here';
    document.querySelector('#output').placeholder = 'Type ' + language + ' here';
  }
});

var url = "https://translate.yandex.net/api/v1.5/tr.json/translate",
  keyAPI = "trnsl.1.1.20171120T151319Z.884ad4768789b517.9e6db12a8ca198a2c0d93af1d8be54ee1669bf07";

document.querySelector('#source').addEventListener('keyup', function () {
  var xhr = new XMLHttpRequest(),
    textAPI = document.querySelector('#source').value,
    data = "key=" + keyAPI + "&text=" + textAPI + "&lang=" + langAPI;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(data);
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = this.responseText;
      var json = JSON.parse(res);
      if (json.code == 200) {
        document.querySelector('#output').innerHTML = json.text[0];
      }
      else {
        document.querySelector('#output').innerHTML = "Error Code: " + json.code;
      }
    }
  };
}, false);