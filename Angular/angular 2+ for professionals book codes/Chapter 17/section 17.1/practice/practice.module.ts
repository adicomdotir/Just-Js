import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PracticeComponent } from './practice.component';
import { ChildComponent } from './child.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PracticeComponent,
        ChildComponent
    ]
})
export class PracticeModule { }