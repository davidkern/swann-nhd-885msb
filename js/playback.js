// JavaScript Document
$(function () {
    var playHtml = "";
    var chnNum = gDevice.loginRsp.ChannelNum;
    var analogNum = gDevice.loginRsp.AnalogChNum;
    var checkedchn = []; //The selected channel, for the use of search, playback can be modified
    var downloadOpen = false; //==true Download the box open, can't again open
    var isPlayByImg = false;
    var imgChn = 0;
    var imgIndex = 0;
    var imgTime = '';
    var imgDate = {};
    var previousFun = "";
    var pbManager = new PlaybackManager();
    var timelineObj = {};
    var capCurentPageIndex = 1;
    var searchMode;

    smart_record.innerHTML = lg.get("IDS_RECTYPE_SMART"); //smart
    if (((gDevice.loginRsp.PageControl >> 3) & 1) == 0) { //Does not support intelligent analysis
        $("#recordType option[value='9']").remove();
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        if (lgCls.version == gVar.CtArr[42]) {
            $("#playbackSpeed").css("width", "262px");
        } else if (lgCls.version == gVar.CtArr[70]) {
            $("#select_box,#pbStream_box,#recordType,#pbStream").css("width", "117px");
        }
    }

    if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
        if (gVar.bC0_0305_3120101) {
            $("#recordType").empty();
            $("#recordType").append('<option value="1" id="common_record">Manual Recording</option>');
            $("#recordType").append('<option value="3" id="motion_record">Motion Recording</option>');

            $("#recType").css("margin-left", "5px");
            $("#select_box,#recordType").css("width", "133px");
            //$("#pb_Sound").css("display", "none");
        } else {
            $("#recordType").empty();
            $("#recordType").append('<option value="0" id="all_record">All Record</option>');
            $("#recordType").append('<option value="1" id="common_record">Common Record</option>');
            $("#recordType").append('<option value="4" id="io_record">Alarm</option>');
            $("#recordType").append('<option value="3" id="motion_record">Motion</option>');
            $("#recordType").append('<option value="2" id="warn_record">A+M</option>');
            if (((gDevice.loginRsp.PageControl >> 3) & 1) == 1) {
                $("#recordType").append('<option value="9" id="smart_record">Smart</option>');
            }
            lan('playback');
        }
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        if ((gDevice.loginRsp.PageControl >> 26) & 1) {
            $("#pb_Sound").css("display", "none");//1:hide
        } else {
            $("#pb_Sound").css("display", "block");
        }
    }

    if (gVar.bNormal_0305_2120105) {
        $("#recordType").empty();
        $("#recordType").append('<option value="0" id="all_record">' + lg.get("IDS_RECTYPE_03") + '</option>');
        $("#recordType").append('<option value="1" id="common_record">' + lg.get("IDS_RECTYPE_01") + '</option>');
        $("#recordType").append('<option value="3" id="motion_record">' + lg.get("IDS_RECTYPE_04") + '</option>');
    } else if (gVar.bSN_0305_120105) {
        $("#recordType option[value='2']").remove();
        $("#recordType option[value='4']").remove();
    }

    if ((gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) && lgCls.version == gVar.CtArr[7]) {
        $("#recordType").append('<option value="18" id="pir_record">' + lg.get("IDS_RECTYPE_18") + '</option>');
    }

    if ((gDevice.loginRsp.PageControl2 >> 12 & 0x1) == 1) {
        $("#recordType").append('<option value="18" id="pir_record">' + lg.get("IDS_RECTYPE_18") + '</option>');
    } else if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0] && !gVar.bC0_0305_3120101) {
        if ((gDevice.loginRsp.PageControl2 >> 5 & 0x1) == 1)
            $("#recordType").append('<option value="18" id="pir_record">' + lg.get("IDS_RECTYPE_18") + '</option>');
    }

    if (lgCls.version == gVar.CtArr[7]) {
        if (((gDevice.loginRsp.PageControl >> 3) & 1) == 1) {
            $("#recordType option[value='9']").remove();
            $("#recordType").append('<option value="9" id="smart_record">Smart</option>');
        }
        $("#recordType").append('<option value="11" id="PID_record">PID</option>');
        $("#recordType").append('<option value="6" id="LCD_record">LCD</option>');
        $("#recordType").append('<option value="8" id="SOD_record">SOD</option>');
        $("#recordType").append('<option value="14" id="PD_record">PD</option>');
        $("#recordType").append('<option value="15" id="FD_record">FD</option>');
        $("#recordType").append('<option value="16" id="CC_record">CC</option>');
    }

    if (gVar.bSN_0305_120105) {
        $("#recordType").append('<option value="18" id="pir_record">' + lg.get("IDS_RECTYPE_18") + '</option>');
    }

    if (gVar.bC0_0305_3120101) {
        $("#recordType option[value='3']").attr("selected", true)
    }

    //event
    $(".pbrightContent .install-mode").on('click', function () {
        if ($(this).attr("name") !== "active") {
            var mount = $(this).data("mode") * 1;
            $(".pbrightContent .install-mode[data-mode='" + mount + "']").siblings().attr('name', '').end().attr('name', 'active');
            $(".pbrightContent .mode-soft-div").css('display', 'none').attr('name', '');
            $("#pb_mode-soft_" + mount).css('display', '').attr('name', 'active');
            var show = $("#pb_mode-soft_" + mount + " .display-mode[name='active']").data('mode');
            if (typeof show == "undefined") {
                $("#pb_mode-soft_" + mount + " .display-mode:first").click();
            } else {
                $("#pb_mode-soft_" + mount + " .display-mode").attr('name', '');
                $("#pb_mode-soft_" + mount + " .display-mode[data-mode='" + show + "']").click();
            }
        } else {
            return;
        }
    });
    $('.pbrightContent .mode-soft .display-mode').on('click', function () {
        if ($(this).attr("name") !== "active") {
            var showMode = $(this).data('mode') * 1;
            var mountMode = $(".pbrightContent .install-mode[name='active']").data("mode") * 1;
            var channel = $("#PBchannelList").attr("selectIndex") * 1;
            var $objs = $("#pb_mode-soft_" + mountMode + " .display-mode");
            var $that = $(this);
            if (pbManager.selWnd == -1 || !pbManager.views[pbManager.selWnd].bPlay) {
                $objs.attr('name', '');
                $that.attr('name', 'active');
                return;
            }
            var view = pbManager.views[channel];

            gDevice.SetPlaybackFishEyeSoftMode(view.wndIndex, showMode);

            $objs.attr('name', '');
            $that.attr('name', 'active');
            if (!view.bPlaying) { //pause
                setTimeout(function () {
                    gDevice.SetPlaybackMode([view.wndIndex], [view.playMode]);
                    updateBtnStatus();
                }, 1000);
            }
        } else {
            return;
        }
    });
    $('.pbrightContent .list-box').on('click', function () {
        var listID = $(this).attr("id");
        var $mode = $('.pbrightContent .mode');
        var $modeSoft = $('.pbrightContent .mode-soft');
        var codeMode = $('.pbrightContent .code-mode[name="active"]').attr("id");
        switch (listID) {
            case 'pb_installation': {
                if ($mode.attr("name") !== "active") {
                    $mode.css("display", "block").attr("name", "active");
                } else {
                    $mode.css("display", "none").attr("name", "");
                }
            }
                break;
            case 'pb_display': {
                if ($modeSoft.attr("name") !== "active") {
                    $modeSoft.css("display", "block").attr("name", "active");
                } else {
                    $modeSoft.css("display", "none").attr("name", "");
                }
            }
                break;
            default:
                break;
        }
    });

    if(lgCls.skin == "white_c238"){
        $('#pb_speed').attr("posy","96");
    }

    /*search tree*/
    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        var searchTree = new TreeMenu();
        var objNormal = {
                txt: 'Normal',
                lantxt: 'IDS_RECPLAN_TYPE02',
                type: recordTypeEnum.NormalRecordType
            },
            objAlarm = {
                txt: 'Alarm',
                lantxt: 'IDS_RECPLAN_TYPE03',
                con: [{
                    txt: 'Motion',
                    lantxt: 'IDS_DEFAULT_MOTION',
                    end: 'Alarm',
                    type: recordTypeEnum.MotionRecordType
                }]
            },
            objManual = {
                txt: 'Manual',
                lantxt: 'IDS_MANUAL',
                type: recordTypeEnum.ManualType
            },
            objSmart = {},
            objAll;

        searchTree.setTitle("IDS_TYPE");
        //gDevice.loginRsp.PageControl = 0;
        searchTree.setSize({
            w: 178,
            h: 200
        });
        if (((gDevice.loginRsp.PageControl >> 25) & 1) == 1) {
            objAlarm.con = objAlarm.con.concat([{
                txt: 'IO',
                lantxt: 'IDS_RECTYPE_02',
                end: 'Alarm',
                type: recordTypeEnum.IORecordType
            }]);
        }

        if (((gDevice.loginRsp.ControlBit >> 15) & 1) == 1) {
            objAlarm.con = objAlarm.con.concat([{
                txt: 'Sound',
                lantxt: 'IDS_SOUND_TIP',
                end: 'Alarm',
                type: recordTypeEnum.SoundRecordType
            }]);
        }

        if (((gDevice.loginRsp.ControlBit >> 29) & 1) == 1) {
            objAlarm.con = objAlarm.con.concat([{
                txt: 'Netbreak',
                lantxt: 'IDS_NETBREAK',
                end: 'Alarm',
                type: recordTypeEnum.NetbreakRecordType
            }]);
        }

        if (((gDevice.loginRsp.PageControl2 >> 5) & 1) == 1 || ((gDevice.loginRsp.PageControl2 >> 12) & 1) == 1) {
            objAlarm.con = objAlarm.con.concat([{
                txt: 'PIR',
                lantxt: 'IDS_RECTYPE_18',
                end: 'Alarm',
                type: recordTypeEnum.PIRRecordType
            }]);
        }

        if ((gDevice.loginRsp.PageControl >> 3) & 1 == 1) {
            objSmart = {
                txt: 'Smart',
                lantxt: 'IDS_INTELLIGENT',
                con: []
            };
            if ((gDevice.loginRsp.ControlBitArray[0] >> 18) & 1) {
                //no pid , lcd, sod
            } else {
                objSmart.con = objSmart.con.concat([{
                    txt: 'PID',
                    lantxt: 'IDS_SMART_PID',
                    end: 'Smart',
                    type: recordTypeEnum.PEAAreaRecordType
                },
                    {
                        txt: 'LCD',
                        lantxt: 'IDS_SMART_LCD',
                        end: 'Smart',
                        type: recordTypeEnum.PEALineRecordType
                    },
                    {
                        txt: 'SOD',
                        lantxt: 'IDS_SMART_SOD',
                        end: 'Smart',
                        type: recordTypeEnum.OSCRecordType
                    }
                ]);
            }
            searchTree.setSize({
                w: 178,
                h: 300
            });
            if ((gDevice.loginRsp.PageControl >> 5) & 1 == 1) {
                if (lgCls.version != gVar.CtArr[95] && (((gDevice.loginRsp.ControlBitArray[0] >> 19) & 1) != 1)) {
                    objSmart.con = objSmart.con.concat([{
                        txt: 'PD',
                        lantxt: 'IDS_SMART_PD',
                        end: 'Smart',
                        type: recordTypeEnum.HDRecordType
                    }]);
                }
                if (((gDevice.loginRsp.ControlBitArray[0] >> 21) & 1) != 1) {
                    objSmart.con = objSmart.con.concat([
                        {
                            txt: 'FD',
                            lantxt: 'IDS_SMART_FD',
                            end: 'Smart',
                            type: recordTypeEnum.FDRecordType
                        }
                    ]);
                }
                if (((gDevice.loginRsp.ControlBitArray[0] >> 20) & 1) != 1) {
                    objSmart.con = objSmart.con.concat([
                        {
                            txt: 'CC',
                            lantxt: 'IDS_SMART_CC',
                            end: 'Smart',
                            type: recordTypeEnum.PCCRecordType
                        }
                    ]);
                }
            }
        }

        var objArrs = [objNormal, objAlarm, objSmart];
        if ((gDevice.loginRsp.PageControl >> 10) & 0x01){
            objArrs.splice(1,0,objManual);
        }
        objAll = {
            txt: 'All',
            lantxt: "IDS_CFG_ALL",
            start: 'All',
            con: objArrs
        };
        arrMenu = [];
        arrMenu.push(objAll);
        searchTree.create("newRecordType", arrMenu);
        searchTree.setValue(objAll.txt);
        searchTree.hideBranch(["Manual"]);
        if (((gDevice.loginRsp.ControlBitArray[0] >> 26) & 1) == 1) {
            $("#newRecordType_PD_Txt").text(lg.get("IDS_SMART_PD")+"&VD");
        }
        $("#searchBox").css('display', 'none');
        $("#newSearchType").css('display', 'block');

        gDevice.PlaybackDbclkFullscreen(true); //ipc Next, double-left click on full screens

        if (gDevice.loginRsp.FishEye.isFishEye) {
            $(".pbrightContent").css('display', 'block');
            $(".pbrightContent .fish-eye-box").css('display', 'block');
            $(".playbackContent,#FDContent").css('right', '210px');
            $("#pb_Zoom").css('display', 'none');

            setTimeout(function () {
                $(".pbrightContent .install-mode[data-mode='" + 0 + "']").attr('name', 'active');
                $("#pb_mode-soft_" + 0 + " .display-mode[data-mode='" + 1 + "']").attr('name', 'active'); //Fisheye
            }, 0);
        }

        if (lgCls.version == gVar.CtArr[166]) {
            $("#newRecordType").css("top", "260px");
            $("#PBchannelList").css("top", "360px");
            $("#pbBeginTimeSet").timer({Type: 1, hasSecond: false});
            $("#pbEndTimeSet").timer({Type: 1, hasSecond: false});
            $("#pbBeginTimeSet").timer.SetTimeIn24("00:00:00", $("#pbBeginTimeSet"), false);
            $("#pbEndTimeSet").timer.SetTimeIn24("23:59:00", $("#pbEndTimeSet"), false);
            $("#pbSetTimeDiv").css("display", "");
        } else if (lgCls.version == gVar.CtArr[204] && gVar.lg == "ENU") {
            $("#newRecordType_Alarm_Txt").text(lg.get("IDS_MOTION_ALARM"));
        } else if (lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            $("#newRecordType_Alarm_Txt").text("이벤트");
        }

        if(lgCls.skin == "white_c238"){
            if((gDevice.loginRsp.PageControl >> 26) & 1){
                $("#pb_Sound").css("display", "block");
            }else{
                $("#pb_Sound").css("display", "none");
            }
        }

        if ((gDevice.loginRsp.ControlBitArray[0] >> 11) & 1) {
            $("#pbFunctionType").append('<option value="2">' + lg.get("IDS_PICTURE") + '</option>');
            $("#calendar").css('top', '50px');
            $("#newRecordType").css('top', '245px');
            $("#PBchannelList").css('top', '345px');
            $("#pbType").css("display", "block");

            $("#pbFunctionType").data("preMode", 0);
            $('#FDImageList').data("selecedtIndex", 0);
            //select mode wing
            $("#pbFunctionType").change(function () {
                var mode = $(this).val() * 1;
                //default all
                searchTree.setValue('All');
                switch (mode) {
                    case PlayBackMode.General: {
                        if (downloadOpen) {
                            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_DOWNLOADING"));
                            $("#pbFunctionType").val($("#pbFunctionType").data("preMode"));
                            return;
                        }

                        $("#PBchannelList").data("count", 0);

                        if ($("#pb_exit").css("display") == "block") {
                            ExitFDPlayback();
                        }

                        if ($("#FDImageList").find(".FDImageDivSelect").css("display") == "none") {
                            $("#FDPlayBtnMask").show();
                        }

                        $("#newRecordType").css('top', '245px');
                        $("#PBchannelList").css('top', '345px');
                        $("#searchBtn").css('top', '300px');

                        $(".playbackContent,#calendar,#searchBtn").css("display", "block");
                        $("#FDContent, #pbFDSearchTime_div").css("display", "none");
                        $(".chosen2,.chosen3").removeClass("PictureCal");
                        $("#Zoom_box").css("z-index", "10003");
                        searchTree.hideBranch(["Manual"]);
                        searchTree.showBranch(["Netbreak", "Smart"]);

                        if ($.browser.msie) {
                            $("#playbackOcx").append($("#ipcocx").detach());
                            $("#ipcocx").css({width: "100%", height: "100%"});
                            timelineresize();
                        } else {
                            SetResize('playback');
                            timelineresize();
                        }

                        ChangeTimeline(0);
                        isPlayByImg = false;
                    }
                        break;

                    case PlayBackMode.Picture: {
                        if (ExitPlayback() == -1)
                            return;
                        $("#FDImageList").empty();
                        $("#FDPlayBtnMask").show();
                        $("#FDImageListPage").hide();

                        $("#newRecordType").css('top', '315px');
                        $("#PBchannelList").css('top', '418px');
                        $("#searchBtn").css('top', '370px');

                        $(".playbackContent").css("display", "none");
                        $("#FDContent,#pbFDSearchTime_div,#calendar,#PBchannelList,#searchBtn").css("display", "block");
                        $("#pbSoundLine").attr("data-name", "").css('display', 'none');
                        $(".chosen2,.chosen3").addClass("PictureCal");

                        $("#Zoom_box").css("z-index", "9998");
                        $("#FDImageListDiv").css("top", "0px");
                        $("#FDImageList").css('bottom', 'auto');

                        searchTree.hideBranch(["Netbreak", "Smart"]);
                        searchTree.showBranch(["Manual"]);

                        if (previousFun != "PicFun") {
                            $("#FDImageList").empty();
                            $("#FDImageListPage").hide();
                        }

                        $("#PBchannelList").data("count", 0);
                        $.each(checkedchn, function (i) {
                            checkedchn[i] = false;
                        });

                        //init time select box
                        showTimer(false, "pbPicTimeStart");
                        showTimer(2, "pbPicTimeEnd");

                        if ($.browser.msie) {
                            $("#FDTempOcx").append($("#ipcocx").detach());
                            $("#ipcocx").css({width: "1px", height: "1px"});
                            timelineresize();
                        } else {
                            SetResize('FDSearch');
                            timelineresize();
                        }

                        ChangeTimeline(1);
                    }
                        break;
                }
                $("#pbFunctionType").data("preMode", mode);
            });

            $('body').delegate("div[id^='FDImageListDiv_']", 'click', function () {
                var index = $('#FDImageList').data("selecedtIndex") * 1;
                if (0 != index) {
                    var id = 'FDImageListDiv_' + index;
                    $('#' + id).removeClass("FDImageDivSelect").addClass("FDImageDivNormal");
                }
                $(this).removeClass("FDImageDivNormal").addClass("FDImageDivSelect");
                $('#FDImageList').data("selecedtIndex", $(this).attr('id').split('_')[1] * 1);
            });

            $('body').delegate("div[id^='FDImageListDiv_']", 'dblclick', function () {//wing
                $("#FDImageListPlay").click();
            });

            $("#FDImageListPage .pageBtn").mouseover(function () {
                if (!$(this).attr("disabled")) {
                    $(this).css({"background-position": "-18px " + $(this).data("posy"), "cursor": "pointer"});
                }
            }).mouseout(function () {
                if (!$(this).attr("disabled")) {
                    $(this).css("background-position", "0 " + $(this).data("posy"));
                }
            }).click(function () {
                if ($(this).attr("disabled")) return;

                var curAct = $(this).attr("data-act");
                var faceIdArr = [];
                var mode = $("#pbFunctionType").val() * 1;
                if (mode == PlayBackMode.Picture) {
                    var ImgPerPage = 10;
                    var obj = getImgData();
                    var recType = searchTree.getValue();
                    switch (curAct) {
                        case "firstPage": {
                            capCurentPageIndex = 1;
                            ImCurentPageIndex = 1;
                        }
                            break;

                        case "prePage": {
                            capCurentPageIndex = capCurentPageIndex - 1;
                            if (capCurentPageIndex == 0) {
                                capCurentPageIndex = 1;
                                return;
                            }
                        }
                            break;

                        case "nextPage": {
                            var tmpCount = $("#pageTotal").html() * 1;
                            if ((capCurentPageIndex + 1) > tmpCount) {
                                return;
                            }
                            capCurentPageIndex = capCurentPageIndex + 1;
                        }
                            break;

                        case "lastPage": {
                            var tmpCount = $("#pageTotal").html() * 1;
                            capCurentPageIndex = g_CapImgNum < 0 ? (capCurentPageIndex + 5) : tmpCount;
                        }
                            break;
                    }
                    loadingLayerShow();
                    gDevice.AIGroupConfig({
                        msgType: "PIC_getPicture",
                        StartTime: obj.StartTime,
                        EndTime: obj.EndTime,
                        Chn: obj.Chn,
                        TypeBits: recType,
                        PicStartIndex: (capCurentPageIndex - 1) * ImgPerPage,
                        PicEndIndex: capCurentPageIndex * ImgPerPage,
                    });
                }

            });

    $("#FDImageListPage").on("keydown", "#curPageText", function (e) {
        if (e.which == 13) {
            var totalNum = $("#pageTotal").html() * 1 || 0;
            if( totalNum == 0 ) { return; }

            var ImgPerPage = 10;
            var obj = getImgData();
            var recType = searchTree.getValue();
            capCurentPageIndex = $(this).val() * 1;
            gDevice.AIGroupConfig({
                msgType: "PIC_getPicture",
                StartTime: obj.StartTime,
                EndTime: obj.EndTime,
                Chn: obj.Chn,
                TypeBits:recType,
                PicStartIndex:(capCurentPageIndex-1)  * ImgPerPage,
                PicEndIndex:capCurentPageIndex  * ImgPerPage,
            });
            loadingLayerShow();
        }
    });

            $("#FDImageListPlay").mousemove(function () {//wing
                $(this).css({"background-position": "-32px " + $(this).data("posy"), "cursor": "pointer"});
            }).mouseout(function () {
                $(this).css({"background-position": "0px " + $(this).data("posy"), "cursor": "pointer"});
            }).click(function () {
                if ($("#FDImageList").children().size() == 0) {
                    return;
                }

                isPlayByImg = true;
                $(".playbackContent, #pb_exit").css("display", "block");
                $("#FDContent, #pb_PlayAll, #pb_StopAll,.leftContent").css("display", "none");

                $("#progressBar").css("height", "52.5px");
                $("#progress-bar").css("height", "52.5px");
                $("#pbControlBtn_Box").css("bottom", "67.5px");
                $("#playbackOcx").css("bottom", "102.5px");
                $(".playbackContent").css('left', '0px');

                if ($.browser.msie) {
                    $("#playbackOcx").append($("#ipcocx").detach());
                    $("#ipcocx").css({width: "100%", height: "100%"});
                } else {
                    SetResize('playback');
                }

                timelineresize();

                imgIndex = $("#FDImageList").find(".FDImageDivSelect").attr('id').split('_')[1] - 1;
                imgTime = $("#FDImageListHeadTime_" + (imgIndex + 1)).html().split(" ");
                //ie11 imgTime.length = 4,when ie8 imgTime.length = 2
                imgTime = imgTime[imgTime.length-1];
                imgChn = $("#FDImageListChn_" + (imgIndex + 1)).attr("data-chn") * 1;

                var dateArr = $("#FDImageListHeadTime_" + (imgIndex + 1)).html().split(" ")[0].split("-");
                imgDate.Year = dateArr[0] * 1;
                imgDate.Month = dateArr[1] * 1;
                imgDate.Day = dateArr[2] * 1;

                pbManager.wndIndex = imgChn;

                playbackChangeMode(SplitModeEnum.WINDOW_MODE_1);
                pbManager.SearchByDay([imgChn]);

                if ($("#pbFunctionType").val() * 1 == PlayBackMode.Picture)
                    loadingLayerShow();

            });
        }
    } else {
        $("#pb_PlayAll,#pb_StopAll").css('display', '');
    }

    $("#Zoom_box").attr("src", "html/zoom.html?version=" + version_web);
    if ($.browser.msie && $.browser.version.split(".")[0] * 1 <= 9) {
        $("select").addClass("IE9Select");
    }

    if (lgCls.version == gVar.CtArr[44] || g_bShowBSL) {
        $('#searchBox').css('top', '215px');
        $('#pbStream_div').css('top', '240px');
        $('.PBChannelList').css('top', '270px');
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $('#newRecordType').css('top', '225px');
            $('#searchBtn').css('top', '280px');
        }
    } else {
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if ((gDevice.loginRsp.ControlBitArray[0] >> 11) & 1) {
                $('#searchBtn').css('top', '300px');
            } else if (lgCls.version == gVar.CtArr[166]) {
                $('#searchBtn').css('top', '310px');
            } else {
                $('#searchBtn').css('top', '250px');
            }
        }
    }

    pictureSearchResize = function () {
        ShowImageList('Picture');
    };

    //create image
    function ShowImageList(matchMode) {
        var strHtml = "";
        var imgPerPage = (matchMode == 'Picture' ? 10 : 30);
        var imageWidth, imageHeight, imageHeadHeight, imageBottomHeight, imgMarginTop;

        var MatchMode = matchMode == undefined ? true : false;

        if (g_DetailCapDataArr.length == 0) {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_SEARCH_NOFILE"));
            $("#FDImageList").empty();
            loadingLayerHide();
            return;
        }

        if (g_CapImgNum > 0) {
            var tempPageNum = Math.ceil(g_CapImgNum / imgPerPage);
        } else {//unknown
            var tempPageNum = "...";
        }

        var tmpLen = (capCurentPageIndex * imgPerPage) >= g_DetailCapDataArr.length ? g_DetailCapDataArr.length : (capCurentPageIndex * imgPerPage);
        var startIndex = (capCurentPageIndex - 1) * imgPerPage;

        $("#FDImageList").empty();

        if (matchMode == 'Picture') {
            $("#FDImageList").css({
                "padding-bottom": "",
                "overflow": "",
                "min-width": "none",
                "max-width": "none",
                "max-height": "none"
            });
            imageWidth = $("#FDImageListDiv").css('width').split('px')[0] * 2 / imgPerPage - 10 + 'px';
            imageHeight = ($("#FDImageListDiv").css('height').split('px')[0] - 100) / 2 - 25 + 'px';
            imageHeadHeight = 25 + 'px';
            imageBottomHeight = 0 + 'px';
            imgMarginTop = 7 + 'px';
        } else {
            $("#FDImageList").css({
                "padding-bottom": 0,
                "overflow": "hidden",
                "min-width": "1000px",
                "max-width": "100%",
                "max-height": "600px"
            });
            imageWidth = '100%';
            imageHeight = '6.3rem';
            imageHeadHeight = '15px';
            imageBottomHeight = '15px';
            imgMarginTop = 2 + 'px';
        }

        var chNameStrHide="";
        if(gDevice.devType == devTypeEnum.DEV_IPC){
            chNameStrHide = "display:none;";
        }

        for (var i = startIndex, j = 0; i < (startIndex + tmpLen); i++, j++) {
            if (matchMode == 'Picture') {
                strHtml += '<div id="FDImageListDiv_' + (i + 1) + '" image-index="' + j + '" style="margin: 3px;display:inline-block;" class="FDImageDivNormal">';
            } else {
                strHtml += '<div id="FDImageListDiv_' + (i + 1) + '"  image-index="' + j + '" style="display:inline-block;" class="FDImageDivNormal pbImage">';
            }

            strHtml += '	<div id="FDImageListHead_' + (i + 1) + '" style="width: ' + imageWidth + ';height: ' + imageHeadHeight + ';background: rgb(30,59,86);">' +
                '		<div id="FDImageListHeadTime_' + (i + 1) + '" style="float: left;margin-top:' + imgMarginTop + ';margin-left:5px;font-size:10px;">' + formatDate((matchMode == 'Picture' ? g_DetailCapDataArr[j].Time : g_DetailCapDataArr[j].StartTime)) + '</div>' +
                '	</div>' +
                '	<div style="position: relative;">' +
                '		<img id="FDImageListImg_' + (i + 1) + '" src="data:image/jpeg;base64,' + (matchMode == 'Picture' ? g_DetailCapDataArr[j].Image : g_DetailCapDataArr[j].FaceImage) + '" style="width: ' + imageWidth + ';height: ' + imageHeight + ';"/>' +
                '       <div id="FDImageListChn_' + (i + 1) + '" data-chn="' + (matchMode == 'Picture' ? g_DetailCapDataArr[j].Channel : g_DetailCapDataArr[j].Chn) + '" style="'+chNameStrHide+'opacity: .7;position: absolute;left: 50%;top: 85%;transform: translate(-50%, -50%);max-width: 50%;">[ ' + gDevice.getChannelName((matchMode == 'Picture' ? g_DetailCapDataArr[j].Channel : g_DetailCapDataArr[j].Chn)) + ' ]</div>';

            if (matchMode == 'Picture') {
                strHtml += '       <div class="FDImageListDownload" image-index="' + j + '"></div>';
            }

            if (MatchMode) {
                searchMode = false;
                strHtml += '       <div style="position: absolute;left: 50%;top: 108%;transform: translate(-50%, -50%);max-width: 50%;font-size:.7rem;">' + fixedNumber(g_SimpleCapDataArr[i].Similarity, 3) + '%</div>';
            } else {
                searchMode = true;
            }

            strHtml += '	</div>' +
                '	<div id="FDImageListBottom_' + (i + 1) + '" style="width: ' + imageWidth + ';height: ' + imageBottomHeight + ';">' +
                '	</div>' +
                '</div>'
        }

        $("#FDImageList").append(strHtml);
        $("#FDImageListPage").show();
        $("#FDImageListPage #curPageText").val(capCurentPageIndex);
        $("#pageTotal").html(tempPageNum);

        var _id = "#FDImageListDiv_" + (((capCurentPageIndex - 1) * imgPerPage) + 1);
        $(_id).click();

        if (matchMode == 'Picture') {
            $('.FDImageListDownload').off('click').click(function () {
                var index = $(this).attr('image-index') * 1;
                var imgUrl = g_DetailCapDataArr[index].Image;
                var pngname = gDevice.getChannelName(g_DetailCapDataArr[index].Channel)
                    + '_' + (g_DetailCapDataArr[index].Time[0] + 2000)
                    + '_' + g_DetailCapDataArr[index].Time[1]
                    + '_' + g_DetailCapDataArr[index].Time[2]
                    + '_' + g_DetailCapDataArr[index].Time[3]
                    + '_' + g_DetailCapDataArr[index].Time[4]
                    + '_' + g_DetailCapDataArr[index].Time[5]
                    + '_' + (new Date()).getTime();
                var ret = gDevice.paramImEx(methodEnum.SubMsgGetParamFile);
                var pngpath = ret.Data;
                if (typeof pngpath != "undefined" && pngpath != "-1") {
                    gDevice.writeBase64ToImg("png", pngname, pngpath, imgUrl);
                }
            });

            previousFun = "PicFun";
        } else {
            previousFun = "FaceFun";
            //add menu
            $(".pbImage ").each(function () {
                $(this).off().showMenu(option);
            })
        }

        loadingLayerHide();
    }

    function ChangeTimeline(mode) {
        if (Object.keys(timelineObj).length >= 0) {
            timelineObj = null;
        }

        if (mode == 1) {
            var b24Hour = false;
            if (lgCls.version == gVar.CtArr[0]) {
                b24Hour = true;
            }
            $("#progressBar").css("height", "52.5px");
            $("#progress-bar").css("height", "52.5px");

            timelineObj = new timeline({
                divId: "progress-bar",
                chnNum: 1,
                //dataTypeNum: 9,
                dataTypeArr: [recTypeEnum.NormalRecord, recTypeEnum.PEARecord,
                    recTypeEnum.AVDRecord, recTypeEnum.OSCRecord,
                    recTypeEnum.PEAAreaRecord, recTypeEnum.OCCRecord,
                    recTypeEnum.AllIntelliRec, recTypeEnum.NetbreakRecord,
                    recTypeEnum.HDRecord, recTypeEnum.FDRecord, recTypeEnum.PCCRecord,
                    recTypeEnum.MotionRecord, recTypeEnum.IORecord,
                    recTypeEnum.AlarmRecord, recTypeEnum.PIRRecord,
                    recTypeEnum.MothionAndIo, recTypeEnum.ManualRecord,
                    recTypeEnum.AlarmAssemble, recTypeEnum.SoundRecord,
                    recTypeEnum.OcclusionRecord
                ],
                dataTypeColorArr: ["rgb(0,128,0)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(0,180,225)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(255,255,0)", "rgb(255,55,55)",
                    "rgb(255,0,0)", "rgb(158,51,255)",
                    "rgb(255,120,0)", "rgb(0,128,0)",
                    "rgb(255,120,0)", "rgb(130,200,250)",
                    "rgb(130,200,250)"
                ],
                optimizeData: true,
                fontColor: fontColor,
                clickCallback: callback,
                blankLeftWidth: 60,
                b24Hour: b24Hour
            });
        } else {
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                $("#progressBar").css("height", "53px");
                $("#progress-bar").css("height", "53px");
            } else {
                $("#progressBar").css("height", "120px");
                $("#progress-bar").css("height", "120px");
            }
            InitTimelineObj();
        }
    }

    function PlaybackManager() {
        this.isSyncPlay = false; //Whether the synchronous playback
        this.bPlaying = false;
        this.selWnd = -1; //The currently selected window
        this.playMode = playbackModeEnum.PLAY_MODE_STOP;
        this.views = []; //child window
        this.wndNum = g_pbNum; //The number of child Windows
        this.Interval = -1; //Playback timer
        var d = new Date();
        this.selDate = {
            Year: d.Year,
            Month: d.Month,
            Day: d.Day
        };
        this.recordType;
        this.recordData = [];
        this.zoom = false;
        this.bSound = false;
        this.bSoftFishEye = false;
        this.videoOration = 0; //0:Covered the window，1：original proportion
        this.searchNum = 0; //Search the selected channel number
        this.init = function () {
            for (var i = 0; i < this.wndNum; i++) {
                this.views[i] = new PlayBackViewClass(this, i);
            }
        }
        this.init();

        this.SearchByDay = function (chnArray) {
            if (this.isPlaying()) {
                ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
                $("#searchBtn").attr("name", "");
                $("#searchBtn").removeClass("searchBtnDisable").addClass("searchBtnNormal");
                return -1;
            }
            if (downloadOpen) {
                ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_DOWNLOADING"));
                $("#searchBtn").attr("name", "");
                $("#searchBtn").removeClass("searchBtnDisable").addClass("searchBtnNormal");
                return -1;
            }
            var chnArr = [];
            if (typeof chnArray != 'undefined') {
                chnArr = chnArray;
            }
            var count = 0;

            for (var i = 0; i < this.wndNum; i++) {
                this.views[i].channel = -1;
            }

            var strTime = $("#calday").val().split('-');
            this.selDate["Year"] = parseInt(strTime[0]);
            this.selDate["Month"] = parseInt(strTime[1]);
            this.selDate["Day"] = parseInt(strTime[2]);
            if (!isPlayByImg) {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    chnArr.push(0);
                    this.views[count].channel = 0;
                } else {
                    for (var i = 0; i < gDevice.loginRsp.ChannelNum && count < this.wndNum; ++i) {
                        if (checkedchn[i]) {
                            chnArr.push(i);
                            this.views[count++].channel = i;
                        }
                    }

                    if (chnArr.length == 0) {
                        ShowPaop($("#playbackBtn").text(), lg.get("IDS_SELECT_FIRST"));
                        $("#searchBtn").attr("name", "");
                        $("#searchBtn").removeClass("searchBtnDisable").addClass("searchBtnNormal");
                        return -1;
                    }
                }
            } else {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    this.selDate["Year"] = imgDate.Year;
                    this.selDate["Month"] = imgDate.Month;
                    this.selDate["Day"] = imgDate.Day;
                    this.views[count].channel = 0;
                }
            }

            this.setSelectWnd(0);

            if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[166]) {
                var pbbeginTime = $("#pbBeginTimeSet").timer.GetTimeFor24($("#pbBeginTimeSet")).split(":");
                var pbendTime = $("#pbEndTimeSet").timer.GetTimeFor24($("#pbEndTimeSet")).split(":");
                this.selDate["Hour"] = pbbeginTime[0] * 1;
                this.selDate["Minute"] = pbbeginTime[1] * 1;
                this.selDate["Second"] = 0;
                this.selDate["Hour1"] = pbendTime[0] * 1;
                this.selDate["Minute1"] = pbendTime[1] * 1;
                this.selDate["Second1"] = 59;
                if ((pbendTime[0] * 1 < pbbeginTime[0] * 1) || ((pbendTime[0] * 1 == pbbeginTime[0] * 1) && (pbendTime[1] * 1 <= pbbeginTime[1] * 1))) {
                    ShowPaop($("#playbackBtn").text(), $("#pbEndTime").text() + " > " + $("#pbBeginTime").text() + "!");
                    $("#searchBtn").attr("name", "");
                    $("#searchBtn").removeClass("searchBtnDisable").addClass("searchBtnNormal");
                    return -1;
                }
            } else {
                if(isPlayByImg){
                    var tempTime =imgTime.split(":");
                    this.selDate["Hour"] = tempTime[0]*1;
                    this.selDate["Minute"] = tempTime[1]*1;
                    this.selDate["Second"] = tempTime[2]*1;
                }else{
                    this.selDate["Hour"] = 0;
                    this.selDate["Minute"] = 0;
                    this.selDate["Second"] = 0;
                }
                this.selDate["Hour1"] = 23;
                this.selDate["Minute1"] = 59;
                this.selDate["Second1"] = 59;
            }

            var mode = 0;
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                this.recordType = searchTree.getValue();
                mode = 1;
            } else {
                this.recordType = $("#recordType").val() * 1;
            }

            this.searchNum = chnArr.length;
            if (g_pbIsSupportGt4WndPlay) {
                if (this.searchNum <= 4) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                } else if (this.searchNum > 4 && this.searchNum <= 9) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_9);
                } else if (this.searchNum > 9 && this.searchNum <= 16) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_16);
                } else {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                }
            }
            if (isPlayByImg) {
                gDevice.SearchByDay(chnArr, this.recordType, this.selDate, 0, mode);
            } else if ((gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR)) {
                gDevice.SearchByDay(chnArr, this.recordType, this.selDate, $("#pbStream").val() * 1);
            } else {
                gDevice.SearchByDay(chnArr, this.recordType, this.selDate, $("#pbStream").val() * 1, mode);
            }

            return 0;
        }

        this.hasRecordData = function () {
            return this.recordData.length;
        }

        this.firstRecordIndex = function () {
            for (var i = 0; i < this.wndNum; i++) {
                if (this.views[i].hasRecordData) {
                    return i;
                }
            }
            return 0;
        }

        this.setSelectWnd = function (wnd) {
            if (this.selWnd == wnd) return;

            this.selWnd = wnd;
            if (g_pbIsSupportGt4WndPlay && this.searchNum > 4) {
                var tempRecordData = [];
                $.extend(true, tempRecordData, getCurChRecData());
                timelineObj.hideMovePointer(0);
                timelineObj.initData(tempRecordData);
                timelineObj.setCurChn(0);
            } else {
                timelineObj.setCurChn(wnd);
            }

            $.each($(".chnCheck_box"), function () {
                $(this).attr("name", "");
            });
            var channel = this.findChannelByWnd(wnd);
            if (channel != -1) {
                $("#chnCheck_box_" + channel).attr("name", "active");
            }
            if ($("#playbackOcx").data("spliteMode") == SplitModeEnum.WINDOW_MODE_1) {
                gDevice.setPlaybackPageIndex(wnd);
            }
            gDevice.PlayBackSelectWnd(wnd);
            $("#PBchannelList").attr("selectIndex", wnd);
            updateBtnStatus();
            if (this.bSoftFishEye) {
                $(".pbrightContent .mode-soft .display-mode[name='active']").attr("name", "").click();
            }
        }

        this.setVideoOration = function (val) {
            if (val == this.videoOration) return;
            this.videoOration = val;
            gDevice.SetPlaybackVideoratio(val);
            updateBtnStatus();
        }

        this.findChannelByWnd = function (wnd) {
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.wndIndex == wnd) {
                    return pView.channel;
                }
            }
            return -1;
        }

        this.findWndByChannel = function (channel) {
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.channel == channel) {
                    return pView.wndIndex;
                }
            }
            return -1;
        }

        this.findViewByChannel = function (channel) {
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.channel == channel) {
                    return pView;
                }
            }
            return null;
        }

        this.findViewByWnd = function (wnd) {
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.wndIndex == wnd) {
                    return pView;
                }
            }
            return null;
        }

        this.setSync = function (bSync) {
            this.isSyncPlay = bSync;
            timelineObj.setSync(bSync);
            updateBtnStatus();
        }
        this.isPlaying = function () {
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.bPlay) {
                    return true;
                }
            }
            return false;
        }

        this.curWndPlaying = function () {
            if (this.selWnd == -1) return false;
            if (0 /*this.isSyncPlay*/) {
                return this.bSyncPlay;
            } else {
                return this.views[this.selWnd].bPlay;
            }
        }
        this.record = function () {
            if (gVar.bCapturePermissionLimit) {
                if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualRecord)) {
                    ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                    return;
                }
            }
            if (this.selWnd == -1) {
                return;
            }
            var pView = this.views[this.selWnd];
            if (!pView.bPlay) {
                return;
            }
            if (pView.bRecord) {
                stopRecord([pView.wndIndex]);
            } else {
                startRecord([pView.wndIndex]);
            }
            updateBtnStatus();
        }

        function startRecord(chnArr) {
            var ret = gDevice.PlaybackRec(1, chnArr);
            if (ret.Code == errCodeEnum.Code_Success) {
                for (i in ret.Data) {
                    if (ret.Data[i].Code == errCodeEnum.Code_Success) {
                        var wnd = ret.Data[i].Channel;
                        var pView = pbManager.findViewByWnd(wnd);
                        if (pView) {
                            pView.bRecord = true;
                        }
                    }
                }
            }
        }

        function stopRecord(chnArr) {
            var ret = gDevice.PlaybackRec(0, chnArr);
            if (ret.Code == errCodeEnum.Code_Success) {
                for (i in ret.Data) {
                    if (ret.Data[i].Code != errCodeEnum.Code_Success) {
                        continue;
                    }
                    var wnd = ret.Data[i].Channel;
                    var pView = pbManager.findViewByWnd(wnd);
                    if (pView) {
                        pView.bRecord = false;
                    }
                }
                var url;
                if (chnArr.length == 1) {
                    url = ret.Data[0].Url;
                } else {
                    url = ret.Path;
                }

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
                //var urlstr = url.split("\\").join("\\\\");
                var strFolder = "Folder";
                var strColor = "#32A0E1";
                if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
                    strFolder = "Ordner";
                }
                if (lgCls.version == gVar.CtArr[19]) {
                    strFolder = lg.get("IDS_FLODER");
                }
                if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                    strColor = "rgb(79,161,24);";
                }
                ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>" +
                    "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;" +
                    "</div>");
            }
            return true;
        }

        this.capture = function () {
            if (gVar.bCapturePermissionLimit) {
                if (!gDevice.hasUserSetRight(UserSetRightEnum.ManualCapture)) {
                    ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                    return;
                }
            }
            if (this.selWnd == -1) {
                return;
            }
            var pView = this.views[this.selWnd];
            if (!pView.bPlay) {
                return;
            }
            var ret = gDevice.PlaybackCap([this.selWnd]);
            if (ret.Code == errCodeEnum.Code_Success) {
                if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                    var url = ret.Data[0].Url;
                    var urlstr = url.split("\\").join("\\\\");
                    var path = ret.Path;
                    var pathstr = path.split("\\").join("\\\\");
                    var strFolder = "Folder";
                    var strColor = "#32A0E1";
                    var strPreview = "Preview";
                    if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
                        strFolder = "Ordner";
                    }
                    if (lgCls.version == gVar.CtArr[19]) {
                        strFolder = lg.get("IDS_FLODER");
                        strPreview = lg.get("IDS_PREVIEW");
                    }
                    if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                        strColor = "rgb(79,161,24);";
                    }

                    ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"), url + "<div style='text-align:center;margin:5px;'>" +
                        "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + pathstr + "\")'>" + strFolder + "</a>&nbsp;&nbsp;&nbsp;&nbsp;" +
                        "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapImage(\"" + urlstr + "\");'>" + strPreview + "</a>" +
                        "</div>");
                }
            }
        }
        this.hasRecord = function (index) {
            //return this.views[index].hasRecord();
        }
        this.startTimmer = function () {
            if (this.Interval != -1 || !this.isPlaying()) {
                return;
            }
            var timmer = this.getCurrentTime;
            this.Interval = window.setInterval(getCurrentTime, 1000);
        }
        this.stopTimmer = function () {
            if (this.isPlaying() || this.Interval == -1) {
                return;
            }
            window.clearInterval(this.Interval);
            this.Interval = -1;
        }

        function getCurrentTime() {
            if (0 /*pbManager.isSyncPlay*/) {
                if (pbManager.bSyncPlay) {
                    var ret = gDevice.getPlaybackTime(0);
                    if ((ret.Code != errCodeEnum.Code_Success) || (ret.Data.Code != errCodeEnum.Code_Success)) {
                        return;
                    }
                    timelineObj.showMovePointer(ret.Data.Data);
                }
            } else {
                if (g_pbIsSupportGt4WndPlay && pbManager.searchNum > 4) {
                    var pView = pbManager.views[pbManager.selWnd];
                    if (pView.bPlay) {
                        var ret = gDevice.getPlaybackTime(pView.wndIndex);
                        if ((ret.Code != errCodeEnum.Code_Success) || (ret.Data.Code != errCodeEnum.Code_Success)) {
                            return;
                        }
                        ret.Data.Data.chn = 0;
                        timelineObj.showMovePointer(ret.Data.Data);
                    }
                } else {
                    for (var i = 0; i < pbManager.views.length; i++) {
                        var pView = pbManager.views[i];
                        if (pView.bPlay) {
                            var ret = gDevice.getPlaybackTime(pView.wndIndex);
                            if ((ret.Code != errCodeEnum.Code_Success) || (ret.Data.Code != errCodeEnum.Code_Success)) {
                                return;
                            }
                            timelineObj.showMovePointer(ret.Data.Data);
                        }
                    }
                }
            }
        }

        this.setZoom = function () {
            this.zoom = !this.zoom;
            gDevice.PlaybackZoom();
            updateBtnStatus();
        }

        this.setSound = function () {
            this.bSound = !this.bSound;
            gDevice.PlaybackSound(this.bSound);
            updateBtnStatus();
        }

        this.setSoundValue = function () {

        }

        this.play = function () {
            if (this.isSyncPlay) { //synchronous playback
                if (!this.hasRecordData()) {
                    return;
                }
                if (this.playMode == playbackModeEnum.PLAY_MODE_STOP) {
                    this.playAll();
                } else if (this.playMode != playbackModeEnum.PLAY_MODE_NORMAL) {
                    //tt 2018.02.02 added
                    var chnArr = [];
                    for (var i = 0; i < this.views.length; i++) {
                        var pView = this.views[i];
                        if (pView.bPlay) {
                            chnArr.push(pView.wndIndex);
                        }
                    }
                    //tt
                    this.playMode = playbackModeEnum.PLAY_MODE_NORMAL;
                    gDevice.SetPlaybackMode(chnArr, [playbackModeEnum.PLAY_MODE_NORMAL]);//[0]
                    updateBtnStatus();
                } else { //pause
                    this.playMode = playbackModeEnum.PLAY_MODE_PAUSE;
                    gDevice.SetPlaybackMode([0], [playbackModeEnum.PLAY_MODE_PAUSE]);
                    updateBtnStatus();
                }
            } else {
                this.views[this.selWnd].play();
            }

            if (this.bSound) {
                gDevice.PlaybackSound(this.bSound);
            }

            this.startTimmer();
            updateBtnStatus();
        }
        this.stop = function (ch) {
            if (typeof ch != "undefined") { //Stop the specified channel
                var wnd = pbManager.findWndByChannel(ch);
                this.views[wnd].stop();
            } else {
                if (this.isSyncPlay) {
                    return this.stopAll();
                } else {
                    if (this.selWnd != -1) {
                        this.views[this.selWnd].stop();
                    }
                }
            }

            this.stopTimmer();
            updateBtnStatus();
        }
        this.playAll = function () {
            if (this.isSyncPlay) {
                if (this.bSyncPlay) {
                    return;
                }
                //this.isSyncPlay = true;
            }
            var chnArr = [];
            var modeArr = [];
            var noRightCh = [];
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.channel != -1 && pView.hasRecordData && !pView.bPlay) {
                    if (gDevice.hasPlaybackRight(pView.channel) == false) {
                        noRightCh.push(gVar.chName(pView.channel));
                        continue;
                    }

                    chnArr.push(pView.wndIndex);
                    pView.playMode = playbackModeEnum.PLAY_MODE_NORMAL;
                    modeArr.push(pView.playMode);
                    pView.bPlay = true;
                }
            }

            if (noRightCh.length) {
                ShowPaop(lg.get("IDS_WARNING"), noRightCh + lg.get("IDS_NO_PLAYBACK"));
            }

            if (isPlayByImg) {
                this.views[this.selWnd].play();
            } else {
                gDevice.PlaybackPlay(chnArr, this.selDate, this.recordType, this.isSyncPlay);
                gDevice.SetPlaybackMode(chnArr, modeArr);
            }

            if (this.isSyncPlay) {
                this.playMode = playbackModeEnum.PLAY_MODE_NORMAL;
                this.bSyncPlay = true;
            }
            this.startTimmer();
            updateBtnStatus();
        }
        this.stopAll = function () {
            if (!this.isPlaying()) {
                return;
            }
            var recArr = [];
            var chnArr = [];
            for (var i = 0; i < this.views.length; i++) {
                var pView = this.views[i];
                if (pView.bRecord) {
                    recArr.push(pView.wndIndex);
                }
                if (pView.bPlay) {
                    chnArr.push(pView.wndIndex);
                }
                pView.bPlay = false;
                pView.playMode = playbackModeEnum.PLAY_MODE_STOP;
                timelineObj.hideMovePointer(pView.wndIndex);
            }
            this.bSyncPlay = false;
            this.playMode = playbackModeEnum.PLAY_MODE_STOP;
            if (recArr.length != 0) {
                stopRecord(recArr);
            }
            this.stopTimmer();
            if (chnArr.length != 0) {
                gDevice.PlaybackStop(chnArr);
            }

            updateBtnStatus();
        }
        this.getPlayMode = function () {
            if (this.isSyncPlay) {
                return this.playMode;
            } else {
                var pView = this.views[this.selWnd];
                if (pView) {
                    return pView.playMode;
                } else {
                    return playbackModeEnum.PLAY_MODE_STOP;
                }
            }
        }
        this.setPlayMode = function (mode) {
            //Cut close to other mode sound, cut back to the normal mode, according to the state open voice sound
            if (this.views[this.selWnd].playMode == playbackModeEnum.PLAY_MODE_NORMAL && mode != playbackModeEnum.PLAY_MODE_NORMAL) {
                if (this.bSound) {
                    gDevice.PlaybackSound(!this.bSound);
                }
            } else if (this.views[this.selWnd].playMode != playbackModeEnum.PLAY_MODE_NORMAL && mode == playbackModeEnum.PLAY_MODE_NORMAL) {
                if (this.bSound) {
                    gDevice.PlaybackSound(this.bSound);
                }
            }
            if (this.isSyncPlay) {
                this.playMode = mode;
                var chnArr = [];
                var modeArr = [];
                for (var i = 0; i < this.views.length; i++) {
                    var pView = this.views[i];
                    if (pView.bPlay) {
                        chnArr.push(pView.wndIndex);
                        modeArr.push(mode);
                        pView.playMode = mode;
                    }
                }
                gDevice.SetPlaybackMode(chnArr, modeArr);
            } else {
                var pView = this.views[this.selWnd];
                if (pView) {
                    if (!pView.bPlay) {
                        return;
                    }
                    pView.playMode = mode;
                    gDevice.SetPlaybackMode([pView.wndIndex], [mode]);
                }
            }
            updateBtnStatus();
        }
        this.openSound = function () {

        }

        function PlayBackViewClass(pParent, wndIndex) {
            this.parentPtr = pParent;
            this.bPlay = false;
            this.bRecord = false;
            this.bSyncPlay = false;
            this.channel = -1;
            this.playMode = playbackModeEnum.PLAY_MODE_STOP;
            this.wndIndex = wndIndex;
            this.hasRecordData = false;
            this.bPlaying = false;
            this.play = function () {
                if (!this.hasRecordData) {
                    return;
                }
                if (gDevice.hasPlaybackRight(this.channel) == false) {
                    var chPstr = '';
                    if (gDevice.devType != devTypeEnum.DEV_IPC) {
                        chPstr = gVar.chName(this.channel);
                    }
                    ShowPaop(lg.get("IDS_WARNING"), chPstr + lg.get("IDS_NO_PLAYBACK"));
                    return;
                }
                if (this.playMode == playbackModeEnum.PLAY_MODE_STOP) {
                    var mode = 0;
                    if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        mode = 1;
                    }

                    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                        var mount = $(".pbrightContent .install-mode[name='active']").data("mode") * 1;
                        var softMode = $("#pb_mode-soft_" + mount + " .display-mode[name='active']").data("mode") * 1;
                        gDevice.PlaybackPlay([this.wndIndex], this.parentPtr.selDate, this.parentPtr.recordType, this.parentPtr.isSyncPlay, mode, playType.fishEyeSoftPlay);
                        gDevice.SetPlaybackFishEyeSoftMode(this.wndIndex, softMode);
                        //						gDevice.pbSetFishEyeSoftMode(this.wndIndex,softMode);
                    } else if (gDevice.devType != devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.fishEyeflag && pbManager.bSoftFishEye) {
                        var mount = $(".pbrightContent .install-mode[name='active']").data("mode") * 1;
                        var softMode = $("#pb_mode-soft_" + mount + " .display-mode[name='active']").data("mode") * 1;
                        gDevice.PlaybackPlay([this.wndIndex], this.parentPtr.selDate, this.parentPtr.recordType, this.parentPtr.isSyncPlay, mode, playType.fishEyeSoftPlay);
                        gDevice.SetPlaybackFishEyeSoftMode(this.wndIndex, softMode);
                    } else {
                        gDevice.PlaybackPlay([this.wndIndex], this.parentPtr.selDate, this.parentPtr.recordType, this.parentPtr.isSyncPlay, mode);
                        //gDevice.SetPlaybackFishEyeSoftMode(this.wndIndex,mode);
                    }

                    this.playMode = playbackModeEnum.PLAY_MODE_NORMAL;
                    this.bPlay = true;
                    this.bPlaying = true;
                } else if (this.playMode != playbackModeEnum.PLAY_MODE_NORMAL) {
                    this.playMode = playbackModeEnum.PLAY_MODE_NORMAL;
                } else { //
                    this.playMode = playbackModeEnum.PLAY_MODE_PAUSE;
                    this.bPlaying = false;
                }
                gDevice.SetPlaybackMode([this.wndIndex], [this.playMode]);
                updateBtnStatus();
            }

            this.stop = function () {
                if (!this.bPlay) {
                    return;
                }
                if (this.bRecord) {
                    stopRecord([this.wndIndex]);
                }
                gDevice.PlaybackStop([this.wndIndex]);
                this.bPlay = false;
                this.bPlaying = false;
                this.playMode = playbackModeEnum.PLAY_MODE_STOP;
                timelineObj.hideMovePointer(this.wndIndex);
                updateBtnStatus();
            }
            this.setPlayMode = function (mode) {
                /*if(this.playMode == mode || !this.bPlay) {
					return;
				}
				this.playMode = mode;
				gDevice.setPlayMode([this.channel],mode);*/
            }
        }

    }

    pbSetTipText();

    if (gDevice.devType == devTypeEnum.DEV_IPC || g_pbRowNum == 1) {
        $("#progressBar").css("height", "52.5px");
        $("#progress-bar").css("height", "52.5px");
        $("#pbControlBtn_Box").css("bottom", "67.5px");
        $("#playbackOcx").css("bottom", "102.5px");
        if (!$.browser.msie) {
            SetResize("playback");
        }
    }

    $("#PBchannelList").data("count", 0); //Select the channel count
    for (var i = 0; i < chnNum; ++i) {
        checkedchn[i] = false;
    }
    for (var i = 0; i < 4; ++i) {
        $("#playSpeed").data("speed_" + i, 4); //Initial is normal
    }
    $("#playSpeed").data("speed_sync", 4); //Synchronous playback initial velocity

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        $("#synAll_box").css("display", "none");
    } else if (gDevice.devType == devTypeEnum.DEV_NVR ||
        gDevice.devType == devTypeEnum.DEV_DVR ||
        (gDevice.devType == devTypeEnum.DEV_HDVR && (analogNum == chnNum)) ||
        (gDevice.devType == devTypeEnum.DEV_HDVR && (analogNum == 0))) {
        for (var i = 0; i < Math.abs(chnNum / 2); i++) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_" + i + "'>";
            playHtml += "<div class='checkBtn' id='pbCheck_" + i + "'></div>";
            playHtml += "<div class='pbChnNum'>" + gDevice.getChannelName(i) + "</div></div>";
        }
        $("#chnList1").append(playHtml);
        playHtml = "";
        for (var i = Math.abs(chnNum / 2); i < chnNum; i++) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_" + i + "'>";
            playHtml += "<div class='checkBtn' id='pbCheck_" + i + "'></div>"
            playHtml += "<div class='pbChnNum'>" + gDevice.getChannelName(i) + "</div></div>";
        }
        $("#chnList2").append(playHtml);
    } else if ((gDevice.devType == devTypeEnum.DEV_HDVR) && (analogNum != chnNum)) { //
        for (var i = 0; i < analogNum; i++) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_" + i + "'>";
            playHtml += "<div class='checkBtn' id='pbCheck_" + i + "'></div>";
            playHtml += "<div class='pbChnNum'>" + gDevice.getChannelName(i) + "</div></div>";
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[70]) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_allMN'>";
            playHtml += "<div class='checkBtn' id='pbCheck_all'></div>";
            playHtml += "<div class='pbChnNum'>" + lg.get("IDS_RECTYPE_03") + "</div></div>";
        }

        $("#chnList1").append(playHtml);
        playHtml = "";
        for (var i = analogNum; i < chnNum; i++) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_" + i + "'>";
            playHtml += "<div class='checkBtn' id='pbCheck_" + i + "'></div>"
            playHtml += "<div class='pbChnNum'>" + gDevice.getChannelName(i) + "</div></div>";
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[70]) {
            playHtml += "<div class='chnCheck_box' id='chnCheck_box_allIP'>";
            playHtml += "<div class='checkBtn' id='pbCheck_allIP'></div>";
            playHtml += "<div class='pbChnNum'>" + lg.get("IDS_RECTYPE_03") + "&nbspIP</div></div>";
        }

        $("#chnList2").append(playHtml);
    }

    if (lgCls.version == gVar.CtArr[0]) {
        $('.chnCheck_box').each(function (index) {
            if (!gDevice.hasPlaybackRight(index)) { // without playback permission
                $(this).find('.checkBtn').prop('disabled', true).end().css('cursor', 'not-allowed');
            }
        })
    }

    $("#searchBtn").addClass("searchBtnNormal");
    $("#searchBtn").click(function () {
        if (gDevice.devType == devTypeEnum.DEV_IPC) { //The IPC search access judgment
            var channel = 0;
            if (gDevice.hasPlaybackRight(channel) == false) {
                ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_RIGHT1"));
                return false;
            }
            if ($("#pbFunctionType").val() == 2) {
                if (isPlayByImg) {
                    ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
                    return;
                }

                var recType = searchTree.getValue();
                capCurentPageIndex = 1;
                var obj = getImgData();
                loadingLayerShow();

                gDevice.AIGroupConfig({
                    msgType: "PIC_getPicture",
                    StartTime: obj.StartTime,
                    EndTime: obj.EndTime,
                    Chn: obj.Chn,
                    TypeBits: recType,
                    PicStartIndex: 0,
                    PicEndIndex: 10,
                });
            } else {
                if ($(this).attr("name") != "active") {
                    $(this).removeClass("searchBtnNormal").addClass("searchBtnDisable");
                    $(this).attr("name", "active");
                    if (pbManager.SearchByDay() == 0) {
                        timelineObj.initData();
                    }
                }
            }
        } else { //not IPC Search permission to judge
            if (lgCls.version == gVar.CtArr[142]) {
                if (0 == $("#pbStream").val() * 1) {//main stream,only check 4
                    var count = $("#PBchannelList").data("count");
                    var canCkNum = 4;
                    if (count > canCkNum) {
                        var tips = lg.get("IDS_MOST_SELECT");
                        if (g_pbIsSupportGt4WndPlay) {
                            tips = "Check up to " + canCkNum + " channels!";
                        }
                        ShowPaop($("#playbackBtn").text(), tips);
                        return;
                    }
                }
            }

            var channelNum = gDevice.loginRsp.ChannelNum;
            var noRightCh = [];
            for (var i = 0; i < channelNum; ++i) {
                if (checkedchn[i] == true) { //Selected passages determine whether have permission
                    if (gDevice.hasPlaybackRight(i) == false) { //Have a no permissions not search
                        noRightCh.push(gVar.chName(i));
                    }
                }
            }
            if (noRightCh.length == 0) { //Length of 0 have permissions can search the selected channel
                if ($(this).attr("name") != "active") {
                    $(this).removeClass("searchBtnNormal").addClass("searchBtnDisable");
                    $(this).attr("name", "active");
                    if (pbManager.SearchByDay() == 0) {
                        timelineObj.initData();
                    }
                }
            } else {
                ShowPaop(lg.get("IDS_WARNING"), noRightCh + lg.get("IDS_PLAYBACK_RIGHT1"));
            }
        }
    }).mouseover(function () {
        $(this).removeClass("searchBtnNormal").addClass("searchBtnOver");
    }).mouseout(function () {
        $(this).removeClass("searchBtnOver").addClass("searchBtnNormal");
    });

    $("#chnCheck_box_allMN").on('click', function () {
        var count = $("#PBchannelList").data("count");
        if (!pbManager.isPlaying()) {
            if ($(this).attr("name") == "active") {//to uncheck
                $(this).attr("name", "");
                $("#pbCheck_all").removeClass('checkBtnActive');
                for (var i = 0; i < analogNum; i++) {
                    var checkBtn = $("#pbCheck_" + i);
                    if (checkBtn.attr("name") == "active") {
                        checkBtn.removeClass('checkBtnActive').attr("name", "");
                        checkedchn[i] = false;
                        count--;
                    }
                }
            } else {//to check
                $(this).attr("name", "active");
                $("#pbCheck_all").addClass('checkBtnActive');
                if (count >= g_pbCkNum) {
                    $(this).attr("name", "");
                    $("#pbCheck_all").removeClass('checkBtnActive');
                }
                for (var i = 0; i < analogNum; i++) {
                    if (count >= g_pbCkNum) {
                        var tips = lg.get("IDS_MOST_SELECT");
                        if (g_pbIsSupportGt4WndPlay) {
                            tips = "Check up to " + g_pbCkNum + " channels!";
                        }
                        $("#PBchannelList").data("count", count);
                        ShowPaop($("#playbackBtn").text(), tips);
                        return;
                    }

                    var checkBtn = $("#pbCheck_" + i);
                    if (checkBtn.attr("name") != "active") {
                        checkBtn.addClass('checkBtnActive').attr("name", "active");
                        checkedchn[i] = true;
                        count++;
                    }
                }
            }
        } else {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
        }

        $("#PBchannelList").data("count", count);
    });

    $("#chnCheck_box_allIP").on('click', function () {
        var count = $("#PBchannelList").data("count");
        if (!pbManager.isPlaying()) {
            if ($(this).attr("name") == "active") {//to uncheck
                $(this).attr("name", "");
                $("#pbCheck_allIP").removeClass('checkBtnActive');
                for (var i = analogNum; i < chnNum; i++) {
                    var checkBtn = $("#pbCheck_" + i);
                    if (checkBtn.attr("name") == "active") {
                        checkBtn.removeClass('checkBtnActive').attr("name", "");
                        checkedchn[i] = false;
                        count--;
                    }
                }
            } else {//to check
                $(this).attr("name", "active");
                $("#pbCheck_allIP").addClass('checkBtnActive');
                if (count >= g_pbCkNum) {
                    $(this).attr("name", "");
                    $("#pbCheck_allIP").removeClass('checkBtnActive');
                }
                for (var i = analogNum; i < chnNum; i++) {
                    if (count >= g_pbCkNum) {
                        var tips = lg.get("IDS_MOST_SELECT");
                        if (g_pbIsSupportGt4WndPlay) {
                            tips = "Check up to " + g_pbCkNum + " channels!";
                        }
                        $("#PBchannelList").data("count", count);
                        ShowPaop($("#playbackBtn").text(), tips);
                        return;
                    }
                    var checkBtn = $("#pbCheck_" + i);
                    if (checkBtn.attr("name") != "active") {
                        checkBtn.addClass('checkBtnActive').attr("name", "active");
                        checkedchn[i] = true;
                        count++;
                    }
                }
            }
        } else {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
        }

        $("#PBchannelList").data("count", count);
    });

    $(".chnCheck_box").on('click', function () {
        if (pbManager.bSoftFishEye) {
            ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_FISHEYE_LIMIT"));
            return;
        }
        var checkBtn = $(this).find('.checkBtn');
        var chn = checkBtn.attr("id").split('_')[1];
        var count = $("#PBchannelList").data("count");

        if (!gDevice.hasPlaybackRight(chn)) {
            return;
        }
        if (!pbManager.isPlaying()) { //Play not search channel is selected
            if (checkBtn.attr("name") != "active") {
                var canCkNum = g_pbCkNum;
                if (lgCls.version == gVar.CtArr[142]) {
                    if (0 == $("#pbStream").val() * 1) {//main stream,only check 4
                        canCkNum = 4;
                    }
                }
                if (count >= canCkNum) {
                    var tips = lg.get("IDS_MOST_SELECT");
                    if (g_pbIsSupportGt4WndPlay) {
                        tips = "Check up to " + canCkNum + " channels!";
                    }
                    ShowPaop($("#playbackBtn").text(), tips);
                    return;
                }
                checkBtn.addClass('checkBtnActive').attr("name", "active");
                checkedchn[chn] = true;
                ++count;
            } else {
                checkBtn.removeClass('checkBtnActive').attr("name", "");
                checkedchn[chn] = false;
                --count;
            }
        } else {
            if (!checkedchn[chn]) {
                ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
            }
        }
        $("#PBchannelList").data("count", count);

        var wnd = pbManager.findWndByChannel(chn);
        if (wnd == -1) return;
        pbManager.setSelectWnd(wnd);
    });

    $("#synAll_box").on('click', function () {
        if (pbManager.isPlaying()) {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
            return;
        }
        var bSync = !pbManager.isSyncPlay;
        if (bSync) {
            $(this).find('.allCheck').addClass('allCheckActive');
            $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Disabled);
        } else {
            $(this).find('.allCheck').removeClass('allCheckActive');
            $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Normal);
        }
        pbManager.setSync(bSync);
    });

    $("#pbStream").change(function () {
        if (pbManager.isPlaying()) {
            $("#pbStream").val(1 - $("#pbStream").val());
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_PLAYBACK"));
            return;
        }
        CalSearchByMon();
    });

    //$(".chnCheck_box").on('click', function() {
    //	var channel = $(this).attr("id").split('_')[2];
    //	var wnd = pbManager.findWndByChannel(channel);
    //	if (wnd == -1) return;
    //	pbManager.setSelectWnd(wnd);
    //});

    function getSpeedEnum(uid) {
        if (uid == 1)
            return playbackModeEnum.PLAY_MODE_SLOW8;
        else if (uid == 2)
            return playbackModeEnum.PLAY_MODE_SLOW4;
        else if (uid == 3)
            return playbackModeEnum.PLAY_MODE_SLOW;
        else if (uid == 4)
            return playbackModeEnum.PLAY_MODE_NORMAL;
        else if (uid == 5)
            return playbackModeEnum.PLAY_MODE_FAST_FORWARD2;
        else if (uid == 6)
            return playbackModeEnum.PLAY_MODE_FAST_FORWARD4;
        else if (uid == 7)
            return playbackModeEnum.PLAY_MODE_FAST_FORWARD8;
        else if (uid == 8)
            return playbackModeEnum.PLAY_MODE_FAST_FORWARD16;//19
    }

    function getSpeedValueByPlayMode(mode) {
        if (mode == playbackModeEnum.PLAY_MODE_SLOW8)
            return 1;
        else if (mode == playbackModeEnum.PLAY_MODE_SLOW4)
            return 2;
        else if (mode == playbackModeEnum.PLAY_MODE_SLOW)
            return 3;
        else if (mode == playbackModeEnum.PLAY_MODE_NORMAL)
            return 4;
        else if (mode == playbackModeEnum.PLAY_MODE_FAST_FORWARD2)
            return 5;
        else if (mode == playbackModeEnum.PLAY_MODE_FAST_FORWARD4)
            return 6;
        else if (mode == playbackModeEnum.PLAY_MODE_FAST_FORWARD8)
            return 7;
        else if (mode == playbackModeEnum.PLAY_MODE_FAST_FORWARD16)
            return 8;
        else
            return 4;
    }

    function getPosYByPlayMode(mode) {
        var speed = getSpeedValueByPlayMode(mode);
        var w = $('#pb_speed').height()*1;
        return (speed - 1) * w;
    }

    $(".pbControlBtn").each(function () {
        var posy = $(this).attr("data-posy").split("px")[0];
        var id = $(this).attr("id");
        if (id == "pb_Sound") {
            posy = $(this).attr("data-silence-posy").split("px")[0];
        }
        var status = RSBtnStatus.Disabled;
        if (id == "pb_Zoom" || id == "pb_originalSize" || id == "pb_adaptiveSize" || id == "pb_fullScreen" || id == "pb_exit") {
            status = RSBtnStatus.Normal;
        }
        if (id == "pb_adaptiveSize") status = RSBtnStatus.Pressed;

        $(this).RSButton({
            "width": 32,
            "height": 32,
            "posY": posy,
            "status": status,
            "mouseup": function (target) {
                var curId = $(target).attr("id");
                var chnArr = [];
                var count = $("#PBchannelList").data("count");
                if (curId == 'pb_fullScreen') {
                    gDevice.setPlaybackFullScreen(true);
                    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
                        gDevice.PlaybackDbclkFullscreen(false);
                    }
                }
            },
            "click": function (target) {
                var curId = $(target).attr("id");
                var chnArr = [];
                var count = $("#PBchannelList").data("count");
                switch (curId) {
                    case "pb_Play":
                        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[70]) {
                            if ($(".allCheck").hasClass("allCheckActive") && count > 4) {
                                if (((gDevice.loginRsp.PageControl >> 11) & 0x01) == 1) {//playback dual stream
                                    ShowPaop($("#playbackBtn").text(), lg.get("IDS_PLAYBACK_RES"));
                                }
                            }
                        }
                        pbManager.play();

                        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[139]) {
                            if (!$("#pbSoundLine").attr("init")) {
                                $("#pbSoundLine").contents().find("#smallImg").click();
                                $("#pbSoundLine").attr("init", true);
                            }
                        }
                        break;
                    case "pb_Stop":
                        if (pbManager.bSoftFishEye) {
                            exitPbFisheyeSoft();
                        }
                        pbManager.stop();
                        break;
                    case "pb_SingleFrame":
                        pbManager.setPlayMode(playbackModeEnum.PLAY_MODE_SINGLE_FRAME);
                        break;
                    case "pb_PlayAll":
                        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[70]) {
                            if (count > 4) {
                                if (((gDevice.loginRsp.PageControl >> 11) & 0x01) == 1) {//playback dual stream
                                    ShowPaop($("#playbackBtn").text(), lg.get("IDS_PLAYBACK_RES"));
                                }
                            }
                        }
                        pbManager.playAll();
                        break;
                    case "pb_StopAll":
                        pbManager.stopAll();
                        break;
                    case "pb_Cut":
                        pbManager.record();
                        break;
                    case "pb_Cap":
                        pbManager.capture();
                        break;
                    case "pb_Zoom":
                        pbManager.setZoom();
                        break;
                    case "pb_Sound":
                        var pbSoundLine = $('#pbSoundLine');
                        var _pbSound = $('#pb_Sound');
                        var left = _pbSound.offset().left;
                        var top = _pbSound.offset().top + _pbSound.scrollTop() + 36;
                        if (pbSoundLine.attr("data-name") != "active") {
                            if ($('#playbackSpeed').attr("data-name") == "active") {
                                $('#playbackSpeed').attr("data-name", "").css("display", "none")
                            }
                            pbSoundLine.css({
                                "left": left,
                                "top": top,
                                "display": "block"
                            }).attr("data-name", "active");
                        } else {
                            pbSoundLine.attr("data-name", "").css("display", "none");
                        }
                        //pbManager.setSound();
                        break;
                    case "pb_fisheye":
                        if (!pbManager.bSoftFishEye) {
                            enterPbFisheyeSoft();
                        } else {
                            exitPbFisheyeSoft();
                        }
                        break;
                    case "pb_originalSize":
                        if(lgCls.skin == "white_c238"){
                            $("#pb_originalSize").css("display","none");
                            $("#pb_adaptiveSize").css("display","block");
                        }
                        pbManager.setVideoOration(1);
                        break;
                    case "pb_adaptiveSize":
                        if(lgCls.skin == "white_c238"){
                            $("#pb_adaptiveSize").css("display","none");
                            $("#pb_originalSize").css("display","block");
                        }
                        pbManager.setVideoOration(0);
                        break;
                    case "pb_fullScreen":
//						gDevice.setPlaybackFullScreen(true);
//						if(gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
//							gDevice.PlaybackDbclkFullscreen(false);
//						}
                        break;
                    case "pb_Download": {
                        if (downloadOpen) {
                            g_downloadWin.focus();
                            return;
                        }

                        var channel = pbManager.findChannelByWnd(pbManager.selWnd);
                        if (gDevice.hasBackupRight(channel) == false) {
                            var chStr = '';
                            if (gDevice.devType != devTypeEnum.DEV_IPC) {
                                chStr = gVar.chName(channel);
                            }
                            ShowPaop(lg.get("IDS_WARNING"), chStr + lg.get("IDS_NO_DOWNLOAD"));
                            return;
                        }

                        var j = 0;
                        for (var i = 0; i < pbManager.recordData.length; i++) {
                            if (pbManager.recordData[i].chn == pbManager.selWnd) {
                                j++;
                            }
                        }
                        if (j > 0) {
                            var sWidth = window.screen.width;
                            var sHeight = window.screen.height;
                            var top = (sHeight - 500) / 2;
                            var left = (sWidth - 700) / 2;
                            var winname = "Download" + (new Date()).getTime(); //window.open Will refresh the window of the same name, avoid problems open the browser
                            g_downloadWin = window.open("html/download.html?version=" + version_web, winname, "width=710,height=500,top=" + top + ",left=" + left + "toolbar=no,menubar=no,scrollbars=no,resizable=yes,location=no,status=no");
                            g_downloadWin.name = "channel 01";
                            downloadOpen = true;
                        }
                    }
                        break;
                    case "pb_exit": {
                        ExitFDPlayback();
                    }
                        break;
                    default:
                        break;
                }

            }
        });
    });
    if (gDevice.devType != devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.fishEyeflag) {
        $("#pb_fisheye").css("display", "block");
        $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Normal);
    }

    function ExitPlayback() {
        if (downloadOpen) {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_DOWNLOADING"));
            $("#pbFunctionType").val($("#pbFunctionType").data("preMode"));
            return -1;
        }
        if (pbManager.bSoftFishEye) {
            exitPbFisheyeSoft();
        }
        pbManager.stopAll();
        if (pbManager.isSyncPlay) {
            $("#synAll_box").click();
        }
        for (var i = 0; i < pbManager.views.length; ++i) {
            pbManager.views[i].hasRecordData = false;
        }
        pbManager.recordData = [];
        updateBtnStatus();
    }

    function ExitFDPlayback() {
        if (downloadOpen) {
            ShowPaop($("#playbackBtn").text(), lg.get("IDS_STOP_DOWNLOADING"));
            $("#pbFunctionType").val($("#pbFunctionType").data("preMode"));
            return -1;
        }
        if (pbManager.bSoftFishEye) {
            exitPbFisheyeSoft();
        }
        pbManager.stop();
        $(".playbackContent, #pb_exit").css("display", "none");
        $("#pbSoundLine").attr("data-name", "").css('display', 'none');
        $("#FDContent,.leftContent").css("display", "block");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            $("#progressBar").css("height", "53px");
            $("#progress-bar").css("height", "53px");
            $("#pbControlBtn_Box").css("bottom", "67.5px");
            $("#playbackOcx").css("bottom", "102.5px");
        } else {
            $("#progressBar").css("height", "120px");
            $("#progress-bar").css("height", "120px");
            $("#pbControlBtn_Box").css("bottom", "135px");
            $("#playbackOcx").css("bottom", "170px");
            $("#pb_PlayAll,#pb_StopAll").css("display", "block");
        }

        $(".playbackContent").css("left", "230px");

        if ($.browser.msie) {
            $("#FDTempOcx").append($("#ipcocx").detach());
            $("#ipcocx").css({width: "1px", height: "1px"});
        } else {
            SetResize('FDSearch');
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            playbackChangeMode(SplitModeEnum.WINDOW_MODE_1);
        } else {
            playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
        }

        var pView = pbManager.findViewByWnd(pbManager.selWnd);
        pView.hasRecordData = false;
        pView = null;
        pbManager.recordData = [];

        updateBtnStatus();
        isPlayByImg = false;

        pictureSearchResize();
        //gDevice.setPlaybackPageIndex(pbManager.selWnd);
    }

    function updateBtnStatus() {
        $(".pbControlBtn").each(function () {
            var id = $(this).attr("id");
            switch (id) {
                case "pb_Play":
                    var pView = pbManager.findViewByWnd(pbManager.selWnd);
                    var playPosY = $(this).attr("data-posy").split("px")[0];
                    var pausePosy = $(this).attr("data-pause-posy").split("px")[0];
                    var mode;
                    var bHasRecord = false;
                    if (pbManager.isSyncPlay) {
                        mode = pbManager.playMode;
                        bHasRecord = pbManager.hasRecordData();
                    } else {
                        if (pView) {
                            mode = pView.playMode;
                            bHasRecord = pView.hasRecordData;
                        } else {
                            $(this).RSButton("setPosY", playPosY);
                            $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                            break;
                        }
                    }

                    if (mode == playbackModeEnum.PLAY_MODE_STOP) {
                        $(this).RSButton("setPosY", playPosY);
                        if (bHasRecord) {
                            $(this).RSButton("setStatus", RSBtnStatus.Normal);
                        } else {
                            $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                        }
                    } else if (mode == playbackModeEnum.PLAY_MODE_NORMAL) {
                        $(this).RSButton("setPosY", pausePosy);
                        $(this).RSButton("setStatus", RSBtnStatus.Normal);
                    } else {
                        $(this).RSButton("setPosY", playPosY);
                        $(this).RSButton("setStatus", RSBtnStatus.Normal);
                    }

                    break;
                case "pb_Stop":
                case "pb_SingleFrame": {
                    var status;
                    if (pbManager.isSyncPlay) {
                        if (id == "pb_Stop") {
                            if (pbManager.bSyncPlay) {
                                if (id == "pb_SingleFrame" && pbManager.playMode == playbackModeEnum.PLAY_MODE_SINGLE_FRAME) {
                                    status = RSBtnStatus.Pressed;
                                } else {
                                    status = RSBtnStatus.Normal;
                                }
                            } else {
                                status = RSBtnStatus.Disabled;
                            }
                        } else {
                            status = RSBtnStatus.Disabled;
                        }

                    } else {
                        if (pbManager.curWndPlaying()) {
                            var pView = pbManager.findViewByWnd(pbManager.selWnd);
                            if (id == "pb_SingleFrame" && pView && pView.playMode == playbackModeEnum.PLAY_MODE_SINGLE_FRAME) {
                                status = RSBtnStatus.Pressed;
                            } else {
                                status = RSBtnStatus.Normal;
                            }
                        } else {
                            status = RSBtnStatus.Disabled;
                        }
                    }
                    $(this).RSButton("setStatus", status);
                }
                    break;
                case "pb_Download":
                    var pView = pbManager.findViewByWnd(pbManager.selWnd);
                    if (pView && pView.hasRecordData) {
                        $(this).RSButton("setStatus", RSBtnStatus.Normal);
                    } else {
                        $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                    }
                    break;
                case "pb_PlayAll":
                    if (pbManager.isSyncPlay) {
                        $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                    } else {
                        var bShow = false;
                        for (var i = 0; i < pbManager.views.length; i++) {
                            var pView = pbManager.views[i];
                            if (pView.hasRecordData && !pView.bPlay) {
                                bShow = true;
                                break;
                            }
                        }
                        if (bShow) {
                            $(this).RSButton("setStatus", RSBtnStatus.Normal);
                        } else {
                            $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                        }
                    }
                    break;
                case "pb_StopAll":
                    if (pbManager.isSyncPlay) {
                        $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                    } else {
                        if (pbManager.isPlaying()) {
                            $(this).RSButton("setStatus", RSBtnStatus.Normal);
                        } else {
                            $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                        }
                    }
                    break;
                //case "pb_originalSize":
                //case "pb_adaptiveSize":
                //case "pb_Zoom":
                case "pb_Sound":
                    if (pbManager.isPlaying()) {
                        if (id == "pb_Zoom") {
                            if (pbManager.zoom) {
                                $(this).RSButton("setStatus", RSBtnStatus.Pressed);
                            } else {
                                $(this).RSButton("setStatus", RSBtnStatus.Normal);
                            }
                        } else if (id == "pb_Sound") {
                            if (!pbManager.bSound) {
                                $(this).RSButton("setPosY", $(this).data("silence-posy").split("px")[0]);
                            } else {
                                $(this).RSButton("setPosY", $(this).data("posy").split("px")[0]);
                            }
                            if (pbManager.isPlaying()) {
                                $(this).RSButton("setStatus", RSBtnStatus.Normal);
                            } else {
                                $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                            }
                        } else {
                            $(this).RSButton("setStatus", RSBtnStatus.Normal);
                        }
                    } else {
                        $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                    }
                    break;
                case "pb_Cut":
                case "pb_Cap": {
                    if (pbManager.curWndPlaying()) {
                        if (id == "pb_Cut") {
                            var pView = pbManager.findViewByWnd(pbManager.selWnd);
                            if (pView.bRecord) {
                                $(this).RSButton("setStatus", RSBtnStatus.Pressed);
                            } else {
                                $(this).RSButton("setStatus", RSBtnStatus.Normal);
                            }
                        } else {
                            $(this).RSButton("setStatus", RSBtnStatus.Normal);
                        }
                    } else {
                        $(this).RSButton("setStatus", RSBtnStatus.Disabled);
                    }
                }
                    break;
                case "pb_fullScreen":
                    $(this).RSButton("setStatus", RSBtnStatus.Normal);
                    break;
                default:
                    break;
            }
        })

        if (pbManager.zoom) {
            $("#pb_Zoom").RSButton("setStatus", RSBtnStatus.Pressed);
            $("#pb_adaptiveSize").RSButton("setStatus", RSBtnStatus.Disabled);
            $("#pb_originalSize").RSButton("setStatus", RSBtnStatus.Disabled);
        } else {
            $("#pb_Zoom").RSButton("setStatus", RSBtnStatus.Normal);
            if (pbManager.videoOration == 1) {
                $("#pb_adaptiveSize").RSButton("setStatus", RSBtnStatus.Normal);
                $("#pb_originalSize").RSButton("setStatus", RSBtnStatus.Pressed);
            } else if (pbManager.videoOration == 0) {
                $("#pb_adaptiveSize").RSButton("setStatus", RSBtnStatus.Pressed);
                $("#pb_originalSize").RSButton("setStatus", RSBtnStatus.Normal);
            }
        }

        var _pbSpeed = $('#pb_speed');

        var playMode = pbManager.getPlayMode();
        var posy = getPosYByPlayMode(playMode) + "px";
        var posx,imgS_W = $("#pb_speed").width()*1;
        if (pbManager.curWndPlaying()) {
            if (_pbSpeed.attr("name") == "active") {
                posx = "-"+(imgS_W*2)+"px";
            } else {
                posx = 0;
            }
        } else {
            posx = "-"+(imgS_W*3)+"px";
        }
        _pbSpeed.css("background-position", posx + " -" + posy).attr("posy", posy.split("px")[0]);

        if ($('#pb_speed').attr("name") == "active") {
            if (playMode == playbackModeEnum.PLAY_MODE_STOP) {
                $('#pb_speed').attr("name", "");
                $('#playbackSpeed').attr("name", "").css("display", "none");
            } else {
                document.getElementById('playbackSpeed').contentWindow.setSpeed(getSpeedValueByPlayMode(playMode));
            }
        }
    }

    DownloadOnUnload = _DownloadOnUnload;

    function _DownloadOnUnload() {
        downloadOpen = false;
        g_downloadWin = null;
    }

    DownloadOnload = _DownloadOnload;

    function _DownloadOnload() {
        var subRecordData = [];
        for (var i = 0; i < pbManager.recordData.length; i++) {
            if (pbManager.recordData[i].chn == pbManager.selWnd) {
                subRecordData.push(pbManager.recordData[i])
            }
        }
        g_downloadWin.ShowDownload("test", "test", gVar.sPage, JSON.stringify(subRecordData)); // IE parent window child window preach a Json object will parse don't
    }

    function dateToObj(date) {
        var dateObj = {};
        dateObj.year = date.getFullYear();
        dateObj.month = date.getMonth() + 1;
        dateObj.day = date.getDate();
        dateObj.hour = date.getHours();
        dateObj.minute = date.getMinutes();
        dateObj.second = date.getSeconds();
        return dateObj;

        //return (date.getMonth()+1) + " " + date.getDate()+ ","  + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    function playbackChangeMode(mode) {
        gDevice.setPlaybackShowMode(mode);
        $("#playbackOcx").data("spliteMode", mode);
    }

    function getCurChRecData() {
        var n = 0;
        var curChData = [];
        for (var i = 0; i < pbManager.recordData.length; i++) {
            if (pbManager.findChannelByWnd(pbManager.selWnd) == pbManager.recordData[i].Chn) {
                var tempRecordData = {};
                $.extend(true, tempRecordData, pbManager.recordData[i]);
                curChData[n] = tempRecordData;
                curChData[n].chn = 0; //Which line video list
                curChData[n].Index = n;
                n++;
            }
        }
        return curChData;
    }

    playbackEventCallBack = playbackEventProcess;

    function playbackEventProcess(jsonData) {
        var subType = jsonData.SubType;
        var data = jsonData;
        if (subType == methodEnum.SubMsgSearchMonth) {
            var year = data.Data.Year;
            var month = data.Data.Month;
            var day = data.Data.Day;
            var date = year + "-" + month + "-" + day;
            var days = $("#CalDayID").attr("name");
            if (typeof $("#calTip").find("#" + date).attr("id") == "undefined") {
                $("#calTip").append('<div id="' + date + '"></div>');
                $("#" + date).attr("name", ",NaN,");
                days += (date + ",");
                $("#CalDayID").attr("name", days);
                //Reload the calendar
                //$('#calendar').find("select").change();
                $('#calendar').find("input").click();
            } else {
                if ((i = ($("<a>" + $("#" + date).attr("name") + "</a>").text()).indexOf(",NaN,")) == -1) {
                    if ($("#" + date).attr("name").split(",").length == 8 || $("#" + date).attr("name").split(",").length == 13) {
                        $("#" + date).attr("name", $("#" + date).attr("name") + "</br>");
                    }
                    $("#" + date).attr("name", $("#" + date).attr("name") + "NaN,");
                }
            }
        } else if (subType == methodEnum.SubMsgSearchDay) {
            $("#searchBtn").attr("name", "");
            $("#searchBtn").removeClass("searchBtnDisable").addClass("searchBtnNormal");
            pbManager.recordData = [];
            var NoRecordChn = ""; //Used to prompt the no video
            var k = 0;

            for (var i = 0; i < pbManager.views.length; i++) {
                var pView = pbManager.views[i];
                pView.hasRecordData = false;
            }

            for (var i = 0; i < data.Data.length; ++i) {
                var pView = pbManager.views[i];
                if (data.Data[i].Code == errCodeEnum.Code_Success) {
                    pView.hasRecordData = true;
                    for (var j = 0; j < data.Data[i].Data.length; ++j) {
                        pbManager.recordData[k] = data.Data[i].Data[j];
                        pbManager.recordData[k].Chn = data.Data[i].Channel;
                        pbManager.recordData[k].chn = i; //Which line video list
                        pbManager.recordData[k].Index = k;
                        k++;
                    }
                } else {
                    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
                        NoRecordChn += (gDevice.getChannelName(data.Data[i].Channel * 1) + ",");
                    } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
                        NoRecordChn += "CH" + (data.Data[i].Channel + 1) + ",";
                    } else if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        ShowPaop($("#playbackBtn").text(), lg.get("IDS_SEARCH_NOFILE"));
                    }
                }
            }
            if (NoRecordChn != "") {
                ShowPaop($("#playbackBtn").text(), NoRecordChn + lg.get("IDS_SEARCH_NOFILE"));
                if (isPlayByImg) {//wing
                    //if( gDevice.hasAbilityArray(ControlBitArrayEnum.FACE_PARAM_SETTING) )
                    loadingLayerHide();
                }
            }
            //pbManager.setSelectWnd(pbManager.firstRecordIndex());
            updateBtnStatus();

            var tempRecordData = [];
            if (g_pbIsSupportGt4WndPlay && pbManager.searchNum > 4) {
                $.extend(true, tempRecordData, getCurChRecData());
            } else {
                $.extend(true, tempRecordData, pbManager.recordData); //Deep copy objects, prevent data optimized object is changed
            }
            timelineObj.initData(tempRecordData);
            if (isPlayByImg) {//wing now for playing
                loadingLayerHide();
                pbManager.play();
                /*setTimeout(function () {
                    gDevice.setPlaybackTime(0, imgDate, imgTime);
                }, 200);*/
            }
        } else if (subType == retEnum.SingleClick) {
            var wnd = jsonData.Data.Channel;
            var channnel = pbManager.findChannelByWnd(wnd);
            pbManager.setSelectWnd(wnd);

            if (g_pbIsSupportGt4WndPlay && pbManager.searchNum > 4) {
                var tempRecordData = [];
                $.extend(true, tempRecordData, getCurChRecData());
                timelineObj.hideMovePointer(0);
                timelineObj.initData(tempRecordData);
            }
        } else if (subType == retEnum.DoubleClick) {
            if (gDevice.devType == devTypeEnum.DEV_IPC)
                return;
            var wnd = jsonData.Data.Channel;
            var channel = pbManager.findChannelByWnd(wnd);
            if ($("#playbackOcx").data("spliteMode") != SplitModeEnum.WINDOW_MODE_1) {
                playbackChangeMode(SplitModeEnum.WINDOW_MODE_1);
                gDevice.setPlaybackPageIndex(wnd);
            } else {
                if (g_pbIsSupportGt4WndPlay) {
                    if (pbManager.searchNum == 0) { //Double-click the event when handling has yet to begin the search
                        if (gDevice.loginRsp.AnalogChNum > 4 && gDevice.loginRsp.AnalogChNum <= 9) {
                            playbackChangeMode(SplitModeEnum.WINDOW_MODE_9);
                        } else if (gDevice.loginRsp.AnalogChNum > 9) {
                            playbackChangeMode(SplitModeEnum.WINDOW_MODE_16);
                        } else {
                            playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                        }
                    } else if (pbManager.searchNum > 4 && pbManager.searchNum <= 9) {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_9);
                    } else if (pbManager.searchNum > 9 && pbManager.searchNum <= 16) {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_16);
                    } else {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                    }
                } else {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                }
            }
        } else if (subType == methodEnum.SubMsgPlaybackStop) { //Video has been played out
            var channel = jsonData.Data.Channel;

        } else if (subType == methodEnum.SubMsgDownloadStatus) {
            for (i in jsonData.Data) {
                pbManager.recordData[jsonData.Data[i].Index].Status = jsonData.Data[i].Status;
                try {
                    g_downloadWin.ChangeStatus(jsonData.Data[i].Index, jsonData.Data[i].Status);
                } catch (e) {

                }
            }
        } else if (subType == methodEnum.SubMsgDownloadErrNo) {
            var errNo = jsonData.Data.pbMsgID;

            try {
                if (g_downloadWin != null) {
                    gDevice.StopDownload();
                    g_downloadWin.close();
                    g_downloadWin = null;
                }
            }
            catch (e) {
                //TODO handle the exception
            }

            var str = "";
            if (errNo == retEnum.RSNetMsgRecordPlayDevicePlayback) { //306
                str = lg.get("IDS_PLAYBACK_MUTUAL");
            } else if (errNo == retEnum.RSNetMsgRecordPlayHDDFormat) { //307
                str = lg.get("IDS_PLAYBACK_FORMATHDD");
            } else if (errNo == retEnum.RSNetMsgIsModifyHdd) { //311
                str = "Disk Group is config, stop playback.";
            }

            if (str != "") {
                ShowPaop(lg.get("IDS_WARNING"), str);
            }
        } else if (subType == retEnum.RSNetMsgRecordPlayDevicePlayback ||
            subType == retEnum.RSNetMsgRecordPlayHDDFormat ||
            subType == retEnum.RSNetMsgIsModifyHdd
        ) {
            var str = "";
            if (subType == retEnum.RSNetMsgRecordPlayDevicePlayback) { //306
                str = lg.get("IDS_PLAYBACK_MUTUAL");
            } else if (subType == retEnum.RSNetMsgRecordPlayHDDFormat) { //307
                str = lg.get("IDS_PLAYBACK_FORMATHDD");
            } else if (subType == retEnum.RSNetMsgIsModifyHdd) { //311
                str = "Disk Group is config, stop playback.";
            }

            if (str != "") {
                ShowPaop(lg.get("IDS_WARNING"), str);
            }
            pbManager.stopAll();
        } else if (subType == retEnum.RSNetMsgNoBandWidth || subType == retEnum.RSNetMsgNoPlaybackAuth) {
            var str = "";
            if (subType == retEnum.RSNetMsgNoBandWidth) { //308
                str = lg.get("IDS_PREVIEW_NO_BANDWIDTH");
            } else if (subType == retEnum.RSNetMsgNoPlaybackAuth) { //310

            }

            if (str != "") {
                ShowPaop(lg.get("IDS_WARNING"), str);
            }

            pbManager.stop(data["Data"]["Channel"]);
        } else if (subType == retEnum.CreateDecodeFailed) {
            //Computer resources shortage
            ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PREVIEW_DECODEFAILED"));
            pbManager.stopAll();
        } else if (subType == retEnum.FILE_PLAY_END) {
            var wnd = jsonData.Data.Channel;
            if (wnd == -1) {
                pbManager.stopAll();
            } else {
                if (pbManager.isSyncPlay) return;
                var view = pbManager.findViewByWnd(wnd);
                if (view) {
                    view.stop();
                    gDevice.setPlaybackTime(wnd, pbManager.selDate, "0:0:0");//init search time
                }
            }
        }
    }

    playbackFaceCallBack = playbackFaceProcess;

    function playbackFaceProcess(data) {
        var actionType = data["Data"]["msgType"];
        if (gVar.sPage != "playback") {
            return;
        }

        switch (actionType) {
            case 'PIC_getPicture': {
                if (data["Data"]["data"].Result == 0) {
                    //MasklayerHide();
                    g_CapImgNum = data["Data"]["data"].Count;
                    g_DetailCapDataArr = data["Data"]["data"].Picture;

                    if (g_CapImgNum != 0) {
                        $("#FDPlayBtnMask").hide();
                    }
                    ShowImageList('Picture');

                } else if (data["Data"]["data"].Result == -1) {
                    MasklayerHide();
                    ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_PLAYBACK_MUTEX"));
                } else {
                    MasklayerHide();
                    ShowPaop("Picture", lg.get("IDS_GET_IMAGES_FAIL"));
                }
            }
                break;
        }
    }


    function callback(chn, time, bInZone) {
        if (gDevice.devType == devTypeEnum.DEV_IPC) {//ipc only has one channel,when click timeline's white line(nvr/dvr ch1),ipc can't fine selWnd
            chn = 0;
        }
        if (pbManager.bSoftFishEye && chn != pbManager.selWnd) {
            ShowPaop(lg.get("IDS_WARNING"), lg.get("IDS_FISHEYE_LIMIT"));
            return;
        }
        if (g_pbIsSupportGt4WndPlay && pbManager.searchNum > 4) {
            if (chn > 0) {
                return;
            } else {
                chn = pbManager.selWnd; //pbManager.findChannelByWnd(pbManager.selWnd);
            }
        }

        document.getElementById("chn").value = chn;
        document.getElementById("date").value = time;
        pbManager.setSelectWnd(chn);
        if (!pbManager.curWndPlaying()) {
            return;
        }
        if (bInZone) {
            gDevice.setPlaybackTime(pbManager.selWnd, pbManager.selDate, time);
            if (pbManager.isSyncPlay) {
                var modeArr = [];
                var chnArr = [0, 1, 2, 3];
                modeArr.push(getSpeedEnum($("#playSpeed").data("speed_sync")));
                //gDevice.SetPlaybackMode(chnArr,modeArr);
            }
        }
    }

    //In the hexadecimal or RGB color,Internet explorer cannot be converted to RGB color name to plug-in
    var fontColor = "#000";
    if (lgCls.skin == "black" || lgCls.skin == 'golden' || lgCls.skin == 'red_c95' || lgCls.skin == 'green_c192' || lgCls.skin == 'red_c118' || lgCls.skin == 'black_ui5'
        || lgCls.skin == 'green_c13') {
        fontColor = "#fff";
    } else if (lgCls.skin == "green_c87") {
        fontColor = "#00ad98";
    } else if (lgCls.skin == "green_c198") {
        fontColor = "#5c671f";
    } else if (lgCls.skin == "yellow_c229") {
        fontColor = "#FEFEFE";
    }

    function InitTimelineObj() {
        var b24Hour = false;
        if (lgCls.version == gVar.CtArr[0]) {
            b24Hour = true;
        }
        if (gDevice.loginRsp.UiType == 50) {//5.0 open mobileStream
            timelineObj = new timeline({
                divId: "progress-bar",
                chnNum: gDevice.devType == devTypeEnum.DEV_IPC ? 1 : 4,
                //dataTypeNum: 9,
                dataTypeArr: [recTypeEnum.NormalRecord, recTypeEnum.PEARecord,
                    recTypeEnum.AVDRecord, recTypeEnum.OSCRecord,
                    recTypeEnum.PEAAreaRecord, recTypeEnum.OCCRecord,
                    recTypeEnum.AllIntelliRec, recTypeEnum.NetbreakRecord,
                    recTypeEnum.HDRecord, recTypeEnum.FDRecord, recTypeEnum.PCCRecord,
                    recTypeEnum.MotionRecord, recTypeEnum.IORecord,
                    recTypeEnum.AlarmRecord, recTypeEnum.PIRRecord,
                    recTypeEnum.MothionAndIo, recTypeEnum.ManualRecord,
                    recTypeEnum.AlarmAssemble, recTypeEnum.SoundRecord,
                    recTypeEnum.OcclusionRecord
                ],
                dataTypeColorArr: ["rgb(0,128,0)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(0,180,225)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(255,255,0)", "rgb(255,55,55)",
                    "rgb(255,0,0)", "rgb(158,51,255)",
                    "rgb(255,120,0)", "rgb(0,128,0)",
                    "rgb(255,120,0)", "rgb(0,180,225)",
                    "rgb(0,180,225)"
                ],
                optimizeData: true,
                fontColor: fontColor,
                clickCallback: callback,
                blankLeftWidth: 60,
                b24Hour: b24Hour
            });
        } else {
            timelineObj = new timeline({
                divId: "progress-bar",
                chnNum: gDevice.devType == devTypeEnum.DEV_IPC ? 1 : 4,
                //dataTypeNum: 9,
                dataTypeArr: [recTypeEnum.NormalRecord, recTypeEnum.PEARecord,
                    recTypeEnum.AVDRecord, recTypeEnum.OSCRecord,
                    recTypeEnum.PEAAreaRecord, recTypeEnum.OCCRecord,
                    recTypeEnum.AllIntelliRec, recTypeEnum.NetbreakRecord,
                    recTypeEnum.HDRecord, recTypeEnum.FDRecord, recTypeEnum.PCCRecord,
                    recTypeEnum.MotionRecord, recTypeEnum.IORecord,
                    recTypeEnum.AlarmRecord, recTypeEnum.PIRRecord, recTypeEnum.SoundRecord
                ],
                dataTypeColorArr: ["rgb(0,128,0)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(50,160,225)", "rgb(130,200,250)",
                    "rgb(130,200,250)", "rgb(130,200,250)", "rgb(130,200,250)",
                    "rgb(255,255,0)", "rgb(0,0,255)",
                    "rgb(255,0,0)", "rgb(158,51,255)", "rgb(148,0,211)"
                ],
                optimizeData: true,
                fontColor: fontColor,
                clickCallback: callback,
                blankLeftWidth: 60,
                b24Hour: b24Hour
            });
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if (lgCls.skin == "blue") {
                    timelineObj.setColor(recTypeEnum.AllIntelliRec, "rgb(0, 65, 135)");
                }
                timelineObj.setColor(recTypeEnum.IORecord, "rgb(200,55,55)");
            }
        }
    }

    InitTimelineObj();
    ZoomIn = _ZoomIn;

    function _ZoomIn() {
        timelineObj.zoomIn();
    }

    ZoomOut = _ZoomOut;

    function _ZoomOut() {
        timelineObj.zoomOut();
    }

    ZoomBgColor = _ZoomOutBgColor;

    function _ZoomOutBgColor() {
        Zoom_box.window.document.getElementsByTagName("body")[0].style.backgroundColor = $(".playbackContent").css("background-color");
    }

    StartDownload = _StartDownload;

    function _StartDownload(indexArr) {
        var data = [];
        for (i in indexArr) {
            data[i] = pbManager.recordData[indexArr[i]];
        }
        gDevice.StartDownload(data);
    }

    StopDownload = _StopDownload;

    function _StopDownload() {
        gDevice.StopDownload();
    }

    function pbSetTipText() {
        $("#pb_exit").attr("title", lg.get("IDS_EXIT"));
        $("#pb_Play").attr("title", lg.get("IDS_BTN_PLAY"));
        $("#pb_Stop").attr("title", lg.get("IDS_REC_STOP"));
        $("#pb_SingleFrame").attr("title", lg.get("IDS_REC_ONEBYONE"));
        $("#pb_PlayAll").attr("title", lg.get("IDS_RECPLAY_ALL"));
        $("#pb_StopAll").attr("title", lg.get("IDS_STOPALL_PLAY"));
        $("#pb_CutAll").attr("title", lg.get("IDS_REC_CUT_ALL"));
        $("#pb_Cut").attr("title", lg.get("IDS_REC_CUT"));
        $("#pb_Cap").attr("title", lg.get("IDS_BTN_CAP"));
        $("#pb_Zoom").attr("title", lg.get("IDS_ELEC_AMPLIFICATION"));
        $("#pb_Download").attr("title", lg.get("IDS_REC_DOWM"));
        $("#pb_Sound").attr("title", lg.get("IDS_REC_OPENSOUND"));

        $("#pb_originalSize").attr("title", lg.get("IDS_PREVIEW_ORIGINAL"));
        $("#pb_adaptiveSize").attr("title", lg.get("IDS_BESPREAD"));
        $("#pb_fullScreen").attr("title", lg.get("IDS_FULLSCREEN"));

        $("#pb_fisheye").attr("title", lg.get("IDS_FISH_EYE"));
        $("#pb_top_wall").attr("title", lg.get("IDS_TOP_WALL"));
        $("#pb_side_wall").attr("title", lg.get("IDS_SIDE_WALL"));
        $("#pb_desktop").attr("title", lg.get("IDS_DESKTOP"));
        $("#pb_slope_wall").attr("title", lg.get("IDS_SLOPE_WALL"));
        $("#pb_hard_mode_0").attr("title", lg.get("IDS_HARD_MODE_1"));
        $("#pb_hard_mode_1").attr("title", lg.get("IDS_HARD_MODE_2"));
        $("#pb_hard_mode_2").attr("title", lg.get("IDS_HARD_MODE_3"));
        $("#pb_hard_mode_3").attr("title", lg.get("IDS_HARD_MODE_4"));
        $("#pb_hard_mode_4").attr("title", lg.get("IDS_HARD_MODE_5"));

        $("#pb_soft_mode_0,#pb_soft_mode_13,#pb_soft_mode_25,#pb_soft_mode_33").attr("title", lg.get("IDS_SOFT_MODE_1")); //fish eye
        $("#pb_soft_mode_1,#pb_soft_mode_14,#pb_soft_mode_26,#pb_soft_mode_34").attr("title", lg.get("IDS_SOFT_MODE_12")); //VR bowl
        $("#pb_soft_mode_2,#pb_soft_mode_15").attr("title", lg.get("IDS_SOFT_MODE_13")); //VR cylinder
        $("#pb_soft_mode_3").attr("title", lg.get("IDS_SOFT_MODE_8")); // 2 PTZ
        $("#pb_soft_mode_4,#pb_soft_mode_16,#pb_soft_mode_28,#pb_soft_mode_36").attr("title", lg.get("IDS_SOFT_MODE_9")); // 4 PTZ
        $("#pb_soft_mode_5,#pb_soft_mode_17").attr("title", lg.get("IDS_SOFT_MODE_2")); // 180 full view
        $("#pb_soft_mode_6,#pb_soft_mode_18").attr("title", lg.get("IDS_SOFT_MODE_3")); // 360 full view
        $("#pb_soft_mode_7,#pb_soft_mode_19").attr("title", lg.get("IDS_SOFT_MODE_4")); // 360 full view + 1 PTZ
        $("#pb_soft_mode_8,#pb_soft_mode_20").attr("title", lg.get("IDS_SOFT_MODE_5")); // 360 full view +3 PTZ
        $("#pb_soft_mode_9,#pb_soft_mode_21").attr("title", lg.get("IDS_SOFT_MODE_6")); // 360 full view + 6 PTZ
        $("#pb_soft_mode_10,#pb_soft_mode_22").attr("title", lg.get("IDS_SOFT_MODE_7")); // 360 full view + 8 PTZ
        $("#pb_soft_mode_11,#pb_soft_mode_23,#pb_soft_mode_31,#pb_soft_mode_39").attr("title", lg.get("IDS_SOFT_MODE_10")); // fish eye + 3 PTZ
        $("#pb_oft_mode_12,#pb_soft_mode_24,#pb_soft_mode_32,#pb_soft_mode_40").attr("title", lg.get("IDS_SOFT_MODE_11")); // fish eye + 8 PTZ
        $("#pb_soft_mode_27,#pb_soft_mode_35").attr("title", lg.get("IDS_SOFT_MODE_14")); // normal full view
        $("#pb_soft_mode_29,#pb_soft_mode_37").attr("title", lg.get("IDS_SOFT_MODE_15")); // normal full view + 3  PTZ
        $("#pb_soft_mode_30,#pb_soft_mode_38").attr("title", lg.get("IDS_SOFT_MODE_16")); // normal full view + 8 PTZ
    }

    timelineresize = _timelineresize;

    function _timelineresize() {
        timelineObj.resize();
    }

    getSpeed = function () {
        var playMode = pbManager.getPlayMode();
        return getSpeedValueByPlayMode(playMode);
    }
    setSpeed = function (speed) {
        var mode = getSpeedEnum(speed);
        pbManager.setPlayMode(mode);
    }

    $('#pb_speed').click(function () {
        if (pbManager.curWndPlaying()) {
            var temLeft = $(this).offset().left;
            var temTop = $(this).offset().top + $(this).scrollTop() + 32;
            var $playbackSpeed = $('#playbackSpeed');

            if ($(this).attr("name") != "active") {
                //clearTimeout(t);
                if ($('#pbSoundLine').attr("data-name") == "active") {
                    $('#pbSoundLine').attr("data-name", "").css("display", "none");
                }
                $playbackSpeed.css({
                    "left": temLeft,
                    "top": temTop,
                    "display": "block"
                }).attr("data-name", "active").focus();
                $(this).attr("name", "active");
                document.getElementById('playbackSpeed').contentWindow.setSpeed(getSpeedValueByPlayMode(pbManager.getPlayMode()));
            } else {
                $playbackSpeed.attr("data-name", "").css("display", "none");
                $(this).attr("name", "");
            }
            updateBtnStatus();
        }
    }).mouseover(function () {
        if (pbManager.curWndPlaying() && $(this).attr("name") != "active") {
            $(this).css({
                "background-position": "-"+$(this).width()*1+"px -" + $(this).attr("posy") + "px",
                'cursor': 'pointer'
            });
        }
    }).mouseout(function () {
        if (pbManager.curWndPlaying() && $(this).attr("name") != "active") {
            $(this).css({
                "background-position": "0 -" + $(this).attr("posy") + "px"
            });
        }
    });

    setSound = function (bSound) {
        pbManager.bSound = bSound;
        updateBtnStatus();
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        if ((gDevice.loginRsp.AlarmInNum <= 0) || (gDevice.loginRsp.AlarmInNum > 16)) {
            //IO page does not display//The playback is not shown Alarm、IO type
            $("#recordType option[value='2']").remove(); //Alarm
            $("#recordType option[value='4']").remove(); //IO
        }

        if (lgCls.version == gVar.CtArr[0] || lgCls.version == gVar.CtArr[105]) {
            $('.allCheck').click();
        }
    }

    if (((gDevice.loginRsp.PageControl >> 11) & 0x01) == 1) { //Playback double stream
        $("#pbStream_div").css("display", "block");
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        timelineObj.setColor(recTypeEnum.IORecord, "rgb(200,55,55)");
    } else if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
        timelineObj.setColor(recTypeEnum.AlarmRecord, "rgb(0,0,255)");
        timelineObj.setColor(recTypeEnum.IORecord, "rgb(255,0,0)");
    }

    if (lgCls.skin == "blue") {
        timelineObj.setColor(recTypeEnum.AllIntelliRec, "rgb(0, 65, 135)");
    }

    function enterPbFisheyeSoft() {
        if (pbManager.selWnd == -1 || !pbManager.views[pbManager.selWnd].bPlay) {
            return;
        }
        var ret = gDevice.getPlaybackTime(pbManager.selWnd);
        if ((ret.Code != errCodeEnum.Code_Success) || (ret.Data.Code != errCodeEnum.Code_Success)) {
            return;
        }
        var date = ret.Data.Data.date;
        var time = date.hours + ":" + date.minutes + ":" + date.seconds;
        CloseOtherVideo("closeall");
        $(".pbrightContent").css('display', 'block');
        $(".pbrightContent .fish-eye-box").css('display', 'block');
        $(".playbackContent").css('right', '210px');
        if (!$.browser.msie) {
            PluginsMove($("#playbackOcx"));
        }
        $("#pb_PlayAll,#pb_StopAll,#pb_Zoom,#pb_originalSize,#pb_adaptiveSize").css('display', 'none');
        timelineObj.resize();
        $(".pbrightContent .install-mode[data-mode='" + 0 + "']").click();
        pbManager.bSoftFishEye = true;
        pbManager.play();
        setTimeout(function () {
            gDevice.setPlaybackTime(pbManager.selWnd, pbManager.selDate, time);
        }, 100);
        playbackChangeMode(SplitModeEnum.WINDOW_MODE_1);
        gDevice.setPlaybackPageIndex(pbManager.selWnd);
        $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Pressed);
        g_isFishEyeMode.Playback = true;
    }

    function exitPbFisheyeSoft() {
        if (pbManager.selWnd == -1 || !pbManager.views[pbManager.selWnd].bPlay) {
            $(".pbrightContent").css('display', 'none');
            $(".pbrightContent .fish-eye-box").css('display', 'none');
            $(".playbackContent").css('right', '0px');
            if (!$.browser.msie) {
                PluginsMove($("#playbackOcx"));
            }
            $("#pb_Zoom,#pb_originalSize,#pb_adaptiveSize").css('display', 'block');
            if (!isPlayByImg) {
                $("#pb_PlayAll,#pb_StopAll").css('display', 'block');
            }

            timelineObj.resize();
            pbManager.bSoftFishEye = false;
            if (!isPlayByImg) {
                if (g_pbIsSupportGt4WndPlay) {
                    if (pbManager.searchNum <= 4) {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                    } else if (pbManager.searchNum > 4 && pbManager.searchNum <= 9) {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_9);
                    } else if (pbManager.searchNum > 9 && pbManager.searchNum <= 16) {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_16);
                    } else {
                        playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                    }
                    //playbackChangeMode($("#playbackOcx").data("prespliteMode")*1);
                } else {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                }
                gDevice.setPlaybackPageIndex(pbManager.wndIndex);
            }
            $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Normal);
            return;
        }
        var ret = gDevice.getPlaybackTime(pbManager.selWnd);
        if ((ret.Code != errCodeEnum.Code_Success) || (ret.Data.Code != errCodeEnum.Code_Success)) {
            return;
        }
        var date = ret.Data.Data.date;
        var time = date.hours + ":" + date.minutes + ":" + date.seconds;
        pbManager.stop();
        $(".pbrightContent").css('display', 'none');
        $(".pbrightContent .fish-eye-box").css('display', 'none');
        $(".playbackContent").css('right', '0px');
        if (!$.browser.msie) {
            PluginsMove($("#playbackOcx"));
        }
        $("#pb_Zoom,#pb_originalSize,#pb_adaptiveSize").css('display', 'block');
        if (!isPlayByImg) {
            $("#pb_PlayAll,#pb_StopAll").css('display', 'block');
        }

        timelineObj.resize();
        pbManager.bSoftFishEye = false;
        pbManager.play();
        setTimeout(function () {
            gDevice.setPlaybackTime(pbManager.selWnd, pbManager.selDate, time);
        }, 100);
        if (!isPlayByImg) {
            if (g_pbIsSupportGt4WndPlay) {
                if (pbManager.searchNum <= 4) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                } else if (pbManager.searchNum > 4 && pbManager.searchNum <= 9) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_9);
                } else if (pbManager.searchNum > 9 && pbManager.searchNum <= 16) {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_16);
                } else {
                    playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
                }
            } else {
                playbackChangeMode(SplitModeEnum.WINDOW_MODE_4);
            }
            gDevice.setPlaybackPageIndex(pbManager.wndIndex);
        }
        $("#pb_fisheye").RSButton("setStatus", RSBtnStatus.Normal);
        g_isFishEyeMode.Playback = false;
    }

    /*******Check box tree structure********/
    function TreeMenu() {
        var temp = {};
        var _default = {
            id: '',
            isShow: false,
            titleTxt: '',
            size: {
                w: 156,
                h: 300
            },
            isInOpts: false,
            initArr: [],
            hideArr: []
        }
        temp.create = _create;
        temp.getValue = _getValue;
        temp.setValue = _setValue;
        temp.setTitle = _setTitle;
        temp.setSize = _setSize;
        temp.changeLan = _changeLan;
        temp.showBranch = _showBranch;
        temp.hideBranch = _hideBrach;
        return temp;

        function _create(id, arr) {
            _default.id = id;
            var $obj = $("#" + id);
            var tempArr = arr,
                tpArrLen = tempArr.length,
                i, dataHtml = '',
                stHL = '';
            _default.initArr = arr;
            $obj.empty();

            dataHtml += '<div class="treeMenuChecked" id="' + id + '_value"><div class="showTxt"><p>' + lg.get(_default.titleTxt) + ' : ' + lg.get(tempArr[0].lantxt) + '</p></div><div class="treeMenuAngle"></div></div>' +
                '<div class="treeMenuOptions" style="height:' + _default.size.h + 'px">';
            for (i = 0; i < tpArrLen; i++) {
                stHL = typeof tempArr[i].start != 'undefined' ? 'start="' + tempArr[i].start + '"' : '';
                dataHtml += '<div class="menuTxt">' +
                    '<div class="checkBox"><input type="checkbox" alarm="' + tempArr[i].type + '"' + stHL + ' id="' + id + '_' + tempArr[i].txt + '" /></div>' +
                    '<div class="checkText" id="' + id + '_' + tempArr[i].txt + '_Txt" lan="' + tempArr[i].lantxt + '">' + lg.get(tempArr[i].lantxt) + '</div>';
                if (typeof tempArr[i].con != 'undefined' && $.isArray(tempArr[i].con)) {
                    dataHtml += parseArr(tempArr[i].con);
                }
                stHL = '';
            }
            dataHtml += '</div></div>';
            $obj.addClass("treeMenu").css("width", _default.size.w + "px");
            $obj.prop("innerHTML", dataHtml);
            $obj = null;

            var showObj = $("#" + id + "_value");
            blindEvent(showObj);
            showObj = null;

            var ckhObj = $("#" + id + " input[type=checkbox]");
            ckhObj.change(function () {
                check($(this));
            });
            ckhObj = null;
        }

        function parseArr(arr) {
            var tempArr = arr,
                tempLen = tempArr.length,
                n, html = '',
                prtHl = '';
            html += '<ul class="menuCon">';
            for (n = 0; n < tempLen; n++) {
                if (typeof tempArr[n].txt == "undefined") {
                    //console.log(n+" : txt is null!");
                    continue;
                }

                if (typeof tempArr[n].txt != 'string') {
                    //console.log(n+" : txt is misssing!");
                    continue;
                }
                prtHl = typeof tempArr[n].end != 'undefined' ? 'end="' + tempArr[n].end + '"' : '';
                html += '<li class="selBox">' +
                    '<div class="lineBox"></div>' +
                    '<div class="menuTxt">' +
                    '<div class="checkBox"><input type="checkbox" alarm="' + tempArr[n].type + '"' + prtHl + ' id="' + _default.id + '_' + tempArr[n].txt + '_chBox" /></div>' +
                    '<div class="checkText" id="' + _default.id + '_' + tempArr[n].txt + '_Txt" lan="' + tempArr[n].lantxt + '">' + lg.get(tempArr[n].lantxt) + '</div>';
                prtHl = '';
                if (typeof tempArr[n].con != 'undefined' && $.isArray(tempArr[n].con)) {
                    html += parseArr(tempArr[n].con);
                }
                html += '</div></li>';
            }
            html += '</ul>';
            return html;
        };

        function hideTree(obj) {
            _default.isShow = false;
            obj.siblings(".treeMenuOptions").css("display", "none");

        };

        function showTree(obj) {
            _default.isShow = true;
            obj.siblings(".treeMenuOptions").css("display", "block");
        };

        function blindEvent(obj) {
            var tp = obj,
                optp = obj.siblings(".treeMenuOptions");
            tp.mousedown(function (e) {
                if (_default.isShow) {
                    hideTree($(this));
                    document.onmousedown = null;
                } else {
                    showTree($(this));
                    e.stopPropagation();
                    document.onmousedown = function (e) {
                        if (!_default.isInOpts) {
                            hideTree(obj);
                            _showText();
                        }
                    };
                }
                _showText();
            });
            optp.mouseover(function () {
                _default.isInOpts = true;
            }).mouseleave(function () {
                _default.isInOpts = false;
            });
            tp = null;
            optp = null;
        };

        function check(obj) {
            var temp = obj,
                sib = temp.parent().siblings().find("input[type=checkbox]");
            if (temp.prop("checked")) {
                $(sib).each(function () {
                    $(this).prop("checked", true);
                });

                var chkBox = temp.parent().parent().parent().siblings().find("input[type=checkbox]"),
                    len = chkBox.length,
                    i, isChkAll = true,
                    tpArr = [];
                $(chkBox).each(function () {
                    var type = $(this).attr("id").split("_")[1];
                    if ($.inArray(type,_default.hideArr) ==  -1){
                        tpArr.push($(this).prop("checked"));
                    }else{
                        len--;
                    }
                });
                for (i = 0; i < len; i++) {
                    if (!tpArr[i]) {
                        isChkAll = false;
                        break;
                    }
                }
                if (isChkAll) {
                    var pt = temp.parent().parent().parent().parent("ul").siblings().children("input")[0];
                    $(pt).prop("checked", true);
                    try {
                        check($(pt));
                    } catch (e) {}
                    pt = null;
                }
                len = i = isChkAll = tpArr = null;
            } else {
                $(sib).each(function () {
                    $(this).prop("checked", false);
                });

                var pt = temp.parent().parent().parent().parent("ul").siblings().children("input")[0];
                $(pt).prop("checked", false);
                try {
                    var ptParent = $(pt).parent().parent().parent().parent("ul").siblings().children("input")[0];
                    $(ptParent).prop("checked", false);
                    ptParent = null;
                } catch (e) {}
                pt = null;
            }
            temp = null, sib = null;
        };

        function _showText() {
            var ckhObj = $("#" + _default.id + " input[type=checkbox]"),
                arr = [];
            ckhObj.each(function () {
                var tp, res;
                if ($(this).prop("checked")) {
                    if (typeof $(this).attr("start") != 'undefined') {
                        tp = $(this).attr("id").split("_")[1];
                        res = $("#" + _default.id + '_' + tp + "_Txt").attr("lan"); //_default.id+'_'+tempArr[n].txt+'_Txt
                        arr.push(lg.get(res));
                        return false;
                    }
                    tp = typeof $(this).attr("end") != 'undefined' ? $(this).attr("end") : $(this).attr("id").split("_")[1];
                    if (_default.hideArr.length > 0 && $.inArray(tp, _default.hideArr) > -1) {
                    } else {
                        res = $("#" + _default.id + '_' + tp + "_Txt").attr("lan"); //_default.id+'_'+tempArr[n].txt+'_Txt
                        arr.push(lg.get(res));
                    }
                    //arr.push(tp);
                }
            });
            //??
            arr = delRepeat(arr);
            if (arr.length == 0) {
                var firCh = ckhObj[0],
                    firLan;
                $(firCh).prop("checked", true);
                firLan = $(firCh).attr("id").split("_")[1];
                arr[0] = lg.get($("#" + _default.id + '_' + firLan + "_Txt").attr("lan"));
                check($(firCh));
                firCh = null;
            }
            var txtObj = $("#" + _default.id + "_value p");
            txtObj.prop("innerHTML", lg.get(_default.titleTxt) + ' : ' + arr.join(","));
            txtObj = null;
            ckhObj = null;
        };

        function delRepeat(arr) {
            var temp = [],
                len = arr.length,
                result = {};
            for (n = 0; n < len; n++) {
                if (!result[arr[n]]) {
                    result[arr[n]] = true;
                    temp.push(arr[n]);
                }
            }
            return temp;
        }

        function _getValue() {
            var ckhObj = $("#" + _default.id + " input[type=checkbox]"),
                num = 0;
            //console.log(_default.hideArr);
            ckhObj.each(function () {
                var type = $(this).attr("id").split("_")[1];
                if ($.inArray(type,_default.hideArr) ==  -1 &&
                    $(this).prop("checked") &&
                    (typeof $(this).attr("alarm")) != 'undefined' &&
                    $(this).attr("alarm") != 'undefined') {
                    num |= 1 << Number($(this).attr("alarm"));
                }
            });
            ckhObj = null;
            return num;
        };

        function _setValue(chboxTxt) {
            var setObj = $("#" + _default.id + "_" + chboxTxt);
            setObj.prop("checked", true);
            check(setObj);
            _showText();
            setObj = null;
        };

        function _setTitle(txt) {
            _default.titleTxt = txt;
        };

        function _setSize(obj) {
            if (typeof obj.w != 'number' || typeof obj.h != 'number') {
                //console.log('size param is a number');
                return;
            } else {
                _default.size.w = obj.w;
                _default.size.h = obj.h;
            }
        }

        function _changeLan() {
            $("#" + _default.id + " .checkText").each(function () {
                var txt = $(this).attr("lan");
                $(this).text(lg.get(txt));
            });
            _showText();
        }

        function _showBranch(branchArr) {
            var i, hideArr = branchArr, allArr = _default.initArr, id = _default.id;
            var allArrStr = JSON.stringify(allArr);
            //_default.hideArr = [];
            for (i = 0; i <hideArr.length;i++){
                var index = $.inArray(hideArr[i],_default.hideArr);
                if (index > -1){
                    _default.hideArr.splice(index,1);
                }
            }
            for (i = 0; i < hideArr.length; i++) {
                if (allArrStr.indexOf(hideArr[i])) {
                    $($('#' + id + '_' + hideArr[i] + '_Txt').parents(".selBox")[0]).show();
                }
            }
            //console.log("_showBranch----"+_default.hideArr);
        }

        function _hideBrach(branchArr) {
            var i, hideArr = branchArr, allArr = _default.initArr, id = _default.id;
            var allArrStr = JSON.stringify(allArr);
            for (i = 0; i <hideArr.length;i++){
                if ($.inArray(hideArr[i],_default.hideArr) == -1){
                    _default.hideArr = _default.hideArr.concat(hideArr[i]);
                }
            }

            for (i = 0; i < hideArr.length; i++) {
                if (allArrStr.indexOf(hideArr[i])) {
                    $($('#' + id + '_' + hideArr[i] + '_Txt').parents(".selBox")[0]).hide();
                }
            }
            //console.log("_hideBrach----"+_default.hideArr);
        }
    }

    function getImgData() {//wing getImg
        var channelNum = gDevice.loginRsp.ChannelNum;
        var selChn = [];
        var data = {};

        for (var i = 0; i < channelNum; ++i) {
            if (checkedchn[i] == true) { //Selected passages determine whether have permission
                selChn.push(i);
            }
        }

        if (selChn.length == 0) {//default all channel
            for (var i = 0; i < channelNum; ++i) {
                selChn.push(i);
            }
        }

        data.Chn = selChn;
        data.StartTime = getUnixTime($("#calday").val(), returnTimer("pbPicTimeStart")) * 1;
        data.EndTime = getUnixTime($("#calday").val(), returnTimer("pbPicTimeEnd")) * 1;

        return data;
    }

});

function StartDownload(indexArr) {}

function StopDownload() {}

function DownloadOnload() {}

function DownloadOnUnload() {}

function DownloadGetLgArr() {
    var lgArr = [];
    for (var i = 0; i < 10; i++) {
        lgArr.push(lg.get("IDS_DOWNPAGE_" + i)); //0-9,Article 10 the translation
    }
    //alert(lgArr);
    return lgArr;
}

function ZoomIn() {}

function ZoomOut() {}

function ZoomBgColor() {}

function PBVolume(valume) {
    return gDevice.PlaybackVolume(valume);
}

function PBSound(bOpen) {
    return gDevice.PlaybackSound(bOpen);
}

function setSpeed() {};

function getSpeed() {};

function setSound() {};
