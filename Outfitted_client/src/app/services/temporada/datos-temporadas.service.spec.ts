import { TestBed } from '@angular/core/testing';

import { DatosTemporadasService } from './datos-temporadas.service';

describe('DatosTemporadasService', () => {
  let service: DatosTemporadasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosTemporadasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
