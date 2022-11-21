import { TestBed } from '@angular/core/testing';

import { PersonaNoIdentificadaService } from './persona-no-identificada.service';

describe('PersonaNoIdentificadaService', () => {
  let service: PersonaNoIdentificadaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonaNoIdentificadaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
