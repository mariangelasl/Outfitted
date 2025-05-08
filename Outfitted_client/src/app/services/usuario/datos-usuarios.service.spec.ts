import { TestBed } from '@angular/core/testing';

import { DatosUsuariosService } from './datos-usuarios.service';

describe('DatosUsuariosService', () => {
  let service: DatosUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
