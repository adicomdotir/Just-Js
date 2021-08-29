class Target {
    request() {
        console.log('Default');
    }
}

class Adapter extends Target {
    constructor(private adaptee: Adaptee) {
        super();
    }

    request() {
        this.adaptee.specificRequest();
    }
}

class Adaptee {
    specificRequest() {
        console.log('Specific Request');
    }
}

const adapter: Adapter = new Adapter(new Adaptee())
adapter.request();

interface IranianBank {
    payment(price: number): void;
}

class BankMellat implements IranianBank {
    payment(price: number) {
        console.log('Payment with bank');
    }
}

class BitcoinAdapter implements IranianBank {
    constructor(private bitcoinPayment: BitcoinPayment) {
    }

    payment(price: number) {
        this.bitcoinPayment.transaction(price / 1000);
    }

}

class BitcoinPayment {
    transaction(price: number) {
        console.log('Payment with bitcoin ' + price);
    }
}


const bitcoinAdapter = new BitcoinAdapter(new BitcoinPayment());
bitcoinAdapter.payment(100000);
