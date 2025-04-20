describe('InputText Validation Tests', () => {
    // Helper function to setup a form with specific validation
    const setupValidationTest = (validationType: string) => {
        cy.visit('/validation-test')
        cy.get(`[data-test="setup-${validationType}"]`).click()
    }

    // Tests for required validation
    describe('Required Validation', () => {
        beforeEach(() => {
            setupValidationTest('required')
        })

        it('should show required error when field is empty and blurred', () => {
            cy.get('[data-test="input-field"]').focus().blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('This field is required').should('be.visible')
        })

        it('should show guide when field is focused', () => {
            cy.get('[data-test="input-field"]').focus()
            cy.contains('Please enter a value').should('be.visible')
        })

        it('should hide error when field has value', () => {
            cy.get('[data-test="input-field"]').type('Test value')
            cy.get('.validation-result.invalid').should('not.exist')
            cy.get('.validation-result.valid').should('be.visible')
        })

        it('should validate on form submit', () => {
            cy.get('[data-test="submit-button"]').click()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('This field is required').should('be.visible')

            // Fill the field and submit again
            cy.get('[data-test="input-field"]').type('Test value')
            cy.get('[data-test="submit-button"]').click()
            cy.get('.validation-result.valid').should('be.visible')
        })
    })

    // Tests for minLength validation
    describe('MinLength Validation', () => {
        beforeEach(() => {
            setupValidationTest('minLength')
        })

        it('should show minLength error when value is too short', () => {
            cy.get('[data-test="input-field"]').type('ab').blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('Value is too short').should('be.visible')
        })

        it('should show guide when field is focused', () => {
            cy.get('[data-test="input-field"]').focus()
            cy.contains('Enter at least 5 characters').should('be.visible')
        })

        it('should be valid when value meets minimum length', () => {
            cy.get('[data-test="input-field"]').type('12345').blur()
            cy.get('.validation-result.valid').should('be.visible')
        })
    })

    // Tests for maxLength validation
    describe('MaxLength Validation', () => {
        beforeEach(() => {
            setupValidationTest('maxLength')
        })

        it('should show maxLength error when value is too long', () => {
            cy.get('[data-test="input-field"]')
                .type('This text is too long for the maximum length')
                .blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('Value is too long').should('be.visible')
        })

        it('should be valid when value is within maximum length', () => {
            cy.get('[data-test="input-field"]').type('Short text').blur()
            cy.get('.validation-result.valid').should('be.visible')
        })
    })

    // Tests for pattern validation
    describe('Pattern Validation', () => {
        beforeEach(() => {
            setupValidationTest('pattern')
        })

        it('should show error when value does not match pattern', () => {
            cy.get('[data-test="input-field"]').type('abc123').blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('Invalid format').should('be.visible')
        })

        it('should be valid when value matches pattern', () => {
            cy.get('[data-test="input-field"]').type('test@example.com').blur()
            cy.get('.validation-result.valid').should('be.visible')
        })
    })

    // Tests for multiple validations
    describe('Multiple Validations', () => {
        beforeEach(() => {
            setupValidationTest('multiple')
        })

        it('should show multiple validation errors', () => {
            // Type a short value that doesn't match pattern
            cy.get('[data-test="input-field"]').type('a').blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('Value is too short').should('be.visible')

            // Clear and try a value that's long enough but doesn't match pattern
            cy.get('[data-test="input-field"]').clear().type('abcdef').blur()
            cy.get('.validation-result.invalid').should('be.visible')
            cy.contains('Invalid format').should('be.visible')

            // Clear and try a valid value
            cy.get('[data-test="input-field"]').clear().type('test@example.com').blur()
            cy.get('.validation-result.valid').should('be.visible')
        })
    })

    // Test validation states based on field state
    describe('Validation State Display', () => {
        beforeEach(() => {
            setupValidationTest('required')
        })

        it('should show guide on focus and error on blur', () => {
            // Focus should show guide
            cy.get('[data-test="input-field"]').focus()
            cy.contains('Please enter a value').should('be.visible')

            // Blur empty field should show error
            cy.get('[data-test="input-field"]').blur()
            cy.contains('This field is required').should('be.visible')

            // Type something to make it valid
            cy.get('[data-test="input-field"]').type('Test')
            cy.get('.validation-result.valid').should('be.visible')

            // Clear and focus again
            cy.get('[data-test="input-field"]').clear().focus()
            cy.contains('Please enter a value').should('be.visible')
        })
    })
})
