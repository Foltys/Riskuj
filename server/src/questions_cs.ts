interface Question {
  id: number;
  text: string;
  answers: string[];
  leven: number;
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
        text: "Který český král a římský císař položil základní kámen Karlova mostu a založil Univerzitu Karlovu v Praze?",
        answers: ["Karel IV.", "Karel Čtvrtý"],
        leven: 2,
        points: 100,
      },
      {
        id: 2,
        text: "Jak se nazývá událost z roku 1618, která odstartovala Třicetiletou válku a proběhla na Pražském hradě?",
        answers: ["Pražská defenestrace"],
        leven: 2,
        points: 200,
      },
      {
        id: 3,
        text: "Který český národní buditel je autorem slovníku česko-německého a stál u zrodu české jazykovědy?",
        answers: ["Josef Jungmann", "Jungmann"],
        leven: 1,
        points: 300,
      },
      {
        id: 4,
        text: "Ve kterém roce proběhla Sametová revoluce v Československu, která vedla k pádu komunistického režimu?",
        answers: ["1989"],
        leven: 0,
        points: 400,
      },
      {
        id: 5,
        text: "Který významný český politik a filozof byl prvním prezidentem Československa a je považován za zakladatele státu?",
        answers: ["Tomáš Garrigue Masaryk", "Masaryk"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Jak se nazývá dohoda podepsaná v roce 1938, která umožnila Německu anektovat Sudety a je považována za symbol zrady západních mocností?",
        answers: ["Mnichovská dohoda", "Mnichovská zrada"],
        leven: 1,
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
        text: "Která řeka je nejdelší v České republice a protéká hlavním městem Prahou?",
        answers: ["Vltava"],
        leven: 1,
        points: 100,
      },
      {
        id: 2,
        text: "Jak se nazývá nejvyšší hora České republiky, nacházející se v pohoří Krkonoše?",
        answers: ["Sněžka"],
        leven: 1,
        points: 200,
      },
      {
        id: 3,
        text: "Které pohoří tvoří přirozenou hranici mezi Českou republikou a Německem na západě a je známé svými lesy?",
        answers: ["Šumava"],
        leven: 1,
        points: 300,
      },
      {
        id: 4,
        text: "Ve kterém kraji České republiky leží město Olomouc, známé svým sloupem Nejsvětější Trojice zapsaným na seznamu UNESCO?",
        answers: ["Olomoucký kraj"],
        leven: 1,
        points: 400,
      },
      {
        id: 5,
        text: "Jak se jmenuje největší umělá vodní nádrž v České republice, ležící na řece Vltavě a sloužící k výrobě elektrické energie?",
        answers: ["Orlík"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Která chráněná krajinná oblast v severních Čechách je známá svými pískovcovými skalními městy a je domovem Pravčické brány?",
        answers: ["České Švýcarsko"],
        leven: 1,
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
        text: "Která česká tenistka vyhrála Wimbledon ve dvouhře žen dvakrát, v letech 2011 a 2014?",
        answers: ["Petra Kvitová", "Kvitová"],
        leven: 1,
        points: 100,
      },
      {
        id: 2,
        text: "Který český hokejista s číslem 68 je držitelem Stanley Cupu a olympijského zlata z Nagana?",
        answers: ["Jaromír Jágr", "Jágr"],
        leven: 1,
        points: 200,
      },
      {
        id: 3,
        text: "V kterém roce získala česká hokejová reprezentace zlatou medaili na Zimních olympijských hrách v Naganu?",
        answers: ["1998"],
        leven: 0,
        points: 300,
      },
      {
        id: 4,
        text: "Který český atlet, známý jako „Česká lokomotiva“, získal čtyři zlaté olympijské medaile v dlouhých bězích na LOH 1948 a 1952?",
        answers: ["Emil Zátopek", "Zátopek"],
        leven: 1,
        points: 400,
      },
      {
        id: 5,
        text: "Jak se jmenuje český fotbalový brankář, který hrál za Chelsea FC a Arsenal FC a je držitelem rekordu v počtu čistých kont v Premier League?",
        answers: ["Petr Čech", "Čech"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Která česká sportovkyně je dvojnásobnou olympijskou vítězkou ze Zimních olympijských her v Pchjongčchangu 2018 v paralelním obřím slalomu na snowboardu a v super G na lyžích?",
        answers: ["Ester Ledecká", "Ledecká"],
        leven: 1,
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
        text: "Který český skladatel je autorem oper „Prodaná nevěsta“ a cyklu symfonických básní „Má vlast“?",
        answers: ["Bedřich Smetana", "Smetana"],
        leven: 1,
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje slavný český loutkář a tvůrce postaviček Spejbla a Hurvínka?",
        answers: ["Josef Skupa", "Skupa"],
        leven: 1,
        points: 200,
      },
      {
        id: 3,
        text: "Které pražské divadlo je spojeno s osobnostmi jako Jan Werich a Jiří Voskovec a je známé svou avantgardní scénou v meziválečném období?",
        answers: ["Osvobozené divadlo"],
        leven: 1,
        points: 300,
      },
      {
        id: 4,
        text: "Který český spisovatel je autorem nedokončeného satirického románu „Osudy dobrého vojáka Švejka za světové války“?",
        answers: ["Jaroslav Hašek", "Hašek"],
        leven: 1,
        points: 400,
      },
      {
        id: 5,
        text: "Jak se jmenuje český malíř a grafik, představitel secese, jehož plakáty pro Sarah Bernhardt jsou celosvětově proslulé?",
        answers: ["Alfons Mucha", "Mucha"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Který český spisovatel, dramatik a bývalý prezident je autorem hry „Audience“ a je známý svým disidentským působením v době komunismu?",
        answers: ["Václav Havel", "Havel"],
        leven: 1,
        points: 600,
      },
    ],
  },
  {
    id: 5,
    name: "Věda",
    questions: [
      {
        id: 1,
        text: "Který český vědec je považován za zakladatele genetiky díky svým pokusům s hrachem v klášteře v Brně?",
        answers: ["Johann Gregor Mendel", "Mendel"],
        leven: 1,
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje český chemik, který v roce 1959 vynalezl měkké kontaktní čočky?",
        answers: ["Otto Wichterle", "Wichterle"],
        leven: 1,
        points: 200,
      },
      {
        id: 3,
        text: "Jak se jmenuje český fyziolog, který významně přispěl k poznání krevního oběhu a složení krve, a je po něm pojmenována jedna z buněk v mozku?",
        answers: ["Jan Evangelista Purkyně", "Purkyně"],
        leven: 1,
        points: 300,
      },
      {
        id: 4,
        text: "Který český astronom objevil v roce 1951 kometu, která nese jeho jméno a je známá svým periodickým návratem?",
        answers: ["Luboš Kohoutek", "Kohoutek"],
        leven: 1,
        points: 400,
      },
      {
        id: 5,
        text: "Jak se nazývá obor medicíny, ve kterém se profesor Christiaan Barnard inspiroval prací českého kardiochirurga Jana Navrátila při provádění první úspěšné transplantace srdce?",
        answers: ["Kardiochirurgie"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Jak se nazývá biologický proces, který objevil český chemik Julius Stoklasa a který popisuje rozklad organických látek mikroorganismy v anaerobních podmínkách?",
        answers: ["Fermentace"],
        leven: 1,
        points: 600,
      },
    ],
  },
  {
    id: 6,
    name: "Filmy",
    questions: [
      {
        id: 1,
        text: "Který český režisér získal Oscara za nejlepší cizojazyčný film za snímek „Ostře sledované vlaky“?",
        answers: ["Jiří Menzel", "Menzel"],
        leven: 1,
        points: 100,
      },
      {
        id: 2,
        text: "Jak se jmenuje kultovní česká komedie z roku 1969, která se odehrává v malém městečku a sleduje příběhy místních hasičů?",
        answers: ["Hoří, má panenko"],
        leven: 1,
        points: 200,
      },
      {
        id: 3,
        text: "Který český režisér, známý svými animovanými filmy, je tvůrcem oblíbené postavičky Krtečka?",
        answers: ["Zdeněk Miler", "Miler"],
        leven: 1,
        points: 300,
      },
      {
        id: 4,
        text: "Který český film z roku 2007, režírovaný Janem Svěrákem, získal Oscara za nejlepší cizojazyčný film a vypráví příběh učitele hudby, který se stará o malého ruského chlapce?",
        answers: ["Kolja"],
        leven: 1,
        points: 400,
      },
      {
        id: 5,
        text: "Jak se jmenuje český herec, který ztvárnil hlavní roli majora Zemana v populárním televizním seriálu „30 případů majora Zemana“?",
        answers: ["Vladimír Brabec", "Brabec"],
        leven: 1,
        points: 500,
      },
      {
        id: 6,
        text: "Který český režisér získal Oscara za nejlepší režii za snímek „Amadeus“, ačkoliv se jedná o americkou produkci, ale s českým režisérem?",
        answers: ["Miloš Forman", "Forman"],
        leven: 1,
        points: 600,
      },
    ],
  },
];

export { categories, type Category, type Question };
