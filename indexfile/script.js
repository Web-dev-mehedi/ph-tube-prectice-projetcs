//fetch , load and show Categories on html

//load categories
const loadCategories = ()=>{
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then(res=> res.json())
   .then(data => displayCategories(data.categories))
   .catch((error)=> console.error('error happend :' , error));
   
}

//loadvideos
const loadVideos=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=> res.json())
    .then(data => displayVideos(data.videos))
    .catch((error)=> console.error('error happend :' , error));
}

//create display videos

const displayVideos =(videos)=>{
    const videosContainer =document.getElementById('videos')
     videos.map(item =>{
        const vCard = document.createElement('div')
        vCard.classList='card bg-base-100 '
        vCard.innerHTML=`
            <figure class="w-full h-[200px]">
                <img
                src=${item.thumbnail}
                alt="Thumbnail" class="w-full h-full object-cover" />
            </figure>
            <div class=" py-6 flex flex-row gap-4">
                <div class="w-8 h-8 ">
                  <img src=${item.authors[0]?.profile_picture} alt="profilePic" class="w-full h-full mx-auto rounded-full object-cover"/>
                </div>
                <div class="flex flex-col gap-1">
                    <h3 class="text-base text-black font-semibold capitalize">${item.title}</h3>
                    <div class="flex justify-start items-center gap-2">
                    <p class="text-sm text-slate-400 font-normal">${item.authors[0]?.profile_name} </p>
                     ${item.authors[0]?.verified === true ?'<img src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" class="w-4 h-4"/>' : ' '} 
                    </div>
                    <span class="text-sm text-slate-400 font-normal">${item.others?.views}</span>
                </div>
            </div>

        `
      videosContainer.append(vCard)
     })


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


loadCategories();
loadVideos();