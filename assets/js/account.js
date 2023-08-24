async function fetchReservedBooks() { 
  const table = document.querySelector('#reservedBooksTable')

  const url = "http://localhost:4000/account"
  const response = await fetch(url)
  const data = await response.json()

  data.forEach(book => {
    const row = document.createElement('tr')
    const reservedId = document.createElement('td')
    const name = document.createElement('td')
    const pickUpBy = document.createElement('td')
    reservedId.textContent = book["reserved_id"]
    name.textContent = book["name"]
    const pickUpDate = new Date(book["pick_up_by"])
    const formattedDate = pickUpDate.toLocaleDateString('en-GB')
    pickUpBy.textContent = formattedDate
    
    const cancel = document.createElement('td')
    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'X'
    cancelButton.classList.add('cancel-btn')
    cancelButton.setAttribute('reservedId', book["reserved_id"])

    row.appendChild(reservedId)
    row.appendChild(name)
    row.appendChild(pickUpBy)
    cancel.appendChild(cancelButton)
    row.appendChild(cancel)

    table.appendChild(row)

    cancelButton.addEventListener('click', async(event) => {
      const reservedIdToDelete = event.currentTarget.getAttribute('reservedId')
     
      const confirmation = confirm('Are you sure you want to cancel? Click OK to confirm.')

      if (confirmation) {
         const options = {
          method:'DELETE'
        }
        const response = await fetch (`http://localhost:4000/account/${reservedIdToDelete}`, options)
    
        if(response.ok) {
          console.log('cancelled')
          event.target.closest('tr').remove()
        }
      } 
    })
  })
}

fetchReservedBooks()

