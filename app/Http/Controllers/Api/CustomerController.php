<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $customers = Customer::all();
        return response()->json($customers);
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
        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,

        ]);

        return response()->json($customer);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        // find by id or mobile or name

        $customer = Customer::where('id', $id)->orWhere('phone', $id)->orWhere('name', $id)->first();
        return response()->json($customer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        //
        $customer = Customer::find($id);
        $customer->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //
        $customer = Customer::find($id);
        $customer->delete();
    }
}
