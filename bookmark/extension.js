const inputBtn = document.querySelector("#input-btn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ul-el");
const deleteBtn = document.querySelector("#delete-btn");
const existEl = document.querySelector("#exist");
const deleteOne = document.querySelector("#delete");
let myLeads = [];


// Checking the value of myLeads in Local Storage . If it is not empty then restoring them from the previous page
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

// Deleting One Lead
deleteOne.addEventListener("click" , function() {
    leadsFromLocalStorage.shift();
    myLeads = leadsFromLocalStorage;
    localStorage.setItem("myLeads" , JSON.stringify(myLeads));
    let list_item = "";
    for(let i = myLeads.length-1 ; i>=0 ; i--){
        // Adding all the leads to the list_item
    list_item += `
    <li>
        <a href="${myLeads[i]}"  target="_blank" > 
            ${myLeads[i]} 
        </a>
    </li>
    `
    }
    // list_item is assigned to the ul element of the html document
    ulEl.innerHTML = list_item;
})

// Adding the leads in list
function renderLeads(){
    let list_item = "";
    for(let i = 0 ; i<myLeads.length ; i++){
        // Adding all the leads to the list_item
    list_item += `
    <li>
        <a href="${myLeads[i]}"  target="_blank" > 
            ${myLeads[i]} 
        </a>
    </li>
    `
    }
    // list_item is assigned to the ul element of the html document
    ulEl.innerHTML = list_item;
}


// Saving lead to localStorage
function saveToLocalStorage(){
    localStorage.setItem("myLeads" , JSON.stringify(myLeads));
    console.log(localStorage.getItem("myLeads"));
}


// Pushing value from input field in myLeads
inputBtn.addEventListener("click" , function() {
    let inputVal = inputEl.value;
    inputEl.value = ""; // Emptying the input field after input submisssion
    
    if(inputVal === ""){
        return;
    }
    
    // Checking if the lead exist first
    let arr = JSON.parse(localStorage.getItem("myLeads"));
    for(let i = 0 ; i<myLeads.length ; i++){
        if(arr[i] === inputVal){
            existEl.textContent = "The link already exists in the storage !!";
            inputBtn.value = "";
            return;
        }
    }
    
    myLeads.push(inputVal);
    existEl.textContent = "";
    renderLeads();
    saveToLocalStorage();
}
);


// Saving current tab in myLeads
const saveTabBtn = document.querySelector("#save-btn");
saveTabBtn.addEventListener("click", function() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tabUrl = tabs[0].url;
    inputEl.value = ""; // Emptying the input field after input submission

    // Checking if the lead exists first
    let arr = JSON.parse(localStorage.getItem("myLeads"));
    for (let i = 0; i < myLeads.length; i++) {
      if (arr[i] === tabUrl || arr[i] === "") {
        existEl.textContent = "The link already exists in the storage !!";
        return;
      }
    }
    myLeads.push(tabUrl);
    existEl.textContent = "";
    saveToLocalStorage();
    renderLeads();
  });
});





// Deleting the leads 
deleteBtn.addEventListener("click", function() {
    existEl.textContent = "Double click to delete 👽"
})
deleteBtn.addEventListener("dblclick" , function() {
    inputEl.value = ""; // Emptying the input field after input submisssion
    existEl.textContent = "";
    localStorage.clear();
    myLeads = [];
    renderLeads();
})



// Rough Work on local storage

/*localStorage.setItem("Name" ,"Sandeep Singh" , "age" , "25");
a=localStorage.getItem("age");
console.log(a);
// localStorage.clear();
*/

//array to string
/*arr = ["sandeep" , "singh"];
console.log(arr)
let str = JSON.stringify(arr); // arr to string
console.log(str);
let a = JSON.parse(str); // string to arr
console.log(a);
console.log(typeof arr);
console.log(typeof str);
console.log(typeof a);
*/
