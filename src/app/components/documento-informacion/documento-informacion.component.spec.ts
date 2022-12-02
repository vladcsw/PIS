import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoInformacionComponent } from './documento-informacion.component';

describe('DocumentoInformacionComponent', () => {
  let component: DocumentoInformacionComponent;
  let fixture: ComponentFixture<DocumentoInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentoInformacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentoInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
