$("#myTabs a").click(function(o){o.preventDefault(),$(this).tab("show")}),window.location.href.indexOf("norwegian")>-1&&$(".flag").attr("src","/images/norway.png"),$(function(){var o=window.location.hash;o&&$('ul.nav a[href="'+o+'"]').tab("show"),$(".nav-tabs a").click(function(o){$(this).tab("show");var a=$("body").scrollTop()||$("html").scrollTop();window.location.hash=this.hash,$("html,body").scrollTop(a)})});