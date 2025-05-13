const countries = [
  {
    name: 'Afghanistan',
    isoCode: 'AF',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Afganisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Albania',
    isoCode: 'AL',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Albánia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Algeria',
    isoCode: 'DZ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Algéria',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Andorra',
    isoCode: 'AD',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Andorra',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Angola',
    isoCode: 'AO',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Angola',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Antigua and Barbuda',
    isoCode: 'AG',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Antigua és Barbuda',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Argentina',
    isoCode: 'AR',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Argentína',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Armenia',
    isoCode: 'AM',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Örményország',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Australia',
    isoCode: 'AU',
    continent: 'Australia',
    translations: {
      hu: {
        name: 'Ausztrália',
        continent: 'Ausztrália',
      },
    },
  },
  {
    name: 'Austria',
    isoCode: 'AT',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Ausztria',
        continent: 'Europa',
      },
    },
  },
  {
    name: 'Azerbaijan',
    isoCode: 'AZ',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Azerbajdzsán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Bahamas',
    isoCode: 'BS',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Bahamák',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Bahrain',
    isoCode: 'BH',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Bahrein',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Bangladesh',
    isoCode: 'BD',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Banglades',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Barbados',
    isoCode: 'BB',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Barbados',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Belarus',
    isoCode: 'BY',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Fehéroroszország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Belgium',
    isoCode: 'BE',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Belgium',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Belize',
    isoCode: 'BZ',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Belize',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Benin',
    isoCode: 'BJ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Benin',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Bermuda',
    isoCode: 'BM',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Bermuda',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Bhutan',
    isoCode: 'BT',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Bhután',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Bolivia',
    isoCode: 'BO',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Bolívia',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Bosnia Herzegovina',
    isoCode: 'BA',
    continent: 'Europa',
    translations: {
      hu: {
        name: 'Bosznia-Hercegovina',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Botswana',
    isoCode: 'BW',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Botswana',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Brazil',
    isoCode: 'BR',
    continent: 'South Amerika',
    translations: {
      hu: {
        name: 'Brazília',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Brunei',
    isoCode: 'BN',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Brunei',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Bulgaria',
    isoCode: 'BG',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Bulgária',
        continent: 'Europe',
      },
    },
  },
  {
    name: 'Burkina Faso',
    isoCode: 'BF',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Burkina Faso',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Burundi',
    isoCode: 'BI',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Burundi',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Cambodia',
    isoCode: 'KH',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Kambodzsa',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Cameroon',
    isoCode: 'CM',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Kamerun',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Canada',
    isoCode: 'CA',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Kanada',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Cape Verde',
    isoCode: 'CV',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Zöld-foki Köztársaság',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Central African Republic',
    isoCode: 'CF',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Közép-afrikai Köztársaság',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Chad',
    isoCode: 'TD',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Csád',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Chile',
    isoCode: 'CL',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Chile',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'China',
    isoCode: 'CN',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Kína',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Colombia',
    isoCode: 'CO',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Kolumbia',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Comoros',
    isoCode: 'KM',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Comore-szigetek',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Congo',
    isoCode: 'CG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Kongó',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Congo (Democratic Republic)',
    isoCode: 'CD',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Kongói Demokratikus Köztársaság',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Costa Rica',
    isoCode: 'CR',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Costa Rica',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Croatia',
    isoCode: 'HR',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Horvátország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Cuba',
    isoCode: 'CU',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Kuba',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Cyprus',
    isoCode: 'CY',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Ciprus',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Czech Republic',
    isoCode: 'CZ',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Csehország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Denmark',
    isoCode: 'DK',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Dánia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Djibouti',
    isoCode: 'DJ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Dzsibuti',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Dominica',
    isoCode: 'DM',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Dzsibuti',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Dominican Republic',
    isoCode: 'DO',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Dominikai Köztársaság',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Ecuador',
    isoCode: 'EC',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Ecuador',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Egypt',
    isoCode: 'EG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Egyiptom',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'El Salvador',
    isoCode: 'SV',
    continent: 'North America',
    translations: {
      hu: {
        name: 'El Salvador',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Equatorial Guinea',
    isoCode: 'GQ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Egyenlítői-Guinea',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Eritrea',
    isoCode: 'ER',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Eritrea',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Estonia',
    isoCode: 'EE',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Észtország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Ethiopia',
    isoCode: 'ET',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Etiópia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Finland',
    isoCode: 'FI',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Finnország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'France',
    isoCode: 'FR',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Franciaország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Gabon',
    isoCode: 'GA',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Gabon',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Gambia',
    isoCode: 'GM',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Gambia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Georgia',
    isoCode: 'GE',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Georgia (Grúzia)',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Germany',
    isoCode: 'DE',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Németország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Ghana',
    isoCode: 'GH',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Ghána',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Greece',
    isoCode: 'GR',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Görögország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Grenada',
    isoCode: 'GD',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Grenada',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Guatemala',
    isoCode: 'GT',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Guatemala',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Guinea',
    isoCode: 'GN',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Guinea',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Guinea-Bissau',
    isoCode: 'GW',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Bissau-Guinea',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Guyana',
    isoCode: 'GY',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Guyana',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Haiti',
    isoCode: 'HT',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Haiti',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Honduras',
    isoCode: 'HN',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Honduras',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Hungary',
    isoCode: 'HU',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Magyarország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Iceland',
    isoCode: 'IS',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Izland',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'India',
    isoCode: 'IN',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'India',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Indonesia',
    isoCode: 'ID',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Indonézia',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Iran',
    isoCode: 'IR',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Irán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Iraq',
    isoCode: 'IQ',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Irak',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Ireland (Republic)',
    isoCode: 'IE',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Írország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Israel',
    isoCode: 'IL',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Izrael',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Italy',
    isoCode: 'IT',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Olaszország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Ivory Coast',
    isoCode: 'CI',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Elefántcsontpart',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Jamaica',
    isoCode: 'JM',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Jamaica',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Japan',
    isoCode: 'JP',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Japán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Jordan',
    isoCode: 'JO',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Jordánia',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Kazakhstan',
    isoCode: 'KZ',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Kazahsztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Kenya',
    isoCode: 'KE',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Kenya',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Kiribati',
    isoCode: 'KI',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Kiribati',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Korea North',
    isoCode: 'KP',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Észak-Korea',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Korea South',
    isoCode: 'KR',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Dél-Korea',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Kosovo',
    isoCode: 'XK',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Koszovó',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Kuwait',
    isoCode: 'KW',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Kuvait',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Kyrgyzstan',
    isoCode: 'KG',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Kirgizisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Laos',
    isoCode: 'LA',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Laosz',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Latvia',
    isoCode: 'LV',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Lettország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Lebanon',
    isoCode: 'LB',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Libanon',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Lesotho',
    isoCode: 'LS',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Lesotho',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Liberia',
    isoCode: 'LR',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Libéria',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Libya',
    isoCode: 'LY',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Líbia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Liechtenstein',
    isoCode: 'LI',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Liechtenstein',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Lithuania',
    isoCode: 'LT',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Litvánia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Luxembourg',
    isoCode: 'LU',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Luxemburg',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'North Macedonia',
    isoCode: 'MK',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Észak-Macedónia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Madagascar',
    isoCode: 'MG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Madagaszkár',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Malawi',
    isoCode: 'MW',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Malawi',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Malaysia',
    isoCode: 'MY',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Malaysia',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Maldives',
    isoCode: 'MV',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Maldív-szigetek',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Mali',
    isoCode: 'ML',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Mali',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Malta',
    isoCode: 'MT',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Málta',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Marshall Islands',
    isoCode: 'MH',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Marshall-szigetek',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Mauritania',
    isoCode: 'MR',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Mauritánia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Mauritius',
    isoCode: 'MU',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Mauritius',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Mexico',
    isoCode: 'MX',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Mexikó',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Micronesia',
    isoCode: 'FM',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Mikronézia',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Moldova',
    isoCode: 'MD',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Moldova',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Monaco',
    isoCode: 'MC',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Monaco',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Mongolia',
    isoCode: 'MN',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Mongólia',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Montenegro',
    isoCode: 'ME',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Montenegró',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Morocco',
    isoCode: 'MA',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Marokkó',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Mozambique',
    isoCode: 'MZ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Mozambik',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Myanmar',
    isoCode: 'MM',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Mianmar',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Namibia',
    isoCode: 'NA',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Namíbia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Nauru',
    isoCode: 'NR',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Nauru',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Nepal',
    isoCode: 'NP',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Nepál',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Netherlands',
    isoCode: 'NL',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Hollandia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'New Zealand',
    isoCode: 'NZ',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Új-Zéland',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Nicaragua',
    isoCode: 'NI',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Nicaragua',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Niger',
    isoCode: 'NE',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Niger',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Nigeria',
    isoCode: 'NG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Nigéria',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Norway',
    isoCode: 'NO',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Norvégia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Oman',
    isoCode: 'OM',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Omán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Pakistan',
    isoCode: 'PK',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Pakisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Palau',
    isoCode: 'PW',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Palau',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Panama',
    isoCode: 'PA',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Panama',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Papua New Guinea',
    isoCode: 'PG',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Pápua Új-Guinea',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Paraguay',
    isoCode: 'PY',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Paraguay',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Peru',
    isoCode: 'PE',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Peru',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Philippines',
    isoCode: 'PH',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Fülöp-szigetek',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Poland',
    isoCode: 'PL',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Lengyelország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Portugal',
    isoCode: 'PT',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Portugália',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Qatar',
    isoCode: 'QA',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Katar',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Romania',
    isoCode: 'RO',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Románia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Russia',
    isoCode: 'RU',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Oroszország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Rwanda',
    isoCode: 'RW',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Ruanda',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Saint Kitts and Nevis',
    isoCode: 'KN',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Saint Kitts és Nevis',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'St Lucia',
    isoCode: 'LC',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Szent Lucia',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Saint Vincent and the Grenadines',
    isoCode: 'VC',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Saint Vincent és a Grenadine-szigetek',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Samoa',
    isoCode: 'WS',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Szamoa',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'San Marino',
    isoCode: 'SM',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'San Marino',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Sao Tome and Principe',
    isoCode: 'ST',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'São Tomé és Príncipe',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Saudi Arabia',
    isoCode: 'SA',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Szaúd-Arábia',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Senegal',
    isoCode: 'SN',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Szenegál',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Serbia',
    isoCode: 'RS',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Szerbia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Seychelles',
    isoCode: 'SC',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Seychelle-szigetek',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Sierra Leone',
    isoCode: 'SL',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Sierra Leone',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Singapore',
    isoCode: 'SG',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Szingapúr',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Slovakia',
    isoCode: 'SK',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Szlovákia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Slovenia',
    isoCode: 'SI',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Szlovénia',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Solomon Islands',
    isoCode: 'SB',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Salamon-szigetek',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Somalia',
    isoCode: 'SO',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Szomália',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'South Africa',
    isoCode: 'ZA',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Dél-Afrika',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'South Sudan',
    isoCode: 'SS',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Dél-Szudán',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Spain',
    isoCode: 'ES',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Spanyolország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Sri Lanka',
    isoCode: 'LK',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Srí Lanka',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Sudan',
    isoCode: 'SD',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Szudán',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Suriname',
    isoCode: 'SR',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Suriname',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Swaziland',
    isoCode: 'SZ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Szváziföld',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Sweden',
    isoCode: 'SE',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Svédország',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Switzerland',
    isoCode: 'CH',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Svájc',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Syria',
    isoCode: 'SY',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Szíria',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Taiwan',
    isoCode: 'TW',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Tajvan',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Tajikistan',
    isoCode: 'TJ',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Tádzsikisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Tanzania',
    isoCode: 'TZ',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Tanzánia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Thailand',
    isoCode: 'TH',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Thaiföld',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Togo',
    isoCode: 'TG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Togo',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Tonga',
    isoCode: 'TO',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Tonga',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Trinidad and Tobago',
    isoCode: 'TT',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Trinidad és Tobago',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Tunisia',
    isoCode: 'TN',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Tunézia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Turkey',
    isoCode: 'TR',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Törökország',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Turkmenistan',
    isoCode: 'TM',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Türkmenisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Tuvalu',
    isoCode: 'TV',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Tuvalu',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Uganda',
    isoCode: 'UG',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Uganda',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Ukraine',
    isoCode: 'UA',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Ukrajna',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'United Arab Emirates',
    isoCode: 'AE',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Egyesült Arab Emírségek',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'United Kingdom',
    isoCode: 'GB',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Egyesült Királyság',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'United States',
    isoCode: 'US',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Egyesült Államok',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Uruguay',
    isoCode: 'UY',
    continent: 'North America',
    translations: {
      hu: {
        name: 'Egyesült Államok',
        continent: 'Észak Amerika',
      },
    },
  },
  {
    name: 'Uzbekistan',
    isoCode: 'UZ',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Üzbegisztán',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Vanuatu',
    isoCode: 'VU',
    continent: 'Oceania',
    translations: {
      hu: {
        name: 'Vanuatu',
        continent: 'Óceánia',
      },
    },
  },
  {
    name: 'Vatican City',
    isoCode: 'VA',
    continent: 'Europe',
    translations: {
      hu: {
        name: 'Vatikánváros',
        continent: 'Európa',
      },
    },
  },
  {
    name: 'Venezuela',
    isoCode: 'VE',
    continent: 'South America',
    translations: {
      hu: {
        name: 'Venezuela',
        continent: 'Dél-Amerika',
      },
    },
  },
  {
    name: 'Vietnam',
    isoCode: 'VN',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Vietnam',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Yemen',
    isoCode: 'YE',
    continent: 'Asia',
    translations: {
      hu: {
        name: 'Jemen',
        continent: 'Ázsia',
      },
    },
  },
  {
    name: 'Zambia',
    isoCode: 'ZM',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Zambia',
        continent: 'Afrika',
      },
    },
  },
  {
    name: 'Zimbabwe',
    isoCode: 'ZW',
    continent: 'Africa',
    translations: {
      hu: {
        name: 'Zimbabwe',
        continent: 'Afrika',
      },
    },
  },
];

export default countries;
