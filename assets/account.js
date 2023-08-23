// const borrowedBooks = [
//   { name: 'Moby-Dick', checkoutDate: '22-8-2023', dueDate: '22-9-2023' },
//   { name: 'The Great Gatsby', checkoutDate: '22-8-2023', dueDate: '22-9-2023' }
// ]


// async function fetchBorrowedBooks() { 
//   const table = document.querySelector('#bookTrackerTable')

//   const url = "https://moby-dock-api.onrender.com/account"
//   const response = await fetch(url)
//   const data = await response.json()

//   data.forEach(book => {
//     const row = document.createElement('tr')
//     const name = document.createElement('td')
//     const checkoutDate = document.createElement('td')
//     const dueDate = document.createElement('td')
//     name.textContent = book.name
//     checkoutDate.textContent = book.checkoutDate
//     dueDate.textContent = book.dueDate

//     row.appendChild(name)
//     row.appendChild(checkoutDate)
//     row.appendChild(dueDate)

//     table.appendChild(row)
//   })
// }

// fetchBorrowedBooks()

// using fake data to check if it is working when there is no data to fetch from yet
  async function fetchBorrowedBooks() {
      const mockResponse = [
        { name: 'The Da Vinci Code', checkoutDate: '22-8-2023', dueDate: '22-9-2023' },
        { name: 'Harry Potter and the Deathly Hallows', checkoutDate: '22-8-2023', dueDate: '22-9-2023' }
      ]
      const table = document.querySelector('#borrowedBooksTable')

      setTimeout(() => {
        mockResponse.forEach(book => {
          const row = document.createElement('tr')
          const name = document.createElement('td')
          const checkoutDate = document.createElement('td')
          const dueDate = document.createElement('td')
          name.textContent = book.name
          checkoutDate.textContent = book.checkoutDate
          dueDate.textContent = book.dueDate

          row.appendChild(name);
          row.appendChild(checkoutDate)
          row.appendChild(dueDate)

          table.appendChild(row)
        })
      }, 1000)
  }

  fetchBorrowedBooks()

