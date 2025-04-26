/**
 * This file is added to `.gitignore`. You can write your own code here
 * to test your changes, and run `bun run dev` to execute.
 *
 * Happy coding!
 */

import { Platform } from '../src';

if (Bun.deepEquals(Platform.name, 'Platform'))
  console.log('Hello, World!');
else
  console.error('Core panic!');
