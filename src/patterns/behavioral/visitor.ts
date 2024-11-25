
const personTadeo = new Person('tadeop@myCompany.com', 'Hermann', 'Tadeo')

////////             /////         //////////////
const tadeo  = new Employee(personTadeo, EType.DEV, 14000)
console.log(tadeo.getSalary()) 
////////            ////          ////////////////

const visitorFunction = function(employee: IEmployee){
    employee.setSalary(employee.getSalary() * 2)
}

tadeo.accept(visitorFunction)
console.log(tadeo.getSalary())