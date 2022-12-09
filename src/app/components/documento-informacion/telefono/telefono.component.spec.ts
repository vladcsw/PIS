import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelefonoComponent } from './telefono.component';

describe('TelefonoComponent', () => {
  let component: TelefonoComponent;
  let fixture: ComponentFixture<TelefonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TelefonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelefonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
