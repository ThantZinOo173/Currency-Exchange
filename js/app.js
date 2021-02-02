
let input = document.getElementById("Input");
let from = document.getElementById("from");
let to = document.getElementById("to");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");

function createOption(a,b,c){
    let o = document.createElement("option");
    let t = document.createTextNode(b);
    o.setAttribute("value",c);
    o.appendChild(t);
    a.appendChild(o);
}

function toNum(x){
    return Number(x.replace(",","")); //because comma can't be calculated
}

for (x in data.rates){
    createOption(from,x,toNum(data.rates[x]));
    createOption(to,x,toNum(data.rates[x]));
    //console.log(x,data.rates[x]);
}
function createTr(x){

    let nonHistory = document.getElementById("nonHistory");
    if(nonHistory){//reason of if= nonHistory is removed in first time to this function ,so second time nonHistory've removed ,if we remove absent thing, it's error
        nonHistory.remove();
    }

    let tr = document.createElement("tr");
    
    x.map(function(el){
        let td = document.createElement("td");
        let text = document.createTextNode(el);
        td.appendChild(text);
        tr.appendChild(td);
    })
    historyList.appendChild(tr);
}

function local(){
    localStorage.setItem("record",historyList.innerHTML);
}

document.getElementsByClassName("calc")[0].addEventListener("submit",function(e){
    
    e.preventDefault();//to prevent refresh action 

    //get state
    let x = input.value;
    let y = from.value;
    let z = to.value;
    console.log(x,y,z);

    //process
    let Result = (x*y)/z ;
    let fromText =from.options[from.selectedIndex].innerHTML;
    let toText = to.options[to.selectedIndex].innerHTML;
    let date = new Date().toLocaleString();
    let arr = [date,x +" "+fromText,toText,Result.toFixed(2)];

    //set state
    result.innerHTML = Result.toFixed(2);
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
    createTr(arr);
    local();

});
(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML = localStorage.getItem("record");
    }else{
        historyList.innerHTML = `<tr id="nonHistory"><td colspan="4">There is no history</td></tr>`
    }
})();
function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("mode-icon").classList.toggle("fa-sun");
}
