import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpatchComponent } from './colorpatch.component';

describe('ColorpatchComponent', () => {
  let component: ColorpatchComponent;
  let fixture: ComponentFixture<ColorpatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorpatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorpatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
