const { renderDOM } = require('./helper')

let dom
let document

describe('login.html', () => {
    beforeEach(async () => {
        dom = await renderDOM('./login.html')
        document = await dom.window.document
    })

    it('display the title Login ', () => {
        const btn = document.querySelector('h2')
        expect(btn.innerHTML).toContain('Login')
    })

    it('has a button', () => {
        const btn = document.querySelector('button')
        expect(btn).toBeTruthy()
    })

    it('has a form', () => {
        const form = document.querySelector('form')
        expect(form).toBeTruthy()
    })

    it('form is empty when website loads', () => {
        const form = document.querySelector('form')
        expect(form.innerHTML).toContain('')
    })

    it('has input on the form', () => {
        const input = document.querySelector('input')
        expect(input).toBeTruthy()
    })

    it('input has label', () => {
        const label = document.querySelector('label')
        expect(label).toBeTruthy()
    })

    it('has links to other pages', () => {
        const link = document.querySelector('a')
        expect(link).toBeTruthy()
    })
})
