$(function () {
    var modelIdsArr = ['#ipcPtz_model_default', '#ipcPtz_model_preset', '#ipcPtz_model_watch',
            '#ipcPtz_model_linedscan', '#ipcPtz_model_track', '#ipcPtz_model_patternscan',
            '#ipcPtz_model_restore'],
        modelIds = modelIdsArr.join(',');

    var mobHide = false;//Don't hide
    var marginLeft = 60;
    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        if (gDevice.loginRsp.ChannelNum == gDevice.loginRsp.AnalogChNum) {//
            mobHide = true;//hide
        }
		if((gDevice.loginRsp.ControlBit >> 20) & 1) {
			mobHide = true;
		}
    }
    if (gVar.bC0_0305_3120101 || gVar.bNormal_0305_2120105 || gVar.bSN_0305_120105 || g_c2Wifi) {
        mobHide = true;//hide
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC && (gDevice.loginRsp.PageControl2 >> 6) & 1) {
        mobHide = true;//hide
    }

    if (mobHide) {
        //hidden by default
    } else {
        $("#mobileStream").show();
    }

    // C0 6 replace split screen icon
    if (lgCls.version == gVar.CtArr[0] && gDevice.loginRsp.ChannelNum == 6) {
        $(".divideMode, #divideScreen").addClass("divideMode_special");
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        if (lgCls.version == gVar.CtArr[112]) {
            $(".live_minus,.live_add").css("display", "block");
        }
    }

    if ((gDevice.loginRsp.PageControl2 >> 21) & 1) {
        $("#ptzHideDiv").css("height", "240px");
        $("#ipcPtz_model_con_AFMode").css("display", "block");
    }

    if ((gDevice.loginRsp.ControlBit2 >> 6) & 1) {
        $("#Ptz3dPos").css("display", "block");
    }


    if (gDevice.devType != devTypeEnum.DEV_IPC) {
        $("#sound").show();
    }//default
    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        if ((gDevice.loginRsp.PageControl >> 26) & 1) {
            $("#sound").css("display", "none");//1:hide
        } else {
            $("#sound").css("display", "block");
        }
    }

    var strFolder = "Folder";
    if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
        strFolder = "Ordner";
    }

    if (lgCls.version == gVar.CtArr[87]) {
        $("#btnSplitLine").css("background-color", "#ccc");
    } else if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
        $("#floodLight,#audioAlarm").addClass("IconEx");
    }

    //Limit the main stream number does not display the button in the main stream
//	if(g_MainStreamNum != gDevice.loginRsp.ChannelNum){
//		$("#mainStream").hide();
//	}

    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.PtzHiddenFlag == 1) {
        $("#PTZBtn").css("display", "none");
    } else if (lgCls.version == gVar.CtArr[104] && gDevice.loginRsp.PtzHiddenFlag == 1) {
        $("#PTZBtn").css("display", "none");
    } else if (gVar.bC0_0305_3120101) {//A certain type of NVR_C0
        $("#PTZBtn,#colorBtn").css("display", "none");
    } else if (gVar.bNormal_0305_2120105) {
        $("#PTZBtn").css("display", "none");
    } else if (gVar.bSN_0305_120105) {
        $("#PTZBtn").css("display", "none");
    } else {
        $("#PTZBtn").css("display", "");
        $("#colorBtn").css("right", "45px");
    }

    if (gDevice.loginRsp.DualtalkShowTag) {
        $("#talkback").show();
    }

    if (g_c2Wifi) {
        $(".PTZBtnBox").hide();
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC &&gDevice.hasPreviewRight(0) == false) {
        $(".liveTop, .liveBottom").hide();
        if(lgCls.skin == "white_c238"){
            $("#topContent").css("position", "relative").css("opacity", "0.2");
            $("#topContent").append("<div class='disMaskLayer'></div>");
        }
    }

    initPreview();
    $("#liveSoundLine").slider({
        minValue: 0, maxValue: 100,
        dragmoveCallback: function (valume) {
            if ($("#sound").attr("silence") == "silence") {     //
                if (gDevice.PreViewSound(1).Code == errCodeEnum.Code_Success) {
                    $("#sound").css("background-position", "0px -320px").attr("silence", "");
                    $("#liveSmallImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not")
                }
            }
            gDevice.PreviewVolume(valume);
        }
    });
    $("#liveSoundLine").slider("setValue", 25);
    gDevice.PreviewVolume($("#liveSoundLine").slider("getValue") * 1);
//  $("#dualtalkSoundLine").slider({minValue:0,maxValue:100,
//      dragmoveCallback:function(volume){
//          gDevice.SetDualTalkVolume(volume);
//      }});
//  $("#dualtalkSoundLine").slider("setValue",25);

    $("#liveFloodLight").slider({
        minValue: 1, maxValue: 100,
        dragmoveCallback: function (valume) {
            if ($("#floodLight").attr("silence") == "silence") {     //
                $("#floodLight").css("background-position", "0px -544px").attr("silence", "");
                $("#liveFloodLightImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
            }
            saveLiveParam(0);
        }
    });
    $("#liveFloodLight").slider("setValue", 25);

    $("#audioAlarm_BoxSlider").slider({
        minValue: 1, maxValue: 10,
        dragmoveCallback: function (valume) {
            if ($("#audioAlarm").attr("silence") == "silence") {     //
            		if(1/*lgCls.version == gVar.CtArr[7]*/){
						$("#foodlight_label").text(lg.get("IDS_SIREN_ALARM"));
						$("#foodlight_prompt .btn_box").hide();
						$("#siren_div").show();
						$("#foodlight_prompt").show();
						MasklayerShow();
						return;
					}
                $("#audioAlarm").css("background-position", "0px -608px").attr("silence", "not");
                $("#audioAlarm_BoxImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
            }
            saveLiveParam(0);
        }
    });
    $("#audioAlarm_BoxSlider").slider("setValue", 25);

    $("#ipcPtz_model_con_AFMode select").change(function () {
        if ($(this).attr("id") == "AFMode_sel") {
            autoFocusCss($("#AFMode_sel").val() * 1);
        }
        var param = {};
        param.AFMode = $("#AFMode_sel").val() * 1;
        param.PowerMode = $("#PowerMode_sel").val() * 1;
        param.TDNAFSwitch = $("#TDNAFSwitch_sel").val() * 1;

        RfParamCall(autoFocusUserCall, "ColorSet", paramPage.MsgParamIPCCameaFocusInfo, 0, "Set", param);
    });

    $('#liveSmallImg').click(function () {
        var isSilence = $(this).data("silence");    //The default mute
        if (isSilence == "silence") {
            if (gDevice.PreViewSound(1).Code == errCodeEnum.Code_Success) {   //Set not mute
                $("#sound").css("background-position", "0px -320px").attr("silence", "not");
                $(this).removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
            }
        } else {
            if (gDevice.PreViewSound(0).Code == errCodeEnum.Code_Success) {   //Set the mute
                $("#sound").css("background-position", "-64px -320px").attr("silence", "silence");
                $(this).removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");
            }
        }
    });

    $('#liveFloodLightImg').click(function () {
        var isSilence = $(this).data("silence");    //The default mute
        if (isSilence == "silence") {
            $("#floodLight").css("background-position", "0px -544px").attr("silence", "not");
            $(this).removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
        } else {
            $("#floodLight").css("background-position", "-64px -544px").attr("silence", "silence");
            $(this).removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");
        }
        saveLiveParam(0);
    });

    $('#audioAlarm_BoxImg').click(function () {
        var isSilence = $(this).data("silence");    //The default mute
        if (isSilence == "silence") {
            if (1/*lgCls.version == gVar.CtArr[7]*/) {
                $("#foodlight_label").text(lg.get("IDS_SIREN_ALARM"));
                $("#foodlight_prompt .btn_box").hide();
                $("#siren_div").show();
                $("#foodlight_prompt").show();
                MasklayerShow();
                return;
            }
            $("#audioAlarm").css("background-position", "0px -608px").attr("silence", "not");
            $(this).removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
        } else {
            $("#audioAlarm").css("background-position", "-64px -608px").attr("silence", "silence");
            $(this).removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");
        }
        saveLiveParam(0);
    });

    $("#listBtn").on('click', function () {
        var $this = $(this);
        if ($this.attr("name") == "active") {   //
            $(this).css("background-position", "0 0");
            $(".channelListBox").css("display", "none");
            $(".centerContent").css("left", "0");
            $this.attr("name", "");
            $("#moreScreens").css("margin-left", "15px");
        } else {
            $(this).css("background-position", "-45px 0");
            $(".channelListBox").css("display", "block");
            $(".centerContent").css("left", "220px");
            $this.attr("name", "active");
            if ($("#divideScreen").attr("name") == "active") {
                $("#moreScreens").css("margin-left", "235px");
            }
        }

        if (!$.browser.msie) {
            PluginsMove($("#liveOcx"));
        }
    });

    $('#fish-eye-btn').on('click', function () {
        var $fishEyeBox = $('.liveMain .fish-eye-box');
        var $centerContent = $('.centerContent');
        if ($fishEyeBox.attr("name") !== 'active') {
            $(this).attr("name", "active");
            $fishEyeBox.css('display', 'block').attr("name", "active");
            $centerContent.css("left", "200px");
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 1000, "Get");
            }
        } else {
            $(this).attr("name", "");
            $fishEyeBox.css('display', 'none').removeAttr("name");
            $centerContent.css("left", "0");
            $(".code-mode").attr("name", "");
        }
        if (!$.browser.msie) {
            PluginsMove($("#liveOcx"));
        }
    });

    $('.code-mode').on('click', function () {
        var self = $(this);
        var modeID = self.attr("id").split("_")[0];
        var $codeMode = $('.code-mode');
        var lastMode = $('.code-mode[name="active"]').data("mode") * 1,
            curMode = $(this).data("mode") * 1;
        //Hard hard switching to soft solution, solution must choose show_mode is 0, the original model
        if (lastMode == 1 && curMode == 0) { //
            if ($(".mode-hard .display-mode[name='active']").data("mode") * 1 !== 0) {
                ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_HARD_TO_SOFT_ALARM"));
                return;
            }
        }

        $codeMode.attr("name", "");
        $(this).attr("name", "active");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            var param = {};
            param.code_mode = curMode;
            param.mount_mode_0 = gVar.LocalFishEye.mountMode * 1;//soft
            param.show_mode_0 = gVar.LocalFishEye.showMode * 1;
            param.mount_mode_1 = $("#fish-eye-btn").data("mount_hard") * 1;//hard
            param.show_mode_1 = $(".mode-hard .display-mode[name='active']").data("mode") * 1;
            var tempObj = {}, i, channel;
            tempObj.x = 0;
            tempObj.y = 0;
            param.pos = [];
            channel = $(".channelRow[name='active']").attr("id").split("_")[1] * 1;
            channel = isNaN(channel) ? 0 : channel;
            for (i = 0; i < 4; i++) {
                param.pos[i] = tempObj;
            }
            tempObj = null;
            param.cur_pos = channel;
            param.bsave_pos = 0;

            RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 2000, "Set", param);
        }
    });

    $("#live .install-mode").on('click', function () {
        if ($(this).attr("name") !== "active") {
            var code = $("#fish-eye-btn").data("code") * 1;
            var mount = $(this).data("mode") * 1;
            $("#live .install-mode[data-mode='" + mount + "']").siblings().attr('name', '').end().attr('name', 'active');
            if (code == 1) {//hard
                $("#fish-eye-btn").data("mount_hard", mount);

                var param = {};
                param.code_mode = code;
                param.mount_mode_0 = gVar.LocalFishEye.mountMode * 1;//soft
                param.show_mode_0 = gVar.LocalFishEye.showMode * 1;
                param.mount_mode_1 = mount;//hard
                param.show_mode_1 = $(".mode-hard .display-mode[name='active']").data("mode") * 1;
                var tempObj = {}, i, channel;
                tempObj.x = 0;
                tempObj.y = 0;
                param.pos = [];
                channel = $(".channelRow[name='active']").attr("id").split("_")[1] * 1;
                channel = isNaN(channel) ? 0 : channel;
                for (i = 0; i < 4; i++) {
                    param.pos[i] = tempObj;
                }
                tempObj = null;
                param.cur_pos = channel;
                param.bsave_pos = 0;
                RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 2000, "Set", param);
            } else if (code == 0) {//soft
                $("#fish-eye-btn").data("mount_soft", mount);
                gVar.LocalFishEye.mountMode = mount;
                $("#live .mode-soft-div").css('display', 'none').attr('name', '');
                $("#mode-soft_" + mount).css('display', '').attr('name', 'active');
                var show = $("#mode-soft_" + mount + " .display-mode[name='active']").data('mode');
                if (typeof show == "undefined") {
                    $("#mode-soft_" + mount + " .display-mode:first").click();
                } else {
                    $("#mode-soft_" + mount + " .display-mode").attr('name', '');
                    $("#mode-soft_" + mount + " .display-mode[data-mode='" + show + "']").click();
                }
            }
        } else {
            return;
        }
    });

    $(".mode-hard .display-mode").on('click', function () {
        if ($(this).attr("name") !== "active") {
            var param = {};
            param.code_mode = 1;
            param.mount_mode_0 = gVar.LocalFishEye.mountMode * 1;
            param.show_mode_0 = gVar.LocalFishEye.showMode * 1;
            param.mount_mode_1 = $("#live .install-mode[name='active']").data("mode") * 1;
            param.show_mode_1 = $(this).data("mode") * 1;
            var tempObj = {},
                i, channel;
            tempObj.x = 0;
            tempObj.y = 0;
            param.pos = [];
            for (i = 0; i < 4; i++) {
                param.pos[i] = tempObj;
            }
            tempObj = null;
            channel = $(".channelRow[name='active']").attr("id").split("_")[1] * 1;
            channel = isNaN(channel) ? 0 : channel;
            param.cur_pos = channel;
            param.bsave_pos = 0;
            RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 2000, "Set", param);
        } else {
            return;
        }
    });

    $('#live .mode-soft .display-mode').on('click', function () {
        if ($(this).attr("name") !== "active") {
            var showMode = $(this).data('mode') * 1;
            var channel = $("#channelList").attr("selectIndex") * 1;
            var $that = $(this);
            gVar.LocalFishEye.showMode = showMode;

            gDevice.SetFishEyeSoftMode(channel, showMode);

            //while changing mode, inite ptz curise status
            $("#fish-eye-btn").data("preChannel", 0);
            $("#live_yt6_21").data("mouseDown", false);
            //gDevice.PreviewStop([channel]);
//			gDevice.StopFishEyeSoft(channel);
//			var ret = gDevice.PreviewPlay([channel],showMode);
//			var ret = gDevice.SetFishEyeSoftMode(channel,showMode);
//			if(errCodeEnum.Code_Success == ret.Code){
            var $objs = $("#live .mode-soft-div[name='active'] .display-mode");
            $objs.attr('name', '');
            $that.attr('name', 'active');
//			}
        } else {
            return;
        }
    });

    $('.list-box').on('click', function () {
        var listID = $(this).attr("id");
        var $mode = $('.mode');
        var $modeHard = $('.mode-hard');
        var $modeSoft = $('.mode-soft');
        var codeMode = $('.code-mode[name="active"]').attr("id");
        switch (listID) {
            case 'installation': {
                if ($mode.attr("name") !== "active") {
                    $mode.css("display", "block").attr("name", "active");
                } else {
                    $mode.css("display", "none").attr("name", "");
                }
            }
                break;
            case 'display': {
                if (codeMode === 'hard_code') {
                    if ($modeHard.attr("name") !== "active") {
                        $modeSoft.css("display", "none").attr("name", "");
                        $modeHard.css("display", "block").attr("name", "active");
                    } else {
                        $modeHard.css("display", "none").attr("name", "");
                    }
                } else {
                    if ($modeSoft.attr("name") !== "active") {
                        $modeHard.css("display", "none").attr("name", "");
                        $modeSoft.css("display", "block").attr("name", "active");
                    } else {
                        $modeSoft.css("display", "none").attr("name", "");
                    }
                }
            }
                break;
            case 'fishEyeChn': {
                if ($("#fishEyeChannelList").attr("name") !== "active") {
                    $("#fishEyeChannelList").css("display", "block").attr("name", "active");
                } else {
                    $("#fishEyeChannelList").css("display", "none").attr("name", "");
                }
            }
                break;
            default:
                break;
        }
    });

    $("#PTZBtn").mouseover(function () {
        if ($(this).attr("name") != "active") {
            $(this).css("background-position", "-32px -32px");
        }
    }).mouseout(function () {
        if ($(this).attr("name") != "active") {
            $(this).css("background-position", "0 -32px");
        }
    }).click(function () {
        var $this = $(this);
        if ($this.attr("name") == "active") {   //
            $(this).css("background-position", "0 -32px");
            $(".liveMain").css("right", "0");
            $("#PTZSetting").css("display", "none");
            $this.attr("name", "");
        } else {
            $(this).css("background-position", "-64px -32px");
            if ($("#colorBtn").attr("name") == "active") {
                $("#colour").css("display", "none");
                $("#colorBtn").attr("name", "").css("background-position", "0 0");
            }
            $(".liveMain").css("right", "190px");
            $("#PTZSetting").css("display", "block");
            $this.attr("name", "active");
            if (gDevice.loginRsp.autoFocus.PTZVersion) {
                $("#ptzNM_refresh").click();
            }
            if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[2]) {
                RfParamCall(autoFocusUserCall, "ColorSet", paramPage.MsgParamIPCCameaFocusInfo, 0, "Get");
            }
        }
        if (!$.browser.msie) {
            PluginsMove($("#liveOcx"));
        }
    });

    $("#colorBtn").mouseover(function () {
        if ($(this).attr("name") != "active") {
            $(this).css("background-position", "-32px 0");
        }
    }).mouseout(function () {
        if ($(this).attr("name") != "active") {
            $(this).css("background-position", "0 0");
        }
    }).on('click', function () {
        var $this = $(this);
        if ($this.attr("name") == "active") {   //
            $(this).css("background-position", "0 0");
            $(".liveMain").css("right", 0);
            $("#colour").css("display", "none");
            $this.attr("name", "");
        } else {
            $(this).css("background-position", "-64px 0");
            if ($("#PTZBtn").attr("name") == "active") {
                $("#PTZSetting").css("display", "none");
                $("#PTZBtn").attr("name", "").css("background-position", "0 -32px");
            }
            $(".liveMain").css("right", "190px");
            $("#colour").css("display", "block");
            $this.attr("name", "active");
            if (gDevice.devType != devTypeEnum.DEV_IPC) {
                ShowSharpness();
            } else if (typeof $this.data("f") == "undefined") {
                $this.data("f", "ok");
                RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
            }
        }
        if (!$.browser.msie) {
            PluginsMove($("#liveOcx"));
        }
    });

    $("#mainStream").click(function () {
        if ($(this).hasClass("streamBtnDisable")) {
            return;
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if ($(this).attr("name") == "active") {
                return;
            }
            $(".streamBtn").removeClass("streamActiveBtnIPC");
            $(this).addClass("streamActiveBtnIPC");
        }

        $(".streamBtn").attr("name", "");
        $(this).attr("name", "active");

        var chnArr = [];
        var _streamArr = [];
        //
        //Open the window of the current display
        var mode = $("#divideScreen").attr("mode") * 1;
        var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
//        if (mode == SplitModeEnum.WINDOW_MODE_1) {
//            curInde = $("#channelList").attr("selectIndex") * 1;
//        }
        for (var i = 0; i < numPerPage(mode); ++i) {
            if (i + curInde >= gDevice.loginRsp.ChannelNum) {
                break;
            }
            //subSteam、mobStream --> mainStream
            if ($("#chnPlay_" + (i + curInde)).attr("name") == "active" && $("#channelRow_" + (i + curInde)).data("streamType") != streamTypeEnum.MainStreamType
                || gDevice.devType == devTypeEnum.DEV_IPC) {
                if (hasStreamType(i + curInde, streamTypeEnum.MainStreamType)) {
                    chnArr.push(i + curInde);
                    _streamArr.push(streamTypeEnum.MainStreamType);
                    //$("#channelRow_" + (i+curInde)).data("streamType", streamTypeEnum.MainStreamType);
                }
            }
        }
        //Has been the main stream preview window + Ready to cut into the main stream preview window
        if (getMainstreamNum() + chnArr.length > g_MainStreamNum) {
            return;
        }
        for (var i = 0; i < chnArr.length; i++) {
            $("#channelRow_" + chnArr[i]).data("streamType", streamTypeEnum.MainStreamType);
        }
        $(".streamBtnBox").data("AllPlay", true);
        gDevice.SetStreamType(_streamArr, chnArr);
        RestoreLiveStatus();
        updateChannelState($("#channelList").attr("selectIndex"));
        if (gDevice.devType == devTypeEnum.DEV_IPC || gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[152]) {
            if ($("#originalSize").attr("name") == "active") {
                gDevice.SetVideoratio(1);
            } else {
                gDevice.SetVideoratio(0);
            }
        }

    });

    $("#subStream").click(function () {
        if (g_bLimitMainPreview) {
            //Limits the main stream preview, mainStream button may be grey. Always can click subStream button
        } else {
            if ($(this).attr("name") == "active" && gDevice.devType == devTypeEnum.DEV_IPC) {
                return;
            }
        }

        $(".streamBtn").attr("name", "");
        $(this).attr("name", "active");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $(".streamBtn").removeClass("streamActiveBtnIPC");
            $(this).addClass("streamActiveBtnIPC");
        }

        var chnArr = [];
        var _streamArr = [];

        var mode = $("#divideScreen").attr("mode") * 1;
        var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
//        if (mode == SplitModeEnum.WINDOW_MODE_1) {
//            curInde = $("#channelList").attr("selectIndex") * 1;
//        }
        for (var i = 0; i < numPerPage(mode); ++i) {
            if (i + curInde >= gDevice.loginRsp.ChannelNum) {
                break;
            }
            if (hasStreamType(i + curInde, streamTypeEnum.SubStreamType)) {
                chnArr.push(i + curInde);
                _streamArr.push(streamTypeEnum.SubStreamType);
                $("#channelRow_" + (i + curInde)).data("streamType", streamTypeEnum.SubStreamType);
                //stream
            }
        }
        $(".streamBtnBox").data("AllPlay", true);
        gDevice.SetStreamType(_streamArr, chnArr);
        RestoreLiveStatus();
        updateChannelState($("#channelList").attr("selectIndex"));
        if (gDevice.devType == devTypeEnum.DEV_IPC || gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[152]) {
            if ($("#originalSize").attr("name") == "active") {
                gDevice.SetVideoratio(1);
            } else {
                gDevice.SetVideoratio(0);
            }
        }
    });

    $("#mobileStream").click(function () {
        if (g_bLimitMainPreview) {
            //Limits the main stream preview, mainStream button may be grey. Always can click subStream button
        } else {
            if ($("#mobileStream").attr("name") == "active" && gDevice.devType == devTypeEnum.DEV_IPC) {
                return;
            }
        }

        $(".streamBtn").attr("name", "");
        $(this).attr("name", "active");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $(".streamBtn").removeClass("streamActiveBtnIPC");
            $(this).addClass("streamActiveBtnIPC");
        }

        var chnArr = [];
        var _streamArr = [];

        var mode = $("#divideScreen").attr("mode") * 1;
        var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
//        if (mode == SplitModeEnum.WINDOW_MODE_1) {
//            curInde = $("#channelList").attr("selectIndex") * 1;
//        }
        for (var i = 0; i < numPerPage(mode); ++i) {
            if (i + curInde >= gDevice.loginRsp.ChannelNum) {
                break;
            }
            if (hasStreamType(i + curInde, streamTypeEnum.MobileStreamType)) {
                chnArr.push(i + curInde);
                _streamArr.push(streamTypeEnum.MobileStreamType);
                $("#channelRow_" + (i + curInde)).data("streamType", streamTypeEnum.MobileStreamType);
                //stream
            }
        }
        $(".streamBtnBox").data("AllPlay", true);
        gDevice.SetStreamType(_streamArr, chnArr);
        RestoreLiveStatus();
        updateChannelState($("#channelList").attr("selectIndex"));
        if (gDevice.devType == devTypeEnum.DEV_IPC || gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[152]) {
            if ($("#originalSize").attr("name") == "active") {
                gDevice.SetVideoratio(1);
            } else {
                gDevice.SetVideoratio(0);
            }
        }
    });

    $("#fourStream").click(function () {
        if (g_bLimitMainPreview) {
            //Limits the main stream preview, mainStream button may be grey. Always can click subStream button
        } else {
            if ($("#fourStream").attr("name") == "active" && gDevice.devType == devTypeEnum.DEV_IPC) {
                return;
            }
        }

        $(".streamBtn").attr("name", "");
        $(this).attr("name", "active");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $(".streamBtn").removeClass("streamActiveBtnIPC");
            $(this).addClass("streamActiveBtnIPC");
        }

        var chnArr = [];
        var _streamArr = [];

        var mode = $("#divideScreen").attr("mode") * 1;
        var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
        for (var i = 0; i < numPerPage(mode); ++i) {
            if (i + curInde >= gDevice.loginRsp.ChannelNum) {
                break;
            }
            if (hasStreamType(i + curInde, streamTypeEnum.FourStreamType)) {
                chnArr.push(i + curInde);
                _streamArr.push(streamTypeEnum.FourStreamType);
                $("#channelRow_" + (i + curInde)).data("streamType", streamTypeEnum.FourStreamType);
                //stream
            }
        }
        $(".streamBtnBox").data("AllPlay", true);
        gDevice.SetStreamType(_streamArr, chnArr);
        RestoreLiveStatus();
        updateChannelState($("#channelList").attr("selectIndex"));
        if (gDevice.devType == devTypeEnum.DEV_IPC || gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[152]) {
            if ($("#originalSize").attr("name") == "active") {
                gDevice.SetVideoratio(1);
            } else {
                gDevice.SetVideoratio(0);
            }
        }
    });

    $(".liveControlBtn").mouseover(function () {
        if ($(this).attr("d") == "disabled") {
            return;
        }
        if ($(this).attr("id") == "sound" || $(this).attr("id") == "floodLight") {
            if ($(this).attr("silence") != "silence") {
                if ((lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) && $(this).attr("id") == "floodLight") {
                    $(this).css("background-position", "-64px 0px");
                } else {
                    $(this).css("background-position", "-32px " + $(this).data("posy"));
                }
            } else {
                if ((lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) && $(this).attr("id") == "floodLight") {
                    $(this).css("background-position", "-32px 0px");
                } else {
                    $(this).css("background-position", "-96px " + $(this).data("posy"));
                }
            }
        } else if ($(this).attr("id") == "audioAlarm") {
            if ($(this).attr("silence") != "silence") {
                if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
                    $(this).css("background-position", "-64px -32px");
                } else {
                    $(this).css("background-position", "-32px " + $(this).data("posy"));
                }
            } else {
                if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
                    $(this).css("background-position", "-32px -32px");
                } else {
                    $(this).css("background-position", "-96px " + $(this).data("posy"));
                }
            }
        } else {
            if ($(this).attr("name") != "active") {
                $(this).css("background-position", "-32px " + $(this).data("posy"));
            }
        }
    }).mouseout(function () {
        if ($(this).attr("d") == "disabled") {
            return;
        }
        if ($(this).attr("id") == "sound" || $(this).attr("id") == "floodLight") {
            if ($(this).attr("silence") != "silence") {
                if ((lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) && $(this).attr("id") == "floodLight") {
                    $(this).css("background-position", "-64px 0px");
                } else {
                    $(this).css("background-position", "0px " + $(this).data("posy"));
                }
            } else {
                if ((lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) && $(this).attr("id") == "floodLight") {
                    $(this).css("background-position", "0px 0px");
                } else {
                    $(this).css("background-position", "-64px " + $(this).data("posy"));
                }
            }
        } else if ($(this).attr("id") == "audioAlarm") {
            if ($(this).attr("silence") != "silence") {
                if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
                    $(this).css("background-position", "-64px -32px");
                } else {
                    $(this).css("background-position", "0px " + $(this).data("posy"));
                }
            } else {
                if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
                    $(this).css("background-position", "0px -32px");
                } else {
                    $(this).css("background-position", "-64px " + $(this).data("posy"));
                }
            }
        } else {
            if ($(this).attr("name") != "active") {
                $(this).css("background-position", "0px " + $(this).data("posy"));
            }
        }
    }).click(function () {
        var curId = $(this).attr("id");
        if ($(this).attr("d") == "disabled") {
            return;
        }
        switch (curId) {
            case "play": {
                if (gDevice.devType == devTypeEnum.DEV_IPC &&
                    ((!gDevice.loginRsp.FishEye.isFishEye) ||
                        (gDevice.loginRsp.FishEye.isFishEye && (gDevice.loginRsp.FishEye.curStreamNum == 1)))
                ) {
                    var channel = 0,
                        ret;
                    if (gDevice.hasPreviewRight(channel) == false) {
                        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_NO_PREVIEW"));
                        return false;
                    }

                    //fisheye soft
                    if (gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {//soft
                        ret = gDevice.PreviewPlay([0], playType.fishEyeSoftPlay);
                        gDevice.SetFishEyeSoftMode(0, gVar.LocalFishEye.showMode);
//						ret = gDevice.SetFishEyeSoftMode(0,gVar.LocalFishEye.showMode);
                    } else {
                        ret = gDevice.PreviewPlay([0]);
                    }

                    if (errCodeEnum.Code_Success == ret.Code) {
                        if (gDevice.loginRsp.FishEye.isFishEye) {
                            for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
                                $("#chnPlay_" + i).attr("name", "active").css("background-position", "-44px 0");
                                $("#chnRec_" + i).attr("name", "").css("background-position", "0 -22px");
                                $("#chnCap_" + i).attr("name", "").css("background-position", "0 -44px");
                                $("#chnStream_" + i).attr("name", "").css("background-position", "0 -66px");
                            }
                        }
                        if (!gDevice.loginRsp.FishEye.isFishEye) {
                            $(this).css("display", "none").attr("name", "active");
                        } else {
                            $(this).css("display", "").attr("name", "active").css("background-position", "-64px " + $(this).data("posy"));
                        }
                        $("#stop").css("display", "").attr("name", "").css("background-position", "0px " + $("#stop").data("posy"));
                        $("#capture").attr("d", "").css("background-position", "0px " + $("#capture").data("posy"));
                        $("#record").attr("d", "").css("background-position", "0px " + $("#record").data("posy"));
                        $("#digitalZoom").attr("d", "").css("background-position", "0px " + $("#digitalZoom").data("posy"));
                        $("#Ptz3dPos").attr("d", "").css("background-position", "0px " + $("#3dPtzPos").data("posy"));
                        resizeRecordStatus(0);
                    }
                } else {
                    var channelNum = getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum);
                    var chnArr = [];
                    var index = 0;
                    var _streamType = [];
                    var noRightCh = [];

                    //Just open the window of the current page
                    var mode = $("#divideScreen").attr("mode") * 1;
                    var pageIndex = $("#curPageText").val() * 1 - 1;
                    var curInde = numPerPage(mode) * pageIndex;
                    for (var i = curInde; i < (curInde + numPerPage(mode)); ++i) {
                        if (i >= channelNum) {
                            break;
                        }
                        //for (var i = 0; i < channelNum; ++i) {

                        $("#channelRow_" + i).data("open", true);
                        if (gDevice.isOnline(i) && $("#chnPlay_" + i).attr("name") != "active") {
                            if (gDevice.hasPreviewRight(i) == false) {
                                noRightCh.push(gVar.chName(i));
                                continue;
                            }

                            var streamtype;
                            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                                if ($("#mainStream").attr("name") == "active") {
                                    streamtype = streamTypeEnum.MainStreamType;
                                } else if ($("#subStream").attr("name") == "active") {
                                    streamtype = streamTypeEnum.SubStreamType;
                                } else if ($("#mobileStream").attr("name") == "active") {
                                    streamtype = streamTypeEnum.MobileStreamType;
                                } else if ($("#fourStream").attr("name") == "active") {
                                    streamtype = streamTypeEnum.FourStreamType;
                                }
                            } else {
                                streamtype = g_defaultStreamType;//
                            }

                            var ability = getChnStreamAbility(i);
                            if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                                if (ability[streamtype]) {
                                    chnArr.push(i);
                                    _streamType[i] = streamtype;
                                }
                            } else {
                                _streamType[index] = getAvailableStream(streamtype, ability);
                                $("#channelRow_" + i).data("streamType", _streamType[index]);
                                chnArr[index++] = i;
                            }
                        }
                    }
                    if (noRightCh.length) {
                        ShowPaop(lg.get("IDS_WARNING"), noRightCh + lg.get("IDS_NO_PREVIEW"));
                    }

                    if (chnArr.length == 0) {
                        return;
                    }

                    $(".streamBtnBox").data("AllPlay", true);
                    //fisheye soft
                    var ret;
                    if ($("#fisheye").attr("name") == "active"
                        && gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE)
                        && $("#fish-eye-btn").data("code") * 1 == 0) {//soft
                        ret = gDevice.PreviewPlay(chnArr, playType.fishEyeSoftPlay);
                        gDevice.SetFishEyeSoftMode($("#channelList").attr("selectIndex") * 1, gVar.LocalFishEye.showMode);
//						ret = gDevice.SetFishEyeSoftMode(0,gVar.LocalFishEye.showMode);
                    } else {
                        ret = gDevice.PreviewPlay(chnArr);
                    }
                    gDevice.SetStreamType(_streamType, chnArr);
                    if (errCodeEnum.Code_Success == ret.Code) {
                        for (var i = 0; i < ret.Data.length; i++) {
                            if (ret.Data[i].Code == errCodeEnum.Code_Success) {
                                $("#chnPlay_" + ret.Data[i].Channel).attr("name", "active").css("background-position", "-44px 0");
                                $("#chnRec_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -22px");
                                $("#chnCap_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -44px");
                                $("#chnStream_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 -66px");
                                resizeRecordStatus(ret.Data[i].Channel);
                            }
                        }
                        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                            $(this).css("display", "").attr("name", "active").css("background-position", "-64px " + $(this).data("posy"));
                            $("#stop").css("display", "").attr("name", "").css("background-position", "0px " + $("#stop").data("posy"));
                        }
                    }
                }
            }
                break;
            case "stop": {
                if (gDevice.devType == devTypeEnum.DEV_IPC &&
                    ((!gDevice.loginRsp.FishEye.isFishEye) ||
                        (gDevice.loginRsp.FishEye.isFishEye && (gDevice.loginRsp.FishEye.curStreamNum == 1)))
                ) {
                    var ret;
                    if ($("#record").attr("name") == "active") {
                        ret = gDevice.PreViewRec(0, [0]);
                        if (ret.Code == errCodeEnum.Code_Success) {
                            var url = ret.Data[0].Url;
                            //var urlstr = url.split("\\").join("\\\\");
                            var urlstr;
                            if ($.browser.safari) {
                                url = url.substring(0, url.lastIndexOf("\/"));
                                urlstr = url.split("\/").join("\/\/");
                            } else {
                                url = url.substring(0, url.lastIndexOf("\\"));
                                urlstr = url.split("\\").join("\\\\");
                            }
                            var strColor = "#32A0E1";
                            if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                                strColor = "rgb(79,161,24);";
                            }
							
							var strFolder = "Folder";
							if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
								strFolder = "Ordner";
							}
							if (lgCls.version == gVar.CtArr[19]) {
								strFolder = lg.get("IDS_FLODER");
							}
					
                            ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                                + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;"
                                + "</div>");
                            $("#record").css("background-position", "0 -224px").attr("name", "");
                        }
                    }
                    ret = gDevice.PreviewStop([0]);
                    if (errCodeEnum.Code_Success == ret.Code) {
                        if (gDevice.loginRsp.FishEye.isFishEye) {
                            for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
                                $("#chnPlay_" + i).attr("name", "").css("background-position", "0 0px");
                                $("#chnRec_" + i).attr("name", "").css("background-position", "0 -22px");
                                $("#chnCap_" + i).attr("name", "").css("background-position", "0 -44px");
                                $("#chnStream_" + i).attr("name", "").css("background-position", "0 -66px");
                            }
                        }
                        if (!gDevice.loginRsp.FishEye.isFishEye) {
                            $(this).css("display", "none");
                        } else {
                            $(this).css("display", "").attr("name", "active").css("background-position", "-64px " + $(this).data("posy"));
                        }
                        $("#play").css("display", "").attr("name", "").css("background-position", "0px " + $("#play").data("posy"));

                        $("#capture").attr("d", "disabled").css("background-position", "-96px " + $("#capture").data("posy"));
                        $("#record").attr("d", "disabled").css("background-position", "-96px " + $("#record").data("posy"));
                        $("#digitalZoom").attr("d", "disabled").css("background-position", "-96px " + $("#digitalZoom").data("posy"));
                        $("#Ptz3dPos").attr("d", "disabled").css("background-position", "-96px " + $("#3dPtzPos").data("posy"));
                    }
                } else {
                    var chnArr = [];
                    var recArr = [];
                    var index = 0;
                    for (var i = 0; i < getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum); i++) {
                        if ($("#chnPlay_" + i).attr("name") == "active") {
                            chnArr[index++] = i;
                        }
                        if ($("#chnRec_" + i).attr("name") == "active") {
                            recArr[index++] = i;
                        }
                    }
                    

                    if (chnArr.length == 0) {
                        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                            $(this).css("display", "");
                            $("#play").css("display", "");
                        }
                        return;
                    }
                    //change zoom btn state
                    if ($("#digitalZoom").attr("name") == "active") {
                        var ret = gDevice.PreViewZoom();
                        if (ret.Code == errCodeEnum.Code_Success) {
                            $("#digitalZoom").attr("name", "");
                            $("#digitalZoom").css("background-position", "-64px -288px");
                        }
                    }
                    if (recArr.length != 0) {
                        var ret = gDevice.PreViewRec(0, recArr);
                        if (ret.Code == errCodeEnum.Code_Success) {
                            var url = ret.Path;
                            //var urlstr = url.split("\\").join("\\\\");
                            var urlstr;
                            if ($.browser.safari) {
                                url = url.substring(0, url.lastIndexOf("\/"));
                                urlstr = url.split("\/").join("\/\/");
                            } else {
                                url = url.substring(0, url.lastIndexOf("\\"));
                                urlstr = url.split("\\").join("\\\\");
                            }
                            var strColor = "#32A0E1";
                            if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                                strColor = "rgb(79,161,24);";
                            }
							
							var strFolder = "Folder";
							if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
								strFolder = "Ordner";
							}
							if (lgCls.version == gVar.CtArr[19]) {
								strFolder = lg.get("IDS_FLODER");
							}
					
                            ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                                + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;"
                                + "</div>");
                            $("#record").css("background-position", "0 -224px").attr("name", "");
                        }
                    }
                    var ret = gDevice.PreviewStop(chnArr);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        $("#digitalZoom").attr("name", "").css("background-position", "0px -288px");
                        $("#channelRow_" + i).data("open", false);
                        for (var i = 0; i < ret.Data.length; i++) {
                            if (ret.Data[i].Code == errCodeEnum.Code_Success) {
                                $("#chnPlay_" + ret.Data[i].Channel).attr("name", "").css("background-position", "0 0");
                                $("#chnRec_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -22px");
                                $("#chnCap_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -44px");
                                if ($("#chnStream_" + ret.Data[i].Channel).attr("isClick") == "active") {
                                    $("#chnStream_" + ret.Data[i].Channel).attr("isClick", "");
                                    tip_main.css("display", "none").blur();
                                }
                                $("#chnStream_" + ret.Data[i].Channel).attr("name", "").css("background-position", "-66px -66px");
                            }
                        }
                        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                            $(this).css("display", "").attr("name", "active").css("background-position", "-64px " + $(this).data("posy"));
                            $("#play").css("display", "").attr("name", "").css("background-position", "0px " + $("#play").data("posy"));
                        }
                    }
                }
            }
                break;
            case "originalSize":
                if(lgCls.skin == "white_c238"){
                    $("#originalSize").css("display","none");
                    $("#adaptive").css("display","block");
                    gDevice.SetVideoratio(1);
                    return ;
                }
                if ($(this).attr("name") != "active") {
                    str = gDevice.SetVideoratio(1);
                    $(this).css("background-position", "-64px -128px").attr("name", "active");
                    $("#adaptive").css("background-position", "0 -160px").attr("name", "");
                }
                break;
            case "adaptive":
                if(lgCls.skin == "white_c238"){
                    $("#adaptive").css("display","none");
                    $("#originalSize").css("display","block");
                    gDevice.SetVideoratio(0);
                    return ;
                }
                if ($(this).attr("name") != "active") {
                    gDevice.SetVideoratio(0);
                    $(this).css("background-position", "-64px -160px").attr("name", "active");
                    $("#originalSize").css("background-position", "0 -128px").attr("name", "");
                }
                break;
            case "fullScreen":
                gDevice.setPreviewFullScreen(true);
                if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                    gDevice.PreviewDbclkFullscreen(false);
                }
                break;
            case "record":
                if (gVar.bCapturePermissionLimit) {
                    if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualRecord)) {
                        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                        return;
                    }
                }
                var chnArr = [];
                var index = 0;
                if (gDevice.devType == devTypeEnum.DEV_IPC &&
                    ((!gDevice.loginRsp.FishEye.isFishEye) ||
                        (gDevice.loginRsp.FishEye.isFishEye && (gDevice.loginRsp.FishEye.curStreamNum == 1)))
                ) {
                    chnArr[0] = 0;
                } else {
                    var num = gDevice.loginRsp.ChannelNum;
                    if (gDevice.loginRsp.ZeroChFlag) {
                        num = gDevice.loginRsp.ChannelNum + 1;
                    }
                    for (var i = 0; i < num; i++) {
                        if ($("#chnPlay_" + i).attr("name") == "active") {
                            chnArr[index++] = i;
                        }
                    }
                }

                if (chnArr.length == 0) return;
                if ($(this).attr("name") != "active") {
                    var ret = gDevice.PreViewRec(1, chnArr);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        $(this).css("background-position", "-64px -224px");
                        $(this).attr("name", "active");
                    }
                } else {
                    var ret = gDevice.PreViewRec(0, chnArr);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        var url;
                        url = gDevice.devType == devTypeEnum.DEV_IPC ? ret.Data[0].Url : ret.Path;
                        //var urlstr = url.split("\\").join("\\\\");
                        if (typeof url == "undefined") {
                            return;
                        }
                        var urlstr;
                        if ($.browser.safari) {
                            url = url.substring(0, url.lastIndexOf("\/"));
                            urlstr = url.split("\/").join("\/\/");
                        } else {
                            url = url.substring(0, url.lastIndexOf("\\"));
                            urlstr = url.split("\\").join("\\\\");
                        }
                        var strColor = "#32A0E1";
                        if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                            strColor = "rgb(79,161,24);";
                        } else if (lgCls.version == gVar.CtArr[192]) {
                            strColor = "rgb(6,169,78);";
                        }
						
						var strFolder = "Folder";
						if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
							strFolder = "Ordner";
						}
						if (lgCls.version == gVar.CtArr[19]) {
							strFolder = lg.get("IDS_FLODER");
						}
					
                        ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                            + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;"
                            + "</div>");

                        $(this).css("background-position", "0 -224px");
                        $(this).attr("name", "");
                    }
                }
                break;
            case "capture":
                if (gVar.bCapturePermissionLimit) {
                    if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualCapture)) {
                        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                        return;
                    }
                }
                var chnArr = [];
                var index = 0;
                var preView = "";
                if (gDevice.devType == devTypeEnum.DEV_IPC &&
                    ((!gDevice.loginRsp.FishEye.isFishEye) ||
                        (gDevice.loginRsp.FishEye.isFishEye && (gDevice.loginRsp.FishEye.curStreamNum == 1)))
                ) {
                    chnArr[0] = 0;
                } else {
                    var num = gDevice.loginRsp.ChannelNum;
                    if (gDevice.loginRsp.ZeroChFlag) {
                        num = gDevice.loginRsp.ChannelNum + 1;
                    }
                    for (var i = 0; i < num; i++) {
                        if ($("#chnPlay_" + i).attr("name") == "active") {
                            chnArr[index++] = i;
                        }
                    }
                }

                if (chnArr.length == 0) return;
                $(this).css("background-position", "-64px -256px");
                var ret = gDevice.PreViewCap(chnArr);
                if (ret.Code == errCodeEnum.Code_Success) {
                    var url = ret.Data[0].Url;
                    if (typeof url == "undefined") {
                        return;
                    }
                    var urlstr = $.browser.safari == true ? url.split("\/").join("\/\/") : url.split("\\").join("\\\\");
                    var path = ret.Path;
                    var pathstr = $.browser.safari == true ? path.split("\/").join("\/\/") : path.split("\\").join("\\\\");
                    var strColor = "#32A0E1";
                    if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                        strColor = "rgb(79,161,24);";
                    } else if (lgCls.version == gVar.CtArr[192]) {
                        strColor = "rgb(6,169,78);";
                    }
                    if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        preView = "<a style='color:" + strColor + "'  href='javascript:parent.gDevice.GetCapImage(\"" + urlstr + "\");'>Preview</a>"
                    } else {
                        url = path;
                    }
					
					var strFolder = "Folder";
					if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
						strFolder = "Ordner";
					}
					if (lgCls.version == gVar.CtArr[19]) {
						strFolder = lg.get("IDS_FLODER");
					}

                    ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                        + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + pathstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;"
                        + preView + "</div>");

                    if ((gDevice.loginRsp.PageControl >> 10) & 0x01) {
                        $("#capture").data("snap",true);
                        saveLiveParam(1);
                    }

                }
                break;
            case "digitalZoom":
                var ret = gDevice.PreViewZoom();
                if ($(this).attr("name") != "active") {
                    if (ret.Code == errCodeEnum.Code_Success) {
                        $(this).attr("name", "active");
                        $(this).css("background-position", "-64px -288px");
                    }
                } else {
                    if (ret.Code == errCodeEnum.Code_Success) {
                        $(this).attr("name", "");
                        $(this).css("background-position", "0 -288px");
                    }
                }
                break;
            case "sound":
                if ($("#talkback").attr("name") == "active") {
                    return;
                }
                if ($(this).attr("name") != "active") {
                    if(lgCls.skin == "white_c238"){
                        marginLeft = $("#mfoot").offset().left;
                    }
                    var _left = $(this).offset().left - marginLeft;
                    if ($("#moreScreens").attr("data-name") == "active") {
                        var divideScreen = $("#divideScreen")
                        divideScreen.css({"background-position": "0 " + divideScreen.data("pos").split(" ")[1]}).attr({
                            "name": "",
                            "hasClick": ""
                        });
                        $("#moreScreens").css({
                            width: "0px",
                            "border": "none",
                            "display": "none"
                        }).attr("data-name", "");
                        $(".divideMode").css({"display": "none", "width": "0px"});
                    }
                    if ($('#liveLightBox').attr("data-name") == "active") {
                        $('#liveLightBox').fadeOut(300).attr("data-name", "");
                        $('#floodLight').attr("name", "");
                    }
                    if ($('#audioAlarm').attr("name") == "active") {
                        $('#audioAlarm').click();
                    }
                    $('#liveSoundLineBox').css({"margin-left": _left}).fadeIn(300).attr("data-name", "active");
                    $(this).attr("name", "active");
                } else {
                    $('#liveSoundLineBox').fadeOut(300).attr("data-name", "");
                    $(this).attr("name", "");
                }
                break;
            case "talkback":
                if(lgCls.skin == "white_c238"){
                    marginLeft = $("#mfoot").offset().left;
                }
                var _left = $(this).offset().left - marginLeft;
                if ($(this).attr("name") != "active") {
                    var ret = gDevice.DualTalk(1);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        $("#liveSoundLineBox").hide();
                        //$('#dualtalkSoundLineBox').css({"margin-left":_left }).fadeIn(300).attr("data-name","active");
                        $("#talkback").data("LastLiveSound", $("#sound").attr("silence"));
                        if ($("#talkback").data("LastLiveSound") != "silence") {
                            $("#liveSmallImg").click();
                        }
                        $("#sound").css("opacity", "0.4").attr("d", "disabled");
                        $(this).attr("name", "active");
                        $(this).css("background-position", "-64px -416px");
                    }
                } else {
                    var ret = gDevice.DualTalk(0);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        if ($("#talkback").data("LastLiveSound") != "silence") {
                            $("#liveSmallImg").click();
                        }
                        //$('#dualtalkSoundLineBox').fadeOut(300).attr("data-name","");
                        $("#sound").css("opacity", "1").attr("d", "");
                        $(this).attr("name", "");
                        $(this).css("background-position", "0 -416px");
                    }
                }
                break;
            case "fisheye":
                if ($(this).attr("name") != "active") {
                    enterFisheyeSoft();
                    $(this).attr("name", "active");
                    $(this).css("background-position", "-64px -448px");
                } else {
                    exitFisheyeSoft();
                    $(this).attr("name", "");
                    $(this).css("background-position", "-0px -448px");
                }
                break;
            case "binoculars":
                break;
            case "showIntelligent":
                if ($(this).attr("name") != "active") {
                    $(this).attr("name", "active");
                } else {
                    $(this).attr("name", "");
                }
                saveLiveParam(1);
                break;
            case "floodLight":
                if ((lgCls.version == gVar.CtArr[0] && !gVar.bC0_0305_3120101) || gVar.bHDVRC7) {
                    $(this).attr("name", "");
                    var isSilence = $(this).attr("silence");    //The default mute
                    if (isSilence == "silence") {
                        $(this).css("background-position", "-64px 0px").attr("silence", "not");
                    } else {
                        $(this).css("background-position", "0px 0px").attr("silence", "silence");
                    }
					gVar.live_OperBtn = 2;
                    saveLiveParam(0);
                } else {
                    if ($(this).attr("name") != "active") {
                        if(lgCls.skin == "white_c238"){
                            marginLeft = $("#mfoot").offset().left;
                        }
                        var _left = $(this).offset().left - marginLeft;
                        if ($("#moreScreens").attr("data-name") == "active") {
                            var divideScreen = $("#divideScreen")
                            divideScreen.css({"background-position": "0 " + divideScreen.data("pos").split(" ")[1]}).attr({
                                "name": "",
                                "hasClick": ""
                            });
                            $("#moreScreens").css({
                                width: "0px",
                                "border": "none",
                                "display": "none"
                            }).attr("data-name", "");
                            $(".divideMode").css({"display": "none", "width": "0px"});
                        }
                        if ($('#liveSoundLineBox').attr("data-name") == "active") {
                            $('#liveSoundLineBox').fadeOut(300).attr("data-name", "");
                            $('#sound').attr("name", "");
                        }
                        if ($('#audioAlarm').attr("name") == "active") {
                            $('#audioAlarm').click();
                        }

                        $('#liveLightBox').css({"margin-left": _left}).fadeIn(300).attr("data-name", "active");
                        $(this).attr("name", "active");
                    } else {
                        $('#liveLightBox').fadeOut(300).attr("data-name", "");
                        $(this).attr("name", "");
                    }
                }
                break;
            case "flashLight":
                if ($(this).attr("name") != "active") {
                    $(this).attr("name", "active");
                    $(this).css("background-position", "-64px -576px");
                    $("#floodLight").css("display", "none");
                } else {
                    $(this).attr("name", "");
                    $(this).css("background-position", "-0px -576px");
                    $("#floodLight").css("display", "block");
                }
                saveLiveParam(0);
                break;
            case "audioAlarm":
                if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[0]) {
                    if ($(this).attr("silence") != "silence") {
                        $(this).attr("silence", "silence");
                        $(this).css("background-position", "0px -32px");
                    } else {
                        $("#foodlight_label").text("Are you sure you want to enable the camera siren?"
                            + "The siren is loud and should only be activated if necessary.");
                        $("#foodlight_prompt .btn_box").hide();
                        $("#siren_div").show();
                        $("#foodlight_prompt").show();
                        MasklayerShow();
                        return false;
                        $(this).css("background-position", "-96px -32px");
                    }
                    $(this).attr("name", "");
                } else {
                    if ((lgCls.version == gVar.CtArr[0] && !gVar.bC0_0305_3120101) || gVar.bHDVRC7) {
                        if ($(this).attr("silence") != "silence") {
                            $(this).attr("silence", "silence");
                            $(this).css("background-position", "0px -32px");
                        } else {
							var strLg = "Are you sure you want to enable the camera siren?"
                                + "The siren is loud and should only be activated if necessary."
							if(gVar.bHDVRC7){
								strLg = lg.get("IDS_SIREN_ALARM");
							}
                            $("#foodlight_label").text(strLg);
                            $("#foodlight_prompt .btn_box").hide();
                            $("#siren_div").show();
                            $("#foodlight_prompt").show();
                            MasklayerShow();
                            return;
                        }
                        $(this).attr("name", "");
                    } else {
                        if ($(this).attr("name") != "active") {
                            if(lgCls.skin == "white_c238"){
                                marginLeft = $("#mfoot").offset().left;
                            }
                            var _left = $(this).offset().left - marginLeft;
                            if ($("#divideScreen").attr("name") == "active") {
                                $("#divideScreen").click();
                            }
                            if ($('#sound').attr("name") == "active") {
                                $("#sound").click();
                            }
                            if ($('#floodLight').attr("name") == "active") {
                                $("#floodLight").click();
                            }

                            $('#audioAlarm_Box').css({"margin-left": _left}).fadeIn(300).attr("data-name", "active");
                            $(this).attr("name", "active");
                        } else {
                            $('#audioAlarm_Box').fadeOut(300).attr("data-name", "");
                            $(this).attr("name", "");
                        }
                    }
                }
				gVar.live_OperBtn = 1;
                saveLiveParam(0);
                break;
            case "showFPS":
                if ($(this).attr("name") != "active") {
                    gDevice.ShowFrameRate([0], 1);
                    $(this).attr("name", "active");
                } else {
                    gDevice.ShowFrameRate([0], 0);
                    $(this).attr("name", "");
                }
                break;
            case "Ptz3dPos":
                gDevice.PreView3DPosition();
                if ($(this).attr("name") != "active") {
                    $(this).attr("name", "active");
                    $(this).css("background-position", "-64px -640px");
                } else {
                    $(this).attr("name", "");
                    $(this).css("background-position", "0 -640px");
                }
                break;
            case "showBPS":
                if ($(this).attr("name") != "active") {
                    gDevice.ShowStreamRate([0], 1);
                    $(this).attr("name", "active");
                } else {
                    gDevice.ShowStreamRate([0], 0);
                    $(this).attr("name", "");
                }
                break;
            default :
                break;
        }
    });

    $("#siren_ok").click(function () {
        $("#foodlight_prompt").hide();
        MasklayerHide();
        if(gVar.bSirenTipsShow){
		    gVar.bSirenTipsShow = false;
            $("#flood_sirenswitch").removeClass("selectDisable").addClass("selectEnable").attr("data", "1");
            if(gDevice.devType == devTypeEnum.DEV_IPC && $("#flood_light").attr("d") == "active"){
                DivBox(1, $("#floodlight_sirenslider_div"));
                DivBox(1, $("#floodlight_sirenduration"));
            }
        	if(gDevice.devType == devTypeEnum.DEV_NVR){
				$("#floodlight_sirenslider_div").show();
			}
			if(gDevice.devType==devTypeEnum.DEV_HDVR){
				$("#floodlight_sirenduration").show();
				if($("#flood_channel").val()*1 < gDevice.loginRsp.AnalogChNum){
					$("#floodlight_sirenslider_div").hide();
				}else{
					$("#floodlight_sirenslider_div").show();
				}
			}
        }else{
        	if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
	            $("#audioAlarm").css("background-position", "-64px -32px").attr("silence", "not").attr("name", "");
	        } else {
	            $("#audioAlarm").css("background-position", "0px -608px").attr("silence", "not");
	            $("#audioAlarm_BoxImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
	        }
			gVar.live_OperBtn = 1;
	        saveLiveParam(0);
        }
    });
    $("#siren_cancel").click(function () {
        $("#foodlight_prompt").hide();
        if(gVar.bSirenTipsShow)
        	gVar.bSirenTipsShow = false;
        MasklayerHide();
    });

    var pos;
    $("#divideScreen").mouseover(function () {
        if ($(this).attr("name") != "active") {
            $(this).css({
                "background-position": "-45px " + $(this).data("pos").split(" ")[1],
                "cursor": "pointer"
            });
        }
    }).mouseout(function () {
        if ($(this).attr("name") != "active") {
            $(this).css("background-position", "0 " + $(this).data("pos").split(" ")[1]);
        }
    }).click(function () {
        if ($("#moreScreens").attr("data-name") == "") { // Split screen option is not shown
            pos = $(this).data("pos");
            $(this).css({"background-position": "-135px " + $(this).data("pos").split(" ")[1]}).attr({
                "name": "active",
                "hasClick": "active"
            });

            var count = 0;
            var mode = getSplitModeByChannelNum(gDevice.loginRsp.ChannelNum);
            if ($('#liveSoundLineBox').attr("data-name") == "active") {
                $('#liveSoundLineBox').css("display", "none").attr("data-name", "");
                $('#sound').attr("name", "");
            }
            $(".divideMode").each(function () {
                if ($(this).data("mode") * 1 <= mode) {
                    count++;
                    $(this).animate({width: "30px"}, 300).css("display", "block");
                } else {
                    $(this).css("display", "none");
                }
            });

            if ($("#listBtn").attr("name") == "active") {
                $("#moreScreens").css({
                    "margin-left": "235px",
                    "display": "block"
                }).animate({width: (count * 35 + 10 + "px")}, 300).attr("data-name", "active");
            } else {
                $("#moreScreens").css({"display": "block"}).animate({width: (count * 35 + 10 + "px")}, 300).attr("data-name", "active");
            }
        } else {
            $(this).css({"background-position": "0 " + $(this).data("pos").split(" ")[1]}).attr({
                "name": "",
                "hasClick": ""
            });
            $("#moreScreens").animate({width: "0px"}, 300).fadeOut(10).css({"border": "none"}).attr("data-name", "");
            $(".divideMode").animate({width: "0px"}, 300).css("display", "none");
        }
    });

    var oriPos, tempLeft, tempTop;
    $(".divideMode").mouseover(function () {
        $(this).css("cursor", "pointer");
        oriPos = $(this).css("background-position");
        var hoverPos = $(this).data("hover");
        tempLeft = hoverPos.split(" ")[0];
        tempTop = hoverPos.split(" ")[1];
        if ($(this).attr("data-name") != "active") {
            $(this).css("background-position", "-" + tempLeft + "px " + "-" + tempTop + "px");
        }
    }).mouseout(function () {
        if ($(this).attr("data-name") != "active") {
            $(this).css("background-position", oriPos);
        }
    }).click(function () {
        if ($(this).attr("data-name") != "active") {
            var mode = $(this).data("mode") * 1;
            $("#divideScreen").attr("preMode", mode);
            changeMode(mode, true);
            setSelectWnd(0);
        }
    });

    $("#curPageText").blur(function () {
        var reg = new RegExp("^[0-9]*[1-9][0-9]*$");
        var curPage = $('#curPageText').val() * 1;
        if (!reg.test(curPage)) {
            $("#curPageText").val(1) * 1;
        } else {
            if (curPage <= 0) {
                $("#curPageText").val(1) * 1;
            } else if (curPage >= $("#totalPage").text() * 1) {
                $("#curPageText").val($("#totalPage").text() * 1);
            }
        }
        updatePreOrNextBtnStatus();
    }).keydown(function (e) {
        if (e.which == 13) {
            $(this).blur();
        }
    });

    $(".pageBtn").mouseover(function () {
        if (!$(this).attr("disabled")) {
            $(this).css({"background-position": "-18px " + $(this).data("posy"), "cursor": "pointer"});
        }
    }).mouseout(function () {
        if (!$(this).attr("disabled")) {
            $(this).css("background-position", "0 " + $(this).data("posy"));
        }
    }).click(function () {
        if ($(this).attr("disabled")) return;

        //Close all videos
        $(".liveControlBtn#stop").click();

        $(this).css("background-position", "-36px " + $(this).data("posy"));
        var curId = $(this).attr("id");
        switch (curId) {
            case "firstPage": {
                $("#curPageText").val(1);
            }
                break;
            case "prePage": {
                var curPage = $("#curPageText").val() * 1;
                $("#curPageText").val(curPage - 1);
            }
                break;
            case "nextPage": {
                var curPage = $("#curPageText").val() * 1;
                $("#curPageText").val(curPage + 1);
            }
                break;
            case "lastPage": {
                $("#curPageText").val($("#totalPage").text() * 1);
            }
                break;
        }
        updatePreOrNextBtnStatus();

        //Open the window of the current display
        var mode = $("#divideScreen").attr("mode") * 1;
        var curInde = numPerPage(mode) * ($("#curPageText").val() * 1 - 1);
        if (mode == SplitModeEnum.WINDOW_MODE_1) {
            curInde = gDevice.getPreviewViewsIndex().Data[curInde];
        }
        setSelectWnd(curInde);
        for (var i = 0; i < numPerPage(mode); i++) {
            $("#chnPlay_" + (i + curInde)).click();
        }
    });

    $(".channelRow").click(function () {
        var channel = $(this).attr("id").split("_")[1] * 1;
        if (!($("#chnPlay_" + channel).attr("name") == "active")) {
            return;
        }
        var mode = $("#divideScreen").attr("mode") * 1;
        var pageIndex = $("#curPageText").val() * 1 - 1;
        var newPageIndex = findPageIndexByChannel(channel, mode, gDevice.getPreviewViewsIndex().Data);
        if (pageIndex != newPageIndex) {
            //If the selected channel is in other pages, turn off all the Windows (except for "other paging")
            var newIndex = numPerPage(mode) * newPageIndex;
            var newPageStartCh = newIndex + (0);
            var newPageEndCh = newIndex + (numPerPage(mode) - 1);

            for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
                if (i < newPageStartCh || i > newPageEndCh) {//"Other paging" except
                    if ($("#chnPlay_" + i).attr("name") == "active") {
                        $("#chnPlay_" + i).click();
                    }
                }
            }
        }

        setSelectWnd(channel);
        if (!(gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye)) {
            //IE browser to refresh the page after the CSS style not refresh problems, delete no style style can refresh style
            $(".channelRow").each(function () {
                $(this).removeAttr("style");
            });
        }
    });

    $(".chnPlayBtn").mouseover(function () {
        if ($(this).attr("name") != "disable" && $(this).attr("name") != "active") {
            $(this).css("background-position", "-22px 0");
        }
    }).mouseout(function () {
        if ($(this).attr("name") != "disable" && $(this).attr("name") != "active") {
            $(this).css("background-position", "0 0");
        }
    }).click(function (e) {
        if ($(this).attr("name") == "disable") {
            return false;
        }
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if (gDevice.hasPreviewRight(channel) == false) {
            ShowPaop(lg.get("IDS_WARNING"), gVar.chName(channel) + lg.get("IDS_NO_PREVIEW"));
            return false;
        }
        if ($(this).attr("name") != "active") {
            var streamArr = [];
            var streamtype;

            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if ($("#mainStream").attr("name") == "active") {
                    streamtype = streamTypeEnum.MainStreamType;
                } else if ($("#subStream").attr("name") == "active") {
                    streamtype = streamTypeEnum.SubStreamType;
                } else if ($("#mobileStream").attr("name") == "active") {
                    streamtype = streamTypeEnum.MobileStreamType;
                } else if ($("#fourStream").attr("name") == "active") {
                    streamtype = streamTypeEnum.FourStreamType;
                }
            } else {
                var preMode = $("#divideScreen").attr("preMode") * 1;
                var mode = $("#divideScreen").attr("mode") * 1;
                if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112] &&
                    preMode != mode && mode == SplitModeEnum.WINDOW_MODE_1) {//HDVR && client && has change && change to singleWnd,use main stream
                    streamtype = 0;
                } else {
                    streamtype = g_defaultStreamType;//
                }
            }

            var ability = getChnStreamAbility(channel);
            streamArr[0] = getAvailableStream(streamtype, ability);
            $("#channelRow_" + channel).data("streamType", streamArr[0]);
            $(".streamBtnBox").data("AllPlay", false);
            gDevice.SetStreamType(streamArr, [channel]);
            var ret = gDevice.PreviewPlay([channel]);
            if (ret.Code == errCodeEnum.Code_Success) {
                $(this).attr("name", "active").css("background-position", "-44px 0");
                $("#chnRec_" + channel).attr("name", "").css("background-position", "0 -22px");
                $("#chnCap_" + channel).attr("name", "").css("background-position", "0 -44px");
                $("#chnStream_" + channel).attr("name", "").css("background-position", "0 -66px");
                $("#channelRow_" + channel).data("open", true);
                resizeRecordStatus(channel);
            }
            e.stopPropagation();//Spread to prevent events. ChannelRow events
        } else {
            if ($("#chnRec_" + channel).attr("name") == "active") {
                var ret = gDevice.PreViewRec(0, [channel]);
                if (ret.Code == errCodeEnum.Code_Success) {
                    if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                        var url = ret.Data[0].Url;
                        //$("#chnRec_" + channel).attr("name", "").css("background-position","-66px -22px");
                        //var urlstr = url.split("\\").join("\\\\");
                        var urlstr;
                        if ($.browser.safari) {
                            var urlTemp = url.substring(0, url.lastIndexOf("\/"));
                            urlstr = urlTemp.split("\/").join("\/\/");
                        } else {
                            var urlTemp = url.substring(0, url.lastIndexOf("\\"));
                            urlstr = urlTemp.split("\\").join("\\\\");
                        }
                        var strColor = "#32A0E1";
                        if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                            strColor = "rgb(79,161,24);";
                        }
						
						var strFolder = "Folder";
						if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
							strFolder = "Ordner";
						}
						if (lgCls.version == gVar.CtArr[19]) {
							strFolder = lg.get("IDS_FLODER");
						}
					
                        ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                            + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>"
                            + "</div>");
                    }
                }
            }
            var ret = gDevice.PreviewStop([channel]);
            if (ret.Code == errCodeEnum.Code_Success) {
                $(this).attr("name", "").css("background-position", "0px 0px");

                $("#chnRec_" + channel).attr("name", "").css("background-position", "-66px -22px");
                $("#chnCap_" + channel).attr("name", "").css("background-position", "-66px -44px");
                if ($("#chnStream_" + channel).attr("isClick") == "active") {
                    $("#chnStream_" + channel).attr("isClick", "");
                    tip_main.css("display", "none").blur();
                }
                $("#chnStream_" + channel).attr("name", "").css("background-position", "-66px -66px");
                $("#channelRow_" + channel).data("open", false);
            }
        }
    });

    $(".chnRecBtn").mouseover(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("name") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "-22px -22px");
        }
    }).mouseout(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("name") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "0 -22px");
        }
    }).click(function () {
        if (gVar.bCapturePermissionLimit) {
            if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualRecord)) {
                ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                return;
            }
        }
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($("#chnPlay_" + channel).attr("name") != "active") {
            return;
        }
        if ($(this).attr("name") != "active") {
            var ret = gDevice.PreViewRec(1, [channel]);
            if (ret.Code == errCodeEnum.Code_Success) {
                if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                    $(this).attr("name", "active").css("background-position", "-44px -22px");
                    return true;
                }
            }
        } else {
            var ret = gDevice.PreViewRec(0, [channel]);
            if (ret.Code == errCodeEnum.Code_Success) {
                if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                    var url = ret.Data[0].Url;
                    $(this).attr("name", "");
                    //var urlstr = url.split("\\").join("\\\\");
                    var urlstr;
                    if ($.browser.safari) {
                        var urlTemp = url.substring(0, url.lastIndexOf("\/"));
                        urlstr = urlTemp.split("\/").join("\/\/");
                    } else {
                        var urlTemp = url.substring(0, url.lastIndexOf("\\"));
                        urlstr = urlTemp.split("\\").join("\\\\");
                    }
                    var strColor = "#32A0E1";
                    if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                        strColor = "rgb(79,161,24);";
                    }
					
					var strFolder = "Folder";
					if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
						strFolder = "Ordner";
					}
					if (lgCls.version == gVar.CtArr[19]) {
						strFolder = lg.get("IDS_FLODER");
					}
							
                    ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                        + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>"
                        + "</div>");
                    return true;
                }
            }
        }
    });

    $(".chnCapBtn").mouseover(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("name") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "-22px -44px");
        }
    }).mouseout(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("name") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "0 -44px");
        }
    }).click(function () {
        if (gVar.bCapturePermissionLimit) {
            if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualCapture)) {
                ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                return;
            }
        }
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($("#chnPlay_" + channel).attr("name") != "active") {
            return;
        }
        var ret = gDevice.PreViewCap([channel]);
        if (ret.Code == errCodeEnum.Code_Success) {
            if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                var url = ret.Data[0].Url;
                var urlstr = url.split("\\").join("\\\\");
                var path = ret.Path;
                var pathstr = path.split("\\").join("\\\\");
                var strColor = "#32A0E1";
                if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                    strColor = "rgb(79,161,24);";
                }
				
				var strPreview = "Preview";
				var strFolder = "Folder";
				if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
					strFolder = "Ordner";
				}
				if (lgCls.version == gVar.CtArr[19]) {
					strFolder = lg.get("IDS_FLODER");
					strPreview = lg.get("IDS_PREVIEW");
				}
							
                ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>"
                    + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + pathstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;"
                    + "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapImage(\"" + urlstr + "\");'>"+strPreview+"</a>"
                    + "</div>");
            }
        }
    });

    var tip_main = $("#tip_main");
    var chnListBox = $(".channelList");
    $(".chnStreamBtn").mouseover(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("isClick") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "-22px -66px");
        }
    }).mouseout(function () {
        var str = $(this).attr("id");
        var channel = str.split("_")[1] * 1;
        if ($(this).attr("isClick") != "active" && $("#chnPlay_" + channel).attr("name") == "active") {
            $(this).css("background-position", "0 -66px");
        }
    }).click(function () {
        var curChn = $(this).attr("id").split("_")[1] * 1;
        if ($("#chnPlay_" + curChn).attr("name") != "active") {
            return;
        }
        updateChannelState(curChn);
        var chnListBoxHeight = document.body.offsetHeight - 185;
        var chnNum = gDevice.loginRsp.ChannelNum;
        var totalHeight = ($(".channelRow").height() + 8) * chnNum;
        var hasScrollBar = chnListBoxHeight < totalHeight;
        var isScrollToBottom = (chnListBox.scrollTop() + chnListBoxHeight) >= totalHeight;
        var isLastTwoBtn = (curChn === chnNum) || (curChn === chnNum - 1);

        if ($(this).attr("isClick") != "active") {
            $(".chnStreamBtn").attr("isClick", "");
            $(this).attr("isClick", "active");
            $(".chnStreamBtn").each(function (i) {
                if ($("#chnPlay_" + i).attr("name") == "active") {
                    $(this).css("background-position", "0 -66px");
                }
            });
            $(this).css("background-position", "-44px -66px");
            /*if(typeof $(this).attr("data-operate") != "undefined" && $(this).attr("data-operate") != "all") {--
				$(".selStream").css("display", "none");
				var stream = $(this).attr("data-operate");
				$("#" + stream).css("display", "block");
				$(".selStream input[type=checkbox]").prop("checked", false);
				$("#" + stream + " input").prop("checked", true);
				$("#tip_content").css("height", "auto");
			} else {
				$(".selStream").css("display", "block");
			}*/
            if (hasScrollBar && isScrollToBottom && isLastTwoBtn) {
                $("#tip_main").css({
                    "top": $(this).position().top + $("#channelList").scrollTop() - 45 + "px",
                    "display": "block"
                }).data("chn", curChn).focus();
                $('#tip_arrow').css({'top': '50px'});
            } else {
                $("#tip_main").css({
                    "top": $(this).position().top + $("#channelList").scrollTop() + "px",
                    "display": "block"
                }).data("chn", curChn).focus();
                $('#tip_arrow').css({'top': '5px'});
            }
        } else {
            $(this).attr("isClick", "");
            $(this).css("background-position", "0 -66px");
            tip_main.css("display", "none").blur();
        }
    });

    $(".selStream input[type=checkbox]").click(function () {
        if ($(this).attr("id") == "select_mainStream") {
            if (getMainstreamNum() >= g_MainStreamNum) {
                $(this).prop("checked", false);
                if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112]) {
                    ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_MAINSTREAM_LIMIT_255"));
                } else {
                    //ShowPaop(lg.get("IDS_WARNING"),lg.get("IDS_MAINSTREAM_LIMIT_0")+" "+g_MainStreamNum+" "+lg.get("IDS_MAINSTREAM_LIMIT_1"));
                }
                return;
            }
        }
        $(".selStream input[type=checkbox]").prop("checked", false);
        $(this).prop("checked", true);
        tip_main.focus();
        var _chnArr = [];
        var _streamArr = [];
        var selChn = $("#tip_main").data("chn");
        _chnArr.push(selChn);
        //stream
        var streamtype;
        if ($(this).attr("id") == "select_mainStream") {
            streamtype = streamTypeEnum.MainStreamType;
        } else if ($(this).attr("id") == "select_subStream") {
            streamtype = streamTypeEnum.SubStreamType;
        } else if ($(this).attr("id") == "select_mobileStream") {
            streamtype = streamTypeEnum.MobileStreamType;
        }
        var ability = getChnStreamAbility(selChn);
        _streamArr[0] = getAvailableStream(streamtype, ability);
        $("#channelRow_" + selChn).data("streamType", _streamArr[0]);
        $(".streamBtnBox").data("AllPlay", false);
        gDevice.SetStreamType(_streamArr, _chnArr);
        resizeRecordStatus(selChn);

    });

    tip_main.mouseenter(function () {
        $(this).attr("name", "active");
    }).mouseleave(function () {
        $(this).attr("name", "");
    });

    //ipc PTZ
    $("#ipcPtz_model_sel").change(function () {
        var model = $("#ipcPtz_model_sel").val() * 1;
        $(modelIds).css('display', 'none');
        $(modelIdsArr[model]).css('display', '');
    });

    $("#ipcPtz_restore").click(function () {
        var data = {};
        data.PtzType = ptzTypeEnum.MsgPTZDefault;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.No = 0;
        data.Flag = 0;
        var res = gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
        if (res == 2) {
            ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_PLAYBACK_RIGHT1"));
        }
    });

    $("#ptz_newmode .colSet_btn").click(function () {
        var data = {};
        data.PtzType = $(this).data("ptz") * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Flag = 0;
        var res = gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
        if (res == 2) {
            ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_PLAYBACK_RIGHT1"));
        }
    });

    PtzButten("#live_yt1_1", 150, 0);
    PtzButten("#live_yt2_5", 600, 150);
    PtzButten("#live_yt3_6", 300, 0);
    PtzButten("#live_yt5_3", 450, 150);
    PtzButten1("#live_yt6_21", 0, 150);
    PtzButten("#live_yt4_4", 450, 0);
    PtzButten("#live_yt2_7", 300, 150);
    PtzButten("#live_yt3_8", 600, 0);
    PtzButten("#live_yt1_2", 150, 150);

    $(".minus,.plus").each(function () {
        MinusOrPlusButten(this);
    });

    $(".presetBtn").each(function () {
        PresetButten(this);
    });

    $(".cruiseBtn").each(function () {
        CruiseButten(this);
    });

    $(".ipcCruiseBtn_0,.ipcCruiseBtn_1").each(function () {
        CruiseButten(this);
    });

    $(".ipcArea_0,.ipcArea_1").each(function () {
        AreaScanButten(this);
    });

    $("#ptz_oldmode .trackBtn").each(function () {
        trackButten(this);
    });

    $("#ptz_newmode .trackBtn").each(function () {
        newModePtzButton(this);
    });

    $(".ptzBar").each(function () {
        newModePtzButton(this);
    });

    $("#ptz_speed").mouseout(function () {
        $('.ptzSpeedImg').removeClass('ptzSpeedImg').addClass('ptzSpeedImg');
        var speedNum = 0;
        $(".ptzSpeedImg").each(function () {
            if ($(this).attr("name") == "active") {
                ++speedNum;
                $(this).addClass('speed-img-active');
            }
            $("#speedNum").text(speedNum);
        })
    });

    $(".ptzSpeedBlock").mouseover(function () {
        $('.ptzSpeedImg').removeClass('ptzSpeedImg speed-img-active').addClass('ptzSpeedImg');
        var curNum = $(this).data("uid");
        for (var i = 1; i <= curNum; i++) {
            $('.ptzSpeedImg[data-uid=' + i + ']').addClass('speed-img-hover');
            $("#speedNum").text(curNum);
        }
    }).mouseout(function () {
        $('.ptzSpeedImg').removeClass('speed-img-hover');
    }).click(function () {
        $(".ptzSpeedImg").removeClass('ptzSpeedImg speed-img-active').addClass('ptzSpeedImg').removeAttr("name");
        for (var i = 1; i <= $(this).data("uid"); i++) {
            $(".ptzSpeedImg[data-uid =" + i + "]").removeClass('speed-img-hover').addClass('speed-img-active').attr('name', 'active');
        }
    });

    $(".minus,.plus,.presetBtn,.cruiseBtn").mousedown(function () {
        $(this).addClass('yt-box-active');
    }).mouseup(function () {
        $(this).removeClass('yt-box-active');
    });

    $("#pre_input").rsselect();
    var items = [];
    for (var i = 0; i < 255; i++) {
        var s_item = {};
        s_item.value = i + 1;
        s_item.text = i + 1;
        items[i] = s_item;
    }
    $("#pre_input").rsselect("append", items);
    $("#pre_input").rsselect("setValue", 1);

    $("#cruise_input").rsselect();
    $("#cruise_input").rsselect("append", [{"value": 1, "text": 1}]);
    $("#cruise_input").rsselect("setValue", 1);
});

function hasStreamType(chn, streamtype) {
    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        if (gDevice.loginRsp.FishEye.isFishEye) {
            if (chn > 0) {//Multi-channel, PTZ channel only main stream
                if (streamtype > 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                if ($("#hard_mode_2").attr("name") == "active") {//4ptz
                    if (streamtype > 0) {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
        } else {
            return true;
        }
    } else if (gDevice.devType == devTypeEnum.DEV_DVR) {
        if (streamtype == streamTypeEnum.MobileStreamType) {
            return false;
        } else {
            return true;
        }
    } else {
        return gDevice.hasAbility(chn, streamtype);
    }
}

//The code flow types support array for tunnel support
function getChnStreamAbility(chn) {
    var chnStreamAbility = [];
    chnStreamAbility[streamTypeEnum.MainStreamType] = hasStreamType(chn, streamTypeEnum.MainStreamType);
    chnStreamAbility[streamTypeEnum.SubStreamType] = hasStreamType(chn, streamTypeEnum.SubStreamType);
    chnStreamAbility[streamTypeEnum.MobileStreamType] = hasStreamType(chn, streamTypeEnum.MobileStreamType);
    return chnStreamAbility;
}

//Depending on the type of code flow set for current applicable code flow type
function getAvailableStream(streamtype, chnStreamAbility) {
    if (chnStreamAbility[streamtype]) {
        return streamtype;
    }
    if (chnStreamAbility[streamTypeEnum.SubStreamType]) {
        return streamTypeEnum.SubStreamType;
    } else if (chnStreamAbility[streamTypeEnum.MobileStreamType]) {
        return streamTypeEnum.MobileStreamType;
    } else {
        return streamTypeEnum.MainStreamType;
    }
}

function previewEventProcess(jsonData) {
    var subType = jsonData.SubType;
    if (subType == retEnum.RSNetMsgPreviewMaxPrevNumErr) {
        ShowPaop(lg.get("IDS_OSD_INFO"), lg.get("IDS_STRVIDEO_USERFULL"));
        var channel = jsonData.Data.Channel;
        if ($("#chnPlay_" + channel).attr("name") == "active") {
            $("#chnPlay_" + channel).click();
        }
    } else if (subType == retEnum.RSNetMsgRecordPlayDevicePlayback) {//306 mutual exclusion
        //Plate during playback, IE main stream login can't preview
        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PREVIEW_MUTEX"));
        var channel = jsonData.Data.Channel;
        CloseOtherVideo("");
//		if($("#chnPlay_" +channel).attr("name") == "active") {
//			$("#chnPlay_" +channel).click();
//		}
    } else if (subType == retEnum.RSNetMsgNoBandWidth) {//308 Equipment bandwidth
        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PREVIEW_NO_BANDWIDTH"));
        var channel = jsonData.Data.Channel;
        if ($("#chnPlay_" + channel).attr("name") == "active") {
            $("#chnPlay_" + channel).click();
        }
    } else if (subType == retEnum.RSNetMsgNoPreviewAuth) {//309

    } else if (subType == retEnum.RSNetMsgPreviewOpenStreamFail) {//203
        if (gVar.bC0_0305_3120101) {
            var channel = jsonData.Data.Channel;
            if ($("#chnPlay_" + channel).attr("name") == "active") {
                $("#chnPlay_" + channel).click();
            }
        }
    } else if (subType == retEnum.RSNetMsgPreviewStreamClosed) {//204
        if (gVar.bC0_0305_3120101) {//this device (param.AutoReconnect = false),should close
            var channel = jsonData.Data.Channel;
            if ($("#chnPlay_" + channel).attr("name") == "active") {
                $("#chnPlay_" + channel).click();
            }
        }
    } else if (subType == retEnum.RSMetMsgPreviewActivateFaile) {//323 Activate gunshot Faile
        var channel = jsonData.Data.Channel;
        if ($("#chnPlay_" + channel).attr("name") == "active") {
            $("#chnPlay_" + channel).click();
        }
    } else if (subType == retEnum.SingleClick) {
        var channel = jsonData.Data.Channel;
        if (channel >= getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum)) {
            return;
        }
        setSelectWnd(channel);
        if (gDevice.devType == devTypeEnum.DEV_IPC &&
            gDevice.loginRsp.FishEye.isFishEye &&
            gDevice.loginRsp.FishEye.curShowMode == fishEyeDisplayMode_hard.FishEye_PTZ3) {
            RfParamCall(FishEyeClkCall, "ColorSet", paramPage.MsgParamFishEye, 1000, "Get");
        }
    } else if (subType == retEnum.DoubleClick) {
        var channel = jsonData.Data.Channel;
        var preMode = $("#divideScreen").attr("preMode") * 1;
        var mode = $("#divideScreen").attr("mode") * 1;
        if (channel >= getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum)) {
            return;
        }
        if (channel == gDevice.loginRsp.ChannelNum && gDevice.loginRsp.ZeroChFlag && gDevice.devState[channel].zeroChSwitch == 2) {
            $("#channelRow_" + channel).data("clickdata", jsonData.Data);
            gDevice.RemoteTest(methodEnum.SubMsgZeroChnStatus, {});
            return;
        }
        if (preMode != SplitModeEnum.WINDOW_MODE_1) {
            if (mode != SplitModeEnum.WINDOW_MODE_1) {
                changeMode(SplitModeEnum.WINDOW_MODE_1, false, channel);
                setSelectWnd(channel);
            } else {
                changeMode(preMode, false, channel);
                setSelectWnd(channel);
            }
        }
    } else if (subType == retEnum.RightClick) {
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if (lgCls.version == gVar.CtArr[173]) {
                if ($("#play").attr("name") == "active") {
                    RfParamCall(setCamCall, "SetCam", paramPage.MsgParamIPCImageSet, 1000, "Get");
                }
            }
        } else {
            var channel = jsonData.Data.Channel;
            if (channel >= getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum)) {
                return;
            }
            setSelectWnd(channel);
            if (lgCls.version == gVar.CtArr[116]) {
                var data = {};
                data.Channel = channel;
                var ability = getChnStreamAbility(channel);
                data.Mainstream = ability[streamTypeEnum.MainStreamType];
                data.Substream = ability[streamTypeEnum.SubStreamType];
                data.Mobilestream = ability[streamTypeEnum.MobileStreamType];
                gDevice.PreViewRightMenu(data);
            }
        }

    } else if (subType == retEnum.RecordStatus) {
        var channel = jsonData.Data.Channel;
        var bRecord = jsonData.Data.Record;

        if (bRecord) {
            $("#chnRec_" + channel).attr("name", "active");
            $("#chnRec_" + channel).css("background-position", "-44px -22px");
        } else {
            if ($("#chnPlay_" + channel).attr("name") == "active") {
                $("#chnRec_" + channel).attr("name", "");
                $("#chnRec_" + channel).css("background-position", "0 -22px");
            } else {
                $("#chnRec_" + channel).attr("name", "disable");
                //$("#chnRec_" + channel).css("background-position", "0 -22px");
            }

        }
        if (!bRecord && $("#record").attr("name") == "active") {
            var index = 0;
            for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
                if ($("#chnRec_" + i).attr("name") == "active") {
                    index++;
                }
            }
            
            if (index == 0) {
                $("#record").css("background-position", "0 -224px");
                $("#record").attr("name", "");
            }
        }
    } else if (subType == methodEnum.SubMsgFishEyePtzPos) {
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $("#hard_mode_3").data("posArr", jsonData.Data.posArr);
            if (typeof ($("#hard_mode_3").data("interval")) == "undefined" ||
                $("#hard_mode_3").data("interval") == false) {
                $("#hard_mode_3").data("interval", setInterval(SaveFisheyeParam, 500));
            }
        }
    } else if (subType == retEnum.CreateDecodeFailed) {
        if ($(".streamBtnBox").data("AllPlay") == true) {
            $(".liveControlBtn#stop").click();
            gDevice.ClearPlayFlag();
        } else {
            var channel = jsonData.Data.Channel;
            $("#chnPlay_" + channel).click();
            gDevice.ClearPlayFlag();
        }

        ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PREVIEW_DECODEFAILED"));
    } else if (subType == methodEnum.SubMsg3DPosition) {
        var data = {};
        data.Channel = jsonData.Data.Channel;
        data.PtzType = ptzTypeEnum.MsgPTZ_3D_POSITION;
        data.x = jsonData.Data.x;
        data.y = jsonData.Data.y;
        data.w = jsonData.Data.w;
        data.h = jsonData.Data.h;
        gDevice.PTZcontrol(ptzControlEnum.EPtzControlPosition3D, data);
    } else if (subType == methodEnum.SubMsgFullScreen) {
        gDevice.setPreviewFullScreen(jsonData.Data.fullscreen);
    } else if (subType == methodEnum.SubMsgPreviewCodeType) {
        var channel = jsonData.Data.Channel;
        var streamType = jsonData.Data.stream;
        if (jsonData.Data.All == 1) {
            switch (streamType) {
                case streamTypeEnum.MainStreamType:
                    $("#mainStream").click();
                    break;
                case streamTypeEnum.SubStreamType:
                    $("#subStream").click();
                    break;
                case streamTypeEnum.MobileStreamType:
                    $("#mobileStream").click();
                    break;
                case streamTypeEnum.FourStreamType:
                    $("#fourStream").click();
                    break;
            }
        } else {
            var chnArr = [channel];
            var streamArr = [streamType];
            gDevice.SetStreamType(streamArr, chnArr);
            resizeRecordStatus(channel);
        }
    } else if (subType == methodEnum.SubMsgBitrate) {
        gDevice.ShowStreamRate([jsonData.Data.Channel], jsonData.Data.Flag);
    } else if (subType == methodEnum.SubMsgSoftPTZ) {
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            var data = {};
            data.PtzType = jsonData.Type;
            data.Channel = $("#channelList").attr("selectIndex") * 1;
            data.Speed = $("#speedNum").text() * 1;
            data.Flag = jsonData.Flag;
            if (data.PtzType > 10) {// zoomin zoomout
                if (g_ptzZoomTimmer) {
                    clearTimeout(g_ptzZoomTimmer);
                }
                $("#PTZBtn").data("softPTZ", data);
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
                g_ptzZoomTimmer = setTimeout(function () {
                    var val = $("#PTZBtn").data("softPTZ");
                    val.Flag = 1;//stop
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, val);
                }, 200);
            } else {
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
            }
        }
    }
};

function SaveFisheyeParam() {
    if ($("#hard_mode_3").data("posArr") == "undefined" ||
        $("#hard_mode_3").data("posArr") == false) {
        clearInterval($("#hard_mode_3").data("interval"));
        $("#hard_mode_3").data("interval", false);
        return;
    }
    var param = {};
    param.code_mode = $(".code-mode[name='active']").data("mode") * 1;
    param.mount_mode_0 = gVar.LocalFishEye.mountMode * 1;
    param.show_mode_0 = gVar.LocalFishEye.showMode * 1;
    param.mount_mode_1 = $("#live .install-mode[name='active']").data("mode") * 1;
    param.show_mode_1 = $(".mode-hard .display-mode[name='active']").data("mode") * 1;
    param.pos = $("#hard_mode_3").data("posArr");
    $("#hard_mode_3").data("posArr", false);
    var channel = $(".channelRow[name='active']").attr("id").split("_")[1] * 1;
    channel = isNaN(channel) ? 0 : channel;
    param.cur_pos = channel;
    param.bsave_pos = 1;
    RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 2000, "Set", param);
}

function initPreview() {
    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        createChannelList("channelList", gDevice.loginRsp.ChannelNum);
        var analogNum = gDevice.loginRsp.AnalogChNum;
        for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
            if (!gDevice.isOnline(i)) {
                $("#chnPlay_" + i).attr("name", "disable");
                $("#chnRec_" + i).attr("name", "disable");
                $("#chnCap_" + i).attr("name", "disable");
                $("#chnStream_" + i).attr("name", "disable");
                //$("#chnTextBtn_" + i).css("color","#505356");
                $("#chnTextBtn_" + i).attr("name", "disable");
            } else {
                $("#chnPlay_" + i).attr("name", "");
                $("#chnRec_" + i).attr("name", "disable");
                $("#chnCap_" + i).attr("name", "disable");
                $("#chnStream_" + i).attr("name", "disable");
                //$("#chnTextBtn_" + i).css("color","#e6ebf0");
                $("#chnTextBtn_" + i).attr("name", "");
            }

        }
    }
    previewEventCallBack = previewEventProcess;
    preVideoLossCallBack = preVideoLossProcess;

    if ((gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[157]) ||
        (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112])
    ) {
        var defTime = 200;
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112]) {
            defTime = 100;
        }
        gVar.ipcDelayTime = $.cookie("RS_IPC_DelayTime") ? $.cookie("RS_IPC_DelayTime") * 1 : defTime;

        document.getElementById("delaySet_sel").value = gVar.ipcDelayTime;
        $("#delaySet_sel").change(function () {
            var value = $(this).val() * 1;
            gVar.ipcDelayTime = value;
            gDevice.SetDelayTime(value);
        });
        $("#delaySet").css("display", "");
        $("#delaySet_sel").change();
    }

    var mode;
    if (gDevice.devType != devTypeEnum.DEV_IPC) {
        mode = getSplitModeByChannelNum(gDevice.loginRsp.ChannelNum);
        if (gDevice.loginRsp.ChannelNum > 1) {
            $("#divideScreen").css("display", "");
        }
    } else {
        if (gDevice.loginRsp.HkDomeFlag * 1 != 1 && (((gDevice.loginRsp.PageControl >> 3) & 1) == 1)) {
            if (lgCls.version == gVar.CtArr[87] || lgCls.version == gVar.CtArr[89]) {
                $("#showIntelligent").css("display", "block");
            }
        }

        if ((gDevice.loginRsp.PageControl2 >> 27) & 1) {
            $("#floodLight").css("display", "block");
        }

        if ((gDevice.loginRsp.PageControl2 >> 28) & 1) {
            $("#audioAlarm").css("display", "block");
        }

        if ((gDevice.loginRsp.ControlBitArray[1] >> 29) & 1) {
            $("#fourStream").css("display", "block");
        }

        if (((gDevice.loginRsp.PageControl >> 26) & 1) != 1 || lgCls.version == gVar.CtArr[197]) {
            $("#sound").css("display", "none");
        } else {
            $("#sound").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[172]) {
            $("#live_gamma").css("display", "block");
        }

        if(lgCls.version == gVar.CtArr[166]){
            $('.liveMain .fish-eye-box').css("top","0").css("bottom","0");
        }
        if(lgCls.skin == "white_c238"){
            if((gDevice.loginRsp.PageControl2 >> 6) & 1){
               $("#stream_sel option[value='2']").remove();
            }else{
                document.getElementById("stream_sel").options[2].innerHTML = lg.get("IDS_LOW_DIF");
            }
            if ((gDevice.loginRsp.ControlBitArray[1] >> 29) & 1) {
                $("#stream_sel").append('<option value="'+streamTypeEnum.FourStreamType+'">'+lg.get("IDS_FOURSTREAM")+'</option>');
            }
            $("#stream_sel").val(gDevice.loginRsp.DefualtStream * 1);
            $("#stream_sel").change(function(){
               var v = $(this).val()*1;
               if(v == 2){
                   $("#mobileStream").click();
               }else if(v == 1){
                   $("#subStream").click();
               }else if(v == streamTypeEnum.FourStreamType){
                   $("#fourStream").click();
               }else{
                   $("#mainStream").click();
               }
               v = null;
            });
            $("#quickBtns").append($("#capture").detach());
            $("#quickBtns").append($("#record").detach());
            $("#quickBtns").append($("#play").detach());
            $("#quickBtns").append($("#stop").detach());
            if((gDevice.loginRsp.PageControl >> 26) & 1){
                $("#quickBtns").append($("#sound").detach());
            }
            if (gDevice.loginRsp.DualtalkShowTag){
                $("#quickBtns").append($("#talkback").detach());
            }
            if ((gDevice.loginRsp.PageControl2 >> 27) & 1) {
                $("#quickBtns").append($("#floodLight").detach());
            }
            if((gDevice.loginRsp.PageControl2 >> 28) & 1){
                $("#quickBtns").append($("#audioAlarm").detach());
            }
            $("#quickBtns").append($("#originalSize").detach());
            $("#quickBtns").append($("#adaptive").detach());
            $("#quickBtns").append($("#digitalZoom").detach());
            if(!gDevice.loginRsp.PtzHiddenFlag*1){
                $("#quickBtns").append($("#PTZBtn").detach());
            }
            $("#quickBtns").append($("#colorBtn").detach());
            $("#topContent, #live .content_Box").css("display", "block");
        }

        //$("#mobileStream").show();
        $(".streamBtnBox .streamBtn").attr("name", "");
        if (gDevice.loginRsp.DefualtStream * 1 == 1) {//
            $("#subStream").addClass("streamActiveBtnIPC").attr("name", "active");
        } else if (gDevice.loginRsp.DefualtStream * 1 == 2) {//
            $("#mobileStream").addClass("streamActiveBtnIPC").attr("name", "active");
        } else if (gDevice.loginRsp.DefualtStream * 1 == streamTypeEnum.FourStreamType) {//
            $("#fourStream").addClass("streamActiveBtnIPC").attr("name", "active");
        } else {//
            $("#mainStream").addClass("streamActiveBtnIPC").attr("name", "active");
        }

        var items;

        //ipc new mode test
        if (gDevice.loginRsp.autoFocus.PTZVersion) {
            $("#ptz_oldmode").css('display', 'none');
            $("#ptz_newmode").css('display', 'block');
            $("#ptzNM_zoom_lenpos").rsselect();
            var newModeVal = [1, 5, 20];
            items = [];
            for (var i = 0; i < 3; i++) {
                var s_item = {};
                s_item.value = i;
                s_item.text = newModeVal[i];
                items[i] = s_item;
            }
            $("#ptzNM_zoom_lenpos").rsselect("append", items);
            $("#ptzNM_zoom_lenpos").rsselect("setValue", 1);
            $("#ptzNM_zoom_lenpos").rsselect("setNearbyEle", '#ptzNM_zoomSet');
            var minZoom = gDevice.loginRsp.autoFocus.mixZoomPosition * 1,
                maxZoom = gDevice.loginRsp.autoFocus.maxZoomPosition * 1,
                minFocus = gDevice.loginRsp.autoFocus.mixFocusPosition * 1,
                maxFocus = gDevice.loginRsp.autoFocus.maxFocusPosition * 1;
            $("#ptzNM_zoom_set").slider({
                'width': 85,
                'minValue': minZoom,
                'maxValue': maxZoom,
                'showText': false,
                'useAni': true,
                toDoc: true,
                rangeDiv: '#PTZSetting',
                mouseupCallback: function () {
                    //console.log("---------mouseupCallback----------");
                    $("#ptzNM_zoom_set").mouseup();
                }
            });
            $("#ptzNM_zoom_set").slider("setValue", minZoom);

            $("#ptzNM_focus_lenpos").rsselect();
            $("#ptzNM_focus_lenpos").rsselect("append", items);
            $("#ptzNM_focus_lenpos").rsselect("setValue", 1);
            $("#ptzNM_focus_lenpos").rsselect("setNearbyEle", '#ptzNM_focusSet');

            $("#ptzNM_focus_set").slider({
                'width': 85,
                'minValue': minFocus,
                'maxValue': maxFocus,
                'showText': false,
                'useAni': true,
                toDoc: true,
                rangeDiv: '#PTZSetting',
                mouseupCallback: function () {
                    $("#ptzNM_focus_set").mouseup();
                }
            });
            $("#ptzNM_focus_set").slider("setValue", minFocus);
        } else {
            //old ptz
            if (lgCls.version == gVar.CtArr[32]) {
                var sec = lg.get("IDS_SECOND");
                $("#ipcPtzPre_inteval_sel").empty();
                $("#ipcPtzPre_inteval_sel").append('<option value="3">3' + sec + '</option>' +
                    '<option value="0">5' + sec + '</option>' +
                    '<option value="1">10' + sec + '</option>' +
                    '<option value="2">15' + sec + '</option>');
            }
            $("#presetDiv,#cruiseDiv,#irisDiv").css('display', 'none');
            $("#ipcPtz_div").css('display', '');
            $(".yt_Box").css('margin-bottom', '12px');
            $("#ipcPtzPre_preset_input").rsselect();
            items = [];
            for (var i = 0; i < 255; i++) {
                var s_item = {};
                s_item.value = i + 1;
                s_item.text = i + 1;
                items[i] = s_item;
            }
            $("#ipcPtzPre_preset_input").rsselect("append", items);
            $("#ipcPtzPre_preset_input").rsselect("setValue", 1);

            $("#ipcPtzW_preset_input").rsselect();
            $("#ipcPtzW_preset_input").rsselect("append", items);
            $("#ipcPtzW_preset_input").rsselect("setValue", 1);

            $("#ipcPtzT_preset_pos").rsselect();
            //items.splice(219,255-219);
            items.splice(89, 10);
            $("#ipcPtzT_preset_pos").rsselect("append", items);
            $("#ipcPtzT_preset_pos").rsselect("setValue", 1);

            $("#ipcPtzT_track_pos").rsselect();
            items = [];
            for (var i = 0; i < 4; i++) {
                var s_item = {};
                s_item.value = i + 1;
                s_item.text = i + 1;
                items[i] = s_item;
            }
            $("#ipcPtzT_track_pos").rsselect({
                selectChange: function () {
                    var track = $("#ipcPtzT_track_pos").rsselect("getValue") * 1;
                    if (!tourArr[track]) {
                        $("#ipcPtzT").css('display', 'none');
                    } else {
                        $("#ipcPtzT").css('display', 'block');
                    }
                }
            });
            $("#ipcPtzT_track_pos").rsselect("append", items);
            $("#ipcPtzT_track_pos").rsselect("setValue", 1);


            $("#ipcPtzP_track_pos").rsselect();
            $("#ipcPtzP_track_pos").rsselect({
                selectChange: function () {
                    var pattern = $("#ipcPtzP_track_pos").rsselect("getValue");
                    var patternArr = $("#ipcPtzP_track_pos").attr('arr');
                    if (typeof patternArr == 'undefined') {
                        return;
                    }
                    if (patternArr.indexOf(pattern) > -1) {
                        $("#ipcPtzP").css('display', 'block');
                    } else {
                        $("#ipcPtzP").css('display', 'none');
                    }
                }
            });
            $("#ipcPtzP_track_pos").rsselect("append", items);
            $("#ipcPtzP_track_pos").rsselect("setValue", 1);

            var trackTime = '', timeB = lg.get("IDS_SECOND");
            for (var i = 5; i < 241; i++) {
                trackTime += '<option value="' + i + '">' + i + timeB + '</option>';
            }
            $("#ipcPtzT_inteval_sel").append(trackTime);

            if (gDevice.loginRsp.HkDomeFlag * 1 == 1) {//Speed Dome Cameras
                $("#ipcPtz_model_sel").val(1);
            } else if (gDevice.loginRsp.RSDomeFlag * 1 == 1) {//Shaking machine
                $("#ipcPtz_model_sel").val(1);
                $("#ipcPtz_model").css('display', 'none');
            } else {
                $("#ipcPtz_model_sel").val(6);
                $("#ipcPtz_model_restore").css('margin-top', '50px');
                $("#ipcPtz_model").css('display', 'none');
            }

        }

        if (gDevice.loginRsp.FishEye.isFishEye) {
            createChannelList("fishEyeChannelList", gDevice.loginRsp.ChannelNum);
            mode = getSplitModeByChannelNum(gDevice.loginRsp.FishEye.curStreamNum);
            //gDevice.PreviewDbclkFullscreen(gDevice.loginRsp.FishEye.curStreamNum == 1 ? true : false);
            //gDevice.PreviewDbclkFullscreen(true);
            gDevice.PreviewFishEyeMode(gDevice.loginRsp.FishEye.curShowMode);
        } else {
            mode = 0;
            //gDevice.PreviewDbclkFullscreen(true);
        }
        gDevice.PreviewDbclkFullscreen(true);
        if (lgCls.version == gVar.CtArr[32]) {
            $("#showFPS,#showBPS").css("display", "");
            if (!gDevice.loginRsp.PtzHiddenFlag && !gDevice.loginRsp.autoFocus.PTZVersion) {
                gDevice.PreviewSoftPTZ(0, 1);
            }
        } else {
            gDevice.ShowStreamRate([0], 1);
        }

        if (lgCls.version == gVar.CtArr[177] || lgCls.version == gVar.CtArr[68]) {
            gDevice.ShowResolution([0], 1);
        }


        if (lgCls.version != gVar.CtArr[166]) {
            $("#live_sharpness").css("display", "");
        }

        if (lgCls.version == gVar.CtArr[173]) {
            initSetCam();
        }
    }
    $("#divideScreen").attr("mode", mode).attr("preMode", mode);
    changeMode(mode, true);
    setSelectWnd(0);
    liveSetTipText();

    setTimeout(function () {
        $("#play").click();
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if (gDevice.loginRsp.PtzHiddenFlag * 1 != 1) {
                $("#ipcPtz_model_sel").change();
            }

            if (lgCls.version == gVar.CtArr[87]) {
                $("#originalSize").click();
            } else if (lgCls.version == gVar.CtArr[32]) {
                $("#PTZSetting,#colour").css("background-color", "#7d7d7d");
                $("#LIVE_YT").css("background", 'url("images_red_c32/ptz_c32.png") no-repeat');
                $(".ptz-button").css({"width": "46px", "height": "46px"});
                $("#live_yt6_21").css({"top": "52px", "left": "52px"});//center
                $("#live_yt5_3").css({"top": "52px", "left": "1px"});//left
                $("#live_yt2_5").css({"top": "1px", "left": "1px"});//left-top
                $("#live_yt1_1").css({"top": "1px", "left": "52px"});//top
                $("#live_yt3_6").css({"top": "1px", "left": "102px"});//top-right
                $("#live_yt4_4").css({"top": "52px", "left": "102px"});//right
                $("#live_yt3_8").css({"top": "103px", "left": "102px"});//right-bottom
                $("#live_yt1_2").css({"top": "103px", "left": "52px"});//bottom
                $("#live_yt2_7").css({"top": "103px", "left": "1px"});//bottom-left
            } else if(lgCls.version == gVar.CtArr[139]) {
                if(((gDevice.loginRsp.PageControl >> 26) & 1) == 1){
                    $("#liveSmallImg").click();
                }
            }

            if (($("#showIntelligent").css("display") == "block") ||
                ((gDevice.loginRsp.PageControl2 >> 27) & 1) ||
                ((gDevice.loginRsp.PageControl2 >> 28) & 1) ||
                ((gDevice.loginRsp.PageControl >> 10) & 1) ||
                ((gDevice.loginRsp.ControlBitArray[2] >> 5) & 1)
            ) {
                var queryCh = 0;
                RfParamCall(liveParamCall, "liveParamSet", paramPage.MsgParamPreviewCtrl, queryCh, "Get");
            }else{
                if (gDevice.loginRsp.FishEye.isFishEye && gDevice.hasPreviewRight(0)) {
                    $("#fish-eye-btn").click();
                }
            }
        }
    }, 0);

}

function liveSetTipText() {
    $("#listBtn").attr("title", lg.get("IDS_CHANNEL_LIST"));
	
	if(gVar.bC0_useNewLg){
		$("#mainStream").attr("title", "HD");
		$("#subStream").attr("title", "SD");
	}else{
		$("#mainStream").attr("title", lg.get("IDS_MAINSTREAM"));
		$("#subStream").attr("title", lg.get("IDS_SUBSTREAM"));
	}
	
    $("#mobileStream").attr("title", lg.get("IDS_MOBSTREAM"));
    $("#fourStream").attr("title", lg.get("IDS_FOURSTREAM"));
    $("#PTZBtn").attr("title", lg.get("IDS_PTZ_TITLE"));
    $("#colorBtn").attr("title", lg.get("IDS_DEFAULT_COLOR"));
    $("#divideScreen").attr("title", lg.get("IDS_DIVIDE_SCREEN"));
    $("#play").attr("title", lg.get("IDS_BTN_PLAY"));
    $("#stop").attr("title", lg.get("IDS_REC_STOP"));
    $("#originalSize").attr("title", lg.get("IDS_PREVIEW_ORIGINAL"));
    $("#adaptive").attr("title", lg.get("IDS_BESPREAD"));
    $("#fullScreen").attr("title", lg.get("IDS_FULLSCREEN"));
    $("#record").attr("title", lg.get("IDS_REC_CUT"));
    $("#capture").attr("title", lg.get("IDS_BTN_CAP"));
    $("#digitalZoom").attr("title", lg.get("IDS_ELEC_AMPLIFICATION"));
    $("#sound").attr("title", lg.get("IDS_REC_OPENSOUND"));
    $("#talkback").attr("title", lg.get("IDS_VOICE_INT"));
    $("#fisheye").attr("title", lg.get("IDS_FISH_EYE"));
    $("#showIntelligent").attr("title", lg.get("IDS_PARAM_INTELLIGENT"));
    $("#floodLight").attr("title", lg.get("IDS_FL_WARNMINGLIGHT"));
	if(lgCls.version == gVar.CtArr[7] && gDevice.devType != devTypeEnum.DEV_IPC){
		$("#floodLight").attr("title",lg.get("IDS_FLOOD_LIGHT"));
	}
    $("#flashLight").attr("title", lg.get("IDS_FLASH_LIGHT"));
    $("#audioAlarm").attr("title", lg.get("IDS_AUDIO_ALARM"));
    $("#showFPS").attr("title", "FPS");
    $("#Ptz3dPos").attr("title", "3D PTZ");
    $("#showBPS").attr("title", "BPS");

    $("#fish-eye-btn").attr("title", lg.get("IDS_FISH_EYE"));
    $("#top_wall").attr("title", lg.get("IDS_TOP_WALL"));
    $("#side_wall").attr("title", lg.get("IDS_SIDE_WALL"));
    $("#desktop").attr("title", lg.get("IDS_DESKTOP"));
    $("#slope_wall").attr("title", lg.get("IDS_SLOPE_WALL"));
    $("#hard_mode_0").attr("title", lg.get("IDS_HARD_MODE_1"));
    $("#hard_mode_1").attr("title", lg.get("IDS_HARD_MODE_2"));
    $("#hard_mode_2").attr("title", lg.get("IDS_HARD_MODE_3"));
    $("#hard_mode_3").attr("title", lg.get("IDS_HARD_MODE_4"));
    $("#hard_mode_4").attr("title", lg.get("IDS_HARD_MODE_5"));

    $("#soft_mode_0,#soft_mode_13,#soft_mode_25,#soft_mode_33").attr("title", lg.get("IDS_SOFT_MODE_1"));//fish eye
    $("#soft_mode_1,#soft_mode_14,#soft_mode_26,#soft_mode_34").attr("title", lg.get("IDS_SOFT_MODE_12"));//VR bowl
    $("#soft_mode_2,#soft_mode_15").attr("title", lg.get("IDS_SOFT_MODE_13"));//VR cylinder
    $("#soft_mode_3").attr("title", lg.get("IDS_SOFT_MODE_8"));// 2 PTZ
    $("#soft_mode_4,#soft_mode_16,#soft_mode_28,#soft_mode_36").attr("title", lg.get("IDS_SOFT_MODE_9"));// 4 PTZ
    $("#soft_mode_5,#soft_mode_17").attr("title", lg.get("IDS_SOFT_MODE_2"));// 180 full view
    $("#soft_mode_6,#soft_mode_18").attr("title", lg.get("IDS_SOFT_MODE_3"));// 360 full view
    $("#soft_mode_7,#soft_mode_19").attr("title", lg.get("IDS_SOFT_MODE_4"));// 360 full view + 1 PTZ
    $("#soft_mode_8,#soft_mode_20").attr("title", lg.get("IDS_SOFT_MODE_5"));// 360 full view +3 PTZ
    $("#soft_mode_9,#soft_mode_21").attr("title", lg.get("IDS_SOFT_MODE_6"));// 360 full view + 6 PTZ
    $("#soft_mode_10,#soft_mode_22").attr("title", lg.get("IDS_SOFT_MODE_7"));// 360 full view + 8 PTZ
    $("#soft_mode_11,#soft_mode_23,#soft_mode_31,#soft_mode_39").attr("title", lg.get("IDS_SOFT_MODE_10"));// fish eye + 3 PTZ
    $("#soft_mode_12,#soft_mode_24,#soft_mode_32,#soft_mode_40").attr("title", lg.get("IDS_SOFT_MODE_11"));// fish eye + 8 PTZ
    $("#soft_mode_27,#soft_mode_35").attr("title", lg.get("IDS_SOFT_MODE_14"));// normal full view
    $("#soft_mode_29,#soft_mode_37").attr("title", lg.get("IDS_SOFT_MODE_15"));// normal full view + 3  PTZ
    $("#soft_mode_30,#soft_mode_38").attr("title", lg.get("IDS_SOFT_MODE_16"));// normal full view + 8 PTZ

    //ptz
    $("#live_yt1_1").attr("title", lg.get("IDS_PTZ_UP"));
    $("#live_yt3_6").attr("title", lg.get("IDS_PTZ_RIGHTUP"));
    $("#live_yt4_4").attr("title", lg.get("IDS_PTZ_RIGHT"));
    $("#live_yt3_8").attr("title", lg.get("IDS_PTZ_RIGHTDOWN"));
    $("#live_yt1_2").attr("title", lg.get("IDS_PTZ_DOWN"));
    $("#live_yt2_7").attr("title", lg.get("IDS_PTZ_LEFTDOWN"));
    $("#live_yt5_3").attr("title", lg.get("IDS_PTZ_LEFT"));
    $("#live_yt2_5").attr("title", lg.get("IDS_PTZ_LEFTUP"));
    $("#live_yt6_21").attr("title", lg.get("IDS_PTZ_AUTO"));

    $("#live_yt_12,#ptzNM_zoomDel_0").attr("title", lg.get("IDS_PTZ_ZOOMDOWN"));
    $("#live_yt_11,#ptzNM_zoomAdd_1").attr("title", lg.get("IDS_PTZ_ZOOMUP"));
    $("#live_yt_14,#ptzNM_focusDel_0").attr("title", lg.get("IDS_PTZ_FOCUSDOWN"));
    $("#live_yt_13,#ptzNM_focusAdd_1").attr("title", lg.get("IDS_PTZ_FOCUSUP"));
    $("#live_yt_16").attr("title", lg.get("IDS_PTZ_IRIDOWN"));
    $("#live_yt_15").attr("title", lg.get("IDS_PTZ_IRIUP"));

    $("#ipcPtz_cruisestar_0,#ipcPtzPre_cruisestar_0,#ipcPtzW_cruisestar_0,#ipcPtzT_cruisestar_0,#ipcPtzP_cruisestar_0").attr("title", lg.get("IDS_CALL_CURISE"));
    $("#ipcPtz_cruisestop_1,#ipcPtzPre_cruisestop_1,#ipcPtzW_cruisestop_1,#ipcPtzT_cruisestop_1,#ipcPtzP_cruisestop_1").attr("title", lg.get("IDS_STOP_CURISE"));
    $("#ipcPtzPre_add_91,#ipcPtzW_add_90,#ipcPtzT_add_91").attr("title", lg.get("IDS_BTN_ADD_PRESET"));
    $("#ipcPtzPre_delete_92,#ipcPtzT_delete_92").attr("title", lg.get("IDS_DEl_PRESET"));
    $("#ipcPtzPre_goto_93").attr("title", lg.get("IDS_CALL_PRESET"));
    $("#ipcPtzW_add_98").attr("title", lg.get("IDS_SCANSTART"));
    $("#ipcPtzW_add_99").attr("title", lg.get("IDS_SCANSTOP"));
    $("#ipcPtzT_delete_0,#ipcPtzP_delete_0").attr("title", lg.get("IDS_SUB_TRACK"));
    $("#ipcPtzT_add_1,#ipcPtzP_add_1").attr("title", lg.get("IDS_ADD_TRACK"));
    $("#ipcPtzP_recstar_2").attr("title", lg.get("IDS_PATTERN_RECSTAR"));
    $("#ipcPtzP_recstop_3").attr("title", lg.get("IDS_PATTERN_RECSTOP"));
}

function updateChannelState(chnIndex) {
    //TODO: Gets the current channel stream type and refresh tip frame checkbox selected
    var ability = getChnStreamAbility(chnIndex);
    var count = 0;
    if (ability[streamTypeEnum.MainStreamType]) {
        $("#select_mainStream_div").css("display", "block");
        count++;
    } else {
        $("#select_mainStream_div").css("display", "none");
    }
    if (ability[streamTypeEnum.SubStreamType]) {
        $("#select_subStream_div").css("display", "block");
        count++;
    } else {
        $("#select_subStream_div").css("display", "none");
    }
	if(gDevice.devType==devTypeEnum.DEV_HDVR && ((gDevice.loginRsp.ControlBit >> 20) & 1)){
		//hide direct
		$("#select_mobileStream_div").css("display", "none");
	}else{
	    if (ability[streamTypeEnum.MobileStreamType]) {
	        $("#select_mobileStream_div").css("display", "block");
	        count++;
	    } else {
	        $("#select_mobileStream_div").css("display", "none");
	    }
	}
    $("#tip_content").css("height", (20 * count + 10) + "px");
    $(".selStream input[type=checkbox]").prop("checked", false);
    switch ($("#channelRow_" + chnIndex).data("streamType") * 1) {
        case streamTypeEnum.MainStreamType: {
            $("#select_mainStream").prop("checked", true);
        }
            break;
        case streamTypeEnum.SubStreamType: {
            $("#select_subStream").prop("checked", true);
        }
            break;
        case streamTypeEnum.MobileStreamType: {
            $("#select_mobileStream").prop("checked", true);
        }
            break;
    }
}

function getMainstreamNum() {
    var _count = 0;
    for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
        if ($("#channelRow_" + i).css('display') != 'none' && $("#chnPlay_" + i).attr("name") == "active" && $("#channelRow_" + i).data("streamType") == streamTypeEnum.MainStreamType)
            ++_count;
    }
    return _count;
}

function ShowSharpness() {
    $('.channelRow').each(function () {
        var self = $(this);
        if (self.attr('name') === 'active') {
            var chn = self.attr('id').split('_')[1] * 1;
            if (chn >= gDevice.loginRsp.AnalogChNum) {
                $("#live_sharpness").css("display", "none");//IP channel does not display
            } else {
                //Analog channel, according to the condition of show and hide
                if (CheckPageControl(PageControlEnum.BIT13_E, 1)) {
                    $("#live_sharpness").css("display", "block");
                } else {
                    $("#live_sharpness").css("display", "none");
                }
            }
        }
    })
}

function setSelectWnd(index) {
    var preSelectIndex = $("#channelList").attr("selectIndex") * 1;
    if (preSelectIndex != -1) {
        $("#channelRow_" + preSelectIndex).attr("name", "");
        $("#channelList").attr("selectIndex", -1);
    }

    $("#channelRow_" + index).attr("name", "active");
    $("#channelList").attr("selectIndex", index);

    if (gDevice.hasPtzRight(index) == false) {
        DivBox(0, "#PTZSetting");
    } else {
        DivBox(1, "#PTZSetting");
    }

    if (gDevice.devType != devTypeEnum.DEV_IPC) {
        ShowSharpness();
    }

    var mode = $("#divideScreen").attr("mode") * 1;
    var pageIndex = $("#curPageText").val() * 1 - 1;
    var newPageIndex = findPageIndexByChannel(index, mode, gDevice.getPreviewViewsIndex().Data);
    if (pageIndex != newPageIndex) {
        $("#curPageText").val(newPageIndex + 1);
        updatePreOrNextBtnStatus();
    }
    if (gDevice.hasAbility(index, AbilityTypeEnum.FISHEYE)) {
        $("#fisheye").show();
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[7]) {
            $("#fisheye").hide();
        }
    } else {
        $("#fisheye").hide();
    }
    if (gDevice.hasAbility(index, AbilityTypeEnum.BINOCULARS)) {
        //$("#binoculars").show();
    } else {
        $("#binoculars").hide();
    }
    gDevice.PreViewSelectWnd(index);
    if (gDevice.loginRsp.ZeroChFlag && index == gDevice.loginRsp.ChannelNum) {
        if ($("#colorBtn").attr("name") == "active") {
            $("#colorBtn").click();
        }
        $("#colorBtn").prop("disabled", "disabled").css("background-position", "-96px 0");
    } else {
        if (gDevice.loginRsp.ZeroChFlag) {
            if ($("#colorBtn").attr("name") == "active") {
                $("#colorBtn").prop("disabled", "").css("background-position", "-64px 0");
            } else {
                $("#colorBtn").prop("disabled", "").css("background-position", "0 0");
            }
        }
        RfParamCall(SilderGetCall, "GetColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
    }
    if (gDevice.devType != devTypeEnum.DEV_IPC) {
        gVar.bDoNextCall = true;
    }
}

function CruiseButten(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function () {
        PtzButtonStop();
        $("#LIVE_YT").css("background-position", "0 0");
        data.PtzType = ptzTypeEnum.MsgPTZCruise;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.No = $("#cruise_input").rsselect("getValue") * 1;
        data.Flag = $(this).attr("id").split("_")[2] * 1;
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            var model = $("#ipcPtz_model_sel").val() * 1;
            var ptzControl = ptzControlEnum.EPtzControlCruise;
            if (model == ipcPtzModel.model_default) {
                data.Speed = $("#speedNum").text() * 1;
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
            } else if (model == ipcPtzModel.model_preset) {
                data.Time = $("#ipcPtzPre_inteval_sel").val() * 1;
                gDevice.PTZcontrol(ptzControl, data);
            } else if (model == ipcPtzModel.model_linescan) {
                data.LineSpeed = $("#ipcPtzW_speed_sel").val() * 1;
                data.No = $("#ipcPtz_model_sel").val() * 1;
                gDevice.PTZcontrol(ptzControl, data);
            } else if (model == ipcPtzModel.model_track) {
                if (data.Flag == 0) {//start
                    data = {};
                    var speed = $("#speedNum").text() * 1, res,
                        track = $("#ipcPtzT_track_pos").rsselect("getValue") * 1,
                        time = $("#ipcPtzT_inteval_sel").val() * 1;
                    if (speed == 0 || speed > 6) {
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_PTZ_SPEED") + ":" + "1-6");
                        return;
                    }
                    if (tourArr[track] == null) {//Call the last track
                        data.PtzType = ptzTypeEnum.MsgPTZCallPPCruise;
                        data.Channel = $("#channelList").attr("selectIndex") * 1;
                        data.CruiseIndex = track * 1;
                        gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                        if (res == 2) {
                            ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_PLAYBACK_RIGHT1"));
                        }
                        return;
                    }

                    if (tourArr[track].CruiseIndex != 0) {
                        tourArr[track].PauseSecs = time;
                        tourArr[track].Speed = speed * 10;
                    }

                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZSetPPCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = tourArr[track].CruiseIndex;
                    data.PpCount = tourArr[track].PpCount;
                    data.Speed = tourArr[track].Speed;
                    data.PauseSecs = tourArr[track].PauseSecs;
                    data.Pps = tourArr[track].Pps;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlSetPPCruise, data);

                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZCallPPCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = track * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                } else if (data.Flag == 1) {//stop
                    gDevice.PTZcontrol(ptzControl, data);
                }
            } else if (model == ipcPtzModel.model_pattern) {
                var track = $("#ipcPtzP_track_pos").rsselect("getValue") * 1
                if (data.Flag == 2) {//rec start
                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZStartPattermCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = track * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                } else if (data.Flag == 3) {//rec stop
                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZEndPattermCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = track * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                } else if (data.Flag == 0) {//ptz start
                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZCallPattermCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = track * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                } else if (data.Flag == 1) {//ptz stop
                    gDevice.PTZcontrol(ptzControl, data);
                }
            }
        } else {
            gDevice.PTZcontrol(ptzControlEnum.EPtzControlCruise, data);
        }

        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            //Click StartCruise, need to Detect PresetNum, if is equal to zero, need to box the clues to the user
            if (data.Flag == 0) {//
                data.PtzType = ptzTypeEnum.MsgPTZCruise_DetectPresetNum;//PresetNum_52
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlCruise, data);//1，data
            }
        }
    })
}

function PresetButten(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function () {
        PtzButtonStop();
        $("#LIVE_YT").css("background-position", "0 0");
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        var pos = $("#pre_input").rsselect("getValue") * 1;
        var ret;
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            var model = $("#ipcPtz_model_sel").val() * 1;
            if (model == ipcPtzModel.model_preset) {
                pos = $("#ipcPtzPre_preset_input").rsselect("getValue") * 1;
                data.Index = pos;
                $p.data("mouseDown", true);
                ret = gDevice.PTZcontrol(ptzControlEnum.EPtzControlPreset, data);
                var _type = data.PtzType;
                if (errCodeEnum.Code_Success == ret.Code) {
                    if (_type == 91) {
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_BTN_ADD_PRESET") + ' ' + lg.get("IDS_SET_SUCCESS"));
                    } else if (_type == 92) {
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_DEl_PRESET") + ' ' + lg.get("IDS_SET_SUCCESS"));
                    }
                }
            } else if (model == ipcPtzModel.model_watch) {
                pos = $("#ipcPtzW_preset_input").rsselect("getValue") * 1;
                data.Index = pos;
                $p.data("mouseDown", true);
                ret = gDevice.PTZcontrol(ptzControlEnum.EPtzControlPreset, data);
                if (errCodeEnum.Code_Success == ret.Code) {
                    ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_BTN_ADD_PRESET") + ' ' + lg.get("IDS_SET_SUCCESS"));
                }
            } else if (model == ipcPtzModel.model_track) {
                var track = $("#ipcPtzT_track_pos").rsselect("getValue") * 1;
                var pos = $("#ipcPtzT_preset_pos").rsselect("getValue") * 1;
                if (data.PtzType == ptzTypeEnum.MsgPTZSetPreset) {
                    if (tourArr[track].PpCount >= 32) {
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_TIP_PRESETNUM") + ':' + lg.get("IDS_LESS_THAN") + ' ' + '33');
                        return;
                    }
                    if (tourArr[track].CruiseIndex != 0) {
                        tourArr[track].PpCount += 1;
                        tourArr[track].Pps.push(pos);
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_BTN_ADD_PRESET") + ' ' + lg.get("IDS_SET_SUCCESS"));
                    }
                } else if (data.PtzType == ptzTypeEnum.MsgPTZClearPreset) {
                    var posArrPPS = $.inArray(pos, tourArr[track].Pps);
                    if (tourArr[track] && posArrPPS != -1) {
                        tourArr[track].PpCount -= 1;
                        tourArr[track].Pps.splice(posArrPPS, 1);
                        ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_DEl_PRESET") + ' ' + lg.get("IDS_SET_SUCCESS"));
                    }
                }
            }
        } else {
            data.Index = pos;
            $p.data("mouseDown", true);
            ret = gDevice.PTZcontrol(ptzControlEnum.EPtzControlPreset, data);
        }

        if ($(this).attr("id") == "pre_add_91") {
            if (errCodeEnum.Code_Success == ret.Code) {
                var value = (pos + 1) > 255 ? 1 : pos + 1;
                $("#pre_input").rsselect("setValue", value);
            }
        } else if ($(this).attr("id") == "pre_delete_92") {
            if (errCodeEnum.Code_Success == ret.Code) {
                var value = (pos - 1) <= 0 ? 255 : pos - 1;
                $("#pre_input").rsselect("setValue", value);
            }
        }

    })
}

function AreaScanButten(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function () {
        PtzButtonStop();
        $("#LIVE_YT").css("background-position", "0 0");
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        $p.data("mouseDown", true);
        var ret = gDevice.PTZcontrol(ptzControlEnum.EPtzControlAreaScan, data);
    })
}

function trackButten(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function () {
        PtzButtonStop();
        $("#LIVE_YT").css("background-position", "0 0");
        var model = $("#ipcPtz_model_sel").val() * 1;
        var type = $(this).attr("id").split('_')[2] * 1;
        var track = 0;
        $p.data("mouseDown", true);

        if (model == ipcPtzModel.model_track) {
            track = $("#ipcPtzT_track_pos").rsselect("getValue") * 1;
            if (type == 0) {//delete
                data = {};
                data.PtzType = ptzTypeEnum.MsgPTZCruise;
                data.Channel = $("#channelList").attr("selectIndex") * 1;
                data.No = $("#cruise_input").rsselect("getValue") * 1;
                data.Flag = 1;
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlCruise, data);

                if (tourArr[track] == null || typeof tourArr[track] == "undefined") {
                    return;
                }
                if (tourArr[track].CruiseIndex != 0) {
                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZSetPPCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = tourArr[track].CruiseIndex;
                    data.PpCount = 0;
                    data.Speed = 0;
                    data.PauseSecs = 0;
                    data.Pps = [];
                    tourArr[track] = null;
                    $("#ipcPtzT").css('display', 'none');
                    res = gDevice.PTZcontrol(ptzControlEnum.EPtzControlSetPPCruise, data);
                }
            } else {//add
                if (!tourArr[track]) {//Create a cruise trajectory
                    var trackTemp = new Tourset();
                    trackTemp.CruiseIndex = track;
                    tourArr[track] = trackTemp;
                    $("#ipcPtzT").css('display', 'block');
                }
            }
        } else if (model == ipcPtzModel.model_pattern) {
            var partternArr = $("#ipcPtzP_track_pos").attr('arr');
            var parttern = $("#ipcPtzP_track_pos").rsselect("getValue");
            var hasPattern = false;
            if (typeof partternArr != 'undefined') {
                if (partternArr.indexOf(parttern) > -1) {
                    hasPattern = true;
                }
                partternArr = partternArr.split(',');
            } else {
                partternArr = [];
            }
            if (type == 0) {//delete
                if (!hasPattern) {
                    return;
                } else {
                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.No = $("#cruise_input").rsselect("getValue") * 1;
                    data.Flag = 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCruise, data);

                    partternArr.pop(parttern);
                    $("#ipcPtzP_track_pos").attr('arr', partternArr.join(','));
                    $("#ipcPtzP").css('display', 'none');

                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZStartPattermCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = parttern * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);

                    data = {};
                    data.PtzType = ptzTypeEnum.MsgPTZEndPattermCruise;
                    data.Channel = $("#channelList").attr("selectIndex") * 1;
                    data.CruiseIndex = parttern * 1;
                    gDevice.PTZcontrol(ptzControlEnum.EPtzControlCallCruise, data);
                }
            } else {//add
                if (hasPattern) {
                    return;
                } else {
                    partternArr.push(parttern);
                    $("#ipcPtzP_track_pos").attr('arr', partternArr.join(','));
                    $("#ipcPtzP").css('display', 'block');
                }
            }
        }
    })
}

function newModePtzButton(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function (e) {
        //console.log('.ptzBar-----id:'+$(this).attr("id")+"-------------e: "+e.type);
        //var nearbyEleId = $(this).parent('.yt_Box').attr("id");
        // var nearByObj = $('#'+nearbyEleId);
        // if(nearByObj.attr('rssel')*1){
        // console.log('rssel-------------down-----------0');
        //nearByObj.attr('rssel',0);
        //nearByObj = null;
        // }
        var type = $(this).data("ptz") * 1;
        if (type == 101 || type == 102) {//position set value when it's mouseup
            return;
        }
        var state = 0;
        var speed = 0;
        switch (type) {
            case 103:
                speed = $("#ptzNM_zoom_lenpos").rsselect("getValue") * 1;
                state = $(this).attr("id").split('_')[2] * 1;
                break;
            case 104:
                speed = $("#ptzNM_focus_lenpos").rsselect("getValue") * 1;
                state = $(this).attr("id").split('_')[2] * 1;
                break;
            default:
                break;
        }

        $p.data("mouseDown", true);
        data.PtzType = type;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Flag = state;
        data.Speed = speed;
        //console.log('rssel-------------down-----------PTZcontrol-----id:'+$(this).attr("id"));
        gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);

    }).mouseup(function (e) {
        //var nearbyEleId = $(this).parent('.yt_Box').attr("id");
        //var nearByObj = $('#'+nearbyEleId);
        // console.log("==rssel=======value======"+nearByObj.attr('rssel')*1);
        // if(nearByObj.attr('rssel')*1){
        // console.log('rssel-----------up-------------0');
        //nearByObj.attr('rssel',0);
        // nearByObj = null;
        //return ;
        //}

        //console.log('.ptzBar-----id:'+$(this).attr("id")+"-------------e: "+e.type);
        if ($("#PTZBtn").data("up") * 1 == 1) {
            return;
        }
        var type = $(this).data("ptz") * 1;
        var state = 2;
        var speed = 0;
        switch (type) {
            case 101:
                speed = $("#ptzNM_zoom_set").slider("getValue") * 1;
                state = 0;
                break;
            case 102:
                speed = $("#ptzNM_focus_set").slider("getValue") * 1;
                state = 0;
                break;
            case 103:
                speed = $("#ptzNM_zoom_lenpos").rsselect("getValue") * 1;
                break;
            case 104:
                speed = $("#ptzNM_focus_lenpos").rsselect("getValue") * 1;
                break;
            default:
                break;
        }

        data.PtzType = type;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Flag = state;
        data.Speed = speed;

        //console.log('rssel-------------up-----------PTZcontrol-----id:'+$(this).attr("id"));
        $("#PTZBtn").data("up", 1);
        gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);

        DivBox(0, "#ptz_newmode");
        $("#ptzHideDiv").css('display', 'block');
    })
}

function MinusOrPlusButten(objStr) {
    var $p = $(objStr);
    var data = {};
    $p.mousedown(function () {
        PtzButtonStop();
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Flag = 0;
        data.Speed = $("#speedNum").text() * 1;
        $p.data("mouseDown", true);

        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
            gDevice.FishEyeSoftPTZ(data);
        } else if (gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE) && $("#fisheye").attr("name") == "active") {
            gDevice.FishEyeSoftPTZ(data);
        } else {
            gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
        }

    }).mouseup(function () {
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Flag = 1;
        data.Speed = $("#speedNum").text() * 1;
        if ($p.data("mouseDown")) {
            $(this).data("mouseDown", false);

            if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
                gDevice.FishEyeSoftPTZ(data);
            } else if (gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE) && $("#fisheye").attr("name") == "active") {
                gDevice.FishEyeSoftPTZ(data);
            } else {
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
            }

        }
    })
}

function PtzButten1(objStr, left, top) {
    var $p = $(objStr);
    var data = {};

    //console.log("id"+$p.attr("id")+"--------------class"+$p.attr("class"));
    $p.mousedown(function () {
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Speed = $("#speedNum").text() * 1;
        //console.log("id"+$p.attr("id")+"--------------class"+$p.attr("class"));
        if ($p.data("mouseDown")) {
            data.Flag = 1;
            $p.data("mouseDown", false);
            $("#LIVE_YT").css("background-position", "0 0");
        } else {
            data.Flag = 0;
            $p.data("mouseDown", true);
            $("#LIVE_YT").css("background-position", "-" + left + "px " + "-" + top + "px");
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
            var getPtzCh = gDevice.GetFishEyeSoftFishEyeSoftChSelect($("#channelList").attr("selectIndex") * 1);//$("#fish-eye-btn").data("channel")*1;
            var ptzCh = getPtzCh["chSelect"] * 1;
            var ptzChPre = $("#fish-eye-btn").data("preChannel") * 1;

            if (ptzCh != ptzChPre) {//Switch the child window, began to cruise
                data.Flag = 0;
                $p.data("mouseDown", true);
                $("#fish-eye-btn").data("preChannel", ptzCh);
            }

            gDevice.FishEyeSoftPTZ(data);
        } else if (gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE) && $("#fisheye").attr("name") == "active") {
            var ptzCh = $("#fish-eye-btn").data("channel") * 1;
            var ptzChPre = $("#fish-eye-btn").data("preChannel") * 1;
            if (ptzCh != ptzChPre) {//Switch the child window, began to cruise
                data.Flag = 0;
                $p.data("mouseDown", true);
                $("#fish-eye-btn").data("preChannel", ptzCh);
            }
            gDevice.FishEyeSoftPTZ(data);
        } else {
            //console.log(data.Flag);
            gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
        }
    }).mouseover(function () {
        $("#LIVE_YT").css({"background-position": "0 -150px", "cursor": "pointer"});
    }).mouseout(function () {
        $("#LIVE_YT").css({"cursor": "default", "background-position": "0 0"});
    });
}

function PtzButtonStop() {
    $("#LIVE_YT").css("background-position", "0 0");
    $("#live_yt6_21").data("mouseDown", false);
}

function PtzButten(objStr, left, top) {
    var $p = $(objStr);
    var data = {};

    $p.mousedown(function () {
        //$("#LIVE_YT").css({"background-position": "-" + left + "px " + "-" + top + "px","cursor":"pointer"});
        $("#LIVE_YT").css("background-position", "0 0");
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Speed = $("#speedNum").text() * 1;
        data.Flag = 0;
        $p.data("mouseDown", true);

        if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
            gDevice.FishEyeSoftPTZ(data);
        } else if (gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE) && $("#fisheye").attr("name") == "active") {
            gDevice.FishEyeSoftPTZ(data);
        } else {
            gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
        }

    }).mouseup(function () {
        $("#LIVE_YT").css({"background-position": "-" + left + "px " + "-" + top + "px", "cursor": "pointer"});
        //$("#LIVE_YT").css("background-position", "0 0");
        data.PtzType = $(this).attr("id").split("_")[2] * 1;
        data.Channel = $("#channelList").attr("selectIndex") * 1;
        data.Speed = $("#speedNum").text() * 1;
        data.Flag = 1;
        if ($p.data("mouseDown")) {
            $(this).data("mouseDown", false);
            if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
                gDevice.FishEyeSoftPTZ(data);
            } else if (gDevice.hasAbility($("#channelList").attr("selectIndex") * 1, AbilityTypeEnum.FISHEYE) && $("#fisheye").attr("name") == "active") {
                gDevice.FishEyeSoftPTZ(data);
            } else {
                gDevice.PTZcontrol(ptzControlEnum.EPtzControlNormal, data);
            }
        }
    }).mouseover(function () {
        $("#LIVE_YT").css({"cursor": "pointer", "background-position": "-" + left + "px " + "-" + top + "px"});
    }).mouseout(function () {
        $("#LIVE_YT").css({"cursor": "default", "background-position": "0 0"});
    })
}

//According to the channel number generated list
function createChannelList(idDiv, num) {
    var html = "";
    for (var i = 0; i < num; i++) {
        html += "<div class='channelRow' id='channelRow_" + i + "'>";
        html += "<div class='channelNum' id='chnTextBtn_" + i + "'>" + gDevice.getChannelName(i) + "</div>";
        html += "<div class='chnBtn chnPlayBtn' id='chnPlay_" + i + "' title='" + lg.get("IDS_PLAY_ONOFF") + "'></div>";
        html += "<div class='chnBtn chnRecBtn' id='chnRec_" + i + "' title='" + lg.get("IDS_RECORD_ONOFF") + "'></div>";
        html += "<div class='chnBtn chnCapBtn' id='chnCap_" + i + "' title='" + lg.get("IDS_BTN_CAP") + "'></div>";
        html += "<div class='chnBtn chnStreamBtn' id='chnStream_" + i + "' title='" + lg.get("IDS_LOGIN_BITRATE") + "'></div></div>";
    }
    if (gDevice.loginRsp.ZeroChFlag) {
        html += "<div class='channelRow' id='channelRow_" + gDevice.loginRsp.ChannelNum + "'>";
        html += "<div class='channelNum' id='chnTextBtn_" + gDevice.loginRsp.ChannelNum + "'>Zero Ch</div>";
        html += "<div class='chnBtn chnPlayBtn' id='chnPlay_" + gDevice.loginRsp.ChannelNum + "' title='" + lg.get("IDS_PLAY_ONOFF") + "'></div>";
        html += "<div class='chnBtn chnRecBtn' id='chnRec_" + gDevice.loginRsp.ChannelNum + "' title='" + lg.get("IDS_RECORD_ONOFF") + "'></div>";
        html += "<div class='chnBtn chnCapBtn' id='chnCap_" + gDevice.loginRsp.ChannelNum + "' title='" + lg.get("IDS_BTN_CAP") + "'></div></div>";
    }
    //Add overweight flow box
    var lgMain = lg.get("IDS_ENCODE_INFO");
    var lgSub = lg.get("IDS_SUBSTREAM");
    if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
        lgMain = "HQ Stream";
        lgSub = "SQ Stream";
    }
    html += "<div id='tip_main' name=''>" +
        "<div id='tip_content'>" +
        "<label style='cursor:pointer;'><div id='select_mainStream_div' style='display: none;' class='selStream'><input type='checkbox' id='select_mainStream'/>&nbsp;&nbsp;" + lgMain + "</div></label>" +
        "<label style='cursor:pointer;'><div id='select_subStream_div' style='display: none;' class='selStream'><input type='checkbox' id='select_subStream' checked='checked'/>&nbsp;&nbsp;" + lgSub + "</div></label>" +
        "<label style='cursor:pointer;'><div id='select_mobileStream_div' style='display: none;' class='selStream'><input type='checkbox' id='select_mobileStream'/>&nbsp;&nbsp;" + lg.get("IDS_LOW_DIF") + "</div></label>" +
        "</div>" +
        "<div id='tip_arrow'></div>" +
        "</div>";
    $("#" + idDiv).append(html);
}

function changeMode(mode, bRestIndex, channel, bSoftFishEye) {
    if (typeof channel == "undefined") {
        channel = 0;
    }
    if (typeof bSoftFishEye == "undefined") {
        bSoftFishEye = true;
    }

    //Turn off all the video
    if (gVar.bC0_0305_3120101) {
        //c0 wireless donot closeAll
    } else {
        $(".liveControlBtn#stop").click();
    }

    $(".divideMode").each(function () {
        if ($(this).data("mode") * 1 == mode) {
            var hoverPos = $(this).data("hover");
            var left = hoverPos.split(" ")[0];
            var top = hoverPos.split(" ")[1];
            $("#divideScreen").css("background-position", "0 " + "-" + top + "px").data("pos", "0 " + "-" + top + "px");
            $(this).css("background-position", "-" + left * 2 + "px " + "-" + top + "px").attr("data-name", "active");
        } else {
            var oriPos = $(this).data("ori");
            $(this).css("background-position", oriPos).attr("data-name", "");
        }
    });
    if (bRestIndex) {
        gDevice.restPreviewIndex();
    }
    $("#divideScreen").attr("mode", mode);
    gDevice.setPreviewShowMode(mode);
    var totalPage = getTotalPageByMode(mode, gDevice.loginRsp.ChannelNum);
    $("#totalPage").text(totalPage);
    $("#curPageText").val("1");
    updatePreOrNextBtnStatus();

    if (mode != SplitModeEnum.WINDOW_MODE_1) {
        var newPageIndex = findPageIndexByChannel(channel, mode, gDevice.getPreviewViewsIndex().Data);
        var curInde = numPerPage(mode) * (newPageIndex);
        for (var i = 0; i < numPerPage(mode); i++) {
            if (gVar.bC0_0305_3120101) {
                continue;//c0 wireless donot openAll(because donot closeAll)
            }
            $("#chnPlay_" + (i + curInde)).click();
        }
    } else {
        if (bSoftFishEye != false) {
            if ($("#chnPlay_" + channel).attr("name") != "active") {
                $("#chnPlay_" + channel).click();
            }
        }
    }

    if (g_bLimitMainPreview && (numPerPage(mode) > g_MainStreamNum)) {
        $("#mainStream").removeClass("streamBtn").addClass("streamBtnDisable");
    } else {
        $("#mainStream").removeClass("streamBtnDisable").addClass("streamBtn");
    }
}

function updatePreOrNextBtnStatus() {
    var curPage = $("#curPageText").val() * 1;
    var totalPage = $("#totalPage").text() * 1;
    if (totalPage == 1) {
        $("#firstPage").attr("disabled", true);
        $("#prePage").attr("disabled", true);
        $("#nextPage").attr("disabled", true);
        $("#lastPage").attr("disabled", true);
        $("#firstPage").css("background-position", "-54px " + $("#firstPage").data("posy"));
        $("#prePage").css("background-position", "-54px " + $("#prePage").data("posy"));
        $("#nextPage").css("background-position", "-54px " + $("#nextPage").data("posy"));
        $("#lastPage").css("background-position", "-54px " + $("#lastPage").data("posy"));
    } else {
        $("#firstPage").attr("disabled", false);
        $("#prePage").attr("disabled", false);
        $("#nextPage").attr("disabled", false);
        $("#lastPage").attr("disabled", false);
        $("#firstPage").css("background-position", "0 " + $("#firstPage").data("posy"));
        $("#prePage").css("background-position", "0 " + $("#prePage").data("posy"));
        $("#nextPage").css("background-position", "0 " + $("#nextPage").data("posy"));
        $("#lastPage").css("background-position", "0 " + $("#lastPage").data("posy"));
        if (curPage == 1) {
            $("#firstPage").attr("disabled", true);
            $("#prePage").attr("disabled", true);
            $("#firstPage").css("background-position", "-54px " + $("#firstPage").data("posy"));
            $("#prePage").css("background-position", "-54px " + $("#prePage").data("posy"));
        } else {
            $("#firstPage").attr("disabled", false);
            $("#prePage").attr("disabled", false);
            $("#firstPage").css("background-position", "0 " + $("#firstPage").data("posy"));
            $("#prePage").css("background-position", "0 " + $("#prePage").data("posy"));
        }
        if (curPage >= totalPage) {
            $("#nextPage").attr("disabled", true);
            $("#lastPage").attr("disabled", true);
            $("#nextPage").css("background-position", "-54px " + $("#nextPage").data("posy"));
            $("#lastPage").css("background-position", "-54px " + $("#lastPage").data("posy"));
        } else {
            $("#nextPage").attr("disabled", false);
            $("#lastPage").attr("disabled", false);
            $("#nextPage").css("background-position", "0 " + $("#nextPage").data("posy"));
            $("#lastPage").css("background-position", "0 " + $("#lastPage").data("posy"));
        }
    }
    gDevice.setPageIndex(curPage - 1);
}

var preValue = [0, 0, 0, 0, 0, 0];
//set preValue global for cursor Class obj can't find right local variable[preValue]--->because Hue is undefined , new Class
//Drag a change
function cursor() {
    var $obj = "";
    var num = 128;//number of plies
    var cube = 2;//Each layer represents the numerical value
    var value = 0;
    var minVal = 0;
    var maxVal = 255;
    var timeOut;
    if(preValue == undefined){
    	preValue = [0, 0, 0, 0, 0, 0];
    }

    this.setPreValue = function (id, data) {
        switch (id) {
            case "sj":
                preValue[0] = data;
                break;
            case "ld":
                preValue[1] = data;
                break;
            case "dbd":
                preValue[2] = data;
                break;
            case "bhd":
                preValue[3] = data;
                break;
            case "sps":
                preValue[4] = data;
                break;
            case "ga":
                preValue[5] = data;
                break;
        }
    }

    this.val = function () {
        return value;
    };

    //set range
    this.setRange = function (i, j) {
        minVal = i;
        maxVal = j;
        cube = Math.ceil((maxVal - minVal + 1) / num); //Take up the whole, avoid cube is 0
    }

    //create cube
    this.create = function (id) {
        $obj = $("#" + id);
        if ($obj.attr("create") == "down")
            return;
        else
            $obj.attr("create", "down");

        $obj.empty();
        $obj.append("<ol></ol>")
        for (var i = 0; i < num; ++i) {
            $obj.children("ol").prepend("<li class='cursorCube' num='" + i + "'></li>");
        }
        // addlisten click
        var down = false;
        var bBtnClk = false;
        var intervalID;
        var timeoutID;
        var thisClass = this;
        $obj.children("ol").children().each(function (i) {
            var number = $(this).attr("num");
            $(this).mousedown(function () {
                down = true;
                value = parseInt(number * cube);
                var resNum, resId = id.split("_")[2];
                if (number != 1 && number == num - 1) {//Mandatory display for the maximum
                    thisClass.Default(maxVal);
                    resNum = maxVal;
                } else {
                    thisClass.Default(value + minVal);
                    resNum = value + minVal;
                }
                thisClass.setPreValue(resId, resNum);
            }).mouseover(function () {
                if (down == true) {
                    value = parseInt(number * cube);
                    if (number != 1 && number == num - 1) {//Mandatory display for the maximum
                        thisClass.Default(maxVal);
                    } else {
                        thisClass.Default(value + minVal);
                    }
                } else {
                    var value = parseInt(number * cube);
                    $(this).css("background-color", "#444");
                    $obj.siblings(".curNum").prop("innerHTML", value);
                }
            }).mouseout(function () {
                if (down != true) {
                    switch (id.split("_")[2]) {
                        case "sj":
                            thisClass.Default(preValue[0]);
                            break;
                        case "ld":
                            thisClass.Default(preValue[1]);
                            break;
                        case "dbd":
                            thisClass.Default(preValue[2]);
                            break;
                        case "bhd":
                            thisClass.Default(preValue[3]);
                            break;
                        case "sps":
                            thisClass.Default(preValue[4]);
                            break;
                        case "ga":
                            thisClass.Default(preValue[5]);
                            break;
                    }
                } else if (down == true) {
                    return;
                }

            });

            $(document).mouseup(function () {
                if (down == true) {
                    clearTimeout(timeOut);
                    var param = {};
                    param.key = parseInt($obj.attr("flag"));
                    param.Chroma = parseInt($("#live_wd_sj_curNum").text());
                    param.Brightness = parseInt($("#live_wd_ld_curNum").text());
                    param.contrast = parseInt($("#live_wd_dbd_curNum").text());
                    param.saturation = parseInt($("#live_wd_bhd_curNum").text());
                    param.Sharpness = parseInt($("#live_wd_sps_curNum").text());
                    param.Gamma = parseInt($("#live_wd_ga_curNum").text());
                    timeOut = setTimeout(function () {
                        if (bBtnClk) {
                            RfParamCall(function () {
                            }, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Set", param);
                            RfParamCall(function () {
                            }, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
                            bBtnClk = false;
                        } else {
                            RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Set", param);
                            RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
                        }
                    }, 10);
                    down = false;
                }
            })
        })

        function _btnMsDown(i) {
            bBtnClk = true;
            down = true;
            _AddMinus(i);
            clearInterval(intervalID);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function () {
                if (down) {
                    intervalID = setInterval(function () {
                        if (down) {
                            _AddMinus(i);
                        } else {
                            clearInterval(intervalID);
                        }
                    }, 100);
                }
            }, 400);
        }

        function _AddMinus(i) {
            var numModify = $obj.siblings(".curNum").prop("innerHTML") * 1 + i;
            if (numModify < 0 || numModify > maxVal) {
                return;
            }
            thisClass.Default(numModify);
            var resId = id.split("_")[2];
            thisClass.setPreValue(resId, numModify);
        }

        $obj.prev().mousedown(function () {
            _btnMsDown(-1);
        });
        $obj.next().mousedown(function () {
            _btnMsDown(+1);
        });
    }
    // set default value
    this.Default = function (i) {
        $obj.siblings(".curNum").prop("innerHTML", i);
        i = parseInt(num - ((i - minVal) / cube) - 1);
        $obj.children("ol").children().each(function (j) {
            var j1 = parseInt(j);
            if (i <= j1) {
                if (lgCls.skin == "white") {
                    $(this).css("background-color", "#73b9dc");
                } else if (lgCls.skin == "golden") {
                    $(this).css("background-color", "#ff9900");
                } else if (lgCls.skin == "blue") {
                    $(this).css("background-color", "#73b9dc");
                } else if (lgCls.skin == "red_c95") {
                    $(this).css("background-color", "#cf0652");
                } else if (lgCls.skin == "orange_c148") {
                    $(this).css("background-color", "rgb(239,127,27)");
                } else if (lgCls.skin == "green_c87") {
                    $(this).css("background-color", "#00ad98");
                } else if (lgCls.skin == "golden_ipc") {
                    $(this).css("background-color", "#F8982C");
                } else if (lgCls.skin == "green_c2") {
                    $(this).css("background-color", "rgb(180,213,137)");
                } else if (lgCls.skin == "red_c177") {
                    $(this).css("background-color", "#8a1f2b");
                }else if(lgCls.skin == "green_c13"){
                    $(this).css("background-color", "#00A651");
                } else if (lgCls.skin == "red_c116") {
                    $(this).css("background-color", "rgb(0,45,98)");
                } else if (lgCls.skin == "yellow") {
                    $(this).css("background-color", "#fcc900");
                } else if (lgCls.skin == "green_c142") {
                    $(this).css("background-color", "#00afc6");
                } else if (lgCls.skin == "red_c12") {
                    $(this).css("background-color", "rgb(152,18,18)");
                } else if (lgCls.skin == "green_c198") {
                    $(this).css("background-color", "#5c671f");
                } else if (lgCls.skin == "white_c204") {
                    $(this).css("background-color", "#006a9a");
                } else if (lgCls.skin == "red_c32") {
                    $(this).css("background-color", "rgb(205,43,53)");
                } else if (lgCls.skin == "red_c166") {
                    $(this).css("background-color", "rgb(145,0,35)");
                } else if (lgCls.skin == "purple_c219") {
                    $(this).css("background-color", "#4e4c69");
                } else if (lgCls.skin == "white_c224") {
                    $(this).css("background-color", "#206ec5");
                } else if (lgCls.skin == "yellow_c229") {
                    $(this).css("background-color", "#F1CA00");
                } else if (lgCls.skin == "white_c238") {
                    $(this).css("background-color", "#d5002c");
                } else {
                    $(this).css("background-color", "#32a0e1");
                }
                if (i === j1) {
                    $(this).css("background-color", "#444");
                }
            }
            else {
                if (lgCls.skin == "white") {
                    $(this).css("background-color", "#e1e2e3");
                } else if (lgCls.skin == "golden") {
                    $(this).css("background-color", "#e6ebf0");
                } else if (lgCls.skin == "golden_ipc") {
                    $(this).css("background-color", "rgb(51, 51, 51)");
                } else if (lgCls.skin == "green_c87") {
                    $(this).css("background-color", "#00635c");
                } else if (lgCls.skin == "red_c177") {
                    $(this).css("background-color", "#e1dbd8");
                } else if (lgCls.skin == "red_c116") {
                    $(this).css("background-color", "rgb(105,100,102)");
                } else if (lgCls.skin == "red_c12" || lgCls.skin == "yellow_c229") {
                    $(this).css("background-color", "#fff");
                } else if (lgCls.skin == "green_c198") {
                    $(this).css("background-color", "#757575");
                } else if (lgCls.skin == "white_c204" || lgCls.skin == "white_c224") {
                    $(this).css("background-color", "#eee");
                } else if (lgCls.skin == "red_c166") {
                    $(this).css("background-color", "rgb(187,187,187)");
                } else if (lgCls.skin == "white_c238") {
                    $(this).css("background-color", "#ccc");
                } else {
                    $(this).css("background-color", "#e6ebf0");
                }
            }
        })
    }
}

function PreviewNextCall() {
    var curCh = $("#channelList").attr("selectIndex") * 1;
	var bSupport = false;
	if(gDevice.devType == devTypeEnum.DEV_NVR && (lgCls.version == gVar.CtArr[0] || lgCls.version == gVar.CtArr[1] || lgCls.version == gVar.CtArr[7] || lgCls.version == gVar.CtArr[12] || lgCls.version == gVar.CtArr[98])){
		bSupport = true;
	}
	if(gVar.bHDVRC7){
		bSupport = true;
	}
	if(bSupport){
        if (((gDevice.devState[curCh].Abilities >> AbilityTypeEnum.WHITE_LIGHT) & 1) ||
            ((gDevice.devState[curCh].Abilities >> AbilityTypeEnum.LOUD_SPEAKER) & 1)
        ) {
            $("#floodLight").show();
            $("#audioAlarm").show();
            //console.log("refresh curCh=" + curCh);
            RfParamCall(liveParamCall, "liveParamSet", paramPage.MsgParamPreviewCtrl, curCh, "Get");
        } else {
            if ($("#floodLight").attr("name") == "active") {
                $("#floodLight").click();
            }
            if ($("#audioAlarm").attr("name") == "active") {
                $("#audioAlarm").click();
            }

            $("#floodLight").hide();
            $("#audioAlarm").hide();
        }
    }
}

var Hue = new cursor();
var Bright = new cursor();
var Contrast = new cursor();
var Saturation = new cursor();
var Sharpness = new cursor();
var Gamma = new cursor();

function SilderGetCall(strxml) {
    if (gVar.bDoNextCall) {
        gVar.bDoNextCall = false;
        PreviewNextCall();
    }

    if (strxml == "-1") return;

    var ColorMode = strxml["ColorMode"] * 1;//0：63 1：255 2:100
    var maxNum = 255;
    if (0 == ColorMode) {
        maxNum = 63;
    } else if (1 == ColorMode) {
        maxNum = 255;
    } else if (2 == ColorMode) {
        maxNum = 100;
    }

    if (!Hue) {
        var Hue = new cursor();
        var Bright = new cursor();
        var Contrast = new cursor();
        var Saturation = new cursor();
        var Sharpness = new cursor();
        var Gamma = new cursor();
    }

    Hue.setRange(0, maxNum);
    Bright.setRange(0, maxNum);
    Contrast.setRange(0, maxNum);
    Saturation.setRange(0, maxNum);
    Sharpness.setRange(0, maxNum);
    Gamma.setRange(0, maxNum);

    Hue.create("live_wd_sj");
    Bright.create("live_wd_ld");
    Contrast.create("live_wd_dbd");
    Saturation.create("live_wd_bhd");
    Sharpness.create("live_wd_sps");
    Gamma.create("live_wd_ga");

    Hue.Default(strxml["Chroma"] * 1);
    Hue.setPreValue("sj", strxml["Chroma"] * 1);

    Bright.Default(strxml["Brightness"] * 1);
    Bright.setPreValue("ld", strxml["Brightness"] * 1);

    Contrast.Default(strxml["contrast"] * 1);
    Contrast.setPreValue("dbd", strxml["contrast"] * 1);

    Saturation.Default(strxml["saturation"] * 1);
    Saturation.setPreValue("bhd", strxml["saturation"] * 1);

    Sharpness.Default(strxml["Sharpness"] * 1);
    Sharpness.setPreValue("sps", strxml["Sharpness"] * 1);

    Gamma.Default(strxml["Gamma"] * 1);
    Gamma.setPreValue("ga", strxml["Gamma"] * 1);

    if (strxml["ShowDefault"] * 1 == 0) {
        $("#color_default").hide();
    } else {
        $("#color_default").show();
    }
}

$("#color_default").click(function () {
    var param = {};
    param.key = 6;
    RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Set", param);
    RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
})
//	.mouseover(function () {
//    if(lgCls.skin == "white"){
//        $(this).css({"cursor": "pointer", "background-color": "#73b9dc"});
//    }else {
//        $(this).css({"cursor": "pointer", "background-color": "#73b9dc"});
//    }
//}).mouseout(function () {
//    if(lgCls.skin == "white"){
//        $(this).css({"cursor": "default", "background-color": "#e1e2e3"});
//    }else {
//        $(this).css({"cursor": "default", "background-color": "#32a0e1"});
//    }
//});

$("#color_refresh").click(function () {
    RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
})
//	.mouseover(function () {
//    if(lgCls.skin == "white"){
//        $(this).css({"cursor": "pointer", "background-color": "#73b9dc"});
//    }else {
//        $(this).css({"cursor": "pointer", "background-color": "#73b9dc"});
//    }
//}).mouseout(function () {
//    if(lgCls.skin == "white"){
//        $(this).css({"cursor": "default", "background-color": "#e1e2e3"});
//    }else {
//        $(this).css({"cursor": "default", "background-color": "#32a0e1"});
//    }
//});


function FishEyeClkCall(xml) {
    if (xml == "") {
        return;
    }
    var fishEyePos = xml["pos"];
    if (fishEyePos == "undefined") {
        return;
    }
    var channel = $(".channelRow[name='active']").attr("id").split('_')[1] * 1;
    channel = isNaN(channel) ? 0 : channel;
    gDevice.SetFishEyePtzPos(fishEyePos, channel);
}

function FishEyeCall(xml) {
    //console.log(xml);
    if (xml == "") {
        return;
    }

    var chArr = [], channel = 0, hardMode, streamNum;
    //prevShowMode
    if ($("#fish-eye-btn").data("code") * 1 == 1) {//hard
        hardMode = $(".mode-hard .display-mode[name='active']").data('mode') * 1;
        streamNum = getFishEyeHardChNumByMode(hardMode);
        for (i = 0; i < streamNum; i++) {
            chArr.push(i);
        }
        gDevice.PreviewStop(chArr);
    } else {//soft
        channel = $("#channelList").attr("selectIndex") * 1;
        gDevice.PreviewStop([channel]);
    }

    if (gDevice.hasPreviewRight(channel) == false) {
        return;
    }

    var _xml = {};
    _xml.code = xml["code_mode"] * 1;
    _xml.mount_hard = xml["mount_mode_1"];
    _xml.show_hard = xml["show_mode_1"];
    _xml.mount_soft = gVar.LocalFishEye.mountMode;
    _xml.show_soft = gVar.LocalFishEye.showMode;

    var i, splitMode;
    var codeMode = _xml.code, mountMode, showMode;
    var streamArr = [], streamSelId = $(".streamActiveBtnIPC").attr("id"), streamSelN;
    var ret;
    switch (streamSelId) {
        case "mainStream":
            streamSelN = streamTypeEnum.MainStreamType;
            break;
        case "subStream":
            streamSelN = streamTypeEnum.SubStreamType;
            break;
        case "mobileStream":
            streamSelN = streamTypeEnum.MobileStreamType;
            break;
        case "fourStream":
            streamSelN = streamTypeEnum.FourStreamType;
            break;
        default:
            streamSelN = streamTypeEnum.SubStreamType;
            break;
    }

    streamNum = gDevice.loginRsp.FishEye.curStreamNum;

    if (codeMode == 1) {//hard
        splitMode = getSplitModeByChannelNum(streamNum);
        mountMode = _xml.mount_hard;
        showMode = _xml.show_hard;

        gDevice.setPreviewShowMode(splitMode);
        //gDevice.PreviewDbclkFullscreen(splitMode == SplitModeEnum.WINDOW_MODE_1 ? true : false);
        gDevice.PreviewFishEyeMode(showMode);
        gDevice.loginRsp.FishEye.curShowMode = showMode;

        chArr = [];
        for (i = 0; i < streamNum; i++) {
            if ($("#chnPlay_" + i).attr("name") == "active") {
                chArr.push(i);
            }
        }
        $("#divideScreen").attr("mode", splitMode).attr("preMode", splitMode); //0->1 frequency division；1->4 frequency division
        ret = gDevice.PreviewPlay(chArr);

    } else {//soft
        mountMode = _xml.mount_soft;
        showMode = _xml.show_soft;
        ret = gDevice.PreviewPlay([channel], playType.fishEyeSoftPlay);//channel,softMode
        gDevice.SetFishEyeSoftMode(channel, showMode);
//		ret = gDevice.SetFishEyeSoftMode(channel,showMode);//channel,softMode
    }

    if (errCodeEnum.Code_Success == ret.Code) {
        //css
        //Covert channel stream selection box
        $(".chnStreamBtn").attr("isclick", "").css("background-position", "0px -66px");
        $("#tip_main").css("display", "none");

        //Set the fisheye properties
        $("#fish-eye-btn").data('code', codeMode).data('mount_hard', _xml.mount_hard).data('mount_soft', _xml.mount_soft).data('show', showMode);

        //code css
        $(".code-mode[data-mode='" + codeMode + "']").siblings().attr('name', '').end().attr('name', 'active');

        //install css
        $("#live .install-mode[data-mode='" + mountMode + "']").siblings().attr('name', '').end().attr('name', 'active');

        //show div css
        $(".display-panel[data-mode='" + codeMode + "']").siblings('.display-panel').attr('name', '').css('display', 'none').end().attr('name', 'active').css('display', 'block');

        if (codeMode == 1) {
            $(".channelRow").css("display", "none");
            $(".channelRow .chnStreamBtn").data("operate", "select_mainStream_div");
            for (i = 0; i < streamNum; i++) {
                $("#channelRow_" + i).css("display", "");
            }
            if (showMode != fishEyeDisplayMode_hard.Partition_PTZ4) {
                $("#channelRow_0 .chnStreamBtn").data("operate", "all");
            }
            $("#fishEyeChn").css("display", "block");

            if (showMode == fishEyeDisplayMode_hard.FishEye_1 || showMode == fishEyeDisplayMode_hard.Panoramic_180) {
                $("#channelRow_" + 0).data("streamType", streamSelN);
                streamArr = [streamSelN];
            } else if (showMode == fishEyeDisplayMode_hard.FishEye_PTZ3) {
                streamArr = [streamSelN, streamTypeEnum.MainStreamType, streamTypeEnum.MainStreamType, streamTypeEnum.MainStreamType]
                for (var i = 0; i < 4; ++i) {
                    $("#channelRow_" + i).data("streamType", streamArr[i]);
                }
            } else if (showMode == fishEyeDisplayMode_hard.Partition_PTZ4) {
                streamArr = [streamTypeEnum.MainStreamType, streamTypeEnum.MainStreamType, streamTypeEnum.MainStreamType, streamTypeEnum.MainStreamType]
                for (var i = 0; i < 4; ++i) {
                    $("#channelRow_" + i).data("streamType", streamArr[i]);
                }
            }
            $(".streamBtnBox").data("AllPlay", true);
            gDevice.SetStreamType(streamArr, chArr);
            RestoreLiveStatus();
            //show css
            $(".mode-hard .display-mode[data-mode='" + showMode + "']").siblings().attr('name', '').end().attr('name', 'active');

            $("#digitalZoom,#originalSize,#adaptive").css('display', '');

        } else {
            //show css
            $("#mode-soft_" + mountMode).siblings().attr('name', '').css('display', 'none').end().attr('name', 'active').attr('display', '');
            $("#mode-soft_" + mountMode + " .display-mode[data-mode='" + showMode + "']").siblings().attr('name', '').end().attr('name', 'active');

            $(".channelRow").css("display", "none");
            $("#fishEyeChn").css("display", "none");

            //digitalZoom Soft solution without electronic amplification function
            $("#digitalZoom,#originalSize,#adaptive").css('display', 'none');
            $("#fish-eye-btn").data("channel", 0).data("preChannel", 0);//The selected child window after switching mode
        }

    }

}

function enterFisheyeSoft() {
    if ($("#digitalZoom").attr("name") == "active") {
        $("#digitalZoom").click();
    }
    CloseOtherVideo("closeall");
    var SelChn = $("#channelList").attr("selectIndex") * 1;
    var ret = gDevice.PreviewPlay([SelChn], playType.fishEyeSoftPlay);
    if ($("#moreScreens").attr("data-name") == "active") {
        $("#divideScreen").css({"background-position": "0 " + $("#divideScreen").data("pos").split(" ")[1]}).attr({
            "name": "",
            "hasClick": ""
        });
        $("#moreScreens").animate({width: "0px"}, 300).fadeOut(10).css({"border": "none"}).attr("data-name", "");
        $(".divideMode").animate({width: "0px"}, 300).css("display", "none");
    }
    if (errCodeEnum.Code_Success == ret.Code) {
        $("#divideScreen").attr("fisheyeMode", $("#divideScreen").attr("preMode"));
        $("#divideScreen").attr("preMode", SplitModeEnum.WINDOW_MODE_1);
        changeMode(SplitModeEnum.WINDOW_MODE_1, false, SelChn, true);
        setSelectWnd(SelChn);
        //gDevice.PreviewDbclkFullscreen(true);
        $("#fish-eye-btn").css("display", "block");
        $("#listBtn").css("display", "none");
        $("#code-box-Bg").css("display", "none");
        $("#fish-eye-btn").data('code', 0).data('mount_soft', 0).data('show', 0);
        if ($("#listBtn").attr("name") == "active") {
            $("#listBtn").click();
            $("#fish-eye-btn").click();
        }
        //code css
        $(".code-mode[data-mode='" + 0 + "']").click();
        //install css
        $("#live .install-mode[data-mode='" + 0 + "']").click();
        //show div css
        $("#live .mode-soft.display-mode[data-mode='" + 1 + "']").click();
        //digitalZoom Soft solution without electronic amplification function
        $("#divideScreen,#digitalZoom,#originalSize,#adaptive,#pageBtnBox").css('display', 'none');
        $("#fish-eye-btn").data("channel", 0).data("preChannel", 0);//The selected child window after switching mode
        $("#focusDiv,#irisDiv,#presetDiv,#cruiseDiv").css('display', 'none');
        g_isFishEyeMode.Preview = true;
    }
}

function exitFisheyeSoft() {
    var SelChn = $("#channelList").attr("selectIndex") * 1;
    gDevice.PreviewStop([SelChn]);
    RestoreLiveStatus();
    $("#divideScreen").attr("preMode", $("#divideScreen").attr("fisheyeMode") * 1);
    changeMode($("#divideScreen").attr("fisheyeMode") * 1, SelChn, false);
    //gDevice.PreviewDbclkFullscreen(false);
    $("#fish-eye-btn").css("display", "none");
    $("#listBtn").css("display", "block");
    if ($("#fish-eye-btn").attr("name") == "active") {
        $("#fish-eye-btn").click();
        $("#listBtn").click();
    }
    $("#divideScreen,#digitalZoom,#originalSize,#adaptive,#pageBtnBox").css('display', 'block');
    $("#focusDiv,#irisDiv,#presetDiv,#cruiseDiv").css('display', 'block');
    g_isFishEyeMode.Preview = false;
}

var tourArr = [];//ptz Track cruise array
function Tourset() {
    this.CruiseIndex = 0, // Track number, up to 4 path 1-4
        this.PpCount = 0, //The number of preset
        this.PauseSecs = 5, // Preset time，5-240
        this.Speed = 1, //running speed,1-63
        this.Pps = [] //32 preset collection points, the biggest support
}

function autoFocusUserCall(xml) {
    if (xml == null) {
        return;
    }
    $("#AFMode_sel").val(xml["AFMode"] * 1);
    $("#PowerMode_sel").val(xml["PowerMode"] * 1);
    $("#TDNAFSwitch_sel").val(xml["TDNAFSwitch"] * 1);
    autoFocusCss(xml["AFMode"] * 1);
}

//liveParam set
function liveParamCall(xml) {
    if (xml == null) {
        return;
    }

    if (gDevice.devType != devTypeEnum.DEV_IPC) {
        if (xml["chn"] * 1 != $("#channelList").attr("selectIndex") * 1) {
            return;//(refresh or report)get channel data != current channel
        }
    }else if((gDevice.loginRsp.ControlBitArray[2] >> 5) & 1 && !$("#help").data("onvif")){
        var infoTemp = $("#help").attr("title");
        infoTemp +=  '\n' + 'Onvif: ' +xml["OnvifVersion"];
        $("#help").attr("title", infoTemp);
        $("#help").data("onvif","1");
    }

    var IntCrossSwitch = xml["IntCrossSwitch"] * 1;
    if (IntCrossSwitch == 1) {
        $("#showIntelligent").attr('name', 'active');
        $("#showIntelligent").css("background-position", "-64px -512px");
    } else {
        $("#showIntelligent").attr('name', '');
        $("#showIntelligent").css("background-position", "0px -512px");
    }

    if (xml["FloodLightMode"] * 1) {
        $("#floodLight").attr("silence", "not");
        if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
            $("#floodLight").css("background-position", "-64px 0px");
        } else {
            $("#floodLight").css("background-position", "0px -544px");
        }
        $("#liveFloodLightImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
    } else {
        $("#floodLight").attr("silence", "silence");
        if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
            $("#floodLight").css("background-position", "0px 0px");
        } else {
            $("#floodLight").css("background-position", "-64px -544px");
        }
        $("#liveFloodLightImg").removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");
    }
    $("#liveFloodLight").slider("setValue", xml["FloodLightValue"] * 1);

    if (xml["AudioAlarmSwitch"] * 1) {
        $("#audioAlarm").attr('silence', 'not');
        if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
            $("#audioAlarm").css("background-position", "-64px -32px");
        } else {
            $("#audioAlarm").css("background-position", "0px -608px");
        }
        $("#audioAlarm_BoxImg").removeClass('sound-silence').addClass('sound-not-silence').data("silence", "not");
    } else {
        $("#audioAlarm").attr('silence', 'silence');
        if (lgCls.version == gVar.CtArr[0] || gVar.bHDVRC7) {
            $("#audioAlarm").css("background-position", "0px -32px");
        } else {
            $("#audioAlarm").css("background-position", "-64px -608px");
        }
        $("#audioAlarm_BoxImg").removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");
    }
    $("#audioAlarm_BoxSlider").slider("setValue", xml["LineOutVolume"] * 1);

    if (xml["FlashLight"] * 1) {
        $("#flashLight").attr('name', 'active');
        $("#flashLight").css("background-position", "-64px -576px");
    } else {
        $("#flashLight").attr('name', '');
        $("#flashLight").css("background-position", "0px -576px");
    }
    $("#flashLight").data("fre",xml["FlashFrequency"]*1);

    if(xml["isDualtalkWorking"] * 1){
        $("#audioAlarm").attr('silence', 'silence');
        if (lgCls.version == gVar.CtArr[0]) {
            $("#audioAlarm").css("background-position", "0px -32px");
        } else {
            $("#audioAlarm").css("background-position", "-64px -608px");
        }
        $("#audioAlarm_BoxImg").removeClass('sound-not-silence').addClass('sound-silence').data("silence", "silence");

        if ($('#audioAlarm').attr("name") == "active") {
            $('#audioAlarm').click();
        }
        ShowPaop(lg.get("IDS_VOICE_INT"), lg.get("IDS_DEVICE_BUSY"));
    }

    //for liveParamCall data not covered FishEyeCall data,set calls one after one
    if (gDevice.devType == devTypeEnum.DEV_IPC &&
        !$("#fish-eye-btn").data("init") &&
        gDevice.loginRsp.FishEye.isFishEye && gDevice.hasPreviewRight(0)) {
        $("#fish-eye-btn").data("init",true);
        $("#fish-eye-btn").click();
    }
}

function saveLiveParam(type) {
    var param = {};
    param.IntCrossSwitch = ($("#showIntelligent").attr("name") == "active") ? 1 : 0;
    param.FlashLight = ($("#flashLight").attr("name") == "active") ? 1 : 0;

    param.FloodLightMode = ($("#floodLight").attr("silence") == "silence") ? 0 : 1;
    param.FloodLightValue = $("#liveFloodLight").slider("getValue") * 1;

    param.AudioAlarmSwitch = ($("#audioAlarm").attr("silence") == "silence") ? 0 : 1;
    param.LineOutVolume = $("#audioAlarm_BoxSlider").slider("getValue") * 1;
	param.OperBtn = gVar.live_OperBtn;

    param.FlashFrequency = $("#flashLight").data("fre")*1;
	
    var saveCh;
    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        saveCh = 0;
        if($("#capture").data("snap")){
            param.SnapFlag = 1;
            $("#capture").data("snap",false);
        }
    } else {
        saveCh = $("#channelList").attr("selectIndex") * 1;
    }

    if (type) {
        RfParamCall(liveParamCall, "liveParamSet", paramPage.MsgParamPreviewCtrl, saveCh, "Set", param);//saved! refresh data
    } else {
        RfParamCall(liveParamCall, "ColorSet", paramPage.MsgParamPreviewCtrl, saveCh, "Set", param);//saved! but wait for alarm info
    }

	gVar.live_OperBtn = 0;
}

function autoFocusCss(isHide) {
    if (isHide != 0) {
        DivBox(1, "#ptzNM_autoFocus");
        DivBox(1, "#ptzNM_restore");
        DivBox(1, "#ptzNM_zoneFocus");
        DivBox(1, "#ipcPtzAF_powerDiv");
        DivBox(1, "#ptzNM_zoomBg");
        DivBox(1, "#ptzNM_focusBg");
        $("#ptzHideDiv").css('display', 'none');
        $("#ptzBtnHideDiv").css("height", "120px").css('display', 'none');
        if (isHide == 1) {
            DivBox(0, "#ipcPtzAF_tdnDiv");
        } else {
            DivBox(1, "#ipcPtzAF_tdnDiv");
        }
    } else {
        DivBox(0, "#ptzNM_autoFocus");
        DivBox(0, "#ptzNM_restore");
        DivBox(0, "#ptzNM_zoneFocus");
        DivBox(0, "#ipcPtzAF_powerDiv");
        DivBox(0, "#ipcPtzAF_tdnDiv");
        DivBox(0, "#ptzNM_zoomBg");
        DivBox(0, "#ptzNM_focusBg");
        $("#ptzHideDiv").css('display', 'block');
        $("#ptzBtnHideDiv").css("height", "80px").css('display', 'block');
    }
}

function preVideoLossProcess(data) {
    //[{"ch":0,"state":0}]
    //console.log("MsgVLossAlarm data.Data:" + JSON.stringify(data.Data));
    for (var i = 0; i < data.Data.length; i++) {
        var ch = data.Data[i].ch;
        var state = data.Data[i].state;
        gDevice.devState[ch].VLossState = state;

        if (state == 1) {//video loss,close channel
            if ($("#chnPlay_" + ch).attr("name") == "active") {
                $("#chnPlay_" + ch).click();
            }
            setTimeout(function () {
                $("#chnPlay_" + ch).attr("name", "disable").css("background-position", "-66px 0");
            }, 1);
			
			if(1){//hide btn
				if ($("#floodLight").attr("name") == "active") {
					$("#floodLight").click();
				}
				if ($("#audioAlarm").attr("name") == "active") {
					$("#audioAlarm").click();
				}
				$("#floodLight").hide();
				$("#audioAlarm").hide();
			}
			if(0){//patch 2018.11.06
				gDevice.devState[ch].CurChnState = -1;
				gDevice.devState[ch].Abilities = gDevice.devState[ch].Abilities & (~(1<<AbilityTypeEnum.WHITE_LIGHT));
				gDevice.devState[ch].Abilities = gDevice.devState[ch].Abilities & (~(1<<AbilityTypeEnum.LOUD_SPEAKER));
			}
        } else {//video restore,open channel
            $("#chnPlay_" + ch).attr("name", "").css("background-position", "0px 0px");//gray
            $("#chnRec_" + ch).attr("name", "").css("background-position", "-66px -22px");//disable
            $("#chnCap_" + ch).attr("name", "").css("background-position", "-66px -44px");//disable
            $("#chnStream_" + ch).attr("name", "").css("background-position", "-66px -66px");//disable

            if (gVar.sPage == "live") {
                $("#chnPlay_" + ch).click();
            }
        }
    }
}

function initSetCam() {
    $("#SetCam_box").contents().find("#setCam_AGCSet").slider({width: 127, minValue: 1, maxValue: 128});
    $("#SetCam_box").contents().find("#setCam_WBRed").slider({width: 127, minValue: 1, maxValue: 255});
    $("#SetCam_box").contents().find("#setCam_WBBlue").slider({width: 127, minValue: 1, maxValue: 255});
    $("#SetCam_box").contents().find("#setCam_WBGreen").slider({width: 127, minValue: 1, maxValue: 255});
    $("#SetCam_box").contents().find("#setCam_IRCutDelay").slider({width: 127, minValue: 1, maxValue: 36});
    $("#SetCam_box").contents().find("#setCam_3dRLevel").slider({width: 127, minValue: 1, maxValue: 255});
    $("#SetCam_box").contents().find("#setCam_BLCLevel").slider({width: 127, minValue: 1, maxValue: 15});
    $("#SetCam_box").contents().find("#setCam_WDRLevel").slider({width: 127, minValue: 1, maxValue: 255});
    $("#SetCam_box").contents().find("#setCam_DefogLevel").slider({width: 127, minValue: 1, maxValue: 255});

    if (((gDevice.loginRsp.PageControl2 >> 31) & 1) == 1) {
        $("#SetCam_box").contents().find("#Cam_IRCutMode option[value='3']").text(lg.get("IDS_VID_MODE"));
    } else {
        $("#SetCam_box").contents().find("#Cam_IRCutMode option[value='3']").remove();
    }
    if (((gDevice.loginRsp.PageControl2 >> 7) & 1) != 1) {
        $("#SetCam_box").contents().find("#setCam_CorridorModeDiv").css("display","block");
    }
    if ((gDevice.loginRsp.ControlBit >> 11) & 1) {
        $("#SetCam_box").contents().find("#Cam_IRCutMode option[value='5']").text(lg.get("IDS_INTELLI_SCHEDULE") + '(B/W)');
    } else {
        $("#SetCam_box").contents().find("#Cam_IRCutMode option[value='5']").remove();
    }

    $("#SetCam_box").contents().find("#setCam_Default").click(function () {
        if(gDevice.devType == devTypeEnum.DEV_IPC && !gDevice.hasUserSetRight(UserSetRightEnum.Parameter)){
            MasklayerHide();
            ShowPaop("SetCam", lg.get("IDS_PLAYBACK_RIGHT1"));
            return(null);
        }
        RfParamCall(setCamCall, "SetCam", paramPage.MsgParamIPCImageSet, 1200, "Get");
        MasklayerShow();
    });

    $("#SetCam_box").contents().find("#setCam_Save").click(function () {
        var Data = getCamCall();
        if (Data) {
            RfParamCall(setCamCall, "SetCam", paramPage.MsgParamIPCImageSet, 2000, "Set", Data);
            MasklayerShow();
        } else {
            alert("setCam err!");
        }
    });
}

function setCamCall(xml) {
    if (xml == null) {
        return;
    }
    var rotate = xml[0]["Rotate"] * 1;
    if (rotate == 0 || rotate == 2) {
        $("#SetCam_box").contents().find("#setCam_CorridorMode").attr("data", 1).attr("other", rotate);
    } else {
        $("#SetCam_box").contents().find("#setCam_CorridorMode").attr("data", 0).attr("other", rotate - 1);
    }
    $("#SetCam_box").contents().find("#setCam_CorridorMode").click();
    $("#SetCam_box").contents().find("#setCam_LensFlip").attr("data", 1 - xml[0]["Flip"] * 1);
    $("#SetCam_box").contents().find("#setCam_LensFlip").click();
    $("#SetCam_box").contents().find("#setCam_AngleFlip").attr("data", 1 - xml[0]["Mirror"] * 1);
    $("#SetCam_box").contents().find("#setCam_AngleFlip").click();

    $("#SetCam_box").contents().find("#setCam_Shutter").val(xml[0]["ShutterMode"] * 1);
    if (xml[0]["DwdrMode"] * 1) {
        if (xml[0]["FlickerCtrl"] * 1 == 0) {
            setShutterCon(1, xml[0]["eShutterSpeed"] * 1, 0);
        } else {
            setShutterCon(2, xml[0]["eShutterSpeed"] * 1, 0);
        }
    } else {
        setShutterCon(0, xml[0]["eShutterSpeed"] * 1, 0);
    }
    $("#SetCam_box").contents().find("#setCam_Section").val(xml[0]["BackLightZone"] * 1);
    $("#SetCam_box").contents().find("#setCam_AGCSet").slider("setValue", xml[0]["GainControlMode"] * 1);

    $("#SetCam_box").contents().find("#setCam_WhiteBalance").val(xml[0]["WBMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_WBRed").slider("setValue", xml[0]["Rgain"] * 1);
    $("#SetCam_box").contents().find("#setCam_WBGreen").slider("setValue", xml[0]["Ggain"] * 1);
    $("#SetCam_box").contents().find("#setCam_WBBlue").slider("setValue", xml[0]["Bgain"] * 1);
    if (xml[0]["WBMode"] * 1 == 1) {
        $("#SetCam_box").contents().find("#setCam_WBRedBg,#setCam_WBBlueBg,#setCam_WBGreenBg").css("display", "block");
    } else {
        $("#SetCam_box").contents().find("#setCam_WBRedBg,#setCam_WBBlueBg,#setCam_WBGreenBg").css("display", "none");
    }

    $("#SetCam_box").contents().find("#Cam_IRCutMode").val(xml[0]["IRCutMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_IRCutDelay").slider("setValue", xml[0]["IRCutDelay"] * 1);
    $("#SetCam_box").contents().find("#setCam_Schdule_STime_H").val(xml[0]["StartTime"]["Hour"] * 1);
    $("#SetCam_box").contents().find("#setCam_Schdule_STime_M").val(xml[0]["StartTime"]["Minute"] * 1);
    $("#SetCam_box").contents().find("#setCam_Schdule_ETime_H").val(xml[0]["EndTime"]["Hour"] * 1);
    $("#SetCam_box").contents().find("#setCam_Schdule_ETime_M").val(xml[0]["EndTime"]["Minute"] * 1);
    if (xml[0]["IRCutMode"] * 1 == 5) {
        $("#SetCam_box").contents().find("#setCam_Schdule_STimeBg,#setCam_Schdule_ETimeBg").css("display", "block");
    } else {
        $("#SetCam_box").contents().find("#setCam_Schdule_STimeBg,#setCam_Schdule_ETimeBg").css("display", "none");
    }

    //$("#SetCam_box").contents().find("#setCam_2dR").val(xml[0]["R2dnrMode"]*1);
    $("#SetCam_box").contents().find("#setCam_3dR").val(xml[0]["R3dnrMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_3dRLevel").slider("setValue", xml[0]["R3dnrThreshTarget"] * 1);
    if (xml[0]["R3dnrMode"] * 1 == 2) {
        $("#SetCam_box").contents().find("#setCam_3dRLevelBg").css("display", "block");
    } else {
        $("#SetCam_box").contents().find("#setCam_3dRLevelBg").css("display", "none");
    }

    $("#SetCam_box").contents().find("#setCam_BLC").attr("data", 1 - xml[0]["BackLightMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_BLCLevel").slider("setValue", xml[0]["BackLightLevel"] * 1);
    $("#SetCam_box").contents().find("#setCam_BLC").click();
    $("#SetCam_box").contents().find("#setCam_WDR").attr("data", 1 - xml[0]["DwdrMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_WDRLevel").slider("setValue", xml[0]["DwdrStrength"] * 1);
    $("#SetCam_box").contents().find("#setCam_WDR").click();
    $("#SetCam_box").contents().find("#setCam_Defog").val(xml[0]["DefogMode"] * 1);
    $("#SetCam_box").contents().find("#setCam_DefogLevel").slider("setValue", xml[0]["DefogStrength"] * 1);
    if (xml[0]["DefogMode"] * 1 == 2) {
        $("#SetCam_box").contents().find("#setCam_DefogLevelBg").css("display", "block");
    } else {
        $("#SetCam_box").contents().find("#setCam_DefogLevelBg").css("display", "none");
    }
    $("#SetCam_box").data("param", xml);

    ShowSetCam();
    $("#SetCam_box").contents().find(".setCamMenu li:first").click();
    if ($.browser.chrome) {
        $("#SetCam_box").css("background", "#f00").css("z-index", "2000");
        setTimeout(function () {
            $("#SetCam_box").css("background", "#000").css("z-index", "1000");
        }, 500);
    }
}

function getCamCall() {
    var data = $("#SetCam_box").data("param");
    if (!$.isArray(data)) {
        return 0;
    }
    data[0].Rotate = $("#SetCam_box").contents().find("#setCam_CorridorMode").attr("other") * 1 + $("#SetCam_box").contents().find("#setCam_CorridorMode").attr("data") * 1;
    data[0].Flip = $("#SetCam_box").contents().find("#setCam_LensFlip").attr("data") * 1;
    data[0].Mirror = $("#SetCam_box").contents().find("#setCam_AngleFlip").attr("data") * 1;

    data[0].ShutterMode = $("#SetCam_box").contents().find("#setCam_Shutter").val() * 1;
    data[0].eShutterSpeed = $("#SetCam_box").contents().find("#setCam_Exposure").val() * 1;
    data[0].GainControlMode = $("#SetCam_box").contents().find("#setCam_AGCSet").slider("getValue") * 1;

    data[0].WBMode = $("#SetCam_box").contents().find("#setCam_WhiteBalance").val() * 1;
    data[0].Rgain = $("#SetCam_box").contents().find("#setCam_WBRed").slider("getValue") * 1;
    data[0].Ggain = $("#SetCam_box").contents().find("#setCam_WBGreen").slider("getValue") * 1;
    data[0].Bgain = $("#SetCam_box").contents().find("#setCam_WBBlue").slider("getValue") * 1;

    data[0].IRCutMode = $("#SetCam_box").contents().find("#Cam_IRCutMode").val() * 1;
    data[0].IRCutDelay = $("#SetCam_box").contents().find("#setCam_IRCutDelay").slider("getValue") * 1;
    data[0].StartTime.Hour = $("#SetCam_box").contents().find("#setCam_Schdule_STime_H").val() * 1;
    data[0].StartTime.Minute = $("#SetCam_box").contents().find("#setCam_Schdule_STime_M").val() * 1;
    data[0].EndTime.Hour = $("#SetCam_box").contents().find("#setCam_Schdule_ETime_H").val() * 1;
    data[0].EndTime.Minute = $("#SetCam_box").contents().find("#setCam_Schdule_ETime_M").val() * 1;

    //data[0].R2dnrMode = $("#SetCam_box").contents().find("#setCam_2dR").val()*1;
    data[0].R3dnrMode = $("#SetCam_box").contents().find("#setCam_3dR").val() * 1;
    data[0].R3dnrThreshTarget = $("#SetCam_box").contents().find("#setCam_3dRLevel").slider("getValue") * 1;

    data[0].BackLightMode = $("#SetCam_box").contents().find("#setCam_BLC").attr("data") * 1;
    data[0].BackLightLevel = $("#SetCam_box").contents().find("#setCam_BLCLevel").slider("getValue") * 1;
    data[0].BackLightZone = $("#SetCam_box").contents().find("#setCam_Section").val() * 1;
    data[0].DwdrMode = $("#SetCam_box").contents().find("#setCam_WDR").attr("data") * 1;
    data[0].DwdrStrength = $("#SetCam_box").contents().find("#setCam_WDRLevel").slider("getValue") * 1;
    data[0].DefogMode = $("#SetCam_box").contents().find("#setCam_Defog").val() * 1;
    data[0].DefogStrength = $("#SetCam_box").contents().find("#setCam_DefogLevel").slider("getValue") * 1;

    return data;
}