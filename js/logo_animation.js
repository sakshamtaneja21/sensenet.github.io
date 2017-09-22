var draw = SVG('drawing').size(660, 400);

var left_triangle = draw.polygon('0,0 146,86 0,171')
left_triangle.fill('#0b9dbf');

var left_triangle_little = draw.polygon('0,0 146,86 0,171')
left_triangle_little.fill('#fff').scale(0.3, 0.3).move(-64,0);

var right_triangle = draw.polygon('0,0 146,86 0,171')
right_triangle.fill('#0b9dbf').move(214, 228).scale(-1, -1);

var right_triangle_little = draw.polygon('0,0 146,86 0,171')
right_triangle_little.fill('#fff').move(234, 228).scale(-1, -1).scale(0.3, 0.3);

var group_left = draw.group();
group_left.add(left_triangle);
group_left.add(left_triangle_little);
group_left.center(200, 200);

var group_right = draw.group();
group_right.add(right_triangle);
group_right.add(right_triangle_little);
group_right.center(-13, -28).scale(-1, -1);


var rect_left1 = draw.polygon('0,0 32,19 32,19 0,0')
rect_left1.fill('#0b9dbf');

var rect_left2 = draw.polygon('0,400 0,360 0,360 0,400')
rect_left2.fill('#0b9dbf');

var rect_left3 = draw.polygon('95,158 65,176 65,176 95,158')
rect_left3.fill('#0b9dbf');

var rect_left4 = draw.polygon('65,277 65,248 65,248 65,277')
rect_left4.fill('#0b9dbf');


var rect_right1 = draw.polygon('360,400 329,380 329,380 360,400');
rect_right1.fill('#0b9dbf');

var rect_right2 = draw.polygon('360,0 360,40 360,40 360,0');
rect_right2.fill('#0b9dbf');

var rect_right3 = draw.polygon('264,242 295,224 295,224 264,242')
rect_right3.fill('#0b9dbf');

var rect_right4 = draw.polygon('295,115 295,147 295,147 295,115')
rect_right4.fill('#0b9dbf');

var group_whole = draw.group();
group_whole.add(group_left);
group_whole.add(group_right);
group_whole.add(rect_left1);
group_whole.add(rect_right1);
group_whole.add(rect_left2);
group_whole.add(rect_right2);
group_whole.add(rect_left3);
group_whole.add(rect_right3);
group_whole.add(rect_left4);
group_whole.add(rect_right4);
group_whole.center(330, 200);

//var rect = draw.circle(4).fill('#f06').center(180, 200);
function animate(){

	group_left.animate(1800,'swingFromTo', 1000).rotate(720, 50, 86).animate(500,'cubicInOut', 0).move(0, 0);
	group_right.animate(1800,'swingFromTo', 1000).rotate(720, 310, 314).animate(500,'cubicInOut', 0).move(0, 0);

	rect_left1.animate(300,'cubicInOut', 3300).attr('points', '0,0 32,19 32,381 0,400');
	rect_right1.animate(300,'cubicInOut', 3300).attr('points', '360,400 329,380 329,19 360,0');

	rect_left2.animate(300,'cubicInOut', 3600).attr('points', '0,400 0,360 295,190 295,224');
	rect_right2.animate(300,'cubicInOut', 3600).attr('points', '360,0 360,40 65,210 65,176');

	rect_left3.animate(300,'cubicInOut', 3900).attr('points', '95,158 65,176 65,277 95,260');													 
	rect_right3.animate(300,'cubicInOut', 3900).attr('points', '264,242 295,224 295,115 264,133');

	rect_left4.animate(300,'cubicInOut', 4200).attr('points', '65,277 65,248 295,115 295,147');
	rect_right4.animate(300,'cubicInOut', 4200).attr('points', '295,115 295,147 65,277 65,248').afterAll(function() {
	  animate_rev();
	});

	//group_whole.animate(500,'cubicInOut', 9800).scale(1, 0);

}


function animate_rev(){

	var delay = 5000;

	rect_left4.animate(300,'cubicInOut', delay).attr('points', '65,277 65,248 65,248 65,277');
	rect_right4.animate(300,'cubicInOut', delay).attr('points', '295,115 295,147 295,147 295,115');

	rect_left3.animate(300,'cubicInOut', delay+300).attr('points', '95,158 65,176 65,176 95,158');													 
	rect_right3.animate(300,'cubicInOut', delay+300).attr('points', '264,242 295,224 295,224 264,242');

	rect_left2.animate(300,'cubicInOut', delay+600).attr('points', '0,400 0,360 0,360 0,400');
	rect_right2.animate(300,'cubicInOut', delay+600).attr('points', '360,0 360,40 360,40 360,0');

	rect_left1.animate(300,'cubicInOut', delay+900).attr('points', '0,0 32,19 32,19 0,0');
	rect_right1.animate(300,'cubicInOut', delay+900).attr('points', '360,400 329,380 329,380 360,400');

	group_left.animate(1500,'backInOut', delay+1100).move(128, 114).rotate(720, 50, 86);
	group_right.animate(1500,'backInOut', delay+1100).move(-132, -114).rotate(-900, 310, 314).afterAll(function() {
		animate();
	});

}