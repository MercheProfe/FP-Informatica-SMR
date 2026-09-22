// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FP Informática · SMR',
  tagline: 'Apuntes y recursos para Sistemas Microinformáticos y Redes',
  favicon: 'img/faviconp.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://mercheprofe.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/FP-Informatica-SMR/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //editUrl:
            //'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
         // editUrl:
           // 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
     navbar: {
  title: 'FP Informática · SMR',

  items: [
    {
      type: 'docSidebar',
      sidebarId: 'serSidebar',
      position: 'left',
      label: 'SER',
    },

    
      {
      type: 'docSidebar',
      sidebarId: 'aplicacionesWebSidebar',
      position: 'left',
      label: 'Aplicaciones Web',
    },
    

    {
      type: 'docSidebar',
      sidebarId: 'programacionSidebar',
      position: 'left',
      label: 'Programación',
    },

    {
  type: 'docSidebar',
  sidebarId: 'proyectoSidebar',
  position: 'left',
  label: 'Proyecto',
},
    {
  type: 'dropdown',
  label: 'Classroom',
  position: 'right',
  items: [
    {
      label: 'Servicios en Red',
      href: 'https://classroom.google.com/u/6/c/MjUzNjgxMjc2OTla',
    },
    {
      label: 'Aplicaciones Web',
      href: 'https://classroom.google.com/c/MTYyNjg3NzEzNDUz',
    },
    {
      label: 'Introducción a la Programación',
      href: 'https://classroom.google.com/c/MTYyNzA1ODIzNzYw',
    },
    {
      label: 'Proyecto Intermodular',
      href: 'https://classroom.google.com/c/MTYyNjg3NzEzNDUz',
    },
  ],
},

    //{
    //  href: 'https://github.com/MercheProfe/FP-Informatica-SMR',
    //  label: 'GitHub',
    //  position: 'right',
    //},
  ],
},
      footer: {
  style: 'dark',
  links: [],
  copyright: `
    Apuntes de FP Informática · SMR por Mercedes Martínez ·
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
       target="_blank"
       rel="noopener noreferrer">
      CC BY-NC-SA 4.0
    </a>
    &nbsp;
    <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
       target="_blank"
       rel="noopener noreferrer">
      <img
        src="/FP-Informatica-SMR/img/cc-by-nc-sa.png"
        alt="Licencia Creative Commons BY-NC-SA 4.0"
        style="height: 28px; vertical-align: middle; margin-left: 6px;"
      />
    </a>
  `,
},
    }),
};

export default config;
