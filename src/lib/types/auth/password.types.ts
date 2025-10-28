// Lo que el formulario del frontend maneja y la API espera
export type ForgotPasswordInput = {
  email: string;
};

// Lo que la API del backend devuelve
export type ForgotPasswordResponse = {
  message: string;
};