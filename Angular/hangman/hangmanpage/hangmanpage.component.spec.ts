import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanpageComponent } from './hangmanpage.component';

describe('HangmanpageComponent', () => {
    let component: HangmanpageComponent;
    let fixture: ComponentFixture<HangmanpageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HangmanpageComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HangmanpageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('reset game', () => {
        const hc = new HangmanpageComponent();
        hc.resetGame();
        expect(hc.index).toBe(0);
        expect(hc.mistakeLen).toBe(0);
        expect(hc.guess.length).toBe(hc.word.length);
        expect(hc.mistake.length).toBe(hc.word.length);
    });

    it('custom word', () => {

    });
});
