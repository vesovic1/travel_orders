<?php

namespace DomteraCore\Security;

class Password {
    public static function hash($password)
    {
        return password_hash($password, PASSWORD_DEFAULT, [
            'cost' => 10,
        ]);
    }
}