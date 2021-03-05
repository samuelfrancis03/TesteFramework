function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    // Document is already ready, call the callback directly
    callbackFunc();
  } else if (document.addEventListener) {
    // All modern browsers to register DOMContentLoaded
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    // Old IE browsers
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
}
ready(function () {
  const printData = async (getItems) => {
    const data = await getItems;
    table(data);
  };

  const fetchData = (endpoint) => {
    const getItems = fetch(endpoint)
      .then((response) => response.json())
      .then((json) => json);

    printData(getItems);
  };

  const list = (items, tag) => {
    const $tr = document.createElement("tr");
    items.map((item) => {
      const $th = document.createElement(tag);
      const text = document.createTextNode(item);
      $th.appendChild(text);
      $tr.appendChild($th);
    });
    return $tr;
  };

  const table = (items) => {
    const $table = document.createElement("table");
    if (items.length) {
      const [item] = items;
      const $keys = list(Object.keys(item), "th");
      $table.appendChild($keys);
      items.map((item) => {
        const $values = list(Object.values(item), "td");
        $table.appendChild($values);
      });
    } else {
      const $keys = list(Object.keys(items), "th");
      const $values = list(Object.values(items), "td");
      $table.appendChild($keys);
      $table.appendChild($values);
    }
    document.body.appendChild($table);
  };

  const pages = ["posts", "albums", "todos"];
  const currentPage = window.location.href.split("/")[3].split(".")[0];

  if (pages.includes(currentPage)) {
    fetchData(`https://jsonplaceholder.typicode.com/${currentPage}/`);
  }
});