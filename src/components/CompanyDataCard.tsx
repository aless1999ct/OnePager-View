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
     sowActual: string;
  sowAlcanzado: string;
    subGiro: string;

  };
}

const CompanyDataCard = ({ data }: CompanyDataCardProps) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg overflow-hidden">

      {/* HEADER */}
      <div className="border-b-2 border-primary px-4 py-2">
        <span className="text-primary font-bold text-lg">
          {data.nombreEmpresa}
        </span>
      </div>

      <div className="p-4 space-y-4 text-xs">

        {/* INFO GENERAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataField label="RUC" value={data.rec} />
          <DataField label="Fecha" value={data.fecha} />
          <DataField label="Score" value={data.score} />
        </div>

        {/* GIRO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField label="Giro" value={data.giro} />
          <DataField label="Sub Giro" value={data.subGiro} />
        </div>

        {/* PRODUCTO + SOW */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <DataField label="Producto" value={data.producto} />
          <DataField
            label="Monto IBK Solicitado"
            value={`S/. ${data.montoSolicitado}`}
          />
          <DataField label="Plazo" value={data.plazoMeses} />
          <DataField label="SoW Actual" value={data.sowActual} />
          <DataField label="SoW Alcanzado" value={data.sowAlcanzado} />
        </div>

        {/* RELACIÓN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DataField label="Inicio de Operaciones" value={data.inicio} />
          <DataField label="IBK Desde" value={data.ibkDesde} />
          <DataField label="Canal" value={data.canal} />
        </div>

        {/* UBICACIÓN */}
        <DataField
          label="Ubicación / Dirección"
          value={`${data.ubicacion} — ${data.direccion}`}
        />

        {/* GARANTÍAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DataField label="Garantías" value={data.garantias} />
          <DataField label="RMA" value={data.rma} />
        </div>

        {/* FUENTES */}
        <DataField label="Fuentes" value={data.fuentes} />

      </div>
    </div>
  );
};

export default CompanyDataCard;
