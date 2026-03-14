import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Navbar } from './shared/components/navbar/navbar';
@Component({
  selector: 'app-navbar',
  template: ` <nav class="text-class">
    <a href="test-link">test link</a>
  </nav>`,
})
class MockNavbar {}

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let app: App;
  beforeEach(async () => {
    //! #opcion1
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    app = fixture.componentInstance;

    //! #opcion1
    // await TestBed.configureTestingModule({
    //   imports: [App],
    //   providers: [provideRouter([])],
    // })
    //   .overrideComponent(App, {
    //     add: {
    //       imports: [MockNavbar],
    //     },
    //     remove:{
    //       imports:[Navbar]
    //     }
    //   })
    //   .compileComponents();

    // norecomendado
    // TestBed.overrideComponent(App,{
    //   set:{
    //     imports:[MockNavbar],
    //     schemas:[CUSTOM_ELEMENTS_SCHEMA]//ignora los elementos no conocidos
    //   }
    // })
  });

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(App);
    // const app = fixture.componentInstance;
    // console.log(fixture.nativeElement.innerHTML);
    // expect(true).toBe(false)
    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // console.log(compiled.innerHTML);

    expect(compiled.innerHTML).toMatchSnapshot();

  });
  it('should create the app', () => {});
});
