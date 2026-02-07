<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GroupController;
use App\Http\Controllers\Api\ExpenseController;
use App\Models\ExpenseSplit;
use App\Http\Controllers\Api\SettlementController;
use Illuminate\Support\Facades\Mail;

// =======================
// Mail test route
// =======================

Route::get('/test-ses', function () {

    Mail::raw('Splitwise SES Test Mail', function ($message) {
        $message->to('ebad2call@gmail.com')
            ->subject('SES Working');
    });

    return response()->json(['message' => 'SES mail sent']);
});

// =======================
// End Mail test route
// =======================


Route::get('/status', function () {
    return response()->json([
        'app' => 'Splitwise API',
        'status' => 'running'
    ]);
});

// =======================
// Public routes
// =======================
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// =======================
// Protected routes
// =======================
Route::middleware('auth:api')->group(function () {

    // Auth
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);

    // =======================
    // Group APIs
    // =======================
    Route::post('/groups', [GroupController::class, 'store']);
    Route::get('/groups', [GroupController::class, 'index']);
    Route::post('/groups/{id}/join', [GroupController::class, 'join']);
    Route::post('/groups/{id}/leave', [GroupController::class, 'leave']);

    // Group Admin APIs: admin car add group members
    Route::post('/groups/{id}/add-member', [GroupController::class, 'addMember']);

    // =======================
    // Expense APIs
    // =======================
    Route::post('/groups/{groupId}/expenses', [ExpenseController::class, 'store']);
    Route::get('/groups/{groupId}/expenses', [ExpenseController::class, 'index']);

    // =======================
    // Old Balance API -- to be removed after frontend migration
    // =======================
    // Route::get('/balance', function () {

    //     $userId = auth()->id();

    //     // How much I owe to others
    //     $youOwe = ExpenseSplit::where('user_id', $userId)
    //         ->where('is_settled', false)
    //         ->sum('amount');

    //     // How much others owe me
    //     $owedToYou = ExpenseSplit::whereHas('expense', function ($q) use ($userId) {
    //         $q->where('paid_by', $userId);
    //     })
    //         ->where('user_id', '!=', $userId)
    //         ->where('is_settled', false)
    //         ->sum('amount');

    //     return response()->json([
    //         'you_owe' => $youOwe,
    //         'owed_to_you' => $owedToYou,
    //     ]);
    // });
    // =======================
    // End Old Balance API
    // =======================

    Route::get('/balance', function () {

        $userId = auth()->id();

        $groups = auth()->user()->groups;

        $totalYouOwe = 0;
        $totalOwedToYou = 0;

        foreach ($groups as $group) {

            $totalExpense = \App\Models\Expense::where('group_id', $group->id)->sum('amount');
            $memberCount = $group->users()->count();

            if ($memberCount == 0)
                continue;

            $fairShare = $totalExpense / $memberCount;

            $paid = \App\Models\Expense::where('group_id', $group->id)
                ->where('paid_by', $userId)
                ->sum('amount');

            $balance = $paid - $fairShare;

            if ($balance < 0) {
                $totalYouOwe += abs($balance);
            } else {
                $totalOwedToYou += $balance;
            }
        }

        return response()->json([
            'you_owe' => round($totalYouOwe, 2),
            'owed_to_you' => round($totalOwedToYou, 2),
        ]);
    });



    Route::post('/groups/{groupId}/settle', [SettlementController::class, 'settle']);
    Route::delete('/groups/{groupId}', [GroupController::class, 'destroy']);

    // get group balances
    Route::get('/groups/{groupId}/balances', [GroupController::class, 'groupBalances']);

    // get group settlement suggestion
    Route::get('/groups/{groupId}/settlement-suggestion', [GroupController::class, 'groupSettlement']);



});
