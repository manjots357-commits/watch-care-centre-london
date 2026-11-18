import { chromium } from 'playwright';
import fs from 'fs';

async function verifySite() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-webgl', '--no-sandbox'],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

  await page.waitForTimeout(2000);

  // 1. Verify Background Video
  const videoState = await page.evaluate(() => {
    const v = document.querySelector('video');
    return v ? { readyState: v.readyState, paused: v.paused, src: v.currentSrc, duration: v.duration } : null;
  });
  console.log('Background Video State:', JSON.stringify(videoState));

  // 2. Verify Hero Buttons count
  const heroButtons = await page.evaluate(() => {
    const hero = document.getElementById('hero');
    if (!hero) return [];
    const btns = Array.from(hero.querySelectorAll('button'));
    return btns.map(b => b.textContent?.trim()).filter(Boolean);
  });
  console.log('Hero Buttons found:', heroButtons);

  // 3. Verify Luxury Metrics Dock
  const dockVisible = await page.evaluate(() => {
    const input = document.querySelector('input[placeholder*="Search calibre"]');
    const stats = document.querySelectorAll('.divide-y > div, .lg\\:divide-y-0 > div');
    return { hasSearchInput: !!input, statCount: stats.length };
  });
  console.log('Metrics Dock Status:', JSON.stringify(dockVisible));

  // 4. Capture screenshots
  fs.mkdirSync('./verification-screens', { recursive: true });
  await page.screenshot({ path: './verification-screens/01_hero_screen.png' });
  console.log('Hero screenshot captured: ./verification-screens/01_hero_screen.png');

  // Scroll to Calibre Studio
  await page.evaluate(() => {
    const el = document.getElementById('calibre-studio');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: './verification-screens/02_calibre_studio.png' });
  console.log('Calibre screenshot captured: ./verification-screens/02_calibre_studio.png');

  // Scroll to Services
  await page.evaluate(() => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: './verification-screens/03_services_grid.png' });
  console.log('Services screenshot captured: ./verification-screens/03_services_grid.png');

  console.log('Console errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }

  await browser.close();
}

verifySite().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
