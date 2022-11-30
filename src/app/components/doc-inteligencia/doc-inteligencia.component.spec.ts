import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocInteligenciaComponent } from './doc-inteligencia.component';

describe('DocInteligenciaComponent', () => {
  let component: DocInteligenciaComponent;
  let fixture: ComponentFixture<DocInteligenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocInteligenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocInteligenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
