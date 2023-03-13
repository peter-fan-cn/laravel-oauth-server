<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     * @param Request $request
     * @return JsonResource
     */
    public function index(Request $request): JsonResource
    {
        $query  = User::query()->orderBy('created_at', 'desc');
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
