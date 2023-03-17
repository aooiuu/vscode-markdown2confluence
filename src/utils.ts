/**
 * html 转义
 * @param {string} str html 字符串
 * @returns {string} 转移后的字符串
 */
export function htmlEncode(str: string) {
  let s = '';
  if (str.length == 0) return '';
  s = str.replace(/&/g, '&amp;');
  s = s.replace(/</g, '&lt;');
  s = s.replace(/>/g, '&gt;');
  s = s.replace(/ /g, '&nbsp;');
  s = s.replace(/'/g, '&#39;');
  s = s.replace(/"/g, '&quot;');
  s = s.replace(/\n/g, '<br/>');
  return s;
}

interface ISearch {
  [propName: string]: string | number | boolean;
}

interface ISearchConfig {
  separator?: string;
}

export function stringifyUrlSearch(search: ISearch, { separator = '&' }: ISearchConfig) {
  const str = Object.entries(search).reduce((t: string, v: any[]) => `${t}${v[0]}=${encodeURIComponent(v[1])}${separator}`, '') as string;
  return str.substring(0, str.length - separator.length);
}
