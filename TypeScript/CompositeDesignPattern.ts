interface Graphic {
    print(): void;
}

class Ellipse implements Graphic {
    print() {
        console.log('Ellipse');
    }
}

class Circle implements Graphic {
    print() {
        console.log('Circle');
    }
}

class CompositeGraphic implements Graphic {
    private childs: Array<Graphic> = [];

    add(graphic: Graphic) {
        this.childs.push(graphic);
    }

    remove(graphic: Graphic) {
        const idx = this.childs.findIndex(x => x === graphic);
        this.childs.splice(idx, 1);
    }

    print() {
        this.childs.forEach(x => x.print());
    }
}

const cg = new CompositeGraphic();
const g1 = new Ellipse();
const g2 = new Circle();
cg.add(g1);
cg.add(g2);
cg.print();
cg.remove(g2);
cg.print();
