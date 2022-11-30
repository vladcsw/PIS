import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VincularCarpetaComponent } from './vincular-carpeta.component';

describe('VincularCarpetaComponent', () => {
  let component: VincularCarpetaComponent;
  let fixture: ComponentFixture<VincularCarpetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VincularCarpetaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VincularCarpetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
