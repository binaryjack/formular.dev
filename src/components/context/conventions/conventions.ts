export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    },
    suffix: {
        labelId: '-label'
    }
}
