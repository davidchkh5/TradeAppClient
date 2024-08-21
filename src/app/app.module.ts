import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { EditInputComponent } from './edit-input/edit-input.component';
import { OffersComponent } from './offers/offers.component';
import { AddItemsComponent } from './add-items/add-items.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoadingInterceptor } from './loading.interceptor';
import { ItemDetailsComponent } from './item-details/item-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    HomeComponent,
    ItemsComponent,
    ProfileComponent,
    EditInputComponent,
    OffersComponent,
    AddItemsComponent,
    ConfirmDialogComponent,
    UpdateUserComponent,
    ItemDetailsComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
