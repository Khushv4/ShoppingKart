async function fetchCategories(){
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}

async function populateCategories(){
  const categories = await fetchCategories();
  const categoryList = document.querySelector('#categoryList');
  categories.forEach(category => {
    const categoryHolder = document.createElement('div');
    const categoryLink = document.createElement('a');
    categoryLink.href =`productList.html?category=${category}`;
    categoryHolder.classList.add('category-item', 'd-flex', 'align-items-center', 'justify-content-center');
    categoryLink.textContent = category;
    categoryHolder.appendChild(categoryLink);// adding a tag to catgeory holder (div)
    categoryList.appendChild(categoryHolder);  
  });
}
populateCategories();