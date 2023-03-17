<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class User extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->resource->avatarUrl(),
            'avatar_64' => $this->resource->avatarUrl(64),
            'email_verified_at' => $this->email_verified_at->format('Y-m-d H:i:s'),
            'provider' => $this->provider,
            'sub' => $this->sub,
            'orggid' => $this->orggid,
            'user_level' => $this->user_level,
            'last_login_at' => $this->last_login_at->format('Y-m-d H:i:s'),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'description' => $this->description,
        ];
    }
}
