<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\User\Organization;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Laravel\Passport\ClientRepository;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'is_admin' => true,
        ]);

        $orgs = (new ClientRepository(Str::uuid(), Str::random(32)))
            ->create($user->id, 'Test Client', url('/auth/callback'), 'users');
        Organization::factory()
            ->for($user, 'owner')
            ->has(User::factory()->count(5), 'users')
            ->count(3)
            ->create();
    }
}
