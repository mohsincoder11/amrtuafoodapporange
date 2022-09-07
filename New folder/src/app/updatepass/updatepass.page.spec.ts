import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdatepassPage } from './updatepass.page';

describe('UpdatepassPage', () => {
  let component: UpdatepassPage;
  let fixture: ComponentFixture<UpdatepassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatepassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
