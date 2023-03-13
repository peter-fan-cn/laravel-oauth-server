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
        $query = Client::with('user')->orderBy('created_at', 'desc');
        if ($user_id !== null) {
            $query->where('user_id', $user_id);
        }
        if ($request->get('res_type', 'pagination') === 'full') {
            $content = $query->get();
        } else {
            $perPage = $request->get('per_page', 10);
            $content = $query->paginate($perPage);
        }
        return JsonResource::collection($content);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data   = $request->validate([
            'name'                   => 'required|max:100',
            'redirect'               => 'nullable|string',
            'personal_access_client' => 'required|boolean',
            'password_client'        => 'required|boolean',
            'company'                => 'nullable|string|max:100',
            'site'                   => 'nullable|string|max:255',
            'description'            => 'nullable|string|max:255',
        ]);
        $client = new Client();
        $client->fill($data);
        $client->revoked = false;
        $client->makeVisible('secret');
        $secret         = Str::random(32);
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
        $data = $request->validate([
            'name'                   => 'max:100',
            'redirect'               => 'nullable|string',
            'personal_access_client' => 'boolean',
            'password_client'        => 'boolean',
            'company'                => 'nullable|string|max:100',
            'site'                   => 'nullable|string|max:255',
            'description'            => 'nullable|string|max:255',
            'revoked'                => 'boolean'
        ]);
        $client->fill($data);
        $client->save();
        return JsonResource::make($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return response()->noContent();
    }
}
