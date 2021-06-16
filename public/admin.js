const BASE_URL = 'http://localhost:3000/'

document.getElementById('create').addEventListener("click", async (e) => { 
    e.preventDefault() 

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
    console.log(options);

    let response = await fetch(`${BASE_URL}createMovie/`, options)
    let data = await response.json()
    console.log(data);
    return data;

}