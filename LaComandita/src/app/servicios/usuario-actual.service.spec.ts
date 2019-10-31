import { TestBed } from '@angular/core/testing';

import { UsuarioActualService } from './usuario-actual.service';

describe('UsuarioActualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsuarioActualService = TestBed.get(UsuarioActualService);
    expect(service).toBeTruthy();
  });
});
