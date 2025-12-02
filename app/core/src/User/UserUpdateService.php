<?php

namespace TravelOrdersCore\User;

use TravelOrdersCore\Factory\QueryFactory;
use TravelOrdersCore\User\UserService;
use Cake\Validation\Validator;

class UserUpdateService
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
            ->requirePresence('email', 'This field is required')
            ->email('email', false, 'E-Mail must be valid');

        if (array_key_exists('password', $fields) || array_key_exists('passwordConfirm', $fields)) {
            if (!empty($fields['password']) || !empty($fields['passwordConfirm'])) {
                $this->validator
                ->requirePresence('password', 'This field is required')
                ->notEmptyString('password', 'First name is required')
                ->requirePresence('passwordConfirm', 'This field is required')
                ->notEmptyString('passwordConfirm', 'First name is required')
                ->add('passwordConfirm', 'passwordsMatch', [
                    'rule' => function($value, $context) {
                        return $context['data']['password'] === $value;
                    },
                    'message' => 'Passwords do not match'
                ]);
            }
        }

        $errors = $this->validator->validate($fields);

        if ($errors) {
            throw new \Exception(json_encode(['validationErrors' => $errors]));
        }
    }

    public function update($id, $data)
    {
        $this->validate($data);

        // get existing user
        $existingUser = $this->query->select('users')
            ->select('COUNT(*) as count')
            ->where([
                'active' => 1,
                '_deleted' => 0,
                'id !=' => $id,
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

        $postData = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'active' => $data['active'],
            'username' => $data['username'],
            'updated' => date('Y-m-d H:i:s')
        ];

        if (array_key_exists('password', $data) && !empty($data['password'])) {
            $postData['password'] = \TravelOrdersCore\Security\Password::hash($data['password']);
        }

        $this->query->update('users')
            ->set($postData)
            ->where(['id' => $id])
            ->execute();

        return $this->user->getById($id);

    }

}