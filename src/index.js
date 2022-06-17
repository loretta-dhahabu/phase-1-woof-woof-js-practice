document.addEventListener("DOMContentLoaded", () => {
  dogBarDiv();

  const allDog = document.getElementsByTagName("span");
  setTimeout(() => {
    Array.from(allDog).forEach((dog) => {
      dog.addEventListener("click", (eventFn) => {
        pupName = eventFn.target.innerText;
        allPup().then((data) => {
          data.forEach((dog) => {
            if (dog.name === pupName) {
              pupContainer(dog);
              const goodOrBad = document
                .querySelector("#dog-info")
                .querySelector("button");
              goodOrBad.addEventListener("click", (eventFn) => {
                let isGood =
                  eventFn.target.innerText.replace("!", "") === "true";
                eventFn.target.innerText = `${!isGood}!`;
                let newDog = !isGood;
                updatePup(dog.id, newDog);
              });
            }
          });
        });
      });
    });
  }, 1000);
});

function allPup ()
{
  return fetch("http://localhost:3000/pups")
    .then((res) => res.json())
    .then((data) => data);
}

function dogBarDiv() {
  allPup().then((data) => {
    const dogBarDiv = document.querySelector("#dog-bar");
    Array.from(data).forEach((dog) => {
      const dogName = document.createElement("span");
      dogName.innerText = dog.name;
      dogBarDiv.appendChild(dogName);
    });
    return data;
  });
}

function pupContainer(dogObject) {
  const dogInfo = document.querySelector("#dog-info");
  const img = document.createElement("img");
  const name = document.createElement("h2");
  const btn = document.createElement("button");
  dogInfo.innerHTML = "";
  img.src = dogObject.image;
  name.innerText = dogObject.name;
  btn.innerText = `${dogObject.isGoodDog}!`;
  dogInfo.append(img, name, btn);
}

function updatePup ( id, isGood )
{
  fetch(`http://localhost:3000/pups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      isGoodDog: isGood,
    }),
  }).then((res) => res.json());
}