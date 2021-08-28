// JavaScript Document
var gVar; //global variable
var gDevice; //Device information class object
var gOcx;
var UI; //UI class object
var lg; //Language object
var ISGetSysTime = 0; //If access to the system time
var lgCls;
var timeout;
var tabkey = 1;
var ColorSet = "#7EA264";
var gIELogin = true;
var gIDLogin = false; //IP control login id or login
var gHttp = "";
var NoDel = false;
var gStreamSet = 0;
var gReboot = 0;
var ratetype = 0; //Flashing type
var tTime; //Real time function
var gCloseFlag = 0;
var IPCRows = 0;
var g_bDefaultShow = false;
var g_downloadWin;
var g_loginTimeout = 15;
var g_intervalID = -1;
var g_ipcgup = false;
var g_pbNum; //Playback window number
var g_pbCkNum;//=AnalogChNum
var g_pbRowNum = 4;
var g_c2Wifi = false;
var alarm = {motionRec: 0, IORec: 0, pirRec: 0};
var g_noPermission = false;
var g_UiType = 40;//ie type:40
var g_customLan = -1;// CtArr num, eg:229
var g_c0OldId_bNeedSwitch = false;
var gArr_c0OldId_useTutk = [];
var g_threeLogin_info = [];

//ClassID Flag
var C23IEBaoNO265 = false;
var C152IEBao = false;
var C0IEBao = false;
var C0Netview = false;
var C23Netview = false;
var C23NetviewUI5 = false;
var C23IEBao265 = false;
var C23CH256 = false;
var C186IEBao = false;
var C186IEBaoNVR = false;
var C186IEBaoNO265 = false;
var C186IEBao265 = false;
var C142IEBao = false;
var C146IEBao = false;
var IPCIEBao = true;
var IPCC166IEBao = false;
var IPCC166CH256IEBao = false;
var IPCC186CH256IEBao = false;
var IPCC198IEBao = false;
var IPCC32IEBao = false;
var IPCC152IEBao = false;

//ClassID Flag,Add above here

var bSvgUsed;
var g_bLimitMainPreview = false;
var g_MainStreamNum;
var g_defaultStreamType = 1;
var g_recordStatus = [];
var g_pbIsSupportGt4WndPlay = false;//playback is support great than  4 channels play?
var g_ipcOldIntellCss = false; //gVar.CtArr->44,70,92,94,98,114,141,143,146,148- old intell style for shipment
var g_autoToConfig = false;
var g_bShowBSL = false;//bo shi li
var smartArr = [];
var g_videomovetime = -1;
var g_isTriggerAlarmOut = false;
var g_isFishEyeMode = {Preview: false, Playback: false};
var g_DevStateReportTime = -1;
var g_blogoPir = false;
var g_ptzZoomTimmer = -1;
var g_soundDecibelTimmer = -1;

//fisheye wheelscroll event
var scrollFunc = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {
        var id = document.elementFromPoint(e.clientX, e.clientY);
        if(!$.isPlainObject(id)) return ;
        if (id.id == "ipcocx" && (gVar.sPage == "live" || gVar.sPage == "playback")) {
            var isFishEyeFlag = false;

            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if (gDevice.loginRsp.FishEye.isFishEye || (lgCls.version == gVar.CtArr[32] && gVar.sPage == "live")) {
                    isFishEyeFlag = true;
                } else {
                    isFishEyeFlag = false;
                }

            } else {
                if (g_isFishEyeMode.Preview == true || g_isFishEyeMode.Playback == true) {
                    isFishEyeFlag = true;
                } else {
                    isFishEyeFlag = false;
                }
            }
            if (isFishEyeFlag) {
                if ($.browser.safari) {
                    var ey = e.clientY - id.offsetTop;
                    var ex = e.clientX - id.offsetLeft;
                    var data = {"x": ex, "y": ey, "wheelDelta": e.wheelDelta};
                    var mainType = (gVar.sPage == "live") ? methodEnum.MainMsgPreview : methodEnum.MainMsgPlayback;

                    gDevice.setFishEyeWheelScroll(mainType, methodEnum.SubMsgFishEyeWheelScroll, data);
                }

                if (e && e.preventDefault) {
                    e.preventDefault();
                    e.stopPropagation();
                } else {
                    e.returnvalue = false;
                    return false;
                }
            }

        }
    } else if (e.detail) {
        var id = document.elementFromPoint(e.clientX, e.clientY);
        if(!$.isPlainObject(id)) return ;
        if (id.id == "ipcocx" && (gVar.sPage == "live" || gVar.sPage == "playback")) {
            if (e && e.preventDefault()) {
                e.preventDefault();
                e.stopPropagation();
            } else {
                e.returnValue = false;
                return false;
            }
        }
    }
};

//Event
if (document.addEventListener) {
    //adding the event listerner for Mozilla 
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}//W3C
window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome/Safari

function InitTheme() {
    switch (lgCls.version) {
        case gVar.CtArr[0]:
        case gVar.CtArr[43]:
        case gVar.CtArr[144]:
            lgCls.skin = "blue";
            break;
        case gVar.CtArr[156]:
            if (gDevice.devType == devTypeEnum.DEV_NVR) {
                lgCls.skin = "black";
            } else {
                lgCls.skin = "blue";
            }
            break;
        case gVar.CtArr[2]:
            lgCls.skin = "green_c2";
            break;
        case gVar.CtArr[70]:
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                lgCls.skin = "golden_ipc";
            } else {
                lgCls.skin = "golden";
            }
            break;
        case gVar.CtArr[111]:
            lgCls.skin = "yellow";
            break;
        case gVar.CtArr[87]:
            lgCls.skin = "green_c87";
            break;
        case gVar.CtArr[95]:
            lgCls.skin = "red_c95";
            break;
        case gVar.CtArr[148]:
            lgCls.skin = "orange_c148";
            break;
        case gVar.CtArr[177]:
            lgCls.skin = "red_c177";
            break;
        case gVar.CtArr[116]:
        case gVar.CtArr[154]:
            lgCls.skin = "red_c116";
            break;
        case gVar.CtArr[142]:
            lgCls.skin = "green_c142";
            break;
        case gVar.CtArr[12]:
        case gVar.CtArr[195]:
            lgCls.skin = "red_c12";
            break;
        case gVar.CtArr[198]:
            lgCls.skin = "green_c198";
            break;
        case gVar.CtArr[42]:
        case gVar.CtArr[118]:
            lgCls.skin = "red_c118";
            break;
        case gVar.CtArr[192]:
            lgCls.skin = "green_c192";
            break;
        case gVar.CtArr[194]:
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                lgCls.skin = "black";
            } else {
                lgCls.skin = "green";
            }
            break;
        case gVar.CtArr[204]:
            lgCls.skin = "white_c204";
            break;
        case gVar.CtArr[32]:
            lgCls.skin = "red_c32";
            break;
        case gVar.CtArr[211]:
        case gVar.CtArr[249]:
        case gVar.CtArr[259]:
            lgCls.skin = "white";
            break;
        case gVar.CtArr[166]:
            lgCls.skin = "red_c166";
            break;
        case gVar.CtArr[219]:
            lgCls.skin = "purple_c219";
            break;
        case gVar.CtArr[224]:
            lgCls.skin = "white_c224";
            break;
        case gVar.CtArr[229]:
            lgCls.skin = "yellow_c229";
            break;
        case gVar.CtArr[7]:
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                lgCls.skin = "black_ui5";
            } else {
                lgCls.skin = "black";
            }
            break;
        case gVar.CtArr[238]:
            lgCls.skin = "white_c238";
            break;
        case gVar.CtArr[13]:
            lgCls.skin = "green_c13";
            break;
        default:
            lgCls.skin = "black";
            break;

    }
}

function InitMainStreamNum() {//Limit number of main stream
    if ((lgCls.version == gVar.CtArr[0]) &&
        ((gDevice.loginRsp.HighType == 0x52530609 && gDevice.loginRsp.LowType == 0x140500) ||
            (gDevice.loginRsp.HighType == 0x52530306 && gDevice.loginRsp.LowType == 0xE0301))
    ) {//The equipment model
        g_MainStreamNum = 8;
        g_bLimitMainPreview = true;
    }
    else if (gDevice.loginRsp.PreviewNum * 1) {//See the value
        g_MainStreamNum = gDevice.loginRsp.PreviewNum * 1;
        g_bLimitMainPreview = true;
    }
    else {
        g_MainStreamNum = gDevice.loginRsp.ChannelNum;
    }
}

$(function () {
    var userAgent = navigator.userAgent.toLowerCase();
    if (!$.browser) {
        $.browser = {};
    }

    $.browser.version = (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [0, '0'])[1];
    $.browser.msie = false;
    $.browser.safari = false;
    $.browser.opera = false;
    $.browser.mozilla = false;
    $.browser.firefox = false;
    $.browser.chrome = false;
    $.browser.edge = false;
    $.browser.chromeversion = "";
    $.browser.safariVersion = "";
    $.browser.macos = false;
    try {
        if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
            $.browser.macos = true;
        }
        if ("ActiveXObject" in window) {
            $.browser.msie = true;
        } else {
            if (userAgent.indexOf("edge") > 0) {
                $.browser.edge = true;
            } else {
                if (userAgent.indexOf("safari") > 0 && userAgent.indexOf("chrome") < 0) {
                    $.browser.safari = true;
                    $.browser.safariVersion = userAgent.match(/version\/([\d.]+).*safari/)[1];
                } else {
                    if (userAgent.indexOf("firefox") > 0) {
                        $.browser.firefox = true;
                    } else {
                        if (userAgent.indexOf("chrome") > 0) {
                            $.browser.chrome = true;
                            $.browser.chromeversion = userAgent.match(/chrome\/([\d.]+)/)[1];
                        } else {
                            if (/opera/.test(userAgent)) {
                                $.browser.opera = true;
                            } else if (/mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)) {
                                $.browser.mozilla = true;
                            } else {
                                $.browser.msie = true;
                            }
                        }
                    }
                }
            }

        }
    } catch (e) {};

    if (!CheckBrowser()) {
        LoadWebPlugins();
        return;
    }


    if ($.browser.firefox) {
        HTMLElement.prototype.__defineGetter__("innerText",
            function () {
                var anyString = "";
                var childS = this.childNodes;
                for (var i = 0; i < childS.length; i++) {
                    if (childS[i].nodeType == 1)
                        anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
                    else if (childS[i].nodeType == 3)
                        anyString += childS[i].nodeValue;
                }
                return anyString;
            }
        );
        HTMLElement.prototype.__defineSetter__("innerText",
            function (sText) {
                this.textContent = sText;
            }
        );
    }

    if (!Object.keys) Object.keys = function (o) {
        if (o !== Object(o))
            throw new TypeError('Object.keys called on a non-object');
        var k = [], p;
        for (p in o) if (Object.prototype.hasOwnProperty.call(o, p)) k.push(p);
        return k;
    }

    //Controls to write
    if ($.browser.safari) {
        if (C23IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-no265" id="ipcocx"></embed>');
        } else if (C152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-laview" id="ipcocx"></embed>');
        } else if (C23IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-265" id="ipcocx"></embed>');
        } else if (C0IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-lorex" id="ipcocx"></embed>');
        } else if (C0Netview) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-nv" id="ipcocx"></embed>');
        } else if (C23Netview) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-nm" id="ipcocx"></embed>');
        } else if (C23NetviewUI5) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-nmui5" id="ipcocx"></embed>');
        } else if (C186IEBao || IPCC186CH256IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-aventura" id="ipcocx"></embed>');
        } else if (C186IEBaoNVR) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-aventura-nvr" id="ipcocx"></embed>');
        } else if (C142IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-ef" id="ipcocx"></embed>');
        } else if (C146IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-gsd" id="ipcocx"></embed>');
        } else if (IPCIEBao || IPCC166IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-ipc" id="ipcocx"></embed>');
        } else if (C186IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-aventura-no265" id="ipcocx"></embed>');
        } else if (C186IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-aventura-265" id="ipcocx"></embed>');
        } else if (IPCC32IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-honeywell" id="ipcocx"></embed>');
        } else if (IPCC152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin-laview-ipc" id="ipcocx"></embed>');
        } else {
            $(".mcmcmain").html('<embed pluginspage="plugin.dmg" style="width:1px; height:1px;" type = "application/x-surveillance-plugin" id="ipcocx"></embed>');
        }
    } else if ($.browser.msie) {
        if (C23IEBaoNO265) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:B9F6615C-D722-4460-AD3C-AE9ECBE43065"></object>');
        } else if (C152IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:8C0B3FE2-6E91-4bbc-BCFF-63960FB5ED0B"></object>');
        } else if (C0IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:369B5625-25C6-4a25-880C-08E6B01A22BC"></object>');
        } else if (C0Netview) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:150F33C4-B1FA-4ab2-AB6B-47FC3D29B3D1"></object>');
        } else if (C23Netview) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:BC7AAC16-078C-4592-AD02-90FBEEBE9D71"></object>');
        } else if (C23NetviewUI5) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:1px; height:1px;" classid="clsid:8E682B0B-FE28-4603-AE90-D3BFC34BC69F"></object>');
        } else if (C23IEBao265) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:1px; height:1px;" classid="clsid:F2F1C8D1-0003-49bc-98AC-DF16D0C285E1"></object>');
        } else if (C23CH256) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:BD1A1ACE-3F91-48c0-9DED-B3523423149A"></object>');
        } else if (C186IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:AF8916F6-67FD-4dba-A593-A3CEAE9F60E7"></object>');
        } else if (C186IEBaoNVR) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:9611EDC9-47E2-4d9a-A99E-5B2953AF18F3"></object>');
        } else if (C142IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:DF677478-8D69-4493-8388-5F7D96198D11"></object>');
        } else if (C146IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:D8F9BDFA-2B6C-4eee-8863-8BD7A8FBDBA1"></object>');
        } else if (IPCIEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:5557FCC8-1048-4dfb-A76A-2973D550F1FF"></object>');
        } else if (IPCC166IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:1FC9BCDF-E315-4b1f-AFC0-6C06213D64C1"></object>');
        } else if (IPCC166CH256IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:79DF8CD9-62C1-4fd6-A895-1FB12BEFF5E7"></object>');
        } else if (IPCC186CH256IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:3D4A5C49-9474-42ce-BB74-F45A4D45B673"></object>');
        } else if (IPCC198IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:B30FFE8D-DBDD-4c69-805E-C57986D3F5C7"></object>');
        } else if (C186IEBaoNO265) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:B126A32B-434C-413a-82EB-C04D600B9F23"></object>');
        } else if (C186IEBao265) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:4F98E09C-51B6-4f4f-95E3-CE1CBF7C8CEB"></object>');
        } else if (IPCC32IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:D1EA6FF7-E2EF-41f6-884A-764CDA24AFE9"></object>');
        } else if (IPCC152IEBao) {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:CA5EB0CB-B1DA-4041-B851-2498AD1C3CE5"></object>');
        } else {
            $(".mcmcmain").html('<object id="ipcocx" name="ipcocx" style="width:0px; height:0px;" classid="clsid:C5767882-28D8-400D-9C56-B5D836F59A47"></object>');
        }
    } else if ($.browser.chrome) {
        if (C23IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_no265" id="ipcocx"></embed>');
        } else if (C152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_laview" id="ipcocx"></embed>');
        } else if (C23IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:1px; height:1px;" type = "application/x-browser-web_plugin_265" id="ipcocx"></embed>');
        } else if (C0IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_lorex" id="ipcocx"></embed>');
        } else if (C23CH256) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ch256" id="ipcocx"></embed>');
        } else if (C186IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura" id="ipcocx"></embed>');
        } else if (C186IEBaoNVR) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_nvr" id="ipcocx"></embed>');
        } else if (C142IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ef" id="ipcocx"></embed>');
        } else if (C146IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_gsd" id="ipcocx"></embed>');
        } else if (IPCIEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc" id="ipcocx"></embed>');
        } else if (IPCC166IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_infinova" id="ipcocx"></embed>');
        } else if (IPCC166CH256IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ch256_infinova" id="ipcocx"></embed>');
        } else if (IPCC186CH256IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_ch256" id="ipcocx"></embed>');
        } else if (IPCC198IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_partizan" id="ipcocx"></embed>');
        } else if (C186IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_no265" id="ipcocx"></embed>');
        } else if (C186IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_265" id="ipcocx"></embed>');
        } else if (IPCC32IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_honeywell" id="ipcocx"></embed>');
        } else if (IPCC152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_laview" id="ipcocx"></embed>');
        } else {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.crx" style="width:0px; height:0px;" type = "application/x-browser-web_plugin" id="ipcocx"></embed>');
        }
    } else if ($.browser.firefox) {
        if (C23IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_no265" id="ipcocx"></embed>');
        } else if (C152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_laview" id="ipcocx"></embed>');
        } else if (C23IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:1px; height:1px;" type = "application/x-browser-web_plugin_265" id="ipcocx"></embed>');
        } else if (C0IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_lorex" id="ipcocx"></embed>');
        } else if (C23CH256) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ch256" id="ipcocx"></embed>');
        } else if (C186IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura" id="ipcocx"></embed>');
        } else if (C186IEBaoNVR) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_nvr" id="ipcocx"></embed>');
        } else if (C142IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ef" id="ipcocx"></embed>');
        } else if (C146IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_gsd" id="ipcocx"></embed>');
        } else if (IPCIEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc" id="ipcocx"></embed>');
        } else if (IPCC166IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_infinova" id="ipcocx"></embed>');
        } else if (IPCC166CH256IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ch256_infinova" id="ipcocx"></embed>');
        } else if (IPCC186CH256IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_ch256" id="ipcocx"></embed>');
        } else if (IPCC198IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_partizan" id="ipcocx"></embed>');
        } else if (C186IEBaoNO265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_no265" id="ipcocx"></embed>');
        } else if (C186IEBao265) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_aventura_265" id="ipcocx"></embed>');
        } else if (IPCC32IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_honeywell" id="ipcocx"></embed>');
        } else if (IPCC152IEBao) {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin_ipc_laview" id="ipcocx"></embed>');
        } else {
            $(".mcmcmain").html('<embed pluginspage="Surveillance_Brower_Plugin.xpi" style="width:0px; height:0px;" type = "application/x-browser-web_plugin" id="ipcocx"></embed>');
        }
    }
    //Controls to write end

    $(document).keydown(function (e) {
        e = e || window.event;
        if (!e.srcElement)
            e.srcElement = e.target;
        if (e.keyCode == 8 && ((e.srcElement.readOnly == null || e.srcElement.readOnly == true) || (e.srcElement.type != 'text' && e.srcElement.type != 'textarea' && e.srcElement.type != 'password'))) {
            e.keyCode = 0;
            e.returnValue = false;
            return false;
        }
    });

    $("#logout").click(function () {
        var languageTarget = gVar.lg;
        //setCookieLan(languageTarget);
        var bodyobj = document.getElementsByTagName("body")[0];
        bodyobj.setAttribute("onunload", "closewnd()");
        window.location.reload(true);

    }).mouseover(function () {
        $(this).css("cursor", "pointer");
    });

    $('body').on('click', '.btn_cancle,.second_close', function () {
        $('#SecondaryContent').css("display", "none");
        $("#SecondaryContent").removeClass("delCon");
        MasklayerHide();
    });

    CheckVersion(true);//true:only for ipc safari
});

function InitWeb() { //Site initialization
    //Body attachEvent
    var bodyobj = document.getElementsByTagName("body")[0];
    bodyobj.setAttribute("onunload", "closewnd()");
    bodyobj.setAttribute("onselectstart", "return fbd();");
    bodyobj.setAttribute("onload", "window.onresize();");
    // window.onbeforeunload = function(){var languageTarget = gVar.lg; setCookieLan(languageTarget);}
    if (g_customLan == 229) {
        LanguageArray[25] = ["TUR", "Türkçe"];
    }

    //////////////////////////////////////Initializes the global data////////////////////////////////////////////////////
    lgCls = new LgClass();
    gDevice = new DeviceInfo(); //Create the device object
    gVar = new GlobalVar(); //Initializes the global class object
    lg = new HashmapCom(); //To create a language pack a hash table
    gHttp = window.location.href;

    //if(gHttp.split("?")[1] == "NetViewerLogin"){
    //    gIELogin = false;
    //}else{
    //    gIELogin = true;
    //}

    gVar.ip = gHttp.split("//")[1].split("/")[0];
    if (gVar.ip.indexOf("]") != -1) { //IPv6
        if (gVar.ip.indexOf("]:") != -1) { //have port
            gVar.port = gVar.ip.split("]:")[1];
            gVar.ip = gVar.ip.split("]:")[0] + "]";
        }
    } else { //IPv4
        if (gVar.ip.indexOf(":") != -1) { //have port
            gVar.port = gVar.ip.split(":")[1];
            gVar.ip = gVar.ip.split(":")[0];
        }
    }

    //gIELogin = false;//Pack Flag
    if (gIELogin) {
        var httpInfo = gHttp.split("//")[1].split("/")[1];
        if (httpInfo.toLowerCase().indexOf("username") != -1 && httpInfo.toLowerCase().indexOf("password") != -1) {
            g_autoToConfig = true;
            gVar.user = httpInfo.split("=")[1].split("&")[0];
            gVar.passwd = httpInfo.split("=")[2];
        }
    }
    UI = new UIReg();
    gVar.CtArr = getCtmArr();

    //language processing
    LanguageCall = function LoadLanguage(lag) {
        if (gOcx.bInit == 0) {
            return;
        }
        gVar.Ajax({
            type: "GET",
            url: "lg/" + lag + ".xml",
            suc: function success(data, state) {
                if (!$.browser.safari) {
                    //gOcx.SetLanguageXML(data);
                }
                gVar.XmlParsing(lg, data, "StringTable");

                if (g_autoToConfig && lgCls.version == gVar.CtArr[95]) {//config
                    WebProc();
                    AutoLogin();
                } else { //login
                    if (!gVar.bWebInit) {
                        WebProc();
                        LoadLoginPage();
                    } else {
                        lan("login");

                        if (C0Netview) {
                            //changePlaceholder();//when netview Comments up
                        } else {
                            changePlaceholder();
                        }

                        var refreshPlaceholder = function () {
                            rmLabelPlaceholder();
                            funPlaceholder(document.getElementById("loginIP"));
                            funPlaceholder(document.getElementById("loginPort"));
                            funPlaceholder(document.getElementById("userName"));
                            funPlaceholder(document.getElementById("loginPsw"));
                        };
                        refreshPlaceholder();
                    }
                }
            },
            err: function (data, state) {
                Web_prompt("can't find the " + lag + "'s xml!"); //Prompt translation language not found
            }
        })
    };

    /* var cookieLan = getCookieLan();
     if(!cookieLan || cookieLan == "0"){
     cookieLan = "ENU";
     }*/


    if (gIELogin == false) {
        gVar.mediaport = "";
        lgCls.version = gVar.CtArr[23];
        lgCls.logo = gVar.CtArr[23];
        lgCls.langues = "ARA ENU CHS DEU ITA ESN FRA PTG RUS TUR BRG CHT JPN KOR PTB PLK VIE SLK"; //ENU CHS DEU ITA ESN FRA HOL PTG PTB RUS TUR BRG
        //lgCls.langues = "ENU RUS PLK HUN";
        lgCls.defaultLg = "ENU";
        //lgCls.sdcardshow = "1";
        gVar.synchr = 0;
        gOcx = new OcxClass();
        if (!gOcx.bInit) {
            alert("Plugin is not loaded!");
            return;
        }
        InitOcx();
        InitTheme();
        loadThemeCss();
        InitLanguage();
        LanguageCall(gVar.lg);
        setPaopboxSkin();
    } else {
        $("#loading").css("display", "block");
        MasklayerShow();
        if (C0IEBao && gDevice.devType != devTypeEnum.DEV_IPC) {
            AnalyzeIPAndPort_c0();
        } else {
            AnalyzeIPAndPort();
        }
    }

    $("body,#userName,#loginPsw").keydown(function (e) {
        if (e.keyCode == 13) {
            if ($("#login_user_prompt").css("display") != "none") {
                $("#login_btn_user_ok").click();
            } else {
                $("#loginBtn").click();
            }
        }
    });

    $(window).resize(function () {
        if (g_videomovetime != -1) {
            clearTimeout(g_videomovetime);
            g_videomovetime = -1;
        }
        g_videomovetime = setTimeout(function () {
            if (gVar.sPage == "config") {
                if (gVar.childPage != "config") {
                    SetResize(gVar.sPage);
                    SetResize(gVar.childPage);
                    var tempGridArr = [], g = 0, widthSize;
                    switch (gVar.childPage) {
                        case "Analog_ch":
                            tempGridArr.push("Analog_ligerGrid");
                            break;
                        case "Chn_Info":
                            tempGridArr.push("ChnInfo_ligerGrid");
                            break;
                        case "IPCan_set":
                            tempGridArr.push("listDataGrid");
                            tempGridArr.push("searchDataGrid");
                            break;
                        case "net_base":
                            tempGridArr.push("scanDataGrid");
                            break;
                        case "Rec_Info":
                            tempGridArr.push("RecInfo_ligerGrid");
                            break;
                    }
                    for (g; g < tempGridArr.length; g++) {
                        var $temp = $("#" + tempGridArr[g]);
                        if ($temp.children().length > 0) {

                            widthSize = setLigerGridSize(tempGridArr[g], ".cfg_container");
                            var parentDivH = $(".cfg_container").height() * 1;
                            var parentDivW = $(".cfg_container").width() * 1;
                            var rowNum = $temp.attr("rowNum") * 1;
                            var gridFlag = 0;
                            // var gridHeight = rowNum == 0 ? (rowNum+2)*23 : (rowNum+1)*23;
                            var gridHeight = (rowNum + 1) * 23;
                            if (tempGridArr[g] == "scanDataGrid") {
                                gridHeight = (rowNum + 1) * 43;
                            }
                            //var gridHeight = parseInt($temp.css("height"));
                            if ($.browser.safari || $.browser.chrome) {
                                if (tempGridArr[g] != "Analog_ligerGrid") {
                                    gridHeight = gridHeight + 17;
                                    gridFlag = 1;
                                }
                            }
                            if (gridHeight > parentDivH - 100) {
                                gridHeight = parentDivH - 100;
                                widthSize = widthSize + 20;
                                //$temp.ligerGrid().setOptions({height:gridHeight+'px'});
                            } else if (widthSize >= parentDivW - 50 && gridFlag == 0) {
                                gridHeight = gridHeight + 20;
                            }

                            if (tempGridArr[g] == "searchDataGrid" && $.browser.chrome) {
                                widthSize = widthSize - 1;
                            }
                            $temp.ligerGrid().setHeight(gridHeight);

                            //$temp.ligerGrid('reload');//refresh table

                            if (tempGridArr[g] == "ChnInfo_ligerGrid" || tempGridArr[g] == "RecInfo_ligerGrid") {
                                widthSize = widthSize - 3;
                            }

                            $temp.css("width", widthSize + 'px');
                        }
                        $temp = null;
                    }
                    tempGridArr = null;
                    widthSize = null;
                    g = null;
                }
            } else {
                SetResize(gVar.sPage);
            }
            timelineresize();
            g_videomovetime = -1;
        }, 200);
    })
}

function setPaopboxSkin() {
    $("#MsgPaop_box").attr("src", "html/alert.html?version=" + version_web);
    $("#FtpUpgrade_box").attr("src", "html/FtpUpgrade.html?version=" + version_web);
    //$("#Download_box").attr("src", "html/download.html?version=" + version_web);
    $("#pbSoundLine").attr("src", "html/pbSoundLine.html?version=" + version_web);
    $("#playbackSpeed").attr("src", "html/playbackSpeed.html?version=" + version_web);
    $("#SetCam_box").attr("src", "html/setCam.html?version=" + version_web);
}

//Dynamic loading skin CSS
function loadThemeCss() {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = 'css/skin_' + lgCls.skin + '.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
    if (lgCls.version == gVar.CtArr[186] || lgCls.version == gVar.CtArr[146] || lgCls.version == gVar.CtArr[198]) {
        var link_Ex1 = document.createElement('link');
        var link_Ex2 = document.createElement('link');
        //link_Ex1.href = 'favicon_c'+lgCls.version+'.ico';
        //link_Ex2.href = 'favicon_c'+lgCls.version+'.ico'; //ie is not support the name
        link_Ex1.href = 'favicon.ico';
        link_Ex2.href = 'favicon.ico';
        link_Ex1.rel = 'icon';
        link_Ex2.rel = 'shortcut icon';
        link_Ex1.type = 'image/x-icon';
        link_Ex2.type = 'image/x-icon';
        head.appendChild(link_Ex1);
        head.appendChild(link_Ex2);
    }
}

// Login to switch input box the clues
function changePlaceholder() {
    $('.login_input').each(function () {
        var self = $(this);
        var oriText = self.attr('placeholder');
        if (self.val() == '' || self.val() == oriText || gDevice.devType == devTypeEnum.DEV_IPC) {
            switch (self.attr('id')) {
                case 'loginIP':
                    self.attr('placeholder', lg.get('IDS_IP_OR_ID'));
                    break;
                case 'loginPort':
                    self.attr('placeholder', lg.get('IDS_PORT'));
                    break;
                case 'userName':
                    if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[61] && gVar.lg == "ENU") {
                        self.attr('placeholder', 'Username');
                    } else {
                        self.attr('placeholder', lg.get('IDS_USERNAME'));
                    }
                    break;
                case 'loginPsw':
                    self.attr('placeholder', lg.get('IDS_LOGIN_PSW'));
                    break;
                case 'passwordMask':
                    self.attr('placeholder', lg.get('IDS_LOGIN_PSW'));
                    break;
            }
        }
    })
}

function InitLanguage() { //Initialize the language
    if (lgCls.langues.indexOf(lgCls.defaultLg) == -1) { //Tip plate end cgi language string does not contain the current language
        Web_prompt("the selected language error!");
    }
    if (lgCls.version == gVar.CtArr[142]) {
        LanguageArray[24][1] = "Dutch";
    }

    var lanTemp = lgCls.langues.split(" ");
    for (var i = 0; i < lanTemp.length; i++) {
        lgCls.mul[i] = new Array;
        for (var j = 0; j < LanguageArray.length; j++) {
            if (lanTemp[i] == LanguageArray[j][0]) {
                lgCls.mul[i][0] = LanguageArray[j][0];
                lgCls.mul[i][1] = LanguageArray[j][1];
                break;
            }
        }
    }

    gVar.lg = $.cookie("RS_Language");
    if (gVar.lg == null) {
        gVar.lg = lgCls.defaultLg;
    } else {
        var i;
        for (i = 0; i < lgCls.mul.length; i++) {
            if (lgCls.mul[i][0] == gVar.lg)
                break;
        }
        if (i >= lgCls.mul.length) {
            gVar.lg = lgCls.defaultLg;
        }
    }
}

function InitOcx() {
    var ret = gDevice.OcxInit(lgCls.version); //The initial control
    if (ret == 0) {
        //alert("Ocx initialization failed!");
        return;
    }
    //The console output plug-in printed information
    gDevice.SetDebugFlag(0);
    /*gVar.nWeekStart = gDevice.getDayOfWeek();
     if (gVar.nWeekStart < 0 || gVar.nWeekStart > 6) {
     gVar.nWeekStart = 0;
     }
     gVar.SysLangType = gDevice.GetSysLangType();*/
}

function WebProc() {
    //page switching
    $(function () {
        //1、 liveMenu
        $("#liveBtn").click(function () { //live
            $(".menuBtn").attr("data-name", "");
            $(this).attr("data-name", "active");
            CloseFrame();
            gVar.ChangePage("live");
        });
        //2、playBackMenu
        $("#playbackBtn").click(function () { //playback
            $(".menuBtn").attr("data-name", "");
            $(this).attr("data-name", "active");
            CloseFrame();
            gVar.ChangePage("playback");
        });
        //3、ConfigMenu
        $("#configBtn").click(function () { //ConfigMenu
            $(".menuBtn").attr("data-name", "");
            $(this).attr("data-name", "active");
            CloseFrame();
            gVar.ChangePage("config");
        });
        //4、PathMenu
        $("#pathConfigBtn").click(function () { //PathMenu
            $(".menuBtn").attr("data-name", "");
            $(this).attr("data-name", "active");
            CloseFrame();
            gVar.ChangePage("pathConfig");
        });
    });
}

function CloseFrame() {
    if ($("#moreScreens").attr("data-name") == "active") {
        $("#divideScreen").click();
    }
    if ($('#liveSoundLineBox').attr("data-name") == "active") {
        $("#sound").click();
    }

    if ($('#liveLightBox').attr("data-name") == "active") {
        $("#floodLight").click();
    }
    if ($('#audioAlarm_Box').attr("data-name") == "active") {
        $("#audioAlarm").click();
    }

    if ($('#pbSoundLine').attr("data-name") == "active") {
        $('#pbSoundLine').attr("data-name", "").css("display", "none");
    }
    if ($('#playbackSpeed').attr("data-name") == "active") {
        $('#playbackSpeed').attr("data-name", "").css("display", "none")
    }
    if ($('#SetCam_box').attr("name") == "active") {
        $("#SetCam_box").contents().find("#setCamClose").click();
    }
    if ($("#digitalZoom").attr("name") == "active") {
        $("#digitalZoom").click();
    }
}

function LoadWebPlugins(bIpcSafari) {
    $.get("html/webplugins.html?version=" + version_web, "", function (data) {
        jQuery("head").append('<link href="css/webplugins.css" rel=\"stylesheet\" type=\"text/css\" />');
        $("#webplugins").prop("innerHTML", data).css("display", "block");
        var temp = typeof bIpcSafari != "undefined" ? bIpcSafari : false;
        $.getScript("js/webplugins.js?version=" + version_web, function () {
            if (temp) {
                if (g_customLan == 229) {
                    $("#TextTip").html("Eklenti daha önce kurulmadı veya son versiyon değil.<br/><br/>" +
                        "CD içindeki son eklentiyi kurunuz.<br/><br/>");
                } else {
                    $("#TextTip").html("You haven't installed the plugin or it is not the latest version.<br/><br/>" +
                        "Please install the latest plugin from the compact disc.<br/><br/>");
                }
                /*
                 *if c186, use
                 *$("#TextTip").html("You haven't installed the plugin or it is not the latest version.<br/><br/>"+
                 "Please download and install AV Plugin from Aventura Support.<br/><br/>");
                 *else delete it
                 */
            }
        });
    }, "html");
}

function queryTrueTutkId(strID) {
    var xmlhttp = null;
    try {
        xmlhttp = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (xmlhttp == null){
		return false;
	}
	
	//var url = 'http://rsp2p.lorexservices.com:8090/v1/exchange?uid=' + strID + '&t=' + gVar.nDate;
	var url = 'https://rsp2p.lorexservices.com:8443/v1/exchange?uid=' + strID + '&t=' + gVar.nDate;
	
    xmlhttp.onreadystatechange = queryCallback;
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
	
	//console.log("33=",xmlhttp.readyState,xmlhttp.status,xmlhttp.responseText);
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		return xmlhttp.responseText;
	}else{
		return "";
	}
	
    function queryCallback(xml) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			//console.log("suc," + xmlhttp.responseText);
        }else{
			//console.log("err");
		}
    }
}

function LoadLoginPage() { //Load the landing page
    $.get("html/login.html?version=" + version_web, "", function (html) {
        jQuery("head").append('<link href="css/login.css" rel=\"stylesheet\" type=\"text/css\" />');
        $("#login").html(html).css("display", "block");

		if(C0Netview){
			if(0){
				var strID = "LNKS5E73PYBk";
				var strRet = queryTrueTutkId(strID);
				if(strRet){
					var strRetObj = JSON.parse(strRet);
					console.log(strRetObj.id);
				}else{
					console.log("err");
				}
			}
			if(1){
				var retObj = gDevice.OperProfile("read","c0OldId_useTutk");
				console.log(retObj);
				gArr_c0OldId_useTutk = retObj;
			}
		}
		
        if (gIELogin == false) {
            $("#LoginIPDiv").css("display", "inline-block");
            $("#LoginPortDiv").css("display", "inline-block");
        }
        if (C23NetviewUI5 && (lgCls.version == gVar.CtArr[204] || lgCls.version == gVar.CtArr[224])) {
            $("#LoginTypeDiv").css("display", "inline-block");
            $(".loginLogo").css("margin-bottom", "0px");
            $(".login_main").css("margin-top", "-220px");
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[186] && supportCSS3("border-radius")) {
            $("#uName .spanImg").addClass("cssImg");
            $("#pwd .spanImg").addClass("cssImg");
            $("#pwd .spanImg").append("<div></div>");
        }

        if (lgCls.skin == "red_c166") {
            $(".login_input").focus(function () {
                $(this).parent(".login_box").addClass("inputFocusCss");
            }).blur(function () {
                $(this).parent(".login_box").removeClass("inputFocusCss");
            });
        } else if (lgCls.skin == "white_c224") {
            $(".loginLogo").css("margin-bottom", "0px");
            $(".login_main").css("top", "35%");
        }

        if (lgCls.version == gVar.CtArr[234]) {
            $("#loginDiv").before($(".loginLogo").detach());
            $("body").css("background-color", "rgb(0,51,171)");
        }
        if(lgCls.skin == "white_c238"){
            $("#idLogin_InputDiv").before("<p class='logoTxt'>IP Camera</p>");
            $("#logoutMenu").css("display","");
            $("#logoutMenuBtn").click(function(){
                $("#logout").click();
            });
        }

        //Load the cookie data(start)
        for (var i = 0; i < 50; i++) {
            if ($.cookie("RS_IP" + i)) {
                var obj = {};
                obj.IP = $.cookie("RS_IP" + i);
                obj.Port = $.cookie("RS_Port" + i) ? $.cookie("RS_Port" + i) : 9000;
                lgCls.IpAndPort.push(obj);
            }
        }

        $("#loginIP_select").empty();
        for (var i = 0; i < lgCls.IpAndPort.length; i++) {
            $("#loginIP_select").append('<option class="option" value="' + i + '">' + lgCls.IpAndPort[i]["IP"] + '</option>');
        }

        if (document.getElementById("loginIP_select").options.length != 0) {
            var clear_lg = "clear";
            if (gVar.lg == "CHS") {
                clear_lg = lg.get("IDS_MOTION_CLEAR");
            }
            $("#loginIP_select").append('<option class="option" value="clear">---' + clear_lg + '---</option>');
            $("#loginIP").val(lgCls.IpAndPort[0]["IP"]);
            $("#loginPort").val(lgCls.IpAndPort[0]["Port"]);
        } else {
            $("#loginIP").val("");
            $("#loginPort").val("");
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if (lgCls.version == gVar.CtArr[70]) {
                document.title = lg.get("IDS_USER_DEFINED_TITLE");
            } else if (lgCls.version == gVar.CtArr[116] || lgCls.version == gVar.CtArr[198] || lgCls.version == gVar.CtArr[142] || lgCls.useTitle) {
                document.title = lgCls.webTitle;
            } else if (lgCls.version == gVar.CtArr[166]) {
                $("#LoginStatus").css("height", "25px");
            }
        }

        var defUserName = "admin";
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (lgCls.version == gVar.CtArr[49]) {
                defUserName = "Admin";
            }
        }else if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if (lgCls.version == gVar.CtArr[249]) {
                defUserName = lg.get("IDS_COMSTERN");
            }
        }

        defUserName = $.cookie("RS_User") ? $.cookie("RS_User") : defUserName;

        if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[70]) {
            defUserName = "root";
            $("#login_language").css("margin-top", "-55px");
        }

        if (lgCls.version == gVar.CtArr[211]) {
            $("#loginDiv").css("border-radius", "10px");
        } else if (lgCls.skin == "yellow_c229") {
            $("#login_language").after("<img class='lanImg'/>");
            $("#loginPswCkbox").after("<label class='ckExt' for='loginPswCkbox'></label>");
            $("#loginPswCkbox").css("visibility", "hidden").css("position", "relative");
            $("#loginDiv").css("width", "550px").css("padding-top", "20px");
            $("#loginBtn").css("border", "1px solid #F1CA00").css("font-weight", "normal");
            $("#login_language").css("margin-right", "20px");
        }

        $("#userName").val(defUserName);
        if ($.cookie("RS_PswCkbox") == 1) {
            $("#loginPswCkbox").prop("checked", true);
            $("#loginPsw").val($.cookie("RS_PswVal") ? $.base64.decode($.cookie("RS_PswVal")) : "");
        }
        //fishEye soft
        gVar.LocalFishEye.showMode = $.cookie("RS_FishEye_ShowMode") ? $.cookie("RS_FishEye_ShowMode") * 1 : 1;
        gVar.LocalFishEye.mountMode = $.cookie("RS_FishEye_MountMode") ? $.cookie("RS_FishEye_MountMode") * 1 : 0;
        //Load the cookie data(end)
//      if (lgCls.version == gVar.CtArr[113]) {//Capture and Record has permission limit
//          gVar.bCapturePermissionLimit = true;
//      }

        gVar.pswMinLen = 5;
        gVar.pswMaxLen = 16;
        if (C23Netview || C23NetviewUI5) {
            gVar.pswMinLen = 0;
            gVar.pswMaxLen = 20;
        }
        if (lgCls.version == gVar.CtArr[0]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 15;
        } else if (lgCls.version == gVar.CtArr[1]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[7] || lgCls.version == gVar.CtArr[171]) {
            gVar.pswMinLen = 6;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[70]) {
            gVar.pswMinLen = 5;
            gVar.pswMaxLen = 16;
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                gVar.pswMinLen = 1;
                gVar.pswMaxLen = 8;
            }
        } else if (lgCls.version == gVar.CtArr[34]) {
            gVar.pswMinLen = 5;
            gVar.pswMaxLen = 8;
        } else if (lgCls.version == gVar.CtArr[85]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 15;
        } else if (lgCls.version == gVar.CtArr[42] || lgCls.version == gVar.CtArr[68] || lgCls.version == gVar.CtArr[165]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 13;
        } else if (lgCls.version == gVar.CtArr[62]) {
            gVar.pswMinLen = 6;
            gVar.pswMaxLen = 13;
        } else if (lgCls.version == gVar.CtArr[122]) {
            gVar.pswMinLen = 5;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[3]) {
            gVar.pswMinLen = 6;
            gVar.pswMaxLen = 20;
        } else if (lgCls.version == gVar.CtArr[49] || lgCls.version == gVar.CtArr[94]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[120]) {
            gVar.pswMinLen = 0;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[87]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[116]) {
            gVar.pswMinLen = 3;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[186]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 16;
        } else if (lgCls.version == gVar.CtArr[89]) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 18;
        } else if (lgCls.version == gVar.CtArr[21]) {
            gVar.pswMinLen = 6;
            gVar.pswMaxLen = 18;
        } else if (lgCls.version == gVar.CtArr[67] && gDevice.devType != devTypeEnum.DEV_IPC) {
            gVar.pswMinLen = 8;
            gVar.pswMaxLen = 8;
        } else if (lgCls.version == gVar.CtArr[218]) {
            gVar.pswMinLen = 8;
        } else {
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if (lgCls.version == gVar.CtArr[1]) {
                    gVar.pswMinLen = 5;
                    gVar.pswMaxLen = 16;
                } else if (lgCls.version == gVar.CtArr[76]) {
                    gVar.pswMinLen = 8;
                    gVar.pswMaxLen = 8;
                } else if (lgCls.version == gVar.CtArr[32]) {
                    gVar.pswMinLen = 6;
                    gVar.pswMaxLen = 13;
                } else if (lgCls.version == gVar.CtArr[246]) {
                    gVar.pswMinLen = 1;
                    gVar.pswMaxLen = 8;
                } else if (lgCls.version == gVar.CtArr[238]) {
                    gVar.pswMinLen = 1;
                } else {
                    gVar.LimitInputP = false;//The login screen does not limit password input length
                }
            } else {
                gVar.LimitInputP = false;
            }
        }
        if (gVar.LimitInputP == true) {
            $("#loginPsw").attr("maxlength", gVar.pswMaxLen);
        }
        $("#login_user_input,#login_user_input_confirm").attr("maxlength", gVar.pswMaxLen);

        gVar.userNameLen = 16;
        if (C23Netview || C23NetviewUI5) {
            gVar.userNameLen = 16;
            gVar.LimitInputN = true;//The login interface does not limit user name input length
        }
        if (lgCls.version == gVar.CtArr[0] || lgCls.version == gVar.CtArr[7]) {
            gVar.userNameLen = 8;
            gVar.LimitInputN = true;
        }
        if (gVar.LimitInputN == true) {
            $("#userName").attr("maxlength", gVar.userNameLen);
        }
        $("#login_userName_input").attr("maxlength", gVar.userNameLen);

        if ($.browser.msie && $.browser.version.split(".")[0] * 1 <= 9) {
            $('#loginIP_select').addClass("IE9Select");
        }

        $("#loginBtn").addClass("loginBtnNormal");
        $("#loginBtn").mouseover(function () {
            $(this).removeClass("loginBtnNormal").addClass("loginBtnOver");
        }).mouseout(function () {
            $(this).removeClass("loginBtnOver").addClass("loginBtnNormal");
        });

        $("#login_language").rsselect();
        var items = [];
        for (var i = 0; i < lgCls.mul.length; i++) {
            var s_item = {};
            s_item.value = lgCls.mul[i][0];
            s_item.text = lgCls.mul[i][1];
            items[i] = s_item;
        }
        $("#login_language").rsselect({
            height: "22px",
            showArrow: true,
            selectChange: function () {
                refreshLg()
            }
        });
        $("#login_language").rsselect("append", items);
        $("#login_language").rsselect("setValue", gVar.lg);
        LanguageCall(gVar.lg);

        function refreshLg() {
            lg.refresh();
            gVar.lg = $("#login_language").rsselect("getValue");
            LanguageCall(gVar.lg);
        }

        //Login LOGO display
        if (lgCls.logo != gVar.CtArr[23] && lgCls.logo != gVar.CtArr[108] && lgCls.logo != gVar.CtArr[143] && lgCls.logo != gVar.CtArr[150]
            && lgCls.logo != gVar.CtArr[160] && lgCls.logo != gVar.CtArr[161] && lgCls.logo != gVar.CtArr[121]) {
            if (lgCls.logo == gVar.CtArr[186] && typeof SVGRect != "undefined") {
                $(".loginLogo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGIN_c" + lgCls.logo + ".svg) no-repeat");
            } else {
                $(".loginLogo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGIN_c" + lgCls.logo + ".png) no-repeat");
            }
        } else {
            $(".loginLogo").css("background", "url()");
        }

        if (gDevice.devType == devTypeEnum.DEV_IPC) {
            if (lgCls.langues.indexOf("PTB") > 0 || lgCls.langues.indexOf("SLK") > 0) {
                $("#login_language").css("width", "150px");
                $("#login_language .select_text").css("text-align", "right");
            }
        }

        //ipc active--set password
        //lgCls.FirstLoginFlag = 1;
        if (lgCls.FirstLoginFlag) {
            MasklayerShow();
            if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
                var tipStr = "";
                for (var i = 0; i < 5; i++) {
                    tipStr += '<li><p>' + lg.get("IDS_LOGINFIR_TIP" + (i + 1) + "_ENU") + '</p><p>' + lg.get("IDS_LOGINFIR_TIP" + (i + 1) + "_KOR") + '</p></li>';
                }
                $("#login_user_title").children("em").prop("innerHTML", lg.get("IDS_LOGINFIR_TITLE"));
                login_userName_label.innerHTML = lg.get("IDS_LOGINFIR_USERNAME");
                login_user_label.innerHTML = lg.get("IDS_LOGINFIR_PWD");
                login_user_confirm_label.innerHTML = lg.get("IDS_LOGINFIR_CONFIRM");
                $("#login_user_prompt").addClass("loginForC32");
                $("#pwdTips").html("<ul>" + tipStr + "</ul>").css("display", "block");
            } else {
                $("#login_user_title").children("em").prop("innerHTML", lg.get("IDS_DEFAULT_PASSWORD"));
                login_userName_label.innerHTML = lg.get("IDS_USERNAME");
                login_user_label.innerHTML = lg.get("IDS_LOGIN_PSW");
                login_user_confirm_label.innerHTML = lg.get("IDS_CONFIRM");
            }

            if (lgCls.version == gVar.CtArr[186]) {
                $("#login_user_title").children("em").prop("innerHTML", "First Time Password");
                var psTxt1 = "Password of 8-16 Characters with two of the following:";
                var psTxt2 = "Upper(A-Z),Lower(a-z), Digits(0-9) and Special Characters.";
                $("#login_user_content").css("height", "200px");
                $("#login_user_content").append('<li style="width:380px;height:20px;line-height:20px;margin-left:10px;margin-top:20px;text-align:center;color:#f00;font-size:12px;">' + psTxt1 + '</li><li style="width:380px;height:20px;line-height:20px;margin-left:10px;text-align:center;color:#f00;font-size:12px;">' + psTxt2 + '</li>');
            } else if (lgCls.version == gVar.CtArr[218]) {
                $("#login_user_input,#login_user_input_confirm").keyup(function () {
                    $(this).val($(this).val().replace(/[^0-9a-zA-Z]/ig, ''));
                });
            }

            $("#login_userName_input").val(gVar.user);
            if (gDevice.devType == devTypeEnum.DEV_HDVR) {
                $("#login_userName_input").css("opacity", 0.3);
            }
            $("#login_user_input").keyup(function () {
                if (lgCls.version != gVar.CtArr[0] && lgCls.version != gVar.CtArr[7]) {
                    $("#login_user_content #strengthBar").css("display", "block");
                    CPswStrength($(this).prop("value"));
                }
            });
            $("#login_btn_user_ok").click(function () {
                var loginPwd = $("#login_user_input").val();
                var loginConfirm = $("#login_user_input_confirm").val();
                if (loginPwd == "" || loginConfirm == "") {
                    ShowPaop($("#login_user_title em").text(), lg.get("IDS_NO_PASSWORD"));
                    $("#login_user_input").focus().select();
                    return;
                }

                if (loginPwd.length < gVar.pswMinLen || loginPwd.length > gVar.pswMaxLen) {
                    var PwdPaopTxt = lg.get("IDS_CHECKPW_LENGTH") + ' ' + (gVar.pswMinLen) + ' ' + lg.get("IDS_CHECKPW_LENGTHB") + ' ' + gVar.pswMaxLen + ' ' + lg.get("IDS_CHECKPW_LENGTHU");
                    ShowPaop($("#login_user_title em").text(), PwdPaopTxt);
                    $("#login_user_input").focus().select();
                    return;
                }

                if (loginConfirm != loginPwd) {
                    ShowPaop($("#login_user_title em").text(), lg.get("IDS_PSW_DIFFRENT"));
                    $("#login_user_input").focus().select();
                    return;
                }

                if (lgCls.version == gVar.CtArr[186] && !checkPsdLUNS(loginPwd)) {
                    $("#login_user_input").focus().select();
                    return;
                } else if (lgCls.version == gVar.CtArr[218]) {
                    var ret = ((/[a-zA-Z]/).test($("#login_user_input").val())) && ((/[0-9]/).test($("#login_user_input").val()));
                    if (ret == false) {
                        ShowPaop($("#login_user_title em").text(), "Any combinations of letters and numbers！");
                        $("#login_user_input").focus().select();
                        return;
                    }
                } else if (lgCls.version == gVar.CtArr[87] && !checkPsdLUNS(loginPwd)) {
                    ShowPaop($("#login_user_title em").text(), "A password contains at least one number, one letter and one symbol!");
                    $("#login_user_input").focus().select();
                    return;
                } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
                    var ret = checkPsw_c32(loginPwd);
                    if (!ret) {
                        ShowPaop($("#login_user_title em").text(), lg.get("IDS_REBOOT_ERR_PWD"));
                        $("#login_user_input").focus().select();
                        return;
                    }
                }

                if (gIELogin === false) {
                    gVar.ip = '172.18.14.196';
                    gVar.mediaport = '9988';
                }

                gDevice.IPCFirstLoginSetPwd(gVar.ip, gVar.mediaport * 1, gVar.user, loginPwd);
                /*var res = gDevice.IPCFirstLoginSetPwd(gVar.ip, gVar.mediaport * 1, gVar.user, loginPwd);
                if(res.Code == 1){
                    ShowPaop('',lg.get('IDS_SAVE_SUCCESS'));
                    MasklayerHide();
                    return;
                }*/
            });
            $("#login_user_prompt").css('display', 'block');
        }
    }, "html");

    gVar.bWebInit = true;
}

//Log in function
function Login(id) {
    if (lgCls.version == gVar.CtArr[7]) {
        if ($("#loginPsw").val() == "") {
            Web_prompt(lg.get("IDS_NO_PASSWORD"), true);
            return;
        }
    }

    if ($("#userName").val() == "") {
        Web_prompt(lg.get("IDS_NO_USERNAME"), true);
        $("#userName").focus().select();
        return;
    }

    var status = $("#" + id).attr("name");
    if (status == "clicked") {
        return;
    } else {
        $("#" + id).attr("name", "clicked");
    }

    $("#loginBtn").removeClass("loginBtnNormal loginBtnOver").addClass("loginBtnDisable");

    if (gIELogin == false) {
        gVar.ip = $("#loginIP").val();
        gVar.mediaport = $("#loginPort").val() * 1;
    }
    gVar.user = $("#userName").val();
    gVar.passwd = $("#loginPsw").val();

    if (lgCls.version == gVar.CtArr[116]) {
        gVar.loginClientType = 2;
    } else if (lgCls.version == gVar.CtArr[94]) {
        gVar.loginClientType = 3;
    } else if (lgCls.version == gVar.CtArr[144] || lgCls.version == gVar.CtArr[43]) {
        gVar.loginClientType = 4;
    } else if (lgCls.version == gVar.CtArr[85]) {
        gVar.loginClientType = 5;
    } else if (lgCls.version == gVar.CtArr[148]) {
        gVar.loginClientType = 6;
    } else if (lgCls.version == gVar.CtArr[221]) {
        gVar.loginClientType = 7;
    }

    //Call the plug-in interface
    if (gDevice.bInit) {
        var str = "Connecting...";
        if (lgCls.version == gVar.CtArr[105] && gVar.lg == "DEU") {
            str = "Die Verbindung wird hergestellt...";
        } else if (lgCls.version == gVar.CtArr[85] && gVar.lg == "KOR") {
            str = "연결중";
        } else if (gDevice.devType == devTypeEnum.DEV_IPC) {
            str = lg.get("IDS_PPPOE_DIALSTATUS");
        }
		
		if(C0Netview){
			//Web_prompt(str);
			MasklayerHide();
			$("#Web_false").html(str).css("color", "red");
			$("#Web_false").show();
			
			//LoginStatus.innerHTML = "Connecting..."
			setTimeout(function(){
				gDevice.id = gDevice.UserLogin().Data.DeviceID;
			},50);
		}else{
			Web_prompt(str);
			//LoginStatus.innerHTML = "Connecting..."
			gDevice.id = gDevice.UserLogin().Data.DeviceID;
		}
    } else {
        alert("Plug-in uninitialized!");
    }

}

//auto Login
function AutoLogin() {
    if (gIELogin == false) {
        gVar.ip = "172.18.12.12";
        gVar.mediaport = 9988;
    }

    if (lgCls.version == gVar.CtArr[116]) {
        gVar.loginClientType = 2;
    } else if (lgCls.version == gVar.CtArr[94]) {
        gVar.loginClientType = 3;
    } else if (lgCls.version == gVar.CtArr[144]) {
        gVar.loginClientType = 4;
    } else if (lgCls.version == gVar.CtArr[85]) {
        gVar.loginClientType = 5;
    } else if (lgCls.version == gVar.CtArr[148]) {
        gVar.loginClientType = 6;
    } else if (lgCls.version == gVar.CtArr[221]) {
        gVar.loginClientType = 7;
    }

    //Call the plug-in interface
    if (gDevice.bInit) {
        gDevice.id = gDevice.UserLogin().Data.DeviceID;
    } else {
        alert("Plug-in uninitialized!");
    }

}

function LoadLivePage(func) {
    gVar.GetHtml({
        webUrl: "html/live.html",
        callback: function (html) {
            jQuery("head").append('<link href="css/live.css" rel=\"stylesheet\" type=\"text/css\" />');
            $("#live").html(html).css("display", "block");
            //SetResize("live");
            LoadLiveTile();
            if (gDevice.loginRsp.ChannelNum > 1 && gDevice.devType != devTypeEnum.DEV_IPC) {
                $("#listBtn,#pageBtnBox").css("display", "");
            }
            if (gDevice.devType == devTypeEnum.DEV_IPC) {
                if (gDevice.loginRsp.FishEye.isFishEye) {
                    $("#fish-eye-btn").css("display", "");
                } else {
                    $(".streamBtnBox").css("left", "0");
                }
                if (!gDevice.loginRsp.FishEye.isSupportHard_dec) {
                    $("#code-box-Bg").css("display", "none");
                }
                if(lgCls.skin == "white_c238"){
                    $("#LiveMenu,#PlayBackMenu,#ConfigMenu,#PathMenu").css("display","none");
                    if((gDevice.loginRsp.ControlBitArray[1] >> 20) & 1){
                        $("#setMenu").css("display","");
                    }else{
                        $("#logoutMenuBtn").css("background-image","none");
                    }
                    $("#setMenuBtn").click(function(){
                        $(".headerMenu").css("border-color","#fff");
                        $("#configBtn").click();
                        if (lgCls.sdcardshow * 1 == 1 && gDevice.loginRsp.UserPlayBack & 0x01 == 1){
                            $("#PlayBackMenu").css("display","");
                        }
                        $("#LiveMenu,#ConfigMenu,#PathMenu").css("display","");
                        $("#setMenu").css("display","none");
                    });
                    $("#liveBtn").click(function(){
                        $(".headerMenu").css("border-color","#ccc");
                        $("#LiveMenu,#PlayBackMenu,#ConfigMenu,#PathMenu").css("display","none");
                        $("#setMenu").css("display","");
                    });
                }
                $("#play").css("background-position", "0px -352px").attr("data-posy", "-352px");
                $("#stop").css("background-position", "0px -384px").attr("data-posy", "-384px");
            } else {
                $("#stop").css("display", "");
                if (gVar.bC0_0305_3120101) {
                    $("#play").css("display", "none");
                }
            }
            setTimeout(function () {
                lan("live");
            }, 10);
            gVar.GetJS({
                webUrl: "js/live.js",
                callback: function () {
                    setTimeout(function () {
                        func();
                    }, 100)
                    //gDevice.PreviewPlay(0,0,[0]);
                }
            });
        }
    });
}

function LoadConfigPage(func) {
    gVar.GetHtml({
        webUrl: "html/config.html",
        callback: function (html) {
            jQuery("head").append('<link href="css/config.css" rel=\"stylesheet\" type=\"text/css\" />').append('<link href="html/cfg/css.css" rel=\"stylesheet\" type=\"text/css\" />');
            $("#config").html(html).css("display", "block");
            //SetResize("config");
            setTimeout(function () {
                lan("config");
            }, 10);
            gVar.GetJS({
                webUrl: "js/config.js",
                callback: function () {
                    func();
                    gVar.GetJS({
                        webUrl: "js/cal.js",
                        callback: function () {}
                    });
                }
            });
        }
    });
}

function LoadPlaybackPage(func) {
    gVar.GetHtml({
        webUrl: "html/playback.html",
        callback: function (html) {
            jQuery("head").append('<link href="css/playback.css" rel=\"stylesheet\" type=\"text/css\" />');
            $("#playback").html(html).css("display", "block");
            //SetResize("playback");
            setTimeout(function () {
                lan("playback");
            }, 10);
            gVar.GetJS({
                webUrl: "js/jquery.mousewheel.js",
                callback: function () {
                    var timelinetype = "js/timeline.js";
                    if ($.browser.msie && $.browser.version.indexOf("8") != -1) { //IE8 using plug-in timeline
                        timelinetype = "js/timelineocx.js";
                    }
                    gVar.GetJS({
                        webUrl: timelinetype,
                        callback: function () {
                            func();
                            gVar.GetJS({
                                webUrl: "js/playback.js",
                                callback: function () {
                                    //func();
                                    gVar.GetJS({
                                        webUrl: "js/cal.js",
                                        callback: function () {
                                            $('#next_touch_date').simpleDatepicker({
                                                type: 0,
                                                x: 0,
                                                y: 0,
                                                Laguage: gVar.lg,
                                                CallBack: null
                                            });
                                            $('#next_touch_date').click();
                                            $("#calday").val($('#next_touch_date').simpleDatepicker.formatOutput(new Date()));
                                            CalSearchByMon();
                                        }
                                    });
                                }
                            });
                        }
                    })
                }
            })
        }
    });
}

function LoadPathConfigPage(func) {
    gVar.GetHtml({
        webUrl: "html/cfg/localSet.html",
        callback: function (html) {
            jQuery("head").append('<link href="css/pathConfig.css" rel=\"stylesheet\" type=\"text/css\" />');
            $("#pathConfig").html(html).css("display", "block");
            //SetResize("pathConfig");
            setTimeout(function () {
                lan("localSet");
            }, 10);
            gVar.GetJS({
                webUrl: "html/cfg/localSet.js",
                callback: function () {
                    $("#pathConfig_Con").addClass("pathContent");
                    $("#configPath").css("display", "block");
                    if(lgCls.skin == "white_c238"){
                        $("#pathConfig_Sub").css("height", "280px").css("margin-top", "-240px");
                    }else{
                        $("#pathConfig_Sub").css("height", "280px").css("margin-top", "-140px");
                    }
                    $("#pathConfig_Con").css("height", "290px");
                    func();
                    if ($.browser.msie && $.browser.version.split(".")[0] * 1 <= 9) {
                        $("select").addClass("IE9Select");
                    }
                }
            });
        }
    });
}

function LoadChildConfigPage(childPage) {
    MasklayerShow();
    if (tTime && (childPage != 'general' || childPage != 'dst_item')) {
        clearTimeout(tTime);
    }
    if (g_soundDecibelTimmer && (childPage != 'sound_detection')) {
        clearTimeout(g_soundDecibelTimmer);
    }
    gVar.childPage = childPage;
    gVar.GetHtml({
        webUrl: "html/cfg/" + childPage + ".html",
        callback: function (html) {
            $("#content").html(html).css("display", "block");
            //Video switch parameters
            //has no parameters permission,is only can't change param,but it still can see video
            //if((gDevice.loginRsp.UserSetRight >> 0 & 0x1) != 0) //Permission to screen video without parameters

            var bShowVideo = true;
            if (gVar.bC0_0305_3120101) {
                if (childPage == "alarm_mv") {
                    //bShowVideo = false;
                }
            }
            if (bShowVideo) {
                ChangeParamVideo(childPage);
            }

            lan(childPage);
            gVar.GetJS({
                webUrl: "html/cfg/" + childPage + ".js",
                //Load js and then determine the location, because may change the position of the plugin layer in js, plug-in cover page
                callback: function () { //
//              	$('.SvBtnState').click(function(){
//              		$(this).fadeTo("slow", 0.2).prop("disabled", true);
//              	});
                    if (bShowVideo) {
                        if ($.browser.msie) {
                            if ($(".video_position").length != 0) {
                                $(".video_position").append($("#ipcocx").detach());
                                $("#ipcocx").css({
                                    width: "100%",
                                    height: "100%"
                                });
                            }
                        } else {
                            SetResize(childPage);
                        }
                    }
                    if ($.browser.msie && $.browser.version.split(".")[0] * 1 <= 9) {
                        $("select").addClass("IE9Select");
                    }

                    //MasklayerHide();//Page refresh after have to return the result to hide the mask layer(Here can't hide)
                }
            });
        }
    });
}

function ChangeParamVideo(childPage) { //Video switch parameters page
    if (gVar.vdCurCh != -1) {
        gDevice.ParamvideoStop(gVar.vdCurCh);
    }
    switch (childPage) {
        case "chn_live": //
            gDevice.OcxChangePage(pageEnum.TypeLiveParamPage);
            break;
        case "Img_Ctrl": //
            gDevice.OcxChangePage(pageEnum.TypeNormalVideoParamPage);
            break;
        case "chn_sp": // 
            gDevice.OcxChangePage(pageEnum.TypePrivateZonePage);
            break;
        case "alarm_mv": //
            gDevice.OcxChangePage(pageEnum.TypeMotionParamPage);
            break;
        case "chn_roi": //
            gDevice.OcxChangePage(pageEnum.TypeRoiPage);
            break;
        case "Perimeter_Line": //
            gDevice.OcxChangePage(pageEnum.TypePLinePage);
            break;
        case "Perimeter_Zone": //
            gDevice.OcxChangePage(pageEnum.TypePZonePage);
            break;
        case "GoodsLost_Legacy": //
            gDevice.OcxChangePage(pageEnum.TypeGLostLPage);
            break;
        case "Human_Detection"://
            gDevice.OcxChangePage(pageEnum.TypeHDetePage);
            break;
        case "Face_Detection"://
            gDevice.OcxChangePage(pageEnum.TypeFDetePage);
            break;
        case "People_Cross_Counting"://
            gDevice.OcxChangePage(pageEnum.TypePCCountPage);
            break;
        case "mobile_stream_set": //
            gDevice.OcxChangePage(pageEnum.TypeClipPage);
            break;
        case "alarm_pir": //
            gDevice.OcxChangePage(pageEnum.TypePIRParamPage);
            break;
        case "Intrusion_Detection": //
            gDevice.OcxChangePage(pageEnum.TypeIntrusionDetecPage);
            break;
        case "Type_Meter_Recognition": //
            gDevice.OcxChangePage(pageEnum.TypeTypeMeterRecognitionPage);
            break;
        case "IntelligentNewUser": //
            gDevice.OcxChangePage(pageEnum.TypeHGInt);
            break;
        case "flood_lightmulchn":
        case "flood_light": //
            gDevice.OcxChangePage(pageEnum.TypeFloodlight);
            break;
        default: {
            gDevice.OcxChangePage(pageEnum.TypeNoVideoParamPage);
            SetResize("config");
            return;
        }
    }
}

function GetDeviceName(strID) {
    var xmlRequest = null;
    var ret = false;
    try {
        xmlRequest = new XMLHttpRequest();
    } catch (e) {
        try {
            xmlRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
        }
    }
    if (xmlRequest == null) return false;

    var url = '/queryinfo.php?DevID=' + strID + '&t=' + gVar.nDate;
    xmlRequest.onreadystatechange = queryCallback;
    xmlRequest.open("post", url, false);
    xmlRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xmlRequest.send(null);

    function queryCallback(xml) {
        if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
            var infos = xmlRequest.responseXML.getElementsByTagName("response");
            gVar.devName = infos[0].getElementsByTagName('DevName')[0].firstChild.data;
            ret = true;
        }
    }

    return ret;
}

/////////////////////////////////event///////////////////////////////////////////////////////////////////
function GetMsgCallBack() {};

function SendMsgToWeb(strMsg) {
    GetMsgCallBack(strMsg);
}

function CfgCallBack() {}

function FileUpdateEvent(pos, type) { //File to upgrade event
    if (type) { //NVR IPC to upgrade
        var channelNo = pos & 0xFFFF;
        var status = pos >> 16;
        if (status == -1) { //update failed
            ipcstatus += "CH" + (channelNo + 1) + lg.get("IDS_FILE_UPGRADE_UPFAILED") + "<br>";
        } else if (status == 1) { //update successfully
            ipcstatus += "CH " + (channelNo + 1) + lg.get("IDS_FILE_UPGRADE_UPSUCC") + "<br>";
        } else if (status == -2) { //ECC Error
            ipcstatus += "CH" + (channelNo + 1) + lg.get("IDS_FILE_CHECK_FAULSE") + "<br>";
        } else if (status == -3) { //Invalid version
            ipcstatus += "CH" + (channelNo + 1) + lg.get("IDS_FILE_VERSION_FAULSE") + "<br>";
        } else { //Upgrading
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_IPC_UPDATE"));
            return;
        }
        $("#SJ_IPC").data("selCount", $("#SJ_IPC").data("selCount") - 1);
        if ($("#SJ_IPC").data("selCount") <= 0) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), ipcstatus);
            $("#SJ_IPCStop").click();
            MasklayerHide();
        }
    } else {
        if (pos <= 100 && pos >= 0) {
            $("#UPDATESTATE").css("display", "block");
            $("#aa").css("display", "block");
            $("#aa").css("width", pos + "%");
            $("#updateMsg").html(pos + "%");
        } else if (pos == 390) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRADE_CLOSED"));
        } else if (pos == 391) {
            $("#aa").css("display", "block").css("width", "100%");
            $("#updateMsg").html("100%");
            $("#RebootTootip").css("display", "");
            $("#RebootTootipText").prop("innerHTML", lg.get("IDS_SUCWAITFORREBOOT"));
            gReboot = 1;

            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRADE_OK"));
            var title = lg.get("IDS_SYS_UPDATE");
            window.setTimeout(function () {
                AutoClose(title, 0);
            }, 1000);
        } else if (pos == 392) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRADE_READFILEFAIL"));
            $("#RebootTootip").css("display", "none");
        } else if (pos == 393) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRADE_INVALIDFILE"));
            $("#RebootTootip").css("display", "none");
        } else if (pos == 395) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRADE_VERERROR"));
            $("#RebootTootip").css("display", "none");
        } else if (pos == 396) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRAD_ING"));
        } else if (pos == 397) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRAD_SAME"));
            $("#RebootTootip").css("display", "none");
        } else if (pos == 398) {
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_REMOTEUPGRAD_LANERR")); //Can't upgrade for multiple languages
            $("#RebootTootip").css("display", "none");
        } else if (pos == 399) {
            $("#UPStart").prop("disabled", false);
            ShowPaop(lg.get("IDS_SYS_UPDATE"), lg.get("IDS_INUSERINTERFACE")); //Local user is operating , cannot be upgraded!
        } else if (pos == 764) {
            $("#RebootTootip").css("display", "");
            $("#RebootTootipText").prop("innerHTML", lg.get("IDS_IPC_UPDATE"));
            $("#aa").css("display", "block").css("width", "100%");
            $("#updateMsg").html("100%");
            $("#UPStop,#UPStart").prop("disabled", true);
        }

        if (pos >= 390 && pos <= 397) {
            if (type == 0) {
                $("#UPStop,#UPStart").prop("disabled", false);
            } else {
                $("#SJ_IPC,#SJ_IPCStop").prop("disabled", false);
            }
            $("#RebootTootip").css("display", "none");
        }

        if (pos >= 390 && pos <= 399 && pos != 394) {
            gDevice.FileUpdate(methodEnum.SubMsgStopUpgrade, "");
        }
    }

}

function RemoteTestEvent(type, data) {
    if (type == methodEnum.SubMsgEmailTest) { //301
        var target_obj = $("#EmailTest");
        var title;
        if (target_obj.length > 0) {
            title = $("#net_email").text();
            EmailTest.innerHTML = lg.get("IDS_EMAILTEST");
            $("#EmailTest").prop("disabled", false);
            $("#EmailTestStop").prop("disabled", true);
        }
        target_obj = jQuery('#NormalCloStoEm_EmailTest');
        if (target_obj.length > 0) {
            title = lg.get("IDS_EMAIL_INFO");
            document.getElementById("NormalCloStoEm_EmailTest").value = lg.get("IDS_EMAILTEST");
            $("#NormalCloStoEm_EmailTest").prop("disabled", false);
        }

        var ret = data["RetVal"] * 1;
        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]) {
            switch (ret) {
                case -1:
                    ShowPaop(title, lg.get("IDS_EMTEST_FU1"));
                    break;
                case 1:
                    ShowPaop(title, lg.get("IDS_EMTEST_1"));
                    break;
                case 2:
                    ShowPaop(title, lg.get("IDS_EMTEST_2"));
                    break;
                case 3:
                    ShowPaop(title, lg.get("IDS_EMTEST_3"));
                    break;
                case 4:
                case 5:
                case 6:
                    ShowPaop(title, lg.get("IDS_EMTEST_4"));
                    break;
                case 7:
                case 8:
                case 9:
                case 10:
                    ShowPaop(title, lg.get("IDS_EMTEST_7"));
                    break;
                case 11:
                    ShowPaop(title, lg.get("IDS_EMTEST_11"));
                    break;
                default:
                    ShowPaop(title, lg.get("IDS_EMTEST_DEFAULT"));
                    break;
            }
            return;
        }

        switch (ret) {
            case 0:
                ShowPaop(title, lg.get("IDS_EMAILTEST_OK"));
                break;
            case 1:
                ShowPaop(title, lg.get("IDS_EMAILTEST_DNS"));
                break;
            case 2:
                ShowPaop(title, lg.get("SMTP_ERR_SOCKET"));
                break;
            case 3:
                ShowPaop(title, lg.get("IDS_EMAILTEST_CONNECT"));
                break;
            case 4:
                ShowPaop(title, lg.get("IDS_EMAILTEST_CONNECT_TIMEOUT"));
                break;
            case 5:
                ShowPaop(title, lg.get("SMTP_ERR_GETSOCKOPT"));
                break;
            case 6:
                ShowPaop(title, lg.get("SMTP_ERR_SETSOCKOPT"));
                break;
            case 7:
                ShowPaop(title, lg.get("SMTP_ERR_SELECT"));
                break;
            case 8:
                ShowPaop(title, lg.get("IDS_EMAILTEST_BADPORT"));
                break;
            case 9:
                ShowPaop(title, lg.get("SMTP_ERR_SEND"));
                break;
            case 10:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SEND_TIMEOUT"));
                break;
            case 11:
                ShowPaop(title, lg.get("IDS_EMAILTEST_RECEIVE"));
                break;
            case 12:
                ShowPaop(title, lg.get("IDS_EMAILTEST_RECEIVE_TIMEOUT"));
                break;
            case 13:
                ShowPaop(title, lg.get("IDS_EMAILTEST_AUTH"));
                break;
            case 14:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_RAND"));
                break;
            case 15:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_METHOD"));
                break;
            case 16:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_CTXNEW"));
                break;
            case 17:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_CTXSET"));
                break;
            case 18:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_NEW"));
                break;
            case 19:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_SETFD"));
                break;
            case 20:
                ShowPaop(title, lg.get("IDS_EMAILTEST_SSL_CONNECT"));
                break;
            case 21:
                ShowPaop(title, lg.get("IDS_EMAILTEST_FOPEN"));
                break;
            default:
                ShowPaop(title, lg.get("IDS_EMAILTEST_UNKNOWN"));
                break;
        }
    } else if (type == methodEnum.SubMsgDDNSTest) { //302
        MasklayerHide();
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (gVar.var_DDNSTest_isTimeOut == true) {
                //Timeout(Has been playing box prompts the timeout)
                return;
            } else {
                //2 minutes to news, turn off the timer
                clearTimeout(gVar.timer_DDNSTest);
            }
        }

        if ($("#DDNSServerAddr").val() * 1 == 52) {
            DDNSTest.innerHTML = "Update";
        } else {
            DDNSTest.innerHTML = lg.get("IDS_DDNSTEST");
        }
        $("#DDNSTest").prop("disabled", false);

        if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112]) {
            DDNSPro112(data);
            return;
        }
        if ($("#DDNSServerAddr").val() * 1 == 52) {
            DDNSPro112(data);
            return;
        }

        var ret = data["RetVal"] * 1;
        var str = "";
        switch (ret) {
            case 0:
                str = lg.get("IDS_DDNSTEST_OK");
                break;
            case 1:
                str = lg.get("IDS_DDNSTEST_DNS");
                break;
            case 2:
                str = lg.get("DYNDNS_ERR_SOCKET");
                break;
            case 3:
                str = lg.get("DYNDNS_ERR_CONNECT");
                break;
            case 4:
                str = lg.get("IDS_DDNSTEST_CONNECT_TIMEOUT");
                break;
            case 5:
                str = lg.get("IDS_DDNSTEST_CONNECT_IP_TIMEOUT");
                break;
            case 6:
                str = lg.get("IDS_DDNSTEST_CONNECT_DDNS_TIMEOUT");
                break;
            case 11:
                str = lg.get("IDS_DDNSTEST_SEND_TIMEOUT");
                break;
            case 12:
                str = lg.get("IDS_DDNSTEST_RECEIVE");
                break;
            case 13:
                str = lg.get("IDS_DDNSTEST_RECEIVE_TIMEOUT");
                break;
            case 14:
                str = lg.get("IDS_DDNSTEST_HTTPGET");
                break;
            case 15:
                str = lg.get("IDS_DDNSTEST_BADAUTH");
                break;
            case 16:
                str = lg.get("IDS_DDNSTEST_NOHOST");
                break;
            case 17:
                str = lg.get("IDS_DDNSTEST_NOHOSTUSER");
                break;
            case 18:
                str = lg.get("IDS_DDNSTEST_ABUSE");
                break;
            case 19:
                str = lg.get("IDS_DDNSTEST_911");
                break;
            case 22:
                str = lg.get("IDS_DDNSTEST_NOT_DONATOR");
                break;
            case 23:
                str = lg.get("IDS_DDNSTEST_NOT_FQDN");
                break;
            case 24:
                str = lg.get("IDS_DDNSTEST_NOT_YOURS");
                break;
            case 25:
                str = lg.get("IDS_DDNSTEST_NUMHOST");
                break;
            case 26:
                str = lg.get("IDS_DDNSTEST_DNSERR");
                break;
            case 27:
                str = lg.get("IDS_DDNSTEST_IP_RESPONSE");
                break;
            case 28:
                str = lg.get("IDS_DDNSTEST_UNKNOWN");
                break;
            case 29:
                str = lg.get("IDS_PROTOCOL_SUNELL") + " ddns test ok!";
                break;
            case 30:
                str = "Invalid hostname!Please Reenter the hostname!";
                break;
            case 31:
                str = "Invalid MAC!";
                break;
            case 62:
                str = "Invalid IP!";
                break;
            case 36:
                str = "Hostname already in use!";
                break;
            case 940:
                str = "Flood Detected!";
                break;
            case 41:
                str = "Server Error!";
                break;
            case 42:
                str = "No record found!";
                break;
            case 45:
                str = "Delete Failed!";
                break;
            case 1028:
                str = "Other Error!";
                break;
            default:
                str = lg.get("IDS_DDNSTEST_UNKNOWN");
                break;
        }

        ShowPaop($("#net_ddns").text(), str);
    } else if (type == methodEnum.SubMsgHddFormat) { //309
        HddFormatRet(data["State"], data["Process"]);
    } else if (type == methodEnum.SubMsgAddAllDevice) { //312
        if ($.browser.safari) {
            MasklayerHide();
        }
        ShowPaop($("#secondLevelMenu").html(), lg.get("IDS_ADD_SUCCESS"));
    } else if (type == methodEnum.SubMsgActivateCloud) { //321
        MasklayerHide();
        // if (gDevice.devType == devTypeEnum.DEV_IPC) {
        //  alert("no Function");
        // return;
        // }
        var target_obj, title;
        var bV2Cloud = false;
        /*target_obj = $('#NewCloSto_Test_Email');
         if(target_obj.length > 0) {
         title = $("#NewCloSto_Title").text();
         $("#NewCloSto_Test_Email").prop("disabled", false);
         document.getElementById("NewCloSto_Test_Email").value = lg.get("IDS_TEST_CLOUDEMAIL");
         }*/
        target_obj = $('#NormalCloSto_Test_Email');
        if (target_obj.length > 0) {
            title = lg.get("IDS_CLOUDSTORAGE");
            $("#NormalCloSto_Test_Email").prop("disabled", false);
            document.getElementById("NormalCloSto_Test_Email").value = lg.get("IDS_TEST_CLOUDEMAIL");
        }

        target_obj = $('#CloSto_Test_Email');
        if (target_obj.length > 0) {
            bV2Cloud = true;
            title = lg.get("IDS_CLOUDSTORAGE");
            $("#CloSto_Test_Email").prop("disabled", false);
            CloSto_Test_Email.innerHTML = lg.get("IDS_TEST_CLOUDEMAIL");
        }

        var err = data["ErrCode"] * 1;
        if (bV2Cloud) {
            if (-1 == err || 4 == err) {
                ShowPaop(title, lg.get("IDS_LINKFAIL"));
            } else if (0 == err) {
                if ($.browser.safari) {
                    gDevice.openSafariByUrl(data["RetMsg"]);
                } else {
                    window.open(data["RetMsg"]);
                }
                ShowPaop(title, lg.get("IDS_ACTIVATED"));
            } else if (2 == err) {
                ShowPaop(title, lg.get("IDS_ACTIVATE_3"));
            }

            return;
        }

        var str = "";
        switch (err) {
            case 0: {
                str = lg.get("IDS_ACTIVATED");
                if ($.browser.safari) {
                    gDevice.openSafariByUrl(data["RetMsg"]);
                } else {
                    window.open(data["RetMsg"]);
                }
                break;
            }
            case 1:
                str = lg.get("IDS_CLOHAVE_ACTIVATED");
                break;
            case 3:
                //str = lg.get("IDS_ACTIVATE_TIMEOUT");
                str = lg.get("IDS_ACTIVATE_3");
                break;
            case 4:
                str = lg.get("IDS_LINKFAIL");
                break;
            case 8:
                str = "Email test failed !";
                break;
            case 9:
                str = "Email setup is incomplete.";
                break;
        }
        if (str != "") {
            ShowPaop(title, str);
        }
    } else if (type == methodEnum.SubMsgFtpTest) { //323
        MasklayerHide();
        $("#FtpTest").prop("disabled", false);
        FtpTest.innerHTML = lg.get("IDS_FTPTEST");

        var RetVal_FTP = data["RetVal"] * 1;
        var str = "";
        switch (RetVal_FTP) {
            case 0:
                str = lg.get("IDS_FTP_WRITE_SUC");
                break;
            case 1:
                str = lg.get("IDS_FTP_CLOSE_FAILED");
                break;
            case 2:
                str = lg.get("IDS_FTP_CREATEFILE_FAILED");
                break;
            case 3:
                str = lg.get("IDS_FTP_WRITEFILE_FAILED");
                break;
            case 4:
                str = lg.get("IDS_FTP_USERLOGIN_FAILED");
                break;
            case 5:
                str = lg.get("IDS_FTP_CONNECT_FAILED");
                break;
            case 6:
                str = lg.get("IDS_FTP_ILLEGAL_PARAM");
                break;
        }
        if (str != "") {
            ShowPaop($("#FTP_Set").text(), str);
        }
    } else if (type == methodEnum.SubMsgCloudCheck) { //327
        var title = lg.get("IDS_CLOUDSTORAGE");
        document.getElementById("CloudCheck").value = lg.get("IDS_CLOUD_CHECK");
        $("#CloudCheck").prop("disabled", false);

        var err = data["RetVal"] * 1;
        if (err == 1) {
            ShowPaop(title, lg.get("IDS_HDDS_NONE"));
        } else if (err == 2) {
            ShowPaop(title, lg.get("IDS_CLOUD_STATE002"));
        } else if (err == -1) {
            ShowPaop(title, lg.get("IDS_CLOUD_CHECK_TIMEOUT"));
        }
    } else if (type == methodEnum.SubMsgRemoteCheck) { //337
        RemoteCloudCheck_CloudUpgradeRet(data["MainType"] * 1, data["SubType"] * 1, data["RetValue"]) * 1;
    } else if (type == methodEnum.SubMsgNewEmailTest || type == methodEnum.SubMsgEmailTestNew) { //413,427
        var target_obj = $("#EmailTest");
        var target_obj_stop = $("#EmailTestStop");
        var title;
        if (target_obj.length > 0) {
            title = $("#net_email").text();
            EmailTest.innerHTML = lg.get("IDS_EMAILTEST");
            $("#EmailTest").prop("disabled", false);
            $("#EmailTestStop").prop("disabled", true);
        }
        target_obj = jQuery('#NormalCloStoEm_EmailTest');
        if (target_obj.length > 0) {
            title = lg.get("IDS_EMAIL_INFO");
            document.getElementById("NormalCloStoEm_EmailTest").value = lg.get("IDS_EMAILTEST");
            $("#NormalCloStoEm_EmailTest").prop("disabled", false);
        }

        var ret = data["RetVal"] * 1;
        if (0 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_0"));
        } else if (-1 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_FU1"));
        } else if (1 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_1"));
        } else if (2 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_2"));
        } else if (4 == ret || 5 == ret || 6 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_4"));
        } else if (7 == ret || 8 == ret || 9 == ret || 10 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_7"));
        } else if (3 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_3"));
        } else if (11 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_11"));
        } else if (12 == ret) {
            ShowPaop(title, lg.get("IDS_EMAIL_12"));
        } else {
            ShowPaop(title, lg.get("IDS_EMAIL_DEF"));
        }
    }
    else if (type == methodEnum.MsgRoutePeat) {//420
        NetScanPro(data);
    }
    else if (type == methodEnum.MsgRouteAdd) {//421
        NetJoinPro(data);
    }
    else if (type == methodEnum.MsgNewStreamset) {//425
        getStreamBandWidth(data);
    }
    else if (type == methodEnum.SubMsgSearchSmartCount) {//710
        SearchSmartCount(data["alarmType"], data["report"], data["version"], data["reportExt"], data["filename"]);
    } else if (type == methodEnum.SubMsgGetDDNSID) {//403
        MasklayerHide();
        $("#DDNSGetID").prop("disabled", false)
        $("#DDNSServiceID").val(data["RetMsg"]);
    } else if (type == methodEnum.SubMsgZeroChnStatus) {//336
        var mode = $("#divideScreen").attr("mode") * 1;
        var preMode = $("#divideScreen").attr("preMode") * 1;
        if (mode != SplitModeEnum.WINDOW_MODE_1 || (mode == SplitModeEnum.WINDOW_MODE_1 && preMode == SplitModeEnum.WINDOW_MODE_1 && data.PreviewMode != 1)) {
            if (data.PreviewMode == 1) {
                changeMode(SplitModeEnum.WINDOW_MODE_1, false, $("#channelList").attr("selectIndex") * 1);
                setSelectWnd($("#channelList").attr("selectIndex") * 1);
            } else {
                var chid = getZeroClickChn(data);
                if (chid == 255)
                    return;
                var param = {};
                param.ReqType = 1;
                param.PreviewMode = 1;
                param.EncodeCh = chid;
                gDevice.SendZeroSpiltType(param);
            }
        } else {
            if (data.SplitMode != 1) {
                var param = {};
                param.ReqType = 1;
                param.PreviewMode = 0;
                param.EncodeCh = 200;
                gDevice.SendZeroSpiltType(param);
            }
            changeMode(preMode, false, $("#channelList").attr("selectIndex") * 1);
            setSelectWnd($("#channelList").attr("selectIndex") * 1);
        }
    } else if (type == methodEnum.MsgIMPReq) { //436
        var subType = data["subType"] * 1;
        var type = data["type"] * 1;
        if (subType == 0) {//get
            if (type == 0) {
                $("#yp_ctrlNameInput").val(data["CtrlAlgName"]);
                $("#yp_ctrlSel").val(data["CtrlAlgEnable"] * 1);
            } else if (type == 1) {
                for (var i = 0; i < 4; i++) {
                    $("#yp_setInput" + i).val(data["modeParam"][i]["isSet"] * 1);
                    $("#yp_typeInput" + i).val(data["modeParam"][i]["type"] * 1);
                    $("#yp_setPInput" + i).val(data["modeParam"][i]["param"]);
                }
            } else if (type == 2) {
                var len = data["alg_num"] * 1;
                $("#alg_statusNum").empty();
                for (var i = 0; i < len; i++) {
                    $("#alg_statusNum").append("<option value='" + i + "'>" + i + "</option>");
                }
                $("#alg_statusNum").val(0);
                $("#alg_statusNum").data("param", data);
                $("#yp_statusNameInput").val(data["statusParam"][0]["alg_list"]);
                $("#yp_statusInput").val(data["statusParam"][0]["alg_status"] * 1);
                $("#alg_statusNum").change(function () {
                    var val = $(this).val() * 1;
                    var data = $(this).data();
                    $("#yp_statusNameInput").val(data["statusParam"][val]["alg_list"]);
                    $("#yp_statusInput").val(data["statusParam"][val]["alg_status"] * 1);
                    data = null;
                    val = null;
                });
            } else if (type == 3) {
                $("#yp_paramNameInput").val(data["paramAlgName"]);
                $("#yp_paramInput").val(data["algParam"]);
            }
            $('.SvBtnState[name != "not"]').fadeTo("slow", 1).prop("disabled", false);
            ShowPaop($("#IntelligentNewUserTest").text(), lg.get("IDS_REFRESH_SUCCESS"));
        } else if (subType == 1) {//set
            ShowPaop($("#IntelligentNewUserTest").text(), lg.get("IDS_SAVE_SUCCESS"));
        } else if (subType == 2) {//get faild
            $('.SvBtnState[name != "not"]').fadeTo("slow", 0.2).prop("disabled", true);
            ShowPaop($("#IntelligentNewUserTest").text(), lg.get("IDS_REFRESH_FAILED"));
        } else if (subType == 3) {//set faild
            ShowPaop($("#IntelligentNewUserTest").text(), lg.get("IDS_SAVE_FAILED"));
        }
        MasklayerHide();
    } else if (type == methodEnum.SubMsgValidIPTest) {
        var ipValid = data["ipValid"] * 1;
        var tip = "";
        if (ipValid) {
            tip = lg.get("IDS_IP_VALID");
        } else {
            tip = lg.get("IDS_IP_INVALID");
        }
        NBTest.innerHTML = lg.get("IDS_TESTIP");
        $("#NBTest").prop("disabled", false);
        ShowPaop(gVar.errTitle, tip);
        MasklayerHide();
    } else if (type == methodEnum.SubMsgDeleteLog) {
        if (data["RetVal"] * 1 == 0) {
            ShowPaop($("#Dev_log").text(), lg.get("IDS_SET_SUCCESS"));
        } else {
            ShowPaop($("#Dev_log").text(), lg.get("IDS_FAILED"));
        }
    } else if (type == methodEnum.MsgGetSDAlarm) {
        if ($("#sound_detection").attr("d") == "active") {
            $("#sdt_soundDecibel").slider("setValue", data["RetVal"] * 1);
        }
    }
}

function getZeroClickChn(zerorsp) {
    var sidenum = 0;
    switch (zerorsp.SplitMode) {
        case 4:
            sidenum = 2;
            break;
        case 6:
            sidenum = 3;
            break;
        case 8:
            sidenum = 4;
            break;
        case 9:
            sidenum = 3;
            break;
        case 16:
            sidenum = 4;
            break;
        default:
            return 32;
            break;
    }
    var wndrect = $("#channelRow_" + $("#channelList").attr("selectIndex")).data("clickdata").rect;
    var clickpt = $("#channelRow_" + $("#channelList").attr("selectIndex")).data("clickdata").point;
    for (var i = 0; i < sidenum; ++i) {
        for (var j = 0; j < sidenum; ++j) {

            var temprect = {};
            temprect.left = wndrect.left + ((wndrect.right - wndrect.left) / sidenum) * j;
            temprect.top = wndrect.top + ((wndrect.bottom - wndrect.top) / sidenum) * i;
            temprect.right = wndrect.left + ((wndrect.right - wndrect.left) / sidenum) * (j + 1);
            temprect.bottom = wndrect.top + ((wndrect.bottom - wndrect.top) / sidenum) * (i + 1);
            if (clickpt.x >= temprect.left
                && clickpt.x <= temprect.right
                && clickpt.y >= temprect.top
                && clickpt.y <= temprect.bottom) {
                if (zerorsp.SplitMode == 6 || zerorsp.SplitMode == 8) {
                    if (i < sidenum - 1) {
                        if (j < sidenum - 1) {
                            return zerorsp.ChnList[0];
                        } else {
                            return zerorsp.ChnList[i + 1];
                        }
                    }
                    else {
                        return zerorsp.ChnList[i + 1 + j];
                    }
                }
                return zerorsp.ChnList[i * sidenum + j];
            }
        }
    }
}

function SmartFunCall(xml) {
    // 3)LCD 4)AVD 5)SOD 6)PID 7)PD 8)FD 9)CC
    //console.log("SmartFunCall"+xml);
    var pdStr = lg.get("IDS_SMART_PD");
    if (((gDevice.loginRsp.ControlBitArray[0] >> 26) & 1) == 1) {
        pdStr=lg.get("IDS_SMART_PD")+"&VD";
    }
    if (smartArr.length == 0) {
        smartArr.push(lg.get("IDS_SMART_LCD"));
        smartArr.push("AVD");
        smartArr.push(lg.get("IDS_SMART_SOD"));
        smartArr.push(lg.get("IDS_SMART_PID"));
        smartArr.push(pdStr);
        smartArr.push(lg.get("IDS_SMART_FD"));
        smartArr.push(lg.get("IDS_SMART_CC"));
    }
    var smartArrLen = smartArr.length, strTemp, m, alArr = [];

    for (m = 0; m < smartArrLen; m++) {
        var tmp = xml;
        if (1 & (tmp >> (m + 3))) {
            alArr.push(smartArr[m]);
        }
    }

    if (alArr.length > 0) {
        if (lgCls.version == gVar.CtArr[113] && gVar.lg == "ITA") {
            strTemp = "Allarme " + alArr.join("、") + " !";
        }
        if (lgCls.version == gVar.CtArr[95] && gVar.lg == "KOR") {
            strTemp = alArr.join("、") + " 알람 !";
        } else {
            strTemp = alArr.join("、") + " alarm!";
        }

        ShowPaop(lg.get("IDS_PARAM_INTELLIGENT"), "<div>" + strTemp + "</div>");
    }
}

function DebugStringEvent(data) {

    if (window.console) {
        console.log("PluginDebugInfo:" + data);
    }
}

function getLoginStatusString(type) {
    if (type == retEnum.RSNetMsgConnectFail) {
        return lg.get("IDS_WEBF_FALSE");
    } else if (type == retEnum.RSNetMsgLoginNoUserName ||
        type == retEnum.RSNetMsgLoginUserDisable) {
        return lg.get("IDS_LOGINNOUSERNAME");
    } else if (type == retEnum.RSNetMsgLoginForceChangePWD) {//111
        return "Please set the password to the device";
    } else if (type == retEnum.RSNetMsgLoginPasswordError) {
        gVar.pwdError++;
        if ((gDevice.devType == devTypeEnum.DEV_IPC && gVar.pwdError < 4) || gDevice.devType != devTypeEnum.DEV_IPC) {
            return lg.get("IDS_LOGINPASSWORDERROR");
        } else {
            return lgCls.devicetime;
        }
    } else if (type == retEnum.RSNetMsgLoginForceCloseBrowser) {//112
        //console.log("RSNetMsgLoginForceCloseBrowser:" + retEnum.RSNetMsgLoginForceCloseBrowser);

        var title = lg.get("IDS_WARNING");
        var content = lg.get("IDS_LOGIN_FORBIDDEN")//"5회 이상 로그인에 실패 하였습니다.";//Login failed more than 5 times.

        if ($(".l-messagebox").length) {
            return;//"Popup Message Box",already existed
        }
        $.ligerMessageBox.warn(title, content, function () {
            if ($.browser.msie) {
                window.opener = null;
                window.open('', '_self', '');
                window.close();
            } else {
                window.location.reload(true);
            }
        });
        $(".l-messagebox-close").css("display", "none");

        return content;
    } else if (type == retEnum.RSNetMsgLoginFail) {
        return lg.get("IDS_WEBF_FALSE");
    } else if (type == retEnum.RSNetMsgLoginNoRight) {
        return lg.get("IDS_LOGO_RIGHT");
    } else if (type == retEnum.RSNetMsgIpFilter) {
        return lg.get("IDS_IPBANNED");
    } else if (type == retEnum.RSNetMsgOverMaxUser) {
        return lg.get("IDS_STRVIDEO_USERFULL");
    }
}

function LoadLiveTile() {
    liveBtn.innerHTML = lg.get("IDS_OSD_INFO");
    playbackBtn.innerHTML = lg.get("IDS_REPLAY");
    if (lgCls.version == gVar.CtArr[61]) {
        configBtn.innerHTML = "Camera Setup";
        pathConfigBtn.innerHTML = "PC Setup";
    } else if (gDevice.devType == devTypeEnum.DEV_IPC &&
        (lgCls.version == gVar.CtArr[204] || lgCls.version == gVar.CtArr[224]) &&
        gVar.lg == "ENU") {
        configBtn.innerHTML = "Device Settings";
        pathConfigBtn.innerHTML = "Computer Settings";
    } else {
        configBtn.innerHTML = lg.get("IDS_SYS_SET");
        pathConfigBtn.innerHTML = lg.get("IDS_PATH_PATH");
    }

    //LogoutMenu_1.innerHTML = lg.get("IDS_SERVER_LOGOUT");
    if (lgCls.skin == "red_c95") {
        logo.innerHTML = lg.get("IDS_USER_C95") + " Smart <br /> IP Device";
        $("#logo").css('color', '#fff').css('font-size', '18px').css('padding-left', '50px');
    }else if(lgCls.version == gVar.CtArr[238]){
        setMenuBtn.innerHTML = lg.get("IDS_SETUP");
        logoutMenuBtn.innerHTML = lg.get("IDS_LOGOUT");
    }
    menutitle(1);
}

function getReconnctStatusString(type) {
    if (type == retEnum.RSNetMsgConnectFail) {
        ShowPaop(lg.get("IDS_RECONNECT"), lg.get("IDS_WEBF_FALSE"));
    } else if (type == retEnum.RSNetMsgLoginNoUserName || type == retEnum.RSNetMsgLoginPasswordError) {
        if (gDevice.loginRsp.ISAdmin == true) {
            if (gDevice.devType == devTypeEnum.DEV_NVR && lgCls.version == gVar.CtArr[0]) {
                setTimeout(function () {
                    window.location = "login.html";
                }, 1000);

            } else {
                ShowPaop(lg.get("IDS_RECONNECT"), lg.get("IDS_ADMINCHANGED"));
            }
        } else {
            ShowPaop(lg.get("IDS_RECONNECT"), lg.get("IDS_USERNAMECHANGED"));
        }
    } else if (type == retEnum.RSNetMsgLoginFail) {
        ShowPaop(lg.get("IDS_RECONNECT"), lg.get("IDS_WEBF_FALSE"));
    } else if (type == retEnum.RSNetMsgLoginNoRight) {
        ShowPaop(lg.get("IDS_RECONNECT"), lg.get("IDS_RIGHTCHANGED"));
    } else if (type == alarmEnum.RSNetMsgLoginForbidIP) {
        if (gDevice.loginRsp.ISAdmin == true) {
            gDevice.Disconnection();
            MasklayerShow();
            setTimeout(function () {
                AutoClose(lg.get("IDS_RECONNECT"), 4);
            }, 1000);
        } else {
            gDevice.Disconnection();
            MasklayerShow();
            setTimeout(function () {
                AutoClose(lg.get("IDS_RECONNECT"), 5);
            }, 1000);
        }
    }
}

function loginSuccess() {
    resetLoginInterval();
    var data = {};
    var preview = {};
    preview.padding = 2;
    preview.margin = 2;
    preview.wndBgColor = {
        "r": 29,
        "g": 28,
        "b": 33,
        "a": 255
    };
    preview.videoColor = {
        "r": 0,
        "g": 0,
        "b": 0,
        "a": 255
    };
    preview.bShowLogo = 0;
    if (lgCls.version == gVar.CtArr[0] || lgCls.version == gVar.CtArr[94] || lgCls.version == gVar.CtArr[104] || lgCls.version == gVar.CtArr[159] || lgCls.version == gVar.CtArr[165] || lgCls.version == gVar.CtArr[167] || lgCls.version == gVar.CtArr[169] || lgCls.version == gVar.CtArr[171] || lgCls.version == gVar.CtArr[185] || lgCls.version == gVar.CtArr[214] || lgCls.version == gVar.CtArr[219]) {
        preview.bShowLogo = 1; //Show Background Picture
    }

    preview.videoNums = getWindowNumByChannelNum(gDevice.loginRsp.ChannelNum);
    preview.bShowLoading = 0;
    preview.bC003053120101 = 0;
    if (gVar.bC0_0305_3120101) {
        preview.bShowLoading = 1;
        preview.bC003053120101 = 0;
    }
    if (lgCls.version == gVar.CtArr[0]) {
        preview.nOsdPos = 1;//0:left_bottom(default), 1:right_bottom
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        preview.arrBWirelessCh = [];
        for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
            if ((gDevice.devState[i].Abilities >> AbilityTypeEnum.SUPPROT_WIREFREE) & 1) {
                preview.arrBWirelessCh.push(1);
            } else {
                preview.arrBWirelessCh.push(0);//default
            }
        }
    }
    preview.autoConn = getAutoConn();

    //console.log("preview.arrBWirelessCh:" + preview.arrBWirelessCh);

    preview.selColor = {
        "r": 125,
        "g": 125,
        "b": 0,
        "a": 255
    };

    if (lgCls.version == gVar.CtArr[142] && gDevice.devType == devTypeEnum.DEV_HDVR) {
        preview.selColor = {
            "r": 251,
            "g": 4,
            "b": 4,
            "a": 255
        };
    } else if (lgCls.skin == "yellow_c229") {
        preview.selColor = {
            "r": 241,
            "g": 202,
            "b": 0,
            "a": 255
        };
        preview.wndBgColor = {
            "r": 35,
            "g": 25,
            "b": 22,
            "a": 255
        };
        preview.videoColor = {
            "r": 35,
            "g": 25,
            "b": 22,
            "a": 255
        };
    }
    if (gDevice.loginRsp.ZeroChFlag)
        preview.ChannelNum = gDevice.loginRsp.ChannelNum + 1;
    else
        preview.ChannelNum = gDevice.loginRsp.ChannelNum;
    preview.showMode = getSplitModeByChannelNum(gDevice.loginRsp.ChannelNum);
    preview.zeroChannel = gDevice.loginRsp.ZeroChFlag;
    preview.StreamType = streamTypeEnum.SubStreamType;
    preview.RatioType = videoDisplayMode.Original;
    preview.bOpenSound = 0;
    preview.soundVolume = 25;
    //preview.bLogoLimit = true;
    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
        preview.bDragable = false;
        preview.isFishEye = true;
    } else {
        preview.bDragable = true;
        preview.isFishEye = false;
    }

    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        if (gDevice.loginRsp.DefualtStream * 1 == 1) {//
            preview.StreamType = streamTypeEnum.SubStreamType;
        } else if (gDevice.loginRsp.DefualtStream * 1 == 2) {//
            preview.StreamType = streamTypeEnum.MobileStreamType;
        } else {//
            preview.StreamType = streamTypeEnum.MainStreamType;
        }
    }

    //Initializes the warning mark
    for (var n = 0; n < preview.ChannelNum; n++) {
        g_recordStatus[n] = new RecordStatusLog();
    }

    var playback = {};
    playback.padding = 2;
    playback.margin = 2;
    playback.wndBgColor = {
        "r": 29,
        "g": 28,
        "b": 33,
        "a": 255
    };
    playback.videoColor = {
        "r": 0,
        "g": 0,
        "b": 0,
        "a": 255
    };
    playback.selColor = {
        "r": 125,
        "g": 125,
        "b": 0,
        "a": 255
    };

    if (lgCls.version == gVar.CtArr[142] && gDevice.devType == devTypeEnum.DEV_HDVR) {
        playback.selColor = {
            "r": 251,
            "g": 4,
            "b": 4,
            "a": 255
        };
    } else if (lgCls.skin == "yellow_c229") {
        playback.selColor = {
            "r": 241,
            "g": 202,
            "b": 0,
            "a": 255
        };
        playback.wndBgColor = {
            "r": 35,
            "g": 25,
            "b": 22,
            "a": 255
        };
        playback.videoColor = {
            "r": 35,
            "g": 25,
            "b": 22,
            "a": 255
        };
    }

    g_pbNum = g_pbCkNum = 4;
    var pbTmpMode = SplitModeEnum.WINDOW_MODE_4;

    if (g_pbIsSupportGt4WndPlay) {
        if (gDevice.devType == devTypeEnum.DEV_HDVR) {
            if (gDevice.loginRsp.AnalogChNum > 4 && gDevice.loginRsp.AnalogChNum <= 9) {
                g_pbNum = 9; //8 road playback, to create a window
                pbTmpMode = SplitModeEnum.WINDOW_MODE_9;
                g_pbCkNum = gDevice.loginRsp.AnalogChNum;
            } else if (gDevice.loginRsp.AnalogChNum > 9) {
                g_pbNum = 16;
                pbTmpMode = SplitModeEnum.WINDOW_MODE_16;
                g_pbCkNum = gDevice.loginRsp.AnalogChNum > 16 ? 16 : gDevice.loginRsp.AnalogChNum;
            }
        } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
            if (gDevice.loginRsp.ChannelNum > 4 && gDevice.loginRsp.ChannelNum <= 9) {
                g_pbNum = 9; //8 road playback, to create a window
                pbTmpMode = SplitModeEnum.WINDOW_MODE_9;
                g_pbCkNum = gDevice.loginRsp.ChannelNum;
            } else if (gDevice.loginRsp.ChannelNum > 9) {
                g_pbNum = 16;
                pbTmpMode = SplitModeEnum.WINDOW_MODE_16;
                g_pbCkNum = gDevice.loginRsp.ChannelNum > 16 ? 16 : gDevice.loginRsp.ChannelNum;
            }
        }
    }

    playback.videoNums = (gDevice.loginRsp.ChannelNum) == 1 ? 1 : g_pbNum;
    playback.showMode = (gDevice.loginRsp.ChannelNum == 1 ? SplitModeEnum.WINDOW_MODE_1 : pbTmpMode);
    playback.bOpenSound = 0;
    playback.soundVolume = 25;

    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye) {
        g_pbNum = 1;
        playback.videoNums = 1;
        playback.showMode = 0;
    }

    playback.ChannelNum = gDevice.loginRsp.ChannelNum;

    if (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR) {
        playback.arrBWirelessCh = [];
        for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
            if ((gDevice.devState[i].Abilities >> AbilityTypeEnum.SUPPROT_WIREFREE) & 1) {
                playback.arrBWirelessCh.push(1);
            } else {
                playback.arrBWirelessCh.push(0);//default
            }
        }
    }

    if ((gDevice.loginRsp.ControlBit2 >> 7 & 0x1) == 1 && (gDevice.loginRsp.ControlBit2 >> 8 & 0x1) == 1)
        playback.newPlaybackSearch = true;

    var paramvideo = {};
    paramvideo.videoColor = {
        "r": 30,
        "g": 30,
        "b": 30,
        "a": 255
    };
    paramvideo.videoNums = gDevice.loginRsp.ChannelNum;

    data.Preview = preview;
    data.Playback = playback;
    data.Paramvideo = paramvideo;

    gDevice.initWindow(methodEnum.SubMsgInitWindowAll, data);
    gDevice.setPageIndex(0);
    if (lgCls.skin == "yellow_c229") {
        document.body.style.backgroundColor = "#20292F";
    }

    gVar.logined = true;
    //Load the live page
    $("#login").css("display", "none");
    $(".header").css("display", "block");
    $(".mfoot").css("display", "block");
    var version = '';
    if ($.browser.safari) {
        version = version_safari;
    } else if ($.browser.firefox || $.browser.chrome) {
        version = version_ch_fox;
    } else {
        version = version_msie;
    }

    var info_user = 'User: ';
    var info_web = 'Web: ';
    var info_plugin = 'Plugin: ';
    if (lgCls.version == gVar.CtArr[108] && gVar.lg == 'FRA') {
        info_user = 'Utilisateur: ';
    } else if (lgCls.version == gVar.CtArr[32] && gVar.lg == 'KOR') {
        info_user = '사용자: ';
        info_web = '웹: ';
        info_plugin = '플러그인: ';
    }
    var info = info_user + gVar.user + '\n' + info_web + version_web + '\n' + info_plugin + version;
    if (C0Netview) {
        info += "\nP2P:1.01.15";
    }
    $("#logout").attr("title", lg.get("IDS_LOGOUT"));
    $("#help").attr("title", info);
    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        if (lgCls.sdcardshow * 1 == 1 && gDevice.loginRsp.UserPlayBack & 0x01 == 1) {
            $("#PlayBackMenu").css("display", "block");
        } else {
            $("#PlayBackMenu").css("display", "none");
        }

        if ((lgCls.version == gVar.CtArr[70] || lgCls.version == gVar.CtArr[186]) && ((gDevice.loginRsp.UserSetRight & 0x01) != 1)) {
            $("#ConfigMenu").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[186] && ((gDevice.loginRsp.UserPreview & 0x01) != 1)) {
            $("#LiveMenu").css("display", "none");
        }

        if (lgCls.version == gVar.CtArr[32]) {
            $("#PathMenu").css("display", "none");
        }
    } else {
        $("#PlayBackMenu").css("display", "block");
    }

    if (g_autoToConfig && lgCls.version == gVar.CtArr[95]) {
        LoadLiveTile();
        $("#configBtn").click(); // to config page
        $(".header, .headerMenu").css("opacity", 0);
    } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[186]) {
        var tempId = "";
        $(".menuBox").each(function () {
            if ($(this).css("display") != "none") {
                tempId = $(this).attr("id");
                return false;
            }
        });
        switch (tempId) {
            case "LiveMenu":
                $("#liveBtn,#adaptive,#mainStream").click();
                break;
            case "PlayBackMenu":
                $("#playbackBtn").click();
                break;
            case "ConfigMenu":
                $("#configBtn").click();
                break;
            default:
                $("#pathConfigBtn").click();
                break;
        }
    } else {
        $("#liveBtn,#adaptive,#mainStream").click(); //The IPC show preview screen after login, don't delete
    }

    if (lgCls.version == gVar.CtArr[177]) {
        document.body.style.backgroundColor = "#d9d6d2";
        $("#MsgPaop_box").css("left", "auto").css("right", "2px");
    } else if (lgCls.version == gVar.CtArr[116]) {
        $("#MsgPaop_box").css("left", "auto").css("right", "2px");
    } else if (lgCls.version == gVar.CtArr[234]) {
        $("body").css("background-color", "#2e3339");
    }
    if(lgCls.skin == "white_c238"){
        $("html,body").css("background-color","#fff");
    }

    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
        if (lgCls.version == gVar.CtArr[1]) {
            $(".headerMenu").css({"background": "url('images_black/LOGO/BACK_c1.jpg') 0 0 no-repeat"});
            $(".headerMenu .menuBg").addClass("cssMenu2");//out_c1.png
            //Logo
            $("#logo").css({"margin-top": "0px", "width": "334px", "height": "80px"});
        }
    } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
        if (lgCls.version == gVar.CtArr[1]) {
            $(".headerMenu").css({"background": "url('images_black/LOGO/BACK_c1.jpg') 0 0 no-repeat"});
            $(".headerMenu .menuBg").addClass("cssMenu2");//out_c1.png
            //Logo
            $("#logo").css({"margin-top": "0px", "width": "334px", "height": "80px"});
        }
    }
    if ((gDevice.loginRsp.ControlBit >> 25) & 1) {
        if (lgCls.version == gVar.CtArr[0] || gDevice.devType == devTypeEnum.DEV_IPC) {
            setTimeout(function () {//detect whether has new version
                gDevice.SimpleCmd(alarmEnum.MsgStatusRequest, alarmEnum.MsgGetRemoteParam);
            }, 100);
        }
    }
}

function startLoginInterval() {
    if (g_intervalID == -1) {
        g_intervalID = setInterval("loginErrorProcess()", 1000);
    }
}

function resetLoginInterval() {
    if (g_intervalID != -1) {
        window.clearInterval(g_intervalID);
        g_intervalID = -1;
    }
}

function stopLogin() {
    gDevice.Disconnection();
    gVar.errCount = 0;
    $("#loginBtn").attr("name", "");
    $("#loginBtn").removeClass("loginBtnDisable").addClass("loginBtnNormal");

    g_loginTimeout = 15;
    resetLoginInterval();
}

function loginErrorProcess() {
    --g_loginTimeout;
    if (g_loginTimeout <= 0) {
        Web_prompt(lg.get("IDS_INIT_FAILED"), true);
        stopLogin();
    } else {
        Web_prompt(lg.get("IDS_GETDEVICE_INFO") + g_loginTimeout);
    }
}

function reconnectSuccess(data) {
    var macAddr_old = gDevice.loginRsp.MacAddr;

    gDevice.loginRsp = data["Data"]["LoginRsp"];

    var macAddr_new = gDevice.loginRsp.MacAddr;

    if (macAddr_old != macAddr_new) {//device changed
        MasklayerShow();
        gDevice.OcxChangePage(pageEnum.TypeNoVideoParamPage);
        gCloseFlag = 1;
        var title = lg.get("IDS_RECONNECT");
        window.setTimeout(function () {
            AutoClose(title, 2);
        }, 1000);
    }
}

function previewEventCallBack() {};
function preVideoLossCallBack() {};

function loginEventCallBack() { /*console.log('haha');*/ };

function reconnectEventCallBack() {};

function playbackEventCallBack() {};

function playbackFaceCallBack() {};

function timelineEventCallBack() {};

function FtpUpdateCallBack() {};

function updatePreviewStatus(type, i) {
    var selectedChn = $("#channelList").attr("selectIndex") * 1;
    if (selectedChn == i) {
        if (gDevice.hasAbility(i, AbilityTypeEnum.FISHEYE)) {
            if ($("#fisheye").css("display") == "none") {
                $("#fisheye").css("display", "block");
            }
        } else {
            if ($("#fisheye").css("display") == "block") {
                if ($("#fisheye").attr("name") == "active") {
                    $("#fisheye").click();
                }
                $("#fisheye").css("display", "none");
            }
        }

        if (gDevice.hasAbility(i, AbilityTypeEnum.BINOCULARS)) {
            //$("#binoculars").show();
        } else {
            $("#binoculars").hide();
        }
    }
    if (gDevice.isOnline(i)) {
        $("#channelRow_" + i).data("open", true);
        if (gVar.sPage == "live") {
            RestoreLiveStatus(gVar.sPage);
        }
    } else {
        if ($("#chnPlay_" + i).attr("name") == "active") {
            var ret = gDevice.PreviewStop([i]);
            if (ret.Code == errCodeEnum.Code_Success) {
                if (gDevice.isSleep(i)) {
                    $("#chnPlay_" + i).attr("name", "").css("background-position", "0px 0px");//gray state,can click
                } else {
                    $("#chnPlay_" + i).attr("name", "disable").css("background-position", "-66px 0");//Disable
                }
                $("#chnCap_" + i).attr("name", "disable").css("background-position", "-66px -44px");

                if ($("#chnStream_" + i).attr("isClick") == "active") {
                    $("#chnStream_" + i).attr("isClick", "");
                    $("#tip_main").css("display", "none").blur();
                }
                $("#chnStream_" + i).attr("name", "disable").css("background-position", "-66px -66px");

                $("#chnTextBtn_" + i).attr("name", "disable");
                if ($("#chnRec_" + i).attr("name") == "active") {
                    var ret = gDevice.PreViewRec(0, [i]);
                    if (ret.Code == errCodeEnum.Code_Success) {
                        if (ret.Data[0].Code == errCodeEnum.Code_Success) {
                            var url = ret.Data[0].Url;
                            //$("#chnRec_" + i).attr("name", "disable").css("background-position", "-66px -22px");
                            var urlstr = url.split("\\").join("\\\\");
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
                                "<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + urlstr + "\")'>" + strFolder + "</a>" +
                                "</div>");
                            //return true;
                        }
                    }
                }
                $("#chnRec_" + i).attr("name", "disable").css("background-position", "-66px -22px");
            }
        } else {
            if (gDevice.isSleep(i)) {
                $("#chnPlay_" + i).attr("name", "").css("background-position", "0px 0px");
            } else {
                $("#chnPlay_" + i).attr("name", "disable").css("background-position", "-66px 0");
            }
            $("#chnRec_" + i).attr("name", "disable").css("background-position", "-66px -22px");
            $("#chnCap_" + i).attr("name", "disable").css("background-position", "-66px -44px");

            if ($("#chnStream_" + i).attr("isClick") == "active") {
                $("#chnStream_" + i).attr("isClick", "");
                $("#tip_main").css("display", "none").blur();
            }
            $("#chnStream_" + i).attr("name", "disable").css("background-position", "-66px -66px");

            $("#chnTextBtn_" + i).attr("name", "disable");
        }
    }
    if (i == gDevice.loginRsp.ChannelNum) {
        closeHideZeroCh();
    }
};

function timelineresize() {};

function updatePlaybackStatus() {};

function updateRemoteConfigStatus() {};

function updateAllPageStatus(type, i) {
    updatePreviewStatus(type, i);
    updatePlaybackStatus(type);
    updateRemoteConfigStatus(type);
}

function jsonToObjDate(time) {
    var timeobj = {};
    timeobj.year = time["Year"];
    timeobj.month = time["Month"];
    timeobj.day = time["Day"];
    timeobj.hour = time["Hour"];
    timeobj.minute = time["Minute"];
    timeobj.second = time["Second"];
    return timeobj;
}

function serverPlaybackStatus(){}
function GetMsgCallBack(strMsg) { //event handling
    var data = JSON.parse(strMsg);
    var mainType = data["MainType"];
    var subType = data["SubType"];
    switch (mainType) {
        case eventEnum.MsgUserLoginEvent: {
            if ($("#live").attr("data-name") == "notLoad") { //
                if (subType == retEnum.RSNetMsgLoginSuccess) {//101
                    gDevice.setLoginRsp(data["Data"]["LoginRsp"]);
                    InitMainStreamNum();

                    if (lgCls.version == gVar.CtArr[0] && gDevice.loginRsp.HighType == 0x52530305 && gDevice.loginRsp.LowType == 0x3120101) {
                        gVar.bC0_0305_3120101 = true;//
                    } else if (gDevice.loginRsp.HighType == 0x52530305 && gDevice.loginRsp.LowType == 0x2120105) {
                        gVar.bNormal_0305_2120105 = true;
                    } else if (lgCls.version == gVar.CtArr[7] && gDevice.loginRsp.HighType == 0x52530305 && gDevice.loginRsp.LowType == 0x120105) {
                        gVar.bSN_0305_120105 = true;
                    }

                    if ((gDevice.loginRsp.ControlBit >> 0) & 1) {
                        gVar.bC0_0305_3120101 = true;
                    }
                    if ((gDevice.loginRsp.ControlBit >> 2) & 1) {
                        lgCls.sdcardshow = "1";
                    }
                    if (lgCls.version == gVar.CtArr[0]) {
                        g_blogoPir = true;
                        if ((gDevice.loginRsp.PageControl2 >> 2) & 1) {
                            gVar.bC0_0305_3120101_old906Dev = true;
                        }
                    }
                    if (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[0]) {
                        if (gDevice.loginRsp.HighType == 0x52530609 && gDevice.loginRsp.LowType == 0x140700) {
                            gVar.bC0_useNewLg = false;
                        } else if (gDevice.loginRsp.HighType == 0x52530609 && gDevice.loginRsp.LowType == 0x110900) {
                            gVar.bC0_useNewLg = false;
                        } else if (gDevice.loginRsp.HighType == 0x52530609 && gDevice.loginRsp.LowType == 0x140500) {
                            gVar.bC0_useNewLg = false;
                        } else if (gDevice.loginRsp.HighType == 0x52530605 && gDevice.loginRsp.LowType == 0x120900) {
                            gVar.bC0_useNewLg = false;
                        } else if (gDevice.loginRsp.HighType == 0x52530605 && gDevice.loginRsp.LowType == 0x140500) {
                            gVar.bC0_useNewLg = false;
                        } else if (gDevice.loginRsp.HighType == 0x52530605 && gDevice.loginRsp.LowType == 0x110700) {
                            gVar.bC0_useNewLg = false;
                        } else {//above devtype use oldLg
                            gVar.bC0_useNewLg = true;
                        }
                    }

                    if (gDevice.devType == devTypeEnum.DEV_HDVR) {
                        if (lgCls.version == gVar.CtArr[7] || lgCls.version == gVar.CtArr[70] || lgCls.version == gVar.CtArr[2] || lgCls.version == gVar.CtArr[142] || lgCls.version == gVar.CtArr[12] || lgCls.version == gVar.CtArr[21]) {
                            g_pbIsSupportGt4WndPlay = true;
                        }
                        if (lgCls.version == gVar.CtArr[7]) {
                            gVar.bHDVRC7 = true;
                        }
                    } else if (gDevice.devType == devTypeEnum.DEV_NVR) {
                        if (lgCls.version == gVar.CtArr[7]) {
                            g_pbIsSupportGt4WndPlay = true;
                        }
                        if (gDevice.loginRsp.UiType == 50) {//5.0 open mobileStream
                            if (gDevice.loginRsp.ChannelNum >= 16) {
                                g_defaultStreamType = 2;
                            }
                        }
                    }
                    if ((gDevice.loginRsp.ControlBit2 >> 2) & 1) {
                        g_pbIsSupportGt4WndPlay = true;
                    }

                    if ((gDevice.loginRsp.PageControl2 >> 16) & 1) {
                        g_bShowBSL = true;
                    }
                    if ((gDevice.loginRsp.PageControl2 >> 18) & 1) {
                        gVar.bHide_IntelPage_HalfAnalogCh = true;
                    }

                    if (gDevice.devType != devTypeEnum.DEV_HDVR && gDevice.devType != devTypeEnum.DEV_NVR) {
                        loginSuccess();

                        //LOGO displayed after login
                        if (lgCls.logo != gVar.CtArr[23] && lgCls.logo != gVar.CtArr[108] && lgCls.logo != gVar.CtArr[143] && lgCls.logo != gVar.CtArr[150]
                            && lgCls.logo != gVar.CtArr[160] && lgCls.logo != gVar.CtArr[161] && lgCls.logo != gVar.CtArr[121]) {
                            if (lgCls.logo == gVar.CtArr[186] && typeof SVGRect != "undefined") {
                                $("#logo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGIN_c" + lgCls.logo + ".svg) no-repeat");
                            } else {
                                $("#logo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGO_c" + lgCls.logo + ".png) no-repeat");
                            }

                            if (lgCls.version == gVar.CtArr[137]) {
                                $("#logo").css("margin-top", "24px");
                            } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[70]) {
                                $("#logo").css("margin-top", "30px");
                            } else if (lgCls.version == gVar.CtArr[114]) {
                                $("#logo").css("margin-top", "20px");
                            }
                        } else {
                            $("#logo").css("background-image", "url()");
                        }
                    } else {
                        startLoginInterval();
                    }

                    //save cookie(start)
                    var ops = {};
                    $.cookie("RS_Language", gVar.lg, ops);
                    $.cookie("RS_User", gVar.user, ops);
                    if ($("#loginPswCkbox").prop("checked") * 1) {
                        $.cookie("RS_PswCkbox", 1, ops);
                        var tmpPsw = $("#loginPsw").val() ? $.base64.encode($("#loginPsw").val()) : "";
                        $.cookie("RS_PswVal", tmpPsw, ops);
                    } else {
                        $.cookie("RS_PswCkbox", 0, ops);
                        $.cookie("RS_PswVal", "", {expires: -1});//Due immediately
                    }

                    if ((gDevice.devType == devTypeEnum.DEV_IPC) ||
                        (gDevice.devType == devTypeEnum.DEV_HDVR && lgCls.version == gVar.CtArr[112])
                    ) {
                        beforeunloadEvent(ops);
                    }

                    //IP、Port
                    var COUNT = 0;
                    $.cookie("RS_IP" + COUNT, gVar.ip, ops);//new 
                    $.cookie("RS_Port" + COUNT, gVar.mediaport, ops);//new 
                    COUNT++;
                    for (var i = 0; i < lgCls.IpAndPort.length; i++) {
                        if (lgCls.IpAndPort[i]["IP"] == gVar.ip) {
                            continue;
                        }
                        $.cookie("RS_IP" + COUNT, lgCls.IpAndPort[i]["IP"], ops);//old
                        $.cookie("RS_Port" + COUNT, lgCls.IpAndPort[i]["Port"], ops);//old
                        COUNT++;
                        if (COUNT >= 50) {
                            break;
                        }
                    }
                    //save cookie(end)
					
					if(g_c0OldId_bNeedSwitch){
						if(0==gVar.errCount || 2==gVar.errCount){
							//this old_lorex_id use tutk_login
							if(gArr_c0OldId_useTutk.indexOf(gVar.ip) == -1){
								gArr_c0OldId_useTutk.push(gVar.ip);
								gDevice.OperProfile("write","c0OldId_useTutk",gArr_c0OldId_useTutk);
							}
						}
					}
                } else if (subType == retEnum.RSNetMsgSendInfoSuccess) {// ipc set pwd suc
                    gDevice.Disconnection();
                    $("#login_user_prompt").css('display', 'none');
                    MasklayerHide();
                } else if (subType == retEnum.RSNetMsgSendInfoFailed) {// ipc set pwd failed
                    gDevice.Disconnection();
                    $("#login_user_input").focus().select();
                    ShowPaop(lg.get("IDS_SAVE_FAILED"), lg.get("IDS_REBOOT_PWD"));
                } else {
                    if (subType == retEnum.RSNetMsgConnectFail) {
						++gVar.errCount;
						
						if(lgCls.version==gVar.CtArr[0]){
							console.log("gVar.errCount=" + gVar.errCount);
						}
						if(g_c0OldId_bNeedSwitch){
							if(1 == gVar.errCount){//tutk_type_login --> lorex_type_login
								gDevice.changeIDTypeLogin(g_threeLogin_info[1].p2pid, g_threeLogin_info[1].p2pidType);
							}else if(2 == gVar.errCount){//lorex_type_login --> tutk_type_login
								gDevice.changeIDTypeLogin(g_threeLogin_info[2].p2pid, g_threeLogin_info[2].p2pidType);
							}
						}
						
                        if (gVar.errCount == 3) {
                            stopLogin();
                            Web_prompt(getLoginStatusString(data["SubType"]), true);
                        }
                    } else {
                        stopLogin();
                        Web_prompt(getLoginStatusString(data["SubType"]), true);
                    }
                }
            } else { //When reconnection of processing
                if (subType == retEnum.RSNetMsgLoginSuccess) {//101
                    MasklayerHide();
                    reconnectSuccess(data);
                    if (gDevice.loginRsp.autoFocus.PTZVersion) {
                        $("#ptzNM_refresh").click();
                    }
                    gDevice.SimpleCmd(alarmEnum.MsgStatusRequest, alarmEnum.MsgDevAllStatusReq);//request MsgDevAllStatusReq
                    gDevice.SimpleCmd(alarmEnum.MsgStatusRequest, alarmEnum.MsgRemoteCHStatusReq);//request MsgRemoteCHStatusReq
                } else if (subType == retEnum.RSNetMsgDualtalkClosed) {
                    if ($("#talkback").attr("name") == "active") {
                        $("#talkback").click();
                    }
                } else {
                    if (gDevice.devType != devTypeEnum.DEV_HDVR && gDevice.devType != devTypeEnum.DEV_DVR)
                        MasklayerShow();
                    getReconnctStatusString(subType);
                }
            }
            break;
        }
        case eventEnum.MsgPreviewEvent: {
            previewEventCallBack(data);
            break;
        }
        case eventEnum.MsgAlarmParamData: {
            if (gDevice.devType == devTypeEnum.DEV_IPC && ((gDevice.loginRsp.ControlBitArray[0] >> 11) & 1)) {
                playbackFaceCallBack(data);
            }
            break;
        }
        case eventEnum.MsgStatusEvent: {
            if (subType == alarmEnum.MsgRemoteCHStatusReq) {
                //NVR or hybrid DVR will send after a successful login for the first time this event, 
                //for all to the channel state information (such as ability, from top to bottom line state, etc.), 
                //so the NVR or hybrid DVR only after receiving this event can login successfully
                gDevice.devState = data["Data"];
                //console.log("STATE login:" + JSON.stringify(data["Data"]));
                if (gDevice.devType == devTypeEnum.DEV_HDVR) {//5.0 use
                    for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
                        //console.log("STATE login i:" + i + " " + gDevice.devState[i].VLossState);
                        if (gDevice.devState[i].VLossState == 1) {
                            $("#chnTextBtn_" + i).attr("name", "disable");
                            $("#chnPlay_" + i).attr("name", "disable").css("background-position", "-66px 0");

                            if ($("#chnRec_" + i).attr("name") == "active") {
                                $("#chnRec_" + i).click();
                            }
                            //$("#chnRec_" + i).attr("name", "disable").css("background-position", "-66px -22px");

                            $("#chnCap_" + i).attr("name", "disable").css("background-position", "-66px -44px");
                            $("#chnStream_" + i).attr("name", "disable").css("background-position", "-66px -66px");
                        }
                    }
                }
                if (gVar.logined == false && (gDevice.devType == devTypeEnum.DEV_HDVR || gDevice.devType == devTypeEnum.DEV_NVR)) {
                    if (lgCls.version == gVar.CtArr[0]) {
                        if (gDevice.loginRsp.ISAdmin == true && gVar.passwd == "00000000") {
                            resetLoginInterval();
                            ToModifiPage();
                            MasklayerHide();
                            return;
                        }
                    } else if (lgCls.version == gVar.CtArr[1]) {
                        if (gVar.user == "admin" && gVar.passwd == "admin") {
                            resetLoginInterval();
                            ToModifiPage();
                            MasklayerHide();
                            return;
                        }
                    } else if (lgCls.version == gVar.CtArr[79]) {
                        if ((gDevice.loginRsp.PageControl2 >> 2) & 1) {
                            resetLoginInterval();
                            MasklayerHide();

                            $("head").append('<link href="html/cfg/css.css" rel="stylesheet"/>');
                            $.get("html/cfg/ALTE_Report.html?version=" + version_web, "",
                                function (data) {
                                    $("#login").remove();
                                    $("#idALTE_title").css({
                                        "width": "100%", "height": "25px", "text-align": "center",
                                        "font-size": "20px", "background-color": "#ccc"
                                    });
                                    $("#idALTE_part2").html(data);
                                    $("#g_idALTEReport").css("display", "block");
                                    $.getScript("html/cfg/ALTE_Report.js?version=" + version_web);
                                }, "html"
                            );

                            $.get("html/cfg/syswh_sj.html?version=" + version_web, "",
                                function (data) {
                                    $("#idALTE_part3").html(data);
                                    $("#idALTE_part3 .cfg_container").css("width", "580px");
                                    $("#upgrade_file_path").css("width", "130px");
                                    $("#txtFileName_R,#ipc_txtFileName_R").css("width", "400px");
                                    $("#btnSj,#ipc_btnSj").css("width", "65px").css("margin-left", "5px");
                                    $("#syssj_warning_left").css("width", "0px");
                                    $("#updateWarming").css("width", "100%").css("margin-top", "0px").css("text-align", "left");
                                    $("#updateMsg_L").css("width", "0px");
                                    $("html, body").css("min-height", "550px").css("height", "88%");

                                    $.getScript("html/cfg/syswh_sj.js?version=" + version_web);
                                }, "html"
                            );
                            return;
                        }
                    }

                    loginSuccess();

                    //LOGO displayed after login
                    if (lgCls.logo != gVar.CtArr[23] && lgCls.logo != gVar.CtArr[108] && lgCls.logo != gVar.CtArr[143] && lgCls.logo != gVar.CtArr[150]
                        && lgCls.logo != gVar.CtArr[160] && lgCls.logo != gVar.CtArr[161] && lgCls.logo != gVar.CtArr[121]) {

                        //$("#logo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGO_c" + lgCls.logo + ".png) no-repeat");
                        if (lgCls.logo == gVar.CtArr[186] && typeof SVGRect != "undefined") {
                            $("#logo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGIN_c" + lgCls.logo + ".svg) no-repeat");
                        } else {
                            $("#logo").css("background", "url(images_" + lgCls.skin + "/LOGO/LOGO_c" + lgCls.logo + ".png) no-repeat");
                        }
                        if (lgCls.version == gVar.CtArr[137]) {
                            $("#logo").css("margin-top", "24px");
                        } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[70]) {
                            $("#logo").css("margin-top", "30px");
                        }
                    } else {
                        $("#logo").css("background-image", "url()");
                    }
                }
            } else if (subType == alarmEnum.MsgDevStatReport) {
                var channel;
                //New alarm way, such as access to a particular event corresponding to all channels such as alarm information
                if (gDevice.loginRsp.GetAlarmChns == 1) { //
                    try {
                        //console.log("STATE update11:" + JSON.stringify(data["Data"]));
                        channel = data["Data"].Channel;
                        gDevice.devState[channel].CurChnState = data["Data"].Status;
                        gDevice.devState[channel].RecState = data["Data"].RecState;
                        gDevice.devState[channel].CurRecType = data["Data"].CurRecType;
                        gDevice.devState[channel].ProtocolType = data["Data"].ProtocolType;
                        gDevice.devState[channel].Abilities = data["Data"].Abilities;
                        gDevice.devState[channel].IPCDevTypeFlag = data["Data"].IPCDevTypeFlag;
                        gDevice.devState[channel].zeroChSwitch = data["Data"].Status;
                        gDevice.devState[channel].InputNum = data["Data"].InputNum;
                        gDevice.devState[channel].OutputNum = data["Data"].OutputNum;
                        gDevice.devState[channel].AbilitiesEx = data["Data"].AbilitiesEx;
                        //Data["Schedule"] = pAlarmRpt->Schedule;
                        //Data["RecEnable"] = pAlarmRpt->RecEnable;
                        if (gDevice.devType == devTypeEnum.DEV_IPC) {
                            if (gDevice.devState[channel].CurChnState * 1 == 2 || gDevice.devState[channel].CurChnState * 1 == 3) {
                                window.setTimeout(function () {
                                    AutoClose(lg.get("IDS_RECONNECT"), 1);
                                }, 0);
                            }
                        } else {
                            if (g_DevStateReportTime != -1) {
                                clearTimeout(g_DevStateReportTime);
                                g_DevStateReportTime = -1;
                            }
                            if (g_DevStateReportTime == -1) {
                                g_DevStateReportTime = setTimeout(function () {
                                    gDevice.SimpleCmd(alarmEnum.MsgStatusRequest, alarmEnum.MsgDevAllStatusReq);//request MsgDevAllStatusReq
                                    g_DevStateReportTime = -1;
                                }, 200);
                            }
                        }

                    } catch (e) {
                        //console.log("subType == methodEnum.MsgDevStatReport && GetAlarmChns==1 error!");
                    }
                } else {
                    try {
                        //console.log("STATE update22:" + JSON.stringify(data["Data"].Data));
                        channel = data["Data"].Data.Channel;
                        gDevice.devState[channel].CurChnState = data["Data"].Data.Status;
                        gDevice.devState[channel].ProtocolType = data["Data"].Data.ProtocolType;
                        gDevice.devState[channel].Abilities = data["Data"].Data.Abilities;
                    } catch (e) {
                        //console.log("subType == methodEnum.MsgDevStatReport && GetAlarmChns==0 error!");
                    }
                }
                if (gDevice.devType != devTypeEnum.DEV_IPC && typeof channel != 'undefined') {
                    updateAllPageStatus(subType, channel);
                }
            } else if (subType == alarmEnum.MsgDevChModeReport) {
                try {
                    var nLen = data["Data"].arrChMode.length;
                    for (var i = 0; i < nLen; i++) {
                        var Channel = data["Data"].arrChMode[i]["Channel"];
                        var bChnMode = data["Data"].arrChMode[i]["bChnMode"];
                        gDevice.devState[Channel].chnMode = bChnMode;//0:cannot AutoConn,1:can AutoConn
                    }

                    updateAutoConn();
                } catch (e) {
                    //
                }
            } else if (subType == alarmEnum.MsgIOAlarm) {//ipc
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    //console.log("subType---"+subType+"---------alarm.IORec---"+alarm.IORec+"-----Status---"+data.Data.Status);
                    if (alarm.IORec != 1) {
                        g_recordStatus[getIpcCh(data.Data.Channel)].i = 0;
                        gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIOAlarm, false, 0, 0, 0);
                        if (data.Data.Status == 1) {//green I
                            g_recordStatus[getIpcCh(data.Data.Channel)].i = 1;
                            gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIOAlarm, true, 0, 255, 0);
                        }
                    }
                }
                //updateAllPageStatus(subType);
            } else if (subType == alarmEnum.MsgMotionAlarm) {//ipc
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    // console.log("subType---"+subType+"---------alarm.motionRec---"+alarm.motionRec+"-----Status---"+data.Data.Status);
                    if (alarm.motionRec != 1) {
                        g_recordStatus[getIpcCh(data.Data.Channel)].m = 0;
                        gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgMotionAlarm, false, 0, 0, 0);
                        if (data.Data.Status == 1) {//green M
                            g_recordStatus[getIpcCh(data.Data.Channel)].m = 1;
                            gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgMotionAlarm, true, 0, 255, 0);
                        }
                    }
                }
                //updateAllPageStatus(subType);
            } else if (subType == alarmEnum.MsgPirAlarm) {//pir
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    // console.log("subType---"+subType+"---------alarm.pirRec---"+alarm.pirRec+"-----Status---"+data.Data.Status);
                    if (alarm.pirRec != 1) {
                        g_recordStatus[getIpcCh(data.Data.Channel)].pir = 0;
                        gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgPirAlarm, false, 0, 0, 0, g_blogoPir);
                        if (data.Data.Status == 1) {//green PIR
                            g_recordStatus[getIpcCh(data.Data.Channel)].pir = 1;
                            gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgPirAlarm, true, 0, 255, 0, g_blogoPir);
                        }
                    }
                }
                //updateAllPageStatus(subType);
            } else if (subType == alarmEnum.MsgVLossAlarm) {
                if (gDevice.devType == devTypeEnum.DEV_HDVR) {
                    preVideoLossCallBack(data);
                }
                //updateAllPageStatus(subType);
            } else if (subType == alarmEnum.MsgAlarmFishEyeIpcStat) {
                //gDevice.loginRsp.FishEye.curShowMode;
                var chnArr = [], i = 0;
                for (i = 0; i < gDevice.loginRsp.FishEye.curStreamNum; i++) {
                    chnArr.push(i);
                }
                //gDevice.PreviewStop(chnArr);
                gDevice.loginRsp.FishEye.curStreamNum = data["Data"]["curStreamNum"];
                RfParamCall(FishEyeCall, "ColorSet", paramPage.MsgParamFishEye, 1000, "Get");
            } else if (subType == alarmEnum.MsgAlarmPTZIpcStat) {
                if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.autoFocus.PTZVersion) {
                    //console.log("-----------MsgAlarmPTZIpcStat-----------");
                    setAutoFocusParam(data["Data"]["curZoomValue"] * 1, data["Data"]["zoomStep"] * 1, data["Data"]["curFocusValue"] * 1, data["Data"]["focusStep"] * 1, data["Data"]["autoFocusState"] * 1);
                }
            } else if (subType == alarmEnum.MsgVideoHideAlarm) {
                g_recordStatus[getIpcCh(data.Data.Channel)].c = 0;
                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgVideoHideAlarm, false, 0, 0, 0);
                if (data.Data.Status == 1) {//green C
                    g_recordStatus[getIpcCh(data.Data.Channel)].c = 1;
                    gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgVideoHideAlarm, true, 0, 255, 0);
                }
            } else if (subType == alarmEnum.MsgIntelIpcPeaAlarm) {
                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIntelIpcPeaAlarm, false, 0, 0, 0);
                if (data.Data.Status == 1) {//green L
                    gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIntelIpcPeaAlarm, true, 0, 255, 0);
                }
            } else if (subType == alarmEnum.MsgIpcOSCAlarm) {
                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIpcOSCAlarm, false, 0, 0, 0);
                if (data.Data.Status == 1) {//green O
                    gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIpcOSCAlarm, true, 0, 255, 0);
                }
            } else if (subType == alarmEnum.MsgIntelIpcPeaAreaAlarm) {
                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIntelIpcPeaAreaAlarm, false, 0, 0, 0);
                if (data.Data.Status == 1) {//green P
                    gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIntelIpcPeaAreaAlarm, true, 0, 255, 0);
                }
            } else if (subType == alarmEnum.MsgAlarmIntManage) {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    // console.log("----subType------"+subType+"-----MsgValidFlagIPCWeb----"+data.Data.MsgValidFlagIPCWeb);
                    //console.log("----bBoxEnable------"+data.Data.bBoxEnable+"-----bBoxDisplay----"+data.Data.bBoxDisplay);
                    if (data.Data.MsgValidFlagIPCWeb == 1) {
                    } else {
                        g_recordStatus[getIpcCh(data.Data.Channel)].s = 0;
                        gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgAlarmIntManage, false, 0, 0, 0);
                        if (data.Data.Status == 1) {//green S
                            g_recordStatus[getIpcCh(data.Data.Channel)].s = 1;
                            gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgAlarmIntManage, true, 0, 255, 0);
                        }
                    }

                    if (!data.Data.bBoxEnable || data.Data.bBoxDisplay * 1 == 1) {
                        SmartFunCall(data.Data.AlarmType);
                    }

                }
            } else if (subType == alarmEnum.MsgSoundAlarmReport) {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    ShowPaop(lg.get("IDS_SOUND_DETECTION"), "<div>" + lg.get("IDS_SOUND_ALARM") + "!</div>");
                }
            } else if (subType == alarmEnum.MsgPWDChange) {
                if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[32]) {
                    var tipStr = "";
                    tipStr += '<h1>' + lg.get("IDS_LOGINFIR_T1") + '</h1>'
                        + '<h3>' + lg.get("IDS_LOGINFIR_T2") + '</h3>'
                        + '<p>' + lg.get("IDS_LOGINFIR_T3") + '</p>';
                    $("#loginTips").html(tipStr).css("display", "block");
                    $("#login_user_title").css("display", "none");

                    tipStr = "";
                    tipStr += '<input type="button" class="btn" id="login_btn_user_submit" value ="' + lg.get("IDS_PSW_SUBMIT") + '"/>'
                        + '<input type="button" class="btn" id="login_btn_user_cancel" value ="' + lg.get("IDS_CHANGE_LATER") + '"/>';
                    $("#login_btn_user_ok").nextAll().remove();
                    $("#login_btn_user_ok").after(tipStr).css("display", "none");

                    tipStr = "";
                    for (var i = 0; i < 5; i++) {
                        tipStr += '<li><p>' + lg.get("IDS_LOGINFIR_TIP" + (i + 1) + "_" + gVar.lg) + '</p></li>';
                    }
                    login_curpwd_label.innerHTML = lg.get("IDS_PSW_CUR");
                    login_user_label.innerHTML = lg.get("IDS_PSW_NEW");
                    login_user_confirm_label.innerHTML = lg.get("IDS_PSW_NEWCONF");
                    $("#login_userName").css("display", "none");
                    $("#login_curPwd").css("display", "block");
                    $("#login_user_prompt").addClass("resetForC32");
                    $("#pwdTips").html("<ul>" + tipStr + "</ul>").css("display", "block");
                    $("#login_btn_user_submit").bind("click",function () {
                        var oldPwd = $("#login_curPwd_input").val();
                        var loginPwd = $("#login_user_input").val();
                        var loginConfirm = $("#login_user_input_confirm").val();
                        if(oldPwd != gVar.passwd){
                            ShowPaop($("#login_user_title em").text(), lg.get("IDS_REBOOT_ERR_PWD"));
                            $("#login_curPwd_input").focus().select();
                            return;
                        }

                        if (loginPwd == "" || loginConfirm == "") {
                            ShowPaop($("#login_user_title em").text(), lg.get("IDS_NO_PASSWORD"));
                            $("#login_user_input").focus().select();
                            return;
                        }

                        if (loginPwd.length < gVar.pswMinLen || loginPwd.length > gVar.pswMaxLen) {
                            var PwdPaopTxt = lg.get("IDS_CHECKPW_LENGTH") + ' ' + (gVar.pswMinLen) + ' ' + lg.get("IDS_CHECKPW_LENGTHB") + ' ' + gVar.pswMaxLen + ' ' + lg.get("IDS_CHECKPW_LENGTHU");
                            ShowPaop($("#login_user_title em").text(), PwdPaopTxt);
                            $("#login_user_input").focus().select();
                            return;
                        }

                        if (loginConfirm != loginPwd) {
                            ShowPaop($("#login_user_title em").text(), lg.get("IDS_PSW_DIFFRENT"));
                            $("#login_user_input").focus().select();
                            return;
                        }

                        if (!checkPsw_c32(loginPwd)) {
                            ShowPaop($("#login_user_title em").text(), lg.get("IDS_REBOOT_ERR_PWD"));
                            $("#login_user_input").focus().select();
                            return;
                        }
                        var res = gDevice.IPCFirstLoginSetPwd(gVar.ip, gVar.mediaport * 1, gVar.user, loginPwd);
                        if(res.Code == 1){
                            $("#login_user_prompt").css('display', 'none');
                            MasklayerHide();
                            ShowPaop($("#login_user_title em").text(), lg.get("IDS_SAVE_SUCCESS"));
                        }
                    });
                    $("#login_btn_user_cancel").bind("click",function(){
                        $("#login_user_prompt").css('display', 'none');
                        MasklayerHide();
                    });
                    MasklayerShow();
                    $("#login_user_prompt").css('display', 'block');
                }
            } else if (subType == alarmEnum.MsgHddStatusReport) {
                if (gDevice.devType != devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[7]) {
                    return;//do not show any RecordLetter
                }
                //console.log("data.Data.HddStatus: "+data.Data.HddStatus);
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    if (data.Data.HddStatus != 2) {//red H
                        g_recordStatus[getIpcCh(data.Data.Channel)].h = 2;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, true, 255, 0, 0);
                    } else {
                        g_recordStatus[getIpcCh(data.Data.Channel)].h = 0;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, false, 0, 0, 0);
                    }
                } else {
                    if (data.Data.HddStatus != 1) {//red H
                        g_recordStatus[getIpcCh(data.Data.Channel)].h = 2;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, true, 255, 0, 0);
                    } else {
                        g_recordStatus[getIpcCh(data.Data.Channel)].h = 0;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, false, 0, 0, 0);
                    }
                }
            } else if (subType == alarmEnum.MsgRecordStatusReport) {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    g_recordStatus[getIpcCh(data.Data.Channel)].r = 0;
                    gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgRecordStatusReport, false, 0, 0, 0);
                    //console.log("----subType------"+subType+"-----type----"+data.Data.Type+'----status----'+data.Data.RecordStatus);
                    if (data.Data.RecordStatus == 1) {//red R
                        switch (data.Data.Type) {
                            case 0://r
                                g_recordStatus[getIpcCh(data.Data.Channel)].r = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgRecordStatusReport, true, 255, 0, 0);
                                break;
                            case 2://m
                                g_recordStatus[getIpcCh(data.Data.Channel)].m = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgMotionAlarm, true, 255, 0, 0);
                                alarm.motionRec = 1;
                                break;
                            case 3://i
                                g_recordStatus[getIpcCh(data.Data.Channel)].i = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIOAlarm, true, 255, 0, 0);
                                alarm.IORec = 1;
                                break;
                            case 13://s
                                g_recordStatus[getIpcCh(data.Data.Channel)].s = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgAlarmIntManage, true, 255, 0, 0);
                                break;
                            case 15://pir
                                g_recordStatus[getIpcCh(data.Data.Channel)].pir = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgPirAlarm, true, 255, 0, 0, g_blogoPir);
                                alarm.pirRec = 1;
                                break;
                        }
                    } else {
                        switch (data.Data.Type) {
                            case 5://stop m
                                g_recordStatus[getIpcCh(data.Data.Channel)].m = 0;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgMotionAlarm, false, 0, 0, 0);
                                alarm.motionRec = 0;
                                break;
                            case 6://stop i
                                g_recordStatus[getIpcCh(data.Data.Channel)].i = 0;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgIOAlarm, false, 0, 0, 0);
                                alarm.IORec = 0;
                                break;
                            case 13://s
                                g_recordStatus[getIpcCh(data.Data.Channel)].s = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgAlarmIntManage, true, 255, 0, 0);
                                break;
                            case 14://stop s
                                g_recordStatus[getIpcCh(data.Data.Channel)].s = 0;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgAlarmIntManage, false, 0, 0, 0);
                                break;
                            case 15://pir
                                g_recordStatus[getIpcCh(data.Data.Channel)].pir = 2;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgPirAlarm, true, 255, 0, 0, g_blogoPir);
                                alarm.pirRec = 1;
                                break;
                            case 16://stop pir
                                g_recordStatus[getIpcCh(data.Data.Channel)].pir = 0;
                                gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel), alarmEnum.MsgPirAlarm, false, 0, 0, 0, g_blogoPir);
                                alarm.pirRec = 0;
                                break;
                            //default:
                            //g_recordStatus[getIpcCh(data.Data.Channel)].r = 0;
                            //gDevice.SetPreviewRecordStatus(getIpcCh(data.Data.Channel),alarmEnum.MsgRecordStatusReport,false,0,0,0);
                            //break;
                        }
                    }
                }
            } else if (subType == alarmEnum.MsgDevAllStatusReq) { //610
                for (var i = 0; i < gDevice.loginRsp.ChannelNum; ++i) {
                    gDevice.devState[i].PageIntelligentChn = data.Data.PageIntelligentChn[i];
                    gDevice.devState[i].InputNum = data.Data.InputNum[i];
                    gDevice.devState[i].OutputNum = data.Data.OutputNum[i];
                }
                gDevice.devState[gDevice.loginRsp.ChannelNum] = {};
                gDevice.devState[gDevice.loginRsp.ChannelNum].zeroChSwitch = data.Data.zeroChSwitch;
                closeHideZeroCh();
                serverPlaybackStatus(data.Data.PlaybackState);

                if (CheckPageControl(PageControlEnum.BIT18_E, 1)) {//Open video identification plate side
                    if (g_recordStatus.length == 0) {
                        return;
                    }
                    if (data.Data.HddStatus[0] != 1) { //red H
                        g_recordStatus[0].h = 2;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, true, 255, 0, 0);
                    } else {
                        g_recordStatus[0].h = 0;
                        gDevice.SetPreviewRecordStatus(0, alarmEnum.MsgHddStatusReport, false, 0, 0, 0);
                    }
                    /*2018.7.3 change by liuyong
                     *Modify the interaction logic to avoid multiple interactions in a short time,
                     *causing the Firefox browser to crash and the IE browser to blink.
                    */
                    for (var i = 0; i < gDevice.loginRsp.ChannelNum; ++i) {
                        g_recordStatus[i].draw.m = false;
                        g_recordStatus[i].draw.i = false;
                        g_recordStatus[i].draw.r = false;
                        g_recordStatus[i].draw.s = false;
                        g_recordStatus[i].draw.pir = false;
                        //console.log("----MsgRecordStatusReport------false");
                        var nIndex, pos;
                        if (i <= 31) {
                            //
                        } else {
                            nIndex = parseInt((i - 32) / 32);
                            pos = (i - 32) % 32;
                        }
                        //console.log("610---RecordAllStatus----"+data.Data.RecordAllStatus[i]);

                        var RedM;//red M
                        if (i <= 31) {
                            RedM = data.Data.RecordAllStatus[i];
                        } else {
                            RedM = data.Data.RecordAllStatusExt[nIndex][pos];
                        }
                        if (RedM == RecordStatusEnum.RecordStatusMotion
                            || RedM == RecordStatusEnum.RecordStatusMotionIO
                            || RedM == RecordStatusEnum.RecordStatusMotionPir
                            || RedM == RecordStatusEnum.RecordStatusMotionPirIO
                            || RedM == RecordStatusEnum.RecordStatusMotionIntelligentall
                            || RedM == RecordStatusEnum.RecordStatusMotionIOIntelligentall
                            || RedM == RecordStatusEnum.RecordStatusMotionPIRIntelligentall
                            || RedM == RecordStatusEnum.RecordStatusMotionPIRIOIntelligentall
                        ) {
                            g_recordStatus[i].draw.m = true;
                            if (g_recordStatus[i].m != 2) {
                                g_recordStatus[i].m = 2;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgMotionAlarm, true, 255, 0, 0);
                            }
                        }

                        var RedI;//red I
                        if (i <= 31) {
                            RedI = data.Data.RecordAllStatus[i];
                        } else {
                            RedI = data.Data.RecordAllStatusExt[nIndex][pos];
                        }
                        if (RedI == RecordStatusEnum.RecordStatusIOAlarm
                            || RedI == RecordStatusEnum.RecordStatusMotionIO
                            || RedI == RecordStatusEnum.RecordStatusMotionPirIO
                            || RedI == RecordStatusEnum.RecordStatusPirIO
                            || RedI == RecordStatusEnum.RecordStatusIOIntelligentall
                            || RedI == RecordStatusEnum.RecordStatusMotionIOIntelligentall
                            || RedI == RecordStatusEnum.RecordStatusPIRIOIntelligentall
                            || RedI == RecordStatusEnum.RecordStatusMotionPIRIOIntelligentall
                        ) {
                            g_recordStatus[i].draw.i = true;
                            if (g_recordStatus[i].i != 2) {
                                g_recordStatus[i].i = 2;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgIOAlarm, true, 255, 0, 0);
                            }
                        }

                        var RedR;//red R
                        if (i <= 31) {
                            RedR = data.Data.RecordAllStatus[i];
                        } else {
                            RedR = data.Data.RecordAllStatusExt[nIndex][pos];
                        }
                        if (RedR == RecordStatusEnum.RecordStatusNormal) {
                            g_recordStatus[i].draw.r = true;
                            if (g_recordStatus[i].r != 2) {
                                g_recordStatus[i].r = 2;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgRecordStatusReport, true, 255, 0, 0);
                            }
                        }

                        var GreenM;//green M
                        if (i <= 31) {
                            GreenM = data.Data.MotionStatus >> i & 1;
                        } else {
                            GreenM = data.Data.MotionStatusExt[nIndex] >> pos & 1;
                        }
                        if (gVar.bC0_0305_3120101) {
                            GreenM = 0;//this device don't need "green M"
                        }
                        if (GreenM == 1) {
                            g_recordStatus[i].draw.m = true;
                            if (g_recordStatus[i].m != 1) {
                                g_recordStatus[i].m = 1;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgMotionAlarm, true, 0, 255, 0);
                            }
                        }

                        var GreenPir;//green pir
                        if (i <= 31) {
                            GreenPir = data.Data.PirStatus >> i & 1;
                        } else {
                            GreenPir = data.Data.PIRStatusExt[nIndex] >> pos & 1;
                        }
                        if (GreenPir == 1) {
                            g_recordStatus[i].draw.pir = true;
                            if (g_recordStatus[i].pir != 1) {
                                g_recordStatus[i].pir = 1;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgPirAlarm, true, 0, 255, 0, g_blogoPir);
                            }
                        }

                        var GreenI;//green I
                        if (i <= 31) {
                            GreenI = data.Data.IOStatus >> i & 1;
                            //console.log('green I :'+GreenI);
                        } else {
                            GreenI = data.Data.IOStatusExt[nIndex] >> pos & 1;
                        }
                        if (GreenI == 1) {
                            g_recordStatus[i].draw.i = true;
                            if (g_recordStatus[i].i != 1) {
                                g_recordStatus[i].i = 1;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgIOAlarm, true, 0, 255, 0);
                            }
                        }

                        var GreenS;//green S
                        if (i <= 31) {
                            GreenS = data.Data.IntelligentChnStatus >> i & 1;
                            //console.log('green S :'+GreenS);
                        } else {
                            GreenS = data.Data.IntelligentChnStatusExt[nIndex] >> pos & 1;
                        }
                        if (GreenS == 1) {
                            g_recordStatus[i].draw.s = true;
                            if (g_recordStatus[i].s != 1) {
                                g_recordStatus[i].s = 1;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgAlarmIntManage, true, 0, 255, 0);
                            }
                        }

                        var RedS;//red S
                        if (i <= 31) {
                            RedS = data.Data.RecordAllStatus[i];
                        } else {
                            RedS = data.Data.RecordAllStatusExt[nIndex][pos];
                        }
                        if (RedS == RecordStatusEnum.RecordStatusIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusIOIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusMotionIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusMotionIOIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusPIRIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusMotionPIRIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusPIRIOIntelligentall
                            || RedS == RecordStatusEnum.RecordStatusMotionPIRIOIntelligentall
                        ) {//red S
                            g_recordStatus[i].draw.s = true;
                            if (g_recordStatus[i].s != 2) {
                                g_recordStatus[i].s = 2;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgAlarmIntManage, true, 255, 0, 0);
                            }
                            if (!data.Data.bBoxEnable || data.Data.bBoxDisplay * 1 == 1) {
                                SmartFunCall(data.Data.IntelligentStatus);
                            }
                        } else {
                            if (data.Data.IntelligentStatus > 0) {
                                g_recordStatus[i].draw.s = true;
                                if (g_recordStatus[i].s != 1) {
                                    g_recordStatus[i].s = 1;
                                    gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgAlarmIntManage, true, 0, 255, 0);
                                }
                                if (!data.Data.bBoxEnable || data.Data.bBoxDisplay * 1 == 1) {
                                    SmartFunCall(data.Data.IntelligentStatus);
                                }
                            }
                        }

                        var RedPIR;//red PIR
                        if (i <= 31) {
                            RedPIR = data.Data.RecordAllStatus[i];
                        } else {
                            RedPIR = data.Data.RecordAllStatusExt[nIndex][pos];
                        }
                        if (RedPIR == RecordStatusEnum.RecordStatusPir
                            || RedPIR == RecordStatusEnum.RecordStatusMotionPir
                            || RedPIR == RecordStatusEnum.RecordStatusMotionPirIO
                            || RedPIR == RecordStatusEnum.RecordStatusPirIO
                            || RedPIR == RecordStatusEnum.RecordStatusPIRIntelligentall
                            || RedPIR == RecordStatusEnum.RecordStatusPIRIOIntelligentall
                            || RedPIR == RecordStatusEnum.RecordStatusMotionPIRIntelligentall
                            || RedPIR == RecordStatusEnum.RecordStatusMotionPIRIOIntelligentall
                        ) {
                            g_recordStatus[i].draw.pir = true;
                            if (g_recordStatus[i].pir != 2) {
                                g_recordStatus[i].pir = 2;
                                gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgPirAlarm, true, 255, 0, 0, g_blogoPir);
                            }
                        }
                        if (g_recordStatus[i].draw.m == false && g_recordStatus[i].m != 0) {
                            g_recordStatus[i].m = 0;
                            gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgMotionAlarm, false, 0, 0, 0);
                        }
                        if (g_recordStatus[i].draw.i == false && g_recordStatus[i].i != 0) {
                            g_recordStatus[i].i = 0;
                            gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgIOAlarm, false, 0, 0, 0);
                        }
                        if (g_recordStatus[i].draw.r == false && g_recordStatus[i].r != 0) {
                            g_recordStatus[i].r = 0;
                            gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgRecordStatusReport, false, 0, 0, 0);
                        }
                        if (g_recordStatus[i].draw.s == false && g_recordStatus[i].s != 0) {
                            g_recordStatus[i].s = 0;
                            gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgAlarmIntManage, false, 0, 0, 0);
                        }
                        if (g_recordStatus[i].draw.pir == false && g_recordStatus[i].pir != 0) {
                            g_recordStatus[i].pir = 0;
                            gDevice.SetPreviewRecordStatus(i, alarmEnum.MsgPirAlarm, false, 0, 0, 0, g_blogoPir);
                        }
                    }
                }

                //2.DectVersion
                if ((gDevice.devType == devTypeEnum.DEV_NVR || gDevice.devType == devTypeEnum.DEV_HDVR) && lgCls.version == gVar.CtArr[0] && ((gDevice.loginRsp.ControlBit >> 25) & 1) == 0) {
                    if (gVar.sPage == "config" && gVar.childPage == "auto_upgrade") {
                        //console.log("VersFlag:" + data.Data.VersFlag + " OldVer:" + data.Data.OldVer + " NewVer:" + data.Data.NewVer + " DevType:"　+ data.Data.DevType);
                        var VersFlag = data.Data.VersFlag;
                        if (VersFlag * 1 == 1) {
                            //$("#UpgradeTip").prop("innerHTML", "New firmware update is available ! Do you want to upgrade?");
                            var tips = lg.get("IDS_FTPUPG_DEV")+" " + data.Data.DevType + "<br/> \
								"+lg.get("IDS_FTPUPG_VER")+" " + data.Data.OldVer + "<br/> \
								<div style='color:#aa0000; font-size:18px;'>Do you want to upgrade to version " + data.Data.NewVer + "</div>";
                            $("#UpgradeTip").prop("innerHTML", tips);

                            $("#UpgradeTip").css("display", "block");
                            $("#UpgradeBtn").css("display", "block");
                            $("#UpgradeBtnCancel").css("display", "block");
                        } else if (VersFlag * 1 == 2) {
                            $("#UpgradeTip").prop("innerHTML", "Remote upgrading...");
                            $("#UpgradeTip").css("display", "block");
                            $("#UpgradeBtn").css("display", "none");
                            $("#UpgradeBtnCancel").css("display", "none");
                        } else {
                            $("#UpgradeTip").prop("innerHTML", "The current version is the latest.");
                            $("#UpgradeTip").css("display", "block");
                            $("#UpgradeBtn").css("display", "none");
                            $("#UpgradeBtnCancel").css("display", "none");
                        }
                    }
                }
            } else if (subType == alarmEnum.MsgFtpUpgradeAlarm) { //203
                FtpUpdateCallBack(data.Data.pos * 1, data.Data.status * 1);
            } else if (subType == alarmEnum.RSNetMsgLoginForbidIP) {//113
                //Login failed more than n times.
                stopLogin();

                if (gVar.logined) {//is not in the login page
                    getReconnctStatusString(alarmEnum.RSNetMsgLoginForbidIP);
                } else if (1) {
                    //netview's loginpage connnect IPC, password error more than 3 times.
                    //client use datetime to get Super password.
                    var y = data.Data.Year;
                    var m = (data.Data.Month < 10) ? ("0" + data.Data.Month) : data.Data.Month;
                    var d = (data.Data.Day < 10) ? ("0" + data.Data.Day) : data.Data.Day;
                    var h = (data.Data.Hour < 10) ? ("0" + data.Data.Hour) : data.Data.Hour;
                    var i = (data.Data.Minute < 10) ? ("0" + data.Data.Minute) : data.Data.Minute;
                    var s = (data.Data.Second < 10) ? ("0" + data.Data.Second) : data.Data.Second;
                    var mac = data.Data.mac;
                    var sn = data.Data.serialNumber;
                    var datetime;
                    if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        if (lgCls.version == gVar.CtArr[0]) {
                            datetime = y + "-" + m + "-" + d + "_" + mac;
                        } else if (lgCls.version == gVar.CtArr[166]) {
                            datetime = lg.get("IDS_LOGINPASSWORDERROR") + '<br />' + y + "-" + m + "-" + d + "_" + mac;
                        } else if (lgCls.version == gVar.CtArr[122] || lgCls.version == gVar.CtArr[76]) {
                            datetime = y + "-" + m + "-" + d + "_" + h + "-" + i + "-" + s + "_" + mac;
                        } else if (lgCls.version == gVar.CtArr[116]) {
                            datetime = y + "-" + m + "-" + d + "_" + h + "-" + i + "-" + s + "<br />" + sn;
                        } else {
                            datetime = y + "-" + m + "-" + d + "_" + h + "-" + i + "-" + s;
                        }
                    } else {
                        datetime = y + "-" + m + "-" + d + "_" + h + "-" + i + "-" + s;
                    }
                    gVar.pwdError = 0;
                    Web_prompt(datetime, true);
                } else if (0/*sanxing*/) {
                    /*
                    Web_prompt("Login failed more than 5 times.", true);

                    var secGone = data.Data.times*1;//seconds has gone
                    var secLeft = 30 - secGone;
                    //console.log("secGone:" + secGone + " secLeft:" + secLeft);

                    if($(".l-messagebox").length){
                        return;//"Popup Message Box",already existed
                    }

                    var title = lg.get("IDS_WARNING");
                    var content = "The device has been locked, <br/>please try again after "+(secLeft)+" seconds.";
                    $.ligerMessageBox.warn(title,content,function(){
                        //
                    });
                    $(".l-messagebox-close").css("display","none");*/
                }
            } else if (subType == alarmEnum.MsgDevPreviewChangeReport) {
                liveParamCall(data.Data);
            } else if (subType == alarmEnum.MsgGetRemoteParam) {
                if (gDevice.devType == devTypeEnum.DEV_IPC) {
                    var w = "350px";
                    var h = "250px";
                    var str = "";
                    var ok_str = lg.get("IDS_OK");
                    var cl_str = lg.get("IDS_CANCLE");
                    var dev_type = lg.get("IDS_IPCALARM");
                    if(lgCls.version == gVar.CtArr[122]){
                        ok_str = lg.get("IDS_FTPUPG_OK");
                        cl_str = lg.get("IDS_FTPUPG_CANCLE");
                    }
                    if (data.Data.NewVersion == "-1") {
                        return ;
                    }else if(data.Data.OldVersion == data.Data.NewVersion){
                        h = "200px";
                        str = "<ul class='popupBox' style='left:0;top: 50px;padding:0;display: block;width:" + w + ";'>"
                            + "<li>" + lg.get("IDS_FTPUPG_LASTEST") + "</li>"
                            + "<li class='btn_box' style='margin-left:120px;'>"
                            + "<input type='button' class='btn' value ='"+lg.get("IDS_OK")+"' onclick='javascript:parent.ftpUpgradeNo();' />"
                            + "</li>"
                            + "</ul>";
                    } else {
                        if (lgCls.skin == 'green_c13') {
                            str = "<ul class='popupBox' style='left:0;top: 50px;padding:0;word-break:normal;display: block;width:" + w + ";text-align: left;text-indent: 20px;'>"
                                + "<li>Current version " + data.Data.OldVersion + "</li>"
                                + "<li>New version available  " + data.Data.NewVersion + "</li>"
                                + "<li>Notes:" + data.Data.message + "</li>"
                                + "<li class='btn_box' style='margin-left:70px;'>"
                                + "<input type='button' class='btn' value ='"+ok_str+"' onclick='javascript:parent.ftpUpgradeYes();' />"
                                + "<input type='button' class='btn' value ='"+cl_str+"' onclick='javascript:parent.ftpUpgradeNo();' />"
                                + "</li>"
                                + "</ul>";
                        }else{
                            str = "<ul class='popupBox' style='left:0;top: 50px;padding:0;word-break:normal;display: block;width:" + w + ";'>"
                                + "<li>"+lg.get("IDS_FTPUPG_DEV")+" " + dev_type + "</li>"
                                + "<li>"+lg.get("IDS_FTPUPG_VER")+" " + data.Data.OldVersion + "</li>"
                                + "<li>" + lg.get("IDS_FTPUPG_UGD") + "</li>"
                                + "<li class='btn_box' style='margin-left:70px;'>"
                                + "<input type='button' class='btn' value ='"+ok_str+"' onclick='javascript:parent.ftpUpgradeYes();' />"
                                + "<input type='button' class='btn' value ='"+cl_str+"' onclick='javascript:parent.ftpUpgradeNo();' />"
                                + "</li>"
                                + "</ul>";
                        }
                    }
                    $("#FtpUpgrade_box").css("width", w).css("height", h);
                    $("#FtpUpgrade_box").contents().find("#DivBox").css("width", w).css("height", h);//all
                    $("#FtpUpgrade_box").contents().find("#titleBg").css("width", w).css("height", "36px");//title
                    $("#FtpUpgrade_box").contents().find("#FtpContant").css("width", w).css("height", h);//-36px
                    var curBodyWidth = document.body.clientWidth;
                    if (curBodyWidth < parseInt(w)) {
                        curBodyWidth = parseInt(w);
                    }
                    var leftWidth = parseInt((curBodyWidth - parseInt(w)) / 2);
                    $("#FtpUpgrade_box").css("left", leftWidth + "px").css("top", "100px");
                    $("#FtpUpgrade_box").contents().find("#FtpContant").css("padding", "0px");
                    ShowFtpUpgrade(lg.get("IDS_AUTO_UPGRADE"), str, 864000000);
                } else {
                    if (data.Data.OldVersion == data.Data.NewVersion) {
                        $("#UpgradeTip").text("The current firmware is up to date!").css("display", "");
                        return;
                    }
                    var w = "350px";
                    var h = "250px";

                    $("#FtpUpgrade_box").css("width", w).css("height", h);
                    $("#FtpUpgrade_box").contents().find("#DivBox").css("width", w).css("height", h);//all
                    $("#FtpUpgrade_box").contents().find("#titleBg").css("width", w).css("height", "36px");//title
                    $("#FtpUpgrade_box").contents().find("#FtpContant").css("width", w).css("height", h);//-36px

                    var curBodyWidth = document.body.clientWidth;
                    if (curBodyWidth < parseInt(w)) {
                        curBodyWidth = parseInt(w);
                    }
                    var leftWidth = parseInt((curBodyWidth - parseInt(w)) / 2);
                    $("#FtpUpgrade_box").css("left", leftWidth + "px").css("top", "100px");

                    $("#FtpUpgrade_box").contents().find("#titleBg").css("background", "#1E69B9");
                    $("#FtpUpgrade_box").contents().find("#FtpContant").css("padding", "0px");

                    ShowFtpUpgrade("Auto Upgrade",
                        lg.get("IDS_FTPUPG_DEV")+" " + data.Data.model + "<br> \
				"+lg.get("IDS_FTPUPG_VER")+" " + data.Data.OldVersion + "<br> \
				<div style='color:red'>Do you want to upgrade to version " + data.Data.NewVersion + " ?<br>" + data.Data.message + "</div>" +
                        "<div style='text-align:center;margin:5px;margin-top:25px;'>" +
                        "<button class='btn' style='margin-left:60px;' onclick='javascript:parent.ftpUpgradeYes();' />OK</button>&nbsp;&nbsp;&nbsp;&nbsp;" +
                        "<button class='btn' style='margin-left:45px;' onclick='javascript:parent.ftpUpgradeNo();' />Cancel</button>" +
                        "</div>", 864000000);
                }

                MasklayerShow();
            }
            break;
        }
        case eventEnum.MsgPlayBackEvent: {
            playbackEventCallBack(data);
            break;
        }
        case eventEnum.MsgTimeLineEvent: //Plug-in timeline callback
        {
            timelineEventCallBack(data.Data);
            break;
        }
        case eventEnum.MsgPlaybackCapEvent: {
            if (subType == methodEnum.SubMsgPlaybackCapSuccess) {
                var str = data["Data"]["CapPath"];
                var strTemp = str;
                str = str.split("\\").join("\\\\");
                var strColor = "#32A0E1";
                if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                    strColor = "rgb(79,161,24);";
                }

                ShowPaop(lg.get("IDS_IMAGE_SAVE_PATH"), "<div>" + strTemp + "</br><a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + str + "\")'>\"" + lg.get("IDS_FLODER") + "\"</a>&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapImage(\"" + str + "\");'>\"" + lg.get("IDS_PREVIEW") + "\"</a></div>");
            } else {
                var title = lg.get("IDS_FAILED") + "!";
                ShowPaop(lg.get("IDS_BTN_CAP"), "<div style='float:left;margin-top:8px;margin-left:5px;'>" + title + "</div>");
            }
            break;
        }
        case eventEnum.MsgPlaybackRecEvent: {
            if (subType == methodEnum.SubMsgPlaybackRecSuccess) {
                var str = data["Data"]["RecPath"];

                if (str == "-1") {
                    return;
                }
                var strTemp = str;
                var strColor = "#32A0E1";
                str = str.split("\\").join("\\\\");
                if (lgCls.version == gVar.CtArr[2] && gDevice.devType == devTypeEnum.DEV_IPC) {
                    strColor = "rgb(79,161,24);";
                }

                ShowPaop(lg.get("IDS_REC_CUT"), "<div>" + strTemp + "</br><a style='color:" + strColor + "' href='javascript:parent.gDevice.GetCapDir(\"" + str + "\")'>\"" + lg.get("IDS_FLODER") + "\"</a>&nbsp;&nbsp;&nbsp;&nbsp;</div>");
            } else if (subType == methodEnum.SubMsgPlaybackRecFail) {
                var title = lg.get("IDS_FAILED") + "!";
                ShowPaop(lg.get("IDS_REC_CUT"), "<div style='float:left;margin-top:8px;margin-left:5px;'>" + title + "</div>");
            }
            break;
        }
        case eventEnum.MsgGetAndSetParamEvent: {
            if (data["Data"]['Page'] == paramPage.MsgJsonTypeMsg) {
                JsonErrPro(subType, data["Data"]["ParamData"]);
            } else {
                CfgCallBack(subType, data["Data"]["ParamData"]);
            }
            break;
        }
        case eventEnum.MsgRemoteUpgradeEvent: {
            FileUpdateEvent(data["Data"]["status"], g_ipcgup); //data["Data"]["type"]   pos,type
            break;
        }
        case eventEnum.MsgRemoteTestEvent: //7
        {
            RemoteTestEvent(subType, data["Data"]);
            break;
        }
        case eventEnum.MsgRemoteSyncEvent: //19
        {
            var Data = data["Data"];
            if (Data == null) {
                loadingLayerHide();
                return;
            } else {
                if (Data.result != undefined) {
                    if (Data["result"] == "failed") {
                        loadingLayerHide();
                        ShowPaop(gVar.errTitle, Data["reason"]);
                        return;
                    }
                }
            }

            var MainType = Data['msgType'].split('_')[0];
            var SubType = Data['msgType'].split('_')[1];

            if (MainType == 'HDD') {
                if (SubType == 'FormatHdd') {
                    HddFormatRet(Data['data']['status'] * 1, Data['data']['process'] * 1)
                } else if (SubType == 'TestNetHdd') {
                    HddEventHaddle(Data['data']);
                }

            } else if (MainType == "LOG") {
                LogDataRetFun(Data["data"]);
            }

            break;
        }
        case eventEnum.MsgBitrateEvent: {
            //document.getElementById('streamRate').innerText = data["Data"]["Bitrate"];
            break;
        }
        case eventEnum.MsgDebugStringEvent: {
            DebugStringEvent(data["Data"]);
            break;
        }
        case eventEnum.MsgDownloadBoxEvent: {
            switch (subType) {
                case methodEnum.SubMsgDownloadStart:
                    StartDownload(data["Data"]["indexArr"]);
                    break;
                case methodEnum.SubMsgDownloadStop:
                    StopDownload(data["Data"]["indexArr"]);
                    break;
            }
            break;
        }
        case eventEnum.MsgPtzControlEvent: {
            var PresetNum = data["Data"]["PresetNum"];
            //console.log("PresetNum:" + PresetNum);
            if (PresetNum <= 0) {
                ShowPaop(lg.get("IDS_PTZ_CTRL"), lg.get("IDS_ADD_PRESETS"));//Please add preset point
            }
            break;
        }
        case eventEnum.MsgFishEyeSoftEvent: {
            switch (subType) {
                case retEnum.EscPress:
                    if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        var menuPage = $(".menuBtn[data-name='active']").attr('id');
                        if (menuPage == 'liveBtn') {
                            gDevice.PreviewDbclkFullscreen(true);
                        } else if (menuPage == 'playbackBtn') {
                            gDevice.PlaybackDbclkFullscreen(true);
                        }
                    }
                    break;
                case retEnum.SingleClick:
                    if (gDevice.devType == devTypeEnum.DEV_IPC && gDevice.loginRsp.FishEye.isFishEye && $("#fish-eye-btn").data("code") * 1 == 0) {
                        $("#fish-eye-btn").data("channel", data.Data.Channel);
                    }
                    break;
                default:
                    break;
            }
            break;
        }
    }
}

function closeHideZeroCh() {
    if (!gDevice.loginRsp.ZeroChFlag) return;
    var channel = gDevice.loginRsp.ChannelNum;
    if (gDevice.devState[channel].zeroChSwitch == 2) {
        if ($("#channelRow_" + channel).css("display") == "none") {
            $("#channelRow_" + channel).show();
            if ($("#chnPlay_" + channel).attr("name") != "active") {
                $("#chnPlay_" + channel).click();
            }
        }
    } else {
        $("#channelRow_" + channel).hide();
        if ($("#chnPlay_" + channel).attr("name") == "active") {
            $("#chnPlay_" + channel).click();
        }
    }
}

function menutitle(n) {
    var arr = ['LiveMenu', 'PlayBackMenu', 'ConfigMenu', 'PathMenu'];
    for (var i = 0; i < 4; i++) {
        $("#" + arr[i]).css("background", "none").css('color', '#ffffff');
    }
    //$("#"+arr[n-1]).css("background-color", "#706f71");
    //if (lgCls.version == gVar.CtArr[87]) {
    //    $("#" + arr[n - 1]).css("background-color", "#00635c");
    //} else {
    //    $("#" + arr[n - 1]).css("background-color", "#706f71");
    //}
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.keyCode == 9 && tabkey == 0) {
        e.keyCode = 0;
        e.returnValue = false;
        return false;
    }
}

function AnalyzeIPAndPort() {
    $.ajax({
        type: 'get',
        url: '/new-cgi-bin/mediaport.cgi?' + gVar.nDate,
        async: true,
        timeout: 20000,
        datatype: "xml",
        success: function (data) {
            $("#loading").css("display", "none");
            MasklayerHide();

            if ((typeof data == 'string') && data.constructor == String) {
                data = ("<xml>" + data + "</xml>");
            }
            $(data).find("Root").each(function () {
                gVar.mediaport = $(this).find("port").text() * 1;
            })
            $(data).find("Root").each(function () {
                gVar.nDevType = $(this).find("devtype").text() * 1;
                switch (gVar.nDevType * 1) {
                    case 0x9612:
                    case 0x9613:
                    case 0x9614:
                    case 0x9616:
                    case 0x9619:
                        //gDevice.bDevCif = true;
                        break;
                    default:
                        //gDevice.bDevCif = false;
                        break;
                }
            })
            $(data).find("Root").each(function () {
                lgCls.version = $(this).find("custom").text() * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.logo = $(this).find("logo").text() * 1;
            })

            $(data).find("Root").each(function () {
                lgCls.langues = $(this).find("langstrs").text();
            })
            $(data).find("Root").each(function () {
                lgCls.defaultLg = $(this).find("curlang").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                lgCls.sdcardshow = $(this).find("sdcardpageshow").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                lgCls.devicetime = $(this).find("devicetime").text();
            })
            $(data).find("Root").each(function () {
                lgCls.flashsize = $(this).find("flashsize").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                gVar.iBalancing = $(this).find("loadBalancing").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                gVar.synchr = $(this).find("rtcModule").text().split(" ")[0] * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.FirstLoginFlag = $(this).find("FirstLoginFlag").text() * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.webTitle = $(this).find("title").text();
            })
            $(data).find("Root").each(function () {
                lgCls.mediaPortEx = $(this).find("mediaPortEx").text() * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.localIpaddr = $(this).find("localIpaddr").text();
            })
            $(data).find("Root").each(function () {
                lgCls.PPPoEIpaddr = $(this).find("PPPoEIpaddr").text();
            })
            $(data).find("Root").each(function () {
                lgCls.useTitle = $(this).find("useTitle").text() * 1;
            })
            gOcx = new OcxClass();
            if (!gOcx.bInit) {
                //alert("Plugin is not loaded!");
                return;
            }
            InitOcx();
            InitTheme();
            loadThemeCss();
            InitLanguage();
            LanguageCall(gVar.lg);
            setPaopboxSkin();
            //LanguageCall(gVar.lg);
        },
        error: function (data, textstate) {
            $("#loading").css("display", "none");
            MasklayerHide();
        }
    });
}

function AnalyzeIPAndPort_c0() {
    $.ajax({
        type: 'get',
        url: 'http://' + gVar.ip + ':' + gVar.port + '/cgi-bin/mediaport.cgi?' + gVar.nDate,
        async: true,
        timeout: 20000,
        datatype: "xml",
        success: function (data) {
            $("#loading").css("display", "none");
            MasklayerHide();

            if ((typeof data == 'string') && data.constructor == String) {
                data = ("<xml>" + data + "</xml>");
            }
            $(data).find("Root").each(function () {
                gVar.mediaport = $(this).find("port").text() * 1;
            })
            $(data).find("Root").each(function () {
                gVar.nDevType = $(this).find("devtype").text() * 1;
                switch (gVar.nDevType * 1) {
                    case 0x9612:
                    case 0x9613:
                    case 0x9614:
                    case 0x9616:
                    case 0x9619:
                        //gDevice.bDevCif = true;
                        break;
                    default:
                        //gDevice.bDevCif = false;
                        break;
                }
            })
            $(data).find("Root").each(function () {
                lgCls.version = 0;//$(this).find("custom").text();
            })
            $(data).find("Root").each(function () {
                lgCls.logo = 0;//$(this).find("logo").text();
            })

            $(data).find("Root").each(function () {
                lgCls.langues = $(this).find("langstrs").text();
            })
            $(data).find("Root").each(function () {
                lgCls.defaultLg = $(this).find("curlang").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                lgCls.sdcardshow = $(this).find("sdcardpageshow").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                lgCls.devicetime = $(this).find("devicetime").text();
            })
            $(data).find("Root").each(function () {
                lgCls.flashsize = $(this).find("flashsize").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                gVar.iBalancing = $(this).find("loadBalancing").text().split(" ")[0];
            })
            $(data).find("Root").each(function () {
                gVar.synchr = $(this).find("rtcModule").text().split(" ")[0] * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.FirstLoginFlag = $(this).find("FirstLoginFlag").text() * 1;
            })
            $(data).find("Root").each(function () {
                lgCls.webTitle = $(this).find("title").text();
            })
            gOcx = new OcxClass();
            if (!gOcx.bInit) {
                //alert("Plugin is not loaded!");
                return;
            }
            InitOcx();
            InitTheme();
            loadThemeCss();
            InitLanguage();
            LanguageCall(gVar.lg);
            setPaopboxSkin();
            //LanguageCall(gVar.lg);
        },
        error: function (data, textstate) {
            $("#loading").css("display", "none");
            MasklayerHide();
        }
    });
}

function AnalyzeDevID(strID) {
    var getqueryinfo = '/queryinfo.php?DevID=' + strID + '&t=' + gVar.nDate;
    //var getqueryinfo = 'http://'+gVar.ip+':'+gVar.port+'/queryinfo.php?DevID=' + strID+'&t='+gVar.nDate;
    return $.ajax({
        type: 'get',
        url: getqueryinfo,
        async: false,
        timeout: 20000,
        datatype: "xml",
        success: function (data) {
            $(data).find('response').each(function () {
                var get_remoteip = $(this).find('RemoteIP').text();
                var get_mediaport = $(this).find('MediaPort').text();
                var get_webport = $(this).find('HttpPort').text();
                if (get_remoteip != "" && get_mediaport != "") {
                    gVar.ip = get_remoteip;
                    gVar.mediaport = get_mediaport;
                    gVar.port = get_webport;
                    return true;
                }

                return false;
            });
        },
        error: function (data, textstate) {
            alert(textstate);
            return false;
        }
    });
}

function CheckPassword() {};
$(function () {
    $("#btn_reboot_ok").click(function () {
        var SuperPassword;
        if (lgCls.version == gVar.CtArr[7]) {
            SuperPassword = "479266";
        } else {
            SuperPassword = "519070";
        }
        if ($("#reboot_input").val() == gVar.passwd || $("#reboot_input").val() == SuperPassword) {
            MasklayerHide();
            $("#reboot_prompt").css("display", "none");
            CheckPassword();
        } else {
            $("#reboot_title").children("em").prop("innerHTML", lg.get("IDS_REBOOT_ERR_PWD"));
        }
    })

    $("#btn_reboot_cancle").click(function () {
        MasklayerHide();
        $("#reboot_prompt").css("display", "none");
    })
})

/////////////////Callback processing parameter configuration///////////////////////////////////////////////////
//error handling
function XmlParm() {}
function JsonParam() {}

function ErrPro(type, xml) {
    if (type == methodEnum.SubMsgSetParameter) {
        var res = xml["result"];
        var r = res & 0xffff;
        switch (r) {
            case 0:
                if (gVar.errTitle == $("#syswh_cd").text()) {
                    ShowPaop(gVar.errTitle, lg.get("IDS_IMPORT_FAILED"));//Import failure
                } else if (gVar.bWirelessSave) {
                    //No prompt
                } else if (gVar.errTitle == "liveParamSet") {
                    //
                } else if (gVar.errTitle == "SetCam") {
                    ShowPaop(lg.get("IDS_CAMERA_PARAM"), lg.get("IDS_SAVE_FAILED"));
                } else {
                    ShowPaop(gVar.errTitle, lg.get("IDS_SAVE_FAILED")); //Save Failed!
                }
                break;
            case 1:
                if (gVar.errTitle == $("#syswh_cd").text()) {
                    ShowPaop(gVar.errTitle, lg.get("IDS_IMPORT_SUCCESS"));//Import success
                } else if (gVar.errTitle == "ColorSet" || gVar.errTitle == "GetColorSet") {
                    //RfParamCall(SilderGetCall, "ColorSet", paramPage.MsgParamColor, $("#channelList").attr("selectIndex") * 1, "Get");
                } else if (gVar.errTitle == "liveParamSet") {
                    var queryCh;
                    if (gDevice.devType == devTypeEnum.DEV_IPC) {
                        queryCh = 0;
                    } else {
                        queryCh = $("#channelList").attr("selectIndex") * 1;
                    }
                    //console.log("SaveSuc_queryCh=" + queryCh);
                    RfParamCall(liveParamCall, "liveParamSet", paramPage.MsgParamPreviewCtrl, queryCh, "Get");
                } else if (gVar.errTitle == "SetCam") {
                    ShowPaop(lg.get("IDS_CAMERA_PARAM"), lg.get("IDS_SAVE_SUCCESS"));
                } else {
                    ShowPaop(gVar.errTitle, lg.get("IDS_SAVE_SUCCESS")); //Saved!
                    //Restore the default Settings page into the callback prompt restart IE
                    if (gVar.errTitle == $("#syswh_mr").text()) { //
                        XmlParm(xml);
                    }

                    if ("syspm_dst" == gVar.childPage) {//After the success of the DST page, svae, instantly refresh
                        setTimeout(function () {
                            gVar.childPage = "syspm_dst_SaveRefresh";
                            $("#SysDstRf").click();
                        }, 100);
                    } else if (gDevice.devType == devTypeEnum.DEV_IPC && lgCls.version == gVar.CtArr[148] && "Img_Ctrl" == gVar.childPage) {
                        setTimeout(function () {
                            gVar.childPage = "Img_Ctrl_SaveRefresh";
                            $("#ChncamRf").click();
                        }, 100);
                    }
                }
                break;
            case 2:
                ShowPaop(gVar.errTitle, lg.get("IDS_NO_PARAMETER"));//no_right to save
                break;
            case 3:
                ShowPaop(gVar.errTitle, lg.get("IDS_COPY_CHNNELFAILED")); //Channel data copies to fail
                break;
            case 4:
                ShowPaop(gVar.errTitle, lg.get("IDS_PLAYBACK_RIGHT1")); //Have no legal power operation of the function
                break;
            case 5:
                var ch = res >> 16 & 0xffff;
                var str = '';
                for (var i = 0; i < gDevice.loginRsp.ChannelNum; ++i) {
                    if ((ch >> i) & 0x1 == 1) {
                        str += (lg.get("IDS_CH") + (i + 1) + ",");
                    }
                }
                ShowPaop(gVar.errTitle, str.substring(0, str.length - 1) + " " + lg.get("IDS_CRUISE_VALUE"));
                break;
            case 6:
                if (gVar.errTitle == $("#syswh_cd").text()) {
                    ShowPaop(gVar.errTitle, lg.get("IDS_CONFIG_PARAM_ERROR"));//Import failure
                }
                break;
            case 10://FileOpenErr
                if (gVar.childPage == "HTTPS") {
                    ShowPaop(gVar.errTitle, lg.get("IDS_HTTPS_OPEN_ERR"));
                }
                break;
            case 11://FileSizeErr
                if (gVar.childPage == "HTTPS") {
                    ShowPaop(gVar.errTitle, lg.get("IDS_HTTPS_SIZE_ERR"));
                }
                break;
            case 21://CheckPswSame
                if (gVar.childPage == "syspm_user") {
                    ShowPaop($("#syspm_user").text(), lg.get("IDS_PASSWORD_USE")); //Password cannot repeat!
                    $("#USPassword").focus().select();
                }
                break;
            default:
                break;
        }
    } else {
        if (xml == "" || xml == "err") {
            $('.SvBtnState[name != "not"]').fadeTo("slow", 0.2).prop("disabled", true);
            if (gVar.errTitle == $("#Dev_log").text()) {
                ShowPaop(gVar.errTitle, lg.get("IDS_SEARCH_FAILED")); //Refresh Failed!
                XmlParm(xml);
            } else if (gVar.errTitle == $("#syswh_cd").text()) {
                ShowPaop(gVar.errTitle, lg.get("IDS_EXPORT_FAILED"));//Export failure
            } else if (gVar.errTitle == "GetColorSet" || gVar.errTitle == "ColorSet" || gVar.errTitle == "liveParamSet") {

            } else if (gVar.errTitle == "SetCam") {
                ShowPaop(lg.get("IDS_CAMERA_PARAM"), lg.get("IDS_REFRESH_FAILED"));
            } else {
                ShowPaop(gVar.errTitle, lg.get("IDS_REFRESH_FAILED")); //Refresh Failed!
            }
		}else if(xml == "no_right"){
			ShowPaop(gVar.errTitle, lg.get("IDS_PLAYBACK_RIGHT1"));//no_right to refresh
        } else if (xml == "suc") {
            $('.SvBtnState[name != "not"]').fadeTo("slow", 1).prop("disabled", false);
            if (gVar.errTitle == $("#Dev_log").text()) {
                XmlParm(xml); //
                ShowPaop(gVar.errTitle, lg.get("IDS_SEARCH_SUCCESS"));
            } else if (gVar.errTitle == "GetColorSet") {
                XmlParm(xml);	//
            } else if (gVar.errTitle == $("#syswh_cd").text()) {
                XmlParm(xml);	//
                ShowPaop(gVar.errTitle, lg.get("IDS_EXPORT_SUCCESS"));//
            }
        } else if (xml != "err") {
            $('.SvBtnState[name != "not"]').fadeTo("slow", 1).prop("disabled", false);
            if (gVar.errTitle == $("#Dev_log").text()) {
                ShowPaop(gVar.errTitle, lg.get("IDS_SEARCH_SUCCESS"));
            } else if (gVar.errTitle != "ColorSet" && gVar.errTitle != "GetColorSet" && gVar.errTitle != "liveParamSet" && gVar.errTitle != "SetCam") {
                if ("syspm_dst_SaveRefresh" == gVar.childPage) {
                    //DST page, save the success of the refresh immediately, don't play box
                    gVar.childPage = "syspm_dst";
                } else if ("Img_Ctrl_SaveRefresh" == gVar.childPage) {
                    gVar.childPage = "Img_Ctrl";
                } else {
                    ShowPaop(gVar.errTitle, lg.get("IDS_REFRESH_SUCCESS")); //Refresh Success!
                }
            }
            XmlParm(xml); //xml analysis----Solve the right to limit, parsing the callback after the pop-up refresh bug success
        }
    }
    if ($("#foodlight_prompt").css("display") == "block" || $("#FtpUpgrade_box").css("display") != "none") {//floodlight prompt box is shown,can't hide mask
    } else if (xml[0] == null || xml[0].FunSwitchDisplay == null) {//SwitchIntell don't hide and show masklayer
        MasklayerHide();
    }
}

function JsonErrPro(type, xml) {
    if (type == methodEnum.SubMsgSetParameter) {
        var res = xml["result"];
        switch (res) {
            case 0:
                ShowPaop(gVar.jsonErrTitle, lg.get("IDS_SAVE_FAILED")); //Save Failed!
                break;
            case 1:
                ShowPaop(gVar.jsonErrTitle, lg.get("IDS_SAVE_SUCCESS")); //Saved!
                break;
			case 2:
				ShowPaop(gVar.jsonErrTitle, lg.get("IDS_NO_PARAMETER"));//no_right to save
				break;
            default:
                break;
        }
    } else {
        if (xml == 'err') {
            $('.SvBtnState[name != "not"]').fadeTo("slow", 0.2).prop("disabled", true);
            ShowPaop(gVar.jsonErrTitle, lg.get("IDS_REFRESH_FAILED")); //Refresh Failed!
        }else if(xml == 'no_right'){
			ShowPaop(gVar.jsonErrTitle, lg.get("IDS_PLAYBACK_RIGHT1"));//no_right to refresh
        } else {
            $('.SvBtnState[name != "not"]').fadeTo("slow", 1).prop("disabled", false);
            if (gVar.jsonErrTitle != "ColorSet" && gVar.jsonErrTitle != "GetColorSet" && gVar.jsonErrTitle != "liveParamSet" && gVar.jsonErrTitle != "SetCam") {
                ShowPaop(gVar.jsonErrTitle, lg.get("IDS_REFRESH_SUCCESS")); //Refresh Success!
            }
            JsonParam(xml); //xml analysis----Solve the right to limit, parsing the callback after the pop-up refresh bug success
        }
    }
    if ($("#foodlight_prompt").css("display") == "block") {//floodlight prompt box is shown,can't hide mask
    } else if (xml[0] == null || xml[0].FunSwitchDisplay == null) {//SwitchIntell don't hide and show masklayer
        //other page get ParamIntInfo at first,don`t hide mask
        if (xml.msgType != "getParamIntInfo" && xml.msgType != "getFtpUpgradeInfo")
            MasklayerHide();
    }
}

CfgCallBack = ErrPro; //The parameter plane first callback to error

//parameter configuration
//CallBack -- callback function
//Paop -- Message box prompts title
//nPage -- Set up or to get the page said
//nFlag -- Additional parameter Settings or page 
//		-- Transfer channel number Plus two values： 
//			100 - Access, inform ocx to update the data from the plate end
//			200 - Settings and inform ocx data is saved to the plate side;
//type -- operation notice， Get -- Get， Set -- Set . Get is the default value
//jsonData -- Set parameters, operation is used to ocx passing to set up the XML, 
//				the query operation does not need the value (the value is "");
function RfParamCall(CallBack, Paop, nPage, nFlag, type, jsonData) {
    //Parameters of validity check
    gVar.errTitle = Paop;
    if (gVar.errTitle != "ColorSet" && gVar.errTitle != "GetColorSet" && gVar.errTitle != "liveParamSet" && gVar.errTitle != "SetCam") {
        MasklayerShow();
    }
    if (nFlag == null || typeof nFlag == 'undefined') {
        MasklayerHide();
        return (null);
    }

    if (type == null || typeof type == 'undefined') {
        type = 0;
    } else if (type == "Get") {
        type = 0;
    } else if (type == "Set") {
        type = 1;
    }

    if (!jQuery.isFunction(CallBack)) {
        MasklayerHide();
        return (null);
    }
    if (type == 1) {
        if (!gDevice.hasUserSetRight(UserSetRightEnum.Parameter)) {
            MasklayerHide();
            ShowPaop(Paop, lg.get("IDS_NO_PARAMETER"));
            return (null);
        }
    }
    gVar.errTitle = Paop;
    XmlParm = CallBack; //Set the callback
    var xml = gDevice.GetAndSetParameter(nPage, jsonData, type, nFlag);
    if (xml == "-1") {
        MasklayerHide();
    }
}

function JsonParamCall(CallBack, popuptitle, nPage, type, jsonData) {
    $("#SecondaryContent").hide();
    gVar.jsonErrTitle = popuptitle;
    if (gVar.jsonErrTitle != "ColorSet" && gVar.jsonErrTitle != "GetColorSet" && gVar.jsonErrTitle != "liveParamSet" && gVar.jsonErrTitle != "SetCam") {
        MasklayerShow();
    }
    var nFlag = 900; //Request data with parameter conditions
    if (jsonData == null || typeof jsonData == 'undefined') {
        jsonData = {};
    }
    var param = {};
    param.data = jsonData;

    if (type == null || typeof type == 'undefined') {
        type = 0;
        param.msgType = 'get' + nPage;
    } else if (type == "Get") {
        type = 0;
        param.msgType = 'get' + nPage;
    } else if(type == "Default"){
        type = 0;
        param.msgType = 'default' + nPage;
    } else if (type == "Set") {
        type = 1;
        param.msgType = 'set' + nPage;
        nFlag = 2000;
    }

    if (!jQuery.isFunction(CallBack)) {
        MasklayerHide();
        return (null);
    }
    if (type == 1) {
        if (!gDevice.hasUserSetRight(UserSetRightEnum.Parameter)) {
            MasklayerHide();
            ShowPaop(popuptitle, lg.get("IDS_NO_PARAMETER"));
            return (null);
        }
    }
    JsonParam = function (data) {
        CallBack(data.data);
    }; //Set the callback
    var xml = gDevice.GetAndSetParameter(paramPage.MsgJsonTypeMsg, param, type, nFlag);
    if (xml == "-1") {
        MasklayerHide();
    }
}

/////////////////////////After the callback parameter configuration////////////////////////////////////////////////////
function ModifyPsw_Tips(str) {
    MasklayerHide();
    $("#ModPswResult").text(str).css("color", "red");
    setTimeout('$("#ModPswResult").text("")', 5000);
}

function ToModifiPage() {
	if(gVar.lg=="RUS"){
		modifyTitle.innerHTML = "Изменить пароль";
		modifyInfo.innerHTML = "Пароль по умолчанию небезопасен,пожалуйста, измените пароль";
		loginMdf_newPsw.innerHTML = "Новый пароль";
		loginMdf_newPsw2.innerHTML = "Подтвердите пароль";
		confirmBtn.innerHTML = "Сохранить";
		cancelBtn.innerHTML = "Отмена";
	}
	
    $("#idLogin_InputDiv").css("display", "none");
    $("#idLogin_ModifyPsw_div").css("display", "block");
    $("#modifpasswd, #modifpasswd2").attr("maxlength", gVar.pswMaxLen);
	
    $("#modifpasswd, #modifpasswd2").keydown(function (e) {
        if (e.keyCode == 13) {
            fnModifyPsw();
        }
    });
}

//Modify the password function
function fnModifyPsw() {
    var psw1 = $("#modifpasswd").prop("value");
    var psw2 = $("#modifpasswd2").prop("value");
    if (psw1 == "" || psw2 == "") {
        ModifyPsw_Tips(lg.get("IDS_NO_PASSWORD")); //
        $("#modifpasswd").focus().select();
        return;
    } else if (psw1.length < gVar.pswMinLen || psw1.length > gVar.pswMaxLen) {
        var strPswErr = '';
        if (gVar.pswMinLen == gVar.pswMaxLen) {
            strPswErr = lg.get("IDS_CHECKPW_LENGTH") + ' ' + gVar.pswMinLen + ' ' + lg.get("IDS_CHECKPW_LENGTHU");
        } else {
            strPswErr = lg.get("IDS_CHECKPW_LENGTH") + ' ' + (gVar.pswMinLen == 0 ? 1 : gVar.pswMinLen) + ' ' + lg.get("IDS_CHECKPW_LENGTHB") + ' ' + gVar.pswMaxLen + ' ' + lg.get("IDS_CHECKPW_LENGTHU");
        }
        ModifyPsw_Tips(strPswErr); //
        $("#modifpasswd").focus().select();
        return;
    } else if (psw1 != psw2) {
        ModifyPsw_Tips(lg.get("IDS_PSW_DIFFRENT")); //
        $("#modifpasswd2").focus().select();
        return;
    }

    if (lgCls.version == gVar.CtArr[0]) {
        if (psw1 == "00000000" || psw2 == "00000000") {
            ModifyPsw_Tips("Password can not be eight zeros!");
            $("#modifpasswd").focus().select();
            return;
        }
    } else if (lgCls.version == gVar.CtArr[1]) {
        if (psw1 == "admin" || psw2 == "admin") {
            ModifyPsw_Tips("Password can not be admin!");
            $("#modifpasswd").focus().select();
            return;
        }
    }

    var pswVal = $("#modifpasswd").val();
    var ret = gDevice.ModifyPsw(pswVal);
    //console.log(JSON.stringify(ret));
	
	var mdfPsw_ok = "Password changed successfully!";
	var mdfPsw_er = "Password change failed!";
	if(gVar.lg=="RUS"){
		mdfPsw_ok = "Пароль успешно изменен";
		mdfPsw_er = "Смена пароля не удалась";
	}
    if (ret.Code == errCodeEnum.Code_Success) {
        ModifyPsw_Tips(mdfPsw_ok);
    } else {
        ModifyPsw_Tips(mdfPsw_er);
    }

    //button disable
    $("#cancelBtn,#confirmBtn").BtnDisable();

    setTimeout(function () {
        closewnd();
        if (gIELogin) {
            window.location.href = "login.html";
        } else {
            window.location.href = "login.html?NetViewerLogin";
        }
    }, 5000);
}

function ModifyCancel() {
    closewnd();
    if (gIELogin) {
        window.location.href = "login.html";
    } else {
        window.location.href = "login.html?NetViewerLogin";
    }
}

function InputIpadderss() {
    var sel = $("#loginIP_select").val();
    if (sel != "clear") {
        document.getElementById("loginIP").value = lgCls.IpAndPort[sel]["IP"];
        document.getElementById("loginPort").value = lgCls.IpAndPort[sel]["Port"];
    } else {
        var ops = {expires: -1};//Due immediately
        for (var i = 0; i < 50; i++) {
            $.cookie("RS_IP" + i, "", ops);
            $.cookie("RS_Port" + i, "", ops);
        }

        $("#loginIP_select").empty();
        document.getElementById("loginIP").value = "";
        document.getElementById("loginPort").value = "";
    }
}

function ChangeLoginType(val) {
    if (val == 0) {//UI4
        //
    } else {//change to UI5 web
        window.location.href = "../www5/login.html";
    }
}

function getAutoConn() {
    var arr = [];
    for (var i = 0; i < gDevice.loginRsp.ChannelNum; i++) {
        if ((gDevice.devState[i].Abilities >> AbilityTypeEnum.SUPPROT_WIREFREE) & 1) {
            if (gDevice.devState[i].chnMode == 0) {
                arr.push(0);//cannot AutoConn
            } else {
                arr.push(1);//can AutoConn
            }
        } else {
            arr.push(1);//can AutoConn
        }
    }

    if (gDevice.loginRsp.ZeroChFlag) {
        arr.push(1);//zero channel also can AutoConn
    }

    return arr;
}

function updateAutoConn() {
    var arr = getAutoConn();
    gDevice.PreviewUpdateAutoConn(arr);
}

function ftpUpgradeYes() {
    gDevice.SimpleCmd(alarmEnum.MsgHttpUpgrade, 0);//361,0
    var tip = lg.get("IDS_FTP_UPGRADING");
    if (gDevice.devType == devTypeEnum.DEV_IPC) {
        tip = "<ul class='popupBox' style='left:0;top:100px;padding:0;display: block;width:350px;'>"
            + "<li>"+lg.get("IDS_FTP_UPGRADING")+"</li>"
            + "</ul>";
    }
    $("#FtpUpgrade_box").contents().find("#FtpContant").html(tip);
}

function ftpUpgradeNo() {
    MasklayerHide();
    HideFtpUpgrade();
}

function FtpUpdateCallBack(pos, status) {
    //console.log("pos:" + pos + " status:" + status);

    var tip = lg.get("IDS_FTP_UPGRADING");
    if (status == 1) {
        tip = lg.get("IDS_FTPUPG_SUC");
    } else if (status == -1) {
        tip = lg.get("IDS_FTPUPG_FAIL");
    }

    $("#FtpUpgrade_box").contents().find("#FtpContant").html(tip);
    if (status == 1 || status == -1) {
        window.setTimeout(function () {
            AutoClose(lg.get("IDS_WARNING"), 0);
        }, 1000);
    }
    /*
    if(status == 1){
        $("#FTPaa").css("display","block");
        $("#FTPaa").css("width",pos+"%");
        $("#FTPupdateMsg").html(pos+"%");
    }else if(status == 0 || status == 2){
        $("#FTPaa").css("width","100%");
        $("#FTPupdateMsg").html("100%");
        $("#FTPUPDATESTATE1").css("display","none");
        $("#UpgradeTip").prop("innerHTML",lg.get("IDS_REMOTEUPGRADE_OK")+", waiting for reboot.");
    }else if(status == 3){
        $("#UpgradeTip").prop("innerHTML","Upgrade failed, waiting for reboot.");
    }*/
}