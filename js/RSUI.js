/*
 * Copyright (c) 2015-1-14 
 * author : yangdajun
 * modify : gy 20150304 Initializes the option to add mouseupCallback
 *          gy 20151112 Combobox choices change when the callback function
 */
 
 /*************************slider module****************/ 
 (function($) {
	 $.fn.slider = function(options,param){
		if(typeof options =='string' && options != ""){
			return $.fn.slider.methods[options](this,param);
		};
		//toDoc: mouseup events push back to document
		var defaultOptions = {width:120,height:14,barWidth:9,minValue:0,maxValue:100,mouseupCallback:function(){},
		isDown:false,dragmoveCallback:function(){},showText:true,useAni:false,toDoc:false,rangeDiv:null,onlyShow:false};
		options = $.extend({},defaultOptions,options);
		$(this).data("options",options);
		
		$.fn.slider.methods = {
			getValue:function(tg){var opts = $(tg).data("options"); return opts.value;},
			setValue:function(tg,value){
				var opts = $(tg).data("options");
				if(!opts){//undefined
					return;
				}
				//console.log("setValue: "+value);
				opts.value = value;
				value2pos(tg,value);
			}
		};
		
		//$.fn.slider.getValue = function(target){var opts = $(target).data("options");return opts.value;};
		//$.fn.slider.setValue = function(target,value){var opts = $(target).data("options");opts.value = value;value2pos(target,value);};
		
		function init(target) {
			var opts = $(target).data("options");
			//To solve the maximum of 255 slider value cannot be accurately to the problem of every number,
			//width are set in the initialization, set the default 120
			
			var silderHtml = '<div style="width:'+(opts.width+(opts.showText?41:0))+'px; height:14px;margin-top:8px;" onselectstart="return false;">' +
					'<div class="slider-back" style="width:'+opts.width+'px;">' +
						'<div class="slider-fore">' +
							'<div class="slider-bar" style="'+(opts.onlyShow?"display:none;":"")+'"></div>' +
						'</div>' +
					'</div>' + 
					'<div class="slider-tip" style="'+(opts.showText?"":"display:none;")+'"><span>1111</span></div>' + 
				'</div>';
				
			$(target).addClass('slider').html(silderHtml);
		};
		
		function value2pos(target,value){
			var opts = $(target).data("options");
			var pos;
			if(value < opts.minValue || value > opts.maxValue) return;
			else if(value == opts.maxValue) pos = opts.width - opts.barWidth;
			else if(value == opts.minValue) pos = 0;
			else pos = Math.round((value-opts.minValue)/(opts.maxValue-opts.minValue)*(opts.width-opts.barWidth));
			
			if(opts.useAni){
				$(target).find(".slider-fore").animate({width:(pos+opts.barWidth+"px")},25,"swing");
				$(target).find(".slider-bar").animate({marginLeft:(pos + "px")},25,"swing");
			}else{
				$(target).find(".slider-fore").css("width",pos+opts.barWidth+"px");
				$(target).find(".slider-bar").css("margin-left",pos + "px");
			}
			
			if(!opts.showText){//use title when no text span
			    $(target).find(".slider-bar").attr('title',value);
			}
			
			opts.value = value;
			$(target).find("span").html(value);
			return pos;
		};
		
		function pos2value(target,pos){
			var opts = $(target).data("options");
			if(pos < 0) pos = 0;
			else if(pos > (opts.width-opts.barWidth)) pos = opts.width-opts.barWidth;
			var value1 = pos/(opts.width - opts.barWidth)*(opts.maxValue-opts.minValue) + opts.minValue;
			var value =  Math.round(pos/(opts.width - opts.barWidth)*(opts.maxValue-opts.minValue) + opts.minValue);
			
			if(value == opts.minValue) pos = 0;
			else if(value == opts.maxValue) pos = opts.width - opts.barWidth;
			
			$(target).find(".slider-fore").css("width",pos+opts.barWidth+"px");
			$(target).find(".slider-bar").css("margin-left",pos + "px");
			if(!opts.showText){//use title when no text span
			    $(target).find(".slider-bar").attr('title',value);
			}
			opts.value = value;
			$(target).find("span").html(value);
			return value;
		};
		
		function evtHandle(target,e){
			e = e?e:window.event; 
			var opts = $(target).data("options");
			var scrollLeft = getScrollLeft();//when zooms browser ,add bar's length to make pos right
			var pos = e.clientX + scrollLeft - $(target).find(".slider-back").offset().left;
			opts.dragmoveCallback(pos2value(target,pos));
		};
		
		function sliderMove(target,e){e = e?e:window.event;  evtHandle(target,e);};
		function sliderStop(target,e){
			e = e?e:window.event; 
			evtHandle(target,e);
			var opts = $(target).data("options");
			if(opts.rangeDiv != null){
				$(opts.rangeDiv).unbind();
			}
			document.onmousemove = null;
			document.onmouseup   = null;
		};
		function bindEvents(target){
			var opts = $(target).data("options");
			if(opts.onlyShow){
				return false;
			}
			$(target).find(".slider-bar").bind("mousedown", function(e){
				if($(target).attr("type") == "Invalid"){
					return ;
				}
				e = e?e:window.event;
				document.onmousemove = function(evt){sliderMove(target,evt);};
				document.onmouseup   = function (evt) {if(opts.toDoc){opts.isDown = false;window.setTimeout(opts.mouseupCallback, 200);}sliderStop(target,evt);};
				if(opts.rangeDiv != null){
					$(opts.rangeDiv).bind('mouseleave',function(evt){if(opts.toDoc){opts.isDown = false;window.setTimeout(opts.mouseupCallback, 200);}sliderStop(target,evt);});
				}
				e.stopPropagation();
				opts.isDown = true;
			}).bind("mouseup", function(e){
				opts.isDown = false;
				window.setTimeout(opts.mouseupCallback, 200);
			}).bind("mouseout", function(e){
				if(opts.isDown && !opts.toDoc){
					opts.isDown = false;
					window.setTimeout(opts.mouseupCallback, 200);
				}
			});
			$(target).find(".slider-back").bind("mousedown", function(e){
                if($(target).attr("type") == "Invalid"){
                    return ;
                }
                                //console.log("--------mousedown---------");
				e = e?e:window.event;
				evtHandle(target,e); 
				e.stopPropagation();
				opts.isDown = true;
			}).bind("mouseup", function(e){
				opts.isDown = false;
				//console.log("--------mouseup---------");
				window.setTimeout(opts.mouseupCallback, 200);
			}).bind("mouseout", function(e){
				if(opts.isDown && !opts.toDoc){
					opts.isDown = false;
					window.setTimeout(opts.mouseupCallback, 200);
				}
			});
		};
		init(this);
		bindEvents(this);
		$(this).slider("setValue",options.minValue);
//		if(lgCls.logo == gVar.CtArr[87]){
//			$(".slider-tip").css("color","#000");
//		}
	};
})(jQuery);
 /*************************slider module end****************/ 

/*************************combobox module****************/ 
(function($) {
	var curValue = 0;//The value of the current combobox
	$.fn.rsselect = function(options,param){
		if(typeof options =='string' && options != ""){
			return $.fn.rsselect.methods[options](this,param);
		};
		var defaults = {
				showArrow:false,                 //Whether or not display the drop-down arrow
				isReadonly:true,				 //Whether or not editable
				showBottom:false,				 //Internal use
				selectChange:null,				 //Choose to change the callback
				height:"18px",						 //height
				nearbyEle:'',                        //it cause other element nearby mouseup 
				nearbyEleT:null                  //nearbyEle setTimeout time
		};
		var opts = $.extend({},defaults,options);
		init(this);
		bindEvent(this);
		
		
		function _getValue(target){
			if(lgCls.logo == gVar.CtArr[87]){
				var value = $(target).find(".select_item_selected_c87").attr("value");
			}else{
				var value = $(target).find(".select_item_selected").attr("value");
			}
			return value?value:-1;
		};
		
		function _setValue(target,value){
			if(lgCls.logo == gVar.CtArr[87]){
				$(target).find(".select_item_c87").each(function(){
					if($(this).attr("value") == value){
						$(target).find(".select_item_selected_c87").removeClass("select_item_selected_c87");
						$(this).addClass("select_item_selected_c87");
						$(target).find(".select_text").html($(this).attr("text"));
						curValue = value;
					};
			    });
			}else{
				$(target).find(".select_item").each(function(){
					if($(this).attr("value") == value){
						$(target).find(".select_item_selected").removeClass("select_item_selected");
						$(this).addClass("select_item_selected");
						$(target).find(".select_text").html($(this).attr("text"));
						curValue = value;
					};
				});
			}
		};
		
		function _append(target,items){
			var htmlText = $(target).find(".select_options").html();
			if(lgCls.logo == gVar.CtArr[87]){
				for(var i=0; i<items.length; i++){
					htmlText += '<tr class="select_item_c87" value=' +items[i].value + ' text="' + items[i].text + '"><td>' + items[i].text + '</td></tr>';
				};
			}else{
				for(var i=0; i<items.length; i++){
					htmlText += '<tr class="select_item" value=' +items[i].value + ' text="' + items[i].text + '"><td>' + items[i].text + '</td></tr>';
				};
			}
			
			$(target).find(".select_options").html(htmlText);
			$(target).find("tr").each(function(){
				$(this).mousedown(function(e){
					$(target).find(".select_text").html($(this).attr("text"));

					if(lgCls.logo == gVar.CtArr[87]){
						$(target).find(".select_item_selected_c87").removeClass("select_item_selected_c87");
						$(this).addClass("select_item_selected_c87");
						hideBottom(target);
						var value = $(target).find(".select_item_selected_c87").attr("value");
					}else{
						$(target).find(".select_item_selected").removeClass("select_item_selected");
						$(this).addClass("select_item_selected");
						hideBottom(target);
						var value = $(target).find(".select_item_selected").attr("value");
					}
					
					if(value != curValue){
						if(opts.selectChange != null){
							opts.selectChange();
						}
					}
					curValue = value;
					e.stopPropagation();
				}).mouseover(function(e){
					if(lgCls.logo == gVar.CtArr[87]){
						$(this).addClass("select_item_over_c87");
					}else{
						$(this).addClass("select_item_over");
					}
					e.stopPropagation();
				}).mouseout(function(e){
					if(lgCls.logo == gVar.CtArr[87]){
						$(this).removeClass("select_item_over_c87");
					}else{
						$(this).removeClass("select_item_over");
					}
					e.stopPropagation();
				});
			});
		};
		
		function _setNearbyEle(target,items){
			opts.nearbyEle = items;
		};
		
		$.fn.rsselect.methods = {
			getValue:_getValue,			
			setValue:_setValue,			
			append:_append,
			setNearbyEle:_setNearbyEle
		};
		
		
		function init(target){
			$(target).html(
				'<div class="rs_select" onselectstart="return false;">' + 
					'<div class="select_top">' + 
						'<div class="select_arrow"></div>' +
						'<div class="select_text_box"><span class="select_text"></span></div>' +
					'</div>' +
					'<div class="select_bottom">' + 
						'<table class="select_options"></table>' +
					'</div>' + 
				'</div>'
			);
			if(!opts.showArrow){
				$(target).find(".select_arrow").css("display","none");
				$(target).find(".select_text_box").css("margin-right","0px");
				//$(target).find(".select_top").css("border-radius","4px");
				$(target).find(".select_text").css("line-height",opts.height);
			};
			//$(".select_text").prop("disabled",opts.isReadonly?"disabled":"");
			if(lgCls.logo == gVar.CtArr[87]){
				if(gDevice.devType == devTypeEnum.DEV_IPC){
					$(".select_text").css("color","#00635c");
				}else{
					$(".select_text").css("color","#000");
				}
			}
		};
		
		function scrollToLocation(target) {
			var mainContainer = $(target).find('.select_bottom');
			if(lgCls.logo == gVar.CtArr[87]){
				var scrollToContainer = mainContainer.find('.select_item_selected_c87');
				if(!scrollToContainer.hasClass("select_item_selected_c87"))
					return; 
			}else{
				var scrollToContainer = mainContainer.find('.select_item_selected');
				if(!scrollToContainer.hasClass("select_item_selected"))
					return; 
			}
			mainContainer.scrollTop(scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop() -100);
			//animation effect
			//mainContainer.animate({
			//    scrollTop: scrollToContainer.offset().top - mainContainer.offset().top + mainContainer.scrollTop()
			//}, 200);
		};
		
		function hideBottom(target){
			if(!opts.showBottom)return;
			opts.showBottom = false;
			$(target).find(".select_bottom").css("display","none");
			document.onmousedown = null;
			if(opts.nearbyEle != ''){
				//console.log('rssel------hideBottom--------1');
				//var eleObj = $(opts.nearbyEle);
				//eleObj.attr('rssel',1);
				//eleObj = null;
				
				//prevent element nearby touching its mouseup callback
				opts.nearbyEleT = setTimeout(function(){/*console.log('rssel------setTimeout');*/var eleObjChild = $(opts.nearbyEle+' .rsselNearBy');eleObjChild.remove();eleObjChild = null;},200);
			}
		};
		
		function showBottom(target){
			if(opts.showBottom)return;
			opts.showBottom = true;
			$(target).find(".select_bottom").css("display","block");
			scrollToLocation(target);
			if(document.onmousedown){document.onmousedown();};
			document.onmousedown = function(e){hideBottom(target);};
			if(opts.nearbyEle != ''){
				//console.log('rssel------showBottom--------1');
				if(opts.nearbyEleT){
					//console.log('rssel------clearTimeout');
					clearTimeout(opts.nearbyEleT);
				}
				
				var eleObj = $(opts.nearbyEle);
				//eleObj.attr('rssel',1);
				var ele = document.createElement("div");
				ele.className='rsselNearBy';
				ele.style.height = eleObj.css("height");
				ele.style.width = eleObj.css("width");
				eleObj.append(ele);
				eleObj = null;
			}
		};
		
		function bindEvent(target){
			$(target).find(".select_top").mousedown(function(e){
				if(!opts.showBottom){
					showBottom(target);
				}else{
					hideBottom(target);
				};
				e.stopPropagation();
			});
			$(target).find(".select_top").mouseover(function(e){
				$(this).addClass("select_top_over");
			});
			$(target).find(".select_top").mouseout(function(e){
				$(this).removeClass("select_top_over");
			});
			$(target).find(".select_text").mousedown(function(e){
				if(!opts.isReadonly)
					e.stopPropagation();
			});
			$(target).find(".select_bottom").mousedown(function(e){
				e.stopPropagation();
			});
		};
	};
 })(jQuery);
 /*************************combobox module end****************/


//(function($) {
	var RSBtnStatus = {Normal:0,Hover:1,Down:2,Disabled:3,Pressed:4};
//})(jQuery);

/*************************button module****************/ 
(function($) {
	 $.fn.RSButton = function(options,param){
		if(typeof options =='string' && options != ""){
			return $.fn.RSButton.methods[options](this,param);
		};
		var defaultOptions = {
			width:36,
			height:36,
			posY:0, 
			status:RSBtnStatus.Normal,
			click:function(){},
			mouseup:function(){}
		};
		options = $.extend({},defaultOptions,options);
		$(this).data("options",options);
		
		$.fn.RSButton.methods = {
			setStatus:function(tg,status){
				var opts = $(tg).data("options");
				opts.status = status;
				updateStatus(tg);
			},
			setPosY:function(tg,posY) {
				var opts = $(tg).data("options");
				opts.posY = posY;
				updateStatus(tg);
			},
			getStatus:function(tg){
				var opts = $(tg).data("options");
				return opts.status;
			},
			clickEvent:function(tg){
				var opts = $(tg).data("options");
				opts.click(tg);
			}
		};
		
		function updateStatus(tg) {
			var opts = $(tg).data("options");
			var x;
			var cursor = "pointer";
			if(opts.status == RSBtnStatus.Normal) {
				x = 0 - opts.width*RSBtnStatus.Normal;
			} else if(opts.status == RSBtnStatus.Hover) {
				x = 0 - opts.width*RSBtnStatus.Hover;
			} else if(opts.status == RSBtnStatus.Down || opts.status == RSBtnStatus.Pressed) {
				x = 0 - opts.width*RSBtnStatus.Down;
			} else {
				x = 0 - opts.width*RSBtnStatus.Disabled;
				cursor = "default";
			}
			$(tg).css("background-position",x+"px " + opts.posY + "px").css("cursor",cursor);
		}

		function init(target) {
			var opts = $(target).data("options");
		};
		
		function bindEvents(target){
			var opts = $(target).data("options");
			$(target).bind("mousedown", function(e){
				if(opts.status == RSBtnStatus.Disabled) {
					return;
				}
				if(opts.status != RSBtnStatus.Pressed) {
					$(target).RSButton("setStatus",RSBtnStatus.Down);
				}
				opts.click(target);
			}).bind("mouseover", function(e){
				if(opts.status == RSBtnStatus.Disabled || opts.status == RSBtnStatus.Pressed) {
					return;
				}
				$(target).RSButton("setStatus",RSBtnStatus.Hover);
			}).bind("mouseout", function(e){
				if(opts.status == RSBtnStatus.Disabled || opts.status == RSBtnStatus.Pressed) {
					return;
				}
				$(target).RSButton("setStatus",RSBtnStatus.Normal);
			}).bind("mouseup", function(e){
				if(opts.status == RSBtnStatus.Disabled || opts.status == RSBtnStatus.Pressed) {
					return;
				}
				$(target).RSButton("setStatus",RSBtnStatus.Hover);
				opts.mouseup(target);
			});
		};
		init(this);
		bindEvents(this);
		$(this).RSButton("setStatus",options.status);
	};
})(jQuery);
/*************************button end****************/

/************************* slider module:two set param****************/ 
 (function($) {
	 $.fn.sliderMode = function(options,param){
		if(typeof options =='string' && options != ""){
			return $.fn.sliderMode.methods[options](this,param);
		};

		var defaultOptions = {width:120,height:14,barWidth:9,minValue:0,maxValue:100,mouseupCallback:function(){},
		isDown:false,dragmoveCallback:function(){},toDoc:false,startValue:0,endValue:100,
		time:{isTime:false,startTime:'',endTime:'',timeArr:[]},bCrossDay:false};
		options = $.extend({},defaultOptions,options);
		$(this).data("options",options);
		
		$.fn.sliderMode.methods = {
			getValue:function(tg){
				var opts = $(tg).data("options"); 
				var res = {};
				if(opts.time.isTime){
					res["startValue"] = opts.time.startTime;
					res["endValue"] = opts.time.endTime;
				}else{
					res["startValue"] = opts.startValue;
					res["endValue"] = opts.endValue;
				}
				return res;
			},
			setStartValue:function(tg,startValue){
				var opts = $(tg).data("options");
				if(!opts){//undefined
					return;
				}
				var value = startValue;
				if(opts.time.isTime && typeof value == "string"){
					opts.time.startTime = timeFormat(startValue);
					value = timeToValue(tg,value);
				}
				opts.startValue = value;
				value2posStart(tg,value,true);
			},
			setEndValue:function(tg,endValue){
				var opts = $(tg).data("options");
				if(!opts){//undefined
					return;
				}
				var value = endValue;
				if(opts.time.isTime && typeof value == "string"){
					opts.time.endTime = timeFormat(endValue);
					value = timeToValue(tg,value);
				}
				opts.endValue = value;
				value2posEnd(tg,value,true);
			}
		};
		
		function init(target) {
			var opts = $(target).data("options");
			var silderHtml = '<div style="width:'+(opts.width+41+2*opts.barWidth)+'px; height:14px;margin-top:'+(opts.time.isTime?0:8)+'px;position:relative;" onselectstart="return false;">' +
											'<div class="slider-back" style="width:'+opts.width+'px;position:absolute;top:0;left:'+opts.barWidth+'px;z-index:1;"></div>' +
											'<div class="slider-fore" style="width:'+opts.width+'px;position:absolute;top:0;left:'+opts.barWidth+'px;z-index:10;"></div>' +
											'<div class="slider-backStart" style="width:'+opts.width+'px;position:absolute;top:0;left:'+opts.barWidth+'px;z-index:20;"></div>' +
											'<div class="slider-bar slider-start" style="position:relative;top:0;left:0;z-index:30;"></div>' +
											'<div class="slider-bar slider-end" style="position:absolute;top:0;left:'+opts.width+'px;z-index:30;"></div>' +
											(opts.time.isTime?timeLine(opts.time.timeArr,opts.width,opts.barWidth):'')+
										'</div>';
				
			$(target).addClass('slider').html(silderHtml);
		};
		
		function timeLine(TmArr,width,boundary){
			var html = "";
			var timeArr=TmArr,len = timeArr.length-1,i;
			var singleWidth = parseInt(width/len);
			var childrenWidth = parseInt((singleWidth-1)/2);
			html +='<div style="width:'+width+'px;margin-left:'+boundary+'px">';
			for(i=0;i<len;i++){
				html += '<div class="slider-time" style="width:'+singleWidth+'px;">'+
								  '<div '+(i==(len-1)?'class="last"':'')+'>'+
								      '<div style="width:'+childrenWidth+'px;"></div>'+
								  '</div>'+
								  '<span style="margin-left:'+(-10)+'px;">'+timeArr[i]+'</span>'+
								  (i==(len-1)?'<span style="margin-left:10px;">'+timeArr[len]+'</span>':'')+
							  '</div>';
			}
			html +='</div>';
			
			return html;
		}
		
		function posToTime(target,pos){
			var opts = $(target).data("options");
			var pointerPos = pos;
		    var seconds,Hour,Minute,Second,minutes;
			if(pointerPos <= 0){
				Hour = 0;
				Minute = 0;
			}else if(pointerPos >= opts.width + opts.barWidth){
				Hour = 24;
				Minute = 0;
			}else{
				minutes = (pointerPos-opts.barWidth) * 60 *24/opts.width;
				Hour = minutes / 60;
				Minute = minutes - Math.floor(Hour) * 60;
			}
			
			var strCurTime = "";
			Math.floor(Hour) < 10?(strCurTime += "0" + Math.floor(Hour) + ":"):(strCurTime += Math.floor(Hour) + ":");
			Math.floor(Minute) < 10?(strCurTime += "0" + Math.floor(Minute)):(strCurTime += Math.floor(Minute));
			
			return strCurTime;
		}
		
		function timeToPos(target,time){
			var opts = $(target).data("options");
			var Hour = time.split(":")[0]*1;
			var Minute = time.split(":")[1]*1;
			var pos = Math.floor(((Hour*60+Minute)/(24*60))*opts.width);
			return pos;
		}
		
		function timeToValue(target,time){
			var opts = $(target).data("options");
			var Hour = time.split(":")[0]*1;
			var Minute = time.split(":")[1]*1;
			var value = Math.floor(((Hour*60+Minute)/(24*60))*opts.maxValue);
			return value;
		}
		
		function timeFormat(time){
			var Hour = time.split(":")[0]*1;
			var Minute = time.split(":")[1]*1;
			return ((Math.floor(Hour) < 10?("0"+Hour):Hour)+":"+(Math.floor(Minute) < 10?("0"+Minute):Minute));
		}
		
		function value2posStart(target,value,bSetTime){
			var opts = $(target).data("options");
			var pos,posEnd;
			posEnd = $(target).find(".slider-end").css("left");
			posEnd = parseInt(posEnd);
			if(value < opts.minValue || value > opts.maxValue){
                return;
			} else if(value == opts.maxValue){
                pos = opts.width + opts.barWidth;
			} else if(value == opts.minValue){
                pos = opts.barWidth;
			} else {
				if(value > opts.endValue){
                    opts.bCrossDay = true;
				}else{
                    opts.bCrossDay = false;
				}
				pos = Math.round(((value-opts.minValue)/(opts.maxValue-opts.minValue))*opts.width)+opts.barWidth;
            }

            $(target).find(".slider-backStart").css("width",(pos - opts.barWidth)+"px");
			$(target).find(".slider-start").css("left",(pos - opts.barWidth) + "px");
            if(opts.bCrossDay){
                $(target).find(".slider-back").addClass("crossDay");
                $(target).find(".slider-backStart").css("z-index",5);
            }else{
                $(target).find(".slider-back").removeClass("crossDay");
                $(target).find(".slider-backStart").css("z-index",20);
            }
			if(opts.time.isTime){
				if(!bSetTime){//setStartValue function has Specified time 
					opts.time.startTime = posToTime(target,pos);
				}
				$(target).find(".slider-start").attr('title',opts.time.startTime);
			}else{
				$(target).find(".slider-start").attr('title',value);
			}

			opts.startValue = value;
			return pos;
		};
		
		function value2posEnd(target,value,bSetTime){
			var opts = $(target).data("options");
			var pos,posStart;
			posStart = $(target).find(".slider-start").css("left");
			posStart = parseInt(posStart)+opts.barWidth;
			if(value < opts.minValue || value > opts.maxValue){
                return;
			} else if(value == opts.maxValue) {
				pos = opts.width + opts.barWidth;
            } else if(value == opts.minValue) {
                pos = opts.barWidth;
			} else {
                if(value < opts.startValue){
                    opts.bCrossDay = true;
                }else{
                    opts.bCrossDay = false;
                }
				pos = Math.round((value-opts.minValue)/(opts.maxValue-opts.minValue)*opts.width)+opts.barWidth;
            }
			
			$(target).find(".slider-fore").css("width",pos+"px");
			$(target).find(".slider-end").css("left",pos + "px");
            if(opts.bCrossDay){
                $(target).find(".slider-back").addClass("crossDay");
                $(target).find(".slider-backStart").css("z-index",5);
            }else{
                $(target).find(".slider-back").removeClass("crossDay");
                $(target).find(".slider-backStart").css("z-index",20);
            }
			if(opts.time.isTime){
				if(!bSetTime){//setEndValue function has Specified time 
				    opts.time.endTime = posToTime(target,pos);
				}
				$(target).find(".slider-end").attr('title',opts.time.endTime);
			}else{
				$(target).find(".slider-end").attr('title',value);
			}
			
			opts.endValue = value;
			return pos;
		};
		
		function evtHandleStart(target,e){
			e = e?e:window.event; 
			var opts = $(target).data("options");
			var scrollLeft = getScrollLeft();//when zooms browser ,add bar's length to make pos right
			var posStart = e.clientX + scrollLeft - $(target).find(".slider-back").offset().left;
			opts.dragmoveCallback(value2posStart(target,posStart,false));
		};
		
		function evtHandleEnd(target,e){
			e = e?e:window.event; 
			var opts = $(target).data("options");
			var scrollLeft = getScrollLeft();//when zooms browser ,add bar's length to make pos right
			var posEnd = e.clientX + scrollLeft - $(target).find(".slider-back").offset().left;
			opts.dragmoveCallback(value2posEnd(target,posEnd,false));
		};
		
		function evtHandle(eleClass,target,e){
			if(eleClass == "slider-start"){
				evtHandleStart(target,e)
			}else if(eleClass == "slider-end"){
				evtHandleEnd(target,e)
			}
		}
		
		function sliderMove(eleClass,target,e){e = e?e:window.event;  evtHandle(eleClass,target,e);};
		function sliderStop(eleClass,target,e){e = e?e:window.event; evtHandle(eleClass,target,e);document.onmousemove = null;document.onmouseup   = null;};
		function bindEvents(target){
			var opts = $(target).data("options");
			$(target).find(".slider-start").bind("mousedown", function(e){
				e = e?e:window.event; 
				document.onmousemove = function(evt){sliderMove("slider-start",target,evt);};
				document.onmouseup   = function (evt) {if(opts.toDoc){opts.isDown = false;window.setTimeout(opts.mouseupCallback, 200);}sliderStop("slider-start",target,evt);};
				e.stopPropagation();
				opts.isDown = true;
			}).bind("mouseup", function(e){
				opts.isDown = false;
				window.setTimeout(opts.mouseupCallback, 200);
			}).bind("mouseout", function(e){
				if(opts.isDown && !opts.toDoc){
					opts.isDown = false;
					window.setTimeout(opts.mouseupCallback, 200);
				}
			});
			
			$(target).find(".slider-end").bind("mousedown", function(e){
				e = e?e:window.event; 
				document.onmousemove = function(evt){sliderMove("slider-end",target,evt);};
				document.onmouseup   = function (evt) {if(opts.toDoc){opts.isDown = false;window.setTimeout(opts.mouseupCallback, 200);}sliderStop("slider-end",target,evt);};
				e.stopPropagation();
				opts.isDown = true;
			}).bind("mouseup", function(e){
				opts.isDown = false;
				window.setTimeout(opts.mouseupCallback, 200);
			}).bind("mouseout", function(e){
				if(opts.isDown && !opts.toDoc){
					opts.isDown = false;
					window.setTimeout(opts.mouseupCallback, 200);
				}
			});
		};
		init(this);
		bindEvents(this);
		$(this).sliderMode("setStartValue",options.minValue);
		$(this).sliderMode("setEndValue",options.maxValue);
	};
})(jQuery);
 /*************************slider module end****************/ 