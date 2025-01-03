import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { AdminGuard } from './authentication/admin.guard';
import { ErrorLogComponent } from './error-log/error-log.component';
import { CartComponent } from './cart/cart.component'; // Import the CartComponent

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'admin/error-logs', component: ErrorLogComponent, canActivate: [AdminGuard] },
  { path: 'cart', component: CartComponent }, // Add the cart route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }