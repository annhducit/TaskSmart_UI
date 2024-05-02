import type { ThemeConfig } from "antd";

export const primaryColor = "#0089ED";

export const theme: ThemeConfig = {
    token: {
        colorPrimary: primaryColor,

        colorWarning: "#fdb812",
        colorSuccess: "#54E28D",
        borderRadius: 4,

        fontFamily: "Lexend",
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
