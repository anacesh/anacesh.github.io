import balotNavstriyFight from '../assets/images/balot_i_navstriy_derutsa_v_taverne.png';
import terminusSleep from '../assets/images/terminus_spit_v_drovah.png';
import terminusGateTry from '../assets/images/terminus_i_victor_pitaytsa_proyti_v_gorod_govoryat_so_straznikom.png';
import terminusVictorOwlbear from '../assets/images/terminus_i_victor_derutsa_s_sovomedom.png';
import mortHalidWork from '../assets/images/mort_i_halid_za_rabotoy.png';
import mortExaminesBalot from '../assets/images/mort_osvatrivaet_balota_ryadom_navstriy_v_proeme_halid.png';
import mortDream from '../assets/images/strashniy_son_morta_pered_otpravkoy.png';
import terminusVictorLeaveMorning from '../assets/images/terminus_and__victor_pokidaut_lavku_utrom.png';

export interface GalleryImage {
  id: string;
  url: string;
  sessionId?: string;
  characters: string[]; // Идентификаторы персонажей
  caption: string;
}

export const gallery: GalleryImage[] = [
  {
    id: "g1",
    url: balotNavstriyFight,
    sessionId: "s1_1",
    characters: ["balot", "navstriy"],
    caption: "Первая встреча Балота и Навстрия: потасовка на втором этаже трактира."
  },
  {
    id: "g2",
    url: terminusSleep,
    sessionId: "s1_5",
    characters: ["terminus"],
    caption: "Измотанный Терминус скрывается на ночлег в поленнице таверны."
  },
  {
    id: "g3",
    url: terminusGateTry,
    sessionId: "s1_13",
    characters: ["terminus", "victor"],
    caption: "Терминус и Виктор Корнеплод пытаются убедить стражника пропустить их в город."
  },
  {
    id: "g4",
    url: terminusVictorOwlbear,
    sessionId: "s1_30",
    characters: ["terminus", "victor"],
    caption: "Сражение лесных Сильв с разъяренным совомедом в обледенелых пещерах."
  },
  {
    id: "g5",
    url: mortHalidWork,
    sessionId: "s1_14",
    characters: ["mort", "halid"],
    caption: "Морт и Халид за работой в своей алхимической мастерской."
  },
  {
    id: "g6",
    url: mortExaminesBalot,
    sessionId: "s1_16",
    characters: ["mort", "balot", "navstriy", "halid"],
    caption: "Деликатный осмотр: Морт осматривает Балота в присутствии Навстрия и Халида."
  },
  {
    id: "g7",
    url: mortDream,
    sessionId: "s1_15",
    characters: ["mort"],
    caption: "Таинственный общий сон, связавший судьбы всех наемников перед отправкой."
  },
  {
    id: "g8",
    url: terminusVictorLeaveMorning,
    sessionId: "s1_41",
    characters: ["terminus", "victor"],
    caption: "Терминус и Виктор Корнеплод тайно покидают лавку Морта ранним утром."
  }
];