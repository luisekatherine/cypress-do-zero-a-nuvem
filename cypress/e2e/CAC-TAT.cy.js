describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('cypress-do-zero-a-nuvem/src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type('LUISE')
      .should('have.value', 'LUISE')
    cy.get('input[name="lastName"]')
      .should('be.visible')
      .type('AROSQUITA')
      .should('have.value', 'AROSQUITA')
    cy.get('#email')
      .should('be.visible')
      .type('luisekatherine@test.com')
      .should('have.value', 'luisekatherine@test.com')
    cy.get('#phone')
      .should('be.visible')
      .type('51999999999')
      .should('have.value', '51999999999')
    cy.get('#open-text-area')
      .should('be.visible')
      .type('teste obs')
      .should('have.value', 'teste obs')
    cy.get('button[type=submit]').click()

    cy.get('.success')
      .should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('preenche os campos obrigatórios e envia o formulário com texto longo e sem delay', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopquvxyz... ', 20)
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type('LUISE')
      .should('have.value', 'LUISE')
    cy.get('input[name="lastName"]')
      .should('be.visible')
      .type('AROSQUITA')
      .should('have.value', 'AROSQUITA')
    cy.get('#email')
      .should('be.visible')
      .type('luisekatherine@test.com')
      .should('have.value', 'luisekatherine@test.com')
    cy.get('#phone')
      .should('be.visible')
      .type('51999999999')
      .should('have.value', '51999999999')
    cy.get('#open-text-area')
      .should('be.visible')
      // digita o texto longo direto sem o delay como se o usuário estivesse digitando
      .type(longText, { delay: 0})
      .should('have.value', longText)
    cy.get('button[type=submit]').click()

    cy.get('.success')
      .should('be.visible', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type('LUISE')
      .should('have.value', 'LUISE')
    cy.get('input[name="lastName"]')
      .should('be.visible')
      .type('AROSQUITA')
      .should('have.value', 'AROSQUITA')
    cy.get('#email')
      .should('be.visible')
      .type('luisekatherine@test.com')
      .should('have.value', 'luisekatherine@test.com')
    cy.get('#phone')
      .should('be.visible')
      .type('51999999999')
      .should('have.value', '51999999999')
    cy.get('button[type=submit]').click()

    cy.get('.error')
      .should('be.visible', 'Valide os campos obrigatórios!')
  })

  it('valida que o campo telefone não aceita nada do tipo text', () => {
    cy.get('#phone')
      .should('be.visible')
      .type('teste!@#')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[name="firstName"]')
      .should('be.visible')
      .type('LUISE')
      .should('have.value', 'LUISE')
    cy.get('input[name="lastName"]')
      .should('be.visible')
      .type('AROSQUITA')
      .should('have.value', 'AROSQUITA')
    cy.get('#email')
      .should('be.visible')
      .type('luisekatherine@test.com')
      .should('have.value', 'luisekatherine@test.com')
    cy.get('#open-text-area')
      .should('be.visible')
      .type('teste obs')
      .should('have.value', 'teste obs')
    cy.get('#phone-checkbox').click()
    cy.get('button[type=submit]').click()

    cy.get('.error')
      .should('be.visible', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[name="firstName"]')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('input[name="lastName"]')
      .type('teste')
      .should('have.value', 'teste')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@email.com')
      .should('have.value', 'teste@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('999999999')
      .should('have.value', '999999999')
      .clear()
      .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error')
      .should('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success')
      .should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado 2 e valores padrão', () => {
    const data = {
      firstName: 'Luise',
      lastName: 'Arosquita',
      email: 'luisekatherine@hotmail.com',
      phone: '51996650504',
      text: 'teste.'
    }
    cy.fillMandatoryFieldsAndSubmit2(data)
    cy.get('.success')
      .should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado 3 e valores padrão e/ou valores customizáveis', () => {
    const data = {
      firstName: 'Luise',
      lastName: 'Arosquita',
      email: 'luisekatherine@hotmail.com',
      phone: '51996650504',
      text: 'teste.'
    }
    //chamando a função fillMandatoryFieldsAndSubmit3 sem nenhum atributo, ela irá pegar o padrão setado no commands
    //chamando a função com o atributo 'data' dentro, ela irá pegar o objeto que foi criado dentro do it
    cy.fillMandatoryFieldsAndSubmit3()
    cy.get('.success')
      .should('be.visible')
  })

  it('teste com cy.contains()', () => {
    cy.get('input[name="firstName"]')
      .type('Luise')
    cy.get('input[name="lastName"]')
      .type('Arósquita')
    cy.get('#email')
      .type('luisekatherine@hotmail.com')
    cy.get('#phone')
      .type('51996650504')
    //Com o comando cy.contains(), além de um seletor CSS, podemos passar como segundo argumento um texto, o qual deve estar contido no elemento o qual desejamos identificar.
    //Por exemplo, se tivessemos o seguinte elemento HTML <a href="https://example.com">Clique aqui!</a>, poderíamos identificá-lo usando o seguinte comando cy.contains('a', 'Clique aqui!').
    cy.contains('button', 'Enviar')
      .click()
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    //click() também funciona para radiobuttons, porém o check() é mais semântico para esses casos
    cy.get('input[type="radio"],[value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"],[value="ajuda"]') 
      .check()
      .should('be.checked')
    cy.get('input[type="radio"],[value="elogio"]')
      .check()
      .should('be.checked')
    cy.get('input[type="radio"],[value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento utilizando wrap()', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
  })

  it('marca e desmarca todos checkboxes', () => {
    cy.get('input[type="checkbox"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
      cy.get('input[type="checkbox"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .uncheck()
      })
  })

  it('marca todos os checkboxes e depois desmarca o último', () => {
    //nesse teste ele irá pegar todos os inputs do tipo checkbox e vai dar um check em todos que encontrar
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      //aqui mesmo posso encadiar e pedir pra ele pegar o último elemento e fazer um uncheck, verificando que ele ficará desmarcado.
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox')
      .check()
      .should('be.checked')
    cy.get('button[type="submit"]')
      .click()
    cy.get('.error')
      .should('contain', 'Valide os campos obrigatórios!')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    //envio um objeto junto, com a propriedade drag-drop
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
    //para chamar o alias, sempre preciso colocar o @ antes do nome colocado
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique - confiando no browser', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique - removendo a target blank', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
  })

  it('verifica que a politica de privacidade abre em outra aba sem necessidade de abrir', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })  
})
