	var canvas = document.getElementById("canvas");

	var ctx = canvas.getContext("2d");
	var radius = canvas.height / 2;
	ctx.translate(radius, radius);
	radius *= 0.9;

	setInterval(drawClock, 1);

	function drawClock() {
		ctx.arc(0, 0, radius, 0, 2*Math.PI);
		ctx.fillStyle = "black";
		ctx.fill();
	 	ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 2*Math.PI);
		ctx.fillStyle = 'black';
		ctx.fill();
		drawNumbers(ctx, radius);
		drawTime(ctx);
	}

	function drawTime() {
		var d = new Date(),
			hour = d.getHours(),
			minute = d.getMinutes(),
			second = d.getSeconds();

		hour %= 12; // convert to 12 hour time
		//	6 hours in 1 half,	6*60 mins in 1 half, 6*60*60 secs in 1 half
	    hour=(hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
	    drawHand(hour, radius*0.4, radius*0.02);
	    //	30 mins in 1 half, 30*60 secs in 1 half
	    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
	    drawHand(minute, radius*0.7, radius*0.02);
	    //	30 seconds in 1 half
	    second=(second*Math.PI/30);
	    drawHand(second, radius*0.9, radius*0.02);
	}

	function drawNumbers(ctx, radius) {
	    var ang;
	    var num;
	    ctx.font = radius*0.10 + "px consolas";
	    ctx.textBaseline="middle";
	    ctx.textAlign="center";
	    for(num= 1; num < 13; num++){
	        ang = num * Math.PI / 6;
	        ctx.rotate(ang);
	        ctx.translate(0, -radius*1);
	        ctx.rotate(-ang);
	        ctx.fillStyle = "white";
	        ctx.fillText(num.toString(), 0, 0);
	        ctx.rotate(ang);
	        ctx.translate(0, radius*1);
	        ctx.rotate(-ang);
	    }
	}

	function drawHand(pos, length, width) {
		ctx.beginPath();
	    ctx.lineWidth = width;
	    ctx.moveTo(0,0);
	    ctx.rotate(pos);
	    ctx.lineTo(0, -length);
	    ctx.strokeStyle = "#FFF";
	    ctx.stroke();
	    ctx.rotate(-pos);
	}