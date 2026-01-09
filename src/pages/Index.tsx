import CompanyDataCard from "@/components/CompanyDataCard";
import ClientDetailsSection from "@/components/ClientDetailsSection";
import IndicadoresFinancieros from "@/components/IndicadoresFinancieros";
import AprobacionSection from "@/components/AprobacionSection";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [search, setSearch] = useState("");
  const sampleData = {
    nombreEmpresa: "Bodegas Vaquitas E.I.R.L.",
    rec: "20611597569",
    fecha: "02/01/2025",
    flujoEva: "Flujo Regular Ágil No Campaña",
    canal: "Tienda IN",
    ubicacion: "LIMA, BARRANCO",
    giro: "Actividades de Asesoramiento / Restaurante",
    inicio: "09/2023",
    ibkDesde: "Nuevo Cliente",
    score: "MEDIO",
    producto: "Capital de Trabajo",
    montoSolicitado: "S/. 150,000",
    plazoMeses: "24 meses",
    garantias: "NO APLICA",
    rma: "45000",
    direccion: "AV. LIMA NRO. 904 URB. TEJADA ALTA",
    fuentes: "Reporte Tributario",
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
      nombre: "Angel Soto Garcia",
      dni: "42527370",
      clasificacion: "DUDOSO",
      edad: "??",
      participacion: "100%",
      puesto: "TITULAR",
      deudaSBS: "139,689.48",
      maximaDeuda: "139,689.48",
    },
    {
      nombre: "Juan Manuel Torrez Loayza",
      dni: "41226736",
      clasificacion: "NORMAL",
      edad: "??",
      participacion: "100%",
      puesto: "REPRESENTANTE LEGAL",
      deudaSBS: "139,680.00",
      maximaDeuda: "92,411",
    },
    {
      nombre: "J AL CUADRADO S.A.C.",
      dni: "20605798137",
      clasificacion: "Vencido",
      edad: "??",
      participacion: "100%",
      puesto: "Empresas del RRLL",
      deudaSBS: "140.91",
      maximaDeuda: "140.91",
    },
    {
      nombre: "FULL VIDRIOS Y LAMINAS SAC",
      dni: "20602274633",
      clasificacion: "Castigo",
      edad: "??",
      participacion: "100%",
      puesto: "Empresas del RRLL",
      deudaSBS: "90479.81",
      maximaDeuda: "90479.81",
    },
    {
      nombre: "EQUIPANDOTEC COMERCIAL S.A.C.",
      dni: "20603406932",
      clasificacion: "Castigo",
      edad: "??",
      participacion: "100%",
      puesto: "Empresas del RRLL",
      deudaSBS: "90004.5",
      maximaDeuda: "90004.5",
    },
    
    
  ];

  const perfilCliente = "Empresa dedicada al asesoramiento de Ventas y de servicio de Restaurante.";

  const politicasComerciales = "Rubro familiar, rubro alimenticio. Diversión familiar.";

  // Indicadores Financieros Data (solo los NO tachados en rojo)
  const indicadoresData = {
  actividad: [
    {
      nombre: "Promedio Mensual Ventas",
      valor2023: "226,929",
      valor2024: "489,494",
    },
    {
      nombre: "Variación de ventas",
      valor2023: "---",
      valor2024: "46.5%",
    },
  ],

  rentabilidad: [
    {
      nombre: "Margen Bruto",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "Margen Operativo",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "Margen Neto",
      valor2023: "--",
      valor2024: "--",
    },
  ],

  liquidez: [
    {
      nombre: "Capital de Trabajo",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "Rotación de Inventarios",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "PPC = Período promedio de Cobranza",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "PPP = Período Promedio de Pago",
      valor2023: "--",
      valor2024: "--",
    },
    {
      nombre: "Ciclo Operativo",
      valor2023: "--",
      valor2024: "--",
    },
  ],

  endeudamiento: [
    {
      nombre: "Pasivo Financiero / Promedio Mensual de Ventas",
      valor2023: "--",
      valor2024: "--",
    },
  ],
};


  const chartData = [
    { year: "2023", value: 58451 },
    { year: "2024", value: 1320827 },
    { year: "2025", value: 2330110 },
  ];

  const aprobacionData = {
    producto: {
      producto: "No Aplica",
      monto: "S/ --",
      cuotaInicial: "--",
      importeFinanciar: "S/. --",
      plazo: "No Aplica",
      finalidad: "No Aplica",
      hipotecas: "No Aplica",
    },
    observacion: "1. MB según el SSFF de 28% y se coloca MB de tabla por 40%, Cliente 100% formal. 2. Sustentar hace cuanto el Sr. Angel Ataca es EL de la empresa. 3. Local celebra alquiler hace un mes, sustentar contrato anterior. 4. En videollamada se detecta que otra persona le pasa datos de los costos. En la pregunta ¿cuánto se paga por personal. ¿Porque no se le consulto sobre esa persona",
    condiciones: "No Aplica",
    condicionesDetalle: "Se le niega el préstamo.",
    firmas: {
      bancoNegociosFecha: "07/01/2026",
      analistaCreditos: "Adrian Angeles Mori",
      jefeCreditos: "Miguel Godos",
      subgerenteCreditos: "Renato Valencia",
      gerenteDivision: "Jose Luis Chavez",
    },
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  return (

     <>
    {/* Barra de búsqueda */}
    <div className="w-full border-b border-gray-200 bg-background px-4 py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="rounded-md border border-gray-300 px-3 py-2 hover:bg-gray-100"
          aria-label="Buscar"
        >
          🔍
        </button>

        <button
          onClick={() => setSearch("")}
          className="rounded-md border border-gray-300 px-3 py-2 hover:bg-red-100"
          aria-label="Borrar"
        >
          🗑️
        </button>
      </div>
    </div>
   
    <div className="min-h-screen bg-background p-4 sm:p-8">
    <div className="max-w-7xl mx-auto">

  {/* Acciones (NO imprimen) */}
  <div className="flex items-center justify-between mb-6 print:hidden">
    <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
      <FileDown className="w-4 h-4" />
      Descargar PDF
    </Button>
  </div>

  {/* ====== ONE PAGER A4 ====== */}
  <div className="one-pager bg-white mx-auto">

    <CompanyDataCard data={sampleData} />

    <ClientDetailsSection
      transaccionalidad={transaccionalidadData}
      creditos={creditosData}
      perfilCliente={perfilCliente}
      politicasComerciales={politicasComerciales}
      accionistas={accionistasData}
    />

    <IndicadoresFinancieros
      cemMensual={43574}
      cuota={8386}
      indicadores={indicadoresData}
      lineSeries={[
              {
                year: "2023",
                color: "#2563eb",
                data: [220000, 225000, 230000, 235000, 240000, 245000, 250000, 255000, 260000, 265000, 270000, 275000],
              },
              {
                year: "2024",
                color: "#16a34a",
                data: [300000, 305000, 310000, 315000, 320000, 325000, 330000, 335000, 340000, 345000, 350000, 355000],
              },
              {
                year: "2025",
                color: "#dc2626",
                data: [360000, 365000, 370000, 375000, 380000, 385000, 390000, 395000, 400000, 405000, 410000, 415000],
              },
            ]}
          />

    <AprobacionSection
      producto={aprobacionData.producto}
      observacion={aprobacionData.observacion}
      condiciones={aprobacionData.condiciones}
      firmas={aprobacionData.firmas}
    />

  </div>
  {/* ====== FIN ONE PAGER ====== */}

</div>


</div>

      
     
     </>
  );
};

export default Index;




