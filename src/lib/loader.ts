export const appReadyEvent = "app-ready";

const storageKey = "loader-seen";

/** Jeda antar plate agar tumpukan terbaca walau pekerjaannya sudah selesai. */
const stepGap = 100;
/** Plate terakhir butuh `--duration-short` untuk mendarat. */
const lastPlateRise = 320;
/** Target: mulai terangkat di 0.72s, selesai di 1.2s. */
const liftAt = 720;
/** Batas JS: mulai terangkat paling lambat di 1.52s, selesai di 2s. Failsafe CSS ada di 2.4s. */
const liftLimit = 1520;
/** Sama dengan transisi `.loader` di `globals.css`. */
const liftDuration = 480;

/**
 * Berjalan sebelum paint. Semua status ditulis ke <html> agar tidak ada elemen yang dikelola
 * React berubah sebelum hidrasi. Tanpa JS, reduced motion, atau `saveData`, `data-loader`
 * tidak pernah diset sehingga `.loader` tetap `display: none`.
 *
 * Setiap plate naik saat pekerjaan nyatanya selesai, berurutan: HTML terbaca, font siap,
 * foto LCP ter-decode, aplikasi terhidrasi.
 */
export const loaderScript = `(function(){var r=document.documentElement,d=document,s=r.style;try{if(sessionStorage.getItem(${JSON.stringify(storageKey)})||matchMedia("(prefers-reduced-motion: reduce)").matches||(navigator.connection&&navigator.connection.saveData))return;sessionStorage.setItem(${JSON.stringify(storageKey)},"1")}catch(e){return}var t0=performance.now(),ended=false,limit;r.dataset.loader="run";function wait(ms){return new Promise(function(f){setTimeout(f,ms)})}function on(name){return new Promise(function(f){d.addEventListener(name,f,{once:true})})}function step(n){s.setProperty("--loader-step",n);return wait(${stepGap})}function clear(){delete r.dataset.loader;s.removeProperty("--loader-step")}function end(instant){if(ended)return;ended=true;clearTimeout(limit);d.removeEventListener("click",skip,true);d.removeEventListener("keydown",skip,true);if(instant===true)return clear();r.dataset.loader="lift";setTimeout(clear,${liftDuration})}function skip(){end(true)}d.addEventListener("click",skip,true);d.addEventListener("keydown",skip,true);limit=setTimeout(end,${liftLimit});var app=on(${JSON.stringify(appReadyEvent)});on("DOMContentLoaded").then(function(){return step(1)}).then(function(){return d.fonts.ready}).then(function(){return step(2)}).then(function(){var i=d.querySelector('img[fetchpriority="high"]');return i?i.decode().catch(function(){}):0}).then(function(){return step(3)}).then(function(){return app}).then(function(){s.setProperty("--loader-step",4);return wait(Math.max(${lastPlateRise},${liftAt}-(performance.now()-t0)))}).then(end)})()`;
