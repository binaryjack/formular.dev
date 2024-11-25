const items = [1, "tadeo", false, 1.24]

interface IIterator {
    new(items: unknown[]): IIterator
    items: unknown[] 
    index: number
    hasNext: () => boolean
    next:() => unknown
}

const Iter = function(this: IIterator, items: unknown[]) {
    this.items = items
    this.index = 0
} as any as IIterator

Iter.prototype = {
    hasNext: function(){
        return this.index < this.items.length
    },
    next:function() {
        return this.items[this.index++]
    }
}

const iter = new Iter(items)

while(iter.hasNext()) {
    console.log(iter.next())
}