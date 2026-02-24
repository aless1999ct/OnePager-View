import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

import { useState } from "react";

const AnexosSection = () => {


    const comportamientoData = [
    { mes: "Feb", vigente: 20000, vencido: 0 },
    { mes: "Abr", vigente: 120000, vencido: 0 },
    { mes: "Jun", vigente: 110000, vencido: 0 },
    { mes: "Ago", vigente: 50000, vencido: 0 },
    { mes: "Oct", vigente: 200000, vencido: 0 },
    { mes: "Dic", vigente: 600000, vencido: 0 },
    { mes: "Feb", vigente: 550000, vencido: 0 },
    { mes: "Abr", vigente: 520000, vencido: 0 },
    { mes: "Jun", vigente: 300000, vencido: 0 },
    { mes: "Ago", vigente: 250000, vencido: 0 },
    { mes: "Oct", vigente: 1200000, vencido: 0 },
    { mes: "Dic", vigente: 800000, vencido: 350000 },
  ];

  const participacionData = [
    { name: "BCP", value: 42.4, color: "#2563eb" },
    { name: "BBVA", value: 31.9, color: "#16a34a" },
    { name: "INTERBANK", value: 21.7, color: "#eab308" },
    { name: "SCOTIABANK", value: 4.0, color: "#f97316" },
  ];

    const flujoIzipayData = [
    { mes: "Enero", ibk: 100, otros: 50 },
    { mes: "Febrero", ibk: 70, otros: 70 },
    { mes: "Marzo", ibk: 50, otros: 30 },
    { mes: "Abril", ibk: 80, otros: 30 },
    { mes: "Mayo", ibk: 210, otros: 120 },
    { mes: "Junio", ibk: 60, otros: 310 },
    { mes: "Julio", ibk: 230, otros: 100 },
    { mes: "Agosto", ibk: 80, otros: 60 },
    { mes: "Septiembre", ibk: 20, otros: 45 },
    { mes: "Octubre", ibk: 55, otros: 40 },
    { mes: "Noviembre", ibk: 85, otros: 85 },
    { mes: "Diciembre", ibk: 50, otros: 75 },
  ];

  

 const [excepcion, setExcepcion] = useState("Firma del Cónyuge");
 const [comentario, setComentario] = useState("");
 const [resolucion, setResolucion] = useState("Aprobado");

  
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
                  Excepción
                </th>
                <th className="data-label py-1 text-left">
                  Comentario EN (detalle ejecutivo)
                </th>
                <th className="data-label py-1 text-center">
                  Resolución
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* EXCEPCIÓN */}
                <td className="data-cell py-1">
                  <input
                    type="text"
                    value={excepcion}
                    onChange={(e) => setExcepcion(e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                </td>
        
                {/* COMENTARIO */}
                <td className="data-cell py-1">
                  <textarea
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    rows={2}
                    className="w-full bg-transparent outline-none resize-none"
                    placeholder="Detalle técnico de la excepción..."
                  />
                </td>
        
                {/* RESOLUCIÓN */}
                <td className="data-cell py-1 text-center">
                  <select
                    value={resolucion}
                    onChange={(e) => setResolucion(e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="Aprobado">Aprobado</option>
                    <option value="Denegado">Denegado</option>
                    <option value="Observado">Observado</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ================= RELACIONADOS / SBS ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Relacionados / Comportamiento SBS
        </h2>

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

       {/* ================= VARIACIONES ================= */}
        <div className="border border-primary mt-4">
        
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1 text-center">
                  Var. Último Mes
                </th>
                <th className="data-label py-1 text-center">
                  Var. Último Trimestre
                </th>
                <th className="data-label py-1 text-center">
                  Var. Último Semestre
                </th>
                <th className="data-label py-1 text-center">
                  Var. Último Año
                </th>
              </tr>
            </thead>
        
            <tbody>
              <tr>
                <td className="data-cell py-1 text-center text-green-600 font-semibold">
                  20%
                </td>
        
                <td className="data-cell py-1 text-center text-red-600 font-semibold">
                  -35%
                </td>
        
                <td className="data-cell py-1 text-center text-green-600 font-semibold">
                  5%
                </td>
        
                <td className="data-cell py-1 text-center text-green-600 font-semibold">
                  16%
                </td>
              </tr>
            </tbody>
          </table>
        
        </div>

        {/* ================= GRUPO ECONÓMICO ================= */}
        <div className="space-y-3">

          {/* Título simple (NO h2) */}
          <div className="text-primary font-semibold text-[13px]">
            Grupo Económico
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* TABLA PRINCIPAL */}
            <div className="md:col-span-2 border border-primary">
              <table className="w-full text-[11px]">
                <thead>
                  <tr>
                    <th className="data-label py-1 text-left">
                      La Primerísima SRL
                    </th>
                    <th className="data-label py-1 text-center" colSpan={3}>
                      Deuda RCC
                    </th>
                    <th className="data-label py-1 text-center">
                      Cuota (log vpc)
                    </th>
                  </tr>
                  <tr>
                    <th className="data-label py-1"></th>
                    <th className="data-label py-1 text-center">Comercial</th>
                    <th className="data-label py-1 text-center">Consumo</th>
                    <th className="data-label py-1 text-center">Total</th>
                    <th className="data-label py-1 text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="data-cell py-1">Diego Primera (RRLL)</td>
                    <td className="data-cell py-1 text-right">790,000</td>
                    <td className="data-cell py-1 text-right">1,000,000</td>
                    <td className="data-cell py-1 text-right">1,790,000</td>
                    <td className="data-cell py-1 text-right">165,833</td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">
                      Joaquin Primera (acc 80%)
                    </td>
                    <td className="data-cell py-1 text-right">350,000</td>
                    <td className="data-cell py-1 text-right">50,000</td>
                    <td className="data-cell py-1 text-right">400,000</td>
                    <td className="data-cell py-1 text-right">34,167</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TABLA CLASIFICACIÓN */}
            <div className="border border-primary">
              <div className="header-banner text-[12px] py-1 text-center">
                Clasificación
              </div>

              <table className="w-full text-[11px]">
                <tbody>
                  <tr>
                    <td className="data-cell py-1">Dic 25</td>
                    <td className="data-cell py-1 text-center">
                      CPP 80% NOR 20%
                    </td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">Nov 25</td>
                    <td className="data-cell py-1 text-center">NOR 100%</td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">Oct 25</td>
                    <td className="data-cell py-1 text-center">NOR 100%</td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">Sep 25</td>
                    <td className="data-cell py-1 text-center">NOR 100%</td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">Ago 25</td>
                    <td className="data-cell py-1 text-center">NOR 100%</td>
                  </tr>
                  <tr>
                    <td className="data-cell py-1">Jul 25</td>
                    <td className="data-cell py-1 text-center">NOR 100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>

                {/* ================= CRÉDITOS ANTERIORES IBK ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Créditos Anteriores IBK
        </h2>

        <div className="border border-primary">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1 text-center">Producto</th>
                <th className="data-label py-1 text-center">
                  Saldo / Capital
                </th>
                <th className="data-label py-1 text-center">
                  Plazo / Ratio
                </th>
                <th className="data-label py-1 text-center">
                  Días Atraso
                </th>
                <th className="data-label py-1 text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>

              {/* ================= COMPORTAMIENTO SSFF ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Comportamiento en el SSFF - Titular
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-primary p-4">

          {/* GRÁFICO BARRAS */}
          <div>
            <div className="text-[12px] font-semibold mb-2 text-center">
              Deuda Vigente y Vencida SBS/Mic. en los últimos 24 meses
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={comportamientoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="vigente" fill="#2563eb" />
                <Bar dataKey="vencido" fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* GRÁFICO PIE */}
          <div>
            <div className="text-[12px] font-semibold mb-2 text-center">
              Endeudamiento SBS/Mic. últimos 24 meses (%)
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={participacionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {participacionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* ================= FLUJO IZIPAY ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Flujo izipay
        </h2>
        
        <div className="border border-primary p-4">
        
          <div className="text-[12px] font-semibold text-center mb-3">
            Flujo Izipay Ultimos 12 meses
          </div>
        
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={flujoIzipayData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
        
              <Line
                type="monotone"
                dataKey="ibk"
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="IBK"
              />
        
              <Line
                type="monotone"
                dataKey="otros"
                stroke="#ea580c"
                strokeWidth={3}
                dot={{ r: 4 }}
                name="Otros Bancos"
              />
            </LineChart>
          </ResponsiveContainer>
        
        </div>

        {/* ================= DEUDAS TRIBUTARIAS ================= */}
        <h2 className="text-primary font-semibold text-[14px]">
          Deudas Tributarias ?
        </h2>
        
        <div className="border border-primary">
          <table className="w-full text-[11px]">
            <thead>
              <tr>
                <th className="data-label py-1 text-center">Tipos</th>
                <th className="data-label py-1 text-center">Desde</th>
                <th className="data-label py-1 text-center">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="data-cell py-1">Coactiva</td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
              <tr>
                <td className="data-cell py-1">Omisiones Recurrentes</td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
              <tr>
                <td className="data-cell py-1">Multas</td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
              <tr>
                <td className="data-cell py-1">Protestos</td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
              <tr>
                <td className="data-cell py-1">Deudas Laborales</td>
                <td className="data-cell py-1 text-center"></td>
                <td className="data-cell py-1 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>

        
      </div>
    </div>
  );
};

export default AnexosSection;
