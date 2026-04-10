const cartData = JSON.parse(localStorage.getItem('cart')) || [];
const summaryContainer = document.getElementById('checkout-summary');
const totalUSD = document.getElementById('checkout-total-usd');
const totalZAR = document.getElementById('checkout-total-zar');
const confirmBtn = document.getElementById('confirm-purchase');
const clearBtn = document.getElementById('clear-cart');
const modal = document.getElementById('confirmation-modal');
const closeModalBtn = document.getElementById('close-modal');

function formatCurrency(amount) {
  return parseFloat(amount).toFixed(2);
}

function renderCheckoutSummary() {
  summaryContainer.innerHTML = '';
  let total = 0;

  cartData.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.title} – Qty: ${item.quantity} – Price: ${formatCurrency(item.price)} USD
    `;
    summaryContainer.appendChild(li);
    total += item.price * item.quantity;
  });

  totalUSD.textContent = formatCurrency(total);
  totalZAR.textContent = formatCurrency(total * 18.8); // Example conversion rate
}

function clearCart() {
  localStorage.removeItem('cart');
  location.reload();
}

function confirmPurchase() {
  modal.style.display = 'block';
  setTimeout(() => {
    localStorage.removeItem('cart');
    window.location.href = '/thank-you.html'; // Replace with your actual redirect page
  }, 3000);
}

function closeModal() {
  modal.style.display = 'none';
}

renderCheckoutSummary();
clearBtn.addEventListener('click', clearCart);
confirmBtn.addEventListener('click', confirmPurchase);
closeModalBtn.addEventListener('click', closeModal);
