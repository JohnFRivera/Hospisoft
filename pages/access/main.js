import { } from '../assets/helper/layout.js';
import { } from './assets/js/access.globals.js';
var userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
document.getElementById('userName').innerText = userInfo[1];