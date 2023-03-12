<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Laravel\Passport\Token;

class TokenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $user_id = null)
    {
        $query  = Token::with(['user','client'])
            ->orderBy('created_at', 'desc');
        $fields = $request->get('fields', null);
        $fields = $fields ?: ['id', 'name', 'scopes','user_id','client_id', 'expires_at', 'revoked', 'created_at', 'updated_at'];
        if (is_string($fields)) {
            $fields = explode(',', $fields);
        }
        if ($user_id !== null) {
            $query->where('user_id', $user_id);
        }
        $perPage = $request->get('per_page', 10);
        $content = $query->paginate($perPage, $fields);
        return JsonResource::collection($content);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
