import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KnowPage } from './know.page';

describe('KnowPage', () => {
  let component: KnowPage;
  let fixture: ComponentFixture<KnowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KnowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
