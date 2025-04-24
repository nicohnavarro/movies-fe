import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicMapComponent } from './dynamic-map.component';

describe('DynamicMapComponent', () => {
  let component: DynamicMapComponent;
  let fixture: ComponentFixture<DynamicMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
