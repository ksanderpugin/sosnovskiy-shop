<?php

namespace App\Controllers;

use App\Services\Calendar;
use App\Views\View;
use App\bots\SosnovskiyBot;
use App\Services\Data;

class MainController {
    
    public function main($lang = 'uk'): void {
        $title = match($lang){
            'ru' => 'Сосновский 🥩 Интернет магазин крафтовой колбасной продукции',
            'en' => 'Sosnovskiy 🥩 Online store of craft sausage products',
            default => 'Сосновський 🥩 Інтернет магазин крафтової ковбасної продукції'
        };
        
        View::renderHtml(
            'main.php',
            [
                'lang' => $lang,
                'title' => $title
            ]
        );
    }

    public function getShippingDates(): void {
        View::renderJSON([
            'ok' => true,
            'dates' => Calendar::getDatesToDelivery()
        ]);
    }

    public function getAboutPage($lang) {
        if (!in_array($lang, ['uk', 'en', 'ru'])) {
            View::renderJSON([
                'ok' => false,
                'error' => "$lang not supported!"
            ]);
            return;
        }

        View::renderJSON([
            'ok' => true,
            'html' => View::getHtml("about/$lang.html")
        ]);
    }

    public function getShippingPage($lang) {
        if (!in_array($lang, ['uk', 'en', 'ru'])) {
            View::renderJSON([
                'ok' => false,
                'error' => "$lang not supported!"
            ]);
            return;
        }

        View::renderJSON([
            'ok' => true,
            'html' => View::getHtml("shipping/$lang.html")
        ]);
    }

    public function sendFeedBackMessage(): void {
        $data = Data::getRawData(true);
        if (empty($data)) return;
        $sBot = new SosnovskiyBot();
        $result = $sBot->sendText(
            208034373,
            'New feedback: ' . PHP_EOL .
            'From: ' . $data['name'] . PHP_EOL . 
            'E-mail: ' . $data['email'] . PHP_EOL . 
            'Message: ' . $data['message']
        );
        View::renderJSON([
            'ok' => true
        ]);
    }

    public function showPolicy(): void {
        View::renderJSON([
            'ok' => true,
            'html' => View::getHtml('policy/uk.html')
        ]);
    }

    public function testSocet(): void {
        $host = "localhost";
        $path = "/api/sendMessageWithSleep";
        // $data = "param=123&x=test";

        $fp = fsockopen($host, 80, $errno, $errstr, 1);

        if ($fp) {
            $out  = "GET $path HTTP/1.1\r\n";
            $out .= "Host: $host\r\n";
            // $out .= "Content-Type: application/x-www-form-urlencoded\r\n";
            // $out .= "Content-Length: ".strlen($data)."\r\n";
            $out .= "Connection: Close\r\n\r\n";
            // $out .= $data;

            fwrite($fp, $out); 
            sleep(2);
            fclose($fp);        // сразу закрываем — не ждём ответа
        }

        View::renderJSON([
            'ok' => true
        ]);
    }

    public function doSleep(): void {
        echo "ok\n\n";
        sleep(20);
        $bot = new SosnovskiyBot();
        $bot->sendText(
            208034373,
            'This is first message after sleep'
        );
        sleep(15);
        $bot->sendText(
            208034373,
            'This is second message after sleep'
        );
    }
}