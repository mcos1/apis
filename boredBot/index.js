const buttonEl = document.getElementById("get-activity");

buttonEl.addEventListener("click", () => {
  fetch("https://www.boredapi.com/api/activity")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.getElementById("activity").textContent = data.activity;
      document.getElementById("title").textContent = "🦾 HappyBot🦿";
      document.body.classList.add("fun");
    });
});
