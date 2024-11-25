

const debounce = (fn: () => void, timeFrame: number) => {        
    let timer: ReturnType<typeof setTimeout> 
    return () => {
        if(timer) {
            clearTimeout(timer)
        }
            timer = setTimeout(()=> {
            fn()
        }, timeFrame)
    }
} 