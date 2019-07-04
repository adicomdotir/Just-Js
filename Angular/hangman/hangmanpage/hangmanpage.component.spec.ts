import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HangmanpageComponent } from './hangmanpage.component';

describe('HangmanpageComponent', () => {
  let component: HangmanpageComponent;
  let fixture: ComponentFixture<HangmanpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HangmanpageComponent ]
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
});
