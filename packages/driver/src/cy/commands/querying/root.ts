export default (Commands, Cypress, cy, state) => {
  Commands.addQuery('root', function root (options: Partial<Cypress.Loggable & Cypress.Timeoutable> = {}) {
    const log = options.log !== false && Cypress.log({
      timeout: options.timeout,
    })

    cy.state('current').set('timeout', options.timeout)

    return () => {
      const $el = state('withinSubject') || cy.$$('html')

      log && log.set({
        $el,
        consoleProps: () => {
          return {
            Command: 'root',
            Yielded: $el.get(0),
          }
        },
      })

      return $el
    }
  })
}
