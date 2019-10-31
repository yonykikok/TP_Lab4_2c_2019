import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeComidasComponent } from './lista-de-comidas.component';

describe('ListaDeComidasComponent', () => {
  let component: ListaDeComidasComponent;
  let fixture: ComponentFixture<ListaDeComidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeComidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeComidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
