<?php

namespace TravelOrdersCore\User;

use TravelOrdersCore\Factory\QueryFactory;

class UserDeleteService
{
    public function __construct(
        protected QueryFactory $query
    )
    {
    }

    public function delete($id)
    {
        $this->query->update('users')
            ->set(['_deleted' => 1])
            ->where(['id' => $id])
            ->execute();

        return [
            'deleted_id' => $id
        ];
    }

}