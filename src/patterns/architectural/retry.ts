
const wait = async (time: number) => new Promise(resolve => setTimeout(()=> resolve(true), time))

const  getRandomInt = (min: number, max: number) => {    
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is 
}
// Don't 

// retry immediately 

// retry after delay

/////////////////////////

interface IApi {
    new(): IApi
    get: () => boolean
}


const ExternalApi = function(this: IApi) {
    this.get = function() {
        console.log('...Calling external API')
        const shouldPass = Math.random() < 0.2
        if(shouldPass) {
            return true
        } 
        else
         {
            throw new Error('Server Error')
         }
    }
} as any as IApi
/////////////////////////
console.log('HEKLLO')
const eApi = new ExternalApi()


const retryOps = async function() {
    let currentTry = 0
    while(true)
    {
        try{
            eApi.get()
            console.log('succeed')
            break       
        }catch(e: any | unknown | { message: string}) {
            currentTry++
            console.log(`failed #${currentTry}`, e?.message)

            if(currentTry > 20) {
                console.log('retry maximum reached, exiting process...')
                break
            } 
        }
        await wait(getRandomInt(1000,3000) )
    }
}


retryOps()