<?php

namespace DomteraCore\Factory;

use Cake\Database\Connection;
use Cake\Database\Query;
use Cake\Database\StatementInterface;
use UnexpectedValueException;

final class QueryFactory
{
    private Connection $connection;

    /**
     * The constructor.
     *
     * @param Connection $connection The database connection
     */
    public function __construct(Connection $connection)
    {
        $this->connection = $connection;
    }

    public function execute($query, array $params = [], array $types = []): StatementInterface
    {
        return $this->connection->execute($query, $params, $types);
    }

    /**
     * Create a new query.
     *
     * @return Query The query
     */
    public function query(): Query
    {
        return $this->connection->newQuery();
    }

    public function lastInsertId($table): mixed
    {
        $lastInsertId = $this->connection->execute('SELECT LAST_INSERT_ID() FROM '.$table)->fetch();
        if (empty($lastInsertId)) {
            return null;
        }
        return $lastInsertId[0];
    }

    /**
     * Create a new 'select' query for the given table.
     *
     * @param string $table The table name
     *
     * @throws UnexpectedValueException
     *
     * @return Query A new select query
     */
    public function select(string $table): Query
    {
        $query = $this->query()->from($table);

        if (!$query instanceof Query) {
            throw new UnexpectedValueException('Failed to create query');
        }

        return $query;
    }

    /**
     * Create an 'update' statement for the given table.
     *
     * @param string $table The table to update rows from
     *
     * @return Query The new update query
     */
    public function update(string $table): Query
    {
        return $this->query()->update($table);
    }

    /**
     * Create an 'insert' statement for the given table.
     *
     * @param string $table The table to insert rows from
     * @param array $data The values to be inserted
     *
     * @return Query The new insert query
     */
    public function insert(string $table, array $data, $types = []): Query
    {
        return $this->query()
            ->insert(array_keys($data), $types)
            ->into($table)
            ->values($data);
    }


    /**
     * Create a 'delete' query for the given table.
     *
     * @param string $table The table to delete from
     *
     * @return Query A new delete query
     */
    public function delete(string $table): Query
    {
        return $this->query()->delete($table);
    }

    /**
     * Create a 'delete' query for the given table.
     *
     * @param string $table The table to select from
     * @param mixed $value Value for the key to select
     *
     * @return mixed A new select query
     */
    public function getById(string $table, mixed $value, string $columnName = 'id'): mixed
    {
        return  $this->select($table)->select('*')->where([$columnName  => $value])->execute()->fetch('assoc');
    }

    public function startTransaction(): void {
        $this->connection->begin();
    }

    public function commit(): void {
        $this->connection->commit();
    }

    public function rollback(): void {
        $this->connection->rollback();
    }

}