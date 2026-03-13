import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const ENIGMAS = [{"title": "El hombre en el bar", "snippet": "Un hombre entra en un bar y pide un vaso de agua. El camarero saca un arma, apunta al hombre y le da las gracias. El hombre se va feliz. ¿Qué ocurrió?", "solution": "El hombre tenía hipo. El camarero lo asustó con el arma para curárselo, lo cual funcionó y por eso le dio las gracias."}, {"title": "El náufrago en el ascensor", "snippet": "Un hombre vive en el piso 10. Cuando sale de casa, toma el ascensor hasta la planta baja. Cuando vuelve, toma el ascensor hasta el piso 7 y sube el resto por las escaleras, a menos que llueva. ¿Por qué?", "solution": "El hombre tiene enanismo y no alcanza el botón del piso 10. Si llueve, usa su paraguas para pulsar el botón."}, {"title": "El músico muerto", "snippet": "Tres músicos mueren en un accidente aéreo. Su música se vuelve famosa. ¿Qué ocurrió?", "solution": "Eran componentes de una banda que viajaban juntos y su muerte generó un gran impacto mediático que popularizó su música."}, {"title": "Saltando desde un sexto", "snippet": "En el borde de una ventana del sexto piso, una mujer salta. Sin embargo, no se mata ni sufre ningún tipo de secuelas. ¿Qué ocurrió?", "solution": "La mujer estaba a punto de suicidarse pero se lo pensó mejor y en lugar de saltar hacia fuera, saltó hacia dentro de su apartamento."}, {"title": "Aquella luz", "snippet": "Al ver una luz, Roger se queda paralizado. Segundos después, muere. ¿Qué ocurrió?", "solution": "Roger era un conejo que se había escapado de la casa donde vivía. Al cruzar la carretera se vio deslumbrado por los faros de un coche y se quedó paralizado. El conductor del coche, que no lo había visto, lo atropelló."}, {"title": "La contraseña", "snippet": "En una investigación a la mafia, un detective escucha las siguientes preguntas y respuestas para acceder al local: ¿Ocho? Cuatro. ¿Catorce? Siete. ¿Dieciocho? Nueve. ¿Veinte? Diez. El detective responde \"Diez\" y lo matan. ¿Cuál era la respuesta correcta?", "solution": "La respuesta correcta era \"Seis\". A la pregunta había que responder con el número de letras que tenía la palabra escuchada. \"Veinte\" tiene 6 letras."}, {"title": "Las gafas rotas", "snippet": "Jacobo va corriendo cuando sus gafas caen al suelo. Poco después, encuentra sus gafas y ve que hay un montón de gente muriendo a su alrededor. Aunque su familia acaba de morir, él mantiene una sonrisa en su cara. ¿Por qué?", "solution": "Jacobo trabajaba como payaso en un circo. Al escapar de una estampida de animales tropezó y perdió sus gafas. Cuando las encontró vio gente muriendo por la estampida. Estaba triste porque su familia había muerto, pero el maquillaje de payaso le hacía parecer que sonreía."}, {"title": "El ahorcado", "snippet": "En una habitación cerrada con llave aparece un hombre ahorcado colgando del techo y no hay ningún otro objeto alrededor. ¿Cómo lo hizo?", "solution": "El hombre se subió sobre un bloque de hielo para ahorcarse. Le dio una patada al bloque y murió. Al cabo de un tiempo, el hielo se derritió y solo quedó un pequeño charco de agua."}, {"title": "Una muerte poco corriente", "snippet": "Jaime trabaja en un banco. Un día, se produce un gran apagón en toda la ciudad. A los pocos minutos, Jaime muere electrocutado. ¿Cómo es posible?", "solution": "Jaime era informático y aquel día decidió trabajar en el parque, sentado en un banco. Se produjo una tormenta que provocó el apagón. Cuando iba a marcharse a casa, fue fulminado por un rayo."}, {"title": "El último tren", "snippet": "Oscar está sentado leyendo el periódico cuando escucha un ruido. Mira hacia delante y se lamenta por no haber cogido el tren a tiempo. Poco después se suicida. ¿Qué ocurrió?", "solution": "Óscar, arruinado, era coleccionista de trenes y iba a vender su maqueta más valiosa. La había estado limpiando en la mesa pero no la colocó bien. Al sentarse a leer el periódico oyó cómo se deslizaba y se hacía pedazos contra el suelo."}, {"title": "Decapitación", "snippet": "Cuando Martín se despertó aquella mañana, le extrañó que la puerta estuviera abierta. En el momento en que se asomó fuera, murió decapitado. ¿Qué ocurrió?", "solution": "Martín era un canario que llevaba 4 meses en su jaula. Silvestre era un gato que esperaba la oportunidad de atraparlo. Cuando su dueño dejó la puerta de la jaula abierta por accidente, el gato le arrancó la cabeza de un bocado."}, {"title": "El accidente", "snippet": "Un hombre al volante provoca un accidente chocando contra una moto en un cruce. Cuando llega la policía, se llevan a otro hombre a comisaría y al conductor lo llevan a casa. ¿Por qué?", "solution": "El hombre se estaba sacando el carnet de conducir y su profesor de autoescuela le indicó erróneamente que tomara una calle en dirección prohibida. La policía encontró responsable al profesor e intentó ayudar al alumno, que sufría un ataque de pánico."}, {"title": "Muerte en el museo", "snippet": "Un hombre con pasamontañas sale corriendo de un museo con un cuadro bajo el brazo. Un policía lo ve y lo mata de un disparo. Poco después, el policía se suicida. A los pocos días, el hombre asesinado es nombrado ciudadano ilustre del pueblo. ¿Qué ocurrió?", "solution": "Había un incendio en el museo. El director fue a salvar el cuadro más valioso. El policía, sin saber del incendio, creyó que era un ladrón y lo disparó mortalmente. Al enterarse de la verdad, el policía se suicidó."}, {"title": "El corte de luz", "snippet": "Una mujer está bajando las escaleras en el trabajo cuando se corta la luz. En ese mismo momento se da cuenta de que su marido acaba de morir. ¿Cómo lo sabe?", "solution": "La mujer trabajaba como electricista en un hospital cuyos generadores de emergencia estaban estropeados. Su marido estaba intubado tras un accidente. Cuando se fue la luz supo que él no podría respirar por sí mismo y había muerto."}, {"title": "Ahora no", "snippet": "Una mujer está en su casa mirando melancólicamente hacia la calle. Al poco tiempo salta por una ventana. Un segundo después de hacerlo, suena el teléfono y ella se lamenta de haber saltado. ¿Por qué?", "solution": "Tras una catástrofe nuclear, la mujer pensaba que era la única persona que quedaba con vida y decidió suicidarse. Al sonar el teléfono se dio cuenta de que no era así y se arrepintió del salto."}, {"title": "El testigo del secuestro", "snippet": "Un hombre de negocios es testigo de un secuestro. Sin embargo, cuando se lo cuenta a la policía no le hacen caso. ¿Por qué?", "solution": "Tras salir del dentista con la boca dormida, el hombre no era capaz de hablar correctamente y balbuceaba. Los policías lo confundieron con un borracho y no dieron credibilidad a sus palabras."}, {"title": "Los dos al suelo", "snippet": "Dos hombres se están golpeando cuando ambos caen fulminados al suelo. ¿Qué ocurrió?", "solution": "Habían secuestrado a la hija de un boxeador para chantajearlo y que perdiera el combate. Al final, su contrincante se desmayó por los golpes y el boxeador, para no ganar, lo imitó tirándose al suelo."}, {"title": "Robo sin resolver", "snippet": "Un hombre entra en una farmacia y sale corriendo con el dinero de la caja registradora. La farmacéutica llama a la policía y un agente recupera el dinero y se lleva al hombre. Esa misma tarde los tres van a la comisaría a poner una denuncia por robo. ¿Qué ocurrió?", "solution": "El hombre era el hijo de la farmacéutica. Le habían robado el coche y necesitaba dinero para un taxi para llegar a un examen. La madre avisó a su marido policía para que lo llevara. Como ya no necesitaba el dinero, se lo devolvió. Finalmente fueron juntos a denunciar el robo del coche."}, {"title": "Doctor, doctor", "snippet": "Un hombre acude al médico para conocer los resultados de unos análisis. No detectan ningún problema de salud, pero se acaba suicidando. ¿Por qué?", "solution": "El paciente sabía que su mujer lo engañaba con alguien cuyo nombre desconocía. Al salir de la consulta vio en el informe médico el nombre del doctor y no había lugar a dudas: era él. Engañado, decidió quitarse la vida."}, {"title": "Perdido", "snippet": "Jack sale de excursión con su brújula. Tras una larga caminata se detiene a comer, pero al terminar no consigue encontrar el camino de vuelta. ¿Por qué?", "solution": "Jack era científico y trabajaba cerca del Polo Norte. Al salir caminó en dirección Norte, deteniéndose justo en el Polo Norte magnético. Al intentar volver, la brújula no servía de nada: cualquier dirección era Sur."}, {"title": "¡Al agua patos!", "snippet": "Tomás navega en su pequeño bote cuando su reloj cae por la borda. Pese a ser un experto buceador, no consigue recuperarlo. ¿Por qué?", "solution": "Tomás estaba navegando sobre el Mar Muerto. Debido a la gran concentración de sal, no consiguió hundirse lo suficiente como para recuperar su reloj."}, {"title": "Muerte prematura", "snippet": "Un hombre que espera su muerte en los próximos días, muere antes de tiempo. ¿Qué ocurrió?", "solution": "El hombre, enfermo, era donante de órganos. Con su muerte iba a salvar la vida de un millonario. El hijo del millonario, para heredar antes, envenenó al enfermo para inutilizar sus órganos."}, {"title": "Asesinato sin sorpresa", "snippet": "Se produce un asesinato pero a nadie le sorprende. ¿Por qué?", "solution": "Unos amigos estaban jugando al juego de mesa Cluedo y ya esperaban la muerte para ponerse a investigar."}, {"title": "Pum, pum, pum", "snippet": "Pese a que numerosos testigos vieron que Juan resultó herido tras ser disparado en tres ocasiones, nadie detuvo al autor de los disparos. ¿Por qué?", "solution": "Juan trabajaba como hombre-bala en un circo. En la última de sus 3 actuaciones del día, Juan no aterrizó bien en la red y resultó herido."}, {"title": "Cena letal", "snippet": "Una mujer planea matar a su marido durante la cena. Sin embargo, cuando está preparándola, se suicida. ¿Por qué?", "solution": "La mujer quería envenenar la cena con unas pastillas. Al ir a cogerlas vio que no estaban: su hijo pequeño se las había tomado pensando que eran caramelos. Al descubrirlo, se quitó la vida."}, {"title": "Menudas visitas", "snippet": "Una mujer mira por la ventana y ve a un hombre con un cuchillo. No le da tiempo a llamar a la policía antes de ser asesinada. ¿Por qué?", "solution": "Era de noche y lo que la mujer vio fue el reflejo en la ventana del asesino que ya estaba dentro de su casa, detrás de ella."}, {"title": "¿Fuego?", "snippet": "Cuando Pablo salió a bucear, nunca pensó que moriría calcinado. ¿Qué ocurrió?", "solution": "Había un incendio en un bosque cercano. Un hidroavión fue a recoger agua del lago donde buceaba Pablo, lo atrapó sin querer y lo lanzó sobre el incendio."}, {"title": "Camarero, una de muerte", "snippet": "Eva se toma un refresco y Julián se toma tres como el de Eva. Solo muere Eva. ¿Por qué?", "solution": "Eva se tomó el refresco más despacio y los hielos, que contenían el veneno, se derritieron en su bebida. Julián se los tomó más rápido, antes de que el hielo se derritiera."}, {"title": "El sorteo", "snippet": "Pedro gana el sorteo y se suicida. ¿Qué ocurrió?", "solution": "Aislados por la nieve, un grupo de personas sorteaba quién debía morir para alimentar al resto. Pedro resultó elegido y cumplió su promesa."}, {"title": "Fratricidio", "snippet": "Un hombre mata a su hermano delante de algunas personas. Sin embargo, nadie lo denuncia. ¿Por qué?", "solution": "El hombre trabajaba como verdugo y su hermano había sido condenado a muerte."}, {"title": "Por una venta", "snippet": "Un comerciante se esfuerza demasiado en conseguir una venta y por eso acaba muriendo. ¿Qué ocurrió?", "solution": "El comerciante vendía chalecos antibalas. Para demostrar la calidad del producto a un cliente, se puso uno e insistió en que le disparara. El cliente falló el tiro y la bala le dio en la cabeza."}, {"title": "Muerte: con retraso", "snippet": "Carmen nunca pensó que la decisión de viajar en avión le acabaría salvando la vida. ¿Qué ocurrió?", "solution": "Carmen había sido operada recientemente. Al pasar por los arcos detectores de metales del aeropuerto, los rayos-X revelaron que los médicos habían olvidado un bisturí dentro de su cuerpo. De no haberlo descubierto a tiempo, habría muerto."}, {"title": "Bailen, malditos", "snippet": "Una pareja de bailarines muere durante una competición de baile. ¿Qué ocurrió?", "solution": "Otra pareja muy competitiva puso veneno en la rosa que la pareja se pasaba durante su actuación, provocando la muerte de ambos."}, {"title": "Un hombre inocente", "snippet": "Igor entra en casa de Tomás para matarlo. Finalmente no lo mata. Sin embargo, es detenido y condenado por asesinato. ¿Cómo es posible?", "solution": "Igor era un asesino a sueldo. Quien lo contrató ideó un plan para deshacerse también de Igor: contrató a un segundo asesino que mató a Tomás antes de que llegara Igor. Cuando Igor entró, Tomás ya estaba muerto y la policía esperaba para detenerlo."}, {"title": "El mecánico", "snippet": "Un hombre pregunta al mecánico cuándo tiene disponibilidad: dos horas, no vuelve. Una hora, no vuelve. Cinco minutos, se va igualmente. ¿Por qué?", "solution": "El hombre tenía una aventura con la mujer del mecánico y quería saber cuánto tiempo podía pasar con ella sin riesgo de que el marido volviera a casa."}, {"title": "Un buen plan", "snippet": "Cinco hombres, tras planificarlo con detalle, entran en una casa y se llevan miles de dólares. El propietario de la casa es el único arrestado. ¿Qué ocurrió?", "solution": "Los cinco hombres eran policías con una orden judicial para registrar la casa de un mafioso y requisar el dinero. Detuvieron al dueño."}, {"title": "Que siga la fiesta", "snippet": "Un hombre deja su trabajo y celebra una fiesta durante toda la noche. Al día siguiente se viste y, poco después, salta desde el balcón de su casa. ¿Qué ocurrió?", "solution": "Al hombre le tocó la lotería, se despidió del trabajo y lo celebró. Al día siguiente se vistió para cobrar el premio y descubrió que había destrozado el resguardo del boleto al lavar su traje en la tintorería."}, {"title": "Demasiado tarde", "snippet": "Una mujer va corriendo por un pasillo cuando, de repente, se detiene y con lágrimas en los ojos se da la vuelta. ¿Qué ocurrió?", "solution": "Era abogada y había conseguido el indulto para su cliente condenado a muerte. Corría hacia la sala de la silla eléctrica para detener la ejecución cuando vio que las luces del pasillo parpadeaban: era demasiado tarde."}, {"title": "Una gran oportunidad", "snippet": "Una coleccionista de monedas encuentra en Internet una colección auténtica a precio muy atractivo, la compra, pero está enfadada. ¿Por qué?", "solution": "La mujer del coleccionista, enfadada por una infidelidad, puso a la venta la colección de monedas de su marido a precio de saldo. Él vio el anuncio y tuvo que comprar sus propias monedas para que nadie más se las quedara."}, {"title": "El último mensaje", "snippet": "Un hombre muere en Navidad tras recibir un mensaje de texto. ¿Qué ocurrió?", "solution": "El hombre era un terrorista que preparaba una bomba activada por mensaje de texto. Mientras le daba los últimos retoques en casa, recibió un mensaje de felicitaciones de su compañía telefónica y la bomba explotó."}, {"title": "El disparo", "snippet": "Un hombre realiza un disparo en plena calle. Muchas personas salen corriendo. Al cabo de un rato una ambulancia se lleva a un herido, pero nadie detiene al hombre. ¿Por qué?", "solution": "El hombre disparó para dar comienzo a una maratón. Uno de los corredores se lesionó al empezar la carrera."}, {"title": "La detective", "snippet": "Una mujer le hace preguntas acerca de una muerte extraña a un amigo policía. Pasados cinco minutos, el policía queda sorprendido al ver que la mujer averigua el motivo de la muerte. ¿Qué ocurrió?", "solution": "La mujer y el policía eran amigos y estaban jugando Dark Stories. El policía leyó una historia pensando que su amiga no podría resolverla, pero quedó muy sorprendido cuando ella dio con la solución en pocas preguntas."}, {"title": "La biblioteca", "snippet": "En el instituto Inverness Royal Academy hay una biblioteca con una sección prohibida. La mañana del 31 de octubre, durante el recreo, Lizzie se acercó a esa sección. Tras el recreo, nadie volvió a ver a Lizzie. ¿Qué le pasó?", "solution": "Lizzie cogió un libro titulado \"El arte de la nigromancia\" y la estantería se abrió revelando una sala oculta. Entró sin darse cuenta de que la estantería volvía a cerrarse tras ella. Quedó emparedada, sin poder salir hasta que alguien volviera a coger ese mismo libro."}, {"title": "Una dieta especial", "snippet": "Un famoso colegio de Nueva York es noticia porque, de vez en cuando, un alumno muere envenenado. Los forenses encontraron veneno en un croissant y narcóticos en batidos de chocolate. Alguien quería deshacerse de ciertos alumnos. ¿Por qué?", "solution": "El dueño de la cafetería odiaba la obesidad. Su mujer había muerto por exceso de grasa. Envenenaba a los alumnos con sobrepeso que seguían comiendo mal, introduciendo venenos en productos ultraprocesados."}, {"title": "Un pasado aterrador", "snippet": "Gerardo, estudiante de tarde, se quedó ordenando su material tras las clases. Al salir por el pasillo, una voz ronca lo llamó por su nombre desde la oscuridad. Gerardo se dio la vuelta pero no vio nada. ¿Quién lo llamó y por qué?", "solution": "El instituto fue construido sobre las ruinas de un antiguo cementerio. Al anochecer, los espíritus que habitaban ese cementerio toman el instituto como morada. Con el tiempo han aprendido los nombres de los alumnos y esperan que pronto puedan acompañarles."}, {"title": "Olores fétidos", "snippet": "Cada año desaparecía un niño del orfanato de Newcastle en octubre. Los profesores huían traumatizados cada curso, excepto el de Física y Química, que repetía año tras año. ¿Por qué? ¿Qué ocurría en el centro?", "solution": "El profesor de Física y Química estaba obsesionado con los perfumes humanos. Cada curso elegía al alumno con el aroma más especial, lo secuestraba, lo metía en formol y lo disolvía en ácido para añadir su fragancia a su colección de frascos."}, {"title": "A cuchillo muere", "snippet": "El conserje de un instituto de Oxford apareció la mañana del 31 de octubre descuartizado en el hall. Su asesino había utilizado cuchillas. ¿Qué ocurrió?", "solution": "El conserje Sam se negó a plastificar y recortar un material sobre los reyes más sanguinolentos de Inglaterra que le pidió el profesor de Historia para Halloween. El profesor, enfurecido, cogió la cuchilla de la plastificadora y lo mató."}, {"title": "En shock", "snippet": "Un colegio de Exeter es famoso por los excelentes resultados de sus alumnos. Este curso han fallecido dos estudiantes en extrañas circunstancias. El colegio atribuyó sus muertes a fallos cardíacos, pero mentía. ¿Qué ocurría realmente?", "solution": "El director aplicaba corrientes eléctricas en el cerebro de sus alumnos para estimular su inteligencia. Funcionaba, pero dos alumnos recibieron más corriente de la cuenta y murieron de infarto."}, {"title": "¿Quieres jugar conmigo?", "snippet": "Nadie se atrevía a entrar solo en el salón de artes del instituto. Un día Ángela aceptó el desafío y subió. Al poco tiempo oyeron un grito. Nadie volvió a saber nada de Ángela. ¿Qué le ocurrió?", "solution": "Una niña había muerto allí y se aparecía cuando alguien llegaba. Ángela, escéptica, escribió en la pizarra \"¿Quieres jugar conmigo?\" para poner a prueba el rumor. Al girarse, una niña con el uniforme ensangrentado respondió: \"sí, quiero\"."}, {"title": "Nadie comprendió su decisión", "snippet": "Los conserjes pidieron al director que cerrara el aula 28A y la convirtiera en almacén. ¿Por qué nadie quería que los alumnos entraran en esa aula?", "solution": "La profesora Blake se ahorcó en el aula 28A el último día de clase de 2005. Estuvo dos días colgada hasta que la encontraron. Desde entonces, la profesora se aparece como fantasma cada vez que un alumno entra en esa aula."}, {"title": "Un reflejo aterrador", "snippet": "Diana pidió ir al baño en clase de Historia. Tardó 30 minutos en volver. Llegó sollozando, aterrorizada y con la cara desencajada. ¿Qué le ocurrió durante esos 30 minutos?", "solution": "Diana fue a los baños de la tercera planta. En el espejo apareció el rostro de una niña desdentada. Al girarse, la niña había desaparecido. Una corriente de aire cerró la puerta dejándola atrapada. El fantasma intentó meterla en un retrete, pero consiguió escapar."}, {"title": "Agua bendita", "snippet": "En un colegio religioso, dos monjas oyeron gritar a una alumna desconsoladamente. La buscaron y la encontraron inconsciente y llena de arañazos. ¿Qué le había pasado a la niña?", "solution": "Maggie fue a rezar a la capilla el 31 de octubre. La puerta se atrancó durante horas. Desde fuera oyeron risas, gritos y llantos. La directora llegó con agua bendita: el diablo se había personificado en la capilla a través de los cuadros y tuvieron que realizar un exorcismo."}];

const WINS_TO_WIN = 5;

const S = {
  app: { background: "#1c1917", minHeight: "100vh", color: "#ede8de", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 16px 60px" },
  screen: { width: "100%", maxWidth: 600, marginTop: 48, display: "flex", flexDirection: "column", gap: 16 },
  h1: { fontFamily: "Georgia, serif", fontSize: "clamp(2rem,7vw,3.2rem)", color: "#c9a84c", textAlign: "center", letterSpacing: -1, margin: 0 },
  mono: { fontFamily: "'Courier New', monospace" },
  school: { fontSize: "0.62rem", color: "#6e6555", letterSpacing: 1, textAlign: "center", marginTop: 4, fontFamily: "'Courier New', monospace" },
  sub: { fontSize: "0.62rem", letterSpacing: 4, textTransform: "uppercase", color: "#6e6555", textAlign: "center", margin: 0, fontFamily: "'Courier New', monospace" },
  card: { background: "#242018", border: "1px solid #3a3428", padding: "24px 26px", position: "relative" },
  cardTop: { position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#c9a84c" },
  cardLabel: { fontSize: "0.58rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 14, fontFamily: "'Courier New', monospace" },
  step: { display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 },
  stepNum: { fontSize: "1.3rem", fontWeight: 700, color: "#c9a84c", minWidth: 18, lineHeight: 1 },
  stepText: { fontSize: "0.8rem", lineHeight: 1.75, color: "#ede8de", fontFamily: "'Courier New', monospace" },
  pillsRow: { display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" },
  pill: (c) => ({ padding: "6px 14px", border: `1px solid ${c}`, color: c, background: c + "14", fontStyle: "italic", fontWeight: 700, fontSize: "0.78rem" }),
  goalBanner: { background: "#242018", border: "1px solid #c9a84c", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14 },
  goalTrophy: { fontSize: "1.6rem" },
  goalText: { fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.5 },
  btnGold: { background: "#c9a84c", color: "#1c1917", border: "none", padding: 15, width: "100%", fontFamily: "'Courier New', monospace", fontSize: "0.72rem", letterSpacing: 4, textTransform: "uppercase", cursor: "pointer" },
  btnOutline: { background: "none", border: "1px solid #3a3428", color: "#6e6555", padding: "6px 14px", fontFamily: "'Courier New', monospace", fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  scoreBar: { display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginTop: 4 },
  scoreBox: { background: "#242018", border: "1px solid #3a3428", padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 },
  scoreLabel: { fontSize: "0.58rem", letterSpacing: 3, textTransform: "uppercase", color: "#6e6555", fontFamily: "'Courier New', monospace" },
  scoreSep: { width: 1, height: 26, background: "#3a3428" },
  scoreNum: { fontSize: "1.8rem", fontWeight: 700, color: "#c9a84c", lineHeight: 1, minWidth: "2ch", textAlign: "center" },
  pickCard: (hover) => ({ background: hover ? "#2b2619" : "#242018", border: `1px solid ${hover ? "#c9a84c" : "#3a3428"}`, padding: "16px 44px 16px 20px", cursor: "pointer", position: "relative", transition: "all 0.2s", marginBottom: 8 }),
  pickTitle: { fontSize: "0.6rem", letterSpacing: 3, textTransform: "uppercase", color: "#c9a84c", marginBottom: 6, fontFamily: "'Courier New', monospace" },
  pickText: { fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.7, color: "#ede8de" },
  pickArrow: { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6e6555", fontSize: "1rem" },
  enigmaCard: { background: "#242018", border: "1px solid #3a3428", borderBottom: "none", padding: "20px 22px 16px", position: "relative" },
  enigmaEyebrow: { fontSize: "0.55rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8, fontFamily: "'Courier New', monospace" },
  enigmaText: { fontSize: "0.98rem", fontStyle: "italic", lineHeight: 1.8 },
  gameFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, paddingTop: 12, borderTop: "1px solid #3a3428" },
  counter: { fontSize: "0.6rem", color: "#6e6555", fontFamily: "'Courier New', monospace" },
  chat: { background: "#242018", border: "1px solid #3a3428", borderBottom: "none", minHeight: 200, maxHeight: "40vh", overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 },
  chatPlaceholder: { margin: "auto", textAlign: "center", fontSize: "0.7rem", color: "#6e6555", fontStyle: "italic", lineHeight: 2 },
  msgPlayer: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 },
  msgOracle: { display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 },
  msgWho: { fontSize: "0.52rem", letterSpacing: 3, textTransform: "uppercase", color: "#6e6555", padding: "0 3px", fontFamily: "'Courier New', monospace" },
  bubblePlayer: { maxWidth: "82%", padding: "9px 14px", fontSize: "0.8rem", lineHeight: 1.6, background: "#2e2920", border: "1px solid #3a3428", fontFamily: "'Courier New', monospace" },
  bubbleYes: { maxWidth: "82%", padding: "9px 16px", fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", borderLeft: "3px solid #72b472", color: "#72b472", background: "rgba(114,180,114,0.08)" },
  bubbleNo: { maxWidth: "82%", padding: "9px 16px", fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", borderLeft: "3px solid #c95f5f", color: "#c95f5f", background: "rgba(201,95,95,0.08)" },
  bubbleMaybe: { maxWidth: "82%", padding: "9px 16px", fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", borderLeft: "3px solid #c9a84c", color: "#c9a84c", background: "rgba(201,168,76,0.08)" },
  bubbleWin: { maxWidth: "82%", padding: "9px 16px", fontStyle: "italic", fontWeight: 700, fontSize: "0.9rem", borderLeft: "3px solid #c9a84c", color: "#c9a84c", background: "rgba(201,168,76,0.1)", lineHeight: 1.6 },
  thinkingBar: { height: 2, background: "#3a3428", overflow: "hidden" },
  inputRow: { display: "flex", border: "1px solid #3a3428" },
  input: { flex: 1, background: "#242018", border: "none", borderRight: "1px solid #3a3428", color: "#ede8de", padding: "13px 15px", fontFamily: "'Courier New', monospace", fontSize: "0.8rem", outline: "none" },
  btnAsk: (disabled) => ({ background: disabled ? "#3a3428" : "#ede8de", color: disabled ? "#6e6555" : "#1c1917", border: "none", padding: "13px 18px", fontFamily: "'Courier New', monospace", fontSize: "0.65rem", letterSpacing: 2, textTransform: "uppercase", cursor: disabled ? "not-allowed" : "pointer", whiteSpace: "nowrap" }),
  hintRow: { textAlign: "center", fontSize: "0.56rem", color: "#6e6555", letterSpacing: 2, paddingTop: 8, fontFamily: "'Courier New', monospace" },
  btnGiveup: { background: "none", border: "1px solid #3a3428", color: "#6e6555", padding: 11, width: "100%", fontFamily: "'Courier New', monospace", fontSize: "0.6rem", letterSpacing: 2, textTransform: "uppercase", cursor: "pointer" },
  reveal: { background: "#221e14", border: "1px solid #c9a84c", padding: "16px 20px" },
  revealLabel: { fontSize: "0.52rem", letterSpacing: 4, textTransform: "uppercase", color: "#c9a84c", marginBottom: 8, fontFamily: "'Courier New', monospace" },
  revealText: { fontSize: "0.9rem", fontStyle: "italic", lineHeight: 1.85 },
  overlay: { position: "fixed", inset: 0, zIndex: 100, background: "rgba(20,17,12,0.93)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 },
  overlayBox: { background: "#242018", border: "1px solid #c9a84c", maxWidth: 460, width: "100%", textAlign: "center", padding: "40px 28px 32px", position: "relative" },
  overlayLine: { position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(to right, transparent, #c9a84c, transparent)" },
  overlayIcon: { fontSize: "2.2rem", display: "block", marginBottom: 16 },
  overlayTitle: { fontSize: "clamp(1.8rem,6vw,2.6rem)", fontWeight: 700, color: "#c9a84c", marginBottom: 6 },
  overlaySub: { fontSize: "0.6rem", letterSpacing: 4, textTransform: "uppercase", color: "#6e6555", marginBottom: 18, fontFamily: "'Courier New', monospace" },
  overlayCount: { fontSize: "0.76rem", color: "#6e6555", marginBottom: 18, lineHeight: 1.8, fontFamily: "'Courier New', monospace" },
  overlaySolution: { background: "#1a1710", borderLeft: "3px solid #c9a84c", padding: "12px 16px", marginBottom: 18, textAlign: "left" },
  overlaySolLabel: { fontSize: "0.5rem", letterSpacing: 3, textTransform: "uppercase", color: "#c9a84c", marginBottom: 6, fontFamily: "'Courier New', monospace" },
  overlaySolText: { fontSize: "0.86rem", fontStyle: "italic", lineHeight: 1.75 },
  overlayCountdown: { fontSize: "0.6rem", color: "#6e6555", letterSpacing: 2, minHeight: "1.4em", marginBottom: 4, fontFamily: "'Courier New', monospace" },
  championScore: { fontSize: "4rem", fontWeight: 700, color: "#c9a84c", lineHeight: 1 },
  championScoreLabel: { fontSize: "0.6rem", letterSpacing: 3, textTransform: "uppercase", color: "#6e6555", marginBottom: 28, marginTop: 4, fontFamily: "'Courier New', monospace" },
};

function ThinkingBar({ active }) {
  return (
    <div style={S.thinkingBar}>
      {active && <style>{`@keyframes scan{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}.tf{width:35%;height:100%;background:#c9a84c;animation:scan 1s infinite ease-in-out}`}</style>}
      {active && <div className="tf" />}
    </div>
  );
}

function PickCard({ enigma, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={S.pickCard(hover)} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={S.pickTitle}>{enigma.title}</div>
      <div style={S.pickText}>{enigma.snippet}</div>
      <div style={S.pickArrow}>→</div>
    </div>
  );
}

function Message({ role, text, type }) {
  const isPlayer = role === "player";
  const bubble = isPlayer ? S.bubblePlayer : type === "yes" ? S.bubbleYes : type === "no" ? S.bubbleNo : type === "win" ? S.bubbleWin : S.bubbleMaybe;
  return (
    <div style={isPlayer ? S.msgPlayer : S.msgOracle}>
      <div style={S.msgWho}>{isPlayer ? "tú" : "oráculo"}</div>
      <div style={bubble}>{text}</div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("instructions");
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [total, setTotal] = useState(0);
  const [over, setOver] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [question, setQuestion] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [countdown, setCountdown] = useState("");
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const cdRef = useRef(null);
  const scoreRef = useRef(0);

  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [messages]);
  useEffect(() => { if (screen === "game" && inputRef.current) setTimeout(() => inputRef.current.focus(), 100); }, [screen]);

  function startGame(enigma) {
    if (cdRef.current) clearInterval(cdRef.current);
    setCurrent(enigma); setMessages([]); setHistory([]); setTotal(0);
    setOver(false); setThinking(false); setQuestion(""); setRevealed(false);
    setOverlay(null); setCountdown(""); setScreen("game");
  }

  function startCountdown(secs, cb) {
    if (cdRef.current) clearInterval(cdRef.current);
    let r = secs;
    setCountdown("Volviendo en " + r + "...");
    cdRef.current = setInterval(() => {
      r--;
      if (r <= 0) { clearInterval(cdRef.current); cdRef.current = null; setCountdown(""); cb(); }
      else setCountdown("Volviendo en " + r + "...");
    }, 1000);
  }

  async function ask() {
    if (over || thinking) return;
    const q = question.trim();
    if (!q) return;
    setQuestion(""); setThinking(true);
    const newHistory = [...history, { role: "user", content: q }];
    setHistory(newHistory);
    setTotal(t => t + 1);
    setMessages(m => [...m, { role: "player", text: q, type: "" }]);

    const sys = "Eres el árbitro de un juego de deducción de historias misteriosas.\n\n" +
      "El jugador ve este enigma:\n\"" + current.snippet + "\"\n\n" +
      "La solución real (secreta):\n\"" + current.solution + "\"\n\n" +
      "REGLAS: Responde ÚNICAMENTE con una de estas cuatro opciones exactas, sin añadir nada más:\n" +
      "- \"Sí\"\n- \"No\"\n- \"Quizás\" (si es parcialmente cierto o ambiguo)\n" +
      "- \"No es relevante\" (si la pregunta no tiene relación con la solución)\n\n" +
      "EXCEPCIÓN: Si el jugador identifica el elemento clave del misterio, responde únicamente: \"¡Lo has descubierto!\"\n" +
      "Sé generoso: basta con que mencione la idea principal.\n" +
      "Basa tus respuestas SOLO en la solución real.";

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: sys, messages: newHistory })
      });
      setThinking(false);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setMessages(m => [...m, { role: "oracle", text: "⚠ Error " + res.status + (err.error?.message ? ": " + err.error.message : ""), type: "maybe" }]);
        return;
      }
      const data = await res.json();
      const ans = (data.content?.[0]?.text || "⚠ Sin respuesta").trim();
      setHistory(h => [...h, { role: "assistant", content: ans }]);
      const low = ans.toLowerCase();
      let type = "maybe";
      if (low === "sí" || low === "si") type = "yes";
      else if (low === "no") type = "no";
      else if (low.includes("descubierto")) {
        setOver(true);
        setMessages(m => [...m, { role: "oracle", text: ans, type: "win" }]);
        setTimeout(() => {
          const ns = scoreRef.current + 1;
          setScore(ns);
          setOverlay("win");
          if (ns >= WINS_TO_WIN) startCountdown(3, () => setOverlay("champion"));
          else startCountdown(4, () => { setOverlay(null); setScreen("pick"); });
        }, 900);
        return;
      }
      setMessages(m => [...m, { role: "oracle", text: ans, type }]);
    } catch (e) {
      setThinking(false);
      setMessages(m => [...m, { role: "oracle", text: "⚠ Error: " + e.message, type: "maybe" }]);
    }
  }

  if (screen === "instructions") return (
    <div style={S.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={S.screen}>
        <h1 style={S.h1}>Historias de misterio</h1>
        <p style={S.school}>Computación y Robótica · IES José Saramago (Humilladero)</p>
        <div style={S.card}>
          <div style={S.cardTop} />
          <div style={S.cardLabel}>Cómo se juega</div>
          {[
            ["El grupo elige un enigma. El narrador lo ", "lee en voz alta", " para todos."],
            ["Los jugadores hacen preguntas que solo se respondan con ", "Sí, No o Quizás", "."],
            ["Cuando alguien crea saber la respuesta, la formula como pregunta. Si acierta, el equipo ", "gana un punto", "."],
            ["Si el grupo no avanza, puede pulsar ", "\"Me rindo\"", " para ver la solución."]
          ].map(([a, b, c], i) => (
            <div key={i} style={S.step}>
              <div style={S.stepNum}>{i + 1}</div>
              <div style={S.stepText}>{a}<strong style={{ color: "#c9a84c", fontWeight: 400 }}>{b}</strong>{c}</div>
            </div>
          ))}
          <div style={S.pillsRow}>
            {[["#72b472", "Sí"], ["#c95f5f", "No"], ["#c9a84c", "Quizás"], ["#c9a84c", "No es relevante"]].map(([c, t]) =>
              <div key={t} style={S.pill(c)}>{t}</div>
            )}
          </div>
        </div>
        <div style={S.goalBanner}>
          <div style={S.goalTrophy}>🏆</div>
          <div style={S.goalText}>El primero en resolver <strong style={{ color: "#c9a84c", fontStyle: "normal" }}>5 misterios</strong> gana la partida.</div>
        </div>
        <button style={S.btnGold} onClick={() => setScreen("pick")}>Comenzar a jugar →</button>
      </div>
    </div>
  );

  if (screen === "pick") return (
    <div style={S.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={S.screen}>
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8 }}>
          <h1 style={S.h1}>Historias de misterio</h1>
          <p style={{ ...S.sub, margin: 0 }}>Elige un enigma · <span style={{ color: "#c9a84c" }}>5 puntos para ganar</span></p>
          <div style={S.scoreBar}>
            <div style={S.scoreBox}>
              <div style={S.scoreLabel}>Puntos</div>
              <div style={S.scoreSep} />
              <div style={S.scoreNum}>{score}</div>
            </div>
            <button style={S.btnOutline} onClick={() => { if (window.confirm("¿Reiniciar el marcador a 0?")) setScore(0); }}>Reiniciar</button>
          </div>
        </div>
        {ENIGMAS.map((e, i) => <PickCard key={i} enigma={e} onClick={() => startGame(e)} />)}
      </div>
    </div>
  );

  return (
    <div style={S.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={S.screen}>
        <div style={S.enigmaCard}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "#c9a84c" }} />
          <div style={S.enigmaEyebrow}>{current?.title}</div>
          <div style={S.enigmaText}>{current?.snippet}</div>
          <div style={S.gameFooter}>
            <div style={S.counter}>{total} pregunta{total !== 1 ? "s" : ""}</div>
            <button style={S.btnOutline} onClick={() => setScreen("pick")}>← Otros enigmas</button>
          </div>
        </div>
        <div style={S.chat} ref={chatRef}>
          {messages.length === 0 && <div style={S.chatPlaceholder}>Haz preguntas de sí o no<br />para descubrir qué ocurrió.</div>}
          {messages.map((m, i) => <Message key={i} role={m.role} text={m.text} type={m.type} />)}
        </div>
        <ThinkingBar active={thinking} />
        <div style={S.inputRow}>
          <input ref={inputRef} style={S.input} value={question} onChange={e => setQuestion(e.target.value)}
            onKeyDown={e => e.key === "Enter" && ask()} placeholder="¿El hombre conocía al camarero?"
            maxLength={300} disabled={over || thinking} />
          <button style={S.btnAsk(over || thinking)} onClick={ask} disabled={over || thinking}>Preguntar</button>
        </div>
        <div style={S.hintRow}>Respuestas posibles: Sí · No · Quizás · No es relevante</div>
        {!over && !revealed && <button style={S.btnGiveup} onClick={() => setRevealed(true)}>Me rindo — ver la solución</button>}
        {revealed && <div style={S.reveal}><div style={S.revealLabel}>La solución</div><p style={S.revealText}>{current?.solution}</p></div>}

        {overlay === "win" && (
          <div style={S.overlay}><div style={S.overlayBox}>
            <div style={S.overlayLine} />
            <span style={S.overlayIcon}>★</span>
            <div style={S.overlayTitle}>¡Lo has descubierto!</div>
            <div style={S.overlaySub}>{score} de {WINS_TO_WIN} puntos</div>
            <div style={S.overlayCount}>Has necesitado <strong>{total} pregunta{total !== 1 ? "s" : ""}</strong> para resolverlo.</div>
            <div style={S.overlaySolution}>
              <div style={S.overlaySolLabel}>La solución</div>
              <div style={S.overlaySolText}>{current?.solution}</div>
            </div>
            <div style={S.overlayCountdown}>{countdown}</div>
          </div></div>
        )}
        {overlay === "champion" && (
          <div style={S.overlay}><div style={S.overlayBox}>
            <div style={S.overlayLine} />
            <span style={S.overlayIcon}>🏆</span>
            <div style={S.overlayTitle}>¡Campeones!</div>
            <div style={S.overlaySub}>Han resuelto 5 misterios</div>
            <div style={S.championScore}>5</div>
            <div style={S.championScoreLabel}>misterios resueltos</div>
            <button style={S.btnGold} onClick={() => { setScore(0); setOverlay(null); setScreen("instructions"); }}>Jugar de nuevo</button>
          </div></div>
        )}
      </div>
    </div>
  );
}
