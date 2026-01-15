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
   FORMAT AXIS
========================= */
const formatCurrencyAxis = (value: number) => {
  if (value >= 1_000_000) {
    return `S/. ${(value / 1_000_000).toFixed(1)}MM`;
  }
  return `S/. ${Math.round(value / 1_000)}k`;
};

/* =========================
   TOOLTIP VENTAS TOTALES
========================= */
const TotalTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const { promedio } = payload[0].payload;

  return (
    <div className="bg-white border shadow p-2 text-xs">
      <div className="font-bold">Promedio anual</div>
      <div>S/. {promedio.toLocaleString()}</div>
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

  /* ===== Ventas Totales ===== */
  const annualSalesData = useMemo(() => {
    return monthlySeries.map((s) => {
      const valid = s.data.filter(v => v > 0);
      const total = valid.reduce((a, b) => a + b, 0);
      const promedio = Math.round(total / valid.length);
      return { anio: s.year, total, promedio };
    });
  }, []);

  /* ===== Ventas 2025 (sin ceros) ===== */
  const ventasMensuales2025 = monthlySeries
    .find((s) => s.year === "2025")!
    .data
    .map((v, i) => ({ mes: months[i], ventas: v }))
    .filter(v => v.ventas > 0);

  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden">
      <div className="p-4 space-y-6">

        {/* ===== OTROS GRÁFICOS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-primary p-4">

          {/* ===== VENTAS TOTALES ===== */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Totales
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={annualSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="anio" />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={formatCurrencyAxis}
                />
                <Tooltip content={<TotalTooltip />} />
                <Bar dataKey="total" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* ===== VENTAS DECLARADAS ===== */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Declaradas - 2025
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ventasMensuales2025}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis
                  domain={["auto", "auto"]}
                  tickFormatter={formatCurrencyAxis}
                />
                <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                <Line
                  type="monotone"
                  dataKey="ventas"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IndicadoresFinancieros;
