import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { AllfilesComponent } from './components/allfiles/allfiles.component';
import { AudiofilesComponent } from './components/audiofiles/audiofiles.component';
import { VideofilesComponent } from './components/videofiles/videofiles.component';
import { ImagefilesComponent } from './components/imagefiles/imagefiles.component';
import { OtherfilesComponent } from './components/otherfiles/otherfiles.component';
import { MainComponent } from './components/main/main.component';
import { UploadsComponent } from './components/uploads/uploads.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchbarComponent,
    AllfilesComponent,
    AudiofilesComponent,
    VideofilesComponent,
    ImagefilesComponent,
    OtherfilesComponent,
    MainComponent,
    UploadsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
