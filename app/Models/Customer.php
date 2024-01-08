<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    // fillable
    protected $fillable = [
        'name',
        'phone',

    ];
    public function inUses()
    {

        return $this->hasMany(InUse::class, 'customer_id', 'id');
    }
}
