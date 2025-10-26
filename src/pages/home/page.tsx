
import { useState } from 'react';

export default function Home() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    ciudadResidencia: '',
    numeroFamiliares: '',
    edadNinos: '',
    comentarios: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Aplicar máscaras según el tipo de campo
    let maskedValue = value;
    
    if (name === 'nombre' || name === 'apellido') {
      // Solo letras, espacios y acentos
      maskedValue = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');
    } else if (name === 'telefono') {
      // Solo números y guión, formato 0000-0000
      maskedValue = value.replace(/[^\d-]/g, '');
      if (maskedValue.length === 4 && !maskedValue.includes('-')) {
        maskedValue = maskedValue + '-';
      }
      if (maskedValue.length > 9) {
        maskedValue = maskedValue.substring(0, 9);
      }
    } else if (name === 'edadNinos') {
      // Solo números, espacios, comas y la palabra "años"
      maskedValue = value.replace(/[^\d\s,años-]/g, '');
    } else if (name === 'email') {
      // Convertir a minúsculas
      maskedValue = value.toLowerCase();
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: maskedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar campos requeridos
    if (!formData.nombre || !formData.apellido || !formData.telefono || !formData.ciudadResidencia || !formData.numeroFamiliares) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar formato de email solo si se proporciona
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Por favor ingresa un correo electrónico válido');
        return;
      }
    }

    // Validar formato de teléfono (El Salvador)
    const phoneRegex = /^[267]\d{3}-?\d{4}$/;
    if (!phoneRegex.test(formData.telefono.replace(/\s/g, ''))) {
      alert('Por favor ingresa un número de teléfono válido (formato: 0000-0000)');
      return;
    }

    // Validar longitud de comentarios
    if (formData.comentarios.length > 500) {
      alert('Los comentarios no pueden exceder 500 caracteres');
      return;
    }

    try {
     const response = await fetch('https://script.google.com/macros/s/AKfycbzud-OhgHKJ9XRbTKOlcYvm3DpApqyRyJMsPv3Kl00uaX70pazLOupGl7txxBpJg6ty/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    nombre: formData.nombre.trim(),
    apellido: formData.apellido.trim(),
    email: formData.email.trim(),
    telefono: formData.telefono.trim(),
    ciudadResidencia: formData.ciudadResidencia,
    numeroFamiliares: formData.numeroFamiliares,
    edadNinos: formData.edadNinos.trim(),
    comentarios: formData.comentarios.trim()
  })
});

      if (response.ok) {
        setIsRegistered(true);
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          ciudadResidencia: '',
          numeroFamiliares: '',
          edadNinos: '',
          comentarios: ''
        });
      } else {
        alert('Error al enviar el registro. Por favor intenta nuevamente.');
      }
    } catch (error) {
      alert('Error al enviar el registro. Por favor intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-red-700">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(220, 38, 38, 0.8), rgba(185, 28, 28, 0.8)), url('https://readdy.ai/api/search-image?query=Christmas%20celebration%20with%20families%2C%20children%20playing%2C%20festive%20decorations%2C%20warm%20golden%20lights%2C%20red%20and%20green%20colors%2C%20joyful%20atmosphere%2C%20community%20gathering%2C%20holiday%20spirit%2C%20beautiful%20Christmas%20tree%2C%20presents%20and%20ornaments%2C%20magical%20winter%20wonderland%20scene&width=1920&height=1080&seq=hero-navidad&orientation=landscape')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/70 via-red-500/60 to-red-700/70"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-4 h-4 bg-yellow-300 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-6 h-6 bg-yellow-200 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-16 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-32 w-5 h-5 bg-yellow-300 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          {/* Logo/Brand */}
          <div className="mb-6 md:mb-8 mt-8 md:mt-16">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-heart-fill text-red-600 text-2xl md:text-3xl"></i>
              </div>
              <span className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-center leading-tight">
                CUMPLE AÑOS SEÑOR JESUCRISTO
              </span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="block text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'serif' }}>FAMILIAS</span>
            <span className="block text-lg sm:text-xl md:text-2xl lg:text-3xl font-normal mb-1 md:mb-2">POR LA</span>
            <span className="block text-yellow-300 drop-shadow-lg" style={{ fontFamily: 'serif' }}>NAVIDAD</span>
          </h1>

          {/* Event Details */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-yellow-200">SAN SALVADOR</h2>
            <div className="text-lg sm:text-xl md:text-2xl font-medium">
              <p className="mb-2">DOMINGO 7 DE DICIEMBRE | 4:00 PM</p>
              <div className="border-t border-b border-yellow-300 border-dotted py-3 md:py-4 my-4 md:my-6">
                <p className="text-xl sm:text-2xl font-semibold">Auditorio FEPADE</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-8 md:mb-12">
            <button 
              onClick={() => document.getElementById('registro')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 hover:bg-yellow-300 text-red-800 font-bold text-lg md:text-xl px-8 md:px-12 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-calendar-check-line mr-2 md:mr-3"></i>
              Regístrate Ahora
            </button>
          </div>

          {/* Decorative Christmas Tree Illustration */}
          <div className="mt-8 md:mt-16">
            <img 
              src="https://readdy.ai/api/search-image?query=Beautiful%20Christmas%20celebration%20scene%20with%20families%20enjoying%20together%2C%20children%20playing%20around%20decorated%20Christmas%20tree%2C%20warm%20golden%20lighting%2C%20festive%20red%20and%20green%20decorations%2C%20community%20gathering%20with%20subtle%20facial%20features%2C%20soft%20natural%20expressions%2C%20joyful%20holiday%20atmosphere%2C%20presents%20and%20ornaments%2C%20magical%20winter%20celebration%2C%20elegant%20venue%20setting&width=800&height=600&seq=isometric-navidad-mejorado&orientation=landscape"
              alt="Celebración Navideña"
              className="mx-auto max-w-full md:max-w-2xl w-full h-auto object-contain"
            />
          </div>

        </div>
      </div>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-4 md:mb-6">Una Celebración Especial</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Únete a nosotros en una celebración navideña única donde las familias se reúnen para celebrar 
              el verdadero significado de la Navidad. Un evento lleno de alegría, música, y momentos especiales 
              para toda la familia.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-red-50 rounded-2xl">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i className="ri-music-2-line text-white text-xl md:text-2xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-red-700 mb-3 md:mb-4">Música y Alabanza</h3>
              <p className="text-gray-600 text-sm md:text-base">Disfruta de presentaciones musicales especiales y momentos de alabanza familiar.</p>
            </div>

            <div className="text-center p-6 md:p-8 bg-green-50 rounded-2xl">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i className="ri-group-line text-white text-xl md:text-2xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-green-700 mb-3 md:mb-4">Actividades Familiares</h3>
              <p className="text-gray-600 text-sm md:text-base">Actividades especiales diseñadas para que toda la familia participe y disfrute junta.</p>
            </div>

            <div className="text-center p-6 md:p-8 bg-yellow-50 rounded-2xl sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <i className="ri-gift-line text-white text-xl md:text-2xl"></i>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-yellow-700 mb-3 md:mb-4">Mensaje de Esperanza y Unidad</h3>
              <p className="text-gray-600 text-sm md:text-base">Un espacio para reflexionar sobre el nacimiento de Jesucristo, y compartir un mensaje de fe y amor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Detalles del Evento</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-calendar-line text-red-700 text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Fecha y Hora</h3>
                    <p className="text-lg md:text-xl">Domingo 7 de Diciembre, 2024</p>
                    <p className="text-lg md:text-xl">4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-map-pin-line text-red-700 text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Ubicación</h3>
                    <p className="text-lg md:text-xl">Auditorio FEPADE</p>
                    <p className="text-base md:text-lg opacity-90">San Salvador, El Salvador</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="ri-ticket-line text-red-700 text-lg md:text-xl"></i>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-2">Entrada</h3>
                    <p className="text-lg md:text-xl">Un dolar $1.00</p>
                    <p className="text-base md:text-lg opacity-90">Registro requerido</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <img 
                src="https://readdy.ai/api/search-image?query=Beautiful%20Christmas%20auditorium%20setup%20with%20stage%2C%20family%20seating%2C%20warm%20lighting%2C%20festive%20decorations%2C%20Christmas%20tree%2C%20red%20and%20gold%20colors%2C%20elegant%20venue%2C%20community%20gathering%20space%2C%20holiday%20atmosphere&width=600&height=400&seq=auditorio-navidad&orientation=landscape"
                alt="Auditorio FEPADE"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registro" className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-700 mb-4 md:mb-6">Registro Familiar</h2>
            <p className="text-lg md:text-xl text-gray-700">
              Completa el formulario para asegurar tu lugar en esta celebración especial
            </p>
          </div>

          {isRegistered ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-green-700 mb-4">¡Registro Exitoso!</h3>
              <p className="text-lg text-green-600 mb-6">
                Tu familia ha sido registrada para el evento. Te esperamos el domingo 7 de diciembre.
              </p>
              <button 
                onClick={() => setIsRegistered(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full transition-colors cursor-pointer whitespace-nowrap"
              >
                Registrar Otra Familia
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 shadow-lg" data-readdy-form id="registro-evento-navidad">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    minLength={2}
                    maxLength={50}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Tu nombre"
                    title="Solo se permiten letras y espacios (2-50 caracteres)"
                  />
                </div>

                <div>
                  <label htmlFor="apellido" className="block text-sm font-semibold text-gray-700 mb-2">
                    Apellido *
                  </label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                    minLength={2}
                    maxLength={50}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Tu apellido"
                    title="Solo se permiten letras y espacios (2-50 caracteres)"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="telefono" className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    maxLength={9}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="0000-0000"
                    title="Formato: 0000-0000 (números de El Salvador)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Formato automático: 0000-0000</p>
                </div>

                <div>
                  <label htmlFor="ciudadResidencia" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ciudad de Residencia *
                  </label>
                  <select
                    id="ciudadResidencia"
                    name="ciudadResidencia"
                    value={formData.ciudadResidencia}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Seleccionar ciudad</option>
                    <option value="San Salvador">San Salvador</option>
                    <option value="Santa Ana">Santa Ana</option>
                    <option value="San Miguel">San Miguel</option>
                    <option value="La Libertad">La Libertad</option>
                    <option value="Sonsonate">Sonsonate</option>
                    <option value="Ahuachapán">Ahuachapán</option>
                    <option value="La Paz">La Paz</option>
                    <option value="Cabañas">Cabañas</option>
                    <option value="Chalatenango">Chalatenango</option>
                    <option value="Cuscatlán">Cuscatlán</option>
                    <option value="Morazán">Morazán</option>
                    <option value="San Vicente">San Vicente</option>
                    <option value="Usulután">Usulután</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="numeroFamiliares" className="block text-sm font-semibold text-gray-700 mb-2">
                    Número de Familiares *
                  </label>
                  <select
                    id="numeroFamiliares"
                    name="numeroFamiliares"
                    value={formData.numeroFamiliares}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-5

0 focus:border-transparent text-sm pr-8"
                  >
                    <option value="">Seleccionar cantidad</option>
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6 personas</option>
                    <option value="7">7 personas</option>
                    <option value="8">8 personas</option>
                    <option value="9">9 personas</option>
                    <option value="10+">10 o más personas</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={100}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="tu@email.com (opcional)"
                    title="Ingresa un correo electrónico válido"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="edadNinos" className="block text-sm font-semibold text-gray-700 mb-2">
                    Edades de los Niños
                  </label>
                  <input
                    type="text"
                    id="edadNinos"
                    name="edadNinos"
                    value={formData.edadNinos}
                    onChange={handleInputChange}
                    maxLength={50}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    placeholder="Ej: 5, 8, 12 años (opcional)"
                    title="Ingresa las edades separadas por comas"
                  />
                  <p className="text-xs text-gray-500 mt-1">Opcional: Separar edades con comas</p>
                </div>

                <div>
                  <label htmlFor="comentarios" className="block text-sm font-semibold text-gray-700 mb-2">
                    Comentarios o Necesidades Especiales
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm resize-none"
                    placeholder="Cualquier información adicional... (opcional)"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.comentarios.length}/500 caracteres
                  </p>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-line mr-3"></i>
                  Confirmar Registro
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">¿Tienes Preguntas?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="ri-phone-line text-red-700 text-lg md:text-xl"></i>
              </div>
              <h3 className="font-semibold mb-2 text-lg md:text-base">Teléfono</h3>
              <p className="text-base md:text-base">(503) 76963590</p>
            </div>
            
            <div className="sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="ri-mail-line text-red-700 text-lg md:text-xl"></i>
              </div>
              <h3 className="font-semibold mb-2 text-lg md:text-base">Email</h3>
              <p className="text-base md:text-base break-all">info@familiasnavidad.org</p>
            </div>
            
            <div className="sm:col-span-2 md:col-span-1">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="ri-map-pin-line text-red-700 text-lg md:text-xl"></i>
              </div>
              <h3 className="font-semibold mb-2 text-lg md:text-base">Ubicación</h3>
              <p className="text-base md:text-base">Auditorio FEPADE<br />San Salvador</p>
            </div>
          </div>
          
          {/* WhatsApp Button */}
          <div className="mt-8 md:mt-12">
            <a 
              href="https://wa.me/qr/WHEZV6HII7ZEG1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 md:gap-3 bg-green-500 hover:bg-green-600 text-white font-bold text-base md:text-lg px-6 md:px-8 py-3 md:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-xl md:text-2xl"></i>
              <span className="hidden sm:inline">Contáctanos por WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-8 md:py-12 bg-gradient-to-r from-yellow-50 to-yellow-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-yellow-200">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-heart-fill text-red-600 text-xl md:text-2xl"></i>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">Donación simbólica</h3>
            <div className="flex justify-center items-center">
              <span className="text-2xl md:text-3xl font-bold text-green-600">$1.00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="mb-6">
              <span className="text-2xl font-bold" style={{ fontFamily: 'Pacifico, serif' }}>Familias por la Navidad</span>
            </div>
            <p className="text-red-200 mb-8">
              Celebrando el verdadero significado de la Navidad en familia
            </p>
            
            {/* ICT Information */}
            <div className="mb-8 py-6 border-t border-b border-red-800">
              <div className="flex items-center justify-center gap-4 mb-4">
                <img 
                  src="https://soyict.org/wp-content/uploads/2024/09/ICT.png" 
                  alt="ICT Logo" 
                  className="h-12 w-auto filter brightness-0 invert"
                />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Evento organizado por ICT</h3>
                  <p className="text-sm text-red-200">Centro Internacional de Teoterapia Integral</p>
                </div>
              </div>
              <p className="text-sm text-red-200 max-w-2xl mx-auto leading-relaxed">
                ICT es una organización dedicada a formar hombres y mujeres capacitados como líderes 
                para el cumplimiento de la Gran Comisión, consolidando una estructura organizacional 
                que genere recursos para el fortalecimiento de centros operativos auto sostenibles.
              </p>
            </div>
            
            <div className="border-t border-red-800 pt-4">
              <p className="text-sm text-red-300">
                © 2024 Familias por la Navidad - Evento ICT. Todos los derechos reservados. | 
                <a href="https://readdy.ai/?origin=logo" className="hover:text-white ml-1 cursor-pointer">
                  Powered by Readdy
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
