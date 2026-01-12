import { useMemo } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
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

  const months = ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Sep.","Oct.","Nov.","Dic."];

  /* =========================
     DATA ANUAL (TOTAL + PROMEDIO)
  ========================= */
  const annualSalesData = useMemo(() => {
    return monthlySeries.map((s) => {
      const total = s.data.reduce((a, b) => a + b, 0);
      const promedio = Math.round(total / s.data.filter(v => v > 0).length);
      return {
        anio: s.year,
        promedio,
      };
    });
  }, []);

  /* =========================
     DATA MENSUAL 2025
  ========================= */
  const ventasMensuales2025 = monthlySeries
    .find((s) => s.year === "2025")!
    .data.map((v, i) => ({
      mes: months[i],
      ventas: v,
    }));

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

          {/* CEM */}
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
                  <YAxis type="category" dataKey="name" />
                  <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                  <Bar dataKey="value" barSize={26} />
                </BarChart>
              </ResponsiveContainer>

              <div className="text-xs text-center mt-2 font-medium">
                {comparisonText}
              </div>
            </div>
          </div>
        </div>

        {/* NUEVOS GRÁFICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-primary p-4">

          {/* BARRAS ANUALES */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Anuales – Promedio
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={annualSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="anio" />
                <YAxis tickFormatter={(v) => `S/. ${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                <Bar dataKey="promedio" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* LÍNEAS 2025 */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Mensuales – 2025
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ventasMensuales2025}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(v) => `S/. ${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="ventas" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-left mt-2 text-muted-foreground md:col-span-2">
            RT actualizado al: {rtActualizadoAl}
          </div>
        </div>

      </div>
    </div>
  );
};

export default IndicadoresFinancieros;
