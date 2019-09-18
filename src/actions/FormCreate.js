export const HIDDEN_FORM_ERROR = 'hidden_form_error';
export const SHOW_FORM_ERROR = 'show_form_error';

export const showMessageError = message => {
  console.log(message);
  return {
    type: SHOW_FORM_ERROR,
    payload: message,
  };
};

export const hiddenMessageError = message => {
  console.log(message);

  return {
    type: HIDDEN_FORM_ERROR,
    payload: message,
  };
};
