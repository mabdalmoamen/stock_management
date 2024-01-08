<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        \App\Models\Item::factory(20)->create([
            'name' => fake()->name(),
            'barcode' => fake()->ean8(),
            'quantity' => fake()->numberBetween(1, 100),
            'image' => fake()->imageUrl(),


        ]);
    }
}
