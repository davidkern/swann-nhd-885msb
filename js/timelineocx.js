var timeline = function (options) {
    var _opts = {
        chnNum: 1, //The number of channels
        divId: "", //Dom node ID
        //dataTypeNum : 1,//Data type species, can not passed, with the number of dataTypeArr shall prevail
        dataTypeArr: [recTypeEnum.NormalRecord], //Data type type and priority, element position behind the high priority
        dataTypeColorArr: ["rgb(0,128,0)"],//Data type corresponding color, type and dataTypeArr video
        optimizeData: true,//Whether the raw data is optimized
        fontColor: "black",
        blankLeftWidth: 30,
        blankRightWidth: 30,
        b24Hour: false,
        clickCallback: function (chn, date, bInZone) {
        }
    };
    //node jquery Object
    var _divObj;
    //class methods
    // the constructor

    //After finishing the data type of the color corresponding to the array
    var ColorArr = [];

    _create(this, options);
    InitWindow(this);
    timelineEventCallBack = _clickCallback;

    function _clickCallback(data) {
        _opts.clickCallback(data.chn, data.time, true);
    }

    function _create(p, options) {
        _opts = $.extend(_opts, options);

        //Default Color
        for (var i = 0; i < _opts.dataTypeArr.length; i++) {
            ColorArr[_opts.dataTypeArr[i]] = _opts.dataTypeColorArr[i];
        }

        if (_opts.divId != "") {
            _divObj = $("#" + _opts.divId);
        } else {
            return;
        }

        _InitOcx(p);
        if (p.bInit == 0) {
            alert("Initialize the timeline plug-in failure");
        } else {
        }
    };

    function _InitOcx(p) {
        if (C23IEBaoNO265) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:B9F6615C-D722-4460-AD3C-AE9ECBE43065"></object>').appendTo(_divObj);
        } else if (C152IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:8C0B3FE2-6E91-4bbc-BCFF-63960FB5ED0B"></object>').appendTo(_divObj);
        } else if (C23IEBao265) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:F2F1C8D1-0003-49bc-98AC-DF16D0C285E1"></object>').appendTo(_divObj);
        } else if (C0IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:369B5625-25C6-4a25-880C-08E6B01A22BC"></object>').appendTo(_divObj);
        } else if (C0Netview) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:150F33C4-B1FA-4ab2-AB6B-47FC3D29B3D1"></object>').appendTo(_divObj);
        } else if (C23Netview) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:BC7AAC16-078C-4592-AD02-90FBEEBE9D71"></object>').appendTo(_divObj);
        } else if (C23NetviewUI5) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:8E682B0B-FE28-4603-AE90-D3BFC34BC69F"></object>').appendTo(_divObj);
        } else if (C23CH256) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:BD1A1ACE-3F91-48c0-9DED-B3523423149A"></object>').appendTo(_divObj);
        } else if (C186IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:AF8916F6-67FD-4dba-A593-A3CEAE9F60E7"></object>').appendTo(_divObj);
        } else if (C186IEBaoNVR) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:9611EDC9-47E2-4d9a-A99E-5B2953AF18F3"></object>').appendTo(_divObj);
        } else if (C142IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:DF677478-8D69-4493-8388-5F7D96198D11"></object>').appendTo(_divObj);
        } else if (C146IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:D8F9BDFA-2B6C-4eee-8863-8BD7A8FBDBA1"></object>').appendTo(_divObj);
        } else if (IPCIEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:5557FCC8-1048-4dfb-A76A-2973D550F1FF"></object>').appendTo(_divObj);
        } else if (IPCC166IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:1FC9BCDF-E315-4b1f-AFC0-6C06213D64C1"></object>').appendTo(_divObj);
        } else if (IPCC166CH256IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:79DF8CD9-62C1-4fd6-A895-1FB12BEFF5E7"></object>').appendTo(_divObj);
        } else if (IPCC186CH256IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:3D4A5C49-9474-42ce-BB74-F45A4D45B673"></object>').appendTo(_divObj);
        } else if (IPCC198IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:B30FFE8D-DBDD-4c69-805E-C57986D3F5C7"></object>').appendTo(_divObj);
        } else if (C186IEBaoNO265) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:B126A32B-434C-413a-82EB-C04D600B9F23"></object>').appendTo(_divObj);
        } else if (C186IEBao265) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:4F98E09C-51B6-4f4f-95E3-CE1CBF7C8CEB"></object>').appendTo(_divObj);
        } else if (IPCC32IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:D1EA6FF7-E2EF-41f6-884A-764CDA24AFE9"></object>').appendTo(_divObj);
        } else if (IPCC152IEBao) {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:CA5EB0CB-B1DA-4041-B851-2498AD1C3CE5"></object>').appendTo(_divObj);
        } else {
            $('<object id="timelineocx" name="timelineocx" style="width:100%; height:100%;z-index:101;" classid="clsid:C5767882-28D8-400D-9C56-B5D836F59A47"></object>').appendTo(_divObj);
        }

        p.obj = document.getElementById("timelineocx"); //Control Object
        $(p.obj).css("width", "100%").css("height", "100%");
        if (typeof(p.obj.SendMsgToPlugin) == "undefined") { //To determine whether a plug-in installed (load) success
            p.bInit = 0;
        } else {
            p.SendMsgToPlugin = function (xml) {
                var ret = p.obj.SendMsgToPlugin(JSON.stringify(xml));
                //alert("MainType:"+ xml.MainType + ",SubType:" + xml.SubType +"," + ret);
                return JSON.parse(ret);
            };
            p.bInit = 1;
        }
    };

    function ColorToObj(color) {
        var obj = {
            "r": 0,
            "g": 0,
            "b": 0
        };
        if (color.constructor == String) {
            color = color.toLowerCase();
            if (color.substring(0, 3) == "rgb") {
                color.replace(/\s/g, "");
                color = color.substring(4, color.length - 1);
                color = color.split(',');
                obj = {
                    "r": parseInt(color[0]),
                    "g": parseInt(color[1]),
                    "b": parseInt(color[2])
                };
            } else if (color[0] == "#") {
                var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                if (color && reg.test(color)) {//A regular expression to judge whether to hexadecimal
                    if (color.length === 4) {//Three colors to six
                        var ColorNew = "#";
                        for (var i = 1; i < 4; i += 1) {
                            ColorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
                        }
                        color = ColorNew;
                    }
                    //To deal with six color values
                    var ColorChange = [];
                    for (var i = 1; i < 7; i += 2) {
                        ColorChange.push(parseInt("0x" + color.slice(i, i + 2)));
                    }
                    obj = {
                        "r": parseInt(ColorChange[0]),
                        "g": parseInt(ColorChange[1]),
                        "b": parseInt(ColorChange[2])
                    };
                }
            }
        }
        return obj;
    }

    function InitWindow(p) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgInitTimeline;
        var obj = {};
        obj.rowNum = _opts.chnNum;
        obj.DevType = gDevice.devType;
        obj.chNum = gDevice.loginRsp.ChannelNum;
        obj.blankRightWidth = _opts.blankRightWidth;
        obj.blankLeftWidth = _opts.blankLeftWidth;
        obj.dataTypeArr = _opts.dataTypeArr;
        obj.b24Hour = _opts.b24Hour;
        //Get color from CSS below
        obj.wndBgColor = ColorToObj($(".playbackContent").css("background-color"));
        //Zoom_box.window.document.getElementsByTagName("body")[0].style.backgroundColor = "red";
        obj.scaleColor = ColorToObj(_opts.fontColor);
        _divObj.css("color", "");
        obj.borderColor = obj.wndBgColor;
        _divObj.addClass("timeline-selectedlines");
        obj.selColor = ColorToObj(_divObj.css("background-color"));
        _divObj.removeClass("timeline-selectedlines");
        obj.dataTypeColorArr = [];
        for (var i = 0; i < _opts.dataTypeColorArr.length; ++i) {
            obj.dataTypeColorArr.push(ColorToObj(_opts.dataTypeColorArr[i]));
        }

        param.Data = obj;
        return p.SendMsgToPlugin(param);
    }

    function setSelect(p, chn, issel) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgSelectWnd;
        var obj = {};
        obj.Channel = chn;
        obj.isSel = issel;
        param.Data = obj;
        return p.SendMsgToPlugin(param);
    }

    function zoom(p, InOrOut) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgTimelineZoom;
        var obj = {};
        obj.Zoom = InOrOut;//0in，1out
        param.Data = obj;
        return p.SendMsgToPlugin(param);
    }

    function _sortData(data, _data) {
        for (var i = 0; i < _opts.dataTypeArr.length; i++) {
            _data[_opts.dataTypeArr[i]] = [];
        }

        for (var i = 0; i < data.length; i++) {
            var dataTemp = data[i];
            _data[dataTemp.Type].push(dataTemp);
        }
    };

    function _setColorOcx(p, type, color) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgSetColor;
        var obj = {};
        obj.type = type;
        obj.color = color;//[red,green,blue]
        param.Data = obj;
        return p.SendMsgToPlugin(param);
    }

    this.initData = function (data) {
        if (!data || !$.isArray(data))
            return;
        var _data = {};
        _sortData(data, _data);
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgInitTimelineData;
        param.Data = _data;
        return this.SendMsgToPlugin(param);
    };

    this.showMovePointer = function (data) {
        if (!data)
            return;
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgShowMovePointer;
        param.Data = data;
        return this.SendMsgToPlugin(param);
    };
    this.hideMovePointer = function (chn) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgHideMovePointer;
        var obj = {};
        obj.chn = chn;
        param.Data = obj;
        return this.SendMsgToPlugin(param);
    };
    this.setSync = function (bSync) {
        var param = {};
        param.MainType = methodEnum.MainMsgTimeline;
        param.SubType = methodEnum.SubMsgSetSync;
        var obj = {};
        obj.bSync = bSync;
        param.Data = obj;
        return this.SendMsgToPlugin(param);
    };
    this.resize = function () {

    };
    this.setCurChn = function (chn) {
        if (gDevice.devType == devTypeEnum.DEV_HDVR && g_pbRowNum == 1) {
            //do
        } else {
            if (chn < 0 || chn >= _opts.chnNum) {
                setSelect(this, chn, false);
                return;
            }
        }

        setSelect(this, chn, true);
    };
    this.zoomIn = function () {
        zoom(this, 0);
    };

    this.zoomOut = function () {
        zoom(this, 1);
    };

    //Set up a video type color
    this.setColor = function (type, color) {
        if (typeof ColorArr[type] != 'undefined') {
            ColorArr[type] = color;
            _setColorOcx(this, type, ColorToObj(color));
        }
    }
}