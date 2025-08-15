let btc = document.getElementById('bitcoin');
let eth = document.getElementById('ethereum');
let doge = document.getElementById('dogecoin');


fetch( "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin&vs_currencies=usd")
.then(response => response.json())
.then(data => {
  btc.textContent = data.bitcoin.usd;
  eth.textContent = data.ethereum.usd;
  doge.textContent = data.dogecoin.usd;
  
  
})
.catch(error => console.log("Error fetching data: ",error));