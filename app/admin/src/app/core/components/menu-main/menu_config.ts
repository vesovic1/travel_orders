export const appMenuItems = [
    {
        code: 'home',
        link: ['home'],
        label: 'Naslovna',
        icon: 'space_dashboard',
        children: []
    },
    {
        code:'divider'
    },
    {
        code: 'users',
        link: ['users'],
        label: 'Korisnici',
        icon: 'manage_accounts',
        children: [
            {
                code: 'list',
                link: ['/', 'users', 'list'],
                label: 'Lista korisnika',
            }
        ],
    },
    {
        code:'divider'
    },
    {
        code: 'components',
        link: ['components'],
        label: 'Components',
        icon: 'component_exchange',
        devOnly: true,
        bottomDivider: true,
        children: [
            {
                code: 'table',
                link: ['/', 'components', 'table'],
                label: 'Table component',
            },
            {
                code: 'form',
                link: ['/', 'components', 'form'],
                label: 'Form elements',
            },
            {
                code: 'custom',
                link: ['/', 'components', 'custom'],
                label: 'CDK elements',
            },
            {
                code: 'buttons',
                link: ['/', 'components', 'buttons'],
                label: 'Buttons',
            },
            {
                code: 'dragdrop',
                link: ['/', 'components', 'dragdrop'],
                label: 'Drag & Drop',
            }
        ],
    },
];
