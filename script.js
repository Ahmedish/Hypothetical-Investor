var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear() - 1;
today = yyyy + '-' + mm + '-' + dd;

document.getElementById("myDate").min = today;

const form = document.querySelector("#inputForm");
const params = {
    access_key: '076c9167c2ddfaab6a4f773eefc1193e'
}
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const symbol = form.elements.symbol.value;
    const shares = form.elements.numShares.value;
    const date = form.elements.d.value;
    const res = await axios.get(`http://api.marketstack.com/v1/tickers/${symbol}/eod/${date}`, { params });
    const initPrice = res.data.close;
    const res2 = await axios.get(`http://api.marketstack.com/v1/tickers/${symbol}/eod/latest`, { params });
    const finPrice = res2.data.close;
    let profit = shares * (finPrice - initPrice);
    const h2 = document.querySelector("#message");
    if (profit > 0) {
        h2.innerHTML = `You would have made ${profit} dollars`
    } else if (profit < 0) {
        profit = profit * -1;
        h2.innerHTML = `You would have lost ${profit} dollars`
    } else {
        h2.innerHTML = `You would have broke even`
    }
})