document.getElementById('check').onclick = () => {
    let fav = document.getElementsByTagName('input')[0].checked
    let imdb = document.getElementsByTagName('input')[0].name
    let userID = document.getElementsByTagName('input')[0].value
    postFavInfo(fav,imdb,userID);
}

const postFavInfo = async (favBoolean,id,user) => {
    let omdb;
    let str = JSON.stringify(id)
    str[1]==="t"? omdb = false : omdb = true

    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
            },
        body: JSON.stringify({
            fav: favBoolean,
            like:
                {
                movieId: id, 
                omdb: omdb, 
                user_ID: user
            }
        })
    }
    let response = await fetch(`/search/${id}`, options)
    let data = await response.json()
    return data;
};