axios.get("https://www.themealdb.com/api/json/v1/1/random.php").then(res => {
    // this is the link for the image
    let imagelink = res.data.meals[0].strMealThumb
    // this is the title of dish and description
    let imageTitle = res.data.meals[0].strMeal


    let body = document.getElementById('container')
    let title = document.getElementById('dishname')
    let randomImage = document.createElement('img')
    let dishName = document.createElement('p')
    dishName.setAttribute("id", "dishname")
    randomImage.setAttribute("class", "image")


    randomImage.src = imagelink
    dishName.innerHTML = imageTitle


    body.append(randomImage)
    title.append(dishName)
    console.log(res.data.meals[0])

    let data=res.data.meals[0];

    randomImage.onclick = () => {
        console.log('h')
        document.querySelector('#modal').classList.add('active')
        let list = document.getElementById('ingList')
        let i = 1;
        while (
            data["strIngredient" + i] != "" &&
            data["strIngredient" + i] != null &&
            i <= 20
        ) {
            list.innerHTML += `<p>${data["strIngredient" + i]}</p>`;
            i++;
        }
    }

    document.getElementById('close').onclick=()=>{
        document.querySelector('#modal').classList.remove('active')
    }
})



let searchButton = document.getElementById('searchbutton')

searchButton.onclick = searchCategories

function searchCategories() {
    let html = ``
    let categories = document.getElementById('categories')
    categories.innerHTML = ""
    let searchbarText = document.getElementById('searchbar').value
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchbarText}`).then(e => {
        let Array = e.data.meals
        console.log(e)
        console.log(Array)
        for (i = 0; i < Array.length; i++) {
            html = `
            <div class="srCard" id="${e.data.meals[i].idMeal}">
            <img class="food" src="${Array[i].strMealThumb}" alt="">
            <p>${Array[i].strMeal}</p>
            </div>
            `
            categories.innerHTML += html

            srItemCard = document.querySelectorAll(".srCard");
      for (let i = 0; i < srItemCard.length; i++) {
        srItemCard[i].onclick = () => {
          let foodId = srItemCard[i].getAttribute("id");
          axios
            .get(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
            )
            .then((resp) => {
              console.log(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`
              );
              let data = resp.data.meals[0];
              console.log(data);
            document.querySelector('#modal').classList.add('active')
            console.log(document.querySelector('#modal'))
            let list = document.getElementById('ingList')
            list.innerHTML=''
            let i = 1;
            while (
                data["strIngredient" + i] != "" &&
                data["strIngredient" + i] != null &&
                i <= 20
            ) {
                list.innerHTML += `<p>${data["strIngredient" + i]}</p>`;
                i++;
            }
            });
        };
    }


        }
    })
    let searchResult = document.createElement('div')
    searchResult.setAttribute("id", "searchresult")
    let searchdiv = document.getElementById('searchdiv')
    searchResult.innerHTML = "Search results"
    searchdiv.append(searchResult)
}



//going from home to index.html
const startButton = document.getElementsByClassName('start-button')

function changepage() {
    window.location.href = "./page.html"
}