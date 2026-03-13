import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';

// ── Datos ──────────────────────────────────────────────────────────────────
const ENIGMAS = [
  { title: 'El hombre en el bar', snippet: 'Un hombre entra en un bar y pide un vaso de agua. El camarero saca un arma, apunta al hombre y le da las gracias. El hombre se va feliz. ¿Qué ocurrió?', solution: 'El hombre tenía hipo. El camarero lo asustó con el arma para curárselo, lo cual funcionó y por eso le dio las gracias.' },
  { title: 'El náufrago en el ascensor', snippet: 'Un hombre vive en el piso 10. Cuando sale de casa, toma el ascensor hasta la planta baja. Cuando vuelve, toma el ascensor hasta el piso 7 y sube el resto por las escaleras, a menos que llueva. ¿Por qué?', solution: 'El hombre tiene enanismo y no alcanza el botón del piso 10. Si llueve, usa su paraguas para pulsar el botón.' },
  { title: 'El músico muerto', snippet: 'Tres músicos mueren en un accidente aéreo. Su música se vuelve famosa. ¿Qué ocurrió?', solution: 'Eran componentes de una banda que viajaban juntos y su muerte generó un gran impacto mediático que popularizó su música.' },
  { title: 'Saltando desde un sexto', snippet: 'En el borde de una ventana del sexto piso, una mujer salta. Sin embargo, no se mata ni sufre ningún tipo de secuelas. ¿Qué ocurrió?', solution: 'La mujer estaba a punto de suicidarse pero se lo pensó mejor y en lugar de saltar hacia fuera, saltó hacia dentro de su apartamento.' },
  { title: 'Aquella luz', snippet: 'Al ver una luz, Roger se queda paralizado. Segundos después, muere. ¿Qué ocurrió?', solution: 'Roger era un conejo que se había escapado de la casa donde vivía. Al cruzar la carretera se vio deslumbrado por los faros de un coche y se quedó paralizado. El conductor del coche, que no lo había visto, lo atropelló.' },
  { title: 'La contraseña', snippet: 'En una investigación a la mafia, un detective escucha: ¿Ocho? Cuatro. ¿Catorce? Siete. ¿Dieciocho? Nueve. ¿Veinte? Diez. El detective responde "Diez" y lo matan. ¿Cuál era la respuesta correcta?', solution: 'La respuesta correcta era "Seis". A la pregunta había que responder con el número de letras que tenía la palabra escuchada. "Veinte" tiene 6 letras.' },
  { title: 'Las gafas rotas', snippet: 'Jacobo va corriendo cuando sus gafas caen al suelo. Poco después, encuentra sus gafas y ve que hay un montón de gente muriendo a su alrededor. Aunque su familia acaba de morir, él mantiene una sonrisa en su cara. ¿Por qué?', solution: 'Jacobo trabajaba como payaso en un circo. Al escapar de una estampida de animales tropezó y perdió sus gafas. Estaba triste porque su familia había muerto, pero el maquillaje de payaso le hacía parecer que sonreía.' },
  { title: 'El ahorcado', snippet: 'En una habitación cerrada con llave aparece un hombre ahorcado colgando del techo y no hay ningún otro objeto alrededor. ¿Cómo lo hizo?', solution: 'El hombre se subió sobre un bloque de hielo para ahorcarse. Le dio una patada al bloque y murió. Al cabo de un tiempo, el hielo se derritió y solo quedó un pequeño charco de agua.' },
  { title: 'Una muerte poco corriente', snippet: 'Jaime trabaja en un banco. Un día, se produce un gran apagón en toda la ciudad. A los pocos minutos, Jaime muere electrocutado. ¿Cómo es posible?', solution: 'Jaime era informático y aquel día decidió trabajar en el parque, sentado en un banco. Se produjo una tormenta que provocó el apagón. Cuando iba a marcharse a casa, fue fulminado por un rayo.' },
  { title: 'El último tren', snippet: 'Oscar está sentado leyendo el periódico cuando escucha un ruido. Mira hacia delante y se lamenta por no haber cogido el tren a tiempo. Poco después se suicida. ¿Qué ocurrió?', solution: 'Óscar, arruinado, era coleccionista de trenes y iba a vender su maqueta más valiosa. La había estado limpiando en la mesa pero no la colocó bien. Al sentarse a leer el periódico oyó cómo se deslizaba y se hacía pedazos contra el suelo.' },
  { title: 'Decapitación', snippet: 'Cuando Martín se despertó aquella mañana, le extrañó que la puerta estuviera abierta. En el momento en que se asomó fuera, murió decapitado. ¿Qué ocurrió?', solution: 'Martín era un canario que llevaba 4 meses en su jaula. Silvestre era un gato que esperaba la oportunidad de atraparlo. Cuando su dueño dejó la puerta de la jaula abierta por accidente, el gato le arrancó la cabeza de un bocado.' },
  { title: 'El accidente', snippet: 'Un hombre al volante provoca un accidente chocando contra una moto en un cruce. Cuando llega la policía, se llevan a otro hombre a comisaría y al conductor lo llevan a casa. ¿Por qué?', solution: 'El hombre se estaba sacando el carnet de conducir y su profesor de autoescuela le indicó erróneamente que tomara una calle en dirección prohibida. La policía encontró responsable al profesor.' },
  { title: 'Muerte en el museo', snippet: 'Un hombre con pasamontañas sale corriendo de un museo con un cuadro bajo el brazo. Un policía lo ve y lo mata de un disparo. Poco después, el policía se suicida. A los pocos días, el hombre asesinado es nombrado ciudadano ilustre del pueblo. ¿Qué ocurrió?', solution: 'Había un incendio en el museo. El director fue a salvar el cuadro más valioso. El policía creyó que era un ladrón y lo disparó. Al enterarse de la verdad, el policía se suicidó.' },
  { title: 'El corte de luz', snippet: 'Una mujer está bajando las escaleras en el trabajo cuando se corta la luz. En ese mismo momento se da cuenta de que su marido acaba de morir. ¿Cómo lo sabe?', solution: 'La mujer trabajaba como electricista en un hospital cuyos generadores de emergencia estaban estropeados. Su marido estaba intubado. Cuando se fue la luz supo que él no podría respirar por sí mismo y había muerto.' },
  { title: 'Ahora no', snippet: 'Una mujer está en su casa mirando melancólicamente hacia la calle. Al poco tiempo salta por una ventana. Un segundo después de hacerlo, suena el teléfono y ella se lamenta de haber saltado. ¿Por qué?', solution: 'Tras una catástrofe nuclear, la mujer pensaba que era la única persona que quedaba con vida y decidió suicidarse. Al sonar el teléfono se dio cuenta de que no era así.' },
  { title: 'El testigo del secuestro', snippet: 'Un hombre de negocios es testigo de un secuestro. Sin embargo, cuando se lo cuenta a la policía no le hacen caso. ¿Por qué?', solution: 'Tras salir del dentista con la boca dormida, el hombre no era capaz de hablar correctamente y balbuceaba. Los policías lo confundieron con un borracho.' },
  { title: 'Los dos al suelo', snippet: 'Dos hombres se están golpeando cuando ambos caen fulminados al suelo. ¿Qué ocurrió?', solution: 'Habían secuestrado a la hija de un boxeador para chantajearlo y que perdiera el combate. Al final, su contrincante se desmayó por los golpes y el boxeador, para no ganar, lo imitó tirándose al suelo.' },
  { title: 'Robo sin resolver', snippet: 'Un hombre entra en una farmacia y sale corriendo con el dinero de la caja registradora. La farmacéutica llama a la policía y un agente recupera el dinero. Esa misma tarde los tres van a la comisaría a poner una denuncia por robo. ¿Qué ocurrió?', solution: 'El hombre era el hijo de la farmacéutica. Le habían robado el coche y necesitaba dinero para un taxi. La madre avisó a su marido policía para que lo llevara. Finalmente fueron juntos a denunciar el robo del coche.' },
  { title: 'Doctor, doctor', snippet: 'Un hombre acude al médico para conocer los resultados de unos análisis. No detectan ningún problema de salud, pero se acaba suicidando. ¿Por qué?', solution: 'El paciente sabía que su mujer lo engañaba con alguien cuyo nombre desconocía. Al salir de la consulta vio en el informe médico el nombre del doctor y no había lugar a dudas: era él.' },
  { title: 'Perdido', snippet: 'Jack sale de excursión con su brújula. Tras una larga caminata se detiene a comer, pero al terminar no consigue encontrar el camino de vuelta. ¿Por qué?', solution: 'Jack era científico y trabajaba cerca del Polo Norte. Al salir caminó en dirección Norte, deteniéndose justo en el Polo Norte magnético. Al intentar volver, la brújula no servía de nada: cualquier dirección era Sur.' },
  { title: '¡Al agua patos!', snippet: 'Tomás navega en su pequeño bote cuando su reloj cae por la borda. Pese a ser un experto buceador, no consigue recuperarlo. ¿Por qué?', solution: 'Tomás estaba navegando sobre el Mar Muerto. Debido a la gran concentración de sal, no consiguió hundirse lo suficiente como para recuperar su reloj.' },
  { title: 'Muerte prematura', snippet: 'Un hombre que espera su muerte en los próximos días, muere antes de tiempo. ¿Qué ocurrió?', solution: 'El hombre, enfermo, era donante de órganos. Con su muerte iba a salvar la vida de un millonario. El hijo del millonario, para heredar antes, envenenó al enfermo para inutilizar sus órganos.' },
  { title: 'Asesinato sin sorpresa', snippet: 'Se produce un asesinato pero a nadie le sorprende. ¿Por qué?', solution: 'Unos amigos estaban jugando al juego de mesa Cluedo y ya esperaban la muerte para ponerse a investigar.' },
  { title: 'Pum, pum, pum', snippet: 'Pese a que numerosos testigos vieron que Juan resultó herido tras ser disparado en tres ocasiones, nadie detuvo al autor de los disparos. ¿Por qué?', solution: 'Juan trabajaba como hombre-bala en un circo. En la última de sus 3 actuaciones del día, Juan no aterrizó bien en la red y resultó herido.' },
  { title: 'Cena letal', snippet: 'Una mujer planea matar a su marido durante la cena. Sin embargo, cuando está preparándola, se suicida. ¿Por qué?', solution: 'La mujer quería envenenar la cena con unas pastillas. Al ir a cogerlas vio que no estaban: su hijo pequeño se las había tomado pensando que eran caramelos. Al descubrirlo, se quitó la vida.' },
  { title: 'Menudas visitas', snippet: 'Una mujer mira por la ventana y ve a un hombre con un cuchillo. No le da tiempo a llamar a la policía antes de ser asesinada. ¿Por qué?', solution: 'Era de noche y lo que la mujer vio fue el reflejo en la ventana del asesino que ya estaba dentro de su casa, detrás de ella.' },
  { title: '¿Fuego?', snippet: 'Cuando Pablo salió a bucear, nunca pensó que moriría calcinado. ¿Qué ocurrió?', solution: 'Había un incendio en un bosque cercano. Un hidroavión fue a recoger agua del lago donde buceaba Pablo, lo atrapó sin querer y lo lanzó sobre el incendio.' },
  { title: 'Camarero, una de muerte', snippet: 'Eva se toma un refresco y Julián se toma tres como el de Eva. Solo muere Eva. ¿Por qué?', solution: 'Eva se tomó el refresco más despacio y los hielos, que contenían el veneno, se derritieron en su bebida. Julián se los tomó más rápido, antes de que el hielo se derritiera.' },
  { title: 'El sorteo', snippet: 'Pedro gana el sorteo y se suicida. ¿Qué ocurrió?', solution: 'Aislados por la nieve, un grupo de personas sorteaba quién debía morir para alimentar al resto. Pedro resultó elegido y cumplió su promesa.' },
  { title: 'Fratricidio', snippet: 'Un hombre mata a su hermano delante de algunas personas. Sin embargo, nadie lo denuncia. ¿Por qué?', solution: 'El hombre trabajaba como verdugo y su hermano había sido condenado a muerte.' },
  { title: 'Por una venta', snippet: 'Un comerciante se esfuerza demasiado en conseguir una venta y por eso acaba muriendo. ¿Qué ocurrió?', solution: 'El comerciante vendía chalecos antibalas. Para demostrar la calidad del producto a un cliente, se puso uno e insistió en que le disparara. El cliente falló el tiro y la bala le dio en la cabeza.' },
  { title: 'Muerte con retraso', snippet: 'Carmen nunca pensó que la decisión de viajar en avión le acabaría salvando la vida. ¿Qué ocurrió?', solution: 'Carmen había sido operada recientemente. Al pasar por los arcos detectores de metales del aeropuerto, los rayos-X revelaron que los médicos habían olvidado un bisturí dentro de su cuerpo.' },
  { title: 'Bailen, malditos', snippet: 'Una pareja de bailarines muere durante una competición de baile. ¿Qué ocurrió?', solution: 'Otra pareja muy competitiva puso veneno en la rosa que la pareja se pasaba durante su actuación, provocando la muerte de ambos.' },
  { title: 'Un hombre inocente', snippet: 'Igor entra en casa de Tomás para matarlo. Finalmente no lo mata. Sin embargo, es detenido y condenado por asesinato. ¿Cómo es posible?', solution: 'Igor era un asesino a sueldo. Quien lo contrató también contrató a un segundo asesino que mató a Tomás antes de que llegara Igor. Cuando Igor entró, Tomás ya estaba muerto y la policía esperaba para detenerlo.' },
  { title: 'El mecánico', snippet: 'Un hombre pregunta al mecánico cuándo tiene disponibilidad: dos horas, no vuelve. Una hora, no vuelve. Cinco minutos, se va igualmente. ¿Por qué?', solution: 'El hombre tenía una aventura con la mujer del mecánico y quería saber cuánto tiempo podía pasar con ella sin riesgo de que el marido volviera a casa.' },
  { title: 'Un buen plan', snippet: 'Cinco hombres, tras planificarlo con detalle, entran en una casa y se llevan miles de dólares. El propietario de la casa es el único arrestado. ¿Qué ocurrió?', solution: 'Los cinco hombres eran policías con una orden judicial para registrar la casa de un mafioso y requisar el dinero. Detuvieron al dueño.' },
  { title: 'Que siga la fiesta', snippet: 'Un hombre deja su trabajo y celebra una fiesta durante toda la noche. Al día siguiente se viste y, poco después, salta desde el balcón de su casa. ¿Qué ocurrió?', solution: 'Al hombre le tocó la lotería, se despidió del trabajo y lo celebró. Al día siguiente se vistió para cobrar el premio y descubrió que había destrozado el resguardo del boleto al lavar su traje en la tintorería.' },
  { title: 'Demasiado tarde', snippet: 'Una mujer va corriendo por un pasillo cuando, de repente, se detiene y con lágrimas en los ojos se da la vuelta. ¿Qué ocurrió?', solution: 'Era abogada y había conseguido el indulto para su cliente condenado a muerte. Corría hacia la sala de la silla eléctrica para detener la ejecución cuando vio que las luces del pasillo parpadeaban: era demasiado tarde.' },
  { title: 'Una gran oportunidad', snippet: 'Una coleccionista de monedas encuentra en Internet una colección auténtica a precio muy atractivo, la compra, pero está enfadada. ¿Por qué?', solution: 'La mujer del coleccionista, enfadada por una infidelidad, puso a la venta la colección de monedas de su marido a precio de saldo. Él vio el anuncio y tuvo que comprar sus propias monedas.' },
  { title: 'El último mensaje', snippet: 'Un hombre muere en Navidad tras recibir un mensaje de texto. ¿Qué ocurrió?', solution: 'El hombre era un terrorista que preparaba una bomba activada por mensaje de texto. Mientras le daba los últimos retoques en casa, recibió un mensaje de felicitaciones de su compañía telefónica y la bomba explotó.' },
  { title: 'El disparo', snippet: 'Un hombre realiza un disparo en plena calle. Muchas personas salen corriendo. Al cabo de un rato una ambulancia se lleva a un herido, pero nadie detiene al hombre. ¿Por qué?', solution: 'El hombre disparó para dar comienzo a una maratón. Uno de los corredores se lesionó al empezar la carrera.' },
  { title: 'La detective', snippet: 'Una mujer le hace preguntas acerca de una muerte extraña a un amigo policía. Pasados cinco minutos, el policía queda sorprendido al ver que la mujer averigua el motivo de la muerte. ¿Qué ocurrió?', solution: 'La mujer y el policía eran amigos y estaban jugando Dark Stories. El policía leyó una historia pensando que su amiga no podría resolverla, pero quedó muy sorprendido cuando ella dio con la solución en pocas preguntas.' },
  { title: 'La biblioteca', snippet: 'En el instituto Inverness Royal Academy hay una biblioteca con una sección prohibida. La mañana del 31 de octubre, durante el recreo, Lizzie se acercó a esa sección. Tras el recreo, nadie volvió a ver a Lizzie. ¿Qué le pasó?', solution: 'Lizzie cogió un libro titulado "El arte de la nigromancia" y la estantería se abrió revelando una sala oculta. Entró sin darse cuenta de que la estantería volvía a cerrarse tras ella. Quedó emparedada.' },
  { title: 'Una dieta especial', snippet: 'Un famoso colegio de Nueva York es noticia porque, de vez en cuando, un alumno muere envenenado. Los forenses encontraron veneno en un croissant y narcóticos en batidos de chocolate. ¿Por qué?', solution: 'El dueño de la cafetería odiaba la obesidad. Su mujer había muerto por exceso de grasa. Envenenaba a los alumnos con sobrepeso que seguían comiendo mal.' },
  { title: 'Un pasado aterrador', snippet: 'Gerardo, estudiante de tarde, se quedó ordenando su material tras las clases. Al salir por el pasillo, una voz ronca lo llamó por su nombre desde la oscuridad. Gerardo se dio la vuelta pero no vio nada. ¿Quién lo llamó y por qué?', solution: 'El instituto fue construido sobre las ruinas de un antiguo cementerio. Al anochecer, los espíritus que habitaban ese cementerio toman el instituto como morada y han aprendido los nombres de los alumnos.' },
  { title: 'Olores fétidos', snippet: 'Cada año desaparecía un niño del orfanato de Newcastle en octubre. Los profesores huían traumatizados cada curso, excepto el de Física y Química, que repetía año tras año. ¿Por qué? ¿Qué ocurría en el centro?', solution: 'El profesor de Física y Química estaba obsesionado con los perfumes humanos. Cada curso elegía al alumno con el aroma más especial, lo secuestraba y lo disolvía en ácido para añadir su fragancia a su colección.' },
  { title: 'A cuchillo muere', snippet: 'El conserje de un instituto de Oxford apareció la mañana del 31 de octubre descuartizado en el hall. Su asesino había utilizado cuchillas. ¿Qué ocurrió?', solution: 'El conserje Sam se negó a plastificar y recortar un material sobre los reyes más sanguinolentos de Inglaterra que le pidió el profesor de Historia para Halloween. El profesor, enfurecido, cogió la cuchilla de la plastificadora y lo mató.' },
  { title: 'En shock', snippet: 'Un colegio de Exeter es famoso por los excelentes resultados de sus alumnos. Este curso han fallecido dos estudiantes en extrañas circunstancias. El colegio atribuyó sus muertes a fallos cardíacos, pero mentía. ¿Qué ocurría realmente?', solution: 'El director aplicaba corrientes eléctricas en el cerebro de sus alumnos para estimular su inteligencia. Funcionaba, pero dos alumnos recibieron más corriente de la cuenta y murieron de infarto.' },
  { title: '¿Quieres jugar conmigo?', snippet: 'Nadie se atrevía a entrar solo en el salón de artes del instituto. Un día Ángela aceptó el desafío y subió. Al poco tiempo oyeron un grito. Nadie volvió a saber nada de Ángela. ¿Qué le ocurrió?', solution: 'Una niña había muerto allí y se aparecía cuando alguien llegaba. Ángela, escéptica, escribió en la pizarra "¿Quieres jugar conmigo?" Al girarse, una niña con el uniforme ensangrentado respondió: "sí, quiero".' },
  { title: 'Nadie comprendió su decisión', snippet: 'Los conserjes pidieron al director que cerrara el aula 28A y la convirtiera en almacén. ¿Por qué nadie quería que los alumnos entraran en esa aula?', solution: 'La profesora Blake se ahorcó en el aula 28A el último día de clase de 2005. Estuvo dos días colgada hasta que la encontraron. Desde entonces, la profesora se aparece como fantasma cada vez que un alumno entra en esa aula.' },
  { title: 'Un reflejo aterrador', snippet: 'Diana pidió ir al baño en clase de Historia. Tardó 30 minutos en volver. Llegó sollozando, aterrorizada y con la cara desencajada. ¿Qué le ocurrió durante esos 30 minutos?', solution: 'Diana fue a los baños de la tercera planta. En el espejo apareció el rostro de una niña desdentada. Una corriente de aire cerró la puerta dejándola atrapada. El fantasma intentó meterla en un retrete, pero consiguió escapar.' },
  { title: 'Agua bendita', snippet: 'En un colegio religioso, dos monjas oyeron gritar a una alumna desconsoladamente. La buscaron y la encontraron inconsciente y llena de arañazos. ¿Qué le había pasado a la niña?', solution: 'Maggie fue a rezar a la capilla el 31 de octubre. La puerta se atrancó durante horas. La directora llegó con agua bendita: el diablo se había personificado en la capilla a través de los cuadros y tuvieron que realizar un exorcismo.' },
];

const GOAL = 5;

// ── Estilos ────────────────────────────────────────────────────────────────
const C = {
  gold: '#c9a84c', bg: '#1c1917', surface: '#242018', surface2: '#2e2920',
  border: '#3a3428', text: '#ede8de', muted: '#6e6555',
  yes: '#72b472', no: '#c95f5f',
};

const s = {
  app: { background: C.bg, minHeight: '100vh', color: C.text, fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 16px 80px' },
  wrap: { width: '100%', maxWidth: 600, marginTop: 44, display: 'flex', flexDirection: 'column', gap: 14 },
  h1: { fontFamily: 'Georgia, serif', fontSize: 'clamp(1.9rem,6vw,3rem)', color: C.gold, textAlign: 'center', letterSpacing: -1, margin: 0 },
  school: { fontSize: '0.6rem', color: C.muted, textAlign: 'center', marginTop: 2, fontFamily: 'monospace', letterSpacing: 1 },
  card: { background: C.surface, border: `1px solid ${C.border}`, padding: '22px 24px', position: 'relative' },
  cardLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.gold },
  cardLabel: { fontSize: '0.56rem', letterSpacing: 4, textTransform: 'uppercase', color: C.gold, marginBottom: 12, fontFamily: 'monospace' },
  step: { display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 10 },
  stepN: { fontSize: '1.2rem', fontWeight: 700, color: C.gold, minWidth: 16, lineHeight: 1 },
  stepT: { fontSize: '0.78rem', lineHeight: 1.7, color: C.text, fontFamily: 'monospace' },
  pills: { display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' },
  pill: (c) => ({ padding: '5px 12px', border: `1px solid ${c}`, color: c, background: c + '18', fontStyle: 'italic', fontWeight: 700, fontSize: '0.76rem' }),
  banner: { background: C.surface, border: `1px solid ${C.gold}`, padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12 },
  bannerText: { fontSize: '0.92rem', fontStyle: 'italic', lineHeight: 1.5 },
  btnGold: { background: C.gold, color: C.bg, border: 'none', padding: '14px 20px', width: '100%', fontFamily: 'monospace', fontSize: '0.7rem', letterSpacing: 4, textTransform: 'uppercase', cursor: 'pointer' },
  btnOutline: { background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: '6px 12px', fontFamily: 'monospace', fontSize: '0.58rem', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' },
  scoreBar: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
  scoreBox: { background: C.surface, border: `1px solid ${C.border}`, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 10 },
  scoreLbl: { fontSize: '0.56rem', letterSpacing: 3, textTransform: 'uppercase', color: C.muted, fontFamily: 'monospace' },
  scoreSep: { width: 1, height: 24, background: C.border },
  scoreNum: { fontSize: '1.7rem', fontWeight: 700, color: C.gold, lineHeight: 1, minWidth: '2ch', textAlign: 'center' },
  pickCard: (h) => ({ background: h ? '#2b2619' : C.surface, border: `1px solid ${h ? C.gold : C.border}`, padding: '14px 40px 14px 18px', cursor: 'pointer', position: 'relative', transition: 'all 0.18s' }),
  pickTitle: { fontSize: '0.58rem', letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 5, fontFamily: 'monospace' },
  pickText: { fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.65, color: C.text },
  pickArrow: { position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: C.muted },
  enigmaCard: { background: C.surface, border: `1px solid ${C.border}`, borderBottom: 'none', padding: '18px 20px 14px', position: 'relative' },
  eyebrow: { fontSize: '0.54rem', letterSpacing: 4, textTransform: 'uppercase', color: C.gold, marginBottom: 7, fontFamily: 'monospace' },
  enigmaText: { fontSize: '0.96rem', fontStyle: 'italic', lineHeight: 1.8 },
  gameFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${C.border}` },
  counter: { fontSize: '0.58rem', color: C.muted, fontFamily: 'monospace' },
  chat: { background: C.surface, border: `1px solid ${C.border}`, borderBottom: 'none', minHeight: 180, maxHeight: '38vh', overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 },
  placeholder: { margin: 'auto', textAlign: 'center', fontSize: '0.68rem', color: C.muted, fontStyle: 'italic', lineHeight: 2 },
  msgP: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 },
  msgO: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2 },
  who: { fontSize: '0.5rem', letterSpacing: 3, textTransform: 'uppercase', color: C.muted, padding: '0 3px', fontFamily: 'monospace' },
  bPlayer: { maxWidth: '82%', padding: '8px 13px', fontSize: '0.78rem', lineHeight: 1.6, background: C.surface2, border: `1px solid ${C.border}`, fontFamily: 'monospace' },
  bYes: { maxWidth: '82%', padding: '8px 14px', fontStyle: 'italic', fontWeight: 700, fontSize: '1.25rem', borderLeft: `3px solid ${C.yes}`, color: C.yes, background: 'rgba(114,180,114,0.08)' },
  bNo: { maxWidth: '82%', padding: '8px 14px', fontStyle: 'italic', fontWeight: 700, fontSize: '1.25rem', borderLeft: `3px solid ${C.no}`, color: C.no, background: 'rgba(201,95,95,0.08)' },
  bMaybe: { maxWidth: '82%', padding: '8px 14px', fontStyle: 'italic', fontWeight: 700, fontSize: '1.25rem', borderLeft: `3px solid ${C.gold}`, color: C.gold, background: 'rgba(201,168,76,0.08)' },
  bWin: { maxWidth: '82%', padding: '8px 14px', fontStyle: 'italic', fontWeight: 700, fontSize: '0.88rem', borderLeft: `3px solid ${C.gold}`, color: C.gold, background: 'rgba(201,168,76,0.1)', lineHeight: 1.6 },
  thinkBar: { height: 2, background: C.border, overflow: 'hidden' },
  inputRow: { display: 'flex', border: `1px solid ${C.border}` },
  input: { flex: 1, background: C.surface, border: 'none', borderRight: `1px solid ${C.border}`, color: C.text, padding: '12px 14px', fontFamily: 'monospace', fontSize: '0.78rem', outline: 'none' },
  btnAsk: (d) => ({ background: d ? C.border : C.text, color: d ? C.muted : C.bg, border: 'none', padding: '12px 16px', fontFamily: 'monospace', fontSize: '0.63rem', letterSpacing: 2, textTransform: 'uppercase', cursor: d ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }),
  hint: { textAlign: 'center', fontSize: '0.54rem', color: C.muted, letterSpacing: 2, paddingTop: 7, fontFamily: 'monospace' },
  btnGiveup: { background: 'none', border: `1px solid ${C.border}`, color: C.muted, padding: 10, width: '100%', fontFamily: 'monospace', fontSize: '0.58rem', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer' },
  reveal: { background: '#221e14', border: `1px solid ${C.gold}`, padding: '14px 18px' },
  revealLbl: { fontSize: '0.5rem', letterSpacing: 4, textTransform: 'uppercase', color: C.gold, marginBottom: 7, fontFamily: 'monospace' },
  revealTxt: { fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.8 },
  overlay: { position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(18,15,10,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 },
  oBox: { background: C.surface, border: `1px solid ${C.gold}`, maxWidth: 440, width: '100%', textAlign: 'center', padding: '36px 24px 28px', position: 'relative' },
  oLine: { position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${C.gold}, transparent)` },
  oIcon: { fontSize: '2rem', display: 'block', marginBottom: 14 },
  oTitle: { fontSize: 'clamp(1.7rem,5vw,2.4rem)', fontWeight: 700, color: C.gold, marginBottom: 5 },
  oSub: { fontSize: '0.58rem', letterSpacing: 4, textTransform: 'uppercase', color: C.muted, marginBottom: 16, fontFamily: 'monospace' },
  oCount: { fontSize: '0.74rem', color: C.muted, marginBottom: 16, lineHeight: 1.8, fontFamily: 'monospace' },
  oSolBox: { background: '#1a1710', borderLeft: `3px solid ${C.gold}`, padding: '10px 14px', marginBottom: 16, textAlign: 'left' },
  oSolLbl: { fontSize: '0.48rem', letterSpacing: 3, textTransform: 'uppercase', color: C.gold, marginBottom: 5, fontFamily: 'monospace' },
  oSolTxt: { fontSize: '0.84rem', fontStyle: 'italic', lineHeight: 1.7 },
  oCd: { fontSize: '0.58rem', color: C.muted, letterSpacing: 2, minHeight: '1.4em', marginBottom: 3, fontFamily: 'monospace' },
  champScore: { fontSize: '3.8rem', fontWeight: 700, color: C.gold, lineHeight: 1 },
  champLbl: { fontSize: '0.58rem', letterSpacing: 3, textTransform: 'uppercase', color: C.muted, marginBottom: 24, marginTop: 3, fontFamily: 'monospace' },
};

// ── Componentes pequeños ───────────────────────────────────────────────────
function ThinkBar({ on }) {
  return (
    <div style={s.thinkBar}>
      {on && <style>{`@keyframes sc{0%{transform:translateX(-100%)}100%{transform:translateX(400%)}}.tb{width:35%;height:100%;background:${C.gold};animation:sc 1s infinite ease-in-out}`}</style>}
      {on && <div className="tb" />}
    </div>
  );
}

function PickCard({ enigma, onClick }) {
  const [h, setH] = useState(false);
  return (
    <div style={s.pickCard(h)} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}>
      <div style={s.pickTitle}>{enigma.title}</div>
      <div style={s.pickText}>{enigma.snippet}</div>
      <div style={s.pickArrow}>→</div>
    </div>
  );
}

function Msg({ role, text, type }) {
  const ip = role === 'player';
  const bubble = ip ? s.bPlayer : type === 'yes' ? s.bYes : type === 'no' ? s.bNo : type === 'win' ? s.bWin : s.bMaybe;
  return (
    <div style={ip ? s.msgP : s.msgO}>
      <div style={s.who}>{ip ? 'tú' : 'oráculo'}</div>
      <div style={bubble}>{text}</div>
    </div>
  );
}

// ── App principal ──────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('instructions');
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [hist, setHist] = useState([]);
  const [total, setTotal] = useState(0);
  const [over, setOver] = useState(false);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [overlay, setOverlay] = useState(null);
  const [cd, setCd] = useState('');
  const chatEl = useRef(null);
  const inputEl = useRef(null);
  const cdTimer = useRef(null);
  const scoreSnap = useRef(0);

  useEffect(() => { scoreSnap.current = score; }, [score]);
  useEffect(() => { if (chatEl.current) chatEl.current.scrollTop = chatEl.current.scrollHeight; }, [msgs]);
  useEffect(() => { if (screen === 'game' && inputEl.current) setTimeout(() => inputEl.current.focus(), 80); }, [screen]);

  function startGame(enigma) {
    if (cdTimer.current) clearInterval(cdTimer.current);
    setCurrent(enigma); setMsgs([]); setHist([]); setTotal(0);
    setOver(false); setBusy(false); setQ(''); setRevealed(false);
    setOverlay(null); setCd(''); setScreen('game');
  }

  function countdown(secs, cb) {
    if (cdTimer.current) clearInterval(cdTimer.current);
    let r = secs;
    setCd('Volviendo en ' + r + '...');
    cdTimer.current = setInterval(() => {
      r--;
      if (r <= 0) { clearInterval(cdTimer.current); cdTimer.current = null; setCd(''); cb(); }
      else setCd('Volviendo en ' + r + '...');
    }, 1000);
  }

  async function ask() {
    if (over || busy) return;
    const question = q.trim();
    if (!question) return;

    setQ(''); setBusy(true);
    const newHist = [...hist, { role: 'user', content: question }];
    setHist(newHist);
    setTotal(t => t + 1);
    setMsgs(m => [...m, { role: 'player', text: question, type: '' }]);

    const system =
      'Eres el árbitro de un juego de deducción de historias misteriosas.\n\n' +
      'El jugador ve este enigma:\n"' + current.snippet + '"\n\n' +
      'La solución real (secreta):\n"' + current.solution + '"\n\n' +
      'REGLAS ESTRICTAS — responde ÚNICAMENTE con una de estas cuatro opciones, sin añadir nada más:\n' +
      '- "Sí"\n' +
      '- "No"\n' +
      '- "Quizás" (si es parcialmente cierto o ambiguo)\n' +
      '- "No es relevante" (si la pregunta no tiene relación con la solución)\n\n' +
      'EXCEPCIÓN: Si el jugador identifica el elemento clave del misterio, responde únicamente con: "¡Lo has descubierto!"\n' +
      'Sé generoso al evaluar: basta con que el jugador mencione la idea principal.\n' +
      'Basa tus respuestas SOLO en la solución real. No inventes información adicional.';

    try {
      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system, messages: newHist }),
      });

      setBusy(false);

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error || 'Error ' + res.status;
        setMsgs(m => [...m, { role: 'oracle', text: '⚠ ' + errMsg, type: 'maybe' }]);
        return;
      }

      const ans = data?.content?.[0]?.text || '⚠ Sin respuesta';
      setHist(h => [...h, { role: 'assistant', content: ans }]);

      const low = ans.toLowerCase();
      let type = 'maybe';
      if (low === 'sí' || low === 'si') type = 'yes';
      else if (low === 'no') type = 'no';
      else if (low.includes('descubierto')) {
        setOver(true);
        setMsgs(m => [...m, { role: 'oracle', text: ans, type: 'win' }]);
        setTimeout(() => {
          const ns = scoreSnap.current + 1;
          setScore(ns);
          setOverlay('win');
          if (ns >= GOAL) countdown(3, () => setOverlay('champion'));
          else countdown(4, () => { setOverlay(null); setScreen('pick'); });
        }, 800);
        return;
      }
      setMsgs(m => [...m, { role: 'oracle', text: ans, type }]);

    } catch (err) {
      setBusy(false);
      setMsgs(m => [...m, { role: 'oracle', text: '⚠ Error de red: ' + err.message, type: 'maybe' }]);
    }
  }

  // ── Pantalla instrucciones ─────────────────────────────────────────────
  if (screen === 'instructions') return (
    <div style={s.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={s.wrap}>
        <h1 style={s.h1}>Historias de misterio</h1>
        <p style={s.school}>Computación y Robótica · IES José Saramago (Humilladero)</p>
        <div style={s.card}>
          <div style={s.cardLine} />
          <div style={s.cardLabel}>Cómo se juega</div>
          {[
            ['El grupo elige un enigma. El narrador lo ', 'lee en voz alta', ' para todos.'],
            ['Los jugadores hacen preguntas que solo se respondan con ', 'Sí, No o Quizás', '.'],
            ['Cuando alguien crea saber la respuesta, la formula como pregunta. Si acierta, el equipo ', 'gana un punto', '.'],
            ['Si el grupo no avanza, puede pulsar ', '"Me rindo"', ' para ver la solución.'],
          ].map(([a, b, c], i) => (
            <div key={i} style={s.step}>
              <div style={s.stepN}>{i + 1}</div>
              <div style={s.stepT}>{a}<strong style={{ color: C.gold, fontWeight: 400 }}>{b}</strong>{c}</div>
            </div>
          ))}
          <div style={s.pills}>
            {[['#72b472','Sí'],['#c95f5f','No'],['#c9a84c','Quizás'],['#c9a84c','No es relevante']].map(([c, t]) =>
              <div key={t} style={s.pill(c)}>{t}</div>
            )}
          </div>
        </div>
        <div style={s.banner}>
          <span style={{ fontSize: '1.5rem' }}>🏆</span>
          <div style={s.bannerText}>El primero en resolver <strong style={{ color: C.gold, fontStyle: 'normal' }}>5 misterios</strong> gana la partida.</div>
        </div>
        <button style={s.btnGold} onClick={() => setScreen('pick')}>Comenzar a jugar →</button>
      </div>
    </div>
  );

  // ── Pantalla selección ─────────────────────────────────────────────────
  if (screen === 'pick') return (
    <div style={s.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={s.wrap}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h1 style={s.h1}>Historias de misterio</h1>
          <p style={{ ...s.school, letterSpacing: 3 }}>Elige un enigma · <span style={{ color: C.gold }}>5 puntos para ganar</span></p>
          <div style={s.scoreBar}>
            <div style={s.scoreBox}>
              <div style={s.scoreLbl}>Puntos</div>
              <div style={s.scoreSep} />
              <div style={s.scoreNum}>{score}</div>
            </div>
            <button style={s.btnOutline} onClick={() => { if (window.confirm('¿Reiniciar el marcador a 0?')) setScore(0); }}>Reiniciar</button>
          </div>
        </div>
        {ENIGMAS.map((e, i) => <PickCard key={i} enigma={e} onClick={() => startGame(e)} />)}
      </div>
    </div>
  );

  // ── Pantalla juego ─────────────────────────────────────────────────────
  return (
    <div style={s.app}>
      <Head><title>Historias de misterio</title></Head>
      <div style={s.wrap}>

        <div style={s.enigmaCard}>
          <div style={s.cardLine} />
          <div style={s.eyebrow}>{current?.title}</div>
          <div style={s.enigmaText}>{current?.snippet}</div>
          <div style={s.gameFooter}>
            <div style={s.counter}>{total} pregunta{total !== 1 ? 's' : ''}</div>
            <button style={s.btnOutline} onClick={() => setScreen('pick')}>← Otros enigmas</button>
          </div>
        </div>

        <div style={s.chat} ref={chatEl}>
          {msgs.length === 0 && <div style={s.placeholder}>Haz preguntas de sí o no<br />para descubrir qué ocurrió.</div>}
          {msgs.map((m, i) => <Msg key={i} role={m.role} text={m.text} type={m.type} />)}
        </div>

        <ThinkBar on={busy} />

        <div style={s.inputRow}>
          <input
            ref={inputEl}
            style={s.input}
            value={q}
            onChange={e => setQ(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && ask()}
            placeholder="¿El hombre conocía al camarero?"
            maxLength={300}
            disabled={over || busy}
          />
          <button style={s.btnAsk(over || busy)} onClick={ask} disabled={over || busy}>
            Preguntar
          </button>
        </div>

        <div style={s.hint}>Respuestas posibles: Sí · No · Quizás · No es relevante</div>

        {!over && !revealed && (
          <button style={s.btnGiveup} onClick={() => setRevealed(true)}>
            Me rindo — ver la solución
          </button>
        )}

        {revealed && (
          <div style={s.reveal}>
            <div style={s.revealLbl}>La solución</div>
            <p style={s.revealTxt}>{current?.solution}</p>
          </div>
        )}

        {overlay === 'win' && (
          <div style={s.overlay}>
            <div style={s.oBox}>
              <div style={s.oLine} />
              <span style={s.oIcon}>★</span>
              <div style={s.oTitle}>¡Lo has descubierto!</div>
              <div style={s.oSub}>{score} de {GOAL} puntos</div>
              <div style={s.oCount}>Has necesitado <strong>{total} pregunta{total !== 1 ? 's' : ''}</strong> para resolverlo.</div>
              <div style={s.oSolBox}>
                <div style={s.oSolLbl}>La solución</div>
                <div style={s.oSolTxt}>{current?.solution}</div>
              </div>
              <div style={s.oCd}>{cd}</div>
            </div>
          </div>
        )}

        {overlay === 'champion' && (
          <div style={s.overlay}>
            <div style={s.oBox}>
              <div style={s.oLine} />
              <span style={s.oIcon}>🏆</span>
              <div style={s.oTitle}>¡Campeones!</div>
              <div style={s.oSub}>Han resuelto 5 misterios</div>
              <div style={s.champScore}>5</div>
              <div style={s.champLbl}>misterios resueltos</div>
              <button style={s.btnGold} onClick={() => { setScore(0); setOverlay(null); setScreen('instructions'); }}>
                Jugar de nuevo
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
