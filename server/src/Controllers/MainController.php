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
}