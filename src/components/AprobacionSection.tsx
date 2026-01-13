import { useState, useMemo } from "react";

interface ProductoAprobacion {
  producto: string;
  cuotaInicial: string;
  plazo: string;
  finalidad: string;
  hipotecas: string;
}

interface AprobacionSectionProps {
  producto: ProductoAprobacion;
  observacion: string;
  condiciones: string;
}

const rolesMap: Record<string, string[]> = {
  "Analista de Admisión de Riesgos": [
    "Carla Bocanegra",
    "Adrian Mori",
    "Patricia Matos",
  ],
  "Jefe de Admisión de Riesgos": ["Miguel Godos"],
  "Subgerente de Admisión de Riesgos": ["Renato Valencia"],
  "Gerente de División": ["Jose Luis Chavez"],
};

const AprobacionSection = ({
  producto,
  observacion,
  condiciones,
}: AprobacionSectionProps) => {
  const [estado, setEstado] = useState("Aprobado");
  const [comentario, setComentario] = useState(observacion);

  const [rol, setRol] = useState("__placeholder__");
  const [nombre, setNombre] = useState("__placeholder__");

  const fechaHoy = useMemo(
    () => new Date().toLocaleDateString("es-PE"),
    []
  );

  const nombresDisponibles =
    rol !== "__placeholder__" ? rolesMap[rol] : [];

  return (
    <div className="bg-card border-2 border-primary rounded-lg overflow-visible shadow-lg mt-6">
      <div className="p-4 space-y-4">

        {/* COMENTARIO EDITABLE */}
        <div className="border-2 border-primary p-3">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            className="w-full text-xs text-center italic leading-relaxed bg-transparent outline-none resize-none"
          />
        </div>

        {/* HEADER ESTADO */}
        <div className="header-banner flex items-center justify-center gap-2 py-2">
          <span className="font-bold text-base">Estado:</span>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="
              bg-white 
              text-black 
              border 
              px-2 
              py-1 
              text-sm 
              rounded 
              appearance-none
            "
          >
            <option value="Aprobado" className="text-black">
              Aprobado
            </option>
            <option value="Denegado" className="text-black">
              Denegado
            </option>
          </select>

        </div>

        {/* TABLA DE PRODUCTO */}
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-primary text-xs">
            <thead>
              <tr>
                <th className="data-label py-1 px-2">Producto</th>
                <th className="data-label py-1 px-2">Cuota Inicial</th>
                <th className="data-label py-1 px-2">Plazo</th>
                <th className="data-label py-1 px-2">Finalidad</th>
                <th className="data-label py-1 px-2">Hipotecas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell text-center">{producto.producto}</td>
                <td className="data-cell text-center">{producto.cuotaInicial}</td>
                <td className="data-cell text-center">{producto.plazo}</td>
                <td className="data-cell text-center">{producto.finalidad}</td>
                <td className="data-cell text-center">{producto.hipotecas}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CONDICIONES */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium">Condiciones:</span>
          <span className="text-muted-foreground">{condiciones}</span>
        </div>

        {/* LÍNEA */}
        <div className="border-t-2 border-primary"></div>

        {/* FIRMAS DINÁMICAS */}
        <div className="flex justify-end">
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="font-bold pr-4 py-1">
                  Banco de Negocios – Fecha
                </td>
                <td className="py-1">{fechaHoy}</td>
              </tr>

              <tr>
                <td className="font-bold pr-4 py-1">Cargo</td>
                <td className="py-1">
                  <select
                    value={rol}
                    onChange={(e) => {
                      setRol(e.target.value);
                      setNombre("__placeholder__");
                    }}
                    className="border px-2 py-1 text-xs rounded w-full"
                  >
                    <option value="__placeholder__" disabled>
                      Seleccionar cargo
                    </option>
                    {Object.keys(rolesMap).map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="font-bold pr-4 py-1">Nombre</td>
                <td className="py-1">
                  <select
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    disabled={rol === "__placeholder__"}
                    className="border px-2 py-1 text-xs rounded w-full disabled:bg-gray-100"
                  >
                    <option value="__placeholder__" disabled>
                      Seleccionar nombre
                    </option>
                    {nombresDisponibles.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AprobacionSection;
