const subject: Subject<string> = new Subject<string>();
subject.subscribe(value => console.log(value));
subject.next('one');
// output one

const observable: Observable<string> = subject.asObservable();
observable.subscribe(value => console.log(value));

const subject1 = new BehaviorSubject<string>('zero');
subject1.subscribe(value => console.log(value));
subject1.next('one');
// output zero, one

const subject2 = new ReplaySubject<string>(2);
subject1.next('one');
subject1.next('two');
subject1.next('three');
subject1.next('four');
subject2.subscribe(value => console.log(value));
subject1.next('five');
// output three, four, five


// Sample for setter and getter
private _loading = true;

public get loading() {
	return this._loading;
}

public set loading(value) {
	this._loading = value;
}