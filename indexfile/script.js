//fetch , load and show Categories on html
//cerate load categories

const loadCategories = ()=>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then(res=> res.json())
   .then(data => displayCategories(data.categories))
   .catch((error)=> console.error('error happend :' , error));
   
}


// Create Display CAtegories
const displayCategories = (categories)=>{
     
    const categoriesContainer= document.getElementById('categories')

    categories.map((item) => {
    //  console.log(item.category)
     //create button
     const button = document.createElement("button");
     button.classList = 'btn';
     button.innerText = item.category;
     //add button to container
     categoriesContainer.append(button)
  });

  

}


loadCategories()