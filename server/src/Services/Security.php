<?php

namespace App\Services;

class Security {

    private static $key = 'vjqctrhtnysqrkecbr';

    public static function hashPassword(string $password) : string {
        return password_hash($password, PASSWORD_DEFAULT);
    }

    public static function verifyPassword(string $password, string $hash) : bool {
        return password_verify($password, $hash);
    }

    public static function createToken(int $userId, int $time) : string {
        return hash_hmac('sha256', $userId.':'.$time, self::$key);
    }

    public static function tokenIsValid(string $data, string $hash) : bool {
        return hash_equals(hash_hmac('sha256', $data, self::$key), $hash);
    }

    public static function checkMail($email) : bool {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function checkPhone($phone) : bool {
        preg_match('~^\+38 \(0\d{2}\) \d{3}\-\d{2}\-\d{2}$~', $phone, $matches);
        return count($matches) > 0;
    }
}