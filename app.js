//Empezar por las 500 codelines con toda la logica para el portafolio 

const clothes = [
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

const containerClothes = document.getElementById("container__clothes")
const containerBuyItemes= document.querySelector('.buy__items')

let objClothesBuy = {}



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
                    <button id="${id}" class="card__buton btn__add"> Lo Quiero ! </button>
                </div>
            </div> `
    })
    containerClothes.innerHTML= html
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
}

printClothes()

// Togle para el icono del buyCar

const buyCar = document.getElementById('icon__buyCar')
const clothesBuy = document.querySelector('.clothes__buy')

buyCar.addEventListener('click', () => { 
    clothesBuy.classList.toggle("clothes__buy--show")
});

//Funcionalidad para agregar pintar elementos en la seccion del carrito 

containerClothes.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn__add')) { 
        const idClothes = Number(e.target.id)

        const currentClothes = clothes.find((item) => item.id === idClothes)

        if (objClothesBuy[currentClothes.id]) {
            objClothesBuy[currentClothes.id].amount++ 

        } else {
            objClothesBuy[currentClothes.id] = currentClothes
            objClothesBuy[currentClothes.id].amount = 1
        }

        printInBuyCar()
    };

})

//funcionalidad para los botenes en la seccion del carrito 
containerBuyItemes.addEventListener('click', (e) => {
    if (e.target.classList.contains('buycar__btn--add')) {
        const idFoodBuycar = Number(e.target.id) 
        objClothesBuy[idFoodBuycar].amount++ 
    }
    if (e.target.classList.contains('buycar__btn--del')) {
        const idFoodBuycar = Number(e.target.id) 
        objClothesBuy[idFoodBuycar].amount--
    }
    if (e.target.classList.contains('buycar__deleteItem')) {
        const idFoodBuycar = Number(e.target.id) 
        delete objClothesBuy[idFoodBuycar]
    }

    printInBuyCar()
})