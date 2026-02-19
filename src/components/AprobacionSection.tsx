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
    <div className="bg-card border border-primary rounded-md shadow mt-4">
      <div className="p-3 space-y-3">

        {/* COMENTARIO */}
        <div className="border border-primary p-2 space-y-1">
          <div className="text-[11px] font-semibold text-center uppercase tracking-wide text-primary">
            Comentario del analista
          </div>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            rows={5}
            className="w-full text-[11px] text-center italic leading-snug bg-transparent outline-none resize-none"
          />
        </div>

        {/* HEADER ESTADO */}
        <div className="flex items-center justify-center gap-1 py-1">
          <span className="font-semibold text-sm">Estado:</span>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="bg-white text-black border border-primary px-2 py-0.5 text-[11px] rounded-sm appearance-none"
          >
            <option value="Aprobado">Aprobado</option>
            <option value="Denegado">Denegado</option>
          </select>
        </div>

        {/* TABLA DE PRODUCTO */}
        <div className="overflow-x-auto">
          <table className="w-full border border-primary text-[11px]">
            <thead>
              <tr>
                <th className="py-0.5 px-1.5 border border-primary font-semibold">
                  Producto
                </th>
                <th className="py-0.5 px-1.5 border border-primary font-semibold">
                  Cuota Inicial
                </th>
                <th className="py-0.5 px-1.5 border border-primary font-semibold">
                  Plazo
                </th>
                <th className="py-0.5 px-1.5 border border-primary font-semibold">
                  Finalidad
                </th>
                <th className="py-0.5 px-1.5 border border-primary font-semibold">
                  Hipotecas
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-0.5 px-1.5 border border-primary text-center">
                  {producto.producto}
                </td>
                <td className="py-0.5 px-1.5 border border-primary text-center">
                  {producto.cuotaInicial}
                </td>
                <td className="py-0.5 px-1.5 border border-primary text-center">
                  {producto.plazo}
                </td>
                <td className="py-0.5 px-1.5 border border-primary text-center">
                  {producto.finalidad}
                </td>
                <td className="py-0.5 px-1.5 border border-primary text-center">
                  {producto.hipotecas}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CONDICIONES */}
        <div className="flex items-start gap-1 text-[11px]">
          <span className="font-semibold">Condiciones:</span>
          <span className="text-muted-foreground leading-snug">
            {condiciones}
          </span>
        </div>

        {/* LÍNEA */}
        <div className="border-t border-primary"></div>

        {/* FIRMAS */}
        <div className="flex justify-end">
          <table className="text-[11px]">
            <tbody>
              <tr>
                <td className="font-semibold pr-3 py-0.5">
                  Banco de Negocios – Fecha
                </td>
                <td className="py-0.5">{fechaHoy}</td>
              </tr>

              <tr>
                <td className="font-semibold pr-3 py-0.5">
                  Analista de Admisión de Riesgos
                </td>
                <td className="py-0.5">
                  <select
                    value={analista}
                    onChange={(e) => setAnalista(e.target.value)}
                    className="border border-primary px-2 py-0.5 text-[11px] rounded-sm w-full"
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
                <td className="font-semibold pr-3 py-0.5">
                  Jefe de Admisión de Riesgos
                </td>
                <td className="py-0.5">Miguel Godos</td>
              </tr>

              <tr>
                <td className="font-semibold pr-3 py-0.5">
                  Subgerente de Admisión de Riesgos
                </td>
                <td className="py-0.5">Renato Valencia</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AprobacionSection;
