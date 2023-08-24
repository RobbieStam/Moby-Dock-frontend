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
      const response = await fetch(`http://localhost:4000/books/genre/${genre}`);
      const suggestions = await response.json();

      const shuffledSuggestions = shuffleArray(suggestions);

      const maxSuggestions = Math.min(shuffledSuggestions.length, 5);

      for (let i = 0; i < maxSuggestions; i++) {
        const book = shuffledSuggestions[i];

        const bookElement = document.createElement('div');
        bookElement.classList.add('book-suggestion');
        
        const bookTitle = document.createElement('h6');
        bookTitle.textContent = book.name;
        
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        
        const reserveButton = document.createElement('button');
        reserveButton.classList.add('btn', 'btn-primary', 'reserve-btn');
        reserveButton.textContent = 'Reserve';
        reserveButton.addEventListener('click', () => {
          console.log('Book reserved:', book.name);
        });
        
        bookElement.appendChild(bookTitle);
        bookElement.appendChild(bookAuthor);
        bookElement.appendChild(reserveButton)
        modalBody.appendChild(bookElement);

  async function reserve() {
    reserveButton.addEventListener('click', async (event) => {
    event.preventDefault()
    const bookId = book.id
    const name = book.name
    const pickUpBy = new Date()
    pickUpBy.setDate(pickUpBy.getDate() + 7)

    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        book_id: bookId,
        name: name,
        pick_up_by: pickUpBy
      })
    }   
          
    const response = await fetch('http://localhost:4000/account', options)
  
    if (response.ok) {
      alert('Book reserved')
    } else {
      alert('Unable to reserve book.')
    }
    })
  }
  reserve()
};

const genreModal = new bootstrap.Modal(document.getElementById('genreModal'));
genreModal.show();
} catch (error) {
console.error('Error fetching book suggestions:', error);
}
}

function shuffleArray(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}



























document.querySelector('#searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const searchInput = document.querySelector('#searchInput');
  const searchBookId = searchInput.value;

  try {
    const searchResult = await fetch(`http://localhost:4000/books/${searchBookId}`);
    if (!searchResult.ok) {
      throw new Error('Failed to fetch book data');
    }
    const bookData = await searchResult.json();

    displayBookInfoModal(bookData);
  } catch (error) {
    console.error('Error fetching book data:', error);
  }
});

function displayBookInfoModal(bookData) {
  const modalTitle = document.getElementById('genreModalLabel');
  const modalBody = document.querySelector('.modal-body');

  modalTitle.textContent = bookData.name;

  modalBody.innerHTML = `
    <p>Author: ${bookData.author}</p>
    <p>Genre: ${bookData.genre}</p>
    <img src="${bookData.image}" alt="Book Cover">
    <button class="btn btn-primary reserve-btn" data-book-id="${bookData.id}">Reserve</button>
  `;

  const genreModal = new bootstrap.Modal(document.getElementById('genreModal'));
  genreModal.show();
  elementById('genreModal');
  genreModal.show();
}


