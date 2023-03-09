<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Passport\Client;

class ClientController extends Controller
{
    public function index()
    {
        $content = Client::with('user')->orderBy('created_at','desc')
            ->paginate();
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
