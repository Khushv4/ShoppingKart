function getQueryParams(){
  const queryParams= new URLSearchParams(window.location.search);
  const queryParamsObject=Object.fromEntries(queryParams.entries());
  return queryParamsObject;
}

async function fetchProductById(id) {
  const product = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return product.data;
  
}

function removeLoader(){
  const loaderBackdrop = document.querySelector('#loader-backdrop');
  loaderBackdrop.style.display ='none';
}