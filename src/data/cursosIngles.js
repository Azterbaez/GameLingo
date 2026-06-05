/**
 * Contenido de cursos básicos de inglés.
 * Estructura: nivel → tema → vocabulario + ejercicios
 */

import { EJERCICIOS_COMPLEJOS_POR_TEMA } from "./ejerciciosComplejos";

function enriquecerTemas(temas) {
  return temas.map((tema) => ({
    ...tema,
    ejercicios: [
      ...tema.ejercicios.map((ej, indice) => ({
        ...ej,
        dificultad: ej.dificultad ?? (indice < 6 ? "basico" : "intermedio"),
      })),
      ...(EJERCICIOS_COMPLEJOS_POR_TEMA[tema.id] ?? []),
    ],
  }));
}

export const NIVELES = [
  {
    id: "a1",
    nombre: "A1 — Principiante",
    descripcion: "Vocabulario esencial y retos de frases, traducción y lectura.",
    icono: "bi-star-fill",
    color: "#f59e0b",
  },
  {
    id: "a2",
    nombre: "A2 — Elemental",
    descripcion: "Temas familiares con ejercicios intermedios y comprensión de textos.",
    icono: "bi-star-half",
    color: "#60a5fa",
  },
];

const TEMAS_A1 = [
  {
    id: "saludos",
    nombre: "Saludos",
    descripcion: "Di hola, adiós y presentarte en inglés.",
    icono: "bi-emoji-smile",
    leccion: {
      titulo: "Saludos básicos",
      resumen:
        "En inglés usamos Hello o Hi para saludar. Good morning (buenos días), Good afternoon (buenas tardes) y Good night (buenas noches) dependen del momento del día.",
      vocabulario: [
        { en: "Hello / Hi", es: "Hola" },
        { en: "Goodbye", es: "Adiós" },
        { en: "Good morning", es: "Buenos días" },
        { en: "Good night", es: "Buenas noches" },
        { en: "Please", es: "Por favor" },
        { en: "Thank you", es: "Gracias" },
        { en: "Nice to meet you", es: "Mucho gusto" },
        { en: "How are you?", es: "¿Cómo estás?" },
      ],
    },
    ejercicios: [
      {
        id: "sal-1",
        tipo: "opcion_multiple",
        titulo: "¿Cómo se dice «Hola»?",
        pregunta: "Elige la traducción correcta:",
        opciones: ["Goodbye", "Hello", "Please", "Night"],
        respuestaCorrecta: 1,
        pista: "Es la palabra más común para saludar.",
      },
      {
        id: "sal-2",
        tipo: "emparejar",
        titulo: "Empareja palabras",
        instruccion: "Une cada palabra en inglés con su significado en español.",
        pares: [
          { en: "Thank you", es: "Gracias" },
          { en: "Please", es: "Por favor" },
          { en: "Goodbye", es: "Adiós" },
        ],
      },
      {
        id: "sal-3",
        tipo: "completar",
        titulo: "Completa la frase",
        frase: "My name ___ Ana.",
        respuesta: "is",
        pista: "Usamos «is» después de «name».",
      },
      {
        id: "sal-4",
        tipo: "opcion_multiple",
        titulo: "Buenos días",
        pregunta: "¿Cómo se dice «Buenos días»?",
        opciones: ["Good night", "Good morning", "Goodbye", "Hello"],
        respuestaCorrecta: 1,
      },
      {
        id: "sal-5",
        tipo: "completar",
        titulo: "Di gracias",
        frase: "___ you very much!",
        respuesta: "Thank",
        pista: "Empieza con la palabra para «gracias».",
      },
      {
        id: "sal-6",
        tipo: "completar",
        titulo: "Despídete",
        frase: "___! See you tomorrow.",
        respuesta: "Goodbye",
        pista: "Palabra para decir adiós.",
      },
      {
        id: "sal-7",
        tipo: "emparejar",
        titulo: "Saludos del día",
        instruccion: "Une el saludo en inglés con su momento del día.",
        pares: [
          { en: "Good morning", es: "Buenos días" },
          { en: "Good afternoon", es: "Buenas tardes" },
          { en: "Good night", es: "Buenas noches" },
        ],
      },
      {
        id: "sal-8",
        tipo: "completar",
        titulo: "Por favor",
        frase: "___, can you help me?",
        respuesta: "Please",
        pista: "Palabra de cortesía antes de pedir algo.",
      },
      {
        id: "sal-9",
        tipo: "opcion_multiple",
        titulo: "Presentación",
        pregunta: "Nice to ___ you!",
        opciones: ["meet", "goodbye", "please", "night"],
        respuestaCorrecta: 0,
      },
      {
        id: "sal-10",
        tipo: "completar",
        titulo: "¿Cómo estás?",
        frase: "How ___ you?",
        respuesta: "are",
        pista: "Verbo «ser/estar» para «you».",
      },
    ],
  },
  {
    id: "numeros",
    nombre: "Números",
    descripcion: "Cuenta del 1 al 10 en inglés.",
    icono: "bi-123",
    leccion: {
      titulo: "Números del 1 al 10",
      resumen:
        "Los números en inglés son regulares del 1 al 10. Practícalos en voz alta: one, two, three...",
      vocabulario: [
        { en: "one", es: "uno" },
        { en: "two", es: "dos" },
        { en: "three", es: "tres" },
        { en: "four", es: "cuatro" },
        { en: "five", es: "cinco" },
        { en: "six", es: "seis" },
        { en: "seven", es: "siete" },
        { en: "eight", es: "ocho" },
        { en: "nine", es: "nueve" },
        { en: "ten", es: "diez" },
      ],
    },
    ejercicios: [
      {
        id: "num-1",
        tipo: "opcion_multiple",
        titulo: "¿Cómo se dice «cinco»?",
        pregunta: "Selecciona la opción correcta:",
        opciones: ["four", "five", "six", "ten"],
        respuestaCorrecta: 1,
      },
      {
        id: "num-2",
        tipo: "emparejar",
        titulo: "Número y palabra",
        instruccion: "Empareja el número con su palabra en inglés.",
        pares: [
          { en: "3", es: "three" },
          { en: "7", es: "seven" },
          { en: "10", es: "ten" },
        ],
      },
      {
        id: "num-3",
        tipo: "completar",
        titulo: "Escribe el número",
        frase: "I have ___ cats. (tengo dos gatos)",
        respuesta: "two",
        pista: "La palabra para «dos» en inglés.",
      },
      {
        id: "num-4",
        tipo: "opcion_multiple",
        titulo: "¿Cuánto es 8?",
        pregunta: "Elige la palabra correcta para el número 8:",
        opciones: ["six", "eight", "nine", "one"],
        respuestaCorrecta: 1,
      },
      {
        id: "num-5",
        tipo: "completar",
        titulo: "Tres manzanas",
        frase: "I see ___ apples. (veo tres manzanas)",
        respuesta: "three",
      },
      {
        id: "num-6",
        tipo: "completar",
        titulo: "Diez dedos",
        frase: "We have ___ fingers. (tenemos diez dedos)",
        respuesta: "ten",
      },
      {
        id: "num-7",
        tipo: "emparejar",
        titulo: "Más números",
        instruccion: "Empareja número con palabra en inglés.",
        pares: [
          { en: "1", es: "one" },
          { en: "4", es: "four" },
          { en: "6", es: "six" },
          { en: "9", es: "nine" },
        ],
      },
      {
        id: "num-8",
        tipo: "completar",
        titulo: "Cinco años",
        frase: "She is ___ years old. (tiene cinco años)",
        respuesta: "five",
        pista: "Palabra para el número 5.",
      },
      {
        id: "num-9",
        tipo: "opcion_multiple",
        titulo: "Orden",
        pregunta: "What comes after six? (¿qué viene después del seis?)",
        opciones: ["five", "seven", "eight", "four"],
        respuestaCorrecta: 1,
      },
      {
        id: "num-10",
        tipo: "completar",
        titulo: "Un perro",
        frase: "I have ___ dog. (tengo un perro)",
        respuesta: "one",
        pista: "Número 1 en inglés.",
      },
    ],
  },
  {
    id: "colores",
    nombre: "Colores",
    descripcion: "Aprende los colores más comunes.",
    icono: "bi-palette",
    leccion: {
      titulo: "Colores básicos",
      resumen: "Los colores van después del verbo «to be»: The sky is blue.",
      vocabulario: [
        { en: "red", es: "rojo" },
        { en: "blue", es: "azul" },
        { en: "green", es: "verde" },
        { en: "yellow", es: "amarillo" },
        { en: "black", es: "negro" },
        { en: "white", es: "blanco" },
      ],
    },
    ejercicios: [
      {
        id: "col-1",
        tipo: "opcion_multiple",
        titulo: "Color del cielo",
        pregunta: "The sky is ___.",
        opciones: ["red", "blue", "green", "yellow"],
        respuestaCorrecta: 1,
      },
      {
        id: "col-2",
        tipo: "emparejar",
        titulo: "Colores",
        instruccion: "Une el color en inglés con su traducción.",
        pares: [
          { en: "red", es: "rojo" },
          { en: "green", es: "verde" },
          { en: "white", es: "blanco" },
        ],
      },
      {
        id: "col-3",
        tipo: "completar",
        titulo: "La hierba",
        frase: "The grass is ___. (la hierba es verde)",
        respuesta: "green",
      },
      {
        id: "col-4",
        tipo: "opcion_multiple",
        titulo: "El sol",
        pregunta: "The sun is ___.",
        opciones: ["black", "yellow", "blue", "white"],
        respuestaCorrecta: 1,
      },
      {
        id: "col-5",
        tipo: "completar",
        titulo: "Noche oscura",
        frase: "The night is ___. (la noche es negra/oscura)",
        respuesta: "black",
        pista: "Color opuesto al blanco.",
      },
      {
        id: "col-6",
        tipo: "completar",
        titulo: "Nieve blanca",
        frase: "The snow is ___.",
        respuesta: "white",
      },
      {
        id: "col-7",
        tipo: "emparejar",
        titulo: "Objetos y colores",
        instruccion: "Une el objeto con su color típico en inglés.",
        pares: [
          { en: "apple", es: "red" },
          { en: "banana", es: "yellow" },
          { en: "sea", es: "blue" },
        ],
      },
      {
        id: "col-8",
        tipo: "completar",
        titulo: "Tomate",
        frase: "A tomato is usually ___.",
        respuesta: "red",
      },
      {
        id: "col-9",
        tipo: "opcion_multiple",
        titulo: "¿Rojo o azul?",
        pregunta: "Blood is ___. (la sangre es...)",
        opciones: ["green", "red", "yellow", "white"],
        respuestaCorrecta: 1,
      },
      {
        id: "col-10",
        tipo: "completar",
        titulo: "Completa la frase",
        frase: "My favorite color is ___. (mi color favorito es azul)",
        respuesta: "blue",
        pista: "Color del cielo.",
      },
    ],
  },
  {
    id: "animales",
    nombre: "Animales",
    descripcion: "Nombres de animales comunes en inglés.",
    icono: "bi-bug",
    leccion: {
      titulo: "Animales que conoces",
      resumen: "Los animales usan artículo a/an: a cat, an elephant. «An» va antes de vocal.",
      vocabulario: [
        { en: "cat", es: "gato" },
        { en: "dog", es: "perro" },
        { en: "bird", es: "pájaro" },
        { en: "fish", es: "pez" },
        { en: "horse", es: "caballo" },
        { en: "cow", es: "vaca" },
      ],
    },
    ejercicios: [
      {
        id: "ani-1",
        tipo: "opcion_multiple",
        titulo: "Mascota común",
        pregunta: "Many people have a pet ___.",
        opciones: ["dog", "car", "house", "book"],
        respuestaCorrecta: 0,
      },
      {
        id: "ani-2",
        tipo: "emparejar",
        titulo: "Animal y traducción",
        instruccion: "Empareja el animal con su nombre en español.",
        pares: [
          { en: "cat", es: "gato" },
          { en: "bird", es: "pájaro" },
          { en: "horse", es: "caballo" },
        ],
      },
      {
        id: "ani-3",
        tipo: "completar",
        titulo: "En la granja",
        frase: "The ___ says moo. (la vaca)",
        respuesta: "cow",
      },
      {
        id: "ani-4",
        tipo: "completar",
        titulo: "En el agua",
        frase: "A ___ swims in the water.",
        respuesta: "fish",
      },
      {
        id: "ani-5",
        tipo: "opcion_multiple",
        titulo: "¿Qué animal?",
        pregunta: "It says «meow».",
        opciones: ["dog", "cat", "cow", "horse"],
        respuestaCorrecta: 1,
      },
      {
        id: "ani-6",
        tipo: "completar",
        titulo: "Artículo",
        frase: "I have ___ elephant. (un elefante — usa «an»)",
        respuesta: "an",
        pista: "Antes de vocal usamos «an».",
      },
      {
        id: "ani-7",
        tipo: "emparejar",
        titulo: "Sonidos",
        instruccion: "Une el animal con lo que hace.",
        pares: [
          { en: "dog", es: "barks" },
          { en: "cat", es: "meows" },
          { en: "bird", es: "sings" },
        ],
      },
      {
        id: "ani-8",
        tipo: "completar",
        titulo: "Mi mascota",
        frase: "I love my pet ___. (mi perro)",
        respuesta: "dog",
      },
    ],
  },
];

const TEMAS_A2 = [
  {
    id: "familia",
    nombre: "La familia",
    descripcion: "Miembros de la familia y posesivos.",
    icono: "bi-people",
    leccion: {
      titulo: "Mi familia",
      resumen:
        "Usamos my (mi), your (tu), his (su de él), her (su de ella) antes del sustantivo: my mother.",
      vocabulario: [
        { en: "mother", es: "madre" },
        { en: "father", es: "padre" },
        { en: "brother", es: "hermano" },
        { en: "sister", es: "hermana" },
        { en: "family", es: "familia" },
      ],
    },
    ejercicios: [
      {
        id: "fam-1",
        tipo: "opcion_multiple",
        titulo: "¿Cómo se dice «madre»?",
        pregunta: "Elige la palabra correcta:",
        opciones: ["father", "mother", "sister", "brother"],
        respuestaCorrecta: 1,
      },
      {
        id: "fam-2",
        tipo: "completar",
        titulo: "Completa",
        frase: "This is my ___. (mi padre)",
        respuesta: "father",
      },
      {
        id: "fam-3",
        tipo: "completar",
        titulo: "Mi hermana",
        frase: "She is my ___.",
        respuesta: "sister",
        pista: "Palabra para hermana.",
      },
      {
        id: "fam-4",
        tipo: "emparejar",
        titulo: "Miembros de la familia",
        instruccion: "Une la palabra en inglés con su traducción.",
        pares: [
          { en: "brother", es: "hermano" },
          { en: "mother", es: "madre" },
          { en: "family", es: "familia" },
        ],
      },
      {
        id: "fam-5",
        tipo: "completar",
        titulo: "Mi hermano",
        frase: "He is my ___.",
        respuesta: "brother",
      },
      {
        id: "fam-6",
        tipo: "opcion_multiple",
        titulo: "Posesivo",
        pregunta: "___ name is Maria. (El nombre de ella es...)",
        opciones: ["His", "Her", "My", "Your"],
        respuestaCorrecta: 1,
      },
      {
        id: "fam-7",
        tipo: "completar",
        titulo: "Mi familia",
        frase: "I love my ___.",
        respuesta: "family",
      },
      {
        id: "fam-8",
        tipo: "completar",
        titulo: "Mi madre",
        frase: "My ___ cooks dinner.",
        respuesta: "mother",
        pista: "Palabra para madre.",
      },
      {
        id: "fam-9",
        tipo: "opcion_multiple",
        titulo: "¿Quién es?",
        pregunta: "Your father's son is your ___.",
        opciones: ["mother", "brother", "sister", "family"],
        respuestaCorrecta: 1,
      },
      {
        id: "fam-10",
        tipo: "completar",
        titulo: "Presentación familiar",
        frase: "This is ___ father. (mi padre)",
        respuesta: "my",
        pista: "Posesivo: «mi».",
      },
    ],
  },
  {
    id: "comida",
    nombre: "Comida",
    descripcion: "Alimentos y bebidas sencillas.",
    icono: "bi-cup-hot",
    leccion: {
      titulo: "En la mesa",
      resumen: "I like + sustantivo: I like pizza. I don't like + sustantivo para negar.",
      vocabulario: [
        { en: "water", es: "agua" },
        { en: "bread", es: "pan" },
        { en: "apple", es: "manzana" },
        { en: "milk", es: "leche" },
        { en: "coffee", es: "café" },
      ],
    },
    ejercicios: [
      {
        id: "com-1",
        tipo: "opcion_multiple",
        titulo: "Bebida",
        pregunta: "I drink ___ every morning.",
        opciones: ["bread", "coffee", "apple", "sister"],
        respuestaCorrecta: 1,
      },
      {
        id: "com-2",
        tipo: "emparejar",
        titulo: "Comida",
        instruccion: "Empareja la palabra con su significado.",
        pares: [
          { en: "water", es: "agua" },
          { en: "apple", es: "manzana" },
          { en: "bread", es: "pan" },
        ],
      },
      {
        id: "com-3",
        tipo: "completar",
        titulo: "Tengo sed",
        frase: "I need some ___. (agua)",
        respuesta: "water",
      },
      {
        id: "com-4",
        tipo: "completar",
        titulo: "Desayuno",
        frase: "I eat ___ for breakfast. (pan)",
        respuesta: "bread",
      },
      {
        id: "com-5",
        tipo: "opcion_multiple",
        titulo: "Fruta",
        pregunta: "An ___ a day keeps the doctor away.",
        opciones: ["apple", "coffee", "water", "bread"],
        respuestaCorrecta: 0,
      },
      {
        id: "com-6",
        tipo: "completar",
        titulo: "Leche",
        frase: "The baby drinks ___.",
        respuesta: "milk",
      },
      {
        id: "com-7",
        tipo: "emparejar",
        titulo: "Comida o bebida",
        instruccion: "Clasifica: ¿es comida sólida o bebida?",
        pares: [
          { en: "coffee", es: "bebida" },
          { en: "bread", es: "comida" },
          { en: "water", es: "bebida" },
        ],
      },
      {
        id: "com-8",
        tipo: "completar",
        titulo: "Me gusta",
        frase: "I ___ apples. (me gustan las manzanas)",
        respuesta: "like",
        pista: "Verbo para «gustar» en afirmativo.",
      },
      {
        id: "com-9",
        tipo: "completar",
        titulo: "No me gusta",
        frase: "I don't ___ coffee. (no me gusta el café)",
        respuesta: "like",
      },
      {
        id: "com-10",
        tipo: "opcion_multiple",
        titulo: "¿Qué es?",
        pregunta: "You make sandwiches with ___.",
        opciones: ["water", "bread", "milk", "coffee"],
        respuestaCorrecta: 1,
      },
    ],
  },
  {
    id: "casa",
    nombre: "La casa",
    descripcion: "Habitaciones y objetos del hogar.",
    icono: "bi-house",
    leccion: {
      titulo: "En mi casa",
      resumen: "There is / There are: There is a bed. There are two chairs.",
      vocabulario: [
        { en: "house", es: "casa" },
        { en: "room", es: "habitación" },
        { en: "kitchen", es: "cocina" },
        { en: "bedroom", es: "dormitorio" },
        { en: "bathroom", es: "baño" },
        { en: "door", es: "puerta" },
      ],
    },
    ejercicios: [
      {
        id: "cas-1",
        tipo: "opcion_multiple",
        titulo: "¿Dónde cocinas?",
        pregunta: "You cook food in the ___.",
        opciones: ["bathroom", "kitchen", "bedroom", "door"],
        respuestaCorrecta: 1,
      },
      {
        id: "cas-2",
        tipo: "emparejar",
        titulo: "Habitaciones",
        instruccion: "Une la habitación con su uso.",
        pares: [
          { en: "bedroom", es: "sleep" },
          { en: "kitchen", es: "cook" },
          { en: "bathroom", es: "shower" },
        ],
      },
      {
        id: "cas-3",
        tipo: "completar",
        titulo: "Mi casa",
        frase: "I live in a ___.",
        respuesta: "house",
      },
      {
        id: "cas-4",
        tipo: "completar",
        titulo: "La puerta",
        frase: "Please close the ___.",
        respuesta: "door",
      },
      {
        id: "cas-5",
        tipo: "completar",
        titulo: "Hay una cama",
        frase: "There ___ a bed in the bedroom.",
        respuesta: "is",
        pista: "Singular: there is.",
      },
      {
        id: "cas-6",
        tipo: "opcion_multiple",
        titulo: "Dormir",
        pregunta: "I sleep in the ___.",
        opciones: ["kitchen", "bedroom", "bathroom", "door"],
        respuestaCorrecta: 1,
      },
      {
        id: "cas-7",
        tipo: "completar",
        titulo: "Habitación",
        frase: "My house has five ___. (habitaciones)",
        respuesta: "rooms",
        pista: "Plural de room.",
      },
      {
        id: "cas-8",
        tipo: "emparejar",
        titulo: "Traducción",
        instruccion: "Une palabra en inglés con español.",
        pares: [
          { en: "kitchen", es: "cocina" },
          { en: "bathroom", es: "baño" },
          { en: "house", es: "casa" },
        ],
      },
    ],
  },
];

export const TEMAS_POR_NIVEL = {
  a1: enriquecerTemas(TEMAS_A1),
  a2: enriquecerTemas(TEMAS_A2),
};

export function obtenerNivel(levelId) {
  return NIVELES.find((n) => n.id === levelId) ?? null;
}

export function obtenerTemas(levelId) {
  return TEMAS_POR_NIVEL[levelId] ?? [];
}

export function obtenerTema(levelId, topicId) {
  return obtenerTemas(levelId).find((t) => t.id === topicId) ?? null;
}

export function obtenerEjercicio(levelId, topicId, exerciseId) {
  const tema = obtenerTema(levelId, topicId);
  if (!tema) return null;
  return tema.ejercicios.find((e) => e.id === exerciseId) ?? null;
}

export { etiquetaTipoEjercicio, iconoTipoEjercicio, infoDificultad } from "../utils/ejercicioUtils";
