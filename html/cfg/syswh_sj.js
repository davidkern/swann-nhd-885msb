// JavaScript Document
//The remote upgrade feature is temporarily not implemented and there is no usable structure
var selCount = 0;
var ipcstatus = "";
$(document).ready(function(){
	//Initial operation
	MasklayerHide();
	
	//l_upgrade.innerHTML=lg.get("IDS_SYS_UPDATE");
	//ShowPaop($("#l_upgrade").text(),lg.get("IDS_SYS_UPDATE"));
	/*if(gDevice.loginRsp.Admin == true && gDevice.DevType == 4)
	{
		for(var i=0; i<gDevice.loginRsp.ChannelNum; i++)
			$("#upgrade_file_IPCSel").append('<option class="option" value="'+i+'">'+gDevice.chname[i]+'</option>');
	}*/
	
	if(lgCls.version == gVar.CtArr[105] && gVar.lg=="DEU"){
		$("#syssj_warning_left").css("width","0px");
		$("#updateWarming").css({
			"width":"600px",
			"font-size":"14px",
			"text-align":"left",
			"margin-top":"20px"
		});
		
		var strDEU1 = "Bitte schliessen Sie den Browser waehrend des Updates nicht und  schalten  Sie das Geraet nicht aus. Nach dem Update startet das Geraet neu und ist ein paar Minuten nicht erreichbar.<br/>";
		var strDEU2 = "Das Geraet startet nach dem Zuruecksetzen auf Werkseinstellungen neu. Das Geraet ist dann evt. nicht mehr ueber die bisherige IP Adresse erreichbar.";
		updateWarming.innerHTML = strDEU1+strDEU2;
	}else if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[204] && gVar.lg == "ENU"){
        updateWarming.innerHTML = "Do not close your browser or turn off the device when upgrading !!!";
	}else{
		updateWarming.innerHTML = lg.get("IDS_UPDATE_WARMING");
	}

	if(lgCls.version == gVar.CtArr[0]){
		$("#WarmingBox").css("display","none");
	}else if(lgCls.version == gVar.CtArr[3]){
		$("#reboot_input").attr("maxlength",20);
	}
	
	if(lgCls.version == gVar.CtArr[161]){
		$("#platUpdateDiv,#platUpdateBtnDiv").css("display","");
	}
	
	$("#btnSj").click(function(){	
		if(!CheckRight()){
			return;
		}
		
	    $("#UPStart").prop("disabled",false);
		var ret = gDevice.FileUpdate(methodEnum.SubMsgGetUpgradeFile,"");
		if(errCodeEnum.Code_Success == ret.Code){
			$("#txtFileName").val(ret.Data);
			//$("#UPDATESTATE").css("display", "block")
		}
	});
	
	$("#plat_scan").click(function(){	
		if(!CheckRight()){
			return;
		}
		var pathInput = $(this).siblings("input").attr("id");
		var ret = gDevice.FileUpdate(methodEnum.SubMsgGetUpgradeFile,"");
		if(errCodeEnum.Code_Success == ret.Code){
			$("#"+pathInput).val(ret.Data);
			$("#plat_start").prop("disabled",false);
		}
	});
	
	$("#plat_start").click(function(){
		if(!CheckRight()){
			return;
		}
		
		var path = $("#platFileName").val();
		if(path == ""){
			ShowPaop($("#syswh_sj").text(),lg.get("IDS_UPDATEFILEPATH"));
			return;
		}
		gDevice.FileUpdate(methodEnum.SubMsgStartUpgrade,path,0,6);
	});
	
	function SjCheckPassword(){
		$("#confirmDiv").css("display","block");
		$("#confirm_title").prop("innerHTML",$("#syswh_sj").text());
		$("#confirm_str").prop("innerHTML",lg.get("IDS_UPDATETIP"));
		$("#btn_confirm_ok").click(function(){
			$("#confirmDiv").css("display","none");
			var path = $("#txtFileName").val();	
			$("#UPStart").prop("disabled",false);
			g_ipcgup=false;
			gDevice.FileUpdate(methodEnum.SubMsgStartUpgrade,path);
	
			$("#RebootTootip").css("display","block");
			$("#RebootTootipText").prop("innerHTML",lg.get("IDS_IPC_SENDFILE"));
		});
		$("#btn_confirm_cancle").click(function(){
			$("#confirmDiv").css("display","none");
		});
	}
	
	function CheckRight(){
		if(gDevice.hasUserSetRight(UserSetRightEnum.Maintain)) {
			//Need to maintain permissions
			return true;
		}else{
			MasklayerHide();
			ShowPaop($("#syswh_sj").text(), lg.get("IDS_PLAYBACK_RIGHT1"));
			return false;
		}
	}
	
	$("#UPStart").click(function(){
		if(!CheckRight()){
			return;
		}
		
		var path = $("#txtFileName").val();
		if(path == null || path == ""){
			ShowPaop($("#syswh_sj").text(),lg.get("IDS_UPDATEFILEPATH"));
			return;
		}
		if(lgCls.version == gVar.CtArr[3]){
			if(gVar.passwd == ""){
				SjCheckPassword();
			}else{
				CheckPassword = SjCheckPassword;
				$("#reboot_prompt").css("display","block");
				$("#reboot_title").children("em").prop("innerHTML",lg.get("IDS_REBOOT_PWD"));	
				$("#reboot_input").val("");
				MasklayerShow();
			}
		}else{
			$("#UPStart").prop("disabled",false);
			g_ipcgup=false;
			$("#UPDATESTATE").css("display", "block");
			if((gDevice.loginRsp.ControlBitArray[1] >>8) & 1){
                gDevice.FileUpdate(methodEnum.SubMsgStartUpgrade,path,0,7);//srp6
			}else{
                gDevice.FileUpdate(methodEnum.SubMsgStartUpgrade,path);//38，path
			}

			if(lgCls.version == gVar.CtArr[0]){
				$("#WarmingBox").css("display","block");
			}
			//$("#RebootTootip").css("display","block");
			//$("#UPStop").css("display","block");
			//$("#RebootTootipText").prop("innerHTML",lg.get("IDS_IPC_SENDFILE"));
		}
	});
	
	$("#UPStop").click(function(){
		gDevice.FileUpdate(methodEnum.SubMsgStopUpgrade,"");
		$("#UPStop,#UPStart").prop("disabled",true);
		$("#RebootTootip").css("display","none");
	});
	
	if(gDevice.devType != devTypeEnum.DEV_IPC && !gVar.bNormal_0305_2120105 && lgCls.version == gVar.CtArr[2])//Whether to open IPC upgrades
	{
		$("#SJ_IPC_Bg").css("display","block");
		var filetype_ipc = -1;//Private protocol ==0,C2 protocol ==5, not selected ==-1
		var isIPC3516D = "";
		var i,Datahtml='';
		for (i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
			Datahtml +='<div class="cfg_row_box" id="ipc_sj_ch'+i+'">'
							  +'<input type="checkbox" id="SJ_ipcCk'+i+'"/>'
							  +'<label style="width:32px;display:inline-block;" id="lg_SJCk'+i+'">CH'+(i+1)+'</label></div>';
		}
		$("#SJ_ipcNumCh").prop("innerHTML",Datahtml);
		$("#SJ_ipcNumCh").css({"height":gDevice.loginRsp.ChannelNum/8*30+"px","width":"440px"});
		$("#SJ_IPC").prop("disabled",true);//Default disable, enable after selected files
		//copyTD("#NVR_updateTD_ipc","update_ch_ipc","NVR_update_TDNum_ipc");
		$.each($("input[id^='SJ_ipcCk']"),function(){
			var thisId = $(this).attr("id");
			var index = thisId.split("SJ_ipcCk")[1]*1;
			$(this).prop("disabled",true);//All disable, select the file after the file suffix to determine whether to enable
		});
		
		//select all
		$("#WH_IPC").click(function(){
			$.each($("input[id^='SJ_ipcCk']"),function(){
				var thisId = $(this).attr("id");
				var index = thisId.split("SJ_ipcCk")[1]*1;
				if((gDevice.isOnline(index)) && gDevice.devState[index].ProtocolType == filetype_ipc){
					$(this).prop("checked",$("#WH_IPC").prop("checked"));
//					if(gDevice.devState[index].IPCDevTypeFlag == 2){
//						$(this).prop("checked",$("#WH_IPC").prop("checked") && (isIPC3516D=="h265"));
//					}else if(gDevice.devState[index].IPCDevTypeFlag == 1){
//						$(this).prop("checked",$("#WH_IPC").prop("checked") && (isIPC3516D=="h264"));
//					}else{
//						$(this).prop("checked",$("#WH_IPC").prop("checked") && (isIPC3516D==""));
//					}
				}
			})
		});
		
		//Select IPC Upgrade File
		$("#ipc_btnSj").click(function(){
			if(!CheckRight()){
				return;
			}
			
			g_ipcgup=true;
			$("#SJ_IPC").prop("disabled",false);
			var filePath_ipc = gDevice.FileUpdate(methodEnum.SubMsgGetUpgradeFile,"").Data;
			if(filePath_ipc!="-1" && filePath_ipc!=""){
				$("#ipc_txtFileName").val(filePath_ipc);
				$("#UPDATESTATE").css("display", "block")
			}
			if(filePath_ipc.substr(filePath_ipc.length - 3,3) == ".sw"){//Private protocol
				filetype_ipc = 0;
				if(filePath_ipc.substr(filePath_ipc.lastIndexOf("\\") + 1,5) == "CH283"
					|| filePath_ipc.substr(filePath_ipc.lastIndexOf("\\") + 1,5) == "CH273"){
					isIPC3516D = "h264";
				}else if(filePath_ipc.substr(filePath_ipc.lastIndexOf("\\") + 1,5) == "CH293"
						||filePath_ipc.substr(filePath_ipc.lastIndexOf("\\") + 1,5) == "CH29X"
						||filePath_ipc.substr(filePath_ipc.lastIndexOf("\\") + 1,5) == "CHX41"){
					isIPC3516D = "h265";
				}else{
					isIPC3516D = "";
				}
			}else if(filePath_ipc.substr(filePath_ipc.length - 4,4) == ".img"){
				filetype_ipc = 5;
			}else if(filePath_ipc.substr(filePath_ipc.length - 4,4) == ".bin"){
				filetype_ipc = 8;
			}else{
				filetype_ipc = -1;
				return ;
			}

			//Change the optional status of each channel according to the Protocol type
			$("#WH_IPC").prop("disabled",false);//Default disable, enable after selected files
			$.each($("input[id^='SJ_ipcCk']"),function(){
				var thisId = $(this).attr("id");
				var index = thisId.split("SJ_ipcCk")[1]*1;
				$(this).prop("disabled",true);//Select a different type of file, first disable the previous channel
				$(this).prop("checked",false);
				$("#WH_IPC").prop("checked",false);
				if((gDevice.isOnline(index)) && gDevice.devState[index].ProtocolType == filetype_ipc){//Channel and upgrade file protocol type, enable
					$(this).prop("disabled",false);
//					if(gDevice.devState[index].IPCDevTypeFlag == 2){//h265
//						$(this).prop("disabled",!(isIPC3516D=="h265"));
//					}else if(gDevice.devState[index].IPCDevTypeFlag == 1){//h264
//						$(this).prop("disabled",!(isIPC3516D=="h264"));
//					}else{
//						$(this).prop("disabled",!(isIPC3516D==""));
//					}
				}
			});
		});
		
		$("#SJ_IPC").click(function(){
			if(!CheckRight()){
				return;
			}
			
			ipcstatus = "";
			var path = $("#ipc_txtFileName").val();
			if(path == null || path == ""){
				ShowPaop($("#syswh_sj").text(),lg.get("IDS_UPDATEFILEPATH"));
				return;
			}
			showDiv(true,$("#NVR_Upgrade"));//disable
			
			var type_ipc = 0;
			if(filetype_ipc == 0){
				type_ipc = 5;
			}else if(filetype_ipc == 5 || filetype_ipc == 8){
				type_ipc = 4;
			}
			var mask = GetChannelMask_ipc()*1;
			if(mask == 0){
				$("#SJ_IPCStop").click();
				ShowPaop(lg.get("IDS_SYS_UPDATE"), "Please select channels.");
				return ;
			}
			MasklayerShow();
			if(gDevice.FileUpdate(methodEnum.SubMsgStartUpgrade,path,mask,type_ipc*1) == -2){
				ShowPaop(lg.get("IDS_SYS_UPDATE"),lg.get("IDS_PLAYBACK_RIGHT1"));
				return ;
			}
			$("#SJ_IPC").prop("disabled",true);
			ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_IPC_UPDATE"));
		});
		
		$("#SJ_IPCStop").click(function(){
			ipcstatus = "";
			$("#ipc_txtFileName").val("");
			$("#SJ_IPC,#SJ_IPCStop").prop("disabled",false);
			gDevice.FileUpdate(methodEnum.SubMsgStopUpgrade,"");
			$("#RebootTootip").css("display","none");
		});
		
		function GetChannelMask_ipc(){//Get the selected channel mask
			$("#SJ_IPC").data("selCount",0);
			var channelMask = 0;
			var isAlert = 0;
			$.each($("input[id^='SJ_ipcCk']"),function(){
				if($("#SJ_IPC").data("selCount") == 4){//Upgrade up to 4 IPC simultaneously, take the first four
					if(isAlert == 0)
					{
						alert("Up to upgrade four IPC, now only upgrade the previous four.");
						isAlert = 1;
					}
					return channelMask;
				}
				var thisId = $(this).attr("id");
				var index = thisId.split("SJ_ipcCk")[1]*1;
				if((gDevice.isOnline(index)) && gDevice.devState[index].ProtocolType == filetype_ipc && $(this).prop("checked")){
					channelMask |= 1<<index;//Selected Position 1
					$("#SJ_IPC").data("selCount",$("#SJ_IPC").data("selCount")+1);
				}
			})
			return channelMask;
		}
	}
});

