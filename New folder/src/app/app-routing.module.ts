import { AuthGuard } from "./Guards/auth.guard";
import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then((m) => m.AboutPageModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfilePageModule),
  },
  {
    path: "contact",
    loadChildren: () =>
      import("./contact/contact.module").then((m) => m.ContactPageModule),
  },

  {
    path: "order",
    loadChildren: () =>
      import("./order/order.module").then((m) => m.OrderPageModule),
  },
  {
    path: "success",
    loadChildren: () =>
      import("./success/success.module").then((m) => m.SuccessPageModule),
  },
  {
    path: "cart",
    loadChildren: () =>
      import("./cart/cart.module").then((m) => m.CartPageModule),
  },
  {
    path: "know",
    loadChildren: () =>
      import("./know/know.module").then((m) => m.KnowPageModule),
  },
  {
    path: "orderdetails",
    loadChildren: () =>
      import("./orderdetails/orderdetails.module").then(
        (m) => m.OrderdetailsPageModule
      ),
  },
  {
    path: "frontpage",
    loadChildren: () =>
      import("./frontpage/frontpage.module").then((m) => m.FrontpagePageModule),
  },
  {
    path: "verifyuser",
    loadChildren: () =>
      import("./verifyuser/verifyuser.module").then(
        (m) => m.VerifyuserPageModule
      ),
  },
  {
    path: "odrcandel-reson",
    loadChildren: () =>
      import("./odrcandel-reson/odrcandel-reson.module").then(
        (m) => m.OdrcandelResonPageModule
      ),
  },
  {
    path: "forgetpass",
    loadChildren: () =>
      import("./forgetpass/forgetpass.module").then(
        (m) => m.ForgetpassPageModule
      ),
  },
  {
    path: "verifyotp",
    loadChildren: () =>
      import("./verifyotp/verifyotp.module").then((m) => m.VerifyotpPageModule),
  },
  {
    path: "changepass",
    loadChildren: () =>
      import("./changepass/changepass.module").then(
        (m) => m.ChangepassPageModule
      ),
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
  {
    path: "updatepass",
    loadChildren: () =>
      import("./updatepass/updatepass.module").then(
        (m) => m.UpdatepassPageModule
      ),
  },
  {
    path: "get-otp",
    loadChildren: () =>
      import("./get-otp/get-otp.module").then((m) => m.GetOTPPageModule),
  },
  {
    path: "changemob",
    loadChildren: () =>
      import("./changemob/changemob.module").then((m) => m.ChangemobPageModule),
  },
  {
    path: 'payment-mode',
    loadChildren: () => import('./payment-mode/payment-mode.module').then( m => m.PaymentModePageModule)
  },
  {
    path: 'showoffer',
    loadChildren: () => import('./showoffer/showoffer.module').then( m => m.ShowofferPageModule)
  },
  {
    path: 'show-map',
    loadChildren: () => import('./show-map/show-map.module').then( m => m.ShowMapPageModule)
  },
  {
    path: 'track-order/:id',
    loadChildren: () => import('./track-order/track-order.module').then( m => m.TrackOrderPageModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyPageModule)
  },
  {
    path: 'termsandcond',
    loadChildren: () => import('./termsandcond/termsandcond.module').then( m => m.TermsandcondPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
