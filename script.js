var output = document.getElementById('output');
var bAnswer = document.getElementsByClassName('btn-ans');
var myObj = '',
    page = 0;
    crtAnswer = 0;
var myQueRep = [];
loadQuestions();

//event listeners
btnPre.onclick = function(){buildQuiz(page - 1)};
btnNxt.onclick = function(){
    console.log('btnNxt', page + 1);
    buildQuiz(page + 1);
};
function loadQuestions(){
    var a = new XMLHttpRequest();
    a.open("GET", "https://api.myjson.com/bins/4dq2i", true);
    a.onreadystatechange = function () {
    if(a.readyState == 4){ 
        myObj = JSON.parse(a.responseText);
        console.log('JSON data: ', myObj);
        buildQuiz(0);
        }
    }
    a.send();
}

function hideshow(){
    if(myObj.length <= (page)){
        document.getElementById('btnNxt').style.display = 'none';
    } else {
        document.getElementById('btnNxt').style.display = 'block';
    }
    if(0 >= (page)){
        document.getElementById('btnPre').style.display = 'none';
    } else {
        document.getElementById('btnPre').style.display = 'block';
    }
}

function buildQuiz(pg){
    output.innerHTML = '';
    console.log(page);
    console.log(myObj.length);
    page = pg;
    hideshow();
    if(page >= 0){
        
        //If quiz is completed
        if(myObj.length < (page + 1)) {
            page = myObj.length;
            var holderHTML = '';
           
            var score = 0;
            var gylph = '';
            for (var item in myObj){
                if(myObj[item].correct == myQueRep[item]){
                    score ++;
                    gylph = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                } else {
                    gylph = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>'
                    
                }
                holderHTML += '<div class="col-sm-12">' + myObj[item].question + ' ' + '<br><i>' + myObj[item].answers [myQueRep[item]] + '</i>' + gylph + '</div>';
                
            }
            output.innerHTML = '<h1>Quiz Results: You Scored'+' ' + score + ' ' + 'correct </h1><divclass = "endscore">' + holderHTML + '</div>';
            
            
            
        } 
        
        console.log("myObj[page]", myObj[page]);
        var myQuestion = myObj[page].question; 
        var myCorrect = myObj[page].correct;
        crtAnswer = myObj[page].answers[myCorrect];
        var questionHolder = '';
        var yesCor = '';
        for (var i in myObj[page].answers) {
            var aClass = '';
            if (myObj[page].mySel == i){
                aClass = 'selAnswer';
            }            
            if(i == myCorrect ){
                yesCor = '*';
            } else {
                yesCor = '';
            }
            questionHolder += '<div class="col-sm-6"><div class="btn-ans ' + aClass + '" data-id="'+parseInt(i)+'" >'+ myObj[page].answers[i] + '</div></div>';
        }
        
        output.innerHTML += '<div class="myQ">'+ myQuestion + '</div>';
        output.innerHTML += questionHolder;
        
        console.log('bAnswer=', bAnswer);
        
        for(var x = 0; x < bAnswer.length; x++){
            bAnswer[x].addEventListener('click', myAnswer, false);
        }
        
    }
      
}

function myAnswer(){ 
    var myResult = '';
    var iId = this.getAttribute("data-id"); 
    myObj[page].mySel = iId;
    
    //this.classlist.toggle('selAnswer');
    if(this.innerText == crtAnswer) {
        myResult = "correct";
    }
    else {
        myResult = "incorrect";
    }
    myQueRep[page] = iId;
     for (var x = 0; x < bAnswer.length; x++){
        if(iId == x){
             bAnswer[x].classList.add("selAnswer");
        } else {
            bAnswer[x].classList.remove("selAnswer");  
        }
     }
 }
        console.log(myQueRep)
    
   
    
    /*
    for(var q = 0; q < output.children.length; q++) {
        console.log(output.children[q].children);
    }
    */

    
/*
var myData = '[{"question":"What color is an apple","answers":["Blue","Red","Purple"],"correct":1},{"question":"What color is Grass","answers":["Green","Red","Purple"],"correct": 0}]';
var myObj = JSON.parse(myData)
for (var i in myObj) {
    output.innerHTML += myObj[i].question + '? <br>';
    for (var j in myObj[i].answers) {
        output.innerHTML += myObj[i].answers[j] + '<br>';
    }
        
}*/

