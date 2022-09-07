import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangemobPage } from './changemob.page';

describe('ChangemobPage', () => {
  let component: ChangemobPage;
  let fixture: ComponentFixture<ChangemobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangemobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangemobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
