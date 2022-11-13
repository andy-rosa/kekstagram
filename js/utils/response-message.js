import { onPopupEscKeydown } from '../form.js';
import { isEnterKey, isEscapeKey } from './utils.js';


const showResponseMessage = (typeResponse) => {
  const message = document.querySelector(`#${typeResponse}`)
    .content.querySelector(`.${typeResponse}`)
    .cloneNode(true);

  const buttonCancel = message.querySelector(`.${typeResponse}__button`);
  document.body.append(message);


  const onEscapeKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      message.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
      if (typeResponse === 'error'){
        document.addEventListener('keydown', onPopupEscKeydown);
      }
    }
  };

  const onNotMessageAreaClick = (evt) => {
    if (!evt.target.closest(`div.${typeResponse}__inner`)) {
      message.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  const onButtonCancelKeydown = (evt) => {
    if (document.activeElement === evt.target) {
      if (isEnterKey(evt)) {
        message.remove();
        document.removeEventListener('keydown', onEscapeKeydown);
      }
    }
  };

  const onButtonCancelClick = (evt) => {
    if (document.activeElement === evt.target) {
      message.remove();
      document.removeEventListener('keydown', onEscapeKeydown);
    }
  };

  if (typeResponse === 'error') {
    document.removeEventListener('keydown', onPopupEscKeydown);
  }

  document.addEventListener('keydown', onEscapeKeydown);
  message.addEventListener('click', onNotMessageAreaClick);
  buttonCancel.addEventListener('keydown', onButtonCancelKeydown);
  buttonCancel.addEventListener('click', onButtonCancelClick);
};

export { showResponseMessage };
