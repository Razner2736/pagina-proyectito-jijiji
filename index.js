const btnCart = document.querySelector('.container-cart-icon')
const containerCartProductos = document.querySelector('.container-cart-productos')


btnCart.addEventListener('click',() => {
 containerCartProductos.classList.toggle('hidden-cart')
})





const cartInfo = document.querySelector('.cart-producto')

const rowProducto = document.querySelector('.row-producto')
const productosList = document.querySelector('.container-items')

let allProductos = []


const valorTotal = document.querySelector('.total-pagar')

const countProductos = document.querySelector('#contador-productos')

productosList.addEventListener('click', e => {

    if(e.target.classList.contains('btn-add-cart')){
       const producto = e.target.parentElement

        const infoProducto = {
            quantity: 1,
            title: producto.querySelector('h2').textContent,
            precio: producto.querySelector('p').textContent,
        };

         const exits = allProductos.some(producto => producto.title === infoProducto.title)

                if (exits){
                    const productos = allProductos.map(producto => {
                        if(producto.title === infoProducto.title){
                            producto.quantity++;
                            return producto
                        } else{
                            return producto
                        }

                        
                    
                     })
                    allProductos = [...productos]
                    }else{
                        allProductos = [...allProductos, infoProducto];
                    }



        

        showHTML();
    }


});


rowProducto.addEventListener('click', (e) => {
if(e.target.classList.contains('icon-close')){
    const producto = e.target.parentElement 
    const title= producto.querySelector('p').textContent


    allProductos = allProductos.filter(
        producto => producto.title !== title
        );

        console.log(allProductos)
        showHTML()
}
});






const showHTML = () => {

if(!allProductos.length){
    containerCartProductos.innerHTML= `
    <p class= "cart-empty">El carrito esta vacio</p>
    `
}




    rowProducto.innerHTML = '';

    let total = 0;
    let totalOfProductos = 0;

    allProductos.forEach(producto => {
    const containerProducto = document.createElement('div')

    containerProducto.classList.add('cart-producto');



containerProducto.innerHTML = `
 <div class="info-cart-producto">
    <span class="cantidad-producto-carrito">${producto.quantity}</span>
    <p class="titulo-producto-carrito">${producto.title}</p>
    <span class="precio-producto-carrito">${producto.precio}</span>
    </div>
    <svg 
    xmlns="http://www.w3.org/2000/svg"
     fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" 
      class="icon-close">
      
      <path stroke-linecap="round"
       stroke-linejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
         />
         </svg>

         `;

   rowProducto.append(containerProducto);

total = total + parseInt(producto.quantity * producto.precio.slice(1));
totalOfProductos = totalOfProductos + producto.quantity;



});

 valorTotal.innerText = `$${total}`;
 countProductos.innerText = totalOfProductos;

}