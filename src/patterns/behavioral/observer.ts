
type T2 = number | string | boolean | null | undefined | HTMLElement

type observableFunction = () => void

interface ISubject {
    new(): ISubject
    observers: observableFunction[]
    subscribe: (fn: observableFunction)=> void
    unSubscribe: (fn: observableFunction)=> void
    trigger: ()=> void
}

const Subject = function(this: ISubject) {
    this.observers = []
}  as any as ISubject

Subject.prototype = {
    subscribe: function(fn: observableFunction) {
        this.observers.push(fn)
    },
    unSubscribe: function(fn: observableFunction) {
        this.observers = [...this.observers.filter((o: observableFunction) => o !== fn)]
    },
    trigger: function () {
        this.observers.forEach((o: observableFunction) => o.call(this))
    }
}

const observableFunction1 = () => {
    console.log("observable 1 fired")
}

const observableFunction2 = () => {
    console.log("observable 2 fired")
}


const subject: ISubject = new Subject()


subject.subscribe(observableFunction1)
subject.subscribe(observableFunction2)

subject.trigger()
