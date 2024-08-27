const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdownSelects = document.querySelectorAll("select");
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");


for(let select of dropdownSelects){
    for (currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name === "from" && currCode === "KRW"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (event) =>{
        updateFlag(event.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const UpadateExchageRate = async () => {
    let amount = document.querySelector("input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal = 1;
        amount.value = "1";
    }

    const url = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response= await fetch(url);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    let data = await response.json();

    const exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
    console.log(`${fromCurr.value} to ${toCurr.value}`, "Exchange Rate is:", exchangeRate); 

    let finalAmount = amtVal * exchangeRate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", async (event) =>{
    event.preventDefault();
    UpadateExchageRate();
})

window.addEventListener("load", () =>{
    UpadateExchageRate();
})