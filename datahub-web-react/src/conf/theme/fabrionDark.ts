import fabrionDark from '@conf/theme/colorThemes/fabrionDark';
import { Theme } from '@conf/theme/types';

const fabrionDarkTheme: Theme = {
    id: 'fabrionDark',
    colors: fabrionDark,
    styles: {
        'primary-color': '#ff161e',
        'primary-color-dark': '#cc1218',
        'primary-color-light': '#ffe5e6',
        'layout-header-color': '#e2e8f0',
        'body-background': '#0a0a0a',
        'border-color-base': 'rgba(148, 163, 184, 0.3)',
        'homepage-background-upper-fade': '#0a0a0a',
        'homepage-background-lower-fade': '#18181b',
        'homepage-text-color': '#e2e8f0',
        'box-shadow': '0px 0px 30px 0px rgba(0, 0, 0, 0.5)',
        'box-shadow-hover': '0px 1px 0px 0.5px rgba(0, 0, 0, 0.4)',
        'box-shadow-navbar-redesign': '0 0 6px 0px rgba(0, 0, 0, 0.5)',
        'border-radius-navbar-redesign': '12px',
        'highlight-color': 'rgba(255, 22, 30, 0.1)',
        'highlight-border-color': 'rgba(255, 22, 30, 0.3)',
    },
    assets: {
        logoUrl: 'assets/logos/fabrion-light.png',
    },
    content: {
        title: 'Fabrion Data Fabric',
        search: {
            searchbarMessage: 'Search datasets, workflows, agents, and more',
        },
        menu: {
            items: [
                {
                    label: 'Documentation',
                    path: 'https://docs.fabrion.com',
                    shouldOpenInNewTab: true,
                    description: 'Explore Fabrion documentation',
                },
                {
                    label: 'Support',
                    path: 'https://support.fabrion.com',
                    shouldOpenInNewTab: true,
                },
            ],
        },
    },
};

export default fabrionDarkTheme;
