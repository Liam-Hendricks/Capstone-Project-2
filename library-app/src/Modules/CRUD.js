module.exports = {
  //READ function which handles api request to backend server
  READ: function (Path, search) {
    const params = new URLSearchParams({
      search: search,
    });//creating params using the search string 
    const url = `${Path}?${params.toString()}`;//making url and passing in params
    return fetch(url)//returning api fetch request reponse
      .then((res) => res.json())
      .catch((error) => console.log("Error:", error));
  },
};
