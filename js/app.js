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
        console.log(category)
        newsCategory.appendChild(li)
    })
}
displayCategoriesName()