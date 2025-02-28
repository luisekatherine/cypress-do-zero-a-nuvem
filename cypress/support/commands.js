//comandos customizáveis no cypress:
// 
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  cy.get('input[name="firstName"]').type('teste')
  cy.get('input[name="lastName"]').type('teste')
  cy.get('#email').type('teste@email.com')
  cy.get('#phone').type('999999999')
  cy.get('#open-text-area').type('teste')
  cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
  cy.get('input[name="firstName"]').type(data.firstName)
  cy.get('input[name="lastName"]').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#phone').type(data.phone)
  cy.get('#open-text-area').type(data.text)
  cy.get('button[type="submit"]').click()
})

//data é o argumento da função, mas como um objeto
Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
  firstName: 'DEFAULT',
  lastName: 'PADRAO',
  email: 'default@padrao.com',
  phone: '51999999999',
  text: 'teste default.'
}) => {
  cy.get('input[name="firstName"]').type(data.firstName)
  cy.get('input[name="lastName"]').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#phone').type(data.phone)
  cy.get('#open-text-area').type(data.text)
  cy.get('button[type="submit"]').click()
})