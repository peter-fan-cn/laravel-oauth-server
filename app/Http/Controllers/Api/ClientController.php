<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;
use Laravel\Passport\Client;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return JsonResource
     */
    public function index(Request $request, $user_id = null): JsonResource
    {
        $query  = Client::with('user')->orderBy('created_at', 'desc');
        $fields = $request->get('fields', null);
        $fields = $fields ?: ['id', 'name', 'user_id', 'provider', 'redirect', 'personal_access_client', 'password_client', 'revoked', 'created_at', 'updated_at'];
        if (is_string($fields)) {
            $fields = explode(',', $fields);
        }
        if ($user_id !== null) {
            $query->where('user_id', $user_id);
        }
        if ($request->get('res_type', 'pagination') === 'full') {
            $content = $query->get($fields);
        } else {
            $perPage = $request->get('per_page', 10);
            $content = $query->paginate($perPage, $fields);
        }
        return JsonResource::collection($content);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $client = new Client();
        $client->fill($request->all());
        $client->revoked = false;
        $client->makeVisible('secret');
        $secret = Str::random(32);
        $client->secret = $secret;
        $client->save();
        return JsonResource::make($client);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return JsonResource::make($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        //
    }
}
