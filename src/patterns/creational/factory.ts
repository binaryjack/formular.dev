

interface IEmployeeFactory {
    new(): IEmployeeFactory
    create: (person: IPerson, type: EType) => IEmployee
}

const EmployeeFactory = function (this: IEmployeeFactory) {
    this.create = function (person: IPerson, type: EType) {
        switch (type) {
            case EType.DEV: 
                return new Employee(person, EType.DEV, 7600)
            case EType.MANAGER: 
                return new Employee(person, EType.MANAGER, 14000)
            case EType.TESTER: 
            default:
                return new Employee(person, EType.TESTER, 6000)
        }
    }
} as any as IEmployeeFactory


const alineBrucks = new Person('brucks.aline@myCompany.com', 'Brucks', 'Aline')
const antoineSechon = new Person('sechon.antoine@myCompany.com', 'Sechon', 'Antoine')
const doweWillson = new Person('willson.dowe@myCompany.com', 'Willson', 'Dowe')
const ericMercier = new Person('mercier.eric@myCompany.com', 'Mercier', 'Eric')

const employeeList: IEmployee[] = [] 

const factory = new EmployeeFactory()

employeeList.push(factory.create(alineBrucks, EType.DEV))
employeeList.push(factory.create(antoineSechon, EType.MANAGER))
employeeList.push(factory.create(doweWillson, EType.TESTER))
employeeList.push(factory.create(ericMercier, EType.DEV))

employeeList.forEach(o => {    
    console.log(`Hi! I am ${o.person.firstName} ${o.person.lastName}, I am ${o.type} in the company`)
})