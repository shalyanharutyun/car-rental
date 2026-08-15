export interface ArmeniaRegion {
  name: string;
  districts?: string[];
}

export const ARMENIA_REGIONS: ArmeniaRegion[] = [
  {
    name: 'Yerevan',
    districts: [
      'Ajapnyak', 'Arabkir', 'Avan', 'Davtashen', 'Erebuni', 'Kanaker-Zeytun',
      'Kentron', 'Malatia-Sebastia', 'Nork-Marash', 'Nor Nork', 'Nubarashen', 'Shengavit'
    ]
  },
  {
    name: 'Aragatsotn',
    districts: [
      'Ashtarak', 'Aparan', 'Talin', 'Alagyaz', 'Avshen', 'Charchakis', 'Jamshlu', 'Kaniashir',
      'Mijnatun', 'Mirak', 'Rya Taza', 'Sadunts', 'Shenkani', 'Sipan', 'Aragatsavan', 'Arteni',
      'Getap', 'Lusakn', 'Arevut', 'Ddmasar', 'Hako', 'Kanch', 'Sorik', 'Tlik', 'Agarak', 'Aghdzk',
      'Antarut', 'Aragatsotn', 'Artashavan', 'Aruch', 'Avan', 'Bazmaghbyur', 'Byurakan', 'Dprevank',
      'Ghazaravan', 'Karbi', 'Karin', 'Khnusik', 'Kosh', 'Lernarot', 'Mughni', 'Nor Amanos',
      'Nor Yedesia', 'Nor Yerznka', 'Ohanavan', 'Orgov', 'Oshakan', 'Parpi', 'Saghmosavan', 'Sasunik',
      'Tegher', 'Ujan', 'Ushi', 'Verin Sasunik', 'Voskehat', 'Voskevaz', 'Metsadzor', 'Otevan',
      'Shamiram', 'Agarakavan', 'Akunk', 'Ashnak', 'Garnahovit', 'Dashtadem', 'Davtashen', 'Dian',
      'Dzoragyugh', 'Hatsashen', 'Irind', 'Kakavadzor', 'Karmrashen', 'Katnaghbyur', 'Mastara',
      'Nerkin Bazmaberd', 'Nerkin Sasnashen', 'Nor Artik', 'Partizak', 'Shgharshik', 'Suser',
      'Verin Bazmaberd', 'Verin Sasnashen', 'Vosketas', 'Tsamakasar', 'Yeghnik', 'Zarinja', 'Zovasar',
      'Berkarat', 'Geghadir', 'Geghadzor', 'Gegharot', 'Hnaberd', 'Lernapar', 'Norashen', 'Tsaghkahovit',
      'Tsilkar', 'Vardablur', 'Apnagyugh', 'Aragats', 'Arayi', 'Chknagh', 'Dzoraglukh', 'Hartavan',
      'Jrambar', 'Kayk', 'Kuchak', 'Lusagyugh', 'Melikgyugh', 'Nigavan', 'Saralanj', 'Shenavan',
      'Shoghakn', 'Tsaghkashen', 'Ttujur', 'Vardenis', 'Vardenut', 'Yeghipatrush', 'Yernjatap'
    ]
  },
  {
    name: 'Ararat',
    districts: [
      'Ararat', 'Artashat', 'Masis', 'Vedi', 'Abovyan', 'Ayntap', 'Arbat', 'Arevabuyr', 'Argavand',
      'Avshar', 'Armash', 'Araksavan', 'Arevshat', 'Aygepat', 'Aygestan', 'Aygezard', 'Azatavan',
      'Azatashen', 'Baghramyan', 'Bardzrashen', 'Berdik', 'Berkanush', 'Byuravan', 'Burastan',
      'Darakert', 'Darbnik', 'Dashtavan', 'Dashtakar', 'Dalar', 'Deghdzut', 'Dimitrov', 'Ditak',
      'Dvin', 'Getazat', 'Getapnya', 'Geghanist', 'Ginevet', 'Goravan', 'Ghukasavan', 'Hayanist',
      'Hnaberd', 'Hovtashen', 'Hovtashat', 'Jrashen', 'Jrahovit', 'Kaghtsrashen', 'Kakavaberd',
      'Kanachut', 'Khachpar', 'Lanjazat', 'Lanjar', 'Lanjanist', 'Lusarat', 'Lusashogh',
      'Marmarashen', 'Mkhchyan', 'Mrganush', 'Mrgavan', 'Mrgavet', 'Narek', 'Nizami', 'Nor Kharberd',
      'Nor Kyurin', 'Nor Kyank', 'Nor Ughi', 'Norabats', 'Noramarg', 'Norashen', 'Noyakert',
      'Nshavan', 'Paruyr Sevak', 'Pokr Vedi', 'Ranchpar', 'Sayat-Nova', 'Shaghap', 'Shahumyan',
      'Sis', 'Sipanik', 'Sisavan', 'Surenavan', 'Taperakan', 'Tigranashen', 'Urtsadzor', 'Urtsalanj',
      'Vanashen', 'Vardashat', 'Vardashen', 'Verin Artashat', 'Verin Dvin', 'Vostan', 'Vosketap',
      'Yeraskh', 'Yeghegnavan', 'Zangakatun', 'Zorak'
    ]
  },
  {
    name: 'Armavir',
    districts: [
      'Armavir', 'Metsamor', 'Vagharshapat', 'Aghavnatun', 'Aknalich', 'Alashkert', 'Amasia',
      'Amberd', 'Aragats', 'Araks', 'Arazap', 'Arevadasht', 'Arevashat', 'Arevik', 'Argavand',
      'Argina', 'Arshaluys', 'Artamet', 'Artashar', 'Aygek', 'Aygeshat', 'Aygevan', 'Bagaran',
      'Baghramyan', 'Bambakashat', 'Berkashat', 'Dalarik', 'Dasht', 'Doghs', 'Ferik', 'Getashen',
      'Gai', 'Geghakert', 'Griboyedov', 'Haykashen', 'Haykavan', 'Haytagh', 'Hovtamej', 'Hushakert',
      'Janfida', 'Jrarat', 'Jrashen', 'Jrarbi', 'Karakert', 'Khanjyan', 'Khoronk', 'Koghbavan',
      'Kyurakyan', 'Lenughi', 'Lernagog', 'Lernamerdz', 'Lukashin', 'Lusagyugh', 'Margara',
      'Mayisyan', 'Merdzavan', 'Monteavan', 'Mrgastan', 'Mrgashat', 'Mugam', 'Musaler', 'Myasnikyan',
      'Nalbandyan', 'Norakert', 'Nor Armavir', 'Nor Artagers', 'Nor Kesaria', 'Norapat', 'Noravan',
      'Parakar', 'Pshatavan', 'Ptghunk', 'Sardarapat', 'Shahumyan', 'Shenavan', 'Shenik', 'Talvorik',
      'Tandzut', 'Taronik', 'Tairov', 'Tsaghkalanj', 'Tsaghkunk', 'Tsiatsan', 'Vanand',
      'Vardanashen', 'Voskehat', 'Yeghegnut', 'Yeraskhahun', 'Yervandashat', 'Zartonk'
    ]
  },
  {
    name: 'Gegharkunik',
    districts: [
      'Chambarak', 'Gavar', 'Martuni', 'Sevan', 'Vardenis', 'Akhpradzor', 'Akunk', 'Antaramej',
      'Areguni', 'Arpunk', 'Artsvanist', 'Artsvashen', 'Astghadzor', 'Avazan', 'Aygut', 'Ayrk',
      'Azat', 'Barepat', 'Berdkunk', 'Chkalovka', 'Daranak', 'Ddmashen', 'Dprabak', 'Drakhtik',
      'Dzoravank', 'Dzoragyugh', 'Gagarin', 'Gandzak', 'Geghakar', 'Geghamabak', 'Geghamasar',
      'Geghamavan', 'Gegharkunik', 'Geghhovit', 'Getik', 'Jil', 'Kakhakn', 'Kalavan', 'Karchaghbyur',
      'Karmirgyugh', 'Khachaghbyur', 'Kutakan', 'Kut', 'Lanjaghbyur', 'Lchap', 'Lchavan', 'Lchashen',
      'Lichk', 'Lusakunk', 'Madina', 'Makenis', 'Mets Masrik', 'Nerkin Getashen', 'Nerkin Shorzha',
      'Nshkhark', 'Norabak', 'Norakert', 'Norashen', 'Noratus', 'Pambak', 'Pokr Masrik', 'Sarukhan',
      'Shatjrek', 'Shatvan', 'Shoghakat', 'Sotk', 'Torfavan', 'Tretuk', 'Tsaghkashen', 'Tsaghkunk',
      'Tsakkar', 'Tsovasar', 'Tsovagyugh', 'Tsovak', 'Tsovinar', 'Ttujur', 'Vahan', 'Vaghashen',
      'Vanevan', 'Vardadzor', 'Vardenik', 'Varser', 'Verin Getashen', 'Verin Shorzha', 'Yeranos',
      'Zariver', 'Zolakar', 'Zovaber'
    ]
  },
  {
    name: 'Kotayk',
    districts: [
      'Abovyan', 'Byureghavan', 'Charentsavan', 'Hrazdan', 'Nor Hachn', 'Tsaghkadzor', 'Yeghvard',
      'Akunk', 'Alapars', 'Aghavnadzor', 'Aghveran', 'Aragyugh', 'Aramus', 'Arinj', 'Artavaz',
      'Arzakan', 'Arzni', 'Argel', 'Balahovit', 'Bjni', 'Buzhakan', 'Dzoraghbyur', 'Fantan', 'Garni',
      'Geghadir', 'Geghard', 'Geghashen', 'Getamej', 'Getargel', 'Goght', 'Gorgoch', 'Hankavan',
      'Hatsavan', 'Hatis', 'Jraber', 'Jrarat', 'Jrvezh', 'Kaghsi', 'Kamaris', 'Kanakeravan',
      'Karashamb', 'Kasagh', 'Katnaghbyur', 'Kaputan', 'Karenis', 'Kotayk', 'Lernanist', 'Marmarik',
      'Mayakovski', 'Meghradzor', 'Mrgashen', 'Nor Artamet', 'Nor Geghi', 'Nor Gyugh', 'Nor Yerznka',
      'Nurnus', 'Proshyan', 'Ptghni', 'Pyunik', 'Saralanj', 'Sevaberd', 'Solak', 'Teghenik',
      'Verin Ptghni', 'Voghjaberd', 'Zar', 'Zoravan', 'Zovashen', 'Zovuni'
    ]
  },
  {
    name: 'Lori',
    districts: [
      'Alaverdi', 'Spitak', 'Stepanavan', 'Tashir', 'Tumanyan', 'Vanadzor', 'Akhtala', 'Bendik',
      'Chochkan', 'Mets Ayrum', 'Neghots', 'Pokr Ayrum', 'Shamlugh', 'Verin Akhtala', 'Akner',
      'Akori', 'Jiliza', 'Kachachkut', 'Haghpat', 'Tsaghkashat', 'Armanis', 'Katnaghbyur', 'Urasar',
      'Blagodarnoye', 'Dashtadem', 'Getavan', 'Katnarat', 'Lernahovit', 'Meghvahovit', 'Noramut',
      'Saratovka', 'Shamut', 'Lorut', 'Ahnidzor', 'Atan', 'Marts', 'Karinj', 'Antaramut', 'Antarashen',
      'Arevashogh', 'Arjut', 'Aznvadzor', 'Bazum', 'Chkalov', 'Darpas', 'Debed', 'Dsegh', 'Dzoraget',
      'Dzoragyugh', 'Fioletovo', 'Geghasar', 'Ghursali', 'Gogaran', 'Gugark', 'Gyulagarak', 'Gargar',
      'Hobardzi', 'Kurtan', 'Pushkino', 'Vardablur', 'Halavar', 'Haydarli', 'Kilisa', 'Hartagyugh',
      'Jrashen', 'Karaberd', 'Karadzor', 'Katnajur', 'Khnkoyan', 'Lermontovo', 'Lernantsk',
      'Lernapat', 'Lernavan', 'Lori Berd', 'Agarak', 'Bovadzor', 'Hovnanadzor', 'Koghes', 'Lejan',
      'Sverdlov', 'Urut', 'Yaghdan', 'Lusaghbyur', 'Margahovit', 'Mets Parni', 'Metsavan',
      'Dzyunashogh', 'Mikhayelovka', 'Paghaghbyur', 'Nor Khachakap', 'Norashen', 'Odzun', 'Amoj',
      'Ardvi', 'Arevatsag', 'Aygehat', 'Hagvi', 'Karmir Aghek', 'Mghart', 'Tsater', 'Pambak',
      'Sarahart', 'Saralanj', 'Saramej', 'Sarchapet', 'Apaven', 'Artsni', 'Dzoramut', 'Gogavan',
      'Petrovka', 'Privolnoye', 'Shahumyan', 'Shenavan', 'Shirakamut', 'Shnogh', 'Karkop', 'Teghut',
      'Tsaghkaber', 'Vahagnadzor', 'Vahagni', 'Yeghegnut'
    ]
  },
  {
    name: 'Shirak',
    districts: [
      'Gyumri', 'Artik', 'Maralik', 'Akhurik', 'Akhuryan', 'Arapi', 'Arevik', 'Aygabats', 'Azatan',
      'Basen', 'Bayandur', 'Beniamin', 'Getk', 'Gharibjanyan', 'Hatsik', 'Hatsikavan', 'Haykavan',
      'Hovit', 'Hovuni', 'Jajur', 'Jajuravan', 'Jrarat', 'Kamo', 'Kaps', 'Karmrakar', 'Karnut',
      'Keti', 'Krashen', 'Lernut', 'Marmashen', 'Mayisyan', 'Mets Sariar', 'Pokrashen', 'Shirak',
      'Vahramaberd', 'Voskehask', 'Yerazgavors', 'Aghvorik', 'Alvar', 'Amasia', 'Aravet', 'Ardenis',
      'Aregnadem', 'Bandivan', 'Berdashen', 'Byurakn', 'Darik', 'Garnarich', 'Gtashen', 'Hoghmik',
      'Hovtun', 'Jradzor', 'Kamkhut', 'Lorasar', 'Meghrashat', 'Paghakn', 'Shaghik', 'Tsaghkut',
      'Voghji', 'Yeghnajur', 'Yerizak', 'Zarishat', 'Zorakert', 'Aghin', 'Aniavan', 'Anipemza',
      'Bagravan', 'Bardzrashen', 'Dzithankov', 'Dzorakap', 'Gusanagyugh', 'Haykadzor', 'Isahakyan',
      'Jrapi', 'Karaberd', 'Lanjik', 'Lusaghbyur', 'Norshen', 'Sarakap', 'Sarnaghbyur', 'Shirakavan',
      'Anushavan', 'Arevshat', 'Geghanist', 'Getap', 'Lernakert', 'Lusakert', 'Haykasar', 'Hayrenyats',
      'Harich', 'Horom', 'Hovtashen', 'Mets Mantash', 'Meghrashen', 'Nahapetavan', 'Nor Kyank',
      'Pemzashen', 'Saralanj', 'Saratak', 'Spandaryan', 'Tufashen', 'Vardakar', 'Pokr Mantash',
      'Panik', 'Arpeni', 'Ashotsk', 'Bashgyugh', 'Bavra', 'Dzorashen', 'Ghazanchi', 'Goghovit',
      'Hartashen', 'Kakavasar', 'Karmravan', 'Krasar', 'Lernagyugh', 'Mets Sepasar', 'Musayelyan',
      'Pokr Sariar', 'Pokr Sepasar', 'Salut', 'Saragyugh', 'Sarapat', 'Sizavet', 'Tavshut',
      'Torosgyugh', 'Tsoghamarg', 'Vardaghbyur', 'Zuygaghbyur'
    ]
  },
  {
    name: 'Syunik',
    districts: [
      'Goris', 'Kajaran', 'Kapan', 'Meghri', 'Sisian', 'Gorayk', 'Tatev', 'Tegh', 'Akner',
      'Bardzravan', 'Hartashen', 'Karahunj', 'Khndzoresk', 'Nerkin Khndzoresk', 'Shurnukh',
      'Verishen', 'Vorotan', 'Ajabaj', 'Andokavan', 'Babikavan', 'Dzagikavan', 'Geghi', 'Getishen',
      'Kajarants', 'Katnarat', 'Kavchut', 'Lernadzor', 'Nor Astghaberd', 'Pkhrut', 'Agarak',
      'Atchanan', 'Aghvani', 'Antarashat', 'Arajadzor', 'Artsvanik', 'Bargushat', 'Chakaten', 'Chapni',
      'Davit Bek', 'Ditsmayri', 'Dzorastan', 'Geghanush', 'Gomaran', 'Kaghnut', 'Khdrants', 'Khordzor',
      'Nerkin Hand', 'Nerkin Khotanan', 'Norashenik', 'Okhtar', 'Sevakar', 'Shikahogh', 'Shishkert',
      'Shrvenants', 'Srashen', 'Syunik', 'Sznak', 'Tandzaver', 'Tavrus', 'Tsav', 'Uzhanis', 'Vanek',
      'Vardavank', 'Verin Khotanan', 'Yegheg', 'Yeghvard', 'Alvank', 'Aygedzor', 'Gudemnis',
      'Karchevan', 'Kuris', 'Lehvaz', 'Lichk', 'Nrnadzor', 'Shvanidzor', 'Tashtun', 'Tkhkut',
      'Vahravar', 'Vardanidzor', 'Aghitu', 'Akhlatyan', 'Angeghakot', 'Arevis', 'Ashotavan', 'Balak',
      'Bnunis', 'Brnakot', 'Darbas', 'Dastakert', 'Getatagh', 'Hatsavan', 'Ishkhanasar', 'Ltsen',
      'Lor', 'Mutsk', 'Noravan', 'Nzhdeh', 'Shaki', 'Salvard', 'Shaghat', 'Shamb', 'Shenatagh',
      'Tanahat', 'Tasik', 'Tolors', 'Torunik', 'Tsghuni', 'Uyts', 'Vaghatin', 'Vorotnavan',
      'Sarnakunk', 'Spandaryan', 'Tsghuk', 'Halidzor', 'Harzhis', 'Kashuni', 'Khot', 'Svarants',
      'Tandzatap', 'Shinuhayr', 'Aravus', 'Karashen', 'Khnatsakh', 'Khoznavar', 'Kornidzor', 'Vaghatur'
    ]
  },
  {
    name: 'Tavush',
    districts: [
      'Ayrum', 'Berd', 'Dilijan', 'Ijevan', 'Noyemberyan', 'Achajur', 'Acharkut', 'Aknaghbyur',
      'Aygehovit', 'Azatamut', 'Berkaber', 'Ditavan', 'Gandzakar', 'Getahovit', 'Khashtarak',
      'Kirants', 'Koghb', 'Lusadzor', 'Lusahovit', 'Nerkin Tsaghkavan', 'Sarigyugh', 'Sevkar',
      'Vazashen', 'Yenokavan', 'Aghavnavank', 'Gosh', 'Haghartsin', 'Hovk', 'Teghut', 'Khachardzan',
      'Archis', 'Baghanis', 'Bagratashen', 'Barekamavan', 'Berdavan', 'Debedavan', 'Deghdzavan',
      'Dovegh', 'Haghtanak', 'Jujevan', 'Koti', 'Lchkadzor', 'Ptghavan', 'Voskepar', 'Voskevan',
      'Zorakan', 'Artsvaberd', 'Aygedzor', 'Aygepar', 'Chinari', 'Chinchin', 'Choratan', 'Itsakar',
      'Movses', 'Navur', 'Nerkin Karmiraghbyur', 'Norashen', 'Paravakar', 'Varagavan',
      'Verin Karmiraghbyur', 'Verin Tsaghkavan', 'Kayan', 'Tsaghkavan'
    ]
  },
  {
    name: 'Vayots Dzor',
    districts: [
      'Jermuk', 'Vayk', 'Yeghegnadzor', 'Agarakadzor', 'Aghavnadzor', 'Amaghu', 'Areni', 'Arpi',
      'Chiva', 'Gnishik', 'Khachik', 'Mozrov', 'Rind', 'Yelpin', 'Gndevaz', 'Herher', 'Karmrashen',
      'Arin', 'Azatek', 'Por', 'Zedea', 'Shatin', 'Aghnjadzor', 'Arates', 'Artabuynk', 'Getikvank',
      'Goghtanik', 'Hermon', 'Horbategh', 'Hors', 'Kalasar', 'Karaglukh', 'Salli', 'Sevazhayr',
      'Taratumb', 'Vardahovit', 'Yeghegis', 'Getap', 'Gladzor', 'Malishka', 'Vernashen', 'Akhta',
      'Artavan', 'Bardzruni', 'Gomk', 'Horadis', 'Kapuyt', 'Khndzorut', 'Martiros', 'Nor Aznaberd',
      'Saravan', 'Sers', 'Ughedzor', 'Zaritap', 'Kechut'
    ]
  }
];

export function buildLocation(region: string, district: string | null): string {
  return district ? `${district}, ${region}` : region;
}
