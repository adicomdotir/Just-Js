import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PracticeComponent } from './practice.component';
import { ChildComponent } from './child.component';
import { SharedModule } from '../../shared/module/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [
        PracticeComponent,
        ChildComponent
    ],
    entryComponents: []
})
export class PracticeModule { }

/*
*/