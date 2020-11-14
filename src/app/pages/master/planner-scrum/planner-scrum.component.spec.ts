import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerScrumComponent } from './planner-scrum.component';

describe('PlannerScrumComponent', () => {
  let component: PlannerScrumComponent;
  let fixture: ComponentFixture<PlannerScrumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerScrumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerScrumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
