const lending = require('../../assets/js/lending')

describe('lending.html', () => {
  test('createDiv', () => {
    document.documentElement.innerHTML = '<div id="posts"</div>'

    const posts = { title: 'Harry Potter', author: 'J.K. Rowling', genre: 'Fiction', email: 'bobby@gmail.com'}

    lending.createDiv
  })
})
