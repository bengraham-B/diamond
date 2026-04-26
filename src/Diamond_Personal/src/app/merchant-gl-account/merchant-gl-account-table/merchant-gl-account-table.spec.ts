import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantGlAccountTable } from './merchant-gl-account-table';

describe('MerchantGlAccountTable', () => {
  let component: MerchantGlAccountTable;
  let fixture: ComponentFixture<MerchantGlAccountTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MerchantGlAccountTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MerchantGlAccountTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
