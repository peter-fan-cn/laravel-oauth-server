<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Users/List', [
            'users' => User::all()
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
