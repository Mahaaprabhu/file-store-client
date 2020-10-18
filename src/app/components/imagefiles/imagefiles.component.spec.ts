import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagefilesComponent } from './imagefiles.component';

describe('ImagefilesComponent', () => {
  let component: ImagefilesComponent;
  let fixture: ComponentFixture<ImagefilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagefilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagefilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
