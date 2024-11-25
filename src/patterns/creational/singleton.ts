interface IProcess {
    state: string
}

interface IProcessManager {
    new(): IProcessManager
    numProcess: number
    update: (num: number) => void 
}

// singleton
const ProcessManagerProvider = (function(){
    const ProcessManager = function(this: IProcessManager) {
        this.numProcess = 0
    } as any as IProcessManager

    ProcessManager.prototype = {
        update: function(num: number) {
            this.numProcess += num
        }
    }

    let _processManager: IProcessManager 
    
    const createProcessManager = function() {
        _processManager = new ProcessManager()
        return _processManager
    }

    return {
        getProcessManager: () => {
            if(!_processManager) {
                _processManager = createProcessManager()
            }
            return _processManager
        }
    }
})()


const processManagerProvider = ProcessManagerProvider.getProcessManager()
const processManagerProvider2 = ProcessManagerProvider.getProcessManager()


console.log(processManagerProvider === processManagerProvider2)

processManagerProvider.update(2)

console.log('processManagerProvider', processManagerProvider.numProcess)
console.log('processManagerProvider2', processManagerProvider2.numProcess)


processManagerProvider.update(9)

console.log('processManagerProvider', processManagerProvider.numProcess)
console.log('processManagerProvider2', processManagerProvider2.numProcess)