import { Component, ChangeDetectionStrategy, OnInit, EventEmitter, Output, Directive, HostListener, Input } from "@angular/core";
import { NewService } from "../../core/services/new.service";

@Component({
    selector: 'app-child',
    template: `
        <div class='myBtn' (click)='myClick()'>{{getValue()}}</div>
    `,
    styleUrls: ['./child.component.css'],
    providers: []
})
export class ChildComponent implements OnInit {
    
    @Input()
    value: number;

    @Input()
    player: number;

    @Input()
    cell: number;

    @Output()
    btnClick = new EventEmitter<number>();

    constructor(private newService: NewService) {
        newService.reset$.subscribe((next) => {
            this.value = 0;
        });
    }

    ngOnInit() {}

    getValue() {
        if (this.value == 1) return 'X';
        if (this.value == 2) return 'O';
        return ' ';
    }

    myClick() {
        if (this.value == 0) {
            this.value = this.player;      
            this.btnClick.emit(this.cell);
        }
    }
}