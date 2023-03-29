const searchInp = document.querySelector(".search");

const searchBtn = document.querySelector(".btn-search");

const cinemaCards = document.querySelector(".cinemaCards");

const loader = document.querySelector(".loader");

loader.style.display = "none";

const cinemaAsync = async function (searchInp) {
  cinemaCards.innerHTML = "";
  loader.style.display = "block";

  try {
    const getDataJson = await fetch(
      `https://www.omdbapi.com/?apikey=1fd18c03&s=${searchInp.value}`
    );

    const getData = await getDataJson.json();

    console.log(getData);

    loader.style.display = "none";

    renderHtml(getData.Search);
  } catch (error) {
    throw new Error(error);
  }
};

searchBtn.addEventListener("click", function () {
  cinemaAsync(searchInp);
});

const renderHtml = function (arr) {
  arr.forEach((element) => {
    renderHtmlEl(element);
  });
};

const renderHtmlEl = function (element) {
  const html = `<div class="cinemaBox">
        <div class="cinemaBox__img" style="background-image: url(${element.Poster});" ></div>
        <p class="cinemaBox__title">${element.Title}</p>
        <p class="cinemaBox__year">${element.Year}</p>
      </div>`;

  cinemaCards.insertAdjacentHTML("afterbegin", html);
};

document.addEventListener("keydown", function (event) {
  if (event.code === "Enter") {
    cinemaAsync(searchInp);
  }
});
