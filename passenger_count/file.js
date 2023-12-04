console.log("Here we are counting the entries of the people in a subway")
let count=0;
let str = document.getElementById("entry");
let increase_count = document.getElementById("output");
function increased(){
count=count+1;
increase_count.innerHTML = count;
}
function saved(){
    let to_add = " - "+count;
    str.innerHTML += to_add;
    count = 0;
increase_count.innerHTML = count;
}