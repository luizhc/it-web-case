import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent, HomeComponent],
  imports: [CommonModule],
  exports: [NavbarComponent, FooterComponent, HomeComponent],
})
export class CoreModule {}
