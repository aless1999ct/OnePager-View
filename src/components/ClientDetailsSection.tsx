import { useState } from "react";

/* =========================
   INTERFACES
========================= */

interface TransaccionalidadData {
  ratio: string;
  flujo: string;
  venta: string;
  pasivoPromedio: string;
}

interface CreditoData {
  sujetoCredito: string;
  producto: string;
  montoOriginal: string;
  saldoActual: string;
  plazoInicial: string;
  ratio24: string;
  promedioDiasAtraso: string;
}

interface AccionistaData {
  nombre: string;
  dni: string;
  clasificacion: string;
  edad: string;
  participacion: string;
  puesto: string;
  deudaSBS: string;
  maximaDeuda: string;
}

interface ClientDetailsSectionProps {
  transaccionalidad: TransaccionalidadData;
  creditos: CreditoData[];
  perfilCliente: string;
  politicasComerciales: string;
  accionistas: AccionistaData[];
}

/* =========================
   SEMÁFORO
========================= */

const Semaforo = ({ estado }: { estado: "verde" | "ambar" | "rojo" }) => {
  const color =
    estado === "verde"
      ? "bg-green-500"
      : estado === "ambar"
      ? "bg-yellow-400"
      : "bg-red-500";

  return <span className={`w-4 h-4 rounded-full ${color}`} />;
};

const calcularSemaforo = (ratio: string): "verde" | "ambar" | "rojo" => {
  const valor = Number(ratio);
  if (valor <= 0) return "verde";
  if (valor <= 2) return "ambar";
  return "rojo";
};

/* =========================
   COMPONENTE
========================= */

const ClientDetailsSection = ({
  transaccionalidad,
  creditos,
  perfilCliente,
  politicasComerciales,
  accionistas,
}: ClientDetailsSectionProps) => {
  const [puestos, setPuestos] = useState(
    accionistas.map((a) => a.puesto || "")
  );

  return (
    <div className="bg-card border border-primary rounded-md shadow mt-4 pdf-block">
      <div className="p-3 space-y-4">

        {/* =========================
            RESUMEN
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 print:grid-cols-2 gap-3 items-stretch pdf-block">

          <div className="border border-primary flex flex-col pdf-block">
            <div className="header-banner text-[11px] text-center py-0.5">
              Perfil del Cliente
            </div>
            <div className="data-cell text-[11px] px-2 py-2 text-center flex-1 flex items-center justify-center leading-snug">
              {perfilCliente}
            </div>
          </div>

         

          <div className="border border-primary flex flex-col pdf-block">
            <div className="header-banner text-[11px] text-center py-0.5">
              Transaccionalidad
            </div>

            <table className="w-full text-[11px] table-fixed border-t border-primary">
              <thead>
                <tr>
                  <th className="data-label py-0.5">Flujo IziPay</th>
                  <th className="data-label py-0.5">Venta</th>
                  <th className="data-label py-0.5">Ratio</th>
                  <th className="data-label py-0.5">Pasivo Promedio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="data-cell text-center py-0.5">
                    {transaccionalidad.flujo}
                  </td>
                  <td className="data-cell text-center py-0.5">
                    {transaccionalidad.venta}
                  </td>
                  <td className="data-cell text-center py-0.5">
                    {transaccionalidad.ratio}
                  </td>
                  <td className="data-cell text-center py-0.5">
                    {transaccionalidad.pasivoPromedio}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================
             CRÉDITOS ANTERIORES
        ========================= */}
        <div className="pdf-block">
          <div className="border border-primary border-b-0">
            <div className="header-banner text-[12px] flex items-center justify-center py-1">
              <span className="font-semibold">
                Créditos Anteriores
              </span>
            </div>
          </div>

          <div className="overflow-x-auto print:overflow-visible border border-primary border-t-0 pdf-block">
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="data-label py-0.5">Ultimo Crédito</th>
                  <th className="data-label py-0.5">Producto</th>
                  <th className="data-label py-0.5">SALDO / CAPITAL</th>
                  <th className="data-label py-0.5">Cuotas / Cuotas Pagadas</th>
                  <th className="data-label py-0.5">Prom. Días Atraso</th>
                  <th className="data-label py-0.5">Status</th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((credito, index) => (
                  <tr key={index}>
                    <td className="data-cell text-center py-0.5">
                      {credito.sujetoCredito}
                    </td>
                    <td className="data-cell text-center py-0.5">
                      {credito.producto}
                    </td>
                    <td className="data-cell text-center py-0.5">
                      {credito.montoOriginal} / {credito.saldoActual}
                    </td>
                    <td className="data-cell text-center py-0.5">
                      {credito.plazoInicial} / {credito.ratio24}
                    </td>
                    <td className="data-cell text-center py-0.5">
                      {credito.promedioDiasAtraso}
                    </td>
                    <td className="data-cell text-center py-0.5 flex justify-center">
                      <Semaforo estado={calcularSemaforo(credito.ratio24)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================
            RELACIONADOS
        ========================= */}
        <div className="pdf-block">
          <div className="header-banner text-[12px] mb-1 py-1">
            Relacionados Bancarizados
          </div>

          <div className="overflow-x-auto print:overflow-visible border border-primary pdf-block">
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th className="data-label py-0.5">Nombre</th>
                  <th className="data-label py-0.5">DNI</th>
                  <th className="data-label py-0.5">Clas.</th>
                  <th className="data-label py-0.5">Edad</th>
                  <th className="data-label py-0.5">Participación %</th>
                  <th className="data-label py-0.5">Cargo</th>
                  <th className="data-label py-0.5">Deuda SBS</th>
                  <th className="data-label py-0.5">Máx. Deuda</th>
                </tr>
              </thead>
              <tbody>
                {accionistas.map((a, i) => (
                  <tr key={i}>
                    <td className="data-cell text-center py-0.5">{a.nombre}</td>
                    <td className="data-cell text-center py-0.5">{a.dni}</td>
                    <td className="data-cell text-center py-0.5">{a.clasificacion}</td>
                    <td className="data-cell text-center py-0.5">{a.edad}</td>
                    <td className="data-cell text-center py-0.5">{a.participacion}</td>
                    <td className="data-cell text-center py-0.5">
                      <input
                        className="w-full border px-1 py-0.5 text-[11px] print:border-0 print:bg-transparent"
                        value={puestos[i]}
                        onChange={(e) => {
                          const copy = [...puestos];
                          copy[i] = e.target.value;
                          setPuestos(copy);
                        }}
                      />
                    </td>
                    <td className="data-cell text-center py-0.5">{a.deudaSBS}</td>
                    <td className="data-cell text-center py-0.5">{a.maximaDeuda}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ClientDetailsSection;
