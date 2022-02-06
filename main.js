var request = new XMLHttpRequest();
request.open(
  "GET",
  "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json"
);
request.send();

request.onload = function () {
  var userData = JSON.parse(this.response);

  const list_element = document.getElementById("list");
  const pagination_element = document.getElementById("pagination");

  let current_page = 1;
  let rows = 10;

  function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];
      let tr = document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerText = item.id;
      let td2 = document.createElement("td");
      td2.innerText = item.name;
      let td3 = document.createElement("td");
      td3.innerText = item.email;

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      wrapper.appendChild(tr);
    }
  }

  function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
      let btn = PaginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  function PaginationButton(page, items) {
    let button = document.createElement("li");
    button.classList.add("page-item");
    let a = document.createElement("a");
    a.classList.add("page-link");
    a.innerText = page;
    button.appendChild(a);

    if (current_page == page) button.classList.add("active");

    button.addEventListener("click", function () {
      current_page = page;
      DisplayList(items, list_element, rows, current_page);

      let current_btn = document.querySelector(".pagenumbers li.active");
      current_btn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }

  DisplayList(userData, list_element, rows, current_page);
  SetupPagination(userData, pagination_element, rows);
};
