(function($) {
	var ISOPENHUILI = 0;
	if(lgCls.version == gVar.CtArr[44] || g_bShowBSL){
		ISOPENHUILI = 1;
	}

	var today = new Date();
	var months;
	if(lgCls.version == gVar.CtArr[0]) {
		months = "Jan., Feb., Mar., Apr, May., Jun., Jul., Aug., Sep., Oct., Nov., Dec.".split(',');
	}else if(lgCls.version == gVar.CtArr[116]){
		months = 'Jan., Feb. ,Mar. ,Apr., May, Jun., Jul., Aug., Sept., Oct., Nov. ,Dec.'.split(',');
	}else {
		months = "1,2,3,4,5,6,7,8,9,10,11,12".split(',');
	}
	var monthlengths = '31,28,31,30,31,30,31,31,30,31,30,31'.split(',');
  	var dateRegEx = /^\d{1,2}\/\d{1,2}\/\d{2}|\d{4}$/;
	var yearRegEx = /^\d{4,4}$/;
	var GLtoHLyear,GLtoHLmonth,GLtoHLday;
	this.a = 0;
	this.b = 0;
	_self = this;
	var Xq = [
				  ["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],                       //Chinese
				  ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],         //English
				  ["воскресенье","понедельник","вторник","среда","четверг","пятница","суббота"],    //Russian
				  ["Domenica","Lunedi","Martedì","Mercoledì","Giovedi","Venerdì","Sabato"],         //Italian
				  ["Domingo","Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sábado"],//Portuguese
				  ["יום ראשון","יום שני","יום שלישי","יום רביעי","יום חמישי","יום שישי","יום שבת"],          //Hebrew
				  ["Κυριακή","Δευτέρα","Τρίτη","Τετάρτη","Πέμπτη","Παρασκευή","Σάββατο"],            //greek
				  ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"], //German
				  ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],        //spanish
				  ["Dimanche", "Lundi", "mardi", "mercredi", "Jeudi", "Vendredi", "samedi"],         //French
				  ["Niedziela", "Poniedziałek", "Wtorek", "środa", "czwartek", "piątek", "sobota"],   //Polish
				  ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],                         //Chinese Traditional
				  ["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"],                          //Japanese
				  ["วันอาทิตย์","วันจันทร์","วันอังคาร","วันพุธ","วันพฤหัสบดี","วันศุกร์","วันเสาร์"],                     //Thai
				  ["Pazar","Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi"],              //Turkish
				  ["Maa","Din","Woe","Don","Vrij","Zat","Zon"],                                        //Dutch
				  ["Vas.","Hét.","Ked.","Sze.","Csü.","Pén.","Szo."],                                   //Hungarian
				  ["Søn.","Man.","Tir.","Ons.","Tor.","Fre.","Lør."],                                  //Danish
				  ["sun.","Mån","tis","ons","tor","fre","lör"],                                   	   //swedish
				  ["CN","T.Hai","T.Ba","T.Tu","T.Nam","T.Sau","T.Bay"],                                 //
				  ["Нед","Пон","Вт","Ср","Чет","Пет","Съб"],
				  ["일요일","월요일","화요일","수요일","목요일","금요일","토요일에"]
			 ];
	var XqS = [
				  ["日","一","二","三","四","五","六"],                       //Chinese
				  ["S","M","T","W","T","F","S"],                            //English		  									
				  ["В","П","В","С","Ч","П","С"],                            //Russian 
				  ["D","L","M","M","G","V","S"],                            //Italian
				  ["D","S","T","Q","Q","S","S"],                            //Portuguese  
				  ["ש","א","ב","ג","ד","ח","ו"],                            //Hebrew 
				  ["K","Δ","Τ","Τ","Π","Π","Σ"],                            //greek
				  ["S","M","D","M","D","F","S"],                            //German
				  ["D","L","M","M","J","V","S"],                            //spanish
				  ["D","L","M","M","J","V","S"],                            //French
				  ["N","P","W","ś","C","P","S"],                            //Polish
				  ["日","一","二","三","四","五","六"],                       //Chinese Traditional
				  ["日","月","火","水","木","金","土"],                      //Japanese
				  ["วัน","หนึ่ง","สอง","สาม","สี่","ห้า","หก"],                   //Thai 
				  ["P","P","S","Ç","P","C","C"],                            //Turkish
				  ["M","D","W","D","V","Z","Z"],                            //Dutch
				  ["V","H","K","S","C","P","S"],                            //Hungarian
				  ["S","M","T","O","T","F","L"],                            //Danish
				  ["S","M","T","O","T","F","L"],                            //swedish
				  ["N","H","B","T","N","S","B"],                             //Vietnamese 19
				  ["Н","П","В","С","Ч","П","С"],                             //Bulgarian 20
				  ["일","월","화","수","목","금","토"]                             //21
			  ];
	var Xtd = ["今天", "today","сегодня","Oggi","Hoje","today","σήμερα","сегодня","hoy","aujourd'hui","dzisiaj","今日","今日は","วันนี้","bugün","vandaag","ma","ngàyNay"];
	$.fn.simpleDatepicker = function(options) {
		var opts = jQuery.extend({}, jQuery.fn.simpleDatepicker.defaults, options);
		setupYearRange();
		function setupYearRange () {
			var tempNowDate = new Date();
//			opts.startyear = tempNowDate.getFullYear() - 10; 
			opts.startyear = 2000;
//			opts.endyear = tempNowDate.getFullYear() + 10;
			opts.endyear = 2036;
		}
		
		function newDatepickerHTML () {
			var years = [];
			for (var i = 0; i <= opts.endyear - opts.startyear; i ++) years[i] = opts.startyear + i;
	
			// table
			var table = jQuery('<table class="datepicker" cellpadding="0" cellspacing="0" style="top:-5px; margin-top:0px; marker-offset:0px; "></table>');
			table.append('<thead></thead>');
			table.append('<tfoot></tfoot>');
			table.append('<tbody class="tbody"></tbody>');
			
			//Hidden refreshes the calendar button
			var refreshBtn = "";
			refreshBtn = '<input type="button" style="display:none;"/>';
			
			// month a drop-down box
			var selectMonth = "";
			selectMonth = '<div id="selectMonth" class="selectMonth"><select class="calendar_ctrl" id="' + opts.name + '_month" name="month">';
			for (var i in months) selectMonth += ('<b>'+'<option value="'+i+'">'+months[i]+'</option>'+'</b>');
			selectMonth += '</select></div>';
			
			// year a drop-down box
			var yearselect = "";
			yearselect = '<div id="yearselect" class="yearselect"><select class="calendar_ctrl" id="' + opts.name + '_year" name="year">';
			for (var i in years) yearselect += ('<option>'+'<b>'+years[i]+'</b>'+'</option>'); //<b></b> //for (var i in years) yearselect += ('<option>'+years[i]+'</option>');
			yearselect += '</select></div>';

			if(lgCls.version == gVar.CtArr[0]) {
				jQuery("thead",table).append('<tr class="controls">  \
										  		<th style="display:block;"><div class="prevMonth"></div></th>  \
												<th colspan="5" style="text-align:center; height: 20px; padding-left:20px;">'+'<div style="float:left">&nbsp;&nbsp;&nbsp;</div>'+selectMonth+'<div style="float:left">&nbsp;&nbsp;&nbsp;</div>'+yearselect+refreshBtn+'</th>  \
												<th style="display:block; border-rigth:1px solid #a0a0a0;"><div class="nextMonth"></div></th>  \
											</tr>');
			}else {
				jQuery("thead",table).append('<tr class="controls">  \
										  		<th style="display:block;"><div class="prevMonth"></div></th>  \
												<th colspan="5" style="text-align:center; height: 20px; padding-left:20px;">'+'<div style="float:left">&nbsp;&nbsp;&nbsp;</div>'+yearselect+'<div style="float:left">&nbsp;&nbsp;&nbsp;</div>'+selectMonth+refreshBtn+'</th>  \
												<th style="display:block; border-rigth:1px solid #a0a0a0;"><div class="nextMonth"></div></th>  \
											</tr>');
			}

		    			
			//day- week
			var dSt = 0;//gVar.nWeekStart;
			jQuery("thead",table).append('<tr class="days">  \
												<th>'+XqS[opts.Laguage][dSt]+'</th>  \
												<th>'+XqS[opts.Laguage][dSt+1>6?dSt+1-7:dSt+1]+'</th>  \
												<th>'+XqS[opts.Laguage][dSt+2>6?dSt+2-7:dSt+2]+'</th>  \
												<th>'+XqS[opts.Laguage][dSt+3>6?dSt+3-7:dSt+3]+'</th>  \
												<th>'+XqS[opts.Laguage][dSt+4>6?dSt+4-7:dSt+4]+'</th>  \
												<th>'+XqS[opts.Laguage][dSt+5>6?dSt+5-7:dSt+5]+'</th>  \
												<th fdfs>'+XqS[opts.Laguage][dSt+6>6?dSt+6-7:dSt+6]+'</th>  \
										 </tr>');
			
			//tbody first line
			jQuery("tbody",table).append('<tr>\
												<th class="CALMAXDAY_old" colspan="6" rowspan="7" style="display: none;"></th>  \
												<td></td>  \
												<td></td>  \
												<td></td>  \
												<td></td>  \
												<td></td>  \
												<td></td>  \
												<td></td>  \
										 </tr>');
			//tbody the second to the sixth row
			for (var i = 1; i < 6; i++) jQuery("tbody",table).append('<tr>  \
																			<td></td>  \
																			<td></td>  \
																			<td></td>  \
																			<td></td>  \
																			<td></td>  \
																			<td></td>  \
																			<td></td>  \
																		</tr>');	
			
			//tbody Line 7
			jQuery("tbody",table).append('<tr>\
											<th class="CALMAXDAY" colspan="7" rowspan="1" style="display:block;"></th> \
										</tr>');
			
			jQuery(".CALMAXDAY",table).append(' <div class="ToData" style="display:none;"></div>\
												<div class="ToDayS" style="display:none;"></div>\
												<div style="position:absolute;top:159px;left:8px;">\
													<span class="ToDay" style="display:none;"></span><br>\
													<span class="ToDayHuili" style="font-size:15px; display:block;margin-left:40px;"></span>\
												</div>'
											 );
			
			//tobody Line 7 to 9
			//for (var i = 0; i < 3; i++) jQuery("tbody",table).append('<tr><td></td><td></td></tr>');
			return table;
		}
		
		function CreateTip(){
			var div = jQuery('<div id="CalTip" style="width:123px;height:109px;position:absolute;display:none;"><p style="color:#F00;font-size:12px;margin:30px 20px;"></p></div>');
			return div;
		}
		
		function loadMonth (e, el, datepicker, chosendate, tip) {
			var mo = jQuery("select[name=month]", datepicker).get(0).selectedIndex;
			var yr = jQuery("select[name=year]", datepicker).get(0).selectedIndex;
			var yrs = jQuery("select[name=year] option", datepicker).get().length;
			
			if (e && jQuery(e.target).hasClass('prevMonth')) {				
				if (0 == mo && yr) {
					yr -= 1; mo = 11;
					jQuery("select[name=month]", datepicker).get(0).selectedIndex = 11;
					jQuery("select[name=year]", datepicker).get(0).selectedIndex = yr;
				} else {
					mo -= 1;
					jQuery("select[name=month]", datepicker).get(0).selectedIndex = mo;
				}
			} else if (e && jQuery(e.target).hasClass('nextMonth')) {
				if (11 == mo && yr + 1 < yrs) {
					yr += 1; mo = 0;
					jQuery("select[name=month]", datepicker).get(0).selectedIndex = 0;
					jQuery("select[name=year]", datepicker).get(0).selectedIndex = yr;
				} else { 
					mo += 1;
					jQuery("select[name=month]", datepicker).get(0).selectedIndex = mo;
				}
			}

			if(_self.a != mo || _self.b != yr)
			{
				_self.a = mo;
				_self.b = yr;
				
				var tempDt = new Date();
//				gCurDate = (tempDt.getFullYear() - 10+yr*1)+"-" + (mo * 1+1)+ "-1";
				gCurDate = (2000+yr*1)+"-" + (mo * 1+1)+ "-1";
			}
			
			if (0 == mo && !yr) jQuery("div.prevMonth", datepicker).hide(); 
			else jQuery("div.prevMonth", datepicker).show(); 
			if (yr + 1 == yrs && 11 == mo) jQuery("div.nextMonth", datepicker).hide(); 
			else jQuery("div.nextMonth", datepicker).show(); 
			
			var cells = jQuery("tbody td", datepicker).unbind().empty().removeClass('date');
			
			var m = jQuery("select[name=month]", datepicker).val();
			var y = jQuery("select[name=year]", datepicker).val();
			var d = new Date(y, m, 1);
			var startindex = d.getDay();
			var numdays = monthlengths[m];
			
			if (1 == m && ((y%4 == 0 && y%100 != 0) || y%400 == 0)) numdays = 29;
			
			if (opts.startdate.constructor == Date) {
				var startMonth = opts.startdate.getMonth();
				var startDate = opts.startdate.getDate();
			}
			if (opts.enddate.constructor == Date) {
				var endMonth = opts.enddate.getMonth();
				var endDate = opts.enddate.getDate();
			}
			if(!opts.type)
			{
				$(".chosen").removeClass('chosen');
				$(".chosen2").removeClass('chosen2');
				$(".chosen3").removeClass('chosen3');
				$(".static_curDay").removeClass('static_curDay');
			}
			
			var tempIndex = startindex-0/*gVar.nWeekStart*/<0 ? startindex-0/*gVar.nWeekStart*/+7: startindex-0/*gVar.nWeekStart*/;
			for (var i = 0; i < numdays; i++) {
				var cell = jQuery(cells.get(i+tempIndex)).removeClass('chosen');
				if ( 
					(yr || ((!startDate && !startMonth) || ((i+1 >= startDate && mo == startMonth) || mo > startMonth))) &&
					(yr + 1 < yrs || ((!endDate && !endMonth) || ((i+1 <= endDate && mo == endMonth) || mo < endMonth)))) {
	
					cell
						.text(i+1)
						.addClass('date')
						.hover(
							function () { 
								jQuery(this).addClass('over');
								if ($.isFunction(opts.CallBack)){
									var dateObj = new Date(jQuery("select[name=year]", datepicker).val(), 
										jQuery("select[name=month]", datepicker).val(), jQuery(this).text());								
									opts.CallBack(tip, jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS), 
										$(this).offset().top+25, $(this).offset().left-85);
								}
							},
							function () { jQuery(this).removeClass('over'); jQuery(tip).hide();})
						.click(function () {
							var chosenDateObj = new Date(jQuery("select[name=year]", datepicker).val(), jQuery("select[name=month]", datepicker).val(), jQuery(this).text());
							
							if(!opts.type){
								$(".chosen3").addClass('chosen2').removeClass("chosen3");
								$(".chosen").removeClass('chosen');
								if ($(this).attr("class").indexOf("chosen2") != -1){
									$(this).addClass('chosen3');
								}else{
									$(this).addClass('chosen');
								}
							}
							if(ISOPENHUILI){
								GLtoHLyear = jQuery("select[name=year]", datepicker).val()*1;
								GLtoHLmonth = jQuery("select[name=month]", datepicker).val()*1+1;
								GLtoHLday = jQuery(this).text()*1;
								var date = MiladiToShamsi(GLtoHLmonth,GLtoHLday,GLtoHLyear);
								GLtoHLmonth = date.month;
								GLtoHLday = date.day;
								GLtoHLyear = date.year;
								//console.log("0-click-day:   "+GLtoHLday);
								$(".ToDayHuili").prop("innerText",jQuery.fn.simpleDatepicker.GetShamsi(opts.UseZS,GLtoHLday,GLtoHLmonth,GLtoHLyear));
							}
							closeIt(el, datepicker, chosenDateObj);
						});
					
					if (i+1 == opts.chosendate.getDate() && m == opts.chosendate.getMonth() && y == opts.chosendate.getFullYear()) 
					{
						cell.addClass('chosen');
					}
					if(m == today.getMonth() && y == today.getFullYear() && i+1 == today.getDate()){
						cell.addClass('static_curDay');
					}
				}
				
				if (!opts.type){
					if($("#CalDayID")[0]){
						if ($("#CalDayID").attr("name") && $("#CalDayID").attr("name").indexOf(y+"-"+(Number(m)+1)+"-"+(i+1)+",") != -1 ){
							if (cell.attr("class").indexOf("chosen") != -1){
								cell.addClass('chosen3');
							}else{
								cell.addClass('chosen2');
							}
						}else {
							cell.removeClass('chosen2');
							cell.removeClass('chosen3');
						}
					}
				}
			}
			
			el.focus();
		}
		
		function closeIt (el, datepicker, dateObj) { 
			if (opts.type == 0)
			{
				if (dateObj && dateObj.constructor == Date)
				{
					opts.chosendate = dateObj;
					$("#calday").val(jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS));
				}
			}else{
				if (dateObj && dateObj.constructor == Date){
					if(ISOPENHUILI){
						el.val(jQuery.fn.simpleDatepicker.GetShamsi(opts.UseZS,GLtoHLday,GLtoHLmonth,GLtoHLyear));
						el.attr("grecal",jQuery.fn.simpleDatepicker.formatOutput(dateObj, false));
					}else{
						el.val(jQuery.fn.simpleDatepicker.formatOutput(dateObj, opts.UseZS));
						//el.prop("grecal",jQuery.fn.simpleDatepicker.formatOutput(dateObj, false));//ie  ok，Google and firefox error
						el.attr("grecal",jQuery.fn.simpleDatepicker.formatOutput(dateObj, false));
					}
				}
				datepicker.remove();
				$("#"+opts.nIframe).css({ position: 'absolute', width: 0, height: 0 });
				datepicker = null;
				jQuery.data(el.get(0), "simpleDatepicker", { hasDatepicker : false });
				el.attr("idname", "");
			}
			
		}

        return this.each(function() {
			if ( jQuery(this).is('input') && 'text' == $(this).attr("type")) {
				var datepicker, tip; 
				jQuery.data(jQuery(this).get(0), "simpleDatepicker", { hasDatepicker : false });
				if (opts.Laguage == "CHS"){
					opts.Laguage = 0;
				}else if (opts.Laguage == "ENU"){
					opts.Laguage = 1;
				}else if (opts.Laguage == "RUS"){
					opts.Laguage = 2;
				}else if (opts.Laguage == "ITA"){
					opts.Laguage = 3;
				}else if (opts.Laguage == "PTG"){
					opts.Laguage = 4;
				}else if (opts.Laguage == "HEB"){
					opts.Laguage = 5;
				}else if (opts.Laguage == "ELL"){
					opts.Laguage = 6;
				}else if (opts.Laguage == "DEU"){
					opts.Laguage = 7;
				}else if (opts.Laguage == "ESN"){
					opts.Laguage = 8;
				}else if (opts.Laguage == "FRA"){
					opts.Laguage = 9;
				}else if (opts.Laguage == "PLK"){
					opts.Laguage = 10;
				}else if (opts.Laguage == "CHT"){
					opts.Laguage = 11;
				}else if (opts.Laguage == "JPN"){
					opts.Laguage = 12;
				}else if (opts.Laguage == "THA"){
					opts.Laguage = 13;
				}else if (opts.Laguage == "TUR"){
					opts.Laguage = 14;
				}else if (opts.Laguage == "HOL"){
					opts.Laguage = 15;
				}else if (opts.Laguage == "HUN"){
					opts.Laguage = 16;
				}else if (opts.Laguage == "DAN"){
					opts.Laguage = 17;
				}else if (opts.Laguage == "SVE"){
					opts.Laguage = 18;
				}else if (opts.Laguage == "PTB"){
					opts.Laguage = 4;
				}else if (opts.Laguage == "VIE"){
					opts.Laguage = 19;
				}else if (opts.Laguage == "BRG"){
					opts.Laguage = 20;
				}else if (opts.Laguage == "KOR"){
					opts.Laguage = 21;
				} else {
                    opts.Laguage = 1;// default enu
				}
				jQuery(this).click(function (ev) {
					var $this = jQuery(ev.target);					
					if (false == jQuery.data($this.get(0), "simpleDatepicker").hasDatepicker) {
						this.className="addTimeClick";
						jQuery.data($this.get(0), "simpleDatepicker", { hasDatepicker : true });
						
						var initialDate = $this.val();
						/*
						if (initialDate && dateRegEx.test(initialDate)) {
							var chosendate = new Date(initialDate);
						} else if (opts.chosendate.constructor == Date) {
							var chosendate = opts.chosendate;
						} else if (opts.chosendate) {
							var chosendate = new Date(opts.chosendate);
						} else {
							var chosendate = today;
						}
						*/
						var chosendate = opts.chosendate;
						datepicker = newDatepickerHTML();
						jQuery("#"+opts.name).html(datepicker);
						if(lgCls.version == gVar.CtArr[0]) {
							jQuery('.selectMonth').addClass('selectMonth_C0');
						}

						if ($.browser.safari){
							$(".yearselect").css("width","45px");
							$(".selectMonth").css("width","25px");
						}
						if(ISOPENHUILI){
							$(".calendarDiv").css("height", "199px");//Show the Persian calendar date, need to 24 px
							$(".datepicker").css("height", "199px");
							//The default display of the Persian calendar (date) (month) (year)
						}else{
							//The default height of 175 px
							$(".CALMAXDAY").css("display", "none");//Don't show the Persian calendar (date) (month) (year)
						}
						tip = CreateTip();
						jQuery("body").append(tip);
						opts.tip = tip;
						
						var elPos = [0,0];//findPosition($this.get(0));
						var x = (parseInt(opts.x) ? parseInt(opts.x) : 0) + elPos[0];
						var y = (parseInt(opts.y) ? parseInt(opts.y) : 0) + elPos[1];
						jQuery(datepicker).css({ position: 'absolute', left: x, top: y });
						
						if ($.browser.msie && $.browser.version.indexOf("6")!=-1){
							$("#"+opts.nIframe).css({ position: 'absolute', left: jQuery(datepicker).css("left"), top: jQuery(datepicker).css("top"), width:jQuery(datepicker).css("width"), height:jQuery(datepicker).css("height") });
						}
						
						jQuery("div", datepicker).css("cursor","pointer");
						jQuery("input", datepicker).bind('click', function () {
							loadMonth (null, $this, datepicker, chosendate, tip); 
						});
						jQuery("select", datepicker).change(function () {
							$(this).blur();
							loadMonth (null, $this, datepicker, chosendate, tip); 
							CalSearchByMon();
						});
						jQuery("div.prevMonth", datepicker).click(function (e) { 
							loadMonth (e, $this, datepicker, chosendate, tip); 
							CalSearchByMon();
						});
						jQuery("div.nextMonth", datepicker).click(function (e) { 
							loadMonth (e, $this, datepicker, chosendate, tip); 
							CalSearchByMon();
						});

						if (opts.type == 0){
							jQuery("span.today,.ToData,.ToDayS,.ToDay", datepicker).click(function () {
								$(".chosen").removeClass('chosen');
								$(this).addClass('chosen');
								opts.chosendate = today;
								jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
								jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
								loadMonth(null, $this, datepicker, chosendate, tip);
								closeIt($this, datepicker, new Date()); 	
							});
							jQuery(document).click(function(){jQuery(opts.tip).hide();});
							jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
							jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
							loadMonth(null, $this, datepicker, chosendate, tip);
						}else{
							$this.blur(function(){
								if ($this.attr("idname") != "mouseover"){
									datepicker.fadeTo("slow",0,function(){
										closeIt($this, datepicker);
									});
									$this.attr("idname","");
									datepicker.fadeTo(100,1);
								}else{
									if(document.activeElement.id!= (opts.name + '_year') && document.activeElement.id!= (opts.name + '_month')){
										$this.focus();
									}
								}
								
							});
							
							$("#" + opts.name + "_year").blur(function(){
								$this.focus();
							});
							
							$("#" + opts.name + "_month").blur(function(){
								$this.focus();
							});
							
							
							datepicker.mouseover(function(){$this.attr("idname", "mouseover");});
							datepicker.mouseout(function(){$this.attr("idname", "");});
							jQuery("span.ToDay,div.ToData,div.ToDayS", datepicker).click(function () {closeIt($this, datepicker, new Date()); });
							//jQuery("span.close", datepicker).click(function () { closeIt($this, datepicker); });
							jQuery("select[name=month]", datepicker).get(0).selectedIndex = chosendate.getMonth();
							jQuery("select[name=year]", datepicker).get(0).selectedIndex = Math.max(0, chosendate.getFullYear() - opts.startyear);
							loadMonth(null, $this, datepicker, chosendate, tip);
						}

						$(".ToDay").prop("innerText",jQuery.fn.simpleDatepicker.formatOutput(new Date(), opts.UseZS));
						$(".ToData").prop("innerText",(new Date()).getDate());
						$(".ToDayS").prop("innerText",Xq[opts.Laguage*1][(new Date()).getDay()*1]);
						if(ISOPENHUILI){
							GLtoHLyear = jQuery("select[name=year]", datepicker).val()*1;
							/*GLtoHLyear = (new Date()).getYear();
							if(navigator.userAgent.indexOf("Safari")>=0 && navigator.userAgent.toLowerCase().indexOf("version") >= 0)//$.browser.safari
							{
								GLtoHLyear += 1900;
							}*/
							GLtoHLmonth = (new Date()).getMonth()*1+1;
							GLtoHLday = (new Date()).getDate();
							var date = MiladiToShamsi(GLtoHLmonth*1,GLtoHLday*1,GLtoHLyear*1);
							GLtoHLmonth = date.month;
							GLtoHLday = date.day;
							GLtoHLyear = date.year;
							$(".ToDayHuili").prop("innerText",jQuery.fn.simpleDatepicker.GetShamsi(opts.UseZS,GLtoHLday,GLtoHLmonth,GLtoHLyear));
						}
					}
					
				});
			}

        });

    };

	jQuery.fn.simpleDatepicker.formatOutput = function (dateObj, type) {
		if (typeof type != 'undefined' && type) {
			if (jQuery.fn.simpleDatepicker.TimeType == 0){
				return ((dateObj.getMonth() + 1) + "/" + dateObj.getDate() + "/" + dateObj.getFullYear());	
			}else if (jQuery.fn.simpleDatepicker.TimeType == 1){
				return (dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate());	
			}else if (jQuery.fn.simpleDatepicker.TimeType == 2){
				return (dateObj.getDate() + "/" + (dateObj.getMonth() + 1) + "/" + dateObj.getFullYear());
			}
		}
		return (dateObj.getFullYear() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getDate());
	};
	
	jQuery.fn.simpleDatepicker.ShowInputTip = function (Tip, Tiptext, top, left) {
		jQuery(Tip).find("p").html(Tiptext);
		jQuery(Tip).slideDown("quit").css("left", left).css("top", top);
	};
	
	jQuery.fn.simpleDatepicker.TimeType = 0;
	
	jQuery.fn.simpleDatepicker.defaults = {
		chosendate : today,		
		startdate : today.getFullYear(), 
		enddate : today.getFullYear(),
		name: "calendar",
		nIframe:"nIframe",
		type: 0,
		x : 0,
		y : 0,
		tip: null,
		CallBack: null,
		Laguage: "CHS",
		UseZS:false
	};
	
	jQuery.fn.simpleDatepicker.GetShamsi = function(type,day,month,year) {//Access to the Persian calendar
		if (typeof type != 'undefined' && type) {
			if (jQuery.fn.simpleDatepicker.TimeType == 0){
				return month+"/"+day+"/"+year;
			}else if (jQuery.fn.simpleDatepicker.TimeType == 1){
				return year+"-"+month+"-"+day;
			}else if (jQuery.fn.simpleDatepicker.TimeType == 2){
				return day+"/"+month+"/"+year;
			}
		}
		return year+"-"+month+"-"+day;
	};
	
   	
 
})(jQuery);

