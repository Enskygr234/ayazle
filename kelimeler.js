// Ayazle kelime listesi.
// CEVAP satırları: kelime | anlamı | örnek cümle. Bunlar sorulan kelimelerdir.
// EK_KELIMELER: tahmin olarak kabul edilen ama sorulmayan kelimeler.
// Yeni kelime eklemek için listenin sonuna yazman yeter; uzunluk kendiliğinden ayrılır.

const CEVAP_METNI = `
ayaz|Açık ve rüzgârsız kış gecelerinde olan kuru, keskin soğuk.|Gece ayaz vurdu, sabah camlar buz tutmuştu.
tipi|Kuvvetli rüzgârla birlikte savrulan yoğun kar.|Tipi yüzünden yolun karşısı bile görünmüyordu.
lapa|İri taneler hâlinde, yavaş yavaş yağan kar.|Sabaha kadar lapa lapa kar yağdı.
dolu|Gökten buz taneleri hâlinde düşen yağış.|Dolu arabaların camlarını çatlattı.
atkı|Soğuktan korunmak için boyna sarılan uzun örgü.|Annemin ördüğü atkıyı boynuma doladım.
bere|Başa geçirilen, yumuşak, siperliksiz örgü şapka.|Kulaklarım üşümesin diye beremi taktım.
mont|Kalın, kısa kışlık üst giysi.|Montunu giymeden dışarı çıkma.
soba|Odun ya da kömür yakarak odayı ısıtan araç.|Akşam olunca sobayı yaktık.
ocak|Yılın ilk ayı; ayrıca ateş yakılan yer.|Ocak ayında buralar hep karla kaplanır.
kürk|Bazı hayvanların yumuşak, sık tüylü postu.|Tilkinin kürkü karın üstünde parlıyordu.
ağaç|Gövdesi odunlaşmış, uzun ömürlü bitki.|Bahçedeki ağacın dalları karla eğilmişti.
ateş|Yanan bir şeyden çıkan ısı ve alev.|Kamp ateşinin başında masal anlattık.
ayna|Görüntüyü yansıtan parlak yüzey.|Aynada kendime bakıp saçımı düzelttim.
anne|Çocuğu olan kadın.|Annem sabah erkenden kahvaltıyı hazırladı.
baba|Çocuğu olan erkek.|Babam bana bisiklet sürmeyi öğretti.
bina|Duvarları ve çatısı olan yapı.|Okulumuz üç katlı bir binada.
dere|Irmaktan küçük akarsu.|Köyün içinden küçük bir dere akıyor.
ders|Okulda öğretilen konu ya da bunun için ayrılan süre.|Bugün ilk ders matematikti.
dost|Sevgi ve güvenle bağlı olunan kimse.|Zor günde yanında olan gerçek dosttur.
elma|Elma ağacının yuvarlak, sulu meyvesi.|Teneffüste bir elma yedim.
fare|Küçük, uzun kuyruklu kemirgen hayvan; bilgisayarı yöneten araç.|Kedi fareyi görünce peşine düştü.
gece|Güneşin batışından doğuşuna kadar geçen karanlık süre.|Yılın en uzun gecesi aralıktadır.
gemi|Denizde yük ya da yolcu taşıyan büyük taşıt.|Gemi limandan ağır ağır ayrıldı.
hava|Yeryüzünü saran gaz karışımı; günün sıcaklık ve yağış durumu.|Bugün hava çok soğuk.
inci|İstiridyenin içinde oluşan parlak, değerli tane.|Ninemin inci kolyesi var.
kapı|Bir yere girip çıkmak için açılıp kapanan bölüm.|Kapıyı çalmadan içeri girme.
kalp|Kanı vücuda pompalayan organ; sevginin simgesi.|Koşunca kalbim hızlı hızlı attı.
kedi|Evlerde beslenen, miyavlayan küçük hayvan.|Kedi sobanın önünde uyuyordu.
kova|Su taşımaya yarayan kulplu kap.|Kuyudan bir kova su çektik.
kuzu|Koyunun yavrusu.|Kuzu annesinin peşinden koşuyordu.
masa|Üzerinde yemek yenen ya da çalışılan, ayaklı eşya.|Kitaplarımı masanın üstüne bıraktım.
mavi|Açık gökyüzünün rengi.|Denizin rengi bugün masmavi.
oyun|Eğlenmek için yapılan, kuralları olan etkinlik.|Yağmur dinince dışarıda oyun oynadık.
örgü|Şiş ya da tığla örülerek yapılan şey.|Ninem kış için örgü örüyor.
para|Alışverişte kullanılan madeni ya da kâğıt değer.|Harçlığımdan biraz para biriktirdim.
renk|Işığın göze yansımasıyla görülen özellik; kırmızı, mavi gibi.|En sevdiğin renk hangisi?
saat|Zamanı gösteren araç; altmış dakikalık süre.|Saat tam yedide buluşalım.
tren|Raylar üzerinde giden, vagonlu taşıt.|Tren istasyona tam vaktinde geldi.
uçak|Havada uçarak yolcu ya da yük taşıyan taşıt.|Uçak bulutların üstüne çıktı.
şişe|Sıvı koymak için kullanılan, dar ağızlı kap.|Şişeye soğuk su doldurdum.
kaya|Büyük ve sert taş kütlesi.|Dalgalar kayalara çarpıyordu.
kale|Savunma için yapılmış sağlam yapı; futbolda gol atılan yer.|Top direğe çarpıp kaleye girdi.
kule|Yüksek ve dar yapı.|Galata Kulesi'nden bütün şehir görünüyor.
toka|Saçı tutturmaya ya da kemeri bağlamaya yarayan parça.|Saçımı kırmızı bir tokayla topladım.
tava|Yemek kızartmaya yarayan sapı uzun kap.|Annem tavada yumurta pişirdi.
sopa|Uzun ve kalınca ağaç parçası.|Kardan adamın kollarını iki sopadan yaptık.
sıra|Arka arkaya dizilme; okulda oturulan masa.|Kantinde uzun bir sıra vardı.
yaka|Giysinin boynu çevreleyen kısmı.|Rüzgâr esince montumun yakasını kaldırdım.
ekim|Yılın onuncu ayı; tohumu toprağa gömme.|Okullar eylülde açılır, ekimde yapraklar dökülür.
ilaç|Hastalığı iyileştirmek için kullanılan madde.|Doktorun verdiği ilacı düzenli içtim.
otel|Parayla konaklanan, odaları olan yapı.|Tatilde deniz kenarında bir otelde kaldık.
park|Ağaçlı, oyun alanları olan yeşil alan; aracı bir yere bırakmak.|Okuldan sonra parkta buluştuk.
plaj|Denize girilen kumluk kıyı.|Yazın her gün plaja gidiyorduk.
pide|Fırında pişirilen, üstü malzemeli yassı ekmek.|Akşam yemeğinde kıymalı pide yedik.
okul|Eğitim ve öğretim yapılan yer.|Okul yolunda arkadaşlarımla buluşurum.
lale|Baharda açan, kadeh biçimli çiçek.|Parkta rengârenk laleler açmıştı.
nane|Güzel kokulu, yaprakları yemeklerde kullanılan bitki.|Çorbanın üstüne kuru nane serptim.
erik|Ekşimsi tadı olan küçük, yuvarlak meyve.|Yeşil eriği tuzla yemeyi severim.
üzüm|Asmanın salkım hâlindeki meyvesi.|Bağdan taze üzüm topladık.
kurt|Köpeğe benzeyen, sürü hâlinde yaşayan yabani hayvan.|Gece uzaklardan kurt uluması duyuldu.
keçi|Boynuzlu, sakallı, tırmanmayı seven hayvan.|Keçiler dik kayalara kolayca çıkıyordu.
inek|Sütü için beslenen büyükbaş hayvan.|Sabah sütümüzü köydeki ineklerden aldık.
ayva|Sarı, tüylü kabuklu, kokulu meyve.|Kışın ayva tatlısı yapmayı severiz.
odun|Yakmak için kesilmiş ağaç parçası.|Babamla sobaya odun taşıdık.
tepe|Yerin yükseltisi; bir şeyin en üst kısmı.|Kızakla tepeden aşağı kaydık.
yazı|Harflerle yazılmış şey; tura karşıtı.|Defterime güzel bir yazıyla not aldım.
boya|Bir şeye renk vermek için sürülen madde.|Odanın duvarlarını maviye boyadık.
kart|Kalın kâğıttan küçük parça; tebrik ya da oyun kartı.|Doğum gününde ona bir kart yazdım.
film|Sinemada ya da ekranda izlenen hareketli görüntü.|Hafta sonu ailecek film izledik.
şiir|Duygu ve düşüncelerin ölçülü, ahenkli sözlerle anlatımı.|Kış üstüne kısa bir şiir ezberledim.
rüya|Uykuda görülen olaylar.|Dün gece rüyamda uçuyordum.
umut|Bir şeyin gerçekleşeceğine inanma duygusu.|Umudunu hiç kaybetme.
dede|Annenin ya da babanın babası.|Dedem bana eski köy masallarını anlatır.
nine|Annenin ya da babanın annesi; yaşlı kadın.|Ninemin ocağında hep çay demlenir.
vadi|İki dağ arasındaki uzun çukur yer.|Vadinin dibinde bir ırmak akıyordu.
kıyı|Denizin ya da gölün kara ile birleştiği yer.|Kıyıda martılar uçuşuyordu.
kupa|Yarışmayı kazanana verilen ödül kabı.|Takımımız kupayı havaya kaldırdı.
çatı|Binanın üstünü örten bölüm.|Çatıdan buz sarkıtları sarkıyordu.
kızak|Karda kaymaya yarayan, altı kaygan taşıt.|Kızağımı alıp tepeye koştum.
buzul|Kutuplarda ve yüksek dağlarda biriken büyük buz kütlesi.|Buzullar yavaş yavaş eriyor.
fener|İçinde ışık yanan, taşınabilen lamba.|Karanlıkta fenerimle yolu buldum.
boran|Sert rüzgârla gelen kar ya da yağmur fırtınası.|Dağda boran çıkınca çobanlar mağaraya sığındı.
çizme|Dizine kadar uzanan konçlu ayakkabı.|Karda yürümek için çizmelerimi giydim.
kazak|Örgüden yapılmış, kollu üst giysi.|Yün kazağım beni sıcacık tutuyor.
palto|Uzun, kalın kışlık üst giysi.|Babam lacivert paltosunu giydi.
kahve|Kavrulup öğütülen kahve çekirdeğinden yapılan içecek.|Misafirlere köpüklü kahve yaptık.
limon|Sarı kabuklu, ekşi suyu olan meyve.|Çayıma bir dilim limon ekledim.
armut|Alt kısmı geniş, sulu ve tatlı meyve.|Ağaçtan olgun bir armut kopardım.
incir|İçi küçük çekirdekli, çok tatlı meyve.|Kuru inciri kahvaltıda yeriz.
kiraz|Uzun saplı, kırmızı, küçük ve tatlı meyve.|Kirazları çift çift kulağıma taktım.
balık|Suda yaşayan, solungaçla nefes alan hayvan.|Gölde kırmızı balıklar yüzüyordu.
aslan|Yelesiyle tanınan büyük yabani kedi.|Aslan ormanın kralı diye anılır.
tilki|Kızıl tüylü, kurnazlığıyla bilinen yabani hayvan.|Tilki kuyruğunu kabartıp karda koştu.
geyik|Erkekleri dallı boynuzlu, ormanda yaşayan hayvan.|Ormanda bir geyik sürüsü gördük.
ördek|Yüzmeyi seven, yassı gagalı kuş.|Göldeki ördeklere ekmek attık.
tavuk|Yumurtası ve eti için beslenen kanatlı hayvan.|Tavuklar sabah erkenden ötüşmeye başladı.
horoz|Tavuğun erkeği; sabahları öter.|Horoz ötünce bütün köy uyandı.
güneş|Dünya'ya ışık ve ısı veren yıldız.|Kar dinince güneş açtı.
dünya|Üzerinde yaşadığımız gezegen.|Dünya Güneş'in çevresinde döner.
bulut|Gökyüzünde su damlacıklarından oluşan kütle.|Kara bulutlar yağmuru haber veriyordu.
orman|Ağaçlarla kaplı geniş alan.|Ormanda yürürken bir sincap gördük.
çiçek|Bitkilerin renkli, kokulu bölümü.|Anneme bir demet çiçek aldım.
nehir|Denize ya da göle dökülen büyük akarsu.|Nehrin üstündeki köprüden geçtik.
dalga|Rüzgârla suyun yüzeyinde oluşan kabarma.|Dalgalar kumsalı dövüyordu.
şehir|Kalabalık, büyük yerleşim yeri.|Şehrin ışıkları uzaktan görünüyordu.
kalem|Yazı yazmaya ya da çizmeye yarayan araç.|Kalemimin ucu kırıldı.
kitap|Ciltlenmiş, basılı sayfalardan oluşan eser.|Kışın sobanın yanında kitap okurum.
sabah|Gecenin bitip günün başladığı zaman.|Sabah kalkınca pencereden karı gördüm.
akşam|Güneşin batmasından gecenin başlamasına kadarki zaman.|Akşam yemeğinde çorba vardı.
yemek|Karın doyurmak için hazırlanan şey; yeme işi.|Ninemin yemekleri çok lezzetlidir.
ekmek|Undan yapılıp fırında pişirilen temel besin.|Fırından sıcak ekmek aldım.
çorba|Sulu, kaşıkla içilen sıcak yemek.|Soğuk günlerde mercimek çorbası içeriz.
şeker|Tatlı veren beyaz madde; şekerleme.|Çayıma iki şeker attım.
kaşık|Yemek yemeye yarayan, ucu çukur araç.|Çorbayı tahta kaşıkla içtim.
çatal|Yemek yemeye yarayan, uçları dişli araç.|Makarnayı çatalımla sardım.
tabak|Yemek konulan yayvan kap.|Tabağımdaki her şeyi bitirdim.
sınıf|Okulda ders yapılan oda; aynı yıldaki öğrenciler.|Sınıfımızda yirmi beş kişiyiz.
şarkı|Bestelenmiş, söylenen söz ve ezgi.|Yolda hep birlikte şarkı söyledik.
müzik|Seslerin uyumla birleştirilmesi sanatı.|Ders çalışırken hafif müzik dinlerim.
masal|Olağanüstü olayların anlatıldığı kısa hikâye.|Ninem her gece bir masal anlatırdı.
roman|Uzun, kurgusal anlatı kitabı.|Tatilde kalın bir roman bitirdim.
resim|Boya ya da kalemle yapılmış görüntü; fotoğraf.|Kardan adamın resmini çizdim.
kağıt|Üzerine yazı yazılan ince yaprak.|Bir kâğıda alışveriş listesini yazdım.
fırça|Boya sürmeye ya da temizlemeye yarayan kıllı araç.|Fırçamı suya batırıp maviyi sürdüm.
kömür|Yakıt olarak kullanılan kara madde.|Sobaya biraz daha kömür attık.
duman|Yanan şeyden çıkan gri buhar.|Bacalardan duman yükseliyordu.
kazan|Büyük, derin pişirme kabı.|Köyde kazanlarda aşure pişirildi.
bahar|Kıştan sonra gelen mevsim; ilkbahar.|Baharda bütün ağaçlar çiçek açar.
yolcu|Bir yere giden kimse.|Otobüs yolcularla doluydu.
cadde|Geniş ve önemli yol.|Caddedeki dükkânlar ışıl ışıldı.
sokak|Evlerin arasındaki dar yol.|Sokakta kartopu oynadık.
köprü|Bir akarsuyun ya da yolun üstünden geçmeye yarayan yapı.|Köprüden geçerken aşağıda ırmağı izledik.
liman|Gemilerin yanaştığı korunaklı yer.|Balıkçı tekneleri limana döndü.
hayal|Zihinde canlandırılan düş.|Hayalim kendi oyunumu yapmak.
sevgi|Birine ya da bir şeye karşı duyulan yakınlık.|Annemin sevgisi beni hep ısıtır.
dilek|İstenen, umulan şey.|Yıldız kayınca bir dilek tuttum.
zaman|Olayların geçtiği süre.|Oynarken zamanın nasıl geçtiğini anlamadım.
saray|Hükümdarların yaşadığı görkemli yapı.|Topkapı Sarayı'nı gezdik.
mantı|Küçük hamur bohçalarına kıyma konularak yapılan yemek.|Yoğurtlu mantıya bayılırım.
simit|Halka biçimli, susamlı ekmek.|Vapurda simit yiyip martılara attık.
ayran|Yoğurdun suyla çırpılmasıyla yapılan içecek.|Pidenin yanında soğuk ayran içtik.
pilav|Pirinç ya da bulgurdan yapılan yemek.|Tavuklu pilav en sevdiğim yemek.
sarma|Yaprağa iç sarılarak yapılan yemek.|Ninem yaprak sarmayı incecik sarar.
güzel|Göze ve gönle hoş gelen.|Karla kaplı orman çok güzel görünüyordu.
büyük|Boyutu, hacmi fazla olan.|Kardan adamı çok büyük yaptık.
küçük|Boyutu, hacmi az olan.|Küçük kardeşim de kızağa binmek istedi.
temiz|Kirli olmayan.|Temiz havayı içime çektim.
sıcak|Isısı yüksek olan.|Soğuktan gelince sıcak çay içtim.
soğuk|Isısı düşük olan.|Dışarısı çok soğuk, eldivenlerini al.
beyaz|Karın, sütün rengi.|Her yer bembeyaz olmuştu.
siyah|Kömürün rengi; kara.|Siyah kedi karın üstünde hemen fark ediliyordu.
yeşil|Çimenin, yaprakların rengi.|Bahar gelince tepeler yeşile döndü.
böcek|Altı bacaklı küçük hayvanların genel adı.|Yaprağın altında küçük bir böcek vardı.
kirpi|Sırtı dikenli küçük hayvan.|Kirpi tehlikeyi sezince top gibi büzüldü.
havuç|Turuncu renkli, kökü yenen sebze.|Kardan adamın burnunu havuçtan yaptık.
börek|Yufka arasına iç konularak pişirilen hamur işi.|Ninem peynirli börek yaptı.
lokum|Nişasta ve şekerle yapılan yumuşak tatlı.|Kahvenin yanında lokum ikram ettik.
helva|Un, şeker ve yağla yapılan tatlı.|Kış akşamı irmik helvası kavurduk.
pasta|Kremalı, katlı tatlı.|Doğum günüm için çikolatalı pasta yaptık.
perde|Pencereye asılan kumaş.|Perdeyi açınca odaya güneş doldu.
bahçe|Evin çevresindeki ağaçlı, çiçekli alan.|Bahçede kardan adam yaptık.
salon|Evin geniş oturma odası; büyük toplantı yeri.|Misafirleri salonda ağırladık.
duvar|Bir yeri çevreleyen ya da bölen yapı.|Duvara kendi çizdiğim resmi astım.
balon|İçi hava ya da gazla şişirilen esnek top.|Doğum gününde renkli balonlar şişirdik.
hakem|Maçı kurallara göre yöneten kişi.|Hakem düdüğünü çaldı ve maç başladı.
takım|Birlikte oynayan ya da çalışan topluluk.|Takımımız maçı iki sıfır kazandı.
ırmak|Büyük akarsu.|Irmağın kıyısında piknik yaptık.
sahil|Denizin kara ile birleştiği yer.|Akşamüstü sahilde yürüdük.
vapur|Buharla ya da motorla çalışan yolcu gemisi.|Vapurla karşıya geçtik.
pilot|Uçağı kullanan kişi.|Pilot yolculara iyi yolculuklar diledi.
terzi|Giysi diken ya da onaran kişi.|Pantolonumun paçasını terziye kısalttık.
yazar|Kitap ya da yazı yazan kişi.|En sevdiğim yazarın yeni kitabı çıktı.
sabır|Zorluğa karşı katlanma, bekleyebilme gücü.|Bulmacayı çözmek sabır istiyordu.
merak|Bir şeyi öğrenme isteği.|Kutunun içinde ne olduğunu merak ettim.
mutlu|Sevinç içinde olan.|Kar yağınca bütün çocuklar mutlu oldu.
sakin|Gürültüsüz, durgun.|Kar yağan sokak sakin ve sessizdi.
cesur|Korkusuz, yürekli.|Cesur çocuk karanlık mağaraya ilk giren oldu.
minik|Çok küçük.|Minik kuş pencerenin önüne kondu.
derin|Dibi uzak olan.|Gölün en derin yerinde yüzmedik.
tatlı|Şeker tadında olan; şirin.|Yemekten sonra tatlı yedik.
serin|Hafif soğuk.|Akşam olunca hava serinledi.
karlı|Üzeri karla kaplı.|Karlı yollarda dikkatli yürüdük.
kutup|Dünya'nın en kuzey ve en güney ucu.|Kutup ayıları buzların üstünde yaşar.
çadır|Kamp için kurulan bez barınak.|Gölün yanında çadır kurduk.
motor|Bir aracı çalıştıran makine; motosiklet.|Arabanın motoru soğukta zor çalıştı.
bavul|Yolculukta eşya taşınan büyük çanta.|Tatil için bavulumu hazırladım.
sınav|Bilgiyi ölçmek için yapılan yoklama.|Yarınki sınava iyi çalıştım.
tatil|Okulun ya da işin ara verildiği dinlenme zamanı.|Yarıyıl tatilinde kayağa gideceğiz.
komşu|Yakınında oturulan kimse.|Komşumuz bize sıcak börek getirdi.
torun|Oğulun ya da kızın çocuğu.|Dedem torunlarıyla kızak kaydı.
teyze|Annenin kız kardeşi.|Teyzem bize kış tatilinde geldi.
serçe|Küçük, kahverengi, şehirlerde yaygın kuş.|Serçeler kar üstündeki kırıntıları topluyordu.
martı|Deniz kıyısında yaşayan beyaz kuş.|Martılar vapurun peşinden uçuyordu.
karga|Siyah tüylü, akıllı kuş.|Karga dalda yüksek sesle bağırdı.
şahin|Keskin gözlü yırtıcı kuş.|Şahin gökyüzünde süzülüyordu.
poyraz|Kuzeydoğudan esen soğuk rüzgâr.|Poyraz esince sokakta kimse kalmadı.
kırağı|Soğuk gecelerde bitkilerin üstünde oluşan ince buz.|Sabah çimenler kırağıyla bembeyazdı.
kibrit|Ucu sürtününce tutuşan küçük çöp.|Sobayı bir kibritle yaktık.
yıldız|Geceleri gökyüzünde parlayan gök cismi.|Ayazlı gecede yıldızlar pırıl pırıldı.
şimşek|Fırtınada gökyüzünde çakan parlak ışık.|Şimşek çakınca oda aydınlandı.
kartal|Güçlü pençeli, büyük yırtıcı kuş.|Kartal dağın tepesine kondu.
mektup|Birine yazılıp gönderilen yazı.|Arkadaşıma uzun bir mektup yazdım.
bardak|Su ya da çay içilen kap.|Bir bardak sıcak süt içtim.
defter|Yazı yazmak için ciltli kâğıt destesi.|Ödevimi deftere temize çektim.
hediye|Birini sevindirmek için verilen şey.|Doğum günümde kitap hediye ettiler.
yağmur|Bulutlardan damla hâlinde düşen su.|Yağmur dinince gökkuşağı çıktı.
sincap|Ağaçlarda yaşayan, kabarık kuyruklu kemirgen.|Sincap fındıkları kışa saklıyordu.
kaplan|Çizgili tüylü, büyük yabani kedi.|Kaplan ormanda sessizce ilerledi.
zürafa|Boynu çok uzun, benekli hayvan.|Zürafa en yüksek dallardaki yaprakları yedi.
tavşan|Uzun kulaklı, hızlı koşan küçük hayvan.|Tavşan karda izlerini bırakarak kaçtı.
kunduz|Suda yaşayan, ağaçları kemirip baraj yapan hayvan.|Kunduzlar dereye bir set kurmuştu.
salata|Çiğ sebzelerle yapılan yemek.|Yemeğin yanına çoban salata hazırladım.
yoğurt|Sütün mayalanmasıyla yapılan besin.|Mantının üstüne sarımsaklı yoğurt döktük.
peynir|Sütün mayalanıp sıkılmasıyla yapılan besin.|Kahvaltıda beyaz peynir yedim.
zeytin|Zeytin ağacının küçük, yağlı meyvesi.|Kahvaltıda siyah zeytin vardı.
yastık|Başın altına konulan yumuşak eşya.|Yastığıma başımı koyar koymaz uyudum.
yorgan|İçi pamuk ya da yün doldurulmuş kalın örtü.|Kış gecelerinde kalın yorgan örtünürüz.
koltuk|Kollu, rahat oturma yeri.|Babam koltukta gazete okuyordu.
sandık|Eşya saklanan büyük kutu.|Ninemin sandığından eski fotoğraflar çıktı.
mutfak|Yemek pişirilen oda.|Mutfaktan mis gibi börek kokusu geliyordu.
futbol|İki takımın topu ayakla kaleye sokmaya çalıştığı oyun.|Teneffüste futbol oynadık.
kaleci|Futbolda kaleyi koruyan oyuncu.|Kaleci penaltıyı kurtardı.
deprem|Yer kabuğunun sarsılması.|Deprem çantamızı hazır tutuyoruz.
volkan|Yerin içinden lav püskürten dağ.|Volkan yeniden dumanlar çıkarmaya başladı.
kaynak|Suyun yerden çıktığı yer; bilginin alındığı yer.|Dağdaki kaynaktan buz gibi su içtik.
şelale|Akarsuyun yüksekten döküldüğü yer.|Kışın şelale donup buzdan bir perdeye döndü.
mağara|Kayalık içindeki doğal oyuk.|Fenerimizle mağaranın içine girdik.
kumsal|Kumlu deniz kıyısı.|Kumsalda kumdan kale yaptık.
rıhtım|Gemilerin yanaştığı taş kıyı.|Rıhtımda balık tutanları izledik.
gemici|Gemide çalışan kişi.|Gemici halatı sıkıca bağladı.
kaptan|Gemiyi yöneten kişi; takımın başı.|Kaptan dümene geçti.
doktor|Hastaları muayene edip tedavi eden kişi.|Doktor ateşimi ölçtü.
berber|Saç ve sakal kesen kişi.|Berbere gidip saçımı kestirdim.
çiftçi|Tarla eken, hayvan besleyen kişi.|Çiftçi tarlasını sürmeye başladı.
ressam|Resim yapan sanatçı.|Ressam karlı dağları tuvaline çizdi.
neşeli|Sevinçli, keyifli.|Kar tatili haberine herkes neşelendi.
yorgun|Gücü azalmış, dinlenmeye ihtiyacı olan.|Bütün gün kızak kaydığım için çok yorgundum.
akıllı|Aklı iyi işleyen, zeki.|Akıllı köpek topu hemen geri getirdi.
parlak|Işık yansıtan, pırıl pırıl.|Kar güneşte parlak parlak ışıldıyordu.
sessiz|Ses çıkarmayan.|Kar yağarken her yer sessizleşir.
yüksek|Yerden uzak, alçak olmayan.|Yüksek dağların tepesi bembeyazdı.
kervan|Birlikte yolculuk eden yük hayvanları ve yolcular.|Kervan çölde günlerce yol aldı.
kamyon|Yük taşıyan büyük motorlu araç.|Kamyon yollara tuz döktü.
otobüs|Çok sayıda yolcu taşıyan büyük taşıt.|Okula otobüsle gidiyorum.
harita|Bir yerin çizimle gösterildiği plan.|Haritada köyümüzün yerini bulduk.
pusula|İğnesi hep kuzeyi gösteren yön bulma aracı.|Ormanda pusulayla yönümüzü bulduk.
fincan|Kahve ya da çay içilen kulplu küçük kap.|Fincanıma sıcak kahve doldurdum.
oyuncu|Bir oyunda ya da sporda yer alan kişi.|Takımın en hızlı oyuncusu benim.
başarı|İstenen sonuca ulaşma.|Bu başarıyı birlikte kazandık.
bayram|Kutlanan önemli gün.|Bayramda büyüklerimizin elini öptük.
kardeş|Aynı anne babadan doğan kimse.|Kardeşimle birlikte kardan adam yaptık.
akraba|Kan bağı olan kimse.|Bayramda bütün akrabalarımızı ziyaret ettik.
baykuş|Geceleri avlanan, iri gözlü kuş.|Baykuş gece boyunca ağaçta öttü.
leylek|Uzun bacaklı, göçmen büyük kuş.|Baharda leylekler yuvalarına döndü.
atmaca|Küçük yırtıcı kuş.|Atmaca hızla dalıp avını yakaladı.
kuzgun|Kargaya benzeyen iri, kara kuş.|Kuzgun karlı dalın üstünde bağırıyordu.
`;

// Tahmin olarak kabul edilen ek kelimeler (sorulmazlar). Boşlukla ayır, uzunluğa göre kendiliğinden ayrılır.
const EK_KELIMELER = `
abla acil açık adam adet ağız ağrı ahır akıl alan alet alev alın alıç altı alay ana anı ara arı arka arpa asma aşçı aşık ataş atma avcı ayak ayar aynı ayrı azık
bacak bade bağa bağı bakı balta barı baş başa batı bebek bedel beden bel bent beri beş bey bilek bilgi bina bira bize bitki bizi boğa bolu bora boru boş boy boyu bölü bulgur buğu bura buse buzlu
cami can cep cetvel ceza cilt cins çaba çağ çam çan çare çark çaya çene çerez çeyrek çift çiğ çini çivi çizgi çöp çuha çuval
dağ dahi daha dal dana dans dar dava dayı değer deli demir dere deri devir deve dikiş dil dilim dinç dip diş diz doğa doğu dokuz dolap dolma dört duş duvak dürüm düş düz
efe ege ekip ekşi ele elek elli emek emir emin enli erken eser esir eski eşik eşya etek evet eylül ezan ezgi
fakir fal fare fasıl felek fen fikir fiş fiyat fiil fon form fosil
gaga gaz gelin genç geniş gibi giysi göz gölge gönül gövde gözlük gri grup gurur gül güz
hala halı hamal hamur hane hap harf hasta hatıra hayır hayat hayvan hece hedef hemen her hız hile hisse hoca hor hurma huzur
ılık ırk ısı ıslak ışık iç içi idare iki ikiz ilçe ilik ilk imza ince inek inme ipek irade iri isim iskele iş işçi işte iyi izci izin
jest jeton jüri
kabak kader kadın kafa kafes kağan kalın kanat kanun kapan karar karın kasa kaşe katı kavak kaya kaz kazı kek keman kemik kent kese kesir kılıç kır kırk kış kız kibar kilim kilo kira kireç kişi koç kod kol kolay koşu koyu koza köy kral kraliçe kum kural kurs kuru kuş kutu kuyu kuzey küre kül
lamba lastik lazım leke liste lira lise lokanta
madde maden mal mama manav mandal mangal marka maske maşa matem maya meclis mendil merdiven mesafe meslek meyve mezun mide mihrap mimar misafir mor mucize mum
nane nasıl nazik neden nefes nem nesne nisan not numara nur
oda ok okur olay olta onay onur orta oya oyuncak ozan
öbek ödev ödül öfke öğle öğün ölçü önce önlük örnek öykü özel özlem
pamuk pancar parça parti patik pazar pekmez pembe pençe pınar pırasa pirinç plan polis posta proje pul
radyo raf rahat rakam ray reçel rehber rekor resmi rota ruh
saç sağ sağlık sahne saha sakal sap sarı sayı sefer sel sema semt sepet ses sevinç seyir sıfır sıvı sigara silgi silah sima sinema sis site soru sofra sos soy sözlük spor su suç sulu sultan süs süt
şal şans şapka şaka şarap şehir şekil şerit şeytan şık şimdi şiş şoför şube
tahta takvim tane tarla tarz taş tat tavan tavır tebrik tekne tel tembel tepsi ter terazi tespih tez tığ tohum ton top toprak tören tuz tuzlu tür tüy
ucuz uçurum ufuk ulus umut usta uyku uzak uzay uzun
ücret üç ülke ünlü ürün üye üzgün
vakit vali vapur vatan vazo vergi veri vida vize
yaban yabancı yağ yakın yalı yalan yama yan yapı yaprak yara yarın yarış yaş yatak yavru yay yayla yaz yazlık yedi yel yelek yemiş yeni yer yeter yetim yığın yıl yol yön yudum yufka yük yumak yumurta yün yürek yüz
zafer zahmet zar zarf zeki zemin zil zincir zor zurna
almak gelmek gitmek bakmak demek etmek olmak yapmak görmek vermek bilmek yemek içmek kalmak durmak koşmak atmak tutmak yazmak okumak sevmek aramak bulmak açmak kapmak satmak ekmek dikmek kesmek çekmek itmek uçmak yüzmek dönmek inmek binmek dalmak sormak saymak taşmak kaymak donmak yanmak
karın kaçak kanal kapak kayık kazık kemer kepek kesik kılıf kiler kimse kiraz kirli koku koyun kumaş kumar kurşun kusur kuşku küpe kürek kütük
bakır balta bando bayan bebek bekçi benek beşik bilet bilim bilye biber bitki bodur boğaz bonus borç boyun bölge bucak budak bulgu burun buzlu bütçe
çakıl çakmak çamur çanak çekiç çelik çerçi çeşme çıkış çırak çiçek çilek çizgi çoban çocuk çömlek çukur
dakika damla davul dayak defne demet dizgi dolap dönüm durak düdük düğme düğün dümen
ekran eldiven elmas erzak esnaf eşarp evlat
fasulye fidan fındık fırın fırtına fiyat
gazete gençlik gerdan gölet görev güdük gümüş güreş güven
hamak hançer hasır hasat hayran haber halat hendek hırka huysuz
ırgat ışıltı içerik ihtiyar ikram ilgi ilmek irmik
kadeh kafile kamış kantin kaplan kardan kasaba kaşkol kazma keçe kelime kepçe kertik kılavuz kıvılcım kızgın kocaman konak kozalak köpek köpük kubbe kuşak küçük
lahana leğen levha limon lokma lüzum
mahalle makas mangal mantar masraf matkap merak mermer mesaj mısır mutlu mühür
nakış nadir nazar nehir nişan
oklava olgun ordu orkide otlak oyalı
ödenek öğrenci örgüt örtü özgür
pabuç palet pansiyon parmak pasaj patlak paydos pazen pekmez pelin pervane peri pestil pınar pide pilot pirinç
rahle rampa reçine rüzgar
sabun sahan sakız salı sancak sargı satır savaş sazlık sebze sedir selam semer sepet serçe sergi sicim siyah sofra sucuk sürü
şahane şalgam şamdan şehit şeftali şemsiye şenlik şerbet şişman
tabure takla tamir tandır tarak tarçın taslak tatlı tavla tebeşir tekerlek tellal terlik testi tilki toka topaç torba tulum tuval tüfek
uçurtma ulak urgan uykucu
vagon varil vişne
yatay yaygı yazar yelken yeşil yonca yorgan yusufçuk yuva yüzük
zambak zeytin zil zümrüt
acemi açlık adalet adres afiş ağabey ağlamak ahenk akrep aktör alçak alıcı amcam ambar anahtar anlam anket antik araba arazi armağan arşiv artık asker aslen ateşli avize ayakta aydın ayrım
bakkal balkon bardak barış basit başlık battal bayrak beceri bekar belge benzin beyin bıçak bilgin birlik bitiş boncuk bozkır böbrek bulaşık buluş burada buzdolabı
cadı cahil cennet cesaret ceviz cevap ceylan cümle
çabuk çağrı çalgı çalım çarşaf çarşı çaydan çekmece çelenk çengel çeşit çıkmaz çirkin çiğdem çizim çoğul çorap çömez
damar damat darbe davet defa değnek deneme dergi derya destan dilsiz direk direnç dolmuş dondurma dostluk duygu dünyalı düşman
egzoz eğitim ekonomi emanet endişe engel enkaz erkek ertesi esinti eşitlik etkinlik evren eyalet
fener fermuar fiskos fitil fiyaka fotoğraf fular
galeri gardırop gayret gazoz gerçek gezgin gözcü gömlek görgü göçmen gülüş gümrük günlük güreşçi
haftalık halay hamsi hançer harman hasret haşhaş hatır havlu hazine hekim hesap heykel hızlı hikaye horon hüner
ıhlamur ıspanak ıssız
ibrik içecek iğne ikindi ilginç ilkokul imece inanç inşaat ipucu irmik isabet istek işaret izlek
jandarma
kabile kaçış kadife kafiye kahraman kakao kalkan kambur kanepe kantar kapıcı karakol kardelen karnaval kasırga kavanoz kavga kayak kayısı kazanç keklik kelebek kepenk kerpiç keşif kılçık kırlangıç kısmet kıyafet kilit kirpik klavye kobay kolye komedi konser kontrol korku kovan kolon kömür kuaför kulübe kumanda kurabiye kuruş küpeşte
labirent lavabo leziz lider lokum
macera mağaza mahsul makine manşet manzara marul masum maydanoz mayın mekan menekşe mercan mesele meydan mezar mısra mineral miras mobilya model moral mozaik müdür mühendis müze
nağme namlu nargile nazlı neşe nezle nimet ninni nohut
ocakbaşı odacı oklava okyanus omurga orkestra ortak otağ oval
ödünç öğretmen ömür örümcek övgü özlü
paket palyaço pansuman papatya paraşüt parlak patates patika patron pazartesi pelerin pembe pencere perşembe pijama piyano plaka portakal poyraz puding pusula
rapor reçete rehin renkli resimli rozet rüzgarlı
saban sabırlı sağanak sakalar salıncak sanat sandal saray sarnıç sayfa seçim sefil sehpa semaver serüven sevimli seyyah sıcaklık sırma sitem soğan sonbahar sorumlu sözcük stadyum sucuk sultan sürahi süpürge
şahıs şakacı şarkıcı şehir şelale şerbet şifre şimdi şirket şömine şüphe
tabela tablo tahin takvim tamirci tarif tavan tavuk telaş tencere tepsi terlik tiyatro tohum torba tramvay tribün tuğla turşu tülbent türkü
uğur ulaşım umutlu uyarı uygar uzman
ünvan üzüntü
vazife vicdan vitrin
yağlı yakut yaprak yaratık yardım yaşlı yatırım yazıcı yelpaze yemlik yengeç yetenek yıldırım yokuş yolcu yumuşak yürüyüş yüzücü
zabıta zaman zehir zelzele zengin zeybek zırh zihin zümre
gelmek görmek bilmek dönmek binmek ölçmek seçmek geçmek düşmek gülmek ölmek sevmek silmek yüzmek çizmek ekmek dikmek tükenmek beklemek
kaçmak kalkmak koşmak oturmak sallamak saklamak susmak tanımak taşımak yakmak yıkamak yorulmak uyumak kapamak bakmak
`;

// Metinleri kullanılır hâle getir
const CEVAPLAR = { 4: [], 5: [], 6: [] };
const GECERLI = { 4: new Set(), 5: new Set(), 6: new Set() };

for (const satir of CEVAP_METNI.trim().split("\n")) {
  const [kelime, anlam, ornek] = satir.split("|").map(s => s.trim());
  const n = Array.from(kelime).length;
  if (CEVAPLAR[n]) {
    CEVAPLAR[n].push({ kelime, anlam, ornek });
    GECERLI[n].add(kelime);
  }
}
for (const kelime of EK_KELIMELER.split(/\s+/)) {
  const n = Array.from(kelime).length;
  if (GECERLI[n]) GECERLI[n].add(kelime);
}
