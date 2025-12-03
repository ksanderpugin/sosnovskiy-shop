<?php

return [
    // '~^$~' => [\App\Controllers\MainController::class, 'main'],
    '~^api/shippingDates$~' => [\App\Controllers\MainController::class, 'getShippingDates'],
    '~^api/about/([enkru]{2})$~' => [\App\Controllers\MainController::class, 'getAboutPage'],
    '~^api/shipping/([enkru]{2})$~' => [\App\Controllers\MainController::class, 'getShippingPage'],
    '~^api/feedback$~' => [\App\Controllers\MainController::class, 'sendFeedBackMessage'],
    '~^api/policy$~' => [\App\Controllers\MainController::class, 'showPolicy'],

    '~^api/products$~' => [\App\Controllers\ProductController::class, 'main'],
    '~^api/products/getByIds$~' => [\App\Controllers\ProductController::class, 'getByIds'],
    '~^api/categories$~' => [\App\Controllers\ProductController::class, 'showCategories'],
    
    '~^api/order$~' => [\App\Controllers\OrderController::class, 'main'],
    '~^api/order/([0-9a-zA-Z]+)$~' => [\App\Controllers\OrderController::class, 'main'],
    '~^api/orders$~' => [\App\Controllers\OrderController::class, 'showList'],
    
    '~^api/login$~' => [\App\Controllers\UserController::class, 'login'],


    '~^api/testsocet$~' => [\App\Controllers\MainController::class, 'testSocet'],
    '~^api/sendMessageWithSleep$~' => [\App\Controllers\MainController::class, 'doSleep'],


    '~^(ru|en)?\/?.*$~' => [\App\Controllers\MainController::class, 'main'],
];