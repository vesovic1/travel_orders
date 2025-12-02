<?php

namespace DomteraCore\User;
use DomteraCore\Factory\QueryFactory;

class UserProfileService {
    protected $cols;

    public function __construct(
        protected QueryFactory $query
    )
    {
        $this->cols = ['first_name' ,'last_name', 'email'];
    }

    public function getProfile($userId) {

        $profile = $this->query->select('users')
            ->select($this->cols)
            ->where(['id' => $userId, '_deleted' => 0])
            ->execute()
            ->fetch('assoc');

        return $profile;
    }

}