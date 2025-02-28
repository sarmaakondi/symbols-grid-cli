"use strict";

import { Flex, Link, Grid } from "smbls";

export const Header = {
    extend: Flex,
    props: {
        minWidth: "100%",
        padding: "Z B",
        align: "center space-between",
    },

    Flex: {
        props: { gap: "C" },
        childExtend: {
            extend: Link,
            props: ({ props }) => ({
                textDecoration:
                    window.location.pathname === props.href
                        ? "underline"
                        : "none",
            }),
        },
        Text_logo: { href: "/", text: "Hello!" },
        Text_about: { href: "/about", text: "About" },
        Text_grid: { href: "/grid", text: "Grid" },
    },

    ThemeSwitcher: {},
};

export const ThemeSwitcher = {
    extend: Flex,
    props: { gap: "A2" },
    childExtend: {
        props: (element, state) => ({
            active: state.globalTheme === element.key,
            cursor: "pointer",
            ".active": {
                fontWeight: "900",
            },
        }),
        on: {
            click: (event, element, state) => {
                state.update({ globalTheme: element.key });
            },
        },
    },
    dark: { text: "Dark" },
    light: { text: "Light" },
    midnight: { text: "Midnight" },
};

export const Footer = {
    props: {
        padding: "Z B",
        order: 9,
    },
};

export const GridSelectionComponent = {
    extend: Flex,
    props: {
        padding: "B B",
        flow: "column",
        align: "start space-between",
        width: "546px",
        height: "384px",
        borderRadius: "A",
        background: "#f3f3f3",
        fontFamily: "AppFont",
    },
    state: {
        row: 0,
        col: 0,
        total: 0,
    },
    GridHeader: {},
    CustomGrid: {},
    GridFooter: {},
};

export const GridHeader = {
    props: {
        fontSize: "14px",
        fontWeight: 600,
    },

    text: "Grid Selection",
};

export const Coordinates = {
    props: {
        fontSize: "12px",
        fontWeight: 300,
        id: "coordinates",
    },
    text: `Selection coordinates: {{col}},{{row}}`,
};

export const TotalSelectedCells = {
    props: {
        fontSize: "12px",
        fontWeight: 300,
        id: "total-cells",
    },
    text: `Total cells selected: {{total}}`,
};

export const GridFooter = {
    extend: Flex,
    props: {
        width: "100%",
        align: "start space-between",
    },
    Coordinates: {},
    TotalSelectedCells: {},
};

export const CustomCell = {
    props: {
        aspectRatio: "1/1",
        background: "#E8F1FF",
        borderRadius: "2px",
        cursor: "pointer",
        ":hover": {
            background: "#3D7BD9",
        },
        class: "box",
    },
    on: {
        click: (event, element, state) => {
            const boxes = document.querySelectorAll(".box");
            const clickedBox = event.target;
            const index = Array.from(boxes).indexOf(clickedBox);

            if (index === -1) return;

            const rowLength = 16;
            const row = Math.floor(index / rowLength) + 1;
            const col = (index % rowLength) + 1;

            // Update state
            state.update({
                row,
                col,
                total: row * col,
            });

            // Reset all cells to their default color
            boxes.forEach((box) => {
                box.style.backgroundColor = "#E8F1FF";
            });

            // Highlight the cells within the selected range
            boxes.forEach((box, idx) => {
                const boxRow = Math.floor(idx / rowLength) + 1;
                const boxCol = (idx % rowLength) + 1;

                if (boxRow <= row && boxCol <= col) {
                    box.style.backgroundColor = "#3D7BD9";
                }
            });
        },
    },
};

export const CustomGrid = {
    extend: Grid,
    props: {
        width: "494px",
        height: "255px",
        borderRadius: "z",
        background: "white",
        rows: "repeat(8, 26px)",
        columns: "repeat(16, 26px)",
        gap: "4px",
        alignContent: "center",
        justifyContent: "center",
    },
    childExtend: CustomCell,
    ...Array.from({ length: 128 }, () => ({})),
};
