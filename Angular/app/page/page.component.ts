



import { Component, OnInit } from '@angular/core'
import { Title, Meta, MetaDefinition } from '@angular/platform-browser'



@Component( {
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: [ './page.component.css' ]
} )


export class PageComponent implements OnInit {
	
	private title: string = 'PreCore | Page'
	private meta: MetaDefinition = {
		name: 'description',
		content: 'I like pages.  They\'re so great!  I love them.'
	}
	
	
	constructor( private _title: Title, private _meta: Meta ) {  }
	
	
	ngOnInit( ) {
		this._title.setTitle( this.title )
		this._meta.updateTag( this.meta )
	}
	
}



