
document.getElementById('edit').addEventListener("click", async (e) => {
    const inputs = document.querySelectorAll("body > main > form > input")
    const dataEdit = {}
    for(let input of inputs){
        dataEdit[input.name] = input.value===""?input.placeholder:input.value
    }
    await putEditMovie(dataEdit)
});

const putEditMovie = async (moviInfo) => {
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify(moviInfo)
    }
    let response = await fetch(`/editMovie/${moviInfo._id}`, options)
    let data = await response.json()
    return data;
}
