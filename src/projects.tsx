export interface IAppConfig {
  baseFolder?: string;
  defaultExt?: string;
  projects: IProjectConfig[];
}

export interface IProjectConfig {
  id: string;
  name: string;
  folder?: string;
  ext?: string;
  gallery: IItemConfig[];
}

export interface IItemConfig {
  name: string;
}

export const appConfig: IAppConfig = {
  baseFolder: "/img",
  defaultExt: "jpg",
  projects: [
    {
      id: "ds",
      ext: "jpg",
      name: "DeckStorm",
      folder: "deckstorm",
      logo: '',
      gallery: [
        {name: "DesertKing"},
        {name: "HarraHun"},
        {name: "IbramFrodden"},
        {name: "PaidCurrency"},
        {name: "Skeleton"}
      ]
    },
    {
      id: "mmh",
      folder: "mightyheros",
      name: "Marvel Mighty Heroes",
      ext: "jpg",
      gallery: [
        {name: "MarvelCharacterTurnTable"},
        {name: "MarvelIllustration01"},
        {name: "MarvelIllustration02"},
        {name: "MarvelIllustration03"},
        {name: "MarvelIllustration04"}
      ]
    },
    {
      id: "xmen",
      folder: "xmen",
      name: "X-Men: Battle of the Atom",
      gallery: [
        {name: "AppStore"},
        {name: "Box"},
        {name: "Cerebro"},
        {name: "DiamondCave"},
        {name: "Hammer"},
        {name: "Lab"},
        {name: "MissionClear"},
        {name: "Storm"},
        {name: "XmenFbad"}
      ]
    },
    {
      id: "bb2",
      folder: "bloodbrothers",
      name: "Blood Brothers",
      ext: "jpg",
      gallery: [
        {name: "Exant"},
        {name: "Kay"},
        {name: "MotherNature"},
        {name: "Oren"},
        {name: "ScrollPriestess"}
      ]
    },
    {
      id: "misc",
      name: "Miscellaneous",
      folder: "misc",
      gallery: [
        {name: "02"},
        {name: "03"},
        {name: "04"},
        {name: "05"},
        {name: "09"},
        {name: "10"},
        {name: "11"},
        {name: "13"},
        {name: "14"},
        {name: "16"},
        {name: "17"},
        {name: "19"}
      ]
    },
    {
      id: "personal",
      name: "Personal",
      folder: "personal",
      gallery: [
        {name: "Dragon_low"},
        {name: "Lust"},
        {name: "GestureDrawings"},
        {name: "HippieGrannies"},
        {name: "MrBanks"},
        {name: "Ra"},
        {name: "Tiger"}
      ]
    },
    {
      id: "dal",
      folder: "dragonage",
      name: "Dragon Age",
      gallery: [
        {name: "Castleroom01"},
        {name: "Castleroom02"},
        {name: "ChristmasArmour"},
        {name: "MageGolems"}
      ]
    }
  ]
};