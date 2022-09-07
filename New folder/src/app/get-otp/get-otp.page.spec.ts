import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetOTPPage } from './get-otp.page';

describe('GetOTPPage', () => {
  let component: GetOTPPage;
  let fixture: ComponentFixture<GetOTPPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetOTPPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetOTPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
