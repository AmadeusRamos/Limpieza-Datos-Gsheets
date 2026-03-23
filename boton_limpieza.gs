/**
 * Se ejecuta automáticamente al abrir el archivo de Google Sheets.
 * Crea una pestaña nueva en la barra de herramientas superior.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  
  // Creamos el menú con un nombre llamativo y emojis para que resalte
  ui.createMenu('🚀 SISTEMA STRACK')
      .addItem('⚡ Ejecutar Proceso Completo', 'ejecutarProcesoCompleto')
      .addSeparator() // Una línea divisoria para orden
      .addSubMenu(ui.createMenu('🛠️ Herramientas Individuales')
          .addItem('1. Fusionar Archivos', 'fusionarExcelEnHojaPrincipal')
          .addItem('2. Filtrar Delitos (911)', 'filtrarDelitos911')
          .addItem('3. Limpiar Símbolos y Comas', 'limpiarSimbolosTodaLaHoja')
          .addItem('4. Formatear Fechas', 'corregirFechasTexto')
          .addItem('5. Todo a MAYÚSCULAS', 'convertirTodoAMayusculas'))
      .addToUi();
}

/**
 * FUNCIÓN MAESTRA: El director de orquesta que llama a todas 
 * las funciones que hemos traducido en el orden lógico.
 */
function ejecutarProcesoCompleto() {
  var ui = SpreadsheetApp.getUi();

  // 1. Limpiar hojas de DAI, Seguridad y Accidentes
  limpiarHojasAuxiliares();
  
  try {
    // 2. Iniciamos con la fusión de archivos
    var totalArchivos = fusionarExcelEnHojaPrincipal
(); 
    
    if (totalArchivos === 0) {
      ui.alert("⚠️ Aviso", "No se encontraron archivos nuevos en la carpeta de Drive.", ui.ButtonSet.OK);
      return;
    }

    // 3. Aplicamos el filtro de delitos 911 (Limpiar lo que no sirve primero)
    filtrarDelitos911();

    // 4. Limpieza de estructura (Fechas, Espacios, Caracteres Invisibles)
    corregirFechasTexto();
    limpiarEspaciosYFormatearFechas();
    limpiarCaracteresNoImprimibles();

    // 5. Limpieza de contenido (Símbolos, Ciudades, Comas, Guiones)
    cambioAcambayYTianguistenco();
    limpiarSimbolosTodaLaHoja();
    eliminarComasYValidarCeros();
    limpiarGuionesBloqueAD();

    // 6. Formato final Estético
    convertirTodoAMayusculas();

    // 7. Preparar los datos de trabajo
    copiarDatosAGeo();
    procesarFiltrosGeo();
    limpiarMunicipiosConReporte();
    extraerDatosADAI();
    extraerDatosASeguridad();
    extraerDatosAAccidentes();
    enviarReporteDAIySeguridad();

    // Mensaje de éxito final
    ui.alert("✅ Proceso Finalizado", 
             "Se procesaron los archivos correctamente.\n" +
             "Los datos en la hoja 'Principal' están limpios y uniformes.", 
             ui.ButtonSet.OK);

  } catch (error) {
    ui.alert("❌ Error en el proceso", "Ocurrió lo siguiente: " + error.toString(), ui.ButtonSet.OK);
  }
}
