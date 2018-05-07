$(document).ready(function(){
/************************************* 52 card deck generator ***************************/

var suit =["clubs","diamonds","hearts","spades"];
var card=[1,2,3,4,5,6,7,8,9,10,"jack","queen","king"];

var cardArr=[];

for(var i=0;i<card.length ; i++)
{
	for (var j = 0; j < suit.length; j++) {
		cardArr.push({"name":card[i]+"_of_"+suit[j]+".png","value":card[i]});
	}
}
console.log(cardArr);

/************************************** FIRST ROUND CARDS GENERATOR  *****************************/
/******* HERE WE STOPED JACK FROM APPEARING ON THE TABLE IN THE FIRST ROUND **********************/
/******* Created 3 arrays for player and computer and table **************************************/

var round =0;
function roundCounter()
{
	round++;
	$(".round h2").html("Round is : "+round);
	if(round==6)
	{
	   $(".round h2").html("Round is 6 And the last");
	}					
	return round;

}



var sumCards = 0;
var sumArr =[];
var randomComp=[];	
var randomUser=[];
var randomTable=[];
var roundCount;

$(".start").on("click",function () {
$(".inst").slideUp();
$(".turn h2").html("Player turn");

$(".start").attr("disabled",true);
$(".start").css("color","grey");

roundCount= roundCounter();
console.log(roundCount);

for(var i=0;i<4;i++)
{

randomComp[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
cardArr.splice(cardArr.indexOf(randomComp[i]),1);
randomUser[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
cardArr.splice(cardArr.indexOf(randomUser[i]),1);
randomTable[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
while(randomTable[i].value=="jack")
{
	randomTable[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
	console.log("jack changed");
}
cardArr.splice(cardArr.indexOf(randomTable[i]),1);
}
console.log(randomComp);
console.log(randomUser);
console.log(randomTable);

console.log(cardArr);

for(var i=0;i<randomComp.length;i++)
{
$(".computer img").eq(i).attr("src","facedown.png");
$(".computer img").eq(i).attr("value",randomComp[i].value)
$(".player img").eq(i).attr("src",randomUser[i].name);
$(".player img").eq(i).attr("value",randomUser[i].value)
$(".ground img").eq(i).attr("src",randomTable[i].name);
$(".ground img").eq(i).attr("value",randomTable[i].value)
}
});
/******************************************** human player turn ************************************/
/**** if any of the functions return true then remove the played card from the array , else remove the played card from array 
and push it to the table array and append it's img to the tag to appear with cards on table if it doesn't capture any of the 
table cards */
var plyScore = 0;
console.log(plyScore);
$('.player').on('click', 'img', function() {

				$(".turn h2").html("Computer turn");
				$(".deck").attr("disabled",true);
				$(".deck").css("color","grey");
				console.log($(this).attr("value"));
				var val = $(this).attr("value");
				var srcImg = $(this).attr("src");

				$(".playerScore h3").html("last played card was : "+val)
				console.log($(".ground img").length);
				var table =$(".ground img").length;
				var index =$(this).index();
				console.log($(this).index());
				

				var multi = checkMultiSum(val);
				console.log(multi);

				var sum = checkSum(val);
				console.log(sum);
				var komy = checkomy(srcImg);
				console.log(komy);

				var similar = checkSimilar(val);
				console.log(similar);

				var four = checkFourSum(val);
				console.log(four);

				if(sum == true || similar == true || komy==true || multi==true || four==true )
				{
					plyScore+=1;
					$(".playerScore h2").html("Player Score : "+plyScore);
					$(this).hide();
					$(this).remove();
					randomUser.splice(index,1);
					console.log(randomUser);
					console.log("player Score " + plyScore);
				}

				else{
						$(this).hide();
					 	$(this).remove();
						$(".ground").append("<img src="+"'"+ $(this).attr("src") +"'"+"value="+"'"+ $(this).attr("value") +"'"+"/>");
						randomTable.push({'name': $(this).attr("src"),'value':$(this).attr("value")});
						randomUser.splice($(this).index(),1);
						console.log(randomTable);
						console.log(randomUser);
						
					}

						$(".player").css("pointer-events","none")
						

/********************************************* NEXT ROUND CARDS GENERATOR *************************************/
/********** when both player and computer finish thier cards then generate new 4 cards for each player ********/

			    setTimeout(function(){

				if(randomUser.length==0 && randomComp.length==0)
				{
				roundCount = roundCounter();
				console.log(roundCount);


				for(var i=0;i<4;i++)
				{

				randomComp[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
				cardArr.splice(cardArr.indexOf(randomComp[i]),1);
				randomUser[i]=(cardArr[Math.floor(Math.random() * cardArr.length)]);
				cardArr.splice(cardArr.indexOf(randomUser[i]),1);

				}
				console.log(randomComp);
				console.log(randomUser);
				console.log(cardArr);

				for(var i=0;i<randomComp.length;i++)
				{
				$(".computer").append("<img src='facedown.png'"+"value="+"'"+ randomComp[i].value +"'"+"/>");
				$(".player").append("<img src="+"'"+ randomUser[i].name+"'"+"value="+"'"+ randomUser[i].value +"'"+"/>");

				}
				}

				},4000);

/***************************************************** COMPUTER TURN  ********************************************************/
/**** if any of the functions return true then remove the played card from the array , else remove the played card from array 
and push it to the table array and append it's img to the tag to appear with cards on table if it doesn't capture any of the 
table cards */
/** when the round ==6 and both player and computer finished thier cards then call score function to show who wins ********/

				setTimeout(function(){



					var random = randomComp[Math.floor(Math.random() * randomComp.length)];
					console.log(random);
					var index=randomComp.indexOf(random);
					console.log(index);
					var rName=random.name;
					var rValue=random.value;
					
					$(".compScore h3").html("last played card was : "+rValue);
					var multiSum = checkMultiSumComputer(val);
					console.log(multiSum);
					var compCheck = checkSumComp(rValue);
					console.log(compCheck);
					var komyComp = checkomyComputer(rName);
					console.log(komyComp);
					var similarCard = checkSimilarComputer(rValue);
					console.log(similarCard);
					
					
					if(compCheck == true || similarCard == true || komyComp == true || multiSum==true)
					{

						cScore+=1;
						$(".compScore h2").html("Computer Score : "+cScore);
						$(".computer img").eq(index).hide();
						$(".computer img").eq(index).remove();
						randomComp.splice(index,1);
						console.log(randomComp);

						}

					else{
							$(".computer img").eq(index).hide();
							$(".computer img").eq(index).remove();
							$(".ground").append("<img src="+"'"+ rName +"'"+"value="+"'"+ rValue +"'"+"/>");
							randomTable.push({'name': rName ,'value':rValue});
							randomComp.splice(index,1);
							console.log(randomTable);
							console.log(randomComp);
						}


							if(round==6 && randomUser.length==0 && randomComp.length==0){
								$(".deck").attr("disabled",true);
								$(".deck").css("color","grey");
								$(".turn h2").remove();
								$(".round h2").remove();
								$("h3").remove();

							checkScore(cScore,plyScore);

							}

							$(".player").css("pointer-events","auto")
							$(".turn h2").html("Player turn");
					},2000);	


				});

/***************************************** function to sum 2 cards and check the value ***********************/
/******arry for each card index for example there is 4 cards on table [0 1 2 3] and sum 0+1 then 0+2 then 0+3 then 
1+2 and  1+3 then 2+3 ,each time check if the played card == sum of any of those 2 cards or not , if true then remove 
those cards from the table and then splice them from the randomTable Array and used j-1 , because when i spliced 
index i , the rest of of cards are shifted back ***/ 
/***** if they are the only 2 cards on the table then it's Basraa *****/

function checkSum(m)
{
	
	var flag = false ;
	for(var i=0;i<randomTable.length-1;i++)
	{

		for(var j=i+1;j<randomTable.length;j++)
		{

			sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value);
			sumArr.push(sumCards);	

/***** check if there's only 2 cards on table and their sum == played card then it's a BASRA and score = 2 for cards + 10  BASRA ****/

			if(m==sumCards && randomTable.length==2){
				flag = true ;
				plyScore+=11;
				$(".playerScore h2").html("Player Score : "+plyScore);
				$(".turn h1").html("BASRA SUM OF 2 CARDS").fadeIn(3000);
				// alert("found match BASSRAAAAA Ya user");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				$(".turn h1").fadeOut(3000);
				console.log(randomTable);

			}

/**** check if the table cards length more than 2 and there's 2 cards of them == played card then remove them from table and 
score = 2+1 , and anothor for loop to check if there's more cards their sum = the played one them remove them too **/
/** EXAMPLE : table [5,1,4,2] and played [6] then will check first sum of the first 2 cards and remove them , them sum of other 
2 cards and then it consider a BASRA , but if [5,1,4,2,8,10] and played [6] , removes [5,1,4,2] and NOT a Basra score will be
5 with the played card , if[5,1,4,2,6,7] , remove [5,1,4,2,6] *****/

			else if(m==sumCards && randomTable.length>2)
			{
				flag = true ;
				plyScore+=2;
				$(".playerScore h2").html("Player Score : "+plyScore);
				// alert("found 2 cards match");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				console.log(randomTable);
				for(var i=0;i<randomTable.length-1;i++)
				{
					for(var j=i+1;j<randomTable.length;j++)
					{
						sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value);
						if(m== sumCards & randomTable.length==2){
						flag = true ;
						plyScore+=11;
						$(".playerScore h2").html("Player Score : "+plyScore);
						$(".turn h1").html("BASRA SUM OF 2 CARDS").fadeIn(3000);
						// alert("found match BASSRAAAAA Ya user");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						$(".turn h1").fadeOut(3000);
						console.log(randomTable);
					}
						else if(m== sumCards & randomTable.length>2){
						flag = true ;
						plyScore+=2;
						$(".playerScore h2").html("Player Score : "+plyScore);
						// alert("found match BASSRAAAAA Ya user");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						console.log(randomTable);
						for(var k=0;k<randomTable.length;k++)
						{
						if(m==randomTable[k].value)
						{
							plyScore+=1;
							// alert("FOUND ANOTHOR MATCH" );
							$(".playerScore h2").html("player Score : "+ plyScore);
							$('.ground img').eq(k).fadeOut();
							$('.ground img').eq(k).remove();
							randomTable.splice(k,1);
							console.log(randomTable);
						}
						}
						}
					}
				}
			}			
		}
	}		
return flag;
}

/******************************************  check sum of 2 cards for computer turn ************************************************/
/******arry for each card index for example there is 4 cards on table [0 1 2 3] and sum 0+1 then 0+2 then 0+3 then 1+2 and  1+3 then 2+3 ,
each time check if the played card == sum of any of those 2 cards or not , if true then remove those cards from the table and then 
splice them from the randomTable Array and used j-1 , because when i spliced index i , the rest of of cards are shifted back ***/ 
/***** if they are the only 2 cards on the table then it's Basraa *****/

var cScore =0;
function checkSumComp(m)
{
	
	var flag = false ;
	for(var i=0;i<randomTable.length-1;i++)
	{

		for(var j=i+1;j<randomTable.length;j++)
		{

			sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value);
			sumArr.push(sumCards);	

			if(m==sumCards && randomTable.length==2){
				flag = true ;
				cScore+=11;
				$(".compScore h2").html("Computer Score : "+cScore);
				$(".turn h1").html("BASRA SUM OF 2 CARDS").fadeIn(3000);
				// alert("comp played : "+m +" found 2 sum BASSRAAAAA Ya computer ");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				console.log(randomTable);
				$(".turn h1").fadeOut(3000);

			}
			else if(m==sumCards && randomTable.length>2)
			{
				flag = true ;
				cScore+=2;
				$(".compScore h2").html("Computer Score : "+cScore);
				// alert("comp played : "+m +" found 2 cards match");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				console.log(randomTable);
				for(var i=0;i<randomTable.length-1;i++)
				{
					for(var j=i+1;j<randomTable.length;j++)
					{
						sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value);
						if(m== sumCards & randomTable.length==2){
						flag = true ;
						cScore+=11;
						$(".compScore h2").html("Player Score : "+cScore);
						$(".turn h1").html("BASRA SUM OF 2 CARDS").fadeIn(3000);
						// alert("found match BASSRAAAAA Ya Computer");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						$(".turn h1").fadeOut(3000);
						console.log(randomTable);
					}
						else if(m== sumCards & randomTable.length>2){
						flag = true ;
						cScore+=2;
						$(".compScore h2").html("computer Score : "+cScore);
						// alert("found match sum Ya computer");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						console.log(randomTable);
						for(var k=0;k<randomTable.length;k++)
						{
						if(m==randomTable[k].value)
						{
							cScore+=1;
							// alert("FOUND ANOTHOR MATCH" );
							$(".compScore h2").html("computer Score : "+ cScore);
							$('.ground img').eq(k).fadeOut();
							$('.ground img').eq(k).remove();
							randomTable.splice(k,1);
							console.log(randomTable);
						}
						}
						}

					}
				}
			}
				
		}
	}
		
return flag;
}
/************************************************* Function to checkCards in HUMAN player turn ***********************************/

/****** check if the played card == jack and there's cards on table then clear the table and score == table.length ******/
/****** check if the played card == the one and only card on the table , then it's a Basra and score == 1+10 ************/
/****** check if the played card == any of the cards on table then remove this card from table and splice it from array */
function checkSimilar (m)
{
	
	var flag = false ;
	if(m=="jack"  && randomTable.length != 0 )
	{
		plyScore+=randomTable.length;
		$(".playerScore h2").html("Player Score : "+plyScore);
		flag = true;
		$(".ground img").hide();
		$(".ground img").remove();
		randomTable.splice(0,randomTable.length);
		console.log(randomTable);
	}

	else if(m == $('.ground img').eq(0).attr("value") && randomTable.length==1)
		{
			flag=true;
			$(".turn h1").html("BASRA").fadeIn(3000);
			// alert("BASRAAAA")
			plyScore+=10;
			$(".playerScore h2").html("Player Score : "+plyScore);
			$('.ground img').eq(0).fadeOut();
			$('.ground img').eq(0).remove();
			randomTable.splice(0,1);
			console.log(randomTable);
			$(".turn h1").fadeOut(3000);
		}
/** search for similar card as the played one , if found then remove it and loop again to search if there's any other 
card similar to the played one if found and was the last one on table then it's a BASRA , if found but not the last card on 
the table then capture it and add one more point to score ***/
		else {
			for(var i=0 ; i<randomTable.length ; i++)
			{
			if(m == randomTable[i].value)
				{
				flag=true;
				plyScore+=1;
				$(".playerScore h2").html("Player Score : "+plyScore);
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(i).remove();
				randomTable.splice(i,1);
				console.log(randomTable);
				for(var k=0;k<randomTable.length;k++)
				{
					if(m==randomTable[k].value &&  randomTable.length==1)
					{
						plyScore+=10;
						// alert("FOUND ANOTHOR MATCH" );
						$(".turn h1").html("BASRA").fadeIn(3000);
						$(".playerScore h2").html("player Score : "+ plyScore);
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(k).remove();
						randomTable.splice(k,1);
						$(".turn h1").fadeOut(3000);
						console.log(randomTable);
					}
					else if( m == randomTable[k].value ) {
						plyScore+=1;
						// alert("FOUND ANOTHOR MATCH" );
						$(".playerScore h2").html("player Score : "+ plyScore);
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(k).remove();
						randomTable.splice(k,1);
						console.log(randomTable);
					}
				}
				}

			}
			}
		
		return flag ;
}

/************************************************ Check Card for computer turn  *****************************************/
/****** check if the played card == jack and there's cards on table then clear the table and score == table.length ******/
/****** check if the played card == the one and only card on the table , then it's a Basra and score == 1+10 ************/
/****** check if the played card == any of the cards on table then remove this card from table and splice it from array */

function checkSimilarComputer (m)
{
	
	var flag = false ;
	if(m=="jack"  && randomTable.length != 0 )
	{
		cScore+=randomTable.length;
		$(".compScore h2").html("Computer Score : "+cScore);
		flag = true;
		$(".ground img").hide();
		$(".ground img").remove();
		randomTable.splice(0,randomTable.length);
		console.log(randomTable);
	}

	else if(m == $('.ground img').eq(0).attr("value") && randomTable.length==1)
		{
			flag=true;
			$(".turn h1").html("BASRA").fadeIn(3000);
			// alert("comp played : "+m +" found match BASSRAAAAA Ya computer ")
			cScore+=10;
			$(".compScore h2").html("Computer Score : "+cScore);
			$('.ground img').eq(0).fadeOut();
			$('.ground img').eq(0).remove();
			randomTable.splice(0,1);
			console.log(randomTable);
			$(".turn h1").fadeOut(3000);
		}

		else {
			for(var i=0 ; i<randomTable.length ; i++)
			{
			if(m == randomTable[i].value)
				{
				flag=true;
				cScore+=1;
				// alert("comp played : "+m );
				$(".compScore h2").html("Computer Score : "+cScore);
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(i).remove();
				randomTable.splice(i,1);
				console.log(randomTable);
				for(var k=0;k<randomTable.length;k++)
				{
					if(m==randomTable[k].value &&  randomTable.length==1)
					{
						cScore+=10;
						// alert("FOUND ANOTHOR MATCH" );
						$(".turn h1").html("BASRA").fadeIn(3000);
						$(".compScore h2").html("computer Score : "+ cScore);
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(k).remove();
						randomTable.splice(k,1);
						$(".turn h1").fadeOut(3000);
						console.log(randomTable);
					}
					else if( m == randomTable[k].value ) {
						cScore+=1;
						// alert("FOUND ANOTHOR MATCH" );
						$(".compScore h2").html("computer Score : "+ cScore);
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(k).remove();
						randomTable.splice(k,1);
						console.log(randomTable);
					}
				}
				}

			}
			}
		
		return flag ;
}

/*************************************** function to check 7 diamonds for Human player turn  *******************************************/
/***** check if the played card == 7 diamonds and the cards on the table more than 1 , then clear the table from cards like jacks do **/
/***** check if the played card == 7 diamonds and there's only one card on the table then it counts BASRAA and score == 1+10 ********/

function checkomy (s)
{
	var flag = false;
	if(s == "7_of_diamonds.png" && randomTable.length>1)
	{
		flag=true;
		plyScore+=randomTable.length;
		$(".playerScore h2").html("Player Score : "+plyScore);
		flag = true;
		$(".ground img").hide();
		$(".ground img").remove();
		randomTable.splice(0,randomTable.length);
		console.log(randomTable);
	}

	else if(s == "7_of_diamonds.png" && randomTable.length==1)
	{
			flag=true;
			$(".turn h1").html("BASRA komy").fadeIn(3000);
			// alert("komy BASRAAAA")
			plyScore+=10;
			$(".playerScore h2").html("Player Score : "+plyScore);
			$('.ground img').eq(0).fadeOut();
			$('.ground img').eq(0).remove();
			randomTable.splice(0,1);
			console.log(randomTable);
			$(".turn h1").fadeOut(3000);
	}

	return flag;
}
/************************************** function to check 7 diamonds for computer turn *************************************/
/***** check if the played card == 7 diamonds and the cards on the table more than 1 , then clear the table from cards like jacks do **/
/***** check if the played card == 7 diamonds and there's only one card on the table then it counts BASRAA and score == 1+10 ********/


function checkomyComputer (s)
{
	var flag = false;
	if(s == "7_of_diamonds.png" && randomTable.length>1)
	{
		flag=true;
		cScore+=randomTable.length;
		$(".compScore h2").html("Computer Score : "+cScore);
		flag = true;
		$(".ground img").hide();
		$(".ground img").remove();
		randomTable.splice(0,randomTable.length);
		console.log(randomTable);
	}

	else if(s == "7_of_diamonds.png" && randomTable.length==1)
	{
			flag=true;
			$(".turn h1").html("BASRA komy").fadeIn(3000);
			// alert("comp played : "+s +"Komy BASSRAAAAA Ya computer ")
			cScore+=10;
			$(".compScore h2").html("Computer Score : "+cScore);
			$('.ground img').eq(0).fadeOut();
			$('.ground img').eq(0).remove();
			randomTable.splice(0,1);
			console.log(randomTable);
			$(".turn h1").fadeOut(3000);
	}

	return flag;
}

/*************************************** SUM of 3 cards FOR HUMAN Player ***********************************************/
/******arry for each card index for example there is 4 cards on table [0 1 2 3] and sum 0+1+2 then 0+1+3 then 0+2+3 then 1+2+3 and 
each time check if the played card == sum of any of those 3 cards or not , if true then remove those cards from the table and then 
splice them from the randomTable Array and used j-1 , k-2 because when i spliced index i , the rest of of cards are shifted back **/
/***** if they are the only 3 cards on the table then it's Basraa *****/ 
var newArr =[];
function checkMultiSum (v)
{
	var flag = false ;
	for(var i=0;i<randomTable.length-2;i++)
	{
		for(var j=i+1;j<randomTable.length-1;j++)
		{
			for(var k=j+1;k<randomTable.length;k++)
			{

			sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value)+parseInt(randomTable[k].value);
			newArr.push(sumCards);	

/** if there's only 3 cards their sum == played card then it's a BASRA , if there's more than 3 cards then the catured card
will add 3 points to score + 1 point for the played card and then loop again on the table to search if there's other 3 cards
their sum == the played card and the table length == 3 then it's a BASRA else remove those cards , else if found 3 cards 
their sum == the played one and only one card similar to the played on then score == 3 + 1 matches + 1 played ***/

				if(v==sumCards && randomTable.length==3){
				flag = true ;
				plyScore+=12;
				$(".playerScore h2").html("Player Score : "+plyScore);
				$(".turn h1").html("BASRA SUM OF 3 CARDS").fadeIn(3000);
				// alert("found 3 match BASSRAAAAA Ya user");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(k).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				$('.ground img').eq(k-2).remove();

				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				randomTable.splice((k-2),1);
				$(".turn h1").fadeOut(3000);
				console.log(randomTable);

			}

			else if(v==sumCards && randomTable.length>3){
						flag = true ;
						plyScore+=3;
						$(".playerScore h2").html("Player Score : "+plyScore);
						// alert("found sum match");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						$('.ground img').eq(k-2).remove();

						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						randomTable.splice((k-2),1);
						console.log(randomTable);


						for(var i=0;i<randomTable.length-2;i++)
						{
							for(var j=i+1;j<randomTable.length-1;j++)
							{
								for(var k=j+1;k<randomTable.length;k++)
								{

								sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value)+parseInt(randomTable[k].value);
								if(m== sumCards & randomTable.length==3){
								flag = true ;
								plyScore+=12;
								$(".playerScore h2").html("Player Score : "+plyScore);
								$(".turn h1").html("BASRA SUM OF 3 CARDS").fadeIn(3000);
								// alert("found match BASSRAAAAA Ya user");
								$('.ground img').eq(i).fadeOut();
								$('.ground img').eq(j).fadeOut();
								$('.ground img').eq(i).remove();
								$('.ground img').eq(j-1).remove();
								randomTable.splice(i,1);
								randomTable.splice((j-1),1);
								$(".turn h1").fadeOut(3000);
								console.log(randomTable);
							}		
		
										else if(v==sumCards && randomTable.length>3){
										flag = true ;
										plyScore+=3;
										$(".playerScore h2").html("Player Score : "+plyScore);
										// alert("found sum match");
										$('.ground img').eq(i).fadeOut();
										$('.ground img').eq(j).fadeOut();
										$('.ground img').eq(k).fadeOut();
										$('.ground img').eq(i).remove();
										$('.ground img').eq(j-1).remove();
										$('.ground img').eq(k-2).remove();

										randomTable.splice(i,1);
										randomTable.splice((j-1),1);
										randomTable.splice((k-2),1);
										console.log(randomTable);
										for(var k=0;k<randomTable.length;k++)
										{
										if(v==randomTable[k].value)
										{
											plyScore+=1
											// alert("FOUND ANOTHOR MATCH" );
											$(".playerScore h2").html("player Score : "+ plyScore);
											$('.ground img').eq(k).fadeOut();
											$('.ground img').eq(k).remove();
											randomTable.splice(k,1);
											console.log(randomTable);
										}
								}

							}
						}
						
					}
				}

			}
		}
	}
}


				return flag;
				}


/***************************************** sum 3 cards on table and match with the played one by COMPUTER *****************************/

/******arry for each card index for example there is 4 cards on table [0 1 2 3] and sum 0+1+2 then 0+1+3 then 0+2+3 then 1+2+3 and 
each time check if the played card == sum of any of those 3 cards or not , if true then remove those cards from the table and then 
splice them from the randomTable Array and used j-1 , k-2 because when i spliced index i , the rest of of cards are shifted back ***/ 
/***** if they are the only 3 cards on the table then it's Basraa *****/ 


var newArr =[];
function checkMultiSumComputer (v)
{
	var flag = false ;
	for(var i=0;i<randomTable.length-2;i++)
	{
		for(var j=i+1;j<randomTable.length-1;j++)
		{
			for(var k=j+1;k<randomTable.length;k++)
			{

			sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value)+parseInt(randomTable[k].value);
			newArr.push(sumCards);	

				if(v==sumCards && randomTable.length==3){
				flag = true ;
				cScore+=12;
				$(".compScore h2").html("Player Score : "+cScore);
				$(".turn h1").html("BASRA SUM OF 3 CARDS").fadeIn(3000);
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(k).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				$('.ground img').eq(k-2).remove();

				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				randomTable.splice((k-2),1);
				$(".turn h1").fadeOut(3000);
				console.log(randomTable);

			}

			else if(v==sumCards && randomTable.length>3){
						flag = true ;
						cScore+=3;
						$(".compScore h2").html("Player Score : "+cScore);
						alert("found sum match");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						$('.ground img').eq(k-2).remove();

						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						randomTable.splice((k-2),1);
						console.log(randomTable);

						for(var i=0;i<randomTable.length-2;i++)
						{
							for(var j=i+1;j<randomTable.length-1;j++)
							{
								for(var k=j+1;k<randomTable.length;k++)
								{

								sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value)+parseInt(randomTable[k].value);
								if(m== sumCards & randomTable.length==3){
								flag = true ;
								cScore+=12;
								$(".compScore h2").html("Player Score : "+cScore);
								$(".turn h1").html("BASRA SUM OF 3 CARDS").fadeIn(3000);
								$('.ground img').eq(i).fadeOut();
								$('.ground img').eq(j).fadeOut();
								$('.ground img').eq(i).remove();
								$('.ground img').eq(j-1).remove();
								randomTable.splice(i,1);
								randomTable.splice((j-1),1);
								$(".turn h1").fadeOut(3000);
								console.log(randomTable);
							}		
		
										else if(v==sumCards && randomTable.length>3){
										flag = true ;
										cScore+=3;
										$(".compScore h2").html("Player Score : "+cScore);
										alert("found sum match");
										$('.ground img').eq(i).fadeOut();
										$('.ground img').eq(j).fadeOut();
										$('.ground img').eq(k).fadeOut();
										$('.ground img').eq(i).remove();
										$('.ground img').eq(j-1).remove();
										$('.ground img').eq(k-2).remove();

										randomTable.splice(i,1);
										randomTable.splice((j-1),1);
										randomTable.splice((k-2),1);
										console.log(randomTable);
										for(var k=0;k<randomTable.length;k++)
										{
										if(v==randomTable[k].value)
										{
											cScore+=1
											alert("FOUND ANOTHOR MATCH" );
											$(".compScore h2").html("player Score : "+ cScore);
											$('.ground img').eq(k).fadeOut();
											$('.ground img').eq(k).remove();
											randomTable.splice(k,1);
											console.log(randomTable);
										}
								}

							}
						}
						
					}
				}

			}
		}
	}
}
				return flag;
				}


/****************************************************************************************************/
/*** check sum of 4 cards if match the played cardd ***/ 
var fourArr =[];
function checkFourSum (v)
{
	var flag = false ;
	for(var i=0;i<randomTable.length-3;i++)
	{
		for(var j=i+1;j<randomTable.length-2;j++)
		{
			for(var k=j+1;k<randomTable.length-1;k++)
			{
				for(var l=k+1;l<randomTable.length;l++)
				{

			sumCards=parseInt(randomTable[i].value)+parseInt(randomTable[j].value)+parseInt(randomTable[k].value)+parseInt(randomTable[l].value);
			fourArr.push(sumCards);	
			
			if(v==sumCards && randomTable.length==4){
				flag = true ;
				plyScore+=13;
				$(".playerScore h2").html("Player Score : "+plyScore);
				alert("found 4 match BASSRAAAAA Ya user");
				$('.ground img').eq(i).fadeOut();
				$('.ground img').eq(j).fadeOut();
				$('.ground img').eq(k).fadeOut();
				$('.ground img').eq(l).fadeOut();
				$('.ground img').eq(i).remove();
				$('.ground img').eq(j-1).remove();
				$('.ground img').eq(k-2).remove();
				$('.ground img').eq(l-3).remove();

				randomTable.splice(i,1);
				randomTable.splice((j-1),1);
				randomTable.splice((k-2),1);
				randomTable.splice((l-3),1);
				console.log(randomTable);

			}

			else if(v==sumCards && randomTable.length>3){
						flag = true ;
						plyScore+=4;
						$(".playerScore h2").html("Player Score : "+plyScore);
						alert("found sum match");
						$('.ground img').eq(i).fadeOut();
						$('.ground img').eq(j).fadeOut();
						$('.ground img').eq(k).fadeOut();
						$('.ground img').eq(l).fadeOut();
						$('.ground img').eq(i).remove();
						$('.ground img').eq(j-1).remove();
						$('.ground img').eq(k-2).remove();
						$('.ground img').eq(l-3).remove();

						randomTable.splice(i,1);
						randomTable.splice((j-1),1);
						randomTable.splice((k-2),1);
						randomTable.splice((l-3),1);
						console.log(randomTable);

			}
		}
		
	}
}
}

return flag;
}

/******************************************check Score and find the winner ******************************/

function checkScore(c,p){
	console.log(c);
	console.log(p);
	$('.ground img').fadeOut();
						
	if(c>p)
	{	
		$(".Final h2").html("COMPUTER WON , YAAA USERRR");
		$("body").css("background-image","url('giphy (2).gif')");
		$("body").css("background-size","cover");
		$("body").css("height","100vh")
	}

	else if(p>c){
	
		$(".Final h2").html("YOUU WON , MABROUUUUUK YA USERR");
		$("body").css("background-image","url('giphy.gif')");
		$("body").css("background-size","cover");
		$("body").css("height","100vh")
	}

	else{
		$(".Final h2").html("YOU AND THE COMPUTER EQUALS");
		$("body").css("background-image","url('OSV4W00.jpg')");
		$("body").css("background-size","cover");
	}

}




});













	
	


