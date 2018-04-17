



import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main/main.component'
import { HttpComponent } from './http/http.component'



const routes: Routes = [
	{
		path: '', component: MainComponent,
		data: {
			title: 'Main',
			meta: [ {
				name: 'description',
				content: 'PreCore, a web app combining Angular, ASP.NET Core, and server-side rendering!'
			} ]
		}
	},
	{
		path: 'http', component: HttpComponent,
		data: {
			title: 'Http',
			meta: [ {
				name: 'description',
				content: 'Make an API call to the ASP.NET Core backend to return some data within an isomorphic application!'
			} ]
		}
	}
]


@NgModule( {
	declarations: [
		MainComponent,
		HttpComponent
	],
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )


export class RouteModule {  }


