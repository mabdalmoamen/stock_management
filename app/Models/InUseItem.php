<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InUseItem extends Model
{
    use HasFactory;
    protected $guarded = [];
    protected $table = 'in_use_items';

    public function inUse()
    {

        return $this->belongsTo(InUse::class, 'in_use_id', 'id');
    }
    public function item()
    {

        return $this->belongsTo(Item::class, 'item_id', 'id');
    }
}
