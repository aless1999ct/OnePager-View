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

const analistas = [
  "Carla Bocanegra",
  "Adrian Mori",
  "Patricia Matos",
];

const AprobacionSection = ({
  producto,
  observacion,
  condiciones,
}: AprobacionSectionProps) => {
  const [estado, setEstado] = useState("Aprobado");
  const [comentario, setComentario] = useState(observacion);
  const [analista, setAnalista] = useState("__placeholder__");

  const fechaHoy = useMemo(
    () => new Date().toLocaleDateString("es-PE"),
    []
  );

  return (
    <div className="bg-card border-2 border-primary rounded-lg overflow-visible shadow-lg mt-6 pdf-block">
      <div className="p-4 space-y-4">

        {/* COMENTARIO */}
        <div className="border-2 border-primary p-3 space-y-2 pdf-block">
          <div className="text-xs font-bold text-center uppercase text-primary">
            Comentario del analista
          </div>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={4}
            className="w-full text-xs text-center italic leading-relaxed bg-transparent outline-none resize-none print:resize-none"
          />
        </div>

        {/* HEADER ESTADO */}
        <div className="header-banner flex items-center justify-center gap-2 py-2 pdf-block">
          <span className="font-bold text-base">Estado:</span>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="bg-white text-black border px-2 py-1 text-sm rounded appearance-none print:appearance-none"
          >
            <option value="Aprobado">Aprobado</option>
            <option value="Denegado">Denegado</option>
          </select>
        </div>

        {/* TABLA DE PRODUCTO */}
        <div className="overflow-x-auto print:overflow-visible pdf-block">
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
        <div className="flex items-center gap-2 text-xs pdf-block">
          <span className="font-medium">Condiciones:</span>
          <span className="text-muted-foreground">{condiciones}</span>
        </div>

        {/* LÍNEA */}
        <div className="border-t-2 border-primary"></div>

        {/* FIRMAS */}
        <div className="flex justify-end pdf-block">
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="font-bold pr-4 py-1">
                  Banco de Negocios – Fecha
                </td>
                <td className="py-1">{fechaHoy}</td>
              </tr>

              <tr>
                <td className="font-bold pr-4 py-1">
                  Analista de Admisión de Riesgos
                </td>
                <td className="py-1">
                  <select
                    value={analista}
                    onChange={(e) => setAnalista(e.target.value)}
                    className="border px-2 py-1 text-xs rounded w-full print:appearance-none"
                  >
                    <option value="__placeholder__" disabled>
                      Seleccionar analista
                    </option>
                    {analistas.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td className="font-bold pr-4 py-1">
                  Jefe de Admisión de Riesgos
                </td>
                <td className="py-1">Miguel Godos</td>
              </tr>

              <tr>
                <td className="font-bold pr-4 py-1">
                  Subgerente de Admisión de Riesgos
                </td>
                <td className="py-1">Renato Valencia</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AprobacionSection;
