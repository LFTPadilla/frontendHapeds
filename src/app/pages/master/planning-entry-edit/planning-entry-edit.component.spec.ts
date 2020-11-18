import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningEntryEditComponent } from './planning-entry-edit.component';

describe('PlanningEntryEditComponent', () => {
  let component: PlanningEntryEditComponent;
  let fixture: ComponentFixture<PlanningEntryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningEntryEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningEntryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
