'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGoogle, FaFacebookF, FaApple, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

// Definir tipos TypeScript para mejor tipado
interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  lastActive: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  // Estados para manejar el formulario y la UI
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Perfiles de usuario guardados (normalmente vendrían de localStorage o una API)
  const [savedProfiles, setSavedProfiles] = useState<UserProfile[]>([
    {
      id: '1',
      name: 'John peter',
      avatar: '/img/persona1.png',
      lastActive: 'Active 1 days ago'
    },
    {
      id: '2',
      name: 'Alina shmen',
      avatar: '/img/persona2.png',
      lastActive: 'Active 4 days ago'
    }
  ]);

  // Manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Manejar envío del formulario de login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aquí iría la lógica de autenticación
      console.log('Datos del formulario:', formData);

      // Simular una petición de login
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirigir al dashboard o página principal
      // router.push('/dashboard');

    } catch (error) {
      console.error('Error en el login:', error);
      // Aquí manejarías los errores de login
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar login con proveedores externos (Google, Facebook, Apple)
  const handleSocialLogin = async (provider: string) => {
    try {
      console.log(`Login con ${provider}`);
      // Aquí iría la lógica para login con OAuth
      // Por ejemplo, usando NextAuth.js o similar
    } catch (error) {
      console.error(`Error en login con ${provider}:`, error);
    }
  };

  // Manejar selección de perfil guardado
  const handleProfileSelect = (profile: UserProfile) => {
    setFormData(prev => ({
      ...prev,
      email: profile.name.toLowerCase().replace(' ', '') + '@email.com'
    }));
  };

  // Remover perfil guardado
  const removeProfile = (profileId: string) => {
    setSavedProfiles(prev => prev.filter(profile => profile.id !== profileId));
  };

  return (
    <div className="bg-white relative min-h-screen">
      {/* Fondo azul superior - ocupa la mitad horizontal de la pantalla */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-[#0785E6]" />

      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-20 sm:w-28 z-20">
        <Image
          src="/img/logo.png"
          alt="GradIA logo with a graduation cap and AI letters"
          width={112}
          height={48}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 relative z-10 flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        {/* Lado izquierdo: Contenido promocional con fondo azul */}
        <div className="w-full lg:w-1/2 flex flex-col relative text-white">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-8 sm:mt-12">
            {/* Texto promocional */}
            <div className="flex flex-col flex-1 text-center sm:text-left">
              
                <h2 className="text-3xl font-semibold mb-3 leading-tight cursor-pointer">
                  Regístrate
                </h2>
              

              <p className="text-base sm:text-lg font-normal leading-relaxed">
                Transcribe, estudia y aprende con tus videos educativos favoritos.
              </p>
            </div>
            {/* Ilustración del cohete */}
            <div className="hidden sm:block">
              <Image
                src="/img/icon.png"
                alt="Illustration of a person sitting on an orange rocket with clouds around"
                width={240}
                height={200}
                className="w-48 lg:w-60 max-w-full"
              />
            </div>
          </div>

          {/* Perfiles guardados - se muestra debajo del área azul */}
          <div className="rounded-lg p-4 sm:p-6 mt-12 sm:mt-19 w-full max-w-md mx-auto sm:mx-0">
            <p className="text-sm font-normal text-black mb-4 text-center sm:text-left">Iniciar sesión como</p>
            <div className="flex gap-4 sm:gap-6 justify-center sm:justify-start">
              {savedProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="bg-[#EAF2FF] rounded-lg p-3 sm:p-4 w-28 sm:w-34 flex flex-col items-center relative cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleProfileSelect(profile)}
                >
                  {/* Botón para remover perfil */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProfile(profile.id);
                    }}
                    className="absolute top-1 right-1 sm:top-2 sm:right-2 text-gray-400 hover:text-gray-600 text-xs"
                    type="button"
                    aria-label={`Remove ${profile.name}`}
                  >
                    <FaTimes />
                  </button>

                  {/* Avatar del usuario */}
                  <Image
                    src={profile.avatar}
                    alt={`Profile photo of ${profile.name}`}
                    width={56}
                    height={56}
                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 object-cover mb-2"
                  />

                  {/* Información del usuario */}
                  <p className="text-xs font-semibold text-black text-center leading-tight">{profile.name}</p>
                  <p className="text-[10px] text-gray-400 text-center">{profile.lastActive}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lado derecho: Formulario de login */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-[0_20px_30px_rgba(0,0,0,0.1)] w-full max-w-md p-6 sm:p-10 mx-auto lg:mx-0 -mt-8 sm:-mt-20 lg:mt-0 lg:ml-auto"
          autoComplete="off"
        >
          {/* Header del formulario */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4 sm:gap-0">
            <p className="text-base font-normal text-black text-center sm:text-left">
              Bienvenido a{' '}
              <span className="font-semibold text-[#0785E6]">GradIA</span>
            </p>
            <p className="text-xs text-gray-400 text-center sm:text-right">
              ¿No tienes cuenta?<br />
              <Link href="/auth/register" className="text-[#0785E6] hover:underline">
                Regístrate
              </Link>
            </p>
          </div>

          {/* Título principal */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight text-black text-center sm:text-left">
            Inicia sesión
          </h1>

          {/* Botones de login social */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Botón de Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-3 bg-[#EAF2FF] text-[#3B82F6] rounded-lg px-4 sm:px-5 py-3 text-sm font-medium w-full sm:w-auto hover:bg-blue-100 transition-colors"
            >
              <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="sm:hidden">Google</span>
              <span className="hidden sm:inline">Sign in with Google</span>
            </button>

            {/* Contenedor para botones de Facebook y Apple en móvil */}
            <div className="flex gap-3 sm:contents">
              {/* Botón de Facebook */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Facebook')}
                className="bg-white rounded-lg p-3 flex justify-center items-center flex-1 sm:flex-none sm:w-12 h-12 hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Sign in with Facebook"
              >
                <FaFacebookF className="text-[#3B82F6]" />
              </button>

              {/* Botón de Apple */}
              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className="bg-white rounded-lg p-3 flex justify-center items-center flex-1 sm:flex-none sm:w-12 h-12 hover:bg-gray-50 transition-colors border border-gray-200"
                aria-label="Sign in with Apple"
              >
                <FaApple className="text-gray-700" />
              </button>
            </div>
          </div>

          {/* Campo de email/usuario */}
          <label
            htmlFor="email"
            className="block text-xs font-normal text-black mb-1"
          >
            Nombre de usuario o dirección de correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Usuario o dirección de correo electrónico"
            className="w-full border border-[#3B82F6] rounded-md px-4 py-3 mb-4 sm:mb-6 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B82F6]"
            required
          />

          {/* Campo de contraseña */}
          <label
            htmlFor="password"
            className="block text-xs font-normal text-black mb-1"
          >
            Contraseña
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Contraseña"
              className="w-full border border-gray-300 rounded-md px-4 py-3 mb-2 text-xs placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300 text-black"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Link para recuperar contraseña */}
          <div className="text-right mb-6 sm:mb-8">
            <Link
              href="/forgot-password"
              className="text-xs text-[#0785E6] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#0785E6] text-white rounded-lg py-3 sm:py-4 font-medium text-sm shadow-[0_8px_15px_rgba(7,133,230,0.3)] hover:brightness-110 transition ${isLoading ? 'opacity-70 cursor-not-loading' : ''
              }`}
          >
            {isLoading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;