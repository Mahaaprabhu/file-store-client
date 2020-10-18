import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppStateService } from 'src/app/appstate/app-state.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent implements OnInit {

  file: any;

  constructor(private appStateService: AppStateService) { }

  ngOnInit(): void {
  }

  mediaFormGroup: FormGroup = new FormGroup({
    mediaFormControl: new FormControl('')
  });

  onFileSelect(event) {
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  onMediaSubmit(event) {
    const formData = new FormData();
    formData.append('file', this.file);
    console.log(formData);
    this.appStateService.addMediaFile(formData);
  }

}
