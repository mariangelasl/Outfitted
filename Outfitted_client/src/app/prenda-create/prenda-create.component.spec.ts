import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendaCreateComponent } from './prenda-create.component';

describe('PrendaCreateComponent', () => {
  let component: PrendaCreateComponent;
  let fixture: ComponentFixture<PrendaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrendaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrendaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
