var ans="0";
var curr="0";
var oper="0";

var csrftoken = $.cookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

function addDigit(dig){
  if (parseInt(curr)==0 && curr.indexOf(".")==-1 ){
    curr=dig;
  }
  else{
    curr+=dig;
  }
  document.getElementById('display').value=curr;
}

function decimal(){
  if (curr.length == 0){
    curr="0.";
  }
  else {
    curr+=".";
  }
  document.getElementById('display').value=curr;
}

function Clear(){
  curr="0";
  document.getElementById('display').value=curr;
}

function allClear(){
  ans="0";
  curr="0";
  oper="0";
  document.getElementById('display').value=ans;
}

function operate(operator){
  ans=curr;
  if (operator == "+"){
    oper="+";
  }
  if (operator == "-"){
    oper="-";
  }
  if (operator == "*"){
    oper="*";
  }
  if (operator =="/"){
    oper="/";
  }
  curr="";
}

function equate() {
    $.post('http://127.0.0.1:8000/equate', {'curr': curr, 'ans': ans, 'oper': oper}, function (data, status) {
        curr = data.ans;
        document.getElementById('display').value = curr;
    });
}