<?php

namespace TravelOrdersCore\User;

use Cake\Validation\Validator;
use TravelOrdersCore\Factory\QueryFactory;
use TravelOrdersCore\User\UserProfileService;

class UserProfilePasswordResetService {
    protected $cols;

    public function __construct(
        protected QueryFactory $query,
        private UserProfileService $profileService,
        protected Validator $validator
    )
    {

    }

    private function validate($fields)
    {

        $this->validator
        ->requirePresence('old_password', 'This field is required')
        ->notEmptyString('old_password', 'This field is required')
        ->requirePresence('new_password', 'This field is required')
        ->notEmptyString('new_password', 'This field is required')
        ->requirePresence('new_password_confirm', 'This field is required')
        ->notEmptyString('new_password_confirm', 'This field is required')
        ->add('new_password_confirm', 'passwordsMatch', [
            'rule' => function($value, $context) {
                return $context['data']['new_password'] === $value;
            },
            'message' => 'Passwords do not match'
        ]);

        $errors = $this->validator->validate($fields);

        if ($errors) {
            throw new \Exception(json_encode(['validationErrors' => $errors]));
        }
    }

    public function reset($uid, $data) {

        $postData = [];

        $this->validate($data);

        $user = $this->query->getById('users', $uid, 'id');

        if ($user == false) {
            throw new \Exception('Korisnik nije pronađen');
        }

        //check old password

        if (!password_verify($data['old_password'], $user['password']))  {
            throw new \Exception('Stara lozinka je pogrešna');
        }

        $postData['password'] = \TravelOrdersCore\Security\Password::hash($data['new_password']);

        $this->query->update('users')
            ->set($postData)
            ->where(['id' => $uid])
            ->execute();

        return $this->profileService->getProfile($uid);
    }

}