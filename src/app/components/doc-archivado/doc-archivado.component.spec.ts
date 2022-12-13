import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocArchivadoComponent } from './doc-archivado.component';

describe('DocArchivadoComponent', () => {
  let component: DocArchivadoComponent;
  let fixture: ComponentFixture<DocArchivadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocArchivadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocArchivadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
