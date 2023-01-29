export class Part {
    constructor(id, name, plural, cost, sellCost, available, needed) {
        this.id = id;
        this.name = name;
        this.plural = plural;
        this.cost = cost;
        this.sellCost = sellCost;
        this.available = available;
        this.row = this.initRow(needed)
    }

    initRow(quantity) {
        const arr = Array.from({length: quantity}, () => 0)
        return arr.map((item, i) => {
            return this.available > i ? 1 : 0   
        })
    }
}

export class Setting {
    constructor(value, name, options) {
        this.value = value;
        this.name = name;
        this.options = this.initOption(options)
    }

    initOption(optionsName) {
        return optionsName.reduce((acc, name) => {
            return [...acc, {name, value: name.toLowerCase()}]
        }, [])
    }
}