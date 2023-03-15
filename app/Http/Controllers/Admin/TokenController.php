<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Passport\PersonalAccessClient;
use Laravel\Passport\Token;

class TokenController extends Controller
{
    public function index(Request $request)
    {
        $content = [
            'resource' => route('tokens.index')
        ];
        return Inertia::render('Admin/Tokens/List', $content);
    }

    public function show(Token $token)
    {
        $token->load(['user','client']);
        return Inertia::render('Admin/Tokens/Show', ['token' => $token]);
    }
}
