const fetch = require("node-fetch");
const API_KEY = process.env.EXCHANGE_API_KEY;

async function convertCurrency(amount, from = "USD", to = "USD") {
  if (from === to) return amount;  
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.result === "success") {
    return data.conversion_result;
  } else {
    throw new Error("Currency conversion failed");
  }
}

function getCurrencySymbol(currency) {
  const symbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
  };
  return symbols[currency] || currency;
}

module.exports = { convertCurrency, getCurrencySymbol };
