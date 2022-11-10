
const containerClothes = document.getElementById("container__clothes")
const containerBuyItemes= document.querySelector('.buy__items')
const buyTotal= document.querySelector('.buy__total')  
const buyCar = document.getElementById('icon__buyCar')
const clothesBuy = document.querySelector('.clothes__buy')


//funcionalidad para pintar las cards  en la galery
let clothes = [
    {
        id: 0,
        nombre:'HODDIES',
        colection: true,
        stock: 4,
        price: 16,
        url: "./img/featured1.png"  
    },

    {
        id: 1,
        nombre:'SHIRTS',
        colection: true,
        stock: 6,
        price: 14,
        url: "./img/featured2.png"  
    },

    {
        id: 2,
        nombre:'SWEATSHIRTS',
        colection: true,
        stock: 8,
        price: 15,
        url: "./img/featured3.png"  
    },
]

function printClothes() {
    let html = ``
    clothes.map(({id,nombre,colection,stock,price,url}) => {
        html +=  `
            <div id="${id}" class="cards__shop">
                <div class="card__img" >
                    <img src=${url}>
                </div>
                <div class="card__content">
                    <div class="product__colection">
                        <h4 class="card__title"> ${nombre} </h4>
                        <p class="text__colection"> Colection 2022 </p>
                    </div>
                    <div class="price__stock">
                        <span class="stock"> ${stock} Disponibles </span>
                        <h3 class="price"> $${price}.00 </h3>
                    </div>
                    <button id="${id}" class="card__buton btn__add"> Add to Car </button>
                </div>
            </div> `
    })
    containerClothes.innerHTML= html
}
printClothes()

// Funcionalidades dentro de la Seccion del Carrito de Compras
let objClothesBuy = {}
 
function printBuyTotal(){
    const arrayTotalBuy = Object.values(objClothesBuy)
    if(!arrayTotalBuy.length) {
        clothesBuy.innerHTML = `
            <div class="carEmpty">
                <img class="img__carEmpty" src="./img/trash.png">
                <p class="text__carEmpty"> Aun no hay Productos Aqui </p4>
             </div> `
    } else {
        let total = arrayTotalBuy.reduce((acum, curr) => {
            acum += curr.price * curr.amount
            return acum
        },0)
    
        buyTotal.innerHTML = `
            <div class="total__result">
                <div>
                    <h3 class="total__result--text"> Total:  </h3>
                    <h2 class="total__result--price"> $ ${total}.00 </h2>
                </div>
                <img src="./img/bolsa.png">
            </div>
            <button class="boton boton__total"> Comprar </button>  ` 
    }
}

function printInBuyCar() {
    let html = ``
    arrayBuyCard = Object.values(objClothesBuy)
    arrayBuyCard.map( ({id,nombre,price,url,amount}) => {
        html +=  `
        <div id="${id}" class="cards__shop card__buy">
            <div>
                <img  class="img__buy" src=${url}>
            </div>
            <div class="buy__content--card">
                <div class="product__colection">
                    <h4 class="buycard__title"> ${nombre} </h4>
                </div>
                <div class="buycar__items">
                    <div class="buycar__clothes">
                        <h4 class="buy__price"> $${price}.00 </h4>
                        <div class="buycar__stock">
                            <button class="buycar__btn buycar__btn--del" id="${id}" > - </button>
                            <span class="stock"> <b> ${amount} </b> Units </span>
                            <button class="buycar__btn buycar__btn--add" id="${id}" > + </button>
                        </div>
                        <p class="buycar__subtotal"> SubTotal: <b> $ ${price*amount} </b> </p>
                    </div>
                    <img id="${id}" class="buycar__deleteItem" src="./img/delete.svg" >
                </div>
            </div>
        </div>  `
    })
    containerBuyItemes.innerHTML = html
    printBuyTotal()
}

function addClothes(idClothes) {
    const currentClothes = clothes.find((item) => item.id === idClothes)

    if(currentClothes.stock === objClothesBuy[idClothes].amount)
        return alert("STOCK AGOTADO")
    objClothesBuy[currentClothes.id].amount++ 
}

function delClohtes(idClothes){
    const option = confirm("QUIERES QUITARLO DEL CARRITO?")
    if(option) { 
        delete objClothesBuy[idClothes]
    }
}


//Delegation-Events en la Gallery al Boton Agregar de cada Cards
containerClothes.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn__add')) { 
        const idClothes = Number(e.target.id)
        const currentClothes = clothes.find((item) => item.id === idClothes)

        if (objClothesBuy[currentClothes.id]) {
            addClothes(idClothes)

        } else {
            objClothesBuy[currentClothes.id] = {... currentClothes}
            objClothesBuy[currentClothes.id].amount = 1
        }
        printInBuyCar()
    };
})

//Delegation-Events a la Section de Compras en los Botones Aumentar Disminuir and Delete
containerBuyItemes.addEventListener('click', (e) => {

    if (e.target.classList.contains('buycar__btn--add')) {
        const idClothes = Number(e.target.id) 
        addClothes(idClothes)
    }

    if (e.target.classList.contains('buycar__btn--del')) {
        const idClothes = Number(e.target.id) 
        if (objClothesBuy[idClothes].amount === 1) {
            delClohtes(idClothes)
            
        } else {
            objClothesBuy[idClothes].amount--
        } 
    }

    if (e.target.classList.contains('buycar__deleteItem')) {
        const idClothes = Number(e.target.id) 
        delClohtes(idClothes)
    }

    printInBuyCar()
})

buyTotal.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton__total')) {
        const sure = confirm("Esta seguro de comprar?")
        if(sure) {
            clothes = clothes.map(item => {
                if (objClothesBuy[item.id]?.id === item.id ) {
                    return {
                        ... item,
                        stock: item.stock - objClothesBuy[item.id].amount
                    }; 
                } else {
                    return item
                }
            })
            objClothesBuy = {}
            printClothes()
            printInBuyCar() 
            
        }
    }   
})

//AddEvenListener al Icono del Carrito para mostrar la Seccion del Carrito de Compras
buyCar.addEventListener('click', () => { 
    clothesBuy.classList.toggle("clothes__buy--show")
});
