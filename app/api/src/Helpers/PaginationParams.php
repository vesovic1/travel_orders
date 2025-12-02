<?php

namespace TravelOrdersApi\Helpers;

final class PaginationParams
{
    public static function process(mixed $params)
    {
        $filters = $params;

        $filters['page'] = array_key_exists('page', $params) ? intval($params['page']) :  1;
        $filters['pageSize'] = $params['pageSize'] ?? 15;

        if (!empty($params['orderBy']) && $params['orderBy'] !== 'null') {
            $direction = 'ASC';
            if (!empty($params['orderDir'])) {
                if (in_array(strtoupper($params['orderDir']), ['ASC', 'DESC'])) {
                    $direction = strtoupper($params['orderDir']);
                }
            }

            $filters['orderBy'] = [$params['orderBy'] => $direction];
            unset($filters['orderDir']);
        }

        $filters['search'] = strtolower($params['search'] ?? '');
        return $filters;
    }
}