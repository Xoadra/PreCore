



import 'zone.js/dist/zone'
import './polyfills'

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { AngularModule } from './app/app.browser'



enableProdMode( )


const godmod = platformBrowserDynamic( ).bootstrapModule( AngularModule )


