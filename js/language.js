// JavaScript Document
function lan(pageName) {
    var temp = null;
    if (pageName == "login") {
        loginBtn.innerHTML = lg.get("IDS_SERVER_LOGIN"); //
        loginPswCkbox_lg.innerHTML = lg.get("IDS_REM_PASSWORD");//
        //At the netview open comments
        if (C0Netview) {
            if ($("#loginIP_netview").length) {
                loginIP_netview.innerHTML = lg.get("IDS_IP_OR_ID");
            }
            if ($("#loginPort_netview").length) {
                loginPort_netview.innerHTML = lg.get("IDS_PORT");
            }
            if ($("#userName_netview").length) {
                userName_netview.innerHTML = lg.get("IDS_USERNAME");
            }
            if ($("#password_netview").length) {
                password_netview.innerHTML = lg.get("IDS_LOGIN_PSW");
            }
        }
    } else if (pageName == "live") {
        channelListTitle.innerHTML = lg.get("IDS_CHANNEL_LIST");//
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
            mainStream.innerHTML = "HQ Stream";
            subStream.innerHTML = "SQ Stream";
        } else if(gVar.bC0_useNewLg){
			mainStream.innerHTML = "HD";
            subStream.innerHTML = "SD";
		}else{
            mainStream.innerHTML = lg.get("IDS_ENCODE_INFO");//
            subStream.innerHTML = lg.get("IDS_SUBSTREAM");//
        }
        mobileStream.innerHTML = lg.get("IDS_LOW_DIF");//
        fourStream.innerHTML = lg.get("IDS_FOURSTREAM");
        ytTitle.innerHTML = lg.get("IDS_PTZ_TITLE");//
        speed.innerHTML = lg.get("IDS_PTZ_SPEED");//
        zoom.innerHTML = lg.get("IDS_PTZ_ZOOM");//
        ptz_focus.innerHTML = lg.get("IDS_PTZ_FOCUS");//
        iris.innerHTML = lg.get("IDS_PTZ_APERTURE");//
        preset.innerHTML = lg.get("IDS_TIP_PRESET");//
        cruise.innerHTML = lg.get("IDS_TIP_CRUISE");//
        colorSetTitle.innerHTML = lg.get("IDS_DEFAULT_COLOR");//
        colSet_Hue.innerHTML = lg.get("IDS_HUE");//HUE
        colSet_Bright.innerHTML = lg.get("IDS_LIGHT");//BRIGHT
        colSet_Constrast.innerHTML = lg.get("IDS_CONSTRAST");//CONSTRAST
        colSet_Saturation.innerHTML = lg.get("IDS_SATURATION");//SATURATION
        colSet_Sharpness.innerHTML = lg.get("IDS_COLORSET_SHARPNESS");//SHARPNESS
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[87] && gVar.lg == "DEU") {
            color_default.innerHTML = "Zurückset.";
        } else {
            color_default.innerHTML = lg.get("IDS_DEFAULT");//DEFAULT
        }

        if (lgCls.version == gVar.CtArr[172]) {
            colSet_Gamma.innerHTML = lg.get("IDS_GAMMA");
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112] && gVar.lg == "KOR") {
            color_refresh.innerHTML = "저장";//refresh
        } else {
            color_refresh.innerHTML = lg.get("IDS_REFRESH");//refresh
        }
        //sel_main_lg.innerHTML = lg.get("IDS_ENCODE_INFO");
        // sel_sub_lg.innerHTML = lg.get("IDS_SUBSTREAM");
        //sel_mob_lg.innerHTML = lg.get("IDS_LOW_DIF");
        soft_code.innerHTML = lg.get("IDS_SOFT_CODE");
        hard_code.innerHTML = lg.get("IDS_HARD_CODE");
        installationTxt.innerHTML = lg.get("IDS_INSTALLATION");
        displayTxt.innerHTML = lg.get("IDS_DISPLAY");
        fishEyeChnTxt.innerHTML = lg.get("IDS_CHANNEL_LIST");

        //new ptz
        ipcPtzT_model_txt.innerHTML = lg.get("IDS_PTZ_MODEL");
        document.getElementById("ipcPtz_model_sel").options[0].innerHTML = lg.get("IDS_CRUISE_DEFAULT");
        document.getElementById("ipcPtz_model_sel").options[1].innerHTML = lg.get("IDS_CRUISE_PRESET");
        document.getElementById("ipcPtz_model_sel").options[2].innerHTML = lg.get("IDS_CRUISE_WATCH");
        document.getElementById("ipcPtz_model_sel").options[3].innerHTML = lg.get("IDS_CRUISE_LINDESCAN");
        document.getElementById("ipcPtz_model_sel").options[4].innerHTML = lg.get("IDS_CRUISE_TRACK");
        document.getElementById("ipcPtz_model_sel").options[5].innerHTML = lg.get("IDS_CRUISE_PATTERNSCAN");
        document.getElementById("ipcPtz_model_sel").options[6].innerHTML = lg.get("IDS_RESTORE");
        //default
        ipcPtz_cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        ipcPtzPre_preset.innerHTML = lg.get("IDS_TIP_PRESET");
        ipcPtzPre_inteval.innerHTML = lg.get("IDS_MINUTE_TIME");
        ipcPtzPre_cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        //preset
        ipcPtzW_preset.innerHTML = lg.get("IDS_TIP_PRESET");
        //line scan
        ipcPtzLS_areascan.innerHTML = lg.get("IDS_LINESCAN");
        ipcPtzW_speed.innerHTML = lg.get("IDS_SCANSPEED");
        document.getElementById("ipcPtzW_speed_sel").options[0].innerHTML = lg.get("IDS_CAM_HIGHT");
        document.getElementById("ipcPtzW_speed_sel").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
        document.getElementById("ipcPtzW_speed_sel").options[2].innerHTML = lg.get("IDS_CAM_LOW");
        ipcPtzW_cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        //track
        ipcPtzT_track.innerHTML = lg.get("IDS_TIP_TRACK");
        ipcPtzT_preset.innerHTML = lg.get("IDS_TIP_PRESET");
        ipcPtzT_interval.innerHTML = lg.get("IDS_MINUTE_TIME");
        ipcPtzT_cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        //pattern
        ipcPtzP_track.innerHTML = lg.get("IDS_TIP_TRACK");
        ipcPtzP_rec.innerHTML = lg.get("IDS_PATTERN_REC");
        ipcPtzP_cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        //restore
        ipcPtz_restore.innerHTML = lg.get("IDS_RESTORE");

        document.getElementById("delaySet_sel").options[0].innerHTML = lg.get("IDS_DELAY_REALTIME");
        document.getElementById("delaySet_sel").options[1].innerHTML = lg.get("IDS_DELAY_BALANCED");
        document.getElementById("delaySet_sel").options[2].innerHTML = lg.get("IDS_DELAY_FLUENCY");

        ptzNM_zoom.innerHTML = lg.get("IDS_PTZ_ZOOM");
        ptzNM_zoom_len.innerHTML = lg.get("IDS_STEP");
        ptzNM_focus.innerHTML = lg.get("IDS_PTZ_FOCUS");
        ptzNM_focus_len.innerHTML = lg.get("IDS_STEP");
        ptzNM_autoFocus.innerHTML = lg.get("IDS_AUTO_FOCUS");
        ptzNM_restore.innerHTML = lg.get("IDS_RESTORE");
        ptzNM_refresh.innerHTML = lg.get("IDS_REFRESH");

        if (lgCls.version == gVar.CtArr[2]) {
            ipcPtzAF_mode.innerHTML = lg.get("IDS_C2_AFMODE");
            document.getElementById("AFMode_sel").options[0].innerHTML = lg.get("IDS_OFF");
            document.getElementById("AFMode_sel").options[1].innerHTML = lg.get("IDS_MANUAL");
            document.getElementById("AFMode_sel").options[2].innerHTML = lg.get("IDS_OVERWRITE_AUTO");
            document.getElementById("AFMode_sel").options[3].innerHTML = lg.get("IDS_C2_SEMI");

            ipcPtzAF_power.innerHTML = lg.get("IDS_C2_POWERMODE");
            document.getElementById("PowerMode_sel").options[0].innerHTML = lg.get("IDS_OFF");
            document.getElementById("PowerMode_sel").options[1].innerHTML = lg.get("IDS_C2_SAVEPOSI");
            document.getElementById("PowerMode_sel").options[2].innerHTML = lg.get("IDS_C2_WIDE");

            ipcPtzAF_tdn.innerHTML = lg.get("IDS_C2_TDNAF");
            document.getElementById("TDNAFSwitch_sel").options[0].innerHTML = lg.get("IDS_OFF");
            document.getElementById("TDNAFSwitch_sel").options[1].innerHTML = lg.get("IDS_ON");
        }else if(lgCls.version == gVar.CtArr[238]){
            selectStreamTxt.innerHTML = lg.get("IDS_C238_STREAMMENU");
            document.getElementById("stream_sel").options[0].innerHTML = lg.get("IDS_ENCODE_INFO");
            document.getElementById("stream_sel").options[1].innerHTML = lg.get("IDS_SUBSTREAM");
            streamBtnsTxt.innerHTML = lg.get("IDS_C238_QUICKBTN");
        }
    } else if (pageName == "playback") {
        recType.innerHTML = lg.get("IDS_TYPE");
        if ($("#all_record").length) {
            all_record.innerHTML = lg.get("IDS_RECTYPE_03");
        }
        if ($("#common_record").length) {
            common_record.innerHTML = lg.get("IDS_RECTYPE_01");
        }
        //warn_record.innerHTML = lg.get("IDS_RECTYPE_ALARM");
        if ($("#motion_record").length) {
            motion_record.innerHTML = lg.get("IDS_RECTYPE_04");
        }
        pbStream_lg.innerHTML = lg.get("IDS_STREAM");
		
		if(gVar.bC0_useNewLg){
			document.getElementById("pbStream").options[0].innerHTML = "HD";
			document.getElementById("pbStream").options[1].innerHTML = "SD";
		}else{
			document.getElementById("pbStream").options[0].innerHTML = lg.get("IDS_ENCODE_INFO");//
			document.getElementById("pbStream").options[1].innerHTML = lg.get("IDS_SUBSTREAM");//
		}
		
        if ((gDevice.loginRsp.AlarmInNum <= 0) || (gDevice.loginRsp.AlarmInNum > 16)) {
            //Remove out. Can't add language
            //$("#recordType option[value='2']").remove();//Alarm
            //$("#recordType option[value='4']").remove();//IO
        } else {
            if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
                warn_record.innerHTML = lg.get("IDS_RECTYPE_ALARM_NVRC0"); //2
                io_record.innerHTML = lg.get("IDS_RECTYPE_ALARM"); //4
            } else {
                warn_record.innerHTML = lg.get("IDS_RECTYPE_ALARM"); //2
                io_record.innerHTML = lg.get("IDS_RECTYPE_IO"); //4
            }
        }
        synAll.innerHTML = lg.get("IDS_PLAYBACK_SYS"); //
        searchBtn.innerHTML = lg.get("IDS_SEARCH_DAY"); //

        pb_installationTxt.innerHTML = lg.get("IDS_INSTALLATION");
        pb_displayTxt.innerHTML = lg.get("IDS_DISPLAY");

        pbBeginTime.innerHTML = lg.get("IDS_BEGIN_TIME") + " :";
        pbEndTime.innerHTML = lg.get("IDS_END_TIME") + " :";

        if(gDevice.devType == devTypeEnum.DEV_IPC){
            document.getElementById("pbFunctionType").options[0].innerHTML = lg.get("IDS_GENERAL");
            pbFDSearchTimeTxt.innerHTML = lg.get("IDS_SEARCHTIME");
        }
    } else if (pageName == "config") {
        Display.innerHTML = lg.get("IDS_DISPLAY_PARAM"); //Display
        Analog_ch.innerHTML = lg.get("IDS_ANALOG_TITLE"); //
        Img_Ctrl.innerHTML = lg.get("IDS_CAMERA_PARAM"); //
        chn_sp.innerHTML = lg.get("IDS_SHELTER_PARAM"); //
        chn_live.innerHTML = lg.get("IDS_LIVE_PAGE"); //live
        Video_output.innerHTML = lg.get("IDS_OUTPUT");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            chn_roi.innerHTML = "관심영역설정";
        }

        if (gVar.bSN_0305_120105) {
            if (gVar.lg == "ENU") {
                IPCan_set.innerHTML = "IP Channel"; //IPCan_set;
            } else {
                IPCan_set.innerHTML = lg.get("IDS_IPCALARM"); //IPCan_set
            }
        } else {
            IPCan_set.innerHTML = lg.get("IDS_IPCALARM"); //IPCan_set
        }

        Record.innerHTML = lg.get("IDS_CHINFO_RECORD"); //record
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112] && gVar.lg == "KOR") {
            record_pz.innerHTML = "녹화"; //
        } else {
            record_pz.innerHTML = lg.get("IDS_REC_PARAM"); //
        }
        record_jh.innerHTML = lg.get("IDS_REC_PLAN"); //
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
            main_stream_set.innerHTML = "HQ Stream";
            sub_stream_set.innerHTML = "SQ Stream";
        } else {
            main_stream_set.innerHTML = lg.get("IDS_MAINSTREAM"); //
            sub_stream_set.innerHTML = lg.get("IDS_SUBSTREAM"); //
        }
        mobile_stream_set.innerHTML = lg.get("IDS_LOW_DIF"); //

        record_jhipc.innerHTML = lg.get("IDS_REC_PLAN");//
        //record_smart.innerHTML = lg.get("IDS_IPC_RECSMART")+' '+ lg.get("IDS_REC_PLAN");//
        record_smart.innerHTML = lg.get("IDS_REC_PLAN");
        if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[116]){
            record_jhipc.innerHTML = "Normal "+lg.get("IDS_REC_PLAN");
            record_smart.innerHTML = "Event "+lg.get("IDS_REC_PLAN");
        }

        Capture.innerHTML = lg.get("IDS_CAPTURE_CAP"); //capture
        Capture_Set.innerHTML = lg.get("IDS_CAPTURE_SET"); //
        Capture_Jh.innerHTML = lg.get("IDS_CAPTURE_JH"); //
        Capture_Jhipc.innerHTML = lg.get("IDS_CAPTURE_JH");
        Alarm_Jh.innerHTML = lg.get("IDS_ALARM_SCHEDULE"); //
		Alarm_JhDVR.innerHTML = lg.get("IDS_ALARM_SCHEDULE"); //
        alarmSchedule.innerHTML = lg.get("IDS_ALARM_SCHEDULE");

        Network.innerHTML = lg.get("IDS_NET_PARAM"); //network
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[137]) {
            net_base.innerHTML = lg.get("IDS_NET_PARAM").split("/")[0]; //network-settiong
        } else if (lgCls.version == gVar.CtArr[3]) {
            net_base.innerHTML = lg.get("IDS_NET_MAIN");
        } else {
            net_base.innerHTML = lg.get("IDS_NET_PARAM"); //network-settiong
        }

        stream_set.innerHTML = lg.get("IDS_STREAM_SET"); //
        net_email.innerHTML = lg.get("IDS_EMAIL_INFO"); //
        net_ddns.innerHTML = lg.get("IDS_DDNS"); //
        Switch_set.innerHTML = lg.get("IDS_SWITCH");
        if (gVar.lg == "CHS") {
            Switch_set.innerHTML = "交换机";
        }
        RTSP_Set.innerHTML = lg.get("IDS_RTSP_SET"); //
        FTP_Set.innerHTML = lg.get("FTP_Set"); //
        plat_set.innerHTML = lg.get("IDS_TITLE_PLATFORM"); //
        SwannWifi.innerHTML = lg.get("IDS_SWANN_WIFI"); //
        gb_28181.innerHTML = lg.get("IDS_GB28181"); //

        if (gDevice.devType == devTypeEnum.DEV_IPC &&
            (lgCls.version == gVar.CtArr[204] || lgCls.version == gVar.CtArr[224]) &&
            gVar.lg == "ENU") {
            Alarm.innerHTML = lg.get("IDS_MOTION_ALARM"); //motion
        } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            Alarm.innerHTML = "이벤트"; //alarm
        } else {
            Alarm.innerHTML = lg.get("IDS_ALARM_PARAM"); //alarm
        }
        alarm_mv.innerHTML = lg.get("IDS_MOTION_ALARM"); //motion
        alarm_pir.innerHTML = lg.get("IDS_RECTYPE_18"); //motion
        Alarm_block.innerHTML = lg.get("IDS_ALARM_BLOCK"); //
        alarm_io.innerHTML = lg.get("IDS_ALARM_IO"); //I/O alarm
		if(gDevice.devType==devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[70]){
			alarm_ptz.innerHTML = lg.get("IDS_PTZ_LINKAGE");
		}
		
        if (lgCls.version == gVar.CtArr[28]) {
            Alarm_ODSwitch.innerHTML = "Camera Tampering";
        } else if (lgCls.version == gVar.CtArr[61]) {
            Alarm_ODSwitch.innerHTML = "Tamper Detection";
        } else if (lgCls.version == gVar.CtArr[218]) {
            Alarm_ODSwitch.innerHTML = "Video Tampering";
        } else {
            Alarm_ODSwitch.innerHTML = lg.get("IDS_LENS_SHADE");
        }

        Device.innerHTML = lg.get("IDS_DEVICE"); //device
        Voice_ctrl.innerHTML = lg.get("IDS_SOUND"); //voice
        Dev_log.innerHTML = Dev_log2.innerHTML = lg.get("IDS_LOG"); //log

        if (lgCls.version == gVar.CtArr[85]) {
            Net_Filter.innerHTML = lg.get("IDS_NET_FILTER");
        }

        chn_yt.innerHTML = lg.get("IDS_PTZ_PARAM"); //PTZ
        ptzSchedule.innerHTML = lg.get("IDS_PTZ_SCHEDULE");
        NormalClo_Sto.innerHTML = lg.get("IDS_CLOUDSTORAGE"); //
        HTTPS.innerHTML = lg.get("IDS_HTTPS");
        HTTPS_item.innerHTML = lg.get("IDS_HTTPS");
        SwannClo_Sto.innerHTML = lg.get("IDS_CLOUDSTORAGE"); //
        SwannClo_Sto_item.innerHTML = lg.get("IDS_CLOUDSTORAGE");
        cloud.innerHTML = lg.get("IDS_CLOUDSTORAGE");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[92]) {
            sysinf_hdd.innerHTML = "SD card";
        } else {
            sysinf_hdd.innerHTML = lg.get("IDS_HDD_INFO"); //
        }

        System.innerHTML = lg.get("IDS_SYS_PARAM"); //system
        syspm_dst.innerHTML = lg.get("IDS_BASE_INFO"); //
        syspm_user.innerHTML = lg.get("IDS_USER_INFO"); //users
        sysinf_base.innerHTML = lg.get("IDS_INFO"); //info
        Chn_Info.innerHTML = lg.get("IDS_CHN_INFO"); //
        Rec_Info.innerHTML = lg.get("IDS_REC_INFO"); //

        Advanced.innerHTML = lg.get("IDS_ADVANCE"); //advance
        syswh_sj.innerHTML = lg.get("IDS_SYS_UPDATE"); //
        syswh_mr.innerHTML = lg.get("IDS_DEFAULT_PARAM"); //default
        alarm_yc.innerHTML = lg.get("IDS_ABNORMITY_ALARM"); //
        auto_wh.innerHTML = lg.get("IDS_SYS_MAINTE"); //maintain
        syswh_cd.innerHTML = lg.get("IDS_PARAM_IE");
        auto_upgrade.innerHTML = lg.get("IDS_AUTO_UPGRADE");

        Intelligent.innerHTML = lg.get("IDS_PARAM_INTELLIGENT"); //Intelligent
        Perimeter_Zone.innerHTML = lg.get("IDS_PID_TYPE"); //
        Perimeter_Line.innerHTML = lg.get("IDS_LCD_TYPE"); //
        GoodsLost_Legacy.innerHTML = lg.get("IDS_SOD_TYPE"); //
        Intelligent_jh.innerHTML = lg.get("IDS_INTELLI_RECJH"); //
        Human_Detection.innerHTML = lg.get("IDS_SMART_PD");//
        Face_Detection.innerHTML = lg.get("IDS_SMART_FD");//
        People_Cross_Counting.innerHTML = lg.get("IDS_SMART_CC");//
        sysinf_smart.innerHTML = lg.get("IDS_SMART_INFO");//
        sysinf_detection.innerHTML = lg.get("IDS_INTELLIGENT_DETECTION");
        if (lgCls.version == gVar.CtArr[161]) {
            userDefined_detection.innerHTML = lg.get("IDS_EPLAT_INTELLIGENT_DETECTION");
        }

        // C0 menu
        Settings.innerHTML = lg.get("IDS_USER_SET");
        dis.innerHTML = lg.get("IDS_DISPLAY_PARAM"); //Display
        picture.innerHTML = lg.get("IDS_CAPTURE_CAP"); //capture
        net.innerHTML = lg.get("IDS_NET_PARAM"); //network
        ala.innerHTML = lg.get("IDS_ALARM_PARAM"); //alarm

        dev.innerHTML = lg.get("IDS_DEVICE"); //device
        hdd.innerHTML = lg.get("IDS_HDD_INFO"); //
        ptz.innerHTML = lg.get("IDS_PTZ_PARAM"); //PTZ

        sys.innerHTML = lg.get("IDS_SYS_PARAM"); //system
        general.innerHTML = lg.get("IDS_BASE_INFO"); //system
        users.innerHTML = lg.get("IDS_USER_INFO"); //users
        info.innerHTML = lg.get("IDS_INFO"); //info
        remote.innerHTML = lg.get("IDS_REMOTE_ID");

        adv.innerHTML = lg.get("IDS_ADVANCE"); //advance
        maintain.innerHTML = lg.get("IDS_SYS_MAINTE"); //maintain
        log.innerHTML = lg.get("IDS_LOG"); //log
        //auto.innerHTML = lg.get("IDS_AUTO_UPGRADE");//auto-upgrade
        localSet.innerHTML = lg.get("IDS_PATH_PATH");

        live_item.innerHTML = lg.get("IDS_LIVE_PAGE"); //live
        zone_item.innerHTML = lg.get("IDS_SHELTER_PARAM"); //
        Image_item.innerHTML = lg.get("IDS_CAMERA_PARAM"); //
        IPC_item.innerHTML = lg.get("IDS_IPCALARM"); //IPCan_set
        sche_item.innerHTML = lg.get("IDS_REC_PLAN"); //
		if(gVar.bC0_useNewLg){
			substream_item.innerHTML = "SD"; //
		}else{
			substream_item.innerHTML = lg.get("IDS_SUBSTREAM"); //
		}
        mobistream_item.innerHTML = lg.get("IDS_LOW_DIF"); //
        pic_item.innerHTML = lg.get("IDS_CAPTURE_SET"); //
        pic_sche_item.innerHTML = lg.get("IDS_CAPTURE_JH"); //
        pic_scheIpc_item.innerHTML = lg.get("IDS_CAPTURE_JH");
        net_item.innerHTML = lg.get("IDS_NET_PARAM"); //network-settiong
        Email_item.innerHTML = lg.get("IDS_EMAIL_INFO"); //
        email_sche_item.innerHTML = lg.get("IDS_EMAIL_PLAN");
        ddns_item.innerHTML = lg.get("IDS_DDNS"); //
        rtsp_item.innerHTML = lg.get("IDS_RTSP_SET"); //
        hdd_item.innerHTML = lg.get("IDS_HDD_INFO"); //
        ptz_item.innerHTML = lg.get("IDS_PTZ_PARAM"); //PTZ
        dst_item.innerHTML = lg.get("IDS_BASE_INFO"); //
        user_item.innerHTML = lg.get("IDS_USER_INFO"); //users
        info_item.innerHTML = lg.get("IDS_INFO"); //info
        chn_info_item.innerHTML = lg.get("IDS_CHN_INFO"); //
        rec_info_item.innerHTML = lg.get("IDS_REC_INFO"); //
        remote_item.innerHTML = lg.get("IDS_REMOTE_ID");
        //wh_item.innerHTML = lg.get("IDS_SYS_MAINTE");//maintain
        fw_item.innerHTML = lg.get("IDS_SYS_UPDATE"); //firmware upgrade
        default_item.innerHTML = lg.get("IDS_DEFAULT_PARAM"); //load default
        if (gVar.bC0_0305_3120101) {
            REC.innerHTML = "Recording";
            Events.innerHTML = "Warning";
            mainstream_item.innerHTML = "Resolution";
            rec_item.innerHTML = "Recording";
            event_item.innerHTML = "Warning";
        } else {
            REC.innerHTML = lg.get("IDS_REC_PARAM");
            Events.innerHTML = lg.get("IDS_ABNORMITY_ALARM");
			if(gVar.bC0_useNewLg){
				mainstream_item.innerHTML = "HD";
			}else{
				mainstream_item.innerHTML = lg.get("IDS_MAINSTREAM");
			}
            rec_item.innerHTML = lg.get("IDS_REC_PARAM");
            event_item.innerHTML = lg.get("IDS_ABNORMITY_ALARM");
        }
        upgrade_item.innerHTML = lg.get("IDS_AUTO_UPGRADE");

        mv_item.innerHTML = lg.get("IDS_MOTION_ALARM"); //motion
        //upgrade_item.innerHTML = lg.get("IDS_AUTO_UPGRADE");//auto-upgrade
        IP_Filter.innerHTML = lg.get("IDS_IPFILTER");

        //Img_Ctrl_item.innerHTML = lg.get("IDS_CAMERA_PARAM"); //
        record_jhipc_item.innerHTML = lg.get("IDS_REC_PLAN");//
        record_smart_item.innerHTML = lg.get("IDS_IPC_RECSMART") + ' ' + lg.get("IDS_REC_PLAN");//
        stream_set_item.innerHTML = lg.get("IDS_STREAM_SET"); //
        Dev_log_item.innerHTML = lg.get("IDS_LOG");
        IP_Filter_item.innerHTML = lg.get("IDS_IPFILTER");//
        Alarm_block_item.innerHTML = lg.get("IDS_ALARM_BLOCK"); //
        alarm_io_item.innerHTML = lg.get("IDS_ALARM_IO"); //I/O alarm
        Alarm_ODSwitch_item.innerHTML = lg.get("IDS_LENS_SHADE"); //
        auto_wh_item.innerHTML = lg.get("IDS_SYS_MAINTE"); //maintain
        intell.innerHTML = lg.get("IDS_PARAM_INTELLIGENT"); //Intelligent
        Perimeter_Zone_item.innerHTML = lg.get("IDS_PID_TYPE"); //
        Perimeter_Line_item.innerHTML = lg.get("IDS_LCD_TYPE"); //
        GoodsLost_Legacy_item.innerHTML = lg.get("IDS_SOD_TYPE"); //
        Intelligent_jh_item.innerHTML = lg.get("IDS_REC_PLAN"); //
        Human_Detection_item.innerHTML = lg.get("IDS_SMART_PD");//
        Face_Detection_item.innerHTML = lg.get("IDS_SMART_FD");//
        People_Cross_Counting_item.innerHTML = lg.get("IDS_SMART_CC");//
        sysinf_smart_item.innerHTML = lg.get("IDS_SMART_INFO");//
        ptzSchedule_item.innerHTML = lg.get("IDS_PTZ_SCHEDULE");

        syswh_cd_item.innerHTML = lg.get("IDS_PARAM_IE");
        voice.innerHTML = lg.get("IDS_SOUND"); //voice
        Voice_ctrl_item.innerHTML = lg.get("IDS_SOUND");

        if (lgCls.version == gVar.CtArr[172]) {
            IntelligentNew.innerHTML = lg.get("IDS_PARAM_INTELLIGENT"); //Intelligent
            IntelligentNewSet.innerHTML = lg.get("IDS_PARAM_INTELLIGENT"); //Intelligent
        } else if (lgCls.version == gVar.CtArr[180]) {
            IntelligentNew2.innerHTML = lg.get("IDS_PARAM_INTELLIGENT"); //Intelligent
            IntelligentNewUser.innerHTML = lg.get("IDS_HGI_DETECTION"); //Intelligent
        } else if (lgCls.version == gVar.CtArr[201]) {
            IntelligentNew3.innerHTML = lg.get("IDS_PARAM_INTELLIGENT");
            IntelligentNewUserTest.innerHTML = lg.get("IDS_PARAM_INTELLIGENT");
        }

        flood_light.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        flood_lightmulchn.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        flood_light_item.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        flood_lightmulchn_item.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");

        sound_detection.innerHTML = lg.get("IDS_SOUND_DETECTION");
        sound_detection_item.innerHTML = lg.get("IDS_SOUND_DETECTION");

        SSL.innerHTML = lg.get("IDS_HTTPS");
        SSL_item.innerHTML = lg.get("IDS_HTTPS");

        if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[122]){
            net_VPN.innerHTML = lg.get("IDS_NET_VPN");
        }
    } else if (pageName == "localSet") {
        configPath.innerHTML = lg.get("IDS_PATH_PATH"); //
        recordFile.innerHTML = lg.get("IDS_STATIC_ALARM"); //
        fileDownload.innerHTML = lg.get("IDS_STATIC_RECDOWN"); //
        captureImg.innerHTML = lg.get("IDS_STATIC_CAPTURE"); //
        fileType.innerHTML = lg.get("IDS_FILE_TYPE"); //
        recordTime.innerHTML = lg.get("IDS_MINUTE_TIME"); //minuteTime
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            minute.innerHTML = "녹화시간"; //
        } else {
            minute.innerHTML = lg.get("IDS_MINUTE"); //
        }

        pathSave.innerHTML = lg.get("IDS_SAVE"); //
        fileType_capture.innerHTML = lg.get("IDS_CAPTURE_TYPE");

    } else if (pageName == "Analog_ch") {
        analog_Rf.innerHTML = lg.get("IDS_REFRESH");
        analog_Df.innerHTML = lg.get("IDS_DEFAULT");
        analog_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        analog_OFF.innerHTML = lg.get("IDS_ANALOG_OFF"); //close all
        analog_ON.innerHTML = lg.get("IDS_ANALOG_ON"); //start all

    } else if (pageName == "Img_Ctrl") {
        ChncamSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        ChncamRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        ChncamDf.innerHTML = lg.get("IDS_DEFAULT"); //Default
        ChncamCp.innerHTML = lg.get("IDS_Copy");
        cam_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        Cam_IRCutSensitive_L.innerHTML = lg.get("IDS_SENSITIVE"); //
        Cam_Flip_R.innerHTML = lg.get("IDS_MIRRORFLIP"); //
        Cam_Mirror_R.innerHTML = lg.get("IDS_ANGLEFLIP"); //
        NVR_imgctrlSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        NVR_imgctrlSeletedAll.innerHTML = lg.get("IDS_PATH_ALL");
        NVR_imgctrlOk.innerHTML = lg.get("IDS_Copy");
        Cam_IRCutMode_L.innerHTML = lg.get("IDS_CUTMODE");
        Cam_IRCutDelay_L.innerHTML = lg.get("IDS_DELAY");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("Cam_IRCutMode").options[0].innerHTML = lg.get("IDS_OVERWRITE_AUTO");
        } else {
            document.getElementById("Cam_IRCutMode").options[0].innerHTML = lg.get("IDS_CAM_AUTO");
        }
        document.getElementById("Cam_IRCutMode").options[1].innerHTML = lg.get("IDS_CAM_DAY");
        document.getElementById("Cam_IRCutMode").options[2].innerHTML = lg.get("IDS_CAM_NIGHT");

        document.getElementById("Cam_IRCutSensitive").options[0].innerHTML = lg.get("IDS_CAM_HIGHT");
        document.getElementById("Cam_IRCutSensitive").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
        document.getElementById("Cam_IRCutSensitive").options[2].innerHTML = lg.get("IDS_CAM_LOW");

        Backlight_com.innerHTML = lg.get("IDS_BLIGHT_COM");
        SDno_reduct.innerHTML = lg.get("IDS_3D_REDUCT");
        Digital_dynamic.innerHTML = lg.get("IDS_DIG_DYN");
        Gain_control.innerHTML = lg.get("IDS_GAIN_CON");
        White_balance.innerHTML = lg.get("IDS_WIHTE_BLAN");
        shutter.innerHTML = lg.get("IDS_SHUTTER");
        give_lvl.innerHTML = lg.get("IDS_LIGHT_LVL");
        reduct_value.innerHTML = lg.get("IDS_REDUCT_V");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            wide_value.innerHTML = "레벨(dB)";
        } else {
            wide_value.innerHTML = lg.get("IDS_REDUCT_V");
        }
        HLC_SwitchTxt.innerHTML = lg.get("IDS_IMGCTRL_HLC");
        HLC_StrengthTxt.innerHTML = lg.get("IDS_REDUCT_V");

        //red_value.innerHTML = lg.get("IDS_RED_V");
        //green_value.innerHTML = lg.get("IDS_GREEN_V");
        //black_value.innerHTML = lg.get("IDS_BLCAK_V");
        shutter_value.innerHTML = lg.get("IDS_EXP_TIME");
        Defog_Mode.innerHTML = lg.get("IDS_DEFOG_MODE");
        CorridorMode.innerHTML = lg.get("IDS_CORRIDORMODE");
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            Cam_Trad_R.innerHTML = lg.get("IDS_ANGLETRAD");
        } else {
            Cam_Trad_R.innerHTML = lg.get("IDS_ANGLETRAD");
        }

        level_value.innerHTML = lg.get("IDS_REDUCT_V");

        document.getElementById("Cam_BackLightLevel").options[0] = new Option(lg.get("IDS_CAM_LOW"), "0");
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            document.getElementById("Cam_BackLightLevel").options[1] = new Option(lg.get("IDS_CAM_MIDD2"), "1");
            document.getElementById("Cam_BackLightLevel").options[2] = new Option(lg.get("IDS_CAM_HIGHT2"), "2");
        } else {
            document.getElementById("Cam_BackLightLevel").options[1] = new Option((lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD")), "1");
            document.getElementById("Cam_BackLightLevel").options[2] = new Option(lg.get("IDS_CAM_HIGHT"), "2");
        }

        document.getElementById("Cam_R3dnrMode").options[0] = new Option(lg.get("IDS_DISABLE"), "0");
        document.getElementById("Cam_R3dnrMode").options[1] = new Option(lg.get("IDS_OVERWRITE_AUTO"), "1");
        document.getElementById("Cam_R3dnrMode").options[2] = new Option(lg.get("IDS_MANUAL"), "2");

        document.getElementById("Cam_GainControlMode").options[0] = new Option(lg.get("IDS_OFF"), "0");
        document.getElementById("Cam_GainControlMode").options[1] = new Option(lg.get("IDS_CAM_LOW"), "1");
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            document.getElementById("Cam_GainControlMode").options[2] = new Option(lg.get("IDS_CAM_MIDD2"), "2");
            document.getElementById("Cam_GainControlMode").options[3] = new Option(lg.get("IDS_CAM_HIGHT2"), "3");
        } else {
            document.getElementById("Cam_GainControlMode").options[2] = new Option((lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD")), "2");
            document.getElementById("Cam_GainControlMode").options[3] = new Option(lg.get("IDS_CAM_HIGHT"), "3");
        }

        document.getElementById("Cam_WBMode").options[0] = new Option(lg.get("IDS_OVERWRITE_AUTO"), "0");
        document.getElementById("Cam_WBMode").options[1] = new Option(lg.get("IDS_MANUAL"), "1");
        document.getElementById("Cam_WBMode").options[2] = new Option(lg.get("IDS_INDOOR"), "2");

        Cam_RGain.innerHTML = lg.get("IDS_RED_V");
        Cam_GGain.innerHTML = lg.get("IDS_GREEN_V");
        Cam_BGain.innerHTML = lg.get("IDS_BLCAK_V");

        document.getElementById("Cam_ShutterMode").options[0] = new Option(lg.get("IDS_OVERWRITE_AUTO"), "0");
        document.getElementById("Cam_ShutterMode").options[1] = new Option(lg.get("IDS_MANUAL"), "1");

        document.getElementById("Cam_DefogMode").options[0] = new Option(lg.get("IDS_DISABLE"), "0");
        document.getElementById("Cam_DefogMode").options[1] = new Option(lg.get("IDS_OVERWRITE_AUTO"), "1");
        document.getElementById("Cam_DefogMode").options[2] = new Option(lg.get("IDS_MANUAL"), "2");

        IrisMode.innerHTML = lg.get("IDS_PTZ_APERTURE");
        document.getElementById("IrisModeSel").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("IrisModeSel").options[1].innerHTML = lg.get("IDS_ENABLE");

        Cam_IRCutTime_L.innerHTML = lg.get("IDS_IRCUT_TIME");
        Cam_SetMode_L.innerHTML = lg.get("IDS_SETMODE_TYPE");
        document.getElementById("cameraModeSel").options[0].innerHTML = lg.get("IDS_NORMAL");
        document.getElementById("cameraModeSel").options[1].innerHTML = lg.get("IDS_MODE_DAYLIGHT");
        document.getElementById("cameraModeSel").options[2].innerHTML = lg.get("IDS_MODE_NIGHT");

        backlight_zlt.innerHTML = lg.get("IDS_IMG_METERAREA");

        if(gDevice.devType==devTypeEnum.DEV_HDVR && lgCls.version==gVar.CtArr[1] && gVar.lg=="RUS"){
            Cam_IRScedule_STimeTxt.innerHTML = lg.get("IDS_DST_STARTWEEKDAY");
            Cam_IRScedule_ETimeTxt.innerHTML = lg.get("IDS_DST_ENDWEEKDAY");
            document.getElementById("Cam_BackLightZone").options[0].innerHTML = "Верхняя зона";
            document.getElementById("Cam_BackLightZone").options[1].innerHTML = "Левая зона";
            document.getElementById("Cam_BackLightZone").options[2].innerHTML = "Нижняя зона";
            document.getElementById("Cam_BackLightZone").options[3].innerHTML = "Правая зона";
            document.getElementById("Cam_BackLightZone").options[4].innerHTML = "По центру";

            ImgCtrl_led.innerHTML = lg.get("IDS_IR_LED");
            document.getElementById("Cam_IRLedSel").options[0].innerHTML = lg.get("IDS_IR_LEDLEVEL1");
            document.getElementById("Cam_IRLedSel").options[1].innerHTML = lg.get("IDS_IR_LEDLEVEL2");
            document.getElementById("Cam_IRLedSel").options[2].innerHTML = lg.get("IDS_IR_LEDLEVEL3");
        }else if(gDevice.devType==devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[1] && gVar.lg == "RUS"){
            Cam_IRScedule_STimeTxt.innerHTML = "Время включения";
            Cam_IRScedule_ETimeTxt.innerHTML = "Время выключения";
            document.getElementById("Cam_BackLightZone").options[0].innerHTML = "Верхняя зона";
            document.getElementById("Cam_BackLightZone").options[1].innerHTML = "Левая зона";
            document.getElementById("Cam_BackLightZone").options[2].innerHTML = "Нижняя зона";
            document.getElementById("Cam_BackLightZone").options[3].innerHTML = "Правая зона";
            document.getElementById("Cam_BackLightZone").options[4].innerHTML = lg.get("IDS_IMG_MACA");
        }else if(gDevice.devType==devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[116]){
            Cam_IRScedule_STimeTxt.innerHTML = lg.get("IDS_DST_STARTWEEKDAY");
            Cam_IRScedule_ETimeTxt.innerHTML = lg.get("IDS_DST_ENDWEEKDAY");
            document.getElementById("Cam_BackLightZone").options[0].innerHTML = lg.get("IDS_PTZ_UP");
            document.getElementById("Cam_BackLightZone").options[1].innerHTML = lg.get("IDS_PTZ_LEFT");
            document.getElementById("Cam_BackLightZone").options[2].innerHTML = "Bottom";
            document.getElementById("Cam_BackLightZone").options[3].innerHTML = lg.get("IDS_PTZ_RIGHT");
            document.getElementById("Cam_BackLightZone").options[4].innerHTML = "Centre";
        }else{
            Cam_IRScedule_STimeTxt.innerHTML = lg.get("IDS_DST_STARTWEEKDAY");
            Cam_IRScedule_ETimeTxt.innerHTML = lg.get("IDS_DST_ENDWEEKDAY");
            document.getElementById("Cam_BackLightZone").options[0].innerHTML = lg.get("IDS_PTZ_UP");
            document.getElementById("Cam_BackLightZone").options[1].innerHTML = lg.get("IDS_PTZ_LEFT");
            document.getElementById("Cam_BackLightZone").options[2].innerHTML = lg.get("IDS_PTZ_DOWN");
            document.getElementById("Cam_BackLightZone").options[3].innerHTML = lg.get("IDS_PTZ_RIGHT");
            document.getElementById("Cam_BackLightZone").options[4].innerHTML = lg.get("IDS_IMG_MACA");
        }
        ImgCtrl_led.innerHTML = lg.get("IDS_IR_LED");

        if (lgCls.version == gVar.CtArr[70]) {
            document.getElementById("Cam_IRLedSel").options[0].innerHTML = lg.get("IDS_IR_LEDLEVEL1");
            document.getElementById("Cam_IRLedSel").options[1].innerHTML = lg.get("IDS_IR_LEDLEVEL2");
            document.getElementById("Cam_IRLedSel").options[2].innerHTML = lg.get("IDS_IR_LEDLEVEL3");
            ImgCtrl_autoFocus.innerHTML = lg.get("IDS_AUTOFOCUS");
            document.getElementById("Cam_autoFocusSel").options[0].innerHTML = lg.get("IDS_DISABLE");
            document.getElementById("Cam_autoFocusSel").options[1].innerHTML = lg.get("IDS_ENABLE");
			if(gDevice.devType==devTypeEnum.DEV_HDVR){
				//use above translation
			}else{
				Cam_IRScedule_STimeTxt.innerHTML = lg.get("IDS_SCHEDULE_STARTWEEKDAY");
				Cam_IRScedule_ETimeTxt.innerHTML = lg.get("IDS_SCHEDULE_ENDWEEKDAY");
			}
        } else if (lgCls.version == gVar.CtArr[172]) {
            D2no_reduct.innerHTML = lg.get("IDS_2D_REDUCT");
            document.getElementById("Cam_R2dnrMode").options[0] = new Option(lg.get("IDS_CAM_LOW"), "0");
            document.getElementById("Cam_R2dnrMode").options[1] = new Option(lg.get("IDS_CAM_MIDD2"), "1");
            document.getElementById("Cam_R2dnrMode").options[2] = new Option(lg.get("IDS_CAM_HIGHT2"), "2");
            ColorGain_controlNew.innerHTML = lg.get("IDS_COLOR_GAIN");
            BrightGain_controlNew.innerHTML = lg.get("IDS_BRIGHT_GAIN");
            DefogFakeLottery_value.innerHTML = lg.get("IDS_DEFOG_FLV");
        }

        AntiShake_Enable.innerHTML = lg.get("IDS_ANTI_SHAKE");
        AntiShakeLevel.innerHTML = lg.get("IDS_ANTISHAKE_LEVEL");
    } else if (pageName == "chn_sp") {
        csp_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //Channel
        start_video_keep_out.innerHTML = lg.get("IDS_SHELTER_ENABLE"); //Privacy Zone
		if(gDevice.devType==devTypeEnum.DEV_HDVR && lgCls.version==gVar.CtArr[87]){
			sp_mosaicLevel_lg.innerHTML = lg.get("IDS_MSK_LEVEL");
			sp_MSKck_lg.innerHTML = lg.get("IDS_MSK_AREA");
			sp_RTck_lg.innerHTML = lg.get("IDS_RECT_AREA");
		}
        ClearShelter.innerHTML = lg.get("IDS_MOTION_DELETE"); //Delete
        ChnspRf.innerHTML = lg.get("IDS_REFRESH");
        ChnSave.innerHTML = lg.get("IDS_CRUISE_SAVE");
        ChnspDf.innerHTML = lg.get("IDS_DEFAULT");
        ChnspCP.innerHTML = lg.get("IDS_Copy");
        sp_selectID.innerHTML = lg.get("IDS_SEL_CHID");
        spOk.innerHTML = lg.get("IDS_Copy");
        sp_selectedAll.innerHTML = lg.get("IDS_PATH_ALL");

    } else if (pageName == "chn_live") {
        NVR_cod_channel_num.innerHTML = lg.get("IDS_MOTION_CH");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            NVR_channel_name.innerHTML = "카메라타이틀"; //
        } else {
            NVR_channel_name.innerHTML = lg.get("IDS_OSD_NAME"); //
        }

        NVR_date_format.innerHTML = lg.get("IDS_DST_DATEMODE"); //
        document.getElementById("NVR_ChnOSDDateFormat").options[0].innerHTML = lg.get("IDS_DST_TIMEMODE01"); // month/day/year
        document.getElementById("NVR_ChnOSDDateFormat").options[1].innerHTML = lg.get("IDS_DST_TIMEMODE02"); //year/month/day
        document.getElementById("NVR_ChnOSDDateFormat").options[2].innerHTML = lg.get("IDS_DST_TIMEMODE03"); //day/month/year
        NVR_time_format.innerHTML = lg.get("IDS_DST_TIMEMODE"); //
        document.getElementById("NVR_ChnOSDTimeFormat").options[1].innerHTML = lg.get("IDS_DST_DATEMODE02"); //12 hours system
        document.getElementById("NVR_ChnOSDTimeFormat").options[0].innerHTML = lg.get("IDS_DST_DATEMODE01"); //24-hour
        NVR_show_name.innerHTML = lg.get("IDS_SHOWNAME"); //ShowName
        NVR_show_time.innerHTML = lg.get("IDS_SHOWTIME"); //ShowTime
        NVR_osdSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        NVR_osdOk.innerHTML = lg.get("IDS_Copy");
        NVR_osdSeletedAll.innerHTML = lg.get("IDS_PATH_ALL");
        NVR_ChnOSDSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NVR_ChnOSDRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NVR_ChnOSDCP.innerHTML = lg.get("IDS_Copy"); //Copy
        flicker_ctrl.innerHTML = lg.get("IDS_FLICKERCTRL"); //
        trans.innerHTML = lg.get("IDS_TRANS");
        if (gVar.bNormal_0305_2120105) {
            NVROSd_RecTimeFlag_L.innerHTML = lg.get("IDS_SIGNAL_STRENGTH"); //Record Time
        } else {
            NVROSd_RecTimeFlag_L.innerHTML = lg.get("IDS_ANALOG_RECTIME"); //Record Time
        }
        pre_OSD.innerHTML = lg.get("IDS_OSD_CHPRE"); //

        NVR_channel_name_second.innerHTML = lg.get("IDS_OSD_NAME") + '1';
        NVR_show_name2.innerHTML = lg.get("IDS_SHOWNAME") + '1';
        cod_location.innerHTML = lg.get("IDS_OSD_POS");
        document.getElementById("ChnOSDPosition").options[0].innerHTML = lg.get("IDS_LEFTUP");
        document.getElementById("ChnOSDPosition").options[1].innerHTML = lg.get("IDS_LEFTDOWN");
        document.getElementById("ChnOSDPosition").options[2].innerHTML = lg.get("IDS_RIGHTUP");
        document.getElementById("ChnOSDPosition").options[3].innerHTML = lg.get("IDS_RIGHTDOWN");

        ShowMulitRowOsd.innerHTML = lg.get("IDS_OSD_MULIT");
        MulitRowOsdType.innerHTML = lg.get("IDS_OSD_MULITTYPE");
        MulitRowOsd.innerHTML = lg.get("IDS_OSD_MULITTEXT");

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[166]) {
            chn_namecolor.innerHTML = lg.get("IDS_OSD_NAMECOLOR");
            chn_timecolor.innerHTML = lg.get("IDS_OSD_TIMECOLOR");
            chn_mulOsdcolor.innerHTML = lg.get("IDS_OSD_MULCOLOR");
            chn_OsdFontSiz_txt.innerHTML = lg.get("IDS_FONT_SIZE");
            document.getElementById("Chn_OSDFontSize").options[0].innerHTML = lg.get("IDS_LEVEL_S");
            document.getElementById("Chn_OSDFontSize").options[1].innerHTML = gVar.lg == "ENU" ? "Medium" : lg.get("IDS_LEVEL_M");
            document.getElementById("Chn_OSDFontSize").options[2].innerHTML = lg.get("IDS_LEVEL_B");
        }
		if(lgCls.version==gVar.CtArr[0]){
			osd_water_mark.innerHTML = "Lorex Logo";
		}else{
			osd_water_mark.innerHTML = lg.get("IDS_WATERMARK");
		}
    } else if (pageName == "IPCan_set") {
        IPCDelete.innerHTML = lg.get("IDS_MOTION_DELETE");
        QuickAdd.innerHTML = lg.get("IDS_QUICKADD");
        IPCRefresh.innerHTML = lg.get("IDS_REFRESH");
        IPCProtocolManagement.innerHTML = lg.get("IDS_PRO_MANAGE");
        IPCAutoAdd.innerHTML = lg.get("IDS_AUTO_ADDIPC");
        quickadd_ok.innerHTML = lg.get("IDS_ADD");
        quickadd_cancel.innerHTML = lg.get("IDS_CANCLE");
        quickadd_refresh.innerHTML = lg.get("IDS_REFRESH");
        IPCSet_Ok.innerHTML = lg.get("IDS_OK");
        IPCSet_Cancel.innerHTML = lg.get("IDS_CANCLE");
        ipc_chlIndex.innerHTML = lg.get("IDS_MOTION_CH");
        ipc_name.innerHTML = lg.get("IDS_OSD_NAME");
        ipc_chlPosition.innerHTML = lg.get("IDS_OSD_POS");
        ipc_address.innerHTML = lg.get("IDS_IPADDRESS");
        ipc_netmask.innerHTML = lg.get("IDS_NET_MASK");
        ipc_media_port.innerHTML = lg.get("IDS_NEW_MEDIAPORT"); //
        ipc_protocol.innerHTML = lg.get("IDS_PTZ_PROTOCOL");
        ipc_usename.innerHTML = lg.get("IDS_USERNAME"); //
        ipc_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //
        ipc_user_name.innerHTML = lg.get("IDS_USERNAME") + ":"; //
        ipc_user_password.innerHTML = lg.get("IDS_SERVERINFO_PSW") + ":"; //

    } else if (pageName == "ProManage") {
        ProMEx.innerHTML = lg.get("IDS_EXIT");
        ProMRf.innerHTML = lg.get("IDS_REFRESH");
        ProMSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        prom_select.innerHTML = lg.get("IDS_CUSTOM_PROTOCOL"); //
        prom_name.innerHTML = lg.get("IDS_PROTOCOL_NAME"); //
        prom_Streamtype.innerHTML = lg.get("IDS_STREAM_TYPE"); //
        P_mainStream.innerHTML = lg.get("IDS_MAINSTREAM"); //
        P_subStream.innerHTML = lg.get("IDS_SUBSTREAM"); //
        prom_type.innerHTML = lg.get("IDS_TYPE"); //
        prom_pro.innerHTML = lg.get("IDS_TRANS_PROTOCOL"); //
        prom_port.innerHTML = lg.get("IDS_FTP_PORT"); //
        prom_root.innerHTML = lg.get("IDS_RESOURCE_PATH"); //
        example.innerHTML = lg.get("IDS_EXAMPLE") //
            +
            "：</br>[" + lg.get("IDS_TYPE") //
            +
            "]://[" + lg.get("IDS_NET_IPADDR") //
            +
            "]:[" + lg.get("IDS_FTP_PORT") //
            +
            "]/[" + lg.get("IDS_RESOURCE_PATH") //
            +
            "]</br>rtsp://192.168.0.1:554/resourcesPath";

    } else if (pageName == "record_pz") {
        RECconfigSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        RECconfigRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        RECconfigCP.innerHTML = lg.get("IDS_Copy"); //Save
        record_mode.innerHTML = lg.get("IDS_RECCONFIG_MODE"); //
        document.getElementById("RECRecordMode").options[0].innerHTML = lg.get("IDS_RECCONFIG_MODE01"); //
        document.getElementById("RECRecordMode").options[1].innerHTML = lg.get("IDS_RECCONFIG_MODE02"); //
        //document.getElementById("RECRecordMode").options[2].innerHTML=lg.get("IDS_RECCONFIG_MODE03");//
        record_pack_time.innerHTML = lg.get("IDS_RECCONFIG_PACKTIME"); //
        temp = lg.get("IDS_MINUTE");
        if (lgCls.version == gVar.CtArr[18]) {
            document.getElementById("RECPackTime").options[0].innerHTML = "5" + temp; //5
            document.getElementById("RECPackTime").options[1].innerHTML = "10" + temp; //10
            document.getElementById("RECPackTime").options[2].innerHTML = "15" + temp; //15

        } else {
            document.getElementById("RECPackTime").options[0].innerHTML = "5" + temp; //15
            document.getElementById("RECPackTime").options[1].innerHTML = "10" + temp; //30
            document.getElementById("RECPackTime").options[2].innerHTML = "15" + temp; //45

        }
        pre_record_time.innerHTML = lg.get("IDS_PRE_RECTIME"); //

        OffLineRecTxt.innerHTML = lg.get("IDS_NETBREAK");
        //record_stream_type.innerHTML = lg.get("IDS_LOGIN_BITRATE");//
        //document.getElementById("RecordStreamMode").options[0].innerHTML = lg.get("IDS_CODE_STREAM_01");//0
        //document.getElementById("RecordStreamMode").options[1].innerHTML = lg.get("IDS_CODE_STREAM_02");//10
        record_stream_mode.innerHTML = lg.get("IDS_DST_STREAMMODE");
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
            document.getElementById("RecStreamMode").options[0].innerHTML = "HQ Stream";
            document.getElementById("RecStreamMode").options[1].innerHTML = "SQ Stream";
        } else if(gVar.bC0_useNewLg){
			document.getElementById("RecStreamMode").options[0].innerHTML = "HD";
            document.getElementById("RecStreamMode").options[1].innerHTML = "SD";
		}else{
            document.getElementById("RecStreamMode").options[0].innerHTML = lg.get("IDS_MAINSTREAM");
            document.getElementById("RecStreamMode").options[1].innerHTML = lg.get("IDS_SUBSTREAM");
        }
        rpz_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        if (gVar.bC0_0305_3120101) {
            record_startup.innerHTML = "Recording";
        } else {
            record_startup.innerHTML = lg.get("IDS_CHINFO_RECORD");//record
        }
        pzOk.innerHTML = lg.get("IDS_Copy");
        pzSelectAll.innerHTML = lg.get("IDS_PATH_ALL");
        pzSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");

    } else if (pageName == "main_stream_set") {
        NVR_CHNBMSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NVR_CHNBMRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NVR_CHNBMDf.innerHTML = lg.get("IDS_DEFAULT"); //Default
        NVR_CHNBMCP.innerHTML = lg.get("IDS_Copy"); //Refresh
        mainstream.innerHTML = lg.get("IDS_ENCODE_INFO"); //
        substream.innerHTML = lg.get("IDS_SUBSTREAM"); //
        mobistream.innerHTML = lg.get("IDS_LOW_DIF"); //
        fourstream.innerHTML = lg.get("IDS_FOURSTREAM");
        if (0 /*lgCls.version == gVar.CtArr[10]*/) {
            NVR_codestream.innerHTML = lg.get("IDS_BITRATE_CIF"); //bitrate
            //NVR_codestream2.innerHTML = lg.get("IDS_BITRATE_CIF");//quality
        } else {
            NVR_codestream.innerHTML = lg.get("IDS_ENCODE_BITRATE"); //bitrate
            //NVR_codestream2.innerHTML = lg.get("IDS_QUALITY");//quality
        }
//      document.getElementById("NVR_AMRSwitch").options[0].innerHTML = lg.get("IDS_DISABLE");
//      document.getElementById("NVR_AMRSwitch").options[1].innerHTML = lg.get("IDS_ENABLE");

        NVR_cbm_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        NVR_f_b_l.innerHTML = lg.get("IDS_ENCODE_RESOLUTION"); //
        //document.getElementById("NVR_CHNBMmSl").options[0].innerHTML=lg.get("IDS_ENCODE_D1");//
        //document.getElementById("NVR_CHNBMmSl").options[1].innerHTML=lg.get("IDS_ENCODE_HD1");//
        //document.getElementById("NVR_CHNBMmSl").options[2].innerHTML=lg.get("IDS_ENCODE_CIF");//
        NVR_frame_ratio.innerHTML = lg.get("IDS_ENCODE_FPS"); //
        NVR_code_type.innerHTML = lg.get("IDS_CODE_TYPE");
        NVR_bitrate_ctrl.innerHTML = lg.get("IDS_BITRATE_CTRL");
        document.getElementById("NVR_CHNBMbitctrl").options[0].innerHTML = lg.get("IDS_ML_FIX"); //
        document.getElementById("NVR_CHNBMbitctrl").options[1].innerHTML = lg.get("IDS_ML_VAR"); //

        document.getElementById("NVR_CHNBMbitctrl_alarm").options[0].innerHTML = lg.get("IDS_ML_FIX"); //
        document.getElementById("NVR_CHNBMbitctrl_alarm").options[1].innerHTML = lg.get("IDS_ML_VAR"); //
        NVR_stream_mode.innerHTML = lg.get("IDS_STREAMMODE"); //

        document.getElementById("NVR_CHNStreamMode").options[0].innerHTML = lg.get("IDS_PRESET_2"); //
        document.getElementById("NVR_CHNStreamMode").options[1].innerHTML = lg.get("IDS_USER_DEFINE_2"); //
        document.getElementById("NVR_CHNStreamMode_alarm").options[0].innerHTML = lg.get("IDS_PRESET_2"); //
        document.getElementById("NVR_CHNStreamMode_alarm").options[1].innerHTML = lg.get("IDS_USER_DEFINE_2"); //

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
            document.getElementById("NVR_CHNBMbitquality").options[0].innerHTML = "1";
            document.getElementById("NVR_CHNBMbitquality").options[1].innerHTML = "2";
            document.getElementById("NVR_CHNBMbitquality").options[2].innerHTML = "3";
            document.getElementById("NVR_CHNBMbitquality").options[3].innerHTML = "4";
            document.getElementById("NVR_CHNBMbitquality").options[4].innerHTML = "5";
            document.getElementById("NVR_CHNBMbitquality").options[5].innerHTML = "6";
        } else {
            document.getElementById("NVR_CHNBMbitquality").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
            document.getElementById("NVR_CHNBMbitquality").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
            document.getElementById("NVR_CHNBMbitquality").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
            document.getElementById("NVR_CHNBMbitquality").options[3].innerHTML = lg.get("IDS_MS_QUALITY_3");
            document.getElementById("NVR_CHNBMbitquality").options[4].innerHTML = lg.get("IDS_MS_QUALITY_4");
            document.getElementById("NVR_CHNBMbitquality").options[5].innerHTML = lg.get("IDS_MS_QUALITY_5");
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
            $("#NVR_CHNBMbitquality option[value='0']").remove();
            $("#NVR_CHNBMbitquality option[value='1']").remove();
            $("#NVR_CHNBMbitquality option[value='2']").remove();
        }

        document.getElementById("NVR_CHNBMbitquality_alarm").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
        document.getElementById("NVR_CHNBMbitquality_alarm").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
        document.getElementById("NVR_CHNBMbitquality_alarm").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
        document.getElementById("NVR_CHNBMbitquality_alarm").options[3].innerHTML = lg.get("IDS_MS_QUALITY_3");
        document.getElementById("NVR_CHNBMbitquality_alarm").options[4].innerHTML = lg.get("IDS_MS_QUALITY_4");
        document.getElementById("NVR_CHNBMbitquality_alarm").options[5].innerHTML = lg.get("IDS_MS_QUALITY_5");

        NVR_record_tape.innerHTML = lg.get("IDS_ENCODE_AUDIO"); //
        if (lgCls.version == gVar.CtArr[70]) {
            NVR_AMR_lg.innerHTML = lg.get("IDS_MAINS_AMR");
        }
        form_Iratio.innerHTML = lg.get("IDS_I_RATIO");
        NVR_bmOk.innerHTML = lg.get("IDS_Copy");
        NVR_main_selectID.innerHTML = lg.get("IDS_SEL_CHID");
        NVR_bmck.value = lg.get("IDS_PATH_ALL");
        NVR_bm_selectedAll.innerHTML = lg.get("IDS_PATH_ALL");
        videoCodeLevel.innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL");
        document.getElementById("videoCodeLevelSel").options[0].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_B");
        document.getElementById("videoCodeLevelSel").options[1].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_M");
        document.getElementById("videoCodeLevelSel").options[2].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_H");
        document.getElementById("videoCodeLevelSel_alarm").options[0].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_B");
        document.getElementById("videoCodeLevelSel_alarm").options[1].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_M");
        document.getElementById("videoCodeLevelSel_alarm").options[2].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_H");

    } else if (pageName == "sub_stream_set") {
        NVR_CHNSUBBMSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NVR_CHNSUBBMRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NVR_CHNSUBBMDf.innerHTML = lg.get("IDS_DEFAULT"); //Default
        NVR_CHNSUBBMCP.innerHTML = lg.get("IDS_Copy"); //Refresh
        mainstream.innerHTML = lg.get("IDS_ENCODE_INFO"); //
        substream.innerHTML = lg.get("IDS_SUBSTREAM"); //
        mobistream.innerHTML = lg.get("IDS_LOW_DIF"); //
        fourstream.innerHTML = lg.get("IDS_FOURSTREAM");
        //code_config.innerHTML=lg.get("IDS_ENCODE_INFO");//
        NVR_csubm_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        NVR_codestream_1.innerHTML = lg.get("IDS_ENCODE_BITRATE"); //

        NVR_subStream_enable.innerHTML = lg.get("IDS_OSD_ENABLE");
        //NVR_maintag_1.innerHTML = lg.get("IDS_HIGH_DIF");
        //NVR_subtag_1.innerHTML = lg.get("IDS_SD_SDI");
        //NVR_smalltag_1.innerHTML = lg.get("IDS_LOW_DIF");

        NVR_f_b_l_1.innerHTML = lg.get("IDS_ENCODE_RESOLUTION"); //
        //document.getElementById("CHNBMsSl").options[0].innerHTML=lg.get("IDS_ENCODE_D1");//
        //document.getElementById("CHNBMsSl").options[1].innerHTML=lg.get("IDS_ENCODE_HD1");//
        //document.getElementById("CHNBMsSl").options[2].innerHTML=lg.get("IDS_ENCODE_CIF");//
        NVR_frame_radio_1.innerHTML = lg.get("IDS_ENCODE_FPS"); //
        NVR_code_type_sub.innerHTML = lg.get("IDS_CODE_TYPE");
        NVR_bitrate_ctrl_sub.innerHTML = lg.get("IDS_BITRATE_CTRL");
        document.getElementById("NVR_CHNBMbitctrl_sub").options[0].innerHTML = lg.get("IDS_ML_FIX"); //
        document.getElementById("NVR_CHNBMbitctrl_sub").options[1].innerHTML = lg.get("IDS_ML_VAR"); //
        //NVR_sub_video.innerHTML = lg.get("IDS_TAB_VIDEO");//
        NVR_sub_stream_mode.innerHTML = lg.get("IDS_STREAMMODE"); //
        if (gDevice.devType == devTypeEnum.DEV_IPC || gDevice.devType == devTypeEnum.DEV_HDVR || (gDevice.devType == devTypeEnum.DEV_NVR)) {
            document.getElementById("NVR_CHNSubStreamMode").options[0].innerHTML = lg.get("IDS_PRESET_2");
            document.getElementById("NVR_CHNSubStreamMode").options[1].innerHTML = lg.get("IDS_USER_DEFINE_2"); //
        } else {
            document.getElementById("NVR_CHNSubStreamMode").options[0].innerHTML = lg.get("IDS_PRESET");//
            document.getElementById("NVR_CHNSubStreamMode").options[1].innerHTML = lg.get("IDS_USER_DEFINE");//
        }
        NVR_record_tape_1.innerHTML = lg.get("IDS_ENCODE_AUDIO"); //
        NVR_SubOk.innerHTML = lg.get("IDS_Copy");
        NVR_sub_selectID.innerHTML = lg.get("IDS_SEL_CHID");
        NVR_sub_SelectAll.innerHTML = lg.get("IDS_PATH_ALL");
        form_Iratio_sub.innerHTML = lg.get("IDS_I_RATIO");

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
            document.getElementById("NVR_CHNBMbitquality_sub").options[0].innerHTML = "1";
            document.getElementById("NVR_CHNBMbitquality_sub").options[1].innerHTML = "2";
            document.getElementById("NVR_CHNBMbitquality_sub").options[2].innerHTML = "3";
            document.getElementById("NVR_CHNBMbitquality_sub").options[3].innerHTML = "4";
            document.getElementById("NVR_CHNBMbitquality_sub").options[4].innerHTML = "5";
            document.getElementById("NVR_CHNBMbitquality_sub").options[5].innerHTML = "6";
        } else {
            document.getElementById("NVR_CHNBMbitquality_sub").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
            document.getElementById("NVR_CHNBMbitquality_sub").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
            document.getElementById("NVR_CHNBMbitquality_sub").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
            document.getElementById("NVR_CHNBMbitquality_sub").options[3].innerHTML = lg.get("IDS_MS_QUALITY_3");
            document.getElementById("NVR_CHNBMbitquality_sub").options[4].innerHTML = lg.get("IDS_MS_QUALITY_4");
            document.getElementById("NVR_CHNBMbitquality_sub").options[5].innerHTML = lg.get("IDS_MS_QUALITY_5");
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[25]) {
            $("#NVR_CHNBMbitquality_sub option[value='0']").remove();
            $("#NVR_CHNBMbitquality_sub option[value='1']").remove();
            $("#NVR_CHNBMbitquality_sub option[value='2']").remove();
        }

        videoCodeLevel.innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL");
        document.getElementById("videoCodeLevelSel").options[0].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_B");
        document.getElementById("videoCodeLevelSel").options[1].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_M");
        document.getElementById("videoCodeLevelSel").options[2].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_H");
    } else if (pageName == "mobile_stream_set") {
        //mobile_stream_set page  -->
        NVR_CHNMOBILEBMSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NVR_CHNMOBILEBMRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NVR_CHNMOBILEBMDf.innerHTML = lg.get("IDS_DEFAULT"); //Default
        NVR_CHNMOBILEBMCP.innerHTML = lg.get("IDS_Copy"); //Refresh
        mainstream.innerHTML = lg.get("IDS_ENCODE_INFO"); //
        substream.innerHTML = lg.get("IDS_SUBSTREAM"); //
        mobistream.innerHTML = lg.get("IDS_LOW_DIF"); //
        fourstream.innerHTML = lg.get("IDS_FOURSTREAM");
        NVR_csumob_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        start_mob_sense.innerHTML = lg.get("IDS_OSD_ENABLE"); //
        thirdStreamEnable.innerHTML = lg.get("IDS_ENABLE_VIDEO"); //

        NVR_mobstream_1.innerHTML = lg.get("IDS_ENCODE_BITRATE"); //Bitrate

        NVR_f_b_l_mob.innerHTML = lg.get("IDS_ENCODE_RESOLUTION"); //Resolution

        NVR_frame_radio_mob.innerHTML = lg.get("IDS_ENCODE_FPS"); //FPS
        NVR_code_type_mobile.innerHTML = lg.get("IDS_CODE_TYPE");
        NVR_bitrate_ctrl_mobile.innerHTML = lg.get("IDS_BITRATE_CTRL");
        document.getElementById("NVR_CHNBMbitctrl_mobile").options[0].innerHTML = lg.get("IDS_ML_FIX"); //
        document.getElementById("NVR_CHNBMbitctrl_mobile").options[1].innerHTML = lg.get("IDS_ML_VAR"); //
        //NVR_mob_video.innerHTML=lg.get("IDS_TAB_VIDEO");//Video
        NVR_mob_stream_mode.innerHTML = lg.get("IDS_STREAMMODE"); //Bitrate Mode
        form_Iratio_mob.innerHTML = lg.get("IDS_I_RATIO");
        document.getElementById("NVR_CHNMobStreamMode").options[0].innerHTML = lg.get("IDS_PRESET_2"); //
        document.getElementById("NVR_CHNMobStreamMode").options[1].innerHTML = lg.get("IDS_USER_DEFINE_2"); //
        NVR_record_mob_1.innerHTML = lg.get("IDS_ENCODE_AUDIO"); //Audio

        NVR_mobOk.innerHTML = lg.get("IDS_Copy"); //Copy
        NVR_mob_selectID.innerHTML = lg.get("IDS_SEL_CHID"); //
        //bmck.value =lg.get("IDS_PATH_ALL");
        NVR_mob_SelectAll.innerHTML = lg.get("IDS_PATH_ALL"); //
        //-mobile_stream_set page  end -->
        videoCodeLevel.innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL");
        document.getElementById("videoCodeLevelSel").options[0].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_B");
        document.getElementById("videoCodeLevelSel").options[1].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_M");
        document.getElementById("videoCodeLevelSel").options[2].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_H");

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
            document.getElementById("NVR_CHNBMbitquality_mobile").options[0].innerHTML = "1";
            document.getElementById("NVR_CHNBMbitquality_mobile").options[1].innerHTML = "2";
            document.getElementById("NVR_CHNBMbitquality_mobile").options[2].innerHTML = "3";
            document.getElementById("NVR_CHNBMbitquality_mobile").options[3].innerHTML = "4";
            document.getElementById("NVR_CHNBMbitquality_mobile").options[4].innerHTML = "5";
            document.getElementById("NVR_CHNBMbitquality_mobile").options[5].innerHTML = "6";
        } else {
            document.getElementById("NVR_CHNBMbitquality_mobile").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
            document.getElementById("NVR_CHNBMbitquality_mobile").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
            document.getElementById("NVR_CHNBMbitquality_mobile").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
            document.getElementById("NVR_CHNBMbitquality_mobile").options[3].innerHTML = lg.get("IDS_MS_QUALITY_3");
            document.getElementById("NVR_CHNBMbitquality_mobile").options[4].innerHTML = lg.get("IDS_MS_QUALITY_4");
            document.getElementById("NVR_CHNBMbitquality_mobile").options[5].innerHTML = lg.get("IDS_MS_QUALITY_5");
        }


    } else if (pageName == "net_mobile") {
        nbe_usename.innerHTML = lg.get("IDS_LOGIN_NAME"); //
        nbe_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //
        NET_port.innerHTML = lg.get("IDS_NET_PORT"); //
        MBRf.innerHTML = lg.get("IDS_REFRESH");
        MBSV.innerHTML = lg.get("IDS_CRUISE_SAVE");

    }else if(pageName == "alarm_ptz"){
		alPtz_channel_lg.innerHTML = lg.get("IDS_MOTION_CH");
		
		alPtz_ChnSwitch_lg.innerHTML = lg.get("IDS_SWITCH");
		alPtz_checkboxLeft_lg.innerHTML = lg.get("IDS_ALARM_TYPE");
		alPtz_MotionLinkage_lg.innerHTML = lg.get("IDS_MOTION_ALARM");
		alPtz_IntelliLinkage_lg.innerHTML = lg.get("IDS_INTELLIGENT");
		if(gDevice.devType==devTypeEnum.DEV_HDVR){
			if(lgCls.version == gVar.CtArr[70]){
				if(gVar.lg == "PLK"){
					alPtz_ChnSwitch_lg.innerHTML = "Wł.";
					alPtz_checkboxLeft_lg.innerHTML = "Typ alarmu";
					alPtz_MotionLinkage_lg.innerHTML = "Detekcja";
					alPtz_IntelliLinkage_lg.innerHTML = "Analiza";
				}else if(gVar.lg == "RUS"){
					alPtz_ChnSwitch_lg.innerHTML = "Переключатель";
					alPtz_checkboxLeft_lg.innerHTML = "Тип тревоги";
					alPtz_MotionLinkage_lg.innerHTML = "Детекция";
					alPtz_IntelliLinkage_lg.innerHTML = "Аналитика";
				}
			}else if(lgCls.version == gVar.CtArr[1]){
				if(gVar.lg == "RUS"){
					alPtz_ChnSwitch_lg.innerHTML = "Переключить";
					alPtz_MotionLinkage_lg.innerHTML = "Дет. движ";
				}
			}
		}
		
		alPtz_RF.innerHTML = lg.get("IDS_REFRESH");
        alPtz_SV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        alPtz_CP.innerHTML = lg.get("IDS_Copy");
		lPtz_Ok.innerHTML = lg.get("IDS_Copy");
	}else if (pageName == "alarm_io") {
        IORf.innerHTML = lg.get("IDS_REFRESH");
        IOSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        IOTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");
        IOCP.innerHTML = lg.get("IDS_Copy"); //Copy
        Changle_num.innerHTML = lg.get("IDS_ALARM_INPUTNUM"); //
        IO_warn_state.innerHTML = lg.get("IDS_IO_STATE"); //
        IOAlarmChannel.innerHTML = lg.get("IDS_ALARM_CHANNAL");
        //io_Analog.innerHTML = lg.get("IDS_ANALOG_CHN");
        //io_IPCCHN.innerHTML = lg.get("IDS_IO_IPCKALL");

        IO_FullScreen.innerHTML = lg.get("IDS_FULLSCREEN");
        IO_AlarmOut.innerHTML = lg.get("IDS_IO_ENABLEOUT");
        if (lgCls.version == gVar.CtArr[10]) {
            IOAlarmLatchTime.innerHTML = lg.get("IDS_LATCHTIME_CIF");
        } else {
            IOAlarmLatchTime.innerHTML = lg.get("IDS_IO_OUTTIME");
        }
        IOAlarmType.innerHTML = lg.get("IDS_ALARM_IOIPC");
        document.getElementById("IOAlarm_Type").options[0].innerHTML = lg.get("IDS_IPCALARM"); //IPC
        document.getElementById("IOAlarm_Type").options[1].innerHTML = lg.get("IDS_BOARDALARM"); //

        if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
            document.getElementById("IoAlarmSet").options[0].innerHTML = "NO";
            document.getElementById("IoAlarmSet").options[1].innerHTML = "NC";
            document.getElementById("IoAlarmSet").options[2].innerHTML = "Disable";
        } else {
            document.getElementById("IoAlarmSet").options[0].innerHTML = lg.get("IDS_NORMAL_OPEN"); //
            document.getElementById("IoAlarmSet").options[1].innerHTML = lg.get("IDS_NORMAL_CLOSE"); //
            document.getElementById("IoAlarmSet").options[2].innerHTML = lg.get("IDS_OFF"); //
        }

        buzzer_time.innerHTML = lg.get("IDS_IO_BUZZERTIME"); //
        temp = lg.get("IDS_SECOND");
        document.getElementById("IoBuzzerMooTime").options[0].innerHTML = lg.get("IDS_CLOSE");
        document.getElementById("IoBuzzerMooTime").options[1].innerHTML = "10" + temp; //10
        document.getElementById("IoBuzzerMooTime").options[2].innerHTML = "20" + temp; //20
        document.getElementById("IoBuzzerMooTime").options[3].innerHTML = "40" + temp; //40
        document.getElementById("IoBuzzerMooTime").options[4].innerHTML = "60" + temp; //60

        c2_IOFullScreen_1.innerHTML = lg.get("IDS_FULLSCREEN");
        document.getElementById("c2_IoFullScreen").options[1].innerHTML = "1" + temp; //1
        document.getElementById("c2_IoFullScreen").options[2].innerHTML = "2" + temp; //2
        document.getElementById("c2_IoFullScreen").options[3].innerHTML = "3" + temp; //3
        document.getElementById("c2_IoFullScreen").options[4].innerHTML = "5" + temp; //5
        document.getElementById("c2_IoFullScreen").options[5].innerHTML = "7" + temp; //7
        document.getElementById("c2_IoFullScreen").options[6].innerHTML = "10" + temp; //10
        document.getElementById("c2_IoFullScreen").options[7].innerHTML = "20" + temp; //20
        document.getElementById("c2_IoFullScreen").options[8].innerHTML = "30" + temp; //30

        ai_show_message.innerHTML = lg.get("IDS_IO_MESSAGE");
        ai_send_email.innerHTML = lg.get("IDS_IO_EMAIL");
        io_FTPUpload_lg.innerHTML = lg.get("IDS_CFG_FTP_UPLOAD");
        //document.getElementById("IoSendEmail").value = lg.get("IDS_IO_EMAIL"); //
        record_delay_time.innerHTML = lg.get("IDS_IO_RECDELAYTIME"); //
        record_channel.innerHTML = lg.get("IDS_IO_LINK"); //
        all_full.innerHTML = lg.get("IDS_PATH_ALL"); //
        start_touch_record.innerHTML = lg.get("IDS_IO_REC"); //
        temp = lg.get("IDS_SECOND");
        ioOk.innerHTML = lg.get("IDS_Copy");
        ioSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        ioSelectAll.innerHTML = lg.get("IDS_PATH_ALL");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("IOAlarmOutTime").options[0].innerHTML = "5" + temp;
            document.getElementById("IOAlarmOutTime").options[1].innerHTML = "10" + temp;
            document.getElementById("IOAlarmOutTime").options[2].innerHTML = "20" + temp;
            document.getElementById("IOAlarmOutTime").options[3].innerHTML = "30" + temp;
            if (lgCls.version == gVar.CtArr[70]) {
                IOAlarmtoFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
            io_CloudNotify_lg.innerHTML = lg.get("IDS_SEND_TOCLOUND");
        } else {
            document.getElementById("IOAlarmOutTime").options[0].innerHTML = "10" + temp; //10
            document.getElementById("IOAlarmOutTime").options[1].innerHTML = "20" + temp; //20
            document.getElementById("IOAlarmOutTime").options[2].innerHTML = "40" + temp; //40
            document.getElementById("IOAlarmOutTime").options[3].innerHTML = "60" + temp; //60
        }
    } else if (pageName == "alarm_mv") {
        MotionSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        MotionRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        MVTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");
        MotionCP.innerHTML = lg.get("IDS_Copy"); //Copy
        channels_num_1.innerHTML = lg.get("IDS_MOTION_CH"); //
        sense_grade.innerHTML = lg.get("IDS_MOTION_SENSITIVITY"); //
        MVFullScreen.innerHTML = lg.get("IDS_FULLSCREEN");
        c2_MVFullScreen.innerHTML = lg.get("IDS_FULLSCREEN");
        MOTIONALARMOUTPUT.innerText = lg.get("IDS_IO_ENABLEOUT");
        MotionAlarmChannel.innerHTML = lg.get("IDS_ALARM_CHANNAL");
        //  Analog_channelTxt.innerHTML = lg.get("IDS_ANALOG_CHN");
        //IP_channelTxt.innerHTML = lg.get("IDS_IO_IPCKALL");
        if (lgCls.version == gVar.CtArr[10]) {
            MotionLatchTime.innerHTML = lg.get("IDS_LATCHTIME_CIF");
        } else {
            MotionLatchTime.innerHTML = lg.get("IDS_IO_OUTTIME");
        }
        document.getElementById("MotionSensitivity").options[0].innerHTML = lg.get("IDS_IO_LEVER8"); //8
        document.getElementById("MotionSensitivity").options[1].innerHTML = lg.get("IDS_IO_LEVER7"); //7
        document.getElementById("MotionSensitivity").options[2].innerHTML = lg.get("IDS_IO_LEVER6"); //6
        document.getElementById("MotionSensitivity").options[3].innerHTML = lg.get("IDS_IO_LEVER5"); //5
        document.getElementById("MotionSensitivity").options[4].innerHTML = lg.get("IDS_IO_LEVER4"); //4
        document.getElementById("MotionSensitivity").options[5].innerHTML = lg.get("IDS_IO_LEVER3"); //3
        document.getElementById("MotionSensitivity").options[6].innerHTML = lg.get("IDS_IO_LEVER2"); //2
        document.getElementById("MotionSensitivity").options[7].innerHTML = lg.get("IDS_IO_LEVER1"); //1
        buzzer_moo_time.innerHTML = lg.get("IDS_IO_BUZZERTIME"); //
        document.getElementById("MotionBuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //
        temp = lg.get("IDS_SECOND");
        document.getElementById("MotionBuzzerMooTime").options[1].innerHTML = "10" + temp; //10
        document.getElementById("MotionBuzzerMooTime").options[2].innerHTML = "20" + temp; //20
        document.getElementById("MotionBuzzerMooTime").options[3].innerHTML = "40" + temp; //40
        document.getElementById("MotionBuzzerMooTime").options[4].innerHTML = "60" + temp; //60
        record_delay_time_1.innerHTML = lg.get("IDS_IO_RECDELAYTIME"); //

        //
        document.getElementById("c2_MotionFullScreen").options[0].innerHTML = lg.get("IDS_OFF"); //
        document.getElementById("c2_MotionFullScreen").options[1].innerHTML = "1" + temp; //1
        document.getElementById("c2_MotionFullScreen").options[2].innerHTML = "2" + temp; //2
        document.getElementById("c2_MotionFullScreen").options[3].innerHTML = "3" + temp; //3
        document.getElementById("c2_MotionFullScreen").options[4].innerHTML = "5" + temp; //5
        document.getElementById("c2_MotionFullScreen").options[5].innerHTML = "7" + temp; //7
        document.getElementById("c2_MotionFullScreen").options[6].innerHTML = "10" + temp; //10
        document.getElementById("c2_MotionFullScreen").options[7].innerHTML = "20" + temp; //20
        document.getElementById("c2_MotionFullScreen").options[8].innerHTML = "30" + temp; //30

        temp = lg.get("IDS_MINUTE");
        linkage_record_channel.innerHTML = lg.get("IDS_IO_LINK"); //
        amv_all.innerHTML = lg.get("IDS_PATH_ALL");

        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]) {
            start_touch_record_1.innerHTML = lg.get("IDS_IO_LINK");
        } else {
            start_touch_record_1.innerHTML = lg.get("IDS_IO_REC"); //
        }

        //warn_export_time_1.innerHTML=lg.get("IDS_IO_OUTTIME");//
        temp = lg.get("IDS_SECOND");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("MotionAlarmOutTime").options[0].innerHTML = "5" + temp;
            document.getElementById("MotionAlarmOutTime").options[1].innerHTML = "10" + temp;
            document.getElementById("MotionAlarmOutTime").options[2].innerHTML = "20" + temp;
            document.getElementById("MotionAlarmOutTime").options[3].innerHTML = "30" + temp;
            if (lgCls.version == gVar.CtArr[70]) {
                mv_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
            mv_CloudNotify_lg.innerHTML = lg.get("IDS_SEND_TOCLOUND");
        } else {
            document.getElementById("MotionAlarmOutTime").options[0].innerHTML = "10" + temp; //10
            document.getElementById("MotionAlarmOutTime").options[1].innerHTML = "20" + temp; //20
            document.getElementById("MotionAlarmOutTime").options[2].innerHTML = "40" + temp; //40
            document.getElementById("MotionAlarmOutTime").options[3].innerHTML = "60" + temp; //60
        }

        show_message.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        start_sendEmail.innerHTML = lg.get("IDS_IO_EMAIL"); //
        mv_FTPUpload_lg.innerHTML = lg.get("IDS_CFG_FTP_UPLOAD");
        ClearBtn.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        SelectBtn.innerHTML = lg.get("IDS_MOTION_SELECT"); //
        start_move_sense.innerHTML = lg.get("IDS_MOTION_ENABLE"); //
        mvSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        mvOk.innerHTML = lg.get("IDS_Copy");
        mvSelectedAll.innerHTML = lg.get("IDS_PATH_ALL");
        mv_LightLinkage.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        mv_loudAlarmLink.innerHTML = lg.get("IDS_AUDIO_ALARM");
    } else if (pageName == "Alarm_block") {
        alarm_b_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        alarm_b_Save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        alarm_b_enable.innerHTML = lg.get("IDS_ENABLE_BLOCK");
        email_s_enable.innerHTML = lg.get("IDS_ENABLE_SEND");
        out_s_enable.innerHTML = lg.get("IDS_IO_ENABLEOUT");
        record_s_enable.innerHTML = lg.get("IDS_IO_REC");
        record_delay.innerHTML = lg.get("IDS_IO_RECDELAYTIME");
        temp = lg.get("IDS_SECOND");
        document.getElementById("Dang_DelayTime").options[0].innerHTML = "5" + temp; //30
        document.getElementById("Dang_DelayTime").options[1].innerHTML = "10" + temp; //1
        document.getElementById("Dang_DelayTime").options[2].innerHTML = "20" + temp; //2
        document.getElementById("Dang_DelayTime").options[3].innerHTML = "30" + temp; //5

    } else if (pageName == "alarm_yc") {
        ABSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        ABRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        ABTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");
        if (gVar.bC0_0305_3120101) {
            ab_type.innerHTML = "Warning Type";
        } else {
            ab_type.innerHTML = lg.get("IDS_MOTION_TYPE");
        }
        document.getElementById("AbnormalType").options[0].innerHTML = lg.get("IDS_HDD_NOT_CONTENT"); //
        document.getElementById("AbnormalType").options[1].innerHTML = lg.get("IDS_ALARM_HDDINVALIDALARM"); //
        document.getElementById("AbnormalType").options[2].innerHTML = lg.get("IDS_ALARM_VIDEOLOSS"); //
        if (lgCls.version == gVar.CtArr[0]) {
            ab_ch0_lg.innerHTML = lg.get("IDS_HDD_NOT_CONTENT");
            ab_ch1_lg.innerHTML = lg.get("IDS_ALARM_HDDINVALIDALARM");
            ab_ch2_lg.innerHTML = lg.get("IDS_ALARM_VIDEOLOSS");
        }
        ay_start_ab_warn.innerHTML = lg.get("IDS_ABNORMITY_ENABLE"); //
        if (lgCls.version == gVar.CtArr[3]) {
            ay_buzzer_moo_time.innerHTML = lg.get("IDS_AUDIBLE"); //
        } else {
            ay_buzzer_moo_time.innerHTML = lg.get("IDS_BUZZER"); //
        }
        document.getElementById("ABBuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //
        temp = lg.get("IDS_SECOND");
        document.getElementById("ABBuzzerMooTime").options[1].innerHTML = "10" + temp; //10
        document.getElementById("ABBuzzerMooTime").options[2].innerHTML = "20" + temp; //20
        document.getElementById("ABBuzzerMooTime").options[3].innerHTML = "40" + temp; //40
        document.getElementById("ABBuzzerMooTime").options[4].innerHTML = "60" + temp; //60
        ay_show_message.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        ay_start_sendEmail.innerHTML = lg.get("IDS_IO_EMAIL"); //
        ay_start_warn_export.innerHTML = lg.get("IDS_IO_ENABLEOUT"); //
        if (lgCls.version == gVar.CtArr[10]) {
            ay_warn_time_out.innerHTML = lg.get("IDS_LATCHTIME_CIF"); //
        } else {
            ay_warn_time_out.innerHTML = lg.get("IDS_IO_OUTTIME"); //
        }
        ABAlarmChannel.innerHTML = lg.get("IDS_ALARM_CHANNAL");
        document.getElementById("ABAlarmOutTime").options[0].innerHTML = "10" + temp;
        document.getElementById("ABAlarmOutTime").options[1].innerHTML = "20" + temp;
        document.getElementById("ABAlarmOutTime").options[2].innerHTML = "40" + temp;
        document.getElementById("ABAlarmOutTime").options[3].innerHTML = "60" + temp;
        //start_fullScreen_warn.innerHTML=lg.get("IDS_IO_FULL");
    } else if (pageName == "Chn_Info") {
        ChnInfo_Rf.innerHTML = lg.get("IDS_REFRESH");

    } else if (pageName == "Rec_Info") {
        RecInfo_Rf.innerHTML = lg.get("IDS_REFRESH");

    } else if (pageName == "chn_bm") {
        CHNBMSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        CHNBMRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        if (lgCls.version == gVar.CtArr[10]) {
            code_config.innerHTML = lg.get("IDS_RECORD_SETUP"); //
            codestream.innerHTML = lg.get("IDS_BITRATE_CIF"); //bitrate
            codestream2.innerHTML = lg.get("IDS_BITRATE_CIF"); //quality
        } else {
            code_config.innerHTML = lg.get("IDS_ENCODE_INFO"); //
            codestream.innerHTML = lg.get("IDS_ENCODE_BITRATE"); //bitrate
            codestream2.innerHTML = lg.get("IDS_QUALITY"); //quality
        }
        code_config.innerHTML = lg.get("IDS_HIGH_DIF");

        maintag_0.innerHTML = lg.get("IDS_HIGH_DIF");
        subtag_0.innerHTML = lg.get("IDS_SD_SDI");
        smalltag_0.innerHTML = lg.get("IDS_LOW_DIF");
        f_voice.innerHTML = lg.get("IDS_ENCODE_AUDIO");
        document.getElementById("YTCheck").options[0].innerHTML = lg.get("IDS_CHECKBIT_NONE"); //
        document.getElementById("YTCheck").options[1].innerHTML = lg.get("IDS_CHECKBIT_ODD"); //
        document.getElementById("YTCheck").options[2].innerHTML = lg.get("IDS_CHECKBIT_EVEN"); //
        document.getElementById("YTCheck").options[3].innerHTML = lg.get("IDS_CHECKBIT_MARK"); //
        document.getElementById("YTCheck").options[4].innerHTML = lg.get("IDS_CHECKBIT_SPACE"); //
        Cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        document.getElementById("YTCruise").options[0].innerHTML = lg.get("IDS_CLOSE");
        document.getElementById("YTCruise").options[1].innerHTML = lg.get("IDS_OPEN");
        address.innerHTML = lg.get("IDS_ADDRESS");
    } else if (pageName == "net_base") {
        NBRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NBSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NBCL.innerHTML = lg.get("IDS_EXIT");
        NBTest.innerHTML = lg.get("IDS_TESTIP");
        online_mode.innerHTML = lg.get("IDS_ONLINE_MODE"); //
        document.getElementById("NBNetworkMode").options[0].innerHTML = lg.get("IDS_NET_MODE01"); //DHCP
        document.getElementById("NBNetworkMode").options[1].innerHTML = lg.get("IDS_NET_MODE02"); //PPPoE
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            online_mode.innerHTML = "IP 형식"; //
            document.getElementById("NBNetworkMode").options[2].innerHTML = "수동"; //Static
        } else {
            online_mode.innerHTML = lg.get("IDS_ONLINE_MODE"); //
            document.getElementById("NBNetworkMode").options[2].innerHTML = lg.get("IDS_NET_MODE03"); //Static
        }

        pnp.innerHTML = lg.get("IDS_NET_UPNP"); //PNP
        //netbase_upnp_row_tip.innerHTML = lg.get("IDS_PORT_RANGE")+lg.get("IDS_PORT_SERIAL");
        //Remove mobile phone port, and translation is consistent with the above port
        netbase_upnp_row_tip.innerHTML = lg.get("IDS_PORT_RANGE") + ' ( ' + lg.get("IDS_NEW_MEDIAPORT") + ' , ' + lg.get("IDS_NET_WEBPORT") + ' )';

        name_encryption.innerHTML = lg.get("IDS_ENCRYPTION"); //
        ip_address.innerHTML = lg.get("IDS_NET_IPADDR"); //
        subnet_mask.innerHTML = lg.get("IDS_NET_MASK"); //
        nbe_default_gateway.innerHTML = lg.get("IDS_NET_GATEWAY"); //
        first_DNS.innerHTML = lg.get("IDS_FIRST_DNS"); //
        standy_DNS.innerHTML = lg.get("IDS_SECOND_DNS"); //
        nbe_media_port.innerHTML = lg.get("IDS_NEW_MEDIAPORT"); //
        nbe_web_port.innerHTML = lg.get("IDS_NET_WEBPORT"); //
        nbe_Mobile_port.innerHTML = lg.get("IDS_NET_PORT_MOB"); //

        nbe_Apn.innerHTML = lg.get("IDS_APN");
        nbe_DialCode.innerHTML = lg.get("IDS_DIALCODE");
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
			if(lgCls.version == gVar.CtArr[7]){
				nbe_WirelessUser.innerHTML = "Wi-Fi";
			}else{
				nbe_WirelessUser.innerHTML = "SSID";
			}
        } else {
            nbe_WirelessUser.innerHTML = lg.get("IDS_LOGIN_NAME");
        }
        net_Scan.innerHTML = lg.get("IDS_NET_SCAN");
        net_Join.innerHTML = lg.get("IDS_NET_JOIN");
        nbe_WirelessPwd.innerHTML = lg.get("IDS_SERVERINFO_PSW");

        npe_usename.innerHTML = lg.get("IDS_LOGIN_NAME"); //
        npe_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //

        NetIPV6_Addr_lg.innerHTML = "IPV6-" + lg.get("IDS_NET_IPADDR");//lg.get("IDS_NET_IPV6ADDR");
        NetIPV6_Gateway_lg.innerHTML = "IPV6-" + lg.get("IDS_NET_GATEWAY");//lg.get("IDS_NET_IPV6_GATEWAY");

        limit_bandwidth.innerHTML = lg.get("IDS_LIMIT_BANDWIDTH");

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[122]) {
            net_connect_protocol_txt.innerHTML = lg.get("IDS_CONNECT_PROTOCOL");
        }
        netbase_p2pswitch_lg.innerHTML = lg.get("IDS_P2P_SWITCH");

        map_strategy_txt.innerHTML = lg.get("IDS_MAP_STRATEGY");
        document.getElementById("map_strategy").options[0].innerHTML = lg.get("IDS_MANUAL");
        document.getElementById("map_strategy").options[1].innerHTML = lg.get("IDS_OVERWRITE_AUTO");
        ClientExtPort_txt.innerHTML = lg.get("IDS_CLIENTPORT_EXT");
        WebExtPort_txt.innerHTML = lg.get("IDS_WEBPORT_EXT");
        netbase_multicast_mainTitle.innerHTML = lg.get("IDS_ENCODE_INFO");
        netbase_multicast_txt.innerHTML = lg.get("IDS_NET_MULTICAST");
        netbase_multicastAddr_txt.innerHTML = lg.get("IDS_NET_MULTICASTADDR");
        netbase_multicastPort_txt.innerHTML = lg.get("IDS_NET_MULTICASTPORT");
        netbase_multicast_subTitle.innerHTML = lg.get("IDS_SUBSTREAM");
        netbase_multicast_sub_txt.innerHTML = lg.get("IDS_NET_MULTICAST");
        netbase_multicastAddr_sub_txt.innerHTML = lg.get("IDS_NET_MULTICASTADDR");
        netbase_multicastPort_sub_txt.innerHTML = lg.get("IDS_NET_MULTICASTPORT");
    } else if (pageName == "net_ddns") {
        DDNSSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        DDNSRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        nd_DDNS_startup.innerHTML = lg.get("IDS_DDNS_ENABLE"); //
        nds_server_address.innerHTML = lg.get("IDS_DDNS_ADDRESS"); //
        host_name.innerHTML = lg.get("IDS_DDNS_HOSTNAME"); //

        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112]) {
            c112UseLoginFlag_lg.innerHTML = lg.get("IDS_C112_LOGIN");
        }

        service_id.innerHTML = lg.get("IDS_SERVICEID"); //
        nd_usename.innerHTML = lg.get("IDS_USERNAME"); //
        if (lgCls.version == gVar.CtArr[3]) {
            nd_usename.innerHTML = lg.get("IDS_USER"); //
        } else if (lgCls.version == gVar.CtArr[112]) {
            nd_usename.innerHTML = lg.get("IDS_LOGIN_NAME2");
        }
        nd_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //
        DDNSTest.innerHTML = lg.get("IDS_DDNSTEST");
    } else if (pageName == "SwannWifi") {
        wifi_country_lable.innerHTML = lg.get("IDS_SWANN_COUNTRY"); //country
        document.getElementById("wifi_country").options[0].innerHTML = lg.get("IDS_AMERICA"); //America
        document.getElementById("wifi_country").options[1].innerHTML = lg.get("IDS_EUROPE"); //Europe
        document.getElementById("wifi_country").options[2].innerHTML = lg.get("IDS_AUSTRALIA"); //Australia
        wifi_channel_lable.innerHTML = lg.get("IDS_WIFI_CHANNEL"); //channel
        document.getElementById("wifi_channel").options[0].innerHTML = lg.get("IDS_WIFI_AUTO") //AUTO
        document.getElementById("wifi_channel").options[1].innerHTML = lg.get("IDS_CHANNEL01") //channel 01
        document.getElementById("wifi_channel").options[2].innerHTML = lg.get("IDS_CHANNEL02") //channel 02
        document.getElementById("wifi_channel").options[3].innerHTML = lg.get("IDS_CHANNEL03") //channel 03
        document.getElementById("wifi_channel").options[4].innerHTML = lg.get("IDS_CHANNEL04") //channel 04
        document.getElementById("wifi_channel").options[5].innerHTML = lg.get("IDS_CHANNEL05") //channel 05
        document.getElementById("wifi_channel").options[6].innerHTML = lg.get("IDS_CHANNEL06") //channel 06
        document.getElementById("wifi_channel").options[7].innerHTML = lg.get("IDS_CHANNEL07") //channel 07
        document.getElementById("wifi_channel").options[8].innerHTML = lg.get("IDS_CHANNEL08") //channel 08
        document.getElementById("wifi_channel").options[9].innerHTML = lg.get("IDS_CHANNEL09") //channel 09
        document.getElementById("wifi_channel").options[10].innerHTML = lg.get("IDS_CHANNEL10") //channel 10
        document.getElementById("wifi_channel").options[11].innerHTML = lg.get("IDS_CHANNEL11") //channel 11
        wifi_version_lable.innerHTML = lg.get("IDS_WIFI_VERSION"); //version
        wifi_save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //version


    } else if (pageName == "net_email") {
        if (gDevice.loginRsp.NewEmailTest == 1) {
            SSL_switch.innerHTML = lg.get("IDS_EMAIL_SSL2");
            addressee_adress.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS") + 1; //
            addressee_adress1.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS") + 2; //
            addressee_adress2.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS") + 3; //
            if (lgCls.version == gVar.CtArr[3]) {
                addressee_adress2.innerHTML = "Forget Password Receiver"; //
            }
            if (lgCls.version == gVar.CtArr[7] && gVar.lg == "ENU") {
                EmailTestStop.innerHTML = "Close";
            } else {
                EmailTestStop.innerHTML = lg.get("IDS_CANCLE");
            }
        } else {
            SSL_switch.innerHTML = lg.get("IDS_EMAIL_SSL"); //
            addressee_adress.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS"); //
        }

        EmailSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        EmailRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        document.getElementById("EmailSetup").innerHTML = lg.get("IDS_EMAIL_SCHEDULE");
        Email_startup.innerHTML = lg.get("IDS_EMAIL_ENABLE"); //
        SMTP_server.innerHTML = lg.get("IDS_EMAIL_SERVER"); //
        SMTP_usename_lg.innerHTML = lg.get("IDS_USERNAME");
        port_num.innerHTML = lg.get("IDS_EMAIL_PORT"); //
        EmailTest.innerHTML = lg.get("IDS_EMAILTEST"); //
        defaultoff.innerHTML = lg.get("IDS_DISABLE");
        sendEmail_alternate.innerHTML = lg.get("IDS_EMAIL_TIME"); //
        temp = lg.get("IDS_MINUTE");
        document.getElementById("Emintervaltime").options[0].innerHTML = "1" + temp; //
        document.getElementById("Emintervaltime").options[1].innerHTML = "3" + temp; //
        document.getElementById("Emintervaltime").options[2].innerHTML = "5" + temp; //
        document.getElementById("Emintervaltime").options[3].innerHTML = "10" + temp;
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[121]) {
            $("#Emintervaltime").append('<option value="4">60' + temp + '</option>');
        }
        email_StreamType.innerHTML = lg.get("IDS_LOGIN_BITRATE");
        document.getElementById("email_StreamTypeSel").options[0].innerHTML = lg.get("IDS_CFG_MAINSTREAM");
        document.getElementById("email_StreamTypeSel").options[1].innerHTML = lg.get("IDS_CFG_SUBSTREAM");

        email_sendImgTxt.innerHTML = lg.get("IDS_FTP_REQPIC");
        email_TitleTxt.innerHTML = lg.get("IDS_TITLE");
        email_ContextTxt.innerHTML = lg.get("IDS_CONTENT");
    } else if (pageName == "email_jh") {
        EmailplanRf.innerHTML = lg.get("IDS_REFRESH");
        EmailplanSave.innerHTML = lg.get("IDS_CRUISE_SAVE");
        EmailplanExit.innerHTML = lg.get("IDS_EXIT");
        emailjh_channel.innerHTML = lg.get("IDS_MOTION_CH");
        emailjh_qx.innerHTML = lg.get("IDS_DST_DSTMODE01");
        document.getElementById("EMAILORDQX").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("EMAILORDQX").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("EMAILORDQX").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("EMAILORDQX").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("EMAILORDQX").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("EMAILORDQX").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("EMAILORDQX").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");
        email_motion.innerHTML = lg.get("IDS_DEFAULT_MOTION");
        email_alarm.innerHTML = lg.get("IDS_RECPLAN_TYPE03");
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]) {
            email_norecord.innerHTML = "Not Sent";
        } else {
            email_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01");
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]
            || gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
            email_event.innerHTML = lg.get("IDS_WARNING");
        } else {
            email_event.innerHTML = lg.get("IDS_EMAILJH_EXCEPTION");
        }
        email_Intelli.innerHTML = lg.get("IDS_RECTYPE_SMART");
        email_copyDay.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");
        document.getElementById("YJJH_CPQXQ").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("YJJH_CPQXQ").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("YJJH_CPQXQ").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("YJJH_CPQXQ").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("YJJH_CPQXQ").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("YJJH_CPQXQ").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("YJJH_CPQXQ").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");
        EMAIL_COPY_WEEK_TO.innerHTML = lg.get("IDS_COPY_TO");
        document.getElementById("YJJH_CPHXQ").options[0].innerHTML = lg.get("IDS_PATH_ALL");
        document.getElementById("YJJH_CPHXQ").options[1].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("YJJH_CPHXQ").options[2].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("YJJH_CPHXQ").options[3].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("YJJH_CPHXQ").options[4].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("YJJH_CPHXQ").options[5].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("YJJH_CPHXQ").options[6].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("YJJH_CPHXQ").options[7].innerHTML = lg.get("IDS_WEEKDAY_07");
        YJJH_CPXQQD.innerHTML = lg.get("IDS_Copy");
        email_copyCh.innerHTML = lg.get("IDS_REC_COPYCH");
        EMAIL_COPY_CH_TO.innerHTML = lg.get("IDS_COPY_TO");
        YJJH_CPTDQD.innerHTML = lg.get("IDS_Copy");
    } else if (pageName == "record_jh") {
        //ss_TimeMode.innerHTML=lg.get("IDS_RECORD_TYPE");//
        rjh_channel.innerHTML = lg.get("IDS_MOTION_CH"); //Channel
        LXJH_IPC_D.innerHTML = lg.get("IDS_TIME"); //No Record
        LXJH_CPTDQD.innerHTML = lg.get("IDS_Copy");
        LXJH_CPXQQD.innerHTML = lg.get("IDS_Copy");
        //record_main.innerHTML =lg.get("IDS_M_RECORD");
        //motion_main.innerHTML=lg.get("IDS_M_MOTION");
        //m_record.innerHTML =lg.get("IDS_S_MAIN");
        //s_record.innerHTML=lg.get("IDS_S_SUB");
        //m_motion.innerHTML=lg.get("IDS_S_MAIN");
        //s_motion.innerHTML=lg.get("IDS_S_SUB");

        LXJH_CPTDQD.innerHTML = lg.get("IDS_Copy");
        LXJH_CPXQQD.innerHTML = lg.get("IDS_Copy");
        LXJH_CHNEXT.value = lg.get("IDS_NEXT");
        LXJH_WEEKNEXT.value = lg.get("IDS_NEXT");
        document.getElementById("RECORDQX").options[0].innerHTML = document.getElementById("LXJH_CPQXQ").options[0].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("RECORDQX").options[1].innerHTML = document.getElementById("LXJH_CPQXQ").options[1].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("RECORDQX").options[2].innerHTML = document.getElementById("LXJH_CPQXQ").options[2].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("RECORDQX").options[3].innerHTML = document.getElementById("LXJH_CPQXQ").options[3].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("RECORDQX").options[4].innerHTML = document.getElementById("LXJH_CPQXQ").options[4].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("RECORDQX").options[5].innerHTML = document.getElementById("LXJH_CPQXQ").options[5].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("RECORDQX").options[6].innerHTML = document.getElementById("LXJH_CPQXQ").options[6].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun
        $("#rjh_qx").text(lg.get("IDS_DST_DSTMODE01"));

        document.getElementById("LXJH_CPHXQ").options[0].innerHTML = lg.get("IDS_PATH_ALL"); //sun
        document.getElementById("LXJH_CPHXQ").options[1].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("LXJH_CPHXQ").options[2].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("LXJH_CPHXQ").options[3].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("LXJH_CPHXQ").options[4].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("LXJH_CPHXQ").options[5].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("LXJH_CPHXQ").options[6].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("LXJH_CPHXQ").options[7].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun

        if (lgCls.version == gVar.CtArr[7]) {
            rec_alarm.innerHTML = "A-" + lg.get("IDS_RECPLAN_TYPE03"); //Alarm
            rec_normal.innerHTML = "N-" + lg.get("IDS_RECPLAN_TYPE02"); //Normal
            rec_motion.innerHTML = "M-" + lg.get("IDS_DEFAULT_MOTION"); //Motion
            rec_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01"); //No Record
        } else if (lgCls.version == gVar.CtArr[3]) {
            rec_alarm.innerHTML = lg.get("IDS_RECPLAN_TYPE03"); //Alarm
            rec_normal.innerHTML = lg.get("IDS_RECPLAN_TYPE02"); //Normal
            rec_motion.innerHTML = lg.get("IDS_DEFAULT_MOTION"); //Motion
            rec_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01"); //No Record
            LXJH_C7_N.innerHTML = "C";
        } else {
            rec_alarm.innerHTML = lg.get("IDS_RECPLAN_TYPE03"); //Alarm
            if (lgCls.version == gVar.CtArr[0]) {
                rec_normal.innerHTML = "Continuous";
            } else {
                rec_normal.innerHTML = lg.get("IDS_RECPLAN_TYPE02"); //Normal
            }
            if (gVar.bC0_0305_3120101) {
                rec_motion.innerHTML = (lg.get("IDS_DEFAULT_MOTION") + "/PIR");
            } else {
                rec_motion.innerHTML = lg.get("IDS_DEFAULT_MOTION"); //Motion
            }

            rec_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01"); //No Record
        }

        rec_pir.innerHTML = lg.get("IDS_RECTYPE_18");
        rec_copyCh.innerHTML = lg.get("IDS_REC_COPYCH");
        rec_copyDay.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");
        document.getElementById("LAB_CLEAL_ALL").value = lg.get("IDS_CLEANALL");

        COPY_WEEK_TO.innerHTML = lg.get("IDS_COPY_TO");
        COPY_CH_TO.innerHTML = lg.get("IDS_COPY_TO");
        RecplanSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        RecplanRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        RecplanDf.innerHTML = lg.get("IDS_DEFAULT");
        //smart_mode.innerHTML=lg.get("IDS_IPC_RECMODE");//rec mode
        //document.getElementById("SMARTMODE").options[0].innerHTML=lg.get("IDS_RECTYPE_01");//normal
        //document.getElementById("SMARTMODE").options[1].innerHTML=lg.get("IDS_IPC_RECSMART");//smart
        rec_norRes.innerHTML = lg.get("IDS_IPC_RECRESLUTION");
        rec_alamRes.innerHTML = lg.get("IDS_IPC_RECRESLUTION");

    } else if (pageName == "sysinf_base") {
        SysInfBaseRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        SysInfBaseRf_temp.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        SysInfBaseSave.innerHTML = lg.get("IDS_CRUISE_SAVE");//Save
        equipment_type.innerHTML = lg.get("IDS_SERVERINFO_DEVTYPE"); //
        equipment_DevID.innerHTML = lg.get("IDS_BASE_ID"); //
        equipment_DevID_EX.innerHTML = lg.get("IDS_BASE_ID"); //
        equipment_DevName.innerHTML = lg.get("IDS_BASE_DEVNAME");
        wifi_version_lable.innerHTML = lg.get("IDS_BASE_WIFI_VERSION");

        if (lgCls.version == gVar.CtArr[0]) { //
            software_ver.innerHTML = "Firmware Version";
        } else {
            software_ver.innerHTML = lg.get("IDS_BASE_SOFTVER"); //
        }

        panel_model_HDDVer.innerHTML = lg.get("IDS_BASE_HARDVER"); //
        panel_model_control.innerHTML = lg.get("IDS_BASE_PANELVER"); //
        info_IP.innerHTML = lg.get("IDS_NET_IPADDR");
        camera_mode.innerHTML = lg.get("IDS_BASE_TVSYSTEM"); //
        Info_Media.innerHTML = lg.get("IDS_CLIENTPORT");
        Info_Web.innerHTML = lg.get("IDS_NET_WEBPORT");
        Info_Mobile.innerHTML = lg.get("IDS_NET_PORT_MOB");
        info_HDDCAPACITY.innerHTML = lg.get("IDS_HDDCAPACITY");
        info_DDNSNAME.innerHTML = lg.get("IDS_DDNSNAME");
        info_MAC.innerHTML = lg.get("IDS_BASE_MAC");
        Info_AF.innerHTML = lg.get("IDS_NET_AFVERSION");

        P2PSwitch_label.innerHTML = lg.get("IDS_P2P_SWITCH");
        SysInfBaseSave_temp.innerHTML = lg.get("IDS_CRUISE_SAVE");

        if (lgCls.version == gVar.CtArr[161]) {
            panel_nvr_version.innerHTML = lg.get("IDS_PANELVERSION");
            panel_intell_version.innerHTML = lg.get("IDS_INTELLVERSION");
        }
    } else if (pageName == "sysinf_hdd") {
        SysInfoHddSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        SysInfoHddRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        //hdd_message_list.innerHTML=lg.get("IDS_HARD_M_LIST");//
        serial_number_hdd.innerHTML = lg.get("IDS_HDDS_INDEX"); //
        state.innerHTML = lg.get("IDS_STATE"); //
        content_GB.innerHTML = lg.get("IDS_CONTENT_GB"); //
        ramain_time.innerHTML = lg.get("IDS_REMAIN_TIME"); //

        shd_over.innerHTML = lg.get("IDS_OVERWRIETE"); //Overwrite
        FormatTitle.innerHTML = lg.get("IDS_FORMAT_DISK");
        document.getElementById("IPCbtn").value = lg.get("IDS_HDDFORMAT");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[92]) {
            document.getElementById("NVRbtn").value = "SD Card Format";
        } else {
            document.getElementById("NVRbtn").value = lg.get("IDS_HDDFORMAT");
        }

        ipc_chid.innerHTML = lg.get("IDS_OSD_NAME");
        disk_no.innerHTML = lg.get("IDS_HDDS_INDEX");
        nvr_nodisk.innerHTML = lg.get("IDS_NO_HDD");
        document.getElementById("HddOverWrite").options[0].innerHTML = lg.get("IDS_OVERWRITE_CLOSE"); //Disable
        document.getElementById("HddOverWrite").options[1].innerHTML = lg.get("IDS_OVERWRITE_AUTO"); //Auto
        ESataRec.innerHTML = lg.get("IDS_ESATAREC");
    } else if (pageName == "syspm_dst") {
        SysDstSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        SysDstRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        system_time.innerHTML = lg.get("IDS_DST_TIME"); //
        sys_Date.innerHTML = lg.get("IDS_SYS_DATE"); //
        sys_Time.innerHTML = lg.get("IDS_TIME"); //
        document.getElementById("SynComputer").value = lg.get("IDS_IN_PHASE"); //
        show_wizard.innerHTML = lg.get("IDS_DST_SHOWWIZARD");
        dst_vgaresolution_lg.innerHTML = lg.get("IDS_RESOLUTION");
        time_format.innerHTML = lg.get("IDS_DST_TIMEMODE"); //
        document.getElementById("SysDstDateMode").options[0].innerHTML = lg.get("IDS_DST_TIMEMODE01"); //
        document.getElementById("SysDstDateMode").options[1].innerHTML = lg.get("IDS_DST_TIMEMODE02"); //
        document.getElementById("SysDstDateMode").options[2].innerHTML = lg.get("IDS_DST_TIMEMODE03"); //
        date_format.innerHTML = lg.get("IDS_DST_DATEMODE"); //
        document.getElementById("SysDstTimeMode").options[0].innerHTML = lg.get("IDS_DST_DATEMODE01"); //
        document.getElementById("SysDstTimeMode").options[1].innerHTML = lg.get("IDS_DST_DATEMODE02"); //
        Dst.innerHTML = lg.get("IDS_DST_DST");
        daylight_saving_time.innerHTML = lg.get("IDS_DST_DSTMODE"); //
        document.getElementById("SysDstMode").options[0].innerHTML = lg.get("IDS_DST_DSTMODE01"); //
        document.getElementById("SysDstMode").options[1].innerHTML = lg.get("IDS_DST_DSTMODE02"); //
        py_zc_time_value.innerHTML = lg.get("IDS_DST_OFFSET"); //
        document.getElementById("SysDstOffset").options[0].innerHTML = lg.get("IDS_DST_OFFSET01"); //0-1 hour
        document.getElementById("SysDstOffset").options[1].innerHTML = lg.get("IDS_DST_OFFSET02"); //1-2 hour
        starup_time.innerHTML = lg.get("IDS_DST_STARTWEEKDAY"); //
        document.getElementById("DstStartMonth").options[0].innerHTML = lg.get("IDS_DST_MONTH01"); //1
        document.getElementById("DstStartMonth").options[1].innerHTML = lg.get("IDS_DST_MONTH02"); //2
        document.getElementById("DstStartMonth").options[2].innerHTML = lg.get("IDS_DST_MONTH03"); //3
        document.getElementById("DstStartMonth").options[3].innerHTML = lg.get("IDS_DST_MONTH04"); //4
        document.getElementById("DstStartMonth").options[4].innerHTML = lg.get("IDS_DST_MONTH05"); //5
        document.getElementById("DstStartMonth").options[5].innerHTML = lg.get("IDS_DST_MONTH06"); //6
        document.getElementById("DstStartMonth").options[6].innerHTML = lg.get("IDS_DST_MONTH07"); //7
        document.getElementById("DstStartMonth").options[7].innerHTML = lg.get("IDS_DST_MONTH08"); //8
        document.getElementById("DstStartMonth").options[8].innerHTML = lg.get("IDS_DST_MONTH09"); //9
        document.getElementById("DstStartMonth").options[9].innerHTML = lg.get("IDS_DST_MONTH10"); //10
        document.getElementById("DstStartMonth").options[10].innerHTML = lg.get("IDS_DST_MONTH11"); //11
        document.getElementById("DstStartMonth").options[11].innerHTML = lg.get("IDS_DST_MONTH12"); //12
        document.getElementById("DstStartWeek").options[0].innerHTML = lg.get("IDS_DST_WEEK01"); //
        document.getElementById("DstStartWeek").options[1].innerHTML = lg.get("IDS_DST_WEEK02"); //
        document.getElementById("DstStartWeek").options[2].innerHTML = lg.get("IDS_DST_WEEK03"); //
        document.getElementById("DstStartWeek").options[3].innerHTML = lg.get("IDS_DST_WEEK04"); //
        document.getElementById("DstStartWeek").options[4].innerHTML = lg.get("IDS_DST_WEEK05"); //
        document.getElementById("DstStartWeekDay").options[0].innerHTML = lg.get("IDS_WEEKDAY_01"); //
        document.getElementById("DstStartWeekDay").options[1].innerHTML = lg.get("IDS_WEEKDAY_02"); //
        document.getElementById("DstStartWeekDay").options[2].innerHTML = lg.get("IDS_WEEKDAY_03"); //
        document.getElementById("DstStartWeekDay").options[3].innerHTML = lg.get("IDS_WEEKDAY_04"); //
        document.getElementById("DstStartWeekDay").options[4].innerHTML = lg.get("IDS_WEEKDAY_05"); //
        document.getElementById("DstStartWeekDay").options[5].innerHTML = lg.get("IDS_WEEKDAY_06"); //
        document.getElementById("DstStartWeekDay").options[6].innerHTML = lg.get("IDS_WEEKDAY_07"); //
        sdt_stop_time.innerHTML = lg.get("IDS_DST_ENDWEEKDAY"); //
        document.getElementById("DstEndMonth").options[0].innerHTML = lg.get("IDS_DST_MONTH01"); //1
        document.getElementById("DstEndMonth").options[1].innerHTML = lg.get("IDS_DST_MONTH02"); //2
        document.getElementById("DstEndMonth").options[2].innerHTML = lg.get("IDS_DST_MONTH03"); //3
        document.getElementById("DstEndMonth").options[3].innerHTML = lg.get("IDS_DST_MONTH04"); //4
        document.getElementById("DstEndMonth").options[4].innerHTML = lg.get("IDS_DST_MONTH05"); //5
        document.getElementById("DstEndMonth").options[5].innerHTML = lg.get("IDS_DST_MONTH06"); //6
        document.getElementById("DstEndMonth").options[6].innerHTML = lg.get("IDS_DST_MONTH07"); //7
        document.getElementById("DstEndMonth").options[7].innerHTML = lg.get("IDS_DST_MONTH08"); //8
        document.getElementById("DstEndMonth").options[8].innerHTML = lg.get("IDS_DST_MONTH09"); //9
        document.getElementById("DstEndMonth").options[9].innerHTML = lg.get("IDS_DST_MONTH10"); //10
        document.getElementById("DstEndMonth").options[10].innerHTML = lg.get("IDS_DST_MONTH11"); //11
        document.getElementById("DstEndMonth").options[11].innerHTML = lg.get("IDS_DST_MONTH12"); //12
        document.getElementById("DstEndWeek").options[0].innerHTML = lg.get("IDS_DST_WEEK01"); //
        document.getElementById("DstEndWeek").options[1].innerHTML = lg.get("IDS_DST_WEEK02"); //
        document.getElementById("DstEndWeek").options[2].innerHTML = lg.get("IDS_DST_WEEK03"); //
        document.getElementById("DstEndWeek").options[3].innerHTML = lg.get("IDS_DST_WEEK04"); //
        document.getElementById("DstEndWeek").options[4].innerHTML = lg.get("IDS_DST_WEEK05"); //
        document.getElementById("DstEndWeekDay").options[0].innerHTML = lg.get("IDS_WEEKDAY_01"); //
        document.getElementById("DstEndWeekDay").options[1].innerHTML = lg.get("IDS_WEEKDAY_02"); //
        document.getElementById("DstEndWeekDay").options[2].innerHTML = lg.get("IDS_WEEKDAY_03"); //
        document.getElementById("DstEndWeekDay").options[3].innerHTML = lg.get("IDS_WEEKDAY_04"); //
        document.getElementById("DstEndWeekDay").options[4].innerHTML = lg.get("IDS_WEEKDAY_05"); //
        document.getElementById("DstEndWeekDay").options[5].innerHTML = lg.get("IDS_WEEKDAY_06"); //
        document.getElementById("DstEndWeekDay").options[6].innerHTML = lg.get("IDS_WEEKDAY_07"); //
        startup_time_1.innerHTML = lg.get("IDS_DST_BEGINTIME"); //
        End_time_1.innerHTML = lg.get("IDS_DST_ENDTIME"); //
        SYS_LANGUAGE.innerHTML = lg.get("IDS_LANGUAGE");
        VIDEO_FORMAT.innerHTML = lg.get("IDS_VIDEOFORMAT");
        AUTOLOGOUT.innerHTML = lg.get("IDS_AUTOLOGOUT");

        var temp;
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (lgCls.version == gVar.CtArr[0]) {
                temp = lg.get("IDS_SECOND");
                document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30s
                temp = lg.get("IDS_MINUTE");
                document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1Min
                document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2Min
                document.getElementById("DSTAutoLogout").options[3].innerHTML = "3" + temp; //3Min
                document.getElementById("DSTAutoLogout").options[4].innerHTML = "5" + temp; //5Min
                document.getElementById("DSTAutoLogout").options[5].innerHTML = "10" + temp; //10Min
                $("#DSTAutoLogout").append('<option value="6">' + lg.get("IDS_OFF") + '</option>');
            } else if (lgCls.version == gVar.CtArr[62]) {
                temp = lg.get("IDS_SECOND");
                document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30
                temp = lg.get("IDS_MINUTE");
                document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1M
                document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2M
                document.getElementById("DSTAutoLogout").options[3].innerHTML = "5" + temp; //5M
                document.getElementById("DSTAutoLogout").options[4].innerHTML = "10" + temp; //10M
                document.getElementById("DSTAutoLogout").options[5].innerHTML = "30" + temp;
                $("#DSTAutoLogout").append('<option value="6">60' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="7">' + lg.get("IDS_OFF") + '</option>');
            } else if (lgCls.version == gVar.CtArr[70]) {
                temp = lg.get("IDS_MINUTE");
                document.getElementById("DSTAutoLogout").options[0].innerHTML = "1" + temp; //1M
                document.getElementById("DSTAutoLogout").options[1].innerHTML = "2" + temp; //2M
                document.getElementById("DSTAutoLogout").options[2].innerHTML = "5" + temp; //5M
                document.getElementById("DSTAutoLogout").options[3].innerHTML = "10" + temp; //10M
                document.getElementById("DSTAutoLogout").options[4].innerHTML = lg.get("IDS_OFF");//
                $("#DSTAutoLogout option[value='5']").remove();
            } else if (lgCls.version == gVar.CtArr[142]) {
                $("#DSTAutoLogout").empty();
                temp = lg.get("IDS_SECOND");
                $("#DSTAutoLogout").append('<option value="0">5' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="1">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#DSTAutoLogout").append('<option value="2">1' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="3">2' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="4">5' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="5">10' + temp + '</option>');
                $("#DSTAutoLogout").append('<option value="6">' + lg.get("IDS_OFF") + '</option>');
            } else {
                temp = lg.get("IDS_SECOND");
                document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30
                temp = lg.get("IDS_MINUTE");
                document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1M
                document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2M
                document.getElementById("DSTAutoLogout").options[3].innerHTML = "5" + temp; //5M
                document.getElementById("DSTAutoLogout").options[4].innerHTML = "10" + temp; //10M
                document.getElementById("DSTAutoLogout").options[5].innerHTML = lg.get("IDS_OFF"); //
            }
        } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
            if (lgCls.version == gVar.CtArr[0]) {
                temp = lg.get("IDS_SECOND");
                document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30s
                temp = lg.get("IDS_MINUTE");
                document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1Min
                document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2Min
                document.getElementById("DSTAutoLogout").options[3].innerHTML = "3" + temp; //3Min
                document.getElementById("DSTAutoLogout").options[4].innerHTML = "5" + temp; //5Min
                document.getElementById("DSTAutoLogout").options[5].innerHTML = "10" + temp; //10Min
                $("#DSTAutoLogout").append('<option value="6">' + lg.get("IDS_OFF") + '</option>');
            } else {
                if (lgCls.version == gVar.CtArr[62]) {
                    temp = lg.get("IDS_SECOND");
                    document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30
                    temp = lg.get("IDS_MINUTE");
                    document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1M
                    document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2M
                    document.getElementById("DSTAutoLogout").options[3].innerHTML = "5" + temp; //5M
                    document.getElementById("DSTAutoLogout").options[4].innerHTML = "10" + temp; //10M
                    document.getElementById("DSTAutoLogout").options[5].innerHTML = "30" + temp;
                    $("#DSTAutoLogout").append('<option value="6">60' + temp + '</option>');
                    $("#DSTAutoLogout").append('<option value="7">' + lg.get("IDS_OFF") + '</option>');
                } else if (lgCls.version == gVar.CtArr[7]) {
                    temp = lg.get("IDS_SECOND");
                    document.getElementById("DSTAutoLogout").options[5].innerHTML = lg.get("IDS_OFF"); //
                    document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30
                    temp = lg.get("IDS_MINUTE");
                    document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1M
                    document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2M
                    document.getElementById("DSTAutoLogout").options[3].innerHTML = "5" + temp; //5M
                    document.getElementById("DSTAutoLogout").options[4].innerHTML = "10" + temp; //10M
                } else {
                    temp = lg.get("IDS_SECOND");
                    document.getElementById("DSTAutoLogout").options[0].innerHTML = lg.get("IDS_OFF"); //
                    document.getElementById("DSTAutoLogout").options[1].innerHTML = "30" + temp; //30
                    temp = lg.get("IDS_MINUTE");
                    document.getElementById("DSTAutoLogout").options[2].innerHTML = "1" + temp; //1M
                    document.getElementById("DSTAutoLogout").options[3].innerHTML = "2" + temp; //2M
                    document.getElementById("DSTAutoLogout").options[4].innerHTML = "5" + temp; //5M
                    document.getElementById("DSTAutoLogout").options[5].innerHTML = "10" + temp; //10M
                }
            }
        } else {
            temp = lg.get("IDS_SECOND");
            document.getElementById("DSTAutoLogout").options[0].innerHTML = lg.get("IDS_OFF"); //
            document.getElementById("DSTAutoLogout").options[1].innerHTML = "30" + temp; //30
            temp = lg.get("IDS_MINUTE");
            document.getElementById("DSTAutoLogout").options[2].innerHTML = "1" + temp; //1M
            document.getElementById("DSTAutoLogout").options[3].innerHTML = "2" + temp; //2M
            document.getElementById("DSTAutoLogout").options[4].innerHTML = "5" + temp; //5M
            document.getElementById("DSTAutoLogout").options[5].innerHTML = "10" + temp; //10M
        }
        if (gVar.bNormal_0305_2120105) {
            temp = lg.get("IDS_SECOND");
            document.getElementById("DSTAutoLogout").options[0].innerHTML = "30" + temp; //30
            temp = lg.get("IDS_MINUTE");
            document.getElementById("DSTAutoLogout").options[1].innerHTML = "1" + temp; //1M
            document.getElementById("DSTAutoLogout").options[2].innerHTML = "2" + temp; //2M
            document.getElementById("DSTAutoLogout").options[3].innerHTML = "5" + temp; //5M
            document.getElementById("DSTAutoLogout").options[4].innerHTML = "10" + temp; //10M
            document.getElementById("DSTAutoLogout").options[5].innerHTML = lg.get("IDS_OFF"); //
        }

        NTP_startup.innerHTML = lg.get("IDS_NTP_ENABLE"); //
        nnp_server_address.innerHTML = lg.get("IDS_NTP_ADDRESS"); //
        var str = lg.get("IDS_NTP_TIMEZONE"); //
        nnp_GMT1.innerHTML = str;
        nnp_GMT2.innerHTML = str;
        SynComputer.innerHTML = lg.get("IDS_IN_PHASE"); //
        dst_NtpServAddr_lg.innerHTML = lg.get("IDS_NTP_DEFSER");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[166]) {
            nnp_SyncPeriod.innerHTML = lg.get("IDS_NTP_INTERVAL");
        }
        temp = lg.get("IDS_HOUR");
        document.getElementById("nnp_SyncPeriodSel").options[0].innerHTML = "1" + temp; //1M
        document.getElementById("nnp_SyncPeriodSel").options[1].innerHTML = "6" + temp; //2M
        document.getElementById("nnp_SyncPeriodSel").options[2].innerHTML = "12" + temp; //5M
        document.getElementById("nnp_SyncPeriodSel").options[3].innerHTML = "24" + temp; //10M
    } else if (pageName == "syspm_io") {
        si_save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        si_refresh.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        agreement_type.innerHTML = lg.get("IDS_PTZ_PROTOCOL"); //
        document.getElementById("Protocol").options[0].innerHTML = "Pelco_D" //lg.get("");//Pelco_D
        document.getElementById("Protocol").options[1].innerHTML = "Pelco_P" //lg.get("");//Pelco_P
        baud_ratio.innerHTML = lg.get("IDS_PTZ_BAUDRATE"); //

        data_bit.innerHTML = lg.get("IDS_PTZ_DATABIT"); //

        temp = lg.get("IDS_SERIAL_BIT");
        document.getElementById("DataBit").options[0].innerHTML = "8" + temp; //8
        document.getElementById("DataBit").options[1].innerHTML = "7" + temp; //7
        document.getElementById("DataBit").options[2].innerHTML = "6" + temp; //6
        document.getElementById("DataBit").options[3].innerHTML = "5" + temp; //5
        stop_bit.innerHTML = lg.get("IDS_PTZ_STOPBIT"); //
        document.getElementById("StopBit").options[0].innerHTML = "1" + temp; //1
        document.getElementById("StopBit").options[1].innerHTML = "2" + temp; //2
        sio_check_1.innerHTML = lg.get("IDS_PTZ_CHECK"); //
        document.getElementById("Check").options[0].innerHTML = lg.get("IDS_CHECKBIT_NONE"); //
        document.getElementById("Check").options[1].innerHTML = lg.get("IDS_CHECKBIT_ODD"); //
        document.getElementById("Check").options[2].innerHTML = lg.get("IDS_CHECKBIT_EVEN"); //
        document.getElementById("Check").options[3].innerHTML = lg.get("IDS_CHECKBIT_MARK"); //
        document.getElementById("Check").options[4].innerHTML = lg.get("IDS_CHECKBIT_SPACE");
    } else if (pageName == "syspm_user") {
        USUsSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        USUsRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NO.innerHTML = lg.get("IDS_PRESET_INDEX"); //NO.
        user_name.innerHTML = lg.get("IDS_USERNAME"); //User Name
        type.innerHTML = lg.get("IDS_USER_USEPSE"); //Type
        temp = lg.get("IDS_USER_USE");
        active_2.innerHTML = temp; //ACTIVE
        uesr_name_1.innerHTML = lg.get("IDS_USERNAME"); //User Name:
        passwd.innerHTML = lg.get("IDS_LOGIN_PSW"); //Password
        confirm_1.innerHTML = lg.get("IDS_CONFIRM"); //Confirm
        active_1_1.innerHTML = temp; //ACTIVE;
        if (gVar.bC0_0305_3120101) {
            user_ck1_0.innerHTML = "Log";
            user_ck1_4.innerHTML = "Disk Management";
        } else {
            user_ck1_0.innerHTML = lg.get("IDS_LOOKUP_LOG");
            user_ck1_4.innerHTML = lg.get("IDS_HDD_MANGUAGE");
        }
        user_ck1_1.innerHTML = lg.get("IDS_USER_SET");
        user_ck1_2.innerHTML = lg.get("IDS_SYS_MAINTE");
        // user_ck1_3.innerHTML = lg.get("IDS_CRUIS_CTRL");
        user_ck1_5.innerHTML = lg.get("IDS_LOGIN");
        user_ck1_6.innerHTML = lg.get("IDS_POLL_CTRL");
        if (gVar.lg == "RUS") {
            user_ck1_8.innerHTML = "Захват вручную";
        } else {
            user_ck1_8.innerHTML = lg.get("IDS_MANUAL_CAPTURE");
        }
        user_ck1_7.innerHTML = lg.get("IDS_RECCONFIG_MODE03");
        UserBackup_1.innerHTML = lg.get("IDS_BACKUP");
        if (lgCls.version == gVar.CtArr[137] && gVar.lg == "RUS") {
            UserPreview_1.innerHTML = "Просмотр";
        } else if (lgCls.version == gVar.CtArr[3]) {
            UserPreview_1.innerHTML = lg.get("IDS_LIVE_PERMISSION");
        } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[116]) {
            UserPreview_1.innerHTML = "Live View";
        } else {
            UserPreview_1.innerHTML = lg.get("IDS_LIVE_PAGE");
        }

        UserPlayBack_1.innerHTML = lg.get("IDS_REPLAY");
        UserPtzControl_1.innerHTML = lg.get("IDS_PTZ_CTRL");
        pws_enable.innerHTML = lg.get("IDS_USER_USEPSE"); //lg.get("");//Pws Enable
        usleve.innerHTML = lg.get("IDS_REDUCT_V");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[87]) {
            user_info_private.innerHTML = lg.get("IDS_USERINFO_PRIVATE");
            user_info_onvif.innerHTML = lg.get("IDS_USERINFO_ONVIF");
            document.getElementById("user_onvif_setSel").options[0].innerHTML = lg.get("IDS_ONVIF_ADMIN"); //
            document.getElementById("user_onvif_setSel").options[1].innerHTML = lg.get("IDS_ONVIF_OPERATOR"); //
            document.getElementById("user_onvif_setSel").options[2].innerHTML = lg.get("IDS_ONVIF_LIVEUSER"); //
        }

    } else if (pageName == "syswh_mr") {
        DefaultDisplay.innerHTML = lg.get("IDS_DISPLAY_PARAM");
        if (gVar.bC0_0305_3120101) {
            DefaultRecord.innerHTML = "Recording";
        } else {
            DefaultRecord.innerHTML = lg.get("IDS_CHINFO_RECORD");
        }
        DefaultNetwork.innerHTML = lg.get("IDS_NET_PARAM");
        DefaultAlarm.innerHTML = lg.get("IDS_ALARM_PARAM");
        DefaultDevice.innerHTML = lg.get("IDS_DEVICE");
        DefaultSystem.innerHTML = lg.get("IDS_SYS_PARAM");
        DefaultAdvance.innerHTML = lg.get("IDS_ADVANCE");
        DefaultIntelligent.innerHTML = lg.get("IDS_INTELLIGENT");
        IPCDefaultSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        DefaultSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        networkRadioExcept.innerHTML = lg.get("IDS_NET_EXCEPT");
        networkRadioAll.innerHTML = lg.get("IDS_NET_ALL");
        SimpleDefault.innerHTML = lg.get("IDS_SIMPLE_DEFAULT");
        AllDefault.innerHTML = lg.get("IDS_NET_ALL");
        AllIPCSel.innerHTML = lg.get("IDS_NET_ALL");
    } else if (pageName == "syswh_sj") {
        upgrade_file_path.innerHTML = lg.get("IDS_UPDATE_PATH"); //
        //upgrade_state.innerHTML=lg.get("IDS_UPDATE_UPDATE");//
        // document.getElementById("UPStart").value=lg.get("IDS_UPDATE_START"); //
        UPStart.innerHTML = lg.get("IDS_UPDATE_START"); //
        UPStop.innerHTML = lg.get("IDS_UPDATE_STOP");
        //document.getElementById("btnSj").value=lg.get("IDS_SCAN"); //
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[204] && gVar.lg == "ENU") {
            btnSj.innerHTML = "Browse";
            updateWarming.innerHTML = "Do not close your browser or turn off the device when upgrading !!!";
        }else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[1] && gVar.lg == "RUS") {
            btnSj.innerHTML = "Выбрать";
            updateWarming.innerHTML = lg.get("IDS_UPDATE_WARMING");
        } else {
            btnSj.innerHTML = lg.get("IDS_SCAN");
            updateWarming.innerHTML = lg.get("IDS_UPDATE_WARMING");
        }
        //
        ipc_btnSj.innerHTML = lg.get("IDS_SCAN"); //

        if (lgCls.version == gVar.CtArr[161]) {
            platUpdate_path.innerHTML = lg.get("IDS_INTELL_UPDATE_PATH");
            plat_scan.innerHTML = lg.get("IDS_SCAN");
            plat_start.innerHTML = lg.get("IDS_INTELL_UPDATE_START");
        }
    } else if (pageName == "auto_wh") {
        AUTOWHRF.innerHTML = lg.get("IDS_REFRESH");
        AUTOWHSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        auto_vindicate.innerHTML = lg.get("IDS_BASE_AUTOREBOOT"); //

        SysMainRbUser.innerHTML = lg.get("IDS_SELECT_USER");
        document.getElementById("SysMainUserSwitch").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("SysMainUserSwitch").options[1].innerHTML = lg.get("IDS_ADMIN"); //admin

        SysMainReboot.innerHTML = lg.get("IDS_REBOOT"); //
        document.getElementById("btn_reboot_ok").value = lg.get("IDS_REBOOT_OK");
        document.getElementById("btn_reboot_cancle").value = lg.get("IDS_REBOOT_CANCLE");
        document.getElementById("RemoteReboot").value = lg.get("IDS_REBOOT"); //
        RemoteReboot.innerHTML = lg.get("IDS_REBOOT"); //
        IPCAUTOWH.innerHTML = lg.get("IDS_REBOOTIPC"); //
        //document.getElementById("SysInfautomaintain").options[0].innerHTML=lg.get("IDS_DISABLE");//Disable
        //document.getElementById("SysInfautomaintain").options[1].innerHTML=lg.get("IDS_ENABLE");//Enable
        //vindicate_time.innerHTML=lg.get("IDS_BASE_MAINTITIME");//
        document.getElementById("SysInfmaintainperiod1").options[0].innerHTML = lg.get("IDS_EVERY_DAY"); //
        document.getElementById("SysInfmaintainperiod1").options[1].innerHTML = lg.get("IDS_EVERY_WEEK"); //
        document.getElementById("SysInfmaintainperiod1").options[2].innerHTML = lg.get("IDS_EVERY_MONTH"); //

        auto_timer_Txt.innerHTML = lg.get("IDS_TIME");

    } else if (pageName == "plat_set") {
        PlatRF.innerHTML = lg.get("IDS_REFRESH");
        PlatSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        NMPlat_Enable.innerHTML = lg.get("IDS_ENABLE_PLATFORM");
        NMPlat_Address.innerHTML = lg.get("IDS_PLATFORM_IP");
        NMPlat_Port.innerHTML = lg.get("IDS_PLATFORM_PORT");
        NMPlat_Select.innerHTML = lg.get("IDS_PLATFORM_SEL");
        document.getElementById("SLPlat_Select").options[0].innerHTML = lg.get("IDS_PLATFORM_TYPE_1");
        NMPlat_Protocol.innerHTML = lg.get("IDS_PLATFORM_PROTOCOL");
        document.getElementById("SLPlat_Protocol").options[0].innerHTML = lg.get("IDS_PLATFORM_UDP");
        document.getElementById("SLPlat_Protocol").options[1].innerHTML = lg.get("IDS_PLATFORM_TCP");
        NMPlat_Puid.innerHTML = lg.get("IDS_PLATFORM_PUID");

    } else if (pageName == "netinf_3G") {
        NetInf3GRf.innerHTML = lg.get("IDS_REFRESH");
        NetInf3G_ID_Level.innerHTML = lg.get("IDS_3GLEVEL");
        NetInf3G_ID_Type.innerHTML = lg.get("IDS_3GTYPE");
        NetInf3G_ID_IPAddress.innerHTML = lg.get("IDS_3GIPADDRESS");

    } else if (pageName == "router_lan") {
        LanRf.innerHTML = lg.get("IDS_REFRESH");
        LanSave.innerHTML = lg.get("IDS_CRUISE_SAVE");

        //Lan_option.innerHTML = lg.get("IDS_OPTION");//option
        rounter_lanconfig.innerHTML = lg.get("IDS_ROUTER_LAN"); //Lan
        document.getElementById("lan_mode_select").options[0].innerHTML = lg.get("IDS_ROUTER_NVR"); //nvr
        document.getElementById("lan_mode_select").options[1].innerHTML = lg.get("IDS_ROUTER_ROUTER"); //router
        lan_ip_address.innerHTML = lg.get("IDS_NET_IPADDR"); //
        lan_subnet_mask.innerHTML = lg.get("IDS_NET_MASK"); //
        //Wifi_type.innerHTML = lg.get("IDS_WIFI_TYPE");//TYPE
        document.getElementById("wifi_type_select").options[0].innerHTML = lg.get("IDS_DISABLE"); //DISABLE
        document.getElementById("wifi_type_select").options[1].innerHTML = lg.get("IDS_WIFI_NET"); //wpa2-psk
        lan_ssid.innerHTML = lg.get("IDS_WIFI_SSID"); //ssid
        lan_psd.innerHTML = lg.get("IDS_WIFI_PSD"); //PSD

        nvrnet_mode.innerHTML = lg.get("IDS_ONLINE_MODE"); //
        document.getElementById("NVRNetworkMode").options[0].innerHTML = lg.get("IDS_NET_MODE01"); //DHCP
        document.getElementById("NVRNetworkMode").options[1].innerHTML = lg.get("IDS_NET_MODE03"); //static

        nvr_pnp.innerHTML = lg.get("IDS_NET_UPNP"); //PNP
        document.getElementById("nvr_UseUPNP").options[0].innerHTML = lg.get("IDS_DISABLE"); //
        document.getElementById("nvr_UseUPNP").options[1].innerHTML = lg.get("IDS_ENABLE"); //

        //Wifi_Channel.innerHTML=lg.get("IDS_LAN_CHNNEL");//
        nvr_ip_address.innerHTML = lg.get("IDS_NET_IPADDR"); //
        nvr_subnet_mask.innerHTML = lg.get("IDS_NET_MASK"); //
        nvr_nbe_default_gateway.innerHTML = lg.get("IDS_NET_GATEWAY"); //
        nvr_first_DNS.innerHTML = lg.get("IDS_FIRST_DNS"); //
        nvr_standy_DNS.innerHTML = lg.get("IDS_SECOND_DNS"); //
        nvr_media_port.innerHTML = lg.get("IDS_NEW_MEDIAPORT"); //
        nvr_nbe_web_port.innerHTML = lg.get("IDS_NET_WEBPORT"); //
        nvr_nbe_Mobile_port.innerHTML = lg.get("IDS_NET_PORT_MOB"); //

    } else if (pageName == "router_wan") {
        //WanRf.innerHTML=lg.get("IDS_REFRESH");
        //WanSave.innerHTML=lg.get("IDS_CRUISE_SAVE");
        //rounter_wanconfig.innerHTML=lg.get("IDS_ROUTER_WAN");

        //Wan_mode.innerHTML=lg.get("IDS_ONLINE_MODE");//
        document.getElementById("Wan_mode_select").options[0].innerHTML = lg.get("IDS_NET_MODE02"); //PPPoE
        document.getElementById("Wan_mode_select").options[1].innerHTML = lg.get("IDS_NET_MODE03"); //Static
        document.getElementById("Wan_mode_select").options[2].innerHTML = lg.get("IDS_NET_MODE01"); //DHCP

        wan_usename.innerHTML = lg.get("IDS_LOGIN_NAME"); //
        wan_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //　
        wan_ip_address.innerHTML = lg.get("IDS_NET_IPADDR"); //
        wan_subnet_mask.innerHTML = lg.get("IDS_NET_MASK"); //
        wan_default_gateway.innerHTML = lg.get("IDS_NET_GATEWAY"); //
        wan_first_DNS.innerHTML = lg.get("IDS_FIRST_DNS"); //
        wan_standy_DNS.innerHTML = lg.get("IDS_SECOND_DNS"); //
    } else if (pageName == "IPC_wifiset") {

        //wifiRf.innerHTML=lg.get("IDS_REFRESH");
        wifiSave.innerHTML = lg.get("IDS_CRUISE_SAVE");
        //IPC_wifisetconfig.innerHTML=lg.get("IDS_WIFI_SET");

        wifi_Enable.innerHTML = lg.get("IDS_WIFI_WIFI"); //wifi
        document.getElementById("wifi_Enable_select").options[0].innerHTML = lg.get("IDS_DISABLE"); //Disable
        document.getElementById("wifi_Enable_select").options[1].innerHTML = lg.get("IDS_ENABLE"); //Enable

        WiFi_Encryption_type.innerHTML = lg.get("IDS_WIFI_KEYMODE");
        wifi_ssid.innerHTML = lg.get("IDS_WIFI_SSID"); //ssid
        WiFi_Key_type.innerHTML = lg.get("IDS_WIFI_PSD"); //PSD
        WiFi_Security_type.innerHTML = lg.get("IDS_WIFI_TYPE"); //

    } else if (pageName == "IPCan_set") {
        IPCanRf.innerHTML = lg.get("IDS_REFRESH");
        IPCanSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        ipcan_info.innerHTML = lg.get("IDS_IPC_SET");
        IPCSetIP.innerHTML = lg.get("IDS_IPC_SETIP");
        IPCAdd.innerHTML = lg.get("IDS_IPC_ADD");
        IPCDelete.innerHTML = lg.get("IDS_MOTION_DELETE");
        IPCanSet.innerHTML = lg.get("IDS_SAFARI_SET");
        IPCanExit.innerHTML = lg.get("IDS_EXIT");
        IPCAddAll.innerHTML = lg.get("IDS_ADDALL");

        IPC_NO.innerHTML = lg.get("IDS_HDDS_INDEX");
        IPC_name.innerHTML = lg.get("IDS_OSD_NAME"); //
        IPC_IP.innerHTML = lg.get("IDS_IPADDRESS");
        IPC_PORT.innerHTML = lg.get("IDS_NEW_MEDIAPORT");
        IPC_STATE.innerHTML = lg.get("IDS_STATE");

        NO_SEARCH.innerHTML = lg.get("IDS_HDDS_INDEX");
        chn_num.innerHTML = lg.get("IDS_IPC_NUM"); //
        IP_SEARCH.innerHTML = lg.get("IDS_IPADDRESS");
        PORT_SEARCH.innerHTML = lg.get("IDS_NEW_MEDIAPORT");
        DEV_TYPE.innerHTML = lg.get("IDS_SERVERINFO_DEVTYPE");

        ipc_chlIndex.innerHTML = lg.get("IDS_MOTION_CH");
        ipc_name.innerHTML = lg.get("IDS_OSD_NAME");
        ipc_address.innerHTML = lg.get("IDS_IPADDRESS");
        ipc_media_port.innerHTML = lg.get("IDS_NEW_MEDIAPORT"); //
        ipc_channel_num.innerHTML = lg.get("IDS_IPC_DEVCH");
        ipc_usename.innerHTML = lg.get("IDS_USERNAME"); //
        ipc_passwd.innerHTML = lg.get("IDS_SERVERINFO_PSW"); //
        ipc_macaddr.innerHTML = lg.get("IDS_BASE_MAC");

        ipc_subnet_mask.innerHTML = lg.get("IDS_NET_MASK");
        ipc_net_address.innerHTML = lg.get("IDS_IPADDRESS");
        IPCNET_media_port.innerHTML = lg.get("IDS_NEW_MEDIAPORT"); //
        IPCNET_web_port.innerHTML = lg.get("IDS_NET_WEBPORT"); //
        ipc_default_gateway.innerHTML = lg.get("IDS_NET_GATEWAY");
        ipc_first_DNS.innerHTML = lg.get("IDS_FIRST_DNS");
        ipc_standy_DNS.innerHTML = lg.get("IDS_SECOND_DNS");

    } else if (pageName == "IP_Filter") {
        IPFilterRf.innerHTML = lg.get("IDS_REFRESH");
        IPFilterSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        FilterSwitch.innerHTML = lg.get("IDS_FILTER_SWITCH");
        IPFilterAdd.innerHTML = lg.get("IDS_IP_ADD");
        IPFilterDel.innerHTML = lg.get("IDS_DEl_IP");
        IPFilterNO.innnerHTML = lg.get("IDS_HDDS_INDEX");
        IPFilterAddr.innerHTML = lg.get("IDS_NET_IPADDR");
        IPFilterEnable.innerHTML = lg.get("IDS_ENABLE");
        document.getElementById("IPFilterSwitch").options[0].innerHTML = lg.get("IDS_IGNORE_IP");
        document.getElementById("IPFilterSwitch").options[1].innerHTML = lg.get("IDS_SET_IP");
        document.getElementById("IPFilterSwitch").options[2].innerHTML = lg.get("IDS_BAN_SETIP");

    } else if (pageName == "RTSP_Set") {
        RTSPRf.innerHTML = lg.get("IDS_REFRESH");
        RTSPSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        Rtsp_Enable.innerHTML = lg.get("IDS_RTSP_ENABLE");
        Rtsp_Port.innerHTML = lg.get("IDS_RTSP_PORT");
        RTSPMode.innerHTML = lg.get("IDS_RTSP_MODE");

        if (lgCls.version == gVar.CtArr[7]) {
            RTSPUserName.innerHTML = lg.get("IDS_RTSP_NAME");
        } else {
            RTSPUserName.innerHTML = lg.get("IDS_LOGIN_NAME");
        }

        RTSPPassword.innerHTML = lg.get("IDS_SERVERINFO_PSW");

        Rtsp_AnonymousLogin.innerHTML = lg.get("IDS_ANONYMOUS_LOGIN");
        Rtsp_AnonymousLogin_ex.innerHTML = lg.get("IDS_ANONYMOUS_LOGINEX");
        Rtsp_IpEyeEnable_ex.innerHTML = lg.get("IDS_IPEYE_REBOOTEX");

        if (lgCls.version == gVar.CtArr[70]) {
            Rtsp_CheckFlagTxt.innerHTML = lg.get("IDS_USER_VERIFICASION");
        }

    } else if (pageName == "Cloud_Storage") {
        CloSto_Title.innerHTML = lg.get("IDS_CLOUDSTORAGE");
        CloStoRf.innerHTML = lg.get("IDS_REFRESH");
        CloStoSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        CloSto_Enable.innerHTML = lg.get("IDS_CLOUDSTORAGE");
        CloSto_Channel.innerHTML = lg.get("IDS_MOTION_CH");
        CloSto_Trigger.innerHTML = lg.get("IDS_TRIGGER");
        CloSto_Motion.innerHTML = lg.get("IDS_MOTION_DETECTION");
        CloSto_Name.innerHTML = lg.get("IDS_BASE_DEVNAME");
        CloSto_Email.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS");
        document.getElementById("CloSto_Email_Setup").value = lg.get("IDS_EMAIL_SETUP");
        document.getElementById("CloStoEnableSwitch").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("CloStoEnableSwitch").options[1].innerHTML = lg.get("IDS_ENABLE");
        document.getElementById("CloStoMotionSwitch").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("CloStoMotionSwitch").options[1].innerHTML = lg.get("IDS_ENABLE");
        temp = lg.get("IDS_MINUTE");
        document.getElementById("CloStoTimeSwitch").options[0].innerHTML = "1" + temp; //1M
        document.getElementById("CloStoTimeSwitch").options[1].innerHTML = "3" + temp; //3M
        document.getElementById("CloStoTimeSwitch").options[2].innerHTML = "5" + temp; //5M
        document.getElementById("CloStoTimeSwitch").options[3].innerHTML = "10" + temp; //10M
        document.getElementById("CloStoTimeSwitch").options[4].innerHTML = "20" + temp; //20M
        document.getElementById("CloStoTimeSwitch").options[5].innerHTML = "30" + temp; //30M

    } else if (pageName == "Cloud_email") {
        CloEmailSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        CloEmailRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        CloEmailExit.innerHTML = lg.get("IDS_EXIT");
        Cloemail_config.innerHTML = lg.get("IDS_EMAIL_INFO"); //email
        CloEmail_startup.innerHTML = lg.get("IDS_EMAIL_ENABLE"); //
        CloSMTP_server.innerHTML = lg.get("IDS_EMAIL_SERVER"); //
        Cloaddresser_address.innerHTML = lg.get("IDS_EMAIL_SENDADDRESS"); //
        Cloaddresser_passwd.innerHTML = lg.get("IDS_EMAIL_SENDPSW"); //
        Cloport_num.innerHTML = lg.get("IDS_EMAIL_PORT"); //
        CloSSL_switch.innerHTML = lg.get("IDS_EMAIL_SSL"); //
        document.getElementById("CloEmailTest").value = lg.get("IDS_EMAILTEST"); //Email
        Clodefaultoff.innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("CloEmSSLSwitch").options[0].innerHTML = lg.get("IDS_DISABLE"); //
        document.getElementById("CloEmSSLSwitch").options[1].innerHTML = lg.get("IDS_ENABLE"); //
        document.getElementById("CloEmEmailSwitch").options[0].innerHTML = lg.get("IDS_DISABLE"); //
        document.getElementById("CloEmEmailSwitch").options[1].innerHTML = lg.get("IDS_ENABLE"); //
        document.getElementById("CloEmEmailSwitch").options[2].innerHTML = lg.get("IDS_DEFAULT"); // Default
    } else if (pageName == "FTP_Set") {
        FTPRf.innerHTML = lg.get("IDS_REFRESH");
        FTPSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        FtpLoginName.innerHTML = lg.get("IDS_LOGIN_NAME");
        FtpLoginPwd.innerHTML = lg.get("IDS_SERVERINFO_PSW");
        FtpIpAddr.innerHTML = lg.get("IDS_DDNS_ADDRESS");
        FtpPort.innerHTML = lg.get("IDS_FTP_PORT");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[252]){
            FtpDirName.innerHTML = lg.get("IDS_NORMALCLO_FTPPATH");
        } else{
            FtpDirName.innerHTML = lg.get("IDS_FTP_DIRNAME");
        }
        FTP_Startup.innerHTML = lg.get("IDS_FTP_ENABLE");
        FTP_REQPIC.innerHTML = lg.get("IDS_FTP_REQPIC");
        REQSTREAM_Check.innerHTML = lg.get("IDS_FTP_REQSTREAM");
        FtpTest.innerHTML = lg.get("IDS_FTPTEST");
        REQVIDEO_Check.innerHTML = lg.get("IDS_FTP_REQVIDEO");
        if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[154] && gVar.lg == "RUS"){
            FtpDomain.innerHTML = "Адрес сервера";
        }
        VideoStreamType.innerHTML = lg.get("IDS_LOGIN_BITRATE");
        document.getElementById("FtpVideoStreamType_sel").options[0].innerHTML = lg.get("IDS_CFG_MAINSTREAM");
        document.getElementById("FtpVideoStreamType_sel").options[1].innerHTML = lg.get("IDS_CFG_SUBSTREAM");

        ftp_FileModeTxt.innerHTML = lg.get("IDS_FILE_MODE");
        document.getElementById("ftp_FileMode").options[0].innerHTML = lg.get("IDS_TIME_SUFFIX");
        document.getElementById("ftp_FileMode").options[1].innerHTML = lg.get("IDS_FTP_OVERWRITE");
        ftp_FileNameTxt.innerHTML = lg.get("IDS_FILE_NAME");
        ftp_PhotoSizeTxt.innerHTML = lg.get("IDS_PHOTO_SIZE");
    } else if (pageName == "Alarm_ODSwitch") {
        alarm_ODSwitch_Rf.innerHTML = lg.get("IDS_REFRESH");
        alarm_ODSwitch_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");
        //enable_ODSwitch_block.innerHTML = lg.get("IDS_ODSWITCH");
        enable_ODSwitch_block.innerHTML = lg.get("IDS_ENABLE");
        od_Sensitivity.innerHTML = lg.get("IDS_SENSITIVITY");
        //ODSwitch_emaillink.innerHTML = lg.get("IDS_EMAILLINK");
        ODSwitch_emaillink.innerHTML = lg.get("IDS_IO_EMAIL");
        //alarm_ODSwitch_title.innerHTML = lg.get("IDS_LENS_SHADE");
        document.getElementById("Sensitivity").options[0].innerHTML = lg.get("IDS_IO_LEVER6"); //6
        document.getElementById("Sensitivity").options[1].innerHTML = lg.get("IDS_IO_LEVER5"); //5
        document.getElementById("Sensitivity").options[2].innerHTML = lg.get("IDS_IO_LEVER4"); //4
        document.getElementById("Sensitivity").options[3].innerHTML = lg.get("IDS_IO_LEVER3"); //3
        document.getElementById("Sensitivity").options[4].innerHTML = lg.get("IDS_IO_LEVER2"); //2
        document.getElementById("Sensitivity").options[5].innerHTML = lg.get("IDS_IO_LEVER1"); //1

        ODSwitch_ftplink.innerHTML = "FTP Link";
        ODSwitch_alarmout.innerHTML = lg.get("IDS_NEW_ALARM_OUT");
        ODSwitch_latchtime.innerHTML = lg.get("IDS_LATCH_TIME");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            var temp = lg.get("IDS_SECOND");
            document.getElementById("ODSwitch_latchtimeSel").options[0].innerHTML = "5" + temp;
            document.getElementById("ODSwitch_latchtimeSel").options[1].innerHTML = "10" + temp;
            document.getElementById("ODSwitch_latchtimeSel").options[2].innerHTML = "20" + temp;
            document.getElementById("ODSwitch_latchtimeSel").options[3].innerHTML = "30" + temp;
            if (lgCls.version == gVar.CtArr[70]) {
                ODSwitch_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        }

    } else if (pageName == "Perimeter_Line") {
        PL_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        PL_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        PL_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        PL_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        PL_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        PL_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        PL_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        PL_FullName.innerHTML = lg.get("IDS_PERIMETER_LINE_TITLE");

        PL_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        PL_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        PLTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");

        PL_ChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        document.getElementById("PL_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("PL_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_LCD");
        document.getElementById("PL_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_LCD");

        PL_Channel_Num.innerHTML = lg.get("IDS_MOTION_CH"); //

        //PL_AlarmBtn.innerHTML = lg.get("IDS_PL_ALARM");  //Alarm
        //PL_RuleBtn.innerHTML = lg.get("IDS_RULE");  //Rule

        //document.getElementById("PL_Alarm_Btn").value = lg.get("IDS_SET");  //Set
        //document.getElementById("PL_Rule_Btn").value = lg.get("IDS_SET");  //Set

        PL_BuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("PLBuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("PLBuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("PLBuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("PLBuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("PLBuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        PL_AlarmOutTimeTxt.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("PL_AlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PL_AlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("PL_AlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("PL_AlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("PLRecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PLRecordDelayTime").options[1].innerHTML = "10" + temp; //10s
            document.getElementById("PLRecordDelayTime").options[2].innerHTML = "20" + temp; //20s
            document.getElementById("PLRecordDelayTime").options[3].innerHTML = "30" + temp; //30s
            if (lgCls.version == gVar.CtArr[70]) {
                PL_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("PL_AlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("PL_AlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("PL_AlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("PL_AlarmOutTime").options[3].innerHTML = "60" + temp; //60S
        }

        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (lgCls.version == gVar.CtArr[70]) {
                $("#PLRecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#PLRecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="1">10' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="2">15' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="3">20' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="4">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#PLRecordDelayTime").append('<option value="5">1' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="6">2' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="7">5' + temp + '</option>');
            } else if (lgCls.version == gVar.CtArr[57]) {
                $("#PLRecordDelayTime").empty();
                $("#PLRecordDelayTime").append('<option class="option" value="0">5' + lg.get("IDS_SECOND") + '</option>');	//5s
                $("#PLRecordDelayTime").append('<option class="option" value="1">10' + lg.get("IDS_SECOND") + '</option>');	//10s
                $("#PLRecordDelayTime").append('<option class="option" value="2">20' + lg.get("IDS_SECOND") + '</option>');	//20s
                $("#PLRecordDelayTime").append('<option class="option" value="3">30' + lg.get("IDS_SECOND") + '</option>');	//30s
                $("#PLRecordDelayTime").append('<option class="option" value="4">60' + lg.get("IDS_SECOND") + '</option>');	//60s
            } else if (lgCls.version == gVar.CtArr[121]) {
                $("#PLRecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#PLRecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="1">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#PLRecordDelayTime").append('<option value="2">1' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="3">2' + temp + '</option>');
                $("#PLRecordDelayTime").append('<option value="4">5' + temp + '</option>');
            } else if(lgCls.version == gVar.CtArr[87]){
				var s = lg.get("IDS_SECOND");
				var m = lg.get("IDS_MINUTE");
				var aPost = [5+s, 10+s, 30+s, 1+m, 2+m, 5+m];
				$("#PLRecordDelayTime").empty();
				for(var i=0; i<aPost.length; i++){
					$("#PLRecordDelayTime").append('<option value="'+i+'">'+aPost[i]+'</option>');
				}
			}else{
                document.getElementById("PLRecordDelayTime").options[0].innerHTML = "30" + temp; //5S
                temp = lg.get("IDS_MINUTE");
                document.getElementById("PLRecordDelayTime").options[1].innerHTML = "1" + temp; //10s
                document.getElementById("PLRecordDelayTime").options[2].innerHTML = "2" + temp; //20s
                document.getElementById("PLRecordDelayTime").options[3].innerHTML = "5" + temp; //30s
                if (lgCls.version == gVar.CtArr[1]) {
                    temp = lg.get("IDS_SECOND");
                    $("#PLRecordDelayTime").append('<option value="4">0' + temp + '</option>');//0S
                }
            }
        } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
            document.getElementById("PLRecordDelayTime").options[0].innerHTML = "30" + temp; //5S
            temp = lg.get("IDS_MINUTE");
            document.getElementById("PLRecordDelayTime").options[1].innerHTML = "1" + temp; //10s
            document.getElementById("PLRecordDelayTime").options[2].innerHTML = "2" + temp; //20s
            document.getElementById("PLRecordDelayTime").options[3].innerHTML = "5" + temp; //30s
        }

        PL_RecordDelayTime.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording
        PL_AlarmOutManager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        PL_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        PL_SendEmailTxt.innerText = lg.get("IDS_IO_EMAIL"); //
        PL_Full.innerHTML = lg.get("IDS_FULLSCREEN");

        //PL_RuleBtn.innerHTML = lg.get("IDS_RULE");  //Rule
        PLRuleScene.innerHTML = lg.get("IDS_SCENE");
        document.getElementById("PL_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor
        document.getElementById("PL_RuleScene").options[1].innerHTML = lg.get("IDS_OUTDOOR"); //Outdoor
        PLSensitive.innerHTML = lg.get("IDS_SENSITIVE_P");

        //document.getElementById("PL_Alarm_Btn").value = lg.get("IDS_SET");  //Set
        //document.getElementById("PL_Rule_Btn").value = lg.get("IDS_SET");  //Set

        PL_Rule_Number.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        PL_RuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        PL_RuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        //document.getElementById("PLRuleType").options[0].innerHTML = lg.get("IDS_TRAP_LINE");  //Trap Wire
        //document.getElementById("PLRuleType").options[1].innerHTML=lg.get("IDS_PERIMETER");	//Perimeter

        //PL_LineTwoWay.innerHTML = lg.get("IDS_LINE_TOWWAY");  //Two-way
        //document.getElementById("PLLineTwoWay").options[0].innerHTML=lg.get("IDS_DISABLE");
        //document.getElementById("PLLineTwoWay").options[1].innerHTML=lg.get("IDS_ENABLE");

        //PLSelectCopy.innerHTML=lg.get("IDS_SEL_CHID");  //
        //PLSeletedAll.innerHTML=lg.get("IDS_PATH_ALL");
        //LPOk.value=lg.get("IDS_Copy");
        ClearPLRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearPLRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        PL_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        PL_RecordTxt.innerHTML = lg.get("IDS_IO_REC");
        if (lgCls.version == gVar.CtArr[113]) {
            PL_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        }
        PL_All.innerHTML = lg.get("IDS_PATH_ALL");
    } else if (pageName == "GoodsLost_Legacy") {
        GLL_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        GLL_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        GLL_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        GLL_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        GLL_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        GLL_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        GLL_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        GLL_FullName.innerHTML = lg.get("IDS_GOODS_LOST_TITLE");

        //GLL_CP.innerHTML=lg.get("IDS_Copy");  //Copy
        GLL_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        GLL_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        GLLTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");

        GLLChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        GLL_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //
        document.getElementById("GLL_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("GLL_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_SOD");
        document.getElementById("GLL_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_SOD");

        //GLL_AlarmBtn.innerHTML = lg.get("IDS_PL_ALARM");  //Alarm
        //GLL_RuleBtn.innerHTML = lg.get("IDS_RULE");  //Rule

        //document.getElementById("GLL_Alarm_Btn").value = lg.get("IDS_SET");  //Set
        //document.getElementById("GLL_Rule_Btn").value = lg.get("IDS_SET");  //Set

        GLLBuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("GLL_BuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("GLL_BuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("GLL_BuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("GLL_BuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("GLL_BuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        GLLAlarmOutTime.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("GLL_AlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("GLL_AlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("GLL_AlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("GLL_AlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("GLL_RecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("GLL_RecordDelayTime").options[1].innerHTML = "10" + temp; //10s
            document.getElementById("GLL_RecordDelayTime").options[2].innerHTML = "20" + temp; //20s
            document.getElementById("GLL_RecordDelayTime").options[3].innerHTML = "30" + temp; //30s
            if (lgCls.version == gVar.CtArr[70]) {
                GLL_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("GLL_AlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("GLL_AlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("GLL_AlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("GLL_AlarmOutTime").options[3].innerHTML = "60" + temp; //60S
        }
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (lgCls.version == gVar.CtArr[70]) {
                $("#GLL_RecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#GLL_RecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="1">10' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="2">15' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="3">20' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="4">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#GLL_RecordDelayTime").append('<option value="5">1' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="6">2' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="7">5' + temp + '</option>');
            } else if (lgCls.version == gVar.CtArr[57]) {
                $("#GLL_RecordDelayTime").empty();
                $("#GLL_RecordDelayTime").append('<option class="option" value="0">5' + lg.get("IDS_SECOND") + '</option>');	//5s
                $("#GLL_RecordDelayTime").append('<option class="option" value="1">10' + lg.get("IDS_SECOND") + '</option>');	//10s
                $("#GLL_RecordDelayTime").append('<option class="option" value="2">20' + lg.get("IDS_SECOND") + '</option>');	//20s
                $("#GLL_RecordDelayTime").append('<option class="option" value="3">30' + lg.get("IDS_SECOND") + '</option>');	//30s
                $("#GLL_RecordDelayTime").append('<option class="option" value="4">60' + lg.get("IDS_SECOND") + '</option>');	//60s
            } else if (lgCls.version == gVar.CtArr[121]) {
                $("#GLL_RecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#GLL_RecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="1">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#GLL_RecordDelayTime").append('<option value="2">1' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="3">2' + temp + '</option>');
                $("#GLL_RecordDelayTime").append('<option value="4">5' + temp + '</option>');
            } else if(lgCls.version == gVar.CtArr[87]){
				var s = lg.get("IDS_SECOND");
				var m = lg.get("IDS_MINUTE");
				var aPost = [5+s, 10+s, 30+s, 1+m, 2+m, 5+m];
				$("#GLL_RecordDelayTime").empty();
				for(var i=0; i<aPost.length; i++){
					$("#GLL_RecordDelayTime").append('<option value="'+i+'">'+aPost[i]+'</option>');
				}
			}else {
                document.getElementById("GLL_RecordDelayTime").options[0].innerHTML = "30" + temp; //5S
                temp = lg.get("IDS_MINUTE");
                document.getElementById("GLL_RecordDelayTime").options[1].innerHTML = "1" + temp; //10s
                document.getElementById("GLL_RecordDelayTime").options[2].innerHTML = "2" + temp; //20s
                document.getElementById("GLL_RecordDelayTime").options[3].innerHTML = "5" + temp; //30s
                if (lgCls.version == gVar.CtArr[1]) {
                    temp = lg.get("IDS_SECOND");
                    $("#GLL_RecordDelayTime").append('<option value="4">0' + temp + '</option>');//0S
                }
            }
        } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
            document.getElementById("GLL_RecordDelayTime").options[0].innerHTML = "30" + temp; //5S
            temp = lg.get("IDS_MINUTE");
            document.getElementById("GLL_RecordDelayTime").options[1].innerHTML = "1" + temp; //10s
            document.getElementById("GLL_RecordDelayTime").options[2].innerHTML = "2" + temp; //20s
            document.getElementById("GLL_RecordDelayTime").options[3].innerHTML = "5" + temp; //30s
        }
        GLL_RecordDelay_Time.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording

        GLL_AlarmOut_Manager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        GLL_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        GLL_Send.innerText = lg.get("IDS_IO_EMAIL"); //
        GLL_Full.innerHTML = lg.get("IDS_FULLSCREEN");
        GLL_RuleNumber.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        GLLRuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        GLLRuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        document.getElementById("GLL_RuleType").options[0].innerHTML = lg.get("IDS_LEGACY"); //Legacy
        document.getElementById("GLL_RuleType").options[1].innerHTML = lg.get("IDS_LOST"); //Lost

        if (lgCls.version == gVar.CtArr[122] && gVar.lg == "RUS") {
            document.getElementById("GLL_RuleType").options[2].innerHTML = "Оставленные предметы+пропажа"; //Lost
        } else {
            document.getElementById("GLL_RuleType").options[2].innerHTML = lg.get("IDS_LEGACY") + '&amp;' + lg.get("IDS_LOST"); //Lost
        }

        GLLRuleScene.innerHTML = lg.get("IDS_SCENE"); //Scene
        document.getElementById("GLL_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor
        document.getElementById("GLL_RuleScene").options[1].innerHTML = lg.get("IDS_OUTDOOR"); //Outdoor

        //GLL_RuleRectEnable.innerHTML=lg.get("IDS_RULERECT_ENABLE");  //Areas Enable
        //GLL_Area1.innerHTML=lg.get("IDS_GLL_AREA1");  //Area1
        //GLL_Area2.innerHTML=lg.get("IDS_GLL_AREA2");  //Area2
        //GLL_Area3.innerHTML=lg.get("IDS_GLL_AREA3");  //Area3
        //GLL_Area4.innerHTML=lg.get("IDS_GLL_AREA4");  //Area4

        //GLLSelectCopy.innerHTML=lg.get("IDS_SEL_CHID");  //
        //GLLSeletedAll.innerHTML=lg.get("IDS_PATH_ALL");
        //GLLOk.value=lg.get("IDS_Copy");
        ClearGLLRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearGLLRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        GLLSensitive.innerHTML = lg.get("IDS_SENSITIVE_P");
        GLL_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        GLL_RecordTxt.innerHTML = lg.get("IDS_IO_REC");
        if (lgCls.version == gVar.CtArr[113]) {
            GLL_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[94]) {
            GLLDetonateTimeTxt.innerHTML = lg.get("IDS_DETONATE_TIME");
            temp = lg.get("IDS_SECOND");
            document.getElementById("GLL_DetonateTime").options[0].innerHTML = "10" + temp;
            document.getElementById("GLL_DetonateTime").options[1].innerHTML = "20" + temp;
            document.getElementById("GLL_DetonateTime").options[2].innerHTML = "30" + temp;
            document.getElementById("GLL_DetonateTime").options[3].innerHTML = "40" + temp;
            document.getElementById("GLL_DetonateTime").options[4].innerHTML = "50" + temp;
            document.getElementById("GLL_DetonateTime").options[5].innerHTML = "60" + temp;
            document.getElementById("GLL_DetonateTime").options[6].innerHTML = "70" + temp;
            document.getElementById("GLL_DetonateTime").options[7].innerHTML = "80" + temp;
            document.getElementById("GLL_DetonateTime").options[8].innerHTML = "90" + temp;
        }
        GLL_All.innerHTML = lg.get("IDS_PATH_ALL");
    } else if (pageName == "Perimeter_Zone") {
        PZ_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        PZ_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        PZ_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        PZ_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        PZ_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        PZ_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        PZ_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        PZ_FullName.innerHTML = lg.get("IDS_PERIMETER_ZONE_TITLE");

        PZ_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        PZ_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        PZTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");

        PZ_ChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        document.getElementById("PZ_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("PZ_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_PID");
        document.getElementById("PZ_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_PID");

        PZ_Channel_Num.innerHTML = lg.get("IDS_MOTION_CH"); //

        //PZ_AlarmBtn.innerHTML = lg.get("IDS_PL_ALARM");  //Alarm
        //PZ_RuleBtn.innerHTML = lg.get("IDS_RULE");  //Rule

        //document.getElementById("PZ_Alarm_Btn").value = lg.get("IDS_SET");  //Set
        //document.getElementById("PZ_Rule_Btn").value = lg.get("IDS_SET");  //Set

        PZ_BuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("PZBuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("PZBuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("PZBuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("PZBuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("PZBuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        PZ_AlarmOutTimeTxt.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("PZAlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PZAlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("PZAlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("PZAlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("PZRecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PZRecordDelayTime").options[1].innerHTML = "10" + temp; //10s
            document.getElementById("PZRecordDelayTime").options[2].innerHTML = "20" + temp; //20s
            document.getElementById("PZRecordDelayTime").options[3].innerHTML = "30" + temp; //30s
            if (lgCls.version == gVar.CtArr[70]) {
                PZ_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("PZAlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("PZAlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("PZAlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("PZAlarmOutTime").options[3].innerHTML = "60" + temp; //60S
        }

        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (lgCls.version == gVar.CtArr[70]) {
                $("#PZRecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#PZRecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="1">10' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="2">15' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="3">20' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="4">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#PZRecordDelayTime").append('<option value="5">1' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="6">2' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="7">5' + temp + '</option>');
            } else if (lgCls.version == gVar.CtArr[57]) {
                $("#PZRecordDelayTime").empty();
                $("#PZRecordDelayTime").append('<option class="option" value="0">5' + lg.get("IDS_SECOND") + '</option>');	//5s
                $("#PZRecordDelayTime").append('<option class="option" value="1">10' + lg.get("IDS_SECOND") + '</option>');	//10s
                $("#PZRecordDelayTime").append('<option class="option" value="2">20' + lg.get("IDS_SECOND") + '</option>');	//20s
                $("#PZRecordDelayTime").append('<option class="option" value="3">30' + lg.get("IDS_SECOND") + '</option>');	//30s
                $("#PZRecordDelayTime").append('<option class="option" value="4">60' + lg.get("IDS_SECOND") + '</option>');	//60s
            } else if (lgCls.version == gVar.CtArr[121]) {
                $("#PZRecordDelayTime").empty();
                var temp = lg.get("IDS_SECOND");
                $("#PZRecordDelayTime").append('<option value="0">5' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="1">30' + temp + '</option>');
                temp = lg.get("IDS_MINUTE");
                $("#PZRecordDelayTime").append('<option value="2">1' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="3">2' + temp + '</option>');
                $("#PZRecordDelayTime").append('<option value="4">5' + temp + '</option>');
            } else if(lgCls.version == gVar.CtArr[87]){
				var s = lg.get("IDS_SECOND");
				var m = lg.get("IDS_MINUTE");
				var aPost = [5+s, 10+s, 30+s, 1+m, 2+m, 5+m];
				$("#PZRecordDelayTime").empty();
				for(var i=0; i<aPost.length; i++){
					$("#PZRecordDelayTime").append('<option value="'+i+'">'+aPost[i]+'</option>');
				}
			}else{
                var temp = lg.get("IDS_SECOND");
                document.getElementById("PZRecordDelayTime").options[0].innerHTML = "30" + temp; //30S
                temp = lg.get("IDS_MINUTE");
                document.getElementById("PZRecordDelayTime").options[1].innerHTML = "1" + temp; //10Min
                document.getElementById("PZRecordDelayTime").options[2].innerHTML = "2" + temp; //20Min
                document.getElementById("PZRecordDelayTime").options[3].innerHTML = "5" + temp; //30Min
                if (lgCls.version == gVar.CtArr[1]) {
                    temp = lg.get("IDS_SECOND");
                    $("#PZRecordDelayTime").append('<option value="4">0' + temp + '</option>');//0S
                }
            }
        } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
            document.getElementById("PZRecordDelayTime").options[0].innerHTML = "30" + temp; //5S
            temp = lg.get("IDS_MINUTE");
            document.getElementById("PZRecordDelayTime").options[1].innerHTML = "1" + temp; //10Min
            document.getElementById("PZRecordDelayTime").options[2].innerHTML = "2" + temp; //20Min
            document.getElementById("PZRecordDelayTime").options[3].innerHTML = "5" + temp; //30Min
        }


        PZ_RecordDelayTime.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording


        PZ_AlarmOutManager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        PZ_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        PZ_SendEmailTxt.innerText = lg.get("IDS_IO_EMAIL"); //
        PZ_Full.innerHTML = lg.get("IDS_FULLSCREEN");

        //PZ_RuleBtn.innerHTML = lg.get("IDS_RULE");  //Rule
        PZRuleScene.innerHTML = lg.get("IDS_SCENE");
        document.getElementById("PZ_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor
        document.getElementById("PZ_RuleScene").options[1].innerHTML = lg.get("IDS_OUTDOOR"); //Outdoor
        PZSensitive.innerHTML = lg.get("IDS_SENSITIVE_P");

        //document.getElementById("PZ_Alarm_Btn").value = lg.get("IDS_SET");  //Set
        //document.getElementById("PZ_Rule_Btn").value = lg.get("IDS_SET");  //Set

        PZ_Rule_Number.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        PZ_RuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        PZ_RuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        //document.getElementById("PZ_RuleType").options[0].innerHTML=lg.get("IDS_TRAP_LINE");  //Trap Wire

        //PZ_LineTwoWay.innerHTML = lg.get("IDS_LINE_TOWWAY");  //Two-way
        ClearPZRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearPZRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        PZ_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        PZ_RecordTxt.innerHTML = lg.get("IDS_IO_REC");
        if (lgCls.version == gVar.CtArr[113]) {
            PZ_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        }
        PZ_All.innerHTML = lg.get("IDS_PATH_ALL");
    } else if (pageName == "Intelligent_jh") {
        intelliplan_channel.innerHTML = lg.get("IDS_MOTION_CH"); //Channel
        intelliplan_copy_week_ok.innerHTML = lg.get("IDS_Copy");
        intelliplan_copy_ch_ok.innerHTML = lg.get("IDS_Copy");

        document.getElementById("intelliplan_week_sel").options[0].innerHTML = document.getElementById("intelliplan_copy_week_src").options[0].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("intelliplan_week_sel").options[1].innerHTML = document.getElementById("intelliplan_copy_week_src").options[1].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("intelliplan_week_sel").options[2].innerHTML = document.getElementById("intelliplan_copy_week_src").options[2].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("intelliplan_week_sel").options[3].innerHTML = document.getElementById("intelliplan_copy_week_src").options[3].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("intelliplan_week_sel").options[4].innerHTML = document.getElementById("intelliplan_copy_week_src").options[4].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("intelliplan_week_sel").options[5].innerHTML = document.getElementById("intelliplan_copy_week_src").options[5].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("intelliplan_week_sel").options[6].innerHTML = document.getElementById("intelliplan_copy_week_src").options[6].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun
        $("#intelliplan_week_text").text(lg.get("IDS_DST_DSTMODE01"));

        document.getElementById("intelliplan_copy_week_dst").options[0].innerHTML = lg.get("IDS_PATH_ALL"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[1].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[2].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[3].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[4].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[5].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[6].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("intelliplan_copy_week_dst").options[7].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun

        intelliplan_copy_ch_text.innerHTML = lg.get("IDS_REC_COPYCH");
        intelliplan_copy_day_text.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");

        intelliplan_copy_week_to.innerHTML = lg.get("IDS_COPY_TO");
        intelliplan_copy_ch_to.innerHTML = lg.get("IDS_COPY_TO");
        intelliplanSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        intelliplanRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        intelliplanDf.innerHTML = lg.get("IDS_DEFAULT");
    } else if (pageName == "alarm_abnormal") {
        alarm_abnormal_title.innerHTML = lg.get("IDS_CFG_ABNORMAL");
        alarm_abnormal_Rf.innerHTML = lg.get("IDS_REFRESH");
        alarm_abnormal_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");
        alarm_abnormal_enabletxt.innerHTML = lg.get("IDS_ABN_AL");
        alarm_abnormal_aotxt.innerHTML = lg.get("IDS_IO_ENABLEOUT");
        alarm_ip_enabletxt.innerHTML = lg.get("IDS_ABN_IP");
        alarm_ip_aotxt.innerHTML = lg.get("IDS_IO_ENABLEOUT");

    } else if (pageName == "Capture_Set") {
        CapSetCP.innerHTML = lg.get("IDS_Copy");
        CapSetRF.innerHTML = lg.get("IDS_REFRESH");
        CapSetDf.innerHTML = lg.get("IDS_DEFAULT");
        CapSetSV.innerHTML = lg.get("IDS_CRUISE_SAVE");

        if (lgCls.version == gVar.CtArr[3]) {
            auto_cap.innerHTML = "Auto SnapShot"; //
            manual_cap.innerHTML = "Manual SnapShot"; //
        } else {
            auto_cap.innerHTML = lg.get("IDS_CAP_AUTO"); //
            manual_cap.innerHTML = lg.get("IDS_CAP_MANUAL"); //
        }
        cap_channel_num.innerHTML = lg.get("IDS_MOTION_CH");
		if(gDevice.devType==devTypeEnum.DEV_HDVR && lgCls.version==gVar.CtArr[0]){
			cap_bitrate_mode.innerHTML = "Picture Quality"; //
		}else{
			cap_bitrate_mode.innerHTML = lg.get("IDS_CAP_BITMODE"); //
		}
        
        if (lgCls.version == gVar.CtArr[25]) {
            document.getElementById("cap_bitrate_switch").options[0].innerHTML = "HQ Stream";
            document.getElementById("cap_bitrate_switch").options[1].innerHTML = "SQ Stream";
        }else if(gVar.bC0_useNewLg){
			document.getElementById("cap_bitrate_switch").options[0].innerHTML = "HD";
			document.getElementById("cap_bitrate_switch").options[1].innerHTML = "SD";
		}else{
            document.getElementById("cap_bitrate_switch").options[0].innerHTML = lg.get("IDS_CODE_STREAM_01");
            document.getElementById("cap_bitrate_switch").options[1].innerHTML = lg.get("IDS_CODE_STREAM_02");
        }

        normal_interval.innerHTML = lg.get("IDS_CAP_N"); //
        motion_interval.innerHTML = lg.get("IDS_CAP_M"); //
        if (lgCls.version == gVar.CtArr[121]) {
            $("#N_CapSet").empty();
            $("#M_CapSet").empty();
            for (var i = 0; i < 11; i++) {
                $("#N_CapSet").append('<option class="option" value="' + i + '">' + '</option>');
                $("#M_CapSet").append('<option class="option" value="' + i + '">' + '</option>');
            }

            temp = lg.get("IDS_SECOND");
            document.getElementById("N_CapSet").options[0].innerHTML = document.getElementById("M_CapSet").options[0].innerHTML = "5" + temp; //5
            document.getElementById("N_CapSet").options[1].innerHTML = document.getElementById("M_CapSet").options[1].innerHTML = "10" + temp;
            document.getElementById("N_CapSet").options[2].innerHTML = document.getElementById("M_CapSet").options[2].innerHTML = "15" + temp;
            document.getElementById("N_CapSet").options[3].innerHTML = document.getElementById("M_CapSet").options[3].innerHTML = "20" + temp;
            document.getElementById("N_CapSet").options[4].innerHTML = document.getElementById("M_CapSet").options[4].innerHTML = "30" + temp;
            temp = lg.get("IDS_MINUTE");
            document.getElementById("N_CapSet").options[5].innerHTML = document.getElementById("M_CapSet").options[5].innerHTML = "1" + temp; //1
            document.getElementById("N_CapSet").options[6].innerHTML = document.getElementById("M_CapSet").options[6].innerHTML = "5" + temp;
            document.getElementById("N_CapSet").options[7].innerHTML = document.getElementById("M_CapSet").options[7].innerHTML = "10" + temp;
            document.getElementById("N_CapSet").options[8].innerHTML = document.getElementById("M_CapSet").options[8].innerHTML = "20" + temp;
            document.getElementById("N_CapSet").options[9].innerHTML = document.getElementById("M_CapSet").options[9].innerHTML = "30" + temp;
            temp = lg.get("IDS_HOUR");
            document.getElementById("N_CapSet").options[10].innerHTML = document.getElementById("M_CapSet").options[10].innerHTML = "1" + temp; //1
        } else {
            temp = lg.get("IDS_SECOND");
            document.getElementById("N_CapSet").options[0].innerHTML = document.getElementById("M_CapSet").options[0].innerHTML = "5" + temp; //5
            document.getElementById("N_CapSet").options[1].innerHTML = document.getElementById("M_CapSet").options[1].innerHTML = "10" + temp;
            document.getElementById("N_CapSet").options[2].innerHTML = document.getElementById("M_CapSet").options[2].innerHTML = "30" + temp;
            temp = lg.get("IDS_MINUTE");
            document.getElementById("N_CapSet").options[3].innerHTML = document.getElementById("M_CapSet").options[3].innerHTML = "1" + temp; //1
            document.getElementById("N_CapSet").options[4].innerHTML = document.getElementById("M_CapSet").options[4].innerHTML = "10" + temp;
            document.getElementById("N_CapSet").options[5].innerHTML = document.getElementById("M_CapSet").options[5].innerHTML = "30" + temp;
            temp = lg.get("IDS_HOUR");
            document.getElementById("N_CapSet").options[6].innerHTML = document.getElementById("M_CapSet").options[6].innerHTML = "1" + temp; //1
        }
        CapSeletedAll.innerHTML = lg.get("IDS_PATH_ALL");
        CapOk.innerHTML = lg.get("IDS_Copy");
        CapSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");

        cap_FileModeTxt.innerHTML = lg.get("IDS_FILE_MODE");
        document.getElementById("cap_FileMode").options[0].innerHTML = lg.get("IDS_TIME_SUFFIX");
        document.getElementById("cap_FileMode").options[1].innerHTML = lg.get("IDS_FTP_OVERWRITE");
        cap_FileNameTxt.innerHTML = lg.get("IDS_FILE_NAME");
        cap_PhotoSizeTxt.innerHTML = lg.get("IDS_PHOTO_SIZE");
	}else if(pageName == "Alarm_JhDVR"){
		AlJh_channel_lg.innerHTML = lg.get("IDS_MOTION_CH");
		AlJh_week_lg.innerHTML = lg.get("IDS_DST_DSTMODE01");
		
		$("#AlJh_week option[value='0'],#AlJh_weekCopy_src option[value='0'],#AlJh_weekCopy_dest option[value='0']").html( lg.get("IDS_WEEKDAY_01") );
		$("#AlJh_week option[value='1'],#AlJh_weekCopy_src option[value='1'],#AlJh_weekCopy_dest option[value='1']").html( lg.get("IDS_WEEKDAY_02") );
		$("#AlJh_week option[value='2'],#AlJh_weekCopy_src option[value='2'],#AlJh_weekCopy_dest option[value='2']").html( lg.get("IDS_WEEKDAY_03") );
		$("#AlJh_week option[value='3'],#AlJh_weekCopy_src option[value='3'],#AlJh_weekCopy_dest option[value='3']").html( lg.get("IDS_WEEKDAY_04") );
		$("#AlJh_week option[value='4'],#AlJh_weekCopy_src option[value='4'],#AlJh_weekCopy_dest option[value='4']").html( lg.get("IDS_WEEKDAY_05") );
		$("#AlJh_week option[value='5'],#AlJh_weekCopy_src option[value='5'],#AlJh_weekCopy_dest option[value='5']").html( lg.get("IDS_WEEKDAY_06") );
		$("#AlJh_week option[value='6'],#AlJh_weekCopy_src option[value='6'],#AlJh_weekCopy_dest option[value='6']").html( lg.get("IDS_WEEKDAY_07") );
		$("#AlJh_weekCopy_dest option[value='7']").html( lg.get("IDS_PATH_ALL") );
		
		AlJh_Alarm1Tag_lg.innerHTML = lg.get("IDS_DEFAULT_MOTION");
		AlJh_Alarm2Tag_lg.innerHTML = lg.get("IDS_RECPLAN_TYPE03");
		AlJh_Alarm3Tag_lg.innerHTML = lg.get("IDS_EMAILJH_EXCEPTION");
		AlJh_Alarm4Tag_lg.innerHTML = "In-Analy";
		AlJh_Alarm5Tag_lg.innerHTML = lg.get("IDS_RECTYPE_18");
		
		AlJh_weekCopy_lg.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");
		AlJh_weekCopy_to.innerHTML = lg.get("IDS_COPY_TO");
		AlJh_weekCopy_btn.innerHTML = lg.get("IDS_Copy");
		
		AlJh_chCopy_lg.innerHTML = lg.get("IDS_REC_COPYCH");
		AlJh_chCopy_to.innerHTML = lg.get("IDS_COPY_TO");
		AlJh_chCopy_btn.innerHTML = lg.get("IDS_Copy");
		
		AlJh_Rf.innerHTML = lg.get("IDS_REFRESH");
		AlJh_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");
	}else if(pageName == "NotificationSchedule"){
		NotiJh_channel_lg.innerHTML = lg.get("IDS_MOTION_CH");
		NotiJh_week_lg.innerHTML = lg.get("IDS_DST_DSTMODE01");
		
		$("#NotiJh_week option[value='0'],#NotiJh_weekCopy_src option[value='0'],#NotiJh_weekCopy_dest option[value='0']").html( lg.get("IDS_WEEKDAY_01") );
		$("#NotiJh_week option[value='1'],#NotiJh_weekCopy_src option[value='1'],#NotiJh_weekCopy_dest option[value='1']").html( lg.get("IDS_WEEKDAY_02") );
		$("#NotiJh_week option[value='2'],#NotiJh_weekCopy_src option[value='2'],#NotiJh_weekCopy_dest option[value='2']").html( lg.get("IDS_WEEKDAY_03") );
		$("#NotiJh_week option[value='3'],#NotiJh_weekCopy_src option[value='3'],#NotiJh_weekCopy_dest option[value='3']").html( lg.get("IDS_WEEKDAY_04") );
		$("#NotiJh_week option[value='4'],#NotiJh_weekCopy_src option[value='4'],#NotiJh_weekCopy_dest option[value='4']").html( lg.get("IDS_WEEKDAY_05") );
		$("#NotiJh_week option[value='5'],#NotiJh_weekCopy_src option[value='5'],#NotiJh_weekCopy_dest option[value='5']").html( lg.get("IDS_WEEKDAY_06") );
		$("#NotiJh_week option[value='6'],#NotiJh_weekCopy_src option[value='6'],#NotiJh_weekCopy_dest option[value='6']").html( lg.get("IDS_WEEKDAY_07") );
		$("#NotiJh_weekCopy_dest option[value='7']").html( lg.get("IDS_PATH_ALL") );
		
		NotiJh_Alarm1Tag_lg.innerHTML = lg.get("IDS_DEFAULT_MOTION");
		NotiJh_Alarm2Tag_lg.innerHTML = lg.get("IDS_RECPLAN_TYPE03");
		NotiJh_Alarm3Tag_lg.innerHTML = lg.get("IDS_EMAILJH_EXCEPTION");
		NotiJh_Alarm4Tag_lg.innerHTML = "In-Analy";
		NotiJh_Alarm5Tag_lg.innerHTML = lg.get("IDS_RECTYPE_18");
		
		NotiJh_weekCopy_lg.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");
		NotiJh_weekCopy_to.innerHTML = lg.get("IDS_COPY_TO");
		NotiJh_weekCopy_btn.innerHTML = lg.get("IDS_Copy");
		
		NotiJh_chCopy_lg.innerHTML = lg.get("IDS_REC_COPYCH");
		NotiJh_chCopy_to.innerHTML = lg.get("IDS_COPY_TO");
		NotiJh_chCopy_btn.innerHTML = lg.get("IDS_Copy");
		
		NotiJh_Rf.innerHTML = lg.get("IDS_REFRESH");
		NotiJh_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");
    } else if (pageName == "Capture_Jh") {
        CapJh_Rf.innerHTML = lg.get("IDS_REFRESH");
        CapJh_Df.innerHTML = lg.get("IDS_DEFAULT");
        CapJh_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");

        CapJh_CHN_L.innerHTML = lg.get("IDS_MOTION_CH"); //Channel
        $("#CapJh_WeekTop_L").text(lg.get("IDS_DST_DSTMODE01")); //Week
        document.getElementById("CapJh_WeekTop_Value").options[0].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("CapJh_WeekTop_Value").options[1].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("CapJh_WeekTop_Value").options[2].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("CapJh_WeekTop_Value").options[3].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("CapJh_WeekTop_Value").options[4].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("CapJh_WeekTop_Value").options[5].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("CapJh_WeekTop_Value").options[6].innerHTML = document.getElementById("CapJh_WeekCopy_src").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");

        CapJh_AlarmTag2.innerHTML = lg.get("IDS_RECPLAN_TYPE03"); //Alarm
        if (lgCls.version == gVar.CtArr[0]) {
            CapJh_normal_hin2.innerHTML = "Continuous";
        } else {
            CapJh_normal_hin2.innerHTML = lg.get("IDS_RECPLAN_TYPE02"); //Normal
        }

        CapJh_MotionTag3.innerHTML = lg.get("IDS_DEFAULT_MOTION"); //Motion
        CapJh_NullTag2.innerHTML = lg.get("IDS_RECPLAN_TYPE01"); //No Record

        CapJh_ChCopy_cp.innerHTML = lg.get("IDS_REC_COPYCH");
        CapJh_WeekCopy_cp.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");

        CapJh_ChCopy_btn.innerHTML = lg.get("IDS_Copy");
        CapJh_WeekCopy_btn.innerHTML = lg.get("IDS_Copy");

        CapJh_WeekCopy_to.innerHTML = lg.get("IDS_COPY_TO");
        CapJh_ChCopy_to.innerHTML = lg.get("IDS_COPY_TO");

        document.getElementById("CapJh_WeekCopy_dest").options[0].innerHTML = lg.get("IDS_PATH_ALL"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[1].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[2].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[3].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[4].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[5].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[6].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("CapJh_WeekCopy_dest").options[7].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun

    } else if (pageName == "NormalClo_Sto") {
        NormalCloStoRf.innerHTML = lg.get("IDS_REFRESH");
        NormalCloStoSV.innerHTML = lg.get("IDS_CRUISE_SAVE");

        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            NormalCloSto_Channel.innerHTML = lg.get("IDS_ANALOG_TITLE"); //Analog Channels
            NormalCloSto_IPChannel.innerHTML = lg.get("IDS_IO_IPCKALL"); //IP Channels
        } else {
            NormalCloSto_Channel.innerHTML = lg.get("IDS_CH"); //CH
        }

        NormalCloSto_Enable.innerHTML = lg.get("IDS_CLOUDSTORAGE");
        NormalCloSto_CloudType.innerHTML = lg.get("IDS_CLOUD_TYPE");
        document.getElementById("NormalCloStoCloudType").options[0].innerHTML = lg.get("IDS_NewCloSto_DROPBOX");
        document.getElementById("NormalCloStoCloudType").options[1].innerHTML = lg.get("IDS_GOOGLEDRIVE");

        //NormalCloSto_key.innerHTML=lg.get("IDS_NORMALCLO_KEY");
        //NormalCloSto_secret.innerHTML=lg.get("IDS_NORMALCLO_SECRET");
        //NormalCloSto_FTPPATH.innerHTML=lg.get("IDS_NORMALCLO_FTPPATH");
        //document.getElementById("gotoNormalClo_StoFtp").value=lg.get("IDS_NORMAL_FTPSETUP");

        NormalCloSto_TimeTrigger.innerHTML = lg.get("IDS_NORMA_TRIGGER");
        temp = lg.get("IDS_MINUTE");
        document.getElementById("NormalCloStoTimeTrigger").options[0].innerHTML = "1" + temp; //1M
        document.getElementById("NormalCloStoTimeTrigger").options[1].innerHTML = "3" + temp; //3M
        document.getElementById("NormalCloStoTimeTrigger").options[2].innerHTML = "5" + temp; //5M
        document.getElementById("NormalCloStoTimeTrigger").options[3].innerHTML = "10" + temp; //10M
        document.getElementById("NormalCloStoTimeTrigger").options[4].innerHTML = "20" + temp; //20M
        document.getElementById("NormalCloStoTimeTrigger").options[5].innerHTML = "30" + temp; //30M
        document.getElementById("NormalCloStoTimeTrigger").options[6].innerHTML = "60" + temp; //60M

        NormalCloSto_MotionEnable.innerHTML = lg.get("IDS_MOTION_DETECTION");
        NormalCloSto_DriveName.innerHTML = lg.get("IDS_BASE_DEVNAME");
        document.getElementById("NormalCloSto_Test_Email").innerHTML = lg.get("IDS_TEST_CLOUDEMAIL");
        document.getElementById("gotoNormalClo_StoEm").innerHTML = lg.get("IDS_EMAIL_SETUP");

        document.getElementById("NormalCloSto_Upgrade").innerHTML = lg.get("IDS_EMAIL_CLOSTO_UP");

        NormalCloSto_Tips1_1.innerHTML = lg.get("IDS_CLOUS_TIPS0");
        NormalCloSto_Tips1_2.innerHTML = lg.get("IDS_CLOUS_TIPS1");
        //NormalCloSto_Tips2.innerHTML=lg.get("IDS_CLOUS_TIPS2");

    } else if (pageName == "chn_yt") {
        ChnPTZSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        ChnPTZRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        ChnPTZCP.innerHTML = lg.get("IDS_Copy");
        cyt_channel_num.innerHTML = lg.get("IDS_MOTION_CH"); //
        cyt_signal_type.innerHTML = lg.get("IDS_SIGNAL_TYPE"); //

        if (lgCls.version == gVar.CtArr[10] && gVar.lg == "JPN") {
            cyt_agreement_type.innerHTML = "プロトコル"; //
        } else {
            cyt_agreement_type.innerHTML = lg.get("IDS_PTZ_PROTOCOL"); //
        }

        baud_ratio_1.innerHTML = lg.get("IDS_PTZ_BAUDRATE"); //
        document.getElementById("YTProtocol").options[0].innerHTML = "Pelco-D"; //lg.get("");//Pelco_D
        document.getElementById("YTProtocol").options[1].innerHTML = "Pelco-P"; //lg.get("");//Pelco_P

        document.getElementById("YTSignal").options[0].innerHTML = lg.get("IDS_ANALOG"); //
        document.getElementById("YTSignal").options[1].innerHTML = lg.get("IDS_DIGITAL"); //
        document.getElementById("YTBaudrate").options[0].innerHTML = "1200"; //lg.get("");//1200
        document.getElementById("YTBaudrate").options[1].innerHTML = "2400"; //lg.get("");//2400
        document.getElementById("YTBaudrate").options[2].innerHTML = "4800"; //lg.get("");//4800
        document.getElementById("YTBaudrate").options[3].innerHTML = "9600"; //lg.get("");//9600
        chn_data_bit.innerHTML = lg.get("IDS_PTZ_DATABIT"); //
        temp = lg.get("IDS_SERIAL_BIT");
        document.getElementById("YTDataBit").options[0].innerHTML = "8"; //8
        document.getElementById("YTDataBit").options[1].innerHTML = "7"; //7
        document.getElementById("YTDataBit").options[2].innerHTML = "6"; //6
        document.getElementById("YTDataBit").options[3].innerHTML = "5"; //5
        cyt_stop_bit.innerHTML = lg.get("IDS_PTZ_STOPBIT"); //
        document.getElementById("YTStopBit").options[0].innerHTML = "1"; //1
        document.getElementById("YTStopBit").options[1].innerHTML = "2"; //2
        cyt_check_1.innerHTML = lg.get("IDS_PTZ_CHECK"); //
        document.getElementById("YTCheck").options[0].innerHTML = lg.get("IDS_CHECKBIT_NONE"); //
        document.getElementById("YTCheck").options[1].innerHTML = lg.get("IDS_CHECKBIT_ODD"); //
        document.getElementById("YTCheck").options[2].innerHTML = lg.get("IDS_CHECKBIT_EVEN"); //
        document.getElementById("YTCheck").options[3].innerHTML = lg.get("IDS_CHECKBIT_MARK"); //
        document.getElementById("YTCheck").options[4].innerHTML = lg.get("IDS_CHECKBIT_SPACE"); //
        Cruise.innerHTML = lg.get("IDS_TIP_CRUISE");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            address.innerHTML = "카메라ID";
        } else {
            address.innerHTML = lg.get("IDS_ADDRESS"); //
        }
        ytselectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        ytOk.innerHTML = lg.get("IDS_Copy");
        ytselectedAll.innerHTML = lg.get("IDS_PATH_ALL");

        ptz_setFocus.innerHTML = "Semifocus";//lg.get("IDS_PTZ_FOCUS");
    } else if (pageName == "chn_roi") {
        ChnRoiSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        ChnRoiRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        roi_ClearBtn.innerHTML = lg.get("IDS_MOTION_CLEAR");
        //ChnspCP.innerHTML=lg.get("IDS_Copy");//Copy
        roi_area_font.innerHTML = lg.get("IDS_ROI_AREA");
        roi_switch_font.innerHTML = lg.get("IDS_ROI_ENABLE");
        roi_type_font.innerHTML = lg.get("IDS_LOGIN_BITRATE");
        document.getElementById("roi_type_sel").options[0].innerHTML = lg.get("IDS_CFG_MAINSTREAM");
        document.getElementById("roi_type_sel").options[1].innerHTML = lg.get("IDS_CFG_SUBSTREAM");
        document.getElementById("roi_type_sel").options[2].innerHTML = lg.get("IDS_CFG_MOBILESTREAM");
        document.getElementById("roi_switch_sel").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("roi_switch_sel").options[1].innerHTML = lg.get("IDS_ENABLE");
        roi_IsAbsQp_font.innerHTML = lg.get("IDS_ISABSQP");
        document.getElementById("roi_IsAbsQp_sel").options[0].innerHTML = lg.get("IDS_OPP_QUALITY");
        document.getElementById("roi_IsAbsQp_sel").options[1].innerHTML = lg.get("IDS_ABS_QUALITY");
        roi_level_font.innerHTML = lg.get("IDS_ROI_LEVEL");
        roi_fps_font.innerHTML = lg.get("IDS_ROI_FPS");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
            document.getElementById("roi_level_sel").options[0].innerHTML = 1;
            document.getElementById("roi_level_sel").options[1].innerHTML = 2;
            document.getElementById("roi_level_sel").options[2].innerHTML = 3;
            document.getElementById("roi_level_sel").options[3].innerHTML = 4;
            document.getElementById("roi_level_sel").options[4].innerHTML = 5;
            document.getElementById("roi_level_sel").options[5].innerHTML = 6;
        } else {
            document.getElementById("roi_level_sel").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
            document.getElementById("roi_level_sel").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
            document.getElementById("roi_level_sel").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
            document.getElementById("roi_level_sel").options[3].innerHTML = lg.get("IDS_NORMAL");
            document.getElementById("roi_level_sel").options[4].innerHTML = lg.get("IDS_BETTER");
            document.getElementById("roi_level_sel").options[5].innerHTML = lg.get("IDS_BEST");
        }
    } else if (pageName == "Voice_ctrl") {
        voice_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        voice_Save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        soundCtrl.innerHTML = lg.get("IDS_SOUND_ON"); //
        outS_voice.innerHTML = lg.get("IDS_OUT_VOICE");
        inS_voice.innerHTML = lg.get("IDS_IN_VOICE");
        audioType.innerHTML = lg.get("IDS_AUDIO_CODE_TYPE");
        //inputMode.innerHTML = lg.get("IDS_IN_VOICEMODE");
        //document.getElementById("inputModeSel").options[0].innerHTML=lg.get("IDS_LINEIN");//Disable
        //document.getElementById("inputModeSel").options[1].innerHTML=lg.get("IDS_MIC");//Enable

    } else if (pageName == "Dev_log") {
        //DevLogRf.innerHTML = lg.get("IDS_LOG_REF");
        //DevLogDel.innerHTML = lg.get("IDS_LOG_DEL");
        log_search.innerHTML = lg.get("IDS_IPC_ADD");
        log_No.innerHTML = lg.get("IDS_NUM");
        log_DetailInfo.innerHTML = lg.get("IDS_LOG_INFO");
        if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
            log_Ch.innerHTML = "Kanal";
            log_Type.innerHTML = "Typ";
            log_Record.innerHTML = "Aufnahme";
        } else if (lgCls.version == gVar.CtArr[85] && gVar.lg == "KOR") {
            log_Ch.innerHTML = "채널";
            log_Type.innerHTML = "유형";
            log_Record.innerHTML = "기록";
            log_IPAddress.innerHTML = "IP 주소";
        } else {
            log_Ch.innerHTML = "Channel";
            log_Type.innerHTML = "Type";
            log_Record.innerHTML = "Record";
        }
        log_Time.innerHTML = lg.get("IDS_TIME");
        log_Operation.innerHTML = lg.get("IDS_OPERATION");
        log_type.innerHTML = lg.get("IDS_LOG_TYPE");
        log_subtype.innerHTML = lg.get("IDS_LOG_SUBTYPE");
        begin_time.innerHTML = lg.get("IDS_BEGIN_TIME");
        end_time.innerHTML = lg.get("IDS_END_TIME");

        document.getElementById("logType").options[0].innerHTML = lg.get("IDS_SYS_LOG"); //
        document.getElementById("logType").options[1].innerHTML = lg.get("IDS_CONFIG_LOG"); //
        document.getElementById("logType").options[2].innerHTML = lg.get("IDS_ALARM_LOG"); //
        document.getElementById("logType").options[3].innerHTML = lg.get("IDS_USER_LOG");
        document.getElementById("logType").options[4].innerHTML = lg.get("IDS_RECORD_LOG");
        document.getElementById("logType").options[5].innerHTML = lg.get("IDS_STORE_LOG");
        document.getElementById("logType").options[6].innerHTML = lg.get("IDS_NETWORK_LOG"); //
        document.getElementById("logType").options[7].innerHTML = lg.get("IDS_ALL_LOG");

        log_export_btn.innerHTML = lg.get("IDS_PARAM_EXPORT");
        log_scan_Btn.innerHTML = lg.get("IDS_SCAN");
        log_export_path.innerHTML = lg.get("IDS__FILE_PATH");
        log_export_name.innerHTML = lg.get("IDS__FILE_NAME");

    } else if (pageName == "NormalClo_StoEm") {
        //NormalCloStoEm_config.innerHTML = lg.get("IDS_EMAIL_INFO"); //email
        NormalCloStoEmRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        NormalCloStoEmSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        NormalCloStoEmExit.innerHTML = lg.get("IDS_EXIT"); //Exit

        NormalCloStoEmEmailSwitch.innerHTML = lg.get("IDS_EMAIL_INFO"); //email
        document.getElementById("NormalCloStoEm_EmailSwitch").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("NormalCloStoEm_EmailSwitch").options[1].innerHTML = lg.get("IDS_ENABLE");
        NormalCloStoEmSSLSwitch.innerHTML = lg.get("IDS_EMAIL_SSL"); //
        document.getElementById("NormalCloStoEm_SSLSwitch").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("NormalCloStoEm_SSLSwitch").options[1].innerHTML = lg.get("IDS_ENABLE");

        NormalCloStoEmPort.innerHTML = lg.get("IDS_EMAIL_PORT"); //
        NormalCloStoEmSMTP.innerHTML = lg.get("IDS_EMAIL_SERVER"); //
        NormalCloStoEmSendEmail.innerHTML = lg.get("IDS_EMAIL_SENDADDRESS"); //
        NormalCloStoEmSendEmailPW.innerHTML = lg.get("IDS_EMAIL_SENDPSW"); //
        NormalCloStoEmRecvEmail.innerHTML = lg.get("IDS_EMAIL_RECEIVEADDRESS"); //
        document.getElementById("NormalCloStoEm_EmailTest").value = lg.get("IDS_EMAILTEST"); //
    } else if (pageName == "auto_upgrade") {
        au_Device_Type.innerHTML = lg.get("IDS_DEV_TYPR");
        au_Software_Ver.innerHTML = lg.get("IDS_FIRMWARE_VERSION");
        au_refresh.innerHTML = lg.get("IDS_REFRESH");
        au_save.innerHTML = lg.get("IDS_CRUISE_SAVE");
        CheckUpdate.innerHTML = lg.get("IDS_CHECK_UPDATE");
        au_enable.innerHTML = lg.get("IDS_AUTO_UPGRADE");
        au_check_txt.innerHTML = lg.get("IDS_AUTO_CHECK");
    } else if (pageName == "record_jhipc") {
        rjh_channel.innerHTML = lg.get("IDS_MOTION_CH");//Channel
        LXJH_IPC_D.innerHTML = lg.get("IDS_TIME");//No Record

        rec_alarm.innerHTML = lg.get("IDS_RECTYPE_02");//Alarm
        rec_normal.innerHTML = lg.get("IDS_RECPLAN_TYPE02");//Normal
        rec_motion.innerHTML = lg.get("IDS_DEFAULT_MOTION");//Motion
        if(lgCls.skin == "white_c238"){
            rec_sound.innerHTML = lg.get("IDS_SOUND_DETECTION")
        }else{
            rec_sound.innerHTML = lg.get("IDS_SOUND_DETECTION")+"("+lg.get("IDS_SOUND_TIP")+")";
        }
        rec_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01");//No Record

        RecplanSave.innerHTML = lg.get("IDS_CRUISE_SAVE");//Save
        RecplanRf.innerHTML = lg.get("IDS_REFRESH");//Refresh
        RecplanDf.innerHTML = lg.get("IDS_DEFAULT");

    } else if (pageName == "record_smart") {
        rec_smart.innerHTML = lg.get("IDS_IPC_RECSMART");
        smt_rec_norecord.innerHTML = lg.get("IDS_RECPLAN_TYPE01");//No Record

        RecSmartSave.innerHTML = lg.get("IDS_CRUISE_SAVE");//Save
        RecSmartRf.innerHTML = lg.get("IDS_REFRESH");//Refresh
        RecSmartDf.innerHTML = lg.get("IDS_DEFAULT");
    } else if (pageName == "syswh_cd") {
        param_file_name.innerHTML = lg.get("IDS_PARAM_IMPORTFILE"); //
        btnParamName.innerHTML = lg.get("IDS_SCAN");
        importParam.innerHTML = lg.get("IDS_PARAM_IMPORT"); //
        param_file_path.innerHTML = lg.get("IDS_PARAM_EXPORTPATH"); //
        btnParamPath.innerHTML = lg.get("IDS_SCAN");
        exportParam.innerHTML = lg.get("IDS_PARAM_EXPORT"); //
    } else if (pageName == "Human_Detection") {
        PD_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        PD_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        PD_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        PD_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        PD_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        PD_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        PD_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        PD_FullName.innerHTML = lg.get("IDS_HUMAN_DETECTION_TITLE");

        PD_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        PD_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //

        PDChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        PD_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //
        document.getElementById("PD_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("PD_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_PD");
        document.getElementById("PD_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_PD");

        PDBuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("PD_BuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("PD_BuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("PD_BuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("PD_BuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("PD_BuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        PDAlarmOutTime.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("PD_AlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PD_AlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("PD_AlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("PD_AlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("PD_RecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("PD_RecordDelayTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("PD_RecordDelayTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("PD_RecordDelayTime").options[3].innerHTML = "30" + temp; //30S
            if (lgCls.version == gVar.CtArr[70]) {
                PD_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("PD_AlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("PD_AlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("PD_AlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("PD_AlarmOutTime").options[3].innerHTML = "60" + temp; //60S
            document.getElementById("PD_RecordDelayTime").options[0].innerHTML = "30" + temp; //30s
            temp = lg.get("IDS_MINUTE");
            document.getElementById("PD_RecordDelayTime").options[1].innerHTML = "1" + temp; //1min
            document.getElementById("PD_RecordDelayTime").options[2].innerHTML = "2" + temp; //2min
            document.getElementById("PD_RecordDelayTime").options[3].innerHTML = "5" + temp; //5min
        }
        PD_RecordDelay_Time.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording

        PD_AlarmOut_Manager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        PD_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        PD_Send.innerText = lg.get("IDS_IO_EMAIL"); //
        PD_Full.innerHTML = lg.get("IDS_FULLSCREEN");
        PD_RuleNumber.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        PDRuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        PDRuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        document.getElementById("PD_RuleType").options[0].innerHTML = lg.get("IDS__RULE_NORMAL");

        PDRuleScene.innerHTML = lg.get("IDS_SCENE"); //Scene
        document.getElementById("PD_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor
        //document.getElementById("PD_RuleScene").options[1].innerHTML = lg.get("IDS_OUTDOOR");

        ClearPDRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearPDRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        PDLevel.innerHTML = lg.get("IDS_REDUCT_V");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("PD_Level").options[0].innerHTML = lg.get("IDS_LEVEL_S");
            if (lgCls.version == gVar.CtArr[116]) {
                PDLevel.innerHTML = "Target Size";
                document.getElementById("PD_Level").options[1].innerHTML = "Medium";
                document.getElementById("PD_Level").options[2].innerHTML = "Large";
            } else {
                document.getElementById("PD_Level").options[1].innerHTML = lg.get("IDS_LEVEL_M");
                document.getElementById("PD_Level").options[2].innerHTML = lg.get("IDS_LEVEL_B");
            }
        } else {
            document.getElementById("PD_Level").options[0].innerHTML = lg.get("IDS_CAM_LOW");
            document.getElementById("PD_Level").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
            document.getElementById("PD_Level").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        }
        PD_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        PD_RecordTxt.innerHTML = lg.get("IDS_IO_REC");
        if (lgCls.version == gVar.CtArr[113]) {
            PD_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        }
        PD_All.innerHTML = lg.get("IDS_PATH_ALL");

        PD_SnapModelTxt.innerHTML = lg.get("IDS_SNAP_MODE");
        document.getElementById("PD_SnapModel").options[0].innerHTML = lg.get("IDS_DEFAULT");
        document.getElementById("PD_SnapModel").options[1].innerHTML = lg.get("IDS_SNAP_REALTIMEMODE");
        document.getElementById("PD_SnapModel").options[2].innerHTML = lg.get("IDS_SNAP_INTERVALMODE");
        PD_SnapNumTxt.innerHTML = lg.get("IDS_SNAP_NUM");
        document.getElementById("PD_SnapNum").options[3].innerHTML = lg.get("IDS_SNAPTYPE_UNLIMIT");
        PD_SnapIntervalTxt.innerHTML = lg.get("IDS_SNAP_INTERVAL");
        PD_DetectTypeTxt.innerHTML = lg.get("IDS_DETECTION_TYPE");
        PD_Pedestrian_Txt.innerHTML = lg.get("IDS_DETECT_PEDESTRIAN");
        PD_Vehicle_Txt.innerHTML = lg.get("IDS_DETECT_VEHICLE");
        PDRuleKind.innerHTML = lg.get("IDS_RULE_KIND");
        document.getElementById("PD_RuleKind").options[0].innerHTML = lg.get("IDS_RULE_RECT");
        document.getElementById("PD_RuleKind").options[1].innerHTML = lg.get("IDS_RULE_LINE");
        PDDetectionRange.innerHTML = lg.get("IDS_DETECTIONRANGE");
        document.getElementById("PD_DetectionRange").options[0].innerHTML = lg.get("IDS_FULLSCREEN");
        document.getElementById("PD_DetectionRange").options[1].innerHTML = lg.get("IDS_CUSTOMIZE");

        PDSensitive.innerHTML = lg.get("IDS_MOTION_SENSITIVITY");
        PD_MinPixelTxt.innerHTML = lg.get("IDS_MIN_PIX");
        PD_MotionDetTypeTxt.innerHTML = lg.get("IDS_DETECTIONMODE");
        document.getElementById("PD_MotionDet").options[0].innerHTML = lg.get("IDS_STATICMODE");
        document.getElementById("PD_MotionDet").options[1].innerHTML = lg.get("IDS_MOTIONMODE");
    } else if (pageName == "Face_Detection") {
        FD_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        FD_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        FD_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        FD_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        FD_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        FD_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        FD_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        FD_FullName.innerHTML = lg.get("IDS_FACE_DETECTION_TITLE");

        FD_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        FD_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        FDTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");

        FDChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        FD_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //
        document.getElementById("FD_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("FD_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_FD");
        if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[7]){
            document.getElementById("FD_ChnSel").options[0].innerHTML = lg.get("IDS_SMART_FD") + '+' + lg.get("IDS_RECTYPE_18");
        }else{
            document.getElementById("FD_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_FD");
        }

        FDBuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("FD_BuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("FD_BuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("FD_BuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("FD_BuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("FD_BuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        FDAlarmOutTime.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("FD_AlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("FD_AlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("FD_AlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("FD_AlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("FD_RecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("FD_RecordDelayTime").options[1].innerHTML = "10" + temp; //10s
            document.getElementById("FD_RecordDelayTime").options[2].innerHTML = "20" + temp; //20s
            document.getElementById("FD_RecordDelayTime").options[3].innerHTML = "30" + temp; //30s
            if (lgCls.version == gVar.CtArr[70]) {
                FD_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("FD_AlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("FD_AlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("FD_AlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("FD_AlarmOutTime").options[3].innerHTML = "60" + temp; //60S
            document.getElementById("FD_RecordDelayTime").options[0].innerHTML = "30" + temp; //5S
            temp = lg.get("IDS_MINUTE");
            document.getElementById("FD_RecordDelayTime").options[1].innerHTML = "1" + temp; //10s
            document.getElementById("FD_RecordDelayTime").options[2].innerHTML = "2" + temp; //20s
            document.getElementById("FD_RecordDelayTime").options[3].innerHTML = "5" + temp; //30s
        }
        FD_RecordDelay_Time.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording

        FD_AlarmOut_Manager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        FD_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        FD_Send.innerText = lg.get("IDS_IO_EMAIL"); //
        FD_Full.innerHTML = lg.get("IDS_FULLSCREEN");
        FD_RuleNumber.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        FDRuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        FDRuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        document.getElementById("FD_RuleType").options[0].innerHTML = lg.get("IDS__RULE_NORMAL");

        FDRuleScene.innerHTML = lg.get("IDS_SCENE"); //Scene
        document.getElementById("FD_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor

        ClearFDRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearFDRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        FDLevel.innerHTML = lg.get("IDS_REDUCT_V");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("FD_Level").options[0].innerHTML = lg.get("IDS_LEVEL_S");
            if (lgCls.version == gVar.CtArr[116]) {
                FDLevel.innerHTML = "Target Size";
                document.getElementById("FD_Level").options[1].innerHTML = "Medium";
                document.getElementById("FD_Level").options[2].innerHTML = "Large";
            } else {
                document.getElementById("FD_Level").options[1].innerHTML = lg.get("IDS_LEVEL_M");
                document.getElementById("FD_Level").options[2].innerHTML = lg.get("IDS_LEVEL_B");
            }
        } else {
            document.getElementById("FD_Level").options[0].innerHTML = lg.get("IDS_CAM_LOW");
            document.getElementById("FD_Level").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
            document.getElementById("FD_Level").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        }
        FD_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        FD_RecordTxt.innerHTML = lg.get("IDS_IO_REC");

        if (lgCls.version == gVar.CtArr[113]) {
            FD_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        }
        FD_All.innerHTML = lg.get("IDS_PATH_ALL");

        FD_FaceEnhance_Txt.innerHTML = lg.get("IDS_FACE_ENHANCE");
        FD_SnapModelTxt.innerHTML = lg.get("IDS_SNAP_MODE");
        document.getElementById("FD_SnapModel").options[0].innerHTML = lg.get("IDS_SNAP_REALTIMEMODE");
        document.getElementById("FD_SnapModel").options[1].innerHTML = lg.get("IDS_SNAP_OPTIMALMODE");
        document.getElementById("FD_SnapModel").options[2].innerHTML = lg.get("IDS_SNAP_INTERVALMODE");
        FD_SnapModelAdvanceTxt.innerHTML = lg.get("IDS_SNAP_ADVANCE");
        FD_FaceTypeTxt.innerHTML = lg.get("IDS_SNAP_TYPE");
        document.getElementById("FD_FaceType").options[0].innerHTML = lg.get("IDS_SNAPTYPE_SNAP");
        document.getElementById("FD_FaceType").options[1].innerHTML = lg.get("IDS_SNAPTYPE_DETECT");
        document.getElementById("FD_FaceType").options[2].innerHTML = lg.get("IDS_CUSTOMIZE");
        if(gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[70]){
            FD_SnapInterval_tip.innerHTML = lg.get("IDS_SNAPINTERAL_TIP");
            FD_adDefault_Txt.innerHTML = lg.get("IDS_DEFAULT_SET");
            FD_adDefault_Fro.innerHTML = lg.get("IDS_SNAPTYPE_SNAP");
            FD_adDefault_Mul.innerHTML = lg.get("IDS_SNAPTYPE_DETECT");
        }else{
            FD_adDefault_Fro.innerHTML = lg.get("IDS_SNAPTYPE_SNAP") + " "+ lg.get("IDS_DEFAULT");
            FD_adDefault_Mul.innerHTML = lg.get("IDS_SNAPTYPE_DETECT") + " " + lg.get("IDS_DEFAULT");
        }
        FD_RollRangeTxt.innerHTML = lg.get("IDS_ROLL_RANGE");
        FD_PitchRangeTxt.innerHTML = lg.get("IDS_PITCH_RANGE");
        FD_YawRangeTxt.innerHTML = lg.get("IDS_YAW_RANGE");
        FD_BlurStageTxt.innerHTML = lg.get("IDS_BLUR_STAGE");
        FD_MinPixelTxt.innerHTML = lg.get("IDS_MIN_PIX");
        FD_SnapNumTxt.innerHTML = lg.get("IDS_SNAP_NUM");
        document.getElementById("FD_SnapNum").options[3].innerHTML = lg.get("IDS_SNAPTYPE_UNLIMIT");
        FD_SnapIntervalTxt.innerHTML = lg.get("IDS_SNAP_INTERVAL");

        FDRuleKind.innerHTML = lg.get("IDS_RULE_KIND");
        document.getElementById("FD_RuleKind").options[0].innerHTML = lg.get("IDS_RULE_RECT");
        document.getElementById("FD_RuleKind").options[1].innerHTML = lg.get("IDS_RULE_LINE");

        FDDetectionRange.innerHTML = lg.get("IDS_DETECTIONRANGE");
        document.getElementById("FD_DetectionRange").options[0].innerHTML = lg.get("IDS_FULLSCREEN");
        document.getElementById("FD_DetectionRange").options[1].innerHTML = lg.get("IDS_CUSTOMIZE");

        FD_MotionDetTypeTxt.innerHTML = lg.get("IDS_DETECTIONMODE");
        document.getElementById("FD_MotionDet").options[0].innerHTML = lg.get("IDS_STATICMODE");
        document.getElementById("FD_MotionDet").options[1].innerHTML = lg.get("IDS_MOTIONMODE");
    } else if (pageName == "People_Cross_Counting") {
        CC_PID_btn.innerHTML = lg.get("IDS_SMART_PID");
        CC_LCD_btn.innerHTML = lg.get("IDS_SMART_LCD");
        CC_SOD_btn.innerHTML = lg.get("IDS_SMART_SOD");
        CC_PD_btn.innerHTML = lg.get("IDS_SMART_PD");
        CC_FD_btn.innerHTML = lg.get("IDS_SMART_FD");
        CC_CC_btn.innerHTML = lg.get("IDS_SMART_CC");
        CC_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        CC_FullName.innerHTML = lg.get("IDS_PEOPLE_CROSS_COUNTING_TITLE");

        CC_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        CC_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        CCTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");

        CCChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        CC_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //
        document.getElementById("CC_ChnSel").options[2].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("CC_ChnSel").options[1].innerHTML = lg.get("IDS_SMART_CC");
        document.getElementById("CC_ChnSel").options[0].innerHTML = lg.get("IDS_RECTYPE_18") + '+' + lg.get("IDS_SMART_CC");

        CCBuzzerMooTime.innerHTML = lg.get("IDS_PL_BUZZER"); //Buzzer
        temp = lg.get("IDS_SECOND");
        document.getElementById("CC_BuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //OFF
        document.getElementById("CC_BuzzerMooTime").options[1].innerHTML = "10" + temp; //10S
        document.getElementById("CC_BuzzerMooTime").options[2].innerHTML = "20" + temp; //20S
        document.getElementById("CC_BuzzerMooTime").options[3].innerHTML = "40" + temp; //40S
        document.getElementById("CC_BuzzerMooTime").options[4].innerHTML = "60" + temp; //60S

        CCAlarmOutTime.innerHTML = lg.get("IDS_LATCH_TIME"); //Latch Time
        temp = lg.get("IDS_SECOND");
        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("CC_AlarmOutTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("CC_AlarmOutTime").options[1].innerHTML = "10" + temp; //10S
            document.getElementById("CC_AlarmOutTime").options[2].innerHTML = "20" + temp; //20S
            document.getElementById("CC_AlarmOutTime").options[3].innerHTML = "30" + temp; //30S
            document.getElementById("CC_RecordDelayTime").options[0].innerHTML = "5" + temp; //5S
            document.getElementById("CC_RecordDelayTime").options[1].innerHTML = "10" + temp; //10s
            document.getElementById("CC_RecordDelayTime").options[2].innerHTML = "20" + temp; //20s
            document.getElementById("CC_RecordDelayTime").options[3].innerHTML = "30" + temp; //30s
            if (lgCls.version == gVar.CtArr[70]) {
                CC_toFTP.innerHTML = lg.get("IDS_SEND_TO_FTP");
            }
        } else {
            document.getElementById("CC_AlarmOutTime").options[0].innerHTML = "10" + temp; //10S
            document.getElementById("CC_AlarmOutTime").options[1].innerHTML = "20" + temp; //20S
            document.getElementById("CC_AlarmOutTime").options[2].innerHTML = "40" + temp; //40S
            document.getElementById("CC_AlarmOutTime").options[3].innerHTML = "60" + temp; //60S
            document.getElementById("CC_RecordDelayTime").options[0].innerHTML = "30" + temp; //5S
            temp = lg.get("IDS_MINUTE");
            document.getElementById("CC_RecordDelayTime").options[1].innerHTML = "1" + temp; //10s
            document.getElementById("CC_RecordDelayTime").options[2].innerHTML = "2" + temp; //20s
            document.getElementById("CC_RecordDelayTime").options[3].innerHTML = "5" + temp; //30s
        }
        CC_RecordDelay_Time.innerHTML = lg.get("IDS_REC_DELAYTIME"); //Post Recording

        CC_AlarmOut_Manager.innerText = lg.get("IDS_NEW_ALARM_OUT"); //Alarm Out
        CC_Show.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        CC_Send.innerText = lg.get("IDS_IO_EMAIL"); //
        CC_Full.innerHTML = lg.get("IDS_FULLSCREEN");
        CC_RuleNumber.innerHTML = lg.get("IDS_RULE_NUMBER"); //Rule Number

        CCRuleSwitch.innerHTML = lg.get("IDS_RULE_SWITCH"); //Rule Switch

        CCRuleType.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type
        document.getElementById("CC_RuleType").options[0].innerHTML = lg.get("IDS_ALARM_THINGS"); //object
        document.getElementById("CC_RuleType").options[1].innerHTML = lg.get("IDS_ALARM_PEOPLE"); //Pedestrian

        CCRuleTypeAdd.innerHTML = lg.get("IDS_RULE_TYPE"); //Rule Type

        CCRuleScene.innerHTML = lg.get("IDS_SCENE"); //Scene
        document.getElementById("CC_RuleScene").options[0].innerHTML = lg.get("IDS_INDOOR"); //Indoor
        //document.getElementById("CC_RuleScene").options[1].innerHTML = lg.get("IDS_OUTDOOR");

        ClearCCRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        ClearCCRectAll.innerHTML = lg.get("IDS_CLEANALL"); //
        CCSensitive.innerHTML = lg.get("IDS_SENSITIVE_P");
        CC_RecordC.innerHTML = lg.get("IDS_IO_LINK"); //
        CC_RecordTxt.innerHTML = lg.get("IDS_IO_REC");
        if (lgCls.version == gVar.CtArr[113]) {
            CC_DrawLine.innerHTML = lg.get("IDS_INTEL_DRAW");
        }
        CC_All.innerHTML = lg.get("IDS_PATH_ALL");
    } else if (pageName == "SwannClo_Sto") {
        C7CloSto_Token.innerHTML = lg.get("IDS_SWANN_TOKEN");
        C7CloSto_Channel.innerHTML = lg.get("IDS_MOTION_CH");
        C7CloSto_Detection.innerHTML = lg.get("IDS_SWANN_DETECTION");
        document.getElementById("C7CloStoDetection").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("C7CloStoDetection").options[1].innerHTML = lg.get("IDS_ENABLE");
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[7]) {
            C7CloSto_Driver.innerHTML = "Folder Name";
            SCS_RecordTime_lg.innerHTML = "Clip Length";
        } else {
            C7CloSto_Driver.innerHTML = lg.get("IDS_SWANN_DRIVER");
            SCS_RecordTime_lg.innerHTML = lg.get("IDS_IO_RECDELAYTIME");
        }
		
		if(lgCls.version == gVar.CtArr[70]){
			if(gVar.lg == "PLK"){
				SCS_CloudOverwrite_lg.innerHTML = "Nadpisywanie";
			}else if(gVar.lg == "RUS"){
				SCS_CloudOverwrite_lg.innerHTML = "Перезапись Облака";
			}
			
		}

        C7CloStoRf.innerHTML = lg.get("IDS_REFRESH"); //
        C7CloStoSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        C7CloStoCP.innerHTML = lg.get("IDS_Copy");
        C7CloSto_Enable.innerHTML = lg.get("IDS_CLOUD_ENABLE");
        C7CloSto_CloudType.innerHTML = lg.get("IDS_CLOUD_TYPE");
        CloSto_Test_Email.innerHTML = lg.get("IDS_TEST_CLOUDEMAIL");

        $("#SCS_CloudOverwrite").empty();
        $("#SCS_CloudOverwrite").append('<option class="option" value="0">' + lg.get("IDS_OFF") + '</option>');				//OFF
        $("#SCS_CloudOverwrite").append('<option class="option" value="1">' + lg.get("IDS_OVERWRITE_AUTO") + '</option>');	//Auto
        $("#SCS_CloudOverwrite").append('<option class="option" value="2">' + lg.get("IDS_OVERWRITE_1DAY") + '</option>');	//1 Day
        $("#SCS_CloudOverwrite").append('<option class="option" value="3">' + lg.get("IDS_OVERWRITE_3DAYS") + '</option>');	//3 Day
        $("#SCS_CloudOverwrite").append('<option class="option" value="4">' + lg.get("IDS_OVERWRITE_7DAYS") + '</option>');	//7 Day
        $("#SCS_CloudOverwrite").append('<option class="option" value="5">' + lg.get("IDS_OVERWRITE_14DAYS") + '</option>');	//14 Day
        $("#SCS_CloudOverwrite").append('<option class="option" value="6">' + lg.get("IDS_OVERWRITE_30DAYS") + '</option>');	//30 Day
        $("#SCS_CloudOverwrite").append('<option class="option" value="7">' + lg.get("IDS_OVERWRITE_90DAYS") + '</option>');	//90 Day
    } else if (pageName == "E_platform") {
        EP_Devicename.innerHTML = lg.get("IDS_BASE_DEVNAME");
        EP_Password.innerHTML = lg.get("IDS_PLATFORM_PWD");
        EP_PlatformIP.innerHTML = lg.get("IDS_PLATFORM_IP");

        EP_Sipport.innerHTML = lg.get("IDS_PLATFORM_SIPPORT");
        EP_expire_txt.innerHTML = lg.get("IDS_PLATFORM_EXPIRE");
        EP_remotePort_txt.innerHTML = lg.get("IDS_PLATFORM_REMOTEPORT");
        EP_DeviceID.innerHTML = lg.get("IDS_BASE_ID");
        EP_DeviceIP.innerHTML = lg.get("IDS_PLATFORM_DIP");
        EP_PlatformID.innerHTML = lg.get("IDS_PLATFORM_ID");
        EP_ScenesID.innerHTML = lg.get("IDS_PLATFORM_SCENESID");
        EP_RtspPort.innerHTML = lg.get("IDS_RTSP_PORT");
        EP_Channel.innerHTML = lg.get("IDS_PLATFORM_CHNID");

        EPconfigRf.innerHTML = lg.get("IDS_REFRESH"); //
        EPconfigSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        EPconfigDf.innerHTML = lg.get("IDS_DEFAULT");
    } else if (pageName == "sysinf_smart") {
        smart_channel.innerHTML = lg.get("IDS_MOTION_CH");
        smart_formType.innerHTML = lg.get("IDS_REPORT_TYPE"); //
        smartSearch.innerHTML = lg.get("IDS_IPC_ADD");
        document.getElementById("smart_formTypeSel").options[0].innerHTML = lg.get("IDS_DAY_REPORT");
        document.getElementById("smart_formTypeSel").options[1].innerHTML = lg.get("IDS_WEEK_REPORT");
        document.getElementById("smart_formTypeSel").options[2].innerHTML = lg.get("IDS_MONTH_REPORT");
        document.getElementById("smart_formTypeSel").options[3].innerHTML = lg.get("IDS_YEAR_REPORT");
        smart_alertType.innerHTML = lg.get("IDS_ALARM_TYPE"); //
        if (lgCls.version == gVar.CtArr[1] && gVar.lg == "RUS") {
            document.getElementById("smart_alertTypeSel").options[0].innerHTML = "Счётчик объектов";
            document.getElementById("smart_alertTypeSel").options[1].innerHTML = "Счётчик людей";
        } else {
            document.getElementById("smart_alertTypeSel").options[0].innerHTML = lg.get("IDS_PEOPLE_CROSS_COUNTING") + '-' + lg.get("IDS_ALARM_THINGS");
            document.getElementById("smart_alertTypeSel").options[1].innerHTML = lg.get("IDS_PEOPLE_CROSS_COUNTING") + '-' + lg.get("IDS_ALARM_PEOPLE");
            //document.getElementById("smart_alertTypeSel").options[0].innerHTML = lg.get("IDS_PERIMETER_ZONE_TITLE");
            //document.getElementById("smart_alertTypeSel").options[1].innerHTML = lg.get("IDS_PERIMETER_LINE_TITLE");
            //document.getElementById("smart_alertTypeSel").options[2].innerHTML = lg.get("IDS_GOODS_LOST_TITLE");
            //document.getElementById("smart_alertTypeSel").options[3].innerHTML = lg.get("IDS_HUMAN_DETECTION_TITLE");
            //document.getElementById("smart_alertTypeSel").options[4].innerHTML = lg.get("IDS_FACE_DETECTION_TITLE");
            //document.getElementById("smart_alertTypeSel").options[5].innerHTML = lg.get("IDS_PEOPLE_CROSS_COUNTING_TITLE");
        }

        smart_countType.innerHTML = lg.get("IDS_COUNT_TYPE"); //
        document.getElementById("smart_countTypeSel").options[0].innerHTML = lg.get("IDS_PEOPLE_LEAVE");
        document.getElementById("smart_countTypeSel").options[1].innerHTML = lg.get("IDS_PEOPLE_PEOPLE");
        //document.getElementById("smart_countTypeSel").options[2].innerHTML=lg.get("IDS_CC_ANALYSIS_BOTH");
        smart_startTime.innerHTML = lg.get("IDS_BEGIN_TIME");
        smart_countList.innerHTML = lg.get("IDS_SMART_LIST"); //
        smart_countGraph.innerHTML = lg.get("IDS_SMART_GRAPH"); //
        smart_countLineChart.innerHTML = lg.get("IDS_SMART_CHART"); //

        smart_export_btn.innerHTML = lg.get("IDS_PARAM_EXPORT");
        smart_scan_Btn.innerHTML = lg.get("IDS_SCAN");
        smart_export_path.innerHTML = lg.get("IDS__FILE_PATH");
        smart_export_name.innerHTML = lg.get("IDS__FILE_NAME");
    } else if (pageName == "Net_Filter") {
        Filter_SV.innerHTML = lg.get("IDS_CRUISE_SAVE");//Save
        Filter_Rf.innerHTML = lg.get("IDS_REFRESH");//Refresh

        FilterEnable_lg.innerHTML = lg.get("IDS_NET_FILTER");
        document.getElementById("FilterEnable").options[0].innerHTML = lg.get("IDS_OSD_DISABLE");//
        document.getElementById("FilterEnable").options[1].innerHTML = lg.get("IDS_OSD_ENABLE");//

        FilterMode_lg.innerHTML = lg.get("IDS_FILTER_MODE");
        document.getElementById("FilterMode").options[0].innerHTML = lg.get("IDS_FILTER_MODE0");
        document.getElementById("FilterMode").options[1].innerHTML = lg.get("IDS_FILTER_MODE1");

        Filter_Add.innerHTML = lg.get("IDS_FILTER_ADD");
        Filter_Clone.innerHTML = lg.get("IDS_FILTER_CLONE");
        Filter_Delete.innerHTML = lg.get("IDS_FILTER_DELETE");
        Filter_Type.innerHTML = lg.get("IDS_FILTER_TYPE");
        Filter_Address.innerHTML = lg.get("IDS_FILTER_ADDR");
    } else if (pageName == "gb_28181") {
        GB28181SV.innerHTML = lg.get("IDS_CRUISE_SAVE");//Save
        GB28181Rf.innerHTML = lg.get("IDS_REFRESH");//Refresh
        GB28181Df.innerHTML = lg.get("IDS_DEFAULT");//Default

        GB28181_switch_lable.innerHTML = lg.get("IDS_GB28181");
        document.getElementById("GB28181_switch").options[0].innerHTML = lg.get("IDS_OSD_DISABLE");//
        document.getElementById("GB28181_switch").options[1].innerHTML = lg.get("IDS_OSD_ENABLE");//

        GB28181_serverid_lable.innerHTML = lg.get("IDS_GB28181_SERVERID");
        GB28181_serveraddr_lable.innerHTML = lg.get("IDS_GB28181_SERVERIP");
        GB28181_serverport_lable.innerHTML = lg.get("IDS_GB28181_SERVERPORT");
        GB28181_localport_lable.innerHTML = lg.get("IDS_GB28181_LOCALPORT");
        GB28181_userid_lable.innerHTML = lg.get("IDS_GB28181_USERID");
        GB28181_password_lable.innerHTML = lg.get("IDS_GB28181_PASSWORD");
        GB28181_CH_lable.innerHTML = lg.get("IDS_GB28181_CHN");
        GB28181_CHid_lable.innerHTML = lg.get("IDS_GB28181_CHNID");

    } else if (pageName == "Video_output") {
        OutputRf.innerHTML = lg.get("IDS_REFRESH");
        OutputDf.innerHTML = lg.get("IDS_DEFAULT");
        OutputSave.innerHTML = lg.get("IDS_CRUISE_SAVE");
        video_output.innerHTML = lg.get("IDS_VIDEO_OUTPUT");
        //document.getElementById("video_output_sel").options[0].innerHTML = lg.get("IDS_REPORT_DAILY");
        seq_mode.innerHTML = lg.get("IDS_SEQ_MODE");
        dwell_time.innerHTML = lg.get("IDS_SEQ_DWELLTIME");
        output_resolution.innerHTML = lg.get("IDS_OUTPUT_RESOLUTION");
        output_tansparency.innerHTML = lg.get("IDS_OUTPUT_TRANSPARENCY");
        output_Overscan.innerHTML = lg.get("IDS_OUTPUT_OVERSCAN");
    } else if (pageName == "Switch_set") {
        SWRf.innerHTML = lg.get("IDS_REFRESH");
        SWSV.innerHTML = lg.get("IDS_CRUISE_SAVE");
        swip_address.innerHTML = lg.get("IDS_NET_IPADDR"); //ip
        swnet_mask.innerHTML = lg.get("IDS_NET_MASK"); //
        SW_default_gateway.innerHTML = lg.get("IDS_NET_GATEWAY"); //
        Switch_Mode.innerHTML = lg.get("IDS_SWITCH_MODE"); //
        document.getElementById("SWitchMode").options[0].innerHTML = lg.get("IDS_AUTO"); //
        var temp = lg.get("IDS_MANUAL");
        if (lgCls.version == gVar.CtArr[89]) {
            temp = "Manual Mode";
        }
        document.getElementById("SWitchMode").options[1].innerHTML = temp; //
    } else if (pageName == "alarm_pir") {
        PirSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        PirRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        PIRTriggerAlarm.innerHTML = lg.get("IDS_TRIGGER_ALARMOUT");
        PirCP.innerHTML = lg.get("IDS_Copy"); //Copy
        pir_channels_num_1.innerHTML = lg.get("IDS_MOTION_CH"); //
        pir_sense_grade.innerHTML = lg.get("IDS_MOTION_SENSITIVITY"); //
        PirFullScreen_txt.innerHTML = lg.get("IDS_FULLSCREEN");
        c2_PirFullScreen.innerHTML = lg.get("IDS_FULLSCREEN");
        PIRALARMOUTPUT.innerText = lg.get("IDS_IO_ENABLEOUT");
        PirAlarmChannel.innerHTML = lg.get("IDS_ALARM_CHANNAL");
        //  Analog_channelTxt.innerHTML = lg.get("IDS_ANALOG_CHN");
        //IP_channelTxt.innerHTML = lg.get("IDS_IO_IPCKALL");
        if (lgCls.version == gVar.CtArr[10]) {
            PirLatchTime.innerHTML = lg.get("IDS_LATCHTIME_CIF");
        } else {
            PirLatchTime.innerHTML = lg.get("IDS_IO_OUTTIME");
        }
        document.getElementById("PirSensitivity").options[0].innerHTML = lg.get("IDS_IO_LEVER8"); //8
        document.getElementById("PirSensitivity").options[1].innerHTML = lg.get("IDS_IO_LEVER7"); //7
        document.getElementById("PirSensitivity").options[2].innerHTML = lg.get("IDS_IO_LEVER6"); //6
        document.getElementById("PirSensitivity").options[3].innerHTML = lg.get("IDS_IO_LEVER5"); //5
        document.getElementById("PirSensitivity").options[4].innerHTML = lg.get("IDS_IO_LEVER4"); //4
        document.getElementById("PirSensitivity").options[5].innerHTML = lg.get("IDS_IO_LEVER3"); //3
        document.getElementById("PirSensitivity").options[6].innerHTML = lg.get("IDS_IO_LEVER2"); //2
        document.getElementById("PirSensitivity").options[7].innerHTML = lg.get("IDS_IO_LEVER1"); //1
        pir_buzzer_time.innerHTML = lg.get("IDS_IO_BUZZERTIME"); //
        document.getElementById("PirBuzzerMooTime").options[0].innerHTML = lg.get("IDS_OFF"); //
        temp = lg.get("IDS_SECOND");
        document.getElementById("PirBuzzerMooTime").options[1].innerHTML = "10" + temp; //10
        document.getElementById("PirBuzzerMooTime").options[2].innerHTML = "20" + temp; //20
        document.getElementById("PirBuzzerMooTime").options[3].innerHTML = "40" + temp; //40
        document.getElementById("PirBuzzerMooTime").options[4].innerHTML = "60" + temp; //60
        pir_record_delay_time_1.innerHTML = lg.get("IDS_IO_RECDELAYTIME"); //

        //
        document.getElementById("c2_PirFullScreenSel").options[0].innerHTML = lg.get("IDS_OFF"); //
        document.getElementById("c2_PirFullScreenSel").options[1].innerHTML = "1" + temp; //1
        document.getElementById("c2_PirFullScreenSel").options[2].innerHTML = "2" + temp; //2
        document.getElementById("c2_PirFullScreenSel").options[3].innerHTML = "3" + temp; //3
        document.getElementById("c2_PirFullScreenSel").options[4].innerHTML = "5" + temp; //5
        document.getElementById("c2_PirFullScreenSel").options[5].innerHTML = "7" + temp; //7
        document.getElementById("c2_PirFullScreenSel").options[6].innerHTML = "10" + temp; //10
        document.getElementById("c2_PirFullScreenSel").options[7].innerHTML = "20" + temp; //20
        document.getElementById("c2_PirFullScreenSel").options[8].innerHTML = "30" + temp; //30

        temp = lg.get("IDS_MINUTE");
        pir_linkage_record_channel.innerHTML = lg.get("IDS_IO_LINK"); //
        pir_all.innerHTML = lg.get("IDS_PATH_ALL");

        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]) {
            pir_start_touch_record_1.innerHTML = lg.get("IDS_IO_LINK");
        } else {
            pir_start_touch_record_1.innerHTML = lg.get("IDS_IO_REC"); //
        }

        //warn_export_time_1.innerHTML=lg.get("IDS_IO_OUTTIME");//
        temp = lg.get("IDS_SECOND");

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            document.getElementById("PirAlarmOutTime").options[0].innerHTML = "5" + temp;
            document.getElementById("PirAlarmOutTime").options[1].innerHTML = "10" + temp;
            document.getElementById("PirAlarmOutTime").options[2].innerHTML = "20" + temp;
            document.getElementById("PirAlarmOutTime").options[3].innerHTML = "30" + temp;
        } else {
            document.getElementById("PirAlarmOutTime").options[0].innerHTML = "10" + temp; //10
            document.getElementById("PirAlarmOutTime").options[1].innerHTML = "20" + temp; //20
            document.getElementById("PirAlarmOutTime").options[2].innerHTML = "40" + temp; //40
            document.getElementById("PirAlarmOutTime").options[3].innerHTML = "60" + temp; //60
        }

        pir_show_message.innerHTML = lg.get("IDS_IO_MESSAGE"); //
        pir_start_sendEmail.innerHTML = lg.get("IDS_IO_EMAIL"); //
        pir_ClearBtn.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        pir_SelectBtn.innerHTML = lg.get("IDS_MOTION_SELECT"); //
        start_pir.innerHTML = lg.get("IDS_MOTION_ENABLE"); //
        pirSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
        pir_Ok.innerHTML = lg.get("IDS_Copy");
        pirSelectedAll.innerHTML = lg.get("IDS_PATH_ALL");
        pir_LightLinkage.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        pir_loudAlarmLink.innerHTML = lg.get("IDS_AUDIO_ALARM");
    } else if (pageName == "Intrusion_Detection") {
        ID_ID_btn.innerHTML = lg.get("IDS_SMART_ID");
        ID_RMD_btn.innerHTML = lg.get("IDS_SMART_RMD");
        ID_TMR_btn.innerHTML = lg.get("IDS_SMART_TMR");
        ID_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        ID_FullName.innerHTML = lg.get("IDS_INTRUSION_DETECTION_TITLE");

        ID_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        ID_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        ClearIDRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //

        IDChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        ID_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //

        imgResizeFactor_Txt.innerHTML = lg.get("IDS_ID_IMGRESIZE_FACTOR");
        minPersonConf_Txt.innerHTML = lg.get("IDS_ID_MIN_PERSONCONF");
        skipFrameNum_Txt.innerHTML = lg.get("IDS_ID_SKIP_FRAMENUM");
        bgsUpdataFactor_Txt.innerHTML = lg.get("IDS_ID_BGS_UPDATE");
        BBSInRoiThr_Txt.innerHTML = lg.get("IDS_ID_BBS_INROI");
        fgInRoiThr_Txt.innerHTML = lg.get("IDS_ID_FG_INROI");
        fgPesBBThr_Txt.innerHTML = lg.get("IDS_ID_FG_PES");
        minOverlapRatio_Txt.innerHTML = lg.get("IDS_ID_MIN_OLR");
        pesRectRatio_Txt.innerHTML = lg.get("IDS_ID_PES_RR");
        pesRectMaxRatio_Txt.innerHTML = lg.get("IDS_ID_PES_RMR");
        footRectRatioFrom_Txt.innerHTML = lg.get("IDS_ID_FRTF");
        footRectRatioTo_Txt.innerHTML = lg.get("IDS_ID_FRRT");
    } else if (pageName == "Red_Mantle_Detection") {
        RMD_ID_btn.innerHTML = lg.get("IDS_SMART_ID");
        RMD_RMD_btn.innerHTML = lg.get("IDS_SMART_RMD");
        RMD_TMR_btn.innerHTML = lg.get("IDS_SMART_TMR");
        RMD_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        RMD_FullName.innerHTML = lg.get("IDS_RED_MANTLE_DETECTION_TITLE");

        RMD_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        RMD_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //

        RMDChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        RMD_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //

        fImgResizeFactor_Txt.innerHTML = lg.get("IDS_ID_IMGRESIZE_FACTOR");
        minCircleConf_Txt.innerHTML = lg.get("IDS_RMD_MIN_CIRCLECONF");
        filterSeconds_Txt.innerHTML = lg.get("IDS_RMD_FILTER_SECONDS");
        minFilterSize_Txt.innerHTML = lg.get("IDS_RMD_MIN_FILTERSIZE");
        nSkipFrames_Txt.innerHTML = lg.get("IDS_RMD_SKIPFRAMES");
        bgsUpdateSecondsSlow_Txt.innerHTML = lg.get("IDS_RMD_BGSUSS");
        bgsUpdateSecondsFast_Txt.innerHTML = lg.get("IDS_RMD_BGSUSF");
        fDetectRatioFixed_Txt.innerHTML = lg.get("IDS_RMD_DRF");
        fDetectRatioLosted_Txt.innerHTML = lg.get("IDS_RMD_DRL");
        fDetectRatioOcclusion_Txt.innerHTML = lg.get("IDS_RMD_DRO");
        fDetectRatioNonOcclusion_Txt.innerHTML = lg.get("IDS_RMD_DRNO");
        vanishKeepSeconds_Txt.innerHTML = lg.get("IDS_RMD_VKS");
        toFixKeepSeconds_Txt.innerHTML = lg.get("IDS_RMD_TFKS");
        occlusionKeepSeconds_Txt.innerHTML = lg.get("IDS_RMD_OKS");
        toMonitorWaitSeconds_Txt.innerHTML = lg.get("IDS_RMD_TMWS");
        reinitWaitSeconds_Txt.innerHTML = lg.get("IDS_RMD_RWS");
    } else if (pageName == "Type_Meter_Recognition") {
        TMR_ID_btn.innerHTML = lg.get("IDS_SMART_ID");
        TMR_RMD_btn.innerHTML = lg.get("IDS_SMART_RMD");
        TMR_TMR_btn.innerHTML = lg.get("IDS_SMART_TMR");
        TMR_Name.innerHTML = lg.get("IDS_KIT_TYPENAME");
        TMR_FullName.innerHTML = lg.get("IDS_TYPE_METER_RECONGNITION_TITLE");

        TMR_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        TMR_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        ClearTMRRect.innerHTML = lg.get("IDS_MOTION_CLEAR"); //

        TMRChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch
        TMR_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //

        begangle_Txt.innerHTML = lg.get("IDS_TMR_BEGANGLE");
        anglescale_Txt.innerHTML = lg.get("IDS_TMR_ANGLESCALE");
        initv_Txt.innerHTML = lg.get("IDS_TMR_INITV");
        valuescale_Txt.innerHTML = lg.get("IDS_TMR_VALUESCALE");
    } else if (pageName == "IntelligentNewSet") {
        intell_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        intell_Save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //

        intell_SiaIntSwitch.innerHTML = lg.get("IDS_SWITCH"); //Switch

        intell_sceneNumber.innerHTML = lg.get("IDS_SCENE_NUMBER"); //
        intell_ploy.innerHTML = lg.get("IDS_PLOY");
        intell_faceQualityEnhancement.innerHTML = lg.get("IDS_FACE_QE");
        intell_faceSensitivity.innerHTML = lg.get("IDS_FACE_SENSITIVITY");
        intell_picQuality.innerHTML = lg.get("IDS_PICQ");

        intell_bigSourceImageWH.innerHTML = lg.get("IDS_BSI_WH");
        intell_smallSourceImageWH.innerHTML = lg.get("IDS_SSI_WH");
        intell_maxFaceWH.innerHTML = lg.get("IDS_MAXF_WH");
        intell_minFaceWH.innerHTML = lg.get("IDS_MINF_WH");
        intell_isSendFullImage.innerHTML = lg.get("IDS_IS_SFI");
        intell_isPreviewFaceInfo.innerHTML = lg.get("IDS_IS_PFI");
    } else if (pageName == "SNMP_Set") {
        SNMPRf.innerHTML = lg.get("IDS_REFRESH"); //
        SNMPSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //
        SNMP_Enable_text.innerHTML = lg.get("IDS_SNMP_ENABLE");
        SNMP_Version.innerHTML = lg.get("IDS_SNMP_VERSION"); //Switch
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            document.getElementById("SNMP_v").options[0].innerHTML = "비활성화";
        } else {
            document.getElementById("SNMP_v").options[0].innerHTML = lg.get("IDS_OFF");
        }

        SNMP_Port.innerHTML = lg.get("IDS_SNMP_PORT"); //
        SNMP_ReadC.innerHTML = lg.get("IDS_SNMP_READC");
        SNMP_WriteC.innerHTML = lg.get("IDS_SNMP_WRITEC");
        SNMP_TrapIPAddr.innerHTML = lg.get("IDS_SNMP_TIP");
        SNMP_TrapPort.innerHTML = lg.get("IDS_SNMP_TP");
        SNMP_IPAddr.innerHTML = lg.get("IDS_IPADDRESS");
        SNMP_Mac.innerHTML = lg.get("IDS_BASE_MAC");

        SNMP_UserNameR.innerHTML = lg.get("IDS_USERNAME_R");
        SNMP_AuthenticationTypeR.innerHTML = lg.get("IDS_SNMP_AT");
        SNMP_AuthenticationPasswordR.innerHTML = lg.get("IDS_SNMP_AP");
        SNMP_EncryptedRType.innerHTML = lg.get("IDS_SNMP_ET");
        SNMP_EncryptedPasswordR.innerHTML = lg.get("IDS_SNMP_EP");

        SNMP_UserNameRW.innerHTML = lg.get("IDS_USERNAME_RW");
        SNMP_AuthenticationTypeRW.innerHTML = lg.get("IDS_SNMP_AT");
        SNMP_AuthenticationPasswordRW.innerHTML = lg.get("IDS_SNMP_AP");
        SNMP_EncryptedRWType.innerHTML = lg.get("IDS_SNMP_ET");
        SNMP_EncryptedPasswordRW.innerHTML = lg.get("IDS_SNMP_EP");
    } else if (pageName == "IntelligentNewUser") {
        HGI_Rf.innerHTML = lg.get("IDS_REFRESH"); //
        HGI_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //

        HGI_ChannelNum.innerHTML = lg.get("IDS_MOTION_CH"); //Switch
        HGIChnSwitch.innerHTML = lg.get("IDS_SWITCH"); //
        delaycount_Txt.innerHTML = lg.get("IDS_HGI_DELAYC");
        misscount_Txt.innerHTML = lg.get("IDS_HGI_MISSC");
        rminsize_w_Txt.innerHTML = lg.get("IDS_HGI_RMINW");
        rminsize_h_Txt.innerHTML = lg.get("IDS_HGI_RMINH");
        rmaxsize_w_Txt.innerHTML = lg.get("IDS_HGI_RMAXW");
        rmaxsize_h_Txt.innerHTML = lg.get("IDS_HGI_RMAXH");

        pminsize_Txt.innerHTML = lg.get("IDS_HGI_PMINS");
        pmaxsize_Txt.innerHTML = lg.get("IDS_HGI_PMAXS");
        cropused_Txt.innerHTML = lg.get("IDS_RULE_SWITCH");
        tframeNum_Txt.innerHTML = lg.get("IDS_HGI_TFBUM");

        SnapShotMode_Txt.innerHTML = lg.get("IDS_SNAPSHOT_MODE");
        document.getElementById("SnapShotMode_sel").options[0].innerHTML = lg.get("IDS_HGI_OSMODE");
        document.getElementById("SnapShotMode_sel").options[1].innerHTML = lg.get("IDS_HGI_ISMODE");
        SnapShotFrame_Txt.innerHTML = lg.get("IDS_SNAPSHOT_FRAME");
        SavePic_Txt.innerHTML = lg.get("IDS_HGI_SAVEPIC");

        ClearHGIRect.innerHTML = lg.get("IDS_MOTION_CLEAR");
    } else if (pageName == "flood_light") {
        RecfloodSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        RecfloodRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        RecfloodDf.innerHTML = lg.get("IDS_DEFAULT");
        RecfloodSchedule.innerHTML = lg.get("IDS_REC_PLAN");
        if (lgCls.version != gVar.CtArr[0]) {
            fl_enable.innerHTML = lg.get("IDS_FLOOD_LIGHT");
        } else {
            fl_enable.innerHTML = lg.get("IDS_MOTION_ENABLE");
        }

        fl_bright.innerHTML = lg.get("IDS_FLOOD_LIGHTLEVEL");
        fl_brightTime.innerHTML = lg.get("IDS_FL_DURATION");
        fl_ColorImageCtrl.innerHTML = lg.get("IDS_FL_COLORIMAGE");

        fl_strobeF.innerHTML = lg.get("IDS_FL_STROBEFQ");
        document.getElementById("strobe_frequency").options[0].innerHTML = lg.get("IDS_CAM_LOW");
        document.getElementById("strobe_frequency").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
        document.getElementById("strobe_frequency").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        fl_sensitivity.innerHTML = lg.get("IDS_MOTION_SENSITIVITY");
        document.getElementById("flood_sensitivity").options[0].innerHTML = lg.get("IDS_IO_LEVER1");
        document.getElementById("flood_sensitivity").options[1].innerHTML = lg.get("IDS_IO_LEVER2");
        document.getElementById("flood_sensitivity").options[2].innerHTML = lg.get("IDS_IO_LEVER3");
        document.getElementById("flood_sensitivity").options[3].innerHTML = lg.get("IDS_IO_LEVER4");
        document.getElementById("flood_sensitivity").options[4].innerHTML = lg.get("IDS_IO_LEVER5");
        document.getElementById("flood_sensitivity").options[5].innerHTML = lg.get("IDS_IO_LEVER6");
        document.getElementById("flood_sensitivity").options[6].innerHTML = lg.get("IDS_IO_LEVER7");
        document.getElementById("flood_sensitivity").options[7].innerHTML = lg.get("IDS_IO_LEVER8");
        fl_alarmOut.innerText = lg.get("IDS_IO_ENABLEOUT");
        fl_alarmOutTime.innerHTML = lg.get("IDS_IO_OUTTIME");
        temp = lg.get("IDS_SECOND");
        document.getElementById("flood_aotime").options[0].innerHTML = "10" + temp; //10
        document.getElementById("flood_aotime").options[1].innerHTML = "20" + temp; //20
        document.getElementById("flood_aotime").options[2].innerHTML = "40" + temp; //40
        document.getElementById("flood_aotime").options[3].innerHTML = "60" + temp; //60
        fl_recEanble.innerHTML = lg.get("IDS_IO_REC");
        fl_recDelayTime.innerHTML = lg.get("IDS_IO_RECDELAYTIME");
        document.getElementById("flood_rdtime").options[0].innerHTML = "10" + temp;//
        document.getElementById("flood_rdtime").options[1].innerHTML = "30" + temp;//
        temp = lg.get("IDS_MINUTE");
        document.getElementById("flood_rdtime").options[2].innerHTML = "1" + temp;//
        document.getElementById("flood_rdtime").options[3].innerHTML = "2" + temp;//
        document.getElementById("flood_rdtime").options[4].innerHTML = "5" + temp;//
        fl_loudAlarmLink.innerHTML = lg.get("IDS_AUDIO_ALARM");
        FlClearBtn.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        FlSelectBtn.innerHTML = lg.get("IDS_MOTION_SELECT"); //

        fl_siren.innerHTML = lg.get("IDS_AUDIO_ALARM");
        fl_sirenlevel.innerHTML = lg.get("IDS_SIREN_LEVEL");
        fl_sirenbrightTime.innerHTML = lg.get("IDS_FL_SIRENDURATION");

        if (lgCls.version == gVar.CtArr[0]) {
            fl_mode.innerHTML = lg.get("IDS_FL_WARNMINGLIGHT");
            document.getElementById("flood_mode").options[0].innerHTML = lg.get("IDS_FL_SOLID");
            document.getElementById("flood_light_bright_sel").options[0].innerHTML = lg.get("IDS_CAM_LOW");
            document.getElementById("flood_light_bright_sel").options[1].innerHTML = lg.get("IDS_CAM_MIDD");
            document.getElementById("flood_light_bright_sel").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        } else {
            fl_mode.innerHTML = lg.get("IDS_FL_MODE");
            document.getElementById("flood_mode").options[0].innerHTML = lg.get("IDS_FL_WARNMINGLIGHT");

        }
        document.getElementById("flood_mode").options[1].innerHTML = lg.get("IDS_FL_STROBE");

    } else if (pageName == "flood_light_schedule") {
        RecfloodSchSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        RecfloodSchRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        RecfloodSchExit.innerHTML = (lgCls.version == gVar.CtArr[0] ? lg.get("IDS_CANCLE") : lg.get("IDS_EXIT"));

        rec_flood.innerHTML = lg.get("IDS_FLOODLIGHT_TITLE");
        flood_rec_norecord.innerHTML = lg.get("IDS_DISABLE");
    } else if (pageName == "sound_detection") {
        sdtSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        sdtRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        sdt_enable.innerHTML = lg.get("IDS_MOTION_ENABLE");
        sdt_riseTxt.innerHTML = lg.get("IDS_SOUND_RISE");
        sdt_riseSenTxt.innerHTML = lg.get("IDS_RISE_SENSITIVITY");
        sdt_declineTxt.innerHTML = lg.get("IDS_SOUND_DECLINE");
        sdt_declineSenTxt.innerHTML = lg.get("IDS_DECLINE_SENSITIVITY");
        sdt_soundTxt.innerHTML = lg.get("IDS_SOUND_INTENSITY");
        sdt_aoTxt.innerText = lg.get("IDS_IO_ENABLEOUT");
        sdt_aoTimeTxt.innerHTML = lg.get("IDS_IO_OUTTIME");
        temp = lg.get("IDS_SECOND");
        document.getElementById("sdt_aoTime").options[0].innerHTML = "10" + temp; //10
        document.getElementById("sdt_aoTime").options[1].innerHTML = "20" + temp; //20
        document.getElementById("sdt_aoTime").options[2].innerHTML = "40" + temp; //40
        document.getElementById("sdt_aoTime").options[3].innerHTML = "60" + temp; //60
        sdt_recTxt.innerHTML = lg.get("IDS_IO_REC");
        sdt_recTimeTxt.innerHTML = lg.get("IDS_IO_RECDELAYTIME");
        document.getElementById("sdt_rdTime").options[0].innerHTML = "10" + temp; //10
        document.getElementById("sdt_rdTime").options[1].innerHTML = "30" + temp; //30
        temp = lg.get("IDS_MINUTE");
        document.getElementById("sdt_rdTime").options[2].innerHTML = "1" + temp;
        document.getElementById("sdt_rdTime").options[3].innerHTML = "2" + temp;
        document.getElementById("sdt_rdTime").options[4].innerHTML = "5" + temp;
        sdt_emlTxt.innerHTML = lg.get("IDS_IO_EMAIL");
        sdt_ftpUdTxt.innerHTML = lg.get("IDS_CFG_FTP_UPLOAD");
        sdt_audioTxt.innerHTML = lg.get("IDS_AUDIO_ABNORMAL");

        rec_sdt.innerHTML = lg.get("IDS_SOUND_DETECTION");
        rec_sdtnorecord.innerHTML = lg.get("IDS_DISABLE");

        if(gDevice.devType == devTypeEnum.DEV_IPC){
            if(lgCls.version == gVar.CtArr[7]){
                sdt_decibelTxt.innerHTML = lg.get("IDS_SOUND_DECIBE");
            } else if(lgCls.version == gVar.CtArr[70]){
                rec_sdtnorecord.innerHTML = lg.get("IDS_SOUND_DISABLE");
            }
        }
    } else if (pageName == "SSL") {
        SSL_Save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        SSL_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        SSLSwitch.innerHTML = lg.get("IDS_HTTPS");
        SSL_HTTPSType.innerHTML = lg.get("IDS_HTTPS_TYPE");
        document.getElementById("SSL_HTTPSTypeSel").options[0].innerHTML = lg.get("IDS_HTTPS_UNIQUE");
        document.getElementById("SSL_HTTPSTypeSel").options[1].innerHTML = lg.get("IDS_HTTPS_PUBLIC");
        SSL_CAC.innerHTML = lg.get("IDS_HTTPS_CERTIFICATE");
        SSL_CACbtnScan.innerHTML = lg.get("IDS_SCAN");
        SSL_CACbtnInstall.innerHTML = lg.get("IDS_INSTALL");
        SSL_CACbtnUninstall.innerHTML = lg.get("IDS_UNINSTALL");
        SSL_Key.innerHTML = lg.get("IDS_NORMALCLO_KEY");
        SSL_KbtnScan.innerHTML = lg.get("IDS_SCAN");
        SSL_KbtnInstall.innerHTML = lg.get("IDS_INSTALL");
        SSL_KbtnUninstall.innerHTML = lg.get("IDS_UNINSTALL");

        SSL_WariningTxt.innerHTML = lg.get("IDS_HTTPS_TIP");
    } else if (pageName == "HTTPS") {
        SXHTTPS_Save.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        SXHTTPS_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        HttpsEnable_lg.innerHTML = lg.get("IDS_HTTPS");
        CertType_lg.innerHTML = lg.get("IDS_CERTIFICATE_TYPE");
        document.getElementById("CerType").options[0].innerHTML = lg.get("IDS_DEFAULT");
        document.getElementById("CerType").options[1].innerHTML = lg.get("IDS_CUSTOM");
        CerFile_lg.innerHTML = lg.get("IDS_HTTPS_CERTIFICATE");
        CerFile_Btn.innerHTML = lg.get("IDS_SCAN");
        KeyFile_Btn.innerHTML = lg.get("IDS_SCAN");
    } else if (pageName == "Alarm_Jh") {
        AlarmJh_Rf.innerHTML = lg.get("IDS_REFRESH");
        AlarmJh_Df.innerHTML = lg.get("IDS_DEFAULT");
        AlarmJh_Save.innerHTML = lg.get("IDS_CRUISE_SAVE");
        AlarmJh_TYPE_L.innerHTML = lg.get("IDS_TYPE");

        AlarmJh_CHN_L.innerHTML = lg.get("IDS_MOTION_CH"); //Channel
        $("#AlarmJh_WeekTop_L").text(lg.get("IDS_DST_DSTMODE01")); //Week
        document.getElementById("AlarmJh_WeekTop_Value").options[0].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("AlarmJh_WeekTop_Value").options[1].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("AlarmJh_WeekTop_Value").options[2].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("AlarmJh_WeekTop_Value").options[3].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("AlarmJh_WeekTop_Value").options[4].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("AlarmJh_WeekTop_Value").options[5].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("AlarmJh_WeekTop_Value").options[6].innerHTML = document.getElementById("AlarmJh_WeekCopy_src").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");

        AlarmJh_ChCopy_cp.innerHTML = lg.get("IDS_REC_COPYCH");
        AlarmJh_WeekCopy_cp.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");

        AlarmJh_ChCopy_btn.innerHTML = lg.get("IDS_Copy");
        AlarmJh_WeekCopy_btn.innerHTML = lg.get("IDS_Copy");

        AlarmJh_WeekCopy_to.innerHTML = lg.get("IDS_COPY_TO");
        AlarmJh_ChCopy_to.innerHTML = lg.get("IDS_COPY_TO");

        document.getElementById("AlarmJh_WeekCopy_dest").options[0].innerHTML = lg.get("IDS_PATH_ALL"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[1].innerHTML = lg.get("IDS_WEEKDAY_01"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[2].innerHTML = lg.get("IDS_WEEKDAY_02"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[3].innerHTML = lg.get("IDS_WEEKDAY_03"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[4].innerHTML = lg.get("IDS_WEEKDAY_04"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[5].innerHTML = lg.get("IDS_WEEKDAY_05"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[6].innerHTML = lg.get("IDS_WEEKDAY_06"); //sun
        document.getElementById("AlarmJh_WeekCopy_dest").options[7].innerHTML = lg.get("IDS_WEEKDAY_07"); //sun
        document.getElementById("AlarmJh_TYPE_Value").options[0].innerHTML = lg.get("IDS_MOTION_ALARM"); //sun
        document.getElementById("AlarmJh_TYPE_Value").options[1].innerHTML = lg.get("IDS_ALARM_IN"); //sun
        document.getElementById("AlarmJh_TYPE_Value").options[2].innerHTML = lg.get("IDS_ALARM_OUT"); //sun
    } else if (pageName == "alarmSchedule") {
        alarmSchRf.innerHTML = lg.get("IDS_REFRESH");
        alarmSchSave.innerHTML = lg.get("IDS_CRUISE_SAVE");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32] && gVar.lg == "KOR") {
            alarmSchDf.innerHTML = "초기화";
            as_alarm.innerHTML = "활성화";
        } else {
            alarmSchDf.innerHTML = lg.get("IDS_DEFAULT");
            as_alarm.innerHTML = lg.get("IDS_RECTYPE_02");
        }

        rec_norecord.innerHTML = lg.get("IDS_DISABLE");
    } else if (pageName == "IntelligentNewUserTest") {
        yp_algCtrl.innerHTML = lg.get("IDS_ALG_CTL");
        yp_algCtrlName.innerHTML = lg.get("IDS_ALG_CTLNAME");
        yp_algCtrEnable.innerHTML = lg.get("IDS_MOTION_ENABLE");
        document.getElementById("yp_ctrlSel").options[0].innerHTML = lg.get("IDS_DISABLE");
        document.getElementById("yp_ctrlSel").options[1].innerHTML = lg.get("IDS_ENABLE");
        yp_ctrl_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        yp_ctrl_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        yp_algMode.innerHTML = lg.get("IDS_ALG_MODE");
        yp_algModeSet0.innerHTML = lg.get("IDS_ALG_MODESET") + ' 1';
        yp_algModeType0.innerHTML = lg.get("IDS_ALG_MODETYPE") + ' 1';
        yp_algModeParam0.innerHTML = lg.get("IDS_ALG_MODEPARAM") + ' 1';
        yp_algModeSet1.innerHTML = lg.get("IDS_ALG_MODESET") + ' 2';
        yp_algModeType1.innerHTML = lg.get("IDS_ALG_MODETYPE") + ' 2';
        yp_algModeParam1.innerHTML = lg.get("IDS_ALG_MODEPARAM") + ' 2';
        yp_algModeSet2.innerHTML = lg.get("IDS_ALG_MODESET") + ' 3';
        yp_algModeType2.innerHTML = lg.get("IDS_ALG_MODETYPE") + ' 3';
        yp_algModeParam2.innerHTML = lg.get("IDS_ALG_MODEPARAM") + ' 3';
        yp_algModeSet3.innerHTML = lg.get("IDS_ALG_MODESET") + ' 4';
        yp_algModeType3.innerHTML = lg.get("IDS_ALG_MODETYPE") + ' 4';
        yp_algModeParam3.innerHTML = lg.get("IDS_ALG_MODEPARAM") + ' 4';
        yp_mode_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        yp_mode_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        yp_algParam.innerHTML = lg.get("IDS_ALG_MODEPARAM");
        yp_algParamName.innerHTML = lg.get("IDS_ALG_CTLNAME");
        yp_algParamCon.innerHTML = lg.get("IDS_ALG_MODEPARAM");
        yp_param_SV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        yp_param_Rf.innerHTML = lg.get("IDS_REFRESH"); //Refresh

        yp_algStatus.innerHTML = lg.get("IDS_ALG_STATUS");
        yp_algStatusNum.innerHTML = lg.get("IDS_ALG_STATUSNUM");
        yp_algStatusName.innerHTML = lg.get("IDS_ALG_CTLNAME");
        yp_algStatusSet.innerHTML = lg.get("IDS_STATUS");
        yp_status_Rf.innerHTML = lg.get("IDS_REFRESH");
    }
    else if (pageName == "flood_lightmulchn") {
        RecfloodSave.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
		
		RecfloodCpy.innerHTML = lg.get("IDS_Copy");
		dtrSelectCopy.innerHTML = lg.get("IDS_SEL_CHID");
		dtrOk.innerHTML = lg.get("IDS_Copy");
		dtrSelectedAll.innerHTML = lg.get("IDS_PATH_ALL");
		
        RecfloodRf.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        RecfloodDf.innerHTML = lg.get("IDS_DEFAULT");
        RecfloodSchedule.innerHTML = lg.get("IDS_REC_PLAN");
        fl_channel.innerHTML = lg.get("IDS_MOTION_CH")
        fl_enable.innerHTML = lg.get("IDS_FLOOD_LIGHT");
        fl_bright.innerHTML = lg.get("IDS_FLOOD_LIGHTLEVEL");
        fl_brightTime.innerHTML = lg.get("IDS_FL_DURATION");
        fl_sirenbrightTime.innerHTML = lg.get("IDS_FL_SIRENDURATION");

        fl_strobeF.innerHTML = lg.get("IDS_FL_STROBEFQ");
        document.getElementById("strobe_frequency").options[0].innerHTML = lg.get("IDS_CAM_LOW");
        document.getElementById("strobe_frequency").options[1].innerHTML = (lgCls.version == gVar.CtArr[139] ? "Middle" : lg.get("IDS_CAM_MIDD"));
        document.getElementById("strobe_frequency").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        fl_sensitivity.innerHTML = lg.get("IDS_MOTION_SENSITIVITY");
        document.getElementById("flood_sensitivity").options[0].innerHTML = lg.get("IDS_IO_LEVER1");
        document.getElementById("flood_sensitivity").options[1].innerHTML = lg.get("IDS_IO_LEVER2");
        document.getElementById("flood_sensitivity").options[2].innerHTML = lg.get("IDS_IO_LEVER3");
        document.getElementById("flood_sensitivity").options[3].innerHTML = lg.get("IDS_IO_LEVER4");
        document.getElementById("flood_sensitivity").options[4].innerHTML = lg.get("IDS_IO_LEVER5");
        document.getElementById("flood_sensitivity").options[5].innerHTML = lg.get("IDS_IO_LEVER6");
        document.getElementById("flood_sensitivity").options[6].innerHTML = lg.get("IDS_IO_LEVER7");
        document.getElementById("flood_sensitivity").options[7].innerHTML = lg.get("IDS_IO_LEVER8");
        fl_alarmOut.innerText = lg.get("IDS_IO_ENABLEOUT");
        fl_alarmOutTime.innerHTML = lg.get("IDS_IO_OUTTIME");
        temp = lg.get("IDS_SECOND");
        document.getElementById("flood_aotime").options[0].innerHTML = "10" + temp; //10
        document.getElementById("flood_aotime").options[1].innerHTML = "20" + temp; //20
        document.getElementById("flood_aotime").options[2].innerHTML = "40" + temp; //40
        document.getElementById("flood_aotime").options[3].innerHTML = "60" + temp; //60
        fl_recEanble.innerHTML = lg.get("IDS_IO_REC");
        fl_recDelayTime.innerHTML = lg.get("IDS_IO_RECDELAYTIME");
        document.getElementById("flood_rdtime").options[0].innerHTML = "10" + temp;//
        document.getElementById("flood_rdtime").options[1].innerHTML = "30" + temp;//
        temp = lg.get("IDS_MINUTE");
        document.getElementById("flood_rdtime").options[2].innerHTML = "1" + temp;//
        document.getElementById("flood_rdtime").options[3].innerHTML = "2" + temp;//
        document.getElementById("flood_rdtime").options[4].innerHTML = "5" + temp;//
        fl_loudAlarmLink.innerHTML = lg.get("IDS_AUDIO_ALARM");
        FlClearBtn.innerHTML = lg.get("IDS_MOTION_CLEAR"); //
        FlSelectBtn.innerHTML = lg.get("IDS_MOTION_SELECT"); //

        if (lgCls.version == gVar.CtArr[0]) {
            fl_mode.innerHTML = lg.get("IDS_FL_WARNMINGLIGHT");
            document.getElementById("flood_mode").options[0].innerHTML = lg.get("IDS_FL_SOLID");
            document.getElementById("flood_light_bright_sel").options[0].innerHTML = lg.get("IDS_CAM_LOW");
            document.getElementById("flood_light_bright_sel").options[1].innerHTML = lg.get("IDS_CAM_MIDD");
            document.getElementById("flood_light_bright_sel").options[2].innerHTML = lg.get("IDS_CAM_HIGHT");
        } else {
            fl_mode.innerHTML = lg.get("IDS_FL_MODE");
            document.getElementById("flood_mode").options[0].innerHTML = lg.get("IDS_FL_WARNMINGLIGHT");

        }
        document.getElementById("flood_mode").options[1].innerHTML = lg.get("IDS_FL_STROBE");
        RecfloodExit.innerHTML = (lgCls.version == gVar.CtArr[0] ? lg.get("IDS_CANCLE") : lg.get("IDS_EXIT"));
        fl_siren.innerHTML = lg.get("IDS_AUDIO_ALARM");
        fl_sirenlevel.innerHTML = lg.get("IDS_SIREN_LEVEL");
        flood_week_text.innerHTML = lg.get("IDS_DST_DSTMODE01");
        document.getElementById("flood_week_sel").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("flood_week_sel").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("flood_week_sel").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("flood_week_sel").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("flood_week_sel").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("flood_week_sel").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("flood_week_sel").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");
        document.getElementById("flood_copy_week_dst").options[0].innerHTML = lg.get("IDS_PATH_ALL");
        document.getElementById("flood_copy_week_dst").options[1].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("flood_copy_week_dst").options[2].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("flood_copy_week_dst").options[3].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("flood_copy_week_dst").options[4].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("flood_copy_week_dst").options[5].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("flood_copy_week_dst").options[6].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("flood_copy_week_dst").options[7].innerHTML = lg.get("IDS_WEEKDAY_07");
        document.getElementById("flood_copy_week_src").options[0].innerHTML = lg.get("IDS_WEEKDAY_01");
        document.getElementById("flood_copy_week_src").options[1].innerHTML = lg.get("IDS_WEEKDAY_02");
        document.getElementById("flood_copy_week_src").options[2].innerHTML = lg.get("IDS_WEEKDAY_03");
        document.getElementById("flood_copy_week_src").options[3].innerHTML = lg.get("IDS_WEEKDAY_04");
        document.getElementById("flood_copy_week_src").options[4].innerHTML = lg.get("IDS_WEEKDAY_05");
        document.getElementById("flood_copy_week_src").options[5].innerHTML = lg.get("IDS_WEEKDAY_06");
        document.getElementById("flood_copy_week_src").options[6].innerHTML = lg.get("IDS_WEEKDAY_07");
        flood_copy_day_text.innerHTML = lg.get("IDS_RECPLAN_COPYDAY");
        flood_copy_week_to.innerHTML = lg.get("IDS_COPY_TO");
        flood_copy_ch_text.innerHTML = lg.get("IDS_REC_COPYCH");
        flood_copy_ch_to.innerHTML = lg.get("IDS_COPY_TO");
        flood_copy_week_ok.innerHTML = lg.get("IDS_Copy");
        flood_copy_ch_ok.innerHTML = lg.get("IDS_Copy");
    } else if(pageName == "net_VPN"){
        VPNSwitch_Txt.innerText = lg.get("IDS_VPN_ENABLE");
        VpnServerIP_Txt.innerText = lg.get("IDS_VPN_IP");
        VpnPort_Txt.innerText = lg.get("IDS_VPN_PORT");
        VpnUserName_Txt.innerText = lg.get("IDS_VPN_USERNAME");
        VpnPassword_Txt.innerText = lg.get("IDS_VPN_PWD");
        VpnProtocol_Txt.innerText = lg.get("IDS_VPN_PROTOCOL");
        document.getElementById("VpnProtocol").options[0].innerHTML = lg.get("IDS_PLATFORM_TCP");
        document.getElementById("VpnProtocol").options[1].innerHTML = lg.get("IDS_PLATFORM_UDP");
        VpnNetDev_Txt.innerText = lg.get("IDS_VPN_NETDEV");
        document.getElementById("VpnNetDev").options[0].innerHTML = lg.get("IDS_VPN_TUN");
        document.getElementById("VpnNetDev").options[1].innerHTML = lg.get("IDS_VPN_TAP");
        VpnCipher_Txt.innerText = lg.get("IDS_VPN_CIPHER");
        VpnCompLzo_Txt.innerText = lg.get("IDS_VPN_COMPLZO");
        VPN_CAC.innerText = lg.get("IDS_VPN_CAC");
        VPN_CACbtnScan.innerText = lg.get("IDS_SCAN");
        VPN_CACbtnInstall.innerText = lg.get("IDS_INSTALL");
        VpnTlsKeySwitch_Txt.innerText = lg.get("IDS_VPN_TLSENABLE");
        VPN_Tls.innerText = lg.get("IDS_VPN_TLS");
        VPN_TlsbtnScan.innerText = lg.get("IDS_SCAN");
        VPN_TlsbtnInstall.innerText = lg.get("IDS_INSTALL");
        VpnAddOptions_Txt.innerText = lg.get("IDS_VPN_OPTS");

        VPN_Rf.innerText = lg.get("IDS_REFRESH");
        VPN_Save.innerText = lg.get("IDS_CRUISE_SAVE");
    } else if(pageName == "ptzSchedule"){
        ptzs_switchTxt.innerText = lg.get("IDS_MOTION_ENABLE");
        ptzs_typeTxt.innerText = lg.get("IDS_TYPE");
        document.getElementById("ptzs_type").options[0].innerHTML = lg.get("IDS_CRUISE_PRESET");
        document.getElementById("ptzs_type").options[1].innerHTML = lg.get("IDS_CRUISE_LINDESCAN");
        document.getElementById("ptzs_type").options[2].innerHTML = lg.get("IDS_CRUISE_TRACK");
        document.getElementById("ptzs_type").options[3].innerHTML = lg.get("IDS_CRUISE_PATTERNSCAN");
        document.getElementById("ptzs_type").options[4].innerHTML = lg.get("IDS_RESTORE");
        ptzs_preset.innerHTML = lg.get("IDS_CRUISE_PRESET");
        ptzs_line.innerHTML = lg.get("IDS_CRUISE_LINDESCAN");
        ptzs_track.innerHTML = lg.get("IDS_CRUISE_TRACK");
        ptzs_pattern.innerHTML = lg.get("IDS_CRUISE_PATTERNSCAN");
        ptzs_restart.innerHTML = lg.get("IDS_RESTORE");
        rec_norecord.innerHTML = lg.get("IDS_DISABLE");
        ptzs_timeTxt.innerHTML = lg.get("IDS_RECOVER_TIME");

        ptzSchRf.innerText = lg.get("IDS_REFRESH");
        ptzSchSave.innerText = lg.get("IDS_CRUISE_SAVE");
        ptzSchDf.innerHTML = lg.get("IDS_DEFAULT");
    } else if(pageName == "onvif_set"){
        onvif_Enable.innerText = lg.get("IDS_MOTION_ENABLE");
        onvif_Rf.innerText = lg.get("IDS_REFRESH");
        onvif_SV.innerText = lg.get("IDS_CRUISE_SAVE");
    } else if (pageName == "four_stream_set") {
        //four_stream_set page  -->
        fourStreamSV.innerHTML = lg.get("IDS_CRUISE_SAVE"); //Save
        fourStreamRF.innerHTML = lg.get("IDS_REFRESH"); //Refresh
        mainstream.innerHTML = lg.get("IDS_ENCODE_INFO"); //
        substream.innerHTML = lg.get("IDS_SUBSTREAM"); //
        mobistream.innerHTML = lg.get("IDS_LOW_DIF"); //
        fourstream.innerHTML = lg.get("IDS_FOURSTREAM");

        fourStream_Enable_Txt.innerHTML = lg.get("IDS_OSD_ENABLE");
        fourStream_Resolution_Txt.innerHTML = lg.get("IDS_ENCODE_RESOLUTION"); //Resolution
        fourStream_Fps_Txt.innerHTML = lg.get("IDS_ENCODE_FPS"); //FPS
        fourStream_VCT_Txt.innerHTML = lg.get("IDS_CODE_TYPE");
        fourStream_VCL_Txt.innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL");
        document.getElementById("fourStream_VCL").options[0].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_B");
        document.getElementById("fourStream_VCL").options[1].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_M");
        document.getElementById("fourStream_VCL").options[2].innerHTML = lg.get("IDS_VIDEO_CODE_LEVEL_H");
        fourStream_BitrateCtrl_Txt.innerHTML = lg.get("IDS_BITRATE_CTRL");
        document.getElementById("fourStream_BitrateCtrl").options[0].innerHTML = lg.get("IDS_ML_FIX");
        document.getElementById("fourStream_BitrateCtrl").options[1].innerHTML = lg.get("IDS_ML_VAR");
        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
            document.getElementById("fourStream_VideoQuality").options[0].innerHTML = "1";
            document.getElementById("fourStream_VideoQuality").options[1].innerHTML = "2";
            document.getElementById("fourStream_VideoQuality").options[2].innerHTML = "3";
            document.getElementById("fourStream_VideoQuality").options[3].innerHTML = "4";
            document.getElementById("fourStream_VideoQuality").options[4].innerHTML = "5";
            document.getElementById("fourStream_VideoQuality").options[5].innerHTML = "6";
        } else {
            document.getElementById("fourStream_VideoQuality").options[0].innerHTML = lg.get("IDS_MS_QUALITY_0");
            document.getElementById("fourStream_VideoQuality").options[1].innerHTML = lg.get("IDS_MS_QUALITY_1");
            document.getElementById("fourStream_VideoQuality").options[2].innerHTML = lg.get("IDS_MS_QUALITY_2");
            document.getElementById("fourStream_VideoQuality").options[3].innerHTML = lg.get("IDS_MS_QUALITY_3");
            document.getElementById("fourStream_VideoQuality").options[4].innerHTML = lg.get("IDS_MS_QUALITY_4");
            document.getElementById("fourStream_VideoQuality").options[5].innerHTML = lg.get("IDS_MS_QUALITY_5");
        }
        fourStream_BitrateMode_Txt.innerHTML = lg.get("IDS_STREAMMODE"); //Bitrate Mode
        fourStream_Bitrate_Txt.innerHTML = lg.get("IDS_ENCODE_BITRATE"); //Bitrate
        document.getElementById("fourStream_BitrateMode").options[0].innerHTML = lg.get("IDS_PRESET_2");
        document.getElementById("fourStream_BitrateMode").options[1].innerHTML = lg.get("IDS_USER_DEFINE_2");
        fourStream_Audio_Txt.innerHTML = lg.get("IDS_ENCODE_AUDIO"); //Audio
        fourStream_IFrameInterval_text.innerHTML = lg.get("IDS_I_RATIO");
    }
}
