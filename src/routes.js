import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from '@vkontakte/vk-mini-apps-router';

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = 'default_view';

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home',
  BOOKINFO: 'bookInfo',
  CREATEBOOK: 'createBook',
  EDITBOOK: 'editBook',
  LOCATIONUSER: 'locationuser',
  PERSIK: 'persik',
};

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/', []),
      createPanel(DEFAULT_VIEW_PANELS.BOOKINFO, `/${DEFAULT_VIEW_PANELS.BOOKINFO}`, []),
      createPanel(DEFAULT_VIEW_PANELS.EDITBOOK, `/${DEFAULT_VIEW_PANELS.EDITBOOK}`, []),
      createPanel(DEFAULT_VIEW_PANELS.CREATEBOOK, `/${DEFAULT_VIEW_PANELS.CREATEBOOK}`, []),
      createPanel(DEFAULT_VIEW_PANELS.PERSIK, `/${DEFAULT_VIEW_PANELS.PERSIK}`, []),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
