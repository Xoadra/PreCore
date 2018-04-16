



import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'

import { RootModule } from './app.module'

import { AppComponent } from './app.component'



@NgModule( {
	imports: [
		RootModule,
		ServerModule
	],
	bootstrap: [ AppComponent ]
} )


export class AppModule {  }


