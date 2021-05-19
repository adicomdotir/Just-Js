import { NgModule } from '@angular/core';
import { GameComponent } from './game/game.component';
import { EngineRoutingModule } from './engine-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
    declarations: [GameComponent],
    imports: [
        SharedModule,
        EngineRoutingModule
    ]
})
export class EngineModule {
}
