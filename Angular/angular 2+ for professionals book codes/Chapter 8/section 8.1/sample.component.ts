import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
 selector: 'limited-button',
 template: `<button (click)="onClick()"
 [disabled]="disabled">
 <ng-content></ng-content>
 </button>`,
 directives: []
})
export class LimitedButton {
 @Input() clickLimit: number;
 @Output() limitReached: EventEmitter<number> = new EventEmitter();
 disabled: boolean = false;
 private clickCount: number = 0;
 onClick() {
 this.clickCount++;
 if (this.clickCount === this.clickLimit) {
 this.disabled = true;
 this.limitReached.emit(this.clickCount);
 }
 }
}

import { Component } from '@angular/core';
import { LimitedButton } from './limited-button.component';
@Component({
 selector: 'my-parent-component',
 template: `<limited-button [clickLimit]="2"
 (limitReached)="onLimitReached($event)">
 You can only click me twice
 </limited-button>`,
 directives: [LimitedButton]
})
export class MyParentComponent {
 onLimitReached(clickCount: number) {
 alert('Button disabled after ' + clickCount + ' clicks.');
 }
}