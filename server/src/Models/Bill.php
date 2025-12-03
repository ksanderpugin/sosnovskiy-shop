<?php

use App\Models\DatabaseModel;
use App\Services\Database;

class Bill extends DatabaseModel {
    public $data, $orderId, $payLink, $invoiceId, $state, $expired, $lastUpdate;

    private function __construct($id, $data, $orderId, $payLink, $invoiceId, $state, $expired, $lastUpdate) {
        $this->setId($id);
        $this->data = $data;
        $this->orderId = $orderId;
        $this->payLink = $payLink;
        $this->invoiceId = $invoiceId;
        $this->state = $state;
        $this->expired = $expired;
        $this->lastUpdate = $lastUpdate;
    }

    protected static function getTableName() : string {
        return 'bills';
    }

    protected static function createTable() : void {
        Database::getInst()->execute(
            'CREATE TABLE IF NOT EXISTS `' . static::getTableName() . '` (' . 
            '`id` SERIAL, ' . 
            '`data` TEXT, ' . 
            '`order_id` INT UNSIGNED, ' . 
            '`pay_link` VARCHAR(128), ' . 
            '`invoice_id` VARCHAR(32), ' . 
            '`state` TINYINT UNSIGNED, ' . 
            '`expired` INT UNSIGNED, ' . 
            '`last_update` INT UNSIGNED, ' . 
            'PRIMARY KEY(`id`), UNIQUE(`order_id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8;'

        );
    }

    protected static function createObjectFromDBArray(array $data) {
        return new static(
            (int) $data['id'],
            json_decode($data['data'], true),
            (int) $data['order_id'],
            $data['pay_link'],
            $data['invoice_id'],
            $data['state'],
            (int) $data['expired'],
            (int) $data['last_update']
        );
    }

    public function getValues() : array {
        return [
            'data' => $this->data,
            'order_id' => $this->orderId,
            'pay_link' => $this->payLink,
            'invoice_id' => $this->invoiceId,
            'state' => $this->state,
            'expired' => $this->expired,
            'last_update' => $this->lastUpdate
        ];
    }
}