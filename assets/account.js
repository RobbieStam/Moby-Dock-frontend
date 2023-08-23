// async function fetchReservedBooks() { 
//   const table = document.querySelector('#reservedBooksTable')

//   const url = "https://moby-dock-api.onrender.com/account"
//   const response = await fetch(url)
//   const data = await response.json()

//   data.forEach(book => {
//     const row = document.createElement('tr')
//     const reservedId = document.createElement('td')
//     const name = document.createElement('td')
//     const pickUpBy = document.createElement('td')
//     reservedId.textContent = book.reservedId
//     name.textContent = book.name
//     pickUpBy.textContent = book.pickUpBy

//     row.appendChild(reservedId)
//     row.appendChild(name);
//     row.appendChild(pickUpBy)

//     table.appendChild(row)
//   })
// }

// fetchReservedBooks()

// using fake data to check if it is working when there is no data to fetch from yet
  async function fetchReservedBooks() {
      const mockResponse = [
        { reservedId: '1', name: 'The Da Vinci Code', pickUpBy: '2023-08-23' }, { reservedId: '2', name: 'Moby-Dick', pickUpBy: '2023-08-23' }, { reservedId: '3', name: 'The Pride and Prejudice', pickUpBy: '2023-08-23' }
      ]
      const table = document.querySelector('#reservedBooksTable')

      setTimeout(() => {
        mockResponse.forEach(book => {
          const row = document.createElement('tr')
          const reservedId = document.createElement('td')
          const name = document.createElement('td')
          const pickUpBy = document.createElement('td')
          reservedId.textContent = book.reservedId
          name.textContent = book.name
          pickUpBy.textContent = book.pickUpBy

          row.appendChild(reservedId)
          row.appendChild(name);
          row.appendChild(pickUpBy)

          table.appendChild(row)
        })
      }, 1000)
  }

  fetchReservedBooks()

