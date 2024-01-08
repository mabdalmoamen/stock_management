<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InUse extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'in_uses';
    // casts
    protected $casts = [
        'in_use' => 'boolean',
    ];

    public function items()
    {
        return $this->hasMany(InUseItem::class, 'in_use_id', 'id');
    }
    public function customer()
    {

        return $this->belongsTo(Customer::class, 'customer_id', 'id');
    }
    public function user()
    {

        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
