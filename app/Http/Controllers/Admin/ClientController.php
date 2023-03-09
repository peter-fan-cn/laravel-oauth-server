<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Passport\Client;

class ClientController extends Controller
{

    public function index(Request $request)
    {
        $content = [];
        return Inertia::render('Admin/Clients/List', $content);
    }

    public function create()
    {
        return Inertia::render('Admin/Clients/Create');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Admin/Clients/Edit', [
            'client' => $client
        ]);
    }

}
