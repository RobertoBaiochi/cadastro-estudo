(function () {
  // Selecionando elementos da DOM
  const form = document.querySelector("#formulario");
  const login = form.querySelector("#login");
  const password = form.querySelector("#password");
  const confirmation = form.querySelector("#confirmation");
  const email = form.querySelector("#email");
  const button = form.querySelector("#button");

  const inputsValidation = [login, password, confirmation];

  /*
      Deixando o primeiro input em foco assim que página é montada.
    */
  login.focus();

  /*
      Tratamento dos dados ao evento de clique para envio das informações
    */
  button.addEventListener("click", (event) => {
    event.preventDefault();

    /* -------------  LOGIN --------------- */
    if (!login.value.trim()) {
      if (login.value.trim().length < 5) {
        handleError(login, "O login deve conter mais de 5 caracteres.");
      }
      if (login.value.trim().length === 0) {
        handleError(login, "Este campo é obrigatório!");
      }
    }

    /* -------------  PASSWORD --------------- */

    if (!password.value.trim()) {
      if (password.value.trim().length === 0) {
        handleError(password, "Este campo é obrigatório!");
        clearCorrectValues(confirmation);
        handleError(confirmation, "As senhas devem ser iguais.");
        clearInputValue(confirmation);
      }
    }

    /* -------------  CONFIRMATION --------------- */

    if (confirmation.value.trim()) {
      if (confirmation.value.trim().length === 0) {
        handleError(confirmation, "Este campo é obrigatório!");
        clearInputValue(confirmation);
      }
      if (confirmation.value.trim() !== password.value.trim()) {
        handleError(confirmation, "As senhas devem ser iguais.");
      }
    }

    /* ----------------- SUBMIT -----------------*/

    const validationData = inputsValidation.map((input) => {
      return input.classList.contains("correto");
    });

    function handleValidation(validation) {
      return validation === true;
    }

    const isValidation = validationData.every(handleValidation);

    if (isValidation) {
      const user = handleData(login, password, confirmation);
      console.log(user);

      inputsValidation.forEach((input) => {
        clearInputValue(input);
        clearCorrectValues(input);
      });
    }
  });
  /*
      >>>> INPUT EVENTS <<<<
    */

  form.addEventListener("input", (event) => {
    event.preventDefault();
    const currentElement = event.target;

    /* -------------  LOGIN --------------- */

    if (currentElement === login) {
      // Sempre que for escrever um novo login, limpa o campo de valor correto
      clearCorrectValues(login);

      // Verifica se o campo de login está preenchido
      if (login.value.trim().length === 0) {
        handleError(login, "Este campo é obrigatório!");
        clearInputValue(login);
        return;
      }

      // Verifica se o nome do usuário é maior que 5 caracteres.
      if (login.value.trim().length < 5) {
        handleError(login, "O login deve conter mais de 5 caracteres.");
        return;
      }

      // Coloca classes de que o campo foi preenchido corretamente
      setCorrectValues(login);
    }

    /* -------------  PASSWORD --------------- */

    if (currentElement === password) {
      clearCorrectValues(password);

      if (password.value.trim().length === 0) {
        handleError(password, "Este campo é obrigatório!");
        clearCorrectValues(confirmation);
        handleError(confirmation, "As senhas devem ser iguais.");
        clearInputValue(confirmation);
        return;
      }

      if (password.value.trim().length < 8) {
        handleError(password, "A senha deve conter mais de 8 caracteres.");
        clearCorrectValues(confirmation);
        handleError(confirmation, "As senhas devem ser iguais.");
        return;
      }

      if (password.value.trim() === confirmation.value.trim()) {
        setCorrectValues(password);
        setCorrectValues(confirmation);
      }

      setCorrectValues(password);
    }

    /* -------------  CONFIRMATION --------------- */

    if (currentElement === confirmation) {
      clearCorrectValues(confirmation);

      if (confirmation.value.trim().length === 0) {
        handleError(confirmation, "Este campo é obrigatório!");
        clearInputValue(confirmation);
        return;
      }

      if (confirmation.value.trim() !== password.value.trim()) {
        handleError(confirmation, "As senhas devem ser iguais.");
        return;
      }

      setCorrectValues(confirmation);
    }
  });

  function handleError(inputName, errorMessage) {
    inputName.nextElementSibling.classList.add("erro");
    inputName.nextElementSibling.innerHTML = errorMessage;
  }

  function setCorrectValues(inputName) {
    inputName.nextElementSibling.classList.remove("erro");
    inputName.classList.add("correto");
  }

  function clearCorrectValues(inputName) {
    inputName.classList.remove("correto");
  }

  function clearInputValue(inputName) {
    inputName.value = "";
  }

  function handleData(user, password, confirmation, email) {
    return {
      user: user.value,
      password: password.value,
      confirmation: confirmation.value,
    };
  }
})();
