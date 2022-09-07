import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifyuserPage } from './verifyuser.page';

describe('VerifyuserPage', () => {
  let component: VerifyuserPage;
  let fixture: ComponentFixture<VerifyuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyuserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
