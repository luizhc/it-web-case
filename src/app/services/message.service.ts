import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Messages } from '../constants/messages.constants';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  simpleAlert(title: string) {
    Swal.fire(title);
  }

  alertWithIcon(title: string, message: string, type: SweetAlertIcon) {
    Swal.fire(title, message, type);
  }

  async confirmBoxDelete(message: string): Promise<boolean> {
    const result = await Swal.fire({
      title: Messages.DELETE.TITLE,
      html: Messages.DELETE.TEXT.replace('{text}', message),
      icon: Messages.DELETE.ICON as SweetAlertIcon,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    });
    if (result.value) {
      Swal.fire('Excluído', `${message} excluído com sucesso.`, 'success');
      return true;
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire('Cancelado', `${message} mantido com sucesso.`, 'error');
    }
    return false;
  }
}
