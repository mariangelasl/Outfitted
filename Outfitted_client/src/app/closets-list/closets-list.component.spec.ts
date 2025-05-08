import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosetsListComponent } from './closets-list.component';

describe('ClosetsListComponent', () => {
  let component: ClosetsListComponent;
  let fixture: ComponentFixture<ClosetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClosetsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
