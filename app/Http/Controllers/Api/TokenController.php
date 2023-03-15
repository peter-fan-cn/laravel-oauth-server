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
    public function index(Request $request)
    {
        $query  = Token::with(['user','client'])
            ->where('revoked', false)
            ->orderBy('created_at', 'desc');
        $perPage = $request->get('per_page', 10);
        $content = $query->paginate($perPage);
        return JsonResource::collection($content);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $token = Token::findOrFail($id);
        $token->revoke();
        return response()->noContent();
    }
}
