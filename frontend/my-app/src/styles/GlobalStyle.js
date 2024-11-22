// globalstyle.js

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #00ffcc; /* Зелений акцент */
        --primary-color2: 'color: rgba(0, 255, 204, .6)';
        --primary-color3: 'color: rgba(0, 255, 204, .4)';
        --color-green: #00ffcc; /* Зелений акцент */
        --color-grey: #aaa;
        --color-accent: #ff6347; /* Червоний акцент */
        --color-delete: #ff0000;
    }

    body {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: #ffffff; /* Білий текст */
        background-color: #1e1e2f; /* Темний фон */
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color); /* Зелений акцент */
    }

    .error {
        color: #ff6347; /* Червоний акцент */
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(10px);
            }
            50% {
                transform: translateX(-10px);
            }
            75% {
                transform: translateX(10px);
            }
            100% {
                transform: translateX(0);
            }
        }
    }
`;
