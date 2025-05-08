import { TestBed } from '@angular/core/testing';

import { DatosClosetsService } from './datos-closets.service';

describe('DatosClosetsService', () => {
  let service: DatosClosetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosClosetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
