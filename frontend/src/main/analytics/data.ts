export type ViewMode = {
  label: string;
  href: string;
  active?: boolean;
};

export type PeriodOption = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
};

export type StatItem = {
  label: string;
  value: string;
  tone?: 'green' | 'red';
};

export type CategoryItem = {
  name: string;
  amount: string;
  tone: 'green' | 'red';
};

export type OperationItem = {
  id: number;
  title: string;
  tag: string;
  date: string;
  amount: string;
  tone: 'green' | 'red';
  href: string;
};

export const analyticsData = {
  closeHref: 'home.html',
  title: 'Аналитика',
  subtitle: 'Наглядная статистика личных или семейных финансов',
  views: [
    { label: 'Личная аналитика', href: '#' },
    { label: 'Семейная аналитика', href: '#', active: true },
  ] satisfies ViewMode[],
  periods: [
    { id: 'all-time', label: 'Все время', href: '#' },
    { id: 'today', label: 'Сегодня', href: '#' },
    { id: 'week', label: 'Эта неделя', href: '#' },
    { id: 'month', label: 'Этот месяц', href: '#' },
    { id: 'custom', label: 'Свой период', href: '#', active: true },
  ] satisfies PeriodOption[],
  dateRange: {
    from: '23.03.2026',
    to: '04.05.2026',
    applyHref: '#',
  },
  stats: [
    { label: 'Баланс за период', value: '92\u202f000\u202f₽' },
    { label: 'Доходы', value: '110\u202f000\u202f₽', tone: 'green' },
    { label: 'Расходы', value: '22\u202f000\u202f₽', tone: 'red' },
  ] satisfies StatItem[],
  expenseCategories: [
    { name: 'Еда', amount: '9\u202f000\u202f₽', tone: 'red' },
    { name: 'Транспорт', amount: '2\u202f000\u202f₽', tone: 'red' },
    { name: 'Развлечения', amount: '29\u202f000\u202f₽', tone: 'red' },
  ] satisfies CategoryItem[],
  incomeCategories: [
    { name: 'Зарплата', amount: '200\u202f000\u202f₽', tone: 'green' },
    { name: 'Проекты', amount: '92\u202f000\u202f₽', tone: 'green' },
  ] satisfies CategoryItem[],
  operationsCount: 29,
  operations: [
    {
      id: 1,
      title: 'Зарплата',
      tag: 'Зарплата',
      date: '29.03.2026',
      amount: '+85\u202f000\u202f₽',
      tone: 'green',
      href: '#',
    },
    {
      id: 2,
      title: 'Проект',
      tag: 'Проекты',
      date: '27.03.2026',
      amount: '+90\u202f000\u202f₽',
      tone: 'green',
      href: '#',
    },
  ] satisfies OperationItem[],
  showMoreHref: '#',
  exportHref: '#',
};
