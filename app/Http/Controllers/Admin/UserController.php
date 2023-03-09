<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Passport\Client;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $query = User::query()->orderBy('created_at','desc');
        $fields = ['id', 'name', 'email', 'created_at', 'updated_at'];
        $perPage = $request->get('per_page', 10);
        $content = $query->paginate($perPage, $fields);

        return Inertia::render('Admin/Users/List', $content);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function edit(Client $client)
    {
        return Inertia::render('Admin/Users/Edit', [
            'client' => $client
        ]);
    }

    public function show(Request $request, ?User $user = null)
    {
        if (!$user) $user = $request->user();
        return Inertia::render('Admin/Users/Show', [
            'user' => $user->except(['password'])
        ]);
    }

}
