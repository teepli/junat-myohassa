var myohaiset=[];
var syyKoodit=[];

var input = '';
document.getElementById("paiva").addEventListener("change", function () {
    input = this.value;
    var taulu = document.getElementById("trainTable")
    if (taulu.hasChildNodes()){
    taulu.innerHTML=''}
    console.log(input)
    console.log(input); //e.g. 2015-11-13
    haeSyyt()});

function haeSyyt(){
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange=readystagechange;
    xhr.open("GET", "https://rata.digitraffic.fi/api/v1/metadata/detailed-cause-category-codes");
    xhr.send();
}
function readystagechange() {
    if (xhr.readyState === 4) {
        var syyt = JSON.parse(xhr.responseText);
        console.dir(syyt)
        syyKoodit = syyt;
        console.log("syyt");
        console.dir(syyKoodit)
        haePaivanJunat()
    }
}
function haePaivanJunat(){
    xh = new XMLHttpRequest();
    xh.onreadystatechange=readystagechangetoka;
    xh.open("GET", "https://rata.digitraffic.fi/api/v1/trains/"+input);
    xh.send();
}
function readystagechangetoka() {
    if (xh.readyState === 4) {
        var junat = JSON.parse(xh.responseText);
        console.dir(junat)
        myohaiset = junat;
        console.log("Myöhäiset:")
        console.dir(myohaiset);
        printtaa(myohaiset)
    }
}

function printtaa(syy) {
    var myohassa = document.getElementById("myohassa")
    for (j of syy) {
        for (var i = 0; j.timeTableRows.length; i++)
        if (j.timeTableRows[i].causes.length>0){
            console.log(j.timeTableRows[i].causes);
            var selitys = [];
            selitys = j.timeTableRows[i].causes;
        for (se of selitys) {
            var selitys = se.detailedCategoryCode;
            for (s of syyKoodit)
                if (selitys === s.detailedCategoryCode)
            {
                selitys = s.detailedCategoryName;
                myohassa.innerHTML += "<td>"+j.trainType+" juna </td><td>" + selitys + "</td>"
            }
        }
        }

    }
}


