import { TestBed } from '@angular/core/testing';

import { DatosPrendasService } from './datos-prendas.service';

describe('DatosPrendasService', () => {
  let service: DatosPrendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPrendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
