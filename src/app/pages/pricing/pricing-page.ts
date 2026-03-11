import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
})
export default class PricingPage {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID); //verficar si estamos del lado del cliente o del servidor

  ngOnInit(): void {
    // console.log("doc",document)
    console.log('hello word'); // el codigo se ejecuta del lado del servidor y del lado del cliente
    this.title.setTitle('Pricing Page')
    this.meta.updateTag({name: 'description', content:' este es mi pricing page'})
    this.meta.updateTag({name: 'og:title', content:' Pricing Page'})
    this.meta.updateTag({name: 'keywords', content:'hola,mundo,angular,ssr'})

    console.log('platform', this.platform);
    console.log(isPlatformServer(this.platform));
    //mala practica
    // if (isPlatformBrowser(this.platform)) {
    //   document.title = 'pricing page'; // document no esat definido en el server
    // }
  }
}
