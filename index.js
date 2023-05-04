const urlMain = "https://dog.ceo/api";
class DogRandom {
  constructor() {
    fetch(`${urlMain}/breeds/image/random`)
      .then((dog) => {
        return dog.json();
      })
      .then((dogShow) => {
        return dogShow.message;
      })
      .then((url) => {
        this.dogRandom(url);
      })
      .catch((err) => {
        console.log("Niestety, błąd!", err);
      });
  }

  dogRandom = (url) => {
    const div = document.body.querySelector("div.breed__dog");
    div.innerHTML = `<img src="${url}">`;
  };
}

class DogsBreeds {
  constructor() {
    fetch(`${urlMain}/breeds/list/all`)
      .then((breeds) => {
        return breeds.json();
      })
      .then((breedsList) => {
        return breedsList.message;
      })
      .then((breeds) => {
        this.showBreeds(breeds);
      })
      .catch((err) => {
        console.log("Niestety, błąd!", err);
      });
  }

  showBreeds = (list) => {
    const breedsE = Object.entries(list);
    const divLink = document.body.querySelector("div.breeds__link");

    // SUBBREED
    breedsE.forEach((elem) => {
      if (elem[1] != 0) {
        for (let i = 0; i < elem[1].length; i++) {
          fetch(`${urlMain}/breed/${elem[0]}/${elem[1][i]}/images/random`)
            .then((img) => {
              return img.json();
            })

            .then((img) => {
              const a = document.createElement("a");
              divLink.appendChild(a);
              a.classList.add("breeds__link__dog");
              a.textContent = `${elem[1][i]} ${elem[0]}`;
              a.setAttribute("id", `${img.message}`);
            });
        }
      } else {
        fetch(`${urlMain}/breed/${elem[0]}/images/random`)
          .then((img) => {
            return img.json();
          })

          .then((img) => {
            const a = document.createElement("a");
            divLink.appendChild(a);
            a.classList.add("breeds__link__dog");
            a.textContent = elem[0];
            a.setAttribute("id", `${img.message}`);
          });
      }
    });
  };
}

new DogRandom();
new DogsBreeds();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const test = document.getElementsByClassName("breeds__link__dog");
    const div = document.querySelector("div.breed__dog");
    const divRandom = document.querySelector("div.random h1");

    for (let i = 0; i < test.length; i++) {
      test[i].addEventListener("click", () => {
        div.innerHTML = `<img src="${test[i].attributes.id.value}"> <p>${test[i].firstChild.data.toUpperCase()}</p>`;
        divRandom.textContent = "";
        scrollTo(0, 0);
      });
    }
  }, 1000);
});
