const BASE_URL = "http://localhost:3000/"

document.getElementById('edit').addEventListener("click", async (e) => {
    const inputs = document.querySelectorAll("body > main > input")
    const dataEdit = {}
    for(let input of inputs){
        dataEdit[input.name] = input.value===""?input.placeholder:input.value
    }
    await postEditMovie(dataEdit)
});

const postEditMovie = async (moviInfo) => {
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(moviInfo)
    }
    let response = await fetch(`${BASE_URL}editMovie/${moviInfo._id}`, options)
    let data = await response.json()
    console.log(data);
    return data;
};