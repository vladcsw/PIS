import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaNoIdentificadaComponent } from './persona-no-identificada.component';

describe('PersonaNoIdentificadaComponent', () => {
  let component: PersonaNoIdentificadaComponent;
  let fixture: ComponentFixture<PersonaNoIdentificadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaNoIdentificadaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaNoIdentificadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
