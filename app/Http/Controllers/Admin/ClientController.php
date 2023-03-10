<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

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

    public function show($client_id)
    {
        return Inertia::render('Admin/Clients/Show', ['id' => $client_id]);
    }

    public function edit($client_id)
    {
        return Inertia::render('Admin/Clients/Edit', [
            'id' => $client_id
        ]);
    }

}
