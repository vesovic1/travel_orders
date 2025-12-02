<?php

namespace DomteraCore\User;

use DomteraCore\Factory\QueryFactory;
use DomteraCore\User\UserService;
use Cake\Validation\Validator;

class UserCreateService
{
    public function __construct(
        protected QueryFactory $query,
        protected Validator $validator,
        protected UserService $user
    )
    {
    }

    private function validate($fields)
    {

        $this->validator
            ->requirePresence('username', 'This field is required')
            ->notEmptyString('username', 'Username is required')
            ->minLength('username', 5, 'Username is too short')
            ->maxLength('username', 40, 'Username is too long')
            ->requirePresence('first_name', 'This field is required')
            ->notEmptyString('first_name', 'First name is required')
            ->requirePresence('last_name', 'This field is required')
            ->notEmptyString('last_name', 'Last name is required')
            ->requirePresence('password', 'This field is required')
            ->notEmptyString('password', 'Password is required')
            ->requirePresence('passwordConfirm', 'This field is required')
            ->notEmptyString('passwordConfirm', 'Password Confirm is required')
            ->requirePresence('email', 'This field is required')
            ->email('email', false, 'E-Mail must be valid')
            ->add('passwordConfirm', 'passwordsMatch', [
                'rule' => function($value, $context) {
                    return $context['data']['password'] === $value;
                },
                'message' => 'Passwords do not match'
            ]);

        $errors = $this->validator->validate($fields);

        if ($errors) {
            throw new \Exception(json_encode(['validationErrors' => $errors]));
        }
    }

    public function create($data)
    {
        $this->validate($data);

        // get existing user
        $existingUser = $this->query->select('users')
            ->select('COUNT(*) as count')
            ->where([
                'active' => 1,
                'AND' => [
                    'OR' => [
                        'email' => $data['email'],
                        'username' => $data['username']
                    ]
                ]
            ])
            ->execute()
            ->fetch()[0];

        if ($existingUser) {
            throw new \Exception('User already exits');
        }

        $post_data = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'active' => $data['active'],
            'username' => $data['username'],
            'password' => \DomteraCore\Security\Password::hash($data['password']),
            'created' => date('Y-m-d H:i:s')
        ];

        $this->query->insert('users', $post_data)->execute();

        $lastInsertId = $this->query->lastInsertId('users');

        return $this->user->getById($lastInsertId);
    }
}