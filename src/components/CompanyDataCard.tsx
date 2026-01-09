interface DataFieldProps {
  label: string;
  value: string;
  className?: string;
}

const DataField = ({ label, value, className = "" }: DataFieldProps) => (
  <div className={`flex flex-col border border-primary ${className}`}>
    
    {/* LABEL — VERDE */}
    <div className="bg-[#28af60] text-white text-[11px] uppercase tracking-wide text-center py-1">
      {label}
    </div>

    {/* VALUE — BLANCO */}
    <div className="bg-white text-black text-sm font-medium text-center px-3 py-2 min-h-[40px] flex items-center justify-center">
      {value}
    </div>

  </div>
);

interface CompanyDataCardProps {
  data: {
    nombreEmpresa: string;
    rec: string;
    fecha: string;
    flujoEva: string;
    canal: string;
    ubicacion: string;
    giro: string;
    inicio: string;
    ibkDesde: string;
    score: string;
    producto: string;
    montoSolicitado: string;
    plazoMeses: string;
    montoAprobado: string;
    garantias: string;
    rma: string;
    direccion: string;
    fuentes: string;
  };
}

const CompanyDataCard = ({ data }: CompanyDataCardProps) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg overflow-hidden shadow-lg">

      {/* HEADER */}
      <div className="border-b-2 border-primary px-4 py-2">
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Empresa */}
          <div>
            <div className="text-lg font-bold">
              {data.nombreEmpresa}
            </div>
            <div className="text-xs text-muted-foreground">
              RUC: {data.rec}
            </div>
          </div>

          {/* Flujo y Canal */}
          <div className="flex gap-6">
            <div className="text-center">
              <div className="text-[11px] text-muted-foreground uppercase">
                Flujo
              </div>
              <div className="text-sm font-medium">
                {data.flujoEva}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[11px] text-muted-foreground uppercase">
                Canal
              </div>
              <div className="text-sm font-medium">
                {data.canal}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ===== GRID PRINCIPAL ===== */}
      <div className="p-4 space-y-4">

        {/* FILA 1 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-0">
          <DataField label="Ubicación" value={data.ubicacion} className="sm:col-span-2 lg:col-span-2" />
          <DataField label="Giro" value={data.giro} className="lg:col-span-2" />
          <DataField label="Inicio" value={data.inicio} />
          <DataField label="IBK Desde" value={data.ibkDesde} />
          <DataField label="Score" value={data.score} />
        </div>

        {/* FILA 2 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0">
          <DataField label="Producto" value={data.producto} />
          <DataField label="Monto IBK Solicitado" value={data.montoSolicitado} />
          <DataField label="Plazo" value={data.plazoMeses} />
          <DataField label="Garantías" value={data.garantias} />
          <DataField label="RMA" value={data.rma} />
        </div>

        {/* FILA 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-0">
          <DataField label="Dirección" value={data.direccion} className="sm:col-span-3" />
          <DataField label="Fuentes" value={data.fuentes} />
        </div>

      </div>
    </div>
  );
};

export default CompanyDataCard;
