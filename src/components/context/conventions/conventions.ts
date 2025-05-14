export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    },
    NameIsEmpty: function (): never {
        throw Error('MISSING NAME!')
    },
    suffix: {
        labelId: '-label'
    },
    tokens: {
        validationDataToken1: '|data|',
        validationDataToken2: '|data2|'
    },
    validations: {
        triggerDelay: 2500
    }
}
