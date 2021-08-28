// JavaScript Document
var gCurDate; //The current calendar display (date) (month) (year)   day default

function CalSearchByMon() { //All of the currently selected channel search for month
	var RecordType = $("#recordType").val() * 1;
	if(gDevice.devType == devTypeEnum.DEV_IPC){
		RecordType=0
	}
	var strTime = gCurDate.split('-');
	//strTime += gCurDate.substring(4, strTime.length);
	var time = {};
	var Begin = {};
	Begin["Year"] = parseInt(strTime[0]);
	Begin["Month"] = parseInt(strTime[1]);
	Begin["Day"] = 1;
	var End = Begin;
	End["Day"] = (new Date(strTime[0], strTime[1], 0)).getDate(); //Get number of days during the month

	time["Begin"] = Begin;
	time["End"] = End;
	var ret = gDevice.SearchByMon(RecordType, time,$("#pbStream").val()*1);
	if(ret == "-1") {} else if(ret == "-2") {
		ShowPaop(lg.get("IDS_REPLAY"), lg.get("IDS_CUR_PLAY"));
	}
}

function PluginsMove(obj) {
	$("#ipcocx").css({
		"left": (obj.offset().left - $("#IndexObj").offset().left),
		"top": (obj.offset().top - $("#IndexObj").offset().top),
		"width": obj.css("width"),
		"height": obj.css("height"),
		"position": "relative"
	});
	$("#ipcocx").attr("width", obj.css("width")).attr("height", obj.css("height"));
	$("#IndexObj").css({
		"width": "0px",
		"height": "0px"
	});
}

function SetResize(page) {
	var w1 = document.body.offsetWidth;
	var h1 = document.body.offsetHeight;
	var blankWidth = 60; //The width of about 2 side set aside
	var header = $(".header").height() + 10;
	var mfootHeight = $(".mfoot").height();
	switch(page) {
		case "live":
			{
				var w2 = w1 - blankWidth * 2;
				document.getElementById("live").style.width = w2 + "px";
				var h2 = h1 - header - mfootHeight;
				document.getElementById("live").style.height = h2 + "px";

				if(!$.browser.msie) {
					PluginsMove($("#liveOcx"));
				}
			}
			break;
		case "playback":
			{
				var w2 = w1 - blankWidth * 2;
				document.getElementById("playback").style.width = w2 + "px";
				var h2 = h1 - header - mfootHeight;
				document.getElementById("playback").style.height = h2 + "px";

				if(!$.browser.msie) {
					PluginsMove($("#playbackOcx"));
				}
			}
			break;
		case "config":
			{
				var w2 = w1 - blankWidth * 2;
				document.getElementById("config").style.width = w2 + "px";
				var h2 = h1 - header - mfootHeight;
				document.getElementById("config").style.height = h2 + "px";

				if(!$.browser.msie) {
					PluginsMove($("#IndexObj"));
				}
//				if(!$.browser.msie && gVar.childPage != "") {//Browser zoom
//			  	   SetResize(gVar.childPage);
//				}
			}
			break;
		case "pathConfig":
			{
				var w2 = w1 - blankWidth * 2;
				document.getElementById("pathConfig").style.width = w2 + "px";
				var h2 = h1 - header - mfootHeight;
				document.getElementById("pathConfig").style.height = h2 + "px";

				if(!$.browser.msie) {
					PluginsMove($("#IndexObj"));
				}
			}
			break;

		case "chn_live":
			{
				if(!$.browser.msie) {
					PluginsMove($("#Vidoeposition"));
				}
			}
			break;
		case "Img_Ctrl":
			{
				if(!$.browser.msie) {
					PluginsMove($("#Vidoecamera"));
				}
			}
			break;
		case "chn_sp":
			{
				if(!$.browser.msie) {
					PluginsMove($("#Vidoeshelter"));
				}
			}
			break;
		case "chn_roi":
			{
				if(!$.browser.msie) {
					PluginsMove($("#VideoRoi"));
				}
			}
			break;
		case "alarm_mv":
			{
				if(!$.browser.msie) {
					PluginsMove($("#MotionSP"));
				}
			}
			break;
		case "Perimeter_Line":
			{
				if(!$.browser.msie) {
					PluginsMove($("#PL_Rect"));
				}
			}
			break;
		case "Perimeter_Zone":
			{
				if(!$.browser.msie) {
					PluginsMove($("#PZ_Rect"));
				}
			}
			break;
		case "GoodsLost_Legacy":
			{
				if(!$.browser.msie) {
					PluginsMove($("#GLL_Rect"));
				}
			}
			break;
		case "mobile_stream_set":
			{
				if(!$.browser.msie) {
					//PluginsMove($("#mobi_video"));//Is displayed by the parameter judgment, not shown here
				}
			}
			break;
		case "Human_Detection":
			{
				if(!$.browser.msie) {
					PluginsMove($("#PD_Rect"));
				}
			}
			break;
		case "Face_Detection":
			{
				if(!$.browser.msie) {
					PluginsMove($("#FD_Rect"));
				}
			}
			break;
		case "People_Cross_Counting":
			{
				if(!$.browser.msie) {
					PluginsMove($("#CC_Rect"));
				}
			}
			break;
		case "alarm_pir":
			{
				if(!$.browser.msie) {
					PluginsMove($("#Pir_SP"));
				}
			}
			break;
		case "Intrusion_Detection":
			{
				if(!$.browser.msie) {
					PluginsMove($("#ID_Rect"));
				}
			}
			break;
		case "Type_Meter_Recognition":
			{
				if(!$.browser.msie) {
					PluginsMove($("#TMR_Rect"));
				}
			}
			break;
		case "IntelligentNewUser":
			{
				if(!$.browser.msie) {
					PluginsMove($("#HGI_Rect"));
				}
			}
			break;
		case "flood_lightmulchn":
		case "flood_light":
			{
				if(!$.browser.msie) {
					PluginsMove($("#floodLightVideo"));
				}
			}
			break;
		default:
			{
				if(!$.browser.msie) {
					PluginsMove($("#IndexObj"));
				}
			}
			break;
	}
	var bgObj = document.getElementById("MaskLayout");
	bgObj.style.width = document.body.offsetWidth + "px";
	bgObj.style.height = document.body.offsetHeight + "px";
}

function CloseOtherVideo(page) {
	if(page != "live") {
		$("#liveSoundLineBox,#dualtalkSoundLineBox,#liveLightBox,#audioAlarm_Box").css("display","none")
		var chnArr = [];
		var recArr = [];
		if(gDevice.devType == devTypeEnum.DEV_IPC){
			if($("#play").attr("name") == "active"){
				chnArr.push(0);
			}
			if($("#record").attr("name") == "active"){
				recArr.push(0);
			}
		}else{
			for(var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
				if($("#chnPlay_" + i).attr("name") == "active") {
					chnArr.push(i);
				}
				if($("#chnRec_" + i).attr("name") == "active") {
					recArr.push(i);
				}
			};
		}
		
		if($("#fisheye").attr("name") == "active"){
			$("#fisheye").click();	
		}
        if($("#talkback").attr("name") == "active"){
            $("#talkback").click();
        }
		if(chnArr.length != 0) {
			if(recArr.length != 0) {
				var ret = gDevice.PreViewRec(0, recArr);
				if(ret.Code == errCodeEnum.Code_Success) {
					var url = ret.Path;
					var urlstr = url.split("\\").join("\\\\");
					var strFolder = "Folder";
					var strColor = "#32A0E1";
					if(lgCls.version == gVar.CtArr[105] && gVar.lg=="DEU"){
						strFolder = "Ordner";
					}
					if (lgCls.version == gVar.CtArr[19]) {
						strFolder = lg.get("IDS_FLODER");
					}
					
					if(lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
						strColor = "rgb(79,161,24);";
					}
					ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>" +
						"<a style='color:"+strColor+";' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>"+strFolder+"</a>&nbsp;&nbsp;&nbsp;&nbsp;" +
						"</div>");
				}
			}
			
			var ret = gDevice.PreviewStop(chnArr);
			if(ret.Code == errCodeEnum.Code_Success) {
				for(var i = 0; i < ret.Data.length; i++) {
					if(ret.Data[i].Code == errCodeEnum.Code_Success) {
						$("#chnPlay_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 0");
						$("#chnRec_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -22px");
						$("#chnCap_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -44px");
						$("#chnStream_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -66px");
						//$("#chnTextBtn_" + ret.Data[i].Channel).attr("name", "disable");
					}
				}
			}
		}
	}
	if(page != "playback") {
		$("#pbSoundLine").css("display","none");
		try{
			if($("#pb_fisheye").RSButton("getStatus") == RSBtnStatus.Pressed){
				$("#pb_fisheye").RSButton("clickEvent");
			}
			if($("#pb_StopAll").RSButton("getStatus") != RSBtnStatus.Disabled)
				$("#pb_StopAll").mousedown();
			else
				$("#pb_Stop").mousedown();
		}
		catch(e){
			
		}
	}
	if(page != "config") {
		if(gDevice.vdCurCh != -1)
			gDevice.ParamvideoStop(gDevice.vdCurCh);
	}
}

function RestoreLiveStatus() {
	var channelNum = gDevice.loginRsp.ChannelNum;
	var chnArr = [];
	var chnSleep = [];
	var stopChnArr = [];
	var isFishEyeSoft = false;
	
	if(gDevice.devType == devTypeEnum.DEV_IPC){//IPC
	    if($("#stop").css("display") == "none"){//Stop video state, do not open video
		}else{
			if(gDevice.loginRsp.FishEye.isFishEye){
				isFishEyeSoft = $("#fish-eye-btn").data("code")*1 == 0?true:false;
				var streamId = $(".streamActiveBtnIPC").attr("id"),streamType;
				if(streamId=="subStream"){
					streamType = 1;
				}else if(streamId=="mobileStream"){
					streamType = 2;
				}else if(streamId=="fourstream"){
                    streamType = streamTypeEnum.FourStreamType;
                }else{
					streamType = 0;
				}
				for(var i = 0; i < channelNum; ++i) {
					if(gDevice.hasPreviewRight(i)!=false && hasStreamType(i,streamType)) {
						chnArr.push(i);
					}else{
						stopChnArr.push(i);
					}
				}
			}else{
				if(gDevice.hasPreviewRight(0)!=false) {
					chnArr.push(0);
				}
			}
		}
	}else{//DVR、NVR
		var mode = $("#divideScreen").attr("mode") * 1;
		var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
		if(mode == SplitModeEnum.WINDOW_MODE_1){
			curInde = $("#channelList").attr("selectIndex") * 1;
		}
		for(var i = 0; i < numPerPage(mode); ++i) {
			if(curInde+i >= channelNum){
				break;
			}
			
			if( gDevice.hasPreviewRight(curInde+i) == false ) {//No permission
				continue;
			}
			
			if(gDevice.isOnline(curInde+i)){
				if($("#chnPlay_" + (curInde+i)).attr("name") != "active"){
					chnArr.push(curInde+i);
				}
			}else if(gDevice.isSleep(curInde+i)){
				if($("#chnPlay_" + (curInde+i)).attr("name") != "active"){
					chnSleep.push(curInde+i);
				}
			}
		}
	}
	
	var ret;
	if(gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye){
		if(stopChnArr.length > 0){//PTZ hard mode does not support code flow show black screen
			var stopRet = gDevice.PreviewStop(stopChnArr);
			if(errCodeEnum.Code_Success == stopRet.Code) {
				for(var i = 0; i < stopRet.Data.length; i++) {
					if(stopRet.Data[i].Code == errCodeEnum.Code_Success) {
						$("#chnPlay_" + stopRet.Data[i].Channel).attr("name", "").css("background-position", "0 0");
						$("#chnRec_" + stopRet.Data[i].Channel).attr("name", "").css("background-position", "-66px -22px");
						$("#chnCap_" + stopRet.Data[i].Channel).attr("name", "").css("background-position", "-66px -44px");
						$("#chnStream_" + stopRet.Data[i].Channel).attr("name", "").css("background-position", "-66px -66px");
						$("#chnTextBtn_" + stopRet.Data[i].Channel).attr("name", "");
					}
				}
			}
		}else{
			if(isFishEyeSoft){//soft
			    gDevice.PreviewStop([$("#channelList").attr("selectIndex") * 1]);
			}
		}
	}
	
	//set sleep channel state
	for(var i=0; i<chnSleep.length; i++){
		$("#chnPlay_" + chnSleep[i]).attr("name", "").css("background-position", "0px 0px");
		$("#chnRec_" + chnSleep[i]).attr("name", "").css("background-position", "-66px -22px");
		$("#chnCap_" + chnSleep[i]).attr("name", "").css("background-position", "-66px -44px");
		$("#chnStream_" + chnSleep[i]).attr("name", "").css("background-position", "-66px -66px");
		$("#chnTextBtn_" + chnSleep[i]).attr("name", "");
	}
	
	for(var i = 0;i < gDevice.loginRsp.ChannelNum;++i){
		resizeRecordStatus(i);
	}
	if(chnArr.length == 0) {
		return;
	}
	
	if(isFishEyeSoft){
		ret = gDevice.PreviewPlay([$("#channelList").attr("selectIndex") * 1],playType.fishEyeSoftPlay);
		gDevice.SetFishEyeSoftMode($("#channelList").attr("selectIndex") * 1,gVar.LocalFishEye.showMode);
		//ret = gDevice.SetFishEyeSoftMode($("#channelList").attr("selectIndex") * 1,gVar.LocalFishEye.showMode);
	}else{
		ret = gDevice.PreviewPlay(chnArr);
	}
	 
	if(errCodeEnum.Code_Success == ret.Code) {
		for(var i = 0; i < ret.Data.length; i++) {
			if(ret.Data[i].Code == errCodeEnum.Code_Success) {
				$("#chnPlay_" + ret.Data[i].Channel).attr("name", "active").css("background-position", "-44px 0");
				$("#chnRec_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -22px");
				$("#chnCap_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -44px");
				$("#chnStream_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -66px");
				$("#chnTextBtn_" + ret.Data[i].Channel).attr("name", "");
				//console.log('RestoreLiveStatus-------------');
				resizeRecordStatus(ret.Data[i].Channel);
			}
		}
	}
}

function resizeRecordStatus(n){
	var recordStatusLog = g_recordStatus[n];
	//console.log("r:"+recordStatusLog.r+"m:"+recordStatusLog.m+"i:"+recordStatusLog.i+"s:"+recordStatusLog.s);
	//r
	if(recordStatusLog.r == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgRecordStatusReport,true,255,0,0);
	}else if(recordStatusLog.r == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgRecordStatusReport,false,0,0,0);
	}
	//h
	if(recordStatusLog.h == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgHddStatusReport,true,255,0,0);
	}else if(recordStatusLog.h == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgHddStatusReport,false,0,0,0);
	}
	//c
	if(recordStatusLog.c == 1){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgVideoHideAlarm,true,0,255,0);
	}else if(recordStatusLog.c == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgVideoHideAlarm,false,0,0,0);
	}
	//m
	if(recordStatusLog.m == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgMotionAlarm,true,255,0,0);
	}else if(recordStatusLog.m == 1){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgMotionAlarm,true,0,255,0);
	}else if(recordStatusLog.m == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgMotionAlarm,false,0,0,0);
	}
	//i
	if(recordStatusLog.i == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgIOAlarm,true,255,0,0);
	}else if(recordStatusLog.i == 1){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgIOAlarm,true,0,255,0);
	}else if(recordStatusLog.i == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgIOAlarm,false,0,0,0);
	}
	//s
	if(recordStatusLog.s == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgAlarmIntManage,true,255,0,0);
	}else if(recordStatusLog.s == 1){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgAlarmIntManage,true,0,255,0);
	}else if(recordStatusLog.s == 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgAlarmIntManage,false,0,0,0);
	}
	//pir
	if(recordStatusLog.pir == 2){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgPirAlarm,true,255,0,0,g_blogoPir);
	}else if(recordStatusLog.pir== 1){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgPirAlarm,true,0,255,0,g_blogoPir);
	}else if(recordStatusLog.pir== 0){
		gDevice.SetPreviewRecordStatus(n,alarmEnum.MsgPirAlarm,false,0,0,0,g_blogoPir);
	}
}

/********************
 * Take the window scroll bar height 
 ******************/
function getScrollTop()
{
    var scrollTop = 0;
    if(document.documentElement&&document.documentElement.scrollTop)
    {
        scrollTop = document.documentElement.scrollTop;
    }
    else if(document.body)
    {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

/********************
 * ：Take the window scroll bar height 
 ******************/
function getScrollLeft()
{
    var scrollLeft=0;
    if(document.documentElement&&document.documentElement.scrollLeft)
    {
        scrollLeft = document.documentElement.scrollLeft;
    }
    else if(document.body)
    {
        scrollLeft = document.body.scrollLeft;
    }
    return scrollLeft;
}

function setAutoFocusParam(z_cv,z_s,f_cv,f_s,state){
	if($("#live").attr("data-name") == "notLoad"){
		//console.log("live notLoad!");
		return ;
	}
        //console.log("zoom:speed------------"+z_cv);
	$("#ptzNM_zoom_set").slider('setValue',z_cv);
	$("#ptzNM_zoom_lenpos").rsselect('setValue',z_s);
	
	//console.log("focus:speed------------"+f_cv);
	$("#ptzNM_focus_set").slider('setValue',f_cv);
	$("#ptzNM_focus_lenpos").rsselect('setValue',f_s);
	
	if(state == 0){
		$("#PTZBtn").data("up",0);
		DivBox(1,"#ptz_newmode");
		$("#ptzHideDiv").css('display','none');
		$("#ptzBtnHideDiv").css("height","120px").css('display','none');
		//console.log("ok：   zoom:speed-------"+z_cv+"---zoom:pos---"+z_s+"---focus:speed---"+f_cv+"---focus:pos---"+f_s);
	}else if(state == 2){
		//console.log("off：   zoom:speed-------"+z_cv+"---zoom:pos---"+z_s+"---focus:speed---"+f_cv+"---focus:pos---"+f_s);
		autoFocusCss(0);
	}else if(state == 3){
		//console.log("manual：   zoom:speed-------"+z_cv+"---zoom:pos---"+z_s+"---focus:speed---"+f_cv+"---focus:pos---"+f_s);
		$("#PTZBtn").data("up",0);
		DivBox(1,"#ptz_newmode");
		$("#ptzHideDiv").css('display','none');
		$("#ptzBtnHideDiv").css("height","120px").css('display','none');
		autoFocusCss(1);
	}else{
		DivBox(0,"#ptz_newmode");
		$("#ptzHideDiv").css('display','block');
		$("#ptzBtnHideDiv").css("height","120px").css('display','block');
		//console.log("no：   zoom:speed-------"+z_cv+"---zoom:pos---"+z_s+"---focus:speed---"+f_cv+"---focus:pos---"+f_s);
	}
}

function beforeunloadEvent(ops){
	window.onbeforeunload = function(){
		if(gDevice.loginRsp.FishEye.isFishEye){
			$.cookie("RS_FishEye_MountMode", gVar.LocalFishEye.mountMode, ops);
			$.cookie("RS_FishEye_ShowMode", gVar.LocalFishEye.showMode, ops);
		}
		
		if(lgCls.version == gVar.CtArr[157] || lgCls.version == gVar.CtArr[112]){
			$.cookie("RS_IPC_DelayTime", gVar.ipcDelayTime,ops);
		}
	}
}