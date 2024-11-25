function run() {
    const name = 'Tadeo'

    function print() {
        const level = 'super'
        console.log(name)
    }

    print()
}
run()

function adder(x: number) {
    return function (y: number) {
        return x + y
    }
}

const adding = adder(10)

console.log(adding(50))
