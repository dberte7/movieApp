const BASE_URL = "http://localhost:3000/"

document.getElementById('confirm').addEventListener("click", async (e) => {
    const form = document.getElementById("confirmForm").elements
    const data = {}
    for(let input of form){
        data[input.name] = input.value
    }
    await deleteMovie(data)
});

const deleteMovie = async (moviInfo) => {
    let options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(moviInfo)
    }
    let response = await fetch(`${BASE_URL}removeMovie/`, options)
    let data = await response.json()
    console.log(data);
    return data;
};
// input(type='hidden' name='delete' value="true")