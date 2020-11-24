import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMemberComponent } from './planner-member.component';

describe('PlannerMemberComponent', () => {
  let component: PlannerMemberComponent;
  let fixture: ComponentFixture<PlannerMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlannerMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannerMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
