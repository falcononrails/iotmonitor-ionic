import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "add-topic",
    loadChildren: "./add-topic/add-topic.module#AddTopicPageModule"
  },
  {
    path: "graph-display",
    loadChildren: "./graph-display/graph-display.module#GraphDisplayPageModule"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
