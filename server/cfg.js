// CONSTS
const RU = 'Rus';
const EU = 'Europe';
const AS = 'Asia';
const NA = 'North America';
const IL = 'Israel';
const PT = 'Petach Tikva';
const LA = 'Latin America';

// WOMEN CONST
const RUW = 'Rus W';
const EUW = 'Europe W';
const ASW = 'Asia W';
const NAW = 'North America W';
const ILW = 'Israel W';
const PTW = 'Petach Tikva W';
const LAW = 'Latin America W';

const groupsBy = [
    { "roomPrefix": "Africa", "groupBy": AS },
    { "roomPrefix": "Almaty", "groupBy": RU },
    { "roomPrefix": "Arava", "groupBy": IL },
    { "roomPrefix": "Argentina", "groupBy": LA },
    { "roomPrefix": "Armenia", "groupBy": RU },
    { "roomPrefix": "Ashdod", "groupBy": IL },
    { "roomPrefix": "Ashkelon", "groupBy": IL },
    { "roomPrefix": "Asia", "groupBy": AS },
    { "roomPrefix": "Austria", "groupBy": EU },
    { "roomPrefix": "Azerbaijan", "groupBy": RU },
    { "roomPrefix": "BB UK", "groupBy": EU },
    { "roomPrefix": "Baltia", "groupBy": EU },
    { "roomPrefix": "Barnaul", "groupBy": RU },
    { "roomPrefix": "Beer Sheva", "groupBy": IL },
    { "roomPrefix": "Belarus", "groupBy": RU },
    { "roomPrefix": "Berlin", "groupBy": EU },
    { "roomPrefix": "Bishkek", "groupBy": RU },
    { "roomPrefix": "Brazil", "groupBy": LA },
    { "roomPrefix": "Bulgaria", "groupBy": EU },
    { "roomPrefix": "CZSK YG", "groupBy": EU },
    { "roomPrefix": "Canada", "groupBy": NA },
    { "roomPrefix": "Centro America", "groupBy": LA },
    { "roomPrefix": "Chelyabinsk", "groupBy": RU },
    { "roomPrefix": "China", "groupBy": AS },
    { "roomPrefix": "Congo", "groupBy": AS },
    { "roomPrefix": "Croatia", "groupBy": EU },
    { "roomPrefix": "Czechoslovakia", "groupBy": EU },
    { "roomPrefix": "Dnepr", "groupBy": RU },
    { "roomPrefix": "EU DACH", "groupBy": EU },
    { "roomPrefix": "EU Shiur Boker 10", "groupBy": EU },
    { "roomPrefix": "EU Young Group", "groupBy": EU },
    { "roomPrefix": "Eilat", "groupBy": IL },
    { "roomPrefix": "Ekaterinburg", "groupBy": RU },
    { "roomPrefix": "Ethiopia", "groupBy": AS },
    { "roomPrefix": "Europe", "groupBy": EU },
    { "roomPrefix": "Far East Rus", "groupBy": RU },
    { "roomPrefix": "Finland", "groupBy": EU },
    { "roomPrefix": "Florida", "groupBy": NA },
    { "roomPrefix": "Focus Group", "groupBy": IL },
    { "roomPrefix": "French", "groupBy": EU },
    { "roomPrefix": "Galil West", "groupBy": IL },
    { "roomPrefix": "Georgia", "groupBy": RU },
    { "roomPrefix": "Germany", "groupBy": EU },
    { "roomPrefix": "Hadera", "groupBy": IL },
    { "roomPrefix": "Haifa", "groupBy": IL },
    { "roomPrefix": "Haver", "groupBy": IL },
    { "roomPrefix": "Haverim", "groupBy": RU },
    { "roomPrefix": "Hebrew", "groupBy": IL },
    { "roomPrefix": "Holland", "groupBy": EU },
    { "roomPrefix": "Hungary", "groupBy": EU },
    { "roomPrefix": "INFO", "groupBy": IL },
    { "roomPrefix": "ITA", "groupBy": EU },
    { "roomPrefix": "Istanbul", "groupBy": AS },
    { "roomPrefix": "Izmir", "groupBy": AS },
    { "roomPrefix": "Japan", "groupBy": AS },
    { "roomPrefix": "Jerusalem", "groupBy": IL },
    { "roomPrefix": "K.Shmona", "groupBy": IL },
    { "roomPrefix": "KabU", "groupBy": NA },
    { "roomPrefix": "Karmiel", "groupBy": IL },
    { "roomPrefix": "Kavkaz", "groupBy": RU },
    { "roomPrefix": "Kharkov", "groupBy": RU },
    { "roomPrefix": "Kiev", "groupBy": RU },
    { "roomPrefix": "Krasnodar", "groupBy": RU },
    { "roomPrefix": "Krasnoyarsk", "groupBy": RU },
    { "roomPrefix": "Latin", "groupBy": LA },
    { "roomPrefix": "MAK", "groupBy": RU },
    { "roomPrefix": "Medellin", "groupBy": LA },
    { "roomPrefix": "Mexico City", "groupBy": LA },
    { "roomPrefix": "Modiin", "groupBy": IL },
    { "roomPrefix": "Moldova", "groupBy": RU },
    { "roomPrefix": "Moscow", "groupBy": RU },
    { "roomPrefix": "Moscow EG", "groupBy": RU },
    { "roomPrefix": "Nahariya", "groupBy": IL },
    { "roomPrefix": "Netanya", "groupBy": IL },
    { "roomPrefix": "New York", "groupBy": NA },
    { "roomPrefix": "Nikolaev", "groupBy": RU },
    { "roomPrefix": "Nof HaGalil", "groupBy": IL },
    { "roomPrefix": "North America", "groupBy": NA },
    { "roomPrefix": "Novosibirsk", "groupBy": RU },
    { "roomPrefix": "Nur-Sultan", "groupBy": RU },
    { "roomPrefix": "Odessa", "groupBy": RU },
    { "roomPrefix": "Omsk", "groupBy": RU },
    { "roomPrefix": "P. Ashdod", "groupBy": IL },
    { "roomPrefix": "P. Hadera", "groupBy": IL },
    { "roomPrefix": "P. Haifa", "groupBy": IL },
    { "roomPrefix": "P. Hasharon", "groupBy": IL },
    { "roomPrefix": "P. Haver", "groupBy": IL },
    { "roomPrefix": "P. Jerusalem", "groupBy": IL },
    { "roomPrefix": "P. K.Shmona", "groupBy": IL },
    { "roomPrefix": "P. Modiin", "groupBy": IL },
    { "roomPrefix": "P. Naharia", "groupBy": IL },
    { "roomPrefix": "P. Netanya", "groupBy": IL },
    { "roomPrefix": "P. PT", "groupBy": PT },
    { "roomPrefix": "P. TLV", "groupBy": IL },
    { "roomPrefix": "P. Zichron", "groupBy": IL },
    { "roomPrefix": "PT", "groupBy": PT },
    { "roomPrefix": "Piter", "groupBy": RU },
    { "roomPrefix": "Poland", "groupBy": EU },
    { "roomPrefix": "Qazaqstan", "groupBy": RU },
    { "roomPrefix": "Queens", "groupBy": NA },
    { "roomPrefix": "Raanana", "groupBy": IL },
    { "roomPrefix": "Ramat Hagolan", "groupBy": IL },
    { "roomPrefix": "Rehovot", "groupBy": IL },
    { "roomPrefix": "Revadim", "groupBy": IL },
    { "roomPrefix": "Romania", "groupBy": EU },
    { "roomPrefix": "Rybinsk", "groupBy": RU },
    { "roomPrefix": "Salt Lake City", "groupBy": NA },
    { "roomPrefix": "Santiago", "groupBy": LA },
    { "roomPrefix": "Singapore", "groupBy": AS },
    { "roomPrefix": "Sochi", "groupBy": RU },
    { "roomPrefix": "Spain - Portugal", "groupBy": EU },
    { "roomPrefix": "St. Petersburg", "groupBy": RU },
    { "roomPrefix": "Tallinn", "groupBy": EU },
    { "roomPrefix": "Tbilisi", "groupBy": RU },
    { "roomPrefix": "Tel Aviv", "groupBy": IL },
    // { "roomPrefix": "Test", "groupBy": "" },
    { "roomPrefix": "Toronto", "groupBy": NA },
    { "roomPrefix": "Troitsk", "groupBy": RU },
    { "roomPrefix": "Turkey", "groupBy": AS },
    { "roomPrefix": "Tveria", "groupBy": IL },
    { "roomPrefix": "Tyumen", "groupBy": RU },
    { "roomPrefix": "USA", "groupBy": NA },
    { "roomPrefix": "Ukraine", "groupBy": RU },
    { "roomPrefix": "United VG", "groupBy": RU },
    { "roomPrefix": "Ural-Sib-Kaz", "groupBy": RU },
    { "roomPrefix": "Valparaiso", "groupBy": LA },
    { "roomPrefix": "Vienna", "groupBy": EU },
    { "roomPrefix": "Vilnius", "groupBy": EU },
    { "roomPrefix": "Volga", "groupBy": RU },
    { "roomPrefix": "W Africa", "groupBy": ASW },
    { "roomPrefix": "W Afula", "groupBy": ILW },
    { "roomPrefix": "W Almaty", "groupBy": RUW },
    { "roomPrefix": "W Arad", "groupBy": ILW },
    { "roomPrefix": "W Argentina", "groupBy": LAW },
    { "roomPrefix": "W Ashdod", "groupBy": ILW },
    { "roomPrefix": "W Ashkelon", "groupBy": ILW },
    { "roomPrefix": "W Asia", "groupBy": ASW },
    { "roomPrefix": "W Australia", "groupBy": ASW },
    { "roomPrefix": "W Austria", "groupBy": EUW },
    { "roomPrefix": "W Baden-W", "groupBy": EUW },
    { "roomPrefix": "W Baltia", "groupBy": EUW },
    { "roomPrefix": "W Bat-Yam", "groupBy": ILW },
    { "roomPrefix": "W Beer Sheva", "groupBy": ILW },
    { "roomPrefix": "W Belarus", "groupBy": RUW },
    { "roomPrefix": "W Berlin", "groupBy": EUW },
    { "roomPrefix": "W Bishkek", "groupBy": RUW },
    { "roomPrefix": "W Bogota", "groupBy": LAW },
    { "roomPrefix": "W Boston", "groupBy": NAW },
    { "roomPrefix": "W Brazil", "groupBy": LAW },
    { "roomPrefix": "W Bulgaria", "groupBy": EUW },
    { "roomPrefix": "W CZ-SL", "groupBy": EUW },
    { "roomPrefix": "W Chelyabinsk", "groupBy": RUW },
    { "roomPrefix": "W Chile", "groupBy": LAW },
    { "roomPrefix": "W DOM", "groupBy": EUW },
    { "roomPrefix": "W Darom", "groupBy": ILW },
    { "roomPrefix": "W Dnepr", "groupBy": RUW },
    { "roomPrefix": "W Eilat", "groupBy": ILW },
    { "roomPrefix": "W Ekaterinburg", "groupBy": RUW },
    { "roomPrefix": "W Em PT", "groupBy": ILW },
    { "roomPrefix": "W Eng ML", "groupBy": EUW },
    { "roomPrefix": "W Europe", "groupBy": EUW },
    { "roomPrefix": "W F Africa", "groupBy": ASW },
    { "roomPrefix": "W Far East Rus", "groupBy": RUW },
    { "roomPrefix": "W Finland", "groupBy": EUW },
    { "roomPrefix": "W Florida", "groupBy": NAW },
    { "roomPrefix": "W French", "groupBy": EUW },
    { "roomPrefix": "W Galil West", "groupBy": ILW },
    { "roomPrefix": "W Germany", "groupBy": EUW },
    { "roomPrefix": "W Hadera", "groupBy": ILW },
    { "roomPrefix": "W Haifa", "groupBy": ILW },
    { "roomPrefix": "W Hasharon", "groupBy": ILW },
    { "roomPrefix": "W Haver", "groupBy": ILW },
    { "roomPrefix": "W Hebrew", "groupBy": ILW },
    { "roomPrefix": "W Hgolan", "groupBy": ILW },
    { "roomPrefix": "W Holland", "groupBy": EUW },
    { "roomPrefix": "W Hungary", "groupBy": EUW },
    { "roomPrefix": "W INFO", "groupBy": ILW },
    { "roomPrefix": "W Irkutsk", "groupBy": RUW },
    { "roomPrefix": "W Italy", "groupBy": EUW },
    { "roomPrefix": "W Japan", "groupBy": ASW },
    { "roomPrefix": "W Jerusalem", "groupBy": ILW },
    { "roomPrefix": "W KabU", "groupBy": NAW },
    { "roomPrefix": "W Karmiel", "groupBy": ILW },
    { "roomPrefix": "W Kavkaz", "groupBy": RUW },
    { "roomPrefix": "W Kfar Saba", "groupBy": ILW },
    { "roomPrefix": "W Kharkov", "groupBy": RUW },
    { "roomPrefix": "W Kiev", "groupBy": RUW },
    { "roomPrefix": "W Kiryat Shmona", "groupBy": ILW },
    { "roomPrefix": "W Krasnoyarsk", "groupBy": RUW },
    { "roomPrefix": "W Latin", "groupBy": LAW },
    { "roomPrefix": "W MAK", "groupBy": RUW },
    { "roomPrefix": "W Modiin", "groupBy": ILW },
    { "roomPrefix": "W Moscow", "groupBy": RUW },
    { "roomPrefix": "W NA", "groupBy": NAW },
    { "roomPrefix": "W NY", "groupBy": NAW },
    { "roomPrefix": "W Nahariya", "groupBy": ILW },
    { "roomPrefix": "W Netanya", "groupBy": ILW },
    { "roomPrefix": "W Novosibirsk", "groupBy": RUW },
    { "roomPrefix": "W Odessa", "groupBy": RUW },
    { "roomPrefix": "W Omsk", "groupBy": RUW },
    { "roomPrefix": "W P. Ashdod", "groupBy": ILW },
    { "roomPrefix": "W P. Hadera", "groupBy": ILW },
    { "roomPrefix": "W P. Haifa", "groupBy": ILW },
    { "roomPrefix": "W P. Haver", "groupBy": ILW },
    { "roomPrefix": "W P. Jerusalem", "groupBy": ILW },
    { "roomPrefix": "W P. K.Shmona", "groupBy": ILW },
    { "roomPrefix": "W P. Naharia", "groupBy": ILW },
    { "roomPrefix": "W P. Netanya", "groupBy": ILW },
    { "roomPrefix": "W P. PT", "groupBy": PTW },
    { "roomPrefix": "W P. TLV", "groupBy": ILW },
    { "roomPrefix": "W P. Zichron", "groupBy": ILW },
    { "roomPrefix": "W PT", "groupBy": PTW },
    { "roomPrefix": "W Peru Ecuador", "groupBy": LAW },
    { "roomPrefix": "W Petrozavodsk", "groupBy": RUW },
    { "roomPrefix": "W Piter", "groupBy": RUW },
    { "roomPrefix": "W Poland", "groupBy": EUW },
    { "roomPrefix": "W Qazaqstan", "groupBy": RUW },
    { "roomPrefix": "W Queens", "groupBy": NAW },
    { "roomPrefix": "W Rehovot", "groupBy": ILW },
    { "roomPrefix": "W Revadim", "groupBy": ILW },
    { "roomPrefix": "W Romania", "groupBy": EUW },
    { "roomPrefix": "W Spain", "groupBy": EUW },
    { "roomPrefix": "W Tel Aviv", "groupBy": ILW },
    { "roomPrefix": "W Toronto", "groupBy": NAW },
    { "roomPrefix": "W Turkey", "groupBy": ASW },
    { "roomPrefix": "W Tveria", "groupBy": ILW },
    { "roomPrefix": "W UK", "groupBy": EUW },
    { "roomPrefix": "W USA", "groupBy": NAW },
    { "roomPrefix": "W Ukraine", "groupBy": RUW },
    { "roomPrefix": "W Unity", "groupBy": RUW },
    { "roomPrefix": "W V.Israel", "groupBy": ILW },
    { "roomPrefix": "W Vancouver", "groupBy": NAW },
    { "roomPrefix": "W Vladivostok", "groupBy": RUW },
    { "roomPrefix": "W Volga", "groupBy": RUW },
    // { "roomPrefix": "W World", "groupBy": "" },
    { "roomPrefix": "W Zichron", "groupBy": ILW },
    { "roomPrefix": "W МАК", "groupBy": RUW },
    { "roomPrefix": "W. Latin PC", "groupBy": LAW },
    { "roomPrefix": "Zaporizhzhia", "groupBy": RU },
    { "roomPrefix": "Zichron", "groupBy": IL }
]

module.exports = {
    groupsBy
}