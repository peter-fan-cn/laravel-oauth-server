<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

class HomeController extends \App\Http\Controllers\Controller
{
    public function index() {
        $content = [
            'items' =>[
                ['name'=>'Users', 'url' => route('users.index'), 'icon' => 'fa-solid fa-user'],
                ['name'=>'Clients', 'url' => route('clients.index'), 'icon' => 'fa-solid fa-sitemap'],
                ['name'=>'Tokens', 'url' => route('tokens.index'), 'icon' => 'fa-solid fa-key']
            ]
        ];
        return Inertia::render('Admin/Home', $content);
    }
}
