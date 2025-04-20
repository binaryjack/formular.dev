export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    },
    NameIsEmpty: function (): never {
        throw Error('MISSING NAME!')
    },
    suffix: {
        labelId: '-label'
    }
}
