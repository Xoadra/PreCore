



import { Injectable } from '@angular/core'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { Title, Meta } from '@angular/platform-browser'



@Injectable( )


export class WebService {
	
	constructor( private _title: Title, private _meta: Meta, private _url: ActivatedRoute ) {  }
	
	
	injectData( route: Router, name: string ) {
		route.events
			.filter( trans => trans instanceof NavigationEnd )
			.map( ( ) => this._url )
			.map( land => { while ( land.firstChild ) return land.firstChild } )
			.mergeMap( posit => posit.data )
			.subscribe( data => {
				const title = data[ 'title' ] !== 'Main' ? name + ' | ' + data[ 'title' ] : name
				const meta = data[ 'meta' ] || [ ]
				this._title.setTitle( title )
				for ( let idx = 0; idx < meta.length; idx++ ) this._meta.updateTag( meta[ idx ] )
			} )
	}
	
}


