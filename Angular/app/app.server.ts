



import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'

import { MetaModule } from './app.module'

import { AppComponent } from './app.component'



@NgModule( {
	imports: [
		MetaModule,
		ServerModule
	],
	bootstrap: [ AppComponent ]
} )


export class NetCoreModule {  }


