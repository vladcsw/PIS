import { TestBed } from '@angular/core/testing';
import { DocEnviadoService } from './doc-enviado.service';

describe('DocEnviadoService', () => {
  let service: DocEnviadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocEnviadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
