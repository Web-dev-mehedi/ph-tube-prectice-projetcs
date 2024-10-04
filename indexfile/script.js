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


//load categories Videos

const loadCategoriesVideos = (id)=>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=> res.json())
    .then(data =>{
         removeActiveClass();
        const activeBtn = document.getElementById(`bg-${id}`);
         activeBtn.classList='active'
        displayVideos(data.category);
        
    })
    .catch((error)=> console.error('error happend :' , error));      
}



// time set up dynamically
function onTime (time){
    const year = parseInt(time / (86400 * 30 * 12))
    const remainderyear = time % (86400 * 30 * 12)
   const month= parseInt( remainderyear / (86400 * 30))
   const remainderMonth= remainderyear % (86400*30)

     const day=  parseInt(remainderMonth/ 86400)
     const remainderdays=  remainderMonth % 86400

   const hours = parseInt(remainderdays / 3600)
  
   const remainderhours = remainderdays % 3600
   const minute = parseInt(remainderhours / 60)
   const remainderminute = remainderhours %  60
   return `${year.length === 0 ? '' :year} Y ${month} M  ${day} Day ${minute} Min ${remainderminute} Sec ago`

}


//create display videos
const displayVideos =(videos)=>{
    const videosContainer =document.getElementById('videos');
    //on button click
      videosContainer.innerHTML ="";
        if(videos.length === 0){
            videosContainer.classList.remove('grid')
            videosContainer.innerHTML =`
             <div class ="flex flex-col gap-5 justify-center items-center h-[400px] my-auto">
                 <img src="../assets/Icon.png"/>
                 <h1 class="text-4xl text-black font-bold">Oops!! Sorry, There is no content here</h1>
             </div>
            `;
            
            return
        }
        else{
            videosContainer.classList.add('grid')
        }
        //
        videos.map(item =>{
        const vCard = document.createElement('div')
        vCard.classList='card bg-base-100 '
        vCard.innerHTML=`
            <figure class="w-full h-[200px] relative">
                <img
                src=${item.thumbnail}
                alt="Thumbnail" class="w-full h-full object-cover"/>
                 ${
                    item.others?.posted_date?.length == 0? "" : `<span class="absolute bottom-2 right-2 bg-slate-700 px-2 py-1 rounded-md text-gray-50">${onTime (item.others?.posted_date)}</span>`
                 }
               
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
     //create button
     const div = document.createElement("div");
     div.innerHTML = `
        <button id= "bg-${item.category_id}" onclick="loadCategoriesVideos(${item.category_id} )" class ="btn category-btn"> ${item.category}</button>
     `
     //add button to container
     categoriesContainer.append(div)
  });

  

}

const removeActiveClass = ()=>{
    const buttons= document.getElementsByClassName("category-btn");
  
    for(let btn of buttons){
        
         btn.classList.remove('active')
    }
}




loadCategories();
loadVideos();