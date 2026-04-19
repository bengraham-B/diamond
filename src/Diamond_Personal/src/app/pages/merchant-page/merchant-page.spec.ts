import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPage } from './merchant-page';

describe('MerchantPage', () => {
  let component: MerchantPage;
  let fixture: ComponentFixture<MerchantPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
