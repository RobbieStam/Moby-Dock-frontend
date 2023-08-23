const searchInput = document.querySelector('.form-control')
const searchForm = document.querySelector('.search-box')

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const searchBook = searchInput.ariaValueMax

    const searchResult = await fetch(`http://localhost:4000/books${searchBook}`)
    const bookData = await searchResult.json()
})

const genreCards = document.querySelectorAll('.card-item');
genreCards.forEach(card => {
  card.addEventListener('click', () => {
    const genre = card.getAttribute('data-genre');
    openGenreModal(genre);
  });
});

async function openGenreModal() {
    const modalTitle = document.getElementById('genreModalLabel');
    const modalBody = document.querySelector('.modal-body');
  
    modalTitle.textContent = `Book Suggestions`;
  
    modalBody.innerHTML = '';
  
    try {
      const response = await fetch(`http://localhost:4000/books`);
      const suggestions = await response.json();

      const maxSuggestions = Math.min(suggestions.length, 5);

      for (let i = 0; i < maxSuggestions; i++) {
        const book = suggestions[i];

        const bookElement = document.createElement('div');
        bookElement.classList.add('book-suggestion');
        
        const bookTitle = document.createElement('h6');
        bookTitle.textContent = book.name;
        
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = `Author: ${book.author}`;
        
        const bookGenre = document.createElement('p');
        bookGenre.textContent = `Genre: ${book.genre}`;
        
        const reserveButton = document.createElement('button');
        reserveButton.classList.add('btn', 'btn-primary', 'reserve-btn');
        reserveButton.textContent = 'Reserve';
        reserveButton.addEventListener('click', () => {
          console.log('Book reserved:', book.name);
        });
        
        bookElement.appendChild(bookTitle);
        bookElement.appendChild(bookAuthor);
        bookElement.appendChild(bookGenre);
        bookElement.appendChild(reserveButton);
        modalBody.appendChild(bookElement);

        // implement when reserve button is clicked, it post data to reserved book table - start
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
        // implement when reserve button is clicked, it post data to reserved book table - end
      };
  
      const genreModal = new bootstrap.Modal(document.getElementById('genreModal'));
      genreModal.show();
    } catch (error) {
      console.error('Error fetching book suggestions:', error);
    }
  }

function handleReserve(event) {
  const index = event.target.getAttribute('data-index');
  const reservedBook = suggestions[index];
  alert(`You've reserved ${reservedBook.title}`);
}
