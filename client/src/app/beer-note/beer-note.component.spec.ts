import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerNoteComponent } from './beer-note.component';

describe('BeerNoteComponent', () => {
  let component: BeerNoteComponent;
  let fixture: ComponentFixture<BeerNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
