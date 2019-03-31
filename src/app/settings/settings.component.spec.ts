    
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('SettingsComponent', () => {

  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      imports: [ FormsModule , ToastrModule.forRoot(), NgSelectModule, RouterTestingModule ],
      providers: [ ChatService , ToastrService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});