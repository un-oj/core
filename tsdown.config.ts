import { defineConfig } from 'tsdown';
import { exports } from './jsr.json';

export default defineConfig({
  entry: Object.values(exports),
  unbundle: true,
});
