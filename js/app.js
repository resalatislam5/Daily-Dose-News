// load-Categoty-Name 
const loadCategoriesName = async() =>{
    try {
        const res =await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data =await res.json();
        return data.data.news_category;
      } catch (error) {
        console.log('error')
      }
    
}
// Display-Categoty-Name 
const displayCategoriesName = async() =>{
    const categories = await loadCategoriesName ();
    const newsCategory = document.getElementById('ul-news-category');
    categories.forEach(category =>{
        const{category_name} = category;
        const li = document.createElement('li');
        li.classList.add('cursor-pointer')
        li.innerText = `${category_name}`
        newsCategory.appendChild(li)
    })
}
displayCategoriesName()
//load all news
const loadAllNews = async() =>{
    try {
        const res =await fetch(`https://openapi.programming-hero.com/api/news/category/01`);
        const data =await res.json();
        return data.data;
      } catch (error) {
        console.log('error')
      }
    
}
const displayAllNews = async() =>{
    const allNews =await loadAllNews ();
    const newsContainer = document.getElementById('news-container')
    allNews.forEach(category =>{
        const {author,thumbnail_url,details,title} = category;
        const {name,img,published_date} = author;
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('py-5')
        newsDiv.innerHTML =`
        <div class="flex flex-col p-5 bg-white rounded-lg border shadow-md md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${thumbnail_url ? thumbnail_url:'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}" alt="">
            <div class="h-full flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                <p class="mb-3 font-normal text-gray-700 py-5 dark:text-gray-400">${details.length > 300 ? details.slice(0,300)+'...':details}</p>
                <!--autor-ditals-->
                <div class ="grid grid-cols-4 gap-4">
                    <div class ="flex">
                        <img class="p-1 mt-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="${img}" alt="Bordered avatar">
                        <div class="px-3">
                        <p class="text-gray-700 font-semibold dark:text-gray-400">${name}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">${published_date}</p>
                        </div>
                    </div>

                </div>
            </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv)
    })
}
displayAllNews()