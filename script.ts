let currencyEl_one = document.getElementById(
  "currency-one"
) as HTMLSelectElement;
let amountEl_one = document.getElementById("amount-one") as HTMLInputElement;
let currencyEl_two = document.getElementById(
  "currency-two"
) as HTMLSelectElement;
let amountEl_two = document.getElementById("amount-two") as HTMLInputElement;
let rateEl = document.getElementById("rate");
let swap = document.getElementById("swap");
// Fetch exchange rates and update the DOM
function caclulate() {
  let currency_one = currencyEl_one.value;
  let currency_two = currencyEl_two.value;
  fetch("https://api.exchangerate-api.com/v4/latest/" + currency_one)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      // console.log(data);
      var rate = data.rates[currency_two];
      rateEl.innerText =
        "1 " + currency_one + " = " + rate + " " + currency_two;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}
// Event listeners
currencyEl_one.addEventListener("change", caclulate);
amountEl_one.addEventListener("input", caclulate);
currencyEl_two.addEventListener("change", caclulate);
amountEl_two.addEventListener("input", caclulate);
swap.addEventListener("click", function () {
  var temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});
caclulate();
