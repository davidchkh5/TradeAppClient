import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ItemsComponent } from './items/items.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { OffersComponent } from './offers/offers.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: '*', component: HomeComponent},
  {path: 'profile/:userName', component: ProfileComponent, children: [
    {path: 'items', component: ItemsComponent},
    {path: 'update', component: UpdateUserComponent},
    {path: 'offers', component: OffersComponent},
    {path: 'items/:id', component: ItemDetailsComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
