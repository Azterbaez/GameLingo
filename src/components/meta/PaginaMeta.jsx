import { Helmet } from "react-helmet-async";
import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME, tituloPagina } from "../../utils/appBrand";

/**
 * Título y meta para navegador / pantalla de inicio en móvil (iOS, Android).
 */
const PaginaMeta = ({ titulo, descripcion = APP_DESCRIPTION }) => {
  const tituloCompleto = tituloPagina(titulo);

  return (
    <Helmet>
      <title>{tituloCompleto}</title>
      <meta name="description" content={descripcion} />
      <meta name="application-name" content={APP_SHORT_NAME} />
      <meta name="apple-mobile-web-app-title" content={APP_SHORT_NAME} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#1e3a8a" />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:site_name" content={APP_NAME} />
      <meta property="og:description" content={descripcion} />
    </Helmet>
  );
};

export default PaginaMeta;
