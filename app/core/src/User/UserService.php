<?php

namespace TravelOrdersCore\User;

use TravelOrdersCore\Factory\QueryFactory;

class UserService
{

    protected $cols;

    public function __construct(
        protected QueryFactory $query,
    )
    {
        $this->cols = ['id', 'first_name', 'last_name', 'active', 'username', 'email'];
    }

    public function get($params, $companyId)
    {

        if (empty($params['orderBy'])) {
            $params['orderBy'] = ['first_name' => 'ASC'];
        }

        $users = $this->query->select('users')
            ->select($this->cols)
            ->order($params['orderBy'])
            ->page($params['page'], $params['pageSize'])
            ->where([
                'LOWER(CONCAT_WS(\' \', users.first_name, users.last_name, users.username, users.email)) LIKE ' => '%'.$params['search'].'%',
                '_deleted' => 0,
                'company_id' => $companyId
            ])
            ->execute()
            ->fetchAll('assoc');
        return $users;
    }

    public function getCount($params, $companyId)
    {
        $userCount = $this->query->select('users')->select('COUNT(*) as count')
        ->where([
            'LOWER(CONCAT_WS(\' \', users.first_name, users.last_name, users.username, users.email)) LIKE ' => '%'.$params['search'].'%',
            '_deleted' => 0,
            'company_id' => $companyId
        ])
        ->execute()->fetch();
        return $userCount[0];
    }

    public function getById($id)
    {
        return $this->query->select('users')
            ->select($this->cols)
            ->where(['id' => $id])
            ->execute()
            ->fetch('assoc');
    }

    public function getProfile($id)
    {
        return $this->query->select('users')
            ->select($this->cols)
            ->where(['id' => $id])
            ->execute()
            ->fetch('assoc');
    }
}