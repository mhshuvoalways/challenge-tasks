function createButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.cssText =
    "background: #efefef; padding: 18px; border: none; cursor: pointer; color: #000000";
  return button;
}

function title(counter) {
  return `Clicked: ${counter} times`;
}

function storeData(tabId, counter) {
  const storageKey = `counter_${tabId}`;
  chrome.storage.local.set({ [storageKey]: counter });
}

function retrieveData(tabId, callback) {
  const storageKey = `counter_${tabId}`;
  chrome.storage.local.get(storageKey, (result) => {
    if (result[storageKey]) {
      callback(result[storageKey]);
    } else {
      callback(0);
    }
  });
}

function app(tabId) {
  let counter = 0;

  const counterContainer = document.createElement("div");
  counterContainer.id = "mainDiv";
  counterContainer.style.cssText =
    "background: #fff; border: 2px solid #efefef; width: 30%; height: 100vh; padding: 20px; position: absolute; right: 0; top: 0; z-index: 9999; color: #000000";

  const counterValue = document.createElement("p");
  counterValue.textContent = title(counter);
  counterValue.style.cssText = "font-size: 30px; font-weight: 700;";

  const btnContainer = document.createElement("div");
  btnContainer.style.cssText = "display: flex; gap: 10px; margin-top: 10px;";

  const increaseButton = createButton("+");
  const decreaseButton = createButton("-");
  const resetButton = createButton("reset");

  btnContainer.appendChild(increaseButton);
  btnContainer.appendChild(decreaseButton);
  btnContainer.appendChild(resetButton);

  counterContainer.appendChild(counterValue);
  counterContainer.appendChild(btnContainer);
  document.body.appendChild(counterContainer);

  retrieveData(tabId, (storedCounter) => {
    counter = storedCounter;
    counterValue.textContent = title(counter);
  });

  decreaseButton.addEventListener("click", () => updateCounter(-1));
  increaseButton.addEventListener("click", () => updateCounter(1));
  resetButton.addEventListener("click", () => updateCounter(0));

  function updateCounter(value) {
    if (value !== 0) {
      counter += value;
    } else {
      counter = 0;
    }
    counterValue.textContent = title(counter);
    storeData(tabId, counter);
  }
}

chrome.runtime.onMessage.addListener(function (request) {
  const mainDiv = document.getElementById("mainDiv");
  if (request.action.toggle === "togglePopup") {
    if (!mainDiv) {
      app(request.action.id);
      chrome.storage.local.set({
        [`dataStore_${request.action.id}`]: { popup: true, id: request.action.id },
      });
    } else {
      mainDiv.remove();
      chrome.storage.local.set({
        [`dataStore_${request.action.id}`]: { popup: false, id: request.action.id },
      });
    }
  }
});

(async () => {
  const response = await chrome.runtime.sendMessage({ greeting: "helloTab" });
  chrome.storage.local.get(null, function (data) {
    const dataStoreKey = `dataStore_${response}`;
    if (data[dataStoreKey] && data[dataStoreKey].popup && data[dataStoreKey].id === response) {
      app(response);
    } else {
      chrome.storage.local.remove(dataStoreKey);
    }
  });
})();
