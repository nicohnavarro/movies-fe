import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicMapComponent } from './dinamic-map.component';

describe('DinamicMapComponent', () => {
  let component: DinamicMapComponent;
  let fixture: ComponentFixture<DinamicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinamicMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinamicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
