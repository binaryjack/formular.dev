export const conventions = {
    IdIsEmpty: function (): never {
        throw Error('MISSING ID!')
    }
}
