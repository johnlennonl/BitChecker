// API para obtener el precio actual de Bitcoin
const apiURL = 'https://api.coindesk.com/v1/bpi/currentprice/USD.json';

// Crear el contenido de la página con JavaScript
function createCalculator() {
  const container = document.createElement('div');
  container.classList.add('container');

  const priceCalc = document.createElement('div');
  priceCalc.classList.add('price-calc');

  // Crear el input para la cantidad de BTC
  const btcInput = document.createElement('input');
  btcInput.type = 'number';
  btcInput.id = 'btcAmount';
  btcInput.placeholder = '1';
  btcInput.value = '1';

  // Crear el input para el precio en USD
  const usdInput = document.createElement('input');
  usdInput.type = 'text';
  usdInput.id = 'btcPrice';
  usdInput.readOnly = true;

  // Crear los spans de texto
  const btcSpan = document.createElement('span');
  btcSpan.textContent = 'BTC';

  const equalSpan = document.createElement('span');
  equalSpan.textContent = '=';

  const usdSpan = document.createElement('span');
  usdSpan.textContent = 'USD';

  // Añadir los elementos al contenedor
  priceCalc.appendChild(btcInput);
  priceCalc.appendChild(btcSpan);
  priceCalc.appendChild(equalSpan);
  priceCalc.appendChild(usdInput);
  priceCalc.appendChild(usdSpan);

  container.appendChild(priceCalc);

  document.getElementById('app').appendChild(container);

  return { btcInput, usdInput };
}

// Obtener el precio del Bitcoin al cargar la página y actualizar el input
async function getBitcoinPrice() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const price = data.bpi.USD.rate_float;

    // Actualizar el título de la página con el precio del Bitcoin
    document.title = `BTC ${price.toFixed(2)} USD`;

    return price;
  } catch (error) {
    console.error('Error al obtener el precio del Bitcoin:', error);
    return 0;
  }
}

// Actualizar el input de USD basado en la cantidad de BTC
async function updatePrice(btcAmountInput, usdPriceInput) {
  const btcAmount = btcAmountInput.value;
  const btcPrice = await getBitcoinPrice();

  if (btcAmount && btcPrice) {
    const total = btcAmount * btcPrice;
    usdPriceInput.value = total.toFixed(2);
  } else {
    usdPriceInput.value = '0.00';
  }
}

// Función principal que arranca la aplicación
async function main() {
  const { btcInput, usdInput } = createCalculator();
  
  // Obtener el precio inicial de Bitcoin
  const btcPrice = await getBitcoinPrice();
  usdInput.value = btcPrice.toFixed(2);

  // Evento para actualizar cuando se cambia la cantidad de BTC
  btcInput.addEventListener('input', () => updatePrice(btcInput, usdInput));
}

// Ejecutar la aplicación
main();
