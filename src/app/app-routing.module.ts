import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { AuthGuard } from './auth.guard';
import { AddNewCardComponent } from './add-new-card/add-new-card.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'allcards', component: AllCardsComponent, canActivate: [AuthGuard] },
  { path: 'addnewcard', component: AddNewCardComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: []
})
export class AppRoutingModule { }
