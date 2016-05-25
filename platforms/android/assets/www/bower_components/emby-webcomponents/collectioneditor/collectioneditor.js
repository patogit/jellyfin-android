define(["shell","dialogHelper","loading","layoutManager","connectionManager","scrollHelper","embyRouter","globalize","paper-checkbox","paper-input","paper-icon-button-light","emby-select","html!./../icons/nav.html","css!./../formdialog"],function(e,t,n,o,l,r,i,a){function c(e,t){for(;!e.classList||!e.classList.contains(t);)if(e=e.parentNode,!e)return null;return e}function s(e){n.show();var t=c(this,"dialog"),o=t.querySelector("#selectCollectionToAddTo").value,r=l.getApiClient(y);return o?m(r,t,o):d(r,t),e.preventDefault(),!1}function d(e,o){var l=e.getUrl("Collections",{Name:o.querySelector("#txtNewCollectionName").value,IsLocked:!o.querySelector("#chkEnableInternetMetadata").checked,Ids:o.querySelector(".fldSelectedItemIds").value||""});e.ajax({type:"POST",url:l,dataType:"json"}).then(function(l){n.hide();var r=l.Id;t.close(o),u(e,r)})}function u(e,t){e.getItem(e.getCurrentUserId(),t).then(function(e){i.showItem(e)})}function m(e,o,l){var r=e.getUrl("Collections/"+l+"/Items",{Ids:o.querySelector(".fldSelectedItemIds").value||""});e.ajax({type:"POST",url:r}).then(function(){n.hide(),t.close(o),require(["toast"],function(e){e(a.translate("sharedcomponents#MessageItemsAdded"))})})}function p(e){e.dispatchEvent(new CustomEvent("change",{}))}function v(e){n.show();var t=e.querySelector("#selectCollectionToAddTo");e.querySelector(".newCollectionInfo").classList.add("hide");var o={Recursive:!0,IncludeItemTypes:"BoxSet",SortBy:"SortName"},r=l.getApiClient(y);r.getItems(r.getCurrentUserId(),o).then(function(e){var o="";o+='<option value="">'+a.translate("sharedcomponents#OptionNew")+"</option>",o+=e.Items.map(function(e){return'<option value="'+e.Id+'">'+e.Name+"</option>"}),t.innerHTML=o,t.value="",p(t),n.hide()})}function h(){var e="";return e+='<div class="dialogContent smoothScrollY">',e+='<div class="dialogContentInner centeredContent">',e+='<form class="newCollectionForm" style="margin:auto;">',e+="<div>",e+=a.translate("sharedcomponents#NewCollectionHelp"),e+="</div>",e+='<div class="fldSelectCollection">',e+="<br/>",e+="<br/>",e+='<select is="emby-select" label="'+a.translate("sharedcomponents#LabelCollection")+'" id="selectCollectionToAddTo" autofocus></select>',e+="</div>",e+='<div class="newCollectionInfo">',e+="<div>",e+='<paper-input type="text" id="txtNewCollectionName" required="required" label="'+a.translate("sharedcomponents#LabelName")+'"></paper-input>',e+='<div class="fieldDescription">'+a.translate("sharedcomponents#NewCollectionNameExample")+"</div>",e+="</div>",e+="<br />",e+="<div>",e+='<paper-checkbox id="chkEnableInternetMetadata">'+a.translate("sharedcomponents#SearchForCollectionInternetMetadata")+"</paper-checkbox>",e+="</div>",e+="</div>",e+="<br />",e+="<br />",e+="<div>",e+='<paper-button raised class="btnSubmit block">'+a.translate("sharedcomponents#ButtonOk")+"</paper-button>",e+="</div>",e+='<input type="hidden" class="fldSelectedItemIds" />',e+="</form>",e+="</div>",e+="</div>"}function f(e,t){if(e.querySelector("#selectCollectionToAddTo").addEventListener("change",function(){this.value?(e.querySelector(".newCollectionInfo").classList.add("hide"),e.querySelector("#txtNewCollectionName").removeAttribute("required")):(e.querySelector(".newCollectionInfo").classList.remove("hide"),e.querySelector("#txtNewCollectionName").setAttribute("required","required"))}),e.querySelector(".btnSubmit").addEventListener("click",function(){var t=document.createElement("input");t.setAttribute("type","submit"),t.style.display="none";var n=e.querySelector("form");n.appendChild(t),t.click(),setTimeout(function(){n.removeChild(t)},500)}),e.querySelector("form").addEventListener("submit",s),e.querySelector(".fldSelectedItemIds",e).value=t.join(","),t.length)e.querySelector(".fldSelectCollection").classList.remove("hide"),v(e);else{e.querySelector(".fldSelectCollection").classList.add("hide");var n=e.querySelector("#selectCollectionToAddTo");n.innerHTML="",n.value="",p(n)}}function b(){var e=this;e.show=function(e){var n=e.items||{};y=e.serverId;var l={removeOnClose:!0,scrollY:!1};l.size=o.tv?"fullscreen":"small";var i=t.createDialog(l);i.classList.add("formDialog");var c="",s=a.translate(n.length?"sharedcomponents#AddToCollection":"sharedcomponents#NewCollection");return c+='<div class="dialogHeader" style="margin:0 0 2em;">',c+='<button is="paper-icon-button-light" class="btnCancel" tabindex="-1"><iron-icon icon="nav:arrow-back"></iron-icon></button>',c+='<div class="dialogHeaderTitle">',c+=s,c+="</div>",c+='<a class="btnHelp" href="https://github.com/MediaBrowser/Wiki/wiki/Collections" target="_blank" style="margin-left:auto;margin-right:.5em;display:inline-block;padding:.25em;display:flex;align-items:center;" title="'+a.translate("sharedcomponents#Help")+'"><iron-icon icon="nav:info"></iron-icon><span style="margin-left:.25em;">'+a.translate("sharedcomponents#Help")+"</span></a>",c+="</div>",c+=h(),i.innerHTML=c,document.body.appendChild(i),f(i,n),i.querySelector(".btnCancel").addEventListener("click",function(){t.close(i)}),o.tv&&r.centerFocus.on(i.querySelector(".dialogContent"),!1),new Promise(function(e){i.addEventListener("close",e),t.open(i)})}}var y;return b});