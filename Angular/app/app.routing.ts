



import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main/main.component'
import { PageComponent } from './page/page.component'



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
		path: 'page', component: PageComponent,
		data: {
			title: 'Page',
			meta: [ {
				name: 'description',
				content: 'I like pages.  They\'re so great!  I love them.'
			} ]
		}
	}
]


@NgModule( {
	declarations: [
		MainComponent,
		PageComponent
	],
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ]
} )


export class RouteModule {  }


