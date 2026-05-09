
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "My Store";

export const staticSeo = {
  default: {
    title: `${SITE_NAME} | Boutique en ligne`,
    description: `${SITE_NAME} — votre boutique en ligne.`,
    image: "/Logo.webp",
    canonical: "/",
  },
  register: {
    title: `Créer un compte | ${SITE_NAME}`,
    description: `Créez votre compte ${SITE_NAME} pour profiter de nos offres exclusives.`,
    image: "/Logo.webp",
    canonical: "/customer/register",
  },
  login: {
    title: `Connexion | ${SITE_NAME}`,
    description: `Connectez-vous à votre compte ${SITE_NAME}.`,
    image: "/Logo.webp",
    canonical: "/customer/login",
  },
  forget: {
    title: `Mot de passe oublié | ${SITE_NAME}`,
    description: `Récupérez l'accès à votre compte ${SITE_NAME} en réinitialisant votre mot de passe.`,
    image: "/Logo.webp",
    canonical: "/customer/forget-password",
  },
};

