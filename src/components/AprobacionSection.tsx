interface ProductoAprobacion {
  producto: string;
  monto: string;
  cuotaInicial: string;
  importeFinanciar: string;
  plazo: string;
  finalidad: string;
  hipotecas: string;
}

interface FirmaData {
  bancoNegociosFecha: string;
  analistaCreditos: string;
  jefeCreditos: string;
  subgerenteCreditos: string;
  gerenteDivision: string;
}

interface AprobacionSectionProps {
  producto: ProductoAprobacion;
  observacion: string;
  condiciones: string; // ← se usa otra vez
  firmas: FirmaData;
}

const AprobacionSection = ({
  producto,
  observacion,
  condiciones,
  firmas,
}: AprobacionSectionProps) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg overflow-hidden shadow-lg mt-6">

      {/* HEADER */}
      <div className="header-banner text-center py-2">
        <span className="font-bold text-base">Estado: DENEGADO</span>
      </div>

      <div className="p-4 space-y-4">

        {/* TABLA DE PRODUCTO */}
        <div className="overflow-x-auto">
          <table className="w-full border-2 border-primary text-xs">
            <thead>
              <tr>
                <th className="data-label py-1 px-2">Producto</th>
                <th className="data-label py-1 px-2">Monto (S/)</th>
                <th className="data-label py-1 px-2">Cuota Inicial</th>
                <th className="data-label py-1 px-2">Importe a Financiar</th>
                <th className="data-label py-1 px-2">Plazo</th>
                <th className="data-label py-1 px-2">Finalidad</th>
                <th className="data-label py-1 px-2">Hipotecas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell text-center">{producto.producto}</td>
                <td className="data-cell text-center">{producto.monto}</td>
                <td className="data-cell text-center">{producto.cuotaInicial}</td>
                <td className="data-cell text-center">{producto.importeFinanciar}</td>
                <td className="data-cell text-center">{producto.plazo}</td>
                <td className="data-cell text-center">{producto.finalidad}</td>
                <td className="data-cell text-center">{producto.hipotecas}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* OBSERVACIÓN */}
        <div className="border-2 border-primary p-3">
          <p className="text-xs text-foreground leading-relaxed text-center italic">
            {observacion}
          </p>
        </div>

        {/* CONDICIONES SIMPLE (RECUPERADO) */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-medium">Condiciones:</span>
          <span className="text-muted-foreground">{condiciones}</span>
        </div>

        {/* LÍNEA VERDE */}
        <div className="border-t-2 border-primary"></div>

        {/* FIRMAS — TAL CUAL ESTABAN */}
        <div className="flex justify-end">
          <table className="text-xs">
            <tbody>
              <tr>
                <td className="font-bold pr-4 py-0.5">Banco de Negocios Fecha</td>
                <td className="py-0.5">{firmas.bancoNegociosFecha}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-0.5">Analista de Créditos:</td>
                <td className="py-0.5">{firmas.analistaCreditos}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-0.5">Jefe de Créditos:</td>
                <td className="py-0.5">{firmas.jefeCreditos}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-0.5">Subgerente de Créditos</td>
                <td className="py-0.5">{firmas.subgerenteCreditos}</td>
              </tr>
              <tr>
                <td className="font-bold pr-4 py-0.5">Gerente de División</td>
                <td className="py-0.5">{firmas.gerenteDivision}</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AprobacionSection;
