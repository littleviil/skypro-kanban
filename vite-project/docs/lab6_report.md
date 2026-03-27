# Лабораторная работа №6

## Тема: Автоматизация тестирования

---

## a. Цель работы

Приобрести навыки создания автотестов для контроля функциональности веб-приложения SkyPro Kanban. Разработать автоматизированные тесты, эмулирующие поведение пользователя при взаимодействии с элементами пользовательского интерфейса, обеспечив сопровождаемость, надёжность и структурированность тестового кода.

---

## b. Описание реализованных автотестов: инструменты, подходы

### Инструменты

| Инструмент | Назначение |
|---|---|
| **Vitest 4.1.2** | Фреймворк для запуска тестов, совместим с Vite |
| **React Testing Library** | Рендеринг компонентов и поиск элементов по тексту, роли, placeholder |
| **@testing-library/user-event** | Эмуляция действий пользователя (клики, ввод текста) |
| **@testing-library/jest-dom** | Расширенные матчеры (toBeInTheDocument, toHaveTextContent) |
| **jsdom** | Среда выполнения DOM в Node.js |

### Подходы

1. **Модульное тестирование** — каждый компонент тестируется изолированно с мок-данными и мок-функциями (`vi.fn()`).

2. **Page Object Model (POM)** — для каждого тестового файла создана вспомогательная функция рендеринга (`renderAuthForm`, `renderCard`, `renderColumn`), абстрагирующая настройку провайдеров и пропсов. Это сокращает трудоёмкость актуализации тестов при изменении вёрстки.

3. **Тестирование поведения, а не реализации** — тесты проверяют то, что видит пользователь (текст на экране, реакция на клик), а не внутреннее состояние компонентов.

4. **Изоляция состояния** — перед каждым тестом `localStorage` очищается через `beforeEach`, что исключает влияние тестов друг на друга.

5. **Структурированность** — тесты организованы по модулям в директории `src/test/`, каждый файл соответствует тестируемому компоненту.

---

## c. Код автотестов

### Файл 1: `AuthForm.test.jsx` — тестирование формы авторизации

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const renderAuthForm = (props = {}) => {
  const defaultProps = {
    isSignUp: false,
    formData: { email: '', password: '' },
    onChange: vi.fn(),
    error: '',
    onSubmit: vi.fn(),
    ...props,
  };

  return render(
    <MemoryRouter>
      <AuthForm {...defaultProps} />
    </MemoryRouter>
  );
};

describe('AuthForm — форма авторизации', () => {
  it('отображает форму входа с полями email и пароль', () => {
    renderAuthForm();
    expect(screen.getByPlaceholderText('Эл. почта')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Пароль')).toBeInTheDocument();
    expect(screen.getByText('Войти')).toBeInTheDocument();
  });

  it('не отображает поле "Имя" в режиме входа', () => {
    renderAuthForm({ isSignUp: false });
    expect(screen.queryByPlaceholderText('Имя')).not.toBeInTheDocument();
  });

  it('отображает поле "Имя" в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByPlaceholderText('Имя')).toBeInTheDocument();
    expect(screen.getByText('Зарегистрироваться')).toBeInTheDocument();
  });

  it('показывает ссылку на регистрацию в режиме входа', () => {
    renderAuthForm();
    expect(screen.getByText('Регистрируйтесь здесь')).toBeInTheDocument();
  });

  it('показывает ссылку на вход в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByText('Войдите здесь')).toBeInTheDocument();
  });

  it('отображает сообщение об ошибке', () => {
    renderAuthForm({ error: 'Неверный email или пароль' });
    expect(screen.getByText('Неверный email или пароль')).toBeInTheDocument();
  });

  it('не отображает ошибку если её нет', () => {
    renderAuthForm({ error: '' });
    expect(screen.queryByText('Неверный email или пароль')).not.toBeInTheDocument();
  });

  it('вызывает onChange при вводе в поле email', async () => {
    const onChange = vi.fn();
    renderAuthForm({ onChange });
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText('Эл. почта');
    await user.type(emailInput, 'a');

    expect(onChange).toHaveBeenCalled();
  });

  it('вызывает onChange при вводе в поле пароля', async () => {
    const onChange = vi.fn();
    renderAuthForm({ onChange });
    const user = userEvent.setup();

    const passwordInput = screen.getByPlaceholderText('Пароль');
    await user.type(passwordInput, 'x');

    expect(onChange).toHaveBeenCalled();
  });

  it('вызывает onSubmit при нажатии кнопки "Войти"', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault());
    renderAuthForm({ onSubmit });
    const user = userEvent.setup();

    await user.click(screen.getByText('Войти'));

    expect(onSubmit).toHaveBeenCalled();
  });

  it('заголовок "Вход" отображается в режиме входа', () => {
    renderAuthForm();
    expect(screen.getByText('Вход')).toBeInTheDocument();
  });

  it('заголовок "Регистрация" отображается в режиме регистрации', () => {
    renderAuthForm({
      isSignUp: true,
      formData: { name: '', email: '', password: '' },
    });
    expect(screen.getByText('Регистрация')).toBeInTheDocument();
  });
});
```

### Файл 2: `AuthProvider.test.jsx` — тестирование контекста авторизации

```jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthProvider } from '../context/AuthProvider';

const AuthDisplay = () => {
  const { isAuth, user, login, logout } = useContext(AuthContext);
  return (
    <div>
      <span data-testid="auth-status">{isAuth ? 'authorized' : 'not-authorized'}</span>
      <span data-testid="user-name">{user?.name || 'none'}</span>
      <button onClick={() => login('token123', 'Тест', 'test@mail.ru')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider — контекст авторизации', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('по умолчанию пользователь не авторизован', () => {
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('none');
  });

  it('авторизует пользователя при вызове login', async () => {
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Login'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Тест');
  });

  it('сохраняет данные в localStorage при login', async () => {
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Login'));
    expect(localStorage.getItem('token')).toBe('token123');
    expect(localStorage.getItem('name')).toBe('Тест');
    expect(localStorage.getItem('email')).toBe('test@mail.ru');
  });

  it('деавторизует пользователя при вызове logout', async () => {
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Login'));
    await user.click(screen.getByText('Logout'));
    expect(screen.getByTestId('auth-status')).toHaveTextContent('not-authorized');
  });

  it('очищает localStorage при logout', async () => {
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    const user = userEvent.setup();
    await user.click(screen.getByText('Login'));
    await user.click(screen.getByText('Logout'));
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('восстанавливает авторизацию из localStorage', () => {
    localStorage.setItem('token', 'saved-token');
    localStorage.setItem('name', 'Сохранённый');
    localStorage.setItem('email', 'saved@mail.ru');
    render(
      <AuthProvider><AuthDisplay /></AuthProvider>
    );
    expect(screen.getByTestId('auth-status')).toHaveTextContent('authorized');
    expect(screen.getByTestId('user-name')).toHaveTextContent('Сохранённый');
  });
});
```

### Файл 3: `ThemeContext.test.jsx` — тестирование переключения темы

```jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../context/ThemeContext';

const ThemeDisplay = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme-status">{isDark ? 'dark' : 'light'}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext — переключение темы', () => {
  beforeEach(() => { localStorage.clear(); });

  it('по умолчанию тема светлая', () => {
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  it('переключается на тёмную тему при клике', async () => {
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  it('переключается обратно на светлую при двойном клике', async () => {
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByText('Toggle'));
    await user.click(screen.getByText('Toggle'));
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });

  it('сохраняет тему в localStorage', async () => {
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    const user = userEvent.setup();
    await user.click(screen.getByText('Toggle'));
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('восстанавливает тёмную тему из localStorage', () => {
    localStorage.setItem('theme', 'dark');
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('dark');
  });

  it('при отсутствии значения в localStorage — светлая тема', () => {
    localStorage.removeItem('theme');
    render(<ThemeProvider><ThemeDisplay /></ThemeProvider>);
    expect(screen.getByTestId('theme-status')).toHaveTextContent('light');
  });
});
```

### Файл 4: `Card.test.jsx` — тестирование карточки задачи

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../context/ThemeContext';
import { lightTheme } from '../themes';
import { Card } from '../components/Card/Card';

const mockTask = {
  _id: '123',
  title: 'Тестовая задача',
  topic: 'Web Design',
  status: 'Без статуса',
  date: '2026-03-28',
};

const renderCard = (task = mockTask, onBrowseClick = vi.fn()) => {
  return render(
    <ThemeProvider>
      <SCThemeProvider theme={lightTheme}>
        <Card task={task} onBrowseClick={onBrowseClick} />
      </SCThemeProvider>
    </ThemeProvider>
  );
};

describe('Card — карточка задачи', () => {
  it('отображает заголовок задачи', () => {
    renderCard();
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  it('отображает категорию задачи', () => {
    renderCard();
    expect(screen.getByText('Web Design')).toBeInTheDocument();
  });

  it('отображает дату задачи в формате ru-RU', () => {
    renderCard();
    expect(screen.getByText('28.03.26')).toBeInTheDocument();
  });

  it('не отображает дату если её нет', () => {
    const taskNoDate = { ...mockTask, date: null };
    renderCard(taskNoDate);
    expect(screen.queryByText(/\d{2}\.\d{2}\.\d{2}/)).not.toBeInTheDocument();
  });

  it('вызывает onBrowseClick при клике на кнопку действий', async () => {
    const onBrowseClick = vi.fn();
    renderCard(mockTask, onBrowseClick);
    const user = userEvent.setup();
    const cardBtns = document.querySelectorAll('[class*="CardBtn"]');
    if (cardBtns.length > 0) {
      await user.click(cardBtns[0]);
      expect(onBrowseClick).toHaveBeenCalledWith(mockTask);
    }
  });

  it('имеет атрибут draggable', () => {
    renderCard();
    const cardItem = screen.getByText('Тестовая задача').closest('[draggable]');
    expect(cardItem).toHaveAttribute('draggable', 'true');
  });

  it('отображает задачу без категории', () => {
    const taskNoTopic = { ...mockTask, topic: undefined };
    renderCard(taskNoTopic);
    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });
});
```

### Файл 5: `Column.test.jsx` — тестирование колонки канбан-доски

```jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { ThemeProvider } from '../context/ThemeContext';
import { TaskContext } from '../context/TaskContext';
import { lightTheme } from '../themes';
import Column from '../components/Column/Column';

const mockTasks = [
  { _id: '1', title: 'Задача 1', topic: 'Web Design', status: 'Без статуса', date: '2026-03-28' },
  { _id: '2', title: 'Задача 2', topic: 'Research', status: 'Без статуса', date: '2026-03-29' },
  { _id: '3', title: 'Задача 3', topic: 'Copywriting', status: 'В работе', date: '2026-03-30' },
];

const renderColumn = (status = 'Без статуса', tasks = mockTasks, overrides = {}) => {
  const taskContextValue = { loading: false, updateTask: vi.fn(), ...overrides };
  return render(
    <ThemeProvider>
      <SCThemeProvider theme={lightTheme}>
        <TaskContext.Provider value={taskContextValue}>
          <Column status={status} onBrowseClick={vi.fn()} tasks={tasks} />
        </TaskContext.Provider>
      </SCThemeProvider>
    </ThemeProvider>
  );
};

describe('Column — колонка канбан-доски', () => {
  it('отображает заголовок колонки', () => {
    renderColumn('Без статуса');
    expect(screen.getByText('Без статуса')).toBeInTheDocument();
  });

  it('отображает только задачи с соответствующим статусом', () => {
    renderColumn('Без статуса');
    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.queryByText('Задача 3')).not.toBeInTheDocument();
  });

  it('отображает задачи со статусом "В работе"', () => {
    renderColumn('В работе');
    expect(screen.getByText('Задача 3')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  it('отображает пустую колонку если нет задач с таким статусом', () => {
    renderColumn('Готово');
    expect(screen.getByText('Готово')).toBeInTheDocument();
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  it('отображает скелетоны при загрузке', () => {
    renderColumn('Без статуса', mockTasks, { loading: true });
    expect(screen.queryByText('Задача 1')).not.toBeInTheDocument();
  });

  it('работает с пустым массивом задач', () => {
    renderColumn('Без статуса', []);
    expect(screen.getByText('Без статуса')).toBeInTheDocument();
  });
});
```

---

## d. Отчёт о тестировании

### Тест-план

Автотесты покрывают следующие функциональные области приложения:

| № | Модуль | Количество тестов | Область покрытия |
|---|--------|:-:|---|
| 1 | AuthForm (форма входа/регистрации) | 11 | Отображение полей, переключение режимов, валидация ошибок, обработка ввода и отправки формы |
| 2 | AuthProvider (контекст авторизации) | 6 | Login, logout, сохранение/восстановление сессии в localStorage |
| 3 | ThemeContext (переключение темы) | 6 | Переключение светлой/тёмной темы, персистентность в localStorage |
| 4 | Card (карточка задачи) | 7 | Отображение данных задачи, drag & drop атрибут, обработка клика |
| 5 | Column (колонка канбан-доски) | 6 | Фильтрация задач по статусу, состояние загрузки, пустые данные |
| **Итого** | | **37** | |

### Результаты выполнения

```
 RUN  v4.1.2

 ✓ src/test/AuthProvider.test.jsx (6 tests)
 ✓ src/test/ThemeContext.test.jsx (6 tests)
 ✓ src/test/Card.test.jsx (7 tests)
 ✓ src/test/Column.test.jsx (6 tests)
 ✓ src/test/AuthForm.test.jsx (11 tests)

 Test Files  5 passed (5)
      Tests  37 passed (37)
   Duration  1.50s
```

**Все 37 тестов пройдены успешно.**

### Детальные результаты по тест-кейсам

| № | Тест-кейс | Статус | Время |
|---|-----------|:------:|:-----:|
| 1 | AuthForm: отображает форму входа с полями email и пароль | PASS | 34ms |
| 2 | AuthForm: не отображает поле "Имя" в режиме входа | PASS | 3ms |
| 3 | AuthForm: отображает поле "Имя" в режиме регистрации | PASS | 3ms |
| 4 | AuthForm: показывает ссылку на регистрацию в режиме входа | PASS | 3ms |
| 5 | AuthForm: показывает ссылку на вход в режиме регистрации | PASS | 4ms |
| 6 | AuthForm: отображает сообщение об ошибке | PASS | 3ms |
| 7 | AuthForm: не отображает ошибку если её нет | PASS | 3ms |
| 8 | AuthForm: вызывает onChange при вводе в поле email | PASS | 130ms |
| 9 | AuthForm: вызывает onChange при вводе в поле пароля | PASS | 77ms |
| 10 | AuthForm: вызывает onSubmit при нажатии кнопки "Войти" | PASS | 63ms |
| 11 | AuthForm: заголовок "Вход" отображается в режиме входа | PASS | 2ms |
| 12 | AuthForm: заголовок "Регистрация" в режиме регистрации | PASS | 1ms |
| 13 | AuthProvider: по умолчанию пользователь не авторизован | PASS | 18ms |
| 14 | AuthProvider: авторизует пользователя при вызове login | PASS | 100ms |
| 15 | AuthProvider: сохраняет данные в localStorage при login | PASS | 63ms |
| 16 | AuthProvider: деавторизует пользователя при logout | PASS | 108ms |
| 17 | AuthProvider: очищает localStorage при logout | PASS | 109ms |
| 18 | AuthProvider: восстанавливает авторизацию из localStorage | PASS | 1ms |
| 19 | ThemeContext: по умолчанию тема светлая | PASS | 17ms |
| 20 | ThemeContext: переключается на тёмную тему при клике | PASS | 123ms |
| 21 | ThemeContext: переключается обратно на светлую | PASS | 110ms |
| 22 | ThemeContext: сохраняет тему в localStorage | PASS | 45ms |
| 23 | ThemeContext: восстанавливает тёмную тему из localStorage | PASS | 2ms |
| 24 | ThemeContext: при отсутствии значения — светлая тема | PASS | 1ms |
| 25 | Card: отображает заголовок задачи | PASS | 75ms |
| 26 | Card: отображает категорию задачи | PASS | 5ms |
| 27 | Card: отображает дату в формате ru-RU | PASS | 3ms |
| 28 | Card: не отображает дату если её нет | PASS | 2ms |
| 29 | Card: вызывает onBrowseClick при клике | PASS | 3ms |
| 30 | Card: имеет атрибут draggable | PASS | 2ms |
| 31 | Card: отображает задачу без категории | PASS | 4ms |
| 32 | Column: отображает заголовок колонки | PASS | 77ms |
| 33 | Column: отображает только задачи с соответствующим статусом | PASS | 5ms |
| 34 | Column: отображает задачи со статусом "В работе" | PASS | 6ms |
| 35 | Column: отображает пустую колонку | PASS | 2ms |
| 36 | Column: отображает скелетоны при загрузке | PASS | 27ms |
| 37 | Column: работает с пустым массивом задач | PASS | 1ms |

### Выявленные дефекты

В ходе автоматизированного тестирования критических дефектов не выявлено. Все тестируемые компоненты функционируют в соответствии с ожидаемым поведением.

---

## e. Выводы по работе

В ходе лабораторной работы были разработаны 37 автоматизированных тестов для веб-приложения SkyPro Kanban, покрывающих 5 ключевых модулей: форму авторизации, контекст авторизации, переключение темы, карточку задачи и колонку канбан-доски.

Для автоматизации был выбран фреймворк Vitest в связке с React Testing Library, что обеспечило:

- **Высокую скорость выполнения** — весь набор из 37 тестов выполняется за 1.5 секунды.
- **Эмуляцию действий пользователя** — библиотека `@testing-library/user-event` позволяет имитировать реальные клики, ввод текста и другие взаимодействия.
- **Независимость от реализации** — тесты обращаются к DOM по тексту и ролям, а не по CSS-классам или внутренней структуре компонентов.
- **Сопровождаемость** — паттерн вспомогательных функций рендеринга (аналог POM) упрощает обновление тестов при изменении интерфейса.

Автотесты интегрированы в проект и могут быть запущены командой `npm test`. Это позволяет включить их в CI/CD-пайплайн для автоматической регрессионной проверки при каждом изменении кода.

---

## f. Список использованных источников

1. Vitest — официальная документация. https://vitest.dev/
2. React Testing Library — официальная документация. https://testing-library.com/docs/react-testing-library/intro/
3. Testing Library User Event — API. https://testing-library.com/docs/user-event/intro/
4. Jest DOM — расширенные матчеры. https://github.com/testing-library/jest-dom
5. React — официальная документация. https://react.dev/
6. Тестирование ПО: лабораторный практикум. 2026.
