



import { Component, Input } from '@angular/core'



@Component( {
	selector: 'app-global',
	templateUrl: './global.component.html',
	styleUrls: [ './global.component.css' ]
} )


export class GlobalComponent {
	
	@Input( ) title: string
	
	
	about: string = 'An Isomorphic, Server Prerendered Angular & ASP.NET Core Web App!'
	
}


