$(function () {
    if (CheckBrowser()) {
        if ($.browser.safari) {
            if (C0IEBao) {
                $("#DownLoadAddr").attr("href", "LOREXPlugin.dmg");
            } else if (C186IEBao || C186IEBaoNVR || IPCC186CH256IEBao || C186IEBaoNO265 || C186IEBao265) {
                $("#DownLoadAddr").attr("href", "AVPlugin.dmg");
            } else if (C142IEBao) {
                $("#DownLoadAddr").attr("href", "EverFocusPlugin.dmg");
            } else if (C146IEBao) {
                $("#DownLoadAddr").attr("href", "GSD_DEV.dmg");
            } else if (IPCC32IEBao) {
                $("#DownLoadAddr").attr("href", "HoneywellPlugin.dmg");
            } else if (IPCC152IEBao) {
                $("#DownLoadAddr").attr("href", "LaView Video 600 Plugin.dmg");
            } else {
                $("#DownLoadAddr").attr("href", "SurveillancePlugin.dmg");
            }

            $("#DownLoadDiv").css("display", "block");
        } else {
            if (C0IEBao) {
                $("#DownLoadAddr").attr("href", "LOREXPlugin.exe");
            } else if (C186IEBao || C186IEBaoNVR || IPCC186CH256IEBao || C186IEBaoNO265 || C186IEBao265) {
                $("#DownLoadAddr").attr("href", "AVPlugin.exe");
            } else if (C142IEBao) {
                $("#DownLoadAddr").attr("href", "EverFocusPlugin.exe");
            } else if (IPCC32IEBao) {
                $("#TextTip").html('플러그인을 설치하지 않았거나 최신 버전이 아닙니다.<br/><br/>' +
                    '다운로드를 선택하여 최신 플러그인을 <a id="DownLoadAddr" href="HoneywellPlugin.exe"><em>다운로드</em></a> 하십시오.<br/><br/>');
                $("#TextTips").html('플러그인 설치 전에 브라우저를 닫으십시오.<br/><br/>' +
                    '(Honeywellcctv.co.kr)<br/><br/>');
            } else if (IPCC152IEBao) {
                $("#DownLoadAddr").attr("href", "LaView Video600 Plugin.exe");
            } else {
                if(g_customLan == 229){
                    $("#TextTip").html('Eklenti daha önce kurulmadı veya son versiyon değil.<br/><br/>' +
                        'Eklentiyi indirmek <a id="DownLoadAddr" href="SurveillancePlugin.exe"><em>için</em></a> tıklayınız.<br/><br/>');
                    $("#TextTips").html('Eklentiyi kurmadan önce tarayıcıyı kapatınız.');
                }else{
                    $("#DownLoadAddr").attr("href", "SurveillancePlugin.exe");
                }
            }

            $("#DownLoadDiv").css("display", "block");
        }
    } else {
        $("#DownLoadTips").css("display", "none");

        if ($.browser.macos) {
            $("#TextTip").html("The plugin does not support this browser,<br/>" +
                "please use the Safari 11.");
        } else {
            $("#TextTip").css("display", "inline-block").css("text-align", "left");
            $("#TextTip").html("The plugin does not support this browser.<br/><br/>" +
                "Please use the following browser:<br/>" +
                "&nbsp;&nbsp;1.Internet Explorer 8 and above.<br/>" +
                "&nbsp;&nbsp;2.Firefox 51 and below.<br/>" +
                "&nbsp;&nbsp;3.Google Chrome 44 or lower.<br/>");
        }
    }

})