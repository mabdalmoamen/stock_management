<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;
    protected $guarded = ['name', 'barcode', 'image', 'quantity', 'created_at', 'updated_at'];
    // casts
    protected $casts = [
        'status' => 'boolean',
    ];
}
