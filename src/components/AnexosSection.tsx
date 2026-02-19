const AnexosSection = () => {
  return (
    <div className="bg-card border border-primary rounded-md shadow mt-8 pdf-block">

      {/* HEADER GRANDE */}
      <div className="border-b border-primary px-3 py-2">
        <h1 className="text-primary font-bold text-[18px] text-center">
          ANEXOS
        </h1>
      </div>

      <div className="p-4 space-y-4">

        {/* TÍTULO */}
        <h2 className="text-primary font-semibold text-[14px]">
          Excepciones
        </h2>

        {/* TABLA */}
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
                <td className="data-cell py-1">
                  {/* Vacío por ahora */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AnexosSection;
