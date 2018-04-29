



// Polyfills, but not yet sure what they're used here for
import 'zone.js/dist/zone'
import './polyfills'

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AngularModule } from './app/app.browser'



// Start up hot module replacement or production mode
if ( module[ 'hot' ] ) {
	module[ 'hot' ].accept( )
	module[ 'hot' ].dispose( ( ) => {
		//godmod.then( ancient => ancient.destroy( ) )
	} )
}
else {
	enableProdMode( )
}


const godmod = platformBrowserDynamic( ).bootstrapModule( AngularModule )



