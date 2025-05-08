import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrendaListComponent } from './prenda-list.component';

describe('PrendaListComponent', () => {
  let component: PrendaListComponent;
  let fixture: ComponentFixture<PrendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrendaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
