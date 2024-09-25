document.addEventListener("DOMContentLoaded",async ()=>{
  async function fetchProducts(){
    const response =await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    return response.data;
    
  }
  async function fetchProductsByCategory(category) {
    const response =await axios.get(`https://fakestoreapi.com/products/category/${category}`);
    console.log(response.data);
    return response.data;
  }

  async function fetchCategories(){
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
  }

  const downloadedProducts =await fetchProducts();

async function populateProducts(flag, customProducts){
  let products= customProducts;
  const queryParams= new URLSearchParams(window.location.search);
  const queryParamsObject=Object.fromEntries(queryParams.entries());
  if(flag == false){
    if (queryParamsObject['category']){
      products = await fetchProductsByCategory(queryParamsObject['category']);

    }else{
    products = await fetchProducts();
    }
  }
 
  const productList = document.querySelector('#productList');
  products.forEach(product => {
    const productItem = document.createElement('a');
    productItem.target = '_blank';
    productItem.href='productDetails.html';
    productItem.classList.add('product-item', 'text-decoration-none',  'd-inline-block');

    const productImg = document.createElement('div');
    productImg.classList.add('product-img');

    const imageInsideProductImage = document.createElement('img');
    imageInsideProductImage.src = product.image;

    const name = document.createElement('div');
    name.classList.add("product-name", "text-center");
    const price = document.createElement('div');
    price.classList.add("product-price", "text-center");


    name.textContent= product.title.substring(0,12)+"...";
    price.textContent= `₹${product.price}`;
    //append div 

    productImg.appendChild(imageInsideProductImage);
    productItem.appendChild(productImg);
    productItem.appendChild(name);
    productItem.appendChild(price);



    productList.appendChild(productItem);
  });
} 


async function populateCategories(){
    const categories = await fetchCategories();
    const categoryList = document.querySelector('#categoryList');
      categories.forEach(category=>{
        const categoryLink = document.createElement('a');
        categoryLink.classList.add('d-flex', 'text-decoration-none');
        categoryLink.textContent = category;
        categoryLink.href=`productList.html?category=${category}`;

        categoryList.appendChild(categoryLink);
      });

}


async function downloadContentAndPopulate(){
Promise.all([populateProducts(false), populateCategories()])
.then(() =>{
  const loaderBackdrop = document.querySelector('#loader-backdrop');
  loaderBackdrop.style.display ='none';
});
}

downloadContentAndPopulate();

const filterSearch = document.querySelector('#SSearch');
 filterSearch.addEventListener("click",async ()=>{
  const productList = document.querySelector('#productList');
  const minPrice = Number(document.querySelector('#minPrice').value);
  const maxPrice = Number(document.querySelector('#maxPrice').value);

  const products = downloadedProducts;
  filteredProducts= products.filter(product => product.price>=minPrice && product.price<=maxPrice);
  productList.innerHTML ="";
  populateProducts(true, filteredProducts);

 });

 const resetFilter = document.querySelector('#clear');
 resetFilter.addEventListener("click", ()=>{
  window.location.reload();
 });

});


 