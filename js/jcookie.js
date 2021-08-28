// JavaScript Document
jQuery.cookie = function(name, value, options){
  if (typeof value != 'undefined'){
	  var _default = {expires:7,path:'',domain:'',secure:''};
	  options = options || {};
	  if(value === null){value=''}
	  _default = $.extend(_default, options);

	  if (_default.expires && (typeof _default.expires == "number" || _default.expires.toUTCString)){
		  var date;
		  if (typeof _default.expires == "number"){
			  date = new Date();
			  date.setTime(date.getTime() + (_default.expires*24*60*60*1000));
		  }else{
			  date = _default.expires;
		  }
		  _default.expires = ';expires='+date.toUTCString();
	  }
	  _default.path = _default.path?';path='+(_default.path):"";
	  _default.domain = _default.domain?';domain='+(_default.domain):"";
	  _default.secure = _default.secure?';secure='+(_default.secure):"";
	  document.cookie = [name, '=', encodeURIComponent(value), _default.expires, _default.path, _default.domain, _default.secure].join("");
  }else{
	  var cookieValue = null;
	  if (document.cookie && document.cookie != ''){
		  var cookies = document.cookie.split(";");
		  for (var i=0; i<cookies.length; i++){
			  var cookie = jQuery.trim(cookies[i]);
			  if (cookie.substring(0, name.length+1) == (name+"=")){
				  var cookieValue = decodeURIComponent(cookie.substring(name.length+1, cookie.length));
				  break;
			  }
		  }
	  }
	  return cookieValue;
  }	
};

(function($) {
	jQuery.fn.backgroundPosition = function() {
		var bgPosition = $(this).css('background-position');
		if(typeof(bgPosition) == 'undefined') {
			return $(this).css('background-positionX') + ' ' + $(this).css('background-positionY');
	  	}else{
	   		return bgPosition;
	  	}
	};
})(jQuery);