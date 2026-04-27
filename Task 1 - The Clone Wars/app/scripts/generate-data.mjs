// Generates synthesized leaderboard data + DiceBear avatar SVGs.
// Run once via `npm run generate`. Outputs to public/leaderboard.json
// and public/avatars/{id}.svg. Both are committed to the repo.

import { faker } from '@faker-js/faker';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, '..', 'public');
const AVATAR_DIR = resolve(PUBLIC_DIR, 'avatars');
const JSON_PATH = resolve(PUBLIC_DIR, 'leaderboard.json');

const SEED = 42;
const USER_COUNT = 227;

const CATEGORIES = ['Education', 'University Partnership', 'Public Speaking'];

const TITLES = [
  'Software Engineer',
  'Senior Software Engineer',
  'QA Engineer',
  'Senior QA Engineer',
  'Lead QA Engineer',
  'Group Manager',
  'HR Manager',
  'Marketing Manager',
];

// Fictional department-code pools (no leakage of any real org's codes).
const DEPT_REGIONS = ['AC', 'NX', 'VR', 'KP', 'TM', 'OB'];
const DEPT_UNITS = ['U1', 'U2', 'U3'];
const DEPT_GROUPS = ['G1', 'G2', 'G3', 'G4'];
const DEPT_DIVISIONS = ['D1', 'D2', 'D3', 'T1', 'T2', 'SO', 'SEO', 'Services'];

const TOPICS = [
  'Effective Code Review',
  'Mastering Async TypeScript',
  'Testing at Scale',
  'Modern CSS Techniques',
  'Building Resilient Systems',
  'API Design Principles',
  'Observability in Practice',
  'Refactoring Legacy Code',
  'Career Growth in Tech',
  'Cloud Cost Optimisation',
  'Frontend Performance',
  'Working with Legacy Databases',
  'Distributed Systems Foundations',
  'Onboarding New Engineers',
];

const UNIVERSITIES = [
  'Northvale University',
  'Westmark Institute of Technology',
  'Eastbrook Polytechnic',
  'Greystone College',
  'Highridge University',
  'Brightwater Technical Institute',
  'Lakeshore College of Engineering',
  'Stonepeak University',
];

const POINTS_POOL = [6, 8, 16, 32, 64, 96];

// Activity title templates — three per category.
const TEMPLATES = {
  Education: [
    ({ name }) => `[REG] Mentoring of ${name}`,
    ({ name }) => `[LAB] Mentoring of ${name}`,
    ({ topic }) => `Course: "${topic}"`,
  ],
  'University Partnership': [
    ({ university }) => `Partnership with ${university}`,
    ({ university }) => `Lecture at ${university}`,
    ({ university }) => `Recruiting visit to ${university}`,
  ],
  'Public Speaking': [
    ({ topic }) => `Talk: "${topic}"`,
    ({ topic }) => `Workshop: "${topic}"`,
    ({ topic }) => `Panel: "${topic}"`,
  ],
};

function pick(arr) {
  return arr[Math.floor(faker.number.float({ min: 0, max: arr.length - 1e-9 }))];
}

function deptCode() {
  return [
    pick(DEPT_REGIONS),
    pick(DEPT_UNITS),
    pick(DEPT_GROUPS),
    pick(DEPT_DIVISIONS),
  ].join('.');
}

function quarterFromDate(iso) {
  const month = Number(iso.slice(5, 7));
  if (month <= 3) return 'Q1';
  if (month <= 6) return 'Q2';
  if (month <= 9) return 'Q3';
  return 'Q4';
}

function isoDateInYear(year) {
  const start = new Date(`${year}-01-01T00:00:00Z`).getTime();
  const end = new Date(`${year}-12-31T23:59:59Z`).getTime();
  const t = faker.number.int({ min: start, max: end });
  return new Date(t).toISOString().slice(0, 10);
}

function buildActivity(year) {
  const category = pick(CATEGORIES);
  const template = pick(TEMPLATES[category]);
  const ctx = {
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    topic: pick(TOPICS),
    university: pick(UNIVERSITIES),
  };
  const date = isoDateInYear(year);
  return {
    id: faker.string.uuid(),
    title: template(ctx),
    category,
    date,
    points: pick(POINTS_POOL),
    year,
    quarter: quarterFromDate(date),
  };
}

async function fetchAvatarSvg(seed) {
  const url = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`DiceBear ${res.status} for seed ${seed}`);
  return await res.text();
}

async function main() {
  faker.seed(SEED);

  await mkdir(AVATAR_DIR, { recursive: true });

  const users = [];
  for (let i = 0; i < USER_COUNT; i++) {
    const id = faker.string.uuid();
    const name = `${faker.person.firstName()} ${faker.person.lastName()}`;
    const title = pick(TITLES);
    const departmentCode = deptCode();

    const activityCount = faker.number.int({ min: 2, max: 25 });
    const activities = [];
    for (let j = 0; j < activityCount; j++) {
      activities.push(buildActivity(2025));
    }

    users.push({
      id,
      name,
      title,
      departmentCode,
      avatarPath: `./avatars/${id}.svg`,
      activities,
    });
  }

  // Fetch + write avatars sequentially (well within DiceBear's tolerance for
  // 227 requests; keeps the script simple and deterministic).
  console.log(`Fetching ${users.length} avatars from DiceBear...`);
  let fetched = 0;
  for (const u of users) {
    const svg = await fetchAvatarSvg(u.id);
    await writeFile(resolve(AVATAR_DIR, `${u.id}.svg`), svg, 'utf8');
    fetched++;
    if (fetched % 25 === 0) console.log(`  ${fetched}/${users.length}`);
  }

  await writeFile(JSON_PATH, JSON.stringify(users, null, 2), 'utf8');
  console.log(`\nWrote ${users.length} users to ${JSON_PATH}`);
  console.log(`Wrote ${users.length} avatars to ${AVATAR_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
