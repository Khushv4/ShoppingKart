document.addEventListener("DOMContentLoaded", ()=>{
  async function fetchProducts(){
    const response =await axios.get("https://fakestoreapi.com/products");
    console.log(response.data);
    return response.data;
    
  }

async function populateProducts(){
  const products = await fetchProducts();
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
    price.textContent= `&#8377;,${product.price}`;
    //append div 

    productImg.appendChild(imageInsideProductImage);
    productItem.appendChild(productImg);
    productItem.appendChild(name);
    productItem.appendChild(price);



    productList.appendChild(productItem);
  });
} 
populateProducts();
});