interface ICalculator {
    new(): ICalculator
    initialValue: number
    history: ICommand[]
    execute: (command: ICommand)=> void
    undo: () => void

    setValue: (value: number) => void
    getHistory: () => ICommand[]
} 

// Privately defined
const PCalculator = function (this: ICalculator) {
    this.history = []
    this.initialValue = 0
} as any as ICalculator

PCalculator.prototype = {
    execute: function(command: ICommand){
       this.initialValue = command.execute(this.initialValue)
       this.history.push(command)
    },
    undo: function(){
        const command = this.history.pop()
        this.initialValue = command.undo(this.initialValue)
    },    
    setValue: function(value: number){
        this.initialValue = value 
    },
    getHistory: function(){
        return this.history
    }      
}

interface ICommand {
    new(value: number): ICommand
    value: number
    execute: (currentValue: number) => number
    undo: (currentValue: number)=> number
}

const AddCommand = function(this: ICommand, value: number) {
    this.value = value
} as any as ICommand
AddCommand.prototype = {
    execute: function(currentValue: number){
        return currentValue + this.value
    },
    undo: function(currentValue: number){
        return currentValue - this.value
    }
}

const SubtractCommand = function(this: ICommand, value: number) {
    this.value = value
} as any as ICommand
SubtractCommand.prototype = {
    execute: function(currentValue: number){
        return currentValue - this.value
    },
    undo: function(currentValue: number){
        return currentValue + this.value
    }
}

const MultiplyCommand = function(this: ICommand, value: number) {
    this.value = value
} as any as ICommand
MultiplyCommand.prototype = {
    execute: function(currentValue: number){
        return currentValue * this.value
    },
    undo: function(currentValue: number){
        return currentValue / this.value
    }
}

const DivideCommand = function(this: ICommand, value: number) {
    this.value = value
} as any as ICommand
DivideCommand.prototype = {
    execute: function(currentValue: number){
        return currentValue / this.value
    },
    undo: function(currentValue: number){
        return currentValue * this.value
    }
}
const Calculator = (function(){    
    /** Private members */
    const calculator = new PCalculator()

    const _add = (value: number): number | undefined => {
        const addCommand = new AddCommand(value)
        calculator.execute(addCommand)
        return calculator.initialValue
    }
    const _subtract =  (value: number) =>  {
        const subtract = new SubtractCommand(value)
        calculator.execute(subtract)
        return calculator.initialValue
    }
    const _multiply =  (value: number) =>  {
        const multiply = new MultiplyCommand(value)
        calculator.execute(multiply)
        return calculator.initialValue
    }
    const _divide =  (value: number) =>  {
        const divide = new DivideCommand(value)
        calculator.execute(divide)
        return calculator.initialValue
    }
    return {
        set: (value: number) => calculator.setValue(value),
        value: ()=> calculator.initialValue,
        add: (value: number) => _add(value),
        subtract: (value: number) =>_subtract(value),
        multiply: (value: number) =>_multiply(value),
        divide: (value: number) => _divide(value),
        undo: () => calculator.undo()
    }
})()

const { set, value, add, divide, multiply, subtract, undo } = Calculator

const testAssert = (message: string, value: number, shouldResult: number) => console.log(`Assert: ${message} should be: ${shouldResult}`, `is: ${value === shouldResult ? 'ok' : 'KO'}`)

set(10)
testAssert('set(10)', value(), 10)


set(20)
testAssert('set(20)', value(), 20)

add(50)
testAssert('add(50)', value(), 70)

subtract(5)
testAssert('subtract(5)', value(), 65)

undo()
testAssert('undo subtract(5)', value(), 70)

divide(2)
testAssert('divide(2)', value(), 35)

multiply(3)
testAssert('multiply(3)', value(), 105)

undo()
testAssert('undo multiply(3)', value(),  35)

undo()
testAssert('undo divide(2)', value(),  70)

undo()
testAssert('undo add(50)', value(),  20)