import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowofferPage } from './showoffer.page';

describe('ShowofferPage', () => {
  let component: ShowofferPage;
  let fixture: ComponentFixture<ShowofferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowofferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowofferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
