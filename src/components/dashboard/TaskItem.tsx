import TaskCard from "./TaskCardItem"

// ...
<aside className="space-y-4 w-[272px] shrink-0">
  {/* ...tu Summary arriba... */}

  <div className="text-[14px] font-semibold text-gray-900 mt-2 mb-1">Tareas por entregar</div>

  <TaskCard
    titulo="Electivo II: Fundamentos de Machine Learning"
    descripcion='Proyecto AE: "Operación Atlas: La Misión para Redibujar el Futuro"'
    fecha="Miércoles 10 de Septiembre 1:00PM"
    href="#"
  />
  <TaskCard
    titulo="Arquitectura Empresarial"
    descripcion='Proyecto AE: "Operación Atlas"'
    fecha="Domingo 14 de Octubre 12:56"
    href="#"
  />
</aside>
