import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBanComponent } from './cuenta-ban.component';

describe('CuentaBanComponent', () => {
  let component: CuentaBanComponent;
  let fixture: ComponentFixture<CuentaBanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaBanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
