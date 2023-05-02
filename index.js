class DogRandom {
  constructor() {
    fetch("https://dog.ceo/api/breeds/image/random")
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
    fetch("https://dog.ceo/api/breeds/list/all")
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

    // SUBB REED
    breedsE.forEach((elem) => {
      if (elem[1] != 0) {
        for (let i = 0; i < elem[1].length; i++) {
          // console.log(elem[1][i]);
          fetch(`https://dog.ceo/api/breed/${elem[0]}/${elem[1][i]}/images/random`)
            .then((img) => {
              return img.json();
            })

            .then((img) => {
              const a = document.createElement("a");
              divLink.appendChild(a);
              a.classList.add("breeds__link__dog");
              a.textContent = `${elem[1][i].toUpperCase()} ${elem[0].toUpperCase()}`;
              a.setAttribute("id", `${img.message}`);
            });
        }
      } else {
        fetch(`https://dog.ceo/api/breed/${elem[0]}/images/random`)
          .then((img) => {
            return img.json();
          })

          .then((img) => {
            const a = document.createElement("a");
            divLink.appendChild(a);
            a.classList.add("breeds__link__dog");
            a.textContent = elem[0].toUpperCase();
            a.setAttribute("id", `${img.message}`);
          });
      }
    });
  };
}

// przenieś na górę!!!
// scrollTo(0,0)

new DogRandom();
new DogsBreeds();

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const test = document.getElementsByClassName("breeds__link__dog");
    const div = document.querySelector("div.breed__dog");
    const divRandom = document.querySelector("div.random h1");

    for (let i = 0; i < test.length; i++) {
      // console.log(test[i]);
      test[i].addEventListener("click", () => {
        // const breedName= test[i
        div.innerHTML = `<img src="${test[i].attributes.id.value}"> <p>${test[i].firstChild.data.toUpperCase()}</p>`;
        divRandom.textContent = "";
        scrollTo(0, 0);
      });
    }
  }, 1000);
});
