<?php

namespace Database\Factories\User;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User\Organization>
 */
class OrganizationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'owner_id' => null,
            'parent_id' => null,
            'name' => fake()->realTextBetween(10, 50),
            'description' => fake()->realTextBetween(50, 255),
            'status' => 'active',
            'level' => 0,
            'sort' => 0,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}
