<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $items = Item::all();
        return response()->json($items);
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
        //
        $item = Item::create([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'status' => $request->status,
            'barcode' => $request->barcode,
        ]);

        return response()->json($item);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $item = Item::find($id);
        return response()->json($item);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $item = Item::find($id);
        $item->update([
            'name' => $request->name,
            'quantity' => $request->quantity,
            'status' => $request->status,
            'barcode' => $request->barcode,
        ]);

        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $item = Item::find($id);
        $item->delete();
    }
}