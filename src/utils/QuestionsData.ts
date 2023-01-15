import Refrigerator from "@assets/geladeira.png";
import Cooktop from "@assets/cooktop.png";
import EletricOven from "@assets/forno-eletrico.png";
import Microwave from "@assets/microondas.png";
import WashingMachine from "@assets/maquina-lavar-roupa.png";
import ClothesDryer from "@assets/secadora-roupa.png";
import Shower from "@assets/chuveiro.png";
import HairDryer from "@assets/secador-cabelo.png";
import EletricFaucet from "@assets/torneira-eletrica.png";
import AirConditioner from "@assets/ar-condicionado.png";
import Fan from "@assets/ventilador.png";
import VacuumCleaner from "@assets/aspirador-po.png";
import EletricIron from "@assets/ferro-eletrico.png";
import Videogame from "@assets/videogame.png";
import Tv from "@assets/tv.png";
import Computer from "@assets/pc.png";

export const Questions = [
  "Quantos você possui em casa?",
  "Quanto tempo o aparelho fica ligado?",
  "Com qual frequência você o usa?",
];

export const QuestionsData = [
  {
    categoryName: "Cozinha",
    src: Refrigerator,
    itemName: "Geladeira",
    inputName: "refrigerator",
    maxRangeInput: 5,
  },
  {
    categoryName: "Cozinha",
    src: Cooktop,
    itemName: "Cooktop",
    inputName: "eletric_stove",
    maxRangeInput: 5,
  },
  {
    categoryName: "Cozinha",
    src: EletricOven,
    itemName: "Forno elétrico",
    inputName: "eletric_oven",
    maxRangeInput: 5,
  },
  {
    categoryName: "Cozinha",
    src: Microwave,
    itemName: "Micro-ondas",
    inputName: "microwave",
    maxRangeInput: 10,
  },
  {
    categoryName: "Lavanderia",
    src: WashingMachine,
    itemName: "Máquina de lavar roupa",
    inputName: "washing_machine",
    maxRangeInput: 5,
  },
  {
    categoryName: "Lavanderia",
    src: ClothesDryer,
    itemName: "Secadora de roupas",
    inputName: "clothes_dryer",
    maxRangeInput: 5,
  },
  {
    categoryName: "Banheiro",
    src: Shower,
    itemName: "Chuveiro elétrico",
    inputName: "shower",
    maxRangeInput: 10,
  },
  {
    categoryName: "Banheiro",
    src: HairDryer,
    itemName: "Secador de cabelo",
    inputName: "hair_dryer",
    maxRangeInput: 10,
  },
  {
    categoryName: "Banheiro",
    src: EletricFaucet,
    itemName: "Torneira elétrica",
    inputName: "eletric_faucet",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrodomésticos",
    src: AirConditioner,
    itemName: "Ar-condicionado",
    inputName: "air_conditioner",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrodomésticos",
    src: Fan,
    itemName: "Ventilador",
    inputName: "fan",
    maxRangeInput: 20,
  },
  {
    categoryName: "Eletrodomésticos",
    src: VacuumCleaner,
    itemName: "Aspirador de pó",
    inputName: "vacuum_cleaner",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrodomésticos",
    src: EletricIron,
    itemName: "Ferro elétrico",
    inputName: "eletric_iron",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrônicos",
    src: Videogame,
    itemName: "Videogame",
    inputName: "videogame",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrônicos",
    src: Tv,
    itemName: "Televisão",
    inputName: "tv",
    maxRangeInput: 10,
  },
  {
    categoryName: "Eletrônicos",
    src: Computer,
    itemName: "Computador",
    inputName: "computer",
    maxRangeInput: 10,
  },
];
