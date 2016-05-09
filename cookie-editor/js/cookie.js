(function(){
	function setcookie(url,data,domain){
      var s=data.split(";");
      var obj={url:url,name:"",value:"",domain:"",path:"/"};
      for(var i=0;i<s.length;i++){
          var tmp=(s[i]||"").replace(/^\s+|\s+$/,"");
          var index = tmp.indexOf("=");
          if(index<1) continue;
      	  obj.name=tmp.substring(0,index);
      	  obj.value=tmp.substring(index+1,tmp.length);
   		  obj.domain=domain;
	  	  chrome.cookies.set(obj, function ($detail) {
	  	  	  
	  	  });
      }
      alert("edit cookie success!");
	}
	function clearCookie(url,data){
		var s=data.split(";");
        var obj={url:url,name:"",value:"",domain:"",path:"/"};
        for(var i=0;i<s.length;i++){
           var tmp=(s[i]||"").replace(/^\s+|\s+$/,"");
           var index = tmp.indexOf("=");
           if(index<1) continue;
      	   obj.name=tmp.substring(0,index);
	  	   chrome.cookies.remove({ url: url, name: obj.name}, function ($detail) {
             
          });
       }
       alert("delete cookie success!");
	}
    chrome.tabs.getSelected(null, function (currentTab) {
      $('.button-delete').click(function () {
         clearCookie(currentTab.url,$('#value').val());
      });
	  $('.button-save').click(function () {
	 	if (!$('#value').val()) {
	 		
	 	}else{
	 		var value = $('#value').val();
	 		var href = currentTab.url;
	 		var domain=(function (href) {
	            var l = document.createElement('a');
	            l.href = href;
	            return l;
	        })(href).hostname;
	 		setcookie(href,value,domain);
	 	}
	  });
	  chrome.cookies.getAll({ url: currentTab.url }, function ($cookies) {
			var cookieValue="";
			if ($cookies.length == 0) {
                $('<div class="alert alert-block">There is no cookies at current url.</div>').appendTo('.message');
            } else {
            	 for (var $i in $cookies) {
                    var $cookie = $cookies[$i];
                    cookieValue+=$cookie.name+"="+$cookie.value+";";
                }
            }
			$("#value").text(cookieValue);
	});
 });
})();