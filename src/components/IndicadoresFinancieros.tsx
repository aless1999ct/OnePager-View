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
   DATA DETALLE CEM (TOOLTIP)
========================= */
const cemDetalle = [
  { concepto: "Ventas RT (+)", importe: 433097, part: "100%" },
  { concepto: "Ventas INF (+)", importe: 0, part: "0%" },
  { concepto: "Costo de Ventas (-)", importe: 264189, part: "61%" },
  { concepto: "Utilidad Bruta (=)", importe: 168908, part: "39%" },
  { concepto: "Gastos Administrativos (-)", importe: 110778, part: "26%" },
  { concepto: "Utilidad Operativa (=)", importe: 58130, part: "13%" },
  { concepto: "Gastos Financieros (-)", importe: 41720, part: "10%" },
  { concepto: "Utilidad Neta (=)", importe: 16410, part: "4%" },
  { concepto: "Gastos Familiares (-)", importe: 4102, part: "1%" },
  { concepto: "CEM (=)", importe: 12307, part: "3%" },
];

/* =========================
   TOOLTIP CUSTOM CEM
========================= */
const CemTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  if (payload[0].payload.name !== "CEM") return null;

  return (
    <div className="bg-white border shadow-lg p-2 text-xs">
      <table>
        <thead>
          <tr className="font-bold">
            <td className="pr-3">Concepto</td>
            <td className="pr-3 text-right">Importe</td>
            <td className="text-right">%</td>
          </tr>
        </thead>
        <tbody>
          {cemDetalle.map((r, i) => (
            <tr key={i}>
              <td className="pr-3">{r.concepto}</td>
              <td className="pr-3 text-right">
                S/. {r.importe.toLocaleString()}
              </td>
              <td className="text-right">{r.part}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* =========================
   TOOLTIP VENTAS TOTALES
========================= */
const TotalTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white border shadow p-2 text-xs">
      <b>Promedio anual:</b>
      <div>S/. {payload[0].payload.promedio.toLocaleString()}</div>
    </div>
  );
};

/* =========================
   COMPONENTE
========================= */
const IndicadoresFinancieros = ({
  cemMensual,
  cuota,
  indicadores,
}: IndicadoresFinancierosProps) => {

  const monthlySeries = [
    { year: "2023", data: [825340,821397,932294,765267,848627,803689,708142,779593,683607,670631,681109,737391] },
    { year: "2024", data: [657728,616848,664861,618164,681235,608621,726112,688345,647574,620012,624595,758480] },
    { year: "2025", data: [694908,570424,751994,673163,706208,643627,676219,654231,587850,644061,0,0] },
  ];

  const months = ["Ene.","Feb.","Mar.","Abr.","May.","Jun.","Jul.","Ago.","Sep.","Oct.","Nov.","Dic."];

  const annualSalesData = useMemo(() => {
    return monthlySeries.map((s) => {
      const valid = s.data.filter(v => v > 0);
      const total = valid.reduce((a, b) => a + b, 0);
      const promedio = Math.round(total / valid.length);
      return { anio: s.year, total, promedio };
    });
  }, []);

  const ventasMensuales2025 = monthlySeries
    .find(s => s.year === "2025")!
    .data.map((v, i) => ({ mes: months[i], ventas: v }))
    .filter(v => v.ventas > 0);

  const cem = Number(cemMensual);
  const cuotaNum = Number(cuota);
  const percent = cem === 0 ? 0 : Math.round((cuotaNum / cem) * 100);

  const cemCuotaData = [
    { name: "CEM", value: cem },
    { name: "Cuota", value: cuotaNum },
  ];

  const liquidezFiltrada = indicadores.liquidez.filter(
    i => i.nombre !== "Ciclo Operativo"
  );

  const endeudamientoAjustado = [
    ...indicadores.endeudamiento,
    { nombre: "Pasivo Total / Patrimonio", valor2023: "--", valor2024: "--" },
  ];

  const evaluacionAnterior = "09/08/2025";

  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden">

      {/* ===== HEADER CLÁSICO ===== */}
      <div className="border-b-2 border-primary px-4 py-2">
        <span className="text-primary font-bold text-lg">
          Indicadores Financieros
        </span>
      </div>

      <div className="p-4 space-y-6">

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2.6fr] gap-6">

          {/* CEM */}
          <div className="border-2 border-primary">
            <div className="header-banner text-sm text-center">
              Capacidad de Endeudamiento Máximo
            </div>
            <div className="p-4">
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={cemCuotaData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" />
                  <Tooltip content={<CemTooltip />} />
                  <Bar dataKey="value" barSize={26} />
                </BarChart>
              </ResponsiveContainer>
              <div className="text-xs text-center mt-2 font-medium">
                CUOTA ES {percent}% DEL CEM
              </div>
            </div>
          </div>

          {/* RATIOS */}
          <div className="border-2 border-primary">
            <div className="header-banner text-sm text-center">
              Ratios Financieros
            </div>

            <table className="w-full text-xs">
              <tbody>
                {[["Actividad", indicadores.actividad],
                  ["Liquidez", liquidezFiltrada],
                  ["Endeudamiento", endeudamientoAjustado]
                ].map(([titulo, data]: any, i) =>
                  data.map((r: any, j: number) => (
                    <tr key={`${i}-${j}`}>
                      {j === 0 && (
                        <td rowSpan={data.length} className="data-label text-center font-bold">
                          {titulo}
                        </td>
                      )}
                      <td className="data-cell">{r.nombre}</td>
                      <td className="data-cell text-center">{r.valor2023}</td>
                      <td className="data-cell text-center">{r.valor2024}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <div className="text-[11px] text-muted-foreground px-2 py-1">
              Evaluación Anterior: {evaluacionAnterior}
            </div>
          </div>
        </div>

        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-primary p-4">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={annualSalesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="anio" />
              <YAxis tickFormatter={(v) => `S/. ${v / 1000}k`} />
              <Tooltip content={<TotalTooltip />} />
              <Bar dataKey="total" barSize={40} />
            </BarChart>
          </ResponsiveContainer>

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
      </div>
    </div>
  );
};

export default IndicadoresFinancieros;
