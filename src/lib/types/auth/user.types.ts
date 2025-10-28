// Lo que el formulario de React maneja
export type RegisterFormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// Lo que la API del backend espera recibir
export type RegisterInputAPI = {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
};

// Lo que la API del backend devuelve
export type RegisterResponse = {
  message: string;
  data: {
    id_usuario: number;
    correo: string;
  };
};