import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierplatComponent } from './modifierplat.component';

describe('ModifierplatComponent', () => {
  let component: ModifierplatComponent;
  let fixture: ComponentFixture<ModifierplatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifierplatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierplatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
