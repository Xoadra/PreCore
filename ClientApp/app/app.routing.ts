



import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainComponent } from './main/main.component'
import { PageComponent } from './page/page.component'



const routes: Routes = [
	{ path: '', component: MainComponent, data: { title: 'Main' } },
	{ path: 'page', component: PageComponent, data: { title: 'Page' } }
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


