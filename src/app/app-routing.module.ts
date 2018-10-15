import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {TaskComponent} from './task/task.component';
import {FoursquareComponent} from './foursquare/foursquare.component';
import {ContactComponent} from './contact/contact.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'task', component: TaskComponent },
    { path: 'api', component: FoursquareComponent },
    { path: 'contacts', component: ContactComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}
