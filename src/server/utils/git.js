/**
 * Promise wrapper for git-rev
 */

import git from 'git-rev';


export function short() {
  return new Promise(resolve => git.short(x => resolve(x)));
}

export function long() {
  return new Promise(resolve => git.long(x => resolve(x)));
}

export function branch() {
  return new Promise(resolve => git.branch(x => resolve(x)));
}

export function tag() {
  return new Promise(resolve => git.tag(x => resolve(x)));
}

export const hash = { short, long };

export default { short, long, branch, tag, hash };
