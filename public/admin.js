console.log("Admin");

document.getElementById('create').addEventListener("click", async (e) => { 
    e.preventDefault() 

    const form = document.getElementById("createForm").elements
    const data = {}
    for(let input of form){
        data[input.name] = input.value
    }

    console.log(form);
    console.log(data);

});