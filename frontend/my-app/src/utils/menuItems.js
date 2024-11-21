import {dashboard, expenses, transactions, trend} from '../utils/Icons'

export const menuItems = [
    {
        id: 1,
        title: 'Головна',
        icon: dashboard,
        link: '/dashboard'
    },
    {
        id: 2,
        title: "Доходи",
        icon: trend,
        link: "/income",
    },
    {
        id: 3,
        title: "Витрати",
        icon: expenses,
        link: "/expenses",
    },
]