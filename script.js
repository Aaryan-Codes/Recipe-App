const model = document.querySelector('.Model');
const inputRef = document.querySelector('.head .searchbox input');
const headerRef = document.querySelector('.head');
const recipeLaneRef = document.querySelector('.recipe-lane');

const cache = JSON.parse(localStorage.getItem('recipes')) || 
            { 
                "chicken":[{"id":637876,"title":"Chicken 65","image":"https://spoonacular.com/recipeImages/637876-312x231.jpg","imageType":"jpg"},{"id":716342,"title":"Chicken Suya","image":"https://spoonacular.com/recipeImages/716342-312x231.jpg","imageType":"jpg"},{"id":638420,"title":"Chicken Wings","image":"https://spoonacular.com/recipeImages/638420-312x231.jpg","imageType":"jpg"},{"id":638308,"title":"Chicken Satay","image":"https://spoonacular.com/recipeImages/638308-312x231.jpg","imageType":"jpg"},{"id":638086,"title":"Chicken Fingers","image":"https://spoonacular.com/recipeImages/638086-312x231.jpg","imageType":"jpg"},{"id":638174,"title":"Chicken Lo Mein","image":"https://spoonacular.com/recipeImages/638174-312x231.jpg","imageType":"jpg"},{"id":667707,"title":"chicken marbella","image":"https://spoonacular.com/recipeImages/667707-312x231.jpg","imageType":"jpg"},{"id":638257,"title":"Chicken Porridge","image":"https://spoonacular.com/recipeImages/638257-312x231.jpg","imageType":"jpg"},{"id":637999,"title":"Chicken Burritos","image":"https://spoonacular.com/recipeImages/637999-312x231.jpg","imageType":"jpg"}],
                // "pizza":[{"id":656329,"title":"Pizza bites with pumpkin","image":"https://spoonacular.com/recipeImages/656329-312x231.jpg","imageType":"jpg"},{"id":680975,"title":"BLT Pizza","image":"https://spoonacular.com/recipeImages/680975-312x231.jpg","imageType":"jpg"},{"id":663136,"title":"Thai Pizza","image":"https://spoonacular.com/recipeImages/663136-312x231.jpg","imageType":"jpg"},{"id":716300,"title":"Plantain Pizza","image":"https://spoonacular.com/recipeImages/716300-312x231.jpg","imageType":"jpg"},{"id":665769,"title":"Zucchini Pizza Boats","image":"https://spoonacular.com/recipeImages/665769-312x231.jpg","imageType":"jpg"},{"id":655698,"title":"Pepperoni Pizza Muffins","image":"https://spoonacular.com/recipeImages/655698-312x231.jpg","imageType":"jpg"},{"id":622598,"title":"Pittata - Pizza Frittata","image":"https://spoonacular.com/recipeImages/622598-312x231.jpg","imageType":"jpg"},{"id":641893,"title":"Easy Cheesy Pizza Casserole","image":"https://spoonacular.com/recipeImages/641893-312x231.jpg","imageType":"jpg"},{"id":654523,"title":"Paneer & Fig Pizza","image":"https://spoonacular.com/recipeImages/654523-312x231.jpg","imageType":"jpg"}],
                // "burger":[{"id":631814,"title":"$50,000 Burger","image":"https://spoonacular.com/recipeImages/631814-312x231.jpg","imageType":"jpg"},{"id":642539,"title":"Falafel Burger","image":"https://spoonacular.com/recipeImages/642539-312x231.png","imageType":"png"},{"id":663050,"title":"Tex-Mex Burger","image":"https://spoonacular.com/recipeImages/663050-312x231.jpg","imageType":"jpg"},{"id":622825,"title":"Tortilla Burger Loco Vaca","image":"https://spoonacular.com/recipeImages/622825-312x231.jpg","imageType":"jpg"},{"id":663357,"title":"The Unagi Burger","image":"https://spoonacular.com/recipeImages/663357-312x231.jpg","imageType":"jpg"},{"id":663252,"title":"The Blarney Burger","image":"https://spoonacular.com/recipeImages/663252-312x231.jpg","imageType":"jpg"},{"id":651190,"title":"Masala-Tofu Burger","image":"https://spoonacular.com/recipeImages/651190-312x231.jpg","imageType":"jpg"},{"id":663209,"title":"The Benedict Burger","image":"https://spoonacular.com/recipeImages/663209-312x231.jpg","imageType":"jpg"},{"id":650181,"title":"Little Italy Burger","image":"https://spoonacular.com/recipeImages/650181-312x231.jpg","imageType":"jpg"}]

            }; // To store API calls

const recipeURLcache = JSON.parse(localStorage.getItem('links')) || 
    {
        // "622598":"https://spoonacular.com/pittata-pizza-frittata-622598","622825":"https://spoonacular.com/tortilla-burger-loco-vaca-622825","631814":"https://spoonacular.com/-50-000-burger-631814","637876":"https://spoonacular.com/chicken-65-637876","637999":"https://spoonacular.com/chicken-burritos-637999","638086":"https://spoonacular.com/chicken-fingers-638086","638174":"https://spoonacular.com/chicken-lo-mein-638174","638257":"https://spoonacular.com/chicken-porridge-638257","638308":"https://spoonacular.com/chicken-satay-638308","638420":"https://spoonacular.com/chicken-wings-638420","641893":"https://spoonacular.com/easy-cheesy-pizza-casserole-641893","642539":"https://spoonacular.com/falafel-burger-642539","650181":"https://spoonacular.com/little-italy-burger-650181","651190":"https://spoonacular.com/masala-tofu-burger-651190","654523":"https://spoonacular.com/paneer-fig-pizza-654523","655698":"https://spoonacular.com/pepperoni-pizza-muffins-655698","656329":"https://spoonacular.com/pizza-bites-with-pumpkin-656329","663050":"https://spoonacular.com/tex-mex-burger-663050","663136":"https://spoonacular.com/thai-pizza-663136","663209":"https://spoonacular.com/the-benedict-burger-663209","663252":"https://spoonacular.com/the-blarney-burger-663252","663357":"https://spoonacular.com/the-unagi-burger-663357","665769":"https://spoonacular.com/zucchini-pizza-boats-665769","667707":"https://spoonacular.com/chicken-marbella-667707","680975":"https://spoonacular.com/blt-pizza-680975","716300":"https://spoonacular.com/plantain-pizza-716300","716342":"https://spoonacular.com/chicken-suya-716342"
    };

model.addEventListener('click', (e)=> {
    if(e.target.tagName==='I'){
        model.classList.toggle('hide');
    }
})

headerRef.addEventListener('click', (e)=> {
    if(e.target.tagName==='I'){
        fetchData(inputRef.value.toLowerCase());
        inputRef.value = "";
        model.classList.toggle('hide');
        recipeLaneRef.innerHTML = "";
    }
})


function fetchData(recipe){
    if(cache[recipe]){
        console.log("Inside if block:" + cache);
        updateDetails(cache[recipe]);
        
    }else{
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a932faa28ef448d9b8b4217d725d0d9a&query=${recipe}&number=9`)
        .then(res => res.json())
        .then(data => {
            cache[recipe] = data.results;
            updateDetails(data.results);
            localStorage.setItem('recipes',JSON.stringify(cache));
        })
        .catch(e => console.log(e))
    }
}

function updateDetails(arr){
    console.log(arr);
    arr = [{"id":637876,"title":"Chicken 65","image":"https://spoonacular.com/recipeImages/637876-312x231.jpg","imageType":"jpg"}];
    arr.forEach((dish)=>{
        // console.log(dish);
        const newTile = document.createElement("div");
        newTile.classList.add('tile');
        newTile.innerHTML = `
                <img src="${dish.image}">
                <p class="dishID"><span>#</span><span class="ID-info">${dish.id}</span></p>
                <p class="dishTitle">${dish.title}</p>
                <a target="_blank" class="recipeLink">Full Recipe</a>
        `
        // console.log(newTile);
        recipeLaneRef.appendChild(newTile);
        // console.log(recipeLaneRef);

        getRecipe(dish.id,newTile.querySelector('.recipeLink'));
    })
}

function getRecipe(id,anchor){
    if(recipeURLcache[id]){
        anchor.href = recipeURLcache[id];
    }else{
        fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=a932faa28ef448d9b8b4217d725d0d9a`)
        .then(res => res.json())
        .then(data => {
            const recipeURL = data.spoonacularSourceUrl;
            anchor.href = recipeURL;
            recipeURLcache[id] = recipeURL;
            localStorage.setItem('links', JSON.stringify(recipeURLcache));
        })
        .catch(e => console.log(e))
    }    
}



