document.addEventListener("DOMContentLoaded", () => {
async function populateProduct(){
  const queryParams = getQueryParams();
  if(queryParams['id']){
    const productId= queryParams['id'];
    const product = await fetchProductById(productId);
    console.log(product);

    const productName = document.querySelector('#product-name');
    const productPrice = document.querySelector('#product-price');
    const productDesc = document.querySelector('#product-description-data');
    const productImage = document.querySelector('#product-img');


    productName.textContent = product.title;
    productDesc.textContent = product.description;
    productPrice.textContent = product.price;
    productImage.src = product.image;
    removeLoader();
  }
}

populateProduct(); 
});