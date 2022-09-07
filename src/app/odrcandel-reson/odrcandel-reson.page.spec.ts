import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OdrcandelResonPage } from './odrcandel-reson.page';

describe('OdrcandelResonPage', () => {
  let component: OdrcandelResonPage;
  let fixture: ComponentFixture<OdrcandelResonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OdrcandelResonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OdrcandelResonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
