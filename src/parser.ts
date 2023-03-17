import { marked } from 'marked';
import { stringifyUrlSearch } from './utils';

// https://confluence.atlassian.com/doc/confluence-wiki-markup-251003035.html

const MAX_CODE_LINE = 20;

interface ILangMap {
  [propName: string]: string;
}
const langMap: ILangMap = {
  shell: 'bash',
  html: 'html',
  xml: 'xml',
  actionscript3: 'actionscript3',
  bash: 'bash',
  csharp: 'csharp',
  coldfusion: 'coldfusion',
  cpp: 'cpp',
  css: 'css',
  delphi: 'delphi',
  diff: 'diff',
  erlang: 'erlang',
  groovy: 'groovy',
  java: 'java',
  javafx: 'javafx',
  javascript: 'javascript',
  perl: 'perl',
  php: 'php',
  none: 'none',
  powershell: 'powershell',
  python: 'python',
  ruby: 'ruby',
  scala: 'scala',
  sql: 'sql',
  vb: 'vb',
  'html/xml': 'html/xml'
};

const renderer = {
  paragraph: function (text: string) {
    return text + '\n\n';
  },
  html: function (html: string) {
    return html;
  },
  heading: function (text: string, level: number) {
    return 'h' + level + '. ' + text + '\n\n';
  },
  strong: function (text: string) {
    return '*' + text + '*';
  },
  em: function (text: string) {
    return '_' + text + '_';
  },
  del: function (text: string) {
    return '-' + text + '-';
  },
  codespan: function (text: string) {
    return '{{' + text + '}}';
  },
  blockquote: function (quote: string) {
    return '{quote}' + quote + '{quote}';
  },
  br: function () {
    return '\n';
  },
  hr: function () {
    return '----';
  },
  link: function (href: string, title: string, text: string) {
    const arr = [href];
    if (text) {
      arr.unshift(text);
    }
    return '[' + arr.join('|') + ']';
  },
  list: function (body: string, ordered: boolean) {
    const arr = body.split('\n').filter((e) => e);
    const type = ordered ? '#' : '*';
    return arr.map((line) => type + ' ' + line).join('\n') + '\n\n';
  },
  listitem: function (body: string) {
    return body + '\n';
  },
  image: function (href: string) {
    return '!' + href + '!';
  },
  table: function (header: string, body: string) {
    return header + body + '\n';
  },
  tablerow: function (content: string) {
    return content + '\n';
  },
  tablecell: function (content: string, flags: any) {
    const type = flags.header ? '||' : '|';
    return type + content;
  },
  code: function (code: string, sLang: string) {
    let lang: string = sLang;
    if (lang) {
      lang = lang.toLowerCase();
    }
    const param = {
      language: langMap[lang] || 'none',
      borderStyle: 'solid',
      theme: 'RDark',
      linenumbers: true,
      collapse: false
    };

    const lineCount = code.split('\n').length;
    if (lineCount > MAX_CODE_LINE) {
      // code is too long
      param.collapse = true;
    }
    const codeConfig = stringifyUrlSearch(param, {
      separator: '|'
    });
    return '{code:' + codeConfig + '}\n' + code + '\n{code}\n\n';
  }
};
marked.use({ renderer });

export function parser(markdown: string) {
  return marked.parse(markdown);
}
