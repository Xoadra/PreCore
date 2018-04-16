



import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

import { RouteModule } from './app.routing'

import { AppComponent } from './app.component'

import { BestService } from './services/best.service'



@NgModule( {
	declarations: [ AppComponent ],
	imports: [
		BrowserModule.withServerTransition( { appId: 'app-id' } ),
		RouteModule,
		HttpClientModule
	],
	providers: [ BestService ],
	bootstrap: [ AppComponent ]
} )


export class MetaModule {  }

