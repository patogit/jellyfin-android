!function(){function n(n){var e=n.split("-");return 2==e.length&&(e[1]=e[1].toUpperCase(),n=e.join("-")),"strings/"+n+".json"}function e(e){return p[n(e)]}function t(t){return new Promise(function(r){if(e(t))return void r();var o=n(t),u=o+"?v="+AppInfo.appVersion,a=new XMLHttpRequest;a.open("GET",u,!0);var i=function(){var e=new XMLHttpRequest;e.open("GET",n("en-US"),!0),e.onload=function(){p[o]=JSON.parse(this.response),r()},e.send()};a.onload=function(){this.status<400?(p[o]=JSON.parse(this.response),r()):i()},a.onerror=i,a.send()})}function r(n){return f=n,t(n)}function o(n){n=n.replace("_","-");var e=n.split("-");return 2==e.length&&e[0].toLowerCase()==e[1].toLowerCase()&&(n=e[0].toLowerCase()),n}function u(){return new Promise(function(n){n(AppInfo.isNativeApp?navigator.language||navigator.userLanguage:AppInfo.supportsUserDisplayLanguageSetting?AppSettings.displayLanguage():document.documentElement.getAttribute("data-culture"))})}function a(){return u().then(function(n){return n=o(n||"en-US"),r(n)})}function i(n){var t=e(f)||{};return s(n,t)}function s(n,e){var t=n.indexOf("${");if(-1==t)return n;t+=2;var r=n.indexOf("}",t);if(-1==r)return n;var o=n.substring(t,r),u=e[o]||o;return n=n.replace("${"+o+"}",u),s(n,e)}var p={},f="en-US";window.Globalize={translate:function(n){for(var t=e(f)||{},r=t[n]||n,o=1;o<arguments.length;o++)r=r.replace("{"+(o-1)+"}",arguments[o]);return r},ensure:a,translateDocument:i}}();