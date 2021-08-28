// JavaScript Document
//hashmap -- 
//Refresh the hash table data please call the refresh ()
//Update the data please call up ()
//Delete the object please call the clear ()
//zdy-2011/7/9

function HashmapCom() {
    Init(this);	//constructor
    function Init(p) {
        p.map = new Hashmap();
    }

    function Hashmap() {
        this.length = 0;
        this.set = function (key, value) {
            this[key] = value;
            this[this.length] = key;
            this.length++;
        }

        this.up = function (key, value) {
            (typeof this[key] != 'undefined') ? (this[key] = value) : alert("hashmap: key " + key + " undefined");
        }

        this.get = function (key) {
            return ((typeof this[key] == 'undefined') ? ("key:"+key+" undefined") : this[key]);
        }
    }

    this.refresh = function () {
        this.map.length = 0;
    }

    this.clear = function () {
        delete this.map;
    }

    this.length = function () {
        return (this.map.length);
    }

    this.set = function (key, value) {
        this.map.set(key, value);
    }

    this.get = function (key) {
        return (this.map.get(key));
    }

    this.up = function (key, value) {
        this.map.up(key, value);
    }
}

//UI Class
function UIReg() {
    //Button button
    //objStr:Be registered button object string
    //Width:Be registered button object incident response offset to the left
    //top:Be registered button object incident response up offset
    this.Button = function (objStr, left, top, callback) {
        var MouseDown = false;
        if (typeof top == 'undefined' || top == null || top == "") top = false;
        if (!($.isFunction(callback))) {
            callback = function (a, b) {
                return (true);
            }
        }
        $p = $(objStr);
        $p.attr("name", "");
        $p.mouseover(function (e) {
            $(this).css("cursor", "pointer");
            if (callback(e, this)) {
                if ($.browser.mozilla) {
                    var position = $(this).css("background-position");
                    top = position.split(" ")[1];
                    $(this).css("background-position", "-" + left + "px " + top);
                } else {
                    if (top)
                        $(this).css("background-position", "-" + left + "px " + top + "px");
                    $(this).css("background-position-x", "-" + left + "px");
                }
            }
        }).mouseout(function (e) {
            if (callback(e, this)) {
                if ($.browser.mozilla) {
                    var position = $(this).css("background-position");
                    top = position.split(" ")[1];
                    $(this).css("background-position", "0px " + top);
                } else {
                    if (top)
                        $(this).css("background-position", "0px " + top + "px");
                    $(this).css("background-position-x", "0px");
                }
            }
        }).mousedown(function (e) {
            if (callback(e, this)) {
                if ($.browser.mozilla) {
                    var position = $(this).css("background-position");
                    top = position.split(" ")[1];
                    $(this).css("background-position", "-" + left * 2 + "px " + top);
                } else {
                    if (top)
                        $(this).css("background-position", "-" + left * 2 + "px " + top + "px");
                    $(this).css("background-position-x", "-" + left * 2 + "px");
                }
            }
        }).mouseup(function (e) {
            if (callback(e, this)) {
                if ($.browser.mozilla) {
                    var position = $(this).css("background-position");
                    top = position.split(" ")[1];
                    $(this).css("background-position", "-" + left + "px " + top);
                } else {
                    if (top)
                        $(this).css("background-position", "-" + left + "px " + top + "px");
                    $(this).css("background-position-x", "-" + left + "px");
                }
            }
        })
    }

	this.Select = function() {}

    //obj Be registered object string
    //left small icon      background-position Left the offset
    //top On the offset
    //color border Variations Color
    //defaultColor border  Default Color
    //size  border
   /* ==============================
        <div id="xxx">
            <div oriTop="0">spanImg</div>
            <input/>
        </div>
        eg:UI.Input($("#xxx"),32,"","73b9dc","1e3b56",2);)
     ==============================*/
    this.Input = function (obj, left, top, color,defaultColor,size) {
        var _self = $(obj);
        var _input = _self.find("input");
        var _spanImg = _self.children("div");
        var _disabled = _input.attr("disabled");
        if (typeof  top == "undefined" || top == null || top == "") {
            top = false;
        }

        if (typeof size == "undefined" || size == null || size == "") {
            size = 1;
        }

        if (_disabled == "undefined" || _disabled == "false") {       //Conditions for input
            _input.mouseover(function () {
                _input.css({"cursor": "text"});
                _self.css("border", size + "px solid #" + color);
            }).mouseout(function () {
                _self.css("border", size + "px solid #" + defaultColor);
            }).focus(function () {
                _self.css("border", size + "px solid #" + color).mouseout(function () {
                    _self.css("border", size + "px solid #" + color);
                });
                if (top) {
                    _spanImg.css("background-position", "-" + left + "px " + "-" + top + "px");
                    return;
                }
                _spanImg.css("background-position", "-" + left + "px " + "-" + _spanImg.attr("oriTop") + "px");
            }).blur(function () {
                _self.css("border", size + "px solid #" + defaultColor).mouseover(function () {
                    _self.css("border", size + "px solid #" + color);
                }).mouseout(function () {
                    _self.css("border", size + "px solid #" + defaultColor);
                });
                _spanImg.css("background-position", "0 -" + _spanImg.attr("oriTop") + "px");
            })
        } else if (_disabled == "disabled" || _disabled == "true") {
            _self.mouseover(function () {
                _self.css({"cursor": "not-allowed","border": size + "px solid #" + defaultColor});
                _input.css({"cursor": "not-allowed"})
            })
        }
    };
}


//device information Class
function DeviceInfo() {

    this.basicInfo = {};
    this.loginRsp = {};
    this.bInit = 0;
    this.id = 0;//Log in successfully returns the id
    this.devState = [];//Channel, the length of the array is equal to the channel number
    this.devType = devTypeEnum.DEV_IPC;
    this.setLoginRsp = function(data) {
    		this.loginRsp = data;
    		this.devType = this.loginRsp.HighType >> 8 & 0xf;
    		for(var i=0; i<this.loginRsp.ChannelNum; i++) {
    			this.devState[i] = {};
    			this.devState[i].CurChnState = 2;//default
    		}
    }
    this.hasPreviewRight = function(ch) {
    		if(this.loginRsp.UserPreview*1) {
    			if(ch < 32) {
    				return this.loginRsp.PreviewChannel >> ch & 1;
    			} else {
    				var index = parseInt((ch-32)/32);
	                var pos = ch%32;
	                return this.loginRsp.PreviewChannel_EX[index] >> pos & 1;
    			}
    		}
    		return false;
    }
    
    this.hasPlaybackRight = function(ch) {
    		if(this.loginRsp.UserPlayBack*1) {
    			if(ch < 32) {
    				return this.loginRsp.PlayBackChannel >> ch & 1;
    			} else {
    				var index = parseInt((ch-32)/32);
	                var pos = ch%32;
	                return this.loginRsp.PlayBackChannel_EX[index] >> pos & 1;
    			}
    		}
    		return false;
    }
    
    this.hasBackupRight = function(ch) {
    		if(this.loginRsp.UserBackup*1) {
    			if(ch < 32) {
    				return this.loginRsp.BackupChannel >> ch & 1;
    			} else {
    				var index = parseInt((ch-32)/32);
	                var pos = ch%32;
	                return this.loginRsp.BackupChannel_EX[index] >> pos & 1;
    			}
    		}
    		return false;
    }
    
    this.hasPtzRight = function(ch) {
    		if(this.loginRsp.UserPtzControl*1) {
    			if(ch < 32) {
    				return this.loginRsp.PtzControlChannel >> ch & 1;
    			} else {
    				var index = Math.floor((ch-32)/32);
	                var pos = ch%32;
	                return this.loginRsp.PtzControlChannel_Ex[index] >> pos & 1;
    			}
    		}
    		return false;
    }
    
    this.hasUserSetRight = function(right){
    	if(this.loginRsp.UserSetRight>>right&1)
    		return true;
    	else
    		return false;
    }

    this.getChannelName = function(chIndex) {
        var channelName;
        var chnTotalNum = this.loginRsp.ChannelNum;
        var analogNum = this.loginRsp.AnalogChNum;
        var chnNum = chIndex < 9 ? '0'+ (chIndex + 1) : (chIndex + 1);
        if(gDevice.devType == devTypeEnum.DEV_DVR || gDevice.devType == devTypeEnum.DEV_NVR || gDevice.devType == devTypeEnum.DEV_IPC) { // DVR or NVR or IPC
            channelName = lg.get('IDS_CH') + chnNum;
        }else if(gDevice.devType == devTypeEnum.DEV_HDVR) {
            if((analogNum != 0) && (analogNum == chnTotalNum) ){   //Hybird DVR
                channelName = lg.get('IDS_CH') + chnNum;
            }else if(analogNum == 0){       //Hybird NVR
                channelName = lg.get("IDS_CH") + chnNum;
            }else if(analogNum > 0 && analogNum < chnTotalNum){     //Hybird
                if(chIndex < analogNum){
                    channelName = lg.get("IDS_CH") + chnNum;
                } else if(chIndex >= analogNum && chIndex < chnTotalNum){
                    var _IPChnNum = (chIndex - analogNum) < 9 ? '0' + (chIndex-analogNum+1) : (chIndex-analogNum+1);
					var _IPChnStr = "IP " + lg.get("IDS_CH");//IP CH
					if((gDevice.devState[chIndex].Abilities>>AbilityTypeEnum.SUPPROT_WIREFREE) & 1) {
						_IPChnStr = "W-" + lg.get("IDS_CH");//W-CH
					}					
                    channelName = _IPChnStr + _IPChnNum;
                }
            }
        }
        return channelName;
    };

	this.getChannelType = function(chNum,anNum,state){
		var str='',i,type='',status;
		if(typeof state == "undefined"){
			status = CHNStatus.CHN_ONLINE;
		}else{
			status = state;
		}
		if(anNum>0){// analog channel
		    for(i=0;i<chNum;i++){
				var uiNum;
				if(i<anNum){
					type = lg.get('IDS_CH');
					uiNum = i+1;
				}else{
					type = "IP " + lg.get("IDS_CH");
					uiNum = i+1-anNum;
				}
				
				var uiNum = (uiNum<10) ? ('0'+uiNum) : uiNum;
				
				if(gDevice.devState[i].CurChnState==status){
					if(gVar.bHide_IntelPage_HalfAnalogCh){
						if(i<anNum){
							if(i<(anNum/2)){
								str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
							}
						}else{
							str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
						}
					}else{
						if(gDevice.devType == devTypeEnum.DEV_HDVR){
							if(i<anNum){
								str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
							}else{
								if (gDevice.devState[i].ProtocolType == 17) {
									continue;//this channel can not set param,don't show
								}
								str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
							}
						}else{
							str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
						}
					}
				}
			}
		}else{
			 type = lg.get("IDS_CH");
			 for(i=0;i<chNum;i++){
				if(gDevice.devState[i].CurChnState==status){
					str += '<option class="option" value="'+i+'">'+type+(((i+1)<10)?('0'+(i+1)):(i+1))+'</option>';
				}
			}
		}
		return str;
	}

    this.getIPChannelType = function(chNum,anNum,state){//HDVR  PD、FD、CC just get the type of IP Channels
        var str='',i,type='',status;
        if(typeof state == "undefined"){
            status = CHNStatus.CHN_ONLINE;
        }else{
            status = state;
        }
        if(anNum>0){// analog channel
            for(i=anNum;i<chNum;i++){
                var uiNum;
                type = "IP " + lg.get("IDS_CH");
                uiNum = i+1-anNum;

                var uiNum = (uiNum<10) ? ('0'+uiNum) : uiNum;

                if(gDevice.devState[i].CurChnState==status){
                    str += '<option class="option" value="'+i+'">'+type+(uiNum)+'</option>';
                }
            }
        }else{
            type = lg.get("IDS_CH");
            for(i=0;i<chNum;i++){
                if(gDevice.devState[i].CurChnState==status){
                    str += '<option class="option" value="'+i+'">'+type+(((i+1)<10)?('0'+(i+1)):(i+1))+'</option>';
                }
            }
        }
        return str;
    }
	this.isOnline = function(ch){
		if(gDevice.loginRsp.ZeroChFlag && ch == gDevice.loginRsp.ChannelNum)
			return true;
		return (gDevice.devState[ch].CurChnState == CHNStatus.CHN_ONLINE);
	}
    this.isBOTTOM = function(ch){
        return (gDevice.devState[ch].CurChnState == CHNStatus.CHN_BOTTOM);
    }
	
	this.isSleep = function(ch){
		return (gDevice.devState[ch].CurChnState == CHNStatus.CHN_SLEEP);
	}
	
	this.hasAbility = function(ch,n){//ability of judgement
		if(ch >= gDevice.devState.length){
			return false;
		}
		return (((gDevice.devState[ch].Abilities>>n) & 1) == 1);
	}

    this.hasAbilityEX = function(ch,n){//ability of judgement
        if(ch >= gDevice.devState.length){
            return false;
        }
        return (((gDevice.devState[ch].AbilitiesEx>>n) & 1) == 1);
    }
	
	this.hasIntelligentAbilities = function(ch,n){//ability of judgement
		return (((gDevice.devState[ch].PageIntelligentChn>>n) & 1) == 1);
	}

    Init(this);//initialize
    function Init(p) {
        //Initializes the device method
        p.OcxInit = function (index) {
            return (gOcx.OcxInit(index))
        };
        p.getDayOfWeek = function () {
            return (gOcx.GetWeekStart())
        };
        p.SetDebugFlag = function (flag) {
            return (gOcx.SetDebugFlag(flag))
        };
        p.initWindow = function(subMsg, data) {
        		return (gOcx.initWindow(subMsg, data));
        }
        p.setPageIndex = function(index) {
        		return (gOcx.setPageIndex(index));
        }
        p.setPlaybackPageIndex = function(index) {
        		return (gOcx.setPlaybackPageIndex(index));
        }
        p.SetLanguage = function (langArr) {
            return (gOcx.SetLanguage(langArr));
        };
        p.GetDvrInfo = function () {
            return (gOcx.GetDvrInfo())
        };
        p.UserLogin = function () {
            return (gOcx.UserLogin());
        };
        p.setPreviewShowMode = function (showMode) {
        		return (gOcx.setPreviewShowMode(showMode));
        };
        p.setPlaybackShowMode = function (showMode) {
        		return (gOcx.setPlaybackShowMode(showMode));
        };
        p.restPreviewIndex = function(){
			return (gOcx.restPreviewIndex());
		};
		p.getPreviewViewsIndex = function() {
			return (gOcx.getPreviewViewsIndex());
		};
        p.PreviewPlay = function (chnArr,playType) {
            return (gOcx.PreviewPlay(chnArr,playType))
        };
        p.SetFishEyeSoftMode = function (chn,mode) {
            return (gOcx.SetFishEyeSoftMode(chn,mode))
        };
        p.PreviewStop = function (chnArr) {
            return (gOcx.PreviewStop(chnArr))
        };
        p.PreViewCap = function (chArr) {
			if(g_noPermission){
				ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"),lg.get("IDS_NOPER_TIP0")+"</br>"+lg.get("IDS_NOPER_TIP1")+"\</br>"+lg.get("IDS_NOPER_TIP2"));
				return {Code:errCodeEnum.Code_NoPermission};
			}
            return (gOcx.PreViewCap(chArr))
        };
        p.GetCapDir = function (str) {
            /*if ($.browser.safari) {
                str = str.substring(0, str.lastIndexOf("/"));
            }*/
            gOcx.GetCapDir(str);
        };
        p.GetCapImage = function (str) {
            gOcx.GetCapImage(str)
        };
        p.PreViewRec = function (type, chArr) {
            if(g_noPermission){
				ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"),lg.get("IDS_NOPER_TIP0")+"</br>"+lg.get("IDS_NOPER_TIP1")+"\</br>"+lg.get("IDS_NOPER_TIP2"));
				return {Code:errCodeEnum.Code_NoPermission};
			}
			return (gOcx.PreViewRec(type, chArr))
        };
        p.PreViewSound = function (type) {
            return (gOcx.PreViewSound(type))
        };
        p.PreViewZoom = function () {
            return (gOcx.PreViewZoom())
        };
        p.PreView3DPosition = function () {
            return (gOcx.PreView3DPosition())
        };
        p.DualTalk = function (bSwitch) {
            return (gOcx.DualTalk(bSwitch))
        };
        p.SetDualTalkVolume = function (volume) {
            return (gOcx.SetDualTalkVolume(volume))
        };
        p.PreViewSelectWnd = function(channel) {
        		return (gOcx.PreViewSelectWnd(channel));
        };
        p.PreViewRightMenu = function(data) {
        		return (gOcx.PreViewRightMenu(data));
        };
        p.PlayBackSelectWnd = function(channel) {
        		return (gOcx.PlayBackSelectWnd(channel));
        };
        p.Logout = function () {
            gOcx.Logout()
        };
        p.SetVideoratio = function (mode) {
            return (gOcx.SetVideoratio(mode))
        };
        p.SetStreamType = function (streamTypeArr, chArr) {
            return (gOcx.SetStreamType(streamTypeArr, chArr));
        };
        p.OcxChangePage = function (pageType) {
            return (gOcx.OcxChangePage(pageType))
        };
        p.SearchByMon = function (RecordType, RecordTime, StreamType) {
            return (gOcx.SearchByMon(RecordType, RecordTime, StreamType))
        };
        p.SearchByDay = function (chnArr,RecordType, RecordTime, pbStreamType,RecMode) {
            return (gOcx.SearchByDay(chnArr,RecordType, RecordTime, pbStreamType,RecMode))
        };
        p.PTZcontrol = function (SubType, Data) {
            return (gOcx.PTZcontrol(SubType, Data))
        };
        p.GetAndSetParameter = function (nPage, jsonData, type, nFlag) {
            return (gOcx.GetAndSetParameter(nPage, jsonData, type * 1, nFlag * 1))
        };
        p.FileUpdate = function (type, path,channelmask,filetype,data) {
            return (gOcx.FileUpdate(type, path,channelmask,filetype,data))
        };
        p.ParamPageVideoCtrl = function (cmdType) {
            return (gOcx.ParamPageVideoCtrl(cmdType))
        };
        p.setPreviewFullScreen = function (bFullScreen) {
        		return (gOcx.setPreviewFullScreen(bFullScreen));
        };
        p.GetSetInfo = function () {
            return (gOcx.GetSetInfo())
        };
        p.SetInfo = function (data) {
            return (gOcx.SetInfo(data))
        };
        p.SetPath = function () {
            return (gOcx.SetPath())
        };
		p.AutoUpgrade = function (type) {
			return (gOcx.AutoUpgrade(type))
		};
		p.ModifyPsw = function (pswVal) {
			return (gOcx.ModifyPsw(pswVal))
		};
        p.RemoteTest = function (type, paramData) {
            return (gOcx.RemoteTest(type, paramData));
        };
        p.ShowStreamRate = function (flag, millisec) {
            return (gOcx.ShowStreamRate(flag, millisec))
        };
        p.GetOcxVersion = function () {
            return (gOcx.GetOcxVersion())
        };
        p.GetSysLangType = function () {
            return (gOcx.GetSysLangType())
        };
        p.Disconnection = function () {
            return (gOcx.Disconnection(this.id))
        };
        p.VoiceIntercom = function (type) {
            return (gOcx.VoiceIntercom(type))
        };
        p.SetGoodLAreaStatus = function (RuleIndex, AreaIndex, isUse) {
            return (gOcx.SetGoodLAreaStatus(RuleIndex, AreaIndex, isUse))
        };
        p.PLWriteLine = function (RuleIndex, isTowway, single) {
            return (gOcx.PLWriteLine(RuleIndex, isTowway, single))
        };
        p.PLWriteLineTwoway = function (RuleIndex, isTowway) {
            return (gOcx.PLWriteLineTwoway(RuleIndex, isTowway))
        };
        p.GllRuletype = function (RuleIndex, ruleboth) {
            return (gOcx.GllRuletype(RuleIndex, ruleboth))
        };
        p.RuleNum = function (RuleIndex, page) {
            return (gOcx.RuleNum(RuleIndex, page))
        };
        p.PlaybackPlay = function (chnArr,date,rectype,synchronous,mode,softmode) {
            return (gOcx.PlaybackPlay(chnArr,date,rectype,synchronous,mode,softmode))
        };
        p.SetPlaybackFishEyeSoftMode = function (chn,mode){
        	return (gOcx.SetPlaybackFishEyeSoftMode(chn,mode));
        };
        p.PlaybackStop = function (chnArr) {
            return (gOcx.PlaybackStop(chnArr))
        };
        p.PlaybackCap = function (chnArr) {
            if(g_noPermission){
				ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"),lg.get("IDS_NOPER_TIP0")+"</br>"+lg.get("IDS_NOPER_TIP1")+"\</br>"+lg.get("IDS_NOPER_TIP2"));
				return {Code:errCodeEnum.Code_NoPermission};
			}
			return (gOcx.PlaybackCap(chnArr))
        };
        p.PlaybackRec = function (type,chnArr) {
            if(g_noPermission){
				ShowPaop(lg.get("IDS_RECORD_SAVE_PATH"),lg.get("IDS_NOPER_TIP0")+"</br>"+lg.get("IDS_NOPER_TIP1")+"\</br>"+lg.get("IDS_NOPER_TIP2"));
				return {Code:errCodeEnum.Code_NoPermission};
			}
			return (gOcx.PlaybackRec(type,chnArr))
        };
        p.PlaybackZoom = function () {
            return (gOcx.PlaybackZoom())
        };
        p.setPlaybackFullScreen = function (bFullScreen) {
        	return (gOcx.setPlaybackFullScreen(bFullScreen));
        };
        p.SetPlaybackVideoratio = function(mode){
        	return (gOcx.SetPlaybackVideoratio(mode));
        }
        p.getPlaybackTime = function(chn){
        	return (gOcx.getPlaybackTime(chn));
        }
        p.setPlaybackTime = function(chn,date,time){
        	return (gOcx.setPlaybackTime(chn,date,time));
        }
        p.SetPlaybackMode = function(chnArr,modeArr){
        	return (gOcx.SetPlaybackMode(chnArr,modeArr));
        }
        p.ParamvideoStart = function(chn,streamType){
        	return (gOcx.ParamvideoStart(chn,streamType));
        }
        p.ParamvideoStop = function(chn){
        	return (gOcx.ParamvideoStop(chn));
        }
        p.ParamChangeChn = function(chn){
        	return (gOcx.ParamChangeChn(chn));
        }
        p.StartDownload = function(startArr){
        	return (gOcx.StartDownload(startArr));
        }
        p.StopDownload = function(){
        	return (gOcx.StopDownload());
        }
        p.GetVideoParam = function(pageType){
        	return(gOcx.GetVideoParam(pageType));
        }
        p.SetVideoParam = function(pageType,data){
        	return(gOcx.SetVideoParam(pageType,data));
        }
        p.ShowDownload = function(recordArr){
        	return (gOcx.ShowDownload(recordArr));
        }
        p.InitDownload = function(data){
        	return (gOcx.InitDownload(data));
        }
        p.SetDownloadBoxStatus = function(statusdata){
        	return (gOcx.SetDownloadBoxStatus(statusdata));
        }
        p.PlaybackSound = function(type){
        	return (gOcx.PlaybackSound(type));
        }
        p.PlaybackVolume = function(volume){
        	return (gOcx.PlaybackVolume(volume));
        }
        p.PreviewVolume = function(volume){
        	return (gOcx.PreviewVolume(volume));
        }
        p.SetPreviewRecordStatus = function(chn,type,bshow,r,g,b,blogo){
        	return (gOcx.SetPreviewRecordStatus(chn,type,bshow,r,g,b,blogo));
        }
	p.openSafariByUrl = function (url) {
            return (gOcx.openSafariByUrl(url))
        };
		p.PreviewDbclkFullscreen = function(bFullscreen){
        	return (gOcx.PreviewDbclkFullscreen(bFullscreen));
        }
		p.PreviewFishEyeMode = function(fisheye){
        	return (gOcx.PreviewFishEyeMode(fisheye));
        }
		p.SetFishEyePtzPos = function(posArr,channel){
        	return (gOcx.SetFishEyePtzPos(posArr,channel));
        }
		p.paramImEx = function(type){
        	return(gOcx.paramImEx(type));
        }
		p.paramExportEXCEL = function(path,filename,row,col,file,type){
			return(gOcx.paramExportEXCEL(path,filename,row,col,file,type));
		}
		p.FishEyeSoftPTZ = function(data){
			return(gOcx.FishEyeSoftPTZ(data));
		}
		p.PlaybackDbclkFullscreen = function(bFullscreen){
			return(gOcx.PlaybackDbclkFullscreen(bFullscreen));
		}
		p.IPCFirstLoginSetPwd = function (ipcIp,ipcPort,ipcName,ipcPwd) {
            return (gOcx.IPCFirstLoginSetPwd(ipcIp,ipcPort,ipcName,ipcPwd));
        };
		p.GetFishEyeSoftFishEyeSoftChSelect = function (chn) {
            return (gOcx.GetFishEyeSoftFishEyeSoftChSelect(chn));
        };
		p.SetDelayTime = function (time) {
            return (gOcx.SetDelayTime(time));
        };
        p.SendZeroSpiltType = function (data) {
            return (gOcx.SendZeroSpiltType(data));
        };
        p.ClearPlayFlag = function () {
        	return (gOcx.ClearPlayFlag());
        };
		p.ShowResolution = function (chnArr,flag, millisec) {
            return (gOcx.ShowResolution(chnArr,flag, millisec))
        };
        p.SimpleCmd = function (maintype,subtype) {
            return (gOcx.SimpleCmd(maintype,subtype))
        };
        p.setFishEyeWheelScroll = function (maintype,subtype,data) {
            return (gOcx.setFishEyeWheelScroll(maintype,subtype,data))
        };
		 p.GetDDNSArr = function (index) {
            return (gOcx.GetDDNSArr(index))
        };
		 p.GetCInfoArr = function () {
            return (gOcx.GetCInfoArr())
        };
		p.PreviewUpdateAutoConn = function (arr) {
			return (gOcx.PreviewUpdateAutoConn(arr))
		};
		p.bSupportFull = function (bSf) {
			return (gOcx.bSupportFull(bSf))
		};
		p.ShowFrameRate = function (chnArr,flag, millisec) {
            return (gOcx.ShowFrameRate(chnArr,flag, millisec))
        };
		p.PreviewSoftPTZ = function (index,type) {
            return (gOcx.PreviewSoftPTZ(index,type))
        };
		p.AIGroupConfig = function (actionObj) {
            return (gOcx.AIGroupConfig(actionObj))
        };
        p.writeBase64ToImg = function(type,imgName,imgPath,imgData){
            return(gOcx.writeBase64ToImg(type,imgName,imgPath,imgData));
        }
        p.AsyncJsonParam = function (data) {
            return (gOcx.AsyncJsonParam(data))
        };
		p.OperProfile = function (type,field,arrWrite) {
            return (gOcx.OperProfile(type,field,arrWrite));
        };
		p.changeIDTypeLogin = function (p2pid,p2pidType) {
            return (gOcx.changeIDTypeLogin(p2pid,p2pidType))
        };
    }
}

//global variable Class
function GlobalVar() {
    this.nDate = new Date().Format("yyyy-MM-dd hh:mm:ss");
    this.nStreamType = 0;
    this.ip = "";
    this.port = 80;
    this.mediaport = "";
    this.user = "admin";
    this.passwd = "";
    this.nLanguage = 0;
    this.nOpenPrivew = false;
    this.lg = 0;
    this.bWebInit = false;
    this.nTimer = 0;
    this.errTitle = "";
    this.errCount = 0;
    this.nDevType = 0;
    this.ipc = 0;
    this.nVideoRatio = 1.383;
    this.nLRWidth = 452;
    this.pwdError = 0;

    this.sPage = "login";
    this.childPage = "";//Parameter configuration of child pages
    this.MacPlayReg = false;
    this.nWeekStart = 0;  //"0" Representatives from the start on Sunday,
    					  //"1" Representatives from the start on Monday,Followed by analogy...
    this.nVideoSize = 0;
    this.var_DDNSTest_isTimeOut = false;
    this.timer_DDNSTest = 0;
    this.devName = "";

    this.SysLangType = "";//The current system of language, is mainly used in the traditional Chinese system under the special word processing
    this.logined = false;
    this.bLiveLoaded = false;//Live page is loade
    this.runTime = {};
    this.bC0_0305_3120101 = false;
	this.bC0_0305_3120101_old906Dev = false;
	this.bC0_useNewLg = false;
	this.bNormal_0305_2120105 = false;
    this.bSN_0305_120105 = false;
	this.bHide_IntelPage_HalfAnalogCh = false;
	this.bWirelessSave = false;
	this.bHDVRC7 = false;
	this.live_OperBtn = 0;
	
    this.vdCurCh=-1;//Video of the current channel
	
	this.LocalFishEye = {showMode:1,mountMode:0};//Soft solution fisheye local data,fisheye[0] is disabled
	this.loginClientType = 0;//customer setup 1:e-commerce 2:c116  3:c94 4:c144
	
	this.CtArr=[];
	
	this.ipcDelayTime = 200;
	this.pswMinLen = 8;
	this.pswMaxLen = 8;
	this.userNameLen = 8;
	this.bDoNextCall = false;
	this.bCapturePermissionLimit = false;
	this.bSirenTipsShow = false;
    this.LimitInputN = false;//Limit username length by default
    this.LimitInputP = true;//The default does not limit password length
	
    //class methods
    this.ChangePage;
    init(this);
    function init(p){	//

    	if($.browser.safari || $.browser.msie || $.browser.firefox || $.browser.chrome){
    		p.ChangePage = function(page){
				if(tTime){
					clearTimeout(tTime);
				}
                if(g_soundDecibelTimmer){
                    clearTimeout(g_soundDecibelTimmer);
                }
    			if ("live" == page){
    				if(gVar.sPage == page)
    					return false;
    				CloseOtherVideo(page);
    				var sTempPage = gVar.sPage;
					
					//Before entering the live, moving parameters of the video window to tempOcx, solve the alert box located in the live video window
					if(sTempPage == "config" && $.browser.msie){
						$("#tempOcx").append($("#ipcocx").detach());
	    				$("#ipcocx").css({width:"1px", height:"1px"});
					}
					
    				$(".Page").css("display","none");
    				$("#live").css("display","block");
    				p.sPage = page;
    				//menutitle(1);
    				if($.browser.msie){
    					SetResize(p.sPage);
    				}

    				if($("#live").attr("data-name") == "notLoad"){
    					LoadLivePage(function(){
                            if($.browser.msie){
                                $("#liveOcx").append($("#ipcocx").detach());
                                $("#ipcocx").css({width:"100%", height:"100%"});
                            }else{
                                SetResize(p.sPage);
                            }
                            $("#login").remove();
                            $("#live").attr("data-name","active");//Page not take control
                            gDevice.OcxChangePage(pageEnum.TypePreviewPage);
                            //$("#play,#adaptive,#mainStream").click();
                            //$(".menuBtn").prop("disabled","");//IE8 slow speed, load before allowing the live page click on other pages
							$("#menuMask").css("display","none");
							
							//Live page is loaded
							if(gDevice.devType == devTypeEnum.DEV_IPC){
								if($("#play").attr("name") == "active"){
									RestoreLiveStatus();
								}
							}else{
								RestoreLiveStatus();
							}
							gVar.bLiveLoaded = true;
                        });
    				}
					
    				if($("#live").attr("data-name") == "inactive"){
    					if($.browser.msie){
    						$("#liveOcx").append($("#ipcocx").detach());
    						$("#ipcocx").css({width:"100%", height:"100%"});
    					}else{
    						SetResize(p.sPage);
    					}
    					$("#"+sTempPage).attr("data-name","inactive");
    					$("#live").attr("data-name","active");//Page has to take up the control
    					gDevice.OcxChangePage(pageEnum.TypePreviewPage);
    				}
					
					if(false == gVar.bLiveLoaded){
						//We haven't live page load (such as load, then execute the following code)
					}else{
						if(gDevice.devType == devTypeEnum.DEV_IPC){
							if($("#play").attr("name") == "active"){
								RestoreLiveStatus();
							}
						}else{
							RestoreLiveStatus();
						}
					}
    			}else if("playback" == page){
    				if(gVar.sPage == page)
    					return false;
    				CloseOtherVideo(page);
    				var sTempPage = gVar.sPage;
    				$(".Page").css("display","none");
    				$("#playback").css("display","block");
    				p.sPage = page;
    				//menutitle(2);

    				if($.browser.msie){
    					SetResize(p.sPage);
    				}

                    if ($("#playback").attr("data-name") == "notLoad") {
                        LoadPlaybackPage(function () {
                            if ($.browser.msie) {
                                $("#playbackOcx").append($("#ipcocx").detach());
                                $("#ipcocx").css({width: "100%", height: "100%"});
                                timelineresize();
                            } else {
                                SetResize(p.sPage);
                                timelineresize();
                            }
                        });

                        $("#" + sTempPage).attr("data-name", "inactive");
                        $("#playback").attr("data-name", "active");//
                        gDevice.OcxChangePage(pageEnum.TypePlaybackPage);
						$("#menuMask").css("display","none");
    				}
    				if($("#playback").attr("data-name") == "inactive"){
    					if($.browser.msie){
    						$("#playbackOcx").append($("#ipcocx").detach());
    						$("#ipcocx").css({width:"100%", height:"100%"});
                            timelineresize();
    					}else{
    						SetResize(p.sPage);
                            timelineresize();
    					}
    					$("#"+sTempPage).attr("data-name","inactive");
    					$("#playback").attr("data-name","active");//
    					gDevice.OcxChangePage(pageEnum.TypePlaybackPage);
    					if(gCurDate){
	    					$("#calTip").empty();
	    					$("#CalDayID").attr("name", "");
	    					CalSearchByMon();
	    					$('#calendar').find("input").click();
    					}
    					//$('#calendar').find("select").change();
    				}


    			}else if("config" == page){
    				if(gVar.sPage == page)
    					return false;
    				CloseOtherVideo(page);
    				//if(p.sPage == "live"){
    				//	if($("#voiceIntercom").attr("d") == "active"){
    				//		$("#voiceIntercom").click();
    				//	}
    				//	//$("#play").attr("name","stop").css("background-position","-32px 0px");
    				//}
    				var sTempPage = gVar.sPage;
    				$(".Page").css("display","none");
    				$("#config").css("display","block");
    				p.sPage = page;
    				//menutitle(3);
    				if($.browser.msie){
    					SetResize(p.sPage);
    				}

    				if($("#config").attr("data-name") == "notLoad"){
    					LoadConfigPage(function(){
    						if ($.browser.msie) {
	    						$("#tempOcx").append($("#ipcocx").detach());
	    						$("#ipcocx").css({width:"1px", height:"1px"});
	    					}else{
	    						SetResize(p.sPage);
	    					}
                            $("#"+sTempPage).attr("data-name","inactive");
                            $("#config").attr("data-name","active");//
							$("#menuMask").css("display","none");
    					});

    				}
    				if($("#config").attr("data-name") == "inactive"){
    					if($.browser.msie){
	    					$("#tempOcx").append($("#ipcocx").detach());
	    					$("#ipcocx").css({width:"1px", height:"1px"});
	    				}else{
	    					SetResize(p.sPage);
	    				}
    					$("#"+sTempPage).attr("data-name","inactive");
    					$("#config").attr("data-name","active");//
    				}

    				if ($(this).attr("data-name") != "isDown"){
    					jQuery("head").append('<link href="html/cfg/css.css" rel=\"stylesheet\" type=\"text/css\" />');
    					$("#"+sTempPage).attr("data-name","inactive");
    					$(this).attr("data-name", "isDown");
    					//gVar.GetJS({
    					//	webUrl:"js/divBox.js",
    					//	callback:function(){
    					//	}
    					//});
    				}else{

    				}
    				$(".RemoteSet_Menu_list").each(function(){
    					if($(this).attr("d") == "active"){
    						$(this).click();
    					}
    				});
					
					if(lgCls.version==gVar.CtArr[0] || lgCls.version==gVar.CtArr[43] ||
                        (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version==gVar.CtArr[144])){
						switch(gVar.childPage) {
							case "chn_live"://
							case "Img_Ctrl": //
							case "chn_sp": //
							case "alarm_mv": //
							case "chn_roi": //
							case "Perimeter_Line": //
							case "Perimeter_Zone": //
							case "GoodsLost_Legacy"://
							case "Face_Detection"://
							case "Human_Detection"://
							case "People_Cross_Counting"://
							case "mobile_stream_set"://
							case "alarm_pir":
							case "flood_light":
							case "flood_lightmulchn":
								if(!!gVar.childPage){
									LoadChildConfigPage(gVar.childPage);
								}
								break;
						}
					}
    			}else if("pathConfig" == page){
    				if(gVar.sPage == page)
    					return false;
    				if(p.sPage == "live"){
    					if($("#voiceIntercom").attr("d") == "active"){
    						$("#voiceIntercom").click();
    					}
    					//$("#play").attr("name","stop").css("background-position","-32px 0px");
    				}
    				CloseOtherVideo(page);
    				var sTempPage = gVar.sPage;
    				$(".Page").css("display","none");
    				$("#pathConfig").css("display", "block");
    				p.sPage = page;
    				SetResize(p.sPage);

    				if($("#pathConfig").attr("data-name") == "notLoad"){
    					LoadPathConfigPage(function(){
    						$("#"+sTempPage).attr("data-name","inactive");
    						$("#pathConfig").attr("data-name","active");//
							$("#menuMask").css("display","none");
    					});
    				}
    				if($("#pathConfig").attr("data-name") == "inactive"){
    					$("#"+sTempPage).attr("data-name","inactive");
    					$("#pathConfig").attr("data-name","active");//
    				}

    				gDevice.OcxChangePage(pageEnum.TypeNoVideoParamPage);
    			}
    		}
    	}
    }

    this.XmlParsing = function (obj, xml, parent) {
        var $p;
        obj.refresh();
        //Compatible with local debugging ie 9 the following version
        if ($.browser.msie) {//IE loaded language when local debugging
            var xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.loadXML(xml);
            if (xmlDoc.childNodes[0] != null) {
                xml = xmlDoc;
            }
        }

        if ((typeof xml == 'string') && xml.constructor == String) {
            xml = ("<xml>" + xml + "</xml>");
        }

        if ($.browser.msie) {
            var child = xml.getElementsByTagName(parent)[0].ownerDocument.getElementsByTagName("string");

            for (var i = 0; i < child.length; ++i) {
                obj.set(child[i].attributes.getNamedItem("id").text, child[i].text);
            }
        } else {
            $(xml).find(parent).children().each(function () {
                $p = $(this);
                obj.set($p.attr("id"), $p.text());
            });
        }
    }

    this.Ajax = function (option) {
        var opts = $.extend({
            type: "POST",
            url: "",
            contentType: "text/xml",
            processData: false,
            datatype: "text",
            timeout: 10000,
            async: false,
            suc: null,
			err: function(data, state) {}
        }, option);

        $.ajax({
            type: opts.type,
            url: opts.url + "?version=" + version_web,
            contentType: opts.contentType,
            processData: opts.processData,
            dataType: opts.datatype,
            timeout: opts.timeout,
            async: opts.async,
            success: function (data, state) {
                if ($.isFunction(opts.suc)) {
                    opts.suc(data, state)
                } else {
                    alert("Globar Ajax Error");
                }
            },
            error: function (data, state) {
                opts.err(data, state);
            }
        });
    }

    this.GetHtml = function (option) {
        var opts = $.extend({
            webUrl: "",
			callback: function(data) {}
        }, option);
        $.get(opts.webUrl + "?version=" + version_web, "", opts.callback, "html");
    }

    this.GetJS = function (option) {
		var opts = $.extend({
			webUrl: "",
			callback: function(data) {}
		}, option);
        $.getScript(opts.webUrl + "?version=" + version_web, opts.callback);
    }
	
	this.chName = function(i){
		if(gDevice.devType==devTypeEnum.DEV_HDVR){
			if(i<gDevice.loginRsp.AnalogChNum){
				var n =i+1;
				n = (n<10) ? ("0"+n) : (n);
				return lg.get("IDS_CH")+(n)+" ";
			}else{
				var n = i+1-gDevice.loginRsp.AnalogChNum;
				n = (n<10) ? ("0"+n) : (n);
				return "IP " + lg.get("IDS_CH")+(n)+" ";
			}
		}else{
			if( i < 9){
				return lg.get("IDS_CH")+"0" + (i+1)+" ";
			}else{
				return lg.get("IDS_CH")+ (i+1)+" ";
			}
		}
	}
}

function LgClass() {
    //multiple languages
    this.mul = new Array;
    this.IpAndPort = new Array;
    this.langues = "";
    //default language
    this.defaultLg = "";
    //versions
    this.version = "";
    this.logo = "";
    this.sdcardshow = "";
    this.flashsize = "";
    this.devicetime = "";
    this.skin = ""; // White skin（white） Black skin（black）Blue Skin（blue） golden yellow(golden)
	this.FirstLoginFlag = false;
	this.useTitle = 0;//use web title of cgi
	this.webTitle = "ipc";
    this.mediaPortEx = 58100;//ipc mapping media port
    this.localIpaddr = "";// ipc local ip addr
    this.PPPoEIpaddr = "";//ipc pppoe ip addr
}

//Record the warning mark information, warning mark redrawn to open the video
function RecordStatusLog(){
	var temp = {};
	temp.r=0;/*status：  0:nothing; 1:green; 2:red;*/
	temp.m=0;
	temp.i=0;
	temp.h=0;
	temp.c=0;
	temp.s=0;
	temp.pir=0;
	temp.draw = {};
	return temp;
}