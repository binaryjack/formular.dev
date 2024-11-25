interface IEmployee {
    new(person: IPerson,
        type: EType,
        salary: number,
    ): IEmployee
    name: string   
    salary: number
    type: EType
    person: IPerson 
    getSalary: () => number
    setSalary: (salary: number) => void
    accept: (visitor: (self: IEmployee) => unknown) => void
}

const Employee = function(
        this:IEmployee, 
        person: IPerson, 
        salary: number, 
        type: EType ) {
    this.name = `${person.firstName} ${person.lastName}` 
    this.salary = salary
    this.person = person
    this.type = type
}as any as IEmployee

Employee.prototype = {
    getSalary: function() {return this.salary},
    setSalary: function(salary: number) {this.salary = salary},
    accept: function(visitor: (self: IEmployee) => unknown) {
         visitor(this)
    }
}