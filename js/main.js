let Weather = {
  apiKey: "1abc3bd6bfdef6f8c2fe3f7e1751684a",
};
const showSearch = () => {
  let add = document.querySelector(".add");
  if (add.classList.contains("hide")) {
    add.classList.remove("hide");
  } else {
    add.classList.add("hide");
  }
};
