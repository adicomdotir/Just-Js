import { Directive, ElementRef, Renderer } from "../../../node_modules/@angular/core";

@Directive({
    selector: '[green]'
})
export class GreenDirective {
    constructor(private _elementRef: ElementRef, private _rendere: Renderer) {
        _rendere.setElementStyle(_elementRef.nativeElement, 'color', 'green');
    }
}