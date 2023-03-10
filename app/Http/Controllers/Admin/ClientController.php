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
        $content = [
            'resource' => route('clients.index')
        ];
        return Inertia::render('Admin/Clients/List', $content);
    }

    public function create()
    {
        return Inertia::render('Admin/Clients/Create');
    }

    public function show(Client $client)
    {
        return Inertia::render('Admin/Clients/Show', ['client' => $client]);
    }

    public function edit(Client $client)
    {
        return Inertia::render('Admin/Clients/Edit', [
            //'id' => $client_id,
            'client' => $client
        ]);
    }

}
