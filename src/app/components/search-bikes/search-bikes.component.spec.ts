import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBikesComponent } from './search-bikes.component';

describe('SearchBikesComponent', () => {
  let component: SearchBikesComponent;
  let fixture: ComponentFixture<SearchBikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
