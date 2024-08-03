import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiertableComponent } from './modifiertable.component';

describe('ModifiertableComponent', () => {
  let component: ModifiertableComponent;
  let fixture: ComponentFixture<ModifiertableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiertableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
