export function hideFooter() {
  const footer = document.querySelector(".related-series");
  console.log(footer);
  window.addEventListener("scroll", function (e) {
    console.log(window.scrollY);
    if (window.scrollY > window.innerHeight / 2) footer.style.display = "block";
  });
}

export const randomnumber = (max, min) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const extractDataFromMovie = (index, { id, name, poster_path }) => {
  return { index, id, title: name, image: poster_path || "" };
};

export const cleanDataset = (dataset) =>
  dataset.map((movie, i) => {
    return extractDataFromMovie(i, movie);
  });

export function removeDuplicates(originalArray, prop) {
  var newArray = [];
  var lookupObject = {};

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}
