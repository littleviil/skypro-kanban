import { test, expect } from '@playwright/test';

const EMAIL = 'lenanet30@gmail.com';
const PASSWORD = '111111';
const PAUSE = 800;

const TASKS = [
  { title: 'E2E Дизайн главной', description: 'Макет главной страницы', topic: 'Web Design', day: '15' },
  { title: 'E2E Исследование', description: 'Анализ конкурентов', topic: 'Research', day: '20' },
  { title: 'E2E Копирайтинг', description: 'Текст для блога', topic: 'Copywriting', day: '25' },
];

const slow = (page) => page.waitForTimeout(PAUSE);

test.describe('Канбан-доска — полный E2E сценарий', () => {
  test.setTimeout(240000);

  test('вход, создание задач, drag-and-drop, удаление, смена темы', async ({ page }) => {
    await page.goto('/login');
    await expect(page.locator('h2')).toContainText('Вход');
    await slow(page);

    await page.locator('input[name="email"]').pressSequentially(EMAIL, { delay: 50 });
    await slow(page);
    await page.locator('input[name="password"]').pressSequentially(PASSWORD, { delay: 50 });
    await slow(page);
    await page.click('button.button-enter');

    await waitForBoard(page);
    await slow(page);

    for (const task of TASKS) {
      await createTask(page, task);
    }

    for (const task of TASKS) {
      await expect(page.locator(`h3:has-text("${task.title}")`).first()).toBeVisible({ timeout: 10000 });
    }
    await slow(page);

    await dragTaskToColumn(page, TASKS[1].title, 'Нужно сделать');
    await slow(page);

    await dragTaskToColumn(page, TASKS[2].title, 'Готово');
    await slow(page);

    await deleteTask(page, TASKS[0].title);
    await slow(page);

    await expect(page.locator(`h3:has-text("${TASKS[1].title}")`).first()).toBeVisible({ timeout: 10000 });
    await expect(page.locator(`h3:has-text("${TASKS[2].title}")`).first()).toBeVisible();
    await slow(page);

    await toggleTheme(page);
    await slow(page);

    await deleteTask(page, TASKS[1].title);
    await deleteTask(page, TASKS[2].title);
  });
});


async function waitForBoard(page) {
  await expect(page.locator('text=Без статуса')).toBeVisible({ timeout: 15000 });
  await expect(page.locator('text=Готово')).toBeVisible({ timeout: 5000 });
  await page.waitForTimeout(2000);
}

async function createTask(page, { title, description, topic, day }) {
  await page.click('text=Создать новую задачу');
  await expect(page.locator('text=Создание задачи')).toBeVisible({ timeout: 5000 });
  await slow(page);

  await page.locator('input[name="title"]').pressSequentially(title, { delay: 35 });
  await slow(page);
  await page.locator('textarea[name="description"]').pressSequentially(description, { delay: 25 });
  await slow(page);

  await page.locator('.categories__themes').locator(`text=${topic}`).click();
  await slow(page);

  const dayCell = page.locator('.calendar__day').getByText(day, { exact: true }).first();
  if (await dayCell.isVisible().catch(() => false)) {
    await dayCell.click();
    await slow(page);
  }

  await page.locator('button.form-new__create').click();
  await page.waitForTimeout(2000);

  if (page.url().includes('/card/')) {
    await page.goBack();
    await page.waitForTimeout(1000);
  }

  await expect(page.locator('text=Без статуса')).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(1000);
}

async function dragTaskToColumn(page, taskTitle, targetColumnName) {
  const titleEl = page.locator(`h3:has-text("${taskTitle}")`).first();
  await expect(titleEl).toBeVisible({ timeout: 5000 });

  const cardItem = titleEl.locator('xpath=ancestor::div[@data-task-id]').first();
  await expect(cardItem).toBeVisible({ timeout: 5000 });

  const taskId = await cardItem.getAttribute('data-task-id');
  const taskStatus = await cardItem.getAttribute('data-task-status');

  const targetColumn = page.locator(`p:text-is("${targetColumnName}")`).first()
    .locator('xpath=ancestor::div[2]');
  await expect(targetColumn).toBeVisible({ timeout: 5000 });

  const sourceHandle = await cardItem.elementHandle();
  const targetHandle = await targetColumn.elementHandle();

  await page.evaluate(({ source, target, id, status }) => {
    const dt = new DataTransfer();
    dt.setData('taskId', id);
    dt.setData('taskStatus', status);
    dt.effectAllowed = 'move';

    source.dispatchEvent(new DragEvent('dragstart', {
      bubbles: true, cancelable: true, dataTransfer: dt,
    }));
    target.dispatchEvent(new DragEvent('dragover', {
      bubbles: true, cancelable: true, dataTransfer: dt,
    }));
    target.dispatchEvent(new DragEvent('drop', {
      bubbles: true, cancelable: true, dataTransfer: dt,
    }));
    source.dispatchEvent(new DragEvent('dragend', {
      bubbles: true, cancelable: true, dataTransfer: dt,
    }));
  }, { source: sourceHandle, target: targetHandle, id: taskId, status: taskStatus });

  await page.waitForTimeout(2000);
}

async function openTaskCard(page, taskTitle) {
  const titleEl = page.locator(`h3:has-text("${taskTitle}")`).first();
  await expect(titleEl).toBeVisible({ timeout: 5000 });
  const cardsCard = titleEl.locator('xpath=ancestor::div[1]/..');
  const cardBtn = cardsCard.locator('div > div > div:nth-child(2)').first();
  await cardBtn.click({ timeout: 5000 });
  await page.waitForURL(/\/card\//, { timeout: 5000 });
  await expect(page.locator('.pop-browse')).toBeVisible({ timeout: 5000 });
  await slow(page);
}

async function deleteTask(page, taskTitle) {
  await openTaskCard(page, taskTitle);
  await page.locator('text=Удалить задачу').first().click();
  await slow(page);
  await page.locator('text=Закрыть').click({ timeout: 5000 }).catch(() => {});
  await page.waitForTimeout(500);
  if (page.url().includes('/card/')) {
    await page.locator('img[alt="logo"]').click();
    await page.waitForTimeout(1000);
  }
  await expect(page.locator('text=Без статуса').first()).toBeVisible({ timeout: 10000 });
  await page.waitForTimeout(500);
}

async function toggleTheme(page) {
  const userBtn = page.locator('a[href="#user-set-target"]');
  await userBtn.click();
  await expect(page.locator('text=Темная тема')).toBeVisible({ timeout: 5000 });
  await slow(page);

  const bgBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.locator('input[type="checkbox"]').click();
  await slow(page);
  const bgAfter = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bgBefore).not.toBe(bgAfter);

  await userBtn.click({ force: true });
  await page.waitForTimeout(500);
}
