import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocEnviadoComponent } from './doc-enviado.component';

describe('DocEnviadoComponent', () => {
  let component: DocEnviadoComponent;
  let fixture: ComponentFixture<DocEnviadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocEnviadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocEnviadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
