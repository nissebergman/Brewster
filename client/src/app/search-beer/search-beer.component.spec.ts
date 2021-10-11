import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBeerComponent } from './search-beer.component';

describe('SearchBeersComponent', () => {
  let component: SearchBeerComponent;
  let fixture: ComponentFixture<SearchBeerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchBeerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
