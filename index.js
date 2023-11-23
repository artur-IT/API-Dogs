const urlMain = "https://dog.ceo/api";
const tabBreeds = [];

class DogRandom {
  constructor() {
    fetch(`${urlMain}/breeds/image/random`)
      .then((dog) => dog.json())
      .then((dogShow) => dogShow.message)
      .then((url) => this.dogRandom(url))
      .catch((err) => console.log("Uppps, something's wrong!", err));
  }

  dogRandom = (url) => {
    const cutURL = url.slice(30);
    document.body.querySelector("div.breed__dog").innerHTML = `<img src="${url}" alt="${cutURL}" title="${cutURL}">`;
  };
}

class DogsBreeds {
  constructor() {
    fetch(`${urlMain}/breeds/list/all`)
      .then((breeds) => breeds.json())
      .then((breedsList) => breedsList.message)
      .then((breeds) => this.showBreeds(breeds))
      .catch((err) => console.log("Uppps, something's wrong!", err));
  }

  showBreeds = (list) => {
    const breedsE = Object.entries(list);
    breedsE.forEach((elem) => {
      if (elem[1] != 0) {
        for (let i = 0; i < elem[1].length; i++) {
          fetch(`${urlMain}/breed/${elem[0]}/${elem[1][i]}/images/random`)
            .then((img) => img.json())
            .then((img) => tabBreeds.push(`${elem[0]} ${elem[1][i]}`, img.message));
        }
      }

      fetch(`${urlMain}/breed/${elem[0]}/images/random`)
        .then((img) => img.json())
        .then((img) => tabBreeds.push(elem[0], img.message));
    });
  };
}

// add to DOM link tiles
toHTML = () => {
  for (let i = 0; i < tabBreeds.length; ) {
    const link = document.createElement("a");
    document.body.querySelector("div.breeds__link").appendChild(link);
    link.classList.add("breeds__link__dog");
    link.textContent = `${tabBreeds[i]} `;
    link.setAttribute("id", `${tabBreeds[i + 1]}`);
    i += 2;
  }
};

new DogRandom();
new DogsBreeds();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    toHTML();
    // add to DOM clicked dog img with description
    const link = [...document.getElementsByClassName("breeds__link__dog")];
    link.forEach((item, index) => {
      item.addEventListener("click", () => {
        document.querySelector("div.breed__dog").innerHTML = `<img src="${link[index].attributes.id.value}" alt="${link[index].innerHTML}"> 
        <p>${link[index].firstChild.data.toUpperCase()}</p>`;
        document.querySelector("div.random h1").textContent = "";
        scrollTo(0, 0);
      });
    });
  }, 1000);
});
