



import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { RouteModule } from './app.routing'

import { AppComponent } from './app.component'
import { GlobalComponent } from './global/global.component'

import { DataService } from './services/data.service'
import { WebService } from './services/web.service'



@NgModule( {
	declarations: [
		AppComponent,
		GlobalComponent
	],
	imports: [
		BrowserModule.withServerTransition( { appId: 'app' } ),
		RouteModule,
		HttpClientModule
	],
	providers: [
		DataService,
		WebService
	],
	bootstrap: [ AppComponent ]
} )


export class MetaModule {  }


