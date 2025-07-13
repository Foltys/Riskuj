interface Question {
  id: number;
  text: string;
  answer: string;
  points: number;
}

interface Category {
  id: number;
  name: string;
  questions: Question[];
}

const categories: Category[] = [
  {
    id: 1,
    name: "Historie",
    questions: [
      {
        id: 1,
        text: "Kdo byl první prezident Československé republiky?",
        answer: "Tomáš Garrigue Masaryk",
        points: 100,
      },
      {
        id: 2,
        text: "V kterém roce vznikla Česká republika?",
        answer: "1993",
        points: 200,
      },
      {
        id: 3,
        text: "Kde se nachází hrad Karlštejn?",
        answer: "Středočeský kraj",
        points: 300,
      },
      {
        id: 4,
        text: "Která dynastie vládla v Čechách nejdéle?",
        answer: "Habsburkové",
        points: 400,
      },
      {
        id: 5,
        text: "Kdy proběhla sametová revoluce?",
        answer: "1989",
        points: 500,
      },
      {
        id: 6,
        text: "Kdo byl poslední rakousko-uherský císař?",
        answer: "Karel I.",
        points: 600,
      },
    ],
  },
  {
    id: 2,
    name: "Zeměpis",
    questions: [
      {
        id: 1,
        text: "Jaká je nejvyšší hora v Česku?",
        answer: "Sněžka",
        points: 100,
      },
      {
        id: 2,
        text: "Kterou řekou protéká Praha?",
        answer: "Vltava",
        points: 200,
      },
      {
        id: 3,
        text: "Kolik krajů má Česká republika?",
        answer: "14",
        points: 300,
      },
      {
        id: 4,
        text: "Které město je neoficiálně nazýváno hlavním městem Moravy?",
        answer: "Brno",
        points: 400,
      },
      {
        id: 5,
        text: "S kolika zeměmi hraničí Česká republika?",
        answer: "4",
        points: 500,
      },
      {
        id: 6,
        text: "Jak se jmenuje největší přirozené jezero v Čechách?",
        answer: "Černé jezero",
        points: 600,
      },
    ],
  },
  {
    id: 3,
    name: "Sport",
    questions: [
      {
        id: 1,
        text: "Který český hokejista je považován za jednoho z nejlepších na světě?",
        answer: "Jaromír Jágr",
        points: 100,
      },
      {
        id: 2,
        text: "V kterém roce vyhrála česká fotbalová reprezentace mistrovství Evropy?",
        answer: "1976",
        points: 200,
      },
      {
        id: 3,
        text: "Která česká tenistka vyhrála Wimbledon v roce 2011?",
        answer: "Petra Kvitová",
        points: 300,
      },
      {
        id: 4,
        text: "Kolik zlatých medailí získal Emil Zátopek na olympiádě v Helsinkách?",
        answer: "3",
        points: 400,
      },
      {
        id: 5,
        text: "Jak se jmenuje nejvyšší česká fotbalová liga?",
        answer: "Fortuna Liga",
        points: 500,
      },
      {
        id: 6,
        text: "Který český biatlonista vyhrál celkový Světový pohár?",
        answer: "Ondřej Moravec",
        points: 600,
      },
    ],
  },
  {
    id: 4,
    name: "Kultura",
    questions: [
      {
        id: 1,
        text: "Kdo napsal Babičku?",
        answer: "Božena Němcová",
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje hlavní postava z díla Osudy dobrého vojáka Švejka?",
        answer: "Josef Švejk",
        points: 200,
      },
      {
        id: 3,
        text: "Který český skladatel složil operu Prodaná nevěsta?",
        answer: "Bedřich Smetana",
        points: 300,
      },
      {
        id: 4,
        text: "Kdo je autorem románu Krysař?",
        answer: "Viktor Dyk",
        points: 400,
      },
      {
        id: 5,
        text: "Který český básník napsal Máj?",
        answer: "Karel Hynek Mácha",
        points: 500,
      },
      {
        id: 6,
        text: "Jak se jmenuje slavný český kreslíř a ilustrátor krtečka?",
        answer: "Zdeněk Miler",
        points: 600,
      },
    ],
  },
  {
    id: 5,
    name: "Filmy",
    questions: [
      {
        id: 1,
        text: "Který český film režíroval Jiří Menzel a vyhrál Oscara?",
        answer: "Ostře sledované vlaky",
        points: 100,
      },
      {
        id: 2,
        text: "Kdo hrál hlavní roli ve filmu Pelíšky?",
        answer: "Jiří Kodet",
        points: 200,
      },
      {
        id: 3,
        text: "Který český režisér natočil film Amadeus?",
        answer: "Miloš Forman",
        points: 300,
      },
      {
        id: 4,
        text: "Jak se jmenuje hlavní postava z filmu Marečku, podejte mi pero!?",
        answer: "Marek Eben",
        points: 400,
      },
      {
        id: 5,
        text: "Který český film z roku 1966 je považován za jeden z nejlepších?",
        answer: "Obchod na korze",
        points: 500,
      },
      {
        id: 6,
        text: "Kdo režíroval film Hoří, má panenko?",
        answer: "Miloš Forman",
        points: 600,
      },
    ],
  },
  {
    id: 6,
    name: "Hudba",
    questions: [
      {
        id: 1,
        text: "Kto je zpěvák skupiny Olympic?",
        answer: "Petr Janda",
        points: 100,
      },
      {
        id: 2,
        text: "Která česká zpěvačka zpívala píseň Láska je láska?",
        answer: "Helena Vondráčková",
        points: 200,
      },
      {
        id: 3,
        text: "Jak se jmenuje slavný český houslista?",
        answer: "Pavel Šporcl",
        points: 300,
      },
      {
        id: 4,
        text: "Která skupina nazpívala píseň Duhová víla?",
        answer: "Elán",
        points: 400,
      },
      {
        id: 5,
        text: "Kdo složil hudbu k filmu Pelíšky?",
        answer: "Aleš Březina",
        points: 500,
      },
      {
        id: 6,
        text: "Který český dirigent vedl Českou filharmonii?",
        answer: "Václav Talich",
        points: 600,
      },
    ],
  },
  {
    id: 7,
    name: "Jídlo",
    questions: [
      {
        id: 1,
        text: "Jaký je nejpopulárnější český pokrm?",
        answer: "Svíčková na smetaně",
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje tradiční česká polévka ze zelí?",
        answer: "Zelňačka",
        points: 200,
      },
      {
        id: 3,
        text: "Který český dezert se připravuje z tvarohu a vajec?",
        answer: "Tvarohové knedlíky",
        points: 300,
      },
      {
        id: 4,
        text: "Jaká je hlavní ingredience goulášové polévky?",
        answer: "Hovězí maso",
        points: 400,
      },
      {
        id: 5,
        text: "Která česká značka piva je nejstarší?",
        answer: "Pilsner Urquell",
        points: 500,
      },
      {
        id: 6,
        text: "Jak se jmenuje tradiční moravský dezert s mákem?",
        answer: "Makovec",
        points: 600,
      },
    ],
  },
  {
    id: 8,
    name: "Věda",
    questions: [
      {
        id: 1,
        text: "Jaký je chemický vzorec vody?",
        answer: "H2O",
        points: 100,
      },
      {
        id: 2,
        text: "Která planeta je nejblíže ke Slunci?",
        answer: "Merkur",
        points: 200,
      },
      {
        id: 3,
        text: "Jak se jmenuje proces, při kterém rostliny vyrábějí kyslík?",
        answer: "Fotosyntéza",
        points: 300,
      },
      {
        id: 4,
        text: "Který český vědec objevil krevní skupiny?",
        answer: "Jan Janský",
        points: 400,
      },
      {
        id: 5,
        text: "Kolik chromozomů má člověk?",
        answer: "46",
        points: 500,
      },
      {
        id: 6,
        text: "Který český matematik a logik se proslavil svými pracemi o nekonečnu?",
        answer: "Kurt Gödel",
        points: 600,
      },
    ],
  },
  {
    id: 9,
    name: "Příroda",
    questions: [
      {
        id: 1,
        text: "Které zvíře je symbolem České republiky?",
        answer: "Lev",
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje největší český národní park?",
        answer: "Krkonošský národní park",
        points: 200,
      },
      {
        id: 3,
        text: "Která ryba je považována za krále českých řek?",
        answer: "Štika",
        points: 300,
      },
      {
        id: 4,
        text: "Který strom je národním stromem České republiky?",
        answer: "Lípa",
        points: 400,
      },
      {
        id: 5,
        text: "Kolik národních parků má Česká republika?",
        answer: "4",
        points: 500,
      },
      {
        id: 6,
        text: "Která česká hora je nejnavštěvovanější?",
        answer: "Říp",
        points: 600,
      },
    ],
  },
  {
    id: 10,
    name: "Umění",
    questions: [
      {
        id: 1,
        text: "Kdo namaloval obraz Slovanská epopej?",
        answer: "Alfons Mucha",
        points: 100,
      },
      {
        id: 2,
        text: "Který český sochař vytvořil sochu sv. Václava na Václavském náměstí?",
        answer: "Josef Václav Myslbek",
        points: 200,
      },
      {
        id: 3,
        text: "Jak se jmenuje slavný český kreslíř a ilustrátor?",
        answer: "Josef Lada",
        points: 300,
      },
      {
        id: 4,
        text: "Který český malíř je známý svými krajinami?",
        answer: "Antonín Slavíček",
        points: 400,
      },
      {
        id: 5,
        text: "Kdo navrhl Tančící dům v Praze?",
        answer: "Vlado Milunić",
        points: 500,
      },
      {
        id: 6,
        text: "Která česká malířka byla součástí skupiny Osma?",
        answer: "Emil Filla",
        points: 600,
      },
    ],
  },
  {
    id: 11,
    name: "Politika",
    questions: [
      {
        id: 1,
        text: "Kdo je současný prezident České republiky?",
        answer: "Petr Pavel",
        points: 100,
      },
      {
        id: 2,
        text: "Kdy vstoupila Česká republika do EU?",
        answer: "2004",
        points: 200,
      },
      {
        id: 3,
        text: "Kdo byl prvním prezidentem České republiky?",
        answer: "Václav Havel",
        points: 300,
      },
      {
        id: 4,
        text: "Kolik členů má Poslanecká sněmovna?",
        answer: "200",
        points: 400,
      },
      {
        id: 5,
        text: "Kdy vstoupila Česká republika do NATO?",
        answer: "1999",
        points: 500,
      },
      {
        id: 6,
        text: "Kdo byl posledním komunistickým prezidentem Československa?",
        answer: "Gustáv Husák",
        points: 600,
      },
    ],
  },
  {
    id: 12,
    name: "Technika",
    questions: [
      {
        id: 1,
        text: "Který český vynálezce sestrojil první telegraf?",
        answer: "Pavel Kabík",
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje český operační systém?",
        answer: "ReactOS",
        points: 200,
      },
      {
        id: 3,
        text: "Která česká společnost vyrábí protivirové programy?",
        answer: "Avast",
        points: 300,
      },
      {
        id: 4,
        text: "Kdo vynalezl měkké kontaktní čočky?",
        answer: "Otto Wichterle",
        points: 400,
      },
      {
        id: 5,
        text: "Která česká firma je známá výrobou her?",
        answer: "Bohemia Interactive",
        points: 500,
      },
      {
        id: 6,
        text: "Jak se jmenuje český supercomputer?",
        answer: "Salomon",
        points: 600,
      },
    ],
  },
];

export { categories, type Category, type Question };
