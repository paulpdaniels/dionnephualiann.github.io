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
      id: "personal",
      name: "Personal",
      folder: "personal",
      gallery: [
        {name: "Dragon"},
        {name: "Lust"},
        {name: "GestureDrawings"},
        {name: "HippieGrannies"}
      ]
    },
    {
      id: "bb2",
      folder: "bloodbrothers",
      name: "Blood Brothers",
      ext: "png",
      gallery: [
        {name: "Exant"},
        {name: "Kay"},
        {name: "MotherNature"},
        {name: "Oren"},
        {name: "ScrollPriestess"}
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
    },
    {
      id: "ds",
      ext: "png",
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
      name: "Mighty Heros",
      ext: "png",
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
      name: "X-Men",
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
    }
  ]
};