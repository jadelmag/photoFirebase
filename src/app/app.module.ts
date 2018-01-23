import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { APP_ROUTES } from './app.routes';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { LoadComponent } from './components/load/load.component';

// Services
import { LoadImagesService } from './services/load-images.service';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';


import { NgDropFilesDirective } from './directives/ng-drop-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    LoadComponent,
    NgDropFilesDirective
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp( environment.firebase ),
    AngularFireModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    LoadImagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
