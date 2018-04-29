



// Polyfills, but not yet sure what they're used here for
import 'zone.js'
import 'zone.js/dist/zone-node'
import './polyfills'

import { enableProdMode } from '@angular/core'
import { createServerRenderer } from 'aspnet-prerendering'
// Allows server-side prerendering of Angular content
import { ngAspnetCoreEngine, IEngineOptions, createTransferScript } from '@nguniversal/aspnetcore-engine'

// NgModule for using AoT compilation for production
const { NetCoreModuleNgFactory } = require( './app/app.server.ngfactory' )



// Supposedly allows faster builds for server rendering
enableProdMode( )


// Rendering setup used with platform-server provider
export default createServerRenderer( core => {
	const ops: IEngineOptions = {
		appSelector: '<app-root></app-root>',
		ngModule: NetCoreModuleNgFactory,
		request: core,
		providers: [ ]
	}
	return ngAspnetCoreEngine( ops ).then( trans => {
		// Transfer data from the server to the frontend
		trans.globals.transferData = createTransferScript( {
			someData: 'Transfer this to the client on the window.TRANSFER_CACHE {  } object',
			// Data accessed sent by the backend server
			fromDotnet: core.data.thisCameFromDotNET
		} )
		return ( { html: trans.html, globals: trans.globals } )
	} )
} )


