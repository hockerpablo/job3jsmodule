const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const registerForm = document.getElementById("registerForm");
const numberIdPizza = document.getElementById("numberIdPizza");
const contentResult = document.getElementById("contentResult");


const ultima =JSON.parse(localStorage.getItem("ultima")) || [];

//guardamos las zappis en localstorage

const saveToLocalStorage = (ultimo) => {
  localStorage.setItem("ultima", JSON.stringify(ultimo));
};

//aca recibimos el id desde el input

const buscarID = (id) => {
  return pizzas.find((pizza) => pizza.id == id);
};

const createCard = (pizza) => {
  contentResult.innerHTML = `
  <div class="card">
  <p class="mensaje">is You Pizza</p>
    <img src="${pizza.imagen}" class="card-img" alt="img pizza" />
      <div class="card-info">
        <p class="pizza-name"><span>${pizza.nombre}</span></p>
        <p class="pizza-price">Precio: <span>$${pizza.precio}</span></p>
      </div>
  </div>`;
};

const restorePizza = () =>{
  if (ultima) {
    contentResult.innerHTML = `
    <div class="card">
    <p class="mensaje">Last Pizza</p>
    
      <img src="${ultima.imagen}" class="card-img" alt="img pizza" />
        <div class="card-info">
          <p class="pizza-name"><span>${ultima.nombre}</span></p>
          <p class="pizza-price">Precio: <span>$${ultima.precio}</span></p>
        </div>
    </div>`;
  }
};


const showError = (message) =>{
  return(contentResult.innerHTML = ` <div class="errorCard">
  <p class="sError">¡Error!</p>
  <p class="sError">${message}</p>
  <img src="https://heraldodemexico.com.mx/u/fotografias/m/2021/2/26/f768x1-327741_327868_71.jpg" class="errorCard-img" alt="img de señor que no se rie" /> 
  
</div>`)
};

const verification = (input) =>{
  return!input.value;
};


const checkinput = (input)=> {
  let valid = false;

  if (verification (input)){
  showError(
"no se pueden poner simbolos ni letras, ingrese solamtene numeros");
return;
}
valid = true;
return valid;
};




const ejecutar = (e) => {
  e.preventDefault();
  let isValidInput = checkinput (numberIdPizza);

  if (isValidInput){
    const idIngrsado =numberIdPizza.value;

    let isYouPizza =buscarID(idIngrsado);

    if (isYouPizza){
      restorePizza(ultima);
      createCard(isYouPizza);
      saveToLocalStorage(isYouPizza);
    } else {
      showError("no se puede encontrar la pizza");
    }
  }
};

const init = () =>{
  document.addEventListener("DOMContentLoaded", restorePizza);
  registerForm.addEventListener("submit", ejecutar);
};
init();