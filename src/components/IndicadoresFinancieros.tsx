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
   DATA DETALLE CEM
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
   TOOLTIP CEM
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

  /* =========================
     VENTAS TOTALES (TOTAL + PROMEDIO)
  ========================= */
  const annualSalesData = useMemo(() => {
    return monthlySeries.map((s) => {
      const valid = s.data.filter(v => v > 0);
      const total = valid.reduce((a, b) => a + b, 0);
      const promedio = Math.round(total / valid.length);

      return {
        anio: s.year,
        total,
        promedio,
      };
    });
  }, []);

  /* =========================
     VENTAS 2025 HASTA ÚLTIMO MES CON DATOS
  ========================= */
  const ventasMensuales2025 = useMemo(() => {
    const data2025 = monthlySeries.find(s => s.year === "2025")!.data;

    const lastIndex =
      data2025.map((v, i) => (v > 0 ? i : -1)).filter(i => i !== -1).pop() ?? 0;

    return data2025.slice(0, lastIndex + 1).map((v, i) => ({
      mes: months[i],
      ventas: v,
    }));
  }, []);

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

  const liquidezFiltrada = indicadores.liquidez.filter(
    (i) => i.nombre !== "Ciclo Operativo"
  );

  const endeudamientoAjustado: IndicadorData[] = [
    ...indicadores.endeudamiento.map((i) =>
      i.nombre === "Pasivo Financiero / Promedio Mensual de Ventas"
        ? { ...i, nombre: "Pasivo Financiero / Patrimonio" }
        : i
    ),
    { nombre: "Pasivo Total / Patrimonio", valor2023: "--", valor2024: "--" },
  ];

  const renderSection = (titulo: string, data: IndicadorData[]) => {
    if (!data.length) return null;

    return (
      <>
        <tr>
          <td rowSpan={data.length} className="data-label font-bold text-center">
            {titulo}
          </td>
          <td className="data-cell text-left">{data[0].nombre}</td>
          <td className="data-cell text-center">{data[0].valor2023}</td>
          <td className="data-cell text-center">{data[0].valor2024}</td>
        </tr>
        {data.slice(1).map((d, i) => (
          <tr key={i}>
            <td className="data-cell text-left">{d.nombre}</td>
            <td className="data-cell text-center">{d.valor2023}</td>
            <td className="data-cell text-center">{d.valor2024}</td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="bg-card border-2 border-primary rounded-lg shadow-lg mt-6 overflow-hidden">
      <div className="p-4 space-y-6">

        {/* VENTAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-2 border-primary p-4">

          {/* VENTAS TOTALES */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Totales
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={annualSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="anio" />
                <YAxis width={70} tickFormatter={(v) => `S/. ${(v / 1_000_000).toFixed(1)} NM`} />
                <Tooltip
                  formatter={(_, __, p) =>
                    [`Promedio mensual: S/. ${p.payload.promedio.toLocaleString()}`, ""]
                  }
                />
                <Bar dataKey="total" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* VENTAS DECLARADAS */}
          <div>
            <div className="header-banner text-sm text-center mb-2">
              Ventas Declaradas – 2025
            </div>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ventasMensuales2025}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis width={70} tickFormatter={(v) => `S/. ${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="ventas" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="text-xs text-muted-foreground md:col-span-2">
            RT actualizado al: {rtActualizadoAl}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndicadoresFinancieros;
