class Hero {
    canFly = false;
    canSwim = false;
    farAttack = false;

    constructor(heroBuilder: HeroBuilder) {
        this.canFly = heroBuilder.canFly;
        this.canSwim = heroBuilder.canSwim;
        this.farAttack = heroBuilder.farAttack;
    }

    toString() {
        console.log(`[Hero, ${this.canFly}, ${this.canSwim}, ${this.farAttack}]`);
    }
}

class HeroBuilder {
    canFly = false;
    canSwim = false;
    farAttack = false;

    hasFly(): HeroBuilder {
        this.canFly = true;
        return this;
    }

    hasSwim(): HeroBuilder {
        this.canSwim = true;
        return this;
    }

    hasFarAttack(): HeroBuilder {
        this.farAttack = true;
        return this;
    }

    build(): Hero {
        return new Hero(this);
    }
}