import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllfilesComponent } from './allfiles.component';

describe('AllfilesComponent', () => {
  let component: AllfilesComponent;
  let fixture: ComponentFixture<AllfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
