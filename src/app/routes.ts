import { Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { RegisterComponent } from "./register/register.component";
import { ResultComponent } from "./result/result.component";
import { SurveyComponent } from "./survey/survey.component";

export const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard] },
    { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/register', pathMatch: 'full' },

];