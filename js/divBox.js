// JavaScript Document
(function($){
	$.fn.divBox = function(options){
		
		var opts = jQuery.extend({},jQuery.fn.divBox.defaults, options);
		function initHTML(e){
			var strHTML = "";
			var nMax = opts.number - 1,i,n=0,brNum=0;
			for (i=0; i<nMax; i++,n++){
				if(opts.mulType){
                    if(i % 16 ==15){
                        strHTML += ("<div class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;overflow:hidden;width:"+opts.width+"px; border:1px solid "+opts.borderColor+";text-align:center;line-height:22px;'>"+(n+1)+"</div>");
                        strHTML += ("<br/>");
                        brNum +=1;
                        if(i==(nMax-1)){n=-1;}
                        continue;
                    }
				}else{
                    if(	(i<=gDevice.loginRsp.AnalogChNum && i % 16 ==15) ||
                        (i-gDevice.loginRsp.AnalogChNum)%16 ==15 ||
                        (i==(gDevice.loginRsp.AnalogChNum-1))
                    ){
                        strHTML += ("<div class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;overflow:hidden;width:"+opts.width+"px; border:1px solid "+opts.borderColor+";text-align:center;line-height:22px;'>"+(n+1)+"</div>");
                        strHTML += ("<br/>");
                        brNum +=1;
                        if(i==(gDevice.loginRsp.AnalogChNum-1)){n=-1;}
                        continue;
                    }
				}

				strHTML += ("<div class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;overflow:hidden;width:"+opts.width+"px; border:1px solid "+opts.borderColor+";border-right:none;text-align:center ;line-height:22px;-moz-user-select: none;'>"+(n+1)+"</div>");
			}
			strHTML += ("<div class='"+opts.nclass+"' style='height:"+opts.height+"px;float:left;overflow:hidden;width:"+opts.width+"px; border:1px solid "+opts.borderColor+";text-align:center; line-height:22px;-moz-user-select: none;'>"+(n+1)+"</div>");
			if (!$("#"+opts.bDownID)[0]){
				strHTML +=("<p id='"+opts.bDownID+"' style='width:0px; height:0px; overflow:hidden; -moz-user-select: none;'></p>");
			}
			e.css("height",(brNum+1)*30+'px');
			if(opts.parentLev >0){
				var obj=e,p;
				if(opts.mulType){
                    obj = $(obj.parent());
				}else{
                    if(gDevice.loginRsp.AnalogChNum>0){
                        for(p=0;p<opts.parentLev;p++){
                            obj = $(obj.parent());
                        }
                    }else{
                        obj = $(obj.parent());
                    }
				}

			    $(obj).css("height",(brNum+1)*30+'px');
				obj=null;
			}
			e.prop("innerHTML", strHTML);
		}
		
		return this.each(function() {
			initHTML($(this));
			opts.bDownID = "#"+opts.bDownID;
			$("#"+$(this).attr("id") + ">div").mouseover(function(){
                var bDisabled = false;
				if(opts.mulType){
                    bDisabled = $(this).attr("disabled");
				}
				if (!opts.bEnable) return;
				$(this).css("cursor", "pointer");
				if(opts.mulType){
                    if(bDisabled != 'disabled'){
                        if ($(opts.bDownID).attr("name") == "down"){
                            if (($(this).css("background-color")).replace(/[ ]/g,"") != (opts.bkColor).replace(/[ ]/g,"")){
                                $(this).css("background-color", opts.bkColor);
                            }else{
                                $(this).css("background-color", opts.parentColor);
                            }
                        }
                    }
				}else{
                    if ($(opts.bDownID).attr("name") == "down"){
                        if (($(this).css("background-color")).replace(/[ ]/g,"") != (opts.bkColor).replace(/[ ]/g,"")){
                            $(this).css("background-color", opts.bkColor);
                        }else{
                            $(this).css("background-color", opts.parentColor);
                        }
                    }
				}
			}).mousedown(function(){
				if (!opts.bEnable) return;
				$(opts.bDownID).attr("name", "down");
				$(this).css("cursor", "pointer");
                var bDisabled = $(this).attr("disabled");
                if(opts.mulType){
                    if(bDisabled != 'disabled'){
                        $(this).css("cursor", "pointer");
                        if (($(this).css("background-color")).replace(/[ ]/g,"") != (opts.bkColor).replace(/[ ]/g,"")){
                            $(this).css("background-color", opts.bkColor);
                        }else{
                            $(this).css("background-color", opts.parentColor);
                        }
                    }
				}else{
                    if (($(this).css("background-color")).replace(/[ ]/g,"") != (opts.bkColor).replace(/[ ]/g,"")){
                        $(this).css("background-color", opts.bkColor);
                    }else{
                        $(this).css("background-color", opts.parentColor);
                    }
				}
			}).mouseup(function(){
				$(opts.bDownID).attr("name", "")
			});
			$(document).mouseup(function(){
				$(opts.bDownID).attr("name", "")
			});
		});  
	};
	jQuery.fn.divBox.defaults = {
		borderColor: "#1e3b56",
		parentColor: "transparent",
		bkColor:"#f00",
		height: 22,
		width: 24,
		number:24,
		nclass:"",
		bDownID:"bDownIDNew",
		bEnable:true,
		parentLev:0,
		mulType:false//mulchannel divbox
	};
})(jQuery);

//timer
(function($){
	$.fn.timer = function(options){		
		var opts = jQuery.extend({},jQuery.fn.timer.defaults, options);
		$(this).data("bRunTime", opts.bRunTime);
		
		return this.each(function() {
			jQuery.fn.timer.InsertHtml($(this), opts.Type, opts.hasSecond);
		});		
	};
	
	jQuery.fn.timer.fnRun = function(obj,objDate){
		var id = obj.attr("id");
		gVar.runTime.hour = $("#"+id+"_Hour").val()*1;
		gVar.runTime.minute = $("#"+id+"_Min").val()*1;
		gVar.runTime.second = $("#"+id+"_Sec").val()*1;
		gVar.runTime.bSecRun = true;
		gVar.runTime.bIEChangeTime = 0;

		clearInterval(gVar.runTime.timerID);
		gVar.runTime.timerID = setInterval(function(){
			jQuery.fn.timer.fnRunTime(obj,objDate);
		},1000);
	}
	
	jQuery.fn.timer.fnRunTime = function(obj,objDate){
		var id = obj.attr("id");
		
		//secend+
		++gVar.runTime.second;
		if(gVar.runTime.bSecRun){
			$("#"+id+"_Sec").val(gVar.runTime.second);
		}
		
		if(gVar.runTime.second >= 60){
			//Minute+
			$("#"+id+"_Sec").val(gVar.runTime.second = 0);
			$("#"+id+"_Min").val(++gVar.runTime.minute);
			if(gVar.runTime.minute >= 60){
				//Hour+
				$("#"+id+"_Min").val(gVar.runTime.minute = 0);
				$("#"+id+"_Hour").val(++gVar.runTime.hour);
				
				var bAddDAy = false;
				if($("#"+id+"_Type").css("display") != "none"){//According to AM and PM, 12 hours
					if(gVar.runTime.hour >= 12){
						$("#"+id+"_Hour").val(gVar.runTime.hour = 0);
						if($("#"+id+"_Type").val()*1 == 0){//AM
							$("#"+id+"_Type").val(1);//-->PM
						}else{
							$("#"+id+"_Type").val(0);//-->AM
							bAddDAy = true;
						}
					}
				}else{//24-hour
					if(gVar.runTime.hour >= 24){
						$("#"+id+"_Hour").val(gVar.runTime.hour = 0);
						bAddDAy = true;
					}
				}
				
				//Day +
				if(bAddDAy){
					var time = objDate.attr("grecal");
					var year =  time.split("-")[0]*1;
					var month = time.split("-")[1]*1;
					var day =   time.split("-")[2]*1;
					
					var newTime = year+"/"+month+"/"+(day+1);
					objDate.val(objDate.simpleDatepicker.formatOutput(new Date(newTime), true));
					objDate.attr("grecal",objDate.simpleDatepicker.formatOutput(new Date(newTime), false));
				}
			}
		}
	}
	
	jQuery.fn.timer.InsertHtml = function(obj, type, hasSecond){
		var id = obj.attr("id");
		var strHTML1="",strHTML2="";
		
		for (var i=0; i<60; i++){
			strHTML1 += '<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>';
		}
		
		if (type == 0){ //12
			strHTML2 += '<option value="0">12</option>';
			for (var i=1; i<12; i++){
				strHTML2 += '<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>';
			}
		}else{	//24
			for (var i=0; i<24; i++){
				strHTML2 += '<option value="'+i+'">'+((""+i).length<2?"0"+i:i)+'</option>';
			}
		}
		var displaysecond = "";
		if(hasSecond == false){
			displaysecond = " style='display:none;'"
		}
		var strHTML = ("<table class='timer'>\
							<tr>\
								<td>\
									<div>\
										<select id='"+id+"_Hour' class='timerHour'>"+strHTML2+"</select>\
									</div>\
									<td>:</td>\
								</td>\
								<td>\
									<div>\
										<select id='"+id+"_Min' class='timerMin'>"+strHTML1+"</select>\
									</div>\
									<td "+displaysecond+">:</td>\
								</td>\
								<td>\
									<div "+displaysecond+">\
										<select id='"+id+"_Sec' class='timerSec'>"+strHTML1+"</select>\
									</div>\
								</td>\
								<th>\
									<div>\
										<select id='"+id+"_Type' class='timerType' style='width:50px;'>\
											<option value='0'>AM</option>\
											<option value='1'>PM</option>\
										</select>\
									</div>\
								</th>\
							</tr>\
						</table>");
		obj.prop("innerHTML", strHTML);
		if (type == 0){
			$("#"+id+"_Type").css("display", "block");
		}else{
			$("#"+id+"_Type").css("display", "none");
		}

		if ($.browser.msie && $.browser.version.split(".")[0] * 1 <= 9) {
			$('#' + id + '_Type').addClass("IE9Select");
		}
		
		if(obj.data("bRunTime")*1){
			$("#"+id+"_Hour").change(function(){//
				gVar.runTime.hour = $(this).val()*1;
				gVar.runTime.bIEChangeTime = 1;
			});
			$("#"+id+"_Min").change(function(){//
				gVar.runTime.minute = $(this).val()*1;
				gVar.runTime.bIEChangeTime = 1;
			});
			$("#"+id+"_Sec").change(function(){//
				gVar.runTime.second = $(this).val()*1;
				gVar.runTime.bIEChangeTime = 1;
			}).click(function(e){
				gVar.runTime.bSecRun = !gVar.runTime.bSecRun;
				//Cancel the bubbling
				if(e && e.stopPropagation){
					e.stopPropagation();//not IE
				}else{
					window.event.cancelBubble = true;//IE
				}
			});
		}
		
		$("#"+id+"_Type").change(function(){//AM、PM
			gVar.runTime.bIEChangeTime = 1;
		});
	}
	
	jQuery.fn.timer.GetTimeFor24 = function(obj){
		var id = obj.attr("id");
		var timerHour = $("#"+id+"_Hour").val()*1;
		var timerMin = $("#"+id+"_Min").val()*1;
		var timerSec = $("#"+id+"_Sec").val()*1;
		var zs = $("#"+id+"_Type").val()*1;
		if ($("#"+id+"_Type").css("display") != "none"){//12
			if (zs == 0){ //am
				return (timerHour+ ":" + timerMin + ":" + timerSec);
			}else{
				return ((timerHour+12)+ ":" + timerMin + ":" + timerSec);
			}
		}else{
			return (timerHour+ ":" + timerMin + ":" + timerSec);
		}
	}
	
	jQuery.fn.timer.SetTimeIn24 = function(time, obj,hasSecond){
		var id = obj.attr("id");
		var timerHour = time.split(":")[0]*1;
		var timerMin = time.split(":")[1]*1;
		var timerSec = time.split(":")[2]*1;
		$.fn.timer.InsertHtml(obj, 1,hasSecond);	
		$("#"+id+"_Hour").val(timerHour);
		$("#"+id+"_Min").val(timerMin);
		$("#"+id+"_Sec").val(timerSec);
	}
    jQuery.fn.timer.SetTimeIn24Two = function(time, obj,hasSecond){
        var id = obj.attr("id");
        var timerHour = time.split(":")[0]*1;
        var timerMin = time.split(":")[1]*1;
        var timerSec = time.split(":")[2]*1;
        // $.fn.timer.InsertHtml(obj, 1,hasSecond);
        $("#"+id+"_Hour").val(timerHour);
        $("#"+id+"_Min").val(timerMin);
        $("#"+id+"_Sec").val(timerSec);
    }

	jQuery.fn.timer.ChangeType = function (type, obj,hasSecond) {
		var id = obj.attr("id");
		var timerHour = $("#"+id+"_Hour").val()*1;
		var timerMin = $("#"+id+"_Min").val()*1;
		var timerSec = $("#"+id+"_Sec").val()*1;
		var zs = $("#"+id+"_Type").val()*1;
		//redraw timer
		$.fn.timer.InsertHtml(obj, type,hasSecond)
		
		//time calculation
		if (type == 1){	//12 -> 24
			$("#"+id+"_Type").css("display", "none");
			if (zs == 0){	//AM
				$("#"+id+"_Hour").val(timerHour);
			}else{	//PM
				$("#"+id+"_Hour").val(timerHour+12);
			}
		}else {	//24 -> 12
			$("#"+id+"_Type").css("display", "block");
			if (timerHour < 12){	//AM
				$("#"+id+"_Type").val(0);
				$("#"+id+"_Hour").val(timerHour);
			}else {	//PM
				$("#"+id+"_Type").val(1);
				$("#"+id+"_Hour").val(timerHour-12);
			}
		}
		
		$("#"+id+"_Min").val(timerMin)
		$("#"+id+"_Sec").val(timerSec)
	};
	
	jQuery.fn.timer.defaults = {
		Type:0,	//0----12 hours, 1------24 hours
		hasSecond:true,//Whether show seconds
		bRunTime:false//0:false,1:true
	};
})(jQuery);

//color
(function($,w){
	var _colorData = {};
	var _bSupportCanvas;
	if(typeof _bSupportCanvas == "undefined"){
		_bSupportCanvas = w.canvasSupport();
	}
	$.fn.colorBox = function(options){
		var idTemp = $(this).attr("id");
		jQuery.fn.colorBox.defaults.cId = idTemp;
		jQuery.fn.colorBox.defaults.colorPlateVal = _switchToRGB(jQuery.fn.colorBox.defaults.colorVal);
		var opts = jQuery.extend({},jQuery.fn.colorBox.defaults, options);
		_init(opts);
		_addEvent(opts);
		_initCanvas(opts);
		_colorData[idTemp] = opts;
		idTemp = null;
	};
	$.fn.colorBox.getColorVal = function(cId){
		var opts = _colorData[cId];
		return _switchToRGB(opts.colorVal);
	};
	$.fn.colorBox.setColorVal = function(cId,rgb){
		var str = _switchRGBToStr(rgb);
		var opts = _colorData[cId];
		if(_bSupportCanvas){
			_calColorPlateSelps(opts,str);
		}else{
			opts.colorVal = str;
			_drawColorVal(opts);
		}
		$("#"+opts.cId+" .colorSel").css("background",opts.colorVal);
	};
	
	function _init(opts){
		var ht;
		if(_bSupportCanvas){
			ht = '<div class="colorSel"></div>'
				   +'<div class="colorContent">'
					   +'<div class="colorPlate">'
						   +'<canvas width="'+opts.colorplateW+'" height="'+opts.colorplateH+'"></canvas>'
					   +'</div>'
					   +'<div class="colorPlateSelect">'
						   +'<canvas width="'+opts.colorSelW+'" height="'+opts.colorSelH+'"></canvas>'
						   +'<div class="colorPoint"></div>'
					   +'</div>'
					   +'<div class="colorPlateVal">'
						   +'<div class="colorShow"></div>'
						   +'<div class="colorText">'
							   +'<label>#</label>'
							   +'<input class="colorValue" type="text"></input>'
						   +'</div>'
					   +'</div>'
				   +'</div>';
		}else{
			ht = '<div class="colorSel"></div>'
				   +'<div class="colorContent" style="height:35px;">'
					   +'<div class="colorPlateVal">'
						   +'<div class="colorShow"></div>'
						   +'<div class="colorText">'
							   +'<label>#</label>'
							   +'<input class="colorValue" type="text"></input>'
						   +'</div>'
					   +'</div>'
				   +'</div>';
		}
		
		$("#"+opts.cId).addClass("colorSet");
		$("#"+opts.cId).append(ht);
	};
	
	function _initCanvas(opts){
		$("#"+opts.cId+" .colorSel").css("background",opts.colorVal);
		
		if(_bSupportCanvas){
			var cav = $("#"+opts.cId+" .colorPlate canvas")[0];
			var ctx = cav.getContext("2d");
			_drawColorPlate(ctx,opts);
			
			cav = $("#"+opts.cId+" .colorPlateSelect canvas")[0];
			ctx = cav.getContext("2d");
			_drawColorSel(ctx,opts);
		}
		
		_drawColorVal(opts);
	};
	
	function _addEvent(opts){
		//color sel
		$("#"+opts.cId+" .colorSel").mousedown(function(e){
			if(opts.bShow){
				_hideColorBox(opts);
				document.onmousedown = null;
			}else{
				_showColorBox(opts);
				e.stopPropagation();
				document.onmousedown = function(e) {
					if(!opts.bInBox){
						_hideColorBox(opts);
					}
				};
			}
		});
		
		//color content
		$("#"+opts.cId+" .colorContent").mouseover(function(){
			opts.bInBox = true;
		}).mouseleave(function(){
			opts.bInBox = false;
			if(opts.bSelectOpt){opts.bSelectOpt = false;}
		}).mouseup(function(e){
			if(opts.bSelectOpt){opts.bSelectOpt = false;}
		});
		
		//color plate
		$("#"+opts.cId+" .colorPlate canvas").mousedown(function(e){
			var $obj = $(this);
			var scrollTop = getScrollTop();
			var scrollLeft = getScrollLeft();
			opts.colorPlateX = scrollLeft+e.clientX - $obj.offset().left;
			opts.colorPlateY = scrollTop+e.clientY - $obj.offset().top;
			
			var cav = $obj[0];
			var ctx=cav.getContext("2d");
			_drawColorPlate(ctx,opts);
			_getColorPix(ctx,opts,opts.colorPlateX,opts.colorPlateY,opts.colorplateW,opts.colorplateH);
			
			cav = $("#"+opts.cId+" .colorPlateSelect canvas")[0];
			ctx=cav.getContext("2d");
			_drawColorSel(ctx,opts);
			_getColorPix(ctx,opts,opts.colorSelW*0.5,opts.colorPlateSelpt,opts.colorSelW,opts.colorSelH);
			
			_drawColorVal(opts);
			
			$obj = null;
		});
		
		//color select
		$("#"+opts.cId+" .colorPlateSelect canvas").mousedown(function(e){
			var $obj = $(this);
			var scrollTop = getScrollTop();
			opts.colorPlateSelpt = scrollTop + e.clientY - $obj.offset().top;
			
			var cav = $("#"+opts.cId+" .colorPlate canvas")[0];
			var ctx=cav.getContext("2d");
			_drawColorPlate(ctx,opts);
			_getColorPix(ctx,opts,opts.colorPlateX,opts.colorPlateY,opts.colorplateW,opts.colorplateH);
			
			cav = $obj[0];
			ctx=cav.getContext("2d");
			_drawColorSel(ctx,opts);
			_getColorPix(ctx,opts,opts.colorSelW*0.5,opts.colorPlateSelpt,opts.colorSelW,opts.colorSelH);
			
			_drawColorVal(opts);
			
			$obj = null;
		});
		
		//colorPlateSelect
		$("#"+opts.cId+" .colorPlateSelect").mousemove(function(e){
			if(opts.bSelectOpt){
				var $obj = $("#"+opts.cId+" .colorPlateSelect canvas");
				var scrollTop = getScrollTop();
				opts.colorPlateSelpt = scrollTop + e.clientY - $obj.offset().top;
				if(opts.colorPlateSelpt <= 0 ){
					opts.colorPlateSelpt = 0;
				}else if(opts.colorPlateSelpt >=opts.colorSelH){
					opts.colorPlateSelpt = opts.colorSelH;
				}
				var cav = $obj[0];
				var ctx=cav.getContext("2d");
				_getColorPix(ctx,opts,opts.colorSelW*0.5,opts.colorPlateSelpt,opts.colorSelW,opts.colorSelH)
				$("#"+opts.cId+" .colorPoint").css("top",(opts.colorPlateSelpt-6)+"px");
				_drawColorVal(opts);
			}
		})
		
		//color select colorPoint
		$("#"+opts.cId+" .colorPoint").mousedown(function(){
			opts.bSelectOpt = true;
		}).mouseup(function(e){
			if(opts.bSelectOpt){opts.bSelectOpt = false;}
		});
		
		//color set
		$("#"+opts.cId+" .colorValue").keyup(function(){
			var $obj = $(this);
			var val = $obj.val();
			$obj = null;
			if(val.length != 3 && val.length != 6){
				return ;
			}
			var str = "#"+val;
			if(_bSupportCanvas){
				_calColorPlateSelps(opts,str);
			}else{
				opts.colorVal = str;
				_drawColorVal(opts);
			}
		});
	};
	
	function _hideColorBox(opts){
		opts.bShow = false;
		$("#"+opts.cId+" .colorSel").css("background",opts.colorVal);
		$("#"+opts.cId+" .colorContent").css("display","none");
	};
	
	function _showColorBox(opts){
		opts.bShow = true;
		$("#"+opts.cId+" .colorContent").css("display","block");
	}
	
	function _drawColorPlate(context,opts){
		context.clearRect(0,0,opts.colorplateW,opts.colorplateH);
		var lineGradient = context.createLinearGradient(0,0,opts.colorplateW,0);
		lineGradient.addColorStop(0,"rgb(255,0,0)");
		lineGradient.addColorStop(1/6,"rgb(255,255,0)");
		lineGradient.addColorStop(2/6,"rgb(0,255,0)");
		lineGradient.addColorStop(3/6,"rgb(0,255,255)");
		lineGradient.addColorStop(4/6,"rgb(0,0,255)");
		lineGradient.addColorStop(5/6,"rgb(255,0,255)");
		lineGradient.addColorStop(1,"rgb(255,0,0)");
		context.fillStyle = lineGradient;
		context.fillRect(0,0,opts.colorplateW,opts.colorplateH);
		
		var lineGradient1 = context.createLinearGradient(0,0,0,opts.colorplateH);
		lineGradient1.addColorStop(0,"rgba(127,127,127,0)");
		lineGradient1.addColorStop(1,"rgba(127,127,127,1)");
		context.fillStyle = lineGradient1;
		context.fillRect(0,0,opts.colorplateW,opts.colorplateH);
		
		context.beginPath();
		context.arc(opts.colorPlateX,opts.colorPlateY,2,0,2*Math.PI,true);
		context.strokeStyle ="#fff";
		context.stroke();
	}
	
	function _drawColorSel(context,opts){
		context.clearRect(0,0,opts.colorSelW,opts.colorSelH);
		context.fillStyle = "rgb("+opts.colorPlateVal[0]+","+opts.colorPlateVal[1]+","+opts.colorPlateVal[2]+")";
		context.fillRect(0,0,opts.colorSelW,opts.colorSelH);//ctx.fillRect(x,y,width,height);   
		var lineGradient = context.createLinearGradient(0,0,0,opts.colorSelH);//createLinearGradient(x0,y0,x1,y1)
		lineGradient.addColorStop(0.01,"rgba(255,255,255,1)");
		lineGradient.addColorStop(0.49,"rgba(255,255,255,0)");
		lineGradient.addColorStop(0.51,"rgba(0,0,0,0)");
		lineGradient.addColorStop(0.99,"rgba(0,0,0,1)");
		context.fillStyle = lineGradient;
		context.fillRect(0,0,opts.colorSelW,opts.colorSelH);
		
		$("#"+opts.cId+" .colorPoint").css("top",(opts.colorPlateSelpt-6)+"px");
	};
	
	function _drawColorVal(opts){
		$("#"+opts.cId+" .colorShow").css("background",opts.colorVal);
		$("#"+opts.cId+" .colorValue").val(opts.colorVal.split("#")[1]);
	};
	
	function _getColorPix(context,opts,ptX,ptY,pRectW,pRectH){
		var imgData=context.getImageData(ptX,ptY,pRectW,pRectH);
		var red=imgData.data[0];
		var green=imgData.data[1];
		var blue=imgData.data[2];
		
		if(pRectW == opts.colorplateW){
			opts.colorPlateVal[0] = red;
			opts.colorPlateVal[1] = green;
			opts.colorPlateVal[2] = blue;
		}else if(pRectW == opts.colorSelW){
			opts.colorVal = _switchRGBToStr(imgData.data);
		}
	};
	
	//color Sel --->#fff->colorPlateSelpt,colorPlateX,colorPlateY
	function _calColorPlateSelps(opts,str){
		var rgb = _switchToRGB(str);
		var hls = _rgbTohls(rgb);
		var x = Math.round((hls[0] / 239) *(opts.colorplateW - 1));
		var y = Math.round((1-hls[2] / 240)*(opts.colorplateH - 1));
		var z = Math.round((1-hls[1] / 240)*(opts.colorplateH - 1));
		opts.colorPlateX = x;
		opts.colorPlateY = y;
		var cav = $("#"+opts.cId+" .colorPlate canvas")[0];
		var ctx=cav.getContext("2d");
		_drawColorPlate(ctx,opts);
		_getColorPix(ctx,opts,x,y,opts.colorplateW,opts.colorplateH);
		
		opts.colorPlateSelpt = z;
		cav = $("#"+opts.cId+" .colorPlateSelect canvas")[0];
		ctx=cav.getContext("2d");
		_drawColorSel(ctx,opts);
		
		opts.colorVal = str;
		_drawColorVal(opts);
	}
	
	function _switchToRGB(str){//#ffffff->rgb(255,255,255)
		var temp=str.split("#")[1];
		var r = 0;
		var g = 0;
		var b = 0;
		if(temp.length == 3){
			r = parseInt(temp[0]+temp[0],16);
			g = parseInt(temp[1]+temp[1],16);
			b = parseInt(temp[2]+temp[2],16);
		}else if(temp.length == 6){
			r = parseInt(temp[0]+temp[1],16);
			g = parseInt(temp[2]+temp[3],16);
			b = parseInt(temp[4]+temp[5],16);
		}
		return [r,g,b];
	};
	
	function _switchRGBToStr(rgb){
		var red = rgb[0].toString(16);
		var green = rgb[1].toString(16);
		var blue = rgb[2].toString(16);
		if(red.length <= 1){
			red = "0"+red;
		}
		if(green.length <= 1){
			green = "0"+green;
		}
		if(blue.length <= 1){
			blue = "0"+blue;
		}
		return ("#"+red+green+blue);
	}
	
	function _rgbTohls(rgb){
		var r = rgb[0]/255;
		var g = rgb[1]/255;
		var b = rgb[2]/255;
		var minV = Math.min(Math.min(r,g),b);
		var maxV = Math.max(Math.max(r,g),b);
		var diff = maxV - minV;
		var l = (maxV + minV)*0.5;
		var h = 0;
		var s = 0;
		if(r== g && r==b){return [h,240 * l,s];}
		if (diff < (1e-6)) { return [h,l,s];}
		if(l <= 0.5){
			s = diff/(maxV+minV);
		}else{
			s = diff/(2-maxV-minV);
		}
		var rd = (maxV - r)/diff;
		var gd = (maxV - g)/diff;
		var bd = (maxV - b)/diff;
		if(r == maxV){
			h = bd - gd;
		}else if(g == maxV){
			h = 2+rd - bd;
		}else if(b == maxV){
			h = 4+gd - rd;
		}
		h = h<0?(h+6):h;

		return [
			40*h,
			240 * l,
			240 * s
		];
	};
	
	jQuery.fn.colorBox.defaults = {
		cId:"",//color Id
		bShow:false,//show color box
		bInBox:false, // mouse in box
		bInOpt:false,//mouse in colorPointClass
		bSelectOpt:false,//mouse use colorPointClass
		colorplateW:156,//color plate
		colorplateH:110,
		colorPlateX:0,//color plate x
		colorPlateY:0,//color plate y
		colorPlateVal:"",//color plate
		colorSelW:20, //color set
		colorSelH:110,
		colorPlateSelpt:55,//color select positioin
		colorVal:"#ff0000"//color
	};
})(jQuery,window);