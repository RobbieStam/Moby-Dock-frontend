const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const modalTitle = document.getElementById('modal-title');
const modalAuthor = document.getElementById('modal-author');
const modalGenre = document.getElementById('modal-genre');
const modalReserved = document.getElementById('modal-reserved');
const modalImage = document.getElementById('modal-image');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function displayAlertModal(title, message) {
  const modalLabel = document.getElementById('customModalLabel');
  const modalBody = document.getElementById('customModalBody');

  modalLabel.textContent = title;
  modalBody.textContent = message;

  const customModal = new bootstrap.Modal(document.getElementById('customModal'));
  customModal.show();
}

// GENRE FUNCTIONALITY

const genreCards = document.querySelectorAll('.card-item');
genreCards.forEach(card => {
  card.addEventListener('click', () => {
    const genre = card.classList[1];
    openGenreModal(genre);
  });
});

async function openGenreModal(genre) {
  const modalTitle = document.getElementById('genreModalLabel');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = `Book Suggestions`;

  modalBody.innerHTML = '';

  try {
    const response = await fetch(`https://frolin-library-api.onrender.com/books/genre/${genre}`);
    const suggestions = await response.json();

    if (response.ok) {
      const shuffledSuggestions = shuffleArray(suggestions);
      const maxSuggestions = Math.min(shuffledSuggestions.length, 5);

      for (let i = 0; i < maxSuggestions; i++) {
        const randomBookIndex = Math.floor(Math.random() * shuffledSuggestions.length);
        const book = shuffledSuggestions.splice(randomBookIndex, 1)[0];

        createBookSuggestion(modalBody, book);
      }

      const genreModal = new bootstrap.Modal(document.getElementById('genreModal'));
      genreModal.show();
    } else {
      console.error('Error fetching book suggestions');
    }
  } catch (error) {
    console.error('Error fetching book suggestions:', error);
  }
}

function createBookSuggestion(modalBody, book) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book-suggestion');

  const bookTitle = document.createElement('h6');
  bookTitle.textContent = book.name;

  const bookAuthor = document.createElement('p');
  bookAuthor.textContent = `Author: ${book.author}`;

  const reserveButton = document.createElement('button');
  reserveButton.classList.add('btn', 'btn-primary', 'reserve-btn');
  reserveButton.textContent = 'Reserve';
  reserveButton.addEventListener('click', async () => {
    try {
      const bookId = book.id;
      const name = book.name;
      const pickUpBy = new Date();
      pickUpBy.setDate(pickUpBy.getDate() + 7);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          book_id: bookId,
          name: name,
          pick_up_by: pickUpBy
        })
      };

      const reserveResponse = await fetch('https://frolin-library-api.onrender.com/account', options);

      if (reserveResponse.ok) {
        displayAlertModal('Book reserved');
      } else {
        displayAlertModal('Unable to reserve book.');
      }
    } catch (error) {
      console.error('Error reserving book: ', error);
    }
  });

  bookElement.appendChild(bookTitle);
  bookElement.appendChild(bookAuthor);
  bookElement.appendChild(reserveButton);
  modalBody.appendChild(bookElement);
}

// BOOK MODAL FUNCTIONALITY

const bookModal = new bootstrap.Modal(document.getElementById('bookModal'));

async function displayBookModal(book) {
  modalTitle.textContent = book.name;
  modalAuthor.textContent = book.author;
  modalGenre.textContent = book.genre;
  modalReserved.textContent = book.reserved ? 'TRUE' : 'FALSE';
  modalImage.src = book.image;

  const reserveButton = document.createElement('button');
  reserveButton.classList.add('btn', 'btn-primary', 'reserve-btn');
  reserveButton.textContent = 'Reserve';
  reserveButton.addEventListener('click', async () => {
    try {
      const bookId = book.id;
      const name = book.name;
      const pickUpBy = new Date();
      pickUpBy.setDate(pickUpBy.getDate() + 7);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          book_id: bookId,
          name: name,
          pick_up_by: pickUpBy
        })
      };

      const reserveResponse = await fetch('https://frolin-library-api.onrender.com/account', options)

      if (reserveResponse.ok) {
        displayAlertModal('Book reserved')
      } else {
        displayAlertModal('Unable to reserve book.')
      }
    } catch (error) {
      console.error('Error reserving book: ', error)
    }
  });

  modalReserved.appendChild(reserveButton);

  bookModal.show();
}

searchButton.addEventListener('click', async () => {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === '') {
    displayAlertModal('Please enter a book name to search.');
    return;
  }

  try {
    const response = await fetch(`https://frolin-library-api.onrender.com/books/name/${searchTerm}`);
    const book = await response.json();

    if (response.ok) {
      displayBookModal(book);
    } else {
      displayAlertModal('Apologies! That book is not in our library!');
    }
  } catch (error) {
    console.error('Error fetching book:', error);
  }
});