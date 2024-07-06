/**
 * @author Duc Nguyen
 */

import type { ThemeConfig } from 'antd';

export const primaryColor = '#0089ED';

/**
 * @note: These are the primary colors for the theme
 */
export const primaryAccent1 = '#7f77f1'; /** Deep Purple */
export const primaryAccent2 = '#6985ff'; /** Royal Blue */
export const primaryAccent3 = '#1090e0'; /** Blue */
export const primaryAccent4 = '#0f9d9f'; /** Light Teal */
export const primaryAccent5 = '#3db88b'; /** Green */
export const primaryAccent6 = '#e16b16'; /** Orange */
export const primaryAccent7 = '#ee5e99'; /** Pink */
export const primaryAccent8 = '#b660e0'; /** Purple */

export const primaryLighterAccent1 = '#f2f1fe'; // lighter version of #43418d
export const primaryLighterAccent2 = '#ecf6fd'; // lighter version of #1e5d87
export const primaryLighterAccent3 = '#fef2f7'; // lighter version of #884564
export const primaryLighterAccent4 = '#f9f2fd'; // lighter version of #6d4687
export const primaryLighterAccent5 = '#f0f3ff'; // lighter version of #364995
export const primaryLighterAccent6 = '#fdf3ec'; // lighter version of #824b26
export const primaryLighterAccent7 = '#e7f5f5'; // lighter version of #1d6367
export const primaryLighterAccent8 = '#f8f6f5'; // lighter version of #3e3d40
export const primaryLighterAccent9 = '#eeeff0'; // lighter version of #13151a
export const primaryLighterAccent10 = '#f0f9f6'; // lighter version of #33705e

/**
 * @note: These are the secondary colors for the background project
 */
export const coreBackground1 = '#0079bf'; /** Blue */
export const coreBackground2 = '#d29034'; /** Orange */
export const coreBackground3 = '#519839'; /** Green */
export const coreBackground4 = '#b04632'; /** Red */
export const coreBackground5 = '#89609e'; /** Purple */
export const coreBackground6 = '#cd5a91'; /** Pink */
export const coreBackground7 = '#4bbf6b'; /** Light Green */
export const coreBackground8 = '#00aecc'; /** Light Blue */
export const coreBackground9 = '#838c91'; /** Gray */

/**
 * @note: These are the secondary colors for the background project
 * @description header color
 */
export const primaryAccentNew1 = '#323452';
export const primaryAccentNew2 = '#263e50';
export const primaryAccentNew3 = '#493644';
export const primaryAccentNew4 = '#403650';
export const primaryAccentNew5 = '#2e3754';
export const primaryAccentNew6 = '#47382f';
export const primaryAccentNew7 = '#264045';
export const primaryAccentNew8 = '#3e3d40';
export const primaryAccentNew9 = '#2a2e34';
export const primaryAccentNew10 = '#2d4442';

export const primaryAccentInput1 = '#474964';
export const primaryAccentInput2 = '#3c5262';
export const primaryAccentInput3 = '#5c4b57';
export const primaryAccentInput4 = '#544b62';
export const primaryAccentInput5 = '#434b65';
export const primaryAccentInput6 = '#5a4c44';
export const primaryAccentInput7 = '#3c5458';
export const primaryAccentInput8 = '#525154';
export const primaryAccentInput9 = '#404349';
export const primaryAccentInput10 = '#425755';

export const primaryAccentButton1 = '#43418d';
export const primaryAccentButton2 = '#1e5d87';
export const primaryAccentButton3 = '#884564';
export const primaryAccentButton4 = '#6d4687';
export const primaryAccentButton5 = '#364995';
export const primaryAccentButton6 = '#824b26';
export const primaryAccentButton7 = '#1d6367';
export const primaryAccentButton8 = '#3e3d40';
export const primaryAccentButton9 = '#13151a';
export const primaryAccentButton10 = '#33705e';

/**
 * @note: This color isn't used for dark theme
 */
export const primaryColor9 = '#aa8d80';
export const primaryColor10 = '#595d66';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: primaryColor,

    colorWarning: '#fdb812',
    colorSuccess: '#54E28D',
    borderRadius: 4,
    /**
     * @note: This is default font family for antd
     */
    fontFamily:
      "-apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    fontWeightStrong: 400,

    colorPrimaryBg: 'rgba(0,0,0,0.05)',
  },
  components: {
    Button: {
      primaryShadow: 'none',
      boxShadowSecondary: 'none',
    },
  },
};
