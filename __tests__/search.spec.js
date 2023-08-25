const { renderDOM } = require('./helper')

let dom
let document

describe('search.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./search.html')
        document = await dom.window.document
    })

    it('has a button', () => {
        const btn = document.querySelector('button')
        expect(btn).toBeTruthy()
    })

    it('displays modal when the card is clicked', () => {
        const body = document.querySelector('body')
        const card = document.querySelector('card-item')
        card.click()
        expect(body.className).toBe('#modal fade')
    })
})