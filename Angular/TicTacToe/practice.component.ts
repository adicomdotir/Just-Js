import { Component, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnChanges, DoCheck, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { of, Observable, Subscription, Subject, range, fromEvent, Observer } from 'rxjs';
import { map, filter, catchError, retry, timeout, delay } from 'rxjs/operators';
import { ActivatedRoute } from "@angular/router";
import { ChildComponent } from './child.component';
import { NavService } from "../../core/services/nav.service";
import { TestService } from "../../core/services/test.service";
import { NewService } from "../../core/services/new.service";
import { ajax } from 'rxjs/ajax';

@Component({
    selector: 'app-practice',
    template: `
        <table style='width: 150px; height: 150px;'>
            <tr>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=0></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=1></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=2></app-child>
                </td>
            </tr>
            <tr>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=3></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=4></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=5></app-child>
                </td>
            </tr>
            <tr>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=6></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=7></app-child>
                </td>
                <td>
                    <app-child (btnClick)='parentClick($event)' player={{player}} value=0 cell=8></app-child>
                </td>
            </tr>
            <tr>
                <td>
                    <div (click)='resetGame()'>Reset</div>
                </td>
                <td colspan='2'>Player: {{player}}</td>
            </tr>
            <tr>
                <td colspan='3'><b>{{message}}</b></td>
            </tr>
        </table>
    `,
    providers: []
})
export class PracticeComponent implements OnInit, OnDestroy {

    player: number = 1;
    cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    message: string;

    constructor(private navService: NavService, private test: TestService, private newService: NewService) { }

    ngOnInit() {

    }

    parentClick(cell: number) {
        this.cells[cell] = this.player;
        this.checkWin();
        
        if (this.player == 1) {
            this.player = 2;
        } else if (this.player == 2) {
            this.player = 1;
        }
    }

    checkWin() {
        if (this.cells[0] == this.player && this.cells[1] == this.player && this.cells[2] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[3] == this.player && this.cells[4]  == this.player && this.cells[5] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[0] == this.player && this.cells[3] == this.player && this.cells[6] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[1] == this.player && this.cells[4] == this.player && this.cells[7] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[2] == this.player && this.cells[5] == this.player && this.cells[8] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[0] == this.player && this.cells[4] == this.player && this.cells[8] == this.player) {
            this.message = 'Win Player: ' + this.player;
        } else if (this.cells[2] == this.player && this.cells[4] == this.player && this.cells[6] == this.player) {
            this.message = 'Win Player: ' + this.player;
        }
    }

    resetGame() {
        this.cells = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.player = 1;
        this.message = '';
        this.newService.reset.next();
    }

    ngOnDestroy() { }
}