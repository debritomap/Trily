export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Profª Bárbara Camargo",
  description: "Professora de redação para vestibulares, ENEM e concursos.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Perfil",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {},
};
