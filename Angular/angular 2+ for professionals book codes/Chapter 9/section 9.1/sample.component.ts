import { Directive, HostBinding, HostListener } from '@angular/core';
@Directive({
    selector: '[appButtonPress]'
})
export class ButtonPressDirective {
    @HostBinding('attr.role') role = 'button';
    @HostBinding('class.pressed') isPressed: boolean;
    @HostListener('mousedown') hasPressed() {
        this.isPressed = true;
    }
    @HostListener('mouseup') hasReleased() {
        this.isPressed = false;
    }
}