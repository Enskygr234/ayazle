<div align="center">

![Ayazle](docs/afis.svg)

[![APK indir](https://img.shields.io/badge/⬇_APK_indir-Android-4fb3e0?style=for-the-badge&logo=android&logoColor=white)](https://github.com/Enskygr234/ayazle/releases/download/son-surum/Ayazle.apk)
[![Tarayıcıda oyna](https://img.shields.io/badge/▶_Tarayıcıda_oyna-ayazle-f0a03c?style=for-the-badge)](https://enskygr234.github.io/ayazle/)
[![Lisans](https://img.shields.io/badge/lisans-MIT-e63946?style=for-the-badge)](LICENSE)

</div>

**Ayazle**, buzlu bir kış havasında oynanan Türkçe kelime oyunu. Gizli kelimeyi 6 hakta bul; bulunca kar patlar, ardından kelimenin anlamı ve örnek bir cümle çıkar. Yani oynarken kelime de öğrenirsin.

## Nasıl oynanır

Her tahmin gerçek bir kelime olmalı. Tahminden sonra kareler renk değiştirir:

| Renk | Anlamı |
|---|---|
| 🟦 Buz mavisi | Harf kelimede var ve yeri doğru |
| 🟧 Kor turuncusu | Harf kelimede var ama yeri yanlış |
| ⬛ Koyu | Harf kelimede yok |

## Modlar

- **Günün kelimesi** — 4, 5 ve 6 harf için her gün yeni birer kelime. Herkese aynı kelime düşer, gece yarısı (Türkiye saati) yenilenir. Sonucunu renkli karelerle paylaşabilirsin:

  ```
  Ayazle #1 · 5 harf · 3/6 ❄️

  ⬛🟦⬛⬛🟧
  ⬛🟧⬛🟧⬛
  🟦🟦🟦🟦🟦
  ```

- **Süreli** — 2 dakikada bulabildiğin kadar kelime bul. Süre bitince bulduğun ve kaçırdığın bütün kelimeleri anlamlarıyla görürsün.

İstatistikler (oynanan, kazanma yüzdesi, seri, kaçıncı tahminde bulduğun) ve süreli mod rekorun her harf sayısı için ayrı tutulur.

## Kurulum

**Android:** Yukarıdaki **APK indir** butonuna dokun, dosyayı aç. Telefon ilk seferde "bilinmeyen kaynaklardan yükleme" izni isteyebilir.

**Tarayıcı:** [enskygr234.github.io/ayazle](https://enskygr234.github.io/ayazle/) — bir kez açtıktan sonra internetsiz de çalışır.

## Kelime ekle

Bütün kelimeler [`kelimeler.js`](kelimeler.js) dosyasında:

- **Sorulan kelimeler** `kelime|anlamı|örnek cümle` biçiminde yazılır. Şu an 4 harfte 78, 5 harfte 117, 6 harfte 61 kelime var.
- **Tahmin olarak kabul edilen ek kelimeler** boşlukla ayrılmış bir listede. Oyun "Bu kelime listede yok" derse, o kelimeyi buraya eklemen yeter.

Uzunluklar kendiliğinden ayrılır; yeni kelime eklemek için listenin sonuna yazman yeterli. Her yüklemeden sonra GitHub Actions yeni APK'yı derler ve siteyi günceller.

## Tasarım

Oyunun adı, buzlu kış teması, modlar ve kelime bulununca önce kar patlaması sonra anlam kartı gelmesi Winterdeveloper'ın kararları. Kodu Claude ile birlikte yazıldı.

## Teknik

- Düz HTML, CSS ve JavaScript; kütüphane yok.
- Android sürümü [Capacitor](https://capacitorjs.com) ile paketlenir. Her yüklemede GitHub Actions APK'yı derleyip **Releases**'e koyar ve web sürümünü GitHub Pages'te yayınlar.
- Puanlama çift harfleri doğru sayar: önce doğru yerdeki harfler, sonra kalan harf sayısına göre turuncular.

## Lisans

[MIT](LICENSE) © Winterdeveloper
