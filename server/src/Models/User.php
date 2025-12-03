<?php

namespace App\Models;

use App\Services\Database;
use App\Services\Security;

class User extends DatabaseModel {

    const ROLE_ADMIN = 0;
    const ROLE_MANAGER = 1;
    const ROLE_CLI_MANAGER = 2;
    const ROLE_CLI_PACKER = 3;

    const STATE_ACTIVE = 1;
    const STATE_BLOCK = 0;

    public string $firstName, $lastName, $email, $phone, $birthday;
    protected string $hashPassword, $token;
    protected int $addTime, $role, $state;
    public bool $isVerified;

    public function getToken(): string {
        return $this->token;
    }

    public function getRole(): string {
        return match($this->role) {
            0 => 'admin',
            1 => 'manager',
            2 => 'cli-manager',
            3 => 'packer',
            default => 'unknown'
        };
    }

    public function setPassword($password): void {
        $this->hashPassword = Security::hashPassword($password);
    }

    public function getHashPass() : string {
        return $this->hashPassword;
    }

    public function updateToken($key) : void {
        $this->token = Security::createToken($this->id, $key);
        $this->save();
    }

    public static function create($firstName, $lastName, $email, $password, $key, $phone, $birthday, $role) : static {
        // TODO validate data needed !!!
        if (static::getByEmail($email)) throw new \Exception("Email $email already exists", 400);
        if (static::getByPhone($phone)) throw new \Exception("Phone $phone already exists", 400);

        $passHash = Security::hashPassword($password);
        $newUser = new static(0, $firstName, $lastName, $email, $passHash, '', time(), $phone, $birthday, $role, 1);
        $newUser->save();
        $newUser->token = Security::createToken($newUser->id, $key);
        $newUser->save();
        return $newUser;
    }

    public static function getAuth() : static | null {
        $token = apache_request_headers()['Authorization'] ?? false;
        if (!$token) return null;

        if (!str_starts_with($token, 'Bearer')) return null;
        
        $tokenData = explode(':', substr($token, 7));
        if (count($tokenData) != 3) return null;

        if (!Security::tokenIsValid($tokenData[0].':'.$tokenData[1], $tokenData[2])) return null;

        $user = static::getById((int) $tokenData[0]);
        if (!$user) return null;

        if (hash_equals($user->token, $tokenData[2])) return $user;
        
        return null;
    }

    public static function getByEmail(string $email) : static | null {
        $result = static::findByField('email', $email);
        if (count($result) > 0) return $result[0];
        else return null;
    }

    public static function getByPhone(string $phone) : static | null {
        $result = static::findByField('phone', $phone);
        if (count($result) > 0) return $result[0];
        else return null;
    }

    private function __construct($id, $firstName, $lastName, $email, $hashPassword, $token, $addTime, $phone, $birthday, $role, $state) {
        $this->setId($id);
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->hashPassword = $hashPassword;
        $this->token = $token;
        $this->addTime = $addTime;
        $this->phone = $phone;
        $this->birthday = $birthday;
        $this->role = $role;
        $this->state = $state;
    }

    protected static function getTableName() : string {
        return 'users';
    }

    protected static function createTable() : void {
        Database::getInst()->execute(
            'CREATE TABLE IF NOT EXISTS `' . static::getTableName() . '` (' . 
                '`id` SERIAL, ' . 
                '`first_name` VARCHAR(64) default NULL, ' . 
                '`last_name` VARCHAR(64) default NULL, ' . 
                '`email` VARCHAR(64) NOT NULL, ' . 
                '`hash_password` VARCHAR(255) NOT NULL, ' . 
                '`token` VARCHAR(64) default NULL, ' . 
                '`add_time` BIGINT UNSIGNED default 0, ' .
                '`phone` CHAR(19), ' . 
                '`birthday` DATE, ' . 
                '`role` INT(1), ' . 
                '`state` INT(1), ' .
                'PRIMARY KEY(`id`), ' . 
                'UNIQUE(`email`)' . 
            ') ENGINE=InnoDB default CHARSET=utf8;'
        );
    }

    protected static function createObjectFromDBArray(array $data) {
        return 
            new static(
                $data['id'], 
                $data['first_name'], 
                $data['last_name'], 
                $data['email'], 
                $data['hash_password'], 
                $data['token'],
                $data['add_time'],
                $data['phone'],
                $data['birthday'],
                $data['role'],
                $data['state']
            );
    }

    public function getValues(): array
    {
        return [
            'first_name' => $this->firstName,
            'last_name' => $this->lastName,
            'email' => $this->email,
            'hash_password' => $this->hashPassword,
            'token' => $this->token,
            'add_time' => $this->addTime,
            'phone' => $this->phone,
            'birthday' => $this->birthday,
            'role' => $this->role,
            'state' => $this->state
        ];
    }
}