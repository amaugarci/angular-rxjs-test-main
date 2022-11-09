import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputTestComponent } from './components/test2/input-test/input-test.component';
import { MyComponentComponent } from './components/test2/my-component/my-component.component';
import { CustomRouteDataResolver } from './resolver/route.resolver';
import { CustomRouteDataResolver2 } from './resolver/route2.resolver';




const routes: Routes = [
  // DO NOT ALTER ROUTES
  {
    path: 'test/1/:id',
    component: MyComponentComponent,
    runGuardsAndResolvers: 'always',
    resolve: [CustomRouteDataResolver]
  },
  // DO NOT ALTER ROUTES
  {
    path: 'test/2/:id',
    component: MyComponentComponent,
    runGuardsAndResolvers: 'always',
    resolve: [CustomRouteDataResolver2]
  },
  // DO NOT ALTER ROUTES
  {
    path: 'test/3',
    component: InputTestComponent,
    runGuardsAndResolvers: 'always',
  },
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
