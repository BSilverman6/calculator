const screen = document.querySelector(".screen");
const number = document.querySelectorAll(".num");
const oper = document.querySelectorAll(".oper");
const restart = document.querySelector("#ac");
const ekwals = document.querySelector("#ekwals");
const negative = document.querySelector("#plusMin")
const backspace = document.querySelector("#backspace");
let screenArray=[""];


backspace.addEventListener("click", ()=>{
    //
    if(screenArray[screenArray.length-1].length === 1 && screenArray.length !== 1){
        screenArray.splice(screenArray.length-1,1);
    }else if(screenArray[screenArray.length-1].length > 1){
        screenArray[screenArray.length-1] = screenArray[screenArray.length-1].slice(0,screenArray[screenArray.length-1].length-1)
    }
    setScreen()
});

number.forEach((item)=>{
    item.addEventListener("click", (event)=>{
        if (!isOper(lastItem())){
            if(event.target.textContent == "." && lastItem().includes(".")){
                //do nothing
            }else{
            screenArray[screenArray.length-1] += `${event.target.textContent}`;
            }
        }else if(screenArray.length>1&&lastItem()==="-"&&isOper(screenArray[screenArray.length-2])){
            screenArray[screenArray.length-1] += `${event.target.textContent}`;
        }else if(lastItem()==="-"&&screenArray.length===1){
            screenArray[screenArray.length-1] += `${event.target.textContent}`;

        }else{
            screenArray.push(`${event.target.textContent}`);
        }
        setScreen();
    });
});

negative.addEventListener("click", ()=>{
    if (screenArray.length==1&&lastItem()===""){
        screenArray[0]="-"
    }else if(screenArray.length==1&&lastItem()==="-"){
        screenArray[0] = ""
    }else if (!isOper(lastItem())){
        screenArray[screenArray.length-1] = ((+screenArray[screenArray.length-1])*(-1)).toString();
    }else{
        screenArray.push("-");
    }
    setScreen();
});

oper.forEach((item)=>{
    item.addEventListener("click", (event)=>{
        if (screenArray[0] !== "" && screenArray[0] !== "-" ){
            if (isOper(lastItem())){
                screenArray[screenArray.length-1] = event.target.textContent;
            }else{
                screenArray.push(event.target.textContent);
            }
            setScreen();
        }
    });
});

restart.addEventListener("click", () => {
    screenArray = [""];
    setScreen();
    screen.textContent = "0";
});

ekwals.addEventListener("click", ()=> compute(screenArray));

function compute(mathArray){
    const operands = Math.ceil((mathArray.length)/2)
    if (operands >= 2){
        mathWork: for (let i=1; i<operands; i++){
            switch (screenArray[1]){
                case "+":
                    screenArray.splice(0,3,String(add(screenArray[0],screenArray[2])));
                    break;
                case "-":
                    screenArray.splice(0,3,String(subtract(screenArray[0],screenArray[2])));
                    break;
                case "x":
                    screenArray.splice(0,3,String(multiply(screenArray[0],screenArray[2])));
                    break;
                case "/":
                    if (screenArray[2] == "0"){
                        screenArray = [""];
                        setScreen();
                        screen.textContent = "Well Poopies...";
                        break mathWork;
                    }else{
                    screenArray.splice(0,3,String(divide(screenArray[0],screenArray[2])));
                    }
                    break;
            }
        }
        if(screen.textContent!=="Well Poopies..."){
            screenArray[0] = String(Math.round((+screenArray[0])*1000)/1000);
            setScreen();
        };
    }
};

function setScreen(){
    screen.textContent=screenArray.toString("").replaceAll(",","");
}

function isOper(z){
    if (z === "/"||z === "+"||z === "-"||z === "x"){
        return true;
    }
    return false;;
}

function lastItem(){
    return screenArray[screenArray.length-1].toString();
}

function add(a,b){
    return (+a)+(+b);
}

function subtract(a,b){
    return (+a)-(+b);
}

function divide(a,b){
    if ((+b)===0){    
    screenArray = [""];
    setScreen();
    screen.textContent = "Well Poopies...";
    }else{
    return (+a)/(+b);
    };
}

function multiply(a,b){
    return (+a)*(+b);
}