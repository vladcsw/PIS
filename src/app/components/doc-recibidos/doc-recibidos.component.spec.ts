import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocRecibidosComponent } from './doc-recibidos.component';

describe('DocRecibidosComponent', () => {
  let component: DocRecibidosComponent;
  let fixture: ComponentFixture<DocRecibidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocRecibidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocRecibidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
