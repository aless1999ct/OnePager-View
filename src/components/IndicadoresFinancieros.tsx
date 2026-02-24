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
  { concepto: "Ventas RT", importe: 433097, part: "100%" },
  { concepto: "Ventas Total", importe: 433097, part: "100%" },
  { concepto: "Ventas Evaluada (+)", importe: 433097, part: "100%" },
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
      const real = valid.reduce((a, b) => a + b, 0);
      const promedio = Math.round(real / valid.length);

      let proyeccion = 0;
      if (s.year === "2025") {
        const promedioMensual = real / 10;
        proyeccion = Math.round(promedioMensual * 2);
      }

      return {
        anio: s.year,
        real,
        proyeccion,
        total: real + proyeccion,
        promedio,
      };
    });
  }, []);

  const ventasMensuales2025 = monthlySeries
    .find(s => s.year === "2025")!
    .data.map((v, i) => ({ mes: months[i], ventas: v }))
    .filter(v => v.ventas > 0);

  const cem = Number(cemMensual);
  const cuotaNum = Number(cuota);
  const percent = cem === 0 ? 0 : Math.round((cuotaNum / cem) * 100);
  const  cemAnterior = 11199; // simulado 8% menor (ajústalo si quieres)
  const variacion = "9";

  const liquidezFiltrada = indicadores.liquidez.filter(
    i => i.nombre !== "Ciclo Operativo"
  );

  const endeudamientoAjustado = [
    ...indicadores.endeudamiento,
    { nombre: "Pasivo Total / Patrimonio", valor2023: "--", valor2024: "--" },
  ];

  const evaluacionAnterior = "09/08/2025";
  const rtActualizadoAl = "10/2025";

  return (
    <div className="bg-card border border-primary rounded-md shadow mt-4">
  
      <div className="border-b border-primary px-3 py-1.5">
        <span className="text-primary font-bold text-[16px]">
          Indicadores Financieros
        </span>
      </div>
  
      <div className="p-3 space-y-4">
  
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_2.6fr] print:grid-cols-2 gap-4">
  
          {/* CEM */}
          <div className="border border-primary">
            <div className="header-banner text-[12px] text-center py-1">
              Capacidad de Endeudamiento Máximo
            </div>
  
            <div className="p-2">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr className="font-semibold border-b border-primary">
                    <td className="pr-2">Concepto</td>
                    <td className="pr-2 text-right">Importe</td>
                    <td className="text-right">%</td>
                  </tr>
                </thead>
                <tbody>
                  {cemDetalle.map((r, i) => (
                    <tr key={i} className="border-b last:border-b-0">
                      <td className="pr-2 py-0.5">{r.concepto}</td>
                      <td className="pr-2 text-right py-0.5">
                        S/. {r.importe.toLocaleString()}
                      </td>
                      <td className="text-right py-0.5">{r.part}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
  

              {/* Mini tabla estilo Excel */}
              <div className="mt-2 border border-primary text-[11px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <td className="data-label text-center"></td>
                      <td className="data-label text-center">Total</td>
                      <td className="data-label text-center">Variación</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="data-cell text-left font-medium">CEM Anterior</td>
                      <td className="data-cell text-center">
                        {cemAnterior.toLocaleString()}
                      </td>
                      <td className="data-cell text-center">
                        {variacion > 0 ? `(+${variacion}%)` : `(${variacion}%)`}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="text-[11px] text-center mt-2 font-medium">
                CUOTA ES {percent}% DEL CEM
              </div>
              
            </div>
          </div>
  
          {/* RATIOS */}
          <div className="border border-primary">
            <div className="header-banner text-[12px] text-center py-1">
              Ratios Financieros
            </div>
  
            <table className="w-full text-[11px]">
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th className="data-label text-center">Ev. Ant.</th>
                  <th className="data-label text-center">Ev. Act.</th>
                </tr>
              </thead>
              <tbody>
                {[["Actividad", indicadores.actividad],
                  ["Liquidez", liquidezFiltrada],
                  ["Endeudamiento", endeudamientoAjustado]
                ].map(([titulo, data]: any, i) =>
                  data.map((r: any, j: number) => (
                    <tr key={`${i}-${j}`}>
                      {j === 0 && (
                        <td rowSpan={data.length} className="data-label text-center font-semibold">
                          {titulo}
                        </td>
                      )}
                      <td className="data-cell py-0.5">{r.nombre}</td>
                      <td className="data-cell text-center py-0.5">{r.valor2023}</td>
                      <td className="data-cell text-center py-0.5">{r.valor2024}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
  
            <div className="text-[10px] text-muted-foreground px-2 py-1">
              Evaluación Anterior: {evaluacionAnterior}
            </div>
          </div>
        </div>
  
        {/* GRÁFICOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-4 border border-primary p-3 print:break-inside-avoid">
  
          {/* Ventas Totales */}
          <div>
            <div className="header-banner text-[12px] text-center mb-1">
              Ventas Totales
            </div>
  
            <ResponsiveContainer width="100%" height={170}>
              <BarChart data={annualSalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="anio" />
                <YAxis
                  width={80}
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) =>
                    v >= 1_000_000
                      ? `S/. ${(v / 1_000_000).toFixed(1)}MM`
                      : `S/. ${(v / 1_000).toFixed(0)}k`
                  }
                />
                <Tooltip />
                <Bar dataKey="real" stackId="a" barSize={26} fill="#28af60" />
                <Bar dataKey="proyeccion" stackId="a" fill="#0836a6" />
              </BarChart>
            </ResponsiveContainer>
  
            <div className="text-[10px] text-muted-foreground mt-1 text-center">
              RT actualizado al: {rtActualizadoAl}
            </div>
          </div>
  
          {/* Ventas Declaradas */}
          <div>
            <div className="header-banner text-[12px] text-center mb-1">
              Ventas Declaradas - 2025
            </div>
  
            <ResponsiveContainer width="100%" height={170}>
              <LineChart data={ventasMensuales2025}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `S/. ${v / 1000}k`} />
                <Tooltip formatter={(v: number) => `S/. ${v.toLocaleString()}`} />
                <Line type="monotone" dataKey="ventas" strokeWidth={2} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
  
        </div>
      </div>
    </div>
  );
  
};

export default IndicadoresFinancieros;
