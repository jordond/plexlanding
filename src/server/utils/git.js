/**
 * Promise wrapper for git-rev
 */

import git from 'git-rev';

function promisify(func) {
  return new Promise(resolve => func(x => resolve(x)));
}

export const short = () => promisify(git.short);
export const long = () => promisify(git.long);
export const branch = () => promisify(git.branch);
export const tag = () => promisify(git.tag);

export const hash = { short, long };

export default { short, long, branch, tag, hash };
