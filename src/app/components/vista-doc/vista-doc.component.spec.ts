import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaDocComponent } from './vista-doc.component';

describe('VistaDocComponent', () => {
  let component: VistaDocComponent;
  let fixture: ComponentFixture<VistaDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VistaDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
