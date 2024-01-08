<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Item::class;
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'barcode' => fake()->ean8(),
            'quantity' => fake()->numberBetween(1, 100),
            'image' => fake()->imageUrl(),

        ];
    }
}
