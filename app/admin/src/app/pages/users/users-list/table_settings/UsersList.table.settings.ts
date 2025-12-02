export const UsersListTableSettings = {
    class: 'users-list-table',
    resource: 'users',
    cols: [
        {
            code: 'first_name',
            width: 150,
            name: 'Ime',
            sort: true,
        },
        {
            code: 'last_name',
            width: 150,
            name: 'Prezime',
            sort: true,
        },
        {
            code: 'active',
            width: 100,
            name: 'Status',
            sort: true,
        },
        {
            code: 'username',
            width: 200,
            name: 'Korisničko ime',
            sort: true,
        },
        {
            code: 'email',
            width: 250,
            name: 'Email',
            sort: true,
        },
        {
            code: 'action',
        },
    ],
};