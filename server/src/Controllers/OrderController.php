<?php

namespace App\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\Data;
use App\Views\View;
use App\bots\SosnovskiyBot;
use App\Models\User;

class OrderController {

    public function main($number = '') {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') $this->create();
        if ($_SERVER['REQUEST_METHOD'] === 'GET') $this->show($number);
    }

    public function create(): void {
        $data = Data::getRawData(true);
        $basket = json_decode($data['basket'], true);

        $types = [
            'npo' => 0,
            'npp' => 1,
            'npa' => 2,
            'pu' => 3
        ];

        $order = Order::create(
            $data['first-name'] . ' ' . $data['last-name'],
            $data['phone'],
            $basket,
            $data['delivery-type'] == $types[$data['delivery-type']],
            $data['contact-by'],
            $data['dispatch-date'],
            array_key_exists('shop', $data) ? 
                [
                    'shop' => $data['shop']
                ] :
                [
                    'city' => $data['city'],
                    'address' => $data[$data['delivery-type']]
                ]
        );

        $bot = new SosnovskiyBot();
        $bot->sendText(
            208034373,
            'New order: ' . $order->id . PHP_EOL .
            'Contact by: ' . $order->getContactByStr() . PHP_EOL . 
            'Phone: ' . $order->phone . PHP_EOL . 
            'Delivery: ' . $order->getDeliveryTypeStr() . PHP_EOL .
            'Page: https://sosnovskiy.shop/order/' . $order->number
        );

        $h = date('H') + date('I');
        $d = date('w');
        $message = [
            'uk' => 'Ваше замовлення прийняте та буде оброблено найближчим часом.',
            'ru' => 'Ваш заказ принят и будет обработан в ближайшее время.',
            'en' => 'Your order has been accepted and will be processed shortly.'
        ];

        if ($h < 10 || $h > 19 || $d == 0) {
            $dayTd = ['сьогодні', 'сегодня', 'today'];
            $dayTm = ['завтра', 'завтра', 'tomorrow'];
            $dayMon = ['у понеділок','в понедельник','on Monday'];

            $days = $dayTd;
            if ($d == 0) $days = $dayTm;
            else if ($h > 19) {
                if ($d == 6) $days = $dayMon;
                else $days = $dayTm;
            }

            $message = [
                'uk' => 'Ваше замовлення прийняте та буде оброблено ' . $days[0] . ' з 10:00.',
                'ru' => 'Ваш заказ принят и будет обработан ' . $days[1] . ' c 10:00.',
                'en' => 'Your order has been accepted and will be processed ' . $days[2] . ' from 10am.'
            ];
        }

        View::renderJSON([
            'ok' => true,
            'order' => $order,
            'mes' => $message
        ]);
    }

    public function show($number) {
        $order = Order::getByNumber($number);
        if ($order) {
            View::renderJSON([
                'ok' => true,
                'order' => $order
            ]);
        } else {
            View::renderJSON([
                'ok' => false,
                'error' => 'Order not found'
            ]);
        }
    }

    public function showList() {
        $user = User::getAuth();
        if (!$user) {
            View::renderJSON([
                'ok' => false,
                'error' => 'need login'
            ]);
            return;
        }

        $state = $_GET['state'] ?? 'all';
        $date = $_GET['date'] ?? 'all';
        View::renderJSON([
            'ok' => true,
            'orders' => Order::fetchByParams($state, $date)
        ]);
    }
}