import { TestBed } from '@angular/core/testing';

import { DatosCalendariosService } from './datos-calendarios.service';

describe('DatosCalendariosService', () => {
  let service: DatosCalendariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCalendariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
