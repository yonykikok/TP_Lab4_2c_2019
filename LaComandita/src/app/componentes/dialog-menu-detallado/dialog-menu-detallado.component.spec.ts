import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMenuDetalladoComponent } from './dialog-menu-detallado.component';

describe('DialogMenuDetalladoComponent', () => {
  let component: DialogMenuDetalladoComponent;
  let fixture: ComponentFixture<DialogMenuDetalladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMenuDetalladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMenuDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
