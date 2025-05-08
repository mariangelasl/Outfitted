import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendaEditComponent } from './prenda-edit.component';

describe('PrendaEditComponent', () => {
  let component: PrendaEditComponent;
  let fixture: ComponentFixture<PrendaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrendaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrendaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
