const PREF_SONIDOS = "gamelingo-sonidos";

let audioCtx = null;

function obtenerContexto() {
  if (typeof window === "undefined") return null;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioCtx) audioCtx = new AudioContextClass();
  return audioCtx;
}

export function sonidosActivos() {
  return localStorage.getItem(PREF_SONIDOS) !== "off";
}

export function alternarSonidos(activo) {
  localStorage.setItem(PREF_SONIDOS, activo ? "on" : "off");
}

export async function desbloquearAudio() {
  const ctx = obtenerContexto();
  if (ctx?.state === "suspended") {
    await ctx.resume();
  }
}

function tono(frecuencia, duracion, tipo = "sine", volumen = 0.12, cuando = 0) {
  const ctx = obtenerContexto();
  if (!ctx || !sonidosActivos()) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, ctx.currentTime + cuando);
  gain.gain.setValueAtTime(volumen, ctx.currentTime + cuando);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + cuando + duracion);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(ctx.currentTime + cuando);
  osc.stop(ctx.currentTime + cuando + duracion + 0.05);
}

export function reproducirAcierto() {
  tono(523.25, 0.12, "sine", 0.1, 0);
  tono(659.25, 0.14, "sine", 0.1, 0.1);
  tono(783.99, 0.18, "sine", 0.09, 0.22);
}

export function reproducirError() {
  tono(220, 0.1, "square", 0.06, 0);
  tono(185, 0.2, "square", 0.05, 0.12);
}

export function reproducirParCorrecto() {
  tono(440, 0.08, "sine", 0.07, 0);
}

/** Llama sonido y callback según acierto o fallo. */
export async function notificarResultado(esCorrecto, onCorrecto) {
  await desbloquearAudio();
  if (esCorrecto) {
    reproducirAcierto();
    onCorrecto?.();
  } else {
    reproducirError();
  }
}

export async function notificarParCorrecto() {
  await desbloquearAudio();
  reproducirParCorrecto();
}

export async function notificarFallo() {
  await desbloquearAudio();
  reproducirError();
}
