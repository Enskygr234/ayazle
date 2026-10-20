"use strict";
// Ayazle — Türkçe kelime oyunu. Fikir ve tasarım: Winterdeveloper.

const HARFLER = new Set(Array.from("abcçdefgğhıijklmnoöprsştuüvyz"));
const KLAVYE = [
  Array.from("ertyuıopğü"),
  Array.from("asdfghjklşi"),
  ["gir", ...Array.from("zcvbnmöç"), "sil"],
];
const DENEME = 6;
const SURE = 120;                          // süreli mod, saniye
const ILK_GUN = Date.UTC(2026, 9, 14);     // 14 Ekim 2026 = 1. gün
const GUN_MS = 86400000;
const SITE = "enskygr234.github.io/ayazle";

const buyuk = s => s.toLocaleUpperCase("tr-TR");
const kucuk = s => s.toLocaleLowerCase("tr-TR");
const $ = id => document.getElementById(id);

// ---------- kayıt ----------
function oku(anahtar, varsayilan) {
  try { const v = localStorage.getItem("ayazle-" + anahtar); return v ? JSON.parse(v) : varsayilan; }
  catch { return varsayilan; }
}
function yaz(anahtar, deger) {
  try { localStorage.setItem("ayazle-" + anahtar, JSON.stringify(deger)); } catch { /* gizli sekme */ }
}

// ---------- gün ve günün kelimesi ----------
// Türkiye saatiyle (UTC+3) bugünün numarası
function bugunNo(simdi = Date.now()) {
  const tr = new Date(simdi + 3 * 3600000);
  return Math.floor((Date.UTC(tr.getUTCFullYear(), tr.getUTCMonth(), tr.getUTCDate()) - ILK_GUN) / GUN_MS) + 1;
}
function sonrakiGuneKalan(simdi = Date.now()) {
  const tr = new Date(simdi + 3 * 3600000);
  const geceYarisi = Date.UTC(tr.getUTCFullYear(), tr.getUTCMonth(), tr.getUTCDate() + 1);
  return geceYarisi - (simdi + 3 * 3600000);
}

// Tohumlu karıştırma: liste her cihazda aynı sırayla dönsün
function karistir(liste, tohum) {
  let a = tohum >>> 0;
  const r = () => {
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const k = liste.slice();
  for (let i = k.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [k[i], k[j]] = [k[j], k[i]]; }
  return k;
}
const GUNLUK_SIRA = {};
for (const n of [4, 5, 6]) GUNLUK_SIRA[n] = karistir(CEVAPLAR[n], 20261014 + n * 7919);
function gununKelimesi(n, gun) {
  const sira = GUNLUK_SIRA[n];
  return sira[(((gun - 1) % sira.length) + sira.length) % sira.length];
}

// ---------- puanlama ----------
// Önce doğru yerdekiler, sonra kalan harf sayısına göre "var"lar: çift harflerde doğru sonuç verir.
function puanla(tahmin, cevap) {
  const t = Array.from(tahmin), c = Array.from(cevap);
  const sonuc = Array(t.length).fill("yok");
  const kalan = {};
  t.forEach((h, i) => { if (h === c[i]) sonuc[i] = "dogru"; else kalan[c[i]] = (kalan[c[i]] || 0) + 1; });
  t.forEach((h, i) => { if (sonuc[i] !== "dogru" && kalan[h] > 0) { sonuc[i] = "var"; kalan[h]--; } });
  return sonuc;
}

// ---------- durum ----------
const ayar = Object.assign({ uzunluk: 5, mod: "gunluk", yardimGoruldu: false, zor: false, kontrast: false, ses: true }, oku("ayar", {}));
let mod = ayar.mod === "sureli" ? "sureli" : "gunluk";
let uzunluk = [4, 5, 6].includes(ayar.uzunluk) ? ayar.uzunluk : 5;
let oyun;            // { cevap, tahminler, yazilan, bitti, kazandi }
let kilit = false;   // açılma animasyonu sürerken girişi durdur
let sureli = null;   // { bitis, puan, bulunanlar, kacanlar, kullanilan, zamanlayici }

function ayarKaydet() {
  yaz("ayar", { uzunluk, mod, yardimGoruldu: ayar.yardimGoruldu, zor: ayar.zor, kontrast: ayar.kontrast, ses: ayar.ses });
}

// ---------- ses ----------
// Dosya yok: kısa tonlar Web Audio ile anında üretilir.
let sesBaglam = null;
function ton(frekans, baslangic = 0, sure = 0.08, tur = "sine", guc = 0.06) {
  if (!ayar.ses) return;
  try {
    sesBaglam = sesBaglam || new (window.AudioContext || window.webkitAudioContext)();
    if (sesBaglam.state === "suspended") sesBaglam.resume();
    const t = sesBaglam.currentTime + baslangic;
    const o = sesBaglam.createOscillator(), g = sesBaglam.createGain();
    o.type = tur; o.frequency.value = frekans;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(guc, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
    o.connect(g).connect(sesBaglam.destination);
    o.start(t); o.stop(t + sure + 0.02);
  } catch { /* ses desteklenmiyor */ }
}
const SES = {
  tus: () => ton(660, 0, 0.04, "triangle", 0.03),
  cevir: sonuc => sonuc.forEach((d, i) => ton({ dogru: 880, var: 620, yok: 330 }[d], i * 0.25 + 0.25, 0.09, "triangle", 0.05)),
  hata: () => { ton(180, 0, 0.12, "square", 0.03); ton(150, 0.1, 0.14, "square", 0.03); },
  kazan: () => [523, 659, 784, 1047].forEach((f, i) => ton(f, i * 0.09, 0.22, "sine", 0.07)),
  kayip: () => [392, 330, 262].forEach((f, i) => ton(f, i * 0.16, 0.3, "sine", 0.06)),
};

function istatistikOku(n) {
  return oku("istatistik-" + n, { oynanan: 0, kazanilan: 0, seri: 0, enSeri: 0, dagilim: [0, 0, 0, 0, 0, 0], sonGun: 0 });
}

// ---------- çizim ----------
function tahtaKur() {
  const tahta = $("tahta");
  tahta.innerHTML = "";
  const boy = Math.min(62, Math.floor((Math.min(window.innerWidth, 520) - 40) / uzunluk) - 6);
  tahta.style.setProperty("--kare", Math.max(40, boy) + "px");
  for (let s = 0; s < DENEME; s++) {
    const satir = document.createElement("div");
    satir.className = "satir";
    satir.style.gridTemplateColumns = `repeat(${uzunluk}, auto)`;
    for (let i = 0; i < uzunluk; i++) {
      const kare = document.createElement("div");
      kare.className = "kare";
      satir.appendChild(kare);
    }
    tahta.appendChild(satir);
  }
}

function klavyeKur() {
  const k = $("klavye");
  k.innerHTML = "";
  for (const sira of KLAVYE) {
    const satir = document.createElement("div");
    satir.className = "klavye-satir";
    for (const tus of sira) {
      const d = document.createElement("button");
      d.className = "tus" + (tus.length > 1 ? " genis" : "");
      d.dataset.tus = tus;
      d.textContent = tus === "gir" ? "GİR" : tus === "sil" ? "⌫" : buyuk(tus);
      if (tus === "sil") d.setAttribute("aria-label", "Sil");
      satir.appendChild(d);
    }
    k.appendChild(satir);
  }
}

function satirCiz(s, harfler, sonuc, animasyon) {
  const kareler = $("tahta").children[s].children;
  for (let i = 0; i < uzunluk; i++) {
    const kare = kareler[i];
    kare.textContent = harfler[i] ? buyuk(harfler[i]) : "";
    kare.className = "kare" + (harfler[i] ? " dolu" : "");
    if (sonuc) {
      kare.style.setProperty("--gecikme", animasyon ? i * 0.25 + "s" : "0s");
      if (!animasyon) kare.style.animation = "none";
      else kare.style.animation = "";
      kare.classList.add(sonuc[i]);
    }
  }
}

function klavyeBoya() {
  const oncelik = { yok: 1, var: 2, dogru: 3 };
  const durum = {};
  for (const t of oyun.tahminler) {
    const sonuc = puanla(t, oyun.cevap.kelime);
    Array.from(t).forEach((h, i) => {
      if (!durum[h] || oncelik[sonuc[i]] > oncelik[durum[h]]) durum[h] = sonuc[i];
    });
  }
  document.querySelectorAll(".tus").forEach(d => {
    d.classList.remove("dogru", "var", "yok");
    if (durum[d.dataset.tus]) d.classList.add(durum[d.dataset.tus]);
  });
}

function tumunuCiz() {
  tahtaKur();
  oyun.tahminler.forEach((t, s) => satirCiz(s, Array.from(t), puanla(t, oyun.cevap.kelime), false));
  if (!oyun.bitti && oyun.tahminler.length < DENEME) satirCiz(oyun.tahminler.length, oyun.yazilan, null);
  klavyeBoya();
  zorRozetiCiz();
}

let bildirimZamanlayici;
function bildir(metin, sure = 1600) {
  const b = $("bildirim");
  b.textContent = metin;
  b.classList.add("goster");
  clearTimeout(bildirimZamanlayici);
  bildirimZamanlayici = setTimeout(() => b.classList.remove("goster"), sure);
}

// ---------- oyun akışı ----------
function gunlukBaslat() {
  const gun = bugunNo();
  const kayit = oku("gunluk-" + uzunluk, null);
  const cevap = gununKelimesi(uzunluk, gun);
  oyun = kayit && kayit.gun === gun
    ? { cevap, tahminler: kayit.tahminler, yazilan: [], bitti: kayit.bitti, kazandi: kayit.kazandi, gun, zor: !!kayit.zor }
    : { cevap, tahminler: [], yazilan: [], bitti: false, kazandi: false, gun, zor: ayar.zor };
  tumunuCiz();
  if (oyun.bitti) setTimeout(() => sonucGoster(false), 300);
}

function gunlukKaydet() {
  yaz("gunluk-" + uzunluk, { gun: oyun.gun, tahminler: oyun.tahminler, bitti: oyun.bitti, kazandi: oyun.kazandi, zor: oyun.zor });
}

function harfEkle(h) {
  if (mod === "sureli" && !sureli) { sureliBaslangicPenceresi(); return; }
  if (kilit || oyun.bitti || oyun.yazilan.length >= uzunluk) return;
  oyun.yazilan.push(h);
  SES.tus();
  satirCiz(oyun.tahminler.length, oyun.yazilan, null);
}

function harfSil() {
  if (kilit || oyun.bitti || !oyun.yazilan.length) return;
  oyun.yazilan.pop();
  satirCiz(oyun.tahminler.length, oyun.yazilan, null);
}

function gonder() {
  if (mod === "sureli" && !sureli) { sureliBaslangicPenceresi(); return; }
  if (kilit || oyun.bitti) return;
  const satir = $("tahta").children[oyun.tahminler.length];
  if (oyun.yazilan.length < uzunluk) { salla(satir); bildir("Harf eksik"); return; }
  const tahmin = oyun.yazilan.join("");
  if (!GECERLI[uzunluk].has(tahmin)) { salla(satir); bildir("Bu kelime listede yok"); return; }
  const zorHata = oyun.zor ? zorKontrol(tahmin) : null;
  if (zorHata) { salla(satir); bildir(zorHata, 2000); return; }

  const sonuc = puanla(tahmin, oyun.cevap.kelime);
  const s = oyun.tahminler.length;
  oyun.tahminler.push(tahmin);
  oyun.yazilan = [];
  satirCiz(s, Array.from(tahmin), sonuc, true);
  SES.cevir(sonuc);

  const kazandi = tahmin === oyun.cevap.kelime;
  const bitti = kazandi || oyun.tahminler.length === DENEME;
  if (bitti) { oyun.bitti = true; oyun.kazandi = kazandi; }
  if (mod === "gunluk") {
    gunlukKaydet();
    if (bitti) istatistikIsle(kazandi, oyun.tahminler.length);
  }

  kilit = true;
  const acilis = uzunluk * 250 + 350;
  setTimeout(() => {
    klavyeBoya();
    kilit = false;
    if (!bitti) return;
    if (mod === "gunluk") {
      if (kazandi) { kutla(s); setTimeout(() => sonucGoster(true), 1300); }
      else { SES.kayip(); setTimeout(() => sonucGoster(true), 400); }
    } else {
      sureliKelimeBitti(kazandi, s);
    }
  }, acilis);
}

// Zor mod: bulunan ipuçları sonraki tahminlerde kullanılmak zorunda
function zorKontrol(tahmin) {
  const t = Array.from(tahmin);
  for (const onceki of oyun.tahminler) {
    const o = Array.from(onceki), sonuc = puanla(onceki, oyun.cevap.kelime);
    for (let i = 0; i < o.length; i++) {
      if (sonuc[i] === "dogru" && t[i] !== o[i]) return `${i + 1}. harf ${buyuk(o[i])} olmalı`;
    }
    const gerekli = {};
    o.forEach((h, i) => { if (sonuc[i] !== "yok") gerekli[h] = (gerekli[h] || 0) + 1; });
    for (const h in gerekli) {
      if (t.filter(x => x === h).length < gerekli[h]) return `Tahminde ${buyuk(h)} olmalı`;
    }
  }
  return null;
}

function salla(satir) {
  SES.hata();
  satir.classList.remove("salla");
  void satir.offsetWidth;
  satir.classList.add("salla");
}

function kutla(s) {
  const kareler = $("tahta").children[s].children;
  for (let i = 0; i < kareler.length; i++) {
    kareler[i].classList.add("zipla");
    kareler[i].style.setProperty("--gecikme", i * 0.08 + "s");
  }
  const kutu = $("tahta").children[s].getBoundingClientRect();
  karPatlat(kutu.left + kutu.width / 2, kutu.top + kutu.height / 2);
  SES.kazan();
  if (navigator.vibrate) navigator.vibrate([30, 40, 30]);
}

function istatistikIsle(kazandi, deneme) {
  const ist = istatistikOku(uzunluk);
  if (ist.sonGun === oyun.gun) return;          // aynı gün iki kez sayılmasın
  ist.oynanan++;
  if (kazandi) {
    ist.kazanilan++;
    ist.seri = ist.sonKazanilanGun === oyun.gun - 1 ? ist.seri + 1 : 1;
    ist.enSeri = Math.max(ist.enSeri, ist.seri);
    ist.dagilim[deneme - 1]++;
    ist.sonKazanilanGun = oyun.gun;
  } else {
    ist.seri = 0;
  }
  ist.sonGun = oyun.gun;
  yaz("istatistik-" + uzunluk, ist);
}

// ---------- süreli mod ----------
function sureliHazirla() {
  sureliDurdur();
  oyun = { cevap: { kelime: "" }, tahminler: [], yazilan: [], bitti: false, kazandi: false, zor: ayar.zor };
  tahtaKur();
  klavyeBoya();
  $("sureCubuk").style.width = "100%";
  $("kalanSure").textContent = "2:00";
  $("sureliPuan").textContent = "0";
  sureliBaslangicPenceresi();
}

// Kapatılabilir: kapatınca mod ya da harf sayısı değiştirilebilsin; klavyeye basınca yeniden açılır
function sureliBaslangicPenceresi() {
  const rekor = oku("sureli-rekor-" + uzunluk, 0);
  pencereAc(`
    <h2>Süreli mod · ${uzunluk} harf</h2>
    <p>2 dakikada bulabildiğin kadar kelime bul. Her kelime için yine 6 hakkın var; bulamazsan sıradakine geçilir. Takılırsan <b>Pas</b> de, ama 10 saniye kaybedersin.</p>
    <p class="kucuk-yazi">Rekorun: <b>${rekor}</b> kelime</p>
    <button class="buyuk-dugme" id="sureliBasla">Başla</button>
  `);
  $("sureliBasla").onclick = sureliBaslat;
}

function sureliBaslat() {
  pencereKapat();
  sureli = { bitis: Date.now() + SURE * 1000, puan: 0, bulunanlar: [], kacanlar: [], kullanilan: new Set() };
  sureliYeniKelime();
  sureli.zamanlayici = setInterval(sureliSaat, 250);
}

function sureliYeniKelime() {
  const havuz = CEVAPLAR[uzunluk].filter(c => !sureli.kullanilan.has(c.kelime));
  const kaynak = havuz.length ? havuz : CEVAPLAR[uzunluk];
  const cevap = kaynak[Math.floor(Math.random() * kaynak.length)];
  sureli.kullanilan.add(cevap.kelime);
  oyun = { cevap, tahminler: [], yazilan: [], bitti: false, kazandi: false, zor: ayar.zor };
  tumunuCiz();
}

// Pas: kelimeyi geç, 10 saniye kaybet
const PAS_CEZA = 10;
function pasGec() {
  if (mod !== "sureli") return;
  if (!sureli) { sureliBaslangicPenceresi(); return; }
  if (kilit || oyun.bitti) return;
  oyun.bitti = true;
  sureli.kacanlar.push(oyun.cevap);
  sureli.bitis -= PAS_CEZA * 1000;
  const cubuk = $("sureCubuk").parentElement;
  cubuk.classList.add("ceza");
  setTimeout(() => cubuk.classList.remove("ceza"), 500);
  SES.hata();
  bildir("Pas: " + buyuk(oyun.cevap.kelime) + " · −" + PAS_CEZA + " sn", 1300);
  sureliSaat();
  if (sureli) sureliYeniKelime();
}

function sureliSaat() {
  const kalan = Math.max(0, sureli.bitis - Date.now());
  const sn = Math.ceil(kalan / 1000);
  $("kalanSure").textContent = Math.floor(sn / 60) + ":" + String(sn % 60).padStart(2, "0");
  $("sureCubuk").style.width = (kalan / (SURE * 10)) + "%";
  if (kalan <= 0) sureliBitir();
}

function sureliKelimeBitti(kazandi, s) {
  if (!sureli) return;
  if (kazandi) {
    sureli.puan++;
    sureli.bulunanlar.push(oyun.cevap);
    $("sureliPuan").textContent = sureli.puan;
    kutla(s);
    bildir("+1  " + buyuk(oyun.cevap.kelime), 1000);
  } else {
    sureli.kacanlar.push(oyun.cevap);
    bildir("Kelime: " + buyuk(oyun.cevap.kelime), 1400);
  }
  setTimeout(() => { if (sureli) sureliYeniKelime(); }, kazandi ? 900 : 1300);
}

function sureliDurdur() {
  if (sureli) clearInterval(sureli.zamanlayici);
  sureli = null;
}

function sureliBitir() {
  const s = sureli;
  sureliDurdur();
  oyun.bitti = true;
  // bulunamadan biten son kelimeyi de göster
  if (!s.bulunanlar.includes(oyun.cevap) && !s.kacanlar.includes(oyun.cevap) && oyun.cevap.kelime) s.kacanlar.push(oyun.cevap);
  const eskiRekor = oku("sureli-rekor-" + uzunluk, 0);
  const yeniRekor = s.puan > eskiRekor;
  if (yeniRekor) yaz("sureli-rekor-" + uzunluk, s.puan);
  if (s.puan > 0) karPatlat(window.innerWidth / 2, window.innerHeight / 3);

  const satir = (c, sinif) => `<li class="${sinif}"><b>${buyuk(c.kelime)}</b><span>${c.anlam}</span></li>`;
  pencereAc(`
    <h2>Süre doldu!</h2>
    <div class="anlam-kelime">${s.puan} kelime</div>
    <p class="kucuk-yazi">${yeniRekor ? "★ Yeni rekor!" : "Rekorun: " + eskiRekor + " kelime"} · ${uzunluk} harf</p>
    ${s.bulunanlar.length ? `<p><b>Bulduğun kelimeler</b></p><ul class="bulunanlar">${s.bulunanlar.map(c => satir(c, "")).join("")}</ul>` : ""}
    ${s.kacanlar.length ? `<p style="margin-top:14px"><b>Kaçanlar</b></p><ul class="bulunanlar">${s.kacanlar.map(c => satir(c, "kacan")).join("")}</ul>` : ""}
    <div class="alt-satir">
      <button class="buyuk-dugme ikincil" id="sureliPaylas">Paylaş</button>
      <button class="buyuk-dugme" id="sureliTekrar">Tekrar oyna</button>
    </div>
  `);
  $("sureliTekrar").onclick = sureliHazirla;
  $("sureliPaylas").onclick = () => paylas(`Ayazle ⏱️ Süreli · ${uzunluk} harf\n2 dakikada ${s.puan} kelime buldum! ❄️\n\n${SITE}`);
}

// ---------- pencereler ----------
let pencereKapaninca = null;
function pencereAc(html, kapatilabilir = true, kapaninca = null) {
  $("pencereIcerik").innerHTML = html;
  $("kapat").hidden = !kapatilabilir;
  $("perde").hidden = false;
  $("perde").dataset.kapatilabilir = kapatilabilir ? "1" : "";
  pencereKapaninca = kapaninca;
}
function pencereKapat() {
  $("perde").hidden = true;
  const f = pencereKapaninca;
  pencereKapaninca = null;
  if (f) f();
}

function yardimGoster() {
  const ornek = (kelime, i, durum) => `<div class="ornek">${Array.from(kelime).map((h, j) =>
    `<div class="kare ${j === i ? durum : ""}">${buyuk(h)}</div>`).join("")}</div>`;
  pencereAc(`
    <h2>Nasıl oynanır?</h2>
    <p>Gizli kelimeyi <b>6 hakta</b> bul. Her tahmin gerçek bir kelime olmalı. Tahminden sonra kareler renk değiştirir:</p>
    ${ornek("kızak", 0, "dogru")}
    <p class="kucuk-yazi"><b>K</b> kelimede var ve yeri doğru.</p>
    ${ornek("fener", 2, "var")}
    <p class="kucuk-yazi"><b>N</b> kelimede var ama yeri yanlış.</p>
    ${ornek("boran", 3, "yok")}
    <p class="kucuk-yazi"><b>A</b> kelimede hiç yok.</p>
    <p style="margin-top:12px"><b>Günün kelimesi:</b> 4, 5 ve 6 harf için her gün yeni birer kelime. Herkese aynı kelime düşer, sonucunu paylaşabilirsin.</p>
    <p><b>Süreli:</b> 2 dakikada bulabildiğin kadar kelime bul. Takılırsan Pas de, 10 saniye kaybedersin.</p>
    <p><b>Zor mod:</b> Ayarlardan açılır; bulduğun ipuçlarını her tahminde kullanmak zorundasın.</p>
    <p class="kucuk-yazi">Kelimeyi bulunca anlamını ve örnek bir cümle görürsün. Fikir ve tasarım: Winterdeveloper.</p>
  `, true, () => { if (!ayar.yardimGoruldu) { ayar.yardimGoruldu = true; ayarKaydet(); } });
}

// ---------- ayarlar ----------
function zorDegisebilir() {
  if (mod === "sureli") return !sureli;
  return !oyun || oyun.bitti || oyun.tahminler.length === 0;
}
function ayarlarGoster() {
  const satir = (ad, baslik, aciklama, acik, kilitli) => `
    <div class="ayar">
      <div><b>${baslik}</b><small>${aciklama}</small></div>
      <button class="anahtar" role="switch" data-ayar="${ad}" aria-checked="${acik}" aria-label="${baslik}" ${kilitli ? "disabled" : ""}></button>
    </div>`;
  const zorKilit = !zorDegisebilir();
  pencereAc(`
    <h2>Ayarlar</h2>
    ${satir("zor", "Zor mod", zorKilit
      ? "Oyun sürerken değiştirilemez. Kelimeyi bitirince ya da yeni oyunda açıp kapatabilirsin."
      : "Bulduğun ipuçlarını sonraki tahminlerde kullanmak zorundasın. Paylaşımda “Zor” yazar.", ayar.zor, zorKilit)}
    ${satir("kontrast", "Yüksek kontrast", "Renk ayrımı zor olanlar için yeşil ve sarı renkler.", ayar.kontrast)}
    ${satir("ses", "Ses efektleri", "Tuş, kart çevirme ve kazanma sesleri.", ayar.ses)}
    <p class="kucuk-yazi" style="margin-top:12px">Sözlükte 13 binden fazla kelime var; tahmin olarak hepsi kabul edilir, sorulanlar ise anlamıyla birlikte seçilmiş kelimelerdir.</p>
  `);
  document.querySelectorAll(".anahtar").forEach(d => d.onclick = () => {
    const ad = d.dataset.ayar;
    if (ad === "zor" && !zorDegisebilir()) return;
    ayar[ad] = !ayar[ad];
    d.setAttribute("aria-checked", String(ayar[ad]));
    if (ad === "zor") {
      if (oyun && !oyun.bitti && oyun.tahminler.length === 0) oyun.zor = ayar.zor;
      zorRozetiCiz();
    }
    if (ad === "kontrast") document.body.classList.toggle("kontrast", ayar.kontrast);
    if (ad === "ses" && ayar.ses) SES.tus();
    ayarKaydet();
  });
}
function zorRozetiCiz() {
  const h1 = document.querySelector("h1");
  let r = h1.querySelector(".zor-rozet");
  const goster = oyun ? oyun.zor : ayar.zor;
  if (goster && !r) { r = document.createElement("small"); r.className = "zor-rozet"; r.textContent = "ZOR"; h1.appendChild(r); }
  if (!goster && r) r.remove();
}

function istatistikHtml() {
  const ist = istatistikOku(uzunluk);
  const yuzde = ist.oynanan ? Math.round((ist.kazanilan / ist.oynanan) * 100) : 0;
  const enCok = Math.max(1, ...ist.dagilim);
  const buSatir = mod === "gunluk" && oyun.bitti && oyun.kazandi ? oyun.tahminler.length - 1 : -1;
  return `
    <div class="istatistik">
      <div><b>${ist.oynanan}</b><small>Oynanan</small></div>
      <div><b>${yuzde}</b><small>Kazanma %</small></div>
      <div><b>${ist.seri}</b><small>Seri</small></div>
      <div><b>${ist.enSeri}</b><small>En uzun seri</small></div>
    </div>
    <p class="kucuk-yazi">Kaçıncı tahminde buldun (${uzunluk} harf)</p>
    <div class="dagilim">${ist.dagilim.map((d, i) =>
      `<div><span>${i + 1}</span><i class="${i === buSatir ? "bu" : ""}" style="width:${Math.max(8, (d / enCok) * 100)}%">${d}</i></div>`).join("")}
    </div>`;
}

function istatistikGoster() {
  const gunlukBitti = mod === "gunluk" && oyun.bitti;
  pencereAc(`
    <h2>İstatistikler · ${uzunluk} harf</h2>
    ${istatistikHtml()}
    ${gunlukBitti ? altSatirHtml() : `<p class="kucuk-yazi">Süreli mod rekorun: <b>${oku("sureli-rekor-" + uzunluk, 0)}</b> kelime</p>`}
  `);
  if (gunlukBitti) altSatirBagla();
}

function altSatirHtml() {
  return `<div class="alt-satir">
      <div class="geri-sayim"><small>Sıradaki kelime</small><b id="geriSayim">--:--:--</b></div>
      <button class="buyuk-dugme" id="paylasDugme">Paylaş</button>
    </div>`;
}
let geriSayimZamanlayici;
function altSatirBagla() {
  $("paylasDugme").onclick = () => paylas(paylasMetni());
  const guncelle = () => {
    const el = $("geriSayim");
    if (!el) { clearInterval(geriSayimZamanlayici); return; }
    const k = sonrakiGuneKalan();
    if (k <= 1000) { clearInterval(geriSayimZamanlayici); pencereKapat(); gunlukBaslat(); return; }
    const sn = Math.floor(k / 1000);
    el.textContent = [Math.floor(sn / 3600), Math.floor(sn % 3600 / 60), sn % 60].map(x => String(x).padStart(2, "0")).join(":");
  };
  clearInterval(geriSayimZamanlayici);
  guncelle();
  geriSayimZamanlayici = setInterval(guncelle, 1000);
}

// Kelime bulununca (ya da bulunamayınca) çıkan anlam kartı
function sonucGoster() {
  const c = oyun.cevap;
  pencereAc(`
    <h2>${oyun.kazandi ? ["Dâhice!", "Harika!", "Çok iyi!", "Güzel!", "Az kalsın!", "Son anda!"][oyun.tahminler.length - 1] : "Bu sefer olmadı"}</h2>
    <div class="anlam-kelime ${oyun.kazandi ? "" : "kayip"}">${buyuk(c.kelime)}</div>
    <p class="anlam">${c.anlam}</p>
    <p class="ornek-cumle">${c.ornek}</p>
    ${istatistikHtml()}
    ${altSatirHtml()}
  `);
  altSatirBagla();
}

function paylasMetni() {
  const kare = ayar.kontrast ? { dogru: "🟩", var: "🟨", yok: "⬛" } : { dogru: "🟦", var: "🟧", yok: "⬛" };
  const satirlar = oyun.tahminler.map(t => puanla(t, oyun.cevap.kelime).map(d => kare[d]).join(""));
  const skor = oyun.kazandi ? oyun.tahminler.length : "X";
  return `Ayazle #${oyun.gun} · ${uzunluk} harf · ${skor}/${DENEME}${oyun.zor ? " · Zor" : ""} ❄️\n\n${satirlar.join("\n")}\n\n${SITE}`;
}

async function paylas(metin) {
  try {
    if (navigator.share) { await navigator.share({ text: metin }); return; }
  } catch (e) { if (e && e.name === "AbortError") return; }
  try {
    await navigator.clipboard.writeText(metin);
    bildir("Panoya kopyalandı");
    return;
  } catch { /* pano kapalıysa elle kopyalat */ }
  const alan = document.createElement("textarea");
  alan.className = "paylas-metni";
  alan.value = metin;
  alan.readOnly = true;
  $("pencereIcerik").appendChild(alan);
  alan.select();
  bildir("Metni seçip kopyala");
}

// ---------- mod ve uzunluk seçimi ----------
function secimleriCiz() {
  document.querySelectorAll("[data-mod]").forEach(d => d.setAttribute("aria-selected", String(d.dataset.mod === mod)));
  document.querySelectorAll("[data-uzunluk]").forEach(d => d.setAttribute("aria-checked", String(+d.dataset.uzunluk === uzunluk)));
  $("sureliBilgi").hidden = mod !== "sureli";
}

function yenidenBaslat() {
  sureliDurdur();
  if (!$("perde").hidden) { pencereKapaninca = null; $("perde").hidden = true; }
  oyun = null;
  secimleriCiz();
  ayarKaydet();
  if (mod === "gunluk") gunlukBaslat(); else sureliHazirla();
}

document.querySelectorAll("[data-mod]").forEach(d => d.addEventListener("click", () => {
  if (d.dataset.mod === mod || kilit) return;
  if (sureli && !confirm("Süreli oyun bitecek. Emin misin?")) return;
  mod = d.dataset.mod;
  yenidenBaslat();
}));
document.querySelectorAll("[data-uzunluk]").forEach(d => d.addEventListener("click", () => {
  if (+d.dataset.uzunluk === uzunluk || kilit) return;
  if (sureli && !confirm("Süreli oyun bitecek. Emin misin?")) return;
  uzunluk = +d.dataset.uzunluk;
  yenidenBaslat();
}));

// ---------- girdi ----------
$("klavye").addEventListener("click", e => {
  const d = e.target.closest(".tus");
  if (!d) return;
  if (d.dataset.tus === "gir") gonder();
  else if (d.dataset.tus === "sil") harfSil();
  else harfEkle(d.dataset.tus);
  d.blur();
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey || e.altKey || e.metaKey) return;
  if (!$("perde").hidden) {
    if (e.key === "Escape" && $("perde").dataset.kapatilabilir) pencereKapat();
    return;
  }
  if (e.key === "Enter") { e.preventDefault(); gonder(); }
  else if (e.key === "Backspace") harfSil();
  else if (e.key.length === 1) {
    const h = kucuk(e.key);
    if (HARFLER.has(h)) harfEkle(h);
  }
});

$("kapat").onclick = pencereKapat;
$("perde").addEventListener("click", e => { if (e.target === $("perde") && $("perde").dataset.kapatilabilir) pencereKapat(); });
$("yardimDugme").onclick = yardimGoster;
$("istatistikDugme").onclick = () => { if (!kilit) istatistikGoster(); };
$("ayarDugme").onclick = () => { if (!kilit) ayarlarGoster(); };
$("pasDugme").onclick = e => { pasGec(); e.currentTarget.blur(); };
window.addEventListener("resize", () => { if (oyun) tumunuCiz(); });

// ---------- kar ----------
const tuval = $("kar"), cizim = tuval.getContext("2d");
const taneler = [], parcaciklar = [];
let tuvalEn = 0, tuvalBoy = 0;
function tuvalBoyutla() {
  const oran = Math.min(window.devicePixelRatio || 1, 2);
  tuvalEn = window.innerWidth; tuvalBoy = window.innerHeight;
  tuval.width = tuvalEn * oran; tuval.height = tuvalBoy * oran;
  cizim.setTransform(oran, 0, 0, oran, 0, 0);
}
window.addEventListener("resize", tuvalBoyutla);
tuvalBoyutla();
for (let i = 0; i < 45; i++) {
  taneler.push({ x: Math.random() * tuvalEn, y: Math.random() * tuvalBoy, r: 0.8 + Math.random() * 1.8, v: 14 + Math.random() * 26, f: Math.random() * 6.28 });
}
function karPatlat(x, y) {
  for (let i = 0; i < 90; i++) {
    const a = Math.random() * Math.PI * 2, h = 120 + Math.random() * 420;
    parcaciklar.push({ x, y, vx: Math.cos(a) * h, vy: Math.sin(a) * h - 120, r: 1.5 + Math.random() * 3, omur: 1.4 + Math.random() * 0.8, yas: 0 });
  }
}
const hareketAzalt = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
let oncekiZaman = null;
function karKare(simdi) {
  const dt = oncekiZaman === null ? 0.016 : Math.min((simdi - oncekiZaman) / 1000, 0.05);
  oncekiZaman = simdi;
  cizim.clearRect(0, 0, tuvalEn, tuvalBoy);
  cizim.fillStyle = "#fff";
  for (const t of taneler) {
    if (!hareketAzalt) { t.y += t.v * dt; t.f += dt; t.x += Math.sin(t.f) * 10 * dt; }
    if (t.y > tuvalBoy + 4) { t.y = -4; t.x = Math.random() * tuvalEn; }
    cizim.globalAlpha = 0.25 + t.r * 0.15;
    cizim.beginPath(); cizim.arc(t.x, t.y, t.r, 0, 6.2832); cizim.fill();
  }
  for (let i = parcaciklar.length - 1; i >= 0; i--) {
    const p = parcaciklar[i];
    p.yas += dt;
    if (p.yas > p.omur) { parcaciklar.splice(i, 1); continue; }
    p.vx *= 0.97; p.vy = p.vy * 0.97 + 260 * dt;
    p.x += p.vx * dt; p.y += p.vy * dt;
    cizim.globalAlpha = 1 - p.yas / p.omur;
    cizim.fillStyle = i % 3 ? "#ffffff" : "#bfe6ff";
    cizim.beginPath(); cizim.arc(p.x, p.y, p.r, 0, 6.2832); cizim.fill();
  }
  cizim.globalAlpha = 1;
  requestAnimationFrame(karKare);
}
requestAnimationFrame(karKare);

// ---------- başlangıç ----------
document.body.classList.toggle("kontrast", ayar.kontrast);
klavyeKur();
secimleriCiz();
if (mod === "gunluk") gunlukBaslat(); else sureliHazirla();
if (!ayar.yardimGoruldu && mod === "gunluk" && !oyun.bitti) yardimGoster();

if ("serviceWorker" in navigator && location.protocol === "https:") {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

// Testler ve hata ayıklama için
window.Ayazle = { puanla, zorKontrol, bugunNo, gununKelimesi, durum: () => ({ mod, uzunluk, oyun, sureli: !!sureli }) };
