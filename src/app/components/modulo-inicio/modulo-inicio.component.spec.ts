import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloInicioComponent } from './modulo-inicio.component';

describe('ModuloInicioComponent', () => {
  let component: ModuloInicioComponent;
  let fixture: ComponentFixture<ModuloInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuloInicioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
