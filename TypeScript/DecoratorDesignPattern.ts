interface Coffee {
    getCost(): number;
    getIngredients(): string;
}

class SimpleCoffee implements Coffee {
    getCost() {
        return 1;
    }

    getIngredients() {
        return "Coffee";
    }
}

class CoffeeDecorator implements Coffee {
    constructor(protected c: Coffee) {
    }

    getCost() {
        return this.c.getCost();
    }

    getIngredients() {
        return this.c.getIngredients();
    }
}

class WithMilk extends CoffeeDecorator {
    constructor(c: Coffee) {
        super(c);
    }

    getCost() {
        return super.getCost() + 0.5;
    }

    getIngredients() {
        return super.getIngredients() + ', Milk';
    }
}

class WithSprinkles extends CoffeeDecorator {
    constructor(c: Coffee) {
        super(c);
    }

    getCost() {
        return super.getCost() + 0.2;
    }

    getIngredients() {
        return super.getIngredients() + ', Sprinkles';
    }
}

let sc = new SimpleCoffee();
console.log(sc.getCost(), sc.getIngredients());
sc = new WithMilk(sc);
console.log(sc.getCost(), sc.getIngredients());
sc = new WithSprinkles(sc);
console.log(sc.getCost(), sc.getIngredients());
