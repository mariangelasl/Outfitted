import { TestBed } from '@angular/core/testing';

import { DatosEstilosService } from './datos-estilos.service';

describe('DatosEstilosService', () => {
  let service: DatosEstilosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEstilosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
