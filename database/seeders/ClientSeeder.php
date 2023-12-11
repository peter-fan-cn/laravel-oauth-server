<?php

namespace Database\Seeders;


use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        (new ClientRepository('9ad23a22-7d28-4276-9ab8-9da00c0a87c3', 'zgKm6hzQF0gxctJiK3UDhe9WILXug6JS'))
            ->createPersonalAccessClient(null,'Global Personal Client', url('/auth/callback'));

        (new ClientRepository('9ad23a22-7f38-42d8-9851-fbe0b7cf9128', '0nLJQYSmf5OXNOqU1TrDpE6Fo3AyA6vd'))
            ->create(null,'Global Client', url('/auth/callback'), 'users');
    }
}
