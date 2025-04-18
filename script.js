let bookList = [];
let bookId = 1;

const formSection = document.getElementById("formSection");
const listSection = document.getElementById("listSection");
const searchInput = document.getElementById("searchInput");

document.getElementById("formToggle").addEventListener("click", () => {
  formSection.classList.remove("hidden");
  listSection.classList.add("hidden");
});

document.getElementById("listToggle").addEventListener("click", () => {
  formSection.classList.add("hidden");
  listSection.classList.remove("hidden");
  renderBooks(); // при показе — обновить
});

searchInput.addEventListener("input", () => {
  renderBooks(searchInput.value.trim());
});

function addBook() {
  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const year = document.getElementById("year").value.trim();
  const copies = document.getElementById("copies").value.trim();

  if (!title || !author || !genre || !year || !copies) {
    alert("⚠️ Заполните все поля!");
    return;
  }

  const book = {
    id: bookId++,
    title,
    author,
    genre,
    year,
    copies,
  };

  bookList.push(book);
  clearForm();
  alert("✅ Книга успешно добавлена!");
}

function renderBooks(query = "") {
  const tbody = document.getElementById("bookTableBody");
  tbody.innerHTML = "";

  const filteredBooks = bookList.filter((book) => {
    const searchStr = `${book.title} ${book.author} ${book.genre}`.toLowerCase();
    return searchStr.includes(query.toLowerCase());
  });

  if (filteredBooks.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">😕 Ничего не найдено</td></tr>`;
    return;
  }

  filteredBooks.forEach((book) => {
    const row = `<tr>
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.genre}</td>
      <td>${book.year}</td>
      <td>${book.copies}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("genre").value = "";
  document.getElementById("year").value = "";
  document.getElementById("copies").value = "";
}
