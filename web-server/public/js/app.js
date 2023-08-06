console.log("Client side javascript file is loaded");

const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const responesDiv = document.querySelector("#response");
const weatherImg = document.createElement("img");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        messageTwo.textContent = " ";
        messageOne.textContent = "loading...";
        if (data.error) {
          messageOne.textContent = data.error;
          responesDiv.removeChild(weatherImg);
        } else {
          let { name, region, country } = data.location;
          let {
            temperature,
            weather_descriptions: desc,
            weather_icons,
          } = data.current;

          weatherImg.setAttribute("src", weather_icons[0]);
          weatherImg.setAttribute("alt", "weather");
          responesDiv.insertAdjacentElement("afterbegin", weatherImg);

          messageOne.textContent = `${name}, ${region}, ${country}`;
          messageTwo.textContent = `Mostly ${desc.join(
            ","
          )}. it is curreltly ${temperature}`;
        }
      });
    }
  );
});
