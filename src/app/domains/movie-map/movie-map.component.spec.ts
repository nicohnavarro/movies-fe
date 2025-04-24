import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieMapComponent } from './movie-map.component';

describe('MovieMapComponent', () => {
  let component: MovieMapComponent;
  let fixture: ComponentFixture<MovieMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
