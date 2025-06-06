import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { PostCarComponent } from './components/post-car/post-car.component';

const routes: Routes = [
  {path: "dashboard", component: CustomerDashboardComponent},
  {path: "post-car", component: PostCarComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
