import { spawnSync } from 'node:child_process';

const result = spawnSync('npx', ['playwright', 'test', ...process.argv.slice(2)], {
  stdio: 'inherit',
  env: { ...process.env, E2E_DEV: '1' },
  shell: true,
});

process.exit(result.status ?? 1);
