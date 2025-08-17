<?php

namespace App\bots;

use App\bots\Telegraf;
use App\Settings\Config;

class SosnovskiyBot extends Telegraf
{

    public function clientListener(TelegrafHandler $handler)
    {
        // TODO: Implement clientListener() method.
    }

    protected static function getToken() : string
    {
        return Config::SOSNOVSKIY_BOT_TOKEN;
    }

    protected static function getWebHook() : string
    {
        return '';
    }
}