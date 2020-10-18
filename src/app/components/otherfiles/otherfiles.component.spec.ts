import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherfilesComponent } from './otherfiles.component';

describe('OtherfilesComponent', () => {
  let component: OtherfilesComponent;
  let fixture: ComponentFixture<OtherfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
