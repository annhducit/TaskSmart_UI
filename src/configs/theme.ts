/**
 * @author Duc Nguyen
 */

import type { ThemeConfig } from "antd";

export const primaryColor = "#0089ED";

/**
 * @note: These are the primary colors for the theme
 */
export const primaryAccent1 = "#7f77f1"; /** Deep Purple */
export const primaryAccent2 = "#6985ff"; /** Royal Blue */
export const primaryAccent3 = "#1090e0"; /** Blue */
export const primaryAccent4 = "#0f9d9f"; /** Light Teal */
export const primaryAccent5 = "#3db88b"; /** Green */
export const primaryAccent6 = "#e16b16"; /** Orange */
export const primaryAccent7 = "#ee5e99"; /** Pink */
export const primaryAccent8 = "#b660e0"; /** Purple */


/**
 * @note: These are the secondary colors for the background project
 */
export const coreBackground1 = "#0079bf"; /** Blue */
export const coreBackground2 = "#d29034";  /** Orange */
export const coreBackground3 = "#519839";  /** Green */
export const coreBackground4 = "#b04632";  /** Red */
export const coreBackground5 = "#89609e";  /** Purple */
export const coreBackground6 = "#cd5a91";  /** Pink */
export const coreBackground7 = "#4bbf6b";  /** Light Green */
export const coreBackground8 = "#00aecc";  /** Light Blue */
export const coreBackground9 = "#838c91";  /** Gray */


/**
 * @note: This color isn't used for dark theme
*/
export const primaryColor9 = "#aa8d80";
export const primaryColor10 = "#595d66";


export const theme: ThemeConfig = {
    token: {
        colorPrimary: primaryColor,

        colorWarning: "#fdb812",
        colorSuccess: "#54E28D",
        borderRadius: 4,
/**
 * @note: This is default font family for antd  
 */
        fontFamily: "-apple-system, BlinkMacSystemFont,'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        fontWeightStrong: 400,

        colorPrimaryBg: "rgba(0,0,0,0.05)",
    },
    components: {
        Button: {
            primaryShadow: "none",
            boxShadowSecondary: "none",
        },
    },
};
