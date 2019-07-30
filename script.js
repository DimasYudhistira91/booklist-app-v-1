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
    const listBuku = Store.ambilBuku();

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

  static tampilAlert(message, className) {
    const div = document.createElement('div');
    div.className= `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Hilangkan dalam 3 detik
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

// Store Class : Handles storage
class Store {
  static ambilBuku() {
    let listBuku;
    if(localStorage.getItem('listBuku') === null) {
      listBuku = [];
    } else {
      listBuku = JSON.parse(localStorage.getItem('listBuku'));
    }
    return listBuku;
  }

  static tambahBuku(buku) {
    const listBuku = Store.ambilBuku();
    listBuku.push(buku);
    localStorage.setItem('listBuku', JSON.stringify(listBuku));
  }

  static hapusBuku(nomorReg) {
    const listBuku = Store.ambilBuku();
    listBuku.forEach((buku, index) => {
      if(buku.nomorReg === nomorReg) {
        listBuku.splice(index, 1);
    }
  });
  localStorage.setItem('listBuku',JSON.stringify(listBuku));
}
}

// Event : DIsplay Books
document.addEventListener('DOMContentLoaded', UI.tampilBuku);

// Event : Add Book
document.querySelector('#book-form').addEventListener('submit', (e) => {

  e.preventDefault();

  // get form value

  const judul = document.querySelector('#judul').value;
  const penulis = document.querySelector('#penulis').value;
  const nomorReg = document.querySelector('#nomorReg').value;

  // Validasi :
  if(judul === "" || penulis === "" || nomorReg === "") {
    UI.tampilAlert('Lengkapi form!', 'danger');
  } else {
    // Initiate Book
    const buku = new Buku(judul, penulis, nomorReg);
  
    // Masukkan buku ke daftar
    UI.addBookToList(buku);

    // Tambah buku ke Store
    Store.tambahBuku(buku);

    // Tampilkan jika berhasil
    UI.tampilAlert('Buku berhasil ditambahkan', 'success');
  
    // Clear fields
    UI.clearFields();
  }
});

// Event : Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // Hapus buku dari UI
  UI.deleteBuku(e.target);

  // Hapus buku dari Store
  Store.hapusBuku(e.target.parentElement.previousElementSibling.textContent);

  // Tampilkan jika berhasil dihapus
  UI.tampilAlert('Buku berhasil dihapus', 'warning');
});