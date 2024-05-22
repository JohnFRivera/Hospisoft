import { GetHost, SetTitle, SetNavbar, SetFooter, CreateCss, CreateScript } from '../assets/js/globals.functions.js';
import { cssStyles, NavBarUnregister, FooterDefault, scriptBS } from '../assets/helper/globals.helpers.js';
CreateCss(cssStyles);
const pageName = 'Inicio';
SetTitle(pageName);
SetNavbar(NavBarUnregister);
SetFooter(FooterDefault);
CreateScript(scriptBS);