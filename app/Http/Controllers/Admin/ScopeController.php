<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OAuth\Scope;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScopeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Scopes/List', [
            'scopes' => Scope::all()
        ]);
    }
}
