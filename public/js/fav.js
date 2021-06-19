const BASE_URL = 'http://localhost:3000/api/'

document.getElementById('check').onclick = () => {
    let value = document.getElementsByTagName('input')[0].checked
    let id = document.getElementsByTagName('input')[0].name
    postFavInfo(value,id);
}

const postFavInfo = async (favBoolean,id) => {

    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({fav: favBoolean, movieId: id})
    }
    console.log(favBoolean);
    console.log(id)
    console.log(options);

    let response = await fetch(`${BASE_URL}search/${id}`, options)
    let data = await response.json()
    console.log(data);
    return data;

}