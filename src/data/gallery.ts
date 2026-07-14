import balotNavstriyFight from '../assets/images/balot_i_navstriy_derutsa_v_taverne.png';
import terminusSleep from '../assets/images/terminus_spit_v_drovah.png';
import terminusGateTry from '../assets/images/terminus_i_victor_pitaytsa_proyti_v_gorod_govoryat_so_straznikom.png';
import terminusVictorOwlbear from '../assets/images/terminus_i_victor_derutsa_s_sovomedom.png';
import mortHalidWork from '../assets/images/mort_i_halid_za_rabotoy.png';
import mortExaminesBalot from '../assets/images/mort_osvatrivaet_balota_ryadom_navstriy_v_proeme_halid.png';
import mortDream from '../assets/images/strashniy_son_morta_pered_otpravkoy.png';
import terminusVictorLeaveMorning from '../assets/images/terminus_and__victor_pokidaut_lavku_utrom.png';
import tavernTalkCityRoutes from '../assets/images/tavern_talk_city_routes.png';
import mountainPassTrackingTerminus from '../assets/images/mountain_pass_tracking_terminus.png';
import gateIntimidationWolfgangAria from '../assets/images/gate_intimidation_wolfgang_aria.png';
import stealthScoutingVictorTerminus from '../assets/images/stealth_scouting_victor_terminus.png';
import workshopOintmentCheckupBalot from '../assets/images/workshop_ointment_checkup_balot.jpg';

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
    caption: "Таинственный страшный сон Морта."
  },
  {
    id: "g8",
    url: terminusVictorLeaveMorning,
    sessionId: "s1_41",
    characters: ["terminus", "victor"],
    caption: "Терминус и Виктор Корнеплод тайно покидают лавку Морта ранним утром."
  },
{
    id: "g9",
    url: tavernTalkCityRoutes,
    sessionId: "s1_4",
    characters: ["navstriy", "balot"],
    caption: "Трактирщик показывает Навстрию и Балоту путь в город через Грот Охотника."
  },
  {
    id: "g10",
    url: mountainPassTrackingTerminus,
    sessionId: "s1_7",
    characters: ["balot", "navstriy", "terminus"],
    caption: "Терминус бесшумно следует за Балотом и Навстрием через заснеженный горный перевал."
  },
  {
    id: "g11",
    url: gateIntimidationWolfgangAria,
    sessionId: "s1_19",
    characters: ["wolfgang", "aria"],
    caption: "Вольфганг запугивает стражника у ворот Риттерсвега, пока Ария наблюдает со стороны."
  },
  {
    id: "g12",
    url: stealthScoutingVictorTerminus,
    sessionId: "s1_23",
    characters: ["victor", "terminus"],
    caption: "Виктор Корнеплод и Терминус прячутся в тенях, пытаясь подслушать стражников у башни."
  },
  {
    id: "g13",
    url: workshopOintmentCheckupBalot,
    sessionId: "s1_26",
    characters: ["mort", "halid", "balot"],
    caption: "Морт подтверждает рыцарям, что Балот его пациент, пока голиаф незаметно уходит за мазью."
  },
];