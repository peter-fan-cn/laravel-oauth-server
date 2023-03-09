<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;

class HomeController extends \App\Http\Controllers\Controller
{
    public function index() {
        $content = [
            'items' =>[
                ['name'=>'Users', 'url' => '/admin/users', 'icon' => 'fa-solid fa-user'],
                ['name'=>'Clients', 'url' => '/admin/clients', 'icon' => 'fa-solid fa-sitemap'],
                ['name'=>'Tokens', 'url' => '/admin/tokens', 'icon' => 'fa-solid fa-key']
            ]
        ];
        return Inertia::render('Admin/Home', $content);
    }
}
