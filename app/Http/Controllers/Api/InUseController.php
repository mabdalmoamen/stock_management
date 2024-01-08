<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InUse;
use App\Http\Requests\StoreInUseRequest;
use App\Http\Requests\UpdateInUseRequest;
use App\Models\InUseItem;
use App\Models\Item;
use Illuminate\Http\Request;

class InUseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $inUses = InUse::query();
        if ($request->customer_id) {
            $inUses->where('customer_id', $request->customer_id);
        }
        if ($request->user_id) {
            $inUses->where('user_id', $request->user_id);
        }
        if ($request->in_use) {
            $inUses->where('in_use', $request->in_use);
        }
        if ($request->date_from && $request->date_to) {
            $inUses->whereBetween('created_at', [$request->date_from, $request->date_to]);
        }
        $inUses = $inUses->with('items', 'user', 'customer')->get();


        return response()->json($inUses);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //insert get id inuse
        $inUse = new InUse();
        $inUse->user_id = auth()->user()->id;
        $inUse->customer_id = $request->customer_id;
        $inUse->save();
        $contents = $request->cart;
        // insert multiple in use item
        foreach ($contents as $content) {
            $inUseItem = new InUseItem();
            $inUseItem->in_use_id = $inUse->id;
            Item::where('id', $content['id'])->update(['quantity' =>
            Item::where('id', $content['id'])->first()->quantity - $content['qty']]);
            $inUseItem->item_id = $content['id'];
            $inUseItem->quantity = $content['quantity'];
            $inUseItem->save();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(InUse $inUse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
        $inUse = InUse::find($id);

        return response()->json($inUse);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInUseRequest $request,  $id)
    {
        //

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $inUse = InUse::find($id);
        $inUse->delete();
    }
}
