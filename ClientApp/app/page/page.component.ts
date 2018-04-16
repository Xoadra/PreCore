



import { Component, OnInit } from '@angular/core'

import { BestService } from '../services/best.service'



@Component( {
	selector: 'app-page',
	templateUrl: './page.component.html',
	styleUrls: [ './page.component.css' ]
} )


export class PageComponent implements OnInit {
	
	constructor( private _best: BestService ) {  }
	
	
	ngOnInit( ) {  }
	
}


