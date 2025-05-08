import { TestBed } from '@angular/core/testing';

import { DatosCategoriasService } from './datos-categorias.service';

describe('DatosCategoriasService', () => {
  let service: DatosCategoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosCategoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
