start();

function start() {
  //if the user has a theme stored in local storage, set it
  const storeTheme = localStorage.getItem("theme");
  if (storeTheme === "light") {
    document.documentElement.setAttribute("data-bs-theme", "light");
  }
  if (storeTheme === "dark") {
    document.documentElement.setAttribute("data-bs-theme", "dark");
  }

  //if the user has a fontsize stored in local storage, set it
  const storeFontsize = localStorage.getItem("fontsize");
  if (storeFontsize) {
    document.documentElement.style.fontSize = storeFontsize;
  }

  console.log(
    "%cniklas-stephan.de",
    "color: white; background-color: red; font-size: 20px; font-weight: bold; padding: 4px;"
  );
  console.log('type "help();" to list all available commands.');

}

function help() {
  console.log("version 0.1");
  console.log('"help();" - shows this help');
  console.log('"themeswitch();" - switches the theme between light and dark');
}

function themeswitch() {
  const currentTheme = document.documentElement.getAttribute("data-bs-theme");
  if (currentTheme === "light") {
    document.documentElement.setAttribute("data-bs-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-bs-theme", "light");
    localStorage.setItem("theme", "light");
  }
}

function languageswitch(targetlanguage, sourcelanguage, event) {
  const newUrl = event.srcElement.baseURI.replace(
    "/" + sourcelanguage + "/",
    "/" + targetlanguage + "/"
  );

  // Check if the new URL exists
  fetch(newUrl, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        // Navigate to the new URL if it exists
        window.location.href = newUrl;
      } else {
        jumpToModal(targetlanguage);
      }
    })
    .catch((error) => {
      jumpToModal(targetlanguage);
    });
}

function jumpToModal(targetlanguage) {
  const modal = document.getElementById("jump-to-modal");
  const langnavtoblog = document.getElementById("langnavtoblog");
  const langnavtohome = document.getElementById("langnavtohome");
  // Set the href attribute of the links in the modal
  langnavtoblog.href = langnavtoblog.href.replace(
    /\/[a-z]{2}\//,
    "/" + targetlanguage + "/"
  );
  langnavtohome.href = langnavtohome.href.replace(
    /\/[a-z]{2}\//,
    "/" + targetlanguage + "/"
  );
  const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
  modalInstance.show();
}

function fontswitch(task) {
  const root = document.documentElement;
  const currentFontSize = parseInt(
    getComputedStyle(root).getPropertyValue("font-size")
  );

  switch (task) {
    case "smaller":
      root.style.fontSize = currentFontSize
        ? currentFontSize - 1 + "px"
        : "1rem";
      localStorage.setItem("fontsize", root.style.fontSize);
      break;
    case "bigger":
      root.style.fontSize = currentFontSize
        ? currentFontSize + 1 + "px"
        : "1rem";
      localStorage.setItem("fontsize", root.style.fontSize);
      break;
    case "reset":
      root.style.removeProperty("font-size");
      localStorage.removeItem("fontsize");
      break;
    default:
      root.style.removeProperty("font-size");
      localStorage.removeItem("fontsize");
  }
}

function togglePageAssistant() {
  const assistantButton = document.getElementById("page-assitant-toggler");
  const pageContent = document.getElementById("page-content");
  const pageAssistant = document.getElementById("page-assistant");
  const footer = document.getElementById("footer");

  if (pageAssistant.classList.contains("d-none")) {
    pageAssistant.classList.remove("d-none");
    pageContent.classList.add("d-none");
    footer.classList.add("d-none");
    
    
  }
  else {
    pageAssistant.classList.add("d-none");
    pageContent.classList.remove("d-none");
    footer.classList.remove("d-none");
   
  }
}