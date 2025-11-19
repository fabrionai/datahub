import { Moon, Sun } from '@phosphor-icons/react';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import themes from '@conf/theme/themes';
import { useCustomTheme } from '@src/customThemeContext';

const ToggleButton = styled.button<{ isCollapsed: boolean }>`
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.isCollapsed ? 'center' : 'flex-start')};
    gap: 12px;
    padding: 4px 8px;
    margin: 8px 0 0 0;
    height: 36px;
    min-height: 36px;
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    color: #94a3b8;
    font-size: 14px;
    font-weight: 500;
    width: 100%;
    transition: all 0.2s ease;

    &:hover {
        background: rgba(148, 163, 184, 0.1);
        color: #e2e8f0;
    }

    svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }
`;

const Label = styled.span<{ isCollapsed: boolean }>`
    opacity: ${(props) => (props.isCollapsed ? 0 : 1)};
    transition: opacity 0.2s ease;
    white-space: nowrap;
`;

interface ThemeToggleProps {
    isCollapsed?: boolean;
}

export default function ThemeToggle({ isCollapsed = false }: ThemeToggleProps) {
    const { theme, updateTheme } = useCustomTheme();

    const isDarkMode = theme?.id === 'fabrionDark' || theme?.id === 'themeV2Dark';

    const toggleTheme = useCallback(() => {
        // Detect which theme family we're in
        const isFabrion = theme?.id?.startsWith('fabrion');
        const newTheme = isDarkMode
            ? (isFabrion ? themes.fabrionLight : themes.themeV2)
            : (isFabrion ? themes.fabrionDark : themes.themeV2Dark);

        updateTheme(newTheme);

        // Save preference to localStorage
        localStorage.setItem('customThemeId', newTheme.id);
    }, [isDarkMode, theme?.id, updateTheme]);

    return (
        <ToggleButton
            onClick={toggleTheme}
            isCollapsed={isCollapsed}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {isDarkMode ? <Sun weight="fill" /> : <Moon weight="fill" />}
            <Label isCollapsed={isCollapsed}>{isDarkMode ? 'Light mode' : 'Dark mode'}</Label>
        </ToggleButton>
    );
}
