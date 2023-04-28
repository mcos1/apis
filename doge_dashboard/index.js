fetch(
  "https://api.unsplash.com/photos/random?client_id=-rZaoHPQIQKtEgxuHCcl_X3TZiIKq_0JTNDApzQLEQA"
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data.urls.regular);
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.getElementById("author").textContent = `By ${data.user.name}`;
  })
  .catch(err => {
    document.body.style.backgroundImage = `
    url(https://www.usnews.com/object/image/00000187-2d9a-df9d-a7af-fd9a99890000/gettyimages-1321228030.jpg?update-time=1680097403651&size=responsive640)`;
  })

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
  .then((res) => {
    if (!res.ok) {
      throw Error("Something went wrong");
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById("crypto-top").innerHTML = `
    <img src=${data.image.small}>
    <span>${data.name}</span>
  `;

    document.getElementById("crypto").innerHTML += `
    <p>Current price: $${data.market_data.current_price.usd}</p>
    <p>Highest 24h: $${data.market_data.high_24h.usd}</p>
    <p>Lowest 24h: $${data.market_data.low_24h.usd}</p>
    `;
  })
  .catch((err) => console.error(err));

setInterval(() => {
  const date = new Date();
  document.getElementById("time").textContent = date.toLocaleTimeString("en-us", { timeStyle: "short" })
}, 100)

