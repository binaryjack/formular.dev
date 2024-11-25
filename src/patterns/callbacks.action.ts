interface ICallbackAction {
    new( value: number): ICallbackAction
    value: number
    action: (operationCallback: (self: ICallbackAction) => number) => number
}

const CallbackAction = function(this: ICallbackAction, value: number) {
    this.value = value
} as any as ICallbackAction

CallbackAction.prototype = {
    action: function(operationCallback: (self: ICallbackAction) => number){
         return operationCallback(this)
    },
}

const cAction = new CallbackAction(10)

console.log(cAction.action((o: ICallbackAction) => 20 + o.value ))
console.log(cAction.action((o: ICallbackAction) => 50 / o.value ))

