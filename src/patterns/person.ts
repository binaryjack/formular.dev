interface IPerson {
    new(userId: string,
        lastName: string,
        firstName: string): IPerson
    userId: string
    lastName: string
    firstName: string
}

enum EType {
    DEV = 'Developper',
    MANAGER = 'Manager',
    TESTER = 'Tester',
}

const Person = function (this: IPerson, userId: string,
    lastName: string,
    firstName: string) {
this.userId = userId
this.lastName = lastName
this.firstName = firstName
} as any as IPerson
