//Hide Play button when Pause is pressed and vice versa
//Fix the none number values entered by the user
//Reset the canvas after each change of iterations

window.addEventListener("load", eventWindowLoaded, false);

//Variable which functions needs to reset with change of itterations
var globalresetmesetupTheCanvas;

var Debugger = function () { };
Debugger.log = function (message) {
	try {
		console.log(message);
	} catch (exception) {
		return;
	}
}



function eventWindowLoaded () {
	canvasApp();
	//alert ();
	//canvasSupport();
}


function canvasSupport(){
	return Modernizr.canvas;
}


function canvasApp(){
	
	if (!canvasSupport()){
		return;
	}else{
		//This enables full screen mode for Android phones
		setTimeout(function() { window.scrollTo(0, 1); }, 1);

		//Hide play button
		$("#Play").hide();
		$("#DebugMe").hide();

		//var theCanvas = document.getElementById("canvas1");
		var theCanvas = document.createElement("canvas");
		theCanvas.width=$(window).width()-5;
		theCanvas.height=$(window).height()-28;
		theCanvas.id = "canvas1";
		theCanvas.style.zIndex = 1;
		var context = theCanvas.getContext("2d");

		document.body.appendChild(theCanvas);	

		//context.globalCompositeOperation = 'source-over';
		//context.globalCompositeOperation = 'destination-over';
		//context.globalCompositeOperation = 'lighter';
		//context.globalCompositeOperation = 'xor';

		//Make Changes Here
		//context.fillStyle = "#eef211";
		//context.fillRect(0,0,theCanvas.width,theCanvas.height);

		var theTitle = getUrlVars()["title"];
		//var theTitle = decodeURI (theTitle);
		if (theTitle==undefined) {
			theTitle="Motion Design's Studio";
		}

		//Strip out the weird characters
		theTitle = theTitle.replace(/%20/g, " ");
		theTitle = theTitle.replace(/%27/g, "'");
		
		//Embeded font here
		context.font="30px MyriadPro-Bold";
		context.textBaseline = 'top';
		context.fillStyle = '#585858';
		context.fillText(theTitle,10,10);
		//I saved this state for branding purpose
		//context.save();

		//box
		//context.strokeStyle ="#000000";
		//context.strokeRect (1,1, theCanvas.width-2, theCanvas.Height-2);	


		var formElement = document.getElementById("createImageData");
		formElement.addEventListener('click', createImageDataPressed, false);

		var formElement = document.getElementById("Pause");
		formElement.addEventListener('click', Pause, false);

		var formElement = document.getElementById("Play");
		formElement.addEventListener('click', Play, false);

		var formElement = document.getElementById("DebugMe");
		formElement.addEventListener('click', DebugMe, false);


	}


	//Assign a starting value to the how many times itteration 
	document.getElementById("howManyIterations").value =1100;
	var numberOfIterations=document.getElementById("howManyIterations").value;
	//Debugger.log (document.getElementById("howManyIterations").value);
	
	//document.getElementById("mainMenuForm").elements.namedItem("howManyIterations").value;

	var speed = randomFromTo(8,30);
	//var points = new Array();
	var globalCompositeOperationArray = ['source-over', 'destination-over', 'lighter', 'xor'];
	context.globalCompositeOperation = globalCompositeOperationArray [Math.round((Math.random()*3))];

	//This sets the largest diameter for the object based on the display area.
	var maxDiameterOfObject=$(window).height()*.2;
	var diameterOfBall=randomFromTo(8,maxDiameterOfObject);
	//var diameterOfBall=15;

	var angle = randomFromTo(20,50);
	var radians = 0;

	var p1 = {x:randomFromTo(diameterOfBall*3,(theCanvas.width-(diameterOfBall*3))), y:randomFromTo(diameterOfBall*3,(theCanvas.height-(diameterOfBall*3)))};  

	//var p1 = {x:0, y:0}; 

	var xunits= 0;
	var yunits= 0;
	var ball = {x:p1.x, y:p1.y};

	var theRed =Math.round((Math.random()*255));
	var goOtherWayRed=randomFromTo(3,30);
	var theGreen =Math.round((Math.random()*255));
	var goOtherWayGreen=randomFromTo(3,30);
	var theBlue =Math.round((Math.random()*255));
	var goOtherWayBlue=randomFromTo(3,30);
	var theAlpha =0;

	var colorString="";

	var dohowmanytimes=1;
	var counterHowManyTimesdrawnScreenCalled=0;

	var testHowManyTimesOutOfTheCanvasDisplayArea=0;

	var changeTheSize=randomFromTo(0,1);
	//var changeTheSize=0;
	var currentDiameterOfBall=diameterOfBall;
	var goOtherWayCurrentDiameterOfBall=1; 

	//var shouldObjectsBeRandom=0;
	var shouldObjectsBeRandom=randomFromTo(0,1);
	//var doOnceConstantShape=1;

	var myShape=randomFromTo(0,8);
	//var myShape=randomFromTo(3,3);

	var myrequestanimationvariable;

	var grayscaleColorOrMixed=randomFromTo(0,2);
	//var grayscaleColorOrMixed=randomFromTo(1,1);
	//var amIstuckOnTheSameAxis=0;

	var objectOnscreen1;
	//The following two variables are apart of the check to see if the object is stuck on a axis
	var testForTrappedAlongAxis=new Array (60); 
	var counterNumberInstances=0;


	updateBall();

	function updateBall(){//This function inits properties for the ball
		radians = angle * Math.PI/180;
		xunits= Math.cos(radians)*speed;
		yunits= Math.sin(radians)*speed;
		//Debugger.log ("radians : " + radians);
	}

	globalresetmesetupTheCanvas= function setupTheCanvas(){//This function inits properties for the canvas
		//Start completely removing and adding the canvas
		$(theCanvas).remove();
		theCanvas = document.createElement("canvas");
		theCanvas.width=$(window).width()-5;
		theCanvas.height=$(window).height()-28;
		theCanvas.id = "canvas1";
		theCanvas.style.zIndex = 1;
		context = theCanvas.getContext("2d");
		document.body.appendChild(theCanvas);
		//End completely removing and adding the canvas
		
		//context.clearRect(0, 0, theCanvas.width,theCanvas.height);
		context.font="30px MyriadPro-Bold";
		context.textBaseline = 'top';
		context.fillStyle = '#585858';
		context.fillText(theTitle,10,10);

		counterHowManyTimesdrawnScreenCalled=0;
		p1 = {x:randomFromTo(diameterOfBall*3,(theCanvas.width-(diameterOfBall*3))), y:randomFromTo(diameterOfBall*3,(theCanvas.height-(diameterOfBall*3)))}; 
		ball = {x:p1.x, y:p1.y};
		ball = {x:p1.x, y:p1.y};
		speed = randomFromTo(8,30);
		diameterOfBall=randomFromTo(8,maxDiameterOfObject);
		angle = randomFromTo(20,50);
		context.globalCompositeOperation = globalCompositeOperationArray [Math.round((Math.random()*3))];
		
		//Make changes here for the background color
		//context.fillStyle = "#eef211";
		//context.fillRect(0,0,theCanvas.width,theCanvas.height);
		theRed =Math.round((Math.random()*255));
		theGreen =Math.round((Math.random()*255));
		theBlue =Math.round((Math.random()*255));
		goOtherWayRed=randomFromTo(3,30);
		goOtherWayGreen=randomFromTo(3,30);
		goOtherWayBlue=randomFromTo(3,30);
		currentDiameterOfBall=diameterOfBall; //This is needed so the variable is not larger
		//than new random diameter of the ball
		changeTheSize=randomFromTo(0,1);//This will randomize the change of size each redraw

		shouldObjectsBeRandom=randomFromTo(0,1);//This will randomize the objects
		//shouldObjectsBeRandom=randomFromTo(0,0);//This will randomize the objects
		//doOnceConstantShape=1; //I must reset this variable each time incase the code selects a constant shape
		myShape=randomFromTo(0,8); //This will select one random object shape
		//myShape=randomFromTo(3,3); //This will select one random object shape

		grayscaleColorOrMixed=randomFromTo(0,2);//This sets the colors to grayscale or color
		//amIstuckOnTheSameAxis=0;
		colorString="";
		//This sets the largest diameter for the object based on the display area.
		maxDiameterOfObject=$(window).height()*.2;

		//numberOfIterations=document.getElementById("howManyIterations").value;

		if (document.getElementById("howManyIterations").value>0){
			numberOfIterations=document.getElementById("howManyIterations").value;
		}
		
	}

	//Beging this class with properties and methods for the object being drawn
	var objectOnscreen= function (diameterOfObject, colorOfObject, xLocation, yLocation){
		//Debugger.log ("");
		objectOnscreen.prototype.drawCircularObject= function(){
			context.fillStyle = colorOfObject;
			context.beginPath();
			context.arc (xLocation ,yLocation , diameterOfObject,0, Math.PI*2, true);
			context.closePath();
			context.fill();
		};

		objectOnscreen.prototype.drawCircularObjectWithStroke= function(){
			context.fillStyle = colorOfObject;
			context.beginPath();
			context.arc (xLocation ,yLocation , diameterOfObject,0, Math.PI*2, true);
			context.closePath();
			context.fill();
			//Add stroke
		      	context.lineWidth = 1;
		     	context.strokeStyle = '#000000';
		      	context.stroke();
		};

		objectOnscreen.prototype.drawSquareObjectNoFill= function(){
			context.beginPath();
			context.lineWidth="4";
			context.strokeStyle=colorOfObject;
			context.rect(xLocation-(diameterOfObject*.5), yLocation-(diameterOfObject*.5) ,diameterOfObject,diameterOfObject); 
			context.stroke();
		};

		objectOnscreen.prototype.drawSquareObjectFill= function(){
			context.fillStyle=colorOfObject;
			context.fillRect(xLocation-(diameterOfObject*.5), yLocation-(diameterOfObject*.5) ,diameterOfObject,diameterOfObject); 
			context.stroke();
		};

		
		objectOnscreen.prototype.drawRandomNumberOfPointsStar= function(){
			var randomNumberOfPoints=randomFromTo(10,20);
			context.beginPath();
			context.fillStyle=colorOfObject;
			for (var ixVertex = 0; ixVertex <= 2 * randomNumberOfPoints; ++ixVertex) {
			var theAngle = ixVertex * Math.PI / randomNumberOfPoints - Math.PI / 2;
			var theRadius = ixVertex % 2 == 0 ? diameterOfObject : diameterOfObject*.4;
			context.lineTo(xLocation + theRadius * Math.cos(theAngle), yLocation + theRadius * Math.sin(theAngle));
			}
		    	context.fill();

		};

		objectOnscreen.prototype.drawConstantNumberOfPointsStar= function(){
			var constantNumberOfPoints=5;
			context.beginPath();
			context.fillStyle=colorOfObject;
			for (var ixVertex = 0; ixVertex <= 2 * constantNumberOfPoints; ++ixVertex) {
			var theAngle = ixVertex * Math.PI / constantNumberOfPoints - Math.PI / 2;
			var theRadius = ixVertex % 2 == 0 ? diameterOfObject : diameterOfObject*.4;
			//context.lineTo(xLocation + radius * Math.cos(angle), yLocation + radius * Math.sin(angle));
			context.lineTo(xLocation + theRadius * Math.cos(theAngle), yLocation + theRadius * Math.sin(theAngle));
			}
		    	context.fill();

		};

		objectOnscreen.prototype.drawPentagon= function(){
			var constantNumberOfPoints=5;
			context.beginPath();
			context.fillStyle=colorOfObject;
			for (var ixVertex = 0; ixVertex <= 2 * constantNumberOfPoints; ++ixVertex) {
			var theAngle = ixVertex * Math.PI / constantNumberOfPoints - Math.PI / 2;
			var theRadius = ixVertex % 2 == 0 ? diameterOfObject : diameterOfObject*.8;
			context.lineTo(xLocation + theRadius * Math.cos(theAngle), yLocation + theRadius * Math.sin(theAngle));
			}
		    	context.fill();

		};

		objectOnscreen.prototype.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandom= function(){
			var theDiameter =diameterOfObject;
			var xpos;
			var ypos;
			var theAngle=0.0;
			var angleSteps=Math.random();
			var radiusSteps= randomFromTo(3,9);
			var diameterRateOfChange=randomFromTo(1,3);
			var numberOfCircles=Math.round(theDiameter/radiusSteps);
			var counter =0;

			while (theDiameter>0){	
				tmp=numberOfCircles-counter;
				xpos= theDiameter * Math.cos (theAngle);
				ypos= theDiameter * Math.sin (theAngle);
				var objectOnscreen1 = new objectOnscreen(tmp*diameterRateOfChange, colorOfObject, xLocation+xpos, yLocation+ypos);
				objectOnscreen1.drawCircularObjectWithStroke();
				theAngle+=angleSteps;
				theDiameter-=radiusSteps;
				//Debugger.log ("counter : " + counter);
				counter++;
			
			} 

		};


		objectOnscreen.prototype.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandomColorChange= function(){
			var theDiameter =diameterOfObject;
			var xpos;
			var ypos;
			var theAngle=0.0;
			var angleSteps=Math.random();
			var radiusSteps= randomFromTo(3,9);
			var diameterRateOfChange=randomFromTo(1,3);
			var numberOfCircles=Math.round(theDiameter/radiusSteps);
			var counter =0;

			var theRedInternal=theRed;
			var theGreenInternal=theGreen;
			var theBlueInternal=theBlue;

			while (theDiameter>0){	

				//This will set the color transformation to grayscale or color
				if (grayscaleColorOrMixed==1){
		
					theRedInternal= theRedInternal+goOtherWayRed;
					if (theRedInternal > 254){
						goOtherWayRed=goOtherWayRed*-1;
					}else if (theRedInternal < 1){
						goOtherWayRed=goOtherWayRed*-1;
					}

					colorString="rgba("+ theRedInternal+ ","+theRedInternal+","+theRedInternal+", 1)";
			
				}else{
					theRedInternal= theRedInternal+goOtherWayRed;
					if (theRedInternal > 254){
						goOtherWayRed=goOtherWayRed*-1;
					}else if (theRedInternal < 1){
						goOtherWayRed=goOtherWayRed*-1;
					}

					theGreenInternal= theGreenInternal+goOtherWayGreen;
					if (theGreenInternal > 254){
						goOtherWayGreen=goOtherWayGreen*-1;
					}else if (theGreenInternal < 1){
						goOtherWayGreen=goOtherWayGreen*-1;
					}

					theBlueInternal= theBlueInternal+goOtherWayBlue;
					if (theBlueInternal > 254){
						goOtherWayBlue=goOtherWayBlue*-1;
					}else if (theBlueInternal < 1){
						goOtherWayBlue=goOtherWayBlue*-1;
					}

					colorString="rgba("+ theRed+ ","+theGreen+","+theBlue+", 1)";

				}

				tmp=numberOfCircles-counter;
				xpos= theDiameter * Math.cos (theAngle);
				ypos= theDiameter * Math.sin (theAngle);
				var objectOnscreen1 = new objectOnscreen(tmp*diameterRateOfChange, colorString, xLocation+xpos, yLocation+ypos);
				objectOnscreen1.drawCircularObjectWithStroke();
				theAngle+=angleSteps;
				theDiameter-=radiusSteps;
				//Debugger.log ("counter : " + counter);
				counter++;
			
			} 

		};

		

	};///End this class with properties and methods for the object being drawn


	//Begin Class with animation engine
	var animationEngine= function (){
		//Debugger.log ("");
		animationEngine.prototype.angleOfIncidence= function(){
			//Begin check for angle and collision with the wall and redirect the object
			if (ball.x+currentDiameterOfBall*1 > theCanvas.width || ball.x-currentDiameterOfBall-1 <0) {
				angle = 180 - angle;
				updateBall();
			}else if (ball.y+currentDiameterOfBall*1 > theCanvas.height || ball.y-currentDiameterOfBall-1 < 0) {
				angle = 360 -angle;
				updateBall();
			} 
			//End check for angle and collision with the wall and redirect the object

			ball.x+= xunits;
			ball.y+= yunits;

			//Start check if object is trapped on a axis
			testForTrappedAlongAxis.unshift (Math.round(ball.x));
			testForTrappedAlongAxis.unshift (Math.round(ball.y));

			testForTrappedAlongAxis.length=60;

			function countHowManyDuplicateInstancesOfNumber(){

				for (var i=2; i< testForTrappedAlongAxis.length; i++){
					if (testForTrappedAlongAxis[0]==testForTrappedAlongAxis[i]){
						counterNumberInstances++;
					}
					if (testForTrappedAlongAxis[1]==testForTrappedAlongAxis[i]){
						counterNumberInstances++;
					}
				if (counterNumberInstances > 14){
					// 14 is special because within a 60 element array I noticed
					//this pattern 578,1023,573,1029,568,1023,
					//1023 can will occur 15 times max
					ball.x=randomFromTo(currentDiameterOfBall*3,(theCanvas.width-(currentDiameterOfBall*3)));
					ball.y=randomFromTo(currentDiameterOfBall*3,(theCanvas.height-(currentDiameterOfBall*3)));
					break;
				}

				}
			}

			countHowManyDuplicateInstancesOfNumber();
			counterNumberInstances=0;
			//End check if object is trapped on a axis

			//Start check if circle is out of the canvas display area.	
			if (ball.x<0 || ball.x>theCanvas.width){
				ball.x=randomFromTo(currentDiameterOfBall*3,(theCanvas.width-(currentDiameterOfBall*3)));
			}

			if (ball.y<0 || ball.y>theCanvas.height){
				ball.y=randomFromTo(currentDiameterOfBall*3,(theCanvas.height-(currentDiameterOfBall*3)));
			}
			//End check if circle is out of the canvas display area.

			//Draw object(s) to the screen
			objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, colorString, ball.x, ball.y);
		};

		animationEngine.prototype.angleOfIncidenceWithOrbitingObject= function(){
			//Begin check for angle and collision with the wall and redirect the object
			if (ball.x+currentDiameterOfBall*1 > theCanvas.width || ball.x-currentDiameterOfBall-1 <0) {
				angle = 180 - angle;
				updateBall();
			}else if (ball.y+currentDiameterOfBall*1 > theCanvas.height || ball.y-currentDiameterOfBall-1 < 0) {
				angle = 360 -angle;
				updateBall();
			} 
			//End check for angle and collision with the wall and redirect the object

			ball.x+= xunits;
			ball.y+= yunits;

			//Start check if circle is out of the canvas display area.	
			if (ball.x<0 || ball.x>theCanvas.width){
				ball.x=randomFromTo(currentDiameterOfBall*3,(theCanvas.width-(currentDiameterOfBall*3)));
			}

			if (ball.y<0 || ball.y>theCanvas.height){
				ball.y=randomFromTo(currentDiameterOfBall*3,(theCanvas.height-(currentDiameterOfBall*3)));
			}
			//End check if circle is out of the canvas display area.
			//This will do the orbiting
			var theDiameter = 100;
			var xpos;
			var ypos;
			var theAngle=0.0;
			var angleSteps=0.6;
			xpos= theDiameter * Math.cos (theAngle);
			ypos= theDiameter * Math.sin (theAngle);
			//Draw object(s) to the screen
			objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, colorString, ball.x+xpos, ball.y+ypos);
			theAngle+=angleSteps;
		};

	
	}//End Class with animation engine

	
	//drawMeACircle ();

	function drawMeACircle (){
		var theDiameter = 100;
		var xpos;
		var ypos;
		var theAngle=0.0;
		var angleSteps=0.6;

		while (theAngle<2*Math.PI){
			xpos= theDiameter * Math.cos (theAngle);
			ypos= theDiameter * Math.sin (theAngle);
			//var objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, "rgba(100,200,250, 1)", 100+xpos, 200+ypos);
			var objectOnscreen1 = new objectOnscreen(10, "rgba(100,200,250, 1)", 200+xpos, 200+ypos);
			objectOnscreen1.drawCircularObject();
			theAngle+=angleSteps;
			//Debugger.log ("theAngle : " + theAngle);
		} 

	}

	//drawMeACircleWithCollapsingRadius();
	function drawMeACircleWithCollapsingRadius (){
		var theDiameter = 100;
		var xpos;
		var ypos;
		var theAngle=0.0;
		var angleSteps=0.3;
		var radiusSteps=1;

		while (theDiameter>0){	
			xpos= theDiameter * Math.cos (theAngle);
			ypos= theDiameter * Math.sin (theAngle);
			//var objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, "rgba(100,200,250, 1)", 100+xpos, 200+ypos);
			var objectOnscreen1 = new objectOnscreen(7, "rgba(100,200,250, 1)", 200+xpos, 200+ypos);
			objectOnscreen1.drawCircularObject();
			theAngle+=angleSteps;
			theDiameter-=radiusSteps;
			//Debugger.log ("theAngle : " + theAngle);
		} 

	}


	//drawMeACircleWithCollapsingRadiusAndCircleDiametersSmallToLarge();
	function drawMeACircleWithCollapsingRadiusAndCircleDiametersSmallToLarge (){
		var theDiameter = 100;
		var xpos;
		var ypos;
		var theAngle=0.0;
		var angleSteps=0.6;
		var radiusSteps=6;
		var diameterRateOfChange=2;
		
		//var circleSteps;
		//var numberOfCircles=Math.round(theDiameter/radiusSteps);
		var counter =1;

		while (theDiameter>0){	
			xpos= theDiameter * Math.cos (theAngle);
			ypos= theDiameter * Math.sin (theAngle);
			//var objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, "rgba(100,200,250, 1)", 100+xpos, 200+ypos);
			var objectOnscreen1 = new objectOnscreen(counter*diameterRateOfChange, "rgba(100,200,250, 1)", 200+xpos, 200+ypos);
			objectOnscreen1.drawCircularObject();
			theAngle+=angleSteps;
			theDiameter-=radiusSteps;
			counter=counter+.5;
			//Debugger.log ("theAngle : " + theAngle);
		} 
		
	}

	//drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmall();
	function drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmall (){
		//var theDiameter = 100;
		var theDiameter = randomFromTo(10,100);;
		var xpos;
		var ypos;
		var theAngle=0.0;
		//var angleSteps=0.6;
		var angleSteps=Math.random();
		//var radiusSteps=3;
		var radiusSteps= randomFromTo(3,9);
		//var diameterRateOfChange=1;
		var diameterRateOfChange=randomFromTo(1,3);
		
		//var circleSteps;
		var numberOfCircles=Math.round(theDiameter/radiusSteps);
		var counter =0;

		while (theDiameter>0){	


			theRed= theRed+goOtherWayRed;
			if (theRed > 254){
				goOtherWayRed=goOtherWayRed*-1;
			}else if (theRed < 1){
				goOtherWayRed=goOtherWayRed*-1;
			}

			theGreen= theGreen+goOtherWayGreen;
			if (theGreen > 254){
				goOtherWayGreen=goOtherWayGreen*-1;
			}else if (theGreen < 1){
				goOtherWayGreen=goOtherWayGreen*-1;
			}

			theBlue= theBlue+goOtherWayBlue;
			if (theBlue > 254){
				goOtherWayBlue=goOtherWayBlue*-1;
			}else if (theBlue < 1){
				goOtherWayBlue=goOtherWayBlue*-1;
			}

			tmp=numberOfCircles-counter;
			xpos= theDiameter * Math.cos (theAngle);
			ypos= theDiameter * Math.sin (theAngle);
			//var objectOnscreen1 = new objectOnscreen(5, "rgba(100,200,250, 1)", 200+xpos, 200+ypos);
			var objectOnscreen1 = new objectOnscreen(tmp*diameterRateOfChange, "rgba("+ theRed+ ","+theGreen+","+theBlue+", 1)", 300+xpos, 300+ypos);
			objectOnscreen1.drawCircularObject();
			theAngle+=angleSteps;
			theDiameter-=radiusSteps;


			//Debugger.log ("counter : " + counter);
			counter++;
			
		} 
		
	}


	drawScreen ();

	function drawScreen() {
		myrequestanimationvariable=requestAnimationFrame(drawScreen);
	
		var animationEngine1 = new animationEngine();
		animationEngine1.angleOfIncidence();
		//animationEngine1.angleOfIncidenceWithOrbitingObject();


			//Debugger.log (randomFromTo(diameterOfBall*2,(theCanvas.height-(diameterOfBall*2))));


			//if (dohowmanytimes<10){		
	
					//colorString="rgba("+ i+ ",221,0, 1)";
				//}



			//This will set the color transformation to grayscale, color or mixed
			if (grayscaleColorOrMixed==1){//Greyscale Mode
		
				theRed= theRed+goOtherWayRed;
				if (theRed > 254){
					goOtherWayRed=goOtherWayRed*-1;
				}else if (theRed < 1){
					goOtherWayRed=goOtherWayRed*-1;
				}

				colorString="rgba("+ theRed+ ","+theRed+","+theRed+", 1)";
			
			}else if (grayscaleColorOrMixed==0){//Color Mode
				theRed= theRed+goOtherWayRed;
				if (theRed > 254){
					goOtherWayRed=goOtherWayRed*-1;
				}else if (theRed < 1){
					goOtherWayRed=goOtherWayRed*-1;
				}

				theGreen= theGreen+goOtherWayGreen;
				if (theGreen > 254){
					goOtherWayGreen=goOtherWayGreen*-1;
				}else if (theGreen < 1){
					goOtherWayGreen=goOtherWayGreen*-1;
				}

				theBlue= theBlue+goOtherWayBlue;
				if (theBlue > 254){
					goOtherWayBlue=goOtherWayBlue*-1;
				}else if (theBlue < 1){
					goOtherWayBlue=goOtherWayBlue*-1;
				}

				colorString="rgba("+ theRed+ ","+theGreen+","+theBlue+", 1)";
			}else if (grayscaleColorOrMixed==2){//Mixed Color Mode
					//Debugger.log ("Mixed COlor Mode");
					switch (randomFromTo(0,1)){
					case 0:
						theRed= theRed+goOtherWayRed;
						if (theRed > 254){
							goOtherWayRed=goOtherWayRed*-1;
						}else if (theRed < 1){
							goOtherWayRed=goOtherWayRed*-1;
						}

						colorString="rgba("+ theRed+ ","+theRed+","+theRed+", 1)";
						break;
					case 1:
						theRed= theRed+goOtherWayRed;
						if (theRed > 254){
							goOtherWayRed=goOtherWayRed*-1;
						}else if (theRed < 1){
							goOtherWayRed=goOtherWayRed*-1;
						}

						theGreen= theGreen+goOtherWayGreen;
						if (theGreen > 254){
							goOtherWayGreen=goOtherWayGreen*-1;
						}else if (theGreen < 1){
							goOtherWayGreen=goOtherWayGreen*-1;
						}

						theBlue= theBlue+goOtherWayBlue;
						if (theBlue > 254){
							goOtherWayBlue=goOtherWayBlue*-1;
						}else if (theBlue < 1){
							goOtherWayBlue=goOtherWayBlue*-1;
						}
						colorString="rgba("+ theRed+ ","+theGreen+","+theBlue+", 1)";
						break;
					}
				
			}
	

			//This will change the size slowly.  If the value tests for 1.
			if (changeTheSize==1){
				currentDiameterOfBall=currentDiameterOfBall + goOtherWayCurrentDiameterOfBall;
			}

			if (changeTheSize==1 && currentDiameterOfBall>diameterOfBall ){
				goOtherWayCurrentDiameterOfBall=goOtherWayCurrentDiameterOfBall*-1
			}else if (changeTheSize==1 && currentDiameterOfBall<3){
				goOtherWayCurrentDiameterOfBall=goOtherWayCurrentDiameterOfBall*-1
			}

			//Draw object(s) to the screen
			//var objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, colorString, ball.x, ball.y);

			//var objectOnscreen1 = new objectOnscreen(currentDiameterOfBall, "rgba("+ theRed+ ","+theGreen+","+theBlue+", 1)", 0, 0);

			//objectOnscreen1.drawCircularObject();
			//objectOnscreen1.drawSquareObjectNoFill();
			//objectOnscreen1.drawSquareObjectFill();
			//objectOnscreen1.drawRandomNumberOfPointsStar();
			//objectOnscreen1.drawConstantNumberOfPointsStar();

			if (shouldObjectsBeRandom ==1){
				switch (randomFromTo(0,8)){
					case 0:
						objectOnscreen1.drawCircularObject();
						break;
					case 1:
						objectOnscreen1.drawSquareObjectNoFill();
						break;
					case 2:
						objectOnscreen1.drawSquareObjectFill();
						break;
					case 3:
						objectOnscreen1.drawRandomNumberOfPointsStar();
						break;
					case 4:
						objectOnscreen1.drawConstantNumberOfPointsStar();
						break;
					case 5:
						objectOnscreen1.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandom();
						break;
					case 6:
						objectOnscreen1.drawCircularObjectWithStroke();
						break;
					case 7:
						objectOnscreen1.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandomColorChange();
						break;
					case 8:
						objectOnscreen1.drawPentagon();
						break;


				}
			} else if (shouldObjectsBeRandom ==0) {
				switch (myShape){
					case 0:
						objectOnscreen1.drawCircularObject();
						break;
					case 1:
						objectOnscreen1.drawSquareObjectNoFill();
						break;
					case 2:
						objectOnscreen1.drawSquareObjectFill();
						break;
					case 3:
						objectOnscreen1.drawRandomNumberOfPointsStar();
						break;
					case 4:
						objectOnscreen1.drawConstantNumberOfPointsStar();
						break;
					case 5:
						objectOnscreen1.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandom();
						break;
					case 6:
						objectOnscreen1.drawCircularObjectWithStroke();
						break;
					case 7:
						objectOnscreen1.drawMeACircleWithCollapsingRadiusAndCircleDiametersLargeToSmallRandomColorChange();
						break;
					case 8:
						objectOnscreen1.drawPentagon();
						break;
				}				
			}


			//I will clear the canvas and restart the affect over.
			if (counterHowManyTimesdrawnScreenCalled>numberOfIterations){
				//setupTheCanvas();
				globalresetmesetupTheCanvas();
			}
			counterHowManyTimesdrawnScreenCalled++;		


			//Debugger.log (counterHowManyTimesdrawnScreenCalled);
			

			//dohowmanytimes++;
			//mycounter++;
			//cancelAnimationFrame (myrequestanimationvariable);

			


	}

	function randomFromTo(from, to){
       		return Math.floor(Math.random() * (to - from + 1) + from);
	}
	
	function createImageDataPressed (e){
		window.open(theCanvas.toDataURL(), "canvasImage", "left=0,top=0,width"+theCanvas.width+",height="+theCanvas.height+",toolbar=0,resizable=0");
	}

	function Pause (e){
		cancelAnimationFrame (myrequestanimationvariable);
		$("#Pause").hide();
		$("#Play").show();
	}

	function Play (e){
		requestAnimationFrame(drawScreen);
		$("#Play").hide();
		$("#Pause").show();
	}

	function DebugMe (e){
		cancelAnimationFrame (myrequestanimationvariable);
		Debugger.log("testForTrappedAlongAxis :: " +testForTrappedAlongAxis+ " xunits :: "+xunits+ " yunits :: " + yunits + " colorString :: "+ colorString);
	}




}//End Of Canvas Application Main Function



function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}


function removeNonNumbers(){
	isThisANumber=document.getElementById("howManyIterations").value;
	document.getElementById("howManyIterations").value=isThisANumber.replace(/[^0-9]/g, "");
	globalresetmesetupTheCanvas();
}


//Debugger.log ("OUTSIDE CLASS First Name: " + person1.firstName);


