interface DataFieldProps {
  label: string;
  value: string;
  className?: string;
}

const DataField = ({ label, value, className = "" }: DataFieldProps) => (
  <div className={`border border-primary flex flex-col ${className}`}>
    <div className="bg-[#28af60] text-white text-[11px] uppercase tracking-wide text-center py-1">
      {label}
    </div>
    <div className="bg-white text-black text-sm font-medium text-center px-2 py-2 min-h-[38px] flex items-center justify-center">
      {value}
    </div>
  </div>
);

interface CompanyDataCardProps {
  data: {
    nombreEmpresa: string;
    rec: string;

    ubicacion: string;
    giro: string;
    subGiro: string;
    inicio: string;
    ibkDesde: string;
    score: string;

    producto: string;
    montoSolicitado: string;
    montoAprobado: string;
    plazoMeses: string;
    garantias: string;
    rma: string;
    sowActual: string;
    sowAlcanzado: string;

    direccion: string;
    fuentes: string;
  };
}

const CompanyDataCard = ({ data }: CompanyDataCardProps) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg overflow-hidden">

      {/* HEADER */}
      <div className="border-b-2 border-primary px-4 py-2">
        <div className="text-primary font-bold text-lg">
          {data.nombreEmpresa}
        </div>
        <div className="text-xs text-muted-foreground">
          RUC: {data.rec}
        </div>
      </div>

      {/* BODY */}
      <div className="p-4 space-y-3 text-xs">

        {/* ================= FILA 1 ================= */}
        <div className="grid grid-cols-12 gap-0">
          <DataField label="Ubicación" value={data.ubicacion} className="col-span-2" />
          <DataField label="Giro" value={data.giro} className="col-span-3" />
          <DataField label="Sub Giro" value={data.subGiro} className="col-span-2" />
          <DataField label="Inicio" value={data.inicio} className="col-span-1" />
          <DataField label="IBK Desde" value={data.ibkDesde} className="col-span-2" />
          <DataField label="Score" value={data.score} className="col-span-2" />
        </div>

        {/* ================= FILA 2 ================= */}
        <div className="grid grid-cols-12 gap-0">
          <DataField label="Producto" value={data.producto} className="col-span-2" />
          <DataField
            label="Monto IBK Solicitado"
            value={`S/. ${data.montoSolicitado}`}
            className="col-span-2"
          />
          <DataField
            label="Monto Aprobado"
            value={`S/. ${data.montoAprobado}`}
            className="col-span-2"
          />
          <DataField label="Plazo" value={data.plazoMeses} className="col-span-1" />
          <DataField label="Garantías" value={data.garantias} className="col-span-2" />
          <DataField label="RMA" value={data.rma} className="col-span-1" />
          <DataField label="SoW Actual" value={data.sowActual} className="col-span-1" />
          <DataField label="SoW Max" value={data.sowAlcanzado} className="col-span-1" />
        </div>

        {/* ================= FILA 3 ================= */}
        <div className="grid grid-cols-12 gap-0">
          <DataField
            label="Ubicación / Dirección"
            value={data.direccion}
            className="col-span-9"
          />
          <DataField
            label="Fuentes"
            value={data.fuentes}
            className="col-span-3"
          />
        </div>

      </div>
    </div>
  );
};

export default CompanyDataCard;
