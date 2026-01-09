import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

/* =========================
   INTERFACES
========================= */
interface IndicadorData {
  nombre: string;
  valor2023: string;
  valor2024: string;
}

interface IndicadoresFinancierosProps {
  cemMensual: string;
  cuota: string;
  indicadores: {
    actividad: IndicadorData[];
    rentabilidad: IndicadorData[];
    liquidez: IndicadorData[];
    endeudamiento: IndicadorData[];
  };
}

/* =========================
   COMPONENTE
========================= */
const IndicadoresFinancieros = ({
  cemMensual,
  cuota,
  indicadores,
}: IndicadoresFinancierosProps) => {

  /* =========================
     DATA BASE MENSUAL
  ========================= */
  const monthlySeries = [
    { year: "2023", data: [825340,821397,932294,765267,848627,803689,708142,779593,683607,670631,681109,737391] },
    { year: "2024", data: [657728,616848,664861,618164,681235,608621,726112,688345,647574,620012,624595,758480] },
    { year: "2025", data: [694908,570424,751994,673163,706208,643627,676219,654231,587850,644061,0,0] },
  ];

  /* =========================
     TRIMESTRES
  ========================= */
  const quarters = ["Q1", "Q2", "Q3", "Q4"];

  const quarterlyData = useMemo(() => {
    return quarters.map((q, qi) => {
      const row: any = { trimestre: q };
      monthlySeries.forEach(s => {
        row[s.year] = s.data
          .slice(qi * 3, qi * 3 + 3)
          .reduce((a, b) => a + b, 0);
      });
      return row;
    });
  }, []);

  /* =========================
     CEM vs CUOTA
  ========================= */
  const cem = Number(cemMensual);
  const cuotaNum = Number(cuota);

  const percent = cem === 0 ? 0 : Math.round((cuotaNum / cem) * 100);

  const comparisonText =
    cuotaNum <= cem
      ? `CUOTA ES ${percent}% DEL CEM`
      : `CUOTA ES ${percent}% MAYOR QUE EL CEM`;

  const cemCuotaData = [
    { name: "CEM", value: cem },
    { name: "Cuota", value: cuotaNum },
  ];
  
  const rtActualizadoAl = "10/2025";
  
  /* =========================
     RENDER TABLA
  ========================= */
  const renderSection = (titulo: string, data: IndicadorData[]) => {
    if (!data.length) return null;

    

    return (
      <>
        <tr>
          <td
            rowSpan={data.length}
            className="data-label font-bold text-center align-middle whitespace-nowrap"
            style={{ width: 140 }}
          >
            {titulo}
          </td>

          <td className="data-cell text-left break-words">
            {data[0].nombre}
          </td>
          <td className="data-cell text-center">{data[0].valor2023}</td>
          <td className="data-cell text-center">{data[0].valor2024}</td>
        </tr>

        {data.slice(1).map((d, i) => (
          <tr key={i}>
            <td className="data-cell text-left break-words">{d.nombre}</td>
            <td className="data-cell text-center">{d.valor2023}</td>
            <td className="data-cell text-center">{d.valor2024}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden">

      {/* HEADER */}
      <div className="border-b-2 border-primary px-4 py-2">
        <span className="text-primary font-bold text-lg">
          Indicadores Financieros
        </span>
      </div>

      <div className="p-4 space-y-6">

        {/* TABLA + CEM */}
        <div className="grid grid-cols-1 lg:grid-cols-[2.6fr_1.4fr] gap-6">

          {/* TABLA RATIOS */}
          <div className="border-2 border-primary">
            <div className="header-banner text-sm text-center">
              Ratios Financieros
            </div>

            <table className="w-full text-xs table-fixed">
              <thead>
                <tr>
                  <th style={{ width: 140 }}></th>
                  <th className="data-label">Ratios</th>
                  <th className="data-label" style={{ width: 70 }}>2023</th>
                  <th className="data-label" style={{ width: 70 }}>2024</th>
                </tr>
              </thead>
              <tbody>
                {renderSection("Actividad", indicadores.actividad)}
                {renderSection("Rentabilidad", indicadores.rentabilidad)}
                {renderSection("Liquidez", indicadores.liquidez)}
                {renderSection("Endeudamiento", indicadores.endeudamiento)}
              </tbody>
            </table>
          </div>
          <div className="border-2 border-primary">
  <div className="header-banner text-sm text-center">
    Capacidad de Endeudamiento Máximo
  </div>

            <div className="p-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart
                  data={cemCuotaData}
                  layout="vertical"
                  margin={{ top: 40, bottom: 40, left: 20, right: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={(v) => `S/. ${v.toLocaleString()}`}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                  <Bar
                    dataKey="value"
                    fill="#2563eb"
                    radius={[4, 4, 4, 4]}
                    barSize={26}
                  />
                </BarChart>
              </ResponsiveContainer>
          
              {/* TEXTO INFERIOR (como Excel) */}
              <div className="text-xs text-center mt-2 font-medium">
                {comparisonText}
              </div>
            </div>
          

          
          </div>
        </div>

        {/* VENTAS POR TRIMESTRE */}
        <div className="border-2 border-primary p-4">
          <div className="header-banner text-sm text-center mb-4">
            Ventas por Trimestre
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quarterlyData} barCategoryGap={20}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="trimestre" />
              <YAxis tickFormatter={(v) => `S/. ${v / 1000}k`} />
              <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="2023" fill="#2563eb" barSize={28} />
              <Bar dataKey="2024" fill="#16a34a" barSize={28} />
              <Bar dataKey="2025" fill="#dc2626" barSize={28} />
            </BarChart>
          </ResponsiveContainer>
          <div className="text-xs text-left mt-2 text-muted-foreground">
            RT actualizado al: {rtActualizadoAl}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndicadoresFinancieros;
