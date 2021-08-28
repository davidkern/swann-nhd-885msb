// JavaScript Document

$(function () {
    var List_first;

    var positionText = {
        topLevelMenu: '',
        firstLevelMenu: '',
        secondLevelMenu: ''
    };

    if (lgCls.version == gVar.CtArr[3]) {//Whether to show the default button
        g_bDefaultShow = true;
    }
    if (gDevice.devType == devTypeEnum.DEV_NVR && gDevice.loginRsp.AlarmInNum > 0
        && lgCls.version != gVar.CtArr[0]
        && lgCls.version != gVar.CtArr[3]
        && !g_c2Wifi && !gVar.bNormal_0305_2120105) {
        g_isTriggerAlarmOut = true;
    }
    if (lgCls.version == gVar.CtArr[161]) {
        $("#userDefined_detection").css("display", "");
    }

    if (lgCls.version == gVar.CtArr[172]) {
        $("#IntelligentNew").css("display", "");
    }

    if (gDevice.devType != devTypeEnum.DEV_IPC ||
        lgCls.version == gVar.CtArr[0] || lgCls.version == gVar.CtArr[118] || lgCls.version == gVar.CtArr[144] || lgCls.version == gVar.CtArr[43]) {
        g_ipcOldIntellCss = true;
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        $("#Dev_log,#stream_set").css("display", "block");
        $("#log,#stream_set_item").css("display", "");
        $("#alarm_io_item,#Image_item,#FTP_Set_item,#auto_wh_item").css("display", "");

        $("#IPCan_set,#Capture_Jh,#Analog_ch,#main_stream_set,#sub_stream_set,#mobile_stream_set").css("display", "none");
        $("#mainstream_item,#substream_item,#pic_sche_item,#email_sche_item,#chn_info_item,#rec_info_item").css("display", "none");
        $("#remote-menu-list,#Events-menu-list,#picture,#remote,#ptz,#Events").css("display", "none");

        if ((gDevice.loginRsp.PageControl >> 10) & 0x01) {
            $("#Capture,#picture-menu-list").css("display", "block");
        } else{
            $("#Capture,#picture-menu-list").css("display", "none");
        }

        if (((gDevice.loginRsp.PageControl >> 26) & 1) != 1) {
            $("#Voice_ctrl,#voice").css("display", "none");
        } else {
            $("#Voice_ctrl,#voice").css("display", "");
        }

        if (((gDevice.loginRsp.PageControl >> 25) & 1) != 1) {
            $("#alarm_io,#alarm_io_item").css("display", "none");//
        }

        if (((gDevice.loginRsp.PageControl2 >> 29) & 1) != 1) {
            $("#chn_roi,#chn_roi_item").css("display", "");//
        }

        if (((gDevice.loginRsp.PageControl2 >> 30) & 1) == 1) {
            $("#SNMP_Set,#SNMP_Set_item").css("display", "");//
        }

        if (((gDevice.loginRsp.ControlBit2 >> 4) & 1) != 1) {
            $("#Alarm_ODSwitch,#Alarm_ODSwitch_item").show();
        }

        if (((gDevice.loginRsp.ControlBit2 >> 5) & 1) == 1) {
            $("#ptzSchedule,#ptzSchedule_item").show();
        }

        if (((gDevice.loginRsp.ControlBit >> 9) & 1) == 1) {
            $("#SSL,#SSL_item").show();
        }

        if (((gDevice.loginRsp.ControlBit >> 15) & 1) == 1) {
            $("#sound_detection,#sound_detection_item").show();
        }

        if((gDevice.loginRsp.ControlBitArray[0] >>4) & 1){
            $("#auto_upgrade,#upgrade_item").show();
        }

        if (((gDevice.loginRsp.ControlBitArray[0] >> 27) & 1) == 1) {
            $("#onvif_set,#onvif_set_item").show();
        }

        if ((gDevice.loginRsp.ControlBitArray[1] >> 2) & 1) {
            $("#net_ddns,#ddns_item").css("display", "none");//
        }

        if ((gDevice.loginRsp.ControlBitArray[1] >> 5) & 1) {
            $("#net_email,#Email_item").css("display", "none");//
        }

        if (((gDevice.loginRsp.ControlBitArray[1] >> 6) & 1) != 1) {
            $("#IP_Filter,#IP_Filter_item").css("display", "");//
        }

        if (lgCls.version == gVar.CtArr[61]) {
            $("#IeeeX,#SSL").css("display", "");
        }

        if (((gDevice.loginRsp.ControlBitArray[2] >> 3) & 1) == 1) {
            $("#net_VPN").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[180]) {
            $("#IntelligentNew2").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[201]) {
            $("#IntelligentNew3").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[165]) {
            $("#FTP_Set,#Alarm_ODSwitch").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[204]) {
            $("#Alarm_ODSwitch").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[7]) {
            $(".RemoteSet_Menu").addClass("RemoteSet_Menu_c7");
        }

        if (((gDevice.loginRsp.PageControl2 >> 27) & 1) == 1) {
            $("#flood_light,#flood_light_item,#floodli").show();
        }

        if (lgCls.version == gVar.CtArr[2] && ((gDevice.loginRsp.ControlBit >> 6) & 1)) {
            $("#HTTP_Set").css("display", "");
        }

        if (gDevice.loginRsp.FtpPageFlag != 1) {
            $("#FTP_Set,#FTP_Set_item").css("display", "none");
        }

        if (gDevice.loginRsp.RtspPageEnable != 1) {
            $("#RTSP_Set,#rtsp_item").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[0]) {
            $("#Alarm_ODSwitch_item").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[32]) {
            $("#localSet").css("display", "");
            $("#Alarm_ODSwitch").css("display", "none");
            if ((gDevice.loginRsp.PageControl >> 25) & 1) {
                $("#alarmSchedule").css("display", "");
            }
        }

        if(lgCls.version == gVar.CtArr[116]){
            if (lgCls.sdcardshow == "1") {
                if (((gDevice.loginRsp.PageControl >> 3) & 1) == 1) {
                    $("#Record_parameter").append($("#record_smart").detach());
                }
                if (((gDevice.loginRsp.PageControl >> 5) & 1) == 1) {
                    $("#System_parameter").append($("#sysinf_smart").detach());
                }
            }

            $("#led_set").css("display","block");
        }

        if(lgCls.skin == "white_c238"){
            setTimeout(function (){var mainMenuNum = 6;
            var mainM_W = $("#RemoteSet_Top").width()*1;
            $("#RemoteSet_Top").append($("#Display").detach());
            if (lgCls.sdcardshow == "1") {
                $("#RemoteSet_Top").append($("#Record").detach());
                mainMenuNum +=1;
            }
            $("#RemoteSet_Top").append($("#Network").detach());
            $("#RemoteSet_Top").append($("#Alarm").detach());
            $("#RemoteSet_Top").append($("#Device").detach());
            $("#RemoteSet_Top").append($("#System").detach());
            $("#RemoteSet_Top").append($("#Advanced").detach());
            if (((gDevice.loginRsp.PageControl >> 3) & 1) == 1) {
                $("#RemoteSet_Top").append($("#Intelligent").detach());
                mainMenuNum +=1;
            }
            $(".RemoteSet_Menu").css("width",(Math.floor(mainM_W/mainMenuNum)-5)+ "px");
            $("#RemoteSet_Top").css("display","");},0);//use timeout for firefox to get width right
        }
    } else if (gDevice.devType == devTypeEnum.DEV_HDVR) {
		$("#FTP_Set").css("display","none");//by default
        $("#Chn_Info,#Rec_Info,#alarm_yc,#Analog_ch").css("display", "block");
		
        if (lgCls.version == gVar.CtArr[7]) {
            $("#FTP_Set").css("display", "none");
        } else if (lgCls.version == gVar.CtArr[70]) {
            //
        } else if (lgCls.version == gVar.CtArr[85]) {
            $("#FTP_Set").css("display", "none");
        } else if (lgCls.version == gVar.CtArr[126]) {
            $("#net_email").css("display", "none");
        }else if (lgCls.version == gVar.CtArr[142]) {
            $("#Img_Ctrl").css("display", "none");
            //$("#chn_sp").css("display","none");
            //$("#Capture").css("display","none");
            //$("#FTP_Set").css("display","none");
            $("#IPCan_set").after($("#Analog_ch"));
        }
		
        if (gDevice.loginRsp.ChannelNum == gDevice.loginRsp.AnalogChNum) {//pure dvr
            $("#IPCan_set,#Img_Ctrl,#mobile_stream_set").css("display", "none");
        }

        if ((gDevice.loginRsp.PageControl2 >> 25) & 1) {
            $("#IPCan_set").css("display", "none");
        }

        if ((gDevice.loginRsp.PageControl2 >> 1) & 0x01) {
            $("#Net_Filter").css("display", "block");
        } else if ((gDevice.loginRsp.PageControl2 >> 11) & 0x01) {
            $("#alarm_ptz").css("display", "block");
        }

        if (lgCls.version == gVar.CtArr[94]) {
            $(".RemoteSet_Menu").addClass("RemoteSet_Menu_c94");
        }
        if (((gDevice.loginRsp.PageControl2 >> 30) & 1) == 1) {
            $("#SNMP_Set,#SNMP_Set_item").css("display", "");//
        }
        if (((gDevice.loginRsp.ControlBit >> 9) & 1) == 1) {
            $("#HTTPS,#HTTPS_item").show();
        }
		if (lgCls.version == gVar.CtArr[0] && ((gDevice.loginRsp.ControlBit >> 25) & 1 == 1)) {
            $("#auto").show();
        }
		if ((gDevice.loginRsp.PageControl2 >> 27) & 1) {
            $("#flood_lightmulchn").show();
        }
		
		if ((gDevice.loginRsp.ControlBit >> 18) & 1) {
			$("#main_stream_set").hide();
		}
		if ((gDevice.loginRsp.ControlBit >> 19) & 1) {
			$("#sub_stream_set").hide();
		}
		if ((gDevice.loginRsp.ControlBit >> 20) & 1) {
			$("#mobile_stream_set").hide();
		}
		if ((gDevice.loginRsp.ControlBit2 >> 27) & 1) {
			$("#Alarm_JhDVR").show();
		}
    } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
        $("#Capture,#FTP_Set,#Analog_ch,#plat_set").css("display", "none");
        $("#IPCan_set,#alarm_yc").css("display", "block");
        if ((gDevice.loginRsp.PageControl >> 10) & 0x01) {
            $("#Capture").css("display", "block");
        }
        if (lgCls.version == gVar.CtArr[89]) {
            $("#Video_output").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[0]) {
            $("#IPC_item,#mobistream_item,#Image_item").css("display", "inline-block");
        } else if (lgCls.version == gVar.CtArr[7]) {
            $("#Chn_Info,#Rec_Info,#Capture").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[152]) {
            $("#FTP_Set").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[137] || lgCls.version == gVar.CtArr[104]) {
            $("#Capture").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[121] || lgCls.version == gVar.CtArr[2] || lgCls.version == gVar.CtArr[1]) {
            $("#Video_output").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[3]) {
            $("#Chn_Info,#Rec_Info").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[94]) {
            $("#Alarm_Jh").show();
        } else if (lgCls.version == gVar.CtArr[206]){
        	$("#Img_Ctrl").hide();
        }

        if (gVar.bC0_0305_3120101) {
            $("[name=sub_stream_set]").css("display", "none");
            $("[name=mobile_stream_set]").css("display", "none");
            $("#picture,#ptz").css("display", "none");
        }
        if (gVar.bNormal_0305_2120105) {
            $("#main_stream_set").css("display", "none");
            $("#sub_stream_set").css("display", "none");
            $("#mobile_stream_set").css("display", "none");
            if (lgCls.version == gVar.CtArr[7]) {
                $("#Chn_Info,#Rec_Info,#FTP_Set").css("display", "none");
            } else {
                $("#FTP_Set").css("display", "block");
            }
            $("#Capture").show();
        }
        if (gVar.bSN_0305_120105) {
            $("#SwannWifi").css("display", "block");
            $("#mobile_stream_set,#Img_Ctrl").css("display", "none");
        }
        if (g_c2Wifi) {
            $("#Chn_Info,#Rec_Info").show();
            $("#IPCan_set,#chn_live,#Img_Ctrl,#chn_sp,#main_stream_set,#sub_stream_set,#mobile_stream_set").hide();
        }
        if (lgCls.version == gVar.CtArr[2]) {
            $("#Alarm_ODSwitch,#AF_controls").show();
        }
        if (((gDevice.loginRsp.PageControl2 >> 30) & 1) == 1) {
            $("#SNMP_Set,#SNMP_Set_item").css("display", "");//
        }
        if (((gDevice.loginRsp.ControlBit >> 9) & 1) == 1) {
            $("#HTTPS").show();
        }
        if (lgCls.version == gVar.CtArr[0] && ((gDevice.loginRsp.ControlBit >> 25) & 1 == 1)) {
            $("#auto").show();
        }
        if ((gDevice.loginRsp.PageControl2 >> 27) & 1) {
            $("#flood_lightmulchn").show();
        }
    }

    if ((gDevice.loginRsp.PageControl >> 8) & 1 == 1) {
        $("#syswh_cd,#syswh_cd_item").css("display", "");
    }

    if ((gDevice.loginRsp.PageControl >> 9) & 1 == 1) {
        $("#E_platform,#E_platform_item").css("display", "");
    }

    if ((gDevice.loginRsp.PageControl2 >> 8) & 1 == 1) {
        $("#gb_28181").css("display", "");
    }

    if ((gDevice.loginRsp.PageControl2 >> 12 & 0x1) == 1) {
        $("#alarm_pir,#pir_item").show();
    }
	if ((gDevice.loginRsp.ControlBit >> 14) & 1) {
		$("#activate,#activate_item").css("display", "");
	}
	if((gDevice.loginRsp.ControlBitArray[0] >>9) & 1){
		$("#NotificationSchedule").css("display", "");
	}

    if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.sdcardshow * 1 != 1) {
        $("#Record,#REC").css("display", "none");
    } else {
        $("#Record,#REC").css("display", "");
    }

    if (gDevice.loginRsp.CloudStorageFlag == 1) {
        if (gDevice.loginRsp.CloudSGSerSwitch == 1) {
            $("#Cloud_Storage").css("display", "block");//1 old KG Cloud storage page
        } else if (gDevice.loginRsp.CloudSGSerSwitch == 2) {
            $("#NewCloud_Storage").css("display", "block");// 2 new KG Cloud storage page
        } else if (gDevice.loginRsp.CloudSGSerSwitch == 3) {
            $("#NormalClo_Sto").css("display", "block"); //3 C4	Cloud storage page
        } else if (gDevice.loginRsp.CloudSGSerSwitch == 4) {
            $("#SwannClo_Sto").css("display", "block"); //4  C7  Cloud storage page
            if(gDevice.devType == devTypeEnum.DEV_IPC){
                $("#cloud").css("display", "inline-block");
            }
        }
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        $("#record_jh,#Intelligent_jh,#sche_item,#Intelligent_jh_item").css("display", "none");
        if (lgCls.sdcardshow == "0" || lgCls.sdcardshow == "") {
            $("#sysinf_hdd,#record_jhipc,#record_smart,#record_jhipc_item,#record_smart_item,#hdd").css("display", "none");
            $("#Capture_Jhipc,#pic_scheIpc_item").css("display", "none");
        } else if (lgCls.sdcardshow == "1") {
            $("#sysinf_hdd,#record_jhipc,#record_smart,#record_jhipc_item,#record_smart_item,#hdd").css("display", "");
            $("#Capture_Jhipc,#pic_scheIpc_item").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[137]) {
            $(".RemoteSet_Menu").css("padding-left", "50px");
        }
    } else if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        $("#sysinf_hdd").css("display", "block");
        $("#record_jh").css("display", "block");
        $("#record_jhipc,#record_smart,#record_jhipc_item,#record_smart_item").css("display", "none");
    } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
        $("#sysinf_hdd").css("display", "block");
        $("#record_jh").css("display", "block");
        if (gVar.bC0_0305_3120101) {
            $("[name=main_stream_set]").css("display", "none");
            if (gVar.bC0_0305_3120101_old906Dev) {
                $("[name=record_jh]").css("display", "none");
                $("[name=main_stream_set]").css("display", "");
            }
            $("[name=RTSP_Set]").css("display", "none");

            $('#dis').css('display', 'none');
            $('#remote').css('display', 'none');
            $('#chn_info_item,#rec_info_item').css('display', 'none');
        }
        $("#record_jhipc,#record_smart,#record_jhipc_item,#record_smart_item").css("display", "none");

        if (gVar.bNormal_0305_2120105) {
            $("#IPCan_set,#Img_Ctrl").css("display", "none");
            if ((gDevice.loginRsp.PageControl2 >> 14 & 0x1) == 1) {
                $("#chn_live").css("display", "none");
            }
        }
    }

    if (lgCls.version == gVar.CtArr[3]) {
        $("#RTSP_Set").css("display", "none");
        $("#record_pz").css("display", "none");
    }
    if (gDevice.loginRsp.PtzSupported == 1) {//NVR
        $("#chn_yt").css("display", "block");
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        if (gDevice.loginRsp.HkDomeFlag * 1 == 1) {
            $("#chn_yt").css("display", "");
        } else {
            $("#chn_yt").css("display", "none");
        }
    }

    if (((gDevice.loginRsp.PageControl >> 3) & 1) == 1) {
        $("#Intelligent,#intell").css("display", "");
        if (g_ipcOldIntellCss) {
            $("#sysinf_detection").css("display", "none");
            $("#Perimeter_Zone,#Perimeter_Line,#GoodsLost_Legacy").css("display", "");
        }
        if (((gDevice.loginRsp.PageControl >> 5) & 1) == 1) {//Face, body, to enter in and out of the intelligence
            $("#sysinf_smart").css("display", "");
            if (g_ipcOldIntellCss) {
                $("#Human_Detection,#Face_Detection,#People_Cross_Counting").css("display", "");
            }
            $("#Human_Detection_item,#Face_Detection_item,#People_Cross_Counting_item,#sysinf_smart_item").css("display", "");
        }
        if((gDevice.loginRsp.ControlBitArray[0] >>18) & 1){
            $("#sysinf_detection").attr("name","Human_Detection");
            $("#Perimeter_Zone_item,#Perimeter_Line_item,#GoodsLost_Legacy_item").css("display","none");
        }
        if((gDevice.loginRsp.ControlBitArray[0] >>19) & 1){
            if($("#sysinf_detection").attr("name") == "Human_Detection"){
                $("#sysinf_detection").attr("name","Face_Detection");
            }
            $("#Human_Detection_item").css("display","none");
        }
        if((gDevice.loginRsp.ControlBitArray[0] >>21) & 1){
            if($("#sysinf_detection").attr("name") == "Face_Detection"){
                $("#sysinf_detection").attr("name","People_Cross_Counting");
            }
            $("#Face_Detection_item").css("display","none");
        }
        if((gDevice.loginRsp.ControlBitArray[0] >>20) & 1){
            $("#People_Cross_Counting_item").css("display","none");
        }

        if((gDevice.loginRsp.ControlBitArray[0] >>25) & 1){
            $("#sysinf_smart,#sysinf_smart_item").css("display","none");
        }
    }

    if ((gDevice.loginRsp.PageControl >> 6) & 0x01) {//
        $("#Analog_ch").css("display", "none");
    }
    if ((gDevice.loginRsp.PageControl >> 12) & 0x01) {//
        $("#Switch_set").css("display", "block");
    }

    if ((gDevice.loginRsp.AlarmInNum <= 0) || (gDevice.loginRsp.AlarmInNum > 16)) {
        $("#alarm_io,#alarm_io_item").css("display", "none");//
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        if (lgCls.version == gVar.CtArr[0]) {
            if (gDevice.loginRsp.ChannelNum == gDevice.loginRsp.AnalogChNum) {
                $("#IPCan_set,#Img_Ctrl,#mobile_stream_set,#FTP_Set,#auto_wh").css("display", "none");
                $("#system_ID").css("display", "block");
            }

            if (gIELogin == false) {
                //$("#auto").css("display","inline-block");//for Netviewer
            }
        }

        if (lgCls.version == gVar.CtArr[70] || lgCls.version == gVar.CtArr[2] || lgCls.version == gVar.CtArr[94] || lgCls.version == gVar.CtArr[21] || lgCls.version == gVar.CtArr[105]) {
            $("#Dev_log").css("display", "block");
        } else if (lgCls.version == gVar.CtArr[85]) {
            $("#Dev_log2").css("display", "block");
        }
        if (gDevice.loginRsp.RemoteSearchLogFlag * 1 == 1) {
	        $("#Dev_log").css("display", "block");
	    }
    }
    if (lgCls.version == gVar.CtArr[0] && gDevice.loginRsp.RemoteSearchLogFlag * 1 == 1) {
        $("#log").css("display", "");
    }
    if (gDevice.loginRsp.FtpPcSendFlag * 1 == 1 && gDevice.devType != devTypeEnum.DEV_IPC) {
        $("#FTP_Set").css("display", "block");
    }

    if (gDevice.loginRsp.ZeroChFlag * 1 == 1) {
        $("#zerochn_set").show();
    }

    if (lgCls.version == gVar.CtArr[0] && gDevice.devType == devTypeEnum.DEV_NVR) {
        if (gVar.bC0_0305_3120101) {
            //hide
        } else {
            if ((gDevice.loginRsp.PageControl2 >> 27) & 1) {
                $("#flood_lightmulchn_item,#floodli").show();
            }
        }
    }

    var setPositionText = function (curText) {

        $('#topLevelMenu').text(curText.topLevelMenu);

        $('#firstLevelMenu').text(curText.firstLevelMenu);

        $('#secondLevelMenu').text(curText.secondLevelMenu);
    };

    var setPositionImg = function () {
        var $posImg = $('#curPosImg');
        var curPos = $('.menu-wrapper.active').find('.menu-title').attr('id');
        switch (curPos) {
            case "Settings":
                $posImg.css("background-position", "0 0");
                break;
            case "dev":
                $posImg.css("background-position", "-78px 0");
                break;
            case "sys":
                $posImg.css("background-position", "-52px 0");
                break;
            case "adv":
                $posImg.css("background-position", "-26px 0");
                break;
            default :
                break;
        }

    };

    var HandleOcxInIE = function () {
        if ($.browser.msie) {
            $("#tempOcx").append($("#ipcocx").detach());
            $("#ipcocx").css({width: "1px", height: "1px"});
        }
    };

    // Normal Setting
    var SettingNormal = function () {
        //
        $(".RemoteSet_Menu_listBox").addClass("none");
        $(".RemoteSet_Menu").each(function () {
            if ($(this).css("display") != "none") {
                var menuId = $(this).attr("id");
                $("#" + menuId + "_parameter").removeClass("none");
                return false;
            }
        });

        $(".RemoteSet_Menu").click(function () {
            positionText.firstLevelMenu = $(this).text();
            var Param = $(this).attr("id") + "_parameter";
            if(lgCls.skin == "white_c238" && $('#' + Param).attr("d") == "active"){
                return false;
            }
            $(".RemoteSet_Menu_listBox").addClass("none");
            $(".RemoteSet_Menu").removeAttr("d");

            if ($('#' + Param).attr("d") != "active") {
                $('#' + Param).removeClass("none");
                $(".RemoteSet_Menu_listBox").removeAttr("d");
                $('#' + Param).attr("d", "active");
                $(this).attr("d", "active");
            } else {
                $('#' + Param).addClass("none");
                $('#' + Param).removeAttr("d");
                $(this).removeAttr("d");
            }

            if(lgCls.skin == "white_c238"){
                var subMenu = "";
                $('#' + Param).find('.RemoteSet_Menu_list').each(function () {
                    if ($(this).css('display') != 'none') {
                        subMenu = $(this).attr('id');
                        return false;
                    }
                });
                $("#"+subMenu).click();
                subMenu = null;
            }
        });

        $(".RemoteSet_Menu_list").click(function () {
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if ($(this).attr("data-intell") * 1 == 1) {
                    positionText.secondLevelMenu = $("#sysinf_detection").text();
                }
                if ($(this).attr("data-intell") * 1 == 2) {
                    positionText.secondLevelMenu = $("#userDefined_detection").text();
                } else {
                    positionText.secondLevelMenu = $(this).text();
                }
            } else {
                positionText.secondLevelMenu = $(this).text();
            }

            if (IsShowPage($(this).attr("id")) == 1) {
                if ($(this).attr("d") != "active") {
                    $(".RemoteSet_Menu_list").attr('d', 'not-active').removeClass('RemoteSet_Menu_list RemoteSet_Menu_list_active').addClass('RemoteSet_Menu_list');
                    $(this).attr("d", "active").addClass('RemoteSet_Menu_list_active');
                    setPositionText(positionText);
                } else {
                }
                var pageName;

                //Compatible with IPC stream page
                if ($(this).attr("id") == "stream_set") {
                    pageName = "main_stream_set";
                } else if ($(this).attr("id") == "sysinf_detection" || $(this).attr("id") == "userDefined_detection") {
                    pageName = $(this).attr("name");
                } else if ($(this).attr("id") == "Dev_log2") {
                    pageName = "Dev_log";
                } else {
                    pageName = $(this).attr("id");
                }

                if (pageName == "chn_bm") {
                    if (gStreamSet == 0) {
                        pageName = "chn_bm";
                    } else if (gStreamSet == 1) {
                        pageName = "chn_subbm";
                    } else {
                        pageName = "mobile_stream";
                    }
                }

                HandleOcxInIE();
                LoadChildConfigPage(pageName);
            } else {
                ShowPaop($(this).text(), lg.get("IDS_PAGE_FAILED"));
            }
        });

        //The initial page loading
        $(".RemoteSet_Menu_list").each(function () {
            $(this).attr('d', 'not-active');
            if ($(this).css("display") != "none") {
                List_first = $(this).attr("id");
                return false;
            }
        });

        setTimeout(function () {
            $('#' + List_first).attr("d", "active").addClass('RemoteSet_Menu_list_active');
            $('#' + List_first).parent().attr("d", "active");
            $(".RemoteSet_Menu:visible").first().attr("d", "active");
            positionText.firstLevelMenu = $(".RemoteSet_Menu:visible").first().text();
            $("#firstLevelMenu").text(positionText.firstLevelMenu);
            setTimeout(function () {
                $("#secondLevelMenu").text($("#" + List_first).html());
            }, 1);
            HandleOcxInIE();
            LoadChildConfigPage(List_first);
        }, 500);//Waiting for rendering language
    }


    // C0 Setting
    var SettigC0 = function () {
        $('.menu-wrapper').on('click', function () {
            var self = $(this);
            //var curList = $('#' + self.find('.menu-item:first').attr('id') + '-menu-list');
            var curList, curListId, activeItem;
            self.find('.menu-item').each(function () {
                if ($(this).css('display') != 'none') {
                    activeItem = $(this).attr('id');
                    curListId = activeItem + '-menu-list';
                    curList = $('#' + curListId);
                    return false;
                }
            });
            //var page = curList.find('.content-menu-item:first').attr('name');
            var page;
            curList.find('.content-menu-item').each(function () {
                if ($(this).css('display') != 'none') {
                    page = $(this).attr('name');
                    return false;
                }
            });//If the first choice of the display to none, then the next one

            $('.menu-wrapper, .menu-item, .content-menu-list.active, .content-menu-item').removeClass('active');

            self
                .find('#' + activeItem)
                .addClass('active')
                .end()
                .addClass('active');

            // set breadcrumbs
            positionText.topLevelMenu = self.find('.menu-title').text();
            positionText.firstLevelMenu = self.find('.menu-item[id="' + activeItem + '"]').text();
            positionText.secondLevelMenu = curList.find('.content-menu-item[name="' + page + '"]').text();
            setPositionText(positionText);
            setPositionImg();

            curList.find('.content-menu-item[name="' + page + '"]').addClass('active');
            curList.addClass('active');

            HandleOcxInIE();
            LoadChildConfigPage(page);
        });

        $('.menu-item').on('click', function (e) {
            e.stopPropagation();
            var self = $(this);
            $('.menu-wrapper, .menu-item, .content-menu-item').removeClass('active');

            self
                .parents('.menu-wrapper')
                .addClass('active')
                .end()
                .addClass('active');

            // switch content-menu-list
            $('.content-menu-list.active').removeClass('active');
            var curList = $('#' + self.attr('id') + '-menu-list');
            //var page = curList.find('.content-menu-item:first[display != "none"]').attr('name');
            var page;
            curList.find('.content-menu-item').each(function () {
                if ($(this).css('display') != 'none') {
                    page = $(this).attr('name');
                    return false;
                }
            });//If the first choice of the display to none, then the next one

            curList.find('.content-menu-item[name="' + page + '"]').addClass('active');
            curList.addClass('active');

            positionText.topLevelMenu = self.parents('.menu-wrapper').find('.menu-title').text();
            positionText.firstLevelMenu = self.text();
            positionText.secondLevelMenu = curList.find('.content-menu-item[name="' + page + '"]').text();
            setPositionText(positionText);
            setPositionImg();

            HandleOcxInIE();
            LoadChildConfigPage(page);
        });

        $('.content-menu-item').on('click', function () {
            if (IsShowPage($(this).attr("name")) == 1) {
                var self = $(this);

                self.siblings()
                    .removeClass('active')
                    .end()
                    .addClass('active');

                var page = self.attr('name');

                positionText.topLevelMenu = $('.menu-wrapper.active').find('.menu-title').text();
                positionText.firstLevelMenu = $('.menu-item.active').text();
                positionText.secondLevelMenu = self.text();
                setPositionText(positionText);
                setPositionImg();

                //Compatible with IPC stream page
                if ($(this).attr("id") == "stream_set_item") {
                    page = "main_stream_set";
                }

                if (page == "chn_bm") {
                    if (gStreamSet == 0) {
                        page = "chn_bm";
                    } else if (gStreamSet == 1) {
                        page = "chn_subbm";
                    } else {
                        page = "mobile_stream";
                    }
                }
                HandleOcxInIE();
                LoadChildConfigPage(page);
            } else {
                ShowPaop($(this).text(), lg.get("IDS_PAGE_FAILED"));
            }
        })

        $('#topLevelMenu, .arrow_title, .content-menu-wrapper, #RemoteSet_Box_C0').removeClass('none');
        $('#RemoteSet_Box_Normal').addClass('none');
        $('#content').addClass('content-sm');
        $('#curPosImg').addClass('position-img-c0');

        //The initial page loading
        //$('.menu-wrapper:first').click();
        setTimeout(function () {
            //setPositionText(positionText);
            $('.menu-wrapper:first').click();//Solve the title does not display the correct language bug
        }, 500);
    };

    if (lgCls.version == gVar.CtArr[0] || (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[144]) || lgCls.version == gVar.CtArr[43]) {
        SettigC0();
    } else {
        SettingNormal();
    }

});
