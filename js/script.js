let encryptButton = document.getElementsByClassName("encrypt__button")[0];
let decryptButton = document.getElementsByClassName("decrypt__button")[0];
let textArea = document.getElementsByClassName("text__area")[0];
let containerEncryptorOutput = document.getElementsByClassName(
  "container__encryptor__output"
)[0];
let text = "";

const getText = () => {
  let textAreaValue = textArea.value;
  return textAreaValue;
};

encryptButton.addEventListener("click", (event) => {
  event.preventDefault();
  text = getText();
  console.log(encryptText(text));
  textArea.value = "";
  containerEncryptorOutput.children[0].style.display = "none";
  containerEncryptorOutput.children[1].style.display = "none";
  containerEncryptorOutput.children[2].innerHTML = encryptText(text);
  containerEncryptorOutput.children[2].style.opacity = "1";
  containerEncryptorOutput.children[2].style.color = "var(--color-textarea)";
  containerEncryptorOutput.children[3].style.display = "block";
});

decryptButton.addEventListener("click", (event) => {
  event.preventDefault();
  text = getText();
  console.log(decryptText(text));
  textArea.value = "";
  containerEncryptorOutput.children[0].style.display = "none";
  containerEncryptorOutput.children[1].style.display = "none";
  containerEncryptorOutput.children[2].innerHTML = decryptText(text);
  containerEncryptorOutput.children[2].style.opacity = "1";
  containerEncryptorOutput.children[2].style.color = "var(--color-textarea)";
  containerEncryptorOutput.children[3].style.display = "block";
});

const encryptText = (text) => {
  let encryptText = "";
  for (const char of text) {
    if (esMinuscula(char) && esLetra(char) && !tieneTilde(char)) {
      switch (char) {
        case "a":
          encryptText += "ai";
          break;
        case "e":
          encryptText += "enter";
          break;
        case "i":
          encryptText += "imes";
          break;
        case "o":
          encryptText += "ober";
          break;
        case "u":
          encryptText += "ufat";
          break;
        default:
          encryptText += char;
          break;
      }
    } else {
      encryptText += char;
    }
  }
  return encryptText;
};

const decryptText = (text) => {
  let decryptText = text
    .replace(/ai/g, "a")
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
  return decryptText;
};

const esMinuscula = (letra) => {
  return letra === letra.toLowerCase();
};

const esLetra = (char) => {
  return /^[a-z]$/.test(char);
};

const tieneTilde = (char) => {
  const normalized = char.normalize("NFD");
  const tildeRegex = /[\u0300-\u036f]/;
  return tildeRegex.test(normalized);
};

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(
      containerEncryptorOutput.children[2].innerHTML
    );
    console.log("Contenido copiado al portapapeles");
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
};
