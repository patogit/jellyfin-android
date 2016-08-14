define(["libraryBrowser","components/categorysyncbuttons","cardBuilder","scrollStyles","emby-itemscontainer","emby-tabs","emby-button"],function(e,t,a){function n(){return browserInfo.mobile&&AppInfo.enableAppLayouts}function r(){return n()?"overflowPortrait":"portrait"}function i(){return n()?"overflowBackdrop":"backdrop"}function o(e,t,i){var o={IncludeItemTypes:"Movie",Limit:18,Fields:"PrimaryImageAspectRatio,MediaSourceCount,BasicSyncInfo",ParentId:i,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getJSON(ApiClient.getUrl("Users/"+t+"/Items/Latest",o)).then(function(t){var i=!n(),o=e.querySelector("#recentlyAddedItems");a.buildCards(t,{itemsContainer:o,shape:r(),scalable:!0,overlayPlayButton:!0,allowBottomPadding:i})})}function s(e,t,r){var o=window.innerWidth,s={SortBy:"DatePlayed",SortOrder:"Descending",IncludeItemTypes:"Movie",Filters:"IsResumable",Limit:o>=1920?5:o>=1600?4:3,Recursive:!0,Fields:"PrimaryImageAspectRatio,MediaSourceCount,BasicSyncInfo",CollapseBoxSetItems:!1,ParentId:r,ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",EnableTotalRecordCount:!1};ApiClient.getItems(t,s).then(function(t){t.Items.length?e.querySelector("#resumableSection").classList.remove("hide"):e.querySelector("#resumableSection").classList.add("hide");var r=!n(),o=e.querySelector("#resumableItems");a.buildCards(t.Items,{itemsContainer:o,preferThumb:!0,shape:i(),scalable:!0,overlayPlayButton:!0,allowBottomPadding:r})})}function l(e){var t="",i="";switch(e.RecommendationType){case"SimilarToRecentlyPlayed":i=Globalize.translate("RecommendationBecauseYouWatched").replace("{0}",e.BaselineItemName);break;case"SimilarToLikedItem":i=Globalize.translate("RecommendationBecauseYouLike").replace("{0}",e.BaselineItemName);break;case"HasDirectorFromRecentlyPlayed":case"HasLikedDirector":i=Globalize.translate("RecommendationDirectedBy").replace("{0}",e.BaselineItemName);break;case"HasActorFromRecentlyPlayed":case"HasLikedActor":i=Globalize.translate("RecommendationStarring").replace("{0}",e.BaselineItemName)}t+='<div class="homePageSection">',t+='<h1 class="listHeader">'+i+"</h1>";var o=!0;return n()?(o=!1,t+='<div is="emby-itemscontainer" class="itemsContainer hiddenScrollX">'):t+='<div is="emby-itemscontainer" class="itemsContainer vertical-wrap">',t+=a.getCardsHtml(e.Items,{shape:r(),scalable:!0,overlayPlayButton:!0,allowBottomPadding:o}),t+="</div>",t+="</div>"}function c(e,t){var a=window.innerWidth,n=ApiClient.getUrl("Movies/Recommendations",{userId:t,categoryLimit:6,ItemLimit:a>=1920?8:a>=1600?8:a>=1200?6:5,Fields:"PrimaryImageAspectRatio,MediaSourceCount,BasicSyncInfo",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb"});ApiClient.getJSON(n).then(function(t){if(!t.length)return e.querySelector(".noItemsMessage").classList.remove("hide"),void(e.querySelector(".recommendations").innerHTML="");var a=t.map(l).join("");e.querySelector(".noItemsMessage").classList.add("hide");var n=e.querySelector(".recommendations");n.innerHTML=a,ImageLoader.lazyChildren(n)})}function d(e,t){for(var a=t.querySelectorAll(".itemsContainer"),r=0,i=a.length;i>r;r++)n()?(a[r].classList.add("hiddenScrollX"),a[r].classList.remove("vertical-wrap")):(a[r].classList.remove("hiddenScrollX"),a[r].classList.add("vertical-wrap"))}function m(e,t,a){var n=t.topParentId,r=Dashboard.getCurrentUserId();s(a,r,n),o(a,r,n),c(a,r,n)}return function(a,n){function r(e,t,r){var i=[];switch(t){case 0:break;case 1:i.push("scripts/movies");break;case 2:i.push("scripts/movietrailers");break;case 3:i.push("scripts/moviecollections");break;case 4:i.push("scripts/moviegenres");break;case 5:i.push("scripts/moviestudios")}require(i,function(e){var i;0==t&&(i=a.querySelector(".pageTabContent[data-index='"+t+"']"),l.tabContent=i);var o=p[t];o||(i=a.querySelector(".pageTabContent[data-index='"+t+"']"),o=t?new e(a,n,i):l,p[t]=o,o.initTab&&o.initTab()),r(o)})}function i(e,t){r(e,t,function(e){-1==y.indexOf(t)&&e.preRender&&e.preRender()})}function o(e,t){r(e,t,function(e){-1==y.indexOf(t)&&(y.push(t),e.renderTab())})}function s(e,t){t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType&&(y=[],c.triggerTabChange())}var l=this;l.initTab=function(){var e=a.querySelector(".pageTabContent[data-index='0']");t.init(e),d(a,e)},l.renderTab=function(){var e=a.querySelector(".pageTabContent[data-index='0']");m(a,n,e)};var c=a.querySelector(".libraryViewNav"),u="movies.html",b=n.topParentId;b&&(u+="?topParentId="+b),e.configurePaperLibraryTabs(a,c,a.querySelectorAll(".pageTabContent"),[0,3,4,5]);var p=[],y=[];c.addEventListener("beforetabchange",function(e){i(a,parseInt(e.detail.selectedTabIndex))}),c.addEventListener("tabchange",function(e){o(a,parseInt(e.detail.selectedTabIndex))}),a.addEventListener("viewbeforeshow",function(){if(!a.getAttribute("data-title")){var e=n.topParentId;e?ApiClient.getItem(Dashboard.getCurrentUserId(),e).then(function(e){a.setAttribute("data-title",e.Name),LibraryMenu.setTitle(e.Name)}):(a.setAttribute("data-title",Globalize.translate("TabMovies")),LibraryMenu.setTitle(Globalize.translate("TabMovies")))}}),a.addEventListener("viewshow",function(){Events.on(MediaController,"playbackstop",s)}),a.addEventListener("viewbeforehide",function(){Events.off(MediaController,"playbackstop",s)})}});