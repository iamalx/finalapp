/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent} from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent
    //, children: [
    //   {path: 'register2', component: RegistrationComponent, outlet: 'firstChild'}]
    },
    {path: 'about', component: AboutComponent},
    {path: 'register', component: RegistrationComponent},
    { path: 'login', component: LoginComponent},
    { path: 'logout', component: LogoutComponent}
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
