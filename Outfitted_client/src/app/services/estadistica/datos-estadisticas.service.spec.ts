import { TestBed } from '@angular/core/testing';

import { DatosEstadisticasService } from './datos-estadisticas.service';

describe('DatosEstadisticasService', () => {
  let service: DatosEstadisticasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosEstadisticasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
