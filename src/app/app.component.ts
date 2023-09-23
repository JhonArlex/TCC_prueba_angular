import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MenuModule,
    ToolbarModule,
    MessagesModule
  ],
})
export class AppComponent {
  title = 'maestro_cliente_front';
  sidebarVisible = true;
  items: MenuItem[] = [
    {
      label: 'Inicio',
      icon: 'pi pi-fw pi-home',
      routerLink: '/home'
    },
    {
      label: 'Clientes',
      icon: 'pi pi-fw pi-users',
      routerLink: '/usuarios'
    },
  ];
}
