import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function HomepageContent(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="flex justify-center items-center">
            <img src='img/docker.webp' alt='Configuración de ecommerce'  />
          
        </div>
      </div>
    </section>
  );
}
