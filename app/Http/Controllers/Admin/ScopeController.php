<?php

namespace App\Http\Controllers\Admin;

use App\Models\OAuth\Scope;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ScopeController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Admin/Scopes/List', [
            'tokens' => Scope::all()
        ]);
    }
}
