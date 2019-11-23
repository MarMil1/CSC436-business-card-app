import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AddNewCardComponent } from './add-new-card/add-new-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogContentComponent, DialogContentDialog } from './dialog-content/dialog-content.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './webcam/webcam.component';
import { DialogUpdateInfoComponent, DialogUpdateInfoContent } from './dialog-update-info/dialog-update-info.component';
import { BusinessCardsService } from './businessCards.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { SearchFilterPipe } from './all-cards/search-filter.pipe';
import { MatSnackBarModule, MatSidenavModule } from '@angular/material';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      NavBarComponent,
      AllCardsComponent,
      AddNewCardComponent,
      DialogContentComponent,
      DialogContentDialog,
      WebcamComponent,
      DialogUpdateInfoComponent,
      DialogUpdateInfoContent,
      SearchFilterPipe,
      PageNotFoundComponent,
      UserProfileComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      AngularFireAuthModule,
      HttpClientModule,
      AngularFireDatabaseModule,
      AngularFirestoreModule,
      AngularFireModule.initializeApp(environment.firebaseConfig),
      BrowserAnimationsModule,
      MatDialogModule,
      WebcamModule,
      MatSnackBarModule,
      MatSidenavModule
   ],
   entryComponents: [
      DialogContentComponent,
      DialogContentDialog,
      DialogUpdateInfoComponent,
      DialogUpdateInfoContent
   ],
   providers: [
      BusinessCardsService,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
