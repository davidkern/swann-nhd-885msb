$(document).ready(function () {
    var Data = {};
	var idHtml_RowStl = $("#idHtml_RowStl").html();
	
	$("#ALTE_RF").click(function(){
        RfParamCall(Call, $("#idALTE_title").text(), paramPage.MsgParamALTEReport, 1000, "Get");
    });
	
	$(function(){
		$("#ALTE_RF").click();
	});
	
	function getLG(i){
		switch(i){
			case 0:	return "Online Status";	break;
			case 1:	return "Hdd Status";	break;
			case 2: return "Record Status";	break;
			case 3: return "Video Loss Status";	break;
			case 8: return "Channel Info";	break;
			case 9: return "Record Info";	break;
			default:return "";
		}
	}
	
    function Call(obj) {
        Data = obj;
		//console.log("call:" + JSON.stringify(Data));
		
		$("#EnableReport").attr("data", Data.EnableReport*1);
		$("#ReportIpAddr1").val(Data.ReportIpAddr1);
		$("#ReportIpAddr2").val(Data.ReportIpAddr2);
		$("#Port1").val(Data.Port1*1);
		$("#Port2").val(Data.Port2*1);
		$("#ReportPeriod").val(Data.ReportPeriod*1);
		
		$("#idAllRows").empty();		
		for(var i=0; i<32; i++){
			if(Data.ReportTypeMask>>i & 0x1){
				$("#idAllRows").append(idHtml_RowStl);
				$(".oneRow:last-child .clsID").html( i<10?"0"+i:i );
				$(".oneRow:last-child .clsType").html( getLG(i) );
				$(".oneRow:last-child .clsState .switch").attr("data", (Data.ReportType>>i) & 0x1 );
			}
		}
		
		$("input[data],div[data]").unbind("click");
		InitButton();
		ChangeBtnState();
    }
	
    $("#ALTE_SV").click(function(){
		
		Data.EnableReport = $("#EnableReport").attr("data")*1;
		Data.ReportIpAddr1 = $("#ReportIpAddr1").val();
		Data.ReportIpAddr2 = $("#ReportIpAddr2").val();
		Data.Port1 = $("#Port1").val()*1;
		Data.Port2 = $("#Port2").val()*1;
		Data.ReportPeriod = $("#ReportPeriod").val()*1;
		
		var type = 0;
		var j = -1;
		for(var i=0; i<31; i++){//32
			if(Data.ReportTypeMask>>i & 0x1){
				j++;
				type |= ($("#idAllRows .oneRow").eq(j).find("input").attr("data") << i);
			}else{
				type |= ((Data.ReportType>>i & 0x1) << i);
			}
		}
		Data.ReportType = type;
		
		//console.log("save:" + JSON.stringify(Data));
        RfParamCall(Call, $("#idALTE_title").text(), paramPage.MsgParamALTEReport, 2000, "Set", Data);
    });
	
	$("#ALTE_Up").click(function () {
        if( $("#idALTE_part3").css("display") == "none" ){
			$("#idALTE_part3").css("display","block");
			setTimeout(function(){
				$("#g_idALTEReport").scrollTop(145);
			}, 10);
		}else{
			$("#idALTE_part3").css("display","none");
		}
    });
	
	
	$("#ALTE_Exit").click(function () {
        window.location.href = "login.html";
    });
});