/*
 * Copyright (c) 2016-3-14 
 * author : gy
 * tips	  :	Need to be loaded jquery.mousewheel.js;Need to define recTypeEnum enumeration
 * modify : 
 */

var timeline = function(options) {
	var _opts = {
		chnNum : 1, //The number of channels
		divId : "", //Dom node ID
		//dataTypeNum : 1,//Data type species, can not passed, with the number of dataTypeArr shall prevail
		dataTypeArr : [recTypeEnum.NormalRecord], //Data type type and priority, element position behind the high priority
		dataTypeColorArr : ["rgb(0,128,0)"],//Data type corresponding color, type and dataTypeArr video
		optimizeData : true,//Whether the raw data is optimized
		fontColor : "black",
		blankLeftWidth : 30,
		blankRightWidth : 30,
		b24Hour : false,
		clickCallback : function(chn, date, bInZone) {
		}
	};

	//Enlarge the ratio of the array
	var ZoomLevel = [1, 2, 4, 8, 12, 24];
	//After finishing the data type of the color corresponding to the array
	var ColorArr = [];

	var _sHeight = 0;
	var _sWidth = 0;
	//Scale the height
	var _timeScaleHeight = 20;
	//At the bottom of the blank height
	var _bottomBlankHeight = 10;
	//The height of each channel
	var _itemHeight = 30;
	//Left and right sides reserve width
	var _blankLeftWidth = 30;
	var _blankRightWidth = 30;
	//var _blankWidth = 30;
	//Scale width
	var _scaleWidth = 0;
	//scale Area Width
	var _scaleAreaWidth = 0;

	//Canvas Object
	var _context;
	//Canvas jquery Object
	var _canvasObj;
	//pointer Canvas jquery Object
	var _canvasPosObj;
	//node jquery Object
	var _divObj;
	//Move the cursor object
	var _movePointers = [];
	//Click on the object pointer
	var _clickPointers = [];
	//Mobile display the current mouse location corresponding to the object of the time
	var _curTime;
	//Select the 2 choice of the current channel
	var _selectedLines = [];

	//zoom Level
	var _zoomLevel = 0;

	//Mark whether to press the mouse
	var _bMousedown = false;
	//Whether the tag drag
	var _bDrag = false;
	//Relative to the left side of the offset current mouse
	var _scrollX = 0;
	//Relative to the left
	var _leftSpaceWidth = 0;
	//The mouse capture during the offset
	var _offsetLeft = 0;

	//source data
	var _sData = [];
	//Sort the optimized data，
	var _data = [];

	//Whether Synchronous playback
	var _bSync = false;
	//The currently selected point in time  format "hour:minute:second"
	var _strCurSelectTime = "";
	
	//The currently selected channel number
	var _selectedChn = 0;
	//Occasionally mousemove record number, the difference between the mouse click will trigger a mousemove event
	var _mousemoveTimes = 0;

	this.bInit = false;

	//class methods
	// the constructor
	_create(this, options);
	function _create(p, options) {
		_opts = $.extend(_opts, options);
		_blankLeftWidth = _opts.blankLeftWidth;
		_blankRightWidth = _opts.blankRightWidth;
		if (_opts.divId != "") {
			_divObj = $("#" + _opts.divId);
			_divObj.empty();
			document.getElementById(_opts.divId).onselectstart= function(){
				return false;
			};
		} else {
			return false;
		}

		for (var i=0; i<_opts.chnNum; i++) {
			_data[i] = [];
			for(var j=0; j<_opts.dataTypeArr.length; j++){
				_data[i][_opts.dataTypeArr[j]] = [];
			}
		}
		for(var i=0; i<_opts.dataTypeArr.length; i++){
			ColorArr[_opts.dataTypeArr[i]] = _opts.dataTypeColorArr[i];
		}
		
		_sHeight = _divObj.height();
		_sWidth = _divObj.width();
		_itemHeight = (_sHeight - _timeScaleHeight - _bottomBlankHeight) / _opts.chnNum;
		_scaleAreaWidth = _sWidth - _blankLeftWidth - _blankRightWidth;
		_scaleWidth = _scaleAreaWidth / 12;
		p.bInit = _createCanvas();

		_initScale();
		_initData();
		
		_bindEvent();
	};

	function _createCanvas() {
		_canvasObj = $('<canvas id="myCanvas" style="position: absolute;z-index:1;">')
			.appendTo(_divObj)
			.on('mousewheel', function(event) {
				// Require jquery.mousewheel plug-in
				var event = event || window.event;
				if (event.deltaY === 0)
					return;
				if (event.deltaY > 0) {
					_zoom((event.clientX || event.pageX), _zoomLevel + 1);
					event.preventDefault();
				} else {
					_zoom((event.clientX || event.pageX), _zoomLevel - 1);
					event.preventDefault();
				}
		});

		for (var i = 0; i < _opts.chnNum; i++) {
			_movePointers[i] = $('<div class="timeline-movepointer">')
				.css("position", "absolute").css("z-index", 10)
				.css("top", _timeScaleHeight + i * _itemHeight).css("height", _itemHeight)
				.css("width", 1).css("display", "none").css("background-color", "red").appendTo(_divObj);
		}

		for (var i = 0; i < _opts.chnNum; i++) {
			_clickPointers[i] = $('<div class="timeline-clickpointer">')
				.css("position", "absolute").css("z-index", 10)
				.css("top", _timeScaleHeight + i * _itemHeight).css("height", _itemHeight)
				.css("width", 1).css("display", "none").css("background-color", "red").appendTo(_divObj);
		}
		
		_curTime = $('<div id="timeline-curtime" class="timeline-curtime">')
				.css("position", "absolute").css("z-index", 10)
				.css("top", 0).css("width", 48).css("height", 12)
				.css("margin-left", _blankLeftWidth - 48/2)
				.appendTo(_divObj);
				
		for (var i = 0; i < 2; i++) {
			_selectedLines[i] = $('<div class="timeline-selectedlines">')
				.css("position", "absolute").css("z-index", 10)
				.css("top", _timeScaleHeight + i * _itemHeight).css("width", '100%')
				//.css("height", 2).css("display", "none").css("background-color", "rgb(125,125,0)").appendTo(_divObj);
				.css("height", 2).css("display", "none").appendTo(_divObj);//The article selected the progress of the border color
		}

		var canvas = document.getElementById("myCanvas");
		canvas.width = _sWidth;
		canvas.height = _sHeight;
		_context = canvas.getContext("2d");
		if (_context == null)
			return false;

		return true;
	};
	
	function _bindEvent(){
		$("#" + _opts.divId).mousedown(function(event){
			_bMousedown = true;
			_mousemoveTimes = 0;
			var event = event || window.event;
			_scrollX = event.pageX;
			_showClickPointer(event);
		}).mousemove(function(event){
			var event = event || window.event;
			if(_bMousedown){
				_bDrag = true;
				_mousemoveTimes++;
				//console.log("mousemove");
			}
			if (_bDrag) {
				$(this).addClass('timeline-canvas-drag');
				_offsetLeft = event.pageX - _scrollX;
				if(_offsetLeft == 0){
					return;
				}
				if (_leftSpaceWidth + _offsetLeft > 0) {
					_offsetLeft = 0 - _leftSpaceWidth;
					return;
				} else if (_scaleAreaWidth - (_leftSpaceWidth + _offsetLeft) > _scaleWidth * ZoomLevel[_zoomLevel] * 12) {
					_offsetLeft = _scaleAreaWidth - _leftSpaceWidth - _scaleWidth * ZoomLevel[_zoomLevel] * 12;
					return;
				}
				_reDraw();
				_hideClickPointer();
				_hideAllMovePointer();
			}

			_showCurTime(event);
		}).mouseup(function(event){
			$(this).removeClass('timeline-canvas-drag');
			var event = event || window.event;
			if(!_bDrag || _mousemoveTimes<3){
				_clickCallback(event);
			}
			_bMousedown = false;
			_bDrag = false;
			_leftSpaceWidth += _offsetLeft;
			_offsetLeft = 0;
			//console.log("mouseup"+_mousemoveTimes);
			_mousemoveTimes = 0;
			_hideClickPointer();
		}).mouseleave(function(event){
			$(this).removeClass('timeline-canvas-drag');
			var event = event || window.event;
			_bMousedown = false;
			_bDrag = false;
			_leftSpaceWidth += _offsetLeft;
			_offsetLeft = 0;
			//console.log("mouseout");
			_hideClickPointer();
		});
	};

	function _reDraw() {
		_context.clearRect(0, 0, _sWidth, _sHeight);
		_initScale();
		_initData();
	};
	
	function _hideAllMovePointer(){
		for(var i = 0;i < _opts.chnNum;++i){
			_movePointers[i].css("display", "none");
		}
	}

	function _zoom(clientX, level) {
		var level = Math.min(5, Math.max(0, level));
		if (_zoomLevel === level)
			return;
		_hideAllMovePointer();
		var thisX = _divObj.offset().left;
		var offset =  clientX- thisX - _blankLeftWidth + Math.abs(_leftSpaceWidth);
		offset = offset * ZoomLevel[level] / ZoomLevel[_zoomLevel];
		var leftOffset = offset - (clientX - thisX - _blankLeftWidth);
		if(leftOffset > (_scaleWidth * 12 * ZoomLevel[level]- _scaleAreaWidth)){
			_leftSpaceWidth = 0 - (_scaleWidth * 12 * ZoomLevel[level] - _scaleAreaWidth);
		}else if(leftOffset < 0){
			_leftSpaceWidth = 0;
		}else{
			_leftSpaceWidth = 0 - leftOffset;
		}
		_zoomLevel = level;
		_context.clearRect(0, 0, _sWidth, _sHeight);
		_initScale();
		
		_sortData()
		
		_initData();
	};

	function _MaxZero(num) {
		return num > 0 ? 0 : num;
	};

	function _selected(chn) {
		_context.beginPath();
		var font = _context.font;
		var style = _context.fillStyle;
		_context.font = "18px Calibri";
		_context.fillStyle = _opts.fontColor;
		for(var i =0; i<_opts.chnNum; i++){
			if(i == chn){
				_context.fillStyle = "#E7B041";
			}
			_context.clearRect(2, _timeScaleHeight + _itemHeight * i + 2 , _blankLeftWidth-4, _itemHeight - 4);
			_context.fillText("0"+(i+1), 30, _timeScaleHeight + _itemHeight * (i+1) - 5);
			
			_context.fillStyle = style;
			
		}
		_context.font = font;
		_context.stroke();
		_context.closePath();
	};

	function _initScale() {
		_context.beginPath();
		_context.lineWidth = "1";
		_context.strokeStyle = _opts.fontColor;

		//Each scale on the number of minutes
		var mins = 120 / ZoomLevel[_zoomLevel];
		var startMins = 0;
		var nums = 12;
		startMins = mins * Math.ceil(Math.abs(_MaxZero(_leftSpaceWidth + _offsetLeft)) / _scaleWidth);
		if (Math.abs(_MaxZero(_leftSpaceWidth + _offsetLeft)) < 10) {
			//nums = 13;
		}
		if (startMins == 0) {
			nums = 13;
		}

		//Draw the time line
		for (var i = 0, j = 0; j < nums; i++) {
			var xPos = _blankLeftWidth + _scaleWidth * i + _MaxZero(_leftSpaceWidth + _offsetLeft);
			if (xPos < _blankLeftWidth || xPos > (_sWidth - _blankRightWidth)) {
				continue;
			}
			_context.moveTo(xPos - 0.5, _timeScaleHeight - 5);
			_context.lineTo(xPos - 0.5, _timeScaleHeight);
			j++;
		}

		//_context.font = "12px";
		_context.fillStyle = _opts.fontColor;

		for (var i = 0, j = 0; j < nums; i++) {
			var dateText = '';
			var hours = Math.floor(startMins / 60);
			var minutes = startMins - hours * 60;

			if (hours < 10) {
				dateText = "0" + hours + ":";
			} else {
				if(hours == 24 && _opts.b24Hour == false){
					dateText = "00:";
				}else{
					dateText = hours + ":";
				}
			}
			if (minutes < 10) {
				dateText += "0" + minutes;
			} else {
				dateText += minutes;
			}
			var xPos = _blankLeftWidth + _scaleWidth * i + _MaxZero(_leftSpaceWidth + _offsetLeft);
			if (xPos < _blankLeftWidth || xPos > (_sWidth - _blankRightWidth)) {
				continue;
			}
			_context.fillText(dateText, xPos - 14, _timeScaleHeight - 7);
			j++;

			startMins += mins;
		}
		_context.stroke();
		_context.closePath();
	};

	function _initData() {
		_context.beginPath();
		var style = _context.fillStyle;
		for (var chn=0; chn<_opts.chnNum; chn++) {
		for (var i = 0; i < _opts.dataTypeArr.length; i++) {
				for (var j = 0;j<_data[chn][_opts.dataTypeArr[i]].length; j++) {
					/*switch (_opts.dataTypeArr[i]){
						case recTypeEnum.NormalRecord:
						case recTypeEnum.AlarmRecord:
						case recTypeEnum.MotionRecord:
						case recTypeEnum.IORecord:
						case recTypeEnum.INE_ALL_RECORD:
						case recTypeEnum.AllIntelliRec:
							_context.fillStyle = ColorArr[_opts.dataTypeArr[i]];
							break;
						default:
							_context.fillStyle = ColorArr[recTypeEnum.NormalRecord];
							break;
					}*/
					if(bInEnum(_opts.dataTypeArr[i], recTypeEnum)){
						_context.fillStyle = ColorArr[_opts.dataTypeArr[i]];
					}else{
						_context.fillStyle = ColorArr[recTypeEnum.NormalRecord];
					}
					var leftAndWidth = _getLeftAndWidth(_data[chn][_opts.dataTypeArr[i]][j].Begin, _data[chn][_opts.dataTypeArr[i]][j].End);
					var left = leftAndWidth.left + _MaxZero(_leftSpaceWidth + _offsetLeft);
					var width = leftAndWidth.width;
					if (left < _blankLeftWidth) {
						width -= _blankLeftWidth - left;
						if (width < 0) {
							continue;
						}
						left = _blankLeftWidth;
		
					} else if (left > _blankLeftWidth + _scaleAreaWidth) {//111
						continue;
					}  
					if (left + width > _blankLeftWidth + _scaleAreaWidth) {
						width = _blankLeftWidth + _scaleAreaWidth - left;
					}
					_context.clearRect(left, _timeScaleHeight + _itemHeight * chn, width, _itemHeight);
					_context.fillRect(left, _timeScaleHeight + _itemHeight * chn, width, _itemHeight);
				}
			
			}
		}
		_context.fillStyle = style;
		
		//Draw the channel line
		for (var i = 0; i <= _opts.chnNum; i++) {
			_context.moveTo(0, _timeScaleHeight + _itemHeight * i - 0.5*((i+1)%2));
			_context.lineTo(_sWidth, _timeScaleHeight + _itemHeight * i - 0.5*((i+1)%2));
		}
		
		//Drawing on the left side of the line
		if(0){
			_context.moveTo(_blankLeftWidth - 0.5, _timeScaleHeight);
			_context.lineTo(_blankLeftWidth - 0.5, _timeScaleHeight + _itemHeight * _opts.chnNum);
			
			var font = _context.font;
			_context.font = "18px Calibri";
			var style = _context.fillStyle;
			_context.fillStyle = _opts.fontColor;
			for (var i = 1; i <= _opts.chnNum; i++) {
				if(_selectedChn == i-1){
					_context.fillStyle = "#E7B041";
				}else{
					_context.fillStyle = _opts.fontColor;
				}
				_context.fillText("0"+i, 30, _timeScaleHeight + _itemHeight * i - 5);
			}
			_context.fillStyle = style;
			_context.font = font;
		}
		_context.stroke();
		_context.closePath();

	};

	function _getLeftAndWidth(Begin, End) {
		var startSecs = Begin.Hour * 60 * 60 + Begin.Minute * 60 + Begin.Second;
		var endSecs = End.Hour * 60 * 60 + End.Minute * 60 + End.Second;
		
		var left = 0.0001;
		var width = 0.0001;

		left = (startSecs * _scaleWidth) / ((120 / ZoomLevel[_zoomLevel]) * 60);
		width = (endSecs * _scaleWidth) / ((120 / ZoomLevel[_zoomLevel]) * 60) - left;
		return {
			left : left + _blankLeftWidth,
			width : width
		};
	};
	
	function _getDiffTime(preTime, nextTime){
		return ((nextTime.Hour - preTime.Hour)*3600 + (nextTime.Minute - preTime.Minute)*60 + (nextTime.Second - preTime.Second));
	};
	
	function _sortData(){
		for (var i=0; i<_opts.chnNum; i++) {
			_data[i] = [];
			for(var j=0; j<_opts.dataTypeArr.length; j++){
				_data[i][_opts.dataTypeArr[j]] = [];
			}
		}
		if(_sData.length == 0)
			return;
		
		//A pixel corresponds to the number of seconds
		var sPx = 60 * 120 / ZoomLevel[_zoomLevel] /_scaleWidth;
		var tempRecordData = [];
		$.extend(true, tempRecordData, _sData);
		for(var i=0; i<tempRecordData.length; i++){
			var dataTemp = tempRecordData[i];
			if(_opts.optimizeData){
				if((_data[dataTemp.chn][dataTemp.Type]).length > 0){
					var bDelete = false;
					for (var k=0; k<_opts.dataTypeArr.length; k++) {
						if(_data[dataTemp.chn][_opts.dataTypeArr[k]].length > 0){
							if(_getDiffTime(_data[dataTemp.chn][_opts.dataTypeArr[k]][(_data[dataTemp.chn][_opts.dataTypeArr[k]]).length-1].End, dataTemp.End) < 0){
								bDelete = true;
							}
						}
					}
					if(bDelete){
						continue;
					}
					var secs = _getDiffTime(_data[dataTemp.chn][dataTemp.Type][(_data[dataTemp.chn][dataTemp.Type]).length-1].End, dataTemp.Begin);
						if(secs < 2*sPx){
						if(_getDiffTime(_data[dataTemp.chn][dataTemp.Type][(_data[dataTemp.chn][dataTemp.Type]).length-1].End, dataTemp.End) < 0){//if preTime End is bigger taner curTime End，set preTime End
							_data[dataTemp.chn][dataTemp.Type][(_data[dataTemp.chn][dataTemp.Type]).length-1].End = _data[dataTemp.chn][dataTemp.Type][(_data[dataTemp.chn][dataTemp.Type]).length-1].End;
							}else{
							_data[dataTemp.chn][dataTemp.Type][(_data[dataTemp.chn][dataTemp.Type]).length-1].End = dataTemp.End;
							}
							continue;
					}
				}
			}
				
			_data[dataTemp.chn][dataTemp.Type].push(dataTemp);
		}
	};

	function _showCurTime(event) {
		var thisX =	_divObj.offset().left;
		var thisY = _divObj.offset().top;
		var scrollLeft = getScrollLeft();
		var pointerPos = scrollLeft + (event.clientX || event.pageX) - thisX - _blankLeftWidth - _leftSpaceWidth -  _offsetLeft;
		
		if (pointerPos < _offsetLeft - _leftSpaceWidth) {
			pointerPos = _offsetLeft - _leftSpaceWidth;
		} else if (pointerPos > (_scaleAreaWidth - _leftSpaceWidth)) {
			pointerPos = _scaleAreaWidth - _leftSpaceWidth;
		}
		var seconds = pointerPos * (60 * 120 / ZoomLevel[_zoomLevel]) / _scaleWidth;
		var Hour = seconds / 3600;
		var Minute = (seconds - Math.floor(Hour) * 3600) / 60;
		var Second = seconds - Math.floor(Hour) * 3600 - Math.floor(Minute) * 60;
		
		var strCurTime = "";
		if(Math.floor(Hour) < 10)
			strCurTime += "0" + Math.floor(Hour) + ":";
		else{
			if(Math.floor(Hour)==24){
				strCurTime += "00:";
			}else{
				strCurTime += Math.floor(Hour) + ":";
			}
		}
		if(Math.floor(Minute) < 10)
			strCurTime += "0" + Math.floor(Minute) + ":";
		else
			strCurTime += Math.floor(Minute) + ":";
		if(Math.floor(Second) < 10)
			strCurTime += "0" + Math.floor(Second);
		else
			strCurTime += Math.floor(Second);
			
		_strCurSelectTime = strCurTime;
		var marginLeft = scrollLeft + (event.clientX || event.pageX) - thisX;
		if(marginLeft < _blankLeftWidth)
			marginLeft = _blankLeftWidth;
		else if(marginLeft > _scaleAreaWidth + _blankLeftWidth)
			marginLeft = _scaleAreaWidth + _blankLeftWidth;

		_curTime.show();
		_curTime.css("margin-left", marginLeft - _curTime.width()/2);
		_curTime.text(strCurTime);
		
	};

	function _showClickPointer(event) {
		//var thisX = _canvasObj.get(0).offsetLeft;
		var thisX =	_divObj.offset().left;
		var thisY = _divObj.offset().top;
		var scrollLeft = getScrollLeft();
		var scrollTop = getScrollTop();
		var pointerPos = scrollLeft + (event.clientX || event.pageX) - thisX - _blankLeftWidth;

		if (pointerPos < 0 || pointerPos > (_scaleAreaWidth)) {
			return;
		}

		if(_bSync) {
			for (var i=0; i<_opts.chnNum; i++) {
				_clickPointers[i].css("display", "block").css("margin-left", pointerPos + _blankLeftWidth);
			}
		} else {
			var chn = _findPointerY((event.clientY || event.pageY) - thisY + scrollTop);
			if (chn != -1) {
				_clickPointers[chn].css("display", "block").css("margin-left", pointerPos + _blankLeftWidth);
			}
		}
	};
	
	function _clickCallback(event){
		//var thisY = _canvasObj.get(0).offsetTop;
		var thisX =	_divObj.offset().left;
		var thisY = _divObj.offset().top;
		var scrollTop = getScrollTop();
		var scrollLeft = getScrollLeft();
		var marginLeft = scrollLeft + (event.clientX || event.pageX) - thisX;
		var bInZone = false;//Click on whether in the middle area
		if(marginLeft >= _blankLeftWidth && marginLeft <= _scaleAreaWidth + _blankLeftWidth)
			bInZone = true;
		var chn = _findPointerY((event.clientY || event.pageY) - thisY + scrollTop);
		if (chn != -1) {
			_opts.clickCallback(chn, _strCurSelectTime, bInZone);
			if(0){
				_selected(chn);
			}
			_selectedChn = chn;
		}
	};

	function _hideClickPointer() {
		for (var i = 0; i < _opts.chnNum; i++) {
				_clickPointers[i].css("display", "none");
			}
	};

	function _findPointerY(height) {
		if (height > _timeScaleHeight && height < (_sHeight - _bottomBlankHeight)) {
			return Math.floor((height - _timeScaleHeight) / _itemHeight);
		} else {
			return -1;
		}
	};
	
	this.initData = function(data) {
		try{
			if (typeof(data) != "undefined" && !$.isArray(data))
				return;
			if(typeof(data) == "undefined"){
				data = [];
			}
			_sData = data;
			
			_sortData();
			_reDraw();
		}catch(e){
			//TODO handle the exception
			if(window.console){
				console.log("Timeline initData error!");
			}
		}
		
	};
	
	this.setSync = function(bSync) {
		_bSync = bSync;
	};
	
	this.setCurChn = function(chn) {
		if(chn<0 || chn >= _opts.chnNum){
			_selectedLines[0].css("display","none");
			_selectedLines[1].css("display","none");
			return;
		}
			
		_selectedChn = chn;
		_selectedLines[0].css("display","block").css("top",_timeScaleHeight+chn*_itemHeight+"px");
		_selectedLines[1].css("display","block").css("top",_timeScaleHeight+(chn+1)*_itemHeight+"px");
		//_selected(chn);
		//_curDiv.css("display","block").css("top", _timeScaleHeight+chn*_itemHeight+"px");
	};
	
	this.resize = function(){
		_sHeight = _divObj.height();
		_sWidth = _divObj.width();
		_itemHeight = (_sHeight - _timeScaleHeight - _bottomBlankHeight) / _opts.chnNum;
		_scaleAreaWidth = _sWidth - _blankLeftWidth - _blankRightWidth;
		_scaleWidth = _scaleAreaWidth / 12;
		_canvasObj.attr("width", _sWidth);
		_canvasObj.attr("height", _sHeight);
		_reDraw();
	};
	
	this.showMovePointer = function(data) {
		try{
			var seconds = data.date.hours * 60 * 60 + data.date.minutes * 60 + data.date.seconds;
			var pointerPos = seconds * _scaleWidth / (60 * 120 / ZoomLevel[_zoomLevel]);
			if(((pointerPos - Math.abs(_leftSpaceWidth)) > 0) && 
				((pointerPos - Math.abs(_leftSpaceWidth)) < _scaleAreaWidth) &&
				!_bDrag){
					if(_opts.chnNum == 1){
						_movePointers[0].css("display", "block").css("margin-left", pointerPos - Math.abs(_leftSpaceWidth) + _blankLeftWidth);
					}else{
						_movePointers[data.chn].css("display", "block").css("margin-left", pointerPos - Math.abs(_leftSpaceWidth) + _blankLeftWidth);
					}
			}else{
				if(_opts.chnNum == 1){
					_movePointers[0].css("display", "none");
				}else{
					_movePointers[data.chn].css("display", "none");
				}
				
			}
		}catch(e){
			//TODO handle the exception.
			if(window.console){
				console.log("Timeline showMovePointer error!");
			}
		}
	};
	this.hideMovePointer = function(chn) {
		if(chn<0 || chn >= _opts.chnNum){
			return;
		}
		_movePointers[chn].css("display", "none");
	};
	
	this.zoomIn = function() {
		//The currently displayed are move the cursor to move the cursor to zoom in，And will be subject to the middle area
		if(_movePointers[_selectedChn].css("display") == "block"){
			_zoom(_movePointers[_selectedChn].offset().left,_zoomLevel+1);
		}else{
			_zoom(_divObj.offset().left+_blankLeftWidth+_scaleAreaWidth/2,_zoomLevel+1);
		}
		
	};
	
	this.zoomOut = function() {
		//The currently displayed are move the cursor to move the cursor to zoom in，And will be subject to the middle area
		if(_movePointers[_selectedChn].css("display") == "block"){
			_zoom(_movePointers[_selectedChn].offset().left,_zoomLevel-1);
		}else{
			_zoom(_divObj.offset().left+_blankLeftWidth+_scaleAreaWidth/2,_zoomLevel-1);
		}
	};
	
	//Set up a video type color
	this.setColor = function(type,color){
		if(typeof ColorArr[type] != 'undefined'){
			ColorArr[type] = color;
		}
	}
};

function bInEnum(value, enumObj){
	for(var i in enumObj){
		if(value == enumObj[i]){
			return true;
		}
	}
	return false;
}

