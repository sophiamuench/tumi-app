/*
 *     The TUMi app provides a modern way of managing events for an esn section.
 *     Copyright (C) 2019  Lukas Heddendorp
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { NgModule } from '@angular/core';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: 'office',
    data: { title: 'Office' },
    loadChildren: () => import('./office/office.module').then(mod => mod.OfficeModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'tutors',
    data: { title: 'Tutors' },
    loadChildren: () => import('./tutors/tutors.module').then(mod => mod.TutorsModule),
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'events',
    data: { title: 'Events' },
    loadChildren: () => import('./events/events.module').then(mod => mod.EventsModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: '**', pathMatch: 'full', redirectTo: 'error' },
  { path: 'error', component: NotFoundPageComponent, data: { title: 'Error' } }
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy, enableTracing: false })
  ],
  providers: [AngularFireAuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {}
