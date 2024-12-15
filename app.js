const BASE_URL = 'https://financialmodelingprep.com/api/v3/quote/';
const API_KEY = "?apikey=******************************";
const NAME_URL = "https://financialmodelingprep.com/api/v3/search?query=";
const smallApi = "******************************";
function start(){
    const form = document.getElementById("form");
    const form1 = document.getElementById("form1");
   
    form.addEventListener("submit", (event) =>{
        event.preventDefault();
        const formData = new FormData(form);
        const symbol = formData.get("symbol");
        const fullUrl = BASE_URL + symbol + API_KEY;
        const att = ['name', 'price', 'changesPercentage', 'pe', 'eps', 'dayHigh', 'dayLow', 'yearHigh', 'yearLow']
        let rem = document.getElementsByClassName("dynamic")
        while(rem[0]){
            rem[0].parentNode.removeChild(rem[0]);
        }
        fetch(fullUrl)
         .then(res => {
             if (!res.ok) {
                 throw new Error(`HTTP error! Status: ${res.status}`); 
             } return res.json(); 
         })
          .then(d => {
             console.log(d);
             let s = document.createElement("p");
             let st = document.createTextNode("Symbol: " + symbol);
                       
             let container = document.getElementById("output"); 
             s.appendChild(st);
             s.classList.add("text-center");
             s.classList.add("pt-5");
             s.classList.add("dynamic");
             container.appendChild(s);

            for(let i in att){
                
             let p = document.createElement("p");
             let t = document.createTextNode(att[i] + ": " + d[0][att[i]]); // Assuming 'c' is the property for the current price 
                          
             p.appendChild(t); 
             p.classList.add("text-center");
             p.classList.add("pt-2");
             p.classList.add("dynamic");
             container.appendChild(p); 

            }

         }) .catch(error => { 
          console.error('Error fetching data:', error); 
          let errorMsg = document.createElement("p"); 
          errorMsg.classList.add("dynamic");
          errorMsg.textContent = "Failed to fetch data. Please try again later."; 
          let container = document.getElementById("output"); 
          container.appendChild(errorMsg);
         });
                

    });

    form1.addEventListener("submit", (event) =>{
        event.preventDefault();
        const formData = new FormData(form1);
        const name = formData.get("name");
        const fullUrl = NAME_URL + name + "&apikey=" + smallApi;
        const container = document.getElementById("output1");
        let rem = document.getElementsByClassName("dynamic1")
        while(rem[0]){
            rem[0].parentNode.removeChild(rem[0]);
        }

        fetch(fullUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`); 
            } return res.json(); 
        })
        .then(d => {
            console.log(d);
            
            let i;
           for(i of d){
            if(i.currency == "USD"){
                let label = document.createElement("p");
                let lt = document.createTextNode("Name: " + i.name);
                let sy = document.createElement("p");
                let s = document.createTextNode("Symbol: " + i.symbol);
                label.appendChild(lt);
                label.classList.add("text-center");
                label.classList.add("pt-5");
                label.classList.add("dynamic1");
                container.appendChild(label);
                sy.appendChild(s);
                sy.classList.add("text-center");
                sy.classList.add("pt-2");
                sy.classList.add("dynamic1");
                container.appendChild(sy);

            }
           }

        }) .catch(error => { 
         console.error('Error fetching data:', error); 
         let errorMsg = document.createElement("p"); 
         errorMsg.classList.add("dynamic1");
         errorMsg.textContent = "Failed to fetch data. Please try again later."; 
         let container = document.getElementById("output1"); 
         container.appendChild(errorMsg);
        });

    });
    
        
}
