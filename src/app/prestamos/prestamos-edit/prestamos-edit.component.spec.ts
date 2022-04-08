import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosEditComponent } from './prestamos-edit.component';

describe('PrestamosEditComponent', () => {
  let component: PrestamosEditComponent;
  let fixture: ComponentFixture<PrestamosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
