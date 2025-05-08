import { TestBed } from '@angular/core/testing';

import { DatosOutfitsService } from './datos-outfits.service';

describe('DatosOutfitsService', () => {
  let service: DatosOutfitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosOutfitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
