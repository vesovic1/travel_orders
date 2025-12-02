<?php

namespace DomteraCore\User;
use DomteraCore\Factory\QueryFactory;
use Cake\Validation\Validator;


class UserProfileUpdateService {
    protected $cols;

    public function __construct(
        protected QueryFactory $query,
        protected Validator $validator,
    )
    {
    }

    private function validate($fields)
    {

        $this->validator
            ->requirePresence('first_name', 'This field is required')
            ->notEmptyString('first_name', 'First name is required')
            ->requirePresence('last_name', 'This field is required')
            ->notEmptyString('last_name', 'Last name is required')
            ->requirePresence('email', 'This field is required')
            ->email('email', false, 'E-Mail must be valid')
            ->requirePresence('oldPasswordRetype', 'This field is required')
            ->notEmptyString('oldPasswordRetype', 'Old password is required')
            ->add('oldPasswordRetype', 'passwordsMatch', [
                'rule' => function($value, $context) {
                    return password_verify($value, $context['data']['dbpass']);
                },
                'message' => 'You must enter old password'
            ]);

        $errors = $this->validator->validate($fields);

        if ($errors) {
            throw new \Exception(json_encode(['validationErrors' => $errors]));
        }
    }

    public function profileUpdate($id, $data)
    {
        $existingUser = $this->query->getById('users', $id, 'id');

        $data['dbpass']=$existingUser['password'];

        $this->validate($data);

        $postData = [
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'email' => $data['email'],
            'updated' => date('Y-m-d H:i:s')
        ];

        if (array_key_exists('password', $data) && !empty($data['password'])) {
            $postData['password'] = \DomteraCore\Security\Password::hash($data['password']);
        }

        $this->query->update('users')
            ->set($postData)
            ->where(['id' => $id])
            ->execute();

    }

}