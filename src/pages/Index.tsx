import CompanyDataCard from "@/components/CompanyDataCard";
import ClientDetailsSection from "@/components/ClientDetailsSection";
import IndicadoresFinancieros from "@/components/IndicadoresFinancieros";
import AprobacionSection from "@/components/AprobacionSection";
import AnexosSection from "@/components/AnexosSection";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [search, setSearch] = useState("");

  /* ===================== DATA ===================== */

  const sampleData = {
    nombreEmpresa: "PLÁSTICOS Y PAPELES SAC",
    rec: "20451340167",
    fecha: "02/01/2025",
    flujoEva: "Regular",
    canal: "Tienda IN",
    ubicacion: "Loreto, Iquitos",

    giro: "Comercio: Plásticos y Papelería",
    subGiro: "Distribución mayorista",

    inicio: "12/2000",
    ibkDesde: "03/2001",
    score: "MEDIO",

    producto: "Capital de Trabajo",
    montoSolicitado: "1 MM",
    montoAprobado: "1 MM",
    plazoMeses: "36 meses",

    sowActual: "35%",
    sowAlcanzado: "50%",

    garantias: "27 MM - almacén",
    rma: "--",
    direccion: "Jr. Aguirre Nro. 1154",
    fuentes: "Alquilado",
  };

  const transaccionalidadData = {
    ratio: "---",
    flujo: "---",
    venta: "---",
    pasivoPromedio: "---",
  };

  const creditosData = [
    {
      sujetoCredito: "---",
      producto: "---",
      montoOriginal: "---",
      saldoActual: "---",
      plazoInicial: "---",
      ratio24: "---",
      rma: "---",
      promedioDiasAtraso: "---",
    },
  ];

  const accionistasData = [
    {
      nombre: "Aristides Padilla Aguirre",
      dni: "05289492",
      clasificacion: "Normal",
      edad: "73",
      participacion: "1%",
      puesto: "RRLL",
      deudaSBS: "297 K",
      maximaDeuda: "549 K",
    },
    {
      nombre: "Mary Luz Fernandez de Padilla",
      dni: "05283539",
      clasificacion: "Normal",
      edad: "63",
      participacion: "99%",
      puesto: "Administrador",
      deudaSBS: "243 K ",
      maximaDeuda: "332 K",
    },
  ];

  const perfilCliente =
    "Dedicada a la comercialización de productos de plástico y papel (80%) y en menor medida abarrotes y artículos para repostería (20%) distribuyen toda la zona.";

  const politicasComerciales =
    "Compras 50% al crédito (líneas de $280M). Proveedores: PAMOLSA, TaiLoy SA, Schroth. Ventas 100% al contado.";

  const indicadoresData = {
    actividad: [
      { nombre: "Promedio Mensual Ventas", valor2023: "771", valor2024: "649" },
      { nombre: "Variación de ventas", valor2023: "", valor2024: "-15%" },
    ],
    rentabilidad: [
      { nombre: "Margen Bruto", valor2023: "13%", valor2024: "13%" },
      { nombre: "Margen Operativo", valor2023: "4%", valor2024: "4%" },
      { nombre: "Margen Neto", valor2023: "2%", valor2024: "2%" },
    ],
    liquidez: [
      { nombre: "Capital de Trabajo", valor2023: "1222", valor2024: "1226" },
      { nombre: "Rotación de Inventarios", valor2023: "116", valor2024: "108" },
      { nombre: "PPC = Período promedio de Cobranza", valor2023: "0", valor2024: "0" },
      { nombre: "PPP = Período Promedio de Pago", valor2023: "32", valor2024: "32" },
      { nombre: "Ciclo Operativo", valor2023: "83", valor2024: "76" },
    ],
    endeudamiento: [
      {
        nombre: "Pasivo Financiero / Promedio Mensual de Ventas",
        valor2023: "4.13",
        valor2024: "4.02",
      },
    ],
  };

  const aprobacionData = {
    producto: {
      producto: "Capital de Trabajo",
      monto: "S/ 1 MM",
      cuotaInicial: "0",
      importeFinanciar: "S/. 1 MM",
      plazo: "36 meses",
      finalidad: "Compra de Mercancías",
      hipotecas: "S/. 2,7 MM",
    },
    observacion:
      "La empresa muestra recuperación en ventas 2025, adecuada posición de liquidez...",
    condiciones: "No Aplica",
    firmas: {
      bancoNegociosFecha: "29/08/2025",
      analistaCreditos: "Carla Bocanegra",
      jefeCreditos: "Miguel Godos",
      subgerenteCreditos: "Renato Valencia",
      gerenteDivision: "Jose Luis Chavez",
    },
  };

  const handleDownloadPDF = () => window.print();

  /* ===================== RENDER ===================== */

  return (
    <>
      {/* Barra de búsqueda (fuera del documento) */}
      <div className="w-full border-b bg-background px-4 py-3 print:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar..."
            className="flex-1 rounded-md border px-4 py-2 text-sm"
          />
          <button className="rounded-md border px-3 py-2">🔍</button>
          <button
            onClick={() => setSearch("")}
            className="rounded-md border px-3 py-2"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* CONTENEDOR DOCUMENTAL */}
      <main className="bg-neutral-100 py-10 print:py-0">
        <div className="mx-auto max-w-[1200px] px-6 print:px-0 pdf-root">

          {/* Acciones */}
          <div className="mb-6 flex justify-end print:hidden">
            <Button onClick={handleDownloadPDF} className="flex gap-2">
              <FileDown className="h-4 w-4" />
              Descargar PDF
            </Button>
          </div>

          {/* ONE PAGER */}
          <article className="one-pager space-y-8 print:space-y-4 bg-white p-8 print:p-4 shadow-sm pdf-page">
            <CompanyDataCard data={sampleData} />

            <ClientDetailsSection
              transaccionalidad={transaccionalidadData}
              creditos={creditosData}
              perfilCliente={perfilCliente}
              politicasComerciales={politicasComerciales}
              accionistas={accionistasData}
            />

            <IndicadoresFinancieros
              cemMensual={20000}
              cuota={15000}
              indicadores={indicadoresData}
              lineSeries={[
                { year: "2023", color: "#2563eb", data: Array(12).fill(250000) },
                { year: "2024", color: "#16a34a", data: Array(12).fill(330000) },
                { year: "2025", color: "#dc2626", data: Array(12).fill(390000) },
              ]}
            />

            <AprobacionSection
              producto={aprobacionData.producto}
              observacion={aprobacionData.observacion}
              condiciones={aprobacionData.condiciones}
              firmas={aprobacionData.firmas}
            />

            <AnexosSection />
            
          </article>
        </div>
      </main>
    </>
  );
};

export default Index;
