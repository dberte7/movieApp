

document.getElementById('create').addEventListener("click", async (e) => { 
    //e.preventDefault();
    const form = document.getElementById("createForm").elements
    const data = {}
    for(let input of form){
        data[input.name] = input.value
    }
    await postCreateMovie(data)
});

const postCreateMovie = async (moviInfo) => {
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(moviInfo)
    }
    let response = await fetch('/createMovie/', options)
    let data = await response.json()
    return data;
}