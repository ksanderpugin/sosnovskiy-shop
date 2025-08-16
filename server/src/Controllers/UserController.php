<?php

namespace App\Controllers;

use App\Models\User;
use App\Services\Data;
use App\Services\Security;
use App\Views\View;

class UserController {

    public function login(): void {
        $data = Data::getRawData();

        if (!Security::checkMail($data->email ?? '')) {
            View::renderJSON([
                'ok' => false,
                'error' => 'Bad auth data'
            ]);
            return;
        }

        if (strlen($data->password ?? '') < 6) {
            View::renderJSON([
                'ok' => false,
                'error' => 'Bad auth data'
            ]);
            return;
        }

        $user = User::getByEmail($data->email);
        if (is_null($user)) {
            View::renderJSON([
                'ok' => false,
                'error' => 'Invalid email or password'
            ]);
            return;
        }

        if (Security::verifyPassword($data->password, $user->getHashPass())) {
            $key = time();
            $user->updateToken($key);
            View::renderJSON([
                'ok' => true,
                'user' => [
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'role' => $user->getId() == 1 ? 'admin' : 'manager',
                    'token' => $user->getToken(),
                    'id' => $user->getId() . ':' . $key
                ]
            ]);
        } else {
            View::renderJSON([
                'ok' => false,
                'error' => 'Incorrect email or password'
            ]);
        }
    }
}