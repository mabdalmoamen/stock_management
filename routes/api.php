<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/inuses', \App\Http\Controllers\Api\InuseController::class);
    Route::apiResource('/items', \App\Http\Controllers\Api\ItemController::class);
    Route::apiResource('/customers', \App\Http\Controllers\Api\CustomerController::class);
    Route::apiResource('/users', \App\Http\Controllers\Api\UsersController::class);
    Route::post('/logout', [\App\Http\Controllers\Api\AuthController::class, 'logout']);
});
Route::post('/register', [\App\Http\Controllers\Api\AuthController::class, 'register']);

Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login']);
// logout