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
        const{category_name,category_id} = category;
        const li = document.createElement('li');
        li.classList.add('cursor-pointer')
        li.innerHTML = `
        <button onclick ="displayAllNews('${category_id}')"  type="button" class="text-xl px-5 py-2.5 mr-2 mb-2">${category_name}</button>
        `
        newsCategory.appendChild(li)
        displaySpiner(true)
    })
}
displayCategoriesName()
//load all news
const loadAllNews = async(category_id) =>{
    try {
        const res =await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`);
        const data =await res.json();
        return data.data;
      } catch (error) {
        console.log('error')
      }
    
}
const displayAllNews = async(category_id) =>{
    const allNews =await loadAllNews (category_id);
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    const DisplayTotalFound = document.getElementById('found-catagories');
    DisplayTotalFound.textContent = '0';
    let totalFound = 0;
    let totalview = [];
    allNews.forEach(category =>{
        const {author,thumbnail_url,details,title,total_view,rating,category_id} = category;
        const {name,img,published_date} = author;
        totalFound = totalFound + Number(category_id);
        DisplayTotalFound.innerText = totalFound;
        if(0 < total_view){
            totalview.push(total_view);
        }
        console.log(totalview)
        if(Math.max(...totalview) > total_view){
            console.log(total_view)
        }
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('py-5')
        newsDiv.innerHTML =`
        <div class="flex flex-col p-5 bg-white rounded-lg border shadow-md md:flex-row md:w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${thumbnail_url ? thumbnail_url:'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}" alt="">
            <div class="h-full flex flex-col justify-between p-4 leading-normal">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${title}</h5>
                <p class="mb-3 font-normal text-gray-700 py-5 dark:text-gray-400">${details.length > 300 ? details.slice(0,300)+'...':details}</p>
                <div class ="grid md:grid-cols-4 grid-cols-1 gap-4">
                <!--autor-ditals-->
                    <div class ="flex">
                        <img class="p-1 mt-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="${img ? img:'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}" alt="Bordered avatar">
                        <div class="px-3">
                        <p class="text-gray-700 font-semibold dark:text-gray-400">${name ? name: 'No Data Found'}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">${published_date ? published_date : 'No Data Found'}</p>
                        </div>
                    </div>
                <!--autor-ditals-end-->
                <!--view-ditals-->
                    <div class ="flex items-center">
                        <img class="p-1 mt-1 w-10 h-10 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="../images/carbon_view.png" alt="Bordered avatar">
                        <div class="px-3 items-center">
                        <p class="text-gray-700 font-semibold dark:text-gray-400">${total_view ? total_view:'No Data Found'}</p>
                        </div>
                    </div>
                <!--view-ditals-end-->
                <!--rating-ditals-->
                    <div class="flex px-3 items-center">
                        <p class="text-gray-700 font-semibold dark:text-gray-400">${rating.badge ? rating.badge:'No Data Found'}</p>
                    </div>
                <!--rating-ditals-end-->
                <!--button-ditals-->
                <div class ="flex items-center justify-end">
                    <button onclick = "displaymodal('${thumbnail_url}','${title}','${published_date}','${name}' )" class=" text-blue-700  font-medium rounded-lg   w-16 type="button" data-modal-toggle="defaultModal">
                    <svg  aria-hidden="true" class="ml-2 -mr-1 w-10 h-9" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <!--button-ditals-end-->
                </div>
            </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv)
        displaySpiner(false)
    })
}

// model 
// set the modal menu element
const targetEl = document.getElementById('modalEl');

// options with default values
const options = {
  placement: 'bottom-right',
  backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  onHide: () => {
  },
  onShow: () => {
  },
  onToggle: () => {
  }
};
const modal = new Modal(targetEl, options);

const displaymodal = (thumbnail_url,title,name,published_date) =>{
    console.log(title)
    const extralargeModal = document.getElementById('modal-content');
    extralargeModal.innerHTML =`
    <!-- Modal header -->
                    <div class="flex justify-center pt-3">
                    <img class="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${thumbnail_url ? thumbnail_url:'https://www.publicdomainpictures.net/pictures/280000/nahled/not-found-image-15383864787lu.jpg'}" alt="">
                    </div>
                    <div class="flex justify-between items-start p-5 rounded-t border-b dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white">
                           ${title}
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                            <svg onclick="modal.hide()" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>  
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6 space-y-6">
                        <p class="text-gray-700 font-semibold dark:text-gray-400">${name ? name: 'No Data Found'}</p>
                        <p class="font-normal text-gray-700 dark:text-gray-400">${published_date ? published_date : 'No Data Found'}</p>
                    </div>
                    <!-- Modal footer -->
                    <div  class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button onclick="modal.hide()" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Decline</button>
                    </div>
    `
    modal.toggle()
}
const displaySpiner =spiner=>{
    const spinerContainer = document.getElementById('spiner-container');
    if(spiner){
        spinerContainer.classList.remove('hidden')
    }else{
        spinerContainer.classList.add('hidden')
    }
}
displayAllNews('07')