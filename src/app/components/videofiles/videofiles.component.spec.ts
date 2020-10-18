import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideofilesComponent } from './videofiles.component';

describe('VideofilesComponent', () => {
  let component: VideofilesComponent;
  let fixture: ComponentFixture<VideofilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideofilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideofilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
