export type LegendItem = {
  dotClass: 'blue' | 'mint' | 'pink';
  label: string;
  value: string;
};

export const expenseLegend: LegendItem[] = [
  { dotClass: 'blue', label: 'Транспорт', value: '900 ₽' },
  { dotClass: 'mint', label: 'Еда', value: '20 000 ₽' },
  { dotClass: 'pink', label: 'Развлечения', value: '9 000 ₽' },
];

export const incomeLegend: LegendItem[] = [
  { dotClass: 'blue', label: 'Зарплата', value: '110 000 ₽' },
  { dotClass: 'mint', label: 'Проекты', value: '110 000 ₽' },
];
