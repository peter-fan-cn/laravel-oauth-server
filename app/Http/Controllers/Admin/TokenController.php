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
        $isPersonalAccessToken = $request->input('personal');

        if ($isPersonalAccessToken) {
            $query = PersonalAccessClient::with('user');
        } else {
            $query = Token::with('user');
        }
        $query->where('revoked', false);
        $content = $query->paginate();
        return Inertia::render('Admin/Tokens/List', $content);
    }
}
