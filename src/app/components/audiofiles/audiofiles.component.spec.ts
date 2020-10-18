import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiofilesComponent } from './audiofiles.component';

describe('AudiofilesComponent', () => {
  let component: AudiofilesComponent;
  let fixture: ComponentFixture<AudiofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudiofilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
