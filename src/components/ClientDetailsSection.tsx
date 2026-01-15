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

  return <span className={`w-6 h-6 rounded-full ${color}`} />;
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

  const semaforoEstado = creditos.length
    ? calcularSemaforo(creditos[0].ratio24)
    : "verde";

  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden pdf-block">
      <div className="p-4 space-y-8">

        {/* =========================
            RESUMEN
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 print:grid-cols-2 gap-6 items-stretch pdf-block">

          <div className="border-2 border-primary flex flex-col pdf-block">
            <div className="header-banner text-xs text-center">
              Perfil del Cliente
            </div>
            <div className="data-cell text-xs px-4 py-4 text-center flex-1 flex items-center justify-center">
              {perfilCliente}
            </div>
          </div>

          <div className="border-2 border-primary flex flex-col pdf-block">
            <div className="header-banner text-xs text-center">
              Políticas Comerciales
            </div>
            <div className="data-cell text-xs px-4 py-4 text-center flex-1 flex items-center justify-center">
              {politicasComerciales}
            </div>
          </div>

          <div className="border-2 border-primary flex flex-col pdf-block">
            <div className="header-banner text-xs text-center">
              Transaccionalidad
            </div>

            <table className="w-full text-xs table-fixed border-t border-primary">
              <thead>
                <tr>
                  <th className="data-label text-center">Flujo IziPay</th>
                  <th className="data-label text-center">Venta</th>
                  <th className="data-label text-center">Ratio</th>
                  <th className="data-label text-center">
                    Pasivo Promedio
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="data-cell text-center">
                    {transaccionalidad.flujo}
                  </td>
                  <td className="data-cell text-center">
                    {transaccionalidad.venta}
                  </td>
                  <td className="data-cell text-center">
                    {transaccionalidad.ratio}
                  </td>
                  <td className="data-cell text-center px-3">
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
          {/* HEADER CON SEMÁFORO INTEGRADO */}
          <div className="border-2 border-primary border-b-0">
            <div className="header-banner text-sm flex items-center justify-between px-3">
              <span className="w-6" />
              <span className="font-bold">
                Créditos Anteriores
              </span>
              <Semaforo estado="ambar" />
            </div>
          </div>

          {/* TABLA */}
          <div className="overflow-x-auto print:overflow-visible border-2 border-primary border-t-0 pdf-block">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="data-label">Sujeto de Crédito</th>
                  <th className="data-label">Producto</th>
                  <th className="data-label">Monto a Deber</th>
                  <th className="data-label">Cuotas por Pagar</th>
                  <th className="data-label">Prom. Días Atraso</th>
                  <th className="data-label">Status</th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((credito, index) => (
                  <tr key={index}>
                    <td className="data-cell text-center">
                      {credito.sujetoCredito}
                    </td>
                    <td className="data-cell text-center">
                      {credito.producto}
                    </td>
                    <td className="data-cell text-center">
                      {credito.montoOriginal} / {credito.saldoActual}
                    </td>
                    <td className="data-cell text-center">
                      {credito.plazoInicial} / {credito.ratio24}
                    </td>
                    <td className="data-cell text-center">
                      {credito.promedioDiasAtraso}
                    </td>
                    <td className="data-cell text-center text-muted-foreground font-semibold">
                      --
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
          <div className="header-banner text-sm mb-2">
            Relacionados Bancarizados
          </div>

          <div className="overflow-x-auto print:overflow-visible border-2 border-primary pdf-block">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="data-label">Nombre</th>
                  <th className="data-label">DNI</th>
                  <th className="data-label">Clas.</th>
                  <th className="data-label">Edad</th>
                  <th className="data-label">Participación %</th>
                  <th className="data-label">Puesto</th>
                  <th className="data-label">Deuda SBS</th>
                  <th className="data-label">Máx. Deuda</th>
                </tr>
              </thead>
              <tbody>
                {accionistas.map((a, i) => (
                  <tr key={i}>
                    <td className="data-cell text-center">{a.nombre}</td>
                    <td className="data-cell text-center">{a.dni}</td>
                    <td className="data-cell text-center">{a.clasificacion}</td>
                    <td className="data-cell text-center">{a.edad}</td>
                    <td className="data-cell text-center">{a.participacion}</td>
                    <td className="data-cell text-center">
                      <input
                        className="w-full border px-1 py-0.5 text-xs print:border-0 print:bg-transparent"
                        value={puestos[i]}
                        onChange={(e) => {
                          const copy = [...puestos];
                          copy[i] = e.target.value;
                          setPuestos(copy);
                        }}
                      />
                    </td>
                    <td className="data-cell text-center">{a.deudaSBS}</td>
                    <td className="data-cell text-center">{a.maximaDeuda}</td>
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
