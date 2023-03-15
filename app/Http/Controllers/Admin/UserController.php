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
        $content = [
            'resource' => route('users.index')
        ];
        return Inertia::render('Admin/Users/List', $content);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function show(Request $request, ?User $user = null)
    {
        if (!$user) $user = $request->user();

        return Inertia::render('Admin/Users/Show', [
            'user' => $user
        ]);
    }

}
