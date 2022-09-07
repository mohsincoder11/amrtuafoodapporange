import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowMapPage } from './show-map.page';

describe('ShowMapPage', () => {
  let component: ShowMapPage;
  let fixture: ComponentFixture<ShowMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
