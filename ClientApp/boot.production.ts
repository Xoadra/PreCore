



import 'zone.js'
import 'zone.js/dist/zone-node'
import './polyfills'

import { enableProdMode } from '@angular/core'
import { createServerRenderer } from 'aspnet-prerendering'
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine'

const { AppModuleNgFactory } = require( './app/app.server.ngfactory' )



enableProdMode( )


export default createServerRenderer( params => {
	const setupOptions: IEngineOptions = {
		appSelector: '<app-root></app-root>',
		ngModule: AppModuleNgFactory,
		request: params,
		providers: [ ]
	}
	return ngAspnetCoreEngine( setupOptions ).then( response => {
		response.globals.transferData = createTransferScript( {
			someData: 'Transfer this to the client on the window.TRANSFER_CACHE {  } object',
			fromDotnet: params.data.thisCameFromDotNET
		} )
		return ( { html: response.html, globals: response.globals } )
	} )
} )



