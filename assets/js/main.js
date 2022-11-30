function formulario() {
  const form = document.querySelector("#formulario");
  const login = form.querySelector("#login");
  const password = form.querySelector("#password");
  const confirmation = form.querySelector("#confirmation");
  const email = form.querySelector("#email");
  const button = form.querySelector("#button");
  const small = form.querySelector("#erro");

  const inputsValues = [login, password, confirmation, email];

  button.addEventListener("click", (event) => {
    event.preventDefault();

    const filterInput = inputsValues.filter((input) =>
      !!input.value.trim() === false
        ? input.nextElementSibling.classList.add("erro")
        : input.nextElementSibling.classList.remove("erro")
    );
  });

  document.addEventListener("change", (event) => {
    const currentElement = event.target;

    if (currentElement === login) {
      login.classList.remove("correto");

      if (login.value.trim().length === 0) {
        login.nextElementSibling.classList.add("erro");
        login.nextElementSibling.innerHTML = "Este campo é obrigatório!";
        login.value = "";
        return;
      }
      if (login.value.trim().length <= 4) {
        login.nextElementSibling.classList.add("erro");
        login.nextElementSibling.innerHTML =
          "O login deve conter mais de 5 caracteres.";
        return;
      }

      login.nextElementSibling.classList.remove("erro");
      login.classList.add("correto");
    }

    if (currentElement === password) {
      password.classList.remove("correto");

      if (password.value.trim().length === 0) {
        password.nextElementSibling.classList.add("erro");
        password.nextElementSibling.innerHTML = "Este campo é obrigatório!";
        password.value = "";
        return;
      }
      if (password.value.trim().length <= 4) {
        password.nextElementSibling.classList.add("erro");
        password.nextElementSibling.innerHTML =
          "A senha deve conter mais de 8 caracteres.";
        return;
      }

      password.nextElementSibling.classList.remove("erro");
      password.classList.add("correto");
    }

    if (currentElement === confirmation) {
      confirmation.classList.remove("correto");

      if (confirmation.value.trim().length === 0) {
        confirmation.nextElementSibling.classList.add("erro");
        confirmation.nextElementSibling.innerHTML = "Este campo é obrigatório!";
        confirmation.value = "";
        return;
      }
      if (confirmation.value.trim() !== password.value) {
        confirmation.nextElementSibling.classList.add("erro");
        confirmation.nextElementSibling.innerHTML =
          "As senhas devem ser iguais.";
        confirmation.value = "";
        return;
      }

      confirmation.nextElementSibling.classList.remove("erro");
      confirmation.classList.add("correto");
    }
  });
}
formulario();