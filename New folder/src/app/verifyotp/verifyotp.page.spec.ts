import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyotpPage } from './verifyotp.page';

describe('VerifyotpPage', () => {
  let component: VerifyotpPage;
  let fixture: ComponentFixture<VerifyotpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyotpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyotpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
