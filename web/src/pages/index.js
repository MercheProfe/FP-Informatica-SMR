import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

const asignaturas = [
  {
    titulo: 'Servicios en Red',
    icono: '🌐',
    descripcion: 'Redes, servicios, DHCP, DNS, servidores y administración de sistemas.',
    enlace: '#',
  },
  {
    titulo: 'Aplicaciones Web',
    icono: '🌍',
    descripcion: 'HTML, CSS, JavaScript y desarrollo de aplicaciones web.',
    enlace: '#',
  },
  {
    titulo: 'Introducción a la Programación',
    icono: '☕',
    descripcion: 'Algoritmos, Java y fundamentos de programación.',
    enlace: '#',
  },
  {
    titulo: 'Proyecto Intermodular',
    icono: '🧩',
    descripcion: 'Investigación, planificación, desarrollo y presentación del proyecto.',
    enlace: '#',
  },
];

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>

        <p className="hero__subtitle">
          Apuntes y recursos para 2º de Sistemas Microinformáticos y Redes
        </p>
      </div>
    </header>
  );
}

function TarjetaAsignatura({titulo, icono, descripcion, enlace}) {
  const contenido = (
    <>
      <div className={styles.cardImage}>
        <span>{icono}</span>
      </div>

      <div className={styles.cardContent}>
        <Heading as="h3">{titulo}</Heading>

        <p>{descripcion}</p>

        <div className={styles.cardLink}>
          Ver apuntes →
        </div>
      </div>
    </>
  );

  if (enlace === '#') {
    return (
      <div className={`${styles.subjectCard} ${styles.disabledCard}`}>
        {contenido}
      </div>
    );
  }

  return (
    <Link className={styles.subjectCard} to={enlace}>
      {contenido}
    </Link>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Apuntes y recursos de FP Informática">

      <HomepageHeader />

      <main className={styles.mainContent}>
        <div className="container">

          <Heading as="h2" className={styles.sectionTitle}>
            Módulos
          </Heading>

          <div className={styles.subjectGrid}>
            {asignaturas.map((asignatura) => (
              <TarjetaAsignatura
                key={asignatura.titulo}
                {...asignatura}
              />
            ))}
          </div>

        </div>
      </main>

    </Layout>
  );
}