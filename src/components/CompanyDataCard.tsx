interface DataFieldProps {
  label: string;
  value: string;
  className?: string;
}

const DataField = ({ label, value, className = "" }: DataFieldProps) => (
  <div className={`border border-[#28af60] flex flex-col ${className} pdf-block`}>

    {/* LABEL */}
    <div
      className="
        bg-[#28af60]
        text-white
        text-[10px]
        uppercase
        tracking-wide
        text-center
        px-1
        flex
        items-center
        justify-center
        min-h-[22px]
        leading-tight
        print:min-h-[20px]
      "
    >
      {label}
    </div>

    {/* VALUE */}
    <div
      className="
        bg-white
        text-black
        text-[12px]
        font-medium
        text-center
        px-1
        flex
        items-center
        justify-center
        min-h-[32px]
        leading-tight
        print:min-h-[28px]
      "
    >
      {value}
    </div>

  </div>
);

interface CompanyDataCardProps {
  data: {
    nombreEmpresa: string;
    rec: string;

    flujoEva: string;
    canal: string;

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
    <div className="bg-card border border-primary rounded-md shadow pdf-block">

      {/* HEADER */}
      <div className="border-b border-primary px-3 py-1.5 pdf-block">
        <div className="flex flex-wrap items-center justify-between gap-4">

          {/* Empresa */}
          <div>
            <div className="text-[16px] font-bold leading-tight">
              {data.nombreEmpresa}
            </div>
            <div className="text-[10px] text-muted-foreground">
              RUC: {data.rec}
            </div>
          </div>

          {/* Cliente / Flujo / Canal */}
          <div className="flex gap-6 items-center">

            <div className="text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Cliente
              </div>
              <div className="text-[16px] font-bold leading-tight">
                Bank
              </div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Flujo
              </div>
              <div className="text-[16px] font-bold leading-tight">
                {data.flujoEva}
              </div>
            </div>

            <div className="text-center">
              <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                Canal
              </div>
              <div className="text-[16px] font-bold leading-tight">
                {data.canal}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* BODY */}
      <div className="p-3 space-y-2 text-[11px]">

        {/* ================= FILA 1 ================= */}
        <div className="grid grid-cols-12 print:grid-cols-12 gap-0 pdf-block">
          <DataField label="Ubicación" value={data.ubicacion} className="col-span-2" />
          <DataField label="Giro" value={data.giro} className="col-span-4" />
          <DataField label="Inicio" value={data.inicio} className="col-span-2" />
          <DataField label="IBK Desde" value={data.ibkDesde} className="col-span-2" />
          <DataField label="Score" value={data.score} className="col-span-2" />
        </div>

        {/* ================= FILA 2 ================= */}
        <div className="grid grid-cols-12 print:grid-cols-12 gap-0 items-center pdf-block">
          <DataField label="Producto" value={data.producto} className="col-span-1" />
          <DataField label="MONTO SOLICITADO" value={data.montoSolicitado} className="col-span-2" />
          <DataField label="MONTO APROBADO" value={data.montoAprobado} className="col-span-2" />
          <DataField label="Plazo" value={data.plazoMeses} className="col-span-1" />
          <DataField label="Garantías" value={data.garantias} className="col-span-1" />
          <DataField label="RMA" value={data.rma} className="col-span-1" />
          <DataField label="SoW Actual" value={data.sowActual} className="col-span-2" />
          <DataField label="SOW ALCANZADO" value={data.sowAlcanzado} className="col-span-2" />
        </div>

        {/* ================= FILA 3 ================= */}
        <div className="grid grid-cols-12 print:grid-cols-12 gap-0 pdf-block">
          <DataField
            label="Ubicación / Dirección"
            value={data.direccion}
            className="col-span-9"
          />
          <DataField
            label="Predio"
            value={data.fuentes}
            className="col-span-3"
          />
        </div>

      </div>
    </div>
  );
};

export default CompanyDataCard;
