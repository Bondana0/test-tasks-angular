import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {CommonComponent} from './components/common/common.component';
import {ShortComponent} from './components/short/short.component';



const routes: Routes = [
    { path: 'common-component', component: CommonComponent },
    { path: 'short-component', component: ShortComponent },
    { path: '',   redirectTo: '/common-component', pathMatch: 'full'},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
  
export class AppRoutingModule {}