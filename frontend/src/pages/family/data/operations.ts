export type Operation = {
  title: string;
  tag: string;
  date: string;
  amount: string;
  color: 'green' | 'red';
};

export const operations: Operation[] = [
  { title: 'Зарплата', tag: 'Зарплата', date: '29.03.2026', amount: '+85 000 ₽', color: 'green' },
  { title: 'Проект', tag: 'Проекты', date: '27.03.2026', amount: '+90 000 ₽', color: 'green' },
  { title: 'Продукты', tag: 'Еда', date: '27.03.2026', amount: '-2 000 ₽', color: 'red' },
  { title: 'Проект', tag: 'Зарплата', date: '22.03.2026', amount: '+20 000 ₽', color: 'green' },
  { title: 'Такси', tag: 'Транспорт', date: '20.03.2026', amount: '-500 ₽', color: 'red' },
  { title: 'Кино', tag: 'Развлечения', date: '20.03.2026', amount: '-900 ₽', color: 'red' },
  { title: 'Проект', tag: 'Проекты', date: '11.03.2026', amount: '+22 000 ₽', color: 'green' },
  { title: 'Проект', tag: 'Проекты', date: '11.03.2026', amount: '+22 000 ₽', color: 'green' },
];
