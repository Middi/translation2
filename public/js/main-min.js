function langSwitch(){langAPI="Polish"==document.querySelector("#switch").getAttribute("attr")?"pl":"no"}$("#myTabs a").click(function(e){e.preventDefault(),$(this).tab("show")}),$("#numbers-tab").addClass("active"),$(".tab-pane:first-child").addClass("active");var language="Polish";window.location.href.indexOf("norwegian")>-1&&($(".flag").attr("src","/images/norway.png"),language="Norwegian"),$(function(){var e=window.location.hash;e&&$('ul.nav a[href="'+e+'"]').tab("show"),$(".nav-tabs a").click(function(e){$(this).tab("show");var t=$("body").scrollTop()||$("html").scrollTop();window.location.hash=this.hash,$("html,body").scrollTop(t)})});var langAPI;langSwitch(),document.querySelector("#switch").addEventListener("click",function(){"en"!==langAPI?(langAPI="en",document.getElementById("sw1-p").innerHTML=language,document.getElementById("sw2-p").innerHTML="English",document.querySelector("#source").value="",document.querySelector("#output").value="",document.querySelector("#source").placeholder=language,document.querySelector("#output").placeholder="English"):(langAPI=document.querySelector("#switch").getAttribute("attr"),langSwitch(),document.getElementById("sw1-p").innerHTML="English",document.getElementById("sw2-p").innerHTML=language,document.querySelector("#source").value="",document.querySelector("#output").value="",document.querySelector("#source").placeholder="English",document.querySelector("#output").placeholder=language)});var url="https://translate.yandex.net/api/v1.5/tr.json/translate",keyAPI="trnsl.1.1.20171120T151319Z.884ad4768789b517.9e6db12a8ca198a2c0d93af1d8be54ee1669bf07";document.querySelector("#source").addEventListener("keyup",function(){var e=new XMLHttpRequest,t=document.querySelector("#source").value,n="key="+keyAPI+"&text="+t+"&lang="+langAPI;e.open("POST",url,!0),e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.send(n),e.onreadystatechange=function(){if(4==this.readyState&&200==this.status){var e=this.responseText,t=JSON.parse(e);200==t.code?document.querySelector("#output").value=t.text[0]:document.querySelector("#output").innerHTML="Error Code: "+t.code}}},!1);