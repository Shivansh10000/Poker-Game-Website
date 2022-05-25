let credits = localStorage.getItem("localcreds1"); 
let betamount = localStorage.getItem("localbetamount"); 
let extraamount = localStorage.getItem("localextraamount"); 
let comphandpower = localStorage.getItem("localcomphandpower"); 
let playerhandpower = localStorage.getItem("localplayerhandpower"); 
let result = localStorage.getItem("localresult");
result = Number(result); 
let resultval;
let explaination;
let credexplaination;
if(result == 1)
{
    resultval = "You Won !";
    explaination = "You won because you had " + playerhandpower + " and the computer had " + comphandpower + " your hand has greater priority";
    credexplaination = "You had bet "+betamount+" and you paid "+extraamount+" to the dealer for peeking on a computer card as a result of your victory you have won twice the amount of money you bet ! you now have "+credits+" credits";
}
else if(result == -1)
{
    resultval = "You Lost !";
    explaination = "You lost because you had " + playerhandpower + " but the computer had " + comphandpower + " which has greater priority";
    credexplaination = "You had bet "+betamount+" and you paid "+extraamount+" to the dealer for peeking on a computer card as a result of your loss you have lost all the money you had bet, you now have "+credits+" credits";
}
else
{
    resultval = "Game Drawn !";
    explaination = "Game was drawn because both player and computer got " + comphandpower;
    credexplaination = "You had bet "+betamount+" and you paid "+extraamount+" to the dealer for peeking on a computer card because you drew the match the amount of money you bet will be returned to you keep in mind that the money you paid the dealer wont be returned, you now have "+credits+" credits";
}

// gamewinpercentage = 100;

console.log(credits);
console.log(betamount);
console.log(extraamount);
console.log(comphandpower);
console.log(playerhandpower);


document.getElementById("result").innerHTML = resultval;
document.getElementById("resultexplaination").innerHTML = explaination;
document.getElementById("creditsinfo").innerHTML = credexplaination;


//this is a string so we'll convert in into a number before we use it for simplicity
//in results in case there is a draw we find result with high card