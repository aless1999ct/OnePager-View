const AnexosSection = () => {
  return (
    <div className="bg-card border border-primary rounded-md shadow mt-8 pdf-block print:break-before-page">
      
      {/* HEADER GRANDE */}
      <div className="border-b border-primary px-3 py-2">
        <h1 className="text-primary font-bold text-[18px] text-center">
          ANEXOS
        </h1>
      </div>

      <div className="p-4 space-y-6">

        {/* ================= EXCEPCIONES ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Excepciones
        </h2>

        <div className="border border-primary">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1 text-left">
                  Tipo de Excepcione
                </th>
                <th className="data-label py-1 text-left">
                  Comentario de ejecutivo de Negocio
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell py-1">
                  Venta con FI &gt; a lo Permitido
                </td>
                <td className="data-cell py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= RELACIONADOS / SBS ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Relacionados / Comportamiento SBS
        </h2>

        {/* Clasificación Cliente */}
        <div className="border border-primary">
          <table className="w-full text-[11px]">
            <tbody>
              <tr>
                <td className="data-label py-1 w-1/2">
                  Cliente se encuentra en clasificación:
                </td>
                <td className="data-cell py-1 text-center font-semibold">
                  RX
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabla Accionistas SBS */}
        <div className="border border-primary">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1">Nombre</th>
                <th className="data-label py-1">DNI</th>
                <th className="data-label py-1">Clasificación</th>
                <th className="data-label py-1">Edad</th>
                <th className="data-label py-1">% Part.</th>
                <th className="data-label py-1">Cargo</th>
                <th className="data-label py-1">Deuda SBS</th>
                <th className="data-label py-1">Max Deuda</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Relacionados Bancarios */}
        <div className="border border-primary">
          <div className="header-banner text-[12px] py-1 text-center">
            Relacionados Bancarios
          </div>

          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1">Nombre</th>
                <th className="data-label py-1">Tipo</th>
                <th className="data-label py-1">Var Trimestral</th>
                <th className="data-label py-1">Var Semestral</th>
                <th className="data-label py-1">Var Anual</th>
                <th className="data-label py-1">Clasificación</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
                <td className="data-cell py-1"></td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AnexosSection;
