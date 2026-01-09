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
  rma: string;
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

const ClientDetailsSection = ({
  transaccionalidad,
  creditos,
  perfilCliente,
  politicasComerciales,
  accionistas,
}: ClientDetailsSectionProps) => {
  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden">

      <div className="p-4 space-y-8">

        {/* =========================
            RESUMEN (SIN TÍTULO)
        ========================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">

          {/* PERFIL DEL CLIENTE */}
          <div className="border-2 border-primary flex flex-col">
            <div className="header-banner text-xs text-center">
              Perfil del Cliente
            </div>
            <div className="data-cell text-xs px-4 py-4 text-center flex-1 flex items-center justify-center">
              {perfilCliente}
            </div>
          </div>

          {/* POLÍTICAS COMERCIALES */}
          <div className="border-2 border-primary flex flex-col">
            <div className="header-banner text-xs text-center">
              Políticas Comerciales
            </div>
            <div className="data-cell text-xs px-4 py-4 text-center flex-1 flex items-center justify-center">
              {politicasComerciales}
            </div>
          </div>

          {/* TRANSACCIONALIDAD */}
          <div className="border-2 border-primary flex flex-col">
            <div className="header-banner text-xs text-center">
              Transaccionalidad
            </div>

            <table className="w-full text-xs table-fixed border-t border-primary">
              <colgroup>
                <col className="w-[20%]" />
                <col className="w-[20%]" />
                <col className="w-[15%]" />
                <col className="w-[45%]" />
              </colgroup>

              <thead>
                <tr>
                  <th className="data-label text-center">Flujo</th>
                  <th className="data-label text-center">Venta</th>
                  <th className="data-label text-center">Ratio</th>
                  <th className="data-label text-center">
                    Pasivo Promedio en Cuentas
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
                  <td className="data-cell text-center px-3 leading-tight">
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
        <div>
          <div className="header-banner text-sm mb-2">
            Créditos Anteriores
          </div>

          <div className="overflow-x-auto border-2 border-primary">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="data-label">Sujeto de Crédito</th>
                  <th className="data-label">Producto</th>
                  <th className="data-label">Monto Original</th>
                  <th className="data-label">Saldo Actual</th>
                  <th className="data-label">Plazo Inicial</th>
                  <th className="data-label">Cuotas Pagadas</th>
                  <th className="data-label">RMA</th>
                  <th className="data-label">Promedio Días Atraso</th>
                </tr>
              </thead>
              <tbody>
                {creditos.map((credito, index) => (
                  <tr key={index}>
                    <td className="data-cell text-center">{credito.sujetoCredito}</td>
                    <td className="data-cell text-center">{credito.producto}</td>
                    <td className="data-cell text-center">{credito.montoOriginal}</td>
                    <td className="data-cell text-center">{credito.saldoActual}</td>
                    <td className="data-cell text-center">{credito.plazoInicial}</td>
                    <td className="data-cell text-center">{credito.ratio24}</td>
                    <td className="data-cell text-center">{credito.rma}</td>
                    <td className="data-cell text-center">{credito.promedioDiasAtraso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* =========================
            RELACIONADOS
        ========================= */}
        <div>
          <div className="header-banner text-sm mb-2">
            Relacionados Bancarizados
          </div>

          <div className="overflow-x-auto border-2 border-primary">
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
                  <th className="data-label">Máxima Deuda</th>
                </tr>
              </thead>
              <tbody>
                {accionistas.map((accionista, index) => (
                  <tr key={index}>
                    <td className="data-cell text-center">{accionista.nombre}</td>
                    <td className="data-cell text-center">{accionista.dni}</td>
                    <td className="data-cell text-center">{accionista.clasificacion}</td>
                    <td className="data-cell text-center">{accionista.edad}</td>
                    <td className="data-cell text-center">{accionista.participacion}</td>
                    <td className="data-cell text-center">{accionista.puesto}</td>
                    <td className="data-cell text-center">{accionista.deudaSBS}</td>
                    <td className="data-cell text-center">{accionista.maximaDeuda}</td>
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
