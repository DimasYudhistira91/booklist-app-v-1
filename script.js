// Book Class : Represents a Book

class Buku {
  constructor(judul, penulis, nomorReg) {
    this.judul = judul;
    this.penulis = penulis;
    this.nomorReg = nomorReg;
  }
}

// UI Class : handle UI class

class UI {
  static tampilBuku() {
    const simpanBuku = [];

    const listBuku = simpanBuku;

    listBuku.forEach((i) => UI.addBookToList(i));
  }
  static addBookToList(i) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${i.judul}</td>
    <td>${i.penulis}</td>
    <td>${i.nomorReg}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;

    list.appendChild(row);
  }

  static clearFields() {
    document.querySelector('#judul').value = "";
    document.querySelector('#penulis').value = "";
    document.querySelector('#nomorReg').value = "";
  }

  static deleteBuku(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }
}

// Store Class : Handles storage

// Event : DIsplay Books
document.addEventListener('DOMContentLoaded', UI.tampilBuku);

// Event : Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

  e.preventDefault();

  // get form value

  const judul = document.querySelector('#judul').value;
  const penulis = document.querySelector('#penulis').value;
  const nomorReg = document.querySelector('#nomorReg').value;

  // Initiate Book
  const buku = new Buku(judul, penulis, nomorReg);

  // Masukkan buku ke daftar
  UI.addBookToList(buku);

  // Clear fields
  UI.clearFields();


});

// Event : Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  UI.deleteBuku(e.target);
});