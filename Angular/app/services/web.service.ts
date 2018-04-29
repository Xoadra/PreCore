



import { Injectable } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Title, Meta } from '@angular/platform-browser'

import { Subscription } from 'rxjs/Subscription'



@Injectable( )


export class WebService {
	
	// Use a subscription observable to access unsubscribe with
	private navigator: Subscription
	
	
	constructor( private _title: Title, private _meta: Meta, private _url: ActivatedRoute ) {  }
	
	
	injectData( route: Router, name: string ) {
		// Instantiate the navigator as a router event subscription
		this.navigator = route.events
			.filter( trans => trans instanceof NavigationEnd )
			.map( ( ) => this._url )
			.map( land => { while ( land.firstChild ) return land.firstChild } )
			.mergeMap( posit => posit.data )
			// Subscribe to navigation events for injecting route data
			.subscribe( data => {
				const title = data[ 'title' ] !== 'Main' ? name + ' | ' + data[ 'title' ] : name
				const meta = data[ 'meta' ] || [ ]
				this._title.setTitle( title )
				for ( let idx = 0; idx < meta.length; idx++ ) this._meta.updateTag( meta[ idx ] )
			} )
	}
	
	killNavigator( ) {
		// Necessity of invoking unsubscribe is not fully known yet
		this.navigator.unsubscribe( )
	}
	
}



