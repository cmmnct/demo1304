import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpatchComponent } from './editpatch.component';

describe('EditpatchComponent', () => {
  let component: EditpatchComponent;
  let fixture: ComponentFixture<EditpatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditpatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditpatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
