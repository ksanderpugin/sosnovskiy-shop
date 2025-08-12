<?php

namespace App\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Services\Data;
use App\Views\View;
use App\bots\SosnovskiyBot;

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
            'Page: /order/' . $order->number
        );
        View::renderJSON([
            'ok' => true,
            'order' => $order
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
}