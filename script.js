// Book Class : Represents a Book

class Book {
  constructor(judul, penulis, isbn) {
    this.judul = judul;
    this.penulis = penulis;
    this.isbn = isbn;
  }
}

// UI Class : handle ui class

class UI {
  static tampilBuku() {
    const simpanBuku = [
      {
        judul: 'Buku 1',
        penulis: 'dul kempit',
        isbn: '12324sdf34'
      },
      {
        judul: 'Buku 2',
        penulis: 'karto tuying',
        isbn: '723481kjsd'
      }
    ];

    const bukuBuku = simpanBuku;

    bukuBuku.forEach((buku) => UI.addBookToList(buku));
  }
  static addBookToList(buku) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
    <td>${buku.judul}</td>
    <td>${buku.penulis}</td>
    <td>${buku.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">x</a></td>
    `;

    list.appendChild(row);
  }
}

// Store Class : Handles storage

// Event : DIsplay Books
document.addEventListener('DOMContentLoaded', UI.tampilBuku);

// Event : Add Book
document.querySelector('#buku-form').addEventListener('submit', (e) => {
  // get form value

  const judul = document.querySelector('#judul').value;
  const penulis = document.querySelector('#penulis').value;
  const isbn = document.querySelector('#isbn').value;

  // Initiate Book
  const buku = new buku(judul, penulis, isbn);


});

// Event : Remove Book