<?php

namespace DomteraCore\Auth;

use DomteraCore\Factory\QueryFactory;

class AuthService {
    public function __construct(
        protected QueryFactory $query
    )
    {
    }

    public function authenticate(string $username, string $password)
    {
        $user = $this->query->getById('users', $username, 'username');

        $genericAuthErrorMessage = 'Podaci za prijavu nisu ispravni.';

        //check if user with username exists
        if ($user == false) {
            throw new \Exception($genericAuthErrorMessage);
        }

        //check password
        if (!password_verify($password, $user['password']))  {
            throw new \Exception('pass'.$genericAuthErrorMessage);
        }

        if ($user['active'] === 0) {
            throw new \Exception('Korisnik nije aktivan');
        }

        if ($user['_deleted'] === 1) {
            throw new \Exception('Korisnik je obrisan');
        }

        return $user;
    }
}