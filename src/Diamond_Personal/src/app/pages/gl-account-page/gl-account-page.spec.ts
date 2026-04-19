import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlAccountPage } from './gl-account-page';

describe('GlAccountPage', () => {
  let component: GlAccountPage;
  let fixture: ComponentFixture<GlAccountPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlAccountPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlAccountPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
