<?php

namespace App\Services;

class MathService {
    public static function getTimePlusNumber($i = 0, $osn = 60) : string {
        if ($osn > 60) return false;
        $number = (time() + $i) * 10000 + mt_rand(1, 9999);
        $numberStr = '';
        $alphabet = '123456789ABCDIFGHIJKLMNOPQRSTUVWXYZ0abcdefghjkmnopqrstuvwxyz';
        $floor = $number;
        do {
            $ost = $floor%$osn;
            $numberStr = $alphabet[$ost] . $numberStr;
            $floor = floor($floor/$osn);
        } while ($floor > 0);
        return $numberStr;
    }

    public static function createUUID(string | int | null $data = null) : string {
        $str = is_null($data) ? microtime() : $data . microtime();
        $hash = sha1($str);
        return sprintf(
            '%s-%s-%s-%s-%04x%04x%04x',
            substr($hash, 0, 8),
            substr($hash, 8, 4),
            substr($hash, 12, 4),
            substr($hash, 16, 4),
            mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
        );
    }
}