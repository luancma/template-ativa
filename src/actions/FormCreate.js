export const HIDDEN_FORM_ERROR = 'hidden_form_error';
export const SHOW_FORM_ERROR = 'show_form_error';

export const showMessageError = message => ({
  type: SHOW_FORM_ERROR,
  payload: message,
});

export const hiddenMessageError = message => ({
  type: HIDDEN_FORM_ERROR,
  payload: message,
});
