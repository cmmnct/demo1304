import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ColorpickerComponent } from './colorpicker/colorpicker.component';

const routes: Routes = [
  { path: 'home', component: HelloWorldComponent },
  { path: 'colorpicker', component: ColorpickerComponent },
  { path: '**', component: HelloWorldComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
